"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
// import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000); // 3 seconds delay before redirecting
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Payment Successful!
        </h1>
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <p className="text-center text-gray-600 mb-8">
          Thank you for your purchase. Your payment has been processed
          successfully. 
        </p>

          {/* <div className="text-center">
          <Link
            href="/generate-tracking"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Generate Tracking Number!{" "}
          </Link>
        </div> */}
        
      </div>
    </div>
  );
}
