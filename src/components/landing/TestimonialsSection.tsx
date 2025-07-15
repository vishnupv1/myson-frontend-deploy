import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { TestimonialCard } from "../ui/testimonialCard";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";

const testimonials = [
    {
        name: "sherel Thomas",
        text: "Its really a good place to choose your kitchen."
    },
    {
        name: "abhilash kuriako",
        text: "Its wonderful experience and professional deal ..."
    },
    {
        name: "RAM",
        text: "Best hotel equipment supplier dealer in kochi and thrisur."
    },
    {
        name: "Indra",
        text: "They have all kitchen utensils on reasonable price."
    },
    {
        name: "Abin thomas",
        text: "Very efficient employees and the most pleasant thing was the amount of time saved in the installation process. quick and speedy."
    },
    {
        name: "A Google user",
        text: "Nice place..lots of kitchen equipment Very friendly sales team and staff Went for a demo today Over all very good"
    },
    {
        name: "A Google user",
        text: "Limited Display Only Available, Good Staff, Located Conveniently."
    }
];

const shorts = [
    {
        src: "https://www.youtube.com/embed/Oykd0KRA-nE",
        title: "Testimonial Video 1",
    },
    {
        src: "https://www.youtube.com/embed/zJ4qwCebdoM",
        title: "Testimonial Video 2",
    },
    {
        src: "https://www.youtube.com/embed/030abSG98Bw",
        title: "Testimonial Video 3",
    },
];

export const TestimonialsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            breakpoints: {
                "(min-width: 768px)": {
                    slides: { perView: 3, spacing: 16 },
                },
            },
            slides: { perView: 1, spacing: 16 },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            }
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false

                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 1500)
                }

                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )

    // Shorts carousel for mobile only
    const [shortsCurrent, setShortsCurrent] = useState(0);
    const [shortsRef, shortsInstanceRef] = useKeenSlider(
        {
            loop: true,
            slides: { perView: 1, spacing: 12 },
            breakpoints: {
                "(min-width: 768px)": {
                    slides: { perView: shorts.length, spacing: 24 },
                    disabled: true,
                },
            },
            drag: true,
            slideChanged(slider) {
                setShortsCurrent(slider.track.details.rel);
            },
        }
    );

    return (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>

                <div ref={sliderRef} className="keen-slider mb-12 py-4 testimonials-mask-fade-x">
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

                {/* Shorts carousel for mobile, static row for md+ */}
                <div className="block md:hidden">
                    <div ref={shortsRef} className="keen-slider testimonials-shorts-carousel">
                        {shorts.map((short, idx) => (
                            <div key={idx} className="keen-slider__slide flex justify-center">
                                <div className="w-[90vw] max-w-xs aspect-[9/16] max-h-[80vh] rounded-xl overflow-hidden shadow bg-black">
                                    <iframe
                                        src={short.src}
                                        title={short.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between py-4 px-10 mb-12">
                        <button
                            onClick={() => shortsInstanceRef.current?.prev()}
                        >
                            <LucideArrowLeft size={18} strokeWidth="1.5" stroke="grey"/>
                        </button>
                        <button
                            onClick={() => shortsInstanceRef.current?.next()}
                        >
                            <LucideArrowRight size={18} strokeWidth="1.5" stroke="grey"/>
                        </button>
                    </div>
                </div>
                <div className="hidden md:flex gap-6 justify-center items-center">
                    {shorts.map((short, idx) => (
                        <div key={idx} className="w-[280px] h-[500px] rounded-xl overflow-hidden shadow bg-black">
                            <iframe
                                src={short.src}
                                title={short.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
