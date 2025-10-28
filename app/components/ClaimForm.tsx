"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { RedPacket } from "../page";

interface ClaimFormProps {
  onClaim: (packet: RedPacket) => void;
}

export default function ClaimForm({ onClaim }: ClaimFormProps) {
  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (code.length > 0) {
      validateCode(code);
    } else {
      setValidationMessage("");
      setError("");
    }
  }, [code]);

  const validateCode = (value: string) => {
    setIsValidating(true);
    setError("");
    setValidationMessage("");

    // Simulate real-time validation
    setTimeout(() => {
      if (value.length < 8) {
        setValidationMessage("Code must be at least 8 characters");
        setError("invalid");
      } else if (!/^[A-Z0-9]+$/i.test(value)) {
        setValidationMessage("Code can only contain letters and numbers");
        setError("invalid");
      } else {
        setValidationMessage("✓ Valid code format");
        setError("");
      }
      setIsValidating(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error === "invalid" || code.length < 8) {
      return;
    }

    setIsClaiming(true);
    setError("");

    // Simulate API call to claim red packet
    setTimeout(() => {
      // Simulate random success/failure
      const isSuccess = Math.random() > 0.2; // 80% success rate

      if (isSuccess) {
        const packet: RedPacket = {
          id: Math.random().toString(36).substr(2, 9),
          code: code.toUpperCase(),
          amount: Math.floor(Math.random() * 500) + 10,
          currency: "USDT",
          timestamp: Date.now(),
          status: "claimed",
        };
        onClaim(packet);
        setCode("");
      } else {
        setError("claim-failed");
        setValidationMessage("Red packet already claimed or expired");
      }
      setIsClaiming(false);
    }, 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text.trim());
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="w-24 h-24 bg-gradient-to-br from-binance-yellow to-binance-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
        >
          <svg
            className="w-14 h-14 text-binance-dark"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-binance-text mb-2">
          Claim Your Red Packet
        </h2>
        <p className="text-binance-muted">
          Enter your redemption code from Telegram
        </p>
      </motion.div>

      {/* Claim Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label
              htmlFor="redPacketCode"
              className="block text-sm font-semibold text-binance-text mb-2"
            >
              Redemption Code
            </label>
            <div className="relative">
              <input
                id="redPacketCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter code (e.g., ABC12345)"
                className={`input-field pr-20 font-mono text-lg tracking-wider ${
                  error === "invalid" || error === "claim-failed"
                    ? "input-error"
                    : ""
                }`}
                maxLength={20}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck="false"
                disabled={isClaiming}
                aria-describedby={
                  validationMessage ? "code-validation" : undefined
                }
                aria-invalid={error === "invalid" || error === "claim-failed"}
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-binance-lightgray hover:bg-binance-yellow hover:text-binance-dark text-binance-text px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 focus-ring"
                disabled={isClaiming}
                aria-label="Paste code from clipboard"
              >
                Paste
              </button>
            </div>
            {isValidating && (
              <div className="flex items-center gap-2 mt-2 text-sm text-binance-muted">
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Validating...</span>
              </div>
            )}
            {validationMessage && !isValidating && (
              <p
                id="code-validation"
                className={`mt-2 text-sm ${
                  error === "invalid" || error === "claim-failed"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
                role={
                  error === "invalid" || error === "claim-failed"
                    ? "alert"
                    : "status"
                }
              >
                {validationMessage}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={
              isClaiming ||
              error === "invalid" ||
              code.length < 8 ||
              isValidating
            }
            className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.98 }}
            aria-label="Claim red packet"
          >
            {isClaiming ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Claiming...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                </svg>
                Claim Now
              </span>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <div className="bg-binance-gray/50 rounded-lg p-4 border border-binance-lightgray/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-binance-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-binance-yellow"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-binance-text mb-1">
                How to claim?
              </h3>
              <p className="text-sm text-binance-muted leading-relaxed">
                Copy the redemption code from your Telegram message and paste
                it above. Each code can only be claimed once.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-binance-gray/50 rounded-lg p-4 border border-binance-lightgray/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-binance-text mb-1">
                Safe & Secure
              </h3>
              <p className="text-sm text-binance-muted leading-relaxed">
                All transactions are protected with biometric authentication and
                end-to-end encryption.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
