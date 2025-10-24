import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * ✅ SECURITY: Middleware for additional security checks and rate limiting
 * 
 * This middleware adds an extra layer of security by:
 * 1. Adding security headers
 * 2. Implementing basic rate limiting
 * 3. Blocking suspicious requests
 */

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every 10 minutes
setInterval(() => {
    const now = Date.now();
    const keysToDelete: string[] = [];

    rateLimitMap.forEach((value, key) => {
        if (now > value.resetTime) {
            keysToDelete.push(key);
        }
    });

    keysToDelete.forEach(key => {
        rateLimitMap.delete(key);
    });
}, 10 * 60 * 1000);

function checkRateLimit(ip: string, path: string): boolean {
    const key = `${ip}:${path}`;
    const now = Date.now();

    // Different limits for different paths
    const limits: Record<string, { requests: number; windowMs: number }> = {
        '/contact': { requests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
        '/api': { requests: 100, windowMs: 60 * 1000 }, // 100 per minute
        default: { requests: 200, windowMs: 60 * 1000 }, // 200 per minute
    };

    const matchedPath = Object.keys(limits).find(p => path.startsWith(p)) || 'default';
    const { requests: maxRequests, windowMs } = limits[matchedPath];

    const userLimit = rateLimitMap.get(key);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (userLimit.count >= maxRequests) {
        return false;
    }

    userLimit.count++;
    return true;
}

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get client IP
    const ip = request.ip ||
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        '0.0.0.0';

    const path = request.nextUrl.pathname;

    // Rate limiting check
    if (!checkRateLimit(ip, path)) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '3600', // 1 hour
            }
        });
    }

    // Add security headers (additional to next.config.mjs)
    response.headers.set('X-Request-ID', crypto.randomUUID());

    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');

    // Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Enable XSS filtering
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Additional security headers
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');

    // Enhanced Permissions Policy
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()');

    return response;
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};

