
import { Eye, ViewIcon } from "lucide-react"
import { fetchCourseById,fetchCourses } from "../../../actions/course.action" 
import CreateChat from "../../../components/chat/CreateChat"
import Link from "next/link"
import CourseCard from "../../../components/course/CourseCard"
const page = async ({params}:{params:any}) => {
  const course = await fetchCourseById({id:params.id})
  console.log(course)
  const courses = await fetchCourses({category:"all"})
  console.log(courses)
  return (
    <div className=" mx-auto pb-10 p-4">
       {
        course && (<div className="flex flex-col p-4 sm:p-6 bg-base-300 text-base-content rounded-lg shadow-lg">
          {/* Course Image and Title */}
         
          <div className="flex sm:flex-row flex-col gap-6 ">
            <div className="w-full sm:w-[50%]">

           
            <img
              className="w-full  h-[30vh] object-cover rounded-lg shadow-md border border-neutral-focus"
              src={course?.courseImage}
              alt="Course"
            />
             </div>
            <div className="flex w-full sm:w-[50%] gap-5 flex-col">
            <div className="flex items-center gap-5">
              <h2 className="text-4xl  font-bold mb-2">{course.courseTitle}</h2>
             
            </div>
            <div className="flex gap-3">
            <div className="badge badge-solid font-bold badge-accent text-sm py-1 px-3 rounded-full">
                {course.category}
              </div>
              <div className="badge badge-solid font-bold badge-accent text-sm py-1 px-3 rounded-full">
            {course.isLive ? "ongoing":"recorded"}
              </div>
              <div className="badge badge-solid font-bold badge-accent text-sm py-1 px-3 rounded-full">
                {course.courseType}
              </div>
              <div className="badge badge- font-bold badge-accent text-sm py-2 px-3 rounded-full">
                {course.language}
              </div>
            </div>
            <CreateChat recipientId={course.ownerId} />
          </div>

            </div>
           
        
          {/* Course Details */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-primary">
                <span className="text-2xl font-bold">₹{course.rentalPrice}</span>
                <span className="text-sm text-secondary"> / {course.rentalDuration}</span>
              </div>
              <div className="text-sm flex gap-2 items-center text-gray-400">
                <Eye /> {course.viewCount}
              </div>
            </div>
        
            <p className="leading-relaxed mb-6 h-24 overflow-y-auto">{course.courseDescription}</p>
        
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Posted by</p>
                <Link href={`/user/${course.user.id}`}>
                  <span className="font-semibold flex items-center text-primary hover:underline cursor-pointer">
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={course?.user?.image}
                      alt="Owner"
                    />
                    {course.user.name}
                  </span>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
        
        )
       }
     

     {
      course?.category && ( <div className="mt-8">
        <h3 className="text-4xl font-bold mb-4">similar courses related to <span className="underline text-accent">{course.category}</span></h3>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        { courses.length>0 && courses.map(course => (
        <CourseCard course={course} />
        ))}
      </div>

      </div>)
     }
     
    </div>
  )
}

export default page