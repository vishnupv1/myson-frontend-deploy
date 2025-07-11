const brands = [
    { name: 'Bosch', seed: 'bosch' },
    { name: 'Whirlpool', seed: 'whirlpool' },
    { name: 'LG', seed: 'lg' },
    { name: 'Samsung', seed: 'samsung' },
    { name: 'Siemens', seed: 'siemens' },
    { name: 'Hoshizaki', seed: 'hoshizaki' },
    { name: 'Merrychef', seed: 'merrychef' },
    { name: 'Classeq', seed: 'classeq' },
    { name: 'Dihr', seed: 'dihr' },
    { name: 'KitchenAid', seed: 'kitchenaid' },
    { name: 'AEG', seed: 'aeg' },
    { name: 'Panasonic', seed: 'panasonic' },
    { name: 'Frigidaire', seed: 'frigidaire' },
    { name: 'GE', seed: 'ge' },
];

export const BrandsSlider = () => {
    const items = [...brands, ...brands];

    return (
        <section className="my-12 overflow-hidden" id="brands">
            <h3 className="text-center mb-8 text-3xl font-extrabold text-gray-800 underline underline-offset-4">Shop from Top brands</h3>
            <div className="flex whitespace-nowrap animate-marquee gap-4">
                {items.map(({ name, seed }, idx) => (
                    <div key={idx} className="inline-block flex-shrink-0 rounded-2xl overflow-clip">
                        <img
                            src={`https://picsum.photos/seed/${seed}/200/200`}
                            alt={name}
                            className="h-[200px] object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
