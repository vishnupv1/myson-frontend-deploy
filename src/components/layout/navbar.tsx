import { useState, useEffect, useRef } from 'react';
import { SearchIcon, Menu, X, ChevronDown, ChevronUp, LucidePhone, LucideMapPin } from 'lucide-react';
import { SearchPalette } from '../searchPallete';
import { publicAPI } from '../../services/api';
import { useNavigate } from 'react-router';

interface Category {
    _id: string;
    name: string;
}

export const Navbar = () => {
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [catLoading, setCatLoading] = useState(false);
    const [catError, setCatError] = useState('');
    const [showCatDropdown, setShowCatDropdown] = useState(false);
    const [mobileCatOpen, setMobileCatOpen] = useState(true);
    const catDropdownRef = useRef<HTMLDivElement>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Preload categories on mount for instant dropdown
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setCatLoading(true);
        setCatError('');
        try {
            const res = await publicAPI.getCategories();
            setCategories(res.data || []);
        } catch {
            setCatError('Failed to load categories');
        } finally {
            setCatLoading(false);
        }
    };

    // Close dropdown on outside click (desktop)
    useEffect(() => {
        if (!showCatDropdown) return;
        const handleClick = (e: MouseEvent) => {
            if (catDropdownRef.current && !catDropdownRef.current.contains(e.target as Node)) {
                setShowCatDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showCatDropdown]);

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
            <div className="container mx-auto flex items-center justify-between px-2 lg:px-4 py-3">
                <a href="/" className="flex items-center md:min-w-52">
                    <img
                        src="/brand.logo.png"
                        alt="Myson"
                        className="h-10 md:h-14 lg:h-16 w-auto max-h-16"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-gray-800 relative">
                    <a
                        onClick={() => navigate("/")}
                        className="hover:text-red-500 flex items-center gap-1 cursor-pointer">
                        <span className="">Home</span>
                    </a>
                    {/* Products with hover dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => {
                            if (hideTimeout.current) clearTimeout(hideTimeout.current);
                            setShowCatDropdown(true)
                        }}
                        onMouseLeave={() => {
                            if (hideTimeout.current) clearTimeout(hideTimeout.current);
                            hideTimeout.current = setTimeout(() => setShowCatDropdown(false), 600)
                        }}
                    >
                        <a onClick={() => navigate("/products")} className="hover:text-red-500 flex items-center gap-1 cursor-pointer select-none">
                            Products <ChevronDown className="w-4 h-4" />
                        </a>
                        {showCatDropdown && (
                            <div
                                ref={catDropdownRef}
                                className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in duration-300`}
                                onMouseEnter={() => {
                                    if (hideTimeout.current) clearTimeout(hideTimeout.current);
                                    setShowCatDropdown(true)
                                }}
                                onMouseLeave={() => {
                                    if (hideTimeout.current) clearTimeout(hideTimeout.current);
                                    hideTimeout.current = setTimeout(() => setShowCatDropdown(false), 600)
                                }}
                            >
                                <div className="p-2">
                                    {catLoading ? (
                                        <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
                                    ) : catError ? (
                                        <div className="px-4 py-2 text-red-500 text-sm">{catError}</div>
                                    ) : categories.length === 0 ? (
                                        <div className="px-4 py-2 text-gray-500 text-sm">No categories</div>
                                    ) : (
                                        categories.map(cat => (
                                            <a
                                                key={cat._id}
                                                onClick={() => {
                                                    navigate(`/products?category=${cat._id}`)
                                                }}
                                                className="block cursor-pointer px-4 py-2 hover:bg-red-50 hover:text-red-600 text-gray-800 text-sm transition rounded"
                                            >
                                                {cat.name}
                                            </a>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <a
                        onClick={() => navigate("/about")}
                        className="hover:text-red-500 flex items-center gap-1 cursor-pointer">
                        <span className="">About</span>
                    </a>
                </nav>

                {/* Desktop Search */}
                <div className='hidden md:block text-red-400 md:min-w-52'>
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
                            {/* Products with collapsible categories */}
                            <div>
                                <button
                                    className="flex items-center gap-2 w-full text-left text-lg hover:text-red-500 focus:outline-none"
                                    onClick={() => setMobileCatOpen(v => !v)}
                                    aria-expanded={mobileCatOpen}
                                    aria-controls="mobile-cat-list"
                                >
                                    Products
                                    {mobileCatOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                {mobileCatOpen && (
                                    <div id="mobile-cat-list" className="ml-2 mt-2 border-l-4 border-red-500 pl-3 flex flex-col gap-1 animate-in fade-in">
                                        {catLoading ? (
                                            <div className="py-1 text-gray-500 text-sm">Loading...</div>
                                        ) : catError ? (
                                            <div className="py-1 text-red-500 text-sm">{catError}</div>
                                        ) : categories.length === 0 ? (
                                            <div className="py-1 text-gray-500 text-sm">No categories</div>
                                        ) : (
                                            categories.slice(0, 6).map(cat => (
                                                <a
                                                    key={cat._id}
                                                    href={`/products?category=${cat._id}`}
                                                    className="block py-1 text-gray-800 hover:text-red-600 text-base transition"
                                                    onClick={handleClose}
                                                >
                                                    {cat.name}
                                                </a>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                            <a href="/about" className="hover:text-red-500 text-lg" onClick={handleClose}>About</a>
                            <div className="grow"></div>
                        </nav>
                            
                        {/* Address and contact info pinned to the very bottom of the mobile menu */}
                        <div className="w-full px-6 pb-6 pt-2 text-[15px] space-y-3 text-gray-800 border-t border-gray-200">
                            <div className="font-semibold flex gap-1 items-center"><LucideMapPin size={16} />Myson Planet</div>
                            <div className="text-sm leading-snug ms-4">Cheranallur, Ernakulam,<br />Kerala 682034</div>
                            <div className="flex items-start gap-1">
                                <LucidePhone size={16} />
                                <div className="flex flex-col text-gray-400 gap-1">
                                    <a href="tel:+919447458735">+91 9447458735</a>
                                    <a href="tel:+919495957914">+91 9495957914</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
