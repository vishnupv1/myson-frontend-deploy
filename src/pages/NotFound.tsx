import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { Ghost, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
            <Ghost className="w-20 h-20 text-red-500 mb-6 animate-bounce" />
            <h1 className="text-8xl font-extrabold text-red-500 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! The page you’re looking for doesn’t exist or has moved.</p>
            <a href="/" className="inline-block">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </button>
            </a>
        </main>
    );
};

export default NotFound; 