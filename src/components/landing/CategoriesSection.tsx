const categories = [
    {
        title: 'Offer Zone',
        imageUrl: 'https://dms.mydukaan.io/original/webp/media/c74f22ef-eaa2-404b-832c-7d43fc0c8d86.gif',
    },
    {
        title: 'Western',
        imageUrl: 'https://lighthousefnb.com/wp-content/uploads/2024/08/WBM-1080-T.png',
    },
    {
        title: 'Hoshizaki',
        imageUrl: 'https://www.hoshizaki-sea.com/wp-content/uploads/2024/11/4.-HW-320B-1.png',
    },
    {
        title: 'Dihr',
        imageUrl: 'https://www.scotsice.com.au/_images/_dihr/RX101E.jpg',
    },
    {
        title: 'Merrychef',
        imageUrl: 'https://www.pi-india.com/uploaded_files/ca424938a90417.png',
    },
    {
        title: 'Classeq',
        imageUrl: 'https://5.imimg.com/data5/IJ/IH/WD/SELLER-3836337/classeq-undercounter-dishwasher-for-pubs-1000x1000.jpg',
    },
];

export const CategoriesSection = () => (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                Shop by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
                {categories.map(({ title, imageUrl }) => (
                    <div key={title} className="flex flex-col items-center group cursor-pointer">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-24 h-24 object-cover rounded-2xl transform group-hover:scale-105 transition"
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
