"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard, { Product } from "../home-components/product-card";
import Loader from "../home-components/loader";
import { client } from "@/sanity/lib/client";

const ShopComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("popularity"); 

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "productList"]{
        _id,
        name,
        slug,
        image,
        description,
        price,
        discountPrice,
        colors,
        department,
        stock,
        rating,
        reviews,
        inStock,
      }`;

      const data: Product[] = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Function to handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  // Function to filter products based on the selected filter
  const getFilteredProducts = () => {
    switch (filter) {
      case "price_low_to_high":
        return [...products].sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return [...products].sort((a, b) => b.price - a.price);
      case "popularity":
      default:
        return [...products].sort((a, b) => b.rating - a.rating); 
    }
  };

  const filteredProducts = getFilteredProducts(); 

  const productImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const hoverTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-lg text-[#252B42]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-6 mt-4 wrapper">
      {/* Top Section */}
      <div className="bg-[#FAFAFA] px-5 py-4 pb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[#252B42] font-bold text-[24px]">Shop</h2>
          <p className="text-[#252B42] font-bold text-[14px] flex items-center gap-1">
            Home <FiChevronRight className="text-[#BDBDBD] text-[25px]" />{" "}
            <span className="text-[#737373]">Shop</span>
          </p>
        </div>

        {/* Product Images Grid */}
        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap ml-7 md:ml-0">
          {[
            "product1.png",
            "product2.png",
            "product3.png",
            "product4.png",
            "product5.png",
          ].map((product, index) => (
            <motion.div
              key={index}
              className="relative group w-full sm:w-[calc(20%-1rem)] md:w-[calc(20%-1rem)]"
              variants={productImageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative group">
                <Image
                  src={`/${product}`}
                  alt="product"
                  height={223}
                  width={240}
                  className="object-cover"
                />
                {/* Text on hover */}
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-[#FFFFFF] transition-opacity duration-300"
                  variants={hoverTextVariants}
                  initial="hidden"
                  whileHover="visible"
                >
                  <h3 className="text-[16px] font-bold">Trending Apparel</h3>
                  <p className="text-[14px]">Explore 5 Stylish Products</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section below images */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-8 px-4 sm:px-28">
        {/* Left side - Showing all X results */}
        <motion.div
          className="text-[#737373] text-[14px] font-bold text-center sm:text-left w-full sm:w-auto"
          variants={productImageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>Showing all {filteredProducts.length} results</p>
        </motion.div>

        {/* Center section - Box Icon and Hamburger */}
        <motion.div
          className="flex justify-center items-center gap-3 text-center sm:text-center w-full sm:w-auto mt-4 sm:mt-0"
          variants={productImageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-[#737373] text-[14px] font-bold">Views:</p>
          <motion.div
            className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#DDDDDD] text-[#252B42]"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Image src={"/grid-icon.png"} alt="icon" width={14} height={14} />
          </motion.div>
          <motion.div
            className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#DDDDDD] text-[#737373]"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Image src={"/list-icon.png"} alt="icon" height={16} width={16} />
          </motion.div>
        </motion.div>

        {/* Right section - Popularity Dropdown and Filter Button */}
        <motion.div
          className="flex items-center gap-4 text-center sm:text-left w-full sm:w-auto mt-4 sm:mt-0"
          variants={productImageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <select
            className="bg-[#F9F9F9] border border-[#DDDDDD] py-3 px-2 text-[#737373] text-[14px] rounded-md w-full sm:w-auto"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="popularity">Popularity</option>
            <option value="price_low_to_high">Price: Low to High</option>
            <option value="price_high_to_low">Price: High to Low</option>
          </select>
          <motion.button
            className="bg-[#23A6F0] text-white py-3 px-5 rounded-md hover:bg-[#1c8a9b] transition-all duration-300 font-bold text-[14px] w-full sm:w-auto"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Filter
          </motion.button>
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="flex flex-col items-center justify-center text-center mt-5 mb-7 wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              // variants={productCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} 
            >
              <Link href={`/productList/${product.slug?.current}`} passHref>
                <div>
                  <ProductCard product={product} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <motion.div
          className="flex flex-wrap justify-center items-center space-x-4 mt-16 border-[#BDBDBD] border-2 rounded-md"
          // variants={productCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button
            className="px-4 py-2 bg-[#F3F3F3] text-[#BDBDBD] rounded-md hover:bg-gray-300 text-sm sm:px-8 sm:py-6"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            First
          </motion.button>
          <div className="flex justify-center space-x-2 mt-4 sm:mt-0">
            <motion.button
              className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0"
              // variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              1
            </motion.button>
            <motion.button
              className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0"
              // variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              2
            </motion.button>
            <motion.button
              className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0"
              // variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              3
            </motion.button>
          </div>
          <motion.button
            className="px-4 py-2 text-[#23A6F0] rounded-md hover:bg-[#1D8CC8] hover:text-white text-sm sm:px-8 sm:py-6"
            // variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Next
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopComponent;