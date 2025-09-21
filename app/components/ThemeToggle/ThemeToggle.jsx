'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [isSwitching, setIsSwitching] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = async () => {
    if (isSwitching || typeof window === 'undefined') return;
    
    setIsSwitching(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsSwitching(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <button 
      className={`${styles.themeToggle} ${isSwitching ? styles.switching : ''}`}
      onClick={toggleTheme}
      disabled={isSwitching}
      aria-label={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
    >
      <span>{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
};

export default ThemeToggle;
