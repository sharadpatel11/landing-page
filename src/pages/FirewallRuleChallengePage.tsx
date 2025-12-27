import FirewallRuleChallenge from "@/components/FirewallRuleChallenge";
import PlaygroundFrame from "@/components/playground/PlaygroundFrame";

export default function FirewallRuleChallengePage() {
  return (
    <PlaygroundFrame
      title="Firewall Rule Challenge"
      subtitle="Translate change requests into correct firewall policies."
    >
      <FirewallRuleChallenge embedded />
    </PlaygroundFrame>
  );
}