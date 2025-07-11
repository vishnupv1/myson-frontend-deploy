const categories = [
    { title: 'Offer Zone', seed: 'offer' },
    { title: 'Western', seed: 'western' },
    { title: 'Hoshizaki', seed: 'hoshizaki' },
    { title: 'Dihr', seed: 'dihr' },
    { title: 'Merrychef', seed: 'merrychef' },
    { title: 'Classeq', seed: 'classeq' },
];

export const Categories = () => {
    return (
        <section className="flex justify-center py-8" id="category">
            <div className="flex justify-between md:w-8/12">
                {categories.map(({ title, seed }) => (
                    <div
                        key={title}
                        className="flex flex-col items-center"
                    >
                        <img
                            src={`https://picsum.photos/seed/${seed}/200/200`}
                            alt={title}
                            className="w-24 h-24 object-cover rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition"
                        />
                        <h3 className="mt-3 text-center text-gray-700 font-semibold hover:text-red-600 transition">
                            {title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}