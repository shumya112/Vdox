import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

const questions = [
  { id: 1, text: 'Я откладываю важное, потому что внутри слишком много напряжения' },
  { id: 2, text: 'Я часто тяну до последнего, а потом делаю в стрессе' },
  { id: 3, text: 'Я почти всегда не укладываюсь во время' },
  { id: 4, text: 'У меня ощущение, что я живу "в догонку"' },
  { id: 5, text: 'Я соглашаюсь, даже когда внутри не согласна' },
  { id: 6, text: 'После общения бывает ощущение, что я была "не собой"' },
  { id: 7, text: 'Я чувствую усталость, даже если объективно не перегружена' },
  { id: 8, text: 'Отдых не возвращает ощущение жизни' },
  { id: 9, text: 'Ко мне часто идут с проблемами' },
  { id: 10, text: 'Я беру на себя чужие задачи, даже когда нет ресурса' },
  { id: 11, text: 'Я обесцениваю свои результаты' },
  { id: 12, text: 'Мне сложно признать, что я справилась' },
  { id: 13, text: 'Я не всегда понимаю, чего хочу' },
  { id: 14, text: 'Иногда кажется, что я живу не свою жизнь' },
];

const floatingLabels = [
  { text: 'Вы не "ленитесь".', top: '253px', right: '162px', width: '208px' },
  { text: 'Вы не "сломаны"', top: '947px', right: '410px', width: '205px' },
  { text: 'Вы не "слишком чувствительны"', top: '1896px', right: '161px', width: '381px' },
  { text: 'Вы не "слабы".', top: '3019px', right: '162px', width: '180px' },
];

const optionLabels = [
  'нет, это не про меня',
  'иногда',
  'часто',
  'почти всегда',
];

