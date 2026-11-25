import { Shell } from "@/components/site/Shell";
import { Preloader } from "@/components/site/Preloader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Method } from "@/components/Method";
import { Projects } from "@/components/Projects";
import { Experience, Toolkit } from "@/components/Experience";
import { projectsData } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Preloader />
      <Shell>
        <Hero />
        <About />
        <Method />
        <Projects projects={projectsData.slice(0, 6)} />
        <Experience />
        <Toolkit />
      </Shell>
    </>
  );
}
