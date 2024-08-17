import { Link2, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
const CourseCard = ({course}) => {
  console.log(course.isLive)
  return (
<div
  key={course.id}
  className="card text-normal hover:scale-105 transition-all bg-base-200 duration-700 cursor-pointer shadow-xl"
  data-theme="dim"
>
  
  <figure>
    <img
      src={course.courseImage}
      alt={course.courseTitle}
      className="w-full h-48 object-cover"
    />
  </figure>
  <div className="p-5">
    <h2 className="font-bold text-ellipsis line-clamp-1">{course.courseTitle}</h2>
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
    <p className="text-sm opacity-80 line-clamp-2 text-ellipsis">
      {course.courseDescription}
    </p>
    



    <div className="flex gap-5 items-center justify-end mt-4">
      <div className="flex gap-2 text-primary items-center">
        <span className="text-primary text-md md:text-lg lg:text-xl font-bold">
          ₹{course.rentalPrice}
        </span>
        {" / "}
        <span className="text-sm ">
          {course.rentalDuration}
        </span>
      </div>
      <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm">
        View Course <LinkIcon />
      </Link>
    </div>
  </div>
</div>


  )
}

export default CourseCard