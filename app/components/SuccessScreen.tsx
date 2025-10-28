"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RedPacket } from "../page";

interface SuccessScreenProps {
  packet: RedPacket;
  onBack: () => void;
}

export default function SuccessScreen({ packet, onBack }: SuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const confettiColors = [
    "#F0B90B",
    "#FCD535",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
  ];

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "50%",
                  y: "50%",
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.8],
                  x: `${Math.random() * 200 - 100}%`,
                  y: `${Math.random() * 200 - 100}%`,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 rounded-full pointer-events-none"
                style={{
                  backgroundColor:
                    confettiColors[Math.floor(Math.random() * confettiColors.length)],
                  left: "50%",
                  top: "40%",
                }}
                aria-hidden="true"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Success Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 text-center space-y-6 px-4 w-full max-w-md"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="w-28 h-28 bg-gradient-to-br from-binance-yellow to-binance-gold rounded-full flex items-center justify-center mx-auto shadow-2xl relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-binance-yellow rounded-full blur-xl"
            aria-hidden="true"
          />
          <svg
            className="w-16 h-16 text-binance-dark relative z-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-binance-text mb-2">
            Congratulations! 🎉
          </h2>
          <p className="text-binance-muted">
            You've successfully claimed your red packet
          </p>
        </motion.div>

        {/* Amount Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card bg-gradient-to-br from-binance-gray to-binance-lightgray border-2 border-binance-yellow/30"
        >
          <div className="text-center">
            <p className="text-sm text-binance-muted mb-2 font-semibold">
              AMOUNT RECEIVED
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
              className="text-5xl font-bold text-binance-yellow mb-2"
            >
              {packet.amount}
            </motion.div>
            <p className="text-xl font-semibold text-binance-text">
              {packet.currency}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-binance-lightgray space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-binance-muted">Code:</span>
              <span className="font-mono text-binance-text font-semibold">
                {packet.code}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-binance-muted">Transaction ID:</span>
              <span className="font-mono text-binance-text text-xs">
                {packet.id.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-binance-muted">Time:</span>
              <span className="text-binance-text">
                {new Date(packet.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-3 pt-4"
        >
          <button
            onClick={onBack}
            className="btn-primary w-full"
            aria-label="Claim another red packet"
          >
            Claim Another
          </button>
          <button
            onClick={() => {
              // Simulate sharing functionality
              if (navigator.share) {
                navigator.share({
                  title: "Binance Red Packet",
                  text: `I just claimed ${packet.amount} ${packet.currency} from a Binance red packet!`,
                });
              }
            }}
            className="btn-secondary w-full flex items-center justify-center gap-2"
            aria-label="Share your success"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            Share Success
          </button>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-2 text-green-400 text-sm"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <span>Securely added to your wallet</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
