import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Image, Text, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Smartphone,
  Monitor,
  Gamepad,
} from "lucide-react";
import * as THREE from "three";

const Floating3DPhone = ({ position, rotation, texture, isActive }: any) => {
  const meshRef = useRef<THREE.Group>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (isActive) {
        meshRef.current.position.y =
          position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Phone Frame */}
        <RoundedBox args={[1, 2, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
        {/* Screen */}
        <RoundedBox
          args={[0.8, 1.6, 0.02]}
          position={[0, 0, 0.06]}
          radius={0.05}
          smoothness={4}
        >
          <meshStandardMaterial
            color={isActive ? "#0d8be0" : "#333333"}
            emissive={isActive ? "#0d8be0" : "#000000"}
            emissiveIntensity={isActive ? 0.2 : 0}
          />
        </RoundedBox>
      </group>
    </Float>
  );
};

const Portfolio3DCarousel = ({
  projects,
  activeProject,
  setActiveProject,
}: any) => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, 0, 5]} intensity={0.5} color="#0d8be0" />

      {projects.map((project: any, index: number) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={project.id}>
            <Floating3DPhone
              position={[x, 0, z]}
              rotation={[0, -angle, 0]}
              isActive={activeProject === index}
            />
          </group>
        );
      })}
    </Canvas>
  );
};

const ProjectCard = ({ project, index, isActive, onClick }: any) => {
  const IconComponent =
    project.type === "mobile"
      ? Smartphone
      : project.type === "web"
      ? Monitor
      : Gamepad;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      className={`cursor-pointer transform transition-all duration-500 ${
        isActive ? "z-10" : "z-0"
      }`}
      onClick={() => onClick(index)}
    >
      <div
        className={`backdrop-blur-md rounded-3xl overflow-hidden border transition-all duration-500 ${
          isActive
            ? "bg-white/15 border-[#0d8be0] shadow-2xl shadow-[#0d8be0]/25"
            : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
      >
        {/* Project Image */}
        <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div
            className={`w-32 h-32 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isActive ? "bg-[#0d8be0] shadow-lg" : "bg-white/10"
            }`}
          >
            <IconComponent
              className={`w-16 h-16 ${
                isActive ? "text-white" : "text-[#0d8be0]"
              }`}
            />
          </div>
        </div>

        {/* Project Info */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isActive
                  ? "bg-[#0d8be0] text-white"
                  : "bg-white/10 text-[#0d8be0]"
              }`}
            >
              {project.category}
            </span>
            <span className="text-gray-400 text-sm">{project.year}</span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#0d8be0] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0f8a7a] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </motion.button>
            {project.github && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      category: "Mobile App",
      type: "mobile",
      year: "2023",
      description:
        "A comprehensive e-commerce solution with advanced features including AI-powered recommendations, seamless payment integration, and real-time order tracking.",
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe", "AI/ML"],
      github: true,
    },
    {
      id: 2,
      title: "Healthcare Management System",
      category: "Web Platform",
      type: "web",
      year: "2023",
      description:
        "Complete healthcare management platform with patient records, appointment scheduling, telemedicine capabilities, and integrated billing system.",
      technologies: ["React", "Laravel", "MySQL", "WebRTC", "AWS"],
      github: false,
    },
    {
      id: 3,
      title: "AR Adventure Game",
      category: "Game Development",
      type: "game",
      year: "2022",
      description:
        "Immersive augmented reality adventure game featuring real-world exploration, multiplayer battles, and stunning 3D graphics.",
      technologies: ["Unity", "ARCore", "C#", "Photon", "3D Modeling"],
      github: true,
    },
    {
      id: 4,
      title: "FinTech Mobile Solution",
      category: "Mobile App",
      type: "mobile",
      year: "2023",
      description:
        "Secure financial technology app with cryptocurrency trading, portfolio management, and advanced analytics dashboard.",
      technologies: [
        "Flutter",
        "Firebase",
        "Blockchain",
        "Chart.js",
        "Biometric Auth",
      ],
      github: false,
    },
    {
      id: 5,
      title: "AI-Powered CRM",
      category: "Web Platform",
      type: "web",
      year: "2023",
      description:
        "Intelligent customer relationship management system with predictive analytics, automated workflows, and AI chatbot integration.",
      technologies: ["Vue.js", "Python", "TensorFlow", "PostgreSQL", "Docker"],
      github: true,
    },
    {
      id: 6,
      title: "IoT Smart Home App",
      category: "Mobile App",
      type: "mobile",
      year: "2022",
      description:
        "Comprehensive smart home control application with voice commands, automation schedules, and energy monitoring.",
      technologies: [
        "React Native",
        "IoT",
        "MQTT",
        "Voice API",
        "Real-time DB",
      ],
      github: true,
    },
  ];

  return (
    <section className="relative py-20 px-6 min-h-screen">
      {/* 3D Background Carousel */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Portfolio3DCarousel
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-[#0d8be0]">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative solutions that have transformed businesses
            across industries
          </p>
        </motion.div>

        {/* Project Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 bg-white/5 backdrop-blur-md rounded-full p-2 border border-white/10">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeProject === index
                    ? "bg-[#0d8be0] scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Active Project Display */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <ProjectCard
              key={activeProject}
              project={projects[activeProject]}
              index={activeProject}
              isActive={true}
              onClick={setActiveProject}
            />
          </AnimatePresence>
        </div>

        {/* Project Grid Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveProject(index)}
              className={`cursor-pointer backdrop-blur-md rounded-xl p-6 border transition-all duration-300 hover:scale-105 ${
                activeProject === index
                  ? "bg-[#0d8be0]/20 border-[#0d8be0]"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {project.type === "mobile" ? (
                  <Smartphone className="w-5 h-5 text-[#0d8be0]" />
                ) : project.type === "web" ? (
                  <Monitor className="w-5 h-5 text-[#0d8be0]" />
                ) : (
                  <Gamepad className="w-5 h-5 text-[#0d8be0]" />
                )}
                <span className="font-semibold text-white">
                  {project.title}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                {project.description.slice(0, 80)}...
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
