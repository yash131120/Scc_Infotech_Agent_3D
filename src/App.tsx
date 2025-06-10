import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VoiceAssistantPlaceholder from './components/VoiceAssistantPlaceholder';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll animations
    gsap.set("body", { overflow: "visible" });
    
    // Global scroll animations
    gsap.utils.toArray('.fade-in').forEach((element: any) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Background Canvas for global effects */}
      <div className="fixed inset-0 -z-10">
        <Canvas>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Team />
        <Testimonials />
        <Contact />
        <Footer />
        <VoiceAssistantPlaceholder />
      </div>
    </div>
  );
}

export default App;