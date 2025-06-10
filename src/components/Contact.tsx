import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Globe, 
  Clock,
  CheckCircle,
  User,
  MessageSquare
} from 'lucide-react';
import * as THREE from 'three';

const Floating3DPaperPlane = ({ isSubmitted }: { isSubmitted: boolean }) => {
  const meshRef = useRef<THREE.Group>();

  useFrame((state) => {
    if (meshRef.current) {
      if (isSubmitted) {
        meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 3;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 2;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.5;
      } else {
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef}>
        <mesh>
          <coneGeometry args={[0.3, 1, 4]} />
          <meshStandardMaterial 
            color={isSubmitted ? '#10B981' : '#12A594'}
            emissive={isSubmitted ? '#10B981' : '#12A594'}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Interactive3DGlobe = () => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshTransmissionMaterial
          color="#12A594"
          thickness={0.3}
          roughness={0.1}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.03}
          backside
        />
      </mesh>
    </Float>
  );
};

const ContactForm = ({ onSubmit, isSubmitted }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: 'mobile'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#12A594] focus:ring-2 focus:ring-[#12A594]/20 transition-all duration-300"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#12A594] focus:ring-2 focus:ring-[#12A594]/20 transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Company (Optional)
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#12A594] focus:ring-2 focus:ring-[#12A594]/20 transition-all duration-300"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Project Type
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#12A594] focus:ring-2 focus:ring-[#12A594]/20 transition-all duration-300"
          >
            <option value="mobile" className="bg-gray-800">Mobile App Development</option>
            <option value="web" className="bg-gray-800">Web Development</option>
            <option value="game" className="bg-gray-800">Game Development</option>
            <option value="design" className="bg-gray-800">UI/UX Design</option>
            <option value="marketing" className="bg-gray-800">Digital Marketing</option>
            <option value="other" className="bg-gray-800">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Project Details
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#12A594] focus:ring-2 focus:ring-[#12A594]/20 transition-all duration-300 resize-none"
          placeholder="Tell us about your project requirements, timeline, and budget..."
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitted}
        className="w-full bg-gradient-to-r from-[#12A594] to-teal-600 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#12A594]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitted ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Message Sent Successfully!
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

const Contact: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    setIsFormSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@sccinfotech.com',
      link: 'mailto:hello@sccinfotech.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 (261) 123-4567',
      link: 'tel:+912611234567'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Surat, Gujarat, India',
      link: 'https://maps.google.com/?q=Surat,Gujarat,India'
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'www.sccinfotech.com',
      link: 'http://www.sccinfotech.com'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM IST' },
    { day: 'Saturday', hours: '10:00 AM - 5:00 PM IST' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <section className="relative py-20 px-6 min-h-screen">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, 0, 5]} intensity={0.5} color="#12A594" />
          
          <Interactive3DGlobe />
          <Floating3DPaperPlane isSubmitted={isFormSubmitted} />
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
            Get In <span className="text-[#12A594]">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">Let's Start a Conversation</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-6 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#12A594]/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-[#12A594]/20 rounded-full flex items-center justify-center group-hover:bg-[#12A594] transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-[#12A594] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-semibold">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#12A594]" />
                Business Hours
              </h4>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{schedule.day}</span>
                    <span className="text-white font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-2xl font-bold text-[#12A594] mb-1">{'< 24hrs'}</div>
                <div className="text-gray-300 text-sm">Response Time</div>
              </div>
              <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-2xl font-bold text-[#12A594] mb-1">100%</div>
                <div className="text-gray-300 text-sm">Free Consultation</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-8">Start Your Project</h3>
            <ContactForm onSubmit={handleFormSubmit} isSubmitted={isFormSubmitted} />
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {isFormSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-[#12A594] to-teal-600 rounded-3xl p-8 text-center max-w-md mx-4">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/90">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;