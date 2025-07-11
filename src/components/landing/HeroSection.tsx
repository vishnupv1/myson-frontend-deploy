import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Professional <span className="text-red-600 block">Kitchen Solutions</span> for Every Need
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                        Discover premium kitchen appliances from world-renowned brands. From commercial kitchens to home cooking, we have everything you need.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                            Explore Products
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                            <Play className="w-5 h-5" />
                            Watch Video
                        </button>
                    </div>
                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Free Shipping
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            24/7 Support
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Warranty Included
                        </div>
                    </div>
                </div>
                {/* Visual */}
                <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero1/300/200" alt="Premium Coffee Maker" />
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero2/300/200" alt="Smart Refrigerator" />
                        </div>
                        <div className="space-y-4 pt-8">
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero3/300/200" alt="Commercial Dishwasher" />
                            <img className="rounded-2xl shadow-lg w-full h-32 object-cover" src="https://picsum.photos/seed/hero4/300/200" alt="Professional Oven" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
); 