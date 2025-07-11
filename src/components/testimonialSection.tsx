import { TestimonialCard } from "./ui/testimonialCard";

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

const shorts = [
    "https://www.youtube.com/embed/Oykd0KRA-nE",
    "https://www.youtube.com/embed/zJ4qwCebdoM",
    "https://www.youtube.com/embed/030abSG98Bw"
];

export const TestimonialSection = () => (
    <section className="px-20 py-12">
        <h2 className="text-3xl font-extrabold text-center mb-8 underline underline-offset-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((t, i) => (
                <TestimonialCard key={i} {...t} />
            ))}
        </div>
        <h3 className="text-2xl font-bold text-center mb-6">Watch Their Stories</h3>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {shorts.map((url, i) => (
                <div key={i} className="max-w-max md:w-1/3 h-full rounded-xl overflow-hidden shadow">
                    <iframe
                        width="337"
                        height="599"
                        src={url}
                        title="Merry chef #kitchen #dishwashers #home #food #kitchenappliances #automobile #icecubemachine #hotels"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    >
                    </iframe>
                </div>
            ))}
        </div>
    </section>
);
