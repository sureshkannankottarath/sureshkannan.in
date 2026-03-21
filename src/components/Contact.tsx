import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import { FaLinkedinIn, FaGithub, FaPinterestP } from "react-icons/fa6";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export function Contact() {
    return (
        <footer id="contact" className="min-h-[100dvh] w-full flex flex-col relative border-t border-black/5 overflow-hidden snap-start snap-always" style={{ background: 'radial-gradient(circle at center, #E0F2FE 0%, #FAFAFA 60%)' }}>

            {/* Main Centered Content */}
            <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full flex-grow flex flex-col justify-center text-center">
                <AnimatedSection>
                    <div className="mb-8">
                        <h2 className="text-[5.5rem] lg:text-[8rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8] mb-5">
                            LET'S
                            <br />
                            <span className={`text-[4.5rem] lg:text-[7rem] font-light lowercase text-transparent bg-clip-text bg-gradient-to-r from-[#71717A] via-[#38BDF8] to-[#18181B] tracking-normal ${cormorant.className}`}>talk.</span>
                        </h2>
                    </div>
                </AnimatedSection>

                <AnimatedSection delayMs={100}>
                    <p className="text-[#71717A] text-lg md:text-xl md:leading-relaxed font-medium mb-12 max-w-2xl mx-auto">
                        Building the future isn't a solo endeavor. Let's merge your bold ideas with state-of-the-art architectures, solve complex problems, and engineer systems that inspire the world.
                    </p>
                </AnimatedSection>

                <AnimatedSection delayMs={200}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <a href="mailto:contact@example.com" className="px-10 py-5 bg-[#18181B] text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_10px_40px_rgba(24,24,27,0.2)] hover:scale-105 hover:bg-[#BAE6FD] hover:text-[#18181B] transition-all transform duration-300">
                            Start a Conversation
                        </a>
                        <div className="flex items-center gap-4">
                            <a href="https://linkedin.com/in/YOUR_LINKEDIN_STUB" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-white hover:border-[#0077b5] text-[#18181B] hover:text-[#0077b5] hover:shadow-[0_4px_15px_rgba(0,119,181,0.2)] transition-all duration-300">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/YOUR_GITHUB_STUB" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#18181B] hover:border-[#18181B] text-[#18181B] hover:text-white shadow-sm transition-all duration-300">
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a href="https://pinterest.com/YOUR_PINTEREST_STUB" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-white hover:border-[#E60023] text-[#18181B] hover:text-[#E60023] hover:shadow-[0_4px_15px_rgba(230,0,35,0.2)] transition-all duration-300">
                                <FaPinterestP className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            {/* Bottom Pinned Footer */}
            <div className="w-full mt-auto border-t border-black/10 bg-[#FAFAFA]/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-semibold text-[#71717A] uppercase tracking-widest gap-4 md:gap-0">
                    <p>© 2025 Suresh Kannan.</p>
                    <p className="opacity-70">Inspired by Technology.</p>
                </div>
            </div>

        </footer>
    );
}
