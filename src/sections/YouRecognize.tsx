import { useEffect, useRef } from 'react'

const cards = [
  {
    image: '/images/card_image_1.png',
    text: 'Ты откладываешь даже важные дела',
  },
  {
    image: '/images/card_image_2.png',
    text: 'Подстраиваешься под других и теряешь себя',
  },
  {
    image: '/images/card_image_3.png',
    text: 'Чувствуешь выгорание без явной причины',
  },
  {
    image: '/images/card_image_4.png',
    text: 'Помогаешь всем, но не себе',
  },
]

export default function YouRecognize() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #C8E6D9 0%, #F5EDE0 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-5 w-24 h-24 rounded-full bg-sage/10 blur-xl" />
        <div className="absolute bottom-20 left-0 w-32 h-32 rounded-full bg-mint/10 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-[430px] mx-auto px-5">
        {/* Title */}
        <h2 className="reveal opacity-0 font-guardian text-[28px] text-dark text-center mb-8 animate-fade-in-up">
          Ты узнаёшь себя?
        </h2>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="reveal opacity-0 bg-cream rounded-card shadow-card overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.15 * (index + 1)}s` }}
            >
              <div className="w-full h-[140px] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.text}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-guardian text-base text-dark">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p
          className="reveal opacity-0 font-guardian text-lg text-brown text-center mt-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          Если ты узнал(а) себя хотя бы
          <br />
          в одном — этот курс для
          <br />
          <span className="text-teal text-xl">тебя</span>
        </p>
      </div>
    </section>
  )
}
