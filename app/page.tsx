import { About } from "@/components/About";
import { Awards } from "@/components/Awards";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Awards />
        <Projects />
      </main>
    </>
  );
}
