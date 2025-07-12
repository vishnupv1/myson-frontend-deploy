import { HomeIcon, HeartIcon, UserIcon, SearchIcon } from 'lucide-react';

export const Navbar = ()=> {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 ">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <a href="/" className="flex items-center">
                    <img src="/brand.logo.png" alt="Myson" className="sm:h-16 w-auto" />
                </a>

                <div className="flex-1 mx-6 max-w-lg">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder='Search for "Bosch"'
                            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <SearchIcon className="w-5 h-5 text-red-400 absolute top-1/2 right-3 -translate-y-1/2" />
                    </div>
                </div>

                <nav className="flex space-x-6 text-red-400">
                    <a href="/" className="hover:text-gray-900">
                        <HomeIcon className="w-6 h-6"/>
                    </a>
                    <a href="/wishlist" className="hover:text-gray-900">
                        <HeartIcon className="w-6 h-6" />
                    </a>
                    <a href="/account" className="hover:text-gray-900">
                        <UserIcon className="w-6 h-6" />
                    </a>
                </nav>
            </div>
        </header>
    );
}
