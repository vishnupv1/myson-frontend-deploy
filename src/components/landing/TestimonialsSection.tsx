import { TestimonialCard } from "../ui/testimonialCard";

const testimonials = [
    {
        name: "Amit Sharma",
        text: "Myson made my kitchen upgrade so easy! Highly recommended.",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        company: "Homeowner, Delhi"
    },
    {
        name: "Priya Singh",
        text: "Great service and fast delivery. The best appliance store online!",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        company: "Chef, Mumbai"
    },
    {
        name: "Rahul Verma",
        text: "Excellent support and top brands. Will shop again!",
        avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg",
        company: "Restaurateur, Bangalore"
    }
];

export const TestimonialsSection = () => (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <TestimonialCard key={i} {...t} />
                ))}
            </div>
        </div>
    </section>
); 