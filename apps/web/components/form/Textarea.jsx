import React from 'react';

const Textarea = ({ name, label,icon, error, onChange, value, placeholder,description }) => {
  return (
    <div className="mb-4 w-full">
        <label className={` text-md font-medium bg-primary px-3 py-1 rounded-full text-neutral max-w-fit flex gap-2  mb-5  items-center `} htmlFor={name}>
                {label}
                {icon} {/* Example icon */}
            </label>
      {/* <p className='mb-3 text-sm text-gray-600'>{description}</p> */}
      <textarea
         rows={8}
        id={name}
        name={name}
        className={`textarea   textarea-bordered w-full ${error ? "outline outline-error" : ""}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;
