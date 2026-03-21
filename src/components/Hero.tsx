"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { AnimatedSection } from "./ui/AnimatedSection";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 px-4 md:px-8 snap-start snap-always"
            style={{ background: 'radial-gradient(ellipse at center, #BAE6FD 0%, #FAFAFA 60%, #FAFAFA 100%)' }}
        >

            {/* Stable Layout Wrapper - Ensures alignment never breaks on weird screen heights */}
            <div className="relative w-full max-w-[1400px] h-[850px] mx-auto flex-shrink-0">

                {/* Top Text: "Hey, there" */}
                <div className="absolute top-[180px] md:top-[160px] w-full flex justify-center items-center gap-6 md:gap-[120px] lg:gap-[200px] z-0 pointer-events-none">
                    <AnimatedSection delayMs={100}>
                        <span className={`text-[25vw] sm:text-[8rem] lg:text-[11rem] text-[#18181B] transform -rotate-2 inline-block tracking-tighter leading-none ${cormorant.className} font-light`}>
                            Hey,
                        </span>
                    </AnimatedSection>
                    <AnimatedSection delayMs={200}>
                        <span className={`text-[25vw] sm:text-[8rem] lg:text-[11rem] text-[#18181B] transform -rotate-1 inline-block tracking-tighter leading-none ${cormorant.className} font-light`}>
                            there
                        </span>
                    </AnimatedSection>
                </div>

                {/* Central Portrait Image - Scaled natively for maximum sharpness */}
                <AnimatedSection delayMs={300} className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 w-[150%] md:w-[1040px] lg:w-[1300px] h-[75%] md:h-[1000px] pointer-events-none origin-bottom">
                    <Image
                        src="/images/latest_me.png"
                        alt="Suresh Kannan K"
                        fill
                        priority
                        quality={100}
                        sizes="(max-width: 768px) 150vw, (max-width: 1200px) 1040px, 1400px"
                        className="object-contain object-bottom"
                    />
                </AnimatedSection>

                {/* Bottom White Fog Gradient - Applied exactly over the portrait base (z-[15]) */}
                <div className="absolute bottom-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-t from-[#FAFAFA] to-transparent z-[15] pointer-events-none" />

                {/* Middle Floating Overlays */}
                <div className="absolute top-[600px] md:top-[500px] w-full px-4 md:px-12 flex flex-col items-end z-20 pointer-events-none">

                    {/* Description - Right Edge */}
                    <AnimatedSection delayMs={500} className="max-w-[260px] md:max-w-[320px] text-right pointer-events-auto">
                        <p className="text-xs md:text-sm font-semibold text-black leading-snug font-sans opacity-90">
                            Specialized in AI Engineering, <br className="hidden md:block" />
                            Semantic Search, RAG Pipelines, <br className="hidden md:block" />
                            and Intelligent Systems.
                        </p>
                    </AnimatedSection>
                </div>

                {/* Bottom Titles - Locked to exact bottom of wrapper */}
                <div className="absolute bottom-4 md:bottom-12 w-full flex flex-col md:flex-row justify-between items-end z-20 pointer-events-none px-4 md:px-0">

                    <AnimatedSection delayMs={600}>
                        <div className="text-left font-sans font-black tracking-tighter leading-[0.8] text-[#18181B]">
                            <h1 className="text-[20vw] md:text-[6.5rem] lg:text-[9rem] uppercase">I AM</h1>
                            <h1 className="text-[20vw] md:text-[6.5rem] lg:text-[9rem] uppercase">SURESH</h1>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delayMs={700}>
                        <div className="text-right font-sans font-black tracking-tighter leading-[0.8] text-[#18181B] mt-8 md:mt-0 pb-1 md:pb-3">
                            <h2 className="text-[10vw] md:text-[4rem] lg:text-[5.5rem] uppercase">AI PRODUCT</h2>
                            <h2 className="text-[10vw] md:text-[4rem] lg:text-[5.5rem] uppercase">ENGINEER</h2>
                        </div>
                    </AnimatedSection>

                </div>
            </div>
        </section>
    );
}
