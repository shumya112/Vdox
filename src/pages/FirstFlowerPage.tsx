import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

export const FirstFlowerPage: React.FC = () => {
  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderFixed(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const footerNavLinks = [
    { text: 'О курсе', top: '142px', href: '#about' },
    { text: 'Симптомы', top: '188px', href: '#symptoms' },
    { text: 'Как это работает', top: '234px', href: '#howitworks' },
    { text: 'Специалисты', top: '280px', href: '#specialists' },
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
      backgroundColor: '#FFF8F0',
      overflowX: 'hidden',
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { 
          min-height: 100%; 
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
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
          max-width: 1734px;
          height: 100%;
          margin: 0 auto;
        }
        
        .page-container { 
          width: 100%; 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 20px;
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
        }
        .nav-pill:hover { opacity: 0.9; }
      `}</style>

      {/* ===== HEADER ===== */}
      <header 
        className="site-header" 
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          position: 'fixed',
          width: '100%',
          maxWidth: '1409px',
          height: '98px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: headerFixed ? '0' : '44px',
          background: '#FFFFFF',
          borderRadius: '15px',
          margin: '0 auto',
          boxSizing: 'border-box',
          boxShadow: headerFixed ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
          zIndex: 100,
        }}
      >
        <div 
          className="page-container" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: 16, 
            padding: '0 20px',
            width: '100%',
            maxWidth: '1369px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img 
              src="/logo.png" 
              alt="Выдох лого" 
              style={{ 
                width: 149, 
                height: 58, 
                marginLeft: 0,
                display: 'block' 
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
                  color: '#111',
                  background: '#FFF3E6',
                  border: 'none',
                  fontFamily: 'Evolventa, sans-serif',
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
              width: '198px',
              height: '21px',
              fontFamily: 'Evolventa, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '21px',
              textDecorationLine: 'underline',
              color: '#111111',
              flex: 'none',
              order: 1,
              flexGrow: 0,
              position: 'relative',
              right: 0,
              top: 0,
              transform: 'none',
              cursor: 'pointer',
            }}
          >
            посадить первый цветок
          </a>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="section-wrapper" style={{ 
        paddingTop: '180px',
        paddingBottom: '0',
        minHeight: '985px',
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FFEEDD 60%, #FFEEDD 100%)',
        position: 'relative',
        width: '100%',
      }}>
        <div style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          zIndex: 1,
        }}>
          {/* Three statements at top */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <div style={{
              fontFamily: 'Evolventa, sans-serif',
              fontSize: '24px',
              lineHeight: '32px',
              color: '#3D1903',
              flex: 1,
              minWidth: '250px',
            }}>
              Вы не «ленитесь».
            </div>
            <div style={{
              fontFamily: 'Evolventa, sans-serif',
              fontSize: '24px',
              lineHeight: '32px',
              color: '#3D1903',
              flex: 1,
              minWidth: '250px',
              textAlign: 'center',
            }}>
              Вы не «слишком чувствительны»
            </div>
            <div style={{
              fontFamily: 'Evolventa, sans-serif',
              fontSize: '24px',
              lineHeight: '32px',
              color: '#3D1903',
              flex: 1,
              minWidth: '250px',
              textAlign: 'right',
            }}>
              И не «слабы».
            </div>
          </div>

          {/* Center text */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            maxWidth: '700px',
            margin: '0 auto 60px',
          }}>
            <p style={{
              fontFamily: 'Evolventa, sans-serif',
              fontSize: '28px',
              lineHeight: '36px',
              color: '#3D1903',
              marginBottom: '16px',
            }}>
              Вы просто давно живёте с<br />
              нарушенными границами.
            </p>
            <p style={{
              fontFamily: 'Evolventa, sans-serif',
              fontSize: '24px',
              lineHeight: '32px',
              color: '#3D1903',
            }}>
              И это всегда проявляется <strong>одинаково:</strong><br />
              через симптомы.
            </p>
          </div>

          {/* Main heading and button */}
          <div style={{
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '40px',
          }}>
            <h1 style={{
              fontFamily: 'Evolventa, sans-serif',
              fontSize: '42px',
              lineHeight: '50px',
              color: '#3D1903',
              maxWidth: '700px',
              flex: 1,
              fontWeight: 400,
            }}>
              Пройдите тест и посмотрите,<br />
              какой цветок у вас сейчас не растёт
            </h1>
            
            <button 
              onClick={() => console.log('Take test clicked')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                background: '#FFFFFF',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Evolventa, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                color: '#3D1903',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(61, 25, 3, 0.1)',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F5F5F5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              Пройти тест
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Flowers Background - Full Width */}
        <div style={{
          position: 'absolute',
          width: '100vw',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '0',
          zIndex: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          <img 
            src="/Цветочная композиция.png" 
            alt="Цветочная композиция" 
            style={{
              width: '100vw',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }} 
          />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="section-wrapper" style={{
        height: '547px',
        background: '#3D1903',
        boxShadow: '0px 27px 39px rgba(82, 82, 82, 0.08)',
        marginBottom: 0,
        flexShrink: 0,
        width: '100%',
      }}>
        <div className="section-content">
          <div style={{
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

          <div style={{
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

          {footerNavLinks.map((item) => (
            <a 
              key={item.text} 
              href={item.href}
              style={{
                position: 'absolute',
                width: '201px',
                height: '24px',
                left: '521px',
                top: item.top,
                fontFamily: "'Geometria', sans-serif",
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '24px',
                lineHeight: '24px',
                color: '#FFFFFF',
                cursor: 'pointer',
                userSelect: 'none',
                textDecoration: 'none',
              }}
            >
              {item.text}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FirstFlowerPage;