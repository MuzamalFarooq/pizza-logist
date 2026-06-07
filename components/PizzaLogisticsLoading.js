"use client";
import React, { useState, useEffect } from "react";

const MESSAGES = [
  "Connecting to the database...",
  "Stretching the digital dough...",
  "Preparing fresh toppings...",
  "Preheating the logistics oven...",
  "Baking the interface...",
  "Slicing the menu data..."
];

export default function PizzaLogisticsLoading({ fullScreen = true }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={fullScreen ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-neutral-900 via-stone-950 to-black text-white p-6" : "relative flex flex-col items-center justify-center bg-radial from-neutral-900 via-stone-950 to-black text-white p-6 rounded-2xl min-h-100 overflow-hidden w-full"}>
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-red-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-55 h-55 bg-orange-500/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Main loading card */}
      <div className="relative flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Pizza SVG Wrapper */}
        <div className="relative mb-8 mt-4">
          <svg
            viewBox="0 0 100 100"
            className="w-28 h-28 animate-bounce filter drop-shadow-[0_12px_24px_rgba(239,68,68,0.45)]"
          >
            {/* Pizza Crust */}
            <path
              d="M15,30 Q50,15 85,30 L50,85 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Pizza Sauce / Base */}
            <path d="M20,33 Q50,20 80,33 L50,80 Z" fill="#EF4444" />
            {/* Pizza Cheese */}
            <path d="M22,36 Q50,24 78,36 L50,76 Z" fill="#FBBF24" />
            {/* Pepperonis */}
            <circle cx="38" cy="45" r="6.5" fill="#DC2626" />
            <circle cx="36" cy="43" r="2.5" fill="#F87171" opacity="0.7" />
            
            <circle cx="62" cy="48" r="6.5" fill="#DC2626" />
            <circle cx="60" cy="46" r="2.5" fill="#F87171" opacity="0.7" />
            
            <circle cx="50" cy="62" r="5.5" fill="#DC2626" />
            <circle cx="48" cy="60" r="2" fill="#F87171" opacity="0.7" />
            {/* Melted Cheese drip */}
            <path
              d="M49,74 Q51,81 53,74"
              fill="#FBBF24"
              stroke="#FBBF24"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Steam Elements */}
          <svg
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-12 overflow-visible pointer-events-none"
            viewBox="0 0 60 30"
          >
            <path
              d="M15,25 Q20,15 15,5"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="steam-line steam-line-1"
            />
            <path
              d="M30,25 Q35,15 30,5"
              stroke="#F97316"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="steam-line steam-line-2"
            />
            <path
              d="M45,25 Q50,15 45,5"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="steam-line steam-line-3"
            />
          </svg>
        </div>

        {/* Brand Name with gradient */}
        <h1 className="text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-linear-to-r from-red-500 via-orange-500 to-amber-500 mb-2 drop-shadow-md">
          Pizza Logistics
        </h1>

        {/* Custom Loading Progress Bar */}
        <div className="relative w-48 h-1.5 bg-stone-850 rounded-full overflow-hidden mb-6 border border-stone-800/50">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-red-500 to-orange-500 rounded-full animate-loading-bar" />
        </div>

        {/* Dynamic cycling messages */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-sm font-semibold text-stone-300 animate-pulse tracking-wide transition-all duration-300">
            {MESSAGES[messageIndex]}
          </p>
        </div>
      </div>

      {/* Embedded CSS for custom keyframes and animations */}
      <style>{`
        @keyframes steam {
          0% {
            transform: translateY(12px) scaleX(0.7);
            opacity: 0;
          }
          40% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-18px) scaleX(1.3);
            opacity: 0;
          }
        }
        @keyframes loading-bar {
          0% {
            left: -35%;
            width: 35%;
          }
          50% {
            width: 50%;
          }
          100% {
            left: 100%;
            width: 35%;
          }
        }
        .steam-line {
          animation: steam 2.2s infinite ease-out;
        }
        .steam-line-1 {
          animation-delay: 0s;
        }
        .steam-line-2 {
          animation-delay: 0.7s;
        }
        .steam-line-3 {
          animation-delay: 1.4s;
        }
        .animate-loading-bar {
          animation: loading-bar 1.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
