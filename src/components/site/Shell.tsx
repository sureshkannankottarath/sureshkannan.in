import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { ParticleField } from "@/components/gl/ParticleField";
import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "./Cursor";

// Chrome shared by every public page
export function Shell({ children, contact = true }: { children: ReactNode; contact?: boolean }) {
    return (
        <>
            <SmoothScroll />
            <ParticleField />
            <div aria-hidden className="grain" />
            <Cursor />
            <Nav />
            <main className="relative z-10">{children}</main>
            {contact && <Contact />}
        </>
    );
}
