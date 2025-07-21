import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

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

const SpotThePhish = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-cyber-dark">
      {/* Header */}
      <div className="bg-cyber-darker border-b border-cyber-green/30 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-cyber-green hover:text-white transition-colors font-mono"
          >
            ← Back to Portfolio
          </button>
          <h1 className="text-2xl font-bold cyber-text font-mono">Spot the Phish Challenge</h1>
          <div className="text-cyber-green font-mono">
            Score: {gameState.score} / {gameState.totalEmails}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!gameState.gameComplete ? (
          <div className="max-w-6xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-mono text-gray-400">
                  Email {gameState.currentEmailIndex + 1} of {gameState.totalEmails}
                </span>
                <span className="text-sm font-mono text-gray-400">
                  Progress: {Math.round(((gameState.currentEmailIndex) / gameState.totalEmails) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-cyber-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(gameState.currentEmailIndex / gameState.totalEmails) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Email List */}
              <div className="lg:col-span-1">
                <Card className="bg-black border-cyber-green/30 h-fit">
                  <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
                    <CardTitle className="text-cyber-green font-mono text-lg">Inbox</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {emails.map((email, index) => (
                      <div
                        key={email.id}
                        className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                          index === gameState.currentEmailIndex 
                            ? 'bg-cyber-green/20 border-cyber-green/50' 
                            : 'hover:bg-gray-800'
                        }`}
                      >
                        <div className="text-sm text-gray-300 truncate">{email.senderName}</div>
                        <div className="text-xs text-gray-400 truncate">{email.subject}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Email Content */}
              <div className="lg:col-span-2">
                <Card className="bg-black border-cyber-green/30">
                  <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm text-gray-400">From:</div>
                          <div className="text-cyber-green font-mono">
                            {currentEmail.senderName} &lt;{currentEmail.senderEmail}&gt;
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Subject:</div>
                        <div className="text-white font-semibold">{currentEmail.subject}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div 
                      className="text-gray-300 mb-6 email-content"
                      dangerouslySetInnerHTML={{ __html: currentEmail.bodyHTML }}
                    />

                    {!gameState.showFeedback ? (
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => handleAnswer(false)}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          ✅ This is Legitimate
                        </button>
                        <button
                          onClick={() => handleAnswer(true)}
                          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          🚩 This is a Phish
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${gameState.correctAnswer ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'}`}>
                          <h3 className={`font-bold mb-2 ${gameState.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                            {gameState.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                          </h3>
                          <p className="text-gray-300">
                            This email was {currentEmail.isPhish ? 'a phishing attempt' : 'legitimate'}. 
                            {gameState.correctAnswer ? ' Great job spotting it!' : ' Here\'s what you should look for:'}
                          </p>
                        </div>

                        <div className="p-4 bg-cyber-dark rounded-lg border border-cyber-green/30">
                          <h4 className="text-cyber-green font-semibold mb-3">
                            {currentEmail.isPhish ? '🚨 Red Flags:' : '✅ Why it\'s safe:'}
                          </h4>
                          <ul className="space-y-2">
                            {currentEmail.clues.map((clue, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <span className="text-cyber-green mr-2">•</span>
                                {clue}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-center">
                          <button
                            onClick={nextEmail}
                            className="px-6 py-3 bg-cyber-green text-black font-semibold rounded-lg hover:bg-cyber-green/80 transition-colors"
                          >
                            {gameState.currentEmailIndex === emails.length - 1 ? 'See Results' : 'Next Email →'}
                          </button>
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
            <Card className="bg-black border-cyber-green/30 glow-effect">
              <CardHeader className="bg-cyber-dark border-b border-cyber-green/30">
                <CardTitle className="text-cyber-green font-mono text-2xl">Challenge Complete!</CardTitle>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold cyber-text mb-4">
                  You scored {gameState.score} out of {gameState.totalEmails}
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  {getScoreMessage()}
                </p>

                <div className="bg-cyber-dark p-6 rounded-lg border border-cyber-green/30 mb-6">
                  <h3 className="text-cyber-green font-semibold mb-4">📚 Key Takeaways:</h3>
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• Always verify sender domains carefully</li>
                    <li>• Hover over links to see their true destination</li>
                    <li>• Be suspicious of urgent language and threats</li>
                    <li>• Legitimate companies rarely ask for sensitive info via email</li>
                    <li>• When in doubt, contact the organization directly</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-cyber-green text-black font-semibold rounded-lg hover:bg-cyber-green/80 transition-colors"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back to Portfolio
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
        .email-content a {
          color: #0066ff;
          text-decoration: underline;
        }
        .email-content a:hover {
          color: #00ff41;
        }
      `}</style>
    </div>
  );
};

export default SpotThePhish;