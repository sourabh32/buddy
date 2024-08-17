import React from 'react'
import { getUserById } from '../../../actions/user.action'; 
import CourseCard from '../../../components/course/CourseCard'
import { Crown, Eye } from 'lucide-react';


function formatDate(timestamp:Date) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
const page = async ({params}:{params:{id :string}}) => {
    const user = await getUserById({id:params.id})
    
  return (
<div className=" border py-20 mx-auto p-4">
 
   
    <ProfileCard user={user} />
    
    
    
    
  



      

      <div className=" w-full  mt-8">
      <h2 className='my-5 text-3xl' >Courses</h2>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3' >
        
          {user.courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page









const ProfileCard = ({ user }) => {
  return (
    <div className="mx-auto p-4 bg-secondary text-textp rounded-lg shadow-md ">
      <div className="flex gap-10 items-center">
        {/* Profile Image */}
        <img
          className="w-24 h-24 rounded-full border-2 border-gray-700"
          src={user.image}
          alt="Profile"
        />
        <div className="">
          <div className="flex flex-col gap-1 ">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="w-full   flex gap-5 ">
  <span className='flex gap-2'>
    {user.followingCount}
    <span className='font-bold opacity-90'>Following</span>
  </span>
  <span className='flex gap-2'>
    {user.followersCount}
    <span className='font-bold opacity-90'>Followers</span>
  </span>
</div>
            {/* <div className=" flex gap-1 items-end justify-self-end  text-sm opacity-90  font-semibold"> <Calendar />Joined {formatDate(user.createdAt)}</div> */}
           <div className="flex gap-2">

        
            {user.isVerified ? (
              <div className=" mt-2  badge badge-success">verified</div>
            ):(<div className=" mt-2 badge badge-info">not verified</div>)}
             <div className=" mt-2 flex font-bold gap-2 badge badge-success"><Eye /> {user.profileView}</div>
             <div className=" mt-2  flex font-bold gap-2 badge badge-success"><Crown /> {user.reputation}</div>
             
             
           </div>
           
           
          </div>
         
       
        </div>
       
      </div>
   
<AdditionalInfoCard bio={user.bio} skills={user.skills} preferences={user.preferences} user={user} />  

     
     
      
  
    </div>
  );
};



const AdditionalInfoCard = ({ bio, skills, preferences }:{bio:string,skills:string[],preferences:string[]}) => {
  return (
    <div className="mx-auto my-10 h-full  p-4 bg-secondary text-text-p rounded-lg  ">
      <div className="mb-4">
        <h3 className="text-xl opacity-90 font-bold">Bio</h3>
        <p className="mt-2 ">{bio}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl opacity-90 font-bold">Skills</h3>
        <ul className="mt-2 ">
          {skills.map((skill, index) => (
            <li key={index} className="list-disc list-inside">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl opacity-90 font-bold">Preferences</h3>
        <p className="mt-2 ">{preferences}</p>
      </div>
    </div>
  );
};














