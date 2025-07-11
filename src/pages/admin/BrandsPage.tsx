import { useState, useEffect } from 'react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Building2,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import { brandsAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface Brand {
    _id: string;
    name: string;
    listed: boolean;
    createdAt: string;
}

const BrandsPage = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newBrandName, setNewBrandName] = useState('');

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        setIsLoading(true);
        try {
            const response = await brandsAPI.getAll({ limit: 1000 });
            setBrands(response.data.brands || []);
        } catch (error) {
            toast.error('Failed to load brands');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddBrand = async () => {
        if (!newBrandName.trim()) {
            toast.error('Brand name is required');
            return;
        }

        try {
            await brandsAPI.create({ name: newBrandName.trim() });
            toast.success('Brand created successfully');
            setNewBrandName('');
            setShowAddForm(false);
            fetchBrands();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to create brand');
        }
    };

    const handleUpdateBrand = async (id: string) => {
        if (!editingName.trim()) {
            toast.error('Brand name is required');
            return;
        }

        try {
            await brandsAPI.update(id, { name: editingName.trim() });
            toast.success('Brand updated successfully');
            setEditingId(null);
            setEditingName('');
            fetchBrands();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update brand');
        }
    };

    const handleUnlistBrand = async (id: string) => {
        try {
            await brandsAPI.unlist(id);
            toast.success('Brand unlisted successfully');
            fetchBrands();
        } catch (error) {
            toast.error('Failed to unlist brand');
        }
    };

    const handleDeleteBrand = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
            try {
                await brandsAPI.delete(id);
                toast.success('Brand deleted successfully');
                fetchBrands();
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to delete brand');
            }
        }
    };

    const startEditing = (brand: Brand) => {
        setEditingId(brand._id);
        setEditingName(brand.name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingName('');
    };

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your product brands
                    </p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Brand
                </button>
            </div>

            {/* Add Brand Form */}
            {showAddForm && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Brand</h3>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                            placeholder="Enter brand name"
                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                            onClick={handleAddBrand}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => {
                                setShowAddForm(false);
                                setNewBrandName('');
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search brands..."
                    />
                </div>
            </div>

            {/* Brands List */}
            <div className="bg-white shadow rounded-lg">
                {filteredBrands.length === 0 ? (
                    <div className="text-center py-12">
                        <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No brands</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new brand.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Brand
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Brand Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBrands.map((brand) => (
                                    <tr key={brand._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === brand._id ? (
                                                <input
                                                    type="text"
                                                    value={editingName}
                                                    onChange={(e) => setEditingName(e.target.value)}
                                                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleUpdateBrand(brand._id);
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <div className="text-sm font-medium text-gray-900">
                                                    {brand.name}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                brand.listed
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {brand.listed ? 'Listed' : 'Unlisted'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(brand.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {editingId === brand._id ? (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleUpdateBrand(brand._id)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="text-gray-600 hover:text-gray-900"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => startEditing(brand)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleUnlistBrand(brand._id)}
                                                        className={`${
                                                            brand.listed 
                                                                ? 'text-yellow-600 hover:text-yellow-900' 
                                                                : 'text-green-600 hover:text-green-900'
                                                        }`}
                                                        title={brand.listed ? 'Unlist' : 'List'}
                                                    >
                                                        {brand.listed ? (
                                                            <TrendingDown className="h-4 w-4" />
                                                        ) : (
                                                            <TrendingUp className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBrand(brand._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandsPage; 