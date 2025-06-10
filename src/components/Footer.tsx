import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Facebook,
  ArrowUp,
  Code,
  Smartphone,
  Globe,
} from "lucide-react";
import * as THREE from "three";

const AnimatedGrid = () => {
  const pointsRef = useRef<THREE.Points>();

  // Create grid points
  const points = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    points[i * 3] = (Math.random() - 0.5) * 20;
    points[i * 3 + 1] = (Math.random() - 0.5) * 20;
    points[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.x += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0d8be0"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Mobile App Development", href: "#services" },
        { name: "Web Development", href: "#services" },
        { name: "Game Development", href: "#services" },
        { name: "UI/UX Design", href: "#services" },
        { name: "Digital Marketing", href: "#services" },
        { name: "IT Consulting", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#team" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
        { name: "Career", href: "#career" },
      ],
    },
    {
      title: "Technologies",
      links: [
        { name: "React & React Native", href: "#" },
        { name: "Flutter & Dart", href: "#" },
        { name: "Unity & C#", href: "#" },
        { name: "Laravel & PHP", href: "#" },
        { name: "Node.js & Express", href: "#" },
        { name: "Swift & Kotlin", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "White Papers", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "Support Center", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "#0077B5" },
    { icon: Twitter, href: "#", color: "#1DA1F2" },
    { icon: Github, href: "#", color: "#333" },
    { icon: Instagram, href: "#", color: "#E4405F" },
    { icon: Facebook, href: "#", color: "#1877F2" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "hello@sccinfotech.com",
      href: "mailto:hello@sccinfotech.com",
    },
    {
      icon: Phone,
      text: "+91 (261) 123-4567",
      href: "tel:+912611234567",
    },
    {
      icon: MapPin,
      text: "Surat, Gujarat, India",
      href: "https://maps.google.com/?q=Surat,Gujarat,India",
    },
  ];

  const stats = [
    { icon: Code, label: "Projects Completed", value: "500+" },
    { icon: Smartphone, label: "Mobile Apps", value: "200+" },
    { icon: Globe, label: "Countries Served", value: "25+" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <AnimatedGrid />
        </Canvas>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-8 right-8 z-20 w-12 h-12 bg-[#0d8be0] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-[#0d8be0]/25 transition-all duration-300"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </motion.button>

      <div className="relative z-10 bg-gradient-to-b from-transparent via-black/50 to-black">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          {/* Top Section */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  <span className="text-[#0d8be0]">SCC</span> INFOTECH
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Innovating mobile and web solutions worldwide. We transform
                  your ideas into powerful digital experiences that drive
                  business growth and success.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-gray-300 hover:text-[#0d8be0] transition-colors duration-300"
                  >
                    <info.icon className="w-5 h-5" />
                    <span>{info.text}</span>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0d8be0] transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-2 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-white mb-6">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: linkIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-[#0d8be0] transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 py-12 border-y border-white/10"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-[#0d8be0]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#0d8be0]" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <h4 className="text-2xl font-bold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates on technology
              trends, project insights, and company news.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#0d8be0] focus:ring-2 focus:ring-[#0d8be0]/20 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0d8be0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0f8a7a] transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 SCC INFOTECH. All rights reserved. |
                <a
                  href="#"
                  className="hover:text-[#0d8be0] transition-colors duration-300 ml-1"
                >
                  Privacy Policy
                </a>{" "}
                |
                <a
                  href="#"
                  className="hover:text-[#0d8be0] transition-colors duration-300 ml-1"
                >
                  Terms of Service
                </a>
              </div>
              <div className="text-gray-400 text-sm">
                Made with ❤️ in Surat, India
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
