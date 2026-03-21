"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Brain, Blocks, Database, Code2, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32">
            {/* Background CSS Particles */}
            {mounted && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {[...Array(40)].map((_, i) => {
                        const size = Math.random() * 3 + 1;
                        const startX = Math.random() * 100;
                        const startY = Math.random() * 100;
                        const duration = Math.random() * 20 + 20;
                        const delay = Math.random() * -40;
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

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center md:text-left">
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
                            <p className="text-xl md:text-2xl text-text-muted font-light max-w-2xl mx-auto md:mx-0 mb-8">
                                AI Engineer · PM · <span className="text-text-primary">Builder of intelligent systems</span>
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delayMs={340}>
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mb-12">
                                <a
                                    href="#projects"
                                    className="px-8 py-3 rounded-full bg-accent-blue text-white hover:bg-accent-blue/90 font-medium transition-all hover:scale-105 active:scale-95 shadow-md shadow-accent-blue/20"
                                >
                                    View My Work
                                </a>
                                <a
                                    href="#contact"
                                    className="px-8 py-3 rounded-full border border-black/10 hover:border-accent-blue text-text-primary hover:bg-accent-blue/5 font-medium transition-all hover:scale-105 active:scale-95"
                                >
                                    Let&apos;s Connect
                                </a>
                            </div>
                        </AnimatedSection>

                        {/* Skills Section inside Hero */}
                        <AnimatedSection delayMs={420}>
                            <div className="pt-8 border-t border-black/5 inline-block">
                                <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Core Expertise</p>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    {[
                                        { name: "Enterprise AI", icon: Brain },
                                        { name: "System Architecture", icon: Blocks },
                                        { name: "RAG & LLM", icon: Database },
                                        { name: "Full-Stack Setup", icon: Code2 },
                                        { name: "Cybersecurity", icon: ShieldCheck }
                                    ].map((skill, index) => {
                                        const Icon = skill.icon;
                                        return (
                                            <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-black/5 text-sm font-medium text-text-primary group hover:border-accent-blue/50 transition-colors bg-black/5 backdrop-blur-sm">
                                                <Icon className="w-4 h-4 text-accent-blue group-hover:text-accent-green transition-colors" />
                                                <span>{skill.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Right: Profile Image */}
                    <div className="flex-1 w-full max-w-sm md:max-w-md lg:max-w-lg mb-8 md:mb-0">
                        <AnimatedSection delayMs={200}>
                            <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden glass-card border border-black/10 p-2 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-accent-green/20 animate-pulse pointer-events-none rounded-[2rem]"></div>
                                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-black/5 bg-bg-secondary">
                                    <Image
                                        src="/images/profile.png"
                                        alt="Suresh Kannan K - AI Engineer"
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                </div>
            </div>
        </section>
    );
}
