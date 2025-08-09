import * as React from 'react';
export function Card({ className='', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`border rounded-xl bg-white ${className}`} {...props} />;
}
export function CardHeader({ className='', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-4 pt-4 ${className}`} {...props} />;
}
export function CardTitle({ className='', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <h3 className={`font-semibold ${className}`} {...props} />;
}
export function CardContent({ className='', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-4 pb-4 ${className}`} {...props} />;
}
export default Card;
