'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('notifications');

  const menuItems = [
    { id: 'feed', icon: 'home', label: 'Лента' },
    { id: 'messages1', icon: 'chat', label: 'Сообщения', badge: '0' },
    { id: 'messages2', icon: 'chat', label: 'Сообщения', badge: '458' },
    { id: 'notifications', icon: 'bell', label: 'Уведомления', badge: 'dot', isActive: true },
    { id: 'favorites', icon: 'bookmark', label: 'Избранное' },
    { id: 'subscribers', icon: 'people', label: 'Подписчики' },
    { id: 'shop', icon: 'bag', label: 'Магазин', badge: '0' },
    { id: 'balance', icon: 'wallet', label: 'Мой баланс' },
    { id: 'marketing', icon: 'chart', label: 'Маркетинг' },
    { id: 'schedule', icon: 'calendar', label: 'График работ' },
    { id: 'profile', icon: 'person', label: 'Профиль' }
  ];

  return (
    <aside className={styles.sidebar}>

      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>
            <img src="/images/profile.jpg" alt="Profile" />
          </div>
          <div className={styles.balance}>
            <span className={styles.balanceAmount}>560,000,690</span>
            <span className={styles.balanceIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="var(--primary-color)"/>
                <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="white"/>
                <path d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" fill="white"/>
                <circle cx="12" cy="12" r="2" fill="var(--primary-color)"/>
              </svg>
            </span>
          </div>
          <button className={styles.settingsButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>


      <nav className={styles.navigation}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.menuItem} ${item.isActive ? styles.active : ''}`}
            onClick={() => setActiveItem(item.id)}
          >
            <span className={`${styles.menuIcon} ${styles[item.icon]}`}></span>
            <span className={styles.menuLabel}>{item.label}</span>
            {item.badge === 'dot' && (
              <span className={styles.dotBadge}></span>
            )}
            {item.badge && item.badge !== 'dot' && (
              <span className={styles.badge}>{item.badge}</span>
            )}
            {item.isActive && <div className={styles.activeIndicator}></div>}
          </button>
        ))}
      </nav>
      

      <div className={styles.liveButtonContainer}>
        <button className={styles.liveButton}>
          Начать Live
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
