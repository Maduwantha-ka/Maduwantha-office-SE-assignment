import Hero       from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Services   from '../components/Services'
import Booking    from '../components/Booking'
import Gallery    from '../components/Gallery'
import Reviews    from '../components/Reviews'
import About      from '../components/About'

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Services />
      <Booking />
      <Gallery />
      <Reviews />
      <About />
    </main>
  )
}
