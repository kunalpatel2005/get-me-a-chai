"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false);
  const router = useRouter();

  return (
    <nav className="text-white flex justify-between items-center py-1.5 px-2 bg-gradient-to-r from-[rgb(6,0,12)] to-[rgb(32,12,41)] flex-col md:flex-row gap-0.5 md:gap-0">
      <div
        className="logo text-lg font-bold cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        GetMeChai!!
      </div>
      {/* <ul className='flex gap-2'>
        <li>Home</li>
        <li>About</li>
        <li>Project</li>
        <li>SignUp</li>
        <li>SignIn</li>
        </ul> */}
      <div className="relative flex justify-center align-middle gap-2 items-center" >
        {session && (
          <>
          <Link href="/search" className=""> <lord-icon
             src="https://cdn.lordicon.com/yudxjmzy.json"
              trigger="hover"
              style={{
                width: "35px",
                height: "30px",
              }}
              className="top-[4px] font-bold "
            ></lord-icon></Link>
         
            <h2 className="inline md:text-2xl text-xl  ">Welcome</h2>
        
            <button
              id="dropdownDefaultButton"
              onClick={() => {
                setshowdropdown(!showdropdown);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setshowdropdown(false);
                }, 100);
              }}
              data-dropdown-toggle="dropdown"
              className="inline-flex cursor-pointer items-center justify-center text-white  shadow-xs font-medium  rounded-base text-sm px-4  focus:outline-none bg-gradient-to-br from-purple-230 to-blue-500 hover:bg-gradient-to-l   focus:ring-blue-950 dark:focus:ring-blue-800  rounded-2xl  py-1.5 text-center leading-5 mx-0.5 "
              type="button"
            >
              {session.user.email}
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[146px] top-[40px] bg-neutral-primary-medium border border-gray-900 rounded-b-lg shadow-lg w-44 bg-transparent`}
            >
              <ul
                className="p-2 text-sm text-body font-medium "
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center w-full p-2 my-0.5 hover:bg-neutral-500 hover:text-heading rounded bg-neutral-600"
                  >
                    Dashboard
                  </Link>
                </li>
               
                <li>
                  <Link
                    href={`/profile/${session.user.name}`}
                    className="inline-flex items-center w-full p-2 my-0.5 hover:bg-neutral-500 hover:text-heading rounded bg-neutral-600"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center w-full p-2 my-0.5  hover:bg-neutral-500 hover:text-heading rounded bg-neutral-600"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>{" "}
          </>
        )}
        {/* {session &&  <Link href={"/dashboard"}>
           <button  className='bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-blue-950 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-4 py-1.5 text-center leading-5 mx-0.5' >Dashboard</button>
           </Link>}
           {session &&  
           <button  className='bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-blue-950 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-4 py-1.5 text-center leading-5 mx-0.5' onClick={()=>{
            signOut()
           }}>logout</button>
           } */}
        {!session && (
          <Link href={"/login"}>
            <button className="bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-blue-950 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-4 py-1.5 text-center leading-5 mx-0.5">
              login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
