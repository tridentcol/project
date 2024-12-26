import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg transition-colors
        ${isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;