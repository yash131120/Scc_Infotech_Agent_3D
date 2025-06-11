import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import * as THREE from "three";

const TeamMember3D = ({ position, isActive, onClick }: any) => {
  const meshRef = useRef<THREE.Group>();

  useFrame((state) => {
    if (meshRef.current) {
      if (isActive) {
        meshRef.current.rotation.y =
          Math.sin(state.clock.elapsedTime * 2) * 0.3;
        meshRef.current.position.y =
          position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      } else {
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} position={position} onClick={onClick}>
        {/* Avatar Frame */}
        <RoundedBox args={[1.5, 1.5, 0.2]} radius={0.3} smoothness={4}>
          <meshStandardMaterial
            color={isActive ? "#0d8be0" : "#374151"}
            emissive={isActive ? "#0d8be0" : "#000000"}
            emissiveIntensity={isActive ? 0.2 : 0}
          />
        </RoundedBox>

        {/* Avatar */}
        <RoundedBox
          args={[1.2, 1.2, 0.1]}
          position={[0, 0, 0.15]}
          radius={0.2}
          smoothness={4}
        >
          <meshStandardMaterial color="#1f2937" />
        </RoundedBox>

        {/* Face placeholder */}
        <mesh position={[0, 0.2, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#f3f4f6" />
        </mesh>
      </group>
    </Float>
  );
};

const TeamCard = ({ member, index, isActive, onClick }: any) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{
        opacity: 1,
        rotateY: 0,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="cursor-pointer group perspective-1000"
      onClick={() => onClick(member.id)}
    >
      <div
        className={`relative transform-gpu transition-all duration-500 preserve-3d ${
          isActive ? "" : "group-hover:rotateY-12"
        }`}
      >
        <div
          className={`backdrop-blur-md rounded-3xl p-8 border transition-all duration-500 ${
            isActive
              ? "bg-[#0d8be0]/20 border-[#0d8be0] shadow-2xl shadow-[#0d8be0]/25"
              : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
          }`}
        >
          {/* Avatar */}
          <div className="relative mb-6">
            <div
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-[#0d8be0] ring-4 ring-[#0d8be0]/30"
                  : "bg-white/10"
              }`}
            >
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {member.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
            </div>

            {/* Status indicator */}
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white/20 ${
                member.status === "online" ? "bg-green-500" : "bg-gray-500"
              }`}
            ></div>
          </div>

          {/* Info */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
            <p className="text-[#0d8be0] font-semibold mb-3">{member.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {member.skills.slice(0, 3).map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {member.social.linkedin && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href={member.social.linkedin}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </motion.a>
            )}
            {member.social.twitter && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href={member.social.twitter}
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-400 transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </motion.a>
            )}
            {member.social.github && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href={member.social.github}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
              </motion.a>
            )}
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href={`mailto:${member.email}`}
              className="w-10 h-10 bg-[#0d8be0] rounded-full flex items-center justify-center hover:bg-[ #08aae4] transition-colors"
            >
              <Mail className="w-5 h-5 text-white" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  const teamMembers = [
    {
      id: 0,
      name: "Rajesh Patel",
      role: "CEO & Founder",
      bio: "Visionary leader with 12+ years in IT industry, specializing in mobile app development and digital transformation.",
      skills: [
        "Leadership",
        "Strategy",
        "Mobile Development",
        "Business Development",
      ],
      status: "online",
      email: "rajesh@sccinfotech.com",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      id: 1,
      name: "Priya Sharma",
      role: "CTO & Lead Developer",
      bio: "Technical expert with deep knowledge in full-stack development, AI/ML, and cloud architecture.",
      skills: ["React", "Node.js", "AI/ML", "Cloud Architecture"],
      status: "online",
      email: "priya@sccinfotech.com",
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 2,
      name: "Amit Kumar",
      role: "Senior Mobile Developer",
      bio: "iOS and Android specialist with expertise in React Native, Flutter, and native development.",
      skills: ["iOS", "Android", "React Native", "Flutter"],
      status: "online",
      email: "amit@sccinfotech.com",
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Sneha Gupta",
      role: "UI/UX Designer",
      bio: "Creative designer focused on user-centered design principles and modern visual aesthetics.",
      skills: ["UI Design", "UX Research", "Figma", "Prototyping"],
      status: "online",
      email: "sneha@sccinfotech.com",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Game Developer",
      bio: "Unity expert specializing in AR/VR games, 3D graphics, and immersive gaming experiences.",
      skills: ["Unity", "C#", "AR/VR", "3D Graphics"],
      status: "online",
      email: "vikram@sccinfotech.com",
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 5,
      name: "Kavya Reddy",
      role: "Digital Marketing Specialist",
      bio: "Growth hacker with expertise in SEO, social media marketing, and performance analytics.",
      skills: ["SEO", "Social Media", "Analytics", "Content Strategy"],
      status: "online",
      email: "kavya@sccinfotech.com",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  return (
    <section className="relative py-20 px-6 min-h-screen">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, 0, 5]} intensity={0.5} color="#0d8be0" />

          {teamMembers.map((member, index) => {
            const angle = (index / teamMembers.length) * Math.PI * 2;
            const radius = 4;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <TeamMember3D
                key={member.id}
                position={[x, 0, z]}
                isActive={activeTeamMember === index}
                onClick={() => setActiveTeamMember(index)}
              />
            );
          })}
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
            Meet Our <span className="text-[#0d8be0]">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate professionals dedicated to delivering exceptional results
            and innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              isActive={activeTeamMember === member.id}
              onClick={setActiveTeamMember}
            />
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Team Members", value: "45+" },
            { label: "Years Combined Experience", value: "200+" },
            { label: "Projects Delivered", value: "500+" },
            { label: "Client Satisfaction", value: "98%" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <div className="text-3xl font-bold text-[#0d8be0] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
