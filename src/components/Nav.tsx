"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["italic", "normal"] });

const NAV_ITEMS = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
];

export function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById("main-scroll");
            if (!container) return;

            setIsScrolled(container.scrollTop > 30);

            // Active section detection via viewport intersecting bounds
            const sections = ["about", "projects", "experience", "contact"];
            let current = "";

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section bounds dominate the center of the vertical viewport
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        const container = document.getElementById("main-scroll");
        if (container) {
            container.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${isScrolled ? "bg-[#FAFAFA]/95 backdrop-blur-md py-4" : "bg-transparent py-8"
                    }`}
            >
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

                    {/* Brand Logo - Match Reference Script/Serif Look */}
                    <Link
                        href="/"
                        className={`text-2xl md:text-[2rem] text-[#18181B] tracking-tight group flex items-center ${cormorant.className} italic font-semibold`}
                    >
                        Suresh.
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-xs lg:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeSection === item.href.split('#')[1]
                                    ? "text-[#18181B]"
                                    : "text-[#71717A] hover:text-[#18181B]"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Contact Button & Mobile Trigger */}
                    <div className="flex items-center gap-4">
                        <a
                            href="/#contact"
                            className="hidden md:block px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 bg-[#18181B] border border-transparent text-white hover:bg-white hover:text-[#18181B] hover:border-[#18181B] hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                        >
                            Contact
                        </a>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden flex items-center justify-center p-2 rounded-full border border-black/10 text-[#18181B] hover:bg-black/5 transition-colors"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={20} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Drawer (Overlay) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-[#FAFAFA]/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-10"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full border border-black/10 text-[#18181B] hover:bg-black/5 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col items-center gap-10">
                            {[...NAV_ITEMS, { label: "Contact", href: "/#contact" }].map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.08, ease: "easeOut" }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-2xl font-black uppercase tracking-widest transition-colors ${activeSection === item.href.split('#')[1]
                                            ? "text-[#18181B]"
                                            : "text-[#71717A] hover:text-[#18181B]"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
