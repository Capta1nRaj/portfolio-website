import Image from 'next/image'
import NavBar from '../src/layouts/NavBarLayout/NavBar'
import IntroSection from '../src/layouts/IntroSectionLayout/IntroSection'
import SkillsSection from '../src/layouts/SkillsSectionLayout/SkillsSection'

export default function Home() {
  return (
    <>
      <NavBar />
      <div className='lg:mt-[-51px] mt-[-67px]'>
        <IntroSection />
        <SkillsSection />
      </div>
    </>
  )
}
