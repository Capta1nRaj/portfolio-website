import ContactUsLayout from "@/layouts/ContactUsLayout";
import FooterLayout from "@/layouts/FooterLayout";
import IntroSection from "@/layouts/IntroSection";
import MyProjects from "@/layouts/MyProjects";
import NavBar from "@/layouts/NavBar";
import SkillsSection from "@/layouts/SkillsSection";
import TestimonialSection from "@/layouts/TestimonialsLayout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <IntroSection />
      <TestimonialSection />
      <SkillsSection />
      <MyProjects />
      <ContactUsLayout />
      <FooterLayout />
    </>
  )
}
