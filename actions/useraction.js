"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb.js";
import User from "@/models/User"
import { NextResponse } from "next/server";

export const initiate = async (amount ,to_username,paymentform)=>{
    await connectDb()
      let user = await User.findOne({username:to_username})
        const secret = user.razerpaysecret
        const id= user.razorpayid
    var instance = new Razorpay({key_id:id, key_secret:secret})
    console.log("keyid:",process.env.KEY_ID)
console.log(process.env.KEY_SECRET)
    // await instance.orders.create({
    //     amount:50000,
    //     currency:"INR",
    //     receipt:"receipt#1",
    //     notes:{
    //         key1:"value3",
    //         kay2:"value2"
    //     }
    // })
    let options = {
        
        amount:Number.parseInt(amount)*100,
        currency:"INR",
    }
    let x;
    try{
     x = await instance.orders.create(options)
    console.log(x)
    }catch(err){
        console.log("ye error aa eahi he order create krne me",err)
       throw new Error("Order creation failed")
    }
    // create a payment object which shows the pending payment in database
        await Payment.create({oid: x.id,amount:amount,to_user:to_username, name:paymentform.name,message:paymentform.message})
    return x
}
export const fetchuser = async (username)=>{
    await connectDb()
    let u  = await User?.findOne({username:username})
    let user= u.toObject({flattenObjectIds:true})
    return user
}
export const fetchpayments = async (username)=>{
    await connectDb()
    //find all payment sorted by decreasing order of amount and flatten
    let p = await Payment.find({to_user:username , done:true}).sort({ createdAt: -1 }).limit(10).lean()
    return p
}
export const updateprofile = async(data , oldusername)=>{
    await connectDb();
    let ndata = Object.fromEntries(data)
    //if the username is being updated check if the username is available
    if(oldusername !== ndata.username){
        let u = await User.findOne({username:ndata.username})
        if(u){
            return {error:"username already exist"}
        }
    }
    await User.updateOne({email:ndata.email},ndata)
    await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
}

