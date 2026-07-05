"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
  const{data:session}= useSession()
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[45vh] gap-1.5">
        <div className="font-bold text-white text-lg flex flex-col items-center text-center gap-1">
          <p>Buy A Chai For Me</p>
          <span className="hover:animate-bounce">
            <img
              src="	https://img1.picmix.com/output/stamp/normal/9/4/0/1/2451049_ff79b.gif"
              alt=""
              width={44}
            />
          </span>
        </div>
        <p className="text-sm px-2 md:px-0 text-center">
         
          A crowd fumding plateform for creators. Get funded by your fans and
          followers
        </p>
        <div className="mt-6 flex gap-3">
          <Link href={session ? `/profile/${session.user.name}` : "/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-t focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-400 font-medium rounded-2xl text-sm px-4 py-2.5 text-center leading-5"
            >
              Start Now{" "}
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-t focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-400 font-medium rounded-2xl text-sm px-4 py-2.5 text-center leading-5"
            >
              Read more{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className=" h-[2px] w-full flex justify-center">
        {" "}
        <span className="bg-white w-[75%] opacity-10"></span>
      </div>
      <div className="text-white container mx-auto py-5 ">
        <h1 className="md:text-2xl text-xl font-bold text-center md:my-12 my-9">
          Your Fans Can Buy You a Chaiii
        </h1>
        <div className="flex gap-5 justify-around ">
          <div className=" flex justify-center items-center flex-col space-y-3 ">
            <img
              src="https://img1.picmix.com/output/stamp/normal/6/6/2/8/1618266_50d48.gif"
              alt=""
              width={50}
              className="bg-gray-400 rounded-full md:w-[90px] md:h-[90px] w-[75px] h-[75px]"
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center md:text-lg text-sm">
              {" "}
              your fans are available for you to help you
            </p>
          </div>
          <div className="flex justify-center items-center flex-col space-y-3">
            <img
              src="https://cdn.business2community.com/wp-content/uploads/2013/08/2-steP7iI4AA8-8Hh_Xy0oCyh-kFLsyEpqOEICRHVvkOgqRn1Jt5GqNnRt-nQH5EAX0EgVCK2LTn2t_umha14qxerEUUSWI1LDortNLS6wiOgCuK3HRPHXO.gif"
              alt=""
              width={88}
              className="bg-gray-400  rounded-full md:w-[90px] md:h-[90px] w-[75px] h-[75px]"
            />
            <p className="font-bold text-center">community fund</p>
            <p className="text-center md:text-lg text-sm">
              {" "}
              your fans are available for you to help you
            </p>
          </div>
          <div className=" flex justify-center items-center flex-col space-y-3">
            <img
              src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif"
              alt=""
              width={88}
              className="bg-gray-400  rounded-full md:w-[90px] md:h-[90px] w-[75px] h-[75px]"
            />
            <p className="font-bold text-center">Fund Yourself for future</p>
            <p className="text-center md:text-lg text-sm">
              {" "}
              your fans are available for you to help you
            </p>
          </div>
        </div>
      </div>
      <div className=" h-[2px] w-full flex justify-center">
        {" "}
        <span className="bg-white w-[75%] opacity-10"></span>
      </div>
      <div className="text-white container mx-auto py-3 ">
        <h1 className="md:text-2xl text-xl font-bold text-center my-14">
          Learn More About Us
        </h1>
      </div>
    </>
  );
}
