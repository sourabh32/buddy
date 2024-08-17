import React from 'react';

const DateTime = ({ name, label, error, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-1${error ? " text-red-500" : ""}`} htmlFor={name}>
        {label}
      </label>
      <input
      min={(new Date()).toISOString()}
        id={name}
        name={name}
        type="datetime-local"
        className={`input input-sm input-bordered w-full ${error ? "outline outline-error" : ""}`}
        onChange={onChange}
        value={value}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateTime;
