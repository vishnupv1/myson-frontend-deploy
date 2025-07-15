import { HeroSection } from "../components/landing/HeroSection";
import { CategoriesSection } from "../components/landing/CategoriesSection";
import { BrandsMarquee } from "../components/landing/BrandsMarquee";
import { FeaturedProductsSection } from "../components/landing/FeaturedProductsSection";
import { BannerSection } from "../components/landing/BannerSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { Zap, Sparkles } from "lucide-react";
import { VideoSection } from "../components/landing/videoBannerSection";
import { useEffect, useState } from "react";


export const Home = () => {
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const dontShow = localStorage.getItem('dontShowFormAgain');
        if (dontShow === 'true') return;
        const timer = setTimeout(() => setShowForm(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => setShowForm(false);
    const handleDontShowAgain = () => {
        localStorage.setItem('dontShowFormAgain', 'true');
        setShowForm(false);
    };

    return (
        <main>
            <HeroSection />
            <VideoSection />
            <CategoriesSection />
            <FeaturedProductsSection heading="Best Sellers" icon={Zap} type="best-sellers" />
            <FeaturedProductsSection heading="New Arrivals" icon={Sparkles} type="trending" />
            <BannerSection />
            <BrandsMarquee />
            <TestimonialsSection />

            {/* Popup Modal for Google Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-8 relative mx-2 animate-in fade-in">
                        <div className="flex justify-end mb-4 gap-2">
                            <button
                                onClick={handleDontShowAgain}
                                className="text-xs px-3 py-1 rounded text-gray-800 bg-red-400 hover:bg-red-600 transition-colors border border-red-600"
                            >
                                Don't show again
                            </button>
                            <button
                                onClick={handleClose}
                                className=" text-gray-400 text-xl font-bold"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSdsC_CyANtHjv_nfjx9aP4d0EIII1CzOvy2P6mk_7_n2310ug/viewform?embedded=true"
                            width="100%"
                            height="600"
                            className="w-full rounded-xl border border-gray-300 shadow-2xl"
                            title="Contact/Enquiry Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </div>
            )}
        </main>
    );
}