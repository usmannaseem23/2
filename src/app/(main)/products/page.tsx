import Header from "@/components/productList-components/header";
import BestSeller from "@/components/product-components/best-seller";
import Details from "@/components/product-components/details";
// import Hero from "@/components/products-components/hero";
import Footer from "@/components/team-components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

function Products() {
  return (
    <div>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>{" "}
      {/* <Hero /> */}
      <Details />
      <BestSeller />
      <Footer />
    </div>
  );
}

export default Products;