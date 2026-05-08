import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

export const ResultPage: React.FC = () => {
  const [headerFixed, setHeaderFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const footerNavLinks = [
    { text: 'О курсе', top: '142px' },
    { text: 'Симптомы', top: '188px' },
    { text: 'Как это работает', top: '234px' },
    { text: 'Специалисты', top: '280px' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      fontFamily: 'Evolventa, sans-serif',
      color: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: 'rgba(243, 215, 186, 1)',
      overflowX: 'hidden',
    }}>
      <style>{`
        @font-face {
          font-family: 'Evolventa';
          src: url('https://db.onlinewebfonts.com/t/1e6b664b6d46b5f76c82d5284004fe0f.woff2') format('woff2'),
               url('https://db.onlinewebfonts.com/t/1e6b664b6d46b5f76c82d5284004fe0f.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root {
          min-height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        body { margin: 0; }

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
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .nav-pill:hover { opacity: 0.9; }

        /* ===== MOBILE MENU ===== */
        .mobile-menu-btn {
          display: none;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .mobile-nav-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(243, 215, 186, 0.98);
          z-index: 200;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
        .mobile-nav-overlay.open {
          display: flex;
        }
        .mobile-nav-overlay a, .mobile-nav-overlay button {
          font-family: 'Evolventa', sans-serif;
          font-size: 24px;
          color: #3D1903;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        .mobile-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */

        /* Large Desktop: 1400px+ */
        @media (min-width: 1400px) {
          .result-container {
            margin-left: 120px !important;
            margin-right: auto !important;
          }
        }

        /* Desktop: 1200px - 1399px */
        @media (min-width: 1200px) and (max-width: 1399px) {
          .result-container {
            margin-left: 80px !important;
            margin-right: auto !important;
          }
        }

        /* Laptop: 992px - 1199px */
        @media (min-width: 992px) and (max-width: 1199px) {
          .result-container {
            margin-left: 40px !important;
            margin-right: auto !important;
            max-width: 600px !important;
          }
        }

        /* Tablet: 768px - 991px */
        @media (min-width: 768px) and (max-width: 991px) {
          .result-container {
            margin-left: 20px !important;
            margin-right: 20px !important;
            max-width: 100% !important;
          }
          .site-header {
            max-width: 100% !important;
            border-radius: 0 !important;
            left: 0 !important;
            transform: none !important;
          }
          .header-inner {
            padding: 0 16px !important;
          }
          .nav-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .header-link {
            display: none !important;
          }
        }

        /* Mobile Large: 576px - 767px */
        @media (min-width: 576px) and (max-width: 767px) {
          .result-container {
            margin-left: 16px !important;
            margin-right: 16px !important;
            max-width: 100% !important;
            padding: 0 12px !important;
          }
          .site-header {
            max-width: 100% !important;
            border-radius: 0 !important;
            left: 0 !important;
            transform: none !important;
            height: 70px !important;
          }
          .header-inner {
            padding: 0 16px !important;
          }
          .nav-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .header-link {
            display: none !important;
          }
          .footer-section {
            height: auto !important;
            padding: 60px 20px !important;
          }
          .footer-inner {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 40px !important;
          }
          .footer-logo {
            position: static !important;
            width: 150px !important;
            height: auto !important;
          }
          .footer-nav {
            position: static !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 20px !important;
          }
          .footer-nav a {
            position: static !important;
            font-size: 18px !important;
          }
          .footer-flowers {
            position: static !important;
            width: 100% !important;
            max-width: 400px !important;
            height: 120px !important;
          }
        }

        /* Mobile Small: < 576px */
        @media (max-width: 575px) {
          .result-container {
            margin-left: 8px !important;
            margin-right: 8px !important;
            max-width: 100% !important;
            padding: 0 8px !important;
          }
          .site-header {
            max-width: 100% !important;
            border-radius: 0 !important;
            left: 0 !important;
            transform: none !important;
            height: 60px !important;
            padding: 12px 0 !important;
          }
          .header-inner {
            padding: 0 12px !important;
          }
          .nav-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .header-link {
            display: none !important;
          }
          .footer-section {
            height: auto !important;
            padding: 40px 12px !important;
          }
          .footer-inner {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 32px !important;
          }
          .footer-logo {
            position: static !important;
            width: 120px !important;
            height: auto !important;
          }
          .footer-nav {
            position: static !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
          }
          .footer-nav a {
            position: static !important;
            font-size: 16px !important;
          }
          .footer-flowers {
            position: static !important;
            width: 100% !important;
            max-width: 300px !important;
            height: 100px !important;
          }
        }
      `}</style>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
          <img src="/headersymbolclose.png" alt="Закрыть" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        </button>
        {navItems.map((item) => (
          <button key={item.label} onClick={() => scrollTo(item.href.replace('#', ''))}>
            {item.label}
          </button>
        ))}
        <button onClick={() => { window.location.hash = 'first-flower'; setMobileMenuOpen(false); }}>
          посадить первый цветок
        </button>
      </div>

      {/* ===== HEADER ===== */}
      <header
        className="site-header"
        style={{
          position: 'fixed',
          width: 'calc(100% - 50px)',
          maxWidth: '1409px',
          height: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: headerFixed ? '16px' : '44px',
          background: '#FFFFFF',
          boxShadow: '0px 6px 12px rgba(39, 5, 5, 0.16)',
          borderRadius: '20px',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          transition: 'all 0.3s ease',
        }}
      >
        <img
          className="logo-img"
          src="/logo.png"
          alt="ВЫДОХ"
          style={{ height: 40, width: 'auto', display: 'block', objectFit: 'contain' }}
        />

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          flex: 1,
          margin: '0 20px',
        }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-pill">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile burger button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <img src="/headersymbolclose.png" alt="Закрыть" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          ) : (
            <img src="/headersymbol1.png" alt="Меню" style={{ width: 25, height: 16, objectFit: 'contain' }} />
          )}
        </button>

        <a
          className="header-link"
          href="#first-flower"
          style={{
            textAlign: 'right',
            width: '198px',
            fontFamily: 'Evolventa, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            textDecorationLine: 'underline',
            color: '#111111',
            cursor: 'pointer',
          }}
        >
          посадить первый цветок
        </a>
      </header>

      {/* ===== RESULT CONTENT ===== */}
      <section style={{
        paddingTop: '180px',
        paddingBottom: '80px',
        width: '100%',
        position: 'relative',
        background: 'rgba(243, 215, 186, 1)',
        overflow: 'hidden',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="result-container" style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          marginLeft: '120px',
          marginRight: 'auto',
          padding: '0 20px',
          zIndex: 1,
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 400,
            fontSize: '36px',
            lineHeight: '42px',
            color: '#3D1903',
            marginBottom: '24px',
          }}>
            Result after the test
          </h1>
          <p style={{
            fontFamily: 'Evolventa, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '24px',
            color: '#3D1903',
          }}>
            Здесь будет ваш результат после прохождения теста.
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="footer-section" style={{
        height: '547px',
        background: '#3D1903',
        boxShadow: '0px 27px 39px rgba(82, 82, 82, 0.08)',
        flexShrink: 0,
        width: '100%',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="footer-inner" style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1734px',
          height: '100%',
          margin: '0 auto',
        }}>
          <div className="footer-logo" style={{
            position: 'absolute',
            width: '198px',
            height: '76.59px',
            left: '164px',
            top: '145px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src="/flogo.png"
              alt="fLogo"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <div className="footer-nav">
            {footerNavLinks.map((item) => (
              <a
                key={item.text}
                href="#"
                style={{
                  position: 'absolute',
                  left: '521px',
                  top: item.top,
                  fontFamily: "'Geometria', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 300,
                  fontSize: '24px',
                  lineHeight: '24px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {item.text}
              </a>
            ))}
          </div>

          <div className="footer-flowers" style={{
            position: 'absolute',
            width: '693px',
            height: '157px',
            left: '879px',
            top: '142px',
            backgroundImage: 'url("/fflowers.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '15px'
          }} />
        </div>
      </section>
    </div>
  );
};
