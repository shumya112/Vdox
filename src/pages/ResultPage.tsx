import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// ️ БАЗОВЫЙ ШАБЛОН ТЕКСТА (одинаковый для всех цветов)
// ═══════════════════════════════════════════════════════════════
const BASE_TEXT = {
  description: `Вы не ленитесь.
Вы избегаете контакта с напряжением.
Каждое действие для вас — как маленький стресс.`,
  
  phrase: `Поэтому психика выбирает: не делать → чтобы не чувствовать
И именно поэтому
обычные советы "просто начни" `,
  
  phraseHighlight: "не работают.",
};

// ═══════════════════════════════════════════════════════════════
// ️ НАСТРОЙКИ ЦВЕТОВ (только уникальные данные)
// ═══════════════════════════════════════════════════════════════
const FLOWERS_CONFIG = {
  lavanda: {
    title: "ЛАВАНДА",
    backgroundImage: "/Frame 274 лаванда.png",
    moduleLink: "#module-lavanda"
  },
  iris: {
    title: "ИРИС",
    backgroundImage: "/Frame 274 ирис.png",
    moduleLink: "#module-iris"
  },
  rosa: {
    title: "РОЗА",
    backgroundImage: "/Frame 274 роза.png",
    moduleLink: "#module-rosa"
  },
  pion: {
    title: "ПИОН",
    backgroundImage: "/Frame 274 пион.png",
    moduleLink: "#module-pion"
  },
  podsolnuh: {
    title: "ПОДСОЛНУХ",
    backgroundImage: "/Frame 274 подсолнух.png",
    moduleLink: "#module-podsolnuh"
  },
  orhidea: {
    title: "ОРХИДЕЯ",
    backgroundImage: "/Frame 274 орхидея.png",
    moduleLink: "#module-orhidea"
  },
  lotos: {
    title: "ЛОТОС",
    backgroundImage: "/Frame 274 лотос.png",
    moduleLink: "#module-lotos"
  }
};

