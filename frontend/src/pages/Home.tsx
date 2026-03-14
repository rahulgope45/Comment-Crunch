import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import OurAim from '../components/OurAim'
import Whyus from '../components/Whyus'

function Home() {
  return (
    <div className='flex flex-col mt-30 items-center justify-center gap-40'>
      <HeroSection/>
      <Services/>
      <OurAim/>
      <Whyus/>
    </div>
  )
}

export default Home