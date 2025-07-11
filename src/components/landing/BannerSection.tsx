export const BannerSection = () => (
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Special Offers & Promotions</h2>
                <p className="text-lg text-gray-600">Check out our latest deals and exclusive product launches!</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src="https://picsum.photos/seed/200/600/300"
                    alt="Banner 1"
                    className="rounded-xl shadow-lg w-full md:w-1/2 object-cover"
                />
                <img
                    src="https://picsum.photos/seed/201/600/300"
                    alt="Banner 2"
                    className="rounded-xl shadow-lg w-full md:w-1/2 object-cover"
                />
            </div>
        </div>
    </section>
); 