"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { AnimatedSection } from "./ui/AnimatedSection";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

// Splitting text to animate per character
const SplitText = ({ text, className, delayParams = 0 }: { text: string, className?: string, delayParams?: number }) => {
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: delayParams }
                }
            }}
            className={className}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, y: 70, rotateX: -90, scale: 0.8 },
                        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    style={{ display: "inline-block", transformOrigin: "bottom" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export function Hero() {
    const [mounted, setMounted] = useState(false);

    // Parallax logic setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = e;
        const targetX = clientX - window.innerWidth / 2;
        const targetY = clientY - window.innerHeight / 2;
        mouseX.set(targetX);
        mouseY.set(targetY);
    };

    const imageX = useTransform(springX, [-1000, 1000], [30, -30]);
    // Intentionally omitting imageY: moving the image vertically reveals the cut-off bottom edge.

    const textLayerX = useTransform(springX, [-1000, 1000], [-30, 30]);
    const textLayerY = useTransform(springY, [-1000, 1000], [-30, 30]);

    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <section className="min-h-[100dvh] bg-[#FAFAFA] snap-start" />;

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 px-4 md:px-8 snap-start snap-always"
        >
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, #BAE6FD 0%, #FAFAFA 60%, #FAFAFA 100%)', opacity: bgOpacity }}
            />

            {/* Stable Layout Wrapper */}
            <div className="relative w-full max-w-[1400px] h-[100dvh] md:h-[850px] mx-auto flex-shrink-0">

                {/* Top Text: "Hey, there" */}
                <motion.div style={{ x: textLayerX, y: textLayerY }} className="absolute top-[60px] sm:top-[120px] md:top-[160px] w-full flex justify-center items-center gap-6 md:gap-[120px] lg:gap-[200px] z-0 pointer-events-none">
                    <SplitText delayParams={0.2} text="Hey," className={`text-[25vw] sm:text-[8rem] lg:text-[11rem] text-[#18181B] transform -rotate-2 inline-block tracking-tighter leading-none ${cormorant.className} font-light drop-shadow-sm`} />
                    <SplitText delayParams={0.4} text="there" className={`text-[25vw] sm:text-[8rem] lg:text-[11rem] text-[#18181B] transform -rotate-1 inline-block tracking-tighter leading-none ${cormorant.className} font-light drop-shadow-sm`} />
                </motion.div>

                {/* Central Portrait Image - Scaled natively for maximum sharpness */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 150 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ x: imageX }}
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 w-[150%] md:w-[1040px] lg:w-[1300px] h-[80%] md:h-[1000px] pointer-events-none origin-bottom"
                >
                    <Image
                        src="/images/latest_me.png"
                        alt="Suresh Kannan K"
                        fill
                        priority
                        quality={100}
                        sizes="(max-width: 768px) 150vw, (max-width: 1200px) 1040px, 1400px"
                        className="object-contain object-bottom"
                    />
                </motion.div>

                {/* Bottom White Fog Gradient - Strengthened to completely dissolve the bottom edge */}
                <div className="absolute -bottom-2 left-0 right-0 h-48 md:h-72 bg-gradient-to-t from-[#FAFAFA] from-20% via-[#FAFAFA]/80 to-transparent z-[15] pointer-events-none" />

                {/* Middle Floating Overlays */}
                <div className="hidden md:flex absolute top-[500px] w-full px-4 md:px-12 flex-col items-end z-20 pointer-events-none">
                    <AnimatedSection delayMs={1200} className="max-w-[260px] md:max-w-[320px] text-right pointer-events-auto">
                        <p className="text-xs md:text-sm font-semibold text-[#18181B] leading-snug font-sans opacity-90 drop-shadow-sm bg-white/30 backdrop-blur-sm p-4 rounded-xl border border-white/50">
                            R&D Lead – AI & Automation <br className="hidden md:block" />
                            at Bobcares, crafting intelligent <br className="hidden md:block" />
                            automation platforms & AI solutions.
                        </p>
                    </AnimatedSection>
                </div>

                <motion.div style={{ x: textLayerX, y: textLayerY }} className="absolute bottom-24 md:bottom-12 w-full flex flex-col md:flex-row justify-between items-end z-20 pointer-events-none px-4 md:px-0">
                    <div className="text-left font-sans font-black tracking-tighter leading-[0.8] text-[#18181B] flex flex-col">
                        <SplitText delayParams={0.8} text="I AM" className="text-[15vw] md:text-[6.5rem] lg:text-[9rem] uppercase drop-shadow-lg" />
                        <SplitText delayParams={1.0} text="SURESH" className="text-[15vw] md:text-[6.5rem] lg:text-[9rem] uppercase drop-shadow-lg" />
                    </div>

                    <div className="text-right font-sans font-black tracking-tighter leading-[0.8] text-[#18181B] mt-6 md:mt-0 pb-1 md:pb-3 flex flex-col">
                        <SplitText delayParams={1.2} text="R&D LEAD" className="text-[8vw] md:text-[4rem] lg:text-[5.5rem] uppercase drop-shadow-lg" />
                        <SplitText delayParams={1.4} text="AI & AUTOMATION" className="text-[8vw] md:text-[3.3rem] lg:text-[4.7rem] uppercase drop-shadow-lg" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

