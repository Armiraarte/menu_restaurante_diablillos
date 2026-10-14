import { useEffect, useRef } from 'react';

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
// 0 = fondo normal, 1 = fuego llenando toda la pantalla (intro).
uniform float uIntro;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

// Ruido de crestas: líneas finas que parecen grietas en la roca.
float ridge(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) { v += a * (1.0 - abs(noise(p) * 2.0 - 1.0)); p = m * p; a *= 0.5; }
  return v;
}

vec3 fireColor(float t) {
  t = clamp(t, 0.0, 1.0);
  return vec3(min(1.0, t * 1.9), pow(t, 2.2) * 1.25, pow(t, 5.0) * 1.1);
}

vec3 lava(float t) {
  t = clamp(t, 0.0, 1.0);
  return vec3(min(1.0, t * 1.8), pow(t, 2.0) * 1.1, pow(t, 5.0) * 0.8);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime;

  // Roca volcánica oscura.
  float r = fbm(p * vec2(3.0, 5.0));
  float grain = fbm(p * 14.0);
  vec3 col = vec3(0.035, 0.028, 0.026) * (0.5 + r * 0.9 + grain * 0.3);

  // Calor que sube desde el fondo (1 abajo, 0 arriba).
  float heat = pow(1.0 - uv.y, 3.0);

  // Grietas con lava que laten despacio, más vivas cerca del fondo.
  float vein = smoothstep(0.82, 0.97, ridge(p * vec2(4.0, 6.0)));
  float pulse = 0.6 + 0.4 * sin(t * 0.8 + p.x * 3.0 + p.y * 2.0);
  col += lava(0.55) * vein * (0.05 + heat * 0.5) * pulse;

  // Paredes iluminadas por la lava de abajo.
  col += vec3(0.35, 0.06, 0.0) * heat * (0.4 + r * 0.6) * 0.5;

  // Resplandor de lava al fondo, solo color.
  float n = fbm(vec2(p.x * 2.5 + t * 0.05, p.y * 4.0 - t * 0.15));
  float pool = 1.0 - smoothstep(0.0, 0.3, uv.y + (n - 0.5) * 0.12);
  col += lava(pool * (0.5 + n * 0.6)) * 0.45;

  // Alcance de las flamas en cada punto del ancho: una hilera baja constante
  // más llamaradas altas que salen de repente en lugares al azar.
  float reach = 0.12 + uIntro * 2.4;
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float period = 5.0 + fk * 1.7;
    float cycle = floor((t + fk * 2.3) / period);
    float life = fract((t + fk * 2.3) / period) * period;
    float env = smoothstep(0.0, 0.7, life) * (1.0 - smoothstep(1.6, 3.2, life));
    float x0 = (0.1 + 0.8 * hash(vec2(cycle, fk + 7.0))) * aspect;
    float dx = (p.x - x0) / 0.16;
    reach += env * 1.3 * exp(-dx * dx);
  }

  // Flamas con ruido deformado, como fuego real.
  vec2 fp = p * 6.0;
  vec2 q = vec2(fp.x * 1.2, fp.y * 0.9 - t * 1.6);
  float fn = fbm(q * 1.4 + vec2(fbm(q * 1.0 + t * 0.3) * 1.4, 0.0));
  float flame = clamp(fn * 1.8 - uv.y / reach * 1.2 - 0.25, 0.0, 1.0);
  col += fireColor(flame);

  // Brasas que flotan hacia arriba.
  for (int i = 0; i < 14; i++) {
    float fi = float(i);
    float h = hash(vec2(fi, 5.0));
    float life = fract(t * (0.04 + h * 0.05) + hash(vec2(fi, 9.0)));
    vec2 pos = vec2(hash(vec2(fi, 1.0)) * aspect + sin(t + fi) * 0.02, life * 1.1);
    float s = 1.0 - smoothstep(0.0, 0.003 + 0.003 * h, length(p - pos));
    col += vec3(1.0, 0.45, 0.1) * s * (1.0 - life) * 0.8;
  }

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'shader error');
  }
  return shader;
}

// Duración de la subida del fuego en la intro y de su bajada al terminar.
const INTRO_RISE_MS = 900;
const INTRO_FALL_MS = 1400;

const smoothstep = (x: number) => {
  const c = Math.min(Math.max(x, 0), 1);
  return c * c * (3 - 2 * c);
};

export function VolcanoBackground({ intro = false }: { intro?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Momento (ms desde que inició) en que termina la intro y el fuego empieza a bajar.
  const introEndRef = useRef(intro ? Infinity : 0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    if (!intro) introEndRef.current = Math.min(introEndRef.current, performance.now() - startRef.current);
  }, [intro]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext('webgl', { antialias: false });
    if (!gl) return;

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      gl.useProgram(program);
    } catch (err) {
      console.error(err);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uIntro = gl.getUniformLocation(program, 'uIntro');

    // Es un fondo suave: se dibuja a menor resolución para cuidar la batería.
    const scale = Math.min(window.devicePixelRatio || 1, 2) * 0.6;
    const resize = () => {
      const w = Math.round(canvas.clientWidth * scale);
      const h = Math.round(canvas.clientHeight * scale);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const start = startRef.current;

    const draw = () => {
      const elapsed = performance.now() - start;
      const introLevel = reduceMotion
        ? 0
        : smoothstep(elapsed / INTRO_RISE_MS) * (1 - smoothstep((elapsed - introEndRef.current) / INTRO_FALL_MS));
      gl.uniform1f(uIntro, introLevel);
      gl.uniform1f(uTime, reduceMotion ? 10 : elapsed / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion && !document.hidden) frame = requestAnimationFrame(draw);
    };

    // Pausar cuando la pestaña o la app no están visibles.
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) draw();
    };
    document.addEventListener('visibilitychange', onVisibility);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 h-full w-full" aria-hidden="true" />
  );
}
