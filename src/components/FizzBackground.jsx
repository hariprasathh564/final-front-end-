import React, { useEffect, useRef } from "react";

export default function FizzBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 300,
      r: Math.random() * 4 + 2,
      speed: Math.random() * 0.7 + 0.3,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();

        b.y -= b.speed;
        if (b.y < -50) b.y = canvas.height + 100;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-30"
    />
  );
}
