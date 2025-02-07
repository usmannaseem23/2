"use client";

import React, { useState } from "react"; // Import useState
import { useCart } from "@/components/cart-components/CartContext";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/productList-components/header";
import Footer from "@/components/team-components/footer";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Shipping address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const { cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Update stock for each item in the cart
      for (const item of cartItems) {
        const stockUpdateResponse = await fetch("/api/updateStock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.id, quantity: item.quantity }),
        });

        if (!stockUpdateResponse.ok) {
          const { message } = await stockUpdateResponse.json();
          alert(`Failed to update stock for ${item.name}: ${message}`);
          setIsLoading(false); // Stop loading on error
          return;
        }
      }

      // Create a Stripe Checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      if (sessionId) {
        // Send the order data to Sanity
        const orderData = {
          _type: 'order',
          fullName: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
          totalAmount: totalPrice,
          products: cartItems.map(item => ({
            _type: 'reference',
            _ref: item.id, // Assuming product IDs are stored in Sanity
          })),
        };

        const sanityResponse = await fetch('/api/saveOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!sanityResponse.ok) {
          console.error("Failed to save order data to Sanity");
          setIsLoading(false); // Stop loading on error
          return;
        }

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error redirecting to checkout:", error);
          setIsLoading(false); // Stop loading on error
        }
      } else {
        console.error("No session ID returned.");
        setIsLoading(false); // Stop loading on error
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>
      <div className="wrapper">
        <div className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">
              Checkout
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">
                  Order Summary
                </h2>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-200 py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <span className="text-base font-medium text-[#1F2937]">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-base font-medium text-[#1F2937]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between mt-6">
                  <span className="text-lg font-bold text-[#1F2937]">
                    Total
                  </span>
                  <span className="text-lg font-bold text-[#1F2937]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">
                  Shipping Details
                </h2>
                <form onSubmit={handleSubmit(handleCheckout)}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-base font-medium text-[#1F2937] mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-[#1F2937] mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-base font-medium text-[#1F2937] mb-1"
                      >
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        {...register("address")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
                      />
                      {errors.address && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-base font-medium text-[#1F2937] mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading} // Disable button when loading
                    className="w-full mt-6 bg-[#3B82F6] text-white font-bold py-3 rounded-lg focus:outline-none disabled:opacity-50"
                  >
                    {isLoading ? "Processing..." : "Proceed to Payment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
