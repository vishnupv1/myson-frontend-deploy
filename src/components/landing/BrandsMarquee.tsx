import React from "react";

const brands = [
    "https://picsum.photos/seed/brand1/120/40",
    "https://picsum.photos/seed/brand2/120/40",
    "https://picsum.photos/seed/brand3/120/40",
    "https://picsum.photos/seed/brand4/120/40",
    "https://picsum.photos/seed/brand5/120/40",
    "https://picsum.photos/seed/brand6/120/40",
    "https://picsum.photos/seed/brand7/120/40",
    "https://picsum.photos/seed/brand8/120/40"
];

export const BrandsMarquee = () => (
    <section className="py-8 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="relative w-full">
                <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
                    {[...brands, ...brands].map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Brand ${i % brands.length + 1}`}
                            className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition inline-block"
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
); 