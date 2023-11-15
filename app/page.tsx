import Image from 'next/image'
import NavBar from '../src/layouts/NavBarLayout/NavBar'
import IntroSection from '../src/layouts/IntroSectionLayout/IntroSection'
import SkillsSection from '../src/layouts/SkillsSectionLayout/SkillsSection'
import AboutMe from '../src/layouts/AboutMeLayout/AboutMe'
import MyProjects from '../src/layouts/MyProjectsLayout/MyProjects'
import GetInTouch from '../src/layouts/GetInTouch/GetInTouch'
import Footer from '../src/layouts/FooterLayout/FooterLayout'

export default function Home() {
  return (
    <>
      <NavBar />
      <IntroSection />
      <AboutMe />
      <SkillsSection />
      <MyProjects />
      <GetInTouch />
      <Footer />
    </>
  )
}
