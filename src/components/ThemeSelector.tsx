import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Sparkles, 
  Zap, 
  Heart, 
  Ghost,
  Leaf,
  Waves,
  Coffee,
  Snowflake,
  ChevronDown,
  Check
} from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const themeOptions: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    icon: Sun,
    description: 'Clean and bright',
    colors: { primary: '#570df8', secondary: '#f000b8', accent: '#37cdbe' }
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: Moon,
    description: 'Easy on the eyes',
    colors: { primary: '#661ae6', secondary: '#d926aa', accent: '#1fb2a5' }
  },
  {
    value: 'cupcake',
    label: 'Cupcake',
    icon: Heart,
    description: 'Sweet and soft',
    colors: { primary: '#65c3c8', secondary: '#ef9fbc', accent: '#eeaf3a' }
  },
  {
    value: 'synthwave',
    label: 'Synthwave',
    icon: Zap,
    description: 'Retro futuristic',
    colors: { primary: '#e779c1', secondary: '#58c7f3', accent: '#f3cc30' }
  },
  {
    value: 'dracula',
    label: 'Dracula',
    icon: Ghost,
    description: 'Dark and mysterious',
    colors: { primary: '#ff79c6', secondary: '#bd93f9', accent: '#ffb86c' }
  },
  {
    value: 'forest',
    label: 'Forest',
    icon: Leaf,
    description: 'Natural and calm',
    colors: { primary: '#1eb854', secondary: '#1fd65f', accent: '#1db584' }
  },
  {
    value: 'aqua',
    label: 'Aqua',
    icon: Waves,
    description: 'Ocean inspired',
    colors: { primary: '#09ecf3', secondary: '#966fb3', accent: '#ffe999' }
  },
  {
    value: 'coffee',
    label: 'Coffee',
    icon: Coffee,
    description: 'Warm and cozy',
    colors: { primary: '#db924b', secondary: '#263e3f', accent: '#10576d' }
  },
  {
    value: 'winter',
    label: 'Winter',
    icon: Snowflake,
    description: 'Cool and crisp',
    colors: { primary: '#047aed', secondary: '#463aa2', accent: '#c148ac' }
  },
  {
    value: 'cyberpunk',
    label: 'Cyberpunk',
    icon: Monitor,
    description: 'Neon and electric',
    colors: { primary: '#ff7598', secondary: '#75d1f0', accent: '#c7f59b' }
  }
];

const ThemeSelector: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentTheme = themeOptions.find(option => option.value === theme) || themeOptions[1];

  const handleThemeChange = async (newTheme: Theme) => {
    if (newTheme === theme) return;
    
    setIsAnimating(true);
    
    // Add a slight delay for visual feedback
    setTimeout(() => {
      changeTheme(newTheme);
      setIsOpen(false);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="relative">
      {/* Theme Selector Button */}
      <motion.div
        className="dropdown dropdown-end"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          className={`btn btn-ghost btn-circle glass backdrop-blur-md border border-opacity-20 hover:border-opacity-40 transition-all duration-300 ${
            isAnimating ? 'animate-theme-switch' : ''
          }`}
          animate={{
            rotate: isAnimating ? [0, 180, 360] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <currentTheme.icon className="w-5 h-5" />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.2 }}
              className="dropdown-content z-50 mt-2 w-80 max-h-96 overflow-y-auto"
            >
              <div className="card bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">Choose Theme</h3>
                  </div>
                  
                  <div className="grid gap-2">
                    {themeOptions.map((option) => {
                      const IconComponent = option.icon;
                      const isSelected = option.value === theme;
                      
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleThemeChange(option.value)}
                          className={`btn btn-ghost justify-start h-auto p-3 ${
                            isSelected ? 'btn-active' : ''
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          layout
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-content' : 'bg-base-200'}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              
                              <div className="text-left">
                                <div className="font-semibold">{option.label}</div>
                                <div className="text-xs opacity-70">{option.description}</div>
                              </div>
                            </div>
                            
                            {/* Color Preview */}
                            <div className="flex gap-1">
                              <div 
                                className="w-3 h-3 rounded-full border border-base-300"
                                style={{ backgroundColor: option.colors.primary }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full border border-base-300"
                                style={{ backgroundColor: option.colors.secondary }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full border border-base-300"
                                style={{ backgroundColor: option.colors.accent }}
                              />
                            </div>
                            
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-primary"
                              >
                                <Check className="w-4 h-4" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  <div className="divider my-2"></div>
                  
                  <div className="text-center">
                    <div className="text-sm opacity-70">
                      Current: <span className="font-semibold text-primary">{currentTheme.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSelector;