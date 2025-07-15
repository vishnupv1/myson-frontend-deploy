import React from "react";
import { ProductsGridSection } from "../components/landing/ProductsGridSection";
import { useSearchParams, useNavigate } from 'react-router';

export const Products: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Read filters from URL
    const filters = {
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        brand: searchParams.get('brand') || '',
        page: parseInt(searchParams.get('page') || '1', 10),
        limit: parseInt(searchParams.get('limit') || '10', 10),
    };

    // Callback to update URL when filters change
    const updateFilters = (newFilters: any) => {
        const params: any = {};
        if (newFilters.search) params.search = newFilters.search;
        if (newFilters.category) params.category = newFilters.category;
        if (newFilters.brand) params.brand = newFilters.brand;
        if (newFilters.page && newFilters.page !== 1) params.page = newFilters.page;
        if (newFilters.limit && newFilters.limit !== 10) params.limit = newFilters.limit;
        setSearchParams(params, { replace: true });
    };

    return <ProductsGridSection filtersFromUrl={filters} onFiltersChange={updateFilters} />;
};

export default Products;