import { Camera } from 'lucide-react';
import React from 'react';

const Input = ({ name, label, type = 'text', error, onChange, value, placeholder,icon }) => {
  return (
<div className="w-full" data-theme="dim">
  <label
    className={`text-md bg-primary font-medium px-3 py-1 rounded-full text-neutral max-w-fit flex gap-2 mb-5 items-center`}
    htmlFor={name}
  >
    {label}
    {icon} {/* Example icon */}
  </label>
  <input
    id={name}
    name={name}
    type={type}
    className={`input outline-primary-content input-sm input-bordered w-full ${
      error ? "outline outline-error" : ""
    }`}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  />
  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
</div>

  );
};

export default Input;
