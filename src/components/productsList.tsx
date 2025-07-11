import { Card, CardHeader } from "./ui/card";
// import { LucideArrowRight, type LucideIcon } from "lucide-react";

export interface Product {
    id: number;
    name: string;
    image: string;
}

interface ProductListProps {
    data: Product[];
    heading: string;
    showViewMore?: boolean;
    icon?: React.ReactNode;
}

export const ProductList = ({ data, heading, showViewMore = true, icon: Icon }: ProductListProps) => {
    return (
        <section className="px-16 py-14">
            <div className="flex items-center justify-center gap-3 mb-6">
                <h2 className="text-3xl font-extrabold text-gray-800 underline underline-offset-4">
                    {heading}
                </h2>
                {Icon && Icon}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {data.map(({ id, name, image }) => (
                    <Card key={id} image={image}>
                        <CardHeader>{name}</CardHeader>
                    </Card>
                ))}
            </div>

            {showViewMore && (
                <div className="mt-8 text-center">
                    <button className="px-6 py-2 inline-flex gap-2 bg-red-400 text-white text-lg rounded-full hover:bg-red-700 transition cursor-pointer">
                        More Products
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="inline-block align-middle"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}
        </section>
    );
};
