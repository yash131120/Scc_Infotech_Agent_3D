import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Users, MessageSquare, Phone } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import SimpleThemeToggle from './SimpleThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#services', label: 'Services', icon: Briefcase },
    { href: '#portfolio', label: 'Portfolio', icon: Briefcase },
    { href: '#team', label: 'Team', icon: Users },
    { href: '#testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '#contact', label: 'Contact', icon: Phone },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-base-100/80 backdrop-blur-md shadow-lg border-b border-base-300' 
          : 'bg-transparent'
      }`}
    >
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="navbar-start">
          <motion.a
            href="#home"
            className="btn btn-ghost text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary">SCC</span>
            <span className="text-base-content">INFOTECH</span>
          </motion.a>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  className="btn btn-ghost btn-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Theme Controls & Mobile Menu */}
        <div className="navbar-end gap-2">
          {/* Theme Selector (Desktop) */}
          <div className="hidden md:block">
            <ThemeSelector />
          </div>
          
          {/* Simple Theme Toggle (Mobile) */}
          <div className="block md:hidden">
            <SimpleThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              className="btn btn-ghost btn-circle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-base-100/95 backdrop-blur-md border-t border-base-300"
        >
          <ul className="menu p-4 gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  className="btn btn-ghost justify-start"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.a>
              </li>
            ))}
            
            {/* Mobile Theme Selector */}
            <li className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Theme</span>
                <ThemeSelector />
              </div>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;