// src/components/reactbits/Topography.jsx
import React, { useEffect, useRef } from 'react';

export function Topography({
  color = '#10b981',
  lineCount = 26,
  speed = 0.25,
  opacity = 0.8,
  className = '',
  style = {}
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientHeight ? canvas.parentElement.clientWidth : window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight ? canvas.parentElement.clientHeight : window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let step = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      step += speed * 0.015;
      ctx.clearRect(0, 0, width, height);

      // --- EFEK CAHAYA PENDAR BERGERAK ---
      const glowX = width * 0.5 + Math.sin(step * 0.4) * (width * 0.25);
      const glowY = height * 0.4 + Math.cos(step * 0.3) * (height * 0.2);
      
      const bgGlow = ctx.createRadialGradient(glowX, glowY, 50, glowX, glowY, Math.max(width, height) * 0.5);
      bgGlow.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
      bgGlow.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // --- RENDERING GARIS TOPOGRAFI ---
      const lines = lineCount;
      const spacing = height / lines;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const yBase = i * spacing;
        const lineDepthRatio = i / lines;
        const lineFade = Math.sin(lineDepthRatio * Math.PI);

        for (let x = 0; x <= width; x += 15) {
          const distX = x - mouseX;
          const distY = yBase - mouseY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const mouseEffect = Math.max(0, 1 - dist / 300) * 45;

          const wave1 = Math.sin(x * 0.005 + step + i * 0.35);
          const wave2 = Math.cos(x * 0.008 - step * 0.6 + i * 0.2);
          const wave3 = Math.sin((x + yBase) * 0.003 + step * 0.8);

          const y = yBase + (wave1 * 22 + wave2 * 18 + wave3 * 10) - mouseEffect;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.1 + lineFade * 0.5;
        ctx.globalAlpha = Math.max(0.1, lineFade * 0.85);
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = i % 3 === 0 ? 8 : 0;

        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      // --- EFEK VIGNETTE FADE ---
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.3,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, 'rgba(2, 6, 23, 0)');
      vignette.addColorStop(1, 'rgba(2, 6, 23, 0.85)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, lineCount, speed]);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ease-out ${className}`} 
      style={{ opacity, ...style }}
    >
      <canvas ref={canvasRef} className="block w-full h-full animate-fade-in" />
    </div>
  );
}

export default Topography;