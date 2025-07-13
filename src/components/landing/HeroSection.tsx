import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router';

export const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden min-h-screen">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover hero-fade-rtl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ minHeight: '100vh' }}
                >
                    <source src="/hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Professional <span className="text-red-400 block">Kitchen Solutions</span> for Every Need
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
                            Discover premium kitchen appliances from world-renowned brands. From commercial kitchens to home cooking, we have everything you need.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                onClick={() => navigate("/products")}
                            >
                                Explore Products
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <a href="https://youtu.be/16e4w9p-lE0?si=rU7uwW7jt2wid_jW" target="_blank" rel="noopener noreferrer">
                                <button className="border-2 border-white text-white hover:border-red-400 hover:text-red-400 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                                    <Play className="w-5 h-5" />
                                    Watch Video
                                </button>
                            </a>
                        </div>
                        {/* Trust Indicators */}
                        <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Free Shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                24/7 Support
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Warranty Included
                            </div>
                        </div>
                    </div>
                    {/* Visual */}
                    <div className="relative">
                        {/* <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero1/300/200" alt="Premium Coffee Maker" />
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero2/300/200" alt="Smart Refrigerator" />
                        </div>
                        <div className="space-y-4 pt-8">
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero3/300/200" alt="Commercial Dishwasher" />
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero4/300/200" alt="Professional Oven" />
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

