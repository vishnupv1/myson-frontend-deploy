import { Card, CardContent, CardHeader, CardFooter } from "./card";

export interface TestimonialCardProps {
  name: string;
  text: string;
  avatarUrl?: string;
  company?: string;
}

export const TestimonialCard = ({ name, text, avatarUrl, company }: TestimonialCardProps) => (
  <Card className="flex flex-col items-center text-center p-6">
    {avatarUrl && (
      <img
        src={avatarUrl}
        alt={name}
        className="w-16 h-16 rounded-full mb-4 object-cover border"
      />
    )}
    <CardHeader className="text-xl font-semibold mb-2">{name}</CardHeader>
    <CardContent className="italic text-gray-700 mb-2">"{text}"</CardContent>
    {company && <CardFooter className="text-xs text-gray-500">{company}</CardFooter>}
  </Card>
);
