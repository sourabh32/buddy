import React from 'react'

const CheckBox = ({label,name,error,icon,checked,onChange}:{label:string,name:string,error:string | null,icon:React.ReactNode,checked:boolean,onChange:(boolean)=>null}) => {
  return (
    <div className="w-full">
  <label className="text-md font-medium bg-primary px-3 py-1 rounded-full text-neutral max-w-fit flex gap-2 mb-5 items-center" htmlFor={name}>
    {label}
    {icon} {/* Example icon */}
    <input
    id={name}
    name={name}
    type="checkbox"
    className={`checkbox checkbox-accent ${error ? "outline outline-error" : ""}`}
    onChange={onChange}
    checked={checked}
  />
  </label>

  
  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
</div>

  )
}

export default CheckBox