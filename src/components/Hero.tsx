"use client";

import { useEffect, useRef } from "react";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number }[] = [];

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      />

      {/* Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-blue/20 rounded-full blur-[120px] -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-green/20 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <AnimatedSection delayMs={100}>
          <p className="text-accent-blue font-mono mb-4 text-sm md:text-base tracking-wider uppercase">
            Hey, I&apos;m
          </p>
        </AnimatedSection>

        <AnimatedSection delayMs={180}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-syne tracking-tighter mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-accent-blue to-accent-green animate-shimmer">
              Suresh Kannan K
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delayMs={260}>
          <p className="text-xl md:text-2xl text-text-muted font-light max-w-2xl mx-auto mb-10">
            AI Engineer · PM · <span className="text-text-primary">Builder of intelligent systems</span>
          </p>
        </AnimatedSection>

        <AnimatedSection delayMs={340}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-text-primary font-medium transition-all hover:scale-105 active:scale-95"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full border border-text-muted hover:border-accent-green text-text-muted hover:text-accent-green font-medium transition-all hover:scale-105 active:scale-95"
            >
              Let&apos;s Connect
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
