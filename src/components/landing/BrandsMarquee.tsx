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
    'https://www.merrychef.com/images/shared/logos/Merrychef_PMS186C.svg',
];

export const BrandsMarquee = () => (
    <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop from Top Brands</h2>
            <div className="relative w-full mask-fade-x">
                <div className="flex items-center gap-8 w-max animate-marquee whitespace-nowrap">
                    {[...brands, ...brands].map((src, i) => (
                        <div
                            key={i}
                            className="max-w-40 aspect-square flex items-center justify-center overflow-hidden"
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