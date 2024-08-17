"use client"
import { Filter, Search } from 'lucide-react';
import React from 'react';
// Assuming you have these icons

function CourseSearch({ query, setQuery, category, setCategory, filters, setFilters }) {
  const categories = [
    { name: 'all', value: 'all' },
    { name: 'web development', value: 'web development' },
    { name: 'app development', value: 'app development' },
    { name: 'machine learning', value: 'machine learning' },
    { name: 'blockchain development', value: 'blockchain development' },
  ];

  const handleCategoryClick = (categoryValue) => {
    setCategory(categoryValue);
  };

  return (
    <div data-theme="dim" className="flex flex-col gap-5 items-center  justify-between py-2 px-2">

      <div className="flex  space-x-2">
        <div className="relative">
          <Search className="absolute top-1 mr-1 right-0 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search courses..."
            className="input input-sm  input-ghost pr-4 py-1 rounded-full"
            value={query}
            onChange={(e) =>{
            console.log(e.target.value)
             setQuery(e.target.value)}}
          />
        </div>

      
        <button className="btn btn-sm rounded-full btn-outline" onClick={() => console.log(filters)}>
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>
      <div className="flex p-2 space-x-2 overflow-x-auto  scrollbar-hidden">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`btn btn-sm btn-outline rounded-full ${category === cat.value ? 'btn-accent' : ''}`}
            onClick={() => handleCategoryClick(cat.value)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CourseSearch;

