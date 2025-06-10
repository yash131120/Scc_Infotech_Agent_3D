import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Globe,
  Palette,
  Gamepad2,
  Code,
  Megaphone,
  Database,
  Zap,
} from "lucide-react";
import * as THREE from "three";

const ServiceCube = ({
  position,
  rotation,
  color,
  text,
  isActive,
  onClick,
}: any) => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

      if (isActive) {
        meshRef.current.scale.setScalar(
          1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        );
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox
        ref={meshRef}
        args={[1.5, 1.5, 1.5]}
        position={position}
        rotation={rotation}
        radius={0.2}
        smoothness={4}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={isActive ? "#0d8be0" : color}
          transparent
          opacity={isActive ? 0.9 : 0.7}
          emissive={isActive ? "#0d8be0" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </RoundedBox>
      <Text
        position={[position[0], position[1], position[2] + 0.8]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
};

const ServiceCard = ({ service, index, isActive, onClick }: any) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`cursor-pointer transform transition-all duration-300 ${
        isActive ? "scale-105" : "hover:scale-102"
      }`}
      onClick={() => onClick(service.id)}
    >
      <div
        className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 ${
          isActive
            ? "bg-[#0d8be0]/20 border-[#0d8be0] shadow-2xl shadow-[#0d8be0]/25"
            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
            isActive
              ? "bg-[#0d8be0] shadow-lg shadow-[#0d8be0]/50"
              : "bg-white/10"
          }`}
        >
          <service.icon
            className={`w-8 h-8 ${isActive ? "text-white" : "text-[#0d8be0]"}`}
          />
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
        <p className="text-gray-300 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="space-y-2">
          {service.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-[#0d8be0]" : "bg-white/40"
                }`}
              ></div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Native iOS and Android apps with cutting-edge technology and seamless user experience.",
      features: [
        "iOS Development",
        "Android Development",
        "React Native",
        "Flutter",
        "Swift & Kotlin",
      ],
      color: "#3B82F6",
    },
    {
      id: 1,
      icon: Globe,
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications built with the latest technologies.",
      features: [
        "React & Vue.js",
        "Laravel & PHP",
        "Node.js",
        "Progressive Web Apps",
        "E-commerce Solutions",
      ],
      color: "#10B981",
    },
    {
      id: 2,
      icon: Palette,
      title: "Graphic Design",
      description:
        "Creative visual solutions that communicate your brand message effectively.",
      features: [
        "UI/UX Design",
        "Brand Identity",
        "Print Design",
        "Digital Graphics",
        "3D Visualization",
      ],
      color: "#F59E0B",
    },
    {
      id: 3,
      icon: Gamepad2,
      title: "Game Development",
      description:
        "Immersive gaming experiences across multiple platforms using Unity and advanced engines.",
      features: [
        "Unity Development",
        "2D & 3D Games",
        "Mobile Gaming",
        "AR/VR Games",
        "Cross-platform",
      ],
      color: "#8B5CF6",
    },
    {
      id: 4,
      icon: Code,
      title: "Custom Software",
      description:
        "Tailored software solutions that solve specific business challenges and optimize workflows.",
      features: [
        "Enterprise Software",
        "API Development",
        "Cloud Solutions",
        "DevOps",
        "System Integration",
      ],
      color: "#EF4444",
    },
    {
      id: 5,
      icon: Megaphone,
      title: "Digital Marketing",
      description:
        "Comprehensive digital strategies to boost your online presence and drive growth.",
      features: [
        "SEO Optimization",
        "Social Media",
        "Content Marketing",
        "PPC Campaigns",
        "Analytics",
      ],
      color: "#06B6D4",
    },
  ];

  return (
    <section className="relative py-20 px-6 min-h-screen">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#0d8be0" />
          <pointLight
            position={[-10, -10, 10]}
            intensity={0.5}
            color="#3B82F6"
          />

          {services.map((service, index) => (
            <ServiceCube
              key={service.id}
              position={[
                ((index % 3) - 1) * 4,
                Math.floor(index / 3) * 3 - 1.5,
                0,
              ]}
              rotation={[Math.random(), Math.random(), Math.random()]}
              color={service.color}
              text={service.title.split(" ")[0]}
              isActive={activeService === service.id}
              onClick={() => setActiveService(service.id)}
            />
          ))}
        </Canvas>
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
            Our <span className="text-[#0d8be0]">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive IT solutions tailored to transform your business
            vision into reality
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === service.id}
                onClick={setActiveService}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            Technologies We Master
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "Vue.js",
              "Angular",
              "Node.js",
              "Laravel",
              "PHP",
              "Swift",
              "Kotlin",
              "Unity",
              "Flutter",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white hover:bg-[#0d8be0]/20 hover:border-[#0d8be0] transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
