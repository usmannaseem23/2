import EditorsPics from "@/components/home-components/editors-pics";
import FeatureProducts from "@/components/home-components/featuresproducts";
import FeauresPosts from "@/components/home-components/feaures-posts";
import Hero from "@/components/home-components/hero";
import Header from "@/components/home-components/header";
import Footer from "@/components/home-components/footer";
import { ClerkProvider } from "@clerk/nextjs";


export default function Home() {
  return (
    <>
   <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>
      <Hero />
      
     <EditorsPics />
    <FeatureProducts />
    <FeauresPosts /> 
    <Footer />
    </>
  );
}
