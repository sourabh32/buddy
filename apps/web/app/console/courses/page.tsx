
import React from 'react';

import { fetchCourses } from '../../../actions/course.action';

import CoursesPage from '../../../components/pages/CoursePage';
// import prisma from '../../prisma/prisma';
// import { fetchCourses } from '../../actions/course.actions';


 async function CourseList() {
  
  const courses = await fetchCourses({category:"all"})
  return (
    <CoursesPage initialCourses={courses}  />

  );
}

export default CourseList;







