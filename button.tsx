import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' | 'solid' };
export function Button({ className='', variant='solid', ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition';
  const solid = 'bg-black text-white hover:opacity-90';
  const outline = 'border border-gray-300 bg-white hover:bg-gray-50';
  const style = variant === 'outline' ? outline : solid;
  return <button className={`${base} ${style} ${className}`} {...props} />;
}
export default Button;
