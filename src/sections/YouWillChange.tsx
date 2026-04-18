import { useEffect, useRef } from 'react'
import { BookOpen, HandHeart, Users, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Короткая теория',
    description: 'Понимаешь, почему это происходит именно с тобой (без воды и сложных терминов)',
  },
  {
    icon: HandHeart,
    title: 'Практики',
    description: 'Конкретные действия, которые ты внедряешь в жизнь сразу',
  },
  {
    icon: Users,
    title: 'Разборы ситуаций',
    description: 'Узнаёшь себя в примерах и понимаешь, как действовать иначе',
  },
  {
    icon: TrendingUp,
    title: 'Трекер изменений',
    description: 'Фиксируешь результат и видишь, как меняется твоё поведение',
  },
]

export default function YouWillChange() {
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
      ref={sectionRef}
      className="relative w-full py-12 bg-brown overflow-hidden"
    >
      {/* Decorative curved lines */}
      <svg
        className="absolute top-10 right-0 w-36 h-48 pointer-events-none opacity-15"
        viewBox="0 0 100 150"
        fill="none"
      >
        <path
          d="M80 0 Q 10 40 80 80 Q 150 120 80 150"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-20 left-0 w-32 h-32 pointer-events-none opacity-10"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M0 50 Q 50 10 100 50 Q 50 90 0 50"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="relative z-10 max-w-[430px] mx-auto px-5">
        {/* Title */}
        <h2 className="reveal opacity-0 font-guardian text-[26px] text-white text-center mb-3 leading-snug animate-fade-in-up">
          Ты не будешь просто
          <br />
          слушать — ты будешь
          <br />
          менять себя
        </h2>

        {/* Subtitle */}
        <p
          className="reveal opacity-0 font-guardian text-base text-white/70 text-center mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.15s' }}
        >
          Каждый модуль — это короткий путь
          <br />
          от "я так живу" к "я делаю по-другому"
        </p>

        {/* Feature cards */}
        <div className="flex flex-col gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="reveal opacity-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-card px-5 py-5 animate-fade-in-up"
                style={{ animationDelay: `${0.12 * (index + 1)}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mt-0.5">
                    <Icon className="w-5 h-5 text-daisy" />
                  </div>
                  <div>
                    <h3 className="font-guardian text-lg text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-guardian text-sm text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
