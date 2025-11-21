"use client";

import { useState } from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import ContactAction from "./ContactAction";

// Thank You Modal Component
function ThankYouModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm mx-4">
            <div className="relative bg-[#111111] rounded-lg p-4 max-w-lg w-full text-center shadow-lg border-2">
                {/* Sample image from Pexels (commercial use) */}
                <Image width={440} height={160} src="/images/thankyou.jpg" alt="Thank you" className="w-full h-48 object-none rounded-t-lg mb-4" />
                <p className="text-white mb-6 font-medium">
                    <span className="text-reddish">Thank you for contacting us.</span> We truly appreciate your interest, and we will reach out to you soon.
                    We’d be honored to <span className="text-reddish">feature</span> your feedback in our testimonials and keep you in our <span className="text-reddish">hearts</span>.
                </p>
                <Link href={'/'} className="defaultTransitionCSS bg-reddish hover:bg-white text-white hover:text-black font-bold py-2 px-6 rounded uppercase">
                    Return Home
                </Link>
            </div>
        </div>
    );
}

export default function ContactMeDarkMerged() {
    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        companyName: "",
        email: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    // ✅ SECURITY FIX: Enhanced client-side validation
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
        return phoneRegex.test(phone);
    };

    // ✅ SECURITY FIX: Sanitize input to prevent XSS
    const sanitizeInput = (input: string): string => {
        return input.replace(/[<>]/g, '').trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // ✅ SECURITY FIX: Apply sanitization on input
        const sanitizedValue = sanitizeInput(value);

        setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    };

    // ✅ SECURITY FIX: Enhanced validation
    const validateForm = (): boolean => {
        if (!formData.fullName || formData.fullName.length < 2) {
            toast.error("Full name must be at least 2 characters");
            return false;
        }

        if (formData.fullName.length > 100) {
            toast.error("Full name is too long");
            return false;
        }

        if (!formData.contactNumber || !validatePhone(formData.contactNumber)) {
            toast.error("Please enter a valid contact number");
            return false;
        }

        if (!formData.email || !validateEmail(formData.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!formData.message || formData.message.length < 10) {
            toast.error("Message must be at least 10 characters");
            return false;
        }

        if (formData.message.length > 1000) {
            toast.error("Message is too long (max 1000 characters)");
            return false;
        }

        if (formData.companyName && formData.companyName.length > 100) {
            toast.error("Company name is too long");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ✅ SECURITY FIX: Enhanced validation before submission
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await ContactAction(formData);

            if (!result.status) {
                toast.error(result.error || "Error sending query. Please try again later.");
                return;
            }

            setFormData({
                fullName: "",
                contactNumber: "",
                companyName: "",
                email: "",
                message: ""
            });
            setShowThankYou(true);

        } catch (error) {
            toast.error("Error sending query. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative isolate bg-[#040406] text-[#F2F2F2] px-6 py-24 sm:py-32 lg:px-8">
            <Toaster position="top-right" />

            {/* Background gradient & clip-path with pointer-events-none */}
            <div aria-hidden="true" className="absolute inset-x-0 top-[-10rem] -z-10 overflow-hidden blur-3xl pointer-events-none sm:top-[-20rem]">
                <div
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-1/2 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-reddish to-[#111111] opacity-40 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>

            {/* Heading & Description */}
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                    Contact Me
                </h2>
                <p className="mt-2 text-lg/8 text-gray-400">
                    Let’s talk about your next project. Also, feel free to connect on social!
                </p>
            </div>

            {/* Social Icons Row */}
            <div className="mx-auto mt-6 flex max-w-md items-center justify-center space-x-4">
                <Link
                    href="https://twitter.com/Capta1nCodes"
                    className="defaultTransitionCSS p-3 rounded bg-[#111111] border border-gray-600 hover:text-reddish"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTwitter />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/priyalraj99"
                    className="defaultTransitionCSS p-3 rounded bg-[#111111] border border-gray-600 hover:text-reddish"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin />
                </Link>
                <Link
                    href="https://github.com/Capta1nCodes"
                    className="defaultTransitionCSS p-3 rounded bg-[#111111] border border-gray-600 hover:text-reddish"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub />
                </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* Full Name (Required) */}
                    <div>
                        <label htmlFor="full-name" className="block text-sm/6 font-semibold">
                            Full Name <span className="text-reddish">*</span>
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="full-name"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                value={formData.fullName}
                                onChange={handleChange}
                                maxLength={100}
                                required
                                className="block w-full rounded-md bg-[#111111] px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-reddish"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    {/* Contact Number (Required) */}
                    <div>
                        <label htmlFor="contact-number" className="block text-sm/6 font-semibold">
                            Contact Number <span className="text-reddish">*</span>
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="contact-number"
                                name="contactNumber"
                                type="tel"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                maxLength={20}
                                required
                                placeholder="+91 1234567890"
                                className="block w-full rounded-md bg-[#111111] px-3.5 py-2 text-base text-[#F2F2F2] placeholder:text-gray-500 outline outline-1 -outline-offset-1 outline-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-reddish"
                            />
                        </div>
                    </div>

                    {/* Company Name (Optional) */}
                    <div className="sm:col-span-2">
                        <label htmlFor="company-name" className="block text-sm/6 font-semibold">
                            Company Name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="company-name"
                                name="companyName"
                                type="text"
                                autoComplete="organization"
                                value={formData.companyName}
                                onChange={handleChange}
                                maxLength={100}
                                className="block w-full rounded-md bg-[#111111] px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-reddish"
                                placeholder="(Optional)"
                            />
                        </div>
                    </div>

                    {/* Email (Required) */}
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold">
                            Email <span className="text-reddish">*</span>
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                maxLength={100}
                                required
                                className="block w-full rounded-md bg-[#111111] px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-reddish"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    {/* Message (Required) */}
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold">
                            Message <span className="text-reddish">*</span>
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={1000}
                                required
                                className="block w-full rounded-md bg-[#111111] px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-reddish"
                                placeholder="Let me know what you're looking to build..."
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            {formData.message.length}/1000 characters
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="defaultTransitionCSS flex w-full items-center justify-center rounded-md bg-reddish px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Sending..." : "Submit"}
                    </button>
                </div>
            </form>

            {showThankYou && (<ThankYouModal />)}
        </div>
    );
}