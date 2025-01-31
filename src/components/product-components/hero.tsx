import Image from "next/image";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  return (
    <div className="bg-[#FAFAFA] wrapper">
      <div>
        <p className="text-[#252B42] mt-5 font-bold text-[14px] flex py-8 px-4 sm:px-16 gap-1">
          Home <FiChevronRight className="text-[#BDBDBD] text-[25px]" />{" "}
          <span className="text-[#737373]">Products</span>
        </p>
      </div>
      <div className="px-4 sm:px-14 flex flex-col sm:flex-row">
        {/* Carousel Section */}
        <div className="relative w-full sm:w-[506px] h-[250px] sm:h-[450px] mb-4 sm:mb-0">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/products1.png"
                  alt="product"
                  width={506}
                  height={450}
                  className="rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/products1-2.png"
                  alt="product"
                  width={506}
                  height={450}
                  className="rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/products1-3.png"
                  alt="product"
                  width={506}
                  height={450}
                  className="rounded-md"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2">
              Prev
            </CarouselPrevious>
            <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2">
              Next
            </CarouselNext>
          </Carousel>
        </div>

        {/* Product Details Section */}
        <div className="ml-0 sm:ml-10 text-center sm:text-left">
          <h2 className="text-[#252B42] text-[20px] mt-12 md:mt-0">Floating Phone</h2>
          {/* Star Reviews Section */}
          <div className="flex justify-center sm:justify-start items-center mt-2">
            {/* 4 Filled Stars + 1 Empty Star */}
            <div className="flex text-[#F3CD03] gap-2">
              <FaStar size={22} />
              <FaStar size={22} />
              <FaStar size={22} />
              <FaStar size={22} />
              <FaRegStar size={22} className="text-[#F3CD03]" />
            </div>
            {/* Reviews Count */}
            <span className="ml-2 text-[#737373] font-bold text-[14px]">
              10 Reviews
            </span>
          </div>

          {/* Price and Availability */}
          <div className="mt-6">
            <p className="text-[#252B42] font-bold text-[24px]">$1,139.33</p>
            <p className="text-[#737373] font-bold text-[14px] mt-1">
              Availability :{" "}
              <span className="text-[#23A6F0] font-bold text-[14px]">
                In Stock
              </span>
            </p>
          </div>
          <div className="mt-8">
            <p className="text-[#858585] text-[14px]">
              Met minim Mollie non desert Alamo est sit cliquey dolor <br />
              do met sent. RELIT official consequent door ENIM RELIT Mollie.{" "}
              <br />
              Excitation venial consequent sent nostrum met.
            </p>
            {/* Gray Line Below Paragraph */}
            <div className="border-b-2 border-[#BDBDBD] mt-8"></div>
          </div>

          {/* Colored Rounded Divs */}
          <div className="flex justify-center sm:justify-start mt-8 gap-4">
            <div className="w-8 h-8 bg-[#23A6F0] rounded-full"></div>
            <div className="w-8 h-8 bg-[#2DC071] rounded-full"></div>
            <div className="w-8 h-8 bg-[#E77C40] rounded-full"></div>
            <div className="w-8 h-8 bg-[#252B42] rounded-full"></div>
          </div>

          {/* Action Buttons with Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-14">
            <div>
              <button className="px-6 py-1 md:px-6 md:py-4 bg-[#23A6F0] hover:bg-blue-400 text-[#FFFFFF] rounded-md text-[14px] font-bold">
                Select Options
              </button>
              <FiChevronRight size={20} className="text-[#FFFFFF]" />
            </div>
            <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
              <FiHeart />
            </button>
            <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
              <FiShoppingCart />
            </button>
            <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
              <FiEye />
            </button>
          </div>
        </div>
      </div>

      {/* Move the thumbnails below the carousel */}
      <div className="flex gap-4 mt-2 ml-4 sm:ml-14">
        <Image src="/products1-2.png" alt="product" width={100} height={75} />
        <Image src="/products1-3.png" alt="product" width={100} height={75} />
      </div>
    </div>
  );
};

export default Hero;
