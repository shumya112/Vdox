import React, { useState } from 'react';

// ============================================
// СТИЛИ
// ============================================
const styles: Record<string, React.CSSProperties> = {
  page: {
    margin: 0,
    padding: 0,
    fontFamily: "'Cormorant Garamond', 'Georgia', 'Times New Roman', serif",
    backgroundColor: '#F5EDE4',
    color: '#2C1810',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative' as const,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 40px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    margin: '20px 40px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    flexShrink: 0,
    position: 'relative' as const,
    zIndex: 10,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '22px',
    fontWeight: 300,
    color: '#2C5F7C',
    letterSpacing: '2px',
    fontFamily: "'Cormorant Garamond', serif",
  },
  logoSvg: {
    width: '40px',
    height: '40px',
  },
  navLinks: {
    display: 'flex',
    gap: '12px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: 'none',
    color: '#5A4A42',
    fontSize: '15px',
    fontWeight: 400,
    fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    padding: '8px 20px',
    borderRadius: '24px',
    backgroundColor: '#F5EDE4',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
  },
  navCta: {
    textDecoration: 'underline',
    textDecorationColor: '#2C5F7C',
    textUnderlineOffset: '4px',
    color: '#2C1810',
    fontSize: '15px',
    fontWeight: 400,
    fontFamily: "'Segoe UI', sans-serif",
    cursor: 'pointer',
  },
  hero: {
    textAlign: 'center',
    padding: '40px 20px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    flexShrink: 0,
    position: 'relative' as const,
    zIndex: 10,
  },
  heroStatements: {
    display: 'flex',
    justifyContent: 'center',
    gap: '80px',
    marginBottom: '20px',
    flexWrap: 'wrap' as const,
  },
  statement: {
    fontSize: '20px',
    color: '#5A4A42',
    fontWeight: 400,
    lineHeight: 1.4,
    fontFamily: "'Cormorant Garamond', serif",
  },
  heroText: {
    fontSize: '22px',
    color: '#5A4A42',
    lineHeight: 1.5,
    maxWidth: '550px',
    margin: '0 auto 20px',
    fontFamily: "'Cormorant Garamond', serif",
  },
  heroTextItalic: {
    fontStyle: 'italic',
  },
  heroTextBold: {
    fontWeight: 700,
  },
  ctaSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    flexWrap: 'wrap' as const,
    padding: '0 60px 20px',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexShrink: 0,
    position: 'relative' as const,
    zIndex: 10,
  },
  ctaTitle: {
    fontSize: '42px',
    fontWeight: 400,
    color: '#2C1810',
    lineHeight: 1.15,
    textAlign: 'left' as const,
    maxWidth: '600px',
    fontFamily: "'Cormorant Garamond', serif",
    margin: 0,
  },
  ctaButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 32px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0D5CC',
    borderRadius: '30px',
    fontSize: '16px',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#2C1810',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  ctaArrow: {
    fontSize: '20px',
    transition: 'transform 0.2s',
    color: '#2C1810',
  },
  flowersBackground: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: "url('/Цветочная композиция.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
  },
  flowersGradient: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '50vh',
    background: 'linear-gradient(to bottom, transparent 0%, #3D2314 70%, #3D2314 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  footer: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    padding: '60px 60px 50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
    gap: '60px',
    flexShrink: 0,
    position: 'relative' as const,
    zIndex: 10,
    marginTop: 'auto',
  },
  footerLogo: {
    fontSize: '24px',
    fontWeight: 300,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: '2px',
  },
  footerLogoSvg: {
    width: '44px',
    height: '44px',
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '18px',
  },
  footerLink: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '17px',
    fontWeight: 300,
    opacity: 0.85,
    transition: 'opacity 0.2s',
    cursor: 'pointer',
    fontFamily: "'Cormorant Garamond', serif",
  },
  footerImageContainer: {
    width: '380px',
    height: '140px',
    borderRadius: '16px',
    overflow: 'hidden',
    opacity: 0.95,
  },
  footerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
};

