import { useEffect, useRef } from 'react'

const specialists = [
  {
    name: 'Андрей Гурвич',
    role: 'Практикующий психолог',
    image: '/images/specialist_1.jpg',
  },
  {
    name: 'Юлия Павлова',
    role: 'Практикующий психолог',
    image: '/images/specialist_2.jpg',
  },
]

export default function Specialists() {
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
      id="specialists"
      ref={sectionRef}
      className="relative w-full py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5EDE0 0%, #E8F0E8 50%, #F5EDE0 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-5 w-24 h-24 rounded-full bg-sage/15 blur-xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-mint/10 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-[430px] mx-auto px-5">
        {/* Title */}
        <h2 className="reveal opacity-0 font-guardian text-[26px] text-dark text-center mb-3 leading-snug animate-fade-in-up">
          Этот сад ты выращиваешь
          <br />
          не один
        </h2>

        {/* Subtitle */}
        <p
          className="reveal opacity-0 font-guardian text-base text-brown text-center mb-2 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          С тобой работают практикующие психологи
        </p>

        {/* Description */}
        <p
          className="reveal opacity-0 font-guardian text-sm text-dark/70 text-center mb-8 max-w-[320px] mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Каждый модуль разработан специалистами, которые работают с этими симптомами каждый день
        </p>

        {/* Specialist cards */}
        <div className="flex flex-col gap-5">
          {specialists.map((specialist, index) => (
            <div
              key={index}
              className="reveal opacity-0 flex items-center gap-5 bg-white/70 backdrop-blur-sm rounded-card p-5 shadow-card animate-fade-in-up"
              style={{ animationDelay: `${0.15 * (index + 1)}s` }}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-sage/30">
                <img
                  src={specialist.image}
                  alt={specialist.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div>
                <h3 className="font-guardian text-xl text-dark mb-1">
                  {specialist.name}
                </h3>
                <p className="font-guardian text-sm text-dark/60">
                  {specialist.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
