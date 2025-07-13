import { Facebook, Youtube, Instagram } from "lucide-react";

export const Footer = () => (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-5 mt-12 ">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between gap-8">
            {/* Logo and About */}
            <div className="flex-1 max-w-md text-center md:text-left">
                <img
                    src="/brand.icon.png"
                    alt="Company Logo"
                    className="mb-4 w-16 mx-auto md:mx-0 rounded"
                />
                <p className="text-sm text-gray-400">
                    Since our establishment in 2018, MYSON has swiftly risen as India's leading hub for pet parents. With a wide array of furniture and kitchenwares, we fulfill all your kitchen requirements with unparalleled quality and attention. With a presence in 2 physical retail outlets spanning Kerala, we're continually expanding our reach to serve you better.
                </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 text-sm items-start text-gray-400">
                <h3 className="text-lg text-white">Links</h3>
                <a href="#brands" className="hover:text-white transition">Brands</a>
                <a href="#products" className="hover:text-white transition">Products</a>
                <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
                <a href="#contact" className="hover:text-white transition">Contact</a>
            </nav>

            {/* Social Icons */}
            <div className="text-sm">
                <h3 className="text-lg text-white mb-4 ">Socials</h3>
                <div className="flex flex-col gap-3">
                    <a href="https://youtube.com/@myson-planet" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-500 transition flex items-center gap-3">
                        <Youtube size={20} />
                        <span className="text-gray-400">@myson-planet</span>
                    </a>
                    <a href="https://www.instagram.com/mysonfoodcaredisplaysolutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 transition flex items-center gap-3">
                        <Instagram size={20} />
                        <span className="text-gray-400">mysonfoodcaredisplaysolutions</span>
                    </a>
                    <a href="https://www.facebook.com/MysonGroupofCompanies" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition flex items-center gap-3">
                        <Facebook size={20} />
                        <span className="text-gray-400">MysonGroupofCompanies</span>
                    </a>
                </div>
            </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
            &copy; {new Date().getFullYear()} Myson. All rights reserved.
        </div>
    </footer>
);
