import { useEffect, useState } from 'react';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

export const DevaluationModulePage = () => {
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

        /* ===== MOBILE HEADER ===== */
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
        }

        @media (max-width: 768px) {
          .desktop-header {
            display: none !important;
          }
          .desktop-footer {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
          .mobile-footer {
            display: block !important;
          }
          .symptoms-grid {
            grid-template-columns: 1fr;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      {/* ===== DESKTOP HEADER ===== */}
      <header className={`site-header desktop-header ${headerFixed ? 'header-fixed' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: headerFixed ? '#FFFFFF' : 'transparent',
        boxShadow: headerFixed ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
      }}>
        <div className="page-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
        }}>
          <img
            src="/flogo.png"
            alt="fLogo"
            style={{
              height: '40px',
              width: 'auto',
              display: 'block',
              cursor: 'pointer',
            }}
            onClick={() => {
              window.location.hash = '';
              window.location.href = '/';
            }}
          />

          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                className="nav-pill"
                href={item.href}
                style={{
                  background: pillBg,
                  border: pillBorder,
                  color: linkColor,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
            }}
          >
            <img src="/menu.svg" alt="Menu" style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
      </header>

      {/* ===== MOBILE HEADER ===== */}
      <header className="mobile-header">
        <img
          src="/flogo.png"
          alt="fLogo"
          className="mobile-header-logo"
        />
        <button
          className="mobile-header-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          <img src="/menu.svg" alt="Menu" />
        </button>
      </header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-top">
          <div className="mobile-menu-ellipse"></div>
          <div className="mobile-menu-items">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="mobile-menu-item"
                onClick={() => {
                  scrollTo(item.href.substring(1));
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mobile-menu-bottom">
          <button className="mobile-menu-cta">Записаться на курс</button>
          <a href="tel:+79991234567" className="mobile-menu-phone">
            <img src="/phone.svg" alt="Phone" />
            <span>+7 (999) 123-45-67</span>
          </a>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ width: '100%', marginTop: '80px', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="page-container">
          <h1 style={{
            fontFamily: 'mr_GuardianCircusG',
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: '#3D1903',
            marginBottom: '24px',
          }}>
            Обесценивание себя
          </h1>
          <p style={{
            fontFamily: 'Evolventa',
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#111',
            maxWidth: '800px',
          }}>
            Здесь будет контент модуля про обесценивание себя...
          </p>
        </div>
      </main>

      {/* ===== DESKTOP FOOTER ===== */}
      <footer className="footer-section desktop-footer">
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
                <a
                  key={item.text}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = item.href;
                  }}
                >
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
        <img
          src="/flogo.png"
          alt="fLogo"
          className="mobile-footer-logo"
        />
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { text: 'О курсе', href: '#about' },
            { text: 'Симптомы', href: '#symptoms' },
            { text: 'Как это работает', href: '#howitworks' },
            { text: 'Специалисты', href: '#specialists' },
          ].map((item) => (
            <a
              key={item.text}
              href={item.href}
              className="mobile-footer-link"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = item.href;
              }}
            >
              {item.text}
            </a>
          ))}
        </nav>
        <img
          src="/fflowers.png"
          alt="Flowers"
          className="mobile-footer-image"
        />
      </footer>
    </div>
  );
};
