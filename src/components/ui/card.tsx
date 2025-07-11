import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "", ...props }: CardProps) => (
  <div
    className={
      `rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg ${className}`.trim()
    }
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }: CardProps) => (
  <div className={`p-4 font-normal text-lg ${className}`.trim()} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "", ...props }: CardProps) => (
  <div className={`mb-2 text-gray-700 ${className}`.trim()} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "", ...props }: CardProps) => (
  <div className={`mt-4 pt-2 border-t text-sm text-gray-500 ${className}`.trim()} {...props}>
    {children}
  </div>
);
