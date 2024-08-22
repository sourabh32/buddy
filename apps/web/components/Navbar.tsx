"use client"
import { Menu, User, Bell, LogOut, LogIn, Handshake } from 'lucide-react'; // Import Lucide icons
import Image from 'next/image';
import NavLink from './navbar/NavLink';
import AuthButton from "./auth/AuthButton";



const Navbar = ({ session }) => {
 

  return (
    <div className="navbar bg-base-200 px-4 py-2">
      <div className="navbar-start">
       
        <a className="ml-4 flex gap-2 items-center text-xl font-bold">buddy <Handshake /></a>
      </div>

      <div className="navbar-center hidden lg:flex">
        
      <NavLink to={'/courses'} text={"courses"} />
      <NavLink to={'/conversations'} text={"conversations"} />
      <NavLink to={'/course/add'} text={"post course"} />
      </div>

      <div className="navbar-end">
        {session ? (
          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-circle">
              <Bell className="w-6 h-6" />
            </button>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <Image
                  src={session.user.image}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <a className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile
                  </a>
                </li>
                <li>
                    <AuthButton
                        type={"logout"} text={"log out"} />
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <AuthButton
              type={"login"} text={"sign in"} />
        )}
      </div>

      {/* Drawer for mobile navigation */}

          
    
    </div>
  );
};

export default Navbar;
