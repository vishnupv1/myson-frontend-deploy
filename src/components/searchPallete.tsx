import { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { publicAPI } from '../services/api';
import { buildImageUrl } from '../util/buildImageUrl';
import { useNavigate } from 'react-router';

export const SearchPalette = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    const openPalette = () => {
        setOpen(true);
        setIsClosing(false);
    };

    const closePalette = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpen(false);
            setQuery('');
            setResults(null);
            setIsClosing(false);
        }, 300); // match with duration class
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closePalette();
            if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
                e.preventDefault();
                openPalette();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!query.trim() || query.trim().length < 2) {
            setResults(null);
            return;
        }
        setLoading(true);
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            try {
                const res = await publicAPI.searchProducts(query.trim());
                setResults(res.data);
            } catch {
                setResults(null);
            } finally {
                setLoading(false);
            }
        }, 400);
        return () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
        };
    }, [query]);

    // Helper to build filter URL
    const buildFilterUrl = (brandId?: string, categoryId?: string) => {
        let url = '/products?';
        if (brandId) url += `brand=${brandId}&`;
        if (categoryId) url += `category=${categoryId}&`;
        return url.replace(/&$/, '');
    };

    return (
        <>
            <button onClick={openPalette} className='p-1 float-end'>
                <SearchIcon />
            </button>

            {open && (
                <div
                    onClick={closePalette}
                    className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-4 px-4  ${isClosing && 'animate-out fade-out duration-300'} `}
                >
                    <div
                        className={`bg-white rounded-xl shadow-2xl w-full max-w-xl p-4 relative
                            ${isClosing
                                ? 'animate-out fade-out slide-out-to-top'
                                : 'animate-in fade-in slide-in-from-top'}
                            duration-300`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closePalette}
                            className="absolute right-3 top-3 text-gray-400 hover:text-black"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for products, brands..."
                                className="w-full text-base outline-none border-b py-2 placeholder-gray-400"
                                value={query}
                                autoFocus
                                onChange={e => setQuery(e.target.value)}
                            />
                        </div>
                        {/* Search Guide */}
                        <div className="text-[11px] md:text-xs text-gray-500 mt-2 mb-1 px-1">
                            <span>Tip: </span>
                            <span>Type a brand (e.g. <b>Western</b>) or a category (<b>Dishwasher</b>), or both (<b>Western Dishwasher</b>) to find products. Click "View all products" to see filtered results.</span>
                        </div>

                        <div className="mt-4 space-y-2 min-h-[40px] overflow-y-auto max-h-[80vh]">
                            {loading && <div className="text-gray-400 text-sm">Searching...</div>}
                            {!loading && results && (
                                <>
                                    {/* Combined Brand+Category Result */}
                                    {results.brand && results.category && (
                                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 mb-1">
                                            <span className="font-semibold text-gray-800">{results.category.name} <span className='font-light'>in</span> {results.brand.name}</span>
                                            <button
                                                className="ml-auto px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                                                onClick={() => { closePalette(); navigate(buildFilterUrl(results.brand._id, results.category._id)); }}
                                            >
                                                View all products
                                            </button>
                                        </div>
                                    )}
                                    {/* Brand Only Result */}
                                    {results.brand && !results.category && (
                                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 mb-1">
                                            <span className="font-semibold text-gray-800">{results.brand.name}</span>
                                            <button
                                                className="ml-auto px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                                                onClick={() => { closePalette(); navigate(buildFilterUrl(results.brand._id, undefined)); }}
                                            >
                                                View all products
                                            </button>
                                        </div>
                                    )}
                                    {/* Category Only Result */}
                                    {results.category && !results.brand && (
                                        <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 mb-1">
                                            <span className="font-semibold text-gray-800">{results.category.name}</span>
                                            <button
                                                className="ml-auto px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                                                onClick={() => { closePalette(); navigate(buildFilterUrl(undefined, results.category._id)); }}
                                            >
                                                View all products
                                            </button>
                                        </div>
                                    )}
                                    <hr className='text-gray-300'/>
                                    {/* Product Results */}
                                    {Array.isArray(results.products) && results.products.length > 0 && results.products.map(product => (
                                        <div
                                            key={product._id}
                                            className="flex items-center w-full gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer justify-start"
                                            onClick={() => { closePalette(); navigate(`/products/${product._id}`) }}
                                        >
                                            <img src={buildImageUrl(product.images?.[0])} alt={product.name} className="h-8 sm:h-14 rounded-md object-cover" />
                                            <span className="text-gray-800 font-semibold">{product.name}</span>
                                            <p className="rounded-full px-2 text-sm border border-gray-200 text-gray-800 bg-gray-200 ml-auto">{product.brand?.name}</p>
                                        </div>
                                    ))}
                                    {/* No products found */}
                                    {Array.isArray(results.products) && results.products.length === 0 && (
                                        <div className="text-gray-400 text-sm">No products found.</div>
                                    )}
                                </>
                            )}
                            {!loading && !results && query.trim() && (
                                <div className="text-gray-400 text-sm">No results found.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
