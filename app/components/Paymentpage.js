"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Script from "next/script";
import { fetchpayments, initiate, fetchuser } from "@/actions/useraction";
import { ToastContainer, toast,Bounce } from 'react-toastify';
const Paymentpage = () => {
  const {data:session,status}=useSession()
   const router = useRouter();
    console.log("profile wala session", session);
    console.log("status:", status);
    useEffect(() => {
      if (status === "loading") return;
      if (!session) {
        router.push("/login");
      }
    }, [session, status, router]);
  
  const [currentuser, setcurrentuser] = useState({});
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [payments, setpayments] = useState([]);

  const getdata = async () => {
    let u = await fetchuser(params.username);
    setcurrentuser(u);
    let dbpayments = await fetchpayments(params.username);
    setpayments(dbpayments);
  };
  useEffect(() => {
    getdata();
    //     toast('Profile Updated', {
    // position: "top-right",
    // autoClose: 2000,
    // hideProgressBar: false,
    // closeOnClick: false,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
    // theme: "light",
    // transition: Bounce,
    // });
     }, []);

  const params = useParams();
  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    let a = await initiate(amount, params.username, paymentform);
    let orderId = a.id;
    var options = {
      "key":currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits.
      "currency": "INR",
      "name": "Buy me a chai", //your business name
     "description": "Test Transaction",
      "image": "https://example.com/your_logo",
     "order_id": orderId, // This is a sample Order ID. Pass the id obtained in the response of Step 1
      "callback_url": `${process.env.CALLBACK_URL}/api/razorpay`,
      "prefill": {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210", //Provide the customer's phone number for better conversion rates
      },
      "notes": {
       "address": "Razorpay Corporate Office",
      },
      "theme": {
        "color": "#3399cc",
      }
    }

    var rzp1 = new Razorpay(options);
    rzp1.open();
 
  };
  return (
    <>
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="relative w-full">
        {currentuser.coverpic? (
          <img
            className="object-cover md:w-full md:h-[327px] h-[200px]"
            src={currentuser.coverpic}
            alt=""
          />
        ):(
           <div className="object-cover md:w-full md:h-[327px] h-[200px]  flex justify-center items-center bg-gray-950/40 border-2 border-dashed border-gray-500/50 text-gray-500">
            upload cover pic
           </div>
        )
        }


        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
        {
          currentuser.profilepic?(
        
          <img
            src={currentuser.profilepic}
            className="md:w-[100px] md:h-[100px] w-[90px] h-[90px] rounded-full border-2 border-white object-cover"
            width={110}
            height={110}
            alt="not uplaoded"
          />):(
          <img
            src="https://img.freepik.com/premium-photo/white-cat-black-background_850997-153.jpg"
            className="md:w-[100px] md:h-[100px] w-[90px] h-[90px] rounded-full border-2 border-white object-cover"
            width={110}
            height={110}
            alt="not uplaoded"
          />  
          )
          }
        </div>
      </div>
      <div className="flex justify-center items-center my-14 flex-col">
        <div className="font-bold md:text-3xl text-2xl"> @{params.username}</div>
        <div className="text-slate-400 text-sm my-1.5">lets help {params.username} to get a chai </div>
        <div className="text-slate-400 text-sm">{payments.length} payments, {currentuser.name} is raising funds ₹{payments.reduce((a,b) => a+b.amount,0)}</div>
        <div className="payment flex gap-3 md:w-[80%] md:flex-row flex-col-reverse w-full">
          <div className="supporters md:w-1/2 rounded-lg bg-gray-950/40 p-5 mt-3.5">
            <h2 className="text-lg font-bold flex justify-center my-5">
              Supporters
            </h2>
            <ul>
              {payments.length==0 && <li>no payment yet</li>}
            {payments.map((p,i)=>{
              return <li className="bg-gray-500/10 rounded-2xl p-2 my-2 w-full">
                <span >
                 ~ {p.name} donated <span className="font-bold">{p.amount}₹</span> with a message : " {p.message} "
                </span>
              </li>
            })}
             
         
            </ul>
          </div>
          <div className="makepayment md:w-1/2 bg-gray-950/40 rounded-lg py-5 mt-3.5 h-fit">
            <h2 className="text-lg font-bold my-5 flex justify-center">
              
              Make a Payment
            </h2>
            <div className="flex gap-2 flex-col m-5">
              <input
                onChange={handlechange}
                value={paymentform.name}
                type="text"
                className="w-full p-3 rounded-lg bg-gray-500/20"
                placeholder="Enter Name"
                name="name"
              />
              <input
                onChange={handlechange}
                value={paymentform.message}
                type="text"
                className="w-full p-3 rounded-lg bg-gray-500/20"
                placeholder="Enter Message"
                name="message"
              />
              <input
                onChange={handlechange}
                value={paymentform.amount}
                type="text"
                className="w-full p-3 rounded-lg bg-gray-500/20"
                placeholder="Enter Amount -Rs"
                name="amount"
              />
              <button
                onClick={()=>{pay(paymentform.amount)}}
                type="button"
                className="text-white bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-t focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-400 font-medium rounded-2xl text-sm px-4 py-2.5 text-center leading-5 disabled:bg-slate-600 disabled:from-slate-700 disabled:to-slate-700" disabled={paymentform.name?.length<3 || paymentform?.message?.length<4||paymentform.amount<1}
              >
                Pay Now{" "}
              </button>
            </div>
            <div className="flex m-5 gap-3">
              <button
                className="w-fit p-2 rounded-lg bg-gray-500/20 hover:bg-slate-600/50"
                onClick={() => {
                  pay(10);
                }}
              >
                Pay 10₹
              </button>
              <button
                className="w-fit p-2 rounded-lg bg-gray-500/20 hover:bg-slate-600/50"
                onClick={() => {
                  pay(30);
                }}
              >
                Pay 30₹
              </button>
              <button
                className="w-fit p-2 rounded-lg bg-gray-500/20 hover:bg-slate-600/50"
                onClick={() => {
                  pay(50);
                }}
              >
                Pay 50₹
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paymentpage;
