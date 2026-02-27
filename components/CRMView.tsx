
import React, { useState } from 'react';
import { CallRecord } from '../types';
import fcShad from '../public/assets/fcshad.png';

const MOCK_CALLS: CallRecord[] = [
  { id: '1', caller: '+1 (555) 0123', duration: '4:12', status: 'Booked', sentiment: 'Positive', timestamp: '10:45 AM', transcript: "Hi, I'm looking for a 2ct sapphire engagement ring. Your AI suggested a consultation on Friday at 4 PM, which works perfectly." },
  { id: '2', caller: 'Sarah Jenkins', duration: '2:45', status: 'Estimate', sentiment: 'Neutral', timestamp: '9:30 AM', transcript: "Can I get a rough estimate for resizing an 18k gold band? AI quoted $150-200. I'll bring it in tomorrow." },
  { id: '3', caller: '+1 (415) 8881', duration: '1:20', status: 'Missed', sentiment: 'Urgent', timestamp: '8:15 AM', transcript: "Calling about the custom pendant. Need to change the engraving text before production starts." },
  { id: '4', caller: 'Robert Miller', duration: '6:30', status: 'Inquiry', sentiment: 'Positive', timestamp: 'Yesterday', transcript: "Discussing the clarity difference between VVS1 and VS2. AI provided a great comparison chart." },
];

interface CRMViewProps {
  isDarkMode?: boolean;
}