// SVG логотип "ВЫДОХ"
const LogoSvg = ({ color = '#2C5F7C' }: { color?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={styles.logoSvg}>
    <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" fill="none" />
    <path
      d="M12 20 Q12 12, 20 12 Q28 12, 28 20 Q28 28, 20 28"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M20 28 L20 32"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ============================================
// КОМПОНЕНТ
// ============================================
export const FirstFlowerPage: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navItems = ['О курсе', 'Симптомы', 'Как это работает', 'Специалисты'];
  const footerNavItems = ['О курсе', 'Симптомы', 'Как это работает', 'Специалисты'];

  const footerImageUrl = "https://images.unsplash.com/photo-1462275646964-a0e3f2f427c8?w=800&auto=format&fit=crop&q=80";

  return (
    <div style={styles.page}>
      {/* ФОН ЦВЕТОВ — fixed на весь экран */}
      <div style={styles.flowersBackground} />
      <div style={styles.flowersGradient} />

      {/* НАВИГАЦИЯ */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <LogoSvg />
          <span>ВЫДОХ</span>
        </div>

        <ul style={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                style={{
                  ...styles.navLink,
                  backgroundColor: hoveredLink === item ? '#E8DDD3' : '#F5EDE4',
                  color: hoveredLink === item ? '#2C1810' : '#5A4A42',
                }}
                onMouseEnter={() => setHoveredLink(item)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a href="#start" style={styles.navCta}>
          посадить первый цветок
        </a>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroStatements}>
          <p style={styles.statement}>Вы не «ленитесь».</p>
          <p style={styles.statement}>Вы не «слишком чувствительны»</p>
          <p style={styles.statement}>И не «слабы».</p>
        </div>

        <div style={styles.heroText}>
          Вы просто давно живёте с{' '}
          <span style={styles.heroTextItalic}>нарушенными границами</span>.<br />
          И это всегда проявляется{' '}
          <span style={styles.heroTextBold}>одинаково:</span>
          <br />
          через симптомы.
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <h1 style={styles.ctaTitle}>
          Пройдите тест и посмотрите,
          <br />
          какой цветок у вас сейчас не растёт
        </h1>

        <button
          style={styles.ctaButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F5EDE4';
            e.currentTarget.style.borderColor = '#C4B5A5';
            const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
            if (arrow) arrow.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#E0D5CC';
            const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
            if (arrow) arrow.style.transform = 'translateX(0)';
          }}
        >
          Пройти тест
          <span className="arrow" style={styles.ctaArrow}>→</span>
        </button>
      </section>

      {/* ФУТЕР */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>
          <LogoSvg color="#FFFFFF" />
          <span>ВЫДОХ</span>
        </div>

        <div style={styles.footerLinks}>
          {footerNavItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              style={{
                ...styles.footerLink,
                opacity: hoveredLink === `footer-${item}` ? 1 : 0.85,
              }}
              onMouseEnter={() => setHoveredLink(`footer-${item}`)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={styles.footerImageContainer}>
          <img
            src={footerImageUrl}
            alt="Цветы в траве"
            style={styles.footerImage}
          />
        </div>
      </footer>

      {/* ШРИФТЫ + АДАПТИВНОСТЬ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body, html {
          margin: 0;
          padding: 0;
        }

        @media (max-width: 968px) {
          nav {
            flex-direction: column !important;
            gap: 16px !important;
            padding: 16px 24px !important;
            margin: 12px 20px !important;
          }
          .nav-links { 
            gap: 8px !important;
            flex-wrap: wrap;
            justify-content: center;
          }
          .hero-statements {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .cta-section {
            flex-direction: column !important;
            text-align: center !important;
            gap: 30px !important;
          }
          .cta-title {
            font-size: 32px !important;
            text-align: center !important;
          }
          footer {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 40px 24px !important;
          }
          .footer-image-container {
            width: 100% !important;
            max-width: 380px !important;
          }
        }
        @media (max-width: 480px) {
          .cta-title { font-size: 26px !important; }
          .hero-text { font-size: 18px !important; }
          .statement { font-size: 18px !important; }
          .nav-link {
            padding: 6px 14px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FirstFlowerPage;