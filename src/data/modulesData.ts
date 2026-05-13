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
    color: '#4DB8B0',
    backgroundImage: '/lavender.png',
    isLocked: false,
    tasks: [
      { title: 'Первая встреча', link: '#' },
      { title: 'Суд над внутренним критиком', link: '#' },
      { title: 'Карточная игра «Сценарии»', link: '#' },
      { title: 'Все самое нужное для дальнейшей жизни', link: '#' },
    ],
  },
  {
    slug: 'lateness',
    number: 'Симптом 2',
    title: 'Хроническое опоздание',
    description: 'В этом модуле ты разберёшься, почему опаздываешь.',
    color: '#4DB8B0',
    backgroundImage: '/Frame 274 лаванда.png',
    isLocked: false,
    tasks: [
      { title: 'Первая встреча', link: '#' },
      { title: 'Суд над внутренним критиком', link: '#' },
      { title: 'Карточная игра «Сценарии»', link: '#' },
      { title: 'Все самое нужное для дальнейшей жизни', link: '#' },
    ],
  },
  {
    slug: 'mimicry',
    number: 'Симптом 3',
    title: 'Социальная мимикрия',
    description: 'Модуль временно недоступен',
    color: '#999',
    backgroundImage: '',
    isLocked: true,
    tasks: [],
  },
  {
    slug: 'burnout',
    number: 'Симптом 4',
    title: 'Эмоциональное выгорание',
    description: 'Модуль временно недоступен',
    color: '#999',
    backgroundImage: '',
    isLocked: true,
    tasks: [],
  },
  {
    slug: 'rescue',
    number: 'Симптом 5',
    title: 'Спасательство / гиперпомощь',
    description: 'Модуль временно недоступен',
    color: '#999',
    backgroundImage: '',
    isLocked: true,
    tasks: [],
  },
  {
    slug: 'procrastination',
    number: 'Симптом 6',
    title: 'Прокрастинация',
    description: 'Модуль временно недоступен',
    color: '#999',
    backgroundImage: '',
    isLocked: true,
    tasks: [],
  },
];

export const getModuleBySlug = (slug: string): ModuleData | undefined => {
  return modulesData.find((module) => module.slug === slug);
};