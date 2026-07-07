import NextAuth from "next-auth";
import mongoose from "mongoose";
import User from "@/models/User.js";
import Payment from "@/models/Payment.js";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/db/connectDb.js";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("ye raha user tumhara:", user);
      if (account.provider == "github" || account.provider == "google") {
        dbConnect();

        //check if user already exist or not
        //  const currentuser = await client.db("user").collection("user").findOne({email:email})
        const currentuser = await User.findOne({ email: user.email });

        if (!currentuser) {
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
          });
          await newUser.save();

          // ye niche wali line isliye likhi he kyuki github me user ka name uski username he jo ki kunalpatel2005 he lekin agr mujhe "username" uski email me se likhwana he to mene jo database me username email se save kiya he use yaha likhdiya to ye name :kunalpatel2005 se name : kunalpatelklv ho jayega
          user.name = newUser.username;
          console.log("ye raha user tumhara changed:", user);
        } else {
          user.name = currentuser.username;
          console.log("ye raha user tumhara changed:", user);
        }
        return true;
      }
    },
    //session me bhi bhi hmne name kon change kiya taki hm cookie ke thorugh url me use kr sake . halaki cookie me name pehle se kunalpatelklv hi tha pr pata nhi code with harry ne kyu likhvaya
    async session({ session, user, token }) {
      console.log("session", session);
      const dbuser = await User.findOne({ email: session.user.email });
      session.user.name = dbuser.username;
      console.log("session changed", session);
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
