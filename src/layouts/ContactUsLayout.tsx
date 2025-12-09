import Link from "next/link";
import React from "react";

export default function ContactUsLayout() {
    return (
        <div className="bg-gradient-to-br from-reddish to-[#2E2E2E] sm:py-20 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                <div className="lg:col-span-7">
                    <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Let{`'`}s Bring Your Project to Life.
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-[36rem]">
                        I{`'`}m a dedicated freelancer ready to collaborate with you. Together, we can turn your ideas into reality and elevate your business to new heights.
                    </p>
                </div>
                <div className="lg:col-span-5 flex items-center justify-end">
                    <Link
                        href="/contact"
                        className="rounded-md border-2 border-reddish hover:border-black bg-black px-6 py-3 text-lg font-semibold text-reddish shadow-lg defaultTransitionCSS hover:bg-reddish hover:text-white hover:shadow-2xl"
                    >
                        Get In Touch
                    </Link>
                </div>
            </div>
        </div>
    );
}
