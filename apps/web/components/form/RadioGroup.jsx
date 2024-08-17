import React from 'react';

const ReusableRadioGroup = ({ options, name, value, onChange, label, error }) => {
  return (
    <div className=" w-full">
      <label className={`block text-lg font-medium mb-1${error ? " text-red-500" : ""}`} htmlFor={name}>
        {label}
      </label>
      <p className='mb-3 text-sm text-gray-600'>Where are you hiring for this role?</p>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="label flex gap-2 cursor-pointer">
            <span className="label-text">{option.label}</span>

            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="radio radio-sm radio-primary"
            />
          </label>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default ReusableRadioGroup;
