"use client"
import React, { useState, useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import makeAnimated from 'react-select/animated';
import {createSkill, getQuerySkills} from '../../actions/skills.actions'
const fetchSkills = async () => {
  const response = await getQuerySkills({search:""});
  return response
};



const TechSkillsSelect = ({ onChange,selectedOptions,label,name,formError }) => {
  const [options, setOptions] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const animatedComponents = makeAnimated();
  const handleChange = (selected) => {
    console.log(selected)
    onChange(selected);
    
  };

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const skills = await fetchSkills();
        setOptions(skills.map(skill => ({ value: skill.id, label: skill.skill })));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadSkills();
  }, []);
  const handleCreate = async (inputValue) => {
    setLoading(true);
    try {
      const newSkill = await createSkill({skill:inputValue});
      const newOption = { value: newSkill.id, label: newSkill.skill };
 
      handleChange([...selectedOptions, newOption]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      resolve(filteredOptions);
    });

  return (
    <div>
        {label && <label className="block text-lg font-medium mb-1">{label}</label>}
        <p className='mb-3 text-sm text-gray-600'>role specific tech-stack (used to generte assignments)</p>
        
        {!loading && options.length === 0 && (
          <p className="text-gray-500">No skills found. Try searching for a skill.</p>
        )}
        
     
      <AsyncCreatableSelect
      name={name}
        components={animatedComponents}
        isMulti
        
        cacheOptions
        defaultOptions={options}
        loadOptions={promiseOptions}
        onChange={handleChange}
        onCreateOption={handleCreate}
        value={selectedOptions}
        isLoading={loading}
      />
       {error && <p className="text-red-500">{error}</p>}
       {formError && <p className="text-red-500">{formError}</p>}
    </div>
  );
};

export default TechSkillsSelect;
