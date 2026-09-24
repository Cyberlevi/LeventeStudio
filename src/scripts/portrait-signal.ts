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

  uniform sampler2D u_toneMap;
  uniform vec2 u_resolution;
  uniform vec2 u_gridSize;
  uniform vec2 u_pointer;
  uniform float u_progress;
  uniform float u_time;
  uniform float u_energy;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 851.73));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 px = v_uv * u_resolution;
    vec2 pitch = u_resolution / u_gridSize;

    vec2 cellId = floor(px / pitch);
    vec2 center = (cellId + 0.5) * pitch;
    vec2 gridUv = (cellId + 0.5) / u_gridSize;

    float tone = texture2D(u_toneMap, gridUv).r;
    float coverage = texture2D(u_toneMap, gridUv).a;

    // Hon-Tran-style midtone lift: keep the dot image bold after box averaging.
    float lit = pow(clamp(tone, 0.0, 1.0), 0.60);
    lit *= coverage;

    // A small acquisition looseness that disappears completely at the final state.
    float settle = 1.0 - smoothstep(0.18, 0.92, u_progress);
    vec2 settleOffset = vec2(
      hash(cellId + vec2(4.3, 9.1)),
      hash(cellId + vec2(8.7, 2.6))
    ) - 0.5;
    center += settleOffset * pitch * settle * 0.42;

    // Desktop hover: move only the local dot centers, never warp the photograph.
    vec2 pointerPx = u_pointer * u_resolution;
    vec2 delta = center - pointerPx;
    float pointerDistance = length(delta);
    float pointerInfluence =
      exp(-(pointerDistance * pointerDistance) / (2.0 * 118.0 * 118.0)) * u_energy;
    vec2 pointerDirection = delta / max(pointerDistance, 1.0);
    center += pointerDirection * pointerInfluence * 5.0;

    vec2 local = (px - center) / max(pitch.x, 1.0);
    float distanceToDot = length(local);

    // Clean LED/halftone geometry: size + opacity both come from the sampled tone.
    float radius = mix(0.055, 0.46, lit);
    float aa = max(0.012, 1.0 / max(pitch.x, 1.0));
    float circle = 1.0 - smoothstep(radius - aa, radius + aa, distanceToDot);

    float dotAlpha = mix(0.04, 0.98, lit) * step(0.012, lit);
    dotAlpha *= circle;

    // Top-to-bottom acquisition.
    float scanY = 1.13 - u_progress * 1.28;
    float reveal = smoothstep(scanY - 0.07, scanY + 0.025, v_uv.y);
    float scanLine =
      exp(-abs(v_uv.y - scanY) * 86.0) *
      smoothstep(0.02, 0.30, u_progress) *
      (1.0 - smoothstep(0.89, 1.0, u_progress));

    dotAlpha *= reveal;

    vec3 background = vec3(0.023, 0.027, 0.025);
    vec3 ivory = vec3(0.91, 0.90, 0.87);
    vec3 signal = vec3(0.847, 1.0, 0.47);

    // Extremely sparse LS accent. The reference look remains monochrome first.
    float signalSeed = hash(cellId * 0.73 + vec2(17.0, 41.0));
    float signalNode =
      step(0.9965, signalSeed) *
      smoothstep(0.42, 0.86, lit);

    float hoverNode =
      pointerInfluence *
      smoothstep(0.54, 0.92, lit) *
      0.34;

    float accent = clamp(max(signalNode, hoverNode), 0.0, 0.78);
    vec3 dotColor = mix(ivory, signal, accent);

    // Minimal dark field; no competing photo/background detail.
    vec2 grid = abs(fract(v_uv * u_resolution / 32.0) - 0.5);
    float gridLine = smoothstep(0.487, 0.50, max(grid.x, grid.y)) * 0.010;

    vec3 color = background + vec3(gridLine);
    color = mix(color, dotColor, dotAlpha);
    color += signal * scanLine * 0.15;

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

