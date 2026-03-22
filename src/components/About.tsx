"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
    SiPython,
    SiFastapi,
    SiReact,
    SiNextdotjs,
    SiOpenai,
    SiNodedotjs,
    SiDocker,
    SiVercel,
    SiPostgresql
} from "react-icons/si";
import { FaDatabase, FaLink } from "react-icons/fa6";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

const skillCategories = [
    {
        title: "AI & Search",
        skills: [
            { name: "Python", Icon: SiPython, color: "#3776AB" },
            { name: "OpenAI", Icon: SiOpenai, color: "#412991" },
            { name: "LangChain", Icon: FaLink, color: "#111111" },
            { name: "ChromaDB", Icon: FaDatabase, color: "#FF5733" },
        ]
    },
    {
        title: "Full Stack",
        skills: [
            { name: "React", Icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
            { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
            { name: "Node.js", Icon: SiNodedotjs, color: "#43853D" },
        ]
    },
    {
        title: "Cloud & Dev",
        skills: [
            { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
            { name: "Docker", Icon: SiDocker, color: "#2496ED" },
            { name: "Vercel", Icon: SiVercel, color: "#000000" }
        ]
    }
];

export function About() {
    return (
        <section id="about" className="min-h-[100dvh] w-full flex flex-col justify-center relative bg-[#FAFAFA] border-t border-black/5 snap-start snap-always py-24 md:py-0 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row gap-16 md:gap-24 items-start">

                {/* Left Column: Huge Editorial Header */}
                <div className="w-full md:w-1/3">
                    <AnimatedSection>
                        <h2 className="text-[4rem] sm:text-[5rem] lg:text-[7rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8] mb-4">
                            ABOUT
                            <br />
                            <span className={`text-[3.5rem] sm:text-[4rem] lg:text-[6rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>me.</span>
                        </h2>
                    </AnimatedSection>
                </div>

                {/* Right Column: Content */}
                <div className="w-full md:w-2/3">
                    <AnimatedSection delayMs={100}>
                        <div className="space-y-8 text-xl md:text-3xl text-[#18181B] leading-tight font-medium font-sans">
                            <p>
                                I am an AI Engineer & Project Manager based in Kerala, architecting intelligent systems that bridge the gap between applied research and real-world deployment.
                            </p>
                            <p className="text-[#71717A]">
                                I specialize in LLM pipelines, semantic search, and robust full-stack product delivery, solving complex operational challenges.
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delayMs={200}>
                        <div className="pt-12 mt-12 border-t border-black/10">
                            <h3 className="text-sm font-bold text-[#18181B] uppercase tracking-wider mb-8">Core Arsenal</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                {skillCategories.map((category) => (
                                    <div key={category.title} className="flex flex-col gap-4">
                                        <span className="text-xs font-black uppercase text-[#71717A] tracking-widest border-b border-black/5 pb-2">
                                            {category.title}
                                        </span>
                                        <div className="grid grid-cols-2 gap-3">
                                            {category.skills.map((skill) => (
                                                <div
                                                    key={skill.name}
                                                    className="group flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-black/5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-black/10 hover:-translate-y-1 transition-all duration-300"
                                                >
                                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#18181B] group-hover:text-black transition-colors text-center leading-tight">
                                                        {skill.name}
                                                    </span>
                                                    <skill.Icon style={{ color: skill.color }} className="w-7 h-7 sm:w-8 sm:h-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
