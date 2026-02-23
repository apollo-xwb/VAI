
import React, { useState } from 'react';
import { PACKAGES, UPSELLS } from '../constants.tsx';
import { CheckoutState } from '../types';

export const CheckoutFlow: React.FC = () => {
  const [state, setState] = useState<CheckoutState>({
    packageId: PACKAGES[1].id,
    upsells: [],
    form: {},
    step: 1
  });

  const selectedPackage = PACKAGES.find(p => p.id === state.packageId)!;
  const upsellTotal = UPSELLS.filter(u => state.upsells.includes(u.id)).reduce((acc, curr) => acc + curr.price, 0);
  const total = selectedPackage.price + upsellTotal;

  const nextStep = () => setState(s => ({ ...s, step: s.step + 1 }));
  const prevStep = () => setState(s => ({ ...s, step: Math.max(1, s.step - 1) }));

  const handleUpsellToggle = (id: string) => {
    setState(s => ({
      ...s,
      upsells: s.upsells.includes(id) ? s.upsells.filter(u => u !== id) : [...s.upsells, id]
    }));
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold serif text-center dark:text-white">Customize Your Solution</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {PACKAGES.map(pkg => (
                <div 
                  key={pkg.id}
                  onClick={() => setState(s => ({ ...s, packageId: pkg.id }))}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${state.packageId === pkg.id ? 'border-navy-900 dark:border-white bg-white dark:bg-navy-900 shadow-xl' : 'border-silver-200 dark:border-navy-800 hover:border-navy-300'}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-navy-400 dark:text-navy-300 mb-2">{pkg.name}</p>
                  <p className="text-3xl font-bold serif mb-4 dark:text-white">${pkg.price.toLocaleString()}</p>
                  <ul className="text-xs space-y-2 text-navy-600 dark:text-navy-400">
                    {pkg.features.map(f => <li key={f} className="flex items-center gap-2"><span className="text-navy-900 dark:text-white">✓</span> {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-navy-900/40 p-8 rounded-3xl border border-silver-100 dark:border-navy-800 shadow-sm">
              <h3 className="font-bold mb-6 uppercase text-[10px] tracking-widest text-navy-400 dark:text-navy-300">Premium Add-ons</h3>
              <div className="space-y-6">
                {UPSELLS.map(u => {
                  const isChecked = state.upsells.includes(u.id);
                  return (
                    <label key={u.id} className="flex items-start gap-4 cursor-pointer group">
                      {/* Custom rounded square checkbox */}
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleUpsellToggle(u.id)}
                          className="sr-only peer"
                        />
                        <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                          isChecked 
                            ? 'bg-white dark:bg-gray-200 border-white dark:border-gray-200' 
                            : 'bg-transparent border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500'
                        }`}>
                          {isChecked && (
                            <svg className="w-4 h-4 text-gray-900 dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base dark:text-white mb-1">{u.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{u.description}</p>
                      </div>
                      <span className="font-bold text-base dark:text-white flex-shrink-0 ml-4">+${u.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-3xl font-bold serif text-center dark:text-white">Business Details</h2>
            <div className="grid grid-cols-2 gap-6 bg-white dark:bg-navy-900/40 p-8 rounded-3xl border border-silver-100 dark:border-navy-800">
              <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase block mb-2 text-navy-400">Company Name</label>
                <input className="w-full p-4 rounded-xl border border-silver-200 dark:border-navy-700 dark:bg-navy-900 dark:text-white focus:outline-navy-900" placeholder="E.g. Royal Diamonds Ltd" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase block mb-2 text-navy-400">Contact Name</label>
                <input className="w-full p-4 rounded-xl border border-silver-200 dark:border-navy-700 dark:bg-navy-900 dark:text-white focus:outline-navy-900" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase block mb-2 text-navy-400">Email</label>
                <input className="w-full p-4 rounded-xl border border-silver-200 dark:border-navy-700 dark:bg-navy-900 dark:text-white focus:outline-navy-900" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase block mb-2 text-navy-400">Primary CRM</label>
                <select className="w-full p-4 rounded-xl border border-silver-200 dark:border-navy-700 dark:bg-navy-900 dark:text-white focus:outline-navy-900">
                  <option>HubSpot</option>
                  <option>Zoho</option>
                  <option>Salesforce</option>
                  <option>None / Custom</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-md mx-auto space-y-6 animate-in zoom-in duration-500">
            <h2 className="text-3xl font-bold serif text-center dark:text-white">Payment Secure</h2>
            <div className="bg-white dark:bg-navy-900/40 p-10 rounded-3xl shadow-xl border border-silver-100 dark:border-navy-800">
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase text-navy-400 mb-1">Due Today</p>
                <p className="text-5xl font-bold serif text-navy-900 dark:text-white">${total.toLocaleString()}</p>
                <p className="text-xs text-navy-400 mt-2 font-medium tracking-tight uppercase">+ ${selectedPackage.monthly}/mo maintenance</p>
              </div>
              <div className="space-y-4">
                <input className="w-full p-4 rounded-xl border border-silver-200 dark:border-navy-700 dark:bg-navy-900 dark:text-white" placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-4">
                  <input className="p-4 rounded-xl border border-silver-200 dark:border-navy-700 dark:bg-navy-900 dark:text-white" placeholder="MM/YY" />
                  <input className="p-4 rounded-xl border border-silver-200 dark:border-navy-700 dark:bg-navy-900 dark:text-white" placeholder="CVC" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-center text-navy-400 uppercase tracking-widest">Powered by Fourcee Secure Vault</p>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-6 py-20 animate-in bounce-in duration-700">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto text-5xl">✓</div>
            <h2 className="text-4xl font-bold serif dark:text-white">Deployment Started</h2>
            <p className="text-xl text-navy-700 dark:text-navy-300 max-w-lg mx-auto leading-relaxed">Your tailored voice model is now in fabrication. Expect a reach-out within 120 minutes.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-navy-900 dark:bg-white text-white dark:text-navy-950 rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-2xl transition-all"
            >
              Return to Showroom
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-8 md:pb-12 px-6 bg-transparent transition-colors">
      <div className="max-w-5xl mx-auto">
        {state.step < 4 && (
          <div className="flex justify-between items-center mb-16 px-4">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1 flex flex-col items-center gap-3 relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-md ${state.step >= s ? 'bg-navy-900 dark:bg-white text-white dark:text-navy-950' : 'bg-silver-100 dark:bg-navy-800 text-navy-300'}`}>
                  {s}
                </div>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${state.step >= s ? 'text-navy-900 dark:text-white' : 'text-navy-300'}`}>
                  {s === 1 ? 'Configure' : s === 2 ? 'Details' : 'Checkout'}
                </span>
                {s < 3 && <div className={`absolute top-6 left-[60%] w-[80%] h-[2px] ${state.step > s ? 'bg-navy-900 dark:bg-white' : 'bg-silver-100 dark:bg-navy-800'}`} />}
              </div>
            ))}
          </div>
        )}
        
        {renderStep()}

        {state.step < 4 && (
          <div className="mt-16 flex justify-between items-center">
            <button 
              onClick={prevStep}
              disabled={state.step === 1}
              className={`text-navy-400 dark:text-navy-500 font-bold text-[10px] uppercase tracking-widest hover:text-navy-900 dark:hover:text-white transition-colors ${state.step === 1 ? 'opacity-0' : ''}`}
            >
              ← Prev
            </button>
            <button 
              onClick={nextStep}
              className="bg-navy-900 dark:bg-white text-white dark:text-navy-950 px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              {state.step === 3 ? `Authorize $${total.toLocaleString()}` : 'Forward →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