export const TestPage: React.FC = () => {
  const [headerFixed, setHeaderFixed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
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

  const handleSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

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

        .question-card {
          background: rgba(244, 245, 240, 1);
          border-radius: 15px;
          padding: 24px 28px 20px;
          margin-bottom: 16px;
        }

        .question-number {
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #3D1903;
          margin-bottom: 16px;
        }

        .radio-row {
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: #FFFFFF;
          border-radius: 30px;
          padding: 16px 32px;
          margin-bottom: 12px;
        }

        .radio-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          position: relative;
        }

        .radio-number {
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #3D1903;
          margin-bottom: 2px;
        }

        .radio-circle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid #A0D4C7;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .radio-circle.selected {
          border-color: #3D1903;
          background: #3D1903;
        }

        .radio-circle.selected::after {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #FFFFFF;
        }

        .labels-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 0 8px;
        }

        .labels-row .label-item {
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 13px;
          line-height: 16px;
          color: #8B7B6B;
          white-space: nowrap;
          transition: color 0.2s;
        }

        .labels-row .label-item.selected {
          color: #3D1903;
        }

        .floating-label {
          position: absolute;
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 24px;
          color: #3D1903;
          white-space: nowrap;
          pointer-events: none;
          z-index: 2;
        }

        .result-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          border-radius: 53px;
          padding: 16px 32px;
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          background: #FFF3E6;
          border: 1.5px solid #E8D5C4;
          color: #3D1903;
          cursor: pointer;
          transition: all 0.2s;
        }
        .result-btn:hover {
          background: #FFE8D0;
          border-color: #3D1903;
        }

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
          .questions-container {
            margin-left: 120px !important;
            margin-right: auto !important;
          }
        }

        /* Desktop: 1200px - 1399px */
        @media (min-width: 1200px) and (max-width: 1399px) {
          .questions-container {
            margin-left: 80px !important;
            margin-right: auto !important;
          }
          .floating-label {
            font-size: 20px !important;
          }
        }

        /* Laptop: 992px - 1199px */
        @media (min-width: 992px) and (max-width: 1199px) {
          .questions-container {
            margin-left: 40px !important;
            margin-right: auto !important;
            max-width: 600px !important;
          }
          .floating-label {
            font-size: 18px !important;
            right: 40px !important;
          }
        }

        /* Tablet: 768px - 991px */
        @media (min-width: 768px) and (max-width: 991px) {
          .questions-container {
            margin-left: 20px !important;
            margin-right: 20px !important;
            max-width: 100% !important;
          }
          .floating-label {
            display: none !important;
          }
          .decorative-line {
            display: none !important;
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
          .questions-container {
            margin-left: 16px !important;
            margin-right: 16px !important;
            max-width: 100% !important;
            padding: 0 12px !important;
          }
          .question-card {
            padding: 20px 20px 16px !important;
          }
          .question-number {
            font-size: 16px !important;
            line-height: 22px !important;
          }
          .radio-row {
            padding: 12px 20px !important;
          }
          .labels-row .label-item {
            font-size: 11px !important;
          }
          .floating-label {
            display: none !important;
          }
          .decorative-line {
            display: none !important;
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
          .result-btn {
            width: 100% !important;
            height: 48px !important;
            font-size: 16px !important;
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
          .questions-container {
            margin-left: 8px !important;
            margin-right: 8px !important;
            max-width: 100% !important;
            padding: 0 8px !important;
          }
          .question-card {
            padding: 16px 14px 14px !important;
            margin-bottom: 12px !important;
            border-radius: 12px !important;
          }
          .question-number {
            font-size: 15px !important;
            line-height: 20px !important;
            margin-bottom: 12px !important;
          }
          .radio-row {
            padding: 10px 12px !important;
            border-radius: 20px !important;
          }
          .radio-number {
            font-size: 12px !important;
          }
          .radio-circle {
            width: 12px !important;
            height: 12px !important;
          }
          .labels-row {
            padding: 0 4px !important;
          }
          .labels-row .label-item {
            font-size: 10px !important;
            line-height: 14px !important;
          }
          .floating-label {
            display: none !important;
          }
          .decorative-line {
            display: none !important;
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
          .logo-img {
            width: 120px !important;
            height: auto !important;
          }
          .result-btn {
            width: 100% !important;
            height: 44px !important;
            font-size: 15px !important;
            padding: 12px 24px !important;
          }
          .footer-section {
            height: auto !important;
            padding: 40px 16px !important;
          }
          .footer-inner {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 30px !important;
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
            line-height: 20px !important;
          }
          .footer-flowers {
            position: static !important;
            width: 100% !important;
            max-width: 320px !important;
            height: 100px !important;
          }
        }

        /* Extra Small: < 360px */
        @media (max-width: 359px) {
          .question-number {
            font-size: 14px !important;
          }
          .labels-row .label-item {
            font-size: 9px !important;
          }
          .radio-row {
            padding: 8px 8px !important;
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

      {/* ===== HEADER (как в мобильном примере) ===== */}
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

      {/* ===== TEST CONTENT ===== */}
      <section style={{
        paddingTop: '180px',
        paddingBottom: '80px',
        width: '100%',
        position: 'relative',
        background: 'rgba(243, 215, 186, 1)',
        overflow: 'hidden',
      }}>
        {/* Decorative line */}
        <img
          src="/dist/Vector 2241.png"
          alt=""
          className="decorative-line"
          style={{
            position: 'absolute',
            width: '798.78px',
            height: '3435.62px',
            right: '-20px',
            top: '-126px',
            pointerEvents: 'none',
            zIndex: 0,
            objectFit: 'contain',
          }}
        />

        {/* Floating text labels */}
        {floatingLabels.map((label, i) => (
          <div
            key={i}
            className="floating-label"
            style={{
              top: label.top,
              right: label.right,
              width: label.width,
            }}
          >
            {label.text}
          </div>
        ))}

        {/* Questions */}
        <div className="questions-container" style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          marginLeft: '120px',
          marginRight: 'auto',
          padding: '0 20px',
          zIndex: 1,
        }}>
          {questions.map((q) => (
            <div key={q.id} className="question-card">
              <div className="question-number">
                {q.id}. {q.text}
              </div>

              <div className="radio-row">
                {[0, 1, 2, 3].map((val) => {
                  const isSelected = answers[q.id] === val;
                  return (
                    <div
                      key={val}
                      className="radio-option"
                      onClick={() => handleSelect(q.id, val)}
                    >
                      <div className="radio-number">{val}</div>
                      <div className={`radio-circle ${isSelected ? 'selected' : ''}`} />
                    </div>
                  );
                })}
              </div>

              <div className="labels-row">
                {optionLabels.map((label, idx) => {
                  const isSelected = answers[q.id] === idx;
                  return (
                    <span key={idx} className={`label-item ${isSelected ? 'selected' : ''}`}>
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
            marginBottom: '40px',
          }}>
            <button className="result-btn">
              Перейти к результату
            </button>
          </div>
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

export default TestPage;