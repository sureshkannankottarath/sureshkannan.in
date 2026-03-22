"use client";

import Image from "next/image";
import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import { getProxiedImage } from "@/lib/image";
import { SiPython, SiNextdotjs, SiOpenai, SiFastapi, SiDocker } from "react-icons/si";
import { FaDatabase, FaRobot, FaBrain, FaMagnifyingGlass, FaLeaf, FaShieldHalved } from "react-icons/fa6";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
        case "rag": return <FaBrain className="w-4 h-4 text-[#8B5CF6]" />;
        case "python": return <SiPython className="w-4 h-4 text-[#3776AB]" />;
        case "chromadb": return <FaDatabase className="w-4 h-4 text-[#FF5733]" />;
        case "qwen": return <FaRobot className="w-4 h-4 text-[#3B82F6]" />;
        case "next.js": return <SiNextdotjs className="w-4 h-4 text-[#000000]" />;
        case "openai": return <SiOpenai className="w-4 h-4 text-[#412991]" />;
        case "fastapi": return <SiFastapi className="w-4 h-4 text-[#009688]" />;
        case "semantic search": return <FaMagnifyingGlass className="w-4 h-4 text-[#4285F4]" />;
        case "docker": return <SiDocker className="w-4 h-4 text-[#2496ED]" />;
        case "celery": return <FaLeaf className="w-4 h-4 text-[#37A853]" />;
        case "security": return <FaShieldHalved className="w-4 h-4 text-[#EF4444]" />;
        default: return <span className="text-[10px] font-bold uppercase">{tag}</span>;
    }
};

export const ProjectCard = ({ project, index, showTags = true }: { project: any, index: number, showTags?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Reverse logic: tilting towards mouse
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <AnimatedSection delayMs={index * 150} className="perspective-1000">
            <Link href={`/projects/${project.slug}`} className="block h-full">
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="group cursor-pointer flex flex-col h-full bg-white p-4 lg:p-6 rounded-2xl border border-black/5 hover:border-black/10 transition-colors duration-500 will-change-transform"
                >
                    {/* 3D Popping Image */}
                    <motion.div
                        style={{ transform: "translateZ(40px)" }}
                        className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden bg-[#FAFAFA] border border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500"
                    >
                        {project.image && (
                            <Image src={getProxiedImage(project.image)} alt={project.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                        )}
                    </motion.div>

                    {/* Text layered below */}
                    <motion.div style={{ transform: "translateZ(20px)" }}>
                        <h3 className="text-xl lg:text-2xl font-bold text-[#18181B] mb-3 tracking-tight uppercase">
                            {project.title}
                        </h3>
                        <p className="text-[#71717A] text-sm md:text-base mb-6 leading-relaxed font-medium">
                            {project.description}
                        </p>
                    </motion.div>

                    {/* Floating Tags layered high */}
                    {showTags && (
                        <motion.div style={{ transform: "translateZ(30px)" }} className="mt-auto flex flex-wrap items-center gap-3">
                            {project.tags.map((tag: string) => (
                                <div key={tag} className="group/icon relative flex items-center justify-center w-10 h-10 rounded-full bg-[#FAFAFA] border border-black/5 hover:border-black/20 hover:bg-white hover:scale-110 hover:shadow-md transition-all cursor-help">
                                    {getTagIcon(tag)}
                                    <span className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 text-[10px] uppercase font-bold tracking-widest text-white bg-black px-2 py-1 rounded transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                                        {tag}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </Link>
        </AnimatedSection>
    );
};

export function Projects({ projects = [] }: { projects?: any[] }) {
    return (
        <section id="projects" className="min-h-[100dvh] w-full flex flex-col justify-center relative bg-white border-t border-black/5 snap-start snap-always py-24 md:py-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                <AnimatedSection>
                    <div className="mb-10 lg:mb-14 text-center">
                        <h2 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[6rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8]">
                            SELECTED
                            <br />
                            <span className={`text-[3rem] sm:text-[3.5rem] lg:text-[5rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>works.</span>
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} showTags={false} />
                    ))}
                </div>

                <AnimatedSection delayMs={500}>
                    <div className="mt-12 text-center">
                        <Link href="/projects" className="inline-flex items-center gap-3 bg-[#18181B] border border-transparent text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm shadow-[0_10px_30px_rgba(24,24,27,0.15)] hover:scale-[1.03] hover:bg-white hover:text-[#18181B] hover:border-[#18181B] transition-all duration-300">
                            View All Projects
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
