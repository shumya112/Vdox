export interface ModuleData {
  id: string;
  slug: string;
  number: string;
  title: string;
  description?: string;
  isLocked: boolean;
  color?: string;
}

export const modulesData: ModuleData[] = [
  {
    id: '1',
    slug: 'devaluation',
    number: 'Симптом 1.',
    title: 'Обесценивание себя',
    isLocked: false,
    color: '#4DB8B0',
  },
  {
    id: '2',
    slug: 'chronic-lateness',
    number: 'Симптом 2.',
    title: 'Хроническое опоздание',
    isLocked: false,
    color: '#4DB8B0',
  },
  {
    id: '3',
    slug: 'social-mimicry',
    number: 'Симптом 3.',
    title: 'Социальная мимикрия',
    isLocked: true,
    color: '#999',
  },
  {
    id: '4',
    slug: 'emotional-burnout',
    number: 'Симптом 4.',
    title: 'Эмоциональное выгорание',
    isLocked: true,
    color: '#999',
  },
  {
    id: '5',
    slug: 'rescue-hyperhelp',
    number: 'Симптом 5.',
    title: 'Спасательство / гиперпомощь',
    isLocked: true,
    color: '#999',
  },
  {
    id: '6',
    slug: 'procrastination',
    number: 'Симптом 6.',
    title: 'Прокрастинация',
    isLocked: true,
    color: '#999',
  },
];

export const getModuleBySlug = (slug: string): ModuleData | undefined => {
  return modulesData.find(module => module.slug === slug);
};
