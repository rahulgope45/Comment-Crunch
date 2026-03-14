
import { NavLink } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'

function Home() {
  return (
    <div className='flex flex-col mt-30 items-center justify-center gap-40'>
      <HeroSection/>
      <Services/>
    </div>
  )
}

export default Home