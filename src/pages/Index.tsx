
import { SimulatedAuthProvider, useSimulatedAuth } from "@/hooks/useSimulatedAuth";
import SimulatedHeader from "@/components/SimulatedHeader";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

const IndexContent = () => {
  const { user } = useSimulatedAuth();

  return (
    <div className="min-h-screen bg-background">
      <SimulatedHeader />
      <main>
        <Hero />
        <Services />
        <Process />
      </main>
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <IndexContent />
  );
};

export default Index;
