const API_BASE_URL = '';

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
  {
    type: 'like',
    target_id: 'post_like_1',
    user: {
      online: true,
      avatar: null,       name: 'Алексей Петров',
      username: 'alexey_p',
      sex: 'male',
      verified: false,
      stories: null
    },
    text: 'Лайкнули ваш пост о путешествиях',
    created: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
    image: 'https://picsum.photos/seed/post1/48/48'
  },
  {
    type: 'comment',
    target_id: 'post_comment_1',
    user: {
      online: false,
      avatar: 'https://ui-avatars.com/api/?name=maria_i&size=48&background=5B19E7&color=fff&bold=true',
      name: 'Мария Иванова',
      username: 'maria_i',
      sex: 'female',
      verified: true,
      stories: { total_count: 3, seen_count: 1 }
    },
    text: 'Оставила комментарий: "Отличная статья!"',
    created: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    image: 'https://picsum.photos/seed/post2/48/48'
  },
  {
    type: 'repost',
    target_id: 'post_repost_1',
    user: {
      online: true,
      avatar: null,       name: 'Иван Сидоров',
      username: 'ivan_s',
      sex: 'male',
      verified: false,
      stories: null
    },
    text: 'Репостнул вашу запись',
    created: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://picsum.photos/seed/post3/48/48'
  },
  {
    type: 'follow',
    target_id: 'user_follow_1',
    user: {
      online: false,
      avatar: 'https://ui-avatars.com/api/?name=ekaterina_v&size=48&background=5B19E7&color=fff&bold=true',
      name: 'Екатерина Волкова',
      username: 'ekaterina_v',
      sex: 'female',
      verified: false,
      stories: null
    },
    text: 'Подписалась на вас',
    created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    image: null
  },
  {
    type: 'mention',
    target_id: 'post_mention_1',
    user: {
      online: true,
      avatar: null,       name: 'Дмитрий Козлов',
      username: 'dmitry_k',
      sex: 'male',
      verified: true,
      stories: { total_count: 7, seen_count: 2 }
    },
    text: 'Упомянул вас в комментарии',
    created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://picsum.photos/seed/post4/48/48'
  }
];

export const fetchNotifications = async ({ pageParam = 0, limit = 10 }) => {
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
