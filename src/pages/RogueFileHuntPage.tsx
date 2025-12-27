import RogueFileHunt from "@/components/RogueFileHunt";
import PlaygroundFrame from "@/components/playground/PlaygroundFrame";

export default function RogueFileHuntPage() {
  return (
    <PlaygroundFrame
      title="The Rogue File Hunt"
      subtitle="Timed terminal-style challenge: locate and remove the malicious file."
    >
      <RogueFileHunt embedded />
    </PlaygroundFrame>
  );
}