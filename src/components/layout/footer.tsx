import { Facebook, Youtube, Instagram, LucideArrowUpRight, LucidePhone } from "lucide-react";

export const Footer = () => (
    <footer className="bg-neutral-900 text-gray-200 pt-10 pb-5` ">
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
                <a href="#categories" className="hover:text-white transition">Categories</a>
                <a href="/products" className="hover:text-white transition">Products</a>
                <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
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
                    <div className="flex items-start gap-3">
                        <LucidePhone size={20}/>
                        <div className="flex flex-col text-gray-400 gap-1">
                            <a href="tel:+919447458735">+91 9447458735</a>
                            <a href="tel:+919495957914">+91 9495957914</a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* heading */}
                <h4 className="mb-2 text-white text-lg">Store Locator</h4>

                {/* responsive map wrapper */}
                <div className="relative w-full overflow-hidden rounded-md shadow-lg"
                    /* 16 : 9 aspect ratio – adjust if you want it taller/narrower */
                    style={{ paddingBottom: "56.25%" }}>
                    <iframe
                        title="Myson Planet on Google Maps"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5396489677364!2d76.2925296!3d10.054793699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080de739753667%3A0xe3650d369bc3ba2b!2sMyson%20Planet!5e0!3m2!1sen!2sin!4v1752419483558!5m2!1sen!2sin"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        /* stretch to fill wrapper */
                        className="absolute inset-0 h-full w-full stretch border-0"
                    />
                </div>

                {/* optional “Open in Google Maps” link */}
                <div className="text-sm mt-2 flex items-center gap-1 justify-center">
                    <a
                        href="https://maps.app.goo.gl/gGuN9UnojZfBmPRp8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-100 hover:text-blue-300 transition-colors"
                    >
                        Open in Google Maps
                    </a>
                    <LucideArrowUpRight size={16} />
                </div>
            </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
            &copy; {new Date().getFullYear()} Myson. All rights reserved.
        </div>
    </footer>
);
