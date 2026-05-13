import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleBySlug, type ModuleData } from '../data/modulesData';

// SVG иконка замка
const LockIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', right: '20px', top: '20px' }}
  >
    <rect x="5" y="11" width="14" height="10" rx="2" fill="white" fillOpacity="0.6"/>
    <path d="M8 11V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="white" fillOpacity="0.6"/>
  </svg>
);

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
        // Модуль не найден — редирект на главную
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

  // Если модуль не найден или заблокирован
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

  if (module.isLocked) {
    return (
      <div style={styles.pageWrapper}>
        {/* Header */}
        <header style={{ ...styles.header, ...(headerFixed ? styles.headerFixed : {}) }}>
          <div style={styles.headerContent}>
            <img src="/flogo.png" alt="Logo" style={styles.logo} />
            <nav style={styles.desktopNav}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href.replace('#', ''))}
                  style={styles.navPill}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              style={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(true)}
            >
              <img src="/burger.svg" alt="Menu" style={styles.burgerIcon} />
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenuOverlay}>
            <div style={styles.mobileMenuTop}>
              <div style={styles.mobileMenuItems}>
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.href.replace('#', ''))}
                    style={styles.mobileMenuItem}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={styles.mobileMenuEllipse} />
            <div style={styles.mobileMenuBottom}>
              <button
                style={styles.mobileMenuCta}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
              >
                Вернуться на главную
              </button>
              <button
                style={styles.mobileMenuPhone}
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src="/close.svg" alt="Close" style={styles.closeIcon} />
              </button>
            </div>
          </div>
        )}

        {/* Main Content - Locked State */}
        <main style={styles.mainContent}>
          <div style={styles.lockedContainer}>
            <LockIcon />
            <h1 style={styles.lockedTitle}>{module.title}</h1>
            <p style={styles.lockedDescription}>
              Этот модуль временно недоступен. Пройдите предыдущие модули, чтобы открыть его.
            </p>
            <button
              onClick={() => navigate('/')}
              style={styles.backButton}
            >
              Вернуться к симптомам
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Для разблокированных модулей — здесь будет контент конкретного модуля
  // Сейчас показываем заглушку
  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <header style={{ ...styles.header, ...(headerFixed ? styles.headerFixed : {}) }}>
        <div style={styles.headerContent}>
          <img src="/flogo.png" alt="Logo" style={styles.logo} />
          <nav style={styles.desktopNav}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href.replace('#', ''))}
                style={styles.navPill}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            style={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(true)}
          >
            <img src="/burger.svg" alt="Menu" style={styles.burgerIcon} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenuOverlay}>
          <div style={styles.mobileMenuTop}>
            <div style={styles.mobileMenuItems}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href.replace('#', ''))}
                  style={styles.mobileMenuItem}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div style={styles.mobileMenuEllipse} />
          <div style={styles.mobileMenuBottom}>
            <button
              style={styles.mobileMenuCta}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/');
              }}
            >
              Вернуться на главную
            </button>
            <button
              style={styles.mobileMenuPhone}
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src="/close.svg" alt="Close" style={styles.closeIcon} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.moduleContainer}>
          <span style={{ ...styles.moduleLabel, color: module.color }}>{module.number}</span>
          <h1 style={styles.moduleTitle}>{module.title}</h1>
          <div style={styles.modulePlaceholder}>
            <p>Контент модуля будет загружен здесь</p>
            <button
              onClick={() => navigate('/')}
              style={styles.backButton}
            >
              Вернуться к симптомам
            </button>
          </div>
        </div>
      </main>
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
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
    background: 'transparent',
  },
  headerFixed: {
    background: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: '40px',
    width: 'auto',
  },
  desktopNav: {
    display: 'flex',
    gap: '12px',
  },
  navPill: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    borderRadius: '53px',
    padding: '8px 16px',
    fontFamily: 'Evolventa, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    background: '#FFF3E6',
    border: 'none',
    color: '#111',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
  },
  burgerIcon: {
    width: '24px',
    height: '24px',
  },
  mobileMenuOverlay: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
    flexDirection: 'column',
  },
  mobileMenuTop: {
    flex: 1,
    background: '#FFF3E6',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  mobileMenuItems: {
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
  },
  mobileMenuItem: {
    textAlign: 'left',
    fontFamily: 'Evolventa, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '24px',
    color: '#3D1903',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    whiteSpace: 'nowrap',
  },
  mobileMenuEllipse: {
    position: 'absolute',
    width: '585px',
    height: '585px',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-300px',
    background: 'linear-gradient(102.83deg, #3D1903 -3.96%, #B87C57 77.14%)',
    borderRadius: '50%',
    zIndex: 0,
  },
  mobileMenuBottom: {
    position: 'relative',
    maxWidth: '430px',
    margin: '0 auto',
    padding: '32px 25px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  mobileMenuCta: {
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
  },
  mobileMenuPhone: {
    width: '40px',
    height: '40px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: '24px',
    height: '24px',
  },
  mainContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '140px 24px 60px',
    flex: 1,
  },
  lockedContainer: {
    background: '#F7F6F1',
    borderRadius: '16px',
    padding: '40px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    position: 'relative',
    textAlign: 'center',
  },
  lockedTitle: {
    fontFamily: 'Evolventa, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '1.2',
    color: '#3D1903',
    margin: '20px 0 16px',
  },
  lockedDescription: {
    fontFamily: 'Evolventa, sans-serif',
    fontWeight: 300,
    fontSize: '18px',
    lineHeight: '1.5',
    color: '#666',
    maxWidth: '500px',
    marginBottom: '32px',
  },
  moduleContainer: {
    background: '#F7F6F1',
    borderRadius: '16px',
    padding: '40px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  moduleLabel: {
    fontFamily: 'Evolventa, sans-serif',
    fontWeight: 300,
    fontSize: '14px',
    lineHeight: '21px',
  },
  moduleTitle: {
    fontFamily: 'Evolventa, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '1.2',
    color: '#3D1903',
    margin: 0,
  },
  modulePlaceholder: {
    marginTop: '40px',
    padding: '40px',
    background: '#FFFFFF',
    borderRadius: '12px',
    textAlign: 'center',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    borderRadius: '50px',
    padding: '0 32px',
    fontFamily: 'Evolventa, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    background: '#4DB8B0',
    border: 'none',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    marginTop: '20px',
  },
};
