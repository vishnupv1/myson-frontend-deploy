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
                            src="https://usa.cateringinsight.com/2019/03/hoshizaki.jpg"
                            alt="Banner 1"
                            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="relative w-full aspect-[2/1]">
                        <img
                            src="https://scontent.fcok14-1.fna.fbcdn.net/v/t39.30808-6/454376404_1089609396019889_978435876683511908_n.png?stp=dst-png_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=JySbCaQ5aHAQ7kNvwHB4W9H&_nc_oc=AdkNqUFwepIg0AlMlFDit9q4pF5xAreMMshHlobh4ipg_lQFdGuNdrNtzjjbUWrxXhU&_nc_zt=23&_nc_ht=scontent.fcok14-1.fna&_nc_gid=CDt7dMqjDuTtqYJcLUsh9g&oh=00_AfR7lJtNq3B2wWAGcSJ2ulSl609eWXH6oP87mNA-eKlHEg&oe=687AAB04"
                            alt="Banner 2"
                            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
); 