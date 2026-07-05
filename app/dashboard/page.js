"use client"
import React, {useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Dashboard from '../components/dashboard';
 
const DashboardPage = () => {

  
  const{ data: session} = useSession();
 
  if(!session){
     const router = useRouter();
    router.push('/')
  }
  return (
   <Dashboard/>
 
  )
}

export default DashboardPage
