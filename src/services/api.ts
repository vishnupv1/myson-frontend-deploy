import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error:AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');

            if (error.config?.url !== '/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials: { username: string; password: string }) =>
        api.post('/login', credentials),
};

// Products API
export const productsAPI = {
    getAll: (params?: any) => api.get('/products', { params }),
    getById: (id: string) => api.get(`/products/${id}`),
    create: (data: FormData) => api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id: string, data: any) => api.put(`/products/${id}`, data),
    setListing: (id: string, listed: boolean) => api.patch(`/products/${id}/listing`, { listed }),
    setBestSeller: (id: string, bestSeller: boolean) => api.patch(`/products/${id}/best-seller`, { bestSeller }),
    setTrending: (id: string, trending: boolean) => api.patch(`/products/${id}/trending`, { trending }),
    delete: (id: string) => api.delete(`/products/${id}`),
    addImages: (id: string, data: FormData) => api.post(`/products/${id}/images`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    deleteImage: (id: string, imageName: string) => api.delete(`/products/${id}/images/${imageName}`),
};

// Categories API (admin)
export const categoriesAPI = {
    getAll: (params?: any) => api.get('/categories', { params }),
    create: (data: { name: string }) => api.post('/categories', data),
    update: (id: string, data: { name: string }) => api.put(`/categories/${id}`, data),
    unlist: (id: string) => api.patch(`/categories/${id}/unlist`),
    delete: (id: string) => api.delete(`/categories/${id}`),
};

// Brands API (admin)
export const brandsAPI = {
    getAll: (params?: any) => api.get('/brands', { params }),
    create: (data: { name: string }) => api.post('/brands', data),
    update: (id: string, data: { name: string }) => api.put(`/brands/${id}`, data),
    setListing: (id: string, listed: boolean) => api.patch(`/brands/${id}/listing`, { listed }),
    delete: (id: string) => api.delete(`/brands/${id}`),
};

// Public API instance (no auth, no interceptors)
const publicApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const publicAPI = {
    getProducts: (params?: any) => publicApi.get('/public/products', { params }),
    getProduct: (id: string) => publicApi.get(`/public/products/${id}`),
    getCategories: () => publicApi.get('/public/categories'),
    getBrands: () => publicApi.get('/public/brands'),
    searchProducts: (q: string) => publicApi.get('/public/search', { params: { q } }),
    getFeaturedProducts: (type: string) => publicApi.get('/public/featured', { params: { type } }),
    // getFeaturedProducts: (type: string) => publicApi.get(`/public/products/featured`, { params: { type } }),
};