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
    p = fract(p * vec2(234.34, 851.73));
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
    return luminance(texture2D(u_texture, imageUv).rgb);
  }

  float dotMask(vec2 px, float cellSize, float radius) {
    vec2 localPx = mod(px, cellSize) - 0.5 * cellSize;
    float d = length(localPx);
    float aa = max(0.48, cellSize * 0.095);
    return 1.0 - smoothstep(radius - aa, radius + aa, d);
  }

  void main() {
    vec2 uv = v_uv;
    vec2 px = uv * u_resolution;

    // Pointer influence is intentionally tiny: depth cue, not distortion.
    vec2 pointerPx = u_pointer * u_resolution;
    vec2 delta = px - pointerPx;
    float pointerDistancePx = length(delta);
    float pointerInfluence =
      exp(-(pointerDistancePx * pointerDistancePx) / (2.0 * 92.0 * 92.0)) * u_energy;
    vec2 pointerDirection = delta / max(pointerDistancePx, 1.0);
    px += pointerDirection * pointerInfluence * 2.35;

    float resolutionFactor = clamp((u_resolution.x - 360.0) / 820.0, 0.0, 1.0);

    // Three independent fields: body/tone, contour and facial micro-detail.
    float primaryCell = mix(6.15, 4.95, resolutionFactor);
    float contourCell = mix(5.25, 4.25, resolutionFactor);
    float detailCell  = mix(4.25, 3.45, resolutionFactor);

    // Broad face priority mask. It only increases micro-detail; it never hides the portrait.
    vec2 faceCoord = (uv - vec2(0.50, 0.67)) * vec2(1.05, 1.22);
    float faceZone = 1.0 - smoothstep(0.19, 0.46, length(faceCoord));

    // Broad centered subject mask: keeps head/shoulders strong, quiets the flat room/background.
    vec2 subjectCoord = (uv - vec2(0.50, 0.49)) * vec2(0.92, 0.72);
    float subjectZone = 1.0 - smoothstep(0.34, 0.73, length(subjectCoord));

    // ---------------- PRIMARY DOT FIELD ----------------
    vec2 primaryId = floor(px / primaryCell);
    vec2 primaryCenterPx = (primaryId + 0.5) * primaryCell;

    // Tiny deterministic jitter breaks the mechanical print-grid feel without creating noise.
    vec2 jitter = vec2(
      hash(primaryId + vec2(0.31, 1.73)),
      hash(primaryId + vec2(4.91, 2.17))
    ) - 0.5;
    primaryCenterPx += jitter * primaryCell * 0.045;

    vec2 primaryUv = primaryCenterPx / u_resolution;
    vec2 primaryImageUv = coverUv(primaryUv);
    vec4 texel = texture2D(u_texture, primaryImageUv);
    float luma = luminance(texel.rgb);

    vec2 localStep = vec2(primaryCell / u_resolution.x, primaryCell / u_resolution.y) * 0.74;
    float gx = sampledLuma(primaryUv + vec2(localStep.x, 0.0)) -
               sampledLuma(primaryUv - vec2(localStep.x, 0.0));
    float gy = sampledLuma(primaryUv + vec2(0.0, localStep.y)) -
               sampledLuma(primaryUv - vec2(0.0, localStep.y));
    float edgeFine = clamp(length(vec2(gx, gy)) * 3.15, 0.0, 1.0);

    vec2 broadStep = vec2(primaryCell * 1.65 / u_resolution.x, primaryCell * 1.65 / u_resolution.y);
    float bgx = sampledLuma(primaryUv + vec2(broadStep.x, 0.0)) -
                sampledLuma(primaryUv - vec2(broadStep.x, 0.0));
    float bgy = sampledLuma(primaryUv + vec2(0.0, broadStep.y)) -
                sampledLuma(primaryUv - vec2(0.0, broadStep.y));
    float edgeBroad = clamp(length(vec2(bgx, bgy)) * 2.05, 0.0, 1.0);

    float contour = max(edgeFine * 0.70, edgeBroad);

    // Mid-tone curve: avoids white forehead / black facial voids.
    float tone = pow(clamp(luma, 0.0, 1.0), 0.96);
    tone = smoothstep(0.035, 0.955, tone);
    float midTone = 1.0 - abs(tone * 2.0 - 1.0);

    float primaryRadius =
      primaryCell * (0.060 + tone * 0.286 + contour * 0.070 + midTone * 0.018);
    primaryRadius = min(primaryRadius, primaryCell * 0.438);

    float primaryDot = dotMask(px, primaryCell, primaryRadius);

    // ---------------- CONTOUR FIELD ----------------
    vec2 contourId = floor(px / contourCell);
    vec2 contourCenterPx = (contourId + 0.5) * contourCell;
    vec2 contourUv = contourCenterPx / u_resolution;

    vec2 contourStep = vec2(contourCell / u_resolution.x, contourCell / u_resolution.y) * 0.92;
    float cgx = sampledLuma(contourUv + vec2(contourStep.x, 0.0)) -
                sampledLuma(contourUv - vec2(contourStep.x, 0.0));
    float cgy = sampledLuma(contourUv + vec2(0.0, contourStep.y)) -
                sampledLuma(contourUv - vec2(0.0, contourStep.y));
    float contourEdge = clamp(length(vec2(cgx, cgy)) * 3.85, 0.0, 1.0);

    float contourRadius = contourCell * (0.054 + contourEdge * 0.205);
    contourRadius = min(contourRadius, contourCell * 0.31);
    float contourDot =
      dotMask(px, contourCell, contourRadius) *
      smoothstep(0.18, 0.72, contourEdge);

    // ---------------- MICRO DETAIL FIELD ----------------
    vec2 detailId = floor(px / detailCell);
    vec2 detailCenterPx = (detailId + 0.5) * detailCell;
    vec2 detailUv = detailCenterPx / u_resolution;
    float detailLuma = sampledLuma(detailUv);

    vec2 detailStep = vec2(detailCell / u_resolution.x, detailCell / u_resolution.y) * 0.88;
    float dgx = sampledLuma(detailUv + vec2(detailStep.x, 0.0)) -
                sampledLuma(detailUv - vec2(detailStep.x, 0.0));
    float dgy = sampledLuma(detailUv + vec2(0.0, detailStep.y)) -
                sampledLuma(detailUv - vec2(0.0, detailStep.y));
    float detailEdge = clamp(length(vec2(dgx, dgy)) * 4.25, 0.0, 1.0);

    float detailMid = 1.0 - abs(detailLuma * 2.0 - 1.0);
    float detailPresence =
      faceZone *
      smoothstep(0.20, 0.77, detailEdge * 0.78 + detailMid * 0.38);

    float detailRadius =
      detailCell * (0.045 + detailLuma * 0.115 + detailEdge * 0.080);
    detailRadius = min(detailRadius, detailCell * 0.285);

    float detailDot = dotMask(px, detailCell, detailRadius) * detailPresence;

    // ---------------- MASK / FRAME DISSOLVE ----------------
    float edgeFadeX =
      smoothstep(0.015, 0.11, primaryUv.x) *
      smoothstep(0.015, 0.11, 1.0 - primaryUv.x);
    float edgeFadeY =
      smoothstep(0.01, 0.095, primaryUv.y) *
      smoothstep(0.01, 0.095, 1.0 - primaryUv.y);
    float frameFade = edgeFadeX * edgeFadeY;

    // Suppress the darkest background while preserving silhouette edges.
    float portraitPresence =
      max(smoothstep(0.055, 0.235, tone), contour * 0.94);

    float structuredArea = smoothstep(0.10, 0.52, contour + midTone * 0.20);
    float backgroundAttenuation =
      mix(0.30, 1.0, max(subjectZone, structuredArea * 0.72));

    portraitPresence *= backgroundAttenuation;
    portraitPresence *= mix(0.24, 1.0, texel.a);
    portraitPresence *= frameFade;

    // ---------------- ACQUISITION REVEAL ----------------
    float scanY = 1.15 - u_progress * 1.30;
    float reveal = smoothstep(scanY - 0.080, scanY + 0.024, primaryUv.y);
    float scanLine =
      exp(-abs(primaryUv.y - scanY) * 84.0) *
      smoothstep(0.02, 0.30, u_progress) *
      (1.0 - smoothstep(0.89, 1.0, u_progress));

    // ---------------- COLOR SYSTEM ----------------
    vec3 deepGraphite = vec3(0.027, 0.032, 0.030);
    vec3 ivory = vec3(0.875, 0.865, 0.835);
    vec3 midIvory = vec3(0.565, 0.585, 0.570);
    vec3 dimIvory = vec3(0.355, 0.380, 0.368);
    vec3 signal = vec3(0.847, 1.0, 0.47);

    vec3 primaryColor =
      mix(dimIvory, ivory, clamp(tone * 0.94 + contour * 0.31 + midTone * 0.07, 0.0, 1.0));
    vec3 contourColor = mix(midIvory, ivory, contourEdge * 0.88);
    vec3 detailColor = mix(midIvory, ivory, clamp(detailEdge * 0.72 + detailMid * 0.28, 0.0, 1.0));

    // Signal nodes are rare and contour-aware, not random decoration.
    float nodeSeed = hash(primaryId * 0.731 + vec2(17.0, 41.0));
    float signalNode =
      step(0.9915, nodeSeed) *
      smoothstep(0.28, 0.82, contour + tone * 0.12);

    float pointerNode =
      pointerInfluence *
      smoothstep(0.34, 0.86, contour) *
      0.58;

    float nodeMix = clamp(max(signalNode, pointerNode), 0.0, 0.88);
    primaryColor = mix(primaryColor, signal, nodeMix);
    contourColor = mix(contourColor, signal, nodeMix * 0.82);

    float visiblePrimary = primaryDot * portraitPresence * reveal;
    float visibleContour = contourDot * portraitPresence * reveal;
    float visibleDetail  = detailDot * portraitPresence * reveal * 0.80;

    // Very quiet technical grid.
    vec2 grid = abs(fract(v_uv * u_resolution / 32.0) - 0.5);
    float gridLine = smoothstep(0.478, 0.50, max(grid.x, grid.y)) * 0.020;

    vec3 color = deepGraphite + vec3(gridLine);

    // Negative halo behind the head: depth without glow or extra GPU passes.
    vec2 haloCoord = (uv - vec2(0.50, 0.66)) * vec2(1.05, 1.18);
    float halo = 1.0 - smoothstep(0.12, 0.46, length(haloCoord));
    color *= 1.0 - halo * 0.20;

    color = mix(color, primaryColor, visiblePrimary);
    color = mix(color, contourColor, visibleContour * 0.88);
    color = mix(color, detailColor, visibleDetail * 0.60);

    // Contour lift and acquisition signal.
    color += ivory * visibleContour * 0.042;
    color += signal * scanLine * 0.165;
    color += signal * pointerInfluence * visibleContour * 0.055;

    // Tiny final-state identity pulse only while we are actively rendering.
    float identityPulse =
      (0.5 + 0.5 * sin(u_time * 5.0)) *
      smoothstep(0.78, 1.0, u_progress) *
      (1.0 - smoothstep(0.995, 1.0, u_progress));
    color += signal * identityPulse * signalNode * 0.05;

    gl_FragColor = vec4(color, 1.0);
  }
`

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
  const revealDuration = 1780;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const maxDpr = compactViewport ? 1.0 : 1.30;
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
