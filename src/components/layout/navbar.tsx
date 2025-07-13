import { SearchIcon } from 'lucide-react';
import { SearchPalette } from '../searchPallete';

export const Navbar = () => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <a href="/" className="flex items-center">
                    <img src="/brand.logo.png" alt="Myson" className="sm:h-16 w-auto" />
                </a>

                <nav className="flex items-center space-x-6 text-red-400">
                    <a href="/" className="hover:text-gray-900 flex items-center gap-1">
                        <span className="">Home</span>
                    </a>
                    <a href="/products" className="hover:text-gray-900">Products</a>
                    <a href="/about" className="hover:text-gray-900 ">About</a>                    
                </nav>

                <div className='text-red-400'>
                    <SearchPalette />
                </div>
            </div>
        </header>
    );
}
