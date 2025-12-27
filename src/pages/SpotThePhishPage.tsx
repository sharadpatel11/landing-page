import SpotThePhish from "@/components/SpotThePhish";
import PlaygroundFrame from "@/components/playground/PlaygroundFrame";

export default function SpotThePhishPage() {
  return (
    <PlaygroundFrame title="Spot the Phish" subtitle="Review emails and flag social engineering." rightSlot={null}>
      <SpotThePhish embedded />
    </PlaygroundFrame>
  );
}