import { Card, CardHeader } from "../ui/card";

export const FeaturedProductsSection = ({ products, heading, icon: Icon }) => (
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{heading}</h2>
                {Icon && <Icon className="w-7 h-7 text-red-500" />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {products.map(({ id, name, image }) => (
                    <Card key={id} image={image}>
                        <CardHeader>{name}</CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    </section>
); 