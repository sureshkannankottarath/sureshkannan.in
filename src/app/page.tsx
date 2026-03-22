import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { projectsData } from "@/data/projects";

export default async function Home() {
  return (
    <main id="main-scroll" className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-bg-primary text-text-primary selection:bg-accent-blue/30 selection:text-text-primary">
      <Nav />
      <Hero />
      <About />
      <Projects projects={projectsData.slice(0, 3)} />
      <Experience />
      <Contact />
    </main>
  );
}
