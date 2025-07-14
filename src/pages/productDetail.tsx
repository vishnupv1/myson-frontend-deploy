import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { publicAPI } from "../services/api";
import { buildImageUrl } from "../util/buildImageUrl";

const fallbackImg = "/brand.icon.png";

export const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mainImg, setMainImg] = useState<string>("");
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setLoading(true);
        publicAPI.getProduct(id!)
            .then(res => {
                setProduct(res.data);
                setMainImg((res.data.images?.[0] ?? "") as string);
            })
            .catch(() => setProduct(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">Loading...</div>;
    }
    if (!product) {
        return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-red-500">Product not found.</div>;
    }
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <div>
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg mb-4 flex items-center justify-center bg-gray-100">
                        <img
                            src={imgError ? fallbackImg : buildImageUrl(mainImg)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={() => setImgError(true)}
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                        {product.images?.map((img: string, i: number) => (
                            <img
                                key={i}
                                src={buildImageUrl(img)}
                                alt={product.name + ' ' + (i + 1)}
                                className={`w-24 h-16 object-cover rounded-lg border transition cursor-pointer ${mainImg === img ? 'border-red-500' : 'border-gray-200 hover:border-red-400'}`}
                                onClick={() => { setMainImg(img); setImgError(false); }}
                                onError={e => (e.currentTarget.src = fallbackImg)}
                            />
                        ))}
                    </div>
                </div>
                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                            {product.brand?.name}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                            {product.category?.name}
                        </span>
                    </div>
                    {/* <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-semibold text-red-600">₹{product.price?.toLocaleString()}</span>
                        {product.rating && (
                            <span className="text-yellow-500 font-medium flex items-center gap-1">★ {product.rating} <span className="text-gray-500">({product.reviews} reviews)</span></span>
                        )}
                    </div> */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                    <a
                        href="https://wa.me/919447458735"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-8 w-full md:w-auto shadow-lg shadow-red-200/40">Enquire Now</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 