import { LucidePhone } from "lucide-react";

export const VideoSection = () => (
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 aspect-video md:h-96">
                    <video
                        className="rounded-xl shadow-lg w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/intro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="w-full md:w-1/2 p-4 md:p-8 rounded-xl flex flex-col justify-start">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                        Powering Professional Kitchens
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                        Discover the tools behind every successful kitchen — built for performance, precision, and durability. Our appliances are trusted by chefs, hotels, and food entrepreneurs across Kerala. Reach out to know more about us.</p>
                    <a
                        href="https://wa.me/919447458735"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg shadow hover:shadow-lg transition-all"
                    >
                        <LucidePhone/>
                        <span className="text-base font-medium">Enquire on Whatsapp</span>
                    </a>
                </div>
            </div>
        </div>
    </section>
);
