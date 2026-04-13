import React, { useEffect, useMemo, useState } from 'react';

interface CRMViewProps {
  isDarkMode?: boolean;
}

interface LeadLog {
  id: string;
  time: string;
  customerName: string;
  intent: string;
  status: string;
}

type PortalTab = 'simulation' | 'overview';

const formatMoney = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const CRMView: React.FC<CRMViewProps> = () => {
  const [activeTab, setActiveTab] = useState<PortalTab>('simulation');
  const [revenueSaved, setRevenueSaved] = useState(125500);
  const [appointmentsBooked, setAppointmentsBooked] = useState(48);
  const [logEntries, setLogEntries] = useState<LeadLog[]>([]);
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  // Customize these names to simulate your exact showroom personas.
  const simulatedNames = useMemo(
    () => [
      'Amelia Stone',
      'Noah Patel',
      'Harper Wellington',
      'Mason Brooks',
      'Sophia Vale',
      'Ethan Rhodes',
      'Olivia Sterling',
      'Liam Carter',
    ],
    []
  );

  // Customize these intent labels to match your future campaign angles.
  const simulatedIntents = useMemo(
    () => [
      'Oval Diamond Query',
      'Halo Ring Consultation',
      'Emerald Cut Upgrade',
      'Lab-Grown Bridal Request',
      'Custom Setting Appointment',
      'Eye-Clean Diamond Clarification',
      '2.5ct Comparison Request',
    ],
    []
  );

  const transcriptScript = useMemo(
    () =>
      [
        'Agent: Thank you for calling Fourcee Vault. How may I assist you today?',
        'Customer: I am looking for eye-clean diamonds and want to compare oval options.',
        'Agent: Perfect. I can see availability now. Would a private showroom consultation suit you?',
        'Customer: Yes, can I do today at 2 PM?',
        'Agent: Confirmed. You are booked for 2 PM. A confirmation SMS is on the way.',
      ].join(' '),
    []
  );

  useEffect(() => {
    const pushLead = () => {
      const now = new Date();
      const customerName = simulatedNames[Math.floor(Math.random() * simulatedNames.length)];
      const intent = simulatedIntents[Math.floor(Math.random() * simulatedIntents.length)];

      setLogEntries((prev) => [
        {
          id: `${now.getTime()}-${Math.random()}`,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          customerName,
          intent,
          status: '✅ Qualified & Booked',
        },
        ...prev,
      ].slice(0, 12));
    };

    pushLead();
    const startDelayMs = 10000 + Math.floor(Math.random() * 5001);
    let nextTimeout: ReturnType<typeof setTimeout>;
    let timeoutCancelled = false;

    const schedule = (delayMs: number) => {
      nextTimeout = setTimeout(() => {
        if (timeoutCancelled) return;
        pushLead();
        schedule(10000 + Math.floor(Math.random() * 5001));
      }, delayMs);
    };

    schedule(startDelayMs);
    return () => {
      timeoutCancelled = true;
      clearTimeout(nextTimeout);
    };
  }, [simulatedIntents, simulatedNames]);

  useEffect(() => {
    const metricInterval = setInterval(() => {
      setRevenueSaved((prev) => prev + Math.floor(Math.random() * 1900) + 300);
      setAppointmentsBooked((prev) => prev + (Math.random() > 0.45 ? 1 : 0));
    }, 5000);
    return () => clearInterval(metricInterval);
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTranscriptIndex((prev) => {
        if (prev >= transcriptScript.length) return prev;
        return prev + 1;
      });
    }, 34);
    return () => clearInterval(typingInterval);
  }, [transcriptScript]);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10 text-[#E7E7E7]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <h1 className="text-xs uppercase tracking-[0.35em] text-[#CCFF00]/80">Showroom Portal</h1>
        <div className="flex rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-xl">
          {(['simulation', 'overview'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] transition ${
                activeTab === tab ? 'bg-[#CCFF00] text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="mx-auto mt-8 grid w-full max-w-7xl gap-4 md:grid-cols-3">
          <OverviewCard title="Revenue Saved" value={formatMoney(revenueSaved)} />
          <OverviewCard title="Appointments Booked (AI)" value={appointmentsBooked.toString()} />
          <OverviewCard title="Average Handling Time" value="1.2 Mins" />
        </div>
      ) : (
        <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-6">
          <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-black via-[#111111] to-[#1C1C1C] p-6 md:p-8 shadow-[0_20px_100px_rgba(0,0,0,0.65)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(204,255,0,0.2),transparent_38%)]" />
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#CCFF00]/70">FOURCEE</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  FOURCEE — Intelligence Engine
                </h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Global Vault Sync</p>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#CCFF00]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
                  Online
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-[0.3em] text-[#CCFF00]">Lead Collision Log</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/55">Live Stream</p>
              </div>
              <div className="space-y-2">
                {logEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="grid gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs md:grid-cols-[0.7fr_1fr_1.4fr_1fr]"
                  >
                    <span className="text-white/60">{entry.time}</span>
                    <span className="font-medium text-white">{entry.customerName}</span>
                    <span className="text-white/80">{entry.intent}</span>
                    <span className="font-medium text-[#CCFF00]">{entry.status}</span>
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#CCFF00]">Live Transcription</h3>
              <div className="mt-4 min-h-[300px] rounded-2xl border border-white/10 bg-black/50 p-4 text-sm leading-relaxed text-white/85">
                <span className="whitespace-pre-wrap">
                  {transcriptScript.slice(0, transcriptIndex)}
                  {transcriptIndex < transcriptScript.length && (
                    <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[#CCFF00]" />
                  )}
                </span>
              </div>
            </aside>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Revenue Saved" value={formatMoney(revenueSaved)} />
            <MetricCard label="Appointments Booked (AI)" value={appointmentsBooked.toString()} />
            <MetricCard label="Average Handling Time" value="1.2 Mins" />
          </div>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
    <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">{label}</p>
    <p className="mt-3 text-2xl font-semibold tracking-tight text-[#CCFF00] md:text-3xl">{value}</p>
  </div>
);

const OverviewCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
    <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">{title}</p>
    <p className="mt-3 text-3xl font-semibold text-[#CCFF00]">{value}</p>
  </div>
);
