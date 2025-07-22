import Navigation from "@/components/Navigation";
import CryptoTool from "@/components/CryptoTool";

const CryptoToolPage = () => {
  return (
    <div className="min-h-screen bg-cyber-dark">
      <Navigation />
      <main className="pt-16">
        <CryptoTool />
      </main>
    </div>
  );
};

export default CryptoToolPage;
