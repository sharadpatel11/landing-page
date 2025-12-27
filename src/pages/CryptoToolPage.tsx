import CryptoTool from "@/components/CryptoTool";
import PlaygroundFrame from "@/components/playground/PlaygroundFrame";

const CryptoToolPage = () => {
  return (
    <PlaygroundFrame title="Crypto Tool Playground" subtitle="Explore Caesar/ROT13/Base64 and transformations.">
      <CryptoTool embedded />
    </PlaygroundFrame>
  );
};

export default CryptoToolPage;
