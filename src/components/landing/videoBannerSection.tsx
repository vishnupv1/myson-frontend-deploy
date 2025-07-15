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
                        <source src="/tutorial.webm" type="video/webm" />
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
                        <svg className="align-middle inline-block w-6 h-auto fill-white " role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        <span className="text-base font-medium">Enquire on Whatsapp</span>
                    </a>
                </div>
            </div>
        </div>
    </section>
);
