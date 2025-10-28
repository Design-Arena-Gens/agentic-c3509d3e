"use client";

import { useState, useEffect } from "react";
import ClaimForm from "./components/ClaimForm";
import SuccessScreen from "./components/SuccessScreen";
import HistoryLog from "./components/HistoryLog";
import BiometricAuth from "./components/BiometricAuth";

export interface RedPacket {
  id: string;
  code: string;
  amount: number;
  currency: string;
  timestamp: number;
  status: "claimed" | "pending";
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [claimedPacket, setClaimedPacket] = useState<RedPacket | null>(null);
  const [history, setHistory] = useState<RedPacket[]>([]);
  const [activeTab, setActiveTab] = useState<"claim" | "history">("claim");

  useEffect(() => {
    const savedHistory = localStorage.getItem("redPacketHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleClaim = (packet: RedPacket) => {
    const updatedHistory = [packet, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("redPacketHistory", JSON.stringify(updatedHistory));
    setClaimedPacket(packet);
    setShowSuccess(true);
  };

  const handleBackToClaim = () => {
    setShowSuccess(false);
    setClaimedPacket(null);
  };

  if (!isAuthenticated) {
    return <BiometricAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-binance-dark/95 backdrop-blur-sm border-b border-binance-lightgray">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-binance-yellow rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-binance-dark"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.86-1.12-6.5-5.19-6.5-9.5V8.3l6.5-3.11 6.5 3.11V11c0 4.31-2.64 8.38-6.5 9.5z" />
                  <path d="M8 11l2 2 4-4 1.5 1.5L10 16l-3.5-3.5L8 11z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-binance-text">Red Packet Claimer</h1>
                <p className="text-xs text-binance-muted">Binance Rewards</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-[72px] z-10 bg-binance-dark/95 backdrop-blur-sm border-b border-binance-lightgray">
        <div className="max-w-md mx-auto px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("claim")}
              className={`flex-1 py-3 px-4 font-semibold transition-all duration-200 border-b-2 focus-ring ${
                activeTab === "claim"
                  ? "text-binance-yellow border-binance-yellow"
                  : "text-binance-muted border-transparent hover:text-binance-text"
              }`}
              aria-label="Claim Red Packet"
            >
              Claim
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-3 px-4 font-semibold transition-all duration-200 border-b-2 focus-ring ${
                activeTab === "history"
                  ? "text-binance-yellow border-binance-yellow"
                  : "text-binance-muted border-transparent hover:text-binance-text"
              }`}
              aria-label="View History"
            >
              History
              {history.length > 0 && (
                <span className="ml-2 bg-binance-yellow text-binance-dark text-xs font-bold rounded-full px-2 py-0.5">
                  {history.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-md mx-auto px-4 py-6">
          {showSuccess && claimedPacket ? (
            <SuccessScreen packet={claimedPacket} onBack={handleBackToClaim} />
          ) : activeTab === "claim" ? (
            <ClaimForm onClaim={handleClaim} />
          ) : (
            <HistoryLog history={history} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-binance-dark border-t border-binance-lightgray py-4">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="text-xs text-binance-muted">
            Secured by biometric authentication • Binance © 2025
          </p>
        </div>
      </footer>
    </main>
  );
}
