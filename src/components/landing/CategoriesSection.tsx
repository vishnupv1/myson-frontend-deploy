import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const categories = [
    {
        title: 'Offer Zone',
        imageUrl: 'https://dms.mydukaan.io/original/webp/media/c74f22ef-eaa2-404b-832c-7d43fc0c8d86.gif',
        brandId: null,
    },
    {
        title: 'Western',
        imageUrl: 'https://lighthousefnb.com/wp-content/uploads/2024/08/WBM-1080-T.png',
        brandId: '6875e4fa935282540f89f056',
    },
    {
        title: 'Hoshizaki',
        imageUrl: 'https://www.hoshizaki-sea.com/wp-content/uploads/2024/11/4.-HW-320B-1.png',
        brandId: '6875e3e7935282540f89f007',
    },
    {
        title: 'Dihr',
        imageUrl: 'https://www.scotsice.com.au/_images/_dihr/RX101E.jpg',
        brandId: '6877b5f926411edca3952a65',
    },
    {
        title: 'MerryChef',
        imageUrl: '/merrychef.prod.png',
        brandId: '6877b9c526411edca3952c03',
    },
    {
        title: 'Hatco',
        imageUrl: '/hatco.prod.png',
        brandId: '6877c1f026411edca3952f24',
    },
]

export const CategoriesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider({
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: categories.length, spacing: 16 },
                disabled: true,
            },
        },
        slides: {
            perView: 2,
            spacing: 16,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
    })

    const navigate = useNavigate();

    const handleCategoryClick = (brandId: string | null) => {
        if (brandId) {
            navigate(`/products?brand=${brandId}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100"  id="categories">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                    Shop by Category
                </h2>
                <div ref={sliderRef} className="keen-slider md:grid md:grid-cols-6 md:gap-8">
                    {categories.map(({ title, imageUrl, brandId }, i) => (
                        <div
                            key={title}
                            className="keen-slider__slide md:flex md:flex-col md:items-center group cursor-pointer"
                            onClick={() => handleCategoryClick(brandId)}
                        >
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-24 h-24 object-cover rounded-2xl transform group-hover:scale-105 transition mx-auto"
                            />
                            <h3 className="mt-3 text-center text-gray-700 font-semibold group-hover:text-red-600 transition">
                                {title}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6 md:hidden">
                    {Array.from({ length: categories.length - 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => instanceRef.current?.moveToIdx(idx)}
                            className={`w-2.5 h-1.5 rounded-full mx-1 ${currentSlide === idx ? 'bg-gray-900 w-4' : 'bg-gray-300'} transition-all`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
