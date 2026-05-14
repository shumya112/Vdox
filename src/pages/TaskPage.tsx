import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleBySlug } from '../data/modulesData';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

const taskData: { [key: string]: {
  title: string;
  subtitle: string;
  description: string;
  cards: Array<{
    title: string;
    text: string;
  }>;
  videoUrl?: string;
}} = {
  'first-meeting': {
    title: 'Сначала — короткое приветствие',
    subtitle: 'Первая встреча',
    description: 'Психолог расскажет, как устроен модуль, что тебя ждёт внутри и почему прокрастинация — это не лень, а сигнал, с которым можно работать.',
    cards: [
      {
        title: 'Почему ты откладываешь',
        text: 'Разберёшь скрытые причины прокрастинации без обвинений и самокритики.',
      },
      {
        title: 'Как начать действовать',
        text: 'Получишь простые практики, которые помогают сделать первый шаг.',
      },
      {
        title: 'Как закрепить результат',
        text: 'В конце модуля заполнишь трекер и увидишь свой прогресс.',
      },
    ],
    videoUrl: 'https://rutube.ru/play/embed/2b3bcfe832b9af660f579b67a02e6000/?p=4XENKIBpo_AHv7kaM6wvkw',
  },
  'inner-critic': {
    title: 'Суд над внутренним критиком',
    subtitle: 'Второе задание',
    description: 'Работа с внутренним критиком и самокритикой.',
    cards: [
      {
        title: 'Узнай своего критика',
        text: 'Поймёшь, как звучит твой внутренний критик.',
      },
      {
        title: 'Научись отвечать',
        text: 'Получишь техники работы с самокритикой.',
      },
      {
        title: 'Практика',
        text: 'Выполнишь упражнение по работе с критиком.',
      },
    ],
  },
};

