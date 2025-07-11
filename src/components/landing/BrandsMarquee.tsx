export const BrandsMarquee = () => (
    <section className="py-8 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 overflow-x-auto whitespace-nowrap">
                {[1,2,3,4,5,6,7,8].map(i => (
                    <img
                        key={i}
                        src={`https://picsum.photos/seed/brand${i}/120/40`}
                        alt={`Brand ${i}`}
                        className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition"
                    />
                ))}
            </div>
        </div>
    </section>
); 