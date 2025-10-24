'use server'

import { headers } from 'next/headers';

/**
 * ✅ SECURITY FIX: Improved IP fetching with validation
 * 
 * Note: X-Forwarded-For can still be spoofed, but this implementation:
 * 1. Validates IP format
 * 2. Takes the first IP (most likely the real client IP)
 * 3. Provides better fallback handling
 * 
 * For production environments behind proxies/load balancers:
 * - Configure your proxy to set X-Forwarded-For correctly
 * - Validate IPs against known proxy IP ranges
 * - Consider using Cloudflare-Connecting-IP or similar trusted headers
 */

// Validate IPv4 format
function isValidIPv4(ip: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) return false;

    const parts = ip.split('.');
    return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
    });
}

// Validate IPv6 format (basic validation)
function isValidIPv6(ip: string): boolean {
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv6Regex.test(ip);
}

function isValidIP(ip: string): boolean {
    return isValidIPv4(ip) || isValidIPv6(ip);
}

export async function FetchUserIP(): Promise<string> {
    const FALLBACK_IP_ADDRESS = '0.0.0.0';

    try {
        // Try X-Forwarded-For first (standard proxy header)
        const forwardedFor = headers().get('x-forwarded-for');

        if (forwardedFor) {
            // Get the first IP in the chain (client IP)
            const ips = forwardedFor.split(',').map(ip => ip.trim());

            for (const ip of ips) {
                if (isValidIP(ip)) {
                    return ip;
                }
            }
        }

        // Try X-Real-IP (alternative proxy header)
        const realIp = headers().get('x-real-ip');
        if (realIp && isValidIP(realIp)) {
            return realIp;
        }

        // Try Cloudflare header if behind Cloudflare
        const cfConnectingIp = headers().get('cf-connecting-ip');
        if (cfConnectingIp && isValidIP(cfConnectingIp)) {
            return cfConnectingIp;
        }

        // Try other common headers
        const remoteAddr = headers().get('remote-addr');
        if (remoteAddr && isValidIP(remoteAddr)) {
            return remoteAddr;
        }

    } catch (error) {
        console.error('Error fetching IP address');
    }

    return FALLBACK_IP_ADDRESS;
}