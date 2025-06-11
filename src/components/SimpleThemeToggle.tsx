import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const SimpleThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isLight } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle glass backdrop-blur-md border border-opacity-20 hover:border-opacity-40 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={{ rotate: 180, scale: 0 }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 10
        }}
      >
        {isLight ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default SimpleThemeToggle;