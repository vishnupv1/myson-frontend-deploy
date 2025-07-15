import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Save,
    ArrowLeft,
    Upload,
    X
} from 'lucide-react';
import { productsAPI, categoriesAPI, brandsAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { buildImageUrl } from '../../util/buildImageUrl';

const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price must be positive'),
    category: z.string().min(1, 'Category is required'),
    brand: z.string().min(1, 'Brand is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const MIN_IMAGE_SIZE = 300;
const MAX_IMAGE_SIZE = 512000; // 500KB

const ProductFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [initialImages, setInitialImages] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        if (id && id !== 'new') {
            setIsEditing(true);
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productsAPI.getById(id!);
            const product = response.data.product;

            setValue('name', product.name);
            setValue('description', product.description);
            setValue('price', product.price);
            setValue('category', product.category._id);
            setValue('brand', product.brand._id);
            setExistingImages(product.images || []);
            setInitialImages(product.images || []);
        } catch (error) {
            console.log(error)
            toast.error('Failed to load product');
            navigate('/admin/products');
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

    const handleAddImages = async (files: File[]) => {
        if (!id) return;
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        setIsLoading(true);
        try {
            const response = await productsAPI.addImages(id, formData);
            setExistingImages(response.data.images || []);
            setImages([]); // Clear new images
            toast.success('Images added successfully');
        } catch (error: any) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to add images');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteExistingImage = async (imageName: string) => {
        if (!id) return;
        if (existingImages.length <= 1) {
            toast.error('A product must have at least one image');
            return;
        }
        setIsLoading(true);
        try {
            const response = await productsAPI.deleteImage(id, imageName);
            setExistingImages(response.data.images || []);
            toast.success('Image deleted successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to delete image');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        let validFiles: File[] = [];
        let errorShown = false;
        let pending = files.length;
        if (pending === 0) return;
        files.forEach((file) => {
            if (file.size > MAX_IMAGE_SIZE) {
                if (!errorShown) {
                    toast.error('Each image must be less than 500KB for fast loading.');
                    errorShown = true;
                }
                pending--;
                if (pending === 0 && validFiles.length > 0) {
                    if (isEditing) handleAddImages(validFiles);
                    else setImages(prev => [...prev, ...validFiles]);
                }
                return;
            }
            const img = new window.Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                if (
                    img.width >= MIN_IMAGE_SIZE &&
                    img.height >= MIN_IMAGE_SIZE &&
                    img.width === img.height
                ) {
                    validFiles.push(file);
                } else if (!errorShown) {
                    toast.error('Images must be square and at least 512x512px for fast loading.');
                    errorShown = true;
                }
                URL.revokeObjectURL(url);
                pending--;
                if (pending === 0 && validFiles.length > 0) {
                    if (isEditing) handleAddImages(validFiles);
                    else setImages(prev => [...prev, ...validFiles]);
                }
            };
            img.onerror = () => {
                pending--;
                URL.revokeObjectURL(url);
                if (!errorShown) {
                    toast.error('Invalid image file.');
                    errorShown = true;
                }
            };
            img.src = url;
        });
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: ProductFormData) => {
        if (!isEditing && images.length === 0) {
            toast.error('At least one image is required');
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price.toString());
            formData.append('category', data.category);
            formData.append('brand', data.brand);
            if (!isEditing) {
                images.forEach((image) => {
                    formData.append('images', image);
                });
                await productsAPI.create(formData);
                toast.success('Product created successfully');
            } else {
                await productsAPI.update(id!, formData);
                toast.success('Product updated successfully');
            }
            navigate('/admin/products');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to save product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {isEditing ? 'Update product information' : 'Create a new product for your store'}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Product Name *
                                </label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    className="mt-1 block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter product name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description *
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows={4}
                                    className="mt-1 block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter product description"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Price *
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        {...register('price', { valueAsNumber: true, min: 1 })}
                                        type="number"
                                        step="1"
                                        min="0"
                                        className="pl-7 py-2 ps-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Category *
                                </label>
                                <select
                                    {...register('category')}
                                    className="mt-1 block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Brand *
                                </label>
                                <select
                                    {...register('brand')}
                                    className="mt-1 block w-full py-2 ps-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select a brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.brand && (
                                    <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Images */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Images *
                                </label>

                                {/* Existing Images */}
                                {existingImages.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {existingImages.map((image, index) => (
                                                <div key={index} className="relative group aspect-square max-h-[250px]">
                                                    <img
                                                        src={buildImageUrl(image)}
                                                        alt={`Product ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteExistingImage(image)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New Images */}
                                {images.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">New Images</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative group aspect-square max-h-[250px]">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`New ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Upload Button */}
                                <div className="mt-4">
                                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload Images
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Upload one or more images. At least one image is required.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFormPage; 