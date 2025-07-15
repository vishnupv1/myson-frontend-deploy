import { useState, useEffect } from "react";
import { Card, CardHeader } from "../ui/card";
import { publicAPI } from "../../services/api";
import { buildImageUrl } from "../../util/buildImageUrl";

interface Product {
    _id: string;
    name: string;
    images: string[];
    brand: any
}
interface Category {
    _id: string;
    name: string;
}
interface Brand {
    _id: string;
    name: string;
}
interface Filters {
    search?: string;
    category?: string;
    brand?: string;
    page: number;
    limit: number;
}

interface ProductsGridSectionProps {
    filtersFromUrl?: Filters;
    onFiltersChange?: (filters: Filters) => void;
}

export const ProductsGridSection = ({ filtersFromUrl, onFiltersChange }: ProductsGridSectionProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({
        search: "",
        category: "",
        brand: "",
        page: 1,
        limit: 10,
    });
    const [totalPages, setTotalPages] = useState(1);

    // Sync filters with URL on mount and when filtersFromUrl changes
    useEffect(() => {
        if (filtersFromUrl) {
            setFilters({
                ...filters,
                ...filtersFromUrl,
            });
        }
        // eslint-disable-next-line
    }, [JSON.stringify(filtersFromUrl)]);

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [filters]);

    // When filters change, update the URL
    useEffect(() => {
        if (onFiltersChange) {
            onFiltersChange(filters);
        }
        // eslint-disable-next-line
    }, [filters]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const params: any = {
                page: filters.page,
                limit: filters.limit,
            };
            if (filters.category) params.category = filters.category;
            if (filters.brand) params.brand = filters.brand;
            if (filters.search) params.search = filters.search;
            const res = await publicAPI.getProducts(params);
            setProducts(res.data.products || []);
            setTotalPages(Math.ceil((res.data.total || 0) / filters.limit));
        } catch {
            setProducts([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await publicAPI.getCategories();
            setCategories(res.data || []);
        } catch {
            setCategories([]);
        }
    };

    const fetchBrands = async () => {
        try {
            const res = await publicAPI.getBrands();
            setBrands(res.data || []);
        } catch {
            setBrands([]);
        }
    };

    const handleFilterChange = (key: keyof Filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1, // Reset to first page on filter change
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Filters Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mb-8">
                <input
                    type="text"
                    value={filters.search}
                    onChange={e => handleFilterChange("search", e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-56"
                    placeholder="Search products..."
                />
                <select
                    value={filters.category}
                    onChange={e => handleFilterChange("category", e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-44"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <select
                    value={filters.brand}
                    onChange={e => handleFilterChange("brand", e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-44"
                >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                        <option key={brand._id} value={brand._id}>{brand.name}</option>
                    ))}
                </select>
            </div>
            {/* Product Grid */}
            <main className="flex-1 min-h-[400px] flex items-center justify-center">
                {isLoading ? (
                    <div className="flex items-center justify-center w-full min-h-[400px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 w-full">No products found.</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                        {products.map((product) => (
                            <Card
                                key={product._id}
                                image={buildImageUrl(product.images?.[0])}
                                className="cursor-pointer"
                                onClick={() => window.location.href = `/products/${product._id}`}
                            >
                                <CardHeader className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-1 md:gap-3 mb-1 min-w-0">
                                    <div className="min-w-0 flex-1 w-full">
                                        <h4 className="font-medium leading-tight text-base md:text-lg">
                                            {product.name.split(/ (.+)/)[0]}
                                        </h4>
                                        <h6 className="font-light text-xs md:text-sm leading-tight truncate" title={product.name.split(/ (.+)/)[1]}>
                                            {product.name.split(/ (.+)/)[1]}
                                        </h6>
                                    </div>
                                    <span className="mt-1 md:mt-0 lg:ml-auto flex-shrink-0 inline-block bg-red-50 text-slate-500 text-[10px] md:text-xs font-semibold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-sm border border-slate-300 whitespace-nowrap text-left md:text-right w-fit">
                                        {product.brand.name}
                                    </span>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                        className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded border ${page === filters.page ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === totalPages}
                        className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}; 
