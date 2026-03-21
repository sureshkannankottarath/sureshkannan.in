"use client";

import { useState, useEffect } from "react";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">

            {/* Background CSS Particles */}
            {mounted && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* We'll create several particle elements animated via CSS */}
                    {[...Array(40)].map((_, i) => {
                        // Calculate random positions and animation properties directly in style
                        const size = Math.random() * 3 + 1; // 1px to 4px
                        const startX = Math.random() * 100; // 0% to 100%
                        const startY = Math.random() * 100; // 0% to 100%
                        const duration = Math.random() * 20 + 20; // 20s to 40s
                        const delay = Math.random() * -40; // Starts at random point in animation
                        const alpha = Math.random() * 0.5 + 0.1;

                        return (
                            <div
                                key={i}
                                className="absolute rounded-full bg-accent-blue animate-particle"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    left: `${startX}%`,
                                    top: `${startY}%`,
                                    opacity: alpha,
                                    animationDuration: `${duration}s`,
                                    animationDelay: `${delay}s`,
                                    // We use custom properties to pass random directions to keyframes
                                    "--tx": `${(Math.random() - 0.5) * 40}vw`,
                                    "--ty": `${(Math.random() - 0.5) * 40}vh`
                                } as React.CSSProperties}
                            />
                        );
                    })}
                </div>
            )}

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
