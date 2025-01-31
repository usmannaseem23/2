"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiArrowRight, FiX, FiSearch, FiShoppingCart } from "react-icons/fi";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { useCart } from "@/components/cart-components/CartContext";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-white shadow-md py-4 sticky">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href={"/"}>
          <div className="text-[24px] font-bold text-[#252B42] mr-8 hover:text-slate-600 ml-2">
            Bandage
          </div>
        </Link>
        {/* Navbar (Desktop) */}
        <nav className="hidden md:flex flex-row items-center gap-8 text-[14px] text-[#737373] font-bold ml-20">
          <ul className="list-none flex gap-8">
            <Link href="/">
              <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
                Home
              </li>
            </Link>
            <Link href="/productList">
              <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
                Product
              </li>
            </Link>
            <Link href="/pricing">
              <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
                Pricing
              </li>
            </Link>
            <Link href="/contact">
              <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
                Contact
              </li>
            </Link>
          </ul>
        </nav>

        {/* Icons and Buttons */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Search Icon (Hidden on desktop) */}
          <button className="md:hidden flex items-center justify-center text-[#737373] hover:text-[#23A6F0] hover:border-[#23A6F0] transition-all">
            <FiSearch size={25} />
          </button>

          {/* Add to Cart Icon (Hidden on desktop) */}
          <button className="md:hidden flex items-center justify-center p-2 text-[#737373] hover:text-[#23A6F0] hover:border-[#23A6F0] transition-all">
          <Link href={"/cart"}>
              <div className="relative">
                <FiShoppingCart className="text-2xl text-[#737373] cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#23A6F0] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </button>

          {/* Conditional Rendering for Authentication */}
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            <SignedIn>
              {/* Show UserButton on desktop only */}
              <div className="hidden md:block mr-5">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              {/* Show SignInButton when the user is signed out */}
              <SignInButton>
                <button className="hidden md:block px-4 py-2 text-[#23A6F0] rounded hover:bg-[#23A6F0] font-bold hover:text-white transition-all">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
          </ClerkProvider>

          {/* Become a member Button (Hidden on mobile) */}
          <Link href={"/pricing"}>
            <button className="hidden md:flex items-center gap-2 px-4 py-3 bg-[#23A6F0] text-[#FAFAFA] rounded-md hover:bg-blue-500 transition-all">
              Become a member
              <FiArrowRight className="text-lg" />
            </button>
          </Link>

          {/* Mobile Hamburger Menu (Appears at the end on mobile) */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-[#252B42]">
              {isMobileMenuOpen ? (
                <FiX size={24} />
              ) : (
                <Image
                  src={"/menu-icon.png"}
                  alt="icon"
                  width={25}
                  height={17}
                  className="mr-3"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Appears when hamburger icon is clicked) */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white shadow-md mt-4 px-4 py-6 flex justify-center items-center x`}
      >
        <ul className="list-none flex flex-col gap-4 text-[20px] text-[#737373] font-bold">
          <Link href="/">
            <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
              Home
            </li>
          </Link>
          <Link href="/productList">
            <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
              Product
            </li>
          </Link>
          <Link href="/pricing">
            <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
              Pricing
            </li>
          </Link>
          <Link href="/contact">
            <li className="cursor-pointer hover:text-[#23A6F0] transition-all">
              Contact
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
