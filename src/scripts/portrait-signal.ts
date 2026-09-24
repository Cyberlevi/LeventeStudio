const vertexSource = `
  attribute vec2 a_position;
  attribute float a_size;
  attribute float a_alpha;
  attribute float a_tone;
  attribute float a_phase;
  attribute float a_amplitude;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_pointerActive;
  uniform float u_time;
  uniform float u_dpr;

  varying float v_alpha;
  varying float v_tone;
  varying float v_phase;
  varying float v_pointer;

  void main() {
    float t = u_time;

    // Continuous, very small ambient movement. It is intentionally sub-pixel to ~1px.
    vec2 drift = vec2(
      sin(t * 0.43 + a_phase) + 0.42 * sin(t * 0.91 + a_phase * 1.73),
      cos(t * 0.37 + a_phase * 1.31) + 0.42 * cos(t * 0.79 + a_phase * 0.67)
    ) * a_amplitude * 0.58;

    vec2 position = a_position + drift;

    float pointerDistance = distance(position, u_pointer);
    float pointerGlow =
      exp(-(pointerDistance * pointerDistance) / (2.0 * 115.0 * 115.0)) *
      u_pointerActive;

    vec2 clip = vec2(
      (position.x / u_resolution.x) * 2.0 - 1.0,
      1.0 - (position.y / u_resolution.y) * 2.0
    );

    gl_Position = vec4(clip, 0.0, 1.0);
    gl_PointSize = max(1.0, a_size * u_dpr);

    v_alpha = a_alpha;
    v_tone = a_tone;
    v_phase = a_phase;
    v_pointer = pointerGlow;
  }
`;

const fragmentSource = `
  precision highp float;

  uniform float u_time;

  varying float v_alpha;
  varying float v_tone;
  varying float v_phase;
  varying float v_pointer;

  void main() {
    vec2 point = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(point);

    float circle = 1.0 - smoothstep(0.40, 0.50, distanceToCenter);
    if (circle <= 0.0) discard;

    vec3 ivory = vec3(0.91, 0.905, 0.88);
    vec3 signal = vec3(0.847, 1.0, 0.47);

    // A restrained moving green cast like the reference field,
    // with extra signal around the pointer.
    float breathing =
      0.5 + 0.5 * sin(u_time * 0.34 + v_phase * 0.73);
    float subjectSignal =
      smoothstep(0.32, 0.92, v_tone) * (0.055 + breathing * 0.075);
    float pointerSignal = v_pointer * smoothstep(0.18, 0.88, v_tone) * 0.42;
    float signalMix = clamp(subjectSignal + pointerSignal, 0.0, 0.52);

    vec3 color = mix(ivory, signal, signalMix);
    gl_FragColor = vec4(color, v_alpha * circle);
  }
`;

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  tone: number;
  phase: number;
  amplitude: number;
};

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Portrait particle shader compilation failed.', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function noise(x: number, y: number, salt = 0) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + salt * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const sourceAspect = image.naturalWidth / image.naturalHeight;
  const targetAspect = width / height;

  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceAspect > targetAspect) {
    sourceWidth = image.naturalHeight * targetAspect;
    sourceX = (image.naturalWidth - sourceWidth) * 0.5;
  } else {
    sourceHeight = image.naturalWidth / targetAspect;
    sourceY = (image.naturalHeight - sourceHeight) * 0.5;
  }

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  );
}

function preMaskToAlpha(
  canvas: HTMLCanvasElement,
  lumCeiling = 0.92,
  alphaFloor = 0.05,
) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = image.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i + 3] / 255;
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    if (lum > lumCeiling || alpha < alphaFloor) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 0;
      continue;
    }

    const stretched = Math.min(1, (1 - lum) / (1 - lumCeiling * 0.4));
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = Math.round(stretched * 255);
  }

  ctx.putImageData(image, 0, 0);
}

