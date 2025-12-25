"use client";

import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[];

    const options = {
      particleColor: "rgba(124, 58, 237, 0.7)", // primary color
      lineColor: "rgba(37, 99, 235, 0.5)", // accent color
      particleAmount: 50,
      defaultRadius: 2,
      variantRadius: 2,
      defaultSpeed: 0.5,
      variantSpeed: 0.5,
      linkRadius: 200,
    };
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      directionAngle: number;
      vector: { x: number; y: number };

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = options.defaultRadius + Math.random() * options.variantRadius;
        this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.vector = {
          x: Math.cos(this.directionAngle) * this.speed,
          y: Math.sin(this.directionAngle) * this.speed,
        };
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = options.particleColor;
        ctx.fill();
      }
      
      update() {
        this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
      }

      border() {
        if (this.x >= canvas.width || this.x <= 0) {
          this.vector.x *= -1;
        }
        if (this.y >= canvas.height || this.y <= 0) {
          this.vector.y *= -1;
        }
        if (this.x > canvas.width) this.x = canvas.width;
        if (this.y > canvas.height) this.y = canvas.height;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
      }
    }

    const linkParticles = (particles: Particle[]) => {
      if(!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);

          if (dist < options.linkRadius) {
            ctx.strokeStyle = options.lineColor;
            ctx.lineWidth = 1 - dist / options.linkRadius;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    };
    
    const setup = () => {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle());
      }
      animate();
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      linkParticles(particles);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    setup();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
