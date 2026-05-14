export interface Task {
  title: string;
  link: string;
}

export interface ModuleData {
  slug: string;
  number: string;
  title: string;
  description: string;
  color: string;
  backgroundImage: string;
  tasks: Task[];
  isLocked: boolean;
}

export const modulesData: ModuleData[] = [
  {
    slug: 'devaluation',
    number: 'Симптом 1',
    title: 'Обесценивание себя',
    description: 'В этом модуле ты разберёшь, почему откладываешь даже важные дела, и начнёшь менять это через маленькие понятные шаги.',
    color: '#4DB8B0',              // 🎨 БИРЮЗОВЫЙ — модуль 1
    backgroundImage: '/lavender.png',  // Картинка с лавандой
    isLocked: false,
    tasks: [
      { title: 'Первая встреча', link: 'first-meeting' },
      { title: 'Суд над внутренним критиком', link: 'in-development' },
      { title: 'Карточная игра «Сценарии»', link: 'card-game' },
      { title: 'Все самое нужное для дальнейшей жизни', link: 'in-development' },
    ],
  },
  {
    slug: 'lateness',
    number: 'Симптом 2',
    title: 'Хроническое опоздание',
    description: 'В этом модуле ты разберёшься, почему опаздываешь.',
    color: '#B87C57',              // 🎨 КОРИЧНЕВЫЙ/ТЕРРАКОТОВЫЙ — модуль 2 (ОТЛИЧАЕТСЯ!)
    backgroundImage: '/Frame 274 ирис.png',  // Картинка с ирисом (другая!)
    isLocked: false,
    tasks: [
      { title: 'Первая встреча', link: 'first-meeting' },
      { title: 'Суд над потерянным временем', link: 'in-development' },
      { title: 'Карточная игра «Сценарии»', link: 'card-game' },
      { title: 'Все самое нужное для дальнейшей жизни', link: 'in-development' },
    ],
  },
  {
    slug: 'mimicry',
    number: 'Симптом 3',
    title: 'Социальная мимикрия',
    description: 'Модуль временно недоступен',
    color: '#9B7EBD',              // 🎨 ФИОЛЕТОВЫЙ
    backgroundImage: '/orchid.png', // Картинка с орхидеей
    isLocked: true,
    tasks: [],
  },
  {
    slug: 'burnout',
    number: 'Симптом 4',
    title: 'Эмоциональное выгорание',
    description: 'Модуль временно недоступен',
    color: '#6B9E7A',              // 🎨 ЗЕЛЁНЫЙ
    backgroundImage: '/lotus.png',  // Картинка с лотосом
    isLocked: true,
    tasks: [],
  },
  {
    slug: 'rescue',
    number: 'Симптом 5',
    title: 'Спасательство / гиперпомощь',
    description: 'Модуль временно недоступен',
    color: '#D47B9E',              // 🎨 РОЗОВЫЙ
    backgroundImage: '/peony.png',  // Картинка с пионом
    isLocked: true,
    tasks: [],
  },
  {
    slug: 'procrastination',
    number: 'Симптом 6',
    title: 'Прокрастинация',
    description: 'Модуль временно недоступен',
    color: '#C9A961',              // 🎨 ЗОЛОТОЙ
    backgroundImage: '/sunflower.png', // Картинка с подсолнухом
    isLocked: true,
    tasks: [],
  },
];

export const getModuleBySlug = (slug: string): ModuleData | undefined => {
  return modulesData.find((module) => module.slug === slug);
};