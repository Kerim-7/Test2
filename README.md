// Установка зависимостей
```bash
npm install
```

// Запуск в режиме разработки
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

// Сборка для продакшена
```bash
npm run build
npm start
```

// Структура проекта

```
app/
├── api/                          // API маршруты
│   └── notifications/            // API для уведомлений
│       ├── route.js              // Основной endpoint уведомлений
│       └── group/                // Группированные уведомления
│           └── [type]/
│               └── [id]/
│                   └── route.js  // Endpoint для групп уведомлений
├── components/                   // React компоненты
│   ├── AvatarPlaceholder/        // Компонент аватара‑заглушки
│   │   ├── AvatarPlaceholder.jsx
│   │   └── AvatarPlaceholder.module.css
│   ├── ConfirmationModal/        // Модальное окно подтверждения
│   │   ├── ConfirmationModal.jsx
│   │   └── ConfirmationModal.module.css
│   ├── Notifications/            // Основной компонент уведомлений
│   │   ├── Notifications.jsx
│   │   └── Notifications.module.css
│   ├── Sidebar/                  // Боковая панель навигации
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.module.css
│   ├── Skeleton/                 // Компонент скелетонов загрузки
│   │   ├── Skeleton.jsx
│   │   └── Skeleton.module.css
│   └── ThemeToggle/              // Переключатель темы
│       ├── ThemeToggle.jsx
│       └── ThemeToggle.module.css
├── hooks/                        // Пользовательские хуки
│   └── useInfiniteNotifications.js // Бесконечная пагинация (React Query + IntersectionObserver)
├── providers/                    // Провайдеры контекста
│   └── QueryProvider.jsx         // Провайдер React Query
├── services/                     // Сервисы и API
│   └── api.js                    // API‑клиент и трансформация данных
├── globals.css                   // Глобальные стили и CSS переменные
├── layout.js                     // Корневой layout (включает правую вертикальную линию)
└── page.js                       // Главная страница

public/
├── images/
│   ├── profile.jpg               // Аватар в сайдбаре
│   ├── default-user.png          // Дефолтный аватар пользователей
│   ├── action-thumb.jpg          // Превью справа в "Действиях"
│   └── malvina.jpg               // Аватар Malvina Ponchikon
└── illustrations/
    └── empty.svg                 // Пустое состояние уведомлений

next.config.js                    // Конфигурация Next.js
package.json                      // Зависимости проекта
package-lock.json                 // Зафиксированные версии зависимостей
```

---
