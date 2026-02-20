
import React, { useState, useEffect } from 'react';
import { Diamond3D } from './Diamond3D';
import { EtherealShadow } from './ui/etheral-shadow';

const STATS = [
  "Jewelers lose 40% of leads to missed calls.",
  "Custom ring inquiries peak between 8 PM and 11 PM.",
  "92% of high-end clients expect instant booking confirmation.",
  "AI response times are 120x faster than traditional front desks.",
  "One missed $5k sale covers 18 months of Fourcee service."
];

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stat] = useState(() => STATS[Math.floor(Math.random() * STATS.length)]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(onComplete, 800);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <EtherealShadow 
          color="rgba(16, 42, 67, 0.15)"
          animation={{ scale: 100, speed: 20 }}
          noise={{ opacity: 0.4, scale: 1.2 }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="mb-12 animate-in zoom-in duration-1000">
          <Diamond3D size="180px" />
        </div>
        <div className="max-w-xs text-center space-y-4 px-6 animate-in slide-in-from-bottom duration-700 delay-300">
          <h1 className="text-3xl font-bold serif tracking-tighter shimmer-text">FOURCEE</h1>
          <div className="h-[2px] w-12 bg-navy-100 mx-auto" />
          <p className="text-sm font-medium text-navy-400 uppercase tracking-widest leading-relaxed">
            {stat}
          </p>
        </div>
      </div>
    </div>
  );
};
