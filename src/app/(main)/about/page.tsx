import AboutUs from "@/components/about-components/aboutus";
import BigCompannies from "@/components/about-components/companies";
import MeetTeam from "@/components/about-components/meetTeam";
import Problem from "@/components/about-components/problem";
import Work from "@/components/about-components/work";
import Footer from "@/components/team-components/footer";
import Header from "@/components/team-components/header";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>{" "}
      <AboutUs />
      <Problem />
      <MeetTeam />
      <BigCompannies />
      <Work />
      <Footer />
    </>
  );
};

export default AboutPage;
