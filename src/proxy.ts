import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export function proxy(request: NextRequest) {
    const response = NextResponse.next();

    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        '0.0.0.0';

    const path = request.nextUrl.pathname;

    if (!checkRateLimit(ip, path)) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '3600',
            }
        });
    }

    response.headers.set('X-Request-ID', crypto.randomUUID());
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()');

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};