export const CRMView: React.FC<CRMViewProps> = ({ isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'billing'>('overview');
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Total Calls" value="1,284" sub="+12% from last week" />
              <StatCard title="Bookings" value="42" sub="3.2% conversion" color="text-green-600" />
              <StatCard title="Value Captured" value="$64,500" sub="Est. through AI" color="text-navy-900 dark:text-white" />
              <StatCard title="AI Uptime" value="100%" sub="Active since Oct 1" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 glass-card rounded-[2.5rem] p-8 border border-silver-100 dark:border-navy-800">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold serif text-slate-900 dark:text-white">Live AI Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-navy-400">Agent Online</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-pearl-50 dark:bg-navy-900/30 border border-navy-50 dark:border-navy-800">
                    <p className="text-[10px] font-bold uppercase text-navy-400 mb-2">Current Focus</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Handling inquiries for "Holiday Custom Pieces" and "Engagement Consultations".</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border border-silver-50 dark:border-navy-800">
                      <p className="text-[10px] font-bold uppercase text-navy-400 mb-1">Peak Hours</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">19:00 - 22:30</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-silver-50 dark:border-navy-800">
                      <p className="text-[10px] font-bold uppercase text-navy-400 mb-1">Sentiment Avg</p>
                      <p className="text-lg font-bold text-green-600">8.4 / 10</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 border border-silver-100 dark:border-navy-800">
                <h3 className="text-xl font-bold serif mb-6 text-slate-900 dark:text-white">Account Health</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase mb-2">
                      <span className="text-navy-400">Monthly Usage</span>
                      <span className="text-navy-900 dark:text-white">72%</span>
                    </div>
                    <div className="h-2 w-full bg-navy-50 dark:bg-navy-900 rounded-full overflow-hidden">
                      <div className="h-full bg-navy-900 dark:bg-white rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-navy-50 dark:border-navy-800">
                    <p className="text-[10px] uppercase font-bold text-navy-400 mb-4">Plan Actions</p>
                    <button onClick={() => setActiveTab('billing')} className="w-full py-3 text-xs font-bold uppercase tracking-widest text-navy-900 dark:text-white border border-navy-100 dark:border-navy-800 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-all">
                      Manage Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'calls':
        return (
          <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="md:col-span-2 space-y-4">
              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-silver-100 dark:border-navy-800">
                <table className="w-full text-left">
                  <thead className="bg-navy-50/30 dark:bg-navy-900/50 border-b border-navy-100 dark:border-navy-800">
                    <tr className="text-[10px] uppercase font-bold text-navy-400 dark:text-navy-300 tracking-widest">
                      <th className="px-8 py-6">Caller</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6">Sentiment</th>
                      <th className="px-8 py-6">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-50 dark:divide-navy-800">
                    {MOCK_CALLS.map(call => (
                      <tr 
                        key={call.id} 
                        className={`hover:bg-navy-50/50 dark:hover:bg-navy-800/30 cursor-pointer transition-colors ${selectedCall?.id === call.id ? 'bg-navy-50 dark:bg-navy-800/50' : ''}`}
                        onClick={() => setSelectedCall(call)}
                      >
                        <td className="px-8 py-6 text-sm font-bold text-navy-900 dark:text-white">{call.caller}</td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-tighter ${
                            call.status === 'Booked' ? 'bg-green-100 text-green-700' : 
                            call.status === 'Missed' ? 'bg-red-100 text-red-700' : 'bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-200'
                          }`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`flex items-center gap-2 text-xs font-bold ${
                            call.sentiment === 'Positive' ? 'text-green-600' : 
                            call.sentiment === 'Urgent' ? 'text-orange-600' : 'text-navy-400 dark:text-navy-300'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                               call.sentiment === 'Positive' ? 'bg-green-600' : 
                               call.sentiment === 'Urgent' ? 'bg-orange-600' : 'bg-navy-400'
                            }`} />
                            {call.sentiment}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-[10px] font-bold text-navy-300 uppercase">{call.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              {selectedCall ? (
                <div className="glass-card rounded-[2.5rem] p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 border border-silver-100 dark:border-navy-800">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-navy-400 mb-3 tracking-[0.2em]">Full Transcription</p>
                    <div className="text-sm italic text-navy-700 dark:text-navy-200 leading-relaxed bg-pearl-50 dark:bg-navy-900/30 p-6 rounded-2xl border border-navy-50 dark:border-navy-800">
                      "{selectedCall.transcript}"
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <button className="w-full py-4 bg-navy-900 dark:bg-white text-white dark:text-navy-950 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:shadow-2xl transition-all">
                      Listen to Recording
                    </button>
                    <button className="w-full py-4 border border-navy-100 dark:border-navy-800 text-navy-900 dark:text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-navy-50 dark:hover:bg-navy-800 transition-all">
                      Flag for Follow-up
                    </button>
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-[2.5rem] p-16 text-center text-navy-300 border border-silver-100 dark:border-navy-800">
                  <p className="serif text-lg mb-2">No Selection</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Select a log for AI intelligence</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="glass-card rounded-[3rem] p-12 border border-silver-100 dark:border-navy-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-navy-500/5 blur-[100px] pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                <div>
                  <h3 className="text-3xl font-bold serif text-slate-900 dark:text-white mb-2">Premium Suite</h3>
                  <p className="text-sm font-medium text-navy-400 uppercase tracking-widest">Active • Next bill: Nov 24, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold dark:text-white serif">$199<span className="text-sm font-sans text-navy-400">/mo</span></p>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-navy-900 dark:text-white mt-2 border-b border-navy-900 dark:border-white">Change Plan</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-navy-50 dark:border-navy-800">
                <div>
                  <h4 className="text-[10px] font-bold uppercase text-navy-400 mb-6 tracking-widest">Billing History</h4>
                  <div className="space-y-4">
                    {[
                      { date: 'Oct 24, 2025', amount: '$199.00', status: 'Paid' },
                      { date: 'Sep 24, 2025', amount: '$199.00', status: 'Paid' },
                      { date: 'Aug 24, 2025', amount: '$4,199.00', status: 'Paid (Setup + Plan)' }
                    ].map((bill, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm py-2 border-b border-navy-50 dark:border-navy-900/50">
                        <span className="font-medium dark:text-white">{bill.date}</span>
                        <div className="text-right">
                          <p className="font-bold dark:text-white">{bill.amount}</p>
                          <p className="text-[10px] text-navy-400 font-bold uppercase tracking-tight">{bill.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase text-navy-400 mb-6 tracking-widest">Included Features</h4>
                  <ul className="space-y-3">
                    {['Estimates & Quotes', 'CRM Real-time Sync', 'Luxury AI Voice', 'Priority Support'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm font-medium dark:text-navy-100">
                        <span className="text-green-600">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-10 w-full py-4 bg-navy-950 dark:bg-white text-white dark:text-navy-950 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Add Multi-Location Access (+$100/mo)
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-12 pb-8 md:pb-12 px-6 bg-transparent transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="animate-in slide-in-from-left-4 duration-700">
          <img
            src={fcShad}
            alt="Fourcee mark"
            className={`h-8 md:h-10 mb-4 object-contain ${isDarkMode ? 'invert' : ''}`}
          />
            <h1 className="text-5xl font-bold serif text-navy-900 dark:text-white tracking-tighter">Showroom Portal</h1>
            <p className="text-navy-400 dark:text-navy-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">The Gold Standard in Jeweller AI</p>
          </div>
          <div className="flex bg-pearl-50 dark:bg-navy-900 p-1.5 rounded-2xl border border-navy-100 dark:border-navy-800 animate-in slide-in-from-right-4 duration-700">
            {(['overview', 'calls', 'billing'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? 'bg-navy-900 dark:bg-white text-white dark:text-navy-950 shadow-xl' 
                    : 'text-navy-400 hover:text-navy-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; sub: string; color?: string }> = ({ title, value, sub, color = 'text-navy-900 dark:text-white' }) => (
  <div className="glass-card rounded-[2rem] p-8 border border-silver-50 dark:border-navy-800 shadow-xl transition-all hover:-translate-y-1">
    <p className="text-[10px] font-bold uppercase text-navy-400 dark:text-navy-500 tracking-[0.2em] mb-2">{title}</p>
    <p className={`text-3xl font-bold serif ${color}`}>{value}</p>
    <p className="text-[10px] font-bold text-navy-300 dark:text-navy-600 mt-2 uppercase tracking-tight">{sub}</p>
  </div>
);
