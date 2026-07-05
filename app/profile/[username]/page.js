import React from "react";
import Paymentpage from "@/app/components/Paymentpage";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export default async function Username({ params }) {
  
    const { username } = await params;
    await connectDb();
    console.log("this is your username", username);
    let u = await User.findOne({ username: username });
    console.log("database wala user",u)
    if (!u) {
      return(       
      <div className="text-white  flex justify-center items-center text-xl font-bold h-screen ">
        User not found
      </div>
    )
    }
  
  return (
    <>
      <Paymentpage />
    </>
  );
}
