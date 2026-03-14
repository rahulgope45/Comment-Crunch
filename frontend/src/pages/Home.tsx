
import { NavLink } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import OurAim from '../components/OurAim'

function Home() {
  return (
    <div className='flex flex-col mt-30 items-center justify-center gap-40'>
      <HeroSection/>
      <Services/>
      <OurAim/>
    </div>
  )
}

export default Home