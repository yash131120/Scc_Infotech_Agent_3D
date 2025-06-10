import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowDown, Globe, Smartphone, Code } from 'lucide-react';
import gsap from 'gsap';
import * as THREE from 'three';

const FloatingLogo = () => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.2}>
        <boxGeometry args={[2, 0.4, 2]} />
        <MeshDistortMaterial
          color="#12A594"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const AnimatedGlobe = () => {
  const sphereRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 32, 32]} position={[3, 0, 0]}>
        <MeshDistortMaterial
          color="#12A594"
          attach="material" 
          distort={0.1}
          speed={2}
          roughness={0.2}
          opacity={0.8}
          transparent
        />
      </Sphere>
    </Float>
  );
};

const FloatingDevices = () => {
  return (
    <>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[-3, 1, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 1.6, 0.1]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[4, -1, 1]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[2, 1.2, 0.1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
      </Float>
    </>
  );
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo('.hero-cta',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          {/* <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#12A594" /> */}
          
          <Stars radius={300} depth={60} count={3000} factor={7} saturation={0} fade />
          {/* <FloatingLogo /> */}
          {/* <AnimatedGlobe /> */}
          {/* <FloatingDevices /> */}
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="space-y-8"
        >
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#12A594] to-teal-300 bg-clip-text text-transparent">
              SCC INFOTECH
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Innovating Mobile & Web Solutions Worldwide
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#12A594]" />
              Mobile Development
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#12A594]" />
              Web Solutions
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#12A594]" />
              Global Reach
            </div>
          </div>

          <motion.button
            className="hero-cta inline-flex items-center gap-3 bg-gradient-to-r from-[#12A594] to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#12A594]/25 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Build Together
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-white opacity-60" />
      </motion.div>
    </section>
  );
};

export default Hero;