export const TaskPage: React.FC = () => {
  const { slug, taskId } = useParams<{ slug: string; taskId: string }>();
  const navigate = useNavigate();
  const [headerFixed, setHeaderFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const module = slug ? getModuleBySlug(slug) : null;
  const task = taskId ? taskData[taskId] : null;

  if (taskId === 'in-development') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Evolventa, sans-serif' }}>
        <p>В разработке</p>
      </div>
    );
  }

  useEffect(() => {
    const handleScroll = () => setHeaderFixed(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = document.body.dataset.scrollY || '0';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      delete document.body.dataset.scrollY;
      window.scrollTo(0, parseInt(scrollY));
    }
    return () => {
      const scrollY = document.body.dataset.scrollY;
      if (scrollY) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY));
      }
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  if (!module || !task) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Evolventa, sans-serif' }}>
        <p>Загрузка...</p>
      </div>
    );
  }

  const isYouTube = task.videoUrl?.includes('youtube') || task.videoUrl?.includes('youtu.be');
  const isVimeo = task.videoUrl?.includes('vimeo');
  const isRutube = task.videoUrl?.includes('rutube');

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @font-face {
          font-family: 'Evolventa';
          src: url('/fonts/Evolventa-Regular.woff2') format('woff2'),
               url('/fonts/Evolventa-Regular.woff') format('woff'),
               url('/fonts/Evolventa-Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Evolventa';
          src: url('/fonts/Evolventa-Light.woff2') format('woff2'),
               url('/fonts/Evolventa-Light.woff') format('woff'),
               url('/fonts/Evolventa-Light.ttf') format('truetype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Evolventa';
          src: url('/fonts/Evolventa-Bold.woff2') format('woff2'),
               url('/fonts/Evolventa-Bold.woff') format('woff'),
               url('/fonts/Evolventa-Bold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geometria';
          src: url('/fonts/Geometria-Light.woff2') format('woff2'),
               url('/fonts/Geometria-Light.woff') format('woff'),
               url('/fonts/Geometria-Light.ttf') format('truetype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        .nav-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          border-radius: 53px;
          padding: 8px 16px;
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 16px;
          background: #FFF3E6;
          border: none;
          color: #111;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .nav-pill:hover { opacity: 0.9; }
        .info-card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 24px;
          flex: 1;
          min-width: 280px;
          transition: transform 0.2s;
        }
        .info-card:hover { transform: translateY(-4px); }
        .info-card-title {
          font-family: 'Evolventa', sans-serif;
          font-weight: 700;
          font-size: 16px;
          line-height: 1.3;
          color: #3D1903;
          margin-bottom: 12px;
        }
        .info-card-text {
          font-family: 'Evolventa', sans-serif;
          font-weight: 300;
          font-size: 14px;
          line-height: 1.5;
          color: #3D1903;
        }
        .video-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 40px auto 0;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(135deg, #8B7355 0%, #C4A586 100%);
          box-shadow: 0 10px 40px rgba(61, 25, 3, 0.2);
        }
        .video-container iframe,
        .video-container video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .video-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .play-button {
          width: 80px;
          height: 80px;
          border: 3px solid rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s, background 0.3s;
          background: rgba(255, 255, 255, 0.1);
        }
        .play-button:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 768px) {
          .desktop-header { display: none !important; }
          .footer-section { display: none !important; }
          .mobile-header { display: flex !important; }
          .mobile-footer { display: block !important; }
          .info-cards-wrapper { flex-direction: column !important; }
          .info-card { width: 100% !important; }
          .video-container { border-radius: 12px; }
        }
      `}</style>

      <header className="desktop-header" style={{
        position: 'fixed',
        top: headerFixed ? '0' : '20px',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 24px',
        transition: 'top 0.3s ease',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          background: '#FFFFFF',
          borderRadius: '15px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: headerFixed ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}>
          <img src="/logo.png" alt="Выдох" style={{ width: 149, height: 58 }} />
          <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', flex: 1, margin: '0 20px' }}>
            {navItems.map((item) => (
              <button 
                key={item.label} 
                className="nav-pill" 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => scrollTo(item.href.replace('#', '')), 100);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button 
            onClick={() => navigate('/')} 
            style={{
              fontFamily: 'Evolventa, sans-serif',
              fontSize: 16,
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#111',
              whiteSpace: 'nowrap',
            }}
          >
            посадить первый цветок
          </button>
        </div>
      </header>

      <header className="mobile-header" style={{
        display: 'none',
        position: 'fixed',
        width: 'calc(100% - 50px)',
        maxWidth: 380,
        height: 72,
        left: '50%',
        transform: 'translateX(-50%)',
        top: 16,
        background: '#FFFFFF',
        boxShadow: '0px 6px 12px rgba(39, 5, 5, 0.16)',
        borderRadius: 20,
        zIndex: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
      }}>
        <img src="/logo.png" alt="ВЫДОХ" style={{ height: 40, width: 'auto' }} />
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          style={{
            width: 40,
            height: 40,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileMenuOpen ? (
            <img src="/headersymbolclose.png" alt="Закрыть" style={{ width: 20, height: 20 }} />
          ) : (
            <img src="/headersymbol1.png" alt="Меню" style={{ width: 25, height: 16 }} />
          )}
        </button>
      </header>

      {mobileMenuOpen && (
        <div style={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          flexDirection: 'column',
          animation: 'fadeInUp 0.3s ease-out',
        }}>
          <div style={{
            flex: 1,
            background: '#FFF3E6',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '32px',
              position: 'absolute',
              width: '173px',
              height: '176px',
              left: '40px',
              top: 'calc(50% - 176px/2 - 1px)',
            }}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  style={{
                    textAlign: 'left',
                    fontFamily: 'Evolventa, sans-serif',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '24px',
                    color: '#3D1903',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => {
                    scrollTo(item.href.replace('#', ''));
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{
            position: 'absolute',
            width: '585px',
            height: '585px',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '-300px',
            background: 'linear-gradient(102.83deg, #3D1903 -3.96%, #B87C57 77.14%)',
            borderRadius: '50%',
            zIndex: 0,
          }} />
          <div style={{
            position: 'relative',
            maxWidth: '430px',
            margin: '0 auto',
            padding: '32px 25px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}>
            <button
              style={{
                position: 'relative',
                top: '-25px',
                width: '340px',
                background: '#FFF3E6',
                color: '#3D1903',
                fontFamily: 'Evolventa, sans-serif',
                fontSize: '16px',
                lineHeight: '19px',
                fontWeight: 700,
                padding: '16px 24px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
            >
              Посадить первый цветок
            </button>
            <a
              href="tel:89913347070"
              style={{
                position: 'relative',
                top: '-30px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontFamily: 'Evolventa, sans-serif',
                fontSize: '16px',
              }}
            >
              <img src="/phone.png" alt="Телефон" style={{ width: 24, height: 24 }} />
              <span>8 (991) 334 70-70</span>
            </a>
          </div>
        </div>
      )}

      <main style={{
        width: '100%',
        background: 'linear-gradient(180deg, #F5E6D3 0%, #FDF6EE 60%, #FFFFFF 100%)',
        paddingTop: 140,
        paddingBottom: 80,
        flex: 1,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 300,
            fontSize: 14,
            lineHeight: '21px',
            color: '#4DB8B0',
            marginBottom: 12,
          }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Главная</span>
            {' • '}
            <span onClick={() => navigate(`/module/${slug}`)} style={{ cursor: 'pointer' }}>{module.number}</span>
            {' • '}
            <span>{task.subtitle}</span>
          </div>

          <h1 style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: 1.2,
            color: '#3D1903',
            margin: '0 0 16px',
          }}>
            {task.title}
          </h1>

          <p style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 300,
            fontSize: 16,
            lineHeight: 1.5,
            color: '#3D1903',
            maxWidth: 700,
            marginBottom: 40,
          }}>
            {task.description}
          </p>

          <h2 style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 400,
            fontSize: 24,
            lineHeight: 1.2,
            color: '#3D1903',
            marginBottom: 24,
          }}>
            Что ты поймёшь в этом модуле
          </h2>

          <div className="info-cards-wrapper" style={{
            display: 'flex',
            gap: 16,
            marginBottom: 40,
            flexWrap: 'wrap',
          }}>
            {task.cards.map((card, index) => (
              <div key={index} className="info-card">
                <div className="info-card-title">{card.title}</div>
                <div className="info-card-text">{card.text}</div>
              </div>
            ))}
          </div>

          {task.videoUrl && (
            <div className="video-container">
              {isYouTube ? (
                <iframe
                  src={task.videoUrl}
                  title="Module Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isVimeo ? (
                <iframe
                  src={task.videoUrl}
                  title="Module Video"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : isRutube ? (
                <iframe
                  src={task.videoUrl}
                  title="Module Video"
                  frameBorder="0"
                  allow="clipboard-write; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls preload="metadata" poster="/video-poster.jpg">
                  <source src={task.videoUrl} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              )}
            </div>
          )}

          <div style={{ marginTop: 40 }}>
            <button 
              onClick={() => navigate(`/module/${slug}`)} 
              style={{
                background: '#4DB8B0',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 32px',
                fontFamily: 'Evolventa, sans-serif',
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#3DA8A0')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#4DB8B0')}
            >
              Вернуться к модулю
            </button>
          </div>
        </div>
      </main>

      <footer className="footer-section" style={{
        width: '100%',
        background: '#3D1903',
        padding: '80px 0',
        boxShadow: '0px 27px 39px rgba(82, 82, 82, 0.08)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 40,
        }}>
          <img src="/flogo.png" alt="fLogo" style={{ maxWidth: 198, height: 'auto', display: 'block' }} />
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => scrollTo(item.href.replace('#', '')), 100);
                }} 
                style={{
                  fontFamily: 'Geometria, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  lineHeight: 1.2,
                  color: '#FFFFFF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{
            minHeight: 157,
            backgroundImage: 'url("/fflowers.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 15,
          }} />
        </div>
      </footer>

      <footer className="mobile-footer" style={{
        display: 'none',
        width: 'calc(100% - 50px)',
        maxWidth: 382,
        margin: '0 auto',
        padding: '40px 25px',
        background: '#3D1903',
        borderRadius: '15px 15px 0 0',
        boxSizing: 'border-box',
      }}>
        <img src="/flogo.png" alt="ВЫДОХ" style={{ height: 40, marginBottom: 24, display: 'block' }} />
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              navigate('/');
              setTimeout(() => scrollTo(item.href.replace('#', '')), 100);
            }}
            style={{
              display: 'block',
              padding: '8px 0',
              color: '#F4F5F0',
              textDecoration: 'none',
              fontSize: '16px',
              fontFamily: 'Evolventa, sans-serif',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {item.label}
          </button>
        ))}
        <img
          src="/fflowers.png"
          alt=""
          style={{ width: '100%', marginTop: 24, borderRadius: 15, display: 'block' }}
        />
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    minHeight: '100vh',
    width: '100%',
    fontFamily: 'Evolventa, sans-serif',
    color: '#111',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};