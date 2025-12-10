import React from 'react';
import Headings from '@/components/Headings';

const stats = [
    { id: 1, name: 'Years Experience', value: 3, suffix: '+' },
    { id: 2, name: 'Projects Delivered', value: 12, suffix: '+' },
    { id: 3, name: 'Clients Served', value: 8, suffix: '+' },
    { id: 4, name: 'Countries Served', value: 3, suffix: '+' },
];

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
                                    {stat.value}{stat.suffix}
                                </dd>
                            </div>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
