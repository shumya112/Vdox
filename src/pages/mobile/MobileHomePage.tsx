import { useState, useEffect } from 'react';

const stepTextMobile = {
  fontFamily: "'Evolventa', sans-serif",
  fontStyle: 'normal' as const,
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '20px',
  color: '#F4F5F0',
  margin: '0 0 4px 0px',
  marginLeft: '-10px'
};
export const MobileHomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      // Запоминаем текущую позицию скролла
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      // Восстанавливаем позицию скролла
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
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif',
      color: '#111',
      background: '#F4F5F0',
      overflowX: 'hidden',
    }}>
      <style>{`
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
      `}</style>

      {/* ===== HEADER ===== */}
      <header style={{
        position: 'absolute',
        width: 'calc(100% - 50px)',
        maxWidth: '380px',
        height: '72px',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '16px',
        background: '#FFFFFF',
        boxShadow: '0px 6px 12px rgba(39, 5, 5, 0.16)',
        borderRadius: '20px',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
      }}>
        <img 
          src="/logo.png" 
          alt="ВЫДОХ" 
          style={{ height: 40, width: 'auto', display: 'block', objectFit: 'contain' }} 
        />
        {/* КНОПКА БУРГЕР-МЕНЮ */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Menu"
        >
          {menuOpen ? (
            <img 
              src="/headersymbolclose.png" 
              alt="Закрыть" 
              style={{ width: 20, height: 20, objectFit: 'contain' }} 
            />
          ) : (
            <img 
              src="/headersymbol1.png" 
              alt="Меню" 
              style={{ width: 25, height: 16, objectFit: 'contain' }} 
            />
          )}
        </button>
      </header>

      {/* ===== FULL-SCREEN MENU OVERLAY ===== */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeInUp 0.3s ease-out',

        }}>

          {/* Menu items */}
          <div style={{
            flex: 1,
            background: '#FFF3E6',
            width: '100%',
            minHeight: '39px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '32px',
              position: 'absolute',
              width: '173px',
              height: '176px',
              left: '40px',
              top: 'calc(50% - 176px/2 - 1px)',
            }}>
              {[
                { label: 'О курсе', id: 'about' },
                { label: 'Симптомы', id: 'symptoms' },
                { label: 'Как это работает', id: 'howitworks' },
                { label: 'Специалисты', id: 'specialists' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    textAlign: 'left',
                    fontFamily: "'Evolventa', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '24px',
                    color: '#3D1903',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom brown panel with rounded top */}
          {/* Ellipse 3 - круг на фоне */}
                    {/* Ellipse 3 - круг на фоне */}
          <div style={{
            position: 'absolute',
            width: '585px',
            height: '585px',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '-300px',  // ← было top: '529px', теперь привязка к низу
            background: 'linear-gradient(102.83deg, #3D1903 -3.96%, #B87C57 77.14%)',
            borderRadius: '50%',
            zIndex: 0,
          }} />
            
          <div style={{
            position: 'relative',
            maxWidth: '430px',
            margin: '0 auto',
            padding: '32px 25px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}>
            {/* CTA Button */}
            <button 
              onClick={() => {
                window.location.hash = 'first-flower';
                setMenuOpen(false);
              }}
              style={{
                position: 'relative',
                top: '-25px',
                width: '340px',
                background: '#FFF3E6',
                color: '#3D1903',
                fontFamily: "'Evolventa', sans-serif",
                fontSize: '16px',
                lineHeight: '19px',
                fontWeight: '700',
                padding: '16px 24px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Посадить первый цветок
            </button>

            {/* Phone */}
            <a 
              href="tel:89913347070" 
              style={{
                position: 'relative',
                top: '-30px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontFamily: "'Evolventa', sans-serif",
                fontSize: '16px',
              }}
            >
              <img 
                src="/phone.png" 
                alt="Телефон" 
                style={{ width: 24, height: 24, objectFit: 'contain' }} 
              />
              <span>8 (991) 334 70-70</span>
            </a>  
          </div>
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section id="about" style={{
        height: '751px',
        backgroundImage: 'url("/munderheader.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',  
      }}>
        <h2 style={{
          position: 'absolute',
          width: '306px',
          height: '94px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '139px',
          fontFamily: "'mr_GuardianCircusG', cursive",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '50px',
          lineHeight: '37px',
          color: '#000000',
          margin: 0
        }}>
          Собери свой сад из новых привычек
        </h2>
        <div style={{
          position: 'absolute',
          width: '314px',
          height: '57px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '220px',
          fontFamily: "'Evolventa', sans-serif",
          fontStyle: 'normal',
          fontSize: '18px',
          lineHeight: '24px',
          color: '#000000',
          margin: 0,
        }}>
          <span style={{ fontWeight: 'bold' }}>6 симптомов | 6 модулей</span> <br />
          <span style={{ fontWeight: 400 }}>
            понятные шаги и трекеры, которые реально меняют поведение
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 24px',
          gap: '16px',
          position: 'absolute',
          width: '380px',
          height: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '302px',
          background: '#FFFFFF',
          borderRadius: '38px',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}> 
          <span style={{
            width: '292px',
            height: '24px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#111111',
            flex: 'none',
            order: 0,
            flexGrow: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            Начать варащивать сад
            <a
              href="#symptoms"
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 220,
                height: 56,
                display: 'block',
                cursor: 'pointer',
              }}
              aria-label="Начать выращивать сад"
            />  
          </span>
        </div>
      </section>
      
      {/* ===== SYMPTOMS SECTION ===== */}
      <section id="symptoms" style={{
        padding: '40px 25px',
        background: '#FFF3E6',
        minHeight: '1134px'
      }}>
        <h2 style={{
          fontFamily: "'Evolventa', sans-serif",
          fontWeight: 700,
          fontSize: 28,
          color: '#3D1903',
          marginBottom: 24,
        }}>
          Ты узнаешь себя?
        </h2>

        {/* Карточка 1 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px',
          gap: '16px',
          width: '100%',
          maxWidth: '380px',
          height: '197px',
          margin: '0 auto 16px',
          background: '#F4F5F0',
          borderRadius: '5px',
          boxSizing: 'border-box',
        }}>
          <img 
            src="/k1.png" 
            alt="" 
            style={{
              width: '100%',
              height: '131px',
              objectFit: 'cover',
              borderRadius: '5px 5px 0px 0px',
              display: 'block',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0,
            }} 
          />
          <p style={{
            width: '100%',
            height: '18px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '18px',
            color: '#000000',
            margin: 0,
            flex: 'none',
            order: 1,
            alignSelf: 'stretch',
            flexGrow: 0,
          }}>
            Ты откладываешь даже важные дела
          </p>
        </div>

        {/* Карточка 2 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px',
          gap: '16px',
          width: '100%',
          maxWidth: '380px',
          height: '215px',
          margin: '0 auto 16px',
          background: '#F4F5F0',
          borderRadius: '5px',
          boxSizing: 'border-box',
        }}>
          <img 
            src="/k2.png" 
            alt="" 
            style={{
              width: '100%',
              height: '131px',
              objectFit: 'cover',
              borderRadius: '5px 5px 0px 0px',
              display: 'block',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0,
            }} 
          />
          <p style={{
            width: '100%',
            height: '36px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '18px',
            color: '#000000',
            margin: 0,
            flex: 'none',
            order: 1,
            alignSelf: 'stretch',
            flexGrow: 0,
            whiteSpace: 'pre-line',
          }}>
            Подстраиваешься под других{'\n'}и теряешь себя
          </p>
        </div>

        {/* Карточка 3 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px',
          gap: '16px',
          width: '100%',
          maxWidth: '380px',
          height: '215px',
          margin: '0 auto 16px',
          background: '#F4F5F0',
          borderRadius: '5px',
          boxSizing: 'border-box',
        }}>
          <img 
            src="/k3.png" 
            alt="" 
            style={{
              width: '100%',
              height: '131px',
              objectFit: 'cover',
              borderRadius: '5px 5px 0px 0px',
              display: 'block',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0,
            }} 
          />
          <p style={{
            width: '100%',
            height: '36px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '18px',
            color: '#000000',
            margin: 0,
            flex: 'none',
            order: 1,
            alignSelf: 'stretch',
            flexGrow: 0,
            whiteSpace: 'pre-line',
          }}>
            Чувствуешь выгорание без явной{'\n'}причины
          </p>
        </div>

        {/* Карточка 4 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px',
          gap: '16px',
          width: '100%',
          maxWidth: '380px',
          height: '197px',
          margin: '0 auto 16px',
          background: '#F4F5F0',
          borderRadius: '5px',
          boxSizing: 'border-box',
        }}>
          <img 
            src="/k4.png" 
            alt="" 
            style={{
              width: '100%',
              height: '131px',
              objectFit: 'cover',
              borderRadius: '5px 5px 0px 0px',
              display: 'block',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0,
            }} 
          />
          <p style={{
            width: '100%',
            height: '18px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '18px',
            color: '#000000',
            margin: 0,
            flex: 'none',
            order: 1,
            alignSelf: 'stretch',
            flexGrow: 0,
          }}>
            Помогаешь всем, но не себе
          </p>
        </div>

        {/* Текст внизу секции */}
        <p style={{
          position: 'relative',
          width: '357px',
          height: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '0px',
          margin: '32px 0 0 0',
          fontFamily: "'Evolventa', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '24px',
          color: '#000000',
          textAlign: 'left',
        }}>
          Если ты узнал(а) себя хотя бы <br/> в одном — этот курс для{' '}
          <span style={{
            position: 'absolute',
            width: '71px',
            height: '40px',
            left: 'calc(50% - 71px/2 + 142.5px)',
            fontFamily: "'mr_GuardianCircusG', cursive",
            fontSize: '48px',
            lineHeight: '36px',
            display: 'inline',
            top: '45px'
          }}>
            тебя
          </span>
        </p>
      </section>

      {/* ===== HOW IT WORKS (mobile) ===== */}
      <section id="howitworks" style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        minHeight: '469px',
        padding: '40px 25px',
        backgroundImage: 'url("/ml.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <h2 style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          left: '0px',
          top: '0px',
          fontFamily: "'Evolventa', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '32px',
          lineHeight: '28px',
          color: '#F4F5F0',
          margin: '0 0 32px 0',
        }}>
          Как устроен курс?
        </h2>

        <div style={{
          position: 'relative',
          left: '0px',
          top: '0px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
        }}>
          {/* Шаг 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #F4F5F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Evolventa', sans-serif",
                fontSize: '24px',
                fontWeight: 400,
                color: '#F4F5F0',
                flexShrink: 0,
              }}>
                1
              </div>
              <div>
                <p style={stepTextMobile}>Ты выбираешь симптом</p>
                <p style={stepTextMobile}>→ получаешь "семя"</p>
              </div>
            </div>
            {/* Линия 1 */}
            <div style={{
              width: '1px',
              height: '50px',
              background: '#F4F5F0',
              marginLeft: '20px',
              marginTop: '-8px',
            }} />
          </div>

          {/* Шаг 2 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #F4F5F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Evolventa', sans-serif",
                fontSize: '24px',
                fontWeight: 400,
                color: '#F4F5F0',
                flexShrink: 0,
              }}>
                2
              </div>
              <div>
                <p style={stepTextMobile}>Проходишь модуль</p>
                <p style={stepTextMobile}>→ выполняешь практики</p>
              </div>
            </div>
            {/* Линия 2 */}
            <div style={{
              width: '1px',
              height: '50px',
              background: '#F4F5F0',
              marginLeft: '20px',
              marginTop: '-8px',
            }} />
          </div>

          {/* Шаг 3 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #F4F5F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Evolventa', sans-serif",
                fontSize: '24px',
                fontWeight: 400,
                color: '#F4F5F0',
                flexShrink: 0,
              }}>
                3
              </div>
              <div>
                <p style={stepTextMobile}>Закрываешь трекер</p>
                <p style={stepTextMobile}>→ цветок вырастает</p>
              </div>
            </div>
            {/* Линия 3 */}
            <div style={{
              width: '1px',
              height: '50px',
              background: '#F4F5F0',
              marginLeft: '20px',
              marginTop: '-8px',
            }} />
          </div>

          {/* Шаг 4 (без линии) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #F4F5F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Evolventa', sans-serif",
                fontSize: '24px',
                fontWeight: 400,
                color: '#F4F5F0',
                flexShrink: 0,
              }}>
                4
              </div>
              <div>
                <p style={stepTextMobile}>Собираешь свой сад</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6 FLOWERS ===== */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '905px',
        padding: '40px 25px',
        backgroundImage: 'url("/mflowers.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}>
        <h2 style={{
          position: 'absolute',
          width: '380px',
          height: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '60px',
          fontFamily: "'Evolventa', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '32px',
          lineHeight: '40px',
          color: '#000000',
          margin: 0
        }}>
          6 симптомов = 6 цветов
        </h2>
        <p style={{
          position: 'absolute',
          width: '287px',
          height: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '103px',
          fontFamily: "'Evolventa', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '16px',
          color: '#000000',
          margin: 0
        }}>
          Каждый цветок — это не проблема. Это точка роста, которую можно
          <span style={{
            position: 'absolute',
            width: '153px',
            height: '40px',
            left: 'calc(50% - 153px/2 + 113.5px)',
            top: '26px',
            fontFamily: "'mr_GuardianCircusG', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '48px',
            lineHeight: '40px',
            color: '#000000',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            изменить
          </span>
        </p>
        {/* Фото 1 */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '370px',
          height: '110px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '177px',
          borderRadius: '30px',
          overflow: 'hidden'
        }}>
          <img src="/mfm1.png" alt="mfm 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Фото 2 */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '370px',
          height: '107px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '299px',
          borderRadius: '34.42px',
          overflow: 'hidden'
        }}>
          <img src="/mfm2.png" alt="mfm 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Фото 3 */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '370px',
          height: '107px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '418px',
          borderRadius: '34.42px',
          overflow: 'hidden'
        }}>
          <img src="/mfm3.png" alt="mfm 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Фото 4 */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '370px',
          height: '107px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '537px',
          borderRadius: '34.42px',
          overflow: 'hidden'
        }}>
          <img src="/mfm4.png" alt="mfm 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Фото 5 */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '370px',
          height: '107px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '656px',
          borderRadius: '34.42px',
          overflow: 'hidden'
        }}>
          <img src="/mfm5.png" alt="mfm 5" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <button style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 24px',
          gap: '16px',
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '370px',
          height: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '797px',
          background: '#4FB1A8',
          borderRadius: '38px',
          border: 'none',
          cursor: 'pointer',
          outline: 'none'
        }}>
          <span style={{
            color: '#FFFFFF',
            fontFamily: "'Evolventa', sans-serif",
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '24px'
          }}>
            Отправить заявку
          </span>
        </button>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '672px',
        padding: '40px 25px',
        backgroundImage: 'url("/mlines.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}>
        {/* Заголовок */}
        <h2 style={{
          position: 'absolute',
          width: '348px',
          height: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '36px',
          fontFamily: "'Evolventa', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '32px',
          lineHeight: '40px',
          color: '#F4F5F0',
          margin: 0,
        }}>
          Ты не будешь просто слушать — ты будешь менять себя
        </h2>
        
        {/* Подзаголовок */}
        <p style={{
          position: 'absolute',
          width: '349px',
          height: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '160px',
          fontFamily: "'Evolventa', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '18px',
          color: '#F4F5F0',
          margin: 0,
        }}>
          Каждый модуль — это короткий путь от "я так живу" к "я делаю по-другому"
        </p>

        {/* Карточки начинаются ниже */}
        <div style={{
          position: 'absolute',
          top: '220px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '340px',
        }}>
          {/* Карточка 1 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '16px',
            gap: '8px',
            width: '100%',
            height: '110px',
            marginBottom: '12px',
            background: '#FFF3E6',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}>
            <h3 style={{
              width: '298px',
              height: '20px',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              color: '#3D1903',
              margin: 0,
            }}>
              Короткая теория
            </h3>
            <p style={{
              width: '100%',
              height: 'auto',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '16px',
              color: '#3D1903',
              margin: 0,
              opacity: 0.8,
            }}>
              Понимаешь, почему это происходит именно с тобой <br/>(без воды и сложных терминов)
            </p>
          </div>

          {/* Карточка 2 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '16px',
            gap: '8px',
            width: '100%',
            height: '96px',
            marginBottom: '12px',
            background: '#FFF3E6',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}>
            <h3 style={{
              width: '298px',
              height: '20px',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              color: '#3D1903',
              margin: 0,
            }}>
              Практики
            </h3>
            <p style={{
              width: '100%',
              height: 'auto',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '16px',
              color: '#3D1903',
              margin: 0,
              opacity: 0.8,
            }}>
              Конкретные действия, которые ты внедряешь в жизнь сразу
            </p>
          </div>

          {/* Карточка 3 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '16px',
            gap: '8px',
            width: '100%',
            height: '96px',
            marginBottom: '12px',
            background: '#FFF3E6',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}>
            <h3 style={{
              width: '298px',
              height: '20px',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              color: '#3D1903',
              margin: 0,
            }}>
              Разборы ситуаций
            </h3>
            <p style={{
              width: '100%',
              height: 'auto',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '16px',
              color: '#3D1903',
              margin: 0,
              opacity: 0.8,
            }}>
              Узнаёшь себя в примерах и понимаешь, как действовать иначе
            </p>
          </div>

          {/* Карточка 4 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '16px',
            gap: '8px',
            width: '100%',
            height: '96px',
            background: '#FFF3E6',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}>
            <h3 style={{
              width: '298px',
              height: '20px',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              color: '#3D1903',
              margin: 0,
            }}>
              Трекер изменений
            </h3>
            <p style={{
              width: '100%',
              height: 'auto',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '16px',
              color: '#3D1903',
              margin: 0,
              opacity: 0.8,
            }}>
              Фиксируешь результат и видишь, как меняется твоё поведение
            </p>
          </div>
        </div>
      </section>

      {/* ===== SPECIALISTS + CTA + FOOTER ===== */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '1103px',
        backgroundImage: 'url("/mend.png")',
        overflow: 'hidden',
      }}>
        {/* SPECIALISTS */}
        <div id='specialists' style={{
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '380px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '40px',
          marginTop: '10px'
        }}>
          <h2 style={{
            width: '100%',
            height: '24px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '21px',
            lineHeight: '24px',
            top: '600px',
            color: '#3D1903',
            margin: '0 0 8px 0',
          }}>
            Этот сад ты выращиваешь не один 
          </h2>
          <br/>
          <p style={{
            width: '330px',
            height: 'auto',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '18px',
            color: '#3D1903',
            margin: '0 0 24px 0',
          }}>
            С тобой работают практикующие психологи
          </p>

          {/* Цитата слева */}
          <div style={{
            width: '100%',
            paddingLeft: '12px',
            borderLeft: '1px solid #3D1903',
            marginBottom: '24px',
          }}>
            <p style={{
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#3D1903',
              margin: 0,
            }}>
              Каждый модуль разработан специалистами, которые работают с этими симптомами <br/> каждый день
            </p>
          </div>

          {/* Карточка Андрей */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '16px',
            gap: '16px',
            width: '100%',
            height: '123px',
            marginBottom: '12px',
            background: '#F4F5F0',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}>
            <img src="/ag.png" alt="" style={{
              width: '97px',
              height: '91px',
              borderRadius: '5px',
              objectFit: 'cover',
              flexShrink: 0,
            }} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <p style={{
                fontFamily: "'Evolventa', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '20px',
                color: '#3D1903',
                margin: 0,
              }}>
                Андрей Гурвич
              </p>
              <p style={{
                fontFamily: "'Evolventa', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '18px',
                color: '#3D1903',
                margin: 0,
                opacity: 0.7,
              }}>
                Практикующий психолог
              </p>
            </div>
          </div>

          {/* Карточка Юлия */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '16px',
            gap: '16px',
            width: '100%',
            height: '123px',
            marginBottom: '12px',
            background: '#F4F5F0',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}>
            <img src="/up.png" alt="" style={{
              width: '97px',
              height: '91px',
              borderRadius: '5px',
              objectFit: 'cover',
              flexShrink: 0,
            }} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <p style={{
                fontFamily: "'Evolventa', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '20px',
                color: '#3D1903',
                margin: 0,
              }}>
                Юлия Павлова
              </p>
              <p style={{
                fontFamily: "'Evolventa', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '18px',
                color: '#3D1903',
                margin: 0,
                opacity: 0.7,
              }}>
                Практикующий психолог
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '382px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '204px',
          top: '525px',
          padding: '36px 29px 36px 24px',
          background: '#F4F5F0',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: ' 0px -4px 10.4px rgba(0, 0, 0, 0.08)',
          boxSizing: 'border-box',
        }}>
          <h2 style={{
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '32px',
            color: '#3D1903',
            margin: '0 0 16px 0',
            textAlign: 'left'
          }}>
            Начни с одного цветка —<br/>и посмотри, что{' '}
            <span style={{
              position: 'absolute',
              width: '138px',
              height: '40px',
              left: 'calc(50% - 138px/2 + 85.5px)',
              top: '75px',
              fontFamily: "'mr_GuardianCircusG', cursive",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '38px',
              lineHeight: '40px',
              background: 'linear-gradient(89.44deg, #3D1903 4.07%, #B87C57 104.06%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              zIndex: 1,
              pointerEvents: 'none'
            }}>
              изменится
            </span>
          </h2>
          
          <button style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 24px',
            gap: '16px',
            marginTop: '30px',
            width: '100%',
            maxWidth: '329px',
            height: '40px',
            background: '#3D1903',
            borderRadius: '38px',
            flex: 'none',
            order: 1,
            alignSelf: 'stretch',
            flexGrow: 0,
            border: 'none',
            cursor: 'pointer',
            outline: 'none'
          }}>
            <span style={{
              width: '204px',
              height: '16px',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '16px',
              color: '#F4F5F0',
              flex: 'none',
              order: 0,
              flexGrow: 0,
              margin: 0,
              textAlign: 'center'
            }}>
              Вырастить первый цветок
            </span>
          </button>
        </div>

        {/* FOOTER */}
        <footer style={{
          marginTop: '25px',
          position: 'absolute',
          width: 'calc(100% - 50px)',
          maxWidth: '382px',
          height: '374px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '703px',
          padding: '40px 25px',
          background: '#3D1903',
          borderRadius: '15px 15px 0 0',
          boxSizing: 'border-box',
        }}>
          <img src="/flogo.png" alt="ВЫДОХ" style={{
            height: 40,
            marginBottom: 24,
          }} />
          
          {[
            { label: 'О курсе', id: 'about' },
            { label: 'Симптомы', id: 'symptoms' },
            { label: 'Как это работает', id: 'howitworks' },
            { label: 'Специалисты', id: 'specialists' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
              style={{
                display: 'block',
                padding: '8px 0',
                color: '#F4F5F0',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: "'Evolventa', sans-serif",
              }}
            >
              {item.label}
            </a>
          ))}
          
          <img src="/fflowers.png" alt="" style={{
            width: '100%',
            marginTop: 24,
            borderRadius: '15px',
          }} />
        </footer>
      </section>
    </div>
  );
};