function buildParticles(
  image: HTMLImageElement,
  width: number,
  height: number,
  compact: boolean,
  reducedMotion: boolean,
) {
  // Measured from the supplied reference screenshot: the live grid repeats at ~8 CSS px.
  const pitch = compact ? 7.5 : 8.0;
  const cols = Math.max(1, Math.ceil(width / pitch));
  const rows = Math.max(1, Math.ceil(height / pitch));

  const full = document.createElement('canvas');
  full.width = Math.max(1, Math.round(width));
  full.height = Math.max(1, Math.round(height));

  const fullCtx = full.getContext('2d', { willReadFrequently: true });
  if (!fullCtx) return [];

  fullCtx.clearRect(0, 0, full.width, full.height);
  drawImageCover(fullCtx, image, full.width, full.height);

  // Same public halftone preparation technique as the reference write-up:
  // background -> transparent, subject tone -> alpha, then hardware box-average.
  preMaskToAlpha(full, 0.92, 0.05);

  const small = document.createElement('canvas');
  small.width = cols;
  small.height = rows;

  const smallCtx = small.getContext('2d', { willReadFrequently: true });
  if (!smallCtx) return [];

  smallCtx.clearRect(0, 0, cols, rows);
  smallCtx.imageSmoothingEnabled = true;
  smallCtx.imageSmoothingQuality = 'high';
  smallCtx.drawImage(full, 0, 0, cols, rows);

  const sampled = smallCtx.getImageData(0, 0, cols, rows).data;
  const pitchX = width / cols;
  const pitchY = height / rows;

  const particles: Particle[] = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const index = (y * cols + x) * 4;
      const sampledAlpha = sampled[index + 3] / 255;

      // Published reference curve: pow(tone, 0.6) lifts box-averaged midtones.
      const lit = Math.pow(clamp01(sampledAlpha), 0.60);

      const homeX = (x + 0.5) * pitchX;
      const homeY = (y + 0.5) * pitchY;

      // Reference screenshot: tiny ambient field everywhere, subject dots stay much
      // smaller than the pitch instead of expanding to nearly fill each cell.
      const ambientSize = compact ? 0.72 : 0.78;
      const maxSubjectSize = compact ? 4.05 : 4.45;
      const size = ambientSize + lit * (maxSubjectSize - ambientSize);

      const ambientAlpha = 0.13;
      const alpha = ambientAlpha + lit * 0.82;

      const phase = noise(x, y, 3) * Math.PI * 2;
      const amplitude =
        reducedMotion
          ? 0
          : (0.28 + noise(x, y, 5) * 0.52) * (0.72 + lit * 0.55);

      // Initial offset gives a gentle organic settle, not a scan/reveal.
      const initialScatter =
        reducedMotion ? 0 : (compact ? 2.6 : 4.2) * (0.35 + lit * 0.65);

      const offsetX = (noise(x, y, 7) - 0.5) * initialScatter * 2;
      const offsetY = (noise(x, y, 11) - 0.5) * initialScatter * 2;

      particles.push({
        homeX,
        homeY,
        x: homeX + offsetX,
        y: homeY + offsetY,
        vx: 0,
        vy: 0,
        size,
        alpha,
        tone: lit,
        phase,
        amplitude,
      });
    }
  }

  return particles;
}

