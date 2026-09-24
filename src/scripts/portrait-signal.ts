const vertexSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision highp float;

  varying vec2 v_uv;

  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform vec2 u_pointer;
  uniform float u_progress;
  uniform float u_time;
  uniform float u_energy;

  float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec2 coverUv(vec2 uv) {
    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageResolution.x / u_imageResolution.y;

    if (screenAspect > imageAspect) {
      uv.y = (uv.y - 0.5) * (imageAspect / screenAspect) + 0.5;
    } else {
      uv.x = (uv.x - 0.5) * (screenAspect / imageAspect) + 0.5;
    }

    return uv;
  }

  float sampledLuma(vec2 screenUv) {
    vec2 imageUv = coverUv(screenUv);
    vec3 sampleColor = texture2D(u_texture, imageUv).rgb;
    return luminance(sampleColor);
  }

  void main() {
    vec2 uv = v_uv;
    vec2 px = uv * u_resolution;

    // Desktop pointer interaction only nudges the local dot field by a few pixels.
    vec2 pointerPx = u_pointer * u_resolution;
    vec2 delta = px - pointerPx;
    float pointerDistancePx = length(delta);
    float pointerInfluence = exp(-(pointerDistancePx * pointerDistancePx) / (2.0 * 88.0 * 88.0)) * u_energy;
    vec2 pointerDirection = delta / max(pointerDistancePx, 1.0);
    px += pointerDirection * pointerInfluence * 3.2;

    // Resolution-aware halftone grid. The output stays crisp without creating DOM particles.
    float resolutionFactor = clamp((u_resolution.x - 360.0) / 760.0, 0.0, 1.0);
    float cellSize = mix(7.6, 5.6, resolutionFactor);
    vec2 cellId = floor(px / cellSize);
    vec2 cellCenterPx = (cellId + 0.5) * cellSize;
    vec2 sampleUv = cellCenterPx / u_resolution;
    vec2 imageUv = coverUv(sampleUv);

    vec4 texel = texture2D(u_texture, imageUv);
    float luma = luminance(texel.rgb);

    // Local edge estimate: face, hair, beard and shoulder contours become more legible.
    vec2 texelStep = vec2(cellSize / u_resolution.x, cellSize / u_resolution.y) * 0.72;
    float gx = sampledLuma(sampleUv + vec2(texelStep.x, 0.0)) -
               sampledLuma(sampleUv - vec2(texelStep.x, 0.0));
    float gy = sampledLuma(sampleUv + vec2(0.0, texelStep.y)) -
               sampledLuma(sampleUv - vec2(0.0, texelStep.y));
    float edge = clamp(length(vec2(gx, gy)) * 3.35, 0.0, 1.0);

    // Preserve mid-tones: this is what keeps the face recognizable instead of posterized.
    float tone = pow(clamp(luma, 0.0, 1.0), 0.78);
    float radius = cellSize * (0.085 + tone * 0.36 + edge * 0.075);
    radius = min(radius, cellSize * 0.48);

    vec2 localPx = mod(px, cellSize) - 0.5 * cellSize;
    float dotDistance = length(localPx);
    float aa = max(0.75, cellSize * 0.11);
    float dotAlpha = 1.0 - smoothstep(radius - aa, radius + aa, dotDistance);

    // Fade the hard image rectangle so the portrait dissolves into the technical frame.
    float edgeFadeX = smoothstep(0.015, 0.12, sampleUv.x) *
                      smoothstep(0.015, 0.12, 1.0 - sampleUv.x);
    float edgeFadeY = smoothstep(0.01, 0.10, sampleUv.y) *
                      smoothstep(0.01, 0.10, 1.0 - sampleUv.y);
    float frameFade = edgeFadeX * edgeFadeY;

    // Transparent source portraits benefit from alpha; opaque ones still use tone + contour.
    float portraitPresence = max(smoothstep(0.035, 0.22, tone), edge * 0.92);
    portraitPresence *= mix(0.28, 1.0, texel.a);
    portraitPresence *= frameFade;

    // Top-to-bottom SIGNAL acquisition reveal.
    float scanY = 1.15 - u_progress * 1.30;
    float reveal = smoothstep(scanY - 0.08, scanY + 0.025, sampleUv.y);
    float scanLine = exp(-abs(sampleUv.y - scanY) * 78.0) *
                     smoothstep(0.02, 0.30, u_progress) *
                     (1.0 - smoothstep(0.88, 1.0, u_progress));

    vec3 graphite = vec3(0.043, 0.051, 0.047);
    vec3 ivory = vec3(0.957, 0.941, 0.902);
    vec3 dimIvory = vec3(0.54, 0.56, 0.54);
    vec3 signal = vec3(0.847, 1.0, 0.47);

    vec3 dotColor = mix(dimIvory, ivory, clamp(tone * 1.16 + edge * 0.42, 0.0, 1.0));

    // A small, deterministic fraction of contour/tone nodes carry the LS signal color.
    float nodeSeed = hash(cellId * 0.731 + vec2(17.0, 41.0));
    float signalNode = step(0.968, nodeSeed) *
                       smoothstep(0.14, 0.74, edge + tone * 0.30);
    signalNode = max(signalNode, pointerInfluence * smoothstep(0.18, 0.72, edge));

    dotColor = mix(dotColor, signal, clamp(signalNode * 0.92, 0.0, 0.92));

    float visibleDot = dotAlpha * portraitPresence * reveal;

    // Subtle technical grid in the black field, deliberately quieter than the portrait.
    vec2 grid = abs(fract(v_uv * u_resolution / 32.0) - 0.5);
    float gridLine = smoothstep(0.475, 0.50, max(grid.x, grid.y)) * 0.028;

    vec3 color = graphite + vec3(gridLine);
    color = mix(color, dotColor, visibleDot);
    color += signal * scanLine * 0.19;
    color += signal * pointerInfluence * dotAlpha * edge * 0.10;

    gl_FragColor = vec4(color, 1.0);
  }
