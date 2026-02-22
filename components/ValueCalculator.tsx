
import React, { useState, useMemo } from 'react';

export const ValueCalculator: React.FC = () => {
  const [avgValue, setAvgValue] = useState(5000);
  const [missedCalls, setMissedCalls] = useState(20);
  const [staffSalary, setStaffSalary] = useState(3500);

  const results = useMemo(() => {
    const extraBookingsYear = missedCalls * 0.2 * 12;
    const addedRevenue = extraBookingsYear * avgValue;
    const staffingSavings = staffSalary * 12; 
    const totalBenefit = addedRevenue + staffingSavings;
    
    return {
      annual: totalBenefit,
      roiMonths: (3000 / (totalBenefit / 12)).toFixed(1)
    };
  }, [avgValue, missedCalls, staffSalary]);

  return (
    <div className="glass-card rounded-[2.5rem] p-10 shadow-2xl border border-silver-100 dark:border-navy-800 w-full min-w-0 transition-colors">
      <h3 className="text-2xl font-bold mb-8 text-navy-900 dark:text-white serif">Value Calculator</h3>
      
      <div className="space-y-8">
        <div>
          <label className="flex justify-between text-[10px] font-bold mb-3 text-navy-500 dark:text-navy-300 uppercase tracking-[0.2em]">
            <span>Avg. Piece Value</span>
            <span className="text-navy-900 dark:text-white">${avgValue.toLocaleString()}</span>
          </label>
          <input 
            type="range" min="1000" max="50000" step="500" 
            value={avgValue} 
            onChange={(e) => setAvgValue(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="flex justify-between text-[10px] font-bold mb-3 text-navy-500 dark:text-navy-300 uppercase tracking-[0.2em]">
            <span>Monthly Missed Calls</span>
            <span className="text-navy-900 dark:text-white">{missedCalls}</span>
          </label>
          <input 
            type="range" min="0" max="100" step="5" 
            value={missedCalls} 
            onChange={(e) => setMissedCalls(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="flex justify-between text-[10px] font-bold mb-3 text-navy-500 dark:text-navy-300 uppercase tracking-[0.2em]">
            <span>Monthly Staff Salary Cost</span>
            <span className="text-navy-900 dark:text-white">${staffSalary.toLocaleString()}</span>
          </label>
          <input 
            type="range" min="1000" max="10000" step="100" 
            value={staffSalary} 
            onChange={(e) => setStaffSalary(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="pt-8 border-t border-navy-100 dark:border-navy-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-[10px] uppercase text-navy-400 dark:text-navy-500 font-bold tracking-[0.2em]">Est. Annual Value</p>
            <p className="text-4xl font-bold text-navy-900 dark:text-white serif">${results.annual.toLocaleString()}</p>
          </div>
          <div className="bg-navy-900 dark:bg-white text-white dark:text-navy-950 px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-xl">
            ROI in {results.roiMonths} Months
          </div>
        </div>
      </div>
    </div>
  );
};
