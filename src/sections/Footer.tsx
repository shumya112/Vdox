import { Leaf } from 'lucide-react'

const navLinks = [
  { label: 'О курсе', id: 'about' },
  { label: 'Симптомы', id: 'symptoms' },
  { label: 'Как это работает', id: 'how-it-works' },
  { label: 'Специалисты', id: 'specialists' },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full bg-dark overflow-hidden">
      {/* Main footer content */}
      <div className="max-w-[430px] mx-auto px-5 pt-10 pb-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Leaf className="w-5 h-5 text-sage" />
          <span className="font-guardian text-2xl text-white tracking-wide">ВЫДОХ</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-guardian text-sm text-white/70 hover:text-sage transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Flowers banner */}
      <div className="w-full">
        <img
          src="/images/footer_flowers.png"
          alt="Цветы"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </footer>
  )
}
