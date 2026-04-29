import { useEffect, useState } from 'react';

const navItems = [
  { label: 'О курсе', href: '#about' },
  { label: 'Симптомы', href: '#symptoms' },
  { label: 'Как это работает', href: '#howitworks' },
  { label: 'Специалисты', href: '#specialists' },
];



export const DesktopHomePage = () => {
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
      fontFamily: 'Inter, sans-serif', 
      color: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
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
            href="#symptoms" 
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
            }}
          >
            посадить первый цветок
          </a>
        </div>
      </header>

      {/* ===== HERO SECTION (underheader) ===== */}
      <div className="section-wrapper" style={{ 
        height: '697px',
        backgroundImage: 'url("/underheader.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
          
          <div style={{
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
  

        </div>
      </div>

      {/* ===== KOURSE SECTION ===== */}
      <section className="section-wrapper" id="about" style={{
        height: '812px',
        backgroundImage: 'url("/kourse.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="section-content">
          <h2 style={{
            position: 'absolute',
            left: '164px',
            top: '100px',
            fontFamily: "'Evolventa', sans-serif",
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '40px',
            color: '#3D1903',
            margin: 0,
            zIndex: 10
          }}>
            Ты узнаешь себя?
          </h2>

          <div style={{
            position: 'absolute',
            left: '162px',
            top: '200px',
            display: 'flex',
            gap: '24px'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '28px',
                gap: '28px',
                width: '335px',
                height: '309px',
                background: '#F4F5F0',
                borderRadius: '15px',
              }}>
                <img src={`/k${i}.png`} alt="" style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }} />
                <p style={{ margin: 0, fontFamily: "'Evolventa', sans-serif", fontSize: '24px', color: '#3D1903' }}>
                  {i === 1 && 'Ты откладываешь даже важные дела'}
                  {i === 2 && 'Подстраиваешься под других и теряешь себя'}
                  {i === 3 && 'Чувствуешь выгорание без явной причины'}
                  {i === 4 && 'Помогаешь всем, но не себе'}
                </p>
              </div>
            ))}
          </div>

          <p style={{
            position: 'absolute',
            width: '820px',
            height: '106px',
            left: 'calc(50% - 820px/2 + 295px)',
            top: '545px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '40px',
            lineHeight: '53px',
            color: '#3D1903',
            margin: 0
          }}>
            Если ты узнал(а) себя хотя бы в одном — этот курс для
          </p>

          <span style={{
            position: 'absolute',
            width: '115px',
            height: '40px',
            left: 'calc(50% - 115px/2 + 209.5px)',
            top: '640px',
            fontFamily: "'mr_GuardianCircusG', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '78px',
            lineHeight: '40px',
            color: '#3D1903',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            тебя
          </span>
        </div>
      </section>

      {/* ===== HOW COURSE WORKS ===== */}
      <section className="section-wrapper" id="howitworks" style={{
        height: '911px',
        backgroundImage: 'url("/hk0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="section-content">
          <h2 style={{
            position: 'absolute',
            width: '453px',
            height: '40px',
            left: '164px',
            top: '132px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '40px',
            color: '#F4F5F0',
            margin: 0
          }}>
            Как устроен курс?
          </h2>

          <div style={{
            position: 'absolute',
            left: '196px',
            top: '317px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0'
          }}>
            {[1, 2, 3, 4].map((step, idx) => (
              <div key={step}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    border: '1px solid #F4F5F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Evolventa', sans-serif",
                    fontSize: '40px',
                    fontWeight: 400,
                    color: '#F4F5F0',
                    flexShrink: 0
                  }}>
                    {step}
                  </div>
                  <div>
                    {step === 1 && (
                      <>
                        <p style={stepText}>Ты выбираешь симптом</p>
                        <p style={stepText}>→ получаешь "семя"</p>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <p style={stepText}>Проходишь модуль</p>
                        <p style={stepText}>→ выполняешь практики</p>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <p style={stepText}>Закрываешь трекер</p>
                        <p style={stepText}>→ цветок вырастает</p>
                      </>
                    )}
                    {step === 4 && (
                      <p style={stepText}>Собираешь свой сад</p>
                    )}
                  </div>
                </div>
                {idx < 3 && (
                  <div style={{
                    width: '1px',
                    height: '87px',
                    background: '#F4F5F0',
                    marginLeft: '34px',
                    marginTop: '-38px'
                  }} />
                )}
              </div>
            ))}
          </div>

          <img src="/hk.png" alt="Как устроен курс" style={{
            position: 'absolute',
            width: '693px',
            height: '647px',
            left: '879px',
            top: '132px',
            borderRadius: '15px'
          }} />
        </div>
      </section>

      {/* ===== FLOWERS SECTION ===== */}
      <section className="section-wrapper" id="symptoms" style={{
        height: '1591px',
        backgroundImage: 'url("/flowers.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="section-content">
          <h2 style={{
            position: 'absolute',
            width: '570px',
            height: '40px',
            left: 'calc(50% - 570px/2)',
            top: '130px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '40px',
            color: '#000000',
            margin: 0
          }}>
            6 симптомов = 6 цветов
          </h2>
          
          <p style={{
            position: 'absolute',
            width: '430px',
            height: '48px',
            left: 'calc(50% - 430px/2 - 70px)',
            top: '186px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '24px',
            color: '#000000',
            margin: 0
          }}>
            Каждый цветок — это не проблема. Это точка роста, которую можно
          </p>
          
          <span style={{
            position: 'absolute',
            width: '248px',
            height: '40px',
            left: 'calc(50% - 248px/2 + 161px)',
            top: '236px',
            fontFamily: "'mr_GuardianCircusG', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '78px',
            lineHeight: '40px',
            color: '#000000',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            изменить
          </span>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            position: 'absolute',
            width: '1410px',
            height: '1131px',
            left: '162px',
            top: '276px'
          }}>
            {[ 
              ['/f1.png', '/f2.png'],
              ['/f3.png', '/f4.png'],
              ['/f5.png', '/f6.png']
            ].map((pair, idx) => (
              <div key={idx} style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '24px',
                width: '1410px',
                height: '377px',
                flex: 'none',
                order: idx,
                alignSelf: 'stretch',
                flexGrow: 0
              }}>
                <img src={pair[0]} alt="" />
                <img src={pair[1]} alt="" />
              </div>
            ))}
          </div>
          <button style={{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 24px',
  gap: '16px',
  
  position: 'absolute',
  width: '259px',
  height: '56px',
  left: '737px',
  top: '1403px',
  
  background: '#4FB1A8', // Акцентный бирюзовый цвет
  borderRadius: '38px',
  
  // Сброс стандартных стилей кнопки
  border: 'none',
  cursor: 'pointer',
  outline: 'none'
}}>
  {/* Текст внутри кнопки */}
  <span style={{
    color: '#FFFFFF', // Белый текст для контраста
    fontFamily: "'Evolventa', sans-serif",
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '24px'
  }}>
    Отправить заявку
  </span>
</button>
        </div>
      </section>

      {/* ===== LINES SECTION ===== */}
      <section className="section-wrapper" style={{
        height: '1024px',
        backgroundImage: 'url("/lines.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="section-content">
          <h2 style={{
            position: 'absolute',
            width: '782px',
            height: '80px',
            left: '164px',
            top: '132px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '40px',
            color: '#F4F5F0',
            margin: 0
          }}>
            Ты не будешь просто слушать — ты будешь менять себя
          </h2>
          
          <p style={{
            position: 'absolute',
            width: '903px',
            height: '24px',
            left: '164px',
            top: '234px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '24px',
            color: '#F4F5F0',
            margin: 0
          }}>
            Каждый модуль — это короткий путь от "я так живу" к "я делаю по-другому"
          </p>

          {[
            { title: 'Короткая теория', text: 'Понимаешь, почему это происходит именно с тобой\n(без воды и сложных терминов)', top: '292px' },
            { title: 'Практики', text: 'Конкретные действия, которые ты внедряешь\nв жизнь сразу', top: '446px' },
            { title: 'Разборы ситуаций', text: 'Узнаёшь себя в примерах и понимаешь,\nкак действовать иначе', top: '600px' },
            { title: 'Трекер изменений', text: 'Фиксируешь результат и видишь, как меняется\nтвоё поведение', top: '754px' },
          ].map((item) => (
            <div key={item.title} style={{
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '28px',
              gap: '10px',
              position: 'absolute',
              width: '693px',
              height: '138px',
              left: '162px',
              top: item.top,
              background: '#FFF3E6',
              borderRadius: '15px'
            }}>
              <h3 style={{
                width: '638px',
                height: '24px',
                fontFamily: "'Evolventa', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '24px',
                color: '#3D1903',
                margin: 0
              }}>
                {item.title}
              </h3>
              <p style={{
                width: '638px',
                height: '42px',
                fontFamily: "'Evolventa', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '24px',
                color: '#3D1903',
                margin: 0,
                whiteSpace: 'pre-line'
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SPECIALIST SECTION ===== */}
      <section className="section-wrapper" id="specialists" style={{
        height: '649px',
        backgroundImage: 'url("/Psy.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="section-content">
          <h2 style={{
            position: 'absolute',
            width: '860px',
            height: '40px',
            left: '164px',
            top: '132px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '40px',
            color: '#3D1903',
            margin: 0
          }}>
            Этот сад ты выращиваешь не один
          </h2>
          
          <p style={{
            position: 'absolute',
            width: '536px',
            height: '24px',
            left: '164px',
            top: '188px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '24px',
            color: '#3D1903',
            margin: 0
          }}>
            С тобой работают практикующие психологи
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '12px',
            position: 'absolute',
            width: '658px',
            height: '64px',
            left: '879px',
            top: '228px',
            borderLeft: '1px solid #000000',
          }}>
            <p style={{
              width: '646px',
              height: '48px',
              fontFamily: "'Evolventa', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '24px',
              marginLeft: '12px',
              color: '#000000',
            }}>
              Каждый модуль разработан специалистами, которые работают с этими симптомами каждый день
            </p>
          </div>

          {[
            { name: 'Андрей Гурвич', role: 'Практикующий психолог', img: '/ag.png', left: '162px' },
            { name: 'Юлия Павлова', role: 'Практикующий психолог', img: '/up.png', left: '879px' },
          ].map((person) => (
            <div key={person.name} style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '28px',
              gap: '24px',
              position: 'absolute',
              width: '693px',
              height: '189px',
              left: person.left,
              top: '328px',
              background: '#F4F5F0',
              borderRadius: '15px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '16px',
                width: '622px',
                height: '133px',
              }}>
                <div style={{
                  width: '141px',
                  height: '133px',
                  backgroundImage: `url("${person.img}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '15px',
                  flex: 'none',
                  flexShrink: 0
                }} />
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  flex: 1
                }}>
                  <div style={{
                    fontFamily: "'Evolventa', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '24px',
                    lineHeight: '24px',
                    color: '#3D1903',
                    margin: 0
                  }}>
                    {person.name}
                  </div>
                  <p style={{
                    fontFamily: "'Evolventa', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '24px',
                    color: '#3D1903',
                    margin: 0
                  }}>
                    {person.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== END BUTTON SECTION ===== */}
      <section className="section-wrapper" style={{
        height: '419px',
        backgroundImage: 'url("/endbutton.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="section-content">
          <h2 style={{
            position: 'absolute',
            width: '1018px',
            height: '40px',
            left: '164px',
            top: '132px',
            fontFamily: "'Evolventa', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '40px',
            color: '#3D1903',
            margin: 0
          }}>
            Начни с одного цветка — и посмотри, что
          </h2>
          
          <span style={{
            position: 'absolute',
            width: '247px',
            height: '40px',
            left: 'calc(50% - 247px/2 + 511.5px)',
            top: '155px',
            fontFamily: "'mr_GuardianCircusG', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '68px',
            lineHeight: '40px',
            background: 'linear-gradient(89.44deg, #3D1903 4.07%, #B87C57 104.06%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            изменится
          </span>
          
          <button style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 24px',
            gap: '16px',
            position: 'absolute',
            width: '353px',
            height: '56px',
            left: 'calc(50% - 353px/2 + 0.5px)',
            top: '231px',
            background: '#3D1903',
            borderRadius: '38px',
            border: 'none',
            cursor: 'pointer',
            outline: 'none'
          }}>
            <span style={{
              color: '#F4F5F0',
              fontFamily: "'Evolventa', sans-serif",
              fontWeight: 500,
              fontSize: '18px'
            }}>
              Вырастить первый цветок
            </span>
          </button>
        </div>
      </section>

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

const stepText = {
  fontFamily: "'Evolventa', sans-serif",
  fontStyle: 'normal' as const,
  fontWeight: 400,
  fontSize: '40px',
  lineHeight: '53px',
  color: '#F4F5F0',
  margin: 0,
};