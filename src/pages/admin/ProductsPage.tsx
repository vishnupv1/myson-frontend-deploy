import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
    Plus, 
    Search, 
    Filter, 
    Eye, 
    Edit, 
    Trash2, 
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    Package
} from 'lucide-react';
import { productsAPI, categoriesAPI, brandsAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: { _id: string; name: string };
    brand: { _id: string; name: string };
    listed: boolean;
    createdAt: string;
    bestSeller?: boolean;
    trending?: boolean;
}

interface Category {
    _id: string;
    name: string;
}

interface Brand {
    _id: string;
    name: string;
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        brand: '',
        listed: '',
        bestSeller: '',
        trending: '',
        page: 1,
        limit: 10,
    });
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await productsAPI.getAll(filters);
            setProducts(response.data.products || []);
            setTotalPages(Math.ceil((response.data.total || 0) / filters.limit));
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll({ limit: 1000 });
            setCategories(response.data.categories || []);
        } catch (error) {
            console.error('Failed to load categories');
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await brandsAPI.getAll({ limit: 1000 });
            setBrands(response.data.brands || []);
        } catch (error) {
            console.error('Failed to load brands');
        }
    };

    const handleProductListing = async (productId: string, listed: boolean) => {
        try {
            await productsAPI.setListing(productId, !listed);
            toast.success(`Product ${listed ? 'unlisted' : 'listed'} successfully`);
            fetchProducts();
        } catch (error) {
            toast.error(`Failed to ${listed ? 'unlist' : 'list'} product`);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            try {
                await productsAPI.delete(productId);
                toast.success('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    // Count best sellers and trending
    const bestSellerCount = products.filter(p => p.bestSeller).length;
    const trendingCount = products.filter(p => p.trending).length;

    const handleBestSellerToggle = async (productId: string, bestSeller: boolean) => {
        if (!bestSeller && bestSellerCount >= 4) {
            toast.error('Only 4 products can be marked as Best Seller.');
            return;
        }
        try {
            await productsAPI.setBestSeller(productId, !bestSeller);
            toast.success(`Product ${!bestSeller ? 'marked as best-seller' : 'removed from best-sellers'}`);
            fetchProducts();
        } catch (error) {
            toast.error('Failed to update best-seller status');
        }
    };
    const handleTrendingToggle = async (productId: string, trending: boolean) => {
        if (!trending && trendingCount >= 4) {
            toast.error('Only 4 products can be marked as Trending.');
            return;
        }
        try {
            await productsAPI.setTrending(productId, !trending);
            toast.success(`Product ${!trending ? 'marked as trending' : 'removed from trending'}`);
            fetchProducts();
        } catch (error) {
            toast.error('Failed to update trending status');
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1, // Reset to first page when filtering
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your product catalog
                    </p>
                </div>
                <Link
                    to="/admin/products/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="pl-10 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Search products..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ">
                            Category
                        </label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brand
                        </label>
                        <select
                            value={filters.brand}
                            onChange={(e) => handleFilterChange('brand', e.target.value)}
                            className="block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All Brands</option>
                            {brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={filters.listed}
                            onChange={(e) => handleFilterChange('listed', e.target.value)}
                            className="block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All Status</option>
                            <option value="true">Listed</option>
                            <option value="false">Unlisted</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Best Seller</label>
                        <select
                            value={filters.bestSeller}
                            onChange={(e) => handleFilterChange('bestSeller', e.target.value)}
                            className="block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trending</label>
                        <select
                            value={filters.trending}
                            onChange={(e) => handleFilterChange('trending', e.target.value)}
                            className="block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">All</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white shadow rounded-lg">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new product.
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/admin/products/new"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Product
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Brand
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Seller</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trending</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                        src={`http://localhost:5000/public/images/${product.images[0]}`}
                                                        alt={product.name}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {product.description.substring(0, 10)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.category?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.brand?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                product.listed
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.listed ? 'Listed' : 'Unlisted'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={!!product.bestSeller}
                                                    onChange={() => handleBestSellerToggle(product._id, !!product.bestSeller)}
                                                    className="sr-only peer"
                                                    disabled={!product.bestSeller && bestSellerCount >= 4}
                                                />
                                                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-yellow-400 transition relative">
                                                    <div className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${product.bestSeller ? 'translate-x-5 bg-yellow-500' : ''}`}></div>
                                                </div>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={!!product.trending}
                                                    onChange={() => handleTrendingToggle(product._id, !!product.trending)}
                                                    className="sr-only peer"
                                                    disabled={!product.trending && trendingCount >= 4}
                                                />
                                                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 transition relative">
                                                    <div className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${product.trending ? 'translate-x-5 bg-blue-500' : ''}`}></div>
                                                </div>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/admin/products/${product._id}`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    to={`/admin/products/${product._id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleProductListing(product._id, product.listed)}
                                                    className={`${
                                                        product.listed 
                                                            ? 'text-yellow-600 hover:text-yellow-900' 
                                                            : 'text-green-600 hover:text-green-900'
                                                    }`}
                                                    title={product.listed ? 'Unlist' : 'List'}
                                                >
                                                    {product.listed ? (
                                                        <TrendingDown className="h-4 w-4" />
                                                    ) : (
                                                        <TrendingUp className="h-4 w-4" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => handlePageChange(filters.page - 1)}
                            disabled={filters.page === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(filters.page + 1)}
                            disabled={filters.page === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing page <span className="font-medium">{filters.page}</span> of{' '}
                                <span className="font-medium">{totalPages}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => handlePageChange(filters.page - 1)}
                                    disabled={filters.page === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            page === filters.page
                                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(filters.page + 1)}
                                    disabled={filters.page === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage; 