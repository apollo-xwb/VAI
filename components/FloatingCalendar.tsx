
import React, { useState } from 'react';

export const FloatingCalendar: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <div className={`fixed bottom-24 right-8 z-[90] transition-all duration-500 ease-in-out ${isMinimized ? 'translate-y-0' : '-translate-y-4'}`}>
      {isMinimized ? (
        <button 
          onClick={() => setIsMinimized(false)}
          className="glass-card p-4 rounded-2xl border border-navy-900/10 shadow-2xl flex items-center gap-3 group hover:scale-105 active:scale-95 transition-all"
        >
          <div className="w-10 h-10 bg-navy-900 dark:bg-white text-white dark:text-navy-950 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div className="text-left pr-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-navy-400 dark:text-navy-300">Calendar</p>
            <p className="text-xs font-bold text-navy-900 dark:text-white">Book Demo</p>
          </div>
        </button>
      ) : (
        <div className="glass-card w-[350px] rounded-[2.5rem] overflow-hidden border border-navy-900/10 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
          <div className="p-6 bg-navy-900 dark:bg-white flex justify-between items-center">
            <p className="text-white dark:text-navy-950 font-bold serif">Select a Date</p>
            <button onClick={() => setIsMinimized(true)} className="text-white dark:text-navy-950 opacity-60 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <div className="p-8 bg-white dark:bg-navy-900">
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['S','M','T','W','T','F','S'].map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-navy-300">{d}</div>
              ))}
              {Array.from({length: 31}).map((_, i) => (
                <button 
                  key={i} 
                  className={`h-10 w-10 rounded-xl text-xs font-bold transition-all ${i === 14 ? 'bg-navy-900 text-white dark:bg-white dark:text-navy-950' : 'hover:bg-navy-50 dark:hover:bg-navy-800 text-navy-900 dark:text-white'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button className="w-full py-4 bg-navy-900 dark:bg-white text-white dark:text-navy-950 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all">
              Confirm slot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
