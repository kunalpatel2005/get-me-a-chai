"use client"
import React from 'react'
import{ useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";


const SearchPage = () => {
  const {data:session,status}=useSession()
  const router = useRouter();
  
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
          router.push("/login");
        }
      }, [session, status, router]);
    
    // const{ data: session} = useSession();
   
    // if(!session){
    //    const router = useRouter();
    //   router.push('/')
    // }
  const [search, setsearch] = useState("")
  const [user, setuser] = useState([])
  const [loading, setloading] = useState(false)

  const handlechange= async (e)=>{
   setsearch(e.target.value)
    
  }
  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("search",search.length)
      if(!search){
        setuser([])
        setloading(true)
        return
      }
      setloading(true)
       const res = await fetch(`/api/search?query=${search}`)
       console.log("res",res)
      const data = await res.json()
      console.log("search ki body ka data",data)
      setuser(data);
      setloading(false)
    }, 300);
    return ()=>clearTimeout(timer)
  }, [search])
  
  return (<>
    <div className=''>
      <div className='w-full flex justify-center'>
        <form action="" className='flex justify-center  w-[70%]'>
          <input value={search} onChange={handlechange} type="text" placeholder='search user' className='w-full my-12 bg-slate-500/50 text-white rounded-2xl p-3' />
        </form>
      </div>
      <div className='w-full flex justify-center flex-col items-center '>
       {
        !loading && search && user.length ===0 &&( <p> no user found</p>)}
       
      { user.map((userr)=>{
         return(
              <div className=' w-[70%] bg-gray-200/10 p-1.5 rounded-2xl px-4 my-1 flex'  key={userr._id}>
                    <span className=' w-full flex'>
                      <Link href={`/profile/${userr.username}`} className='w-full '>{userr.username}</Link>
                    </span>
             </div>

          )
        }

        )
       }
      </div>
    </div>
    </>
  )

}

export default SearchPage
