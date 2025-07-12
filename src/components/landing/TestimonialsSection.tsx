import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import { TestimonialCard } from "../ui/testimonialCard"

const testimonials = [
    {
        name: "Amit Sharma",
        text: "Myson made my kitchen upgrade so easy! Highly recommended.",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        company: "Homeowner, Delhi",
    },
    {
        name: "Priya Singh",
        text: "Great service and fast delivery. The best appliance store online!",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        company: "Chef, Mumbai",
    },
    {
        name: "Rahul Verma",
        text: "Excellent support and top brands. Will shop again!",
        avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg",
        company: "Restaurateur, Bangalore",
    },
    {
        name: "Anjali Mehta",
        text: "A seamless experience from order to delivery. Truly impressed!",
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
        company: "Baker, Pune",
    },
    {
        name: "Karan Patel",
        text: "Reliable appliances and excellent support team. Would recommend.",
        avatarUrl: "https://randomuser.me/api/portraits/men/72.jpg",
        company: "Caterer, Ahmedabad",
    },
]



export const TestimonialsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 3, spacing: 16 },
            },
        },
        slides: { perView: 1, spacing: 16 },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
    })


    return (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>

                <div ref={sliderRef} className="keen-slider mb-12 py-4 mask-fade-x">
                    {testimonials.map((t, i) => (
                        <div key={i} className="keen-slider__slide">
                            <TestimonialCard
                                {...t}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mb-12">
                    {Array.from({ length: testimonials.length }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => instanceRef.current?.moveToIdx(idx)}
                            className={`w-2.5 h-1.5 rounded-full mx-1 transition-all duration-300 ${currentSlide === idx ? "bg-gray-900 w-4" : "bg-gray-300"}`}
                        />
                    ))}
                </div>

                <h3 className="text-2xl font-bold text-center mb-6">Watch Their Stories</h3>

                <div className="flex gap-6 justify-center items-center">
                    <div className="w-[280px] h-[500px] rounded-xl overflow-hidden shadow">
                        <iframe
                            src="https://www.youtube.com/embed/Oykd0KRA-nE"
                            title="Testimonial Video 1"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="w-[280px] h-[500px] rounded-xl overflow-hidden shadow hidden sm:inline-flex">
                        <iframe
                            src="https://www.youtube.com/embed/zJ4qwCebdoM"
                            title="Testimonial Video 2"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="w-[280px] h-[500px] rounded-xl overflow-hidden shadow hidden md:inline-flex">
                        <iframe
                            src="https://www.youtube.com/embed/030abSG98Bw"
                            title="Testimonial Video 3"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
} 
