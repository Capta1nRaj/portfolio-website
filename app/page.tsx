import Image from 'next/image'
import NavBar from '../src/layouts/NavBarLayout/NavBar'
import IntroSection from '..//src/layouts/IntroSectionLayout/IntroSection'

export default function Home() {
  return (
    <>
      <NavBar />
      <div className='md:mt-[-51px] mt-[-67px]'>
        <IntroSection />
      </div>
    </>
  )
}
