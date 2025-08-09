import * as React from 'react';
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-amber-200 ${props.className||''}`} />;
}
export default Input;
