import React, { useState } from "react";
import { buildImageUrl } from "../../util/buildImageUrl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    image?: string;
    children: React.ReactNode;
    className?: string;
    disableImageFallback?: boolean;
}

export const Card = ({ image, children, className = "", disableImageFallback = false, ...props }: CardProps) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    const fallback = "/brand.icon.png";
    return (
        <div
            className={`rounded-lg bg-white shadow-md hover:shadow-md hover:shadow-red-300 transition-shadow duration-200 overflow-hidden flex flex-col ${className}`.trim()}
            {...props}
        >
            {image && !imgError ? (
                <>
                    <img
                        src={buildImageUrl(image)}
                        alt="Card visual"
                        className={`w-full h-56 object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                        style={{ display: imgLoaded ? "block" : "none" }}
                    />
                    {!imgLoaded && !disableImageFallback && (
                        <img
                            src={fallback}
                            alt="Fallback visual"
                            className="w-full h-56 object-cover animate-pulse bg-gray-100"
                        />
                    )}
                </>
            ) : (
                !disableImageFallback && (
                    <img
                        src={fallback}
                        alt="Fallback visual"
                        className="w-full h-56 object-cover bg-gray-100"
                    />
                )
            )}
            <div className="p-4 flex-1 flex flex-col justify-between">
                {children}
            </div>
        </div>
    );
};

export const CardHeader = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`font-medium text-gray-900 text-lg truncate mb-1 ${className}`.trim()} {...props}>
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
