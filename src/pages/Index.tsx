import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Process } from "@/components/Process";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhyMacs } from "@/components/WhyMacs";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <SocialProof />
      <Process />
      <BeforeAfter />
      <WhyMacs />
      <ServiceAreas />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
