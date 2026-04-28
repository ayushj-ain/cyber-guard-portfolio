import { useEffect, useRef } from "react";

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let cols = 0;
    let drops: number[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / 20);
      drops = Array(cols).fill(1);
    };
    init();
    window.addEventListener("resize", init);

    const chars = "アイウエオカキクケコ01ABCDEF0123456789<>{}[]/?!@#$%^&*";
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0,3,5,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px 'JetBrains Mono', monospace";
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() < 0.05 ? "#F4A53C" : "#10D9A4";
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 55);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.13, zIndex: 0 }}
    />
  );
};
