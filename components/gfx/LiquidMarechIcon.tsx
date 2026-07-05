"use client";
import { useEffect, useRef, useState } from "react";
import { useGfxTier } from "./useGfxTier";

/**
 * Molten-metal treatment of the Marech icon. Original WebGL2 shader written
 * for this project (no third-party shader code): the icon SVG is rasterized
 * into an alpha mask, then a flowing value-noise field drives a fake-normal
 * metallic ramp through the brand rust palette inside the mask.
 *
 * Used sparingly: Footer brand block and the 404 page. Devices that don't
 * earn WebGL (useGfxTier) render the plain icon <img> instead.
 */
export default function LiquidMarechIcon({ size = 40 }: { size?: number }) {
  const tier = useGfxTier();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (tier !== "full" || failed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true });
    if (!gl) {
      setFailed(true);
      return;
    }

    let raf = 0;
    let disposed = false;

    const vert = `#version 300 es
      in vec2 p; out vec2 uv;
      void main() { uv = p * 0.5 + 0.5; uv.y = 1.0 - uv.y; gl_Position = vec4(p, 0.0, 1.0); }`;

    const frag = `#version 300 es
      precision highp float;
      in vec2 uv; out vec4 frag;
      uniform sampler2D mask; uniform float t;

      float hash(vec2 q) { return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
      float vnoise(vec2 q) {
        vec2 i = floor(q), f = fract(q);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1, 0)), f.x),
          mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x),
          f.y
        );
      }
      float fbm(vec2 q) {
        float v = 0.0, a = 0.55;
        for (int k = 0; k < 4; k++) { v += a * vnoise(q); q *= 2.1; a *= 0.5; }
        return v;
      }

      void main() {
        // Slow molten flow distorts the sampling position.
        vec2 flow = vec2(fbm(uv * 3.0 + t * 0.08), fbm(uv * 3.0 - t * 0.06 + 7.3));
        vec2 duv = uv + (flow - 0.5) * 0.05;
        float a = texture(mask, duv).a;
        if (a < 0.02) { frag = vec4(0.0); return; }

        // Fake normal from the noise gradient -> specular metal ramp.
        float e = 0.012;
        float n0 = fbm(duv * 5.0 + t * 0.1);
        float nx = fbm(duv * 5.0 + vec2(e, 0.0) + t * 0.1) - n0;
        float ny = fbm(duv * 5.0 + vec2(0.0, e) + t * 0.1) - n0;
        vec3 N = normalize(vec3(-nx / e, -ny / e, 6.0));
        vec3 L = normalize(vec3(-0.5, 0.7, 0.6));
        vec3 V = vec3(0.0, 0.0, 1.0);
        float diff = max(dot(N, L), 0.0);
        float spec = pow(max(dot(N, normalize(L + V)), 0.0), 24.0);

        vec3 deep  = vec3(0.35, 0.10, 0.04);  // dark oxide
        vec3 rust  = vec3(0.886, 0.337, 0.165); // mars-rust
        vec3 ember = vec3(1.0, 0.541, 0.357);   // mars-ember
        vec3 col = mix(deep, rust, diff);
        col = mix(col, ember, smoothstep(0.55, 1.0, diff));
        col += spec * vec3(1.0, 0.92, 0.85) * 0.9;

        frag = vec4(col * a, a);
      }`;

    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) throw new Error(String(gl!.getShaderInfoLog(sh)));
      return sh;
    }

    try {
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(String(gl.getProgramInfoLog(prog)));
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const tLoc = gl.getUniformLocation(prog, "t");

      // Rasterize the white icon SVG into an alpha-mask texture.
      const img = new Image();
      img.src = "/logos/marech-icon-white.svg";
      img.onload = () => {
        if (disposed) return;
        const px = size * 2;
        const off = document.createElement("canvas");
        off.width = px;
        off.height = px;
        const ctx = off.getContext("2d")!;
        ctx.drawImage(img, 0, 0, px, px);

        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.viewport(0, 0, canvas.width, canvas.height);
        const start = performance.now();
        const draw = () => {
          if (disposed) return;
          gl.uniform1f(tLoc, (performance.now() - start) / 1000);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          raf = requestAnimationFrame(draw);
        };
        draw();
      };
      img.onerror = () => setFailed(true);
    } catch {
      setFailed(true);
      return;
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, [tier, failed, size]);

  if (tier !== "full" || failed) {
    return <img src="/logos/marech-icon-color.svg" width={size} height={size} alt="" />;
  }
  return (
    <canvas
      ref={canvasRef}
      width={size * 2}
      height={size * 2}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
