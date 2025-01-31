import FreeTrail from "@/components/pricing-component/freetrail";
import Plan from "@/components/pricing-component/plan";
import Price from "@/components/pricing-component/price";
import PriceFaqs from "@/components/pricing-component/price-faqs";
import Footer from "@/components/team-components/footer";
import Header from "@/components/team-components/header";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const PricingPage = () => {
  return (
    <div>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>{" "}
      <Price />
      <Plan />
      <PriceFaqs />
      <FreeTrail />
      <Footer />
    </div>
  );
};

export default PricingPage;
