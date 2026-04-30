import React, { useState } from 'react';

// ============================================
// СТИЛИ
// ============================================
const styles: Record<string, React.CSSProperties> = {
  page: {
    margin: 0,
    padding: 0,
    fontFamily: "'Evolventa', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: '#F5EDE4',
    color: '#2C1810',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 60px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    margin: '20px 40px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: 400,
    color: '#2C5F7C',
    letterSpacing: '1px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    border: '2px solid #2C5F7C',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  logoCurve: {
    position: 'absolute' as const,
    width: '24px',
    height: '24px',
    borderLeft: '2px solid #2C5F7C',
    borderBottom: '2px solid #2C5F7C',
    borderRadius: '0 0 0 12px',
    top: '6px',
    left: '10px',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: 'none',
    color: '#5A4A42',
    fontSize: '15px',
    fontWeight: 400,
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  navCta: {
    textDecoration: 'underline',
    textDecorationColor: '#2C5F7C',
    textUnderlineOffset: '4px',
    color: '#2C1810',
    fontSize: '15px',
    fontWeight: 400,
    cursor: 'pointer',
  },
  hero: {
    textAlign: 'center',
    padding: '60px 20px 40px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroStatements: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    marginBottom: '40px',
    flexWrap: 'wrap' as const,
  },
  statement: {
    fontSize: '18px',
    color: '#5A4A42',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  heroText: {
    fontSize: '20px',
    color: '#5A4A42',
    lineHeight: 1.6,
    maxWidth: '500px',
    margin: '0 auto 50px',
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
    gap: '40px',
    marginBottom: '60px',
    flexWrap: 'wrap' as const,
    padding: '0 40px',
  },
  ctaTitle: {
    fontSize: '42px',
    fontWeight: 400,
    color: '#2C1810',
    lineHeight: 1.2,
    textAlign: 'left' as const,
    maxWidth: '500px',
  },
  ctaButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    backgroundColor: '#E8F4F8',
    border: 'none',
    borderRadius: '30px',
    fontSize: '18px',
    fontFamily: "'Evolventa', sans-serif",
    color: '#2C1810',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap' as const,
  },
  ctaArrow: {
    fontSize: '22px',
    transition: 'transform 0.2s',
  },
  flowersContainer: {
    position: 'relative' as const,
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    marginBottom: '-2px',
  },
  flowersGradient: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '150px',
    background: 'linear-gradient(to bottom, transparent, #3D2314)',
    zIndex: 2,
  },
  flowersImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: 'center bottom',
  },
  footer: {
    backgroundColor: '#3D2314',
    color: '#FFFFFF',
    padding: '80px 60px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
    gap: '60px',
  },
  footerLogo: {
    fontSize: '28px',
    fontWeight: 400,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  footerLogoIcon: {
    width: '44px',
    height: '44px',
    border: '2px solid #FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  footerLogoCurve: {
    position: 'absolute' as const,
    width: '26px',
    height: '26px',
    borderLeft: '2px solid #FFFFFF',
    borderBottom: '2px solid #FFFFFF',
    borderRadius: '0 0 0 14px',
    top: '6px',
    left: '12px',
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  footerLink: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 400,
    opacity: 0.9,
    transition: 'opacity 0.2s',
    cursor: 'pointer',
  },
  footerImageContainer: {
    width: '400px',
    height: '120px',
    borderRadius: '12px',
    overflow: 'hidden',
    opacity: 0.9,
  },
  footerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
};

// ============================================
// КОМПОНЕНТ
// ============================================
export const FirstFlowerPage: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navItems = ['О курсе', 'Симптомы', 'Как это работает', 'Специалисты'];
  const footerNavItems = ['О курсе', 'Симптомы', 'Как это работает', 'Специалисты'];

  return (
    <div style={styles.page}>
      {/* НАВИГАЦИЯ */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <div style={styles.logoCurve} />
          </div>
          <span>ВЫДОХ</span>
        </div>

        <ul style={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                style={{
                  ...styles.navLink,
                  color: hoveredLink === item ? '#2C5F7C' : '#5A4A42',
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
            e.currentTarget.style.backgroundColor = '#D0E8F0';
            (e.currentTarget.querySelector('.arrow') as HTMLElement)!.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#E8F4F8';
            (e.currentTarget.querySelector('.arrow') as HTMLElement)!.style.transform = 'translateX(0)';
          }}
        >
          Пройти тест
          <span className="arrow" style={styles.ctaArrow}>→</span>
        </button>
      </section>

      {/* ЦВЕТЫ */}
      <div style={styles.flowersContainer}>
       <img
        src="/Цветочная композиция.png"
        alt="Цветочная композиция"
        style={styles.flowersImage}
        />
        <div style={styles.flowersGradient} />
      </div>

      {/* ФУТЕР */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>
          <div style={styles.footerLogoIcon}>
            <div style={styles.footerLogoCurve} />
          </div>
          <span>ВЫДОХ</span>
        </div>

        <div style={styles.footerLinks}>
          {footerNavItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              style={{
                ...styles.footerLink,
                opacity: hoveredLink === `footer-${item}` ? 1 : 0.9,
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
            src="https://images.unsplash.com/photo-1462275646964-a0e3f2f427c8?w=800&auto=format&fit=crop&q=80"
            alt="Цветы в траве"
            style={styles.footerImage}
          />
        </div>
      </footer>

      {/* ШРИФТЫ + АДАПТИВНОСТЬ */}
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
          src: url('/fonts/Evolventa-Bold.woff2') format('woff2'),
               url('/fonts/Evolventa-Bold.woff') format('woff'),
               url('/fonts/Evolventa-Bold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Evolventa';
          src: url('/fonts/Evolventa-Oblique.woff2') format('woff2'),
               url('/fonts/Evolventa-Oblique.woff') format('woff'),
               url('/fonts/Evolventa-Oblique.ttf') format('truetype');
          font-weight: 400;
          font-style: italic;
          font-display: swap;
        }

        @media (max-width: 768px) {
          nav {
            flex-direction: column !important;
            gap: 20px !important;
            padding: 20px !important;
            margin: 10px !important;
          }
          .nav-links { gap: 16px !important; }
          .hero-statements {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .cta-section {
            flex-direction: column !important;
            text-align: center !important;
          }
          .cta-title {
            font-size: 28px !important;
            text-align: center !important;
          }
          footer {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 40px 20px !important;
          }
          .footer-image-container {
            width: 100% !important;
            max-width: 400px !important;
          }
        }
        @media (max-width: 480px) {
          .cta-title { font-size: 24px !important; }
          .hero-text { font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
};

export default FirstFlowerPage;
