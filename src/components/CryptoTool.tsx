import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Unlock, Copy, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUiMode } from "@/theme/ui-mode";
import { cn } from "@/lib/utils";

type CryptoToolProps = {
  embedded?: boolean;
};

const CryptoTool = ({ embedded = false }: CryptoToolProps) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [method, setMethod] = useState('caesar');
  const [shift, setShift] = useState(3);
  const [showOutput, setShowOutput] = useState(true);
  const { toast } = useToast();
  const { mode } = useUiMode();
  const isModern = mode === "modern";

  // Caesar Cipher
  const caesarCipher = (text: string, shift: number, decode = false) => {
    const actualShift = decode ? -shift : shift;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + actualShift + 26) % 26) + start);
    });
  };

  // ROT13
  const rot13 = (text: string) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  // Base64
  const base64Encode = (text: string) => {
    try {
      return btoa(text);
    } catch (error) {
      return 'Error: Invalid input for Base64 encoding';
    }
  };

  const base64Decode = (text: string) => {
    try {
      return atob(text);
    } catch (error) {
      return 'Error: Invalid Base64 string';
    }
  };

  // Reverse Text
  const reverseText = (text: string) => {
    return text.split('').reverse().join('');
  };

  const encrypt = () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to encrypt",
        variant: "destructive"
      });
      return;
    }

    let result = '';
    switch (method) {
      case 'caesar':
        result = caesarCipher(input, shift);
        break;
      case 'rot13':
        result = rot13(input);
        break;
      case 'base64':
        result = base64Encode(input);
        break;
      case 'reverse':
        result = reverseText(input);
        break;
      default:
        result = input;
    }
    setOutput(result);
    toast({
      title: "Encryption Complete",
      description: `Text encrypted using ${method.toUpperCase()}`,
    });
  };

  const decrypt = () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to decrypt",
        variant: "destructive"
      });
      return;
    }

    let result = '';
    switch (method) {
      case 'caesar':
        result = caesarCipher(input, shift, true);
        break;
      case 'rot13':
        result = rot13(input); // ROT13 is its own inverse
        break;
      case 'base64':
        result = base64Decode(input);
        break;
      case 'reverse':
        result = reverseText(input); // Reverse is its own inverse
        break;
      default:
        result = input;
    }
    setOutput(result);
    toast({
      title: "Decryption Complete",
      description: `Text decrypted using ${method.toUpperCase()}`,
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Output copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
  };

  const returnToPortfolio = () => {
    // Check if this window was opened from another tab
    if (window.opener && !window.opener.closed) {
      // Close this tab and focus on the opener
      window.close();
    } else {
      // Fallback: navigate to the main portfolio page
      window.location.href = '/';
    }
  };

  return (
    <section className={cn(!embedded && "min-h-screen py-16", !embedded && !isModern && "bg-gradient-to-b from-cyber-darker to-cyber-dark")}>
      <div className={cn(isModern ? "mx-auto max-w-4xl px-0" : "container mx-auto px-4")}>
        {/* Return to Portfolio Button */}
        {!embedded && (
          <div className="mb-8">
            <Button
              onClick={returnToPortfolio}
              variant="outline"
              className={cn(
                "rounded-xl",
                isModern ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Portfolio
            </Button>
          </div>
        )}

        {!embedded && (
          <div className="text-center mb-12">
            <h2 className={cn("text-4xl md:text-5xl font-semibold mb-5", isModern ? "text-foreground" : "font-bold glitch")} data-text="Crypto Tool">
              <span className={cn(isModern ? "text-foreground" : "cyber-text")}>Crypto</span> Tool
            </h2>
            <p className={cn("max-w-3xl mx-auto", isModern ? "text-muted-foreground text-lg" : "text-xl text-gray-300")}>
              Interactive encryption and decryption tool for <span className={cn(!isModern && "redacted")}>educational purposes</span>
            </p>
          </div>
        )}

        <div className="mx-auto max-w-4xl">
          <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl" : "bg-card/40 border-cyber-green/40 shadow-xl glow-effect")}>
            <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "")}>
              <CardTitle className={cn("flex items-center gap-2", isModern ? "text-foreground" : "text-cyber-green")}>
                <Lock className="w-6 h-6" />
                Cryptography Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Method Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="method">Encryption Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className={cn(isModern ? "rounded-xl border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-cyber-blue/30")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caesar">Caesar Cipher</SelectItem>
                      <SelectItem value="rot13">ROT13</SelectItem>
                      <SelectItem value="base64">Base64</SelectItem>
                      <SelectItem value="reverse">Reverse Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {method === 'caesar' && (
                  <div className="space-y-2">
                    <Label htmlFor="shift">Shift Value</Label>
                    <Input
                      id="shift"
                      type="number"
                      min="1"
                      max="25"
                      value={shift}
                      onChange={(e) => setShift(parseInt(e.target.value) || 3)}
                      className={cn(isModern ? "rounded-xl border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-cyber-blue/30")}
                    />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="space-y-2">
                <Label htmlFor="input">Input Text</Label>
                <Input
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to encrypt/decrypt..."
                  className={cn("font-mono", isModern ? "rounded-xl border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-cyber-blue/30")}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={encrypt}
                  className={cn(isModern ? "rounded-xl bg-white text-black hover:bg-white/90" : "bg-cyber-green hover:bg-cyber-green/80 text-black")}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt
                </Button>
                <Button
                  onClick={decrypt}
                  variant="outline"
                  className={cn(isModern ? "rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10")}
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Decrypt
                </Button>
                <Button
                  onClick={swapInputOutput}
                  variant="outline"
                  className={cn(isModern ? "rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10")}
                >
                  ↕ Swap
                </Button>
              </div>

              {/* Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="output">Output</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowOutput(!showOutput)}
                      className={cn(isModern ? "hover:bg-white/5" : "text-gray-400 hover:text-white")}
                    >
                      {showOutput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                      disabled={!output}
                      className={cn(isModern ? "hover:bg-white/5" : "text-gray-400 hover:text-white")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    id="output"
                    value={showOutput ? output : '•'.repeat(output.length)}
                    readOnly
                    className={cn("font-mono", isModern ? "rounded-xl border-white/10 bg-white/[0.03]" : "bg-cyber-darker border-cyber-green/30")}
                    placeholder="Output will appear here..."
                  />
                </div>
              </div>

              {/* Information */}
              <div className={cn("p-4 rounded-xl border", isModern ? "border-white/10 bg-white/[0.03]" : "bg-cyber-darker/50 border-cyber-blue/20")}>
                <h4 className={cn("font-semibold mb-2", isModern ? "text-foreground" : "text-cyber-blue")}>About {method.toUpperCase()}:</h4>
                {method === 'caesar' && (
                  <p className={cn("text-sm", isModern ? "text-muted-foreground" : "text-gray-300")}>
                    Caesar cipher shifts each letter by a fixed number of positions in the alphabet. 
                    Formula: E_n(x) = (x + n) mod 26
                  </p>
                )}
                {method === 'rot13' && (
                  <p className={cn("text-sm", isModern ? "text-muted-foreground" : "text-gray-300")}>
                    ROT13 is a Caesar cipher with a shift of 13. It's its own inverse, meaning applying it twice returns the original text.
                  </p>
                )}
                {method === 'base64' && (
                  <p className={cn("text-sm", isModern ? "text-muted-foreground" : "text-gray-300")}>
                    Base64 encoding converts binary data to ASCII text. Commonly used in web applications and email systems.
                  </p>
                )}
                {method === 'reverse' && (
                  <p className={cn("text-sm", isModern ? "text-muted-foreground" : "text-gray-300")}>
                    Simple text reversal. While not cryptographically secure, it demonstrates basic text manipulation.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CryptoTool;