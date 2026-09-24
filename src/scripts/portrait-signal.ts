const vertexSource = `
  attribute vec2 a_position;
  attribute float a_size;
  attribute float a_alpha;
  attribute float a_accent;

  uniform vec2 u_resolution;
  uniform float u_dpr;

  varying float v_alpha;
  varying float v_accent;

  void main() {
    vec2 clip = vec2(
      (a_position.x / u_resolution.x) * 2.0 - 1.0,
      1.0 - (a_position.y / u_resolution.y) * 2.0
    );

    gl_Position = vec4(clip, 0.0, 1.0);
    gl_PointSize = max(1.0, a_size * u_dpr);

    v_alpha = a_alpha;
    v_accent = a_accent;
  }
`;

const fragmentSource = `
  precision highp float;

  varying float v_alpha;
  varying float v_accent;

  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);

    float circle = 1.0 - smoothstep(0.43, 0.5, d);
    if (circle <= 0.0) discard;

    vec3 ivory = vec3(0.91, 0.90, 0.87);
    vec3 signal = vec3(0.847, 1.0, 0.47);
    vec3 color = mix(ivory, signal, clamp(v_accent, 0.0, 0.82));

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
  accent: number;
};

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Portrait signal shader compilation failed.', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageAspect = image.naturalWidth / image.naturalHeight;
  const targetAspect = width / height;

  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageAspect > targetAspect) {
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

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function deterministicNoise(x: number, y: number, salt = 0) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + salt * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

function buildParticles(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  compact: boolean,
  reducedMotion: boolean,
) {
  const workingWidth = Math.max(260, Math.min(760, Math.round(targetWidth * 1.2)));
  const workingHeight = Math.max(320, Math.round(workingWidth * (targetHeight / targetWidth)));

  const working = document.createElement('canvas');
  working.width = workingWidth;
  working.height = workingHeight;

  const ctx = working.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  ctx.clearRect(0, 0, workingWidth, workingHeight);
  drawImageCover(ctx, image, workingWidth, workingHeight);

  const imageData = ctx.getImageData(0, 0, workingWidth, workingHeight);
  const data = imageData.data;

  // Reference-style subject isolation: keep the head/shoulders, remove the bright room.
  for (let y = 0; y < workingHeight; y += 1) {
    const ny = y / Math.max(1, workingHeight - 1);

    for (let x = 0; x < workingWidth; x += 1) {
      const nx = x / Math.max(1, workingWidth - 1);
      const i = (y * workingWidth + x) * 4;

      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      const sourceAlpha = data[i + 3] / 255;
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      const headX = (nx - 0.50) / 0.31;
      const headY = (ny - 0.39) / 0.35;
      const headDistance = Math.sqrt(headX * headX + headY * headY);
      const headPrior = clamp01((1.15 - headDistance) / 0.34);

      const shoulderX = (nx - 0.50) / 0.56;
      const shoulderY = (ny - 0.86) / 0.35;
      const shoulderDistance = Math.sqrt(shoulderX * shoulderX + shoulderY * shoulderY);
      const shoulderPrior = clamp01((1.14 - shoulderDistance) / 0.35);

      const portraitPrior = Math.max(headPrior, shoulderPrior);
      const likelyBrightBackground = lum > 0.82 && portraitPrior < 0.76;
      const outsidePortrait = portraitPrior < 0.055;

      if (likelyBrightBackground || outsidePortrait || sourceAlpha < 0.04) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 0;
        continue;
      }

      // Public reference technique: downsample first, then lift midtones around gamma ~0.6.
      const inverted = clamp01((0.94 - lum) / 0.86);
      const coverage = Math.pow(portraitPrior, 0.70);
      const tone = clamp01(inverted * coverage);

      data[i] = Math.round(tone * 255);
      data[i + 1] = Math.round(tone * 255);
      data[i + 2] = Math.round(tone * 255);
      data[i + 3] = Math.round(Math.max(tone, coverage * 0.045) * 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // The public reference demonstrates a 64-column dot grid.
  // Our portrait is vertical, so rows follow the frame aspect ratio.
  const cols = compact ? 56 : 64;
  const rows = Math.max(60, Math.round(cols * (targetHeight / targetWidth)));

  const small = document.createElement('canvas');
  small.width = cols;
  small.height = rows;

  const smallCtx = small.getContext('2d', { willReadFrequently: true });
  if (!smallCtx) return null;

  smallCtx.clearRect(0, 0, cols, rows);
  smallCtx.imageSmoothingEnabled = true;
  smallCtx.imageSmoothingQuality = 'high';
  smallCtx.drawImage(working, 0, 0, cols, rows);

  const smallData = smallCtx.getImageData(0, 0, cols, rows).data;
  const pitchX = targetWidth / cols;
  const pitchY = targetHeight / rows;
  const pitch = Math.min(pitchX, pitchY);

  const particles: Particle[] = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = (y * cols + x) * 4;
      const tone = smallData[i] / 255;
      const coverage = smallData[i + 3] / 255;

      // Same midtone-lift family as the published reference.
      const lit = Math.pow(clamp01(tone), 0.60) * coverage;
      if (lit < 0.018) continue;

      const homeX = (x + 0.5) * pitchX;
      const homeY = (y + 0.5) * pitchY;

      const n1 = deterministicNoise(x, y, 1);
      const n2 = deterministicNoise(x, y, 2);
      const scatter = reducedMotion ? 0 : (compact ? 7 : 10);

      const size = Math.max(
        compact ? 1.15 : 1.25,
        pitch * (0.18 + lit * 0.72),
      );

      const alpha = 0.08 + lit * 0.92;
      const accentSeed = deterministicNoise(x, y, 9);
      const accent = accentSeed > 0.996 && lit > 0.54 ? 0.78 : 0;

      particles.push({
        homeX,
        homeY,
        x: homeX + (n1 - 0.5) * scatter * 2,
        y: homeY + (n2 - 0.5) * scatter * 2,
        vx: 0,
        vy: 0,
        size,
        alpha,
        accent,
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
    console.warn('Portrait signal program link failed.', gl.getProgramInfoLog(program));
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
  const accentLocation = gl.getAttribLocation(program, 'a_accent');

  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const dprLocation = gl.getUniformLocation(program, 'u_dpr');

  let particles: Particle[] = [];
  let positions = new Float32Array(0);
  let metadata = new Float32Array(0);

  let raf = 0;
  let visible = false;
  let textureReady = false;
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

  let lastFrame = 0;
  let settling = !reducedMotion;

  const spring = compactViewport ? 0.034 : 0.0215;
  const damping = compactViewport ? 0.84 : 0.905;
  const mouseRadius = 128;
  const repelForce = 2.15;
  const mouseCarry = 0.105;
  const maxDisplacement = 34;

  const uploadStaticMetadata = () => {
    metadata = new Float32Array(particles.length * 3);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const m = i * 3;
      metadata[m] = p.size;
      metadata[m + 1] = p.alpha;
      metadata[m + 2] = p.accent;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, metaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, metadata, gl.STATIC_DRAW);

    const stride = 3 * Float32Array.BYTES_PER_ELEMENT;

    gl.enableVertexAttribArray(sizeLocation);
    gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, stride, 0);

    gl.enableVertexAttribArray(alphaLocation);
    gl.vertexAttribPointer(
      alphaLocation,
      1,
      gl.FLOAT,
      false,
      stride,
      Float32Array.BYTES_PER_ELEMENT,
    );

    gl.enableVertexAttribArray(accentLocation);
    gl.vertexAttribPointer(
      accentLocation,
      1,
      gl.FLOAT,
      false,
      stride,
      Float32Array.BYTES_PER_ELEMENT * 2,
    );
  };

  const uploadPositions = () => {
    if (positions.length !== particles.length * 2) {
      positions = new Float32Array(particles.length * 2);
    }

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      positions[i * 2] = p.x;
      positions[i * 2 + 1] = p.y;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
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

    if (!nextParticles?.length) return false;

    particles = nextParticles;
    settling = !reducedMotion;
    uploadStaticMetadata();
    uploadPositions();
    textureReady = true;
    return true;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;

    const nextCssWidth = rect.width;
    const nextCssHeight = rect.height;
    const maxDpr = compactViewport ? 1.0 : 1.25;
    const nextDpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const width = Math.max(1, Math.round(nextCssWidth * nextDpr));
    const height = Math.max(1, Math.round(nextCssHeight * nextDpr));

    const sizeChanged =
      Math.abs(nextCssWidth - cssWidth) > 6 ||
      Math.abs(nextCssHeight - cssHeight) > 6;

    cssWidth = nextCssWidth;
    cssHeight = nextCssHeight;
    dpr = nextDpr;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    if (sizeChanged && image.complete) {
      rebuildParticles();
    }

    return true;
  };

  const physicsStep = (dt: number) => {
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
          const shaped = falloff * falloff;
          const nx = dx / distance;
          const ny = dy / distance;

          ax += nx * repelForce * shaped;
          ay += ny * repelForce * shaped;

          // A little mouse momentum makes the dots feel thrown, not merely displaced.
          ax += pointerVX * shaped * mouseCarry;
          ay += pointerVY * shaped * mouseCarry;
        }
      }

      p.vx = (p.vx + ax * dt) * Math.pow(damping, dt);
      p.vy = (p.vy + ay * dt) * Math.pow(damping, dt);

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      const fromHomeX = p.x - p.homeX;
      const fromHomeY = p.y - p.homeY;
      const distanceFromHome = Math.sqrt(
        fromHomeX * fromHomeX + fromHomeY * fromHomeY,
      );

      if (distanceFromHome > maxDisplacement) {
        const scale = maxDisplacement / distanceFromHome;
        p.x = p.homeX + fromHomeX * scale;
        p.y = p.homeY + fromHomeY * scale;
        p.vx *= 0.72;
        p.vy *= 0.72;
      }

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      maxDistance = Math.max(maxDistance, distanceFromHome);
      maxSpeed = Math.max(maxSpeed, speed);
    }

    settling = maxDistance > 0.08 || maxSpeed > 0.045;
  };

  const draw = (now: number) => {
    raf = 0;

    if (!visible || !textureReady || !particles.length) return;

    resize();

    const elapsed = lastFrame ? now - lastFrame : 16.67;
    const dt = Math.min(1.8, Math.max(0.35, elapsed / 16.67));
    lastFrame = now;

    if (!reducedMotion) {
      physicsStep(dt);
    }

    // Mouse velocity decays quickly after each pointer event.
    pointerVX *= 0.78;
    pointerVY *= 0.78;

    uploadPositions();

    gl.clearColor(0.023, 0.027, 0.025, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform2f(resolutionLocation, cssWidth, cssHeight);
    gl.uniform1f(dprLocation, dpr);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, metaBuffer);
    const stride = 3 * Float32Array.BYTES_PER_ELEMENT;
    gl.enableVertexAttribArray(sizeLocation);
    gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(alphaLocation);
    gl.vertexAttribPointer(
      alphaLocation,
      1,
      gl.FLOAT,
      false,
      stride,
      Float32Array.BYTES_PER_ELEMENT,
    );
    gl.enableVertexAttribArray(accentLocation);
    gl.vertexAttribPointer(
      accentLocation,
      1,
      gl.FLOAT,
      false,
      stride,
      Float32Array.BYTES_PER_ELEMENT * 2,
    );

    gl.drawArrays(gl.POINTS, 0, particles.length);

    if (!firstFrameRendered) {
      firstFrameRendered = true;
      root.dataset.portraitSignalReady = 'true';
      canvas.style.opacity = '1';
      image.style.opacity = '0';
    }

    if (pointerActive || settling) {
      raf = requestAnimationFrame(draw);
    }
  };

  const requestDraw = () => {
    if (!raf && visible && textureReady) {
      raf = requestAnimationFrame(draw);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!interactive) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const now = performance.now();
    if (previousPointerTime > 0) {
      const frameScale = Math.max(0.5, Math.min(3, (now - previousPointerTime) / 16.67));
      pointerVX = (x - previousPointerX) / frameScale;
      pointerVY = (y - previousPointerY) / frameScale;
    }

    previousPointerX = x;
    previousPointerY = y;
    previousPointerTime = now;

    pointerX = x;
    pointerY = y;
    pointerActive = true;
    requestDraw();
  };

  const onPointerEnter = (event: PointerEvent) => {
    if (!interactive) return;

    const rect = canvas.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    previousPointerX = pointerX;
    previousPointerY = pointerY;
    previousPointerTime = performance.now();
    pointerActive = true;
    requestDraw();
  };

  const onPointerLeave = () => {
    if (!interactive) return;

    pointerActive = false;
    pointerVX = 0;
    pointerVY = 0;
    settling = true;
    requestDraw();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        resize();
        if (!textureReady) rebuildParticles();
        requestDraw();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { threshold: 0.18, rootMargin: '100px 0px' },
  );

  const resizeObserver = new ResizeObserver(() => {
    if (!resize()) return;
    if (image.complete) rebuildParticles();
    requestDraw();
  });

  if (interactive) {
    canvas.addEventListener('pointerenter', onPointerEnter, { passive: true });
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
  }

  observer.observe(root);
  resizeObserver.observe(root);

  const start = () => {
    resize();
    rebuildParticles();
    requestDraw();
  };

  if (image.complete) start();
  else image.addEventListener('load', start, { once: true });

  window.addEventListener(
    'pagehide',
    () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();

      if (interactive) {
        canvas.removeEventListener('pointerenter', onPointerEnter);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
      }
    },
    { once: true },
  );
}

document.querySelectorAll<HTMLElement>('[data-portrait-signal]').forEach(initPortraitSignal);
