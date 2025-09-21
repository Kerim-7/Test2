'use client';

import styles from './AvatarPlaceholder.module.css';

const AvatarPlaceholder = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`${styles.placeholder} ${styles[size]} ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="url(#avatarGradient)" />
        
        <circle cx="50" cy="45" r="25" fill="#fdbcb4" />
        
        <path d="M 25 40 Q 50 10 75 40 L 70 55 Q 50 75 30 55 Z" fill="#6a1b9a" />
        
        <path d="M 40 55 Q 50 65 60 55" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e0e0" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AvatarPlaceholder;
