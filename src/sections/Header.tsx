import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  const menuItems = [
    { label: 'О курсе', id: 'about' },
    { label: 'Симптомы', id: 'symptoms' },
    { label: 'Как это работает', id: 'how-it-works' },
    { label: 'Специалисты', id: 'specialists' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          menuOpen ? 'opacity-0 pointer-events-none' : ''
        } ${scrolled ? 'bg-mint/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}
      >
        <div className="max-w-[430px] mx-auto flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <img src="/images/Logo.png" alt="ВЫДОХ" className="w-8 h-auto" />
            <span className="font-guardian text-xl text-dark tracking-wide">ВЫДОХ</span>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center text-dark"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Overlay background when menu is open */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Half-screen menu overlay from bottom */}
      {menuOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col animate-slide-up max-h-[50vh]">
          {/* Top bar with close button */}
          <div className="bg-cream px-5 pt-4 pb-4 border-t border-b border-stone/10">
            <div className="max-w-[430px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/images/Logo.png" alt="ВЫДОХ" className="w-8 h-auto" />
                <span className="font-guardian text-xl text-dark tracking-wide">ВЫДОХ</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-dark"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Menu items - scrollable if needed */}
          <div className="flex-1 bg-cream px-5 pt-6 pb-6 overflow-y-auto">
            <div className="max-w-[430px] mx-auto flex flex-col gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left font-guardian text-[24px] text-dark hover:text-teal transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom brown panel with rounded top */}
          <div className="bg-brown relative flex-shrink-0">
            {/* Rounded top arc */}
            <div 
              className="absolute -top-8 left-0 right-0 h-8 bg-brown"
              style={{
                borderTopLeftRadius: '50% 100%',
                borderTopRightRadius: '50% 100%',
              }}
            />
            
            <div className="relative max-w-[430px] mx-auto px-5 pt-6 pb-6 flex flex-col items-center gap-4">
              {/* CTA Button */}
              <button 
                onClick={() => scrollTo('about')}
                className="w-full max-w-[320px] bg-cream text-dark font-guardian text-lg py-3.5 rounded-card hover:bg-white transition-colors duration-300"
              >
                Посадить первый цветок
              </button>

              {/* Phone */}
              <a 
                href="tel:89913347070" 
                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-guardian text-base">8 (991) 334 70-70</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
