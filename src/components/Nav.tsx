"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-4 bg-[#080C14]/70 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-syne text-text-primary tracking-tight group">
                    Suresh<span className="text-accent-blue transition-colors group-hover:text-accent-green">.</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
                    <a href="#about" className="hover:text-text-primary hover:text-glow-blue transition-all">
                        About
                    </a>
                    <a href="#projects" className="hover:text-text-primary hover:text-glow-blue transition-all">
                        Projects
                    </a>
                    <a href="#experience" className="hover:text-text-primary hover:text-glow-blue transition-all">
                        Experience
                    </a>
                    <a
                        href="#contact"
                        className="px-4 py-2 rounded-full border border-white/10 hover:border-accent-blue text-text-primary transition-all hover:bg-accent-blue/10"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
}
