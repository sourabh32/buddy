import React from 'react';

const Select = ({ name, label, error,icon, onChange, value, options,description }) => {
  return (
    <div className="mb-4 w-full">
         <label className={` text-md font-medium bg-primary px-3 py-1 rounded-full text-base-100 max-w-fit flex gap-2  mb-5  items-center `} htmlFor={name}>
                {label}
                {icon} {/* Example icon */}
            </label>
  
      <select
        id={name}
        name={name}
        className={`select select-sm input-bordered w-full ${error ? "outline outline-error" : ""}`}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
