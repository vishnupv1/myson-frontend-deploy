import axios from 'axios';

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
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
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
    unlist: (id: string) => api.patch(`/products/${id}/unlist`),
    delete: (id: string) => api.delete(`/products/${id}`),
    addImages: (id: string, data: FormData) => api.post(`/products/${id}/images`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    updateImage: (id: string, imageIndex: number, data: FormData) => 
        api.put(`/products/${id}/images/${imageIndex}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),
    deleteImage: (id: string, imageIndex: number) => 
        api.delete(`/products/${id}/images/${imageIndex}`),
};

// Categories API
export const categoriesAPI = {
    getAll: (params?: any) => api.get('/categories', { params }),
    create: (data: { name: string }) => api.post('/categories', data),
    update: (id: string, data: { name: string }) => api.put(`/categories/${id}`, data),
    unlist: (id: string) => api.patch(`/categories/${id}/unlist`),
    delete: (id: string) => api.delete(`/categories/${id}`),
};

// Brands API
export const brandsAPI = {
    getAll: (params?: any) => api.get('/brands', { params }),
    create: (data: { name: string }) => api.post('/brands', data),
    update: (id: string, data: { name: string }) => api.put(`/brands/${id}`, data),
    unlist: (id: string) => api.patch(`/brands/${id}/unlist`),
    delete: (id: string) => api.delete(`/brands/${id}`),
};

// Public API (for reference)
export const publicAPI = {
    getProducts: (params?: any) => api.get('/public/products', { params }),
    getProduct: (id: string) => api.get(`/public/products/${id}`),
    getCategories: () => api.get('/public/categories'),
    getBrands: () => api.get('/public/brands'),
    getSubcategory: (type: string) => api.get(`/public/subcategories/${type}`),
};

export default api; 