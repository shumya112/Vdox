import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleBySlug, type ModuleData } from '../data/modulesData';

// Навигация
const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

export const ModuleTemplatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<ModuleData | null>(null);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Найти модуль по slug
  useEffect(() => {
    if (slug) {
      const foundModule = getModuleBySlug(slug);
      if (foundModule) {
        setModule(foundModule);
      } else {
        navigate('/');
      }
    }
  }, [slug, navigate]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  if (!module) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Evolventa, sans-serif',
      }}>
        <p>Загрузка...</p>
      </div>
    );
  }

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
          line-height: 21px;
          text-decoration: none;
          background: #FFF3E6;
          border: none;
          color: #111111;
          white-space: nowrap;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .nav-pill:hover { opacity: 0.9; }

        .task-item {
          background: rgba(255, 255, 255, 0.7);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .task-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(61, 25, 3, 0.1);
        }

        .task-title {
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #3D1903;
        }

        .task-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          border-radius: 50px;
          padding: 0 20px;
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          text-decoration: none;
          background: #4DB8B0;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        .task-btn:hover {
          background: #3DA8A0;
        }

        @media (max-width: 768px) {
          .desktop-header {
            display: none !important;
          }
          .footer-section {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
          .mobile-footer {
            display: block !important;
          }
          .task-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .task-btn {
            align-self: flex-start;
          }
        }
      `}</style>

      {/* DESKTOP HEADER */}
      <header
        className="desktop-header"
        style={{
          position: 'fixed',
          top: headerFixed ? '0' : '20px',
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 24px',
          transition: 'top 0.3s ease',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            background: '#FFFFFF',
            borderRadius: '15px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            boxShadow: headerFixed ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Выдох лого"
              style={{ width: 149, height: 58, display: 'block', maxWidth: '100%' }}
            />
          </div>

          <nav
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              justifyContent: 'center',
              flex: 1,
              margin: '0 20px',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                className="nav-pill"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => scrollTo(item.href.replace('#', '')), 100);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            style={{
              textAlign: 'right',
              fontFamily: "'Evolventa', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '21px',
              textDecoration: 'underline',
              color: '#111111',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              background: 'none',
              border: 'none',
            }}
            onClick={() => navigate('/')}
          >
            посадить первый цветок
          </button>
        </div>
      </header>

      {/* MOBILE HEADER */}
      <header
        className="mobile-header"
        style={{
          display: 'none',
          position: 'fixed',
          width: 'calc(100% - 50px)',
          maxWidth: '380px',
          height: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '16px',
          background: '#FFFFFF',
          boxShadow: '0px 6px 12px rgba(39, 5, 5, 0.16)',
          borderRadius: '20px',
          zIndex: 100,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <img src="/logo.png" alt="ВЫДОХ" style={{ height: '40px', width: 'auto' }} />
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <img src="/headersymbolclose.png" alt="Закрыть" style={{ width: 20, height: 20 }} />
          ) : (
            <img src="/headersymbol1.png" alt="Меню" style={{ width: 25, height: 16 }} />
          )}
        </button>
      </header>

      {/* MOBILE MENU OVERLAY */}
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

      {/* MAIN CONTENT */}
      <main
        style={{
          width: '100%',
          background: `linear-gradient(180deg, #F5E6D3 0%, #FDF6EE 60%, #FFFFFF 100%)`,
          position: 'relative',
          minHeight: '70vh',
          paddingTop: '140px',
          paddingBottom: '80px',
          flex: 1,
        }}
      >
        {/* Background Image */}
        {module.backgroundImage && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url('/Frame 274 лаванда.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
              backgroundRepeat: 'no-repeat',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />
        )}

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {/* Breadcrumb */}
          <div style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: '21px',
            color: '#4DB8B0',
            marginBottom: '12px',
          }}>
            <span
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer', color: '#4DB8B0' }}
            >
              Главная
            </span>
            {' • '}
            <span>{module.number}</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: '1.2',
            color: '#3D1903',
            margin: '0 0 16px',
          }}>
            {module.title}
          </h1>

          {/* Description */}
          <p style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#3D1903',
            maxWidth: '500px',
            margin: '0 0 40px',
          }}>
            {module.description}
          </p>

          {/* Tasks List */}
          <div style={{ maxWidth: '700px', position: 'relative', zIndex: 2 }}>
            {module.tasks.map((task, index) => (
              <div key={index} className="task-item">
                <span className="task-title">{task.title}</span>
                <button 
                  className="task-btn"
                  onClick={() => {
                    if (task.link === 'in-development') {
                      alert('В разработке');
                    } else if (task.link === 'card-game') {
                      navigate(`/module/${module.slug}/scenario-game`);
                    } else {
                      navigate(`/module/${module.slug}/task/${task.link}`);
                    }
                  }}
                >
                  Перейти к заданию
                </button>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div style={{ marginTop: '40px' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#4DB8B0',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 32px',
                fontFamily: 'Evolventa',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#3DA8A0')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#4DB8B0')}
            >
              Вернуться к симптомам
            </button>
          </div>
        </div>
      </main>

      {/* DESKTOP FOOTER */}
      <footer
        className="footer-section"
        style={{
          width: '100%',
          background: '#3D1903',
          padding: '80px 0',
          boxShadow: '0px 27px 39px rgba(82, 82, 82, 0.08)',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '40px',
          alignItems: 'start',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          <div>
            <img
              src="/flogo.png"
              alt="fLogo"
              style={{ maxWidth: '198px', height: 'auto', display: 'block' }}
            />
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => scrollTo(item.href.replace('#', '')), 100);
                }}
                style={{
                  fontFamily: 'Geometria, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  lineHeight: '1.2',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div
            style={{
              width: '100%',
              minHeight: '157px',
              backgroundImage: 'url("/fflowers.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '15px',
            }}
          />
        </div>
      </footer>

      {/* MOBILE FOOTER */}
      <footer
        className="mobile-footer"
        style={{
          display: 'none',
          width: 'calc(100% - 50px)',
          maxWidth: '382px',
          margin: '0 auto',
          padding: '40px 25px',
          background: '#3D1903',
          borderRadius: '15px 15px 0 0',
          boxSizing: 'border-box',
        }}
      >
        <img src="/flogo.png" alt="ВЫДОХ" style={{ height: '40px', marginBottom: '24px', display: 'block' }} />
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={(e) => {
              e.preventDefault();
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
          style={{ width: '100%', marginTop: '24px', borderRadius: '15px', display: 'block' }}
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
    background: '#FFFFFF',
  },
};