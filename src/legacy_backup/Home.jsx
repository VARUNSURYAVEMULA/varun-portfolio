import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Timeline from './Timeline';
import CaseStudies from './CaseStudies';
import HealthcareSpecialization from './HealthcareSpecialization';
import DesignProcess from './DesignProcess';
import Contact from './Contact';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // slight delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <CaseStudies />
      <About />
      <DesignProcess />
      <Skills />
      <Timeline />
      <HealthcareSpecialization />
      <Contact />
    </>
  );
};

export default Home;
