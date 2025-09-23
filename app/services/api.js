const API_BASE_URL = '';
const USE_DEMO_DATA = true;

export const transformNotification = (apiNotification) => {
  const isGrouped = apiNotification.users && apiNotification.users.length > 0;
  
  if (isGrouped) {
    return {
      id: `${apiNotification.type}_${apiNotification.target_id}_${apiNotification.created}`,
      type: apiNotification.type,
      user: {
        name: apiNotification.user.name,
        username: apiNotification.user.username.replace(/^@+/, ''),         avatar: apiNotification.user.avatar || null,         verified: apiNotification.user.verified,
        online: apiNotification.user.online
      },
      content: apiNotification.text,
      timestamp: formatTimestamp(apiNotification.created),
      isRead: false,
      isFollowing: false,
      isGrouped: true,
      otherCount: apiNotification.other_count,
      users: apiNotification.users.map(user => ({
        name: user.name,
        username: user.username.replace(/^@+/, ''),
        avatar: user.avatar
      }))
    };
  } else {
    return {
      id: `${apiNotification.type}_${apiNotification.target_id || 'single'}_${apiNotification.created}`,
      type: apiNotification.type,
      user: {
        name: apiNotification.user.name,
        username: apiNotification.user.username.replace(/^@+/, ''),         avatar: apiNotification.user.avatar || null,         verified: apiNotification.user.verified,
        online: apiNotification.user.online
      },
      content: apiNotification.text,
      timestamp: formatTimestamp(apiNotification.created),
      isRead: false,
      isFollowing: false,
      isGrouped: false,
      image: apiNotification.image
    };
  }
};

const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInMinutes < 1) {
    return 'только что';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} мин`;
  } else if (diffInHours < 24) {
    return `${diffInHours} час назад`;
  } else if (diffInDays === 1) {
    return 'вчера';
  } else if (diffInDays < 7) {
    return `${diffInDays} дн назад`;
  } else {
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} нед назад`;
    } else {
      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) {
        return `${diffInMonths} мес назад`;
      } else {
        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} г назад`;
      }
    }
  }
};

const mockNotifications = [
  // Общение
  {
    type: 'comment',
    target_id: 'reply_thanks_1',
    user: {
      online: true,
      avatar: '/images/profile.jpg',
      name: 'Planton Fernando',
      username: 'planton',
      verified: false,
      stories: null
    },
    text: 'ответил вам «Спасибо за комплимент»',
    created: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    image: '/images/action-thumb.jpg'
  },
  {
    type: 'mention',
    target_id: 'mention_king_1',
    user: {
      online: true,
      avatar: '/images/profile.jpg',
      name: 'Planton Fernando',
      username: 'planton',
      verified: false,
      stories: null
    },
    text: 'упомянул вас «Вы же знаете моего короля» лучшего? @redf мой лучший друг',
    created: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    image: '/images/action-thumb.jpg'
  },
  {
    type: 'mention',
    target_id: 'mention_king_2',
    user: {
      online: true,
      avatar: '/images/default-user.png',
      name: 'Dodik',
      username: 'dodik',
      verified: false,
      stories: null
    },
    text: 'упомянул вас «Вы же знаете моего короля» лучшего? @redf мой лучший друг',
    created: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    image: '/images/action-thumb.jpg'
  },
  // Действия
  // 1) Malvina Ponchikon опубликовал новый пост, коллекцию спайстори
  {
    type: 'repost',
    target_id: 'publish_post_1',
    user: {
      online: true,
      avatar: '/images/malvina.jpg',
      name: 'Malvina Ponchikon',
      username: 'malvina',
      verified: false,
      stories: null
    },
    text: 'опубликовал новый пост, коллекцию спайстори',
    created: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
    image: 'https://picsum.photos/seed/malvina1/56/56'
  },
  // 2) Malvina Ponchikon подписался на вашу общую подписку
  {
    type: 'follow',
    target_id: 'follow_common_1',
    user: {
      online: true,
      avatar: '/images/malvina.jpg',
      name: 'Malvina Ponchikon',
      username: 'malvina_follow',
      verified: false,
      stories: null
    },
    text: 'подписался на вашу общую подписку',
    created: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
    image: null
  },
  // 3) Planton Fernando, John Snowing looser и ещё 23 пользователям понравилась ваша публикация
  {
    type: 'like',
    target_id: 'likes_23_1',
    user: {
      online: true,
      avatar: 'https://i.pravatar.cc/48?img=14',
      name: 'Planton Fernando',
      username: 'planton',
      verified: false,
      stories: null
    },
    text: 'Planton Fernando, John Snowing looser и ещё 23 пользователям понравилась ваша публикация',
    created: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    image: 'https://picsum.photos/seed/likedpost/56/56'
  },
  // 4) Planton Fernando подписался на вас
  {
    type: 'follow',
    target_id: 'follow_planton_1',
    user: {
      online: true,
      avatar: 'https://i.pravatar.cc/48?img=15',
      name: 'Planton Fernando',
      username: 'planton_fernando',
      verified: false,
      stories: null
    },
    text: 'подписался на вас',
    created: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    image: null
  },
  // 5) Planton Fernando закончилась платная подписка
  {
    type: 'repost',
    target_id: 'paid_finish_1',
    user: {
      online: true,
      avatar: 'https://i.pravatar.cc/48?img=16',
      name: 'Planton Fernando',
      username: 'planton_paid',
      verified: false,
      stories: null
    },
    text: 'закончилась платная подписка',
    created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://icons.iconarchive.com/icons/iconsmind/outline/56/Chat-icon.png'
  }
];

export const fetchNotifications = async ({ pageParam = 0, limit = 10 }) => {
  if (USE_DEMO_DATA) {
    const startIndex = pageParam;
    const endIndex = Math.min(startIndex + limit, mockNotifications.length);
    const pageData = mockNotifications.slice(startIndex, endIndex);
    return {
      notifications: pageData.map(transformNotification),
      total: mockNotifications.length,
      limit: limit,
      offset: pageParam,
      hasMore: endIndex < mockNotifications.length,
      nextCursor: endIndex
    };
  }
  try {
    const response = await fetch(
      `/api/notifications?limit=${limit}&offset=${pageParam}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      notifications: data.results.map(transformNotification),
      total: data.total,
      limit: data.limit,
      offset: data.offset,
      hasMore: data.offset + data.limit < data.total,
      nextCursor: data.offset + data.limit
    };
  } catch (error) {
    
    const startIndex = pageParam;
    const endIndex = Math.min(startIndex + limit, mockNotifications.length);
    const pageData = mockNotifications.slice(startIndex, endIndex);
    
    return {
      notifications: pageData.map(transformNotification),
      total: mockNotifications.length,
      limit: limit,
      offset: pageParam,
      hasMore: endIndex < mockNotifications.length,
      nextCursor: endIndex
    };
  }
};

export const fetchNotificationGroup = async ({ notifType, targetId, pageParam = 0, limit = 10 }) => {
  try {
    const response = await fetch(
      `/api/notifications/group/${notifType}/${targetId}?limit=${limit}&offset=${pageParam}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      notifications: data.results.map(transformNotification),
      total: data.total,
      limit: data.limit,
      offset: data.offset,
      hasMore: data.offset + data.limit < data.total,
      nextCursor: data.offset + data.limit
    };
  } catch (error) {
    throw error;
  }
};
