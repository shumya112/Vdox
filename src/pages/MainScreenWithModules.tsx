import { useEffect, useState } from 'react';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];

const symptoms = [
  { number: 'Симптом 1.', name: 'Прокрастинация' },
  { number: 'Симптом 2.', name: 'Хроническое опоздание' },
  { number: 'Симптом 1.', name: 'Социальная мимикрия' },
  { number: 'Симптом 1.', name: 'Эмоциональное выгорание' },
  { number: 'Симптом 2.', name: 'Спасательство / гиперпомощь' },
  { number: 'Симптом 1.', name: 'Обесценивание себя' },
];

export const MainScreenWithModules = () => {
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
        /* ===== FONTS ===== */
        @font-face {
          font-family: 'mr_GuardianCircusG';
          src: url('/fonts/mr_GuardianCircusG.woff2') format('woff2'),
               url('/fonts/mr_GuardianCircusG.woff') format('woff'),
               url('/fonts/mr_GuardianCircusG.ttf') format('truetype');
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
          width: 1734px;
          height: 100%;
          margin: 0 auto;
        }
        
        .page-container { 
          width: min(1200px, 100%); 
          margin: 0 auto; 
        }
        
        .site-header { 
          position: relative;
          z-index: 20; 
          width: 100%;
          max-width: 1409px;
          margin: 44px auto 0;
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

        /* ===== HERO SECTION ===== */
        .hero-section {
          width: 100%;
          background: linear-gradient(180deg, #F5E6D3 0%, #FDF6EE 60%, #FFFFFF 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-inner {
          position: relative;
          width: min(1200px, 100%);
          margin: 0 auto;
          padding: 60px 0 0;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .hero-title {
          font-family: 'mr_GuardianCircusG', cursive;
          font-size: 52px;
          line-height: 1.2;
          color: #3D1903;
          margin: 0 0 30px;
          z-index: 2;
          position: relative;
          max-width: 500px;
        }

        .hero-bg-decor {
          position: absolute;
          bottom: 0;
          right: -5%;
          width: 70%;
          height: auto;
          z-index: 1;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }

        .hero-bg-decor img {
          width: 100%;
          height: auto;
          display: block;
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
          width: min(1200px, 100%);
          margin: 0 auto;
          padding: 0 0;
        }

        @media (max-width: 900px) {
          .symptoms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-title {
            font-size: 38px;
          }
        }

        @media (max-width: 600px) {
          .symptoms-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 30px;
          }
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
        }

        .symptom-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(61, 25, 3, 0.08);
        }

        .symptom-label {
          font-family: 'Evolventa', sans-serif;
          font-weight: 300;
          font-size: 14px;
          line-height: 21px;
          color: #4DB8B0;
          margin: 0;
        }

        .symptom-title {
          font-family: 'Evolventa', sans-serif;
          font-weight: 400;
          font-size: 20px;
          line-height: 26px;
          color: #3D1903;
          margin: 0;
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

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ width: '100%', marginTop: '98px' }}>
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-inner">
            <h1 className="hero-title">
              Твой первый<br />цветок ждет тебя
            </h1>
            {/* Замените на реальное изображение: /hero-soil.png */}
            <div className="hero-bg-decor">
              <svg
                viewBox="0 0 900 520"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: 'auto', opacity: 0.95 }}
              >
                {/* Ground / soil mound */}
                <ellipse cx="560" cy="480" rx="380" ry="200" fill="#4A2E14" />
                <ellipse cx="560" cy="460" rx="360" ry="190" fill="#5C3D1E" />
                <ellipse cx="560" cy="440" rx="340" ry="180" fill="#6B4423" />
                <ellipse cx="560" cy="420" rx="320" ry="165" fill="#7A5230" />
                
                {/* Soil texture dots */}
                {Array.from({ length: 120 }).map((_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const r = Math.random() * 340;
                  const cx = 560 + Math.cos(angle) * r;
                  const cy = 440 + Math.sin(angle) * r * 0.5;
                  const size = 1 + Math.random() * 2;
                  const colors = ['#5C3D1E', '#6B4423', '#4A2E14', '#8B6040', '#3D2B12'];
                  return <circle key={`soil-${i}`} cx={cx} cy={cy} r={size} fill={colors[i % colors.length]} opacity="0.6" />;
                })}

                {/* Tall flower stems */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const x = 280 + Math.random() * 500;
                  const baseY = 460;
                  const topY = 60 + Math.random() * 140;
                  const sway = (Math.random() - 0.5) * 40;
                  const midY = (baseY + topY) / 2;
                  return (
                    <g key={`stem-${i}`}>
                      <path
                        d={`M ${x} ${baseY} Q ${x + sway} ${midY} ${x + sway * 0.5} ${topY}`}
                        stroke={i % 3 === 0 ? '#8BAA7C' : '#7A9B6A'}
                        strokeWidth={1 + Math.random() * 1.5}
                        fill="none"
                        opacity="0.7"
                      />
                      {/* Tiny buds */}
                      <circle 
                        cx={x + sway * 0.5} 
                        cy={topY - 5} 
                        r={3 + Math.random() * 4} 
                        fill={['#F5D67B', '#FFE4B5', '#FFF8E7', '#E8D5B7'][i % 4]} 
                        opacity="0.6" 
                      />
                    </g>
                  );
                })}

                {/* Scattered tiny flowers */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const x = 250 + Math.random() * 550;
                  const y = 250 + Math.random() * 180;
                  const size = 3 + Math.random() * 6;
                  const colors = ['#FFF8E7', '#FFE4B5', '#E8D5B7', '#F0E6D0', '#FFEFD5', '#FAEBD7'];
                  const petalColor = colors[i % colors.length];
                  const rotation = Math.random() * 360;
                  return (
                    <g key={`flower-${i}`} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
                      <line x1="0" y1="0" x2="0" y2={8 + Math.random() * 12} stroke="#7A9B6A" strokeWidth="0.8" opacity="0.5" />
                      {[0, 60, 120, 180, 240, 300].map((angle) => (
                        <ellipse key={angle} cx="0" cy={-size} rx={size * 0.35} ry={size * 0.9} fill={petalColor} transform={`rotate(${angle})`} opacity="0.8" />
                      ))}
                      <circle cx="0" cy="0" r={size * 0.2} fill="#F5D67B" />
                    </g>
                  );
                })}

                {/* Larger accent flowers */}
                {[
                  { x: 320, y: 280, size: 10, color: '#FFE4B5' },
                  { x: 700, y: 200, size: 12, color: '#FFF8E7' },
                  { x: 500, y: 250, size: 8, color: '#E8D5B7' },
                  { x: 800, y: 300, size: 9, color: '#FFEFD5' },
                ].map((f, i) => (
                  <g key={`accent-${i}`} transform={`translate(${f.x}, ${f.y})`}>
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#7A9B6A" strokeWidth="1.5" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <ellipse key={angle} cx="0" cy={-f.size} rx={f.size * 0.3} ry={f.size} fill={f.color} transform={`rotate(${angle})`} opacity="0.85" />
                    ))}
                    <circle cx="0" cy="0" r={f.size * 0.25} fill="#F5D67B" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </section>

        {/* Symptoms Cards */}
        <section className="symptoms-section">
          <div className="symptoms-grid">
            {symptoms.map((s, i) => (
              <div className="symptom-card" key={i}>
                <p className="symptom-label">{s.number}</p>
                <h3 className="symptom-title">{s.name}</h3>
                <button className="symptom-btn">Перейти к модулю</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <section className="section-wrapper" style={{
        height: '547px',
        background: '#3D1903',
        boxShadow: '0px 27px 39px rgba(82, 82, 82, 0.08)',
        marginBottom: 0,
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

          {[
            { text: 'О курсе', top: '142px', href: '#about' },
            { text: 'Симптомы', top: '188px', href: '#symptoms' },
            { text: 'Как это работает', top: '234px', href: '#howitworks' },
            { text: 'Специалисты', top: '280px', href: '#specialists' },
          ].map((item) => (
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