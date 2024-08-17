"use client";
import { useState, useEffect } from 'react';
import CourseSearch from '../form/CourseSearch';
import CourseCard from '../course/CourseCard';
import { fetchCourses2 } from '../../actions/course.action';
import { Course } from '../../types';

function CoursesPage({ initialCourses }:{initialCourses:Course[]}) {
  const [courses, setCourses] = useState(initialCourses);
  const [query, setQuery] = useState(''); // For search query
  const [filters, setFilters] = useState({
    courseType: "self-paced",
    language: "hindi",
    isLive: false
  }); // For additional filters like price, duration
  const [category, setCategory] = useState(''); // For course categories
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to fetch filtered courses
  const fetchFilteredCourses = async () => {
    setLoading(true);
    try {
      const filteredCourses = await fetchCourses2({
        isLive: filters.isLive,
        category,
        query,
        language: filters.language,
        courseType: filters.courseType
      });
      console.log(filteredCourses)
      setCourses(filteredCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch function
  const debouncedFetch = () => {
    // Clear the previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Set a new timeout
    const newTimeout = setTimeout(() => {
      fetchFilteredCourses();
    }, 500); // Adjust delay as needed

    // Update the state with the new timeout ID
    setDebounceTimeout(newTimeout);
  };

  // Effect to trigger debounced fetch when query, filters, or category change
  useEffect(() => {
    debouncedFetch();

    // Cleanup function to clear timeout on component unmount or dependencies change
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [query, filters, category]);

  return (
    <div className="p-5 w-full min-h-full bg-base-100 text-base-100">
      <CourseSearch 
        filters={filters} 
        setFilters={setFilters} 
        category={category} 
        setCategory={setCategory}  
        setQuery={setQuery} 
        query={query}
      />
      <h1 className='bg-secandory'>hello</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {courses.length > 0 && courses.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
