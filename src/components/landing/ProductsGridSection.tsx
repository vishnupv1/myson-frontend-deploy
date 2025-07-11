import { Card, CardHeader } from "../ui/card";

export const ProductsGridSection = ({ products, filters, onFilterChange }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex gap-8">
                {/* Filter Sidebar */}
                <aside className="w-64 hidden md:block p-6 bg-white rounded-xl shadow h-fit sticky top-24">
                    <h2 className="text-xl font-semibold mb-6">Filters</h2>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Category</label>
                        <select className="w-full p-2 border rounded" onChange={e => onFilterChange?.('category', e.target.value)}>
                            <option>All</option>
                            <option>Kitchen</option>
                            <option>Home</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Price Range</label>
                        <input type="range" min="0" max="100000" className="w-full" onChange={e => onFilterChange?.('price', e.target.value)} />
                    </div>
                    <button className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">Apply</button>
                </aside>
                {/* Product Grid */}
                <main className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {products.map(({ id, name, image }) => (
                            <Card key={id} image={image}>
                                <CardHeader>{name}</CardHeader>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}; 