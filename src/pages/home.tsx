import { Sparkles, Zap } from "lucide-react"
import { Banner } from "../components/banner"
import { BrandsSlider } from "../components/brandsMarquee"
import { Categories } from "../components/categories"
import { ProductList } from "../components/productsList"
import { TestimonialSection } from "../components/testimonialSection"
// Fake product data
const featuredProducts = [
    {
        id: 1,
        name: "Premium Coffee Maker",
        price: 129.99,
        image: "https://picsum.photos/400/300?random=1",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Stainless Steel Blender",
        price: 89.99,
        image: "https://picsum.photos/400/300?random=2",
        rating: 4.3,
        reviews: 95
    },
    {
        id: 3,
        name: "Smart Toaster Oven",
        price: 149.99,
        image: "https://picsum.photos/400/300?random=3",
        rating: 4.7,
        reviews: 203
    },
    {
        id: 4,
        name: "Electric Kettle",
        price: 45.99,
        image: "https://picsum.photos/400/300?random=4",
        rating: 4.2,
        reviews: 67
    }
];

const newArrivals = [
    {
        id: 5,
        name: "Air Fryer Pro",
        price: 179.99,
        image: "https://picsum.photos/400/300?random=5",
        rating: 4.8,
        reviews: 156
    },
    {
        id: 6,
        name: "Food Processor",
        price: 199.99,
        image: "https://picsum.photos/400/300?random=6",
        rating: 4.4,
        reviews: 89
    },
    {
        id: 7,
        name: "Stand Mixer",
        price: 299.99,
        image: "https://picsum.photos/400/300?random=7",
        rating: 4.9,
        reviews: 234
    },
    {
        id: 8,
        name: "Rice Cooker",
        price: 65.99,
        image: "https://picsum.photos/400/300?random=8",
        rating: 4.1,
        reviews: 45
    }
];

export const Home = () => {

    return (
        <main className="">
            <nav className="bg-red-50 border-t border-gray-100">
                <div className="container mx-auto px-4 py-2 flex justify-around flex-wrap gap-x-4 text-sm text-gray-700">
                    {[
                        'Store Locator',
                        'Terms & Conditions',
                        'Privacy Policy',
                        'Dishwasher',
                        'Kitchenware',
                        'Contact',
                        'About',
                    ].map((item) => (
                        <a
                            key={item}
                            href={'/' + item.toLowerCase().replace(/ & /, '-').replace(/\s+/g, '-')}
                            className="hover:text-red-600 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </nav>
            <Categories />
            <BrandsSlider />
            <div className="flex justify-center py-12">
                <video
                    className="w-[60%] rounded-md shadow-lg"
                    src="/intro.mp4"
                    autoPlay
                    muted
                >
                </video>
            </div>
            <ProductList data={featuredProducts} heading="Best Selling" showViewMore={false} icon={Zap} />
            <ProductList data={newArrivals} heading="New Arrivals" icon={Sparkles}/>
            <Banner />
            <TestimonialSection />
        </main>
    )
}