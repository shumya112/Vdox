import { useEffect, useState } from 'react';

export const FirstFlowerPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100%',
      fontFamily: 'Inter, sans-serif', 
      color: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: 'url("/Тест.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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
      `}</style>

      {/* Контент страницы будет добавлен согласно макету Тест.png */}
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{
          fontFamily: "'Evolventa', sans-serif",
          fontSize: '48px',
          color: '#3D1903',
          textAlign: 'center',
        }}>
          Страница "Посадить первый цветок"
        </h1>
        <p style={{
          fontFamily: "'Evolventa', sans-serif",
          fontSize: '24px',
          color: '#3D1903',
          textAlign: 'center',
          marginTop: '20px',
        }}>
          Дизайн будет соответствовать макету Тест.png
        </p>
        <a 
          href="/" 
          style={{
            marginTop: '40px',
            padding: '16px 32px',
            background: '#F4F5F0',
            borderRadius: '38px',
            fontFamily: "'Evolventa', sans-serif",
            fontSize: '24px',
            color: '#111111',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};
