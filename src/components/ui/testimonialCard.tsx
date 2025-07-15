import { Card, CardContent, CardHeader, CardFooter } from "./card";

export interface TestimonialCardProps {
    name: string;
    text: string;
}

export const TestimonialCard = ({ name, text }: TestimonialCardProps) => (
    <Card className="flex flex-col items-center text-center p-2 mx-2 my-4 hover:shadow-md" disableImageFallback={true}>
        <CardHeader className="text-xl font-semibold mb-2">{name}</CardHeader>
        <CardContent className="italic text-gray-700 mb-2 min-h-16">"{text}"</CardContent>
        <CardFooter className="text-xs text-gray-500">Google reviews</CardFooter>
    </Card>
);
