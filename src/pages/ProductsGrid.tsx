import React from "react";
import { ShoppingBag } from "lucide-react";

const products = [
  { id: 1, name: 'Bosch Dishwasher', image: 'https://picsum.photos/seed/bosch-dishwasher/300/200' },
  { id: 2, name: 'Whirlpool Oven', image: 'https://picsum.photos/seed/whirlpool-oven/300/200' },
  { id: 3, name: 'LG Refrigerator', image: 'https://picsum.photos/seed/lg-fridge/300/200' },
  { id: 4, name: 'Samsung Microwave', image: 'https://picsum.photos/seed/samsung-microwave/300/200' },
  { id: 5, name: 'Prestige Mixer', image: 'https://picsum.photos/seed/prestige-mixer/300/200' },
  { id: 6, name: 'Philips Air Fryer', image: 'https://picsum.photos/seed/philips-airfryer/300/200' },
  { id: 7, name: 'Havells Toaster', image: 'https://picsum.photos/seed/havells-toaster/300/200' },
  { id: 8, name: 'IFB Washing Machine', image: 'https://picsum.photos/seed/ifb-washer/300/200' },
];

export const ProductsGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex gap-8">
        {/* Dummy Filter Section */}
        <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Category</label>
            <select className="w-full p-2 border rounded">
              <option>All</option>
              <option>Kitchen</option>
              <option>Home</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Price Range</label>
            <input type="range" min="0" max="100000" className="w-full" />
          </div>
          <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">Apply</button>
        </aside>

        <main className="flex-1">
          <section className="px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(({ id, name, image }) => (
                <div key={id} className="flex flex-col overflow-clip rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <div className="p-4 font-normal text-lg text-center">{name}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductsGrid; 