import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { Sparkles, Users, Heart, ArrowRight } from "lucide-react";

export const About = () => {
    return (
        <main className="bg-gray-50 min-h-screen pt-8 pb-16">
            <section className="max-w-5xl mx-auto px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <Sparkles className="text-red-500 w-8 h-8" />
                    About <span className="text-red-500">Myson</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Since 2018, Myson has been on a mission to transform kitchens across Kerala. With a passion for quality, innovation, and customer delight, we bring you the best in kitchenware curated for modern kitchens.
                </p>
            </section>

            <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Heart className="text-red-500" /> Our Story
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg mb-4">
                        What started as a single store in Kerala has grown into a trusted brand with a vibrant online presence. Our journey is fueled by a love for design, a commitment to quality, and a deep respect for our customers.                    </p>
                    <p className="text-gray-700 text-base md:text-lg">
                        We believe every kitchen tells a story. At Myson, we help you create yours with products that blend style, function, and durability.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img src="/brand.logo.png" alt="Myson Logo" className="w-64 h-64 object-contain rounded-xl shadow-lg bg-white p-6" />
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 mb-20 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                <ul className="flex flex-col md:flex-row justify-center gap-8 text-lg">
                    <li className="flex-1 bg-white rounded-lg shadow p-6">
                        <span className="block text-red-500 font-bold text-2xl mb-2">Quality</span>
                        <span className="text-gray-600">We never compromise on the products we offer.</span>
                    </li>
                    <li className="flex-1 bg-white rounded-lg shadow p-6">
                        <span className="block text-red-500 font-bold text-2xl mb-2">Innovation</span>
                        <span className="text-gray-600">We seek out the latest trends and technologies for your home.</span>
                    </li>
                    <li className="flex-1 bg-white rounded-lg shadow p-6">
                        <span className="block text-red-500 font-bold text-2xl mb-2">Care</span>
                        <span className="text-gray-600">We put our customers at the heart of everything we do.</span>
                    </li>
                </ul>
            </section>

            <section className="max-w-3xl mx-auto px-4 text-center mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Join Our Journey</h2>
                <p className="text-gray-700 mb-6">Ready to upgrade your kitchen or home? Explore our products or visit us in-store. We can't wait to welcome you to the Myson family!</p>
                <a href="/products">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg flex items-center gap-2 mx-auto">
                        Browse Products <ArrowRight className="w-5 h-5" />
                    </button>
                </a>
            </section>
        </main>
    );
};

export default About; 