import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardHeader } from "../ui/card";
import { publicAPI } from "../../services/api";
import { buildImageUrl } from "../../util/buildImageUrl";

export const FeaturedProductsSection = ({ heading, icon: Icon, type }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        publicAPI.getFeaturedProducts(type)
            .then(res => {
                if (isMounted) setProducts(res.data.products || []);
            })
            .catch(() => {
                if (isMounted) setProducts([]);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, [type]);

    return (
        <section className="py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-3 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{heading}</h2>
                    {Icon && <Icon className="w-7 h-7 text-red-500" />}
                </div>
                {loading ? (
                    <div className="flex items-center justify-center h-32">Loading...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.slice(0, 4).map((product) => (
                            <Card key={product._id} image={product.images?.[0]} onClick={() => navigate(`/products/${product._id}`)} className="cursor-pointer">
                                <CardHeader>{product.name}</CardHeader>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};