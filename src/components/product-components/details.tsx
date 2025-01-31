import React from "react";
import Image from "next/image";
import { IoChevronForward } from "react-icons/io5";

const Details = () => {
  return (
    <div className="mt-10 py-4 wrapper">
      {/* Navigation Tabs */}
      <div className="flex justify-center gap-8 items-center px-4 sm:px-14 text-[#737373] text-[14px]">
        <h3 className="font-semibold">Description</h3>
        <h3 className="font-bold">Additional Information</h3>
        <h3 className="font-bold">
          Reviews <span className="text-[#23856D]">(0)</span>
        </h3>
      </div>

      {/* Divider */}
      <div className="border-b border-[#ECECEC] mt-8"></div>

      {/* Main Content Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start mt-8 px-4 sm:px-14">
        {/* Left Section - Image */}
        <div className="flex-shrink-0 w-full sm:w-1/3 mb-6 sm:mb-0">
          <Image
            src="/detail1.webp"
            alt="Product"
            width={316}
            height={372}
            className="rounded-md mx-auto"
          />
        </div>

        {/* Center Section - Text */}
        <div className="flex-1 text-center sm:text-left sm:px-8">
          <h2 className="font-bold text-[24px] text-[#252B42] mb-4">
            Precision Meets Style
          </h2>
          <p className="text-[#737373] text-[14px] leading-relaxed">
            This product is crafted with precision and care to meet your needs.{" "}
            <br />
            It combines functionality with a sleek design, making it a perfect
            addition <br />
            <br />
            to your daily essentials. Our commitment to quality ensures
            long-lasting <br />
            durability. Each detail is meticulously designed to deliver a
            seamless <br />
            and enjoyable user experience. <br />
            <br />
            Whether for personal or professional use, this product stands out{" "}
            <br />
            in style and performance. Choose from multiple options to suit your
            preferences.
          </p>
        </div>

        {/* Right Section - FAQ */}
        <div className="flex-shrink-0 w-full sm:w-1/3 text-[#252B42]">
          <h3 className="font-bold text-[24px] mb-4 mt-4 md:mt-0">Product Details</h3>
          <ul className="text-[#737373] text-[14px] leading-relaxed font-bold space-y-4">
            <li className="flex items-center gap-2">
              <IoChevronForward size={25} /> What materials are used in this
              product?
            </li>
            <li className="flex items-center gap-2">
              <IoChevronForward size={25} /> Does this product come in different
              sizes?
            </li>
            <li className="flex items-center gap-2">
              <IoChevronForward size={25} /> Are there any color options
              available?
            </li>
            <li className="flex items-center gap-2">
              <IoChevronForward size={25} /> Is this product eco-friendly?
            </li>
          </ul>
          <h3 className="font-bold text-[24px] mt-6 mb-4">Order & Shipping</h3>
          <ul className="text-[#737373] text-[14px] leading-relaxed font-bold space-y-4">
            <li className="flex items-center gap-2">
              <IoChevronForward size={25} /> How long does delivery take?
            </li>
            <li className="flex items-center gap-2">
              <IoChevronForward size={25} /> Can I track my order?
            </li>
            <li className="flex items-center gap-2">
              <IoChevronForward size={25} /> What are the shipping charges?
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
