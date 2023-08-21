import Link from "next/link";
import AboutMeIcon from '../../../src/images/NavBarIcons/AboutMeIcon'
import SkillsIcon from '../../../src/images/NavBarIcons/SkillsIcon'
import ProjectsIcon from '../../../src/images/NavBarIcons/ProjectsIcon'
import ContactIcon from '../../../src/images/NavBarIcons/ContactIcon'

const navBarRightSideCSS = `flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-0 uppercase font-bold`

export default function NavBarContents() {
    return (
        <>
            <Link href="#about">
                <div className={`${navBarRightSideCSS}`}> <AboutMeIcon /> about </div>
            </Link>

            <Link href="#skills">
                <div className={`${navBarRightSideCSS}`}> <SkillsIcon /> skills </div>
            </Link>

            <Link href="#projects">
                <div className={`${navBarRightSideCSS}`}>  <ProjectsIcon /> projects </div>
            </Link>

            <Link href="#contact-us">
                <div className={`${navBarRightSideCSS}`}> <ContactIcon /> contact </div>
            </Link>
        </>
    );
}