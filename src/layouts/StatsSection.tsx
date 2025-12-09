import React from 'react';
import Headings from '@/components/Headings';

const stats = [
    { id: 1, name: 'Years Experience', value: '3+' },
    { id: 2, name: 'Projects Completed', value: '10+' },
    { id: 3, name: 'Happy Clients', value: '5+' },
];

export default function StatsSection() {
    return (
        <section className="bg-lightblack text-white py-20 overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
                <Headings title="Built. Delivered. Proven." subHeading="Key metrics that show what I ship for clients." />

                <dl className="mt-12 grid grid-cols-1 gap-10 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col bg-[#151515] border-2 border-white p-8 shadow-sm rounded-2xl">
                            <dd className="order-first text-5xl font-semibold tracking-tight text-reddish">{stat.value}</dd>
                            <dt className="mt-3 text-base font-semibold">{stat.name}</dt>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
