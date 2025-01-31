import Image from "next/image";
import { FaClock, FaComment, FaChevronRight } from "react-icons/fa";
import React from "react";
import Footer from "@/components/home-components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/productList-components/header";

const FeaturesPosts = () => {
  const blogs = [
    {
      img: "blogs1.png",
      title: "Top Trending Deals of the Month",
      description:
        "Discover the latest deals and discounts on our exclusive product range.",
      date: "22 April 2021",
      comments: 15,
    },
    {
      img: "blogs2.png",
      title: "How to Choose the Best Products for You",
      description:
        "Learn how to make informed choices while shopping on our platform.",
      date: "15 May 2021",
      comments: 25,
    },
    {
      img: "blogs3.avif",
      title: "Upcoming Product Launches",
      description:
        "Get a sneak peek into the exciting products launching soon.",
      date: "8 June 2021",
      comments: 32,
    },
    {
      img: "blogs4.jpeg",
      title: "Customer Stories",
      description:
        "See how our products have transformed the lives of our happy customers.",
      date: "25 June 2021",
      comments: 12,
    },
    {
      img: "blogs5.png",
      title: "Sustainable Shopping Tips",
      description:
        "Learn how to shop sustainably and make a positive impact on the environment.",
      date: "30 July 2021",
      comments: 40,
    },
    {
      img: "blogs6.avif",
      title: "Why Shop With Us?",
      description:
        "Understand what makes us the best e-commerce platform for your needs.",
      date: "10 August 2021",
      comments: 18,
    },
  ];

  return (
    <div>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>{" "}
      <div className="text-center mb-20 mt-20 wrapper">
        <h3 id="blog" className="text-[#23A6F0] text-[14px] font-bold">
          From Our Blog
        </h3>
        <h2 className="text-[#252B42] text-[40px] font-bold">Featured Posts</h2>
        <p className="text-[#737373] text-[14px]">
          Stay updated with the latest insights and updates from Bandage Store.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 wrapper">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
          >
            <Image
              src={`/${blog.img}`}
              alt={blog.title}
              width={350}
              height={230}
              className="w-full h-[230px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-[#252B42] text-[20px] font-semibold">
                {blog.title}
              </h3>
              <p className="text-[#737373] text-[14px] mt-2">
                {blog.description}
              </p>
              <div className="flex justify-between items-center mt-4 text-[12px] text-[#737373]">
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#23A6F0]" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaComment className="text-[#23856D]" />
                  <span>{blog.comments} Comments</span>
                </div>
              </div>
              <button className="mt-4 flex items-center text-[#23A6F0] hover:text-white hover:bg-[#23A6F0] text-sm font-bold py-2 px-4 border border-[#23A6F0] rounded transition-all">
                Learn More <FaChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPosts;
