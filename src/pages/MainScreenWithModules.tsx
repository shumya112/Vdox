import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modulesData } from '../data/modulesData';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

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

export const MainScreenWithModules = () => {
  const navigate = useNavigate();
  const [headerFixed, setHeaderFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
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

  useEffect(() => {
    const handleScroll = () => setHeaderFixed(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleModuleClick = (slug: string, isLocked: boolean) => {
    if (isLocked) return;
    navigate(`/module/${slug}`);
  };

  const linkColor = '#111';
  const pillBg = '#FFF3E6';
  const pillBorder = 'none';

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      fontFamily: 'Evolventa, sans-serif',
      color: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <style>{`
        @font-face {
          font-family: 'mr_GuardianCircusG';
          src: url('/fonts/mr_GuardianCircusG.woff2') format('woff2'),
               url('/fonts/mr_GuardianCircusG.woff') format('woff'),
               url('/fonts/mr_GuardianCircusG.ttf') format('truetype'),
               url('/fonts/mr_GuardianCircusG.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

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

        /* ===== RESET ===== */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root {
          min-height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        body { margin: 0; }

        #root {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 100vh;
        }

        .section-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .section-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .page-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .site-header {
          position: relative;
          z-index: 20;
          width: 100%;
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
        }
        .nav-pill:hover { opacity: 0.9; }

        /* ===== HERO SECTION ===== */
        .hero-section {
          width: 100%;
          background: linear-gradient(180deg, #F5E6D3 0%, #FDF6EE 60%, #FFFFFF 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/Цвитение.png');
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 140px 24px 100px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          z-index: 1;
          min-height: 500px;
        }

        .hero-title {
          font-family: 'mr_GuardianCircusG', cursive;
          font-size: clamp(36px, 5vw, 52px);
          line-height: 1.2;
          color: #3D1903;
          margin: 0 0 30px;
          z-index: 2;
          position: relative;
          max-width: 500px;
        }

        /* ===== SYMPTOMS SECTION ===== */
        .symptoms-section {
          width: 100%;
          background: #FFFFFF;
          padding: 40px 0 60px;
        }

        .symptoms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .symptom-card {
          background: #F7F6F1;
          border-radius: 16px;
          padding: 24px 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          min-height: 120px;
          position: relative;
        }

        .symptom-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(61, 25, 3, 0.08);
        }

        .symptom-card.locked {
          background: #E8E6E1;
          opacity: 0.7;
        }

        .symptom-card.locked:hover {
          transform: none;
          box-shadow: none;
        }

        .symptom-label {
          font-family: 'Evolventa', sans-serif;
          font-weight: 300;
          font-size: 14px;
          line-height: 21px;
          color: #4DB8B0;
          margin: 0;
        }

        .symptom-card.locked .symptom-label {
          color: #999;
        }

        .symptom-title {
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 20px;
          line-height: 26px;
          color: #3D1903;
          margin: 0;
        }

        .symptom-card.locked .symptom-title {
          color: #999;
        }

        .symptom-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 38px;
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
          align-self: flex-start;
          margin-top: auto;
        }

        .symptom-btn:hover {
          background: #3DA8A0;
        }

        .symptom-card.locked .symptom-btn {
          background: rgba(77, 184, 176, 0.4);
          cursor: not-allowed;
          pointer-events: none;
        }

        /* ===== FOOTER ===== */
        .footer-section {
          width: 100%;
          background: #3D1903;
          padding: 80px 0;
          box-shadow: 0px 27px 39px rgba(82, 82, 82, 0.08);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .footer-logo {
          max-width: 198px;
          height: auto;
          display: block;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-nav a {
          font-family: 'Geometria', sans-serif;
          font-weight: 300;
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.2;
          color: #FFFFFF;
          text-decoration: none;
          cursor: pointer;
          user-select: none;
        }

        .footer-nav a:hover {
          opacity: 0.8;
        }

        .footer-image {
          width: 100%;
          min-height: 157px;
          background-image: url("/fflowers.png");
          background-size: cover;
          background-position: center;
          border-radius: 15px;
        }

        /* ===== MOBILE MENU ===== */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fff;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          flex-direction: column;
          gap: 12px;
          z-index: 99;
        }

        .mobile-menu.open {
          display: flex;
        }

        /* ===== MOBILE HEADER (from MobileHomePage) ===== */
        .mobile-header {
          display: none;
          position: fixed;
          width: calc(100% - 50px);
          max-width: 380px;
          height: 72px;
          left: 50%;
          transform: translateX(-50%);
          top: 16px;
          background: #FFFFFF;
          box-shadow: 0px 6px 12px rgba(39, 5, 5, 0.16);
          border-radius: 20px;
          z-index: 100;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .mobile-header-logo {
          height: 40px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        .mobile-header-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-header-btn img {
          object-fit: contain;
        }

        /* ===== MOBILE MENU OVERLAY ===== */
        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 40;
          flex-direction: column;
          animation: fadeInUp 0.3s ease-out;
        }

        .mobile-menu-overlay.open {
          display: flex;
        }

        .mobile-menu-top {
          flex: 1;
          background: #FFF3E6;
          width: 100%;
          min-height: 39px;
          position: relative;
          overflow: hidden;
        }

        .mobile-menu-items {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0px;
          gap: 32px;
          position: absolute;
          width: 173px;
          height: 176px;
          left: 40px;
          top: calc(50% - 176px/2 - 1px);
        }

        .mobile-menu-item {
          text-align: left;
          font-family: 'Evolventa', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 24px;
          color: #3D1903;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          white-space: nowrap;
        }

        .mobile-menu-ellipse {
          position: absolute;
          width: 585px;
          height: 585px;
          left: 50%;
          transform: translateX(-50%);
          bottom: -300px;
          background: linear-gradient(102.83deg, #3D1903 -3.96%, #B87C57 77.14%);
          border-radius: 50%;
          z-index: 0;
        }

        .mobile-menu-bottom {
          position: relative;
          max-width: 430px;
          margin: 0 auto;
          padding: 32px 25px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .mobile-menu-cta {
          position: relative;
          top: -25px;
          width: 340px;
          background: #FFF3E6;
          color: #3D1903;
          font-family: 'Evolventa', sans-serif;
          font-size: 16px;
          line-height: 19px;
          font-weight: 700;
          padding: 16px 24px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }

        .mobile-menu-phone {
          position: relative;
          top: -30px;
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-family: 'Evolventa', sans-serif;
          font-size: 16px;
        }

        .mobile-menu-phone img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        /* ===== MOBILE FOOTER ===== */
        .mobile-footer {
          display: none;
          width: calc(100% - 50px);
          max-width: 382px;
          margin: 0 auto;
          padding: 40px 25px;
          background: #3D1903;
          border-radius: 15px 15px 0 0;
          box-sizing: border-box;
        }

        .mobile-footer-logo {
          height: 40px;
          margin-bottom: 24px;
          display: block;
        }

        .mobile-footer-link {
          display: block;
          padding: 8px 0;
          color: #F4F5F0;
          text-decoration: none;
          font-size: 16px;
          font-family: 'Evolventa', sans-serif;
        }

        .mobile-footer-image {
          width: 100%;
          margin-top: 24px;
          border-radius: 15px;
          display: block;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .symptoms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-image {
            grid-column: 1 / -1;
            min-height: 120px;
          }
        }

        @media (max-width: 768px) {
          /* Hide desktop header/footer */
          .desktop-header {
            display: none !important;
          }
          .footer-section {
            display: none !important;
          }

          /* Show mobile header/footer */
          .mobile-header {
            display: flex;
          }
          .mobile-footer {
            display: block;
          }

          .hero-inner {
            padding: 100px 16px 60px;
            min-height: 350px;
          }
          .hero-title {
            font-size: 36px;
          }
          .symptoms-grid {
            grid-template-columns: 1fr;
            padding: 0 16px;
          }
          .symptoms-section {
            padding: 30px 0 40px;
          }
          .section-content {
            padding: 0 16px;
          }
          .page-container {
            padding: 0 16px;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-overlay {
            display: none !important;
          }
        }
      `}</style>

      {/* ===== MOBILE HEADER ===== */}
      <header className="mobile-header">
        <img
          src="/logo.png"
          alt="ВЫДОХ"
          className="mobile-header-logo"
        />
        <button
          className="mobile-header-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <img
              src="/headersymbolclose.png"
              alt="Закрыть"
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <img
              src="/headersymbol1.png"
              alt="Меню"
              style={{ width: 25, height: 16 }}
            />
          )}
        </button>
      </header>

      {/* ===== MOBILE FULL-SCREEN MENU OVERLAY ===== */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-top">
          <div className="mobile-menu-items">
            {[
              { label: 'О курсе', id: 'about' },
              { label: 'Симптомы', id: 'symptoms' },
              { label: 'Как это работает', id: 'howitworks' },
              { label: 'Специалисты', id: 'specialists' },
            ].map((item) => (
              <button
                key={item.id}
                className="mobile-menu-item"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mobile-menu-ellipse" />

        <div className="mobile-menu-bottom">
          <button
            className="mobile-menu-cta"
            onClick={() => {
              window.location.hash = 'first-flower';
              setMobileMenuOpen(false);
            }}
          >
            Посадить первый цветок
          </button>

          <a href="tel:89913347070" className="mobile-menu-phone">
            <img src="/phone.png" alt="Телефон" />
            <span>8 (991) 334 70-70</span>
          </a>
        </div>
      </div>

      {/* ===== DESKTOP HEADER ===== */}
      <header
        className="site-header desktop-header"
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
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Выдох лого"
              style={{
                width: 149,
                height: 58,
                display: 'block',
                maxWidth: '100%',
              }}
            />
          </div>

          <nav style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
            flex: 1,
            margin: '0 20px',
          }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-pill"
                style={{
                  color: linkColor,
                  background: pillBg,
                  border: pillBorder,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#first-flower"
            style={{
              textAlign: 'right',
              fontFamily: "'Evolventa', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '21px',
              textDecorationLine: 'underline',
              color: '#111111',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            посадить первый цветок
          </a>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ width: '100%', marginTop: '0' }}>

        {/* Hero Section */}
        <section className="hero-section" id="about">
          <div className="hero-inner">
            <h1 className="hero-title">
              Твой первый<br />цветок ждет тебя
            </h1>
          </div>
        </section>

        {/* Symptoms Cards */}
        <section className="symptoms-section" id="symptoms">
          <div className="symptoms-grid">
            {modulesData.map((module) => (
              <div 
                className={`symptom-card ${module.isLocked ? 'locked' : ''}`} 
                key={module.slug}
              >
                {module.isLocked && <LockIcon />}
                <p className="symptom-label">{module.number}</p>
                <h3 className="symptom-title">{module.title}</h3>
                <button 
                  className="symptom-btn" 
                  style={{ 
                    display: 'inline-flex', 
                    textDecoration: 'none',
                    pointerEvents: module.isLocked ? 'none' : 'auto'
                  }}
                  onClick={() => handleModuleClick(module.slug, module.isLocked)}
                >
                  Перейти к модулю
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== DESKTOP FOOTER ===== */}
      <footer className="footer-section">
        <div className="section-content">
          <div className="footer-grid">
            <div>
              <img
                src="/flogo.png"
                alt="fLogo"
                className="footer-logo"
              />
            </div>

            <nav className="footer-nav">
              {[
                { text: 'О курсе', href: '#about' },
                { text: 'Симптомы', href: '#symptoms' },
                { text: 'Как это работает', href: '#howitworks' },
                { text: 'Специалисты', href: '#specialists' },
              ].map((item) => (
                <a key={item.text} href={item.href}>
                  {item.text}
                </a>
              ))}
            </nav>

            <div className="footer-image" />
          </div>
        </div>
      </footer>

      {/* ===== MOBILE FOOTER ===== */}
      <footer className="mobile-footer">
        <img src="/flogo.png" alt="ВЫДОХ" className="mobile-footer-logo" />

        {[
          { label: 'О курсе', id: 'about' },
          { label: 'Симптомы', id: 'symptoms' },
          { label: 'Как это работает', id: 'howitworks' },
          { label: 'Специалисты', id: 'specialists' },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-footer-link"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(item.id);
            }}
          >
            {item.label}
          </a>
        ))}

        <img src="/fflowers.png" alt="" className="mobile-footer-image" />
      </footer>
    </div>
  );
};
