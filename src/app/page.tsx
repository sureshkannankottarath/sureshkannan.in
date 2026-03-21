import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-blue/30 selection:text-text-primary">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />

    </main>
  );
}
