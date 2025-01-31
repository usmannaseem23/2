import Cards from "@/components/productList-components/cards";
import Company from "@/components/productList-components/company";
import Header from "@/components/productList-components/header";
import Footer from "@/components/team-components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const ProductPage = () => {
  return (
    <div>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>
      <Cards />
      <Company />
      <Footer />
    </div>
  );
};

export default ProductPage;
