import { useState, useEffect } from 'react';

export type Theme = 
  | 'light' 
  | 'dark' 
  | 'cupcake' 
  | 'bumblebee' 
  | 'emerald' 
  | 'corporate' 
  | 'synthwave' 
  | 'retro' 
  | 'cyberpunk' 
  | 'valentine' 
  | 'halloween' 
  | 'garden' 
  | 'forest' 
  | 'aqua' 
  | 'lofi' 
  | 'pastel' 
  | 'fantasy' 
  | 'wireframe' 
  | 'black' 
  | 'luxury' 
  | 'dracula' 
  | 'cmyk' 
  | 'autumn' 
  | 'business' 
  | 'acid' 
  | 'lemonade' 
  | 'night' 
  | 'coffee' 
  | 'winter';

const THEME_STORAGE_KEY = 'scc-theme-preference';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then system preference, then default to 'dark'
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (savedTheme) return savedTheme;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply theme to HTML element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    changeTheme,
    toggleTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
  };
};