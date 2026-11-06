import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Approach from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div style={{ minHeight: "100dvh" }}>
      <Navigation />
      <main className="pt-16">
        <Hero />
        <About />
        <Experience />
        <Approach />
        <Contact />
      </main>
    </div>
  );
}
