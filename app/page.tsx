import Image from 'next/image'
import NavBar from '../src/layouts/NavBarLayout/NavBar'
import IntroSection from '../src/layouts/IntroSectionLayout/IntroSection'
import SkillsSection from '../src/layouts/SkillsSectionLayout/SkillsSection'
import AboutMeIcon from '../src/layouts/AboutMeLayout/AboutMe'
import MyProjects from '../src/layouts/MyProjectsLayout/MyProjects'

export default function Home() {
  return (
    <>
      <NavBar />
      <IntroSection />
      <AboutMeIcon />
      <SkillsSection />
      <MyProjects />
    </>
  )
}
