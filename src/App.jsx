import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// We will import components here as we build them.
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';

import Hero from './components/Hero';
import About from './components/About';
import SkillGlobe from './components/SkillGlobe';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Blog from './components/Blog';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

import { FormspreeProvider } from '@formspree/react';

function App() {
  useEffect(() => {
    // Wait a brief moment to ensure all DOM elements are mounted before attaching ScrollTrigger
    setTimeout(() => {
      const elements = gsap.utils.toArray('.gsap-reveal');
      elements.forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        });
      });
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader />
      <Navigation />

      <Hero />
      <About />
      <SkillGlobe />
      <Projects />
      <Terminal />
      <Blog />
      <Contact />

      <footer>
        <div className="container">built by hand &nbsp;|&nbsp; no frameworks harmed &nbsp;|&nbsp; © 2025 Rohit Kumar</div>
      </footer>
    </>
  );
}

export default App;
