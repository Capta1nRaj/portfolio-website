'use client';

import React, { useEffect, useState, useRef } from 'react';
import Headings from '@/components/Headings';

const stats = [
    { id: 1, name: 'Years Experience', value: 3, suffix: '+' },
    // reduced to a more conservative, realistic number
    { id: 2, name: 'Projects Delivered', value: 12, suffix: '+' },
    { id: 3, name: 'Clients Served', value: 8, suffix: '+' },
    { id: 4, name: 'Countries Served', value: 3, suffix: '+' },
];

const useScrollTrigger = () => {
    const [isVisible, setIsVisible] = useState(false);
    // use a span ref so it can be attached to the counter span without TS errors
    const ref = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const node = ref.current;
        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        };
    }, []);

    return { ref, isVisible };
};

const Counter = ({ value, duration = 2000 }: { value: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const { ref, isVisible } = useScrollTrigger();

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * value));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, value, duration]);

    return <span ref={ref}>{count}</span>;
};

export default function StatsSection() {
    return (
        <section className="bg-lightblack text-white sm:py-20 py-10 overflow-hidden relative">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
                <Headings title="Built. Delivered. Proven." subHeading="Key metrics that show what I ship for clients." />

                <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="relative flex flex-col items-center justify-center p-8 bg-[#151515] border border-reddish rounded-2xl overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <dt className="order-last mt-2 text-sm font-medium text-white uppercase tracking-wide">{stat.name}</dt>
                                <dd className="relative text-6xl sm:text-7xl font-extrabold tracking-tight text-reddish leading-none">
                                    <Counter value={stat.value} />
                                    {stat.suffix}
                                </dd>
                            </div>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
