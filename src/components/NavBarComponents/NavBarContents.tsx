import Link from "next/link";
import AboutMeIcon from '../../images/NavBarIcons/AboutMeIcon'
import SkillsIcon from '../../images/NavBarIcons/SkillsIcon'
import ProjectsIcon from '../../images/NavBarIcons/ProjectsIcon'
import ContactIcon from '../../images/NavBarIcons/ContactIcon'

const navBarRightSideCSS = `flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-0 uppercase font-medium transition-all duration-500 ease-in-out hover:text-reddish`

export default function NavBarContents() {
    return (
        <>
            <Link href="#about-me">
                <div className={`${navBarRightSideCSS}`}> <AboutMeIcon /> about </div>
            </Link>

            <Link href="#skills">
                <div className={`${navBarRightSideCSS}`}> <SkillsIcon /> skills </div>
            </Link>

            <Link href="#projects">
                <div className={`${navBarRightSideCSS}`}>  <ProjectsIcon /> projects </div>
            </Link>

            <Link href="#contact">
                <div className={`${navBarRightSideCSS}`}> <ContactIcon /> contact </div>
            </Link>
        </>
    );
}