import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useUiMode } from "@/theme/ui-mode";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Email {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  bodyHTML: string;
  isPhish: boolean;
  clues: string[];
}

interface GameState {
  currentEmailIndex: number;
  score: number;
  totalEmails: number;
  gameComplete: boolean;
  showFeedback: boolean;
  userAnswer: boolean | null;
  correctAnswer: boolean;
}

type SpotThePhishProps = {
  embedded?: boolean;
};

const SpotThePhish = ({ embedded = false }: SpotThePhishProps) => {
  const navigate = useNavigate();
  const { mode } = useUiMode();
  const isModern = mode === "modern";

  const emails: Email[] = [
    {
      id: 1,
      senderName: 'Bank of Amereca Security',
      senderEmail: 'secure-alert@bofa-logins.com',
      subject: 'Unusual Sign-in Detected on Your Account',
      bodyHTML: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <p>Dear Customer,</p>
          <p>Our system detected an unusual sign-in to your account from a new device. For your security, please verify your identity immediately.</p>
          <p>Click here to review your account: <a href="http://login.bofa-logins.com/verify" title="http://login.bofa-logins.com/verify">https://www.bankofamerica.com/login</a></p>
          <p>Thank you,<br/>The Security Team</p>
        </div>
      `,
      isPhish: true,
      clues: [
        "The sender's name 'Amereca' is misspelled - should be 'America'",
        "The sender's domain 'bofa-logins.com' is not the official bank domain",
        "The link text shows the real URL, but hovering reveals it goes to the fake domain",
        "Generic greeting 'Dear Customer' instead of your actual name",
        "Creates urgency with 'immediately' to pressure quick action"
      ]
    },
    {
      id: 2,
      senderName: 'Workday',
      senderEmail: 'noreply@workday.com',
      subject: 'Your Payslip for July 15, 2025 is now available',
      bodyHTML: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <p>Hello Alex,</p>
          <p>Your payslip for the period ending July 15, 2025, is available to view.</p>
          <p>Please log in to your secure portal to view it. There are no attachments in this email.</p>
          <p>Thank you,<br/>Your HR Department</p>
        </div>
      `,
      isPhish: false,
      clues: [
        "The sender address 'workday.com' is a known and trusted HR platform",
        "Uses a personal greeting with a name",
        "Doesn't ask you to click a direct link but advises logging into a known portal",
        "Correctly states there are no attachments, which is good security practice",
        "Professional tone without creating false urgency"
      ]
    },
    {
      id: 3,
      senderName: 'Amazon Customer Service',
      senderEmail: 'no-reply@amazon-security.net',
      subject: 'Your order has been cancelled - Action Required',
      bodyHTML: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <p>Dear Valued Customer,</p>
          <p>We regret to inform you that your recent order #AMZ-789456123 has been cancelled due to payment verification issues.</p>
          <p>To reinstate your order, please verify your payment information by clicking the link below:</p>
          <p><a href="http://amazon-verification.net/account-verify" title="http://amazon-verification.net/account-verify">Verify Payment Information</a></p>
          <p>If you do not verify within 24 hours, your account may be suspended.</p>
          <p>Best regards,<br/>Amazon Customer Service Team</p>
        </div>
      `,
      isPhish: true,
      clues: [
        "Domain 'amazon-security.net' is not Amazon's official domain (should be amazon.com)",
        "Creates false urgency with '24 hours' deadline and account suspension threat",
        "Generic greeting 'Dear Valued Customer' instead of your name",
        "Asks you to click a link to 'verify payment information' - legitimate companies don't do this",
        "The order number format looks suspicious and may not match Amazon's actual format"
      ]
    },
    {
      id: 4,
      senderName: 'Microsoft Office 365',
      senderEmail: 'admin@yourdomain.com',
      subject: 'Monthly Security Report - January 2025',
      bodyHTML: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <p>Hello,</p>
          <p>This is your monthly security report for your Office 365 tenant.</p>
          <p><strong>Summary:</strong></p>
          <ul>
            <li>No security incidents detected</li>
            <li>All users have MFA enabled</li>
            <li>Spam filtering blocked 247 messages</li>
          </ul>
          <p>For detailed reports, log into your admin center at admin.microsoft.com</p>
          <p>Best regards,<br/>Your IT Security Team</p>
        </div>
      `,
      isPhish: false,
      clues: [
        "Email comes from your own domain (@yourdomain.com), indicating internal IT communication",
        "Provides useful security information without asking for action",
        "Directs you to the official Microsoft admin portal (admin.microsoft.com)",
        "Professional format typical of automated security reports",
        "No suspicious links or requests for personal information"
      ]
    },
    {
      id: 5,
      senderName: 'PayPal Security',
      senderEmail: 'security@paypaI.com',
      subject: 'Suspicious Activity - Verify Your Account',
      bodyHTML: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <p>Dear PayPal User,</p>
          <p>We have detected suspicious activity on your PayPal account. Someone may be trying to access your account.</p>
          <p>Please click the link below to verify your identity and secure your account:</p>
          <p><a href="http://paypal-security-verify.com/login" title="http://paypal-security-verify.com/login">Verify Your PayPal Account</a></p>
          <p>If you ignore this message, your account will be limited within 48 hours.</p>
          <p>Thank you for your cooperation.</p>
        </div>
      `,
      isPhish: true,
      clues: [
        "The email address uses a capital 'I' instead of lowercase 'l' in 'paypaI.com' - this is a homograph attack",
        "Generic greeting 'Dear PayPal User' instead of your actual name",
        "Creates false urgency with account limitation threat",
        "Suspicious domain 'paypal-security-verify.com' instead of official paypal.com",
        "Asks you to click a link to verify identity, which PayPal advises against"
      ]
    }
  ];

  const [gameState, setGameState] = useState<GameState>({
    currentEmailIndex: 0,
    score: 0,
    totalEmails: emails.length,
    gameComplete: false,
    showFeedback: false,
    userAnswer: null,
    correctAnswer: false
  });

  const currentEmail = emails[gameState.currentEmailIndex];

  // Reset game on page reload/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Store a flag to indicate the page was refreshed
      sessionStorage.setItem('phishGameRefreshed', 'true');
    };

    const handleLoad = () => {
      // Check if page was refreshed and reset game if needed
      if (sessionStorage.getItem('phishGameRefreshed') === 'true') {
        sessionStorage.removeItem('phishGameRefreshed');
        resetGame();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    // Check on component mount if this is a refresh
    if (performance.navigation.type === 1) { // TYPE_RELOAD
      resetGame();
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleAnswer = (isPhish: boolean) => {
    const correct = isPhish === currentEmail.isPhish;
    setGameState(prev => ({
      ...prev,
      userAnswer: isPhish,
      correctAnswer: correct,
      showFeedback: true,
      score: correct ? prev.score + 1 : prev.score
    }));
  };

  const nextEmail = () => {
    const nextIndex = gameState.currentEmailIndex + 1;
    if (nextIndex >= emails.length) {
      setGameState(prev => ({
        ...prev,
        gameComplete: true,
        showFeedback: false
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentEmailIndex: nextIndex,
        showFeedback: false,
        userAnswer: null,
        correctAnswer: false
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      currentEmailIndex: 0,
      score: 0,
      totalEmails: emails.length,
      gameComplete: false,
      showFeedback: false,
      userAnswer: null,
      correctAnswer: false
    });
  };

  const getScoreMessage = () => {
    const percentage = (gameState.score / gameState.totalEmails) * 100;
    if (percentage >= 80) return "Excellent! You have strong phishing detection skills! 🛡️";
    if (percentage >= 60) return "Good job! You caught most of the threats. 👍";
    if (percentage >= 40) return "Not bad, but there's room for improvement. 📚";
    return "Consider taking a cybersecurity awareness course. 🎓";
  };

  return (
    <div className={cn(!embedded && "min-h-screen", !embedded && !isModern && "bg-cyber-dark")}>
      {!embedded && (
        <div className={cn("py-4 border-b", isModern ? "border-white/10 bg-background/40" : "bg-cyber-darker border-cyber-green/30")}>
          <div className={cn(isModern ? "mx-auto max-w-6xl px-4" : "container mx-auto px-4", "flex justify-between items-center")}>
            <button
              onClick={() => navigate('/')}
              className={cn(
                "transition-colors",
                isModern ? "text-muted-foreground hover:text-foreground" : "text-cyber-green hover:text-white font-mono"
              )}
            >
              ← Back to Portfolio
            </button>
            <h1 className={cn("text-xl sm:text-2xl font-semibold", isModern ? "text-foreground" : "font-bold cyber-text font-mono")}>
              Spot the Phish Challenge
            </h1>
            <div className={cn(isModern ? "text-muted-foreground text-sm" : "text-cyber-green font-mono")}>
              Score: {gameState.score} / {gameState.totalEmails}
            </div>
          </div>
        </div>
      )}

      <div className={cn(isModern ? "mx-auto max-w-6xl px-4 py-6" : "container mx-auto px-4 py-8")}>
        {!gameState.gameComplete ? (
          <div className="max-w-6xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className={cn("text-sm font-mono", isModern ? "text-muted-foreground" : "text-gray-400")}>
                  Email {gameState.currentEmailIndex + 1} of {gameState.totalEmails}
                </span>
                <span className={cn("text-sm font-mono", isModern ? "text-muted-foreground" : "text-gray-400")}>
                  Progress: {Math.round(((gameState.currentEmailIndex) / gameState.totalEmails) * 100)}%
                </span>
              </div>
              <div className={cn("w-full rounded-full h-2", isModern ? "bg-white/10" : "bg-gray-700")}>
                <div 
                  className={cn("h-2 rounded-full transition-all duration-300", isModern ? "bg-emerald-400" : "bg-cyber-green")}
                  style={{ width: `${(gameState.currentEmailIndex / gameState.totalEmails) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Email List */}
              <div className="lg:col-span-1">
                <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03] h-fit" : "bg-black border-cyber-green/30 h-fit")}>
                  <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-b border-cyber-green/30")}>
                    <CardTitle className={cn("font-mono text-lg", isModern ? "text-foreground" : "text-cyber-green")}>Inbox</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {emails.map((email, index) => (
                      <div
                        key={email.id}
                        className={cn(
                          "p-4 border-b cursor-pointer transition-colors",
                          isModern ? "border-white/10" : "border-gray-700",
                          index === gameState.currentEmailIndex 
                            ? (isModern ? "bg-white/[0.06]" : "bg-cyber-green/20 border-cyber-green/50")
                            : (isModern ? "hover:bg-white/[0.04]" : "hover:bg-gray-800")
                        )}
                      >
                        <div className={cn("text-sm truncate", isModern ? "text-foreground/90" : "text-gray-300")}>{email.senderName}</div>
                        <div className={cn("text-xs truncate", isModern ? "text-muted-foreground" : "text-gray-400")}>{email.subject}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Email Content */}
              <div className="lg:col-span-2">
                <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03]" : "bg-black border-cyber-green/30")}>
                  <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-b border-cyber-green/30")}>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className={cn("text-sm", isModern ? "text-muted-foreground" : "text-gray-400")}>From:</div>
                          <div className={cn("font-mono", isModern ? "text-foreground" : "text-cyber-green")}>
                            {currentEmail.senderName} &lt;{currentEmail.senderEmail}&gt;
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={cn("text-sm", isModern ? "text-muted-foreground" : "text-gray-400")}>Subject:</div>
                        <div className={cn("font-semibold", isModern ? "text-foreground" : "text-white")}>{currentEmail.subject}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div 
                      className={cn("mb-6 email-content", isModern ? "text-foreground/90" : "text-gray-300")}
                      dangerouslySetInnerHTML={{ __html: currentEmail.bodyHTML }}
                    />

                    {!gameState.showFeedback ? (
                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={() => handleAnswer(false)}
                          className={cn(isModern ? "rounded-xl" : "")}
                        >
                          ✅ This is Legitimate
                        </Button>
                        <Button
                          onClick={() => handleAnswer(true)}
                          variant="destructive"
                          className={cn(isModern ? "rounded-xl" : "")}
                        >
                          🚩 This is a Phish
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div
                          className={cn(
                            "p-4 rounded-lg border",
                            gameState.correctAnswer
                              ? (isModern ? "bg-emerald-500/10 border-emerald-500/30" : "bg-green-900/50 border-green-500")
                              : (isModern ? "bg-red-500/10 border-red-500/30" : "bg-red-900/50 border-red-500")
                          )}
                        >
                          <h3 className={`font-bold mb-2 ${gameState.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                            {gameState.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                          </h3>
                          <p className={cn(isModern ? "text-muted-foreground" : "text-gray-300")}>
                            This email was {currentEmail.isPhish ? 'a phishing attempt' : 'legitimate'}. 
                            {gameState.correctAnswer ? ' Great job spotting it!' : ' Here\'s what you should look for:'}
                          </p>
                        </div>

                        <div className={cn("p-4 rounded-lg border", isModern ? "border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-cyber-green/30")}>
                          <h4 className={cn("font-semibold mb-3", isModern ? "text-foreground" : "text-cyber-green")}>
                            {currentEmail.isPhish ? '🚨 Red Flags:' : '✅ Why it\'s safe:'}
                          </h4>
                          <ul className="space-y-2">
                            {currentEmail.clues.map((clue, index) => (
                              <li key={index} className={cn("text-sm flex items-start", isModern ? "text-muted-foreground" : "text-gray-300")}>
                                <span className={cn("mr-2", isModern ? "text-emerald-400" : "text-cyber-green")}>•</span>
                                {clue}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-center">
                          <Button
                            onClick={nextEmail}
                            className={cn(isModern ? "rounded-xl bg-white text-black hover:bg-white/90" : "bg-cyber-green text-black hover:bg-cyber-green/80")}
                          >
                            {gameState.currentEmailIndex === emails.length - 1 ? 'See Results' : 'Next Email →'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Game Complete Screen */
          <div className="max-w-2xl mx-auto text-center">
            <Card className={cn(isModern ? "rounded-2xl border border-white/10 bg-white/[0.03]" : "bg-black border-cyber-green/30 glow-effect")}>
              <CardHeader className={cn(isModern ? "border-b border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-b border-cyber-green/30")}>
                <CardTitle className={cn("font-mono text-2xl", isModern ? "text-foreground" : "text-cyber-green")}>Challenge Complete!</CardTitle>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className={cn("text-3xl font-bold mb-4", isModern ? "text-foreground" : "cyber-text")}>
                  You scored {gameState.score} out of {gameState.totalEmails}
                </h2>
                <p className={cn("text-lg mb-6", isModern ? "text-muted-foreground" : "text-xl text-gray-300")}>
                  {getScoreMessage()}
                </p>

                <div className={cn("p-6 rounded-lg border mb-6", isModern ? "border-white/10 bg-white/[0.03]" : "bg-cyber-dark border-cyber-green/30")}>
                  <h3 className={cn("font-semibold mb-4", isModern ? "text-foreground" : "text-cyber-green")}>📚 Key Takeaways:</h3>
                  <ul className={cn("text-left space-y-2", isModern ? "text-muted-foreground" : "text-gray-300")}>
                    <li>• Always verify sender domains carefully</li>
                    <li>• Hover over links to see their true destination</li>
                    <li>• Be suspicious of urgent language and threats</li>
                    <li>• Legitimate companies rarely ask for sensitive info via email</li>
                    <li>• When in doubt, contact the organization directly</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={resetGame}
                    className={cn(isModern ? "rounded-xl bg-white text-black hover:bg-white/90" : "bg-cyber-green text-black hover:bg-cyber-green/80")}
                  >
                    Play Again
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className={cn(isModern ? "rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "bg-gray-600 text-white hover:bg-gray-700")}
                  >
                    Back to Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style>{`
        .email-content a {
          color: ${isModern ? "rgba(165, 180, 252, 0.95)" : "#0066ff"};
          text-decoration: underline;
        }
        .email-content a:hover {
          color: ${isModern ? "rgba(110, 231, 183, 0.95)" : "#00ff41"};
        }
      `}</style>
    </div>
  );
};

export default SpotThePhish;