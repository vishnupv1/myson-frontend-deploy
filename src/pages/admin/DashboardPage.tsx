import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
    Package, 
    Tag, 
    Building2, 
    TrendingUp, 
    Eye,
    Plus,
    Edit,
    Trash2
} from 'lucide-react';
import { productsAPI, categoriesAPI, brandsAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface DashboardStats {
    totalProducts: number;
    totalCategories: number;
    totalBrands: number;
    listedProducts: number;
}

interface RecentProduct {
    _id: string;
    name: string;
    price: number;
    images: string[];
    listed: boolean;
    createdAt: string;
}

const DashboardPage = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalProducts: 0,
        totalCategories: 0,
        totalBrands: 0,
        listedProducts: 0,
    });
    const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [productsRes, categoriesRes, brandsRes] = await Promise.all([
                productsAPI.getAll({ limit: 1000 }),
                categoriesAPI.getAll({ limit: 1000 }),
                brandsAPI.getAll({ limit: 1000 }),
            ]);

            const products = productsRes.data.products || [];
            const categories = categoriesRes.data.categories || [];
            const brands = brandsRes.data.brands || [];

            setStats({
                totalProducts: products.length,
                totalCategories: categories.length,
                totalBrands: brands.length,
                listedProducts: products.filter((p: any) => p.listed).length,
            });

            // Get recent products (last 5)
            const recent = products
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5);
            setRecentProducts(recent);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnlistProduct = async (productId: string) => {
        try {
            await productsAPI.unlist(productId);
            toast.success('Product unlisted successfully');
            fetchDashboardData();
        } catch (error) {
            toast.error('Failed to unlist product');
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            try {
                await productsAPI.delete(productId);
                toast.success('Product deleted successfully');
                fetchDashboardData();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Welcome to your admin dashboard. Here's an overview of your store.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Package className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Products
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats.totalProducts}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <Link
                                to="/admin/products"
                                className="font-medium text-indigo-700 hover:text-indigo-900"
                            >
                                View all products
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <TrendingUp className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Listed Products
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats.listedProducts}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <span className="font-medium text-green-700">
                                {stats.totalProducts > 0 
                                    ? Math.round((stats.listedProducts / stats.totalProducts) * 100)
                                    : 0}% active
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Tag className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Categories
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats.totalCategories}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <Link
                                to="/admin/categories"
                                className="font-medium text-indigo-700 hover:text-indigo-900"
                            >
                                Manage categories
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Building2 className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Brands
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats.totalBrands}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <Link
                                to="/admin/brands"
                                className="font-medium text-indigo-700 hover:text-indigo-900"
                            >
                                Manage brands
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Recent Products
                        </h3>
                        <Link
                            to="/admin/products/new"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Product
                        </Link>
                    </div>
                    
                    {recentProducts.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No products yet. Create your first product!</p>
                    ) : (
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-lg object-cover"
                                                            src={`http://localhost:5000/public/images/${product.images[0]}`}
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                    </div>
                                                </div>
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/products/${product._id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/products/${product._id}/edit`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleUnlistProduct(product._id)}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                    >
                                                        <TrendingUp className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                        className="text-red-600 hover:text-red-900"
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
            </div>
        </div>
    );
};

export default DashboardPage; 