function initPortraitSignal(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-portrait-canvas]');
  const image = root.querySelector<HTMLImageElement>('[data-portrait-image]');

  if (!canvas || !image || root.dataset.portraitSignalReady === 'true') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const compactViewport = window.matchMedia('(max-width: 767px)').matches;
  const interactive = !reducedMotion && !coarsePointer && !compactViewport;

  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    powerPreference: compactViewport ? 'low-power' : 'default',
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  });

  if (!gl) return;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  if (!program) return;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Portrait particle program link failed.', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  gl.useProgram(program);
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const positionBuffer = gl.createBuffer();
  const metaBuffer = gl.createBuffer();
  if (!positionBuffer || !metaBuffer) return;

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const sizeLocation = gl.getAttribLocation(program, 'a_size');
  const alphaLocation = gl.getAttribLocation(program, 'a_alpha');
  const toneLocation = gl.getAttribLocation(program, 'a_tone');
  const phaseLocation = gl.getAttribLocation(program, 'a_phase');
  const amplitudeLocation = gl.getAttribLocation(program, 'a_amplitude');

  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const pointerLocation = gl.getUniformLocation(program, 'u_pointer');
  const pointerActiveLocation = gl.getUniformLocation(program, 'u_pointerActive');
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const dprLocation = gl.getUniformLocation(program, 'u_dpr');

  let particles: Particle[] = [];
  let positions = new Float32Array(0);
  let metadata = new Float32Array(0);

  let raf = 0;
  let visible = false;
  let ready = false;
  let firstFrameRendered = false;

  let cssWidth = 0;
  let cssHeight = 0;
  let dpr = 1;

  let pointerX = 0;
  let pointerY = 0;
  let pointerActive = false;
  let pointerVX = 0;
  let pointerVY = 0;
  let previousPointerX = 0;
  let previousPointerY = 0;
  let previousPointerTime = 0;

  let lastRender = 0;
  let lastPhysics = 0;
  let physicsSettling = !reducedMotion;

  // Reference-feel tuning: quick displacement, springy return, slight overshoot.
  const spring = 0.032;
  const damping = 0.885;
  const mouseRadius = 118;
  const repelForce = 2.75;
  const velocityCarry = 0.13;
  const maxDisplacement = 42;

  const uploadMetadata = () => {
    metadata = new Float32Array(particles.length * 5);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const base = i * 5;
      metadata[base] = p.size;
      metadata[base + 1] = p.alpha;
      metadata[base + 2] = p.tone;
      metadata[base + 3] = p.phase;
      metadata[base + 4] = p.amplitude;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, metaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, metadata, gl.STATIC_DRAW);
  };

  const bindAttributes = () => {
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, metaBuffer);

    const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
    const f = Float32Array.BYTES_PER_ELEMENT;

    gl.enableVertexAttribArray(sizeLocation);
    gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, stride, 0);

    gl.enableVertexAttribArray(alphaLocation);
    gl.vertexAttribPointer(alphaLocation, 1, gl.FLOAT, false, stride, f);

    gl.enableVertexAttribArray(toneLocation);
    gl.vertexAttribPointer(toneLocation, 1, gl.FLOAT, false, stride, f * 2);

    gl.enableVertexAttribArray(phaseLocation);
    gl.vertexAttribPointer(phaseLocation, 1, gl.FLOAT, false, stride, f * 3);

    gl.enableVertexAttribArray(amplitudeLocation);
    gl.vertexAttribPointer(amplitudeLocation, 1, gl.FLOAT, false, stride, f * 4);
  };

  const uploadPositions = () => {
    if (positions.length !== particles.length * 2) {
      positions = new Float32Array(particles.length * 2);
    }

    for (let i = 0; i < particles.length; i += 1) {
      positions[i * 2] = particles[i].x;
      positions[i * 2 + 1] = particles[i].y;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
  };

  const rebuildParticles = () => {
    if (!image.complete || !image.naturalWidth || !image.naturalHeight) return false;
    if (!cssWidth || !cssHeight) return false;

    const nextParticles = buildParticles(
      image,
      cssWidth,
      cssHeight,
      compactViewport,
      reducedMotion,
    );

    if (!nextParticles.length) return false;

    particles = nextParticles;
    physicsSettling = !reducedMotion;
    uploadMetadata();
    uploadPositions();
    bindAttributes();
    ready = true;
    return true;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;

    const previousWidth = cssWidth;
    const previousHeight = cssHeight;

    cssWidth = rect.width;
    cssHeight = rect.height;

    const maxDpr = compactViewport ? 1.0 : 1.35;
    dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const width = Math.max(1, Math.round(cssWidth * dpr));
    const height = Math.max(1, Math.round(cssHeight * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    const layoutChanged =
      Math.abs(cssWidth - previousWidth) > 6 ||
      Math.abs(cssHeight - previousHeight) > 6;

    if (layoutChanged && previousWidth > 0 && image.complete) {
      rebuildParticles();
    }

    return true;
  };

  const physicsStep = (dt: number) => {
    if (reducedMotion) return;

    let maxDistance = 0;
    let maxSpeed = 0;

    for (const p of particles) {
      let ax = (p.homeX - p.x) * spring;
      let ay = (p.homeY - p.y) * spring;

      if (interactive && pointerActive) {
        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0.001 && distance < mouseRadius) {
          const falloff = 1 - distance / mouseRadius;
          const force = falloff * falloff;
          const nx = dx / distance;
          const ny = dy / distance;

          ax += nx * repelForce * force;
          ay += ny * repelForce * force;

          // Cursor momentum is inherited by nearby particles, producing the
          // "thrown apart then spring back" behavior from the reference.
          ax += pointerVX * velocityCarry * force;
          ay += pointerVY * velocityCarry * force;
        }
      }

      p.vx = (p.vx + ax * dt) * Math.pow(damping, dt);
      p.vy = (p.vy + ay * dt) * Math.pow(damping, dt);

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      const dxHome = p.x - p.homeX;
      const dyHome = p.y - p.homeY;
      const distanceHome = Math.sqrt(dxHome * dxHome + dyHome * dyHome);

      if (distanceHome > maxDisplacement) {
        const scale = maxDisplacement / distanceHome;
        p.x = p.homeX + dxHome * scale;
        p.y = p.homeY + dyHome * scale;
        p.vx *= 0.68;
        p.vy *= 0.68;
      }

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      maxDistance = Math.max(maxDistance, distanceHome);
      maxSpeed = Math.max(maxSpeed, speed);
    }

    physicsSettling = maxDistance > 0.06 || maxSpeed > 0.035;
  };

  const render = (now: number) => {
    raf = 0;
    if (!visible || !ready || !particles.length) return;

    const frameInterval = compactViewport ? 45 : 30;
    if (now - lastRender < frameInterval) {
      raf = requestAnimationFrame(render);
      return;
    }

    const physicsElapsed = lastPhysics ? now - lastPhysics : 16.67;
    const dt = Math.min(1.8, Math.max(0.35, physicsElapsed / 16.67));
    lastPhysics = now;
    lastRender = now;

    if (pointerActive || physicsSettling) {
      physicsStep(dt);
      uploadPositions();
    }

    pointerVX *= 0.76;
    pointerVY *= 0.76;

    gl.clearColor(0.023, 0.027, 0.025, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform2f(resolutionLocation, cssWidth, cssHeight);
    gl.uniform2f(pointerLocation, pointerX, pointerY);
    gl.uniform1f(pointerActiveLocation, pointerActive ? 1 : 0);
    gl.uniform1f(timeLocation, now / 1000);
    gl.uniform1f(dprLocation, dpr);

    bindAttributes();
    gl.drawArrays(gl.POINTS, 0, particles.length);

    if (!firstFrameRendered) {
      firstFrameRendered = true;
      root.dataset.portraitSignalReady = 'true';
      canvas.style.opacity = '1';
      image.style.opacity = '0';
    }

    // The reference has a constant slow base movement while visible.
    if (!reducedMotion) {
      raf = requestAnimationFrame(render);
    }
  };

  const requestRender = () => {
    if (!raf && visible && ready) {
      raf = requestAnimationFrame(render);
    }
  };

  const updatePointer = (event: PointerEvent, entering = false) => {
    if (!interactive) return;

    const rect = root.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const now = performance.now();

    if (!entering && previousPointerTime > 0) {
      const frameScale = Math.max(
        0.45,
        Math.min(3.5, (now - previousPointerTime) / 16.67),
      );
      pointerVX = (x - previousPointerX) / frameScale;
      pointerVY = (y - previousPointerY) / frameScale;
    } else {
      pointerVX = 0;
      pointerVY = 0;
    }

    previousPointerX = x;
    previousPointerY = y;
    previousPointerTime = now;

    pointerX = x;
    pointerY = y;
    pointerActive = true;
    physicsSettling = true;
    requestRender();
  };

  const onPointerEnter = (event: PointerEvent) => updatePointer(event, true);
  const onPointerMove = (event: PointerEvent) => updatePointer(event, false);

  const onPointerLeave = () => {
    if (!interactive) return;
    pointerActive = false;
    pointerVX = 0;
    pointerVY = 0;
    physicsSettling = true;
    requestRender();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        resize();
        if (!ready) rebuildParticles();
        requestRender();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastRender = 0;
        lastPhysics = 0;
      }
    },
    { threshold: 0.12, rootMargin: '80px 0px' },
  );

  const resizeObserver = new ResizeObserver(() => {
    if (!resize()) return;
    requestRender();
  });

  // Listen on the FRAME, not the canvas: the canvas is deliberately pointer-events:none.
  if (interactive) {
    root.addEventListener('pointerenter', onPointerEnter, { passive: true });
    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave);
  }

  observer.observe(root);
  resizeObserver.observe(root);

  const start = () => {
    resize();
    rebuildParticles();
    requestRender();
  };

  if (image.complete) start();
  else image.addEventListener('load', start, { once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!document.hidden) {
      requestRender();
    }
  });

  window.addEventListener(
    'pagehide',
    () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();

      if (interactive) {
        root.removeEventListener('pointerenter', onPointerEnter);
        root.removeEventListener('pointermove', onPointerMove);
        root.removeEventListener('pointerleave', onPointerLeave);
      }
    },
    { once: true },
  );
}

document.querySelectorAll<HTMLElement>('[data-portrait-signal]').forEach(initPortraitSignal);