// ─────────────────────────────────────────────
// NAVIGATION DATA
// ────────────────────────────────────────────
const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export const ResultPage: React.FC = () => {
  const [headerFixed, setHeaderFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentFlower, setCurrentFlower] = useState({ ...BASE_TEXT, ...FLOWERS_CONFIG.lavanda });

  // ── Scroll handler ──
  useEffect(() => {
    const handleScroll = () => setHeaderFixed(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Mobile menu logic ──
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

  // ── Entrance animation ──
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ── ЛОГИКА: Определяем цветок и объединяем с базовым текстом ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flowerType = params.get('type');
    
    if (flowerType && FLOWERS_CONFIG[flowerType as keyof typeof FLOWERS_CONFIG]) {
      // Объединяем базовый текст + уникальные данные цветка
      setCurrentFlower({
        ...BASE_TEXT,
        ...FLOWERS_CONFIG[flowerType as keyof typeof FLOWERS_CONFIG]
      });
    } else {
      setCurrentFlower({
        ...BASE_TEXT,
        ...FLOWERS_CONFIG.lavanda
      });
    }
  }, []);

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
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
        .animate-delay-1 { animation-delay: 0.1s; } .animate-delay-2 { animation-delay: 0.3s; } .animate-delay-3 { animation-delay: 0.5s; } .animate-delay-4 { animation-delay: 0.7s; } .animate-delay-5 { animation-delay: 0.9s; }
        .lavender-float { animation: float 6s ease-in-out infinite; }
        .cta-button { display: inline-flex; align-items: center; justify-content: center; padding: 14px 32px; background: #9B7ED9; color: #FFFFFF; font-family: 'Evolventa', sans-serif; font-size: 16px; line-height: 21px; border: none; border-radius: 53px; cursor: pointer; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 4px 16px rgba(155, 126, 217, 0.3); }
        .cta-button:hover { background: #8A6BC8; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(155, 126, 217, 0.4); }
        .desc-card { background: #FFFFFF; border-radius: 20px; padding: 24px 28px; box-shadow: 0 4px 20px rgba(60, 24, 16, 0.06); transition: all 0.3s ease; }
        .desc-card:hover { box-shadow: 0 8px 32px rgba(60, 24, 16, 0.1); transform: translateY(-2px); }
        @media (min-width: 1400px) { .hero-container { margin-left: 120px !important; margin-right: auto !important; } }
        @media (min-width: 1200px) and (max-width: 1399px) { .hero-container { margin-left: 80px !important; margin-right: auto !important; } }
        @media (min-width: 992px) and (max-width: 1199px) { .hero-container { margin-left: 40px !important; margin-right: auto !important; max-width: 600px !important; } }
        @media (min-width: 768px) and (max-width: 991px) { .hero-container { margin-left: 20px !important; margin-right: 20px !important; max-width: 100% !important; } .site-header { max-width: 100% !important; border-radius: 0 !important; left: 0 !important; transform: none !important; } .header-inner { padding: 0 16px !important; } .nav-desktop { display: none !important; } .mobile-menu-btn { display: flex !important; } .header-link { display: none !important; } .hero-title { font-size: 32px !important; line-height: 38px !important; } .hero-image { width: 280px !important; right: -40px !important; opacity: 0.6 !important; } }
        @media (min-width: 576px) and (max-width: 767px) { .hero-container { margin-left: 16px !important; margin-right: 16px !important; max-width: 100% !important; padding: 0 12px !important; } .site-header { max-width: 100% !important; border-radius: 0 !important; left: 0 !important; transform: none !important; height: 70px !important; } .header-inner { padding: 0 16px !important; } .nav-desktop { display: none !important; } .mobile-menu-btn { display: flex !important; } .header-link { display: none !important; } .hero-title { font-size: 28px !important; line-height: 34px !important; } .hero-image { display: none !important; } .footer-section { height: auto !important; padding: 60px 20px !important; } .footer-inner { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 40px !important; } .footer-logo { position: static !important; width: 150px !important; height: auto !important; } .footer-nav { position: static !important; display: flex !important; flex-direction: column !important; align-items: center !important; gap: 20px !important; } .footer-nav a { position: static !important; font-size: 18px !important; } .footer-flowers { position: static !important; width: 100% !important; max-width: 400px !important; height: 120px !important; } }
        @media (max-width: 575px) { .hero-container { margin-left: 8px !important; margin-right: 8px !important; max-width: 100% !important; padding: 0 8px !important; } .site-header { max-width: 100% !important; border-radius: 0 !important; left: 0 !important; transform: none !important; height: 60px !important; padding: 12px 0 !important; } .header-inner { padding: 0 12px !important; } .nav-desktop { display: none !important; } .mobile-menu-btn { display: flex !important; } .header-link { display: none !important; } .hero-title { font-size: 24px !important; line-height: 30px !important; } .hero-image { display: none !important; } .footer-section { height: auto !important; padding: 40px 12px !important; } .footer-inner { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 32px !important; } .footer-logo { position: static !important; width: 120px !important; height: auto !important; } .footer-nav { position: static !important; display: flex !important; flex-direction: column !important; align-items: center !important; gap: 16px !important; } .footer-nav a { position: static !important; font-size: 16px !important; } .footer-flowers { position: static !important; width: 100% !important; max-width: 300px !important; height: 100px !important; } }
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

      {/* MAIN CONTENT */}
      <main style={{ paddingTop: '180px', paddingBottom: '80px', width: '100%', position: 'relative', backgroundImage: `url("${currentFlower.backgroundImage}")`, backgroundSize: 'cover', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat', overflow: 'hidden', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(245,237,228,0.95) 0%, rgba(250,245,240,0.85) 60%, transparent 100%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,126,217,0.08) 0%, transparent 70%)', top: '10%', right: '-10%', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,126,217,0.05) 0%, transparent 70%)', bottom: '20%', left: '-5%', pointerEvents: 'none', zIndex: 1 }} />

        <div className="hero-container" style={{ position: 'relative', width: '100%', maxWidth: '720px', marginLeft: '120px', marginRight: 'auto', padding: '0 20px', zIndex: 2 }}>
          <h1 className={`hero-title animate-fade-in-up ${isVisible ? 'animate-delay-1' : ''}`} style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '42px', lineHeight: '50px', color: '#3C1810', marginBottom: '32px', letterSpacing: '-0.02em' }}>
            Ваш цветок —{' '}
            <span style={{ color: '#9B7ED9', fontWeight: 500 }}>{currentFlower.title}</span>
          </h1>

          <div className={`desc-card animate-fade-in-up ${isVisible ? 'animate-delay-2' : ''}`} style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: '28px', color: '#3C1810', whiteSpace: 'pre-line' }}>
              {currentFlower.description}
            </p>
          </div>

          <div className={`animate-fade-in-up ${isVisible ? 'animate-delay-3' : ''}`} style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: '28px', color: '#3C1810' }}>
              {currentFlower.phrase}
              <span style={{ fontFamily: 'mr_GuardianCircusG, sans-serif', fontWeight: 400, fontSize: '26px' }}>
                {currentFlower.phraseHighlight}
              </span>
            </p>
          </div>

          <div className={`animate-fade-in-up ${isVisible ? 'animate-delay-4' : ''}`} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '24px', lineHeight: '32px', color: '#3C1810', marginBottom: '16px' }}>
              Что это значит в «ВЫДОХ»:
            </h2>
            <p style={{ fontFamily: 'Evolventa, sans-serif', fontWeight: 400, fontSize: '20px', lineHeight: '30px', color: '#3C1810', whiteSpace: 'pre-line' }}>
              {`вам не нужна дисциплина
вам нужно безопасное действие
И именно с этого начинается модуль "${currentFlower.title}"`}
            </p>
          </div>

          <div className={`animate-fade-in-up ${isVisible ? 'animate-delay-5' : ''}`}>
            <a href={currentFlower.moduleLink} className="cta-button">Перейти к модулю</a>
          </div>
        </div>
        <div className="hero-image lavender-float" style={{ position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)', width: '380px', height: 'auto', zIndex: 2, pointerEvents: 'none' }}></div>
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

export default ResultPage;