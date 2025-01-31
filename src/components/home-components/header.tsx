"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiYoutube,
  FiFacebook,
  FiTwitter,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useCart } from "../cart-components/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  slug: {
    current: string;
  };
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { cartItems, wishlist } = useCart();

  // Calculate total quantity of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  // Animation variants for the mobile menu
  const mobileMenuVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.3 } },
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // Redirect to the search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-[#252B42] py-4 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center text-white text-sm">
          {/* Contact Information */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiPhone />
              <p>(+92) 3190142526</p>
            </div>
            <div className="flex items-center gap-1">
              <FiMail />
              <p>michelle.rivera@gmail.com</p>
            </div>
          </div>

          {/* Promotion */}
          <p className="hidden md:block">
            Follow Us and get a chance to win 80% off
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block">Follow Us:</p>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram />
            </Link>
            <Link
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiYoutube />
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter />
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <div className="bg-white shadow-md border-b-2 border-[#E5E5E5] relative z-40">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={"/"}>
            <motion.div
              className="text-2xl font-bold text-[#252B42] hover:text-slate-600 ml-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bandage
            </motion.div>
          </Link>

          {/* Action Icons (Mobile and Desktop) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Search Bar for Mobile */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search pro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              <button type="submit" className="absolute right-2 top-1.5">
                <FiSearch className="text-lg cursor-pointer text-gray-600" />
              </button>
            </form>

            {/* Display Search Results for Mobile */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-2 rounded-md z-50">
                <ul className="py-2">
                  {searchResults.map((product) => (
                    <li
                      key={product._id}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={"/cart"}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={"/cart-icon.png"}
                  alt="icon"
                  width={24}
                  height={18}
                />

                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-3 bg-[#23A6F0] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="text-3xl text-[#252B42]" />
              ) : (
                <Image
                  src={"/menu-icon.png"}
                  alt="icon"
                  width={23}
                  height={14}
                  className="mr-3"
                />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex">
            <ul className="flex gap-8 text-sm font-medium text-[#737373] relative">
              <li>
                <Link href="/" className="hover:text-[#23A6F0] transition-all">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href="/productList"
                  className="flex items-center gap-1 hover:text-[#23A6F0] transition-all"
                >
                  Shop
                  <FiChevronDown />
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-[#23A6F0] transition-all"
                >
                  Team
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Icons for Desktop */}
          <div className="hidden md:flex items-center gap-6 text-[#23A6F0]">
            {/* Authentication Section */}
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button
                  className="text-sm font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login/Register
                </motion.button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              <button type="submit" className="absolute right-2 top-2">
                <FiSearch className="text-lg cursor-pointer mt-1" />
              </button>
            </form>

            {/* Display Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-2 rounded-md z-50">
                <ul className="py-2">
                  {searchResults.map((product) => (
                    <li
                      key={product._id}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={"/cart"}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiShoppingCart className="text-lg cursor-pointer" />
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>
            <Link href={"/wishlist"}>
              <div className="relative">
                <FiHeart className="text-lg cursor-pointer" size={20} />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white shadow-md"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <ul className="flex flex-col gap-6 p-4 text-[20px] text-[#737373] text-center">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#23A6F0] transition-all"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productList"
                    className="hover:text-[#23A6F0] transition-all"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-[#23A6F0] transition-all"
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#23A6F0] transition-all"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-[#23A6F0] transition-all"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#23A6F0] transition-all"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="hover:text-[#23A6F0] transition-all"
                  >
                    Team
                  </Link>
                </li>
              </ul>
              {/* Action Icons */}
              <div className="flex flex-col gap-4 items-center py-4">
                {/* Authentication */}
                <SignedOut>
                  <SignInButton mode="modal">
                    <motion.button
                      className="text-sm font-medium flex items-center gap-2 text-[#23A6F0]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login/Register
                    </motion.button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <UserButton showName />
                </SignedIn>

                {/* Other Icons */}
                <div className="flex gap-6 text-[#23A6F0]">
                  <FiSearch className="text-2xl cursor-pointer" />
                  <Link href={"/cart"}>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiShoppingCart className="text-2xl cursor-pointer" />
                      {totalItems > 0 && (
                        <motion.span
                          className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        >
                          {totalItems}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                  <Link href={"/wishlist"}>
                    <div className="relative">
                      <FiHeart className="text-lg cursor-pointer" size={25} />
                      {totalWishlistItems > 0 && (
                        <span className="absolute -top-2 -right-3 bg-[#737373] text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                          {totalWishlistItems}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
