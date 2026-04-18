import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '1',
    text: 'Ты выбираешь симптом',
    subtext: '→ получаешь "семя"',
  },
  {
    number: '2',
    text: 'Проходишь модуль',
    subtext: '→ выполняешь практики',
  },
  {
    number: '3',
    text: 'Закрываешь трекер',
    subtext: '→ цветок вырастает',
  },
  {
    number: '4',
    text: 'Собираешь свой сад',
    subtext: '',
  },
]

export default function HowItWorks() {
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
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full py-12 bg-brown overflow-hidden"
    >
      {/* Decorative curved line */}
      <svg
        className="absolute top-20 right-0 w-32 h-64 pointer-events-none opacity-20"
        viewBox="0 0 100 200"
        fill="none"
      >
        <path
          d="M80 0 Q 20 50 80 100 Q 140 150 80 200"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-10 left-0 w-40 h-40 pointer-events-none opacity-15"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M0 50 Q 50 0 100 50"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="relative z-10 max-w-[430px] mx-auto px-5">
        {/* Title */}
        <h2 className="reveal opacity-0 font-guardian text-[28px] text-white text-center mb-10 animate-fade-in-up">
          Как устроен курс?
        </h2>

        {/* Steps */}
        <div className="flex flex-col gap-8 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-white/20" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="reveal opacity-0 flex items-start gap-5 animate-fade-in-up"
              style={{ animationDelay: `${0.15 * (index + 1)}s` }}
            >
              {/* Number circle */}
              <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center bg-brown">
                <span className="font-guardian text-2xl text-white">{step.number}</span>
              </div>

              {/* Text */}
              <div className="pt-2">
                <p className="font-guardian text-lg text-white leading-snug">
                  {step.text}
                </p>
                {step.subtext && (
                  <p className="font-guardian text-base text-white/70 mt-1">
                    {step.subtext}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
