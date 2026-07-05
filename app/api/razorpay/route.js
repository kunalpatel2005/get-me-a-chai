import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
export const POST = async (req)=>{
    await connectDB();
   let body = await req.formData();
   body = Object.fromEntries(body);
    
    //cheack if razorpay order id is present on the server or not
    
    let p = await Payment.findOne({oid:body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success:false,message:"order Id not found"})
    }
    let user = await User.findOne({username:p.to_user})
    const secret = await user.razerpaysecret
    console.log("ye rahi razorpay wali body:",body)
    let xx =  validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id,},body.razorpay_signature,secret)
    if(xx){
        const updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new :true})
        return NextResponse.redirect(`http://localhost:3000/profile/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success:false,message:"payment verification failed"})
    }
}