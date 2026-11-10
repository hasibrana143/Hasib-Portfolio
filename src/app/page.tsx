import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ParallaxForest } from "@/components/parallax/ParallaxForest";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <ParallaxForest className="min-h-screen" />
        <AboutSection />
        <ProcessSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}