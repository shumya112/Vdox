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

  const linkColor = '#111';
  const pillBg = '#FFF3E6';
  const pillBorder = 'none';

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
      fontFamily: 'Inter, sans-serif', 
      color: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    }}>
      <style>{`
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
          width: 1734px;
          height: 100%;
          margin: 0 auto;
        }
        
        .page-container { 
          width: min(1200px, 100%); 
          margin: 0 auto; 
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
          gap: '190px',
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
            gap: 0, 
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
              width: '198px',
              height: '21px',
              fontFamily: "'Evolventa', sans-serif",
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
      <div className="section-wrapper" style={{ 
        paddingTop: '140px',
        paddingBottom: '40px',
      }}>
        <div className="section-content">
          <h1 style={{
            position: 'absolute',
            width: '475px',
            height: '131px',
            left: '164px',
            top: '257px',
            fontFamily: "'mr_GuardianCircusG', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '78px',
            lineHeight: '63px',
            color: '#3D1903'
          }}>
            Собери свой сад из новых привычек
          </h1>
           
          <div style={{
            position: 'absolute',
            width: '419px',
            height: '72px',
            left: '164px',
            top: '397px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontSize: '24px',
            lineHeight: '24px',
            color: '#3D1903',
            margin: 0,
          }}>
            <span style={{ fontWeight: 'bold' }}>6 симптомов | 6 модулей</span> <br />
            <span style={{ fontWeight: 400 }}>
              понятные шаги и трекеры, которые реально меняют поведение
            </span>
          </div>
          
          <button style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 24px',
            gap: '16px',
            position: 'absolute',
            width: '340px',
            height: '56px',
            left: '164px',
            top: '513px',
            background: '#F4F5F0',
            borderRadius: '38px',
            cursor: 'pointer',
            border: 'none'
          }}> 
            <span style={{
              width: '292px',
              height: '24px',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '24px',
              color: '#111111',
              flex: 'none',
              order: 0,
              flexGrow: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              Начать выращивать сад
            </span>
          </button>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <section className="section-wrapper" style={{
        height: '547px',
        background: '#3D1903',
        boxShadow: '0px 27px 39px rgba(82, 82, 82, 0.08)',
        marginBottom: 0,
        flexShrink: 0,
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
