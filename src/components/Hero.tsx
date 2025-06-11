import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowDown, Globe, Smartphone, Code } from "lucide-react";
import GlowingRing from "./GlowingRing"; // Make sure this exists!

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* ⭐ Background Stars */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <Stars radius={300} depth={60} count={2500} factor={7} fade />
        </Canvas>
      </div>

      {/* Layout Row: Left (Content) + Right (3D Ring) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-left space-y-6 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            <span className="bg-gradient-to-r from-[#0d8be0] to-teal-300 bg-clip-text text-transparent">
              SCC INFOTECH
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300">
            Innovating Mobile & Web Solutions Worldwide
          </p>

          <div className="flex flex-wrap gap-4 text-gray-400 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#0d8be0]" />
              Mobile Development
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#0d8be0]" />
              Web Solutions
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#0d8be0]" />
              Global Reach
            </div>
          </div>

          <motion.button
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0d8be0] to-teal-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#0d8be0]/25 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let’s Build Together
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE: Glowing 3D Ring */}
        <div className="flex-1 w-full h-[700px] relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.6} />
<pointLight position={[10, 10, 10]} />
            <GlowingRing />
            

          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Hero;
