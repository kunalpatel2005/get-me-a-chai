"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateprofile, fetchuser } from "@/actions/useraction";
import { ToastContainer, toast,Bounce } from 'react-toastify';
const Dashboard = () => {
  const [form, setform] = useState({});
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    getdata();
  }, [router, session]);

  const getdata = async () => {
    let u = await fetchuser(session.user.name);
    setform(u);
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    update();
    await updateprofile(e, session.user.name);
    toast('Profile Updated', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
  };
  return (


    <div className="container mx-auto md:py-5 py-4 ">
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      <h1 className="text-center my-5 md:text-3xl text-2xl font-bold">
        Welcome To Dashboard
      </h1>
      <form className="md:max-w-2xl max-w-full px-5 mx-auto" action={handlesubmit}>
        <div className="my-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            value={form.name ? form.name : ""}
            onChange={handlechange}
            name="name"
            id="name"
            className="block md:w-full w-[90%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="my-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            value={form.email}
            onChange={handlechange}
            name="email"
            id="email"
            className="block md:w-full w-[90%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="my-2">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={handlechange}
            name="username"
            id="username"
            className="block md:w-full w-[90%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="my-2">
          <label
            htmlFor="profilepic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Profile Pic
          </label>
          <input
            type="text"
            value={form.profilepic}
            onChange={handlechange}
            name="profilepic"
            id="profilepic"
            className="block md:w-full w-[90%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="coverpic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cover Photo
          </label>
          <input
            type="text"
            value={form.coverpic}
            onChange={handlechange}
            name="coverpic"
            id="coverpic"
            className="block md:w-full w-[90%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="razorpayid"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Razerpay ID
          </label>
          <input
            type="text"
            value={form.razorpayid}
            onChange={handlechange}
            name="razorpayid"
            id="razorpayid"
            className="block md:w-full w-[90%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="razerpaysecret"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Razerpay Secret
          </label>
          <input
            type="text"
            value={form.razerpaysecret}
            onChange={handlechange}
            name="razerpaysecret"
            id="razerpaysecret"
            className="block md:w-full w-[90%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-6">
          <button
            type="submit"
            className="block md:w-full w-[90%] text-white bg-blue-600 rounded-lg font-medium text-sm p-1.5 hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  
  )

};

export default Dashboard;
