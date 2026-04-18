import { useEffect, useRef } from 'react'
import { Sprout, Flower2, Flower, Sun, HeartHandshake } from 'lucide-react'

const symptoms = [
  { icon: Sprout, text: 'Прокрастинация' },
  { icon: Flower2, text: 'Хроническое опоздание' },
  { icon: Flower, text: 'Социальная мимикрия' },
  { icon: Sun, text: 'Эмоциональное выгорание' },
  { icon: HeartHandshake, text: 'Спасательство / гиперпомощь' },
]

export default function Symptoms() {
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
      id="symptoms"
      ref={sectionRef}
      className="relative w-full py-12 overflow-hidden"
      style={{ background: '#F5EDE0' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 right-10 w-20 h-20 rounded-full bg-sage/10 blur-xl" />
        <div className="absolute bottom-10 left-5 w-28 h-28 rounded-full bg-mint/10 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-[430px] mx-auto px-5">
        {/* Title */}
        <h2 className="reveal opacity-0 font-guardian text-[26px] text-dark text-center mb-2 animate-fade-in-up">
          6 симптомов = 6 цветов
        </h2>

        {/* Subtitle */}
        <p
          className="reveal opacity-0 font-guardian text-base text-dark/70 text-center mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.15s' }}
        >
          Каждый цветок — это не проблема.
          <br />
          Это точка роста, которую можно...
        </p>

        {/* Symptoms list */}
        <div className="flex flex-col gap-4">
          {symptoms.map((symptom, index) => {
            const Icon = symptom.icon
            return (
              <div
                key={index}
                className="reveal opacity-0 flex items-center gap-4 bg-white/60 rounded-card px-5 py-4 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${0.12 * (index + 1)}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <span className="font-guardian text-base text-dark">{symptom.text}</span>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div
          className="reveal opacity-0 mt-8 text-center animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <button className="inline-block bg-teal text-white font-guardian text-lg px-10 py-4 rounded-pill shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all duration-300 w-full max-w-[280px]">
            Отправить заявку
          </button>
        </div>
      </div>
    </section>
  )
}
