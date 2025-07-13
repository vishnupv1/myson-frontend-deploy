import { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { publicAPI } from '../services/api';

export const SearchPalette = () => {
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
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
            setResults([]);
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
        if (!query.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            try {
                const res = await publicAPI.searchProducts(query.trim());
                setResults(res.data);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);
        return () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
        };
    }, [query]);

    return (
        <>
            <button onClick={openPalette}>
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

                        <div className="mt-4 space-y-2 min-h-[40px]">
                            {loading && <div className="text-gray-400 text-sm">Searching...</div>}
                            {!loading && results.length === 0 && query.trim() && (
                                <div className="text-gray-400 text-sm">No products found.</div>
                            )}
                            {!loading && results.map(product => (
                                <div key={product._id} className="flex items-center w-full gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer justify-start">
                                    <img src={product.images?.[0] ? `http://localhost:5000/public/images/${product.images[0]}` : '/brand.icon.png'} alt={product.name} className="h-8 sm:h-14 rounded-md object-cover" />
                                    <span className="text-gray-800 font-semibold">{product.name}</span>
                                    <p className="rounded-full px-2 text-sm border border-gray-200 text-gray-800 bg-gray-200 ml-auto">{product.brand.name}</p>
                                </div >
                            ))}
                        </div >
                    </div >
                </div >
            )}
        </>
    );
};
