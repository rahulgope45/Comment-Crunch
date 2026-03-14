import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import OurAim from '../components/OurAim'
import Whyus from '../components/Whyus'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='flex flex-col mt-30 items-center justify-center gap-40 '>
      <HeroSection/>
      <Services/>
      <OurAim/>
      <Whyus/>
      <Footer/>
    </div>
  )
}

export default Home