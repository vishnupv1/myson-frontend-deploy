export const VideoSection = () => (
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 h-96">
                    <video
                        className="rounded-xl shadow-lg w-full h-full object-cover"
                        controls
                        autoPlay
                        muted
                        loop
                    >
                        <source src="/intro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="w-full md:w-1/2 h-96 p-8 rounded-xl flex flex-col justify-start">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience Excellence in Action</h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        Watch our premium kitchen appliances in action and see why professional chefs and home cooks choose our world-renowned brands. From precision cooking to powerful performance, every piece of equipment is designed to deliver exceptional results.
                    </p>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
                        Call to Action
                    </button>
                </div>
            </div>
        </div>
    </section>
); 