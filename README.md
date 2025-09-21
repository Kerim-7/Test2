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
│       ├── route.js             // Основной endpoint уведомлений
│       └── group/               // Группированные уведомления
│           └── [type]/
│               └── [id]/
│                   └── route.js # Endpoint для групп уведомлений
├── components/                   // React компоненты
│   ├── AvatarPlaceholder/       // Компонент аватара-заглушки
│   │   ├── AvatarPlaceholder.jsx
│   │   └── AvatarPlaceholder.module.css
│   ├── Notifications/           // Основной компонент уведомлений
│   │   ├── Notifications.jsx
│   │   └── Notifications.module.css
│   ├── Sidebar/                 // Боковая панель навигации
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.module.css
│   ├── Skeleton/                // Компонент скелетонов загрузки
│   │   ├── Skeleton.jsx
│   │   └── Skeleton.module.css
│   └── ThemeToggle/             // Переключатель темы
│       ├── ThemeToggle.jsx
│       └── ThemeToggle.module.css
├── hooks/                       // Пользовательские хуки
│   └── useInfiniteNotifications.js // Хук для бесконечной пагинации
├── providers/                   // Провайдеры контекста
│   └── QueryProvider.jsx        // Провайдер React Query
├── services/                    // Сервисы и API
│   └── api.js                   // API клиент и трансформация данных
├── globals.css                  // Глобальные стили и CSS переменные
├── layout.js                    // Корневой layout
└── page.js                      // Главная страница

next.config.js                   // Конфигурация Next.js
package.json                     // Зависимости проекта
package-lock.json               // Зафиксированные версии зависимостей
```

---