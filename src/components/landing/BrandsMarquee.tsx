const brands = [
    "https://picsum.photos/seed/brand1/300/300",
    "https://picsum.photos/seed/brand2/300/300",
    "https://picsum.photos/seed/brand3/300/300",
    "https://picsum.photos/seed/brand4/300/300",
    "https://picsum.photos/seed/brand5/300/300",
    "https://picsum.photos/seed/brand6/300/300",
    "https://picsum.photos/seed/brand7/300/300",
    "https://picsum.photos/seed/brand8/300/300",
    "https://picsum.photos/seed/brand9/300/300",
    "https://picsum.photos/seed/brand10/300/300",
    "https://picsum.photos/seed/brand11/300/300",
    "https://picsum.photos/seed/brand12/300/300",
    "https://picsum.photos/seed/brand13/300/300",
    "https://picsum.photos/seed/brand14/300/300",
    "https://picsum.photos/seed/brand15/300/300",
    "https://picsum.photos/seed/brand16/300/300"
];

export const BrandsMarquee = () => (
    <section className="py-8 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop from Top Brands</h2>
            <div className="relative w-full mask-fade-x">
                <div className="flex items-center gap-8 w-max animate-marquee whitespace-nowrap">
                    {[...brands, ...brands].map((src, i) => (
                        <div
                            key={i}
                            className="max-w-40 aspect-square flex items-center justify-center bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <img
                                src={src}
                                alt={`Brand ${i % brands.length + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
); 