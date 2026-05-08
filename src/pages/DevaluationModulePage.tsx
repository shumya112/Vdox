import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════
//  СЦЕНАРИИ ИГРЫ
// ═══════════════════════════════════════════════════
const scenarios = [
  {
    id: 1,
    title: 'Комплимент от коллеги',
    situation: 'Коллега говорит:\n«Ты отлично выступила на презентации! Я бы так не смогла».',
    critic: 'Твой внутренний критик уже открыл рот, чтобы сказать «да ладно, ерунда». Но ты же игрок.',
    instruction: 'Выбери достойный ответ',
    answers: [
      { text: '«Да ладно, ерунда. Это просто повезло, что вопросы были лёгкие»', correct: false },
      { text: '«Ты что, это было ужасно, я забыла половину текста»', correct: false },
      { text: '«Спасибо, но это платье такое, оно скрывает недостатки»', correct: false },
      { 
        text: '«Спасибо, мне приятно!» — улыбнуться и замолчать', 
        correct: true,
        points: 15,
        feedback: 'Твой внутренний критик в шоке. Он не знает, что делать с таким нахальством.'
      }
    ]
  },
  {
    id: 2,
    title: 'Своё достижение кажется «ничего особенным»',
    situation: 'Ты закончила сложный проект.\nДруг спрашивает: «Как ты это сделала? Это же очень трудно!»\nА твой мозг уже шепчет: «Да ничего особенного, просто работала».',
    critic: 'Не дай ему победить',
    instruction: 'Выбери ответ',
    answers: [
      { text: '«Да ничего сложного, просто делала свою работу»', correct: false },
      { text: '«Любой бы справился на моём месте»', correct: false },
      { text: '«Ты что, это вообще ерунда по сравнению с тем, что делают другие»', correct: false },
      { 
        text: '«Спасибо! Это правда потребовало много сил, но я рада, что получилось»', 
        correct: true,
        points: 20,
        feedback: 'Ты только что признала свои усилия. Это законно? Да.'
      }
    ]
  },
  {
    id: 3,
    title: 'Извинения за то, что занята',
    situation: 'Подруга зовёт гулять. Ты устала как собака после 10-часового рабочего дня. Твой рот уже открылся, чтобы выдать 15 извинений. Остановись.',
    critic: 'Выбери ответ',
    answers: [
      { text: '«Извини, я сегодня не могу, у меня голова болит, и вообще я не выспалась, и завтра рано вставать, прости, что подвела»', correct: false },
      { text: '«Извини, я как-нибудь в следующий раз»', correct: false },
      { text: '«Прости, что я такая неудобная подруга, вечно занята»', correct: false },
      { 
        text: '«Не могу сегодня, совсем нет сил. Давай созвонимся завтра» — без слова «извини»', 
        correct: true,
        points: 25,
        feedback: 'Ты только что сказала правду без извинений. Это уровень: босс.'
      }
    ]
  },
  {
    id: 4,
    title: 'Комплимент от партнёра',
    situation: 'Партнёр говорит:\n«Ты сегодня так красиво выглядишь».\nА ты думаешь:\n«Он врёт, я не накрашена и волосы торчат в разные стороны».',
    critic: 'Не спорь с комплиментом, это бессмысленно и скучно.',
    instruction: 'Выбери каким будет твой ответ',
    answers: [
      { text: '«Ты что, я выгляжу ужасно, не надо врать»', correct: false },
      { text: '«Это просто свет такой удачный»', correct: false },
      { text: '«Спасибо, но я не выспалась и вообще»', correct: false },
      { 
        text: '«Спасибо!» — улыбнуться и не добавлять ничего', 
        correct: true,
        points: 15,
        feedback: 'Ты просто приняла комплимент. Без драмы. Без анализа. Твой внутренний критик в обмороке.'
      }
    ]
  },
  {
    id: 5,
    title: 'Публичная похвала',
    situation: 'На общем совещании начальник говорит:\n«Отличная работа, [твоё имя], проект спасён».\n15 пар глаз смотрят на тебя. Твой внутренний критик предлагает провалиться сквозь землю. Не слушай его.',
    critic: 'Выбери каким будет твой ответ',
    answers: [
      { text: '«Это не я, это команда помогла» (хотя сделала 80% работы)', correct: false },
      { text: '«Да ладно, ничего особенного, просто повезло»', correct: false },
      { text: 'Молчишь, краснеешь, смотришь в пол', correct: false },
      { 
        text: '«Спасибо, я рада, что получилось» — улыбнуться и посмотреть в глаза', 
        correct: true,
        points: 30,
        feedback: 'Ты только что приняла публичную похвалу. Это уровень: экстрасенс. Браво.'
      }
    ]
  },
  {
    id: 6,
    title: 'Сравнение с другими',
    situation: 'Ты сдала отчёт вовремя.\nКоллега сделала его быстрее и лучше.\nТвой мозг: «Я ничего не умею, все вокруг лучше меня».',
    critic: 'Останови этот цирк',
    answers: [
      { text: '«Да, она молодец. А я — бездарность. Зачем я вообще это делала»', correct: false },
      { text: '«Ничего страшного, у неё просто опыта больше. Я всё равно ничего не добьюсь»', correct: false },
      { text: '«Ну и ладно. Мне всё равно. Я не хочу быть лучше всех»', correct: false },
      { 
        text: '«Она сделала хорошо. И я сделала хорошо по-своему. Моя работа имеет ценность, даже если не идеальна»', 
        correct: true,
        points: 25,
        feedback: 'Ты только что отделила себя от других. Это называется «здоровые границы». Редкий покемон.'
      }
    ]
  },
  {
    id: 7,
    title: 'Ошибка и стыд',
    situation: 'Ты допустила ошибку в работе.\nНикто не заметил, кроме тебя.\nТы уже час прокручиваешь в голове: «Какая же я дура». Твой внутренний критик включил повтор.',
    critic: 'Выбери что будешь делать',
    answers: [
      { text: '«Я ужасна. Я ничего не умею. Меня уволят»', correct: false },
      { text: '«Ничего страшного, все ошибаются. Но я-то должна быть лучше»', correct: false },
      { text: '«Ладно, забью. Всё равно уже ничего не исправить»', correct: false },
      { 
        text: '«Я ошиблась. Это неприятно, но не смертельно. Что я могу сделать сейчас, чтобы исправить?»', 
        correct: true,
        points: 25,
        feedback: 'Ты только что отделила себя от других. Это называется «здоровые границы». Редкий покемон.'
      }
    ]
  },
  {
    id: 8,
    title: 'Невозможность сказать «нет»',
    situation: 'Тебя просят о помощи в выходной. Ты уже согласилась, хотя хотела отдохнуть.\nТвой мозг: «Ну ничего, зато я хорошая».',
    critic: 'В следующий раз попробуй так',
    answers: [
      { text: '«Конечно, я всё брошу и помогу! Мне не сложно!»', correct: false },
      { text: '«Ну... ладно... хотя я очень устала...»', correct: false },
      { text: 'Молча сделать, но злиться весь день', correct: false },
      { 
        text: '«Сегодня не получится, я отдыхаю. Могу помочь в понедельник»', 
        correct: true,
        points: 25,
        feedback: 'Ты установила границу. Это нормально. Люди выживут.'
      }
    ]
  },
  {
    id: 9,
    title: 'Игнорирование усталости',
    situation: 'Ты работаешь 6 часов без перерыва. Голова гудит. Ты думаешь: «Я не могу остановиться, я ещё мало сделала». Твой внутренний критик аплодирует. Но он — плохой советчик.',
    critic: 'Выбери что будешь делать',
    answers: [
      { text: '«Я слабака, если остановлюсь. Надо терпеть, как все нормальные люди»', correct: false },
      { text: '«Ничего страшного, потом отдохну. Сейчас главное — доделать»', correct: false },
      { text: '«Я не заслужила отдых, потому что не сделала достаточно»', correct: false },
      { 
        text: '«Я устала. Моя усталость — это не слабость, а сигнал. Сделаю перерыв на 15 минут. Работа подождёт»', 
        correct: true,
        points: 25,
        feedback: 'Ты только что отнеслась к себе как к человеку, а не как к вечному двигателю. Редкий навык.'
      }
    ]
  },
  {
    id: 10,
    title: 'Сравнение с идеальными картинками в соцсетях',
    situation: 'Ты листаешь Instagram. У блогера идеальный дом, идеальные дети, идеальная фигура.\nТы думаешь: «У меня так никогда не будет. Я никчёмная». Стоп. Это ловушка.\nТы сравниваешь свои закулисье с чьим-то трейлером.',
    critic: 'Выбери что будешь делать',
    answers: [
      { text: '«Да, они молодцы. А я — неудачница. Зачем я вообще пытаюсь»', correct: false },
      { text: '«Надо тоже так стараться. Буду меньше спать и больше работать»', correct: false },
      { text: '«Всё равно это всё фейк и постановка. Ничего у них на самом деле нет»', correct: false },
      { 
        text: '«Я сравниваю свою реальную жизнь с чужой витриной. Это нечестное сравнение. У меня есть то, что ценно по-настоящему»', 
        correct: true,
        points: 30,
        feedback: 'Ты только что распознала механизм ловушки. Это уровень: детектив.'
      }
    ]
  },
  {
    id: 11,
    title: 'Вина за хорошую жизнь',
    situation: 'У тебя всё хорошо. Работа, отношения, здоровье.\nИ вдруг ты думаешь: «Почему у меня всё хорошо, когда у других проблемы? Я не имею права радоваться». Это классика. Твой внутренний критик обожает этот трюк.',
    critic: 'Выбери что будешь делать',
    answers: [
      { text: '«Да, я эгоистка. Надо меньше радоваться и больше думать о тех, кому плохо»', correct: false },
      { text: '«Ничего, это ненадолго. Скоро случится что-то плохое, как всегда»', correct: false },
      { text: '«Лучше не буду никому рассказывать, что у меня всё хорошо. Завидуют ещё»', correct: false },
      { 
        text: '«Моё счастье не крадёт счастье у других. Я имею право радоваться. И я могу одновременно радоваться за себя и сочувствовать тем, кому трудно — это не противоречит»', 
        correct: true,
        points: 35,
        feedback: 'Ты только что разрешила себе быть счастливой без вины. Это сложно. Но ты справилась.'
      }
    ]
  },
  {
    id: 12,
    title: 'Перфекционизм и прокрастинация',
    situation: 'Тебе нужно начать важный проект. Но ты думаешь: «Если не смогу сделать идеально, лучше вообще не начинать».\nИ откладываешь.',
    critic: 'Выбери что будешь делать',
    answers: [
      { text: 'Продолжать откладывать, пока не прижмёт', correct: false },
      { text: '«Надо просто заставить себя работать больше»', correct: false },
      { text: '«Я просто не способна на это»', correct: false },
      { 
        text: '«Сделанное лучше идеального. Начну с малого, потом улучшу»', 
        correct: true,
        points: 25,
        feedback: 'Ты выбрала действие вместо паралича. Это победа.'
      }
    ]
  },
  {
    id: 13,
    title: 'Отрицание своих потребностей',
    situation: 'Ты хочешь есть, но думаешь: «Ещё не время, пообедаю в 13:00 как положено».\nИли хочешь спать, но: «Нужно досмотреть сериал, уже поздно, но нельзя».',
    critic: 'Выбери что будешь делать',
    answers: [
      { text: 'Терпеть до последнего', correct: false },
      { text: '«Я слабая, если слушаю свои желания»', correct: false },
      { text: '«Все могут, а я нет. Что со мной не так»', correct: false },
      { 
        text: '«Моё тело знает лучше. Я поем/лягу, когда хочу»', 
        correct: true,
        points: 20,
        feedback: 'Ты доверилась своему телу. Это называется самоподдержка.'
      }
    ]
  },
  {
    id: 14,
    title: 'Финальный босс: признание своей ценности',
    situation: 'Ты прошла все сценарии. Теперь самое сложное.\nСкажи вслух: «Я достойна хорошего отношения. Просто так. Без условий».',
    critic: 'Что ты чувствуешь?',
    answers: [
      { text: '«Это неправда, я должна заслужить»', correct: false },
      { text: '«Мне неловко, я не привыкла»', correct: false },
      { text: 'Промолчать', correct: false },
      { 
        text: '«Я чувствую... и принимаю это»', 
        correct: true,
        points: 50,
        feedback: 'Ты прошла весь путь. Ты молодец. Помни: ты достойна хорошего отношения. Просто так. Без условий.'
      }
    ]
  }
];

