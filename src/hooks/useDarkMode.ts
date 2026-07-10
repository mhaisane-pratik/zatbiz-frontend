import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('bg-[#080b11]', 'text-[#f8fafc]');
      document.body.classList.add('bg-[#0c0a09]', 'text-[#fafaf9]');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('bg-[#080b11]', 'text-[#f8fafc]', 'bg-[#0c0a09]', 'text-[#fafaf9]');
      document.body.classList.add('bg-[#fafaf9]', 'text-[#1c1917]');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('themeMode');
    const isDark = saved === 'dark';
    setIsDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('themeMode', newMode ? 'dark' : 'light');
    applyTheme(newMode);
  };

  return { isDarkMode, toggleDarkMode };
}
