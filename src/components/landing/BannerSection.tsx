export const BannerSection = () => (
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Our Premium Range</h2>
                <p className="text-lg text-gray-600">Discover world-class commercial kitchen equipments trusted by professionals.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <div className="relative w-full aspect-[2/1]">
                        <img
                            src="/hoshizaki.banner.jpeg"
                            alt="Banner 1"
                            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="relative w-full aspect-[2/1]">
                        <img
                            src="/merrychef.banner.png"
                            alt="Banner 2"
                            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
); 