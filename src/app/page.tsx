import AboutMe from "@/layouts/AboutMeLayout/AboutMe";
import FooterLayout from "@/layouts/FooterLayout/FooterLayout";
import GetInTouch from "@/layouts/GetInTouch/GetInTouch";
import IntroSection from "@/layouts/IntroSectionLayout/IntroSection";
import MyProjects from "@/layouts/MyProjectsLayout/MyProjects";
import NavBar from "@/layouts/NavBarLayout/NavBar";
import SkillsSection from "@/layouts/SkillsSectionLayout/SkillsSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <IntroSection />
      <AboutMe />
      <SkillsSection />
      <MyProjects />
      <GetInTouch />
      <FooterLayout />
    </>
  )
}
