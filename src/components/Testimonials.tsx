import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, User } from 'lucide-react';
import * as THREE from 'three';

const FloatingTestimonial3D = ({ position, rotation, isActive }: any) => {
  const meshRef = useRef<THREE.Group>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={meshRef} position={position} rotation={rotation}>
        <RoundedBox args={[2, 1.2, 0.2]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color={isActive ? '#12A594' : '#374151'} 
            transparent
            opacity={0.8}
            emissive={isActive ? '#12A594' : '#000000'}
            emissiveIntensity={isActive ? 0.3 : 0}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          "Excellent Service"
        </Text>
      </group>
    </Float>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 justify-center mb-4">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-500 fill-current' : 'text-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, isActive }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 text-6xl text-[#12A594]">
            <Quote />
          </div>
        </div>

        <div className="relative z-10">
          {/* Rating */}
          <StarRating rating={testimonial.rating} />

          {/* Testimonial Text */}
          <blockquote className="text-xl md:text-2xl text-white text-center leading-relaxed mb-8 font-light">
            "{testimonial.content}"
          </blockquote>

          {/* Client Info */}
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#12A594] to-teal-400 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
              <p className="text-[#12A594] font-semibold mb-1">{testimonial.position}</p>
              <p className="text-gray-400 text-sm">{testimonial.company}</p>
            </div>
          </div>

          {/* Project Details */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="bg-[#12A594]/20 text-[#12A594] px-4 py-2 rounded-full text-sm font-semibold">
              {testimonial.projectType}
            </span>
            <span className="bg-white/10 text-gray-300 px-4 py-2 rounded-full text-sm">
              {testimonial.duration}
            </span>
            <span className="bg-white/10 text-gray-300 px-4 py-2 rounded-full text-sm">
              {testimonial.location}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechStart Inc.',
      location: 'San Francisco, USA',
      rating: 5,
      content: 'SCC Infotech delivered an exceptional mobile app that exceeded our expectations. Their attention to detail and commitment to quality is unmatched. The app has significantly boosted our user engagement and business growth.',
      projectType: 'Mobile App Development',
      duration: '4 months'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO',
      company: 'InnovateLabs',
      location: 'Toronto, Canada',
      rating: 5,
      content: 'Working with SCC Infotech was a game-changer for our business. They transformed our outdated system into a modern, efficient web platform. Their technical expertise and project management skills are outstanding.',
      projectType: 'Web Development',
      duration: '6 months'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      position: 'Marketing Director',
      company: 'GrowthCorp',
      location: 'London, UK',
      rating: 5,
      content: 'The team at SCC Infotech created a stunning e-commerce platform that has tripled our online sales. Their understanding of user experience and conversion optimization is remarkable. Highly recommended!',
      projectType: 'E-commerce Solution',
      duration: '5 months'
    },
    {
      id: 4,
      name: 'David Park',
      position: 'Founder',
      company: 'GameStudio Pro',
      location: 'Seoul, South Korea',
      rating: 5,
      content: 'SCC Infotech brought our game concept to life with incredible 3D graphics and smooth gameplay. Their Unity expertise and creative problem-solving made our AR game a huge success in the market.',
      projectType: 'Game Development',
      duration: '8 months'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      position: 'Operations Manager',
      company: 'HealthTech Solutions',
      location: 'Sydney, Australia',
      rating: 5,
      content: 'The healthcare management system developed by SCC Infotech has revolutionized our operations. The integration with existing systems was seamless, and the user interface is intuitive for our staff.',
      projectType: 'Healthcare Platform',
      duration: '7 months'
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      position: 'Business Owner',
      company: 'RetailHub',
      location: 'Dubai, UAE',
      rating: 5,
      content: 'From concept to deployment, SCC Infotech provided exceptional service. Their digital marketing strategies combined with the beautiful website they created have significantly increased our online presence.',
      projectType: 'Web + Marketing',
      duration: '3 months'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-20 px-6 min-h-screen flex items-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, 0, 5]} intensity={0.6} color="#12A594" />

          {testimonials.map((_, index) => {
            const angle = (index / testimonials.length) * Math.PI * 2;
            const radius = 5;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <FloatingTestimonial3D
                key={index}
                position={[x, 0, z]}
                rotation={[0, -angle, 0]}
                isActive={currentTestimonial === index}
              />
            );
          })}
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Client <span className="text-[#12A594]">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our satisfied clients about their success stories and experiences working with us
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={currentTestimonial}
              testimonial={testimonials[currentTestimonial]}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-[#12A594]/20 hover:border-[#12A594] transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-[#12A594]/20 hover:border-[#12A594] transition-all duration-300"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index 
                  ? 'bg-[#12A594] scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Happy Clients', value: '150+' },
            { label: 'Success Rate', value: '98%' },
            { label: 'Average Rating', value: '4.9' },
            { label: 'Repeat Clients', value: '85%' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-[#12A594] mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;