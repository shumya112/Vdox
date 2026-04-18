import Header from '../sections/Header'
import Hero from '../sections/Hero'
import YouRecognize from '../sections/YouRecognize'
import HowItWorks from '../sections/HowItWorks'
import Symptoms from '../sections/Symptoms'
import YouWillChange from '../sections/YouWillChange'
import Specialists from '../sections/Specialists'
import FooterCTA from '../sections/FooterCTA'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-cream flex justify-center">
      {/* Mobile container */}
      <div className="w-full max-w-[430px] relative">
        <Header />
        <main>
          <Hero />
          <YouRecognize />
          <HowItWorks />
          <Symptoms />
          <YouWillChange />
          <Specialists />
          <FooterCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
