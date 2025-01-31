import ContactUs from "@/components/contact-components/contactus";
import Office from "@/components/contact-components/office";
import Footer from "@/components/team-components/footer";
import Header from "@/components/team-components/header";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>{" "}
      <ContactUs />
      <Office />
      <Footer />
    </>
  );
};

export default ContactPage;
