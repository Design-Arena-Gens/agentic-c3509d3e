"use client";

import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import type { RedPacket } from "../page";

interface HistoryLogProps {
  history: RedPacket[];
}

export default function HistoryLog({ history }: HistoryLogProps) {
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 bg-binance-gray rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-binance-muted"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-binance-text mb-2">
          No History Yet
        </h3>
        <p className="text-binance-muted">
          Your claimed red packets will appear here
        </p>
      </motion.div>
    );
  }

  const totalAmount = history.reduce((sum, packet) => sum + packet.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-binance-gray to-binance-lightgray border border-binance-yellow/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-binance-muted mb-1 font-semibold">
              TOTAL CLAIMED
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-binance-yellow">
                {totalAmount}
              </span>
              <span className="text-lg text-binance-text">USDT</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-binance-muted mb-1 font-semibold">
              RED PACKETS
            </p>
            <span className="text-3xl font-bold text-binance-text">
              {history.length}
            </span>
          </div>
        </div>
      </motion.div>

      {/* History List */}
      <div>
        <h3 className="text-lg font-bold text-binance-text mb-4 px-1">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {history.map((packet, index) => (
            <motion.div
              key={packet.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:bg-binance-lightgray transition-colors duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-binance-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-binance-yellow/30 transition-colors">
                  <svg
                    className="w-7 h-7 text-binance-yellow"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                  </svg>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-binance-text">
                      +{packet.amount} {packet.currency}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Claimed
                    </span>
                  </div>
                  <p className="text-sm text-binance-muted font-mono truncate">
                    Code: {packet.code}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <svg
                      className="w-3 h-3 text-binance-muted"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    <span className="text-xs text-binance-muted">
                      {formatDistanceToNow(packet.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                    <span className="text-xs text-binance-muted">•</span>
                    <span className="text-xs text-binance-muted">
                      {format(packet.timestamp, "MMM d, h:mm a")}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  className="w-5 h-5 text-binance-muted group-hover:text-binance-yellow transition-colors flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-4"
      >
        <button
          onClick={() => {
            // Export history as JSON
            const dataStr = JSON.stringify(history, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `binance-red-packets-${format(
              Date.now(),
              "yyyy-MM-dd"
            )}.json`;
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          aria-label="Export history"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
          </svg>
          Export History
        </button>
      </motion.div>
    </div>
  );
}
