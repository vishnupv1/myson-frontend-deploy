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
            </div>
        </section>
    );
};