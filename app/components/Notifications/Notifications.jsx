'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Notifications.module.css';
import Skeleton from '../Skeleton/Skeleton';
import AvatarPlaceholder from '../AvatarPlaceholder/AvatarPlaceholder';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useInfiniteNotifications } from '../../hooks/useInfiniteNotifications';

const mockNotifications = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'Алексей Петров',
      username: 'alexey_p',
      avatar: '/avatars/1.jpg'
    },
    content: 'Ваш пост о путешествиях',
    timestamp: '2 часа назад',
    isRead: false,
    isFollowing: false
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: 'Мария Иванова',
      username: 'maria_i',
      avatar: '/avatars/2.jpg'
    },
    content: 'Оставила комментарий: "Отличная статья!"',
    timestamp: '5 часов назад',
    isRead: true,
    isFollowing: true
  },
  {
    id: 3,
    type: 'repost',
    user: {
      name: 'Иван Сидоров',
      username: 'ivan_s',
      avatar: '/avatars/3.jpg'
    },
    content: 'Репостнул вашу запись',
    timestamp: 'вчера',
    isRead: false,
    isFollowing: false
  },
  {
    id: 4,
    type: 'follow',
    user: {
      name: 'Екатерина Волкова',
      username: 'ekaterina_v',
      avatar: '/avatars/4.jpg'
    },
    content: 'Подписалась на вас',
    timestamp: '2 дня назад',
    isRead: true,
    isFollowing: false
  },
  {
    id: 5,
    type: 'mention',
    user: {
      name: 'Дмитрий Козлов',
      username: 'dmitry_k',
      avatar: '/avatars/5.jpg'
    },
    content: 'Упомянул вас в комментарии',
    timestamp: '3 дня назад',
    isRead: false,
    isFollowing: true
  }
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [actionLog, setActionLog] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmText, setModalConfirmText] = useState('');
  const [modalCancelText, setModalCancelText] = useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch
  } = useInfiniteNotifications(5);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (data?.pages) {
      const allNotifications = data.pages.flatMap(page => page.notifications);
      setNotifications(allNotifications);
    }
  }, [data]);

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'communication') 
      return ['comment', 'mention'].includes(notification.type);
    if (activeTab === 'actions') 
      return ['like', 'repost', 'follow'].includes(notification.type);
    return true;
  });

  const getTabCount = (tabType) => {
    if (tabType === 'all') return notifications.length;
    if (tabType === 'communication') 
      return notifications.filter(n => ['comment', 'mention'].includes(n.type)).length;
    if (tabType === 'actions') 
      return notifications.filter(n => ['like', 'repost', 'follow'].includes(n.type)).length;
    return 0;
  };

  const handleUserClick = (e, user, notificationId) => {
    e?.stopPropagation?.();
    if (user && notificationId) {
      logAction(`Действие 1: Клик по пользователю ${user.name} (уведомление ${notificationId})`);
    }
  };

  const handleCardClick = (notificationId) => {
    logAction(`Действие 2: Клик по карточке уведомления ${notificationId}`);
    
    setNotifications(notifications.map(n => 
      n.id === notificationId ? {...n, isRead: true} : n
    ));
  };

  const handleMenuClick = (e, notificationId) => {
    e?.stopPropagation?.();
    if (notificationId) {
      setSelectedNotificationId(notificationId);
      setModalTitle('Удалить уведомление');
      setModalMessage('Вы уверены, что хотите удалить это уведомление?');
      setModalConfirmText('Удалить');
      setModalCancelText('Отменить');
      setIsModalOpen(true);
      logAction(`Действие 3: Клик по меню уведомления ${notificationId}`);
    }
  };

  const handleHeaderMenuClick = () => {
    setSelectedNotificationId(null);
    setModalTitle('Удалить все уведомления');
    setModalMessage('Вы уверены, что хотите удалить все уведомления?');
    setModalConfirmText('Удалить все');
    setModalCancelText('Отменить');
    setIsModalOpen(true);
    logAction('Действие 3: Клик по верхнему меню уведомлений');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNotificationId(null);
  };

  const handleDeleteNotification = () => {
    if (selectedNotificationId) {
      setNotifications(notifications.filter(n => n.id !== selectedNotificationId));
      logAction(`Удалено уведомление ${selectedNotificationId}`);
    } else {
      setNotifications([]);
      logAction('Удалены все уведомления');
    }
  };

  const handleFollowClick = (e, notificationId, currentStatus) => {
    e?.stopPropagation?.();
    if (notificationId !== undefined) {
      const newStatus = !currentStatus;
      logAction(`Подписка: ${newStatus ? 'Подписан' : 'Отписан'} (уведомление ${notificationId})`);
      
      setNotifications(notifications.map(n => 
        n.id === notificationId ? {...n, isFollowing: newStatus} : n
      ));
    }
  };

  const logAction = (message) => {
    setActionLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Уведомления</h1>
          <nav className={styles.tabs} role="tablist">
            <button className={`${styles.tab} ${styles.active}`}>Все</button>
            <button className={styles.tab}>Общение</button>
            <button className={styles.tab}>Действия</button>
          </nav>
        </header>
        <main className={styles.content}>
          <Skeleton type="card" count={5} />
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container} suppressHydrationWarning>
      <header className={styles.header}>
        <h1 className={styles.title}>Уведомления</h1>
        <button 
          className={styles.headerMenuButton}
          aria-label="Меню уведомлений"
          onClick={handleHeaderMenuClick}
        >
          ⋮
        </button>
        <nav className={styles.tabs} role="tablist">
          <button 
            className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
            role="tab"
            aria-selected={activeTab === 'all'}
            onClick={() => {
              setActiveTab('all');
              logAction('Переключение на вкладку "Все"');
            }}
          >
            Все ({getTabCount('all')})
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'communication' ? styles.active : ''}`}
            role="tab"
            aria-selected={activeTab === 'communication'}
            onClick={() => {
              setActiveTab('communication');
              logAction('Переключение на вкладку "Общение"');
            }}
          >
            Общение ({getTabCount('communication')})
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'actions' ? styles.active : ''}`}
            role="tab"
            aria-selected={activeTab === 'actions'}
            onClick={() => {
              setActiveTab('actions');
              logAction('Переключение на вкладку "Действия"');
            }}
          >
            Действия ({getTabCount('actions')})
          </button>
        </nav>
      </header>

      <main className={styles.content}>
        {isLoading ? (
          <Skeleton type="card" count={5} />
        ) : isError ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyIcon} aria-hidden="true">⚠️</div>
            <h2>Ошибка загрузки</h2>
            <p>Не удалось загрузить уведомления. Попробуйте обновить страницу.</p>
            <button 
              onClick={() => refetch()}
              className={styles.retryButton}
            >
              Попробовать снова
            </button>
          </section>
        ) : filteredNotifications.length === 0 ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyIcon} aria-hidden="true">
              <img src="/illustrations/empty.svg" alt="Пусто" width="180" height="180" />
            </div>
            <h2>Пока нет информации</h2>
            <p>
              Репосты, отметки «Нравится»
              <br />
              и многое другое — здесь вы найдете все
              <br />
              взаимодействия с контентом.
            </p>
          </section>
        ) : (
          <section className={styles.notificationsList} role="list">
            {filteredNotifications.map(notification => (
              <article 
                key={notification.id} 
                className={`${styles.notificationCard} ${!notification.isRead ? styles.unread : ''}`}
                onClick={() => handleCardClick(notification.id)}
                role="listitem"
              >
                <header className={styles.notificationHeader}>
                  <div className={styles.userInfo}>
                    <button 
                      className={styles.avatar}
                      onClick={(e) => handleUserClick(e, notification.user, notification.id)}
                      aria-label={`Профиль пользователя ${notification.user.name}`}
                    >
                      {(() => {
                        const isAction = ['like','repost','follow'].includes(notification.type);
                        const avatarSrc = (isAction && notification.user.name !== 'Malvina Ponchikon')
                          ? '/images/default-user.png'
                          : (notification.user.avatar || '/images/default-user.png');
                        return (
                          <img 
                            src={avatarSrc}
                            alt={notification.user.name}
                            onError={(e) => { e.currentTarget.src = '/images/default-user.png'; }}
                          />
                        );
                      })()}
                    </button>
                    <div className={styles.userDetails}>
                      <div className={styles.nameRow}>
                        <button 
                          className={styles.userName}
                          onClick={(e) => handleUserClick(e, notification.user, notification.id)}
                          aria-label={`Профиль пользователя ${notification.user.name}`}
                        >
                          {notification.user.name}
                        </button>
                        <span className={styles.inlineText}> {notification.content}</span>
                      </div>

                    </div>
                  </div>
                  
                  <div className={styles.actions}>
                    {notification.type === 'follow' ? (
                      <button 
                        className={`${styles.followButton} ${notification.isFollowing ? styles.following : ''}`}
                        onClick={(e) => handleFollowClick(e, notification.id, notification.isFollowing)}
                        aria-label={notification.isFollowing ? 'Отписаться от пользователя' : 'Подписаться на пользователя'}
                      >
                        {notification.isFollowing ? 'Подписан' : 'Подписаться'}
                      </button>
                    ) : (
                      <img className={styles.rightThumb} src={'/images/action-thumb.jpg'} alt="thumb" />
                    )}
                    <button 
                      className={styles.menuButton}
                      onClick={(e) => handleMenuClick(e, notification.id)}
                      aria-label="Дополнительные действия"
                    >
                      ⋮
                    </button>
                  </div>
                </header>
                
                <div className={styles.notificationContentCompact}>
                  <time className={styles.timestamp} dateTime={notification.timestamp}>{notification.timestamp}</time>
                </div>
                
              </article>
            ))}
            
            {isFetchingNextPage && (
              <div className={styles.loadingMore}>
                <Skeleton type="card" count={2} />
              </div>
            )}
            
            {hasNextPage && !isFetchingNextPage && (
              <div ref={loadMoreRef} className={styles.loadMoreTrigger}>
                <button 
                  onClick={() => fetchNextPage()}
                  className={styles.loadMoreButton}
                >
                  Загрузить еще
                </button>
              </div>
            )}
            
            {!hasNextPage && notifications.length > 0 && (
              <div className={styles.endOfList}>
                <p>Вы просмотрели все уведомления</p>
              </div>
            )}
          </section>
        )}
      </main>
      
      <aside className={styles.actionLog}>
        <h3>Лог действий:</h3>
        <div className={styles.logEntries}>
          {actionLog.map((entry, index) => (
            <div key={index} className={styles.logEntry}>{entry}</div>
          ))}
        </div>
      </aside>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteNotification}
        title={modalTitle}
        message={modalMessage}
        confirmText={modalConfirmText || 'Удалить'}
        cancelText={modalCancelText || 'Отменить'}
      />
    </div>
  );
};

export default Notifications;
