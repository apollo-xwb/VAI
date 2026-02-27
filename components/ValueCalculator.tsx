
import React, { useState, useMemo } from 'react';

export const ValueCalculator: React.FC = () => {
  const [avgValue, setAvgValue] = useState(5000);
  const [missedCalls, setMissedCalls] = useState(20);
  const [staffSalary, setStaffSalary] = useState(3500);
  const [showInsights, setShowInsights] = useState(false);

  const results = useMemo(() => {
    const months = 12;
    const recoveryRate = 0.2; // 20% of missed calls that Fourcee meaningfully recovers
    const automationShare = 0.3; // portion of front-desk workload offloaded to AI

    const extraBookingsPerMonth = missedCalls * recoveryRate;
    const extraBookingsYear = extraBookingsPerMonth * months;
    const addedRevenue = extraBookingsYear * avgValue;

    const staffingSavings = staffSalary * months * automationShare;
    const totalBenefit = addedRevenue + staffingSavings;
    const monthlyBenefit = totalBenefit / months || 0;
    const roiMonths = monthlyBenefit > 0 ? 3000 / monthlyBenefit : Infinity;

    return {
      annual: totalBenefit,
      roiMonths,
      recoveryRate,
      automationShare,
      extraBookingsPerMonth,
      extraBookingsYear,
      addedRevenue,
      staffingSavings,
      monthlyBenefit,
    };
  }, [avgValue, missedCalls, staffSalary]);

  const formatCurrency = (value: number) =>
    value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const roiMonthsLabel =
    results.roiMonths === Infinity || Number.isNaN(results.roiMonths)
      ? '—'
      : results.roiMonths.toFixed(1);

  return (
    <div className="glass-card rounded-[2.5rem] p-10 shadow-2xl border border-silver-100 dark:border-navy-800 w-full min-w-0 transition-colors">
      <h3 className="text-2xl font-bold mb-2 text-navy-900 dark:text-white serif">Value Calculator</h3>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-navy-400 dark:text-navy-300 mb-6">
        Calculate ROI now — see if Fourcee is even worth it for your current setup.
      </p>
      
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
            <p className="text-4xl font-bold text-navy-900 dark:text-white serif">
              {formatCurrency(results.annual)}
            </p>
          </div>
          <div className="bg-navy-900 dark:bg-white text-white dark:text-navy-950 px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-xl">
            ROI in {roiMonthsLabel} Months
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowInsights((prev) => !prev)}
          className="mt-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-500 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-navy-300/70 dark:border-navy-600/70 text-[9px] font-semibold">
            i
          </span>
          <span>Show the math behind this ROI</span>
        </button>

        {showInsights && (
          <div className="mt-4 rounded-2xl bg-navy-950/90 dark:bg-black/70 text-navy-50 px-5 py-4 text-xs leading-relaxed space-y-2 border border-white/10">
            <p className="font-semibold uppercase tracking-[0.18em] text-[9px] text-emerald-300">
              How we arrive at your annual value
            </p>
            <p>
              • Missed-call recovery: {missedCalls} missed calls/month × {(results.recoveryRate * 100).toFixed(0)}% of
              those saved by Fourcee × 12 months × {formatCurrency(avgValue)} average piece value ≈{' '}
              <span className="font-semibold">{formatCurrency(results.addedRevenue)}</span> in reclaimed sales
              opportunity.
            </p>
            <p>
              • Front-desk efficiency: assuming Fourcee quietly handles {(results.automationShare * 100).toFixed(0)}% of
              your phone load, that&apos;s about{' '}
              <span className="font-semibold">{formatCurrency(results.staffingSavings)}</span> per year in staff time
              you can redirect to white-glove client work instead of chasing the phone.
            </p>
            <p>
              • Combined lift: {formatCurrency(results.addedRevenue)} + {formatCurrency(results.staffingSavings)} ≈{' '}
              <span className="font-semibold">{formatCurrency(results.annual)}</span> extra economic value flowing
              through your showroom each year at these inputs.
            </p>
            {roiMonthsLabel !== '—' && (
              <p>
                • Payback window: a {formatCurrency(3000)} setup fee ÷ about{' '}
                <span className="font-semibold">{formatCurrency(results.monthlyBenefit)}</span> of monthly uplift means
                you typically earn the setup back in roughly{' '}
                <span className="font-semibold">{roiMonthsLabel} months</span> — then it&apos;s pure upside.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
