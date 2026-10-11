import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { About } from './components/About';
import { DesignProcess } from './components/DesignProcess';
import { ToolKit } from './components/ToolKit';
import { Experience } from './components/Experience';
import { Explorations } from './components/Explorations';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';

export const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-white/20 selection:text-white font-body">
      {/* Section 1: Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Fixed Navbar */}
      <Navbar
        onResumeClick={() => setIsResumeOpen(true)}
        onContactClick={handleContactClick}
      />

      {/* Main Content Sections */}
      <main className="w-full overflow-hidden">
        {/* Section 2: Hero */}
        <Hero
          isLoadingComplete={!isLoading}
          onContactClick={handleContactClick}
        />

        {/* Section 3: Selected Works */}
        <SelectedWorks
          onProjectClick={(project) => setSelectedProject(project)}
        />

        {/* Section 4: About */}
        <About />

        {/* Section 5: Design Process */}
        <DesignProcess />

        {/* Section 6: Tool Kit */}
        <ToolKit />

        {/* Section 7: Experience */}
        <Experience />

        {/* Section 8: Explorations (Parallax Gallery) */}
        <Explorations />
      </main>

      {/* Section 7: Contact / Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Index;
