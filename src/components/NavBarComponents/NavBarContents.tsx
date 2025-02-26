import Link from "next/link";

const navBarRightSideCSS = `flex md:flex-row flex-col items-center cursor-pointer md:gap-2 gap-0 uppercase font-medium transition-all duration-500 ease-in-out hover:text-reddish`

export default function NavBarContents() {
    return (
        <>
            <Link href="/blog">
                <div className={`${navBarRightSideCSS}`}> blog </div>
            </Link>

            <Link href="/contact">
                <div className={`${navBarRightSideCSS}`}> contact </div>
            </Link>
        </>
    );
}