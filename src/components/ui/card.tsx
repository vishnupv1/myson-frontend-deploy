import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    image?: string;
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ image, children, className = "", ...props }: CardProps) => (
    <div
        className={`rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col ${className}`.trim()}
        {...props}
    >
        {image && (
            <img
                src={image}
                alt="Card visual"
                className="w-full h-56 object-cover"
            />
        )}
        <div className="p-4 flex-1 flex flex-col justify-between">
            {children}
        </div>
    </div>
);

export const CardHeader = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`font-bold text-gray-900 text-lg truncate mb-1 ${className}`.trim()} {...props}>
        {children}
    </div>
);

export const CardContent = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`mb-2 text-gray-700 ${className}`.trim()} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`mt-4 pt-2 border-t text-sm text-gray-500 flex items-center gap-2 ${className}`.trim()} {...props}>
        {children}
    </div>
);
