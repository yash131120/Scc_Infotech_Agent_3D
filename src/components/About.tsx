import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { Calendar, Users, MapPin, Award } from "lucide-react";
import gsap from "gsap";
import * as THREE from "three";

const FloatingShape = () => {
  const meshRef = useRef<THREE.Mesh>();

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusGeometry args={[2, 0.5, 16, 100]} />
        <MeshTransmissionMaterial
          color="#12A594"
          thickness={0.2}
          roughness={0.1}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.02}
          backside
        />
      </mesh>
    </Float>
  );
};

const TimelineItem = ({ year, title, description, delay }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative pl-8 pb-8"
    >
      <div className="absolute left-0 top-0 w-4 h-4 bg-[#12A594] rounded-full shadow-lg shadow-[#12A594]/50"></div>
      <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-[#12A594] to-transparent"></div>

      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
        <div className="text-[#12A594] font-bold text-lg mb-2">{year}</div>
        <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Calendar, label: "Founded", value: "2016" },
    { icon: Users, label: "Team Size", value: "11-50" },
    { icon: MapPin, label: "Location", value: "Surat, India" },
    { icon: Award, label: "Projects", value: "200+" },
  ];

  const timeline = [
    {
      year: "2016",
      title: "Company Founded",
      description:
        "SCC INFOTECH was established with a vision to provide innovative IT solutions.",
    },
    {
      year: "2018",
      title: "Global Expansion",
      description:
        "Extended services to international clients across multiple continents.",
    },
    {
      year: "2020",
      title: "Mobile Excellence",
      description:
        "Became specialists in cutting-edge mobile app development and design.",
    },
    {
      year: "2023",
      title: "AI Integration",
      description:
        "Pioneered AI-powered solutions and voice assistant technologies.",
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".about-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    ).fromTo(
      ".stats-grid",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1 },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 min-h-screen flex items-center"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#12A594" />
          <FloatingShape />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="about-title text-5xl md:text-6xl font-bold text-white mb-6">
                About <span className="text-[#12A594]">Us</span>
              </h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  SCC INFOTECH specializes in affordable custom mobile
                  development and IT solutions for clients worldwide. We believe
                  in innovation, creativity, and excellence.
                </p>
                <p>
                  Our comprehensive services include iOS & Android development,
                  PHP, Unity, Web Development, Graphic Design, Swift, Laravel,
                  Digital Marketing, and Game Development.
                </p>
                <p>
                  We help businesses create powerful, user-friendly, globally
                  competitive apps and websites that drive real results.
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-[#12A594] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Our Journey
            </h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} {...item} delay={index * 0.2} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
