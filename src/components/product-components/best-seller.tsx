"use client";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Loader from "../home-components/loader";
import { useState, useEffect } from "react";
import { Product } from "../../../sanity.types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default function BestSeller() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products"]{
        _id,
        name,
        description,
        price,
        image,
        discountPrice,
        slug,
        inStock,
        stock
      }`;
      const data: Product[] = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-lg text-[#252B42]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] py-7 mt-10 wrapper">
      <div>
        <h2 className="px-28 font-bold text-[#252B42] text-[24px]">
          BESTSELLER PRODUCTS
        </h2>
      </div>
      <div className="border-b border-[#ECECEC] mt-8"></div>
      <div className="flex flex-wrap justify-center gap-6 mt-10 px-4 sm:px-14">
        {/* Product Cards */}
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug?.current}`}
            className="w-[280px] h-[460px] bg-white rounded-sm shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="relative w-full h-[300px]">
              {/* Render Image with Sanity's optimized image URL */}
              <Image
                src={
                  product.image
                    ? urlFor(product.image).width(280).height(300).url()
                    : "/fallback-image.jpg"
                }
                alt={product.name || "Product Image"}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-[#252B42] font-bold text-[16px] hover:text-[#23856D] transition-colors">
                {product.name}
              </h3>
              {/* Render the description using PortableText */}
              <div className="text-[#737373] text-[14px] font-bold mt-2">
                {Array.isArray(product.description) ? (
                  <PortableText value={product.description} />
                ) : (
                  <p>{product.description || "No description available"}</p>
                )}
              </div>

              <p className="text-[#BDBDBD] font-bold text-[16px] mt-4">
                {product.discountPrice && (
                  <span className="text-[#737373] font-bold text-[16px] ml-3 line-through">
                    ${product.price}
                  </span>
                )}
                {product.discountPrice && (
                  <span className="text-[#23856D] font-bold text-[16px] ml-3">
                    ${product.discountPrice}
                  </span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
