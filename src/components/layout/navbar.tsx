import { useState } from 'react';
import { SearchIcon, Menu, X } from 'lucide-react';
import { SearchPalette } from '../searchPallete';

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleOpen = () => {
        setMobileOpen(true);
        setIsClosing(false);
    };
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setMobileOpen(false);
            setIsClosing(false);
        }, 300); // match animation duration
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 md:px-6">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <a href="/" className="flex items-center">
                    <img
                        src="/brand.logo.png"
                        alt="Myson"
                        className="h-10 md:h-14 lg:h-16 w-auto max-h-16"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-gray-800">
                    <a href="/" className="hover:text-red-500 flex items-center gap-1">
                        <span className="">Home</span>
                    </a>
                    <a href="/products" className="hover:text-red-500">Products</a>
                    <a href="/about" className="hover:text-red-500 ">About</a>
                </nav>

                {/* Desktop Search */}
                <div className='hidden md:block text-red-400'>
                    <SearchPalette />
                </div>

                {/* Mobile Icons */}
                <div className="flex md:hidden items-center gap-3">
                    <div className='text-red-400'>
                        <SearchPalette />
                    </div>
                    <button onClick={handleOpen} aria-label="Open menu">
                        <Menu className="w-7 h-7 text-red-400" />
                    </button>
                </div>
            </div>

            {/* Mobile Slide-in Menu */}
            {(mobileOpen || isClosing) && (
                <div
                    onClick={handleClose}
                    className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-end pt-0 px-0
                        ${mobileOpen && !isClosing ? 'animate-in fade-in' : ''}
                        ${isClosing ? 'animate-out fade-out duration-300' : ''}`}
                >
                    <div
                        className={`bg-white w-64 max-w-full h-full shadow-2xl relative
                            ${mobileOpen && !isClosing ? 'animate-in slide-in-from-right duration-300' : ''}
                            ${isClosing ? 'animate-out slide-out-to-right duration-300' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={handleClose}
                            className="absolute right-3 top-3 text-gray-400 hover:text-black"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <nav className="flex flex-col gap-6 mt-16 px-6 text-gray-800">
                            <a href="/" className=" text-lg" onClick={handleClose}>Home</a>
                            <a href="/products" className="hover:text-red-500 text-lg" onClick={handleClose}>Products</a>
                            <a href="/about" className="hover:text-red-500 text-lg" onClick={handleClose}>About</a>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
