const vertexSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_pointer;
  uniform float u_energy;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
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
    mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.03 + 17.1;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.07;

    vec2 pointer = (u_pointer * 2.0 - 1.0);
    pointer.x *= u_resolution.x / u_resolution.y;

    float distToPointer = length(p - pointer);
    float pointerPull = exp(-distToPointer * 2.8) * 0.07 * u_energy;
    p += normalize(p - pointer + vec2(0.001)) * pointerPull;

    vec2 flow = p;
    flow.x += 0.20 * sin(flow.y * 1.35 + t * 1.4);
    flow.y += 0.16 * sin(flow.x * 1.1 - t);

    float n1 = fbm(flow * 1.25 + vec2(t, -t * 0.35));
    float n2 = fbm(flow * 2.1 - vec2(t * 0.45, t * 0.20));

    float ridgeBase = p.y + 0.42 + 0.17 * sin(p.x * 1.7 + n1 * 2.7 + t);
    float ridge = abs(ridgeBase);
    float ribbon = exp(-ridge * 4.4);
    float inner = exp(-ridge * 13.0);
    float filament = smoothstep(0.69, 0.98, sin((p.x * 11.0 + n2 * 5.0 - t * 4.0))) * ribbon;

    float field = ribbon * (0.44 + n1 * 0.52);
    float signal = field + inner * 0.42 + filament * 0.12;

    float rightBias = smoothstep(-0.35, 1.0, p.x);
    float bottomBias = 1.0 - smoothstep(-0.85, 0.75, p.y);
    signal *= mix(0.66, 1.0, rightBias * bottomBias);

    vec3 graphite = vec3(0.043, 0.051, 0.047);
    vec3 graphiteSoft = vec3(0.073, 0.086, 0.078);
    vec3 lime = vec3(0.847, 1.0, 0.47);
    vec3 limeDeep = vec3(0.40, 0.54, 0.18);

    vec3 color = mix(graphite, graphiteSoft, n1 * 0.26);
    color += limeDeep * signal * 0.20;
    color += lime * pow(signal, 2.15) * 0.42;

    float gridX = smoothstep(0.985, 1.0, abs(sin((uv.x + n1 * 0.015) * 44.0)));
    float gridY = smoothstep(0.988, 1.0, abs(sin((uv.y + n2 * 0.010) * 32.0)));
    color += lime * ((gridX + gridY) * ribbon * 0.035);

    float grain = hash(gl_FragCoord.xy + fract(u_time) * 43.0) - 0.5;
    color += grain * 0.018;

    float vignette = 1.0 - smoothstep(0.28, 1.28, length((uv - 0.5) * vec2(1.0, 0.82)));
    color *= mix(0.55, 1.0, vignette);

    float leftQuiet = smoothstep(-1.15, 0.10, p.x);
    color = mix(graphite, color, mix(0.34, 1.0, leftQuiet));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function initSignalField(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('.signal-field__canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
  });

  if (!gl) return;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  if (!program) return;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const pointerLocation = gl.getUniformLocation(program, 'u_pointer');
  const energyLocation = gl.getUniformLocation(program, 'u_energy');

  let pointerX = 0.72;
  let pointerY = 0.36;
  let targetX = pointerX;
  let targetY = pointerY;
  let energy = 0;
  let targetEnergy = 0;
  let raf = 0;
  let visible = true;
  let lastFrame = 0;
  const startedAt = performance.now();

  const resize = () => {
    const rect = root.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width === width && canvas.height === height) return;

    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = root.getBoundingClientRect();
    targetX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    targetY = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
    targetEnergy = 1;
  };

  const onPointerLeave = () => {
    targetX = 0.72;
    targetY = 0.36;
    targetEnergy = 0;
  };

  const render = (now: number) => {
    if (!visible) return;

    if (now - lastFrame < 33) {
      raf = requestAnimationFrame(render);
      return;
    }

    lastFrame = now;
    resize();

    pointerX += (targetX - pointerX) * 0.035;
    pointerY += (targetY - pointerY) * 0.035;
    energy += (targetEnergy - energy) * 0.04;

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, (now - startedAt) / 1000);
    gl.uniform2f(pointerLocation, pointerX, pointerY);
    gl.uniform1f(energyLocation, energy);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    raf = requestAnimationFrame(render);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;

      if (visible && !raf) {
        raf = requestAnimationFrame(render);
      } else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { rootMargin: '120px 0px' },
  );

  const onVisibilityChange = () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!document.hidden && visible && !raf) {
      raf = requestAnimationFrame(render);
    }
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('blur', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);
  observer.observe(root);

  resize();
  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
  gl.uniform1f(timeLocation, 0);
  gl.uniform2f(pointerLocation, pointerX, pointerY);
  gl.uniform1f(energyLocation, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  root.dataset.signalWebgl = 'true';

  raf = requestAnimationFrame(render);

  window.addEventListener(
    'pagehide',
    () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    },
    { once: true },
  );
}

export function initSignalFields() {
  document.querySelectorAll<HTMLElement>('.signal-field').forEach((root) => {
    if (root.dataset.signalReady) return;
    root.dataset.signalReady = 'true';
    initSignalField(root);
  });
}
