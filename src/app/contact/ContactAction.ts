'use server'

import ContactModel from "@/models/ContactModel";
import { FetchUserIP } from "@/utils/FetchUserIP";
import { connect2MongoDB } from "connect2mongodb";
import axios from 'axios';

// ✅ SECURITY FIX: Define strict type for contact form data
interface ContactFormData {
    fullName: string;
    contactNumber: string;
    companyName?: string;
    email: string;
    message: string;
}

// ✅ SECURITY FIX: Input validation and sanitization
function validateAndSanitizeInput(formData: any): ContactFormData | { error: string } {
    // Sanitize function to remove potentially harmful characters
    const sanitize = (input: string): string => {
        if (typeof input !== 'string') return '';
        return input
            .trim()
            .replace(/[<>]/g, '') // Remove < and > to prevent XSS
            .slice(0, 1000); // Limit length
    };

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate phone number (basic validation, adjust based on requirements)
    const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;

    // Extract and validate fields
    const fullName = sanitize(formData.fullName || '');
    const contactNumber = sanitize(formData.contactNumber || '');
    const companyName = sanitize(formData.companyName || '');
    const email = sanitize(formData.email || '');
    const message = sanitize(formData.message || '');

    // Validation checks
    if (!fullName || fullName.length < 2 || fullName.length > 100) {
        return { error: 'Full name must be between 2 and 100 characters' };
    }

    if (!contactNumber || !phoneRegex.test(contactNumber)) {
        return { error: 'Invalid contact number format' };
    }

    if (!email || !emailRegex.test(email)) {
        return { error: 'Invalid email format' };
    }

    if (!message || message.length < 10 || message.length > 1000) {
        return { error: 'Message must be between 10 and 1000 characters' };
    }

    if (companyName && companyName.length > 100) {
        return { error: 'Company name too long' };
    }

    return {
        fullName,
        contactNumber,
        companyName: companyName || undefined,
        email,
        message
    };
}

// ✅ SECURITY FIX: Rate limiting helper (simple in-memory implementation)
// For production, use Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = 5; // 5 submissions
    const windowMs = 60 * 60 * 1000; // per hour

    const userLimit = rateLimitMap.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (userLimit.count >= limit) {
        return false;
    }

    userLimit.count++;
    return true;
}

export default async function ContactAction(formData: any) {
    try {
        // ✅ SECURITY FIX: Get user IP for rate limiting
        const userIP = await FetchUserIP();

        // ✅ SECURITY FIX: Check rate limit
        if (!checkRateLimit(userIP)) {
            return {
                status: false,
                error: 'Too many requests. Please try again later.'
            };
        }

        // ✅ SECURITY FIX: Validate and sanitize input
        const validatedData = validateAndSanitizeInput(formData);

        if ('error' in validatedData) {
            return { status: false, error: validatedData.error };
        }

        await connect2MongoDB();

        // ✅ SECURITY FIX: Use HTTPS instead of HTTP
        let locationData = {
            country: "",
            regionName: "",
            city: "",
            zip: "",
            timezone: ""
        };

        try {
            // Only fetch location if we have a valid IP (not fallback)
            if (userIP && userIP !== '0.0.0.0') {
                // ✅ SECURITY FIX: Changed to HTTPS
                const ipData = await axios.get(
                    `https://ipapi.co/${userIP}/json/`,
                    { timeout: 5000 } // Add timeout to prevent hanging
                );

                if (ipData.data) {
                    locationData = {
                        country: ipData.data.country_name || "",
                        regionName: ipData.data.region || "",
                        city: ipData.data.city || "",
                        zip: ipData.data.postal || "",
                        timezone: ipData.data.timezone || ""
                    };
                }
            }
        } catch (locationError) {
            // Log error but don't fail the entire operation
            console.error('Failed to fetch location data');
            // Continue with empty location data
        }

        const dataToSave = {
            ...validatedData,
            ...locationData
        };

        await new ContactModel(dataToSave).save();

        return { status: true };

    } catch (error) {
        // ✅ SECURITY FIX: Don't expose internal error details to client
        console.error('Contact form submission error');
        return {
            status: false,
            error: 'An error occurred. Please try again later.'
        };
    }
}