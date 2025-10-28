"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BiometricAuthProps {
  onAuthSuccess: () => void;
}

export default function BiometricAuth({ onAuthSuccess }: BiometricAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    setError("");

    // Check if Web Authentication API is available
    if (window.PublicKeyCredential) {
      try {
        // In production, this would call the actual WebAuthn API
        // For demo purposes, we'll simulate authentication
        await new Promise((resolve) => setTimeout(resolve, 1500));
        onAuthSuccess();
      } catch (err) {
        setError("Biometric authentication failed. Please try PIN.");
        setIsAuthenticating(false);
      }
    } else {
      // Fallback to PIN entry
      setError("Biometric authentication not available on this device.");
      setIsAuthenticating(false);
    }
  };

  const handlePinAuth = () => {
    // Simulate PIN authentication
    setIsAuthenticating(true);
    setTimeout(() => {
      onAuthSuccess();
    }, 1000);
  };

  const handleSkipAuth = () => {
    // For demo purposes, allow skip
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-binance-yellow rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <svg
              className="w-12 h-12 text-binance-dark"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.86-1.12-6.5-5.19-6.5-9.5V8.3l6.5-3.11 6.5 3.11V11c0 4.31-2.64 8.38-6.5 9.5z" />
              <path d="M8 11l2 2 4-4 1.5 1.5L10 16l-3.5-3.5L8 11z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-binance-text mb-2">
            Secure Access
          </h1>
          <p className="text-binance-muted">
            Authenticate to claim your red packets
          </p>
        </div>

        <div className="card space-y-4">
          {error && (
            <div
              className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            onClick={handleBiometricAuth}
            disabled={isAuthenticating}
            className="btn-primary w-full flex items-center justify-center gap-3"
            aria-label="Authenticate with biometrics"
          >
            {isAuthenticating ? (
              <>
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
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 1C8.676 1 6 3.676 6 7c0 1.858.852 3.518 2.184 4.617C5.917 13.029 4 15.688 4 18.786V23h16v-4.214c0-3.098-1.917-5.757-4.184-7.169C17.148 10.518 18 8.858 18 7c0-3.324-2.676-6-6-6zm0 2c2.243 0 4 1.757 4 4s-1.757 4-4 4-4-1.757-4-4 1.757-4 4-4zm0 10c3.097 0 5.632 2.348 5.95 5.357L18 19H6l.05-.643C6.368 15.348 8.903 13 12 13z" />
                </svg>
                <span>Use Biometric</span>
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-binance-lightgray"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-binance-gray text-binance-muted">
                or
              </span>
            </div>
          </div>

          <button
            onClick={handlePinAuth}
            disabled={isAuthenticating}
            className="btn-secondary w-full flex items-center justify-center gap-3"
            aria-label="Authenticate with PIN"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
            </svg>
            <span>Use PIN</span>
          </button>

          <button
            onClick={handleSkipAuth}
            className="w-full text-binance-muted hover:text-binance-text text-sm py-2 transition-colors focus-ring rounded"
            aria-label="Skip authentication"
          >
            Skip for now
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-binance-muted">
            🔒 Your biometric data is stored securely on your device
          </p>
        </div>
      </motion.div>
    </div>
  );
}