function buildToneMap(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  compact: boolean,
) {
  const workingWidth = Math.max(220, Math.min(720, Math.round(targetWidth)));
  const workingHeight = Math.max(280, Math.round(workingWidth * (targetHeight / targetWidth)));

  const working = document.createElement('canvas');
  working.width = workingWidth;
  working.height = workingHeight;

  const ctx = working.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  ctx.clearRect(0, 0, workingWidth, workingHeight);
  drawImageCover(ctx, image, workingWidth, workingHeight);

  const imageData = ctx.getImageData(0, 0, workingWidth, workingHeight);
  const data = imageData.data;

  // Portrait prior: head + shoulders. This replaces the room/background with alpha,
  // while the actual photographic tone still controls every dot inside the subject.
  for (let y = 0; y < workingHeight; y += 1) {
    const ny = y / Math.max(1, workingHeight - 1);

    for (let x = 0; x < workingWidth; x += 1) {
      const nx = x / Math.max(1, workingWidth - 1);
      const index = (y * workingWidth + x) * 4;

      const r = data[index] / 255;
      const g = data[index + 1] / 255;
      const b = data[index + 2] / 255;
      const sourceAlpha = data[index + 3] / 255;

      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      const headX = (nx - 0.50) / 0.30;
      const headY = (ny - 0.38) / 0.34;
      const headDistance = Math.sqrt(headX * headX + headY * headY);
      const headPrior = Math.max(0, Math.min(1, (1.14 - headDistance) / 0.34));

      const shoulderX = (nx - 0.50) / 0.54;
      const shoulderY = (ny - 0.86) / 0.34;
      const shoulderDistance = Math.sqrt(shoulderX * shoulderX + shoulderY * shoulderY);
      const shoulderPrior = Math.max(0, Math.min(1, (1.12 - shoulderDistance) / 0.34));

      const portraitPrior = Math.max(headPrior, shoulderPrior);

      // Near-white room/background is discarded outside the portrait envelope.
      const whiteBackground = lum > 0.84 && portraitPrior < 0.74;
      const outsidePortrait = portraitPrior < 0.06;

      if (whiteBackground || outsidePortrait || sourceAlpha < 0.04) {
        data[index] = 255;
        data[index + 1] = 255;
        data[index + 2] = 255;
        data[index + 3] = 0;
        continue;
      }

      // Tone lives in alpha-style coverage. Dark photographic structure becomes strong dots.
      const inverted = Math.max(0, Math.min(1, (0.93 - lum) / 0.84));
      const portraitCoverage = Math.pow(portraitPrior, 0.72);
      const tone = Math.max(0, Math.min(1, inverted * portraitCoverage));

      data[index] = Math.round(tone * 255);
      data[index + 1] = Math.round(tone * 255);
      data[index + 2] = Math.round(tone * 255);
      data[index + 3] = Math.round(Math.max(tone, portraitCoverage * 0.06) * 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const pitch = compact ? 6.8 : 7.4;
  const cols = Math.max(42, Math.round(targetWidth / pitch));
  const rows = Math.max(52, Math.round(targetHeight / pitch));

  const small = document.createElement('canvas');
  small.width = cols;
  small.height = rows;

  const smallCtx = small.getContext('2d');
  if (!smallCtx) return null;

  smallCtx.clearRect(0, 0, cols, rows);
  smallCtx.imageSmoothingEnabled = true;
  smallCtx.imageSmoothingQuality = 'high';
  smallCtx.drawImage(working, 0, 0, cols, rows);

  return { canvas: small, cols, rows };
}

function initPortraitSignal(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-portrait-canvas]');
  const image = root.querySelector<HTMLImageElement>('[data-portrait-image]');

  if (!canvas || !image || root.dataset.portraitSignalReady === 'true') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const compactViewport = window.matchMedia('(max-width: 767px)').matches;
  const animateReveal = !reducedMotion;
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
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  const locations = {
    toneMap: gl.getUniformLocation(program, 'u_toneMap'),
    resolution: gl.getUniformLocation(program, 'u_resolution'),
    gridSize: gl.getUniformLocation(program, 'u_gridSize'),
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
  let gridCols = 64;
  let gridRows = 80;
  let lastCssWidth = 0;
  let lastCssHeight = 0;
  const revealDuration = compactViewport ? 1280 : 1780;

  const uploadToneMap = () => {
    if (!image.complete || !image.naturalWidth || !image.naturalHeight) return false;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;

    const toneMap = buildToneMap(image, rect.width, rect.height, compactViewport);
    if (!toneMap) return false;

    gridCols = toneMap.cols;
    gridRows = toneMap.rows;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      toneMap.canvas,
    );

    textureReady = true;
    lastCssWidth = rect.width;
    lastCssHeight = rect.height;
    return true;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const maxDpr = compactViewport ? 1.0 : 1.25;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    if (
      textureReady &&
      (Math.abs(rect.width - lastCssWidth) > 8 || Math.abs(rect.height - lastCssHeight) > 8)
    ) {
      uploadToneMap();
    }
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
      energy += (targetEnergy - energy) * 0.085;
      if (targetEnergy === 0 && energy < 0.01) energy = 0;
    } else {
      energy = 0;
    }

    gl.clearColor(0.023, 0.027, 0.025, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1i(locations.toneMap, 0);
    gl.uniform2f(locations.resolution, canvas.width, canvas.height);
    gl.uniform2f(locations.gridSize, gridCols, gridRows);
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

  const ensureTexture = () => {
    if (uploadToneMap()) requestDraw();
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
        if (!textureReady) ensureTexture();

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
    if (textureReady) uploadToneMap();
    requestDraw();
  });

  if (interactive) {
    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave);
  }

  observer.observe(root);
  resizeObserver.observe(root);

  if (image.complete) ensureTexture();
  else image.addEventListener('load', ensureTexture, { once: true });

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
