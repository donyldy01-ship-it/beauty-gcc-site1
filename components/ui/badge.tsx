import * as React from 'react';
export function Badge({ className='', ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${className}`} {...props} />;
}
export default Badge;