`;

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

function initPortraitSignal(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-portrait-canvas]');
  const image = root.querySelector<HTMLImageElement>('[data-portrait-image]');

  if (!canvas || !image || root.dataset.portraitSignalReady === 'true') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const compactViewport = window.matchMedia('(max-width: 767px)').matches;
  const animateReveal = !reducedMotion && !compactViewport;
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

  const buffer = gl.createBuffer();
  if (!buffer) return;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  gl.useProgram(program);

  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  if (!texture) return;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const locations = {
    texture: gl.getUniformLocation(program, 'u_texture'),
    resolution: gl.getUniformLocation(program, 'u_resolution'),
    imageResolution: gl.getUniformLocation(program, 'u_imageResolution'),
    pointer: gl.getUniformLocation(program, 'u_pointer'),
    progress: gl.getUniformLocation(program, 'u_progress'),
    time: gl.getUniformLocation(program, 'u_time'),
    energy: gl.getUniformLocation(program, 'u_energy'),
  };

  let pointerX = 0.70;
  let pointerY = 0.44;
  let targetX = pointerX;
  let targetY = pointerY;
  let energy = 0;
  let targetEnergy = 0;
  let progress = animateReveal ? 0 : 1;
  let raf = 0;
  let visible = false;
  let revealStartedAt = animateReveal ? 0 : -1;
  let lastFrame = 0;
  let textureReady = false;
  let firstFrameRendered = false;
  const revealDuration = 1550;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const maxDpr = compactViewport ? 1.05 : 1.45;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width === width && canvas.height === height) return;

    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  };

  const needsAnimation = () =>
    (animateReveal && progress < 0.999) ||
    (interactive && (
      Math.abs(targetX - pointerX) > 0.001 ||
      Math.abs(targetY - pointerY) > 0.001 ||
      Math.abs(targetEnergy - energy) > 0.008 ||
      energy > 0.008
    ));

  const draw = (now: number) => {
    raf = 0;

    if (!visible || !textureReady) return;

    if (now - lastFrame < 32 && needsAnimation()) {
      raf = requestAnimationFrame(draw);
      return;
    }

    lastFrame = now;
    resize();

    if (animateReveal && revealStartedAt > 0 && progress < 1) {
      const elapsed = Math.min(1, (now - revealStartedAt) / revealDuration);
      progress = 1 - Math.pow(1 - elapsed, 3);
    }

    if (interactive) {
      pointerX += (targetX - pointerX) * 0.10;
      pointerY += (targetY - pointerY) * 0.10;
      energy += (targetEnergy - energy) * 0.09;
      if (targetEnergy === 0 && energy < 0.01) energy = 0;
    } else {
      energy = 0;
    }

    gl.clearColor(0.043, 0.051, 0.047, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1i(locations.texture, 0);
    gl.uniform2f(locations.resolution, canvas.width, canvas.height);
    gl.uniform2f(locations.imageResolution, image.naturalWidth, image.naturalHeight);
    gl.uniform2f(locations.pointer, pointerX, pointerY);
    gl.uniform1f(locations.progress, progress);
    gl.uniform1f(locations.time, now / 1000);
    gl.uniform1f(locations.energy, energy);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    if (!firstFrameRendered) {
      firstFrameRendered = true;
      root.dataset.portraitSignalReady = 'true';
      canvas.style.opacity = '1';
      image.style.opacity = '0';
    }

    if (needsAnimation()) {
      raf = requestAnimationFrame(draw);
    }
  };

  const requestDraw = () => {
    if (!raf && visible && textureReady) {
      raf = requestAnimationFrame(draw);
    }
  };

  const uploadTexture = () => {
    if (!image.complete || !image.naturalWidth || !image.naturalHeight) return;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    textureReady = true;
    requestDraw();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!interactive) return;
    const rect = root.getBoundingClientRect();
    targetX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    targetY = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
    targetEnergy = 1;
    requestDraw();
  };

  const onPointerLeave = () => {
    if (!interactive) return;
    targetX = 0.70;
    targetY = 0.44;
    targetEnergy = 0;
    requestDraw();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        if (animateReveal && revealStartedAt === 0) {
          revealStartedAt = performance.now();
        }
        requestDraw();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { threshold: 0.18, rootMargin: '100px 0px' },
  );

  const resizeObserver = new ResizeObserver(() => {
    resize();
    requestDraw();
  });

  if (interactive) {
    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave);
  }

  observer.observe(root);
  resizeObserver.observe(root);

  if (image.complete) uploadTexture();
  else image.addEventListener('load', uploadTexture, { once: true });

  window.addEventListener(
    'pagehide',
    () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      if (interactive) {
        root.removeEventListener('pointermove', onPointerMove);
        root.removeEventListener('pointerleave', onPointerLeave);
      }
    },
    { once: true },
  );
}

document.querySelectorAll<HTMLElement>('[data-portrait-signal]').forEach(initPortraitSignal);
