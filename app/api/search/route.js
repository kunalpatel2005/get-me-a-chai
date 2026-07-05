import connectDb from "@/db/connectDb.js";
import User from "@/models/User"
import { NextResponse } from "next/server";

export async function GET(req){
    await connectDb();
    const{searchParams} = new URL(req.url);
    const query  = searchParams.get("query")?.trim();
    console.log("query",query)
    if(!query || query.trim()===""){
        return NextResponse.json([])
    }
    const user  = await User.find({
        username:{
            $regex:"^"+query,
            $options :"i"
        }
        // username:query
    }).select("username").limit(5).lean()
    console.log("user ye raha",user)
 
    return NextResponse.json(user);
}