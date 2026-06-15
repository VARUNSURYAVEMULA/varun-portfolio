import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Timeline from './Timeline';
import CaseStudies from './CaseStudies';
import HealthcareSpecialization from './HealthcareSpecialization';
import DesignProcess from './DesignProcess';
import Contact from './Contact';

const Home = () => {
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
