import AboutMe from "@/layouts/AboutMeLayout/AboutMe";
import FooterLayout from "@/layouts/FooterLayout/FooterLayout";
import GetInTouch from "@/layouts/GetInTouch/GetInTouch";
import IntroSection from "@/layouts/IntroSectionLayout/IntroSection";
import MyProjects from "@/layouts/MyProjectsLayout/MyProjects";
import NavBar from "@/layouts/NavBarLayout/NavBar";
import SkillsSection from "@/layouts/SkillsSectionLayout/SkillsSection";
import { redirect } from "next/navigation";

export default function Home() {

  if (process.env.NEXT_DEVELOPMENT_MODE === "true") { redirect("/portfolio"); }

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
