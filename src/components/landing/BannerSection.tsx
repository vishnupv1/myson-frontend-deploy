export const BannerSection = () => (
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
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
    </section>
); 