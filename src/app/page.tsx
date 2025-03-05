import ContactUsLayout from "@/layouts/ContactUsLayout";
import FooterLayout from "@/layouts/FooterLayout";
import IntroSection from "@/layouts/IntroSection";
import MyProjects from "@/layouts/MyProjects";
import NavBar from "@/layouts/NavBar";
import SkillsSection from "@/layouts/SkillsSection";
import TestimonialsLayout from "@/layouts/TestimonialsLayout";

export default function Home() {
  return (
    <>
      <NavBar />
      <IntroSection />
      <TestimonialsLayout slice={3} />
      <SkillsSection />
      <MyProjects />
      <ContactUsLayout />
      <FooterLayout />
    </>
  )
}
