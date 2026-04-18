import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.1 }
    )

    const elements = heroRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = () => {
    const el = document.getElementById('symptoms')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative w-full pt-24 pb-10 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #C8E6D9 0%, #A8D5BA 60%, #C8E6D9 100%)',
      }}
    >
      {/* Decorative background flowers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-20 w-60 h-60 rounded-full bg-sage/20 blur-2xl" />
        <div className="absolute top-40 -left-10 w-40 h-40 rounded-full bg-mint/30 blur-xl" />
        <div className="absolute bottom-20 right-0 w-50 h-50 rounded-full bg-sage/15 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-[430px] mx-auto px-5 text-center">
        {/* Main headline */}
        <h1 className="reveal opacity-0 font-guardian text-[32px] leading-tight text-dark mb-3 animate-fade-in-up">
          Собери свой сад
          <br />
          из новых привычек
        </h1>

        {/* Subtitle */}
        <p
          className="reveal opacity-0 font-guardian text-lg text-brown mb-2 animate-fade-in-up stagger-1"
          style={{ animationDelay: '0.15s' }}
        >
          6 симптомов | 6 модулей
        </p>

        {/* Description */}
        <p
          className="reveal opacity-0 font-guardian text-base text-dark/80 mb-6 max-w-[300px] mx-auto animate-fade-in-up stagger-2"
          style={{ animationDelay: '0.3s' }}
        >
          Понятные шаги и трекеры, которые реально меняют поведение
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToSection}
          className="reveal opacity-0 inline-block bg-teal text-white font-guardian text-lg px-8 py-4 rounded-pill shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up stagger-3"
          style={{ animationDelay: '0.45s' }}
        >
          Начать выращивать сад
        </button>

        {/* Hero Image */}
        <div
          className="reveal opacity-0 mt-8 animate-fade-in-up stagger-4"
          style={{ animationDelay: '0.6s' }}
        >
          <img
            src="/images/hero_image.png"
            alt="Женщина медитирует среди цветов"
            className="w-full h-auto animate-float"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
