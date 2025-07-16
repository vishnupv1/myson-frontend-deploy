const brands = [
    'https://vtlogo.com/wp-content/uploads/2021/01/astoria-vector-logo-small.png',
    'https://getlogo.net/wp-content/uploads/2021/08/hamilton-beach-logo-vector.png',
    'https://mfk.co.id/wp-content/uploads/2020/12/winterhalter-logo.png',
    'https://www.pi-india.com/uploaded_files/d679bfae31954b.jpg',
    'https://www.rahatindivanam.com/wp-content/uploads/2022/06/Western-Ref..png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzF5JruCxKftxjAgWMkHpjCqtm80UgfFdy1PXbvS0DGQQEu4_sDlCwfCKX96QbjajkPW4&usqp=CAU',
    'https://info.welbilt.com/hs-fs/hubfs/RGB_CRE_Grey-1.png?width=257&height=77&name=RGB_CRE_Grey-1.png',
    'https://www.convotherm.com/images/shared/logos/Convotherm_Color.svg',
    'https://www.lincolnfp.com/images/shared/logos/Lincoln_Black.svg',
    'data:image/png;base64,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',
];

export const BrandsMarquee = () => (
    <section className="py-8" id="brands">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop from Top Brands</h2>
            <div className="relative w-full mask-fade-x">
                <div className="flex items-center gap-8 w-max animate-marquee whitespace-nowrap">
                    {[...brands, ...brands].map((src, i) => (
                        <div
                            key={i}
                            className="max-w-24 md:max-w-40 aspect-square flex items-center justify-center overflow-hidden"
                        >
                            <img
                                src={src}
                                alt={`Brand ${i % brands.length + 1}`}
                                className="w-full h-full object-contain mix-blend-darken"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
); 