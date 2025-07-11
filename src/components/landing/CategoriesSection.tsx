const categories = [
    { title: 'Offer Zone', seed: 'offer' },
    { title: 'Western', seed: 'western' },
    { title: 'Hoshizaki', seed: 'hoshizaki' },
    { title: 'Dihr', seed: 'dihr' },
    { title: 'Merrychef', seed: 'merrychef' },
    { title: 'Classeq', seed: 'classeq' },
];

export const CategoriesSection = () => (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
                {categories.map(({ title, seed }) => (
                    <div key={title} className="flex flex-col items-center group">
                        <img
                            src={`https://picsum.photos/seed/${seed}/200/200`}
                            alt={title}
                            className="w-24 h-24 object-cover rounded-2xl shadow-md group-hover:shadow-lg transform group-hover:scale-105 transition"
                        />
                        <h3 className="mt-3 text-center text-gray-700 font-semibold group-hover:text-red-600 transition">
                            {title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
); 