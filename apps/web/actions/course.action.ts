"use server"
import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth"; 
import { Course, Session } from "../types";
 export async function createCourse({formData}:{formData:Course}) {
  const session: Session | null = await getServerSession(authOptions);
console.log(formData)
  if (!session ||!session.user) {
    throw new Error("User must be authenticated to create a course");
  }
    try {
     
        const user = await prisma.user.findUnique({
            where: {
              email: session.user.email,
            },
          })
        if(!user) {return;}

      const newCourse = await prisma.course.create({
        data: {
          ownerId: user.id,
          courseTitle: formData.courseTitle,
          courseDescription: formData.courseDescription,
          rentalDuration: formData.rentalDuration,
          rentalPrice:formData.rentalPrice, 
          courseImage: formData.courseImage,
          courseUrl: formData.courseUrl,
        },
      });
      console.log(newCourse)
      return newCourse.id;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

export async function updateCourse({courseId,formData}:{courseId:string,formData:Course}) {
    try {
      const updatedCourse = await prisma.course.update({
        where: { id: courseId },
        data: {
          courseTitle: formData.courseTitle,
          courseDescription: formData.courseDescription,
          rentalDuration: formData.rentalDuration,
          rentalPrice: formData.rentalPrice, // Ensure rentalPrice is a float
          courseImage: formData.courseImage,
          courseUrl: formData.courseUrl,
        },
      });
      return updatedCourse;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }


  
  export async function fetchCourses({
    category,
    
  }: {
    category?: string;
   
  }) {
    try {
      const courses = await prisma.course.findMany({
        where: {
          category:category
        },
        // include: {
        //   owner: true,
        // },
      });
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  
  export async function fetchCourses2({
    category,
    query,
    language,
    isLive,
    courseType,
  }: {
    category?: string;
    query?: string;
    language?: string;
    isLive?: boolean;
    courseType?: string;
  }) {
    try {
      const courses = await prisma.course.findMany({
        where: {
          AND: [
            category ? { category } : {},
            query ? {courseTitle : { contains: query, mode: 'insensitive' } } : {},
            query ? { courseDescription: { contains: query, mode: 'insensitive' } } : {},
            language ? { language } : {},
            isLive !== undefined ? { isLive } : {},
            courseType ? { courseType } : {},
          ],
        },
        // include: {
        //   owner: true,
        // },
      });
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }
  


  export const fetchCourseById = async ({id}:{id:string})=>{
    try {

      const updatedCourse = await prisma.course.update({
        where: { id },
        data: {
          viewCount: {
            increment: 1,
          },
        },
        include: {
          user: {
            select: {
              id:true,
              email: true,
              name: true,
              image: true,
            },
          },
        },
      });
  
      return updatedCourse;
      
    } catch (error) {
      
    }
  }



  
  