// ─────────────────────────────────────────────
// NAVIGATION DATA
// ─────────────────────────────────────────────
const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

// ═══════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════
export const DevaluationModulePage: React.FC = () => {
  const [headerFixed, setHeaderFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({});
  const [showNextButton, setShowNextButton] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devaluationGameProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setTotalPoints(data.totalPoints || 0);
      setCompletedScenarios(data.completedScenarios || []);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('devaluationGameProgress', JSON.stringify({
      totalPoints,
      completedScenarios
    }));
  }, [totalPoints, completedScenarios]);

  // Header scroll handler
  useEffect(() => {
    const handleScroll = () => setHeaderFixed(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu logic
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = 'hidden';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = document.body.dataset.scrollY || '0';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      delete document.body.dataset.scrollY;
      window.scrollTo(0, parseInt(scrollY));
    }
    return () => {
      const scrollY = document.body.dataset.scrollY;
      if (scrollY) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY));
      }
    };
  }, [mobileMenuOpen]);

  const handleAnswerClick = (answerIndex: number) => {
    const answer = scenarios[currentScenario].answers[answerIndex];
    
    // Flip the card
    setFlippedCards(prev => ({ ...prev, [answerIndex]: true }));
    setShowNextButton(false);
    
    if (answer.correct) {
      // Add points only once per scenario
      if (!completedScenarios.includes(currentScenario)) {
        setTotalPoints(prev => prev + (answer.points || 0));
        setCompletedScenarios([...completedScenarios, currentScenario]);
      }
      // Show next button after a short delay
      setTimeout(() => setShowNextButton(true), 600);
    } else {
      // Wrong answer - show next button after delay to try another
      setTimeout(() => setShowNextButton(true), 600);
    }
  };

  const handleNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setFlippedCards({});
      setShowNextButton(false);
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setFlippedCards({});
    setShowNextButton(false);
    setTotalPoints(0);
    setCompletedScenarios([]);
    localStorage.removeItem('devaluationGameProgress');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const currentData = scenarios[currentScenario];
  const progress = ((currentScenario + 1) / scenarios.length) * 100;

  const footerNavLinks = [
    { text: 'О курсе', top: '142px' },
    { text: 'Симптомы', top: '188px' },
    { text: 'Как это работает', top: '234px' },
    { text: 'Специалисты', top: '280px' },
  ];

  return (
    <div style={styles.pageWrapper}>
      {/* ═══════════════════════════════════════
          GLOBAL STYLES & FONTS
         ═══════════════════════════════════════ */}
      <style>{`
        @font-face {
          font-family: 'Evolventa';
          src: url('https://db.onlinewebfonts.com/t/1e6b664b6d46b5f76c82d5284004fe0f.woff2') format('woff2'),
               url('https://db.onlinewebfonts.com/t/1e6b664b6d46b5f76c82d5284004fe0f.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'mr_GuardianCircusG';
          src: url('/mr_GuardianCircusG.woff2') format('woff2'),
               url('/mr_GuardianCircusG.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { min-height: 100%; width: 100%; margin: 0; padding: 0; overflow-x: hidden; }
        body { margin: 0; }
        .nav-pill { display: inline-flex; align-items: center; justify-content: center; height: 32px; border-radius: 53px; padding: 8px 16px; font-family: 'Evolventa', sans-serif; font-weight: 400; font-size: 16px; line-height: 21px; text-decoration: none; background: #FFF3E6; border: none; color: #3C1810; cursor: pointer; transition: all 0.25s ease; }
        .nav-pill:hover { background: #F5EDE4; transform: translateY(-1px); }
        .mobile-menu-btn { display: none; width: 40px; height: 40px; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; padding: 0; }
        .mobile-nav-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(243, 215, 186, 0.98); z-index: 200; flex-direction: column; align-items: center; justify-content: center; gap: 32px; backdrop-filter: blur(10px); }
        .mobile-nav-overlay.open { display: flex; animation: fadeIn 0.3s ease; }
        .mobile-nav-overlay a, .mobile-nav-overlay button { font-family: 'Evolventa', sans-serif; font-size: 24px; color: #3C1810; text-decoration: none; background: none; border: none; cursor: pointer; transition: color 0.2s; }
        .mobile-nav-overlay a:hover, .mobile-nav-overlay button:hover { color: #9B7ED9; }
        .mobile-close-btn { position: absolute; top: 24px; right: 24px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; padding: 0; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes flipCard { 
          from { transform: rotateY(0deg); } 
          to { transform: rotateY(180deg); } 
        }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
        .card-wrapper { perspective: '1000px'; }
        .card-inner { 
          position: relative; 
          width: 100%; 
          height: 100%; 
          text-align: center; 
          transition: transform 0.6s; 
          transform-style: preserve-3d; 
        }
        .card-inner.flipped { transform: rotateY(180deg); }
        .card-front, .card-back { 
          position: absolute; 
          width: 100%; 
          height: 100%; 
          backface-visibility: hidden; 
          border-radius: 12px;
        }
        .card-back { transform: rotateY(180deg); }
        .answer-card { background: #FFFFFF; border: 2px solid #F0E6DC; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s; text-align: left; display: flex; flex-direction: column; gap: 10px; min-height: 150px; }
        .answer-card:hover:not(:disabled) { border-color: #5DB9B0; transform: translateY(-5px); box-shadow: 0 8px 20px rgba(93, 185, 176, 0.2); }
        .answer-card:disabled { cursor: not-allowed; opacity: 0.7; }
        .answer-card.wrong { border-color: #E57373; background: #FFEBEE; }
        .answer-card.correct { border-color: #5DB9B0; background: #E8F5F3; }
        .next-btn { background: #5DB9B0; color: white; border: none; padding: 16px 40px; border-radius: 30px; font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-family: 'Evolventa', sans-serif; }
        .next-btn:hover { background: #4AA8A0; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(93, 185, 176, 0.3); }
        @media (min-width: 1400px) { .hero-container { margin-left: 120px !important; margin-right: auto !important; } }
        @media (min-width: 1200px) and (max-width: 1399px) { .hero-container { margin-left: 80px !important; margin-right: auto !important; } }
        @media (min-width: 992px) and (max-width: 1199px) { .hero-container { margin-left: 40px !important; margin-right: auto !important; max-width: 600px !important; } }
        @media (min-width: 768px) and (max-width: 991px) { .hero-container { margin-left: 20px !important; margin-right: 20px !important; max-width: 100% !important; } .site-header { max-width: 100% !important; border-radius: 0 !important; left: 0 !important; transform: none !important; } .header-inner { padding: 0 16px !important; } .nav-desktop { display: none !important; } .mobile-menu-btn { display: flex !important; } .header-link { display: none !important; } }
        @media (min-width: 576px) and (max-width: 767px) { .hero-container { margin-left: 16px !important; margin-right: 16px !important; max-width: 100% !important; padding: 0 12px !important; } .site-header { max-width: 100% !important; border-radius: 0 !important; left: 0 !important; transform: none !important; height: 70px !important; } .header-inner { padding: 0 16px !important; } .nav-desktop { display: none !important; } .mobile-menu-btn { display: flex !important; } .header-link { display: none !important; } .footer-section { height: auto !important; padding: 60px 20px !important; } .footer-inner { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 40px !important; } .footer-logo { position: static !important; width: 150px !important; height: auto !important; } .footer-nav { position: static !important; display: flex !important; flex-direction: column !important; align-items: center !important; gap: 20px !important; } .footer-nav a { position: static !important; font-size: 18px !important; } .footer-flowers { position: static !important; width: 100% !important; max-width: 400px !important; height: 120px !important; } }
        @media (max-width: 575px) { .hero-container { margin-left: 8px !important; margin-right: 8px !important; max-width: 100% !important; padding: 0 8px !important; } .site-header { max-width: 100% !important; border-radius: 0 !important; left: 0 !important; transform: none !important; height: 60px !important; padding: 12px 0 !important; } .header-inner { padding: 0 12px !important; } .nav-desktop { display: none !important; } .mobile-menu-btn { display: flex !important; } .header-link { display: none !important; } .footer-section { height: auto !important; padding: 40px 12px !important; } .footer-inner { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 32px !important; } .footer-logo { position: static !important; width: 120px !important; height: auto !important; } .footer-nav { position: static !important; display: flex !important; flex-direction: column !important; align-items: center !important; gap: 16px !important; } .footer-nav a { position: static !important; font-size: 16px !important; } .footer-flowers { position: static !important; width: 100% !important; max-width: 300px !important; height: 100px !important; } }
      `}</style>

      {/* MOBILE MENU */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
          <img src="/headersymbolclose.png" alt="Закрыть" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        </button>
        {navItems.map((item) => (
          <button key={item.label} onClick={() => scrollTo(item.href.replace('#', ''))}>{item.label}</button>
        ))}
        <button onClick={() => { 
          const url = new URL(window.location.href);
          url.hash = '#first-flower';
          url.search = '';
          window.location.href = url.toString();
          setMobileMenuOpen(false);
        }}>
          посадить первый цветок
        </button>
      </div>

      {/* HEADER */}
      <header className="site-header" style={{ position: 'fixed', width: 'calc(100% - 50px)', maxWidth: '1409px', height: '72px', left: '50%', transform: 'translateX(-50%)', top: headerFixed ? '16px' : '44px', background: '#FFFFFF', boxShadow: '0px 6px 12px rgba(39, 5, 5, 0.16)', borderRadius: '20px', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', transition: 'all 0.3s ease' }}>
        <img className="logo-img" src="/logo.png" alt="ВЫДОХ" style={{ height: 40, width: 'auto', display: 'block', objectFit: 'contain' }} />
        <nav className="nav-desktop" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', flex: 1, margin: '0 20px' }}>
          {navItems.map((item) => (<a key={item.label} href={item.href} className="nav-pill">{item.label}</a>))}
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <img src="/headersymbolclose.png" alt="Закрыть" style={{ width: 20, height: 20, objectFit: 'contain' }} /> : <img src="/headersymbol1.png" alt="Меню" style={{ width: 25, height: 16, objectFit: 'contain' }} />}
        </button>
        <a className="header-link" href="#first-flower" style={{ textAlign: 'right', width: '198px', fontFamily: 'Evolventa, sans-serif', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '21px', textDecorationLine: 'underline', color: '#3C1810', cursor: 'pointer' }}>
          посадить первый цветок
        </a>
      </header>

      {/* POINTS COUNTER */}
      <div style={{ position: 'fixed', right: '50px', top: headerFixed ? '30px' : '58px', background: '#5DB9B0', color: 'white', padding: '10px 24px', borderRadius: '20px', fontWeight: 700, fontSize: '18px', zIndex: 99, transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(93, 185, 176, 0.3)' }}>
        Очки: {totalPoints}
      </div>

      {/* MAIN CONTENT */}
      <main style={{ 
        paddingTop: '180px', 
        paddingBottom: '80px', 
        width: '100%', 
        position: 'relative', 
        background: 'linear-gradient(90deg, #FFF3E6 0%, #F3D7BA 15%, #F3D7BA 85%, #FFF3E6 100%)',
        overflow: 'hidden', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        
        {/* Module Info */}
        <div className="hero-container" style={{ position: 'relative', width: '100%', maxWidth: '1200px', marginLeft: '120px', marginRight: 'auto', padding: '0 20px', zIndex: 2, marginBottom: '40px' }}>
          <span style={{ display: 'block', color: '#9B8B7E', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Модуль: ОБЕСЦЕНИВАНИЕ СЕБЯ
          </span>
          <h1 style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '42px', lineHeight: '50px', color: '#3C1810', marginBottom: '32px', letterSpacing: '-0.02em' }}>
            Карточная игра «Сценарии»
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="hero-container" style={{ position: 'relative', width: '100%', maxWidth: '1200px', marginLeft: '120px', marginRight: 'auto', padding: '0 20px', zIndex: 2, marginBottom: '30px' }}>
          <div style={{ position: 'relative', height: '40px', background: '#F0E6DC', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', height: '100%', background: 'linear-gradient(90deg, #5DB9B0 0%, #8FD3C9 100%)', width: `${progress}%`, transition: 'width 0.5s ease', borderRadius: '20px' }} />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#6B5B4F', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'Evolventa, sans-serif' }}>
              Карта {currentScenario + 1} из {scenarios.length}
            </span>
          </div>
        </div>

        {/* Game Card Container */}
        <div className="hero-container" style={{ position: 'relative', width: '100%', maxWidth: '1200px', marginLeft: '120px', marginRight: 'auto', padding: '0 20px', zIndex: 2 }}>
          <div style={{ 
            background: '#F4F5F0', 
            borderRadius: '20px', 
            padding: '40px', 
            minHeight: '650px', 
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            position: 'relative'
          }}>
            {/* Scenario Info */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 600, fontSize: '24px', lineHeight: '32px', color: '#3C1810', marginBottom: '20px' }}>
                СЦЕНАРИЙ №{currentData.id}. {currentData.title}
              </h2>
              
              <div>
                <p style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '28px', color: '#6B5B4F', whiteSpace: 'pre-line', marginBottom: '15px' }}>
                  {currentData.situation}
                </p>
                {currentData.critic && (
                  <p style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '28px', color: '#8B7355', fontStyle: 'italic', marginBottom: '20px' }}>
                    {currentData.critic}
                  </p>
                )}
                {currentData.instruction && (
                  <p style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 600, fontSize: '18px', lineHeight: '28px', color: '#4A3B2E', marginBottom: '20px' }}>
                    {currentData.instruction}
                  </p>
                )}
              </div>
            </div>

            {/* Answer Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {currentData.answers.map((answer, index) => (
                <div key={index} className="card-wrapper" style={{ minHeight: '200px' }}>
                  <div className={`card-inner ${flippedCards[index] ? 'flipped' : ''}`} style={{ height: '100%' }}>
                    {/* Front */}
                    <div className="card-front">
                      <button
                        className="answer-card"
                        onClick={() => handleAnswerClick(index)}
                        disabled={flippedCards[index]}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          minHeight: '200px',
                          fontFamily: 'Evolventa, sans-serif',
                          border: flippedCards[index] ? '2px solid #ddd' : '2px solid #F0E6DC'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#9B8B7E', textTransform: 'uppercase' }}>Ответ</span>
                        <span style={{ fontSize: '14px', color: '#4A3B2E', lineHeight: '1.5', flexGrow: 1 }}>{answer.text}</span>
                        <span style={{ fontSize: '12px', color: '#5DB9B0', textAlign: 'right', fontWeight: 600 }}>Нажмите</span>
                      </button>
                    </div>
                    
                    {/* Back */}
                    <div className="card-back" style={{ 
                      background: answer.correct ? '#E8F5F3' : '#FFF9F9',
                      border: `2px solid ${answer.correct ? '#5DB9B0' : '#E57373'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px'
                    }}>
                      {answer.correct ? (
                        <>
                          <div style={{ fontSize: '24px', color: '#5DB9B0', fontWeight: 700, marginBottom: '10px', fontFamily: 'Evolventa, sans-serif' }}>
                            +{answer.points} очков
                          </div>
                          <p style={{ fontSize: '14px', color: '#6B5B4F', textAlign: 'center', lineHeight: '1.5', fontFamily: 'Evolventa, sans-serif' }}>
                            {answer.feedback}
                          </p>
                        </>
                      ) : (
                        <p style={{ fontSize: '14px', color: '#E57373', textAlign: 'center', fontFamily: 'Evolventa, sans-serif' }}>
                          Попробуйте другой вариант
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Button */}
            {showNextButton && (
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <button 
                  className="next-btn" 
                  onClick={currentScenario < scenarios.length - 1 ? handleNextScenario : handleRestart}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  {currentScenario < scenarios.length - 1 ? 'Следующая карта' : 'Начать заново'}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer-section" style={{ height: '547px', background: '#3C1810', boxShadow: '0px 27px 39px rgba(82, 82, 82, 0.08)', flexShrink: 0, width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="footer-inner" style={{ position: 'relative', width: '100%', maxWidth: '1734px', height: '100%', margin: '0 auto' }}>
          <div className="footer-logo" style={{ position: 'absolute', width: '198px', height: '76.59px', left: '164px', top: '145px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/flogo.png" alt="ВЫДОХ" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
          <div className="footer-nav">
            {footerNavLinks.map((item) => (
              <a key={item.text} href="#" style={{ position: 'absolute', left: '521px', top: item.top, fontFamily: "'Geometria', sans-serif", fontStyle: 'normal', fontWeight: 300, fontSize: '24px', lineHeight: '24px', color: '#FFFFFF', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#9B7ED9')} onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}>
                {item.text}
              </a>
            ))}
          </div>
          <div className="footer-flowers" style={{ position: 'absolute', width: '693px', height: '157px', left: '879px', top: '142px', backgroundImage: 'url("/fflowers.png")', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '15px' }} />
        </div>
      </footer>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: { minHeight: '100vh', width: '100%', fontFamily: 'Evolventa, sans-serif', color: '#3C1810', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowX: 'hidden' },
};

export default DevaluationModulePage;