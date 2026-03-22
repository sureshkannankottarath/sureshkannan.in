import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  return (
    <main id="main-scroll" className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-bg-primary text-text-primary selection:bg-accent-blue/30 selection:text-text-primary">
      <Nav />
      <Hero />
      <About />
      <Projects projects={projects || []} />
      <Experience />
      <Contact />
    </main>
  );
}
