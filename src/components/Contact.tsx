import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export function Contact() {
    return (
        <footer id="contact" className="min-h-[100dvh] w-full flex flex-col justify-center pt-32 pb-16 relative bg-white border-t border-black/5 overflow-hidden snap-start snap-always">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-[5rem] lg:text-[7rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8] mb-4">
                            LET'S
                            <br />
                            <span className={`text-[4rem] lg:text-[6rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>talk.</span>
                        </h2>
                    </div>
                </AnimatedSection>

                <AnimatedSection delayMs={100}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
                        <a href="mailto:contact@example.com" className="px-8 py-4 bg-[#18181B] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 hover:bg-[#BAE6FD] hover:text-[#18181B] transition-all transform duration-300">
                            Say Hello
                        </a>
                        <div className="flex items-center gap-4">
                            <a href="https://linkedin.com/in/YOUR_LINKEDIN_STUB" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#18181B] hover:text-white transition-colors">
                                <span className="font-semibold text-sm">IN</span>
                            </a>
                            <a href="https://github.com/YOUR_GITHUB_STUB" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#18181B] hover:text-white transition-colors">
                                <span className="font-semibold text-sm">GH</span>
                            </a>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-semibold text-[#71717A] uppercase tracking-widest">
                    <p>© 2025 Suresh Kannan.</p>
                    <p className="mt-4 md:mt-0">All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
