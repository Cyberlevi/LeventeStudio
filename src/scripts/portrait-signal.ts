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

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotation = mat2(0.82, -0.57, 0.57, 0.82);

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.03 + 11.7;
      amplitude *= 0.5;
    }

    return value;
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

  void main() {
    vec2 uv = v_uv;
    vec2 imageUv = coverUv(uv);

    float t = u_time * 0.18;
    float field = fbm(uv * vec2(4.2, 5.4) + vec2(t * 0.18, -t * 0.12));
    float detail = noise(uv * 18.0 + vec2(-t * 0.3, t * 0.22));

    vec2 pointer = u_pointer;
    float pointerDistance = distance(uv, pointer);
    float pointerInfluence = exp(-pointerDistance * 7.5) * u_energy;

    float revealDistortion = (1.0 - u_progress) * 0.055;
    float pointerDistortion = pointerInfluence * 0.020;
    float distortion = revealDistortion + pointerDistortion;

    vec2 flow = vec2(
      field - 0.5 + sin((uv.y + field) * 17.0 + t) * 0.12,
      detail - 0.5 + cos((uv.x - field) * 15.0 - t) * 0.10
    );

    imageUv += flow * distortion;

    vec4 texel = texture2D(u_texture, imageUv);
    float gray = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
    vec3 color = mix(vec3(gray), texel.rgb, 0.07);

    float revealNoise = fbm(uv * vec2(3.4, 4.6) + vec2(0.0, t * 0.08));
    float reveal = smoothstep(revealNoise - 0.11, revealNoise + 0.09, u_progress * 1.08);

    float edge = 1.0 - smoothstep(0.0, 0.055, abs((u_progress * 1.08) - revealNoise));
    edge *= 1.0 - smoothstep(0.88, 1.0, u_progress);

    vec3 signal = vec3(0.847, 1.0, 0.47);
    color += signal * edge * 0.34;

    float scan = 0.5 + 0.5 * sin(gl_FragCoord.y * 0.55 + u_time * 6.0);
    color += signal * scan * pointerInfluence * 0.018;

    float pointerGlow = exp(-pointerDistance * 10.0) * pointerInfluence;
    color += signal * pointerGlow * 0.025;

    gl_FragColor = vec4(color, texel.a * reveal);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
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

  if (reducedMotion || coarsePointer || compactViewport) return;

  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
    premultipliedAlpha: true,
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

  let pointerX = 0.72;
  let pointerY = 0.42;
  let targetX = pointerX;
  let targetY = pointerY;
  let energy = 0;
  let targetEnergy = 0;
  let progress = 0;
  let raf = 0;
  let visible = false;
  let revealStartedAt = 0;
  let lastFrame = 0;
  let textureReady = false;
  const revealDuration = 1080;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.3);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width === width && canvas.height === height) return;

    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  };

  const needsAnimation = () =>
    progress < 0.999 ||
    Math.abs(targetX - pointerX) > 0.001 ||
    Math.abs(targetY - pointerY) > 0.001 ||
    Math.abs(targetEnergy - energy) > 0.008 ||
    energy > 0.008;

  const draw = (now: number) => {
    raf = 0;

    if (!visible || !textureReady) return;

    if (now - lastFrame < 32 && needsAnimation()) {
      raf = requestAnimationFrame(draw);
      return;
    }

    lastFrame = now;
    resize();

    if (revealStartedAt > 0 && progress < 1) {
      const elapsed = Math.min(1, (now - revealStartedAt) / revealDuration);
      progress = 1 - Math.pow(1 - elapsed, 3);
    }

    pointerX += (targetX - pointerX) * 0.09;
    pointerY += (targetY - pointerY) * 0.09;
    energy += (targetEnergy - energy) * 0.085;

    if (targetEnergy === 0 && energy < 0.01) energy = 0;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1i(locations.texture, 0);
    gl.uniform2f(locations.resolution, canvas.width, canvas.height);
    gl.uniform2f(locations.imageResolution, image.naturalWidth, image.naturalHeight);
    gl.uniform2f(locations.pointer, pointerX, pointerY);
    gl.uniform1f(locations.progress, progress);
    gl.uniform1f(locations.time, now / 1000);
    gl.uniform1f(locations.energy, energy);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

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
    root.dataset.portraitSignalReady = 'true';
    canvas.style.opacity = '1';
    requestDraw();
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = root.getBoundingClientRect();
    targetX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    targetY = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
    targetEnergy = 1;
    requestDraw();
  };

  const onPointerLeave = () => {
    targetX = 0.72;
    targetY = 0.42;
    targetEnergy = 0;
    requestDraw();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        if (!revealStartedAt) revealStartedAt = performance.now();
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

  root.addEventListener('pointermove', onPointerMove, { passive: true });
  root.addEventListener('pointerleave', onPointerLeave);
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
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
    },
    { once: true },
  );
}

document.querySelectorAll<HTMLElement>('[data-portrait-signal]').forEach(initPortraitSignal);
