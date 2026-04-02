import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import BuildEveryday from "@/components/BuildEveryday";
import Approach from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <BuildEveryday />
        <Approach />
        <Contact />
      </main>
    </div>
  );
}
