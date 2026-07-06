import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";

export default function halamanUtama() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
    </main>
  );

}
