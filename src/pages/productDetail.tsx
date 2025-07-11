import React from "react";

// Dummy product data (replace with real API data in production)
const product = {
    id: 1,
    name: "Bosch Dishwasher",
    images: [
        "https://picsum.photos/seed/bosch-dishwasher/600/400",
        "https://picsum.photos/seed/bosch-dishwasher2/600/400",
        "https://picsum.photos/seed/bosch-dishwasher3/600/400"
    ],
    price: 49999,
    rating: 4.7,
    reviews: 128,
    description: `
        The Bosch Dishwasher is the ultimate solution for modern kitchens. With advanced cleaning technology, energy efficiency, and a sleek design, it makes dishwashing effortless and stylish. Enjoy whisper-quiet operation and multiple wash modes for all your needs.
    `,
    features: [
        "12 Place Settings",
        "EcoSilence Drive",
        "Intensive Kadhai Program",
        "Low Water Consumption",
        "2-Year Warranty"
    ]
};

export const ProductDetail: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <div>
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg mb-4">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-4">
                        {product.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={product.name + ' ' + (i+1)}
                                className="w-24 h-16 object-cover rounded-lg border border-gray-200 hover:border-red-500 cursor-pointer transition"
                            />
                        ))}
                    </div>
                </div>
                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-semibold text-red-600">₹{product.price.toLocaleString()}</span>
                        <span className="text-yellow-500 font-medium">★ {product.rating} <span className="text-gray-500">({product.reviews} reviews)</span></span>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-8 w-full md:w-auto">Add to Cart</button>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Key Features</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {product.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 