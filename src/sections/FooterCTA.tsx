import { useEffect, useRef } from 'react'

export default function FooterCTA() {
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
      className="relative w-full py-12 overflow-hidden"
      style={{ background: '#F5EDE0' }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-sage/10 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-[430px] mx-auto px-5 text-center">
        {/* Title */}
        <h2 className="reveal opacity-0 font-guardian text-[26px] text-dark mb-8 leading-snug animate-fade-in-up">
          Начни с одного цветка —
          <br />
          и посмотри, что...
        </h2>

        {/* CTA Button */}
        <div
          className="reveal opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <button className="inline-block bg-teal text-white font-guardian text-lg px-10 py-4 rounded-pill shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all duration-300">
            Вырастить первый цветок
          </button>
        </div>
      </div>
    </section>
  )
}
