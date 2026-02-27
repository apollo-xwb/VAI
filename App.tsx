import React, { useState, useEffect, useRef } from 'react';
import { AppView, BlogPost } from './types';
import { FloatingNav } from './components/FloatingNav';

import logoUrl from './assets/logo.png';
import demoImage from './public/assets/placeholder.gif';
import workflowImage from './assets/workflow5.png';
import nivodaGif from './public/assets/nivoda.gif';
import fcShad from './public/assets/fcshad.png';
import { ValueCalculator } from './components/ValueCalculator';
import { PricingSection } from './components/ui/pricing';
import { EtherealShadow } from './components/ui/etheral-shadow';
import { DottedSurface } from './components/ui/dotted-surface';
import DisplayCards from './components/ui/display-cards';
import { PendantFBX } from './components/PendantFBX';
import { IncomingCallPhone } from './components/ui/incoming-call-phone';
import { MiniPhone } from './components/ui/mini-phone';
import { PhoneCall, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckoutFlow } from './components/CheckoutFlow';
import { CRMView } from './components/CRMView';
import { SplashScreen } from './components/SplashScreen';
import { PhoneTester } from './components/PhoneTester';
import { FloatingCalendar } from './components/FloatingCalendar';
import { FaqMonochrome } from './components/ui/faq-monochrome.tsx';
import { ArticleCard } from './components/ui/blog-post-card';
import { BLOG_POSTS, PACKAGES } from './constants';

const INTEGRATIONS_DATA = [
  {
    category: "CRM Platforms",
    popular: ["Salesforce", "HubSpot"],
    others: ["Zoho CRM", "Pipedrive", "GoHighLevel", "monday CRM"],
    description: "For lead creation, customer notes, history pulls, and automated tagging."
  },
  {
    category: "Calendar & Scheduling",
    popular: ["Google Calendar", "Calendly"],
    others: ["Microsoft Outlook", "Office 365", "Cal.com", "Apple Calendar"],
    description: "Seamless consultation booking and staff availability sync."
  },
  {
    category: "E-commerce & Orders",
    popular: ["Shopify", "WooCommerce"],
    others: ["BigCommerce", "Squarespace Commerce", "Magento", "Adobe Commerce"],
    description: "Real-time order status, inventory checks, and cross-channel sync."
  },
  {
    category: "Jewelry-Specific ERP/POS",
    popular: ["Nivoda", "Jewel360"],
    others: ["PIRO", "Gem Logic", "Orderry", "GOIS", "CaratIQ", "SalesBinder", "RapNet", "IDEXonline"],
    description: "Deep Nivoda integration for live diamond sourcing, repair tracking, and stock checks via direct API."
  },
  {
    category: "Communication & SMS",
    popular: ["Twilio", "Zapier"],
    others: ["Vonage", "MessageBird", "Sinch", "Plivo", "RingCentral", "Nextiva"],
    description: "Automated follow-ups, confirmations, and reminders across all channels."
  },
  {
    category: "Utilities & Enhancements",
    popular: ["Metal Price APIs", "Google Workspace"],
    others: ["Make (Integromat)", "Microsoft 365", "Gmail", "Outlook Email"],
    description: "Real-time gold/diamond rates and broad ecosystem confirmations."
  }
];

const JOURNEY_STEPS = [
  {
    label: "1. Select package",
    description: "Choose Starter, Premium or Enterprise based on call volume and complexity.",
  },
  {
    label: "2. Onboarding workshop",
    description: "Map your scripts, tone, safe-guards and escalation rules with our team.",
  },
  {
    label: "3. Setup & integrations",
    description: "Wire up Nivoda, calendars, telephony and your CRM so data flows both ways.",
  },
  {
    label: "4. Testing & hardening",
    description: "You and your team stress-test every edge case before a single live caller hears it.",
  },
  {
    label: "5. Iterate & refine",
    description: "We tune prompts and flows based on real transcripts until it feels on-brand.",
  },
  {
    label: "6. Go-live & handover",
    description: "We flip the switch together and train your team on the controls.",
  },
  {
    label: "7. Analytics & CRM portal",
    description: "Track every call, conversion and transcript inside the analytics portal and your CRM.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is this meant to replace my front-desk team?",
    answer:
      "No. Fourcee mops up the after-hours, overflow and repetitive questions so your humans can focus on design consults, VIPs and in-person selling. You decide when and where it answers, and when to route straight to a human.",
    meta: "Team",
  },
  {
    question: "What if Fourcee misunderstands a high‑value client?",
    answer:
      "We bias everything toward \"fail-safe\": strict guardrails, human handoff paths and clear escalation rules for high-ticket intents. During testing we rehearse VIP scenarios until you are comfortable before going live.",
    meta: "Safeguards",
  },
  {
    question: "How heavy is the Nivoda / CRM integration lift on our side?",
    answer:
      "We handle the plumbing. You give us access to Nivoda, calendars and your CRM, and we build the flows, sync logic and testing harness. Your team focuses on approvals, not middleware.",
    meta: "Integrations",
  },
  {
    question: "What if we don’t like the voice or phrasing?",
    answer:
      "Voice, pacing and phrasing are part of onboarding. We can voice-clone a key team member or choose a premium voice, then iterate until it feels like \"your\" showroom answering, not a generic bot.",
    meta: "Brand",
  },
  {
    question: "How are calls recorded and where do the analytics live?",
    answer:
      "Every call can be recorded, transcribed and summarised with timestamps. Those summaries and stats land in an analytics portal and, where supported, directly inside your CRM against the contact record.",
    meta: "Data",
  },
  {
    question: "What happens if we feel the ROI isn’t there?",
    answer:
      "The setup fee is once-off and covers the build. After that, you’re on a simple subscription. If performance isn’t where it should be, we iterate with you; if it still doesn’t fit, you can talk to us about pausing or stepping down your deployment.",
    meta: "ROI",
  },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTester, setShowTester] = useState(false);
  const [expandedIntegration, setExpandedIntegration] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = logoUrl;
  }, []);

  const navigate = (view: AppView, post?: BlogPost) => {
    setCurrentView(view);
    if (post) setSelectedPost(post);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  if (!isReady) {
    return <SplashScreen onComplete={() => setIsReady(true)} />;
  }

  const LandingPage = ({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => {
    const problemRef = useRef<HTMLElement>(null);
    const demoRef = useRef<HTMLElement>(null);
    const { scrollYProgress: problemScroll } = useScroll({
      target: problemRef,
      offset: ["start end", "end start"],
      container: scrollContainerRef,
    });
    const { scrollYProgress: demoScroll } = useScroll({
      target: demoRef,
      offset: ["start end", "center center"],
      container: scrollContainerRef,
    });

    const cardsY = useTransform(problemScroll, [0, 1], [-150, 150]);
    const demoScale = useTransform(demoScroll, [0, 0.5, 1], [0.94, 1, 1]);
    const demoOpacity = useTransform(demoScroll, [0, 0.4], [0.7, 1]);
    const demoY = useTransform(demoScroll, [0, 0.5], [16, 0]);

    const scrollToSectionById = (id: string) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const target = container.querySelector<HTMLElement>(`#${id}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const scrollToRoi = () => scrollToSectionById('roi-section');
    const scrollToPricing = () => scrollToSectionById('pricing');

    return (
    <div className="animate-in fade-in duration-1000 pb-32 md:pb-40">
      {/* Hero: ring left (between hero text and Test Fourcee), text + form right; mobile: text → ring → form */}
      <section className="snap-start snap-always min-h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 py-8 md:py-24 overflow-hidden bg-transparent transition-colors">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] md:h-[260px]">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white dark:via-navy-950/70 dark:to-navy-950"
          />
          <DottedSurface
            isDarkMode={isDarkMode}
            className="bottom-0 h-full w-full opacity-80 [mask-image:linear-gradient(to_top,black,transparent)]"
          />
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-20 lg:gap-x-28 md:gap-y-10 items-start md:items-center">
          <div className="absolute top-8 sm:top-8 md:top-12 left-[68%] sm:left-[60%] md:left-[58%] -translate-x-1/2 z-20 flex justify-center">
            <img
              src={fcShad}
              alt="Fourcee Crest"
              className={`h-16 sm:h-20 md:h-24 w-auto drop-shadow-[0_18px_45px_rgba(0,0,0,0.65)] opacity-100 ${isDarkMode ? 'invert' : ''}`}
            />
          </div>
          {/* Hero text — mobile first, desktop top-right */}
          <div className="order-1 md:order-2 md:row-start-1 text-center md:text-right">
            <div className="relative z-10 max-w-2xl md:ml-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 text-slate-900 dark:text-white serif leading-[1.1] tracking-tighter">
                The Gold Standard <br/><span className="italic shimmer-text">of Voice AI</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-navy-300 font-medium leading-relaxed uppercase tracking-[0.25em] text-[10px] md:text-[12px]">
                Tailored exclusively for high-end jewelers
              </p>
            </div>
          </div>
          {/* Ring — mobile middle, desktop left and vertically centered between text and form */}
          <div className="order-2 md:order-1 md:row-span-2 md:self-center flex justify-center w-full">
            <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[600px] aspect-square max-h-[50vh] sm:max-h-[55vh] md:max-h-[65vh] min-h-[260px] sm:min-h-[300px] md:min-h-[360px]">
              <PendantFBX className="w-full h-full" />
            </div>
          </div>
          {/* Mobile ROI CTA — sits above Test Fourcee on small screens */}
          <div className="order-3 w-full flex justify-center md:hidden mt-6">
            <button
              type="button"
              onClick={scrollToRoi}
              className="group inline-flex items-center gap-3 rounded-full border border-navy-300/60 bg-white/80 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800 shadow-sm hover:bg-white transition-colors"
            >
              <span>Calculate ROI now</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-white shadow">
                <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Test Fourcee — mobile last, desktop bottom-right */}
          <div className="order-4 md:order-3 md:row-start-2 flex justify-center md:justify-end">
            <div className="w-full max-w-sm">
              <MiniPhone isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 hidden md:flex justify-center">
          <button
            type="button"
            onClick={scrollToRoi}
            className="group inline-flex items-center gap-3 rounded-full border border-navy-300/60 dark:border-navy-600/60 bg-white/70 dark:bg-white/5 px-6 py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-navy-700 dark:text-navy-100 shadow-sm hover:bg-white dark:hover:bg-white/10 transition-colors"
          >
            <span>Calculate ROI now</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-950 shadow">
              <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* ROI / Value Calculator Section */}
      <section id="roi-section" className="snap-start snap-always min-h-screen flex flex-col justify-center px-4 sm:px-6 py-16 md:py-24 bg-transparent">
        <div className="w-full max-w-6xl mx-auto grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy-400 dark:text-navy-300">
              See if the numbers make sense
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold serif text-navy-900 dark:text-white tracking-tight">
              Is Fourcee actually worth it
              <br className="hidden md:block" /> for your showroom?
            </h2>
            <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 max-w-xl">
              Drag the sliders based on your real averages. We&apos;ll show you how much unlocked revenue and reclaimed
              staff time your showroom could be compounding every year.
            </p>
            <ValueCalculator />
          </div>
          <div className="flex flex-col gap-6">
            <div className="glass-card p-8 rounded-[2.5rem] border border-navy-50 shadow-xl dark:border-navy-800">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Live Performance Signals
              </p>
              <div className="space-y-4">
                {[
                  "95%+ Resolution Rate on qualified calls",
                  "24/7 coverage while your team sleeps",
                  "Analytics portal and CRM view of every conversation",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-navy-900 dark:bg-white rounded-full" />
                    <span className="font-bold text-base md:text-lg text-navy-900 dark:text-navy-50 tracking-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate(AppView.CHECKOUT)}
              className="w-full py-5 bg-navy-900 dark:bg-white dark:text-navy-950 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Start Free Deployment →
            </button>
          </div>
        </div>
      </section>

      {/* Problem Step - Moved below Hero: blue + grid faded at top and bottom */}
      <section ref={problemRef} className="snap-start snap-always min-h-screen flex flex-col justify-center py-32 px-6 text-white relative overflow-hidden border-y border-white/5">
        <div
          className="absolute inset-0 pointer-events-none bg-navy-950"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            maskSize: '100% 100%',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 md:h-72">
          <DottedSurface
            isDarkMode
            className="h-full w-full opacity-80 [mask-image:linear-gradient(to_top,black,transparent)]"
          />
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-7xl font-bold serif leading-tight">
              Silence is <br/><span className="italic text-silver-400">Expensive</span>
            </h2>
            <p className="text-xl text-silver-300 font-light leading-relaxed max-w-lg">
              Every missed call after 6 PM is a client wandering into your competitor's showroom. Fourcee captures the revenue you're currently leaving on the table.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-5xl font-bold mb-1 serif">$50k</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silver-500">Annual Opportunity Loss</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-1 serif">0</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silver-500">Missed Opportunities with AI</p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] flex items-start justify-center pt-4">
            <motion.div 
              style={{ y: cardsY }}
              className="relative group z-10 mt-16"
            >
              <div className="absolute -inset-10 bg-navy-900/50 blur-[100px] group-hover:bg-navy-800/50 transition-all"></div>
              <DisplayCards 
                cards={[
                  {
                    icon: <PhoneCall className="size-4 text-red-400" />,
                    title: "Missed Opportunity",
                    description: "$12,000 Anniversary Inquiry",
                    date: "Sunday, 8:14 PM",
                    iconClassName: "text-red-500",
                    titleClassName: "text-red-500",
                    className: "[grid-area:stack] -translate-y-6 hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                  },
                  {
                    icon: <PhoneCall className="size-4 text-red-400" />,
                    title: "Missed Opportunity",
                    description: "$8,500 Engagement Lead",
                    date: "Saturday, 9:30 PM",
                    iconClassName: "text-red-500",
                    titleClassName: "text-red-500",
                    className: "[grid-area:stack] translate-x-12 translate-y-2 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                  },
                  {
                    icon: <PhoneCall className="size-4 text-red-400" />,
                    title: "Missed Opportunity",
                    description: "$15,000 Watch Inquiry",
                    date: "Yesterday, 11:45 PM",
                    iconClassName: "text-red-500",
                    titleClassName: "text-red-500",
                    className: "[grid-area:stack] translate-x-24 translate-y-10 hover:translate-y-6",
                  },
                ]}
              />
            </motion.div>
            <div className="absolute bottom-0 -left-10 p-8 glass-card rounded-[2rem] border-white/10 max-w-xs text-navy-950 dark:text-white shadow-2xl z-20">
              <p className="italic text-lg serif leading-tight">"We missed a $12k anniversary lead on a Sunday. Never again."</p>
              <p className="text-[10px] uppercase font-bold mt-4 tracking-widest text-navy-400 dark:text-navy-300">— London Diamonds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section - scroll-linked effect on video placeholder */}
      <section ref={demoRef} id="demo" className="snap-start snap-always min-h-screen flex flex-col justify-center py-32 px-6 bg-transparent relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold serif text-navy-900 dark:text-white mb-12 text-center tracking-tighter">Experience the Demo</h2>
          <motion.div
            style={{ scale: demoScale, opacity: demoOpacity, y: demoY }}
            className="relative w-full max-w-4xl aspect-video rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] group origin-center"
          >
             <img src={demoImage} alt="Demo" className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <button className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                  <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 14L14.41 8 4.018 2v12z"/></svg>
                </button>
                <div className="mt-8 text-center max-w-md px-6">
                  <p className="text-xl serif italic leading-relaxed">"Fourcee didn't just replace our receptionist; it enhanced the entire client experience. Our ROI was instant."</p>
                  <p className="text-[10px] uppercase font-bold mt-4 tracking-widest">— Julianna Rossi, Rossi Haute Joaillerie</p>
                </div>
             </div>
          </motion.div>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-950 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.25em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Select a package</span>
            </button>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 md:h-72">
          <DottedSurface
            isDarkMode={isDarkMode}
            className="h-full w-full opacity-75 [mask-image:linear-gradient(to_top,black,transparent)]"
          />
        </div>
      </section>

      {/* Outbound Calls Section */}
      <section className="snap-start snap-always min-h-screen flex flex-col justify-center py-20 px-6 bg-transparent transition-colors relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDarkMode
              ? `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`
              : `linear-gradient(to right, rgba(16,42,67,0.14) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(16,42,67,0.14) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            maskSize: '100% 100%',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 md:h-72">
          <DottedSurface
            isDarkMode={isDarkMode}
            className="h-full w-full opacity-80 [mask-image:linear-gradient(to_top,black,transparent)]"
          />
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20 relative z-10">
          <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-1000">
            <h2 className="text-4xl md:text-7xl font-bold serif leading-[1.1] text-slate-900 dark:text-white">Proactive <br/><span className="italic shimmer-text">Reach</span></h2>
            <p className="text-xl text-navy-600 dark:text-navy-300 font-light leading-relaxed">
              Fourcee doesn't just wait for customers. It actively nurtures your pipeline with high-fidelity outbound reminders and follow-ups.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="glass-card p-6 rounded-3xl">
                <p className="text-4xl font-bold serif text-navy-900 dark:text-white">30%</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-navy-400 mt-2">No-show reduction</p>
              </div>
              <div className="glass-card p-6 rounded-3xl">
                <p className="text-4xl font-bold serif text-navy-900 dark:text-white">2x</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-navy-400 mt-2">Follow-up speed</p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToPricing}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-950 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.25em] shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto justify-center"
            >
              <span>Select a package</span>
            </button>
          </div>
          <div className="flex-1 relative animate-in slide-in-from-right duration-1000 flex items-center justify-center">
            <IncomingCallPhone className="w-full max-w-[320px]" isDarkMode={isDarkMode} />
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="snap-start snap-always min-h-screen flex flex-col justify-center pt-32 pb-16 px-6 bg-transparent transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold serif text-slate-900 dark:text-white mb-8 tracking-tighter">Unified Workflow</h2>
            <p className="text-slate-600 dark:text-navy-400 uppercase tracking-[0.2em] text-[11px] font-bold mb-6">Built for your current stack</p>
            <p className="text-lg text-slate-800 dark:text-navy-300 font-light leading-relaxed">
              Fourcee integrates seamlessly with the tools you already use. From deep Nivoda inventory sync to global e-commerce leaders, your existing workflow remains untouched, only enhanced.
            </p>
          </div>

          <div className="mb-24 relative overflow-hidden rounded-[4rem] shadow-2xl">
            <div
              className="relative w-full h-[600px]"
              style={{
                maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 100%)',
                maskSize: '100% 100%',
              }}
            >
              <img 
                src={workflowImage} 
                className="w-full h-full object-cover brightness-75" 
                alt="Connected digital ecosystem" 
              />
            </div>
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(5,27,45,0.92) 100%)'
                  : 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(255,255,255,0.92) 100%)',
              }}
              aria-hidden
            />
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-16 pointer-events-none">
              <div className="max-w-xl">
                <h3 className={`text-4xl font-bold serif mb-4 italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>The Synchronized Showroom</h3>
                <p className={`font-light text-lg ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>Fourcee acts as the intelligent bridge between your client interactions and your inventory, scheduling, and CRM systems.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INTEGRATIONS_DATA.map((cat, idx) => (
              <div key={idx} className="glass-card p-10 rounded-[3rem] border border-navy-50 dark:border-navy-800 flex flex-col">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-400 mb-6">{cat.category}</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.popular.map(p => (
                    <span key={p} className="px-4 py-2 bg-navy-900 dark:bg-white text-white dark:text-navy-950 rounded-full text-xs font-bold tracking-tight shadow-sm">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-navy-500 dark:text-navy-400 leading-relaxed mb-8 flex-1">
                  {cat.description}
                </p>
                <button 
                  onClick={() => setExpandedIntegration(expandedIntegration === idx ? null : idx)}
                  className="text-[10px] font-bold uppercase tracking-widest text-navy-900 dark:text-white border-b border-navy-900/20 dark:border-white/20 pb-1 w-fit hover:border-navy-900 dark:hover:border-white transition-all"
                >
                  {expandedIntegration === idx ? 'Close Details ↑' : 'View Others ↓'}
                </button>
                {expandedIntegration === idx && (
                  <div className="mt-8 pt-8 border-t border-navy-50 dark:border-navy-800 animate-in slide-in-from-top-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                      {cat.others.map(other => (
                        <div key={other} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-navy-200 dark:bg-navy-700 rounded-full" />
                          <span className="text-xs font-medium text-navy-400 dark:text-navy-500">{other}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nivoda Deep Integration Section */}
      <section
        className="snap-start snap-always min-h-[80vh] flex flex-col justify-center px-6 py-16 md:py-24 relative"
        style={{
          backgroundColor: '#090906',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at 0 0, rgba(194,204,214,0.12) 0, rgba(194,204,214,0.12) 1px, transparent 1px, transparent 3px)`,
            opacity: 0.9,
          }}
        />
        <div className="relative max-w-6xl mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center">
          <div className="space-y-6 text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2CCD6]/80">
              Nivoda-native inventory intelligence
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold serif text-white tracking-tight">
              Your AI hears<br className="hidden sm:block" /> the same diamonds you see.
            </h2>
            <p className="text-sm sm:text-base text-[#C2CCD6]/90 max-w-xl leading-relaxed">
              Fourcee doesn&apos;t guess what&apos;s in your case — it reads live data from Nivoda. Every search,
              estimate and availability check is backed by the same inventory spine your buyers already trust.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm text-[#C2CCD6]">
              <div className="rounded-2xl border border-[#535B68]/60 bg-black/40 px-4 py-3 backdrop-blur-md">
                <p className="font-semibold mb-1 text-white">Real-time availability</p>
                <p className="leading-relaxed">
                  Quote from live Nivoda feeds so your AI never offers stones that have already left the pipeline.
                </p>
              </div>
              <div className="rounded-2xl border border-[#3A5A88]/70 bg-black/40 px-4 py-3 backdrop-blur-md">
                <p className="font-semibold mb-1 text-white">Smart search logic</p>
                <p className="leading-relaxed">
                  Translate vague requests (&quot;oval, lab-grown, under 3 carats&quot;) into structured Nivoda queries
                  in the background.
                </p>
              </div>
              <div className="rounded-2xl border border-[#535B68]/60 bg-black/40 px-4 py-3 backdrop-blur-md sm:col-span-2">
                <p className="font-semibold mb-1 text-white">CRM + analytics ready</p>
                <p className="leading-relaxed">
                  Every Nivoda-backed search can be logged against a contact in your CRM and surfaced in the analytics
                  portal — so you see which profiles are driving real diamond demand.
                </p>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C2CCD6]/70 pt-2">
              Built to sit on top of your existing Nivoda workflows — not replace them.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="max-w-md w-full aspect-[4/5]">
              <svg
                viewBox="0 0 100 125"
                className="w-full h-full"
                aria-label="Nivoda inventory layers feeding Fourcee"
                role="img"
              >
                <defs>
                  <filter id="nivoda-soft-feather">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                  <mask id="nivoda-soft-mask">
                    <rect width="100" height="125" fill="black" />
                    <rect
                      x="10"
                      y="10"
                      width="80"
                      height="105"
                      rx="20"
                      ry="20"
                      fill="white"
                      filter="url(#nivoda-soft-feather)"
                    />
                  </mask>
                </defs>
                <image
                  href={nivodaGif}
                  x="0"
                  y="0"
                  width="100"
                  height="125"
                  preserveAspectRatio="xMidYMid slice"
                  mask="url(#nivoda-soft-mask)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>





      {/* Pricing Section */}
      <section id="pricing" className="snap-start snap-always min-h-screen flex flex-col justify-center">
        <PricingSection 
        plans={PACKAGES.map(pkg => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.monthly,
          yearlyPrice: pkg.yearlyPrice,
          setupFee: pkg.price,
          period: "month",
          features: pkg.features,
          description: pkg.description,
          buttonText: "Secure Your Model",
          isPopular: pkg.id === 'premium'
        }))}
        title="Investment Tiers"
        description="Scaling with your brilliance"
        onSelect={(id) => {
          navigate(AppView.CHECKOUT);
        }}
      />
      </section>

      {/* Solutions / Features */}
      <section className="snap-start snap-always flex flex-col justify-center pt-12 pb-8 md:pb-12 px-6 bg-transparent transition-colors relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDarkMode
              ? `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`
              : `linear-gradient(to right, rgba(16,42,67,0.14) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(16,42,67,0.14) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            maskSize: '100% 100%',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-5xl md:text-8xl font-bold serif text-navy-900 dark:text-white mb-6 tracking-tighter">Boutique Intelligence</h2>
          <div className="grid md:grid-cols-3 gap-3 md:gap-4 mt-2">
            {[
              { title: "Voice Cloning", desc: "Your actual voice, scaled across 100 simultaneous calls." },
              { title: "Live Estimates", desc: "Instant pricing based on daily market spot rates." },
              { title: "VIP Escalation", desc: "Automatically connects ultra-high net worth leads to your personal line." }
            ].map((f, i) => (
              <div key={i} className="p-12 rounded-[2.5rem] bg-white/80 dark:bg-white/5 dark:backdrop-blur-xl border border-navy-100 dark:border-white/10 hover:shadow-2xl transition-all group shadow-sm">
                <div className="w-12 h-12 bg-navy-900 dark:bg-white rounded-2xl mb-8 flex items-center justify-center text-white dark:text-navy-950 font-bold text-xl group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold serif mb-4 text-navy-900 dark:text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-navy-500 dark:text-navy-300 font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-16 relative z-10">
          <FaqMonochrome
            isDarkMode={isDarkMode}
            faqs={FAQ_ITEMS}
            steps={JOURNEY_STEPS}
          />
        </div>
      </section>

      <FloatingCalendar />
      {showTester && <PhoneTester onClose={() => setShowTester(false)} />}
    </div>
  ); };

  const BlogPage = () => (
    <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto animate-in fade-in duration-700 bg-transparent">
      <div className="flex justify-center mb-6">
        <img
          src={fcShad}
          alt="Fourcee mark"
          className={`h-9 md:h-10 object-contain ${isDarkMode ? 'invert' : ''}`}
        />
      </div>
      <h1 className="text-6xl font-bold serif mb-4 text-center tracking-tighter text-slate-900 dark:text-white">The Ledger</h1>
      <p className="text-center text-slate-600 dark:text-navy-300 uppercase tracking-[0.3em] text-[10px] font-bold mb-20">Strategic Insights for Luxury Retailers</p>
      
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {BLOG_POSTS.map(post => (
          <button
            key={post.id}
            type="button"
            onClick={() => navigate(AppView.BLOG_POST, post)}
            className="text-left"
          >
            <ArticleCard
              headline={post.title}
              excerpt={post.excerpt}
              cover={post.imageUrl}
              tag="Insight"
              readingTimeSeconds={420}
              writer="Alyssa Peters"
              publishedLabel={post.date}
              clampLines={3}
              isDarkMode={isDarkMode}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const TermsPage = () => (
    <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto animate-in fade-in duration-700 bg-transparent">
      <h1 className="text-4xl md:text-5xl font-bold serif mb-6 tracking-tighter dark:text-white">
        Safeguards, Disclaimer & Terms
      </h1>
      <p className="text-sm text-navy-500 dark:text-navy-300 mb-8 leading-relaxed">
        This page is a plain-language overview of how we structure deployments of Fourcee. It is not a substitute for a
        signed services agreement, but it explains the spirit in which we work with jewelers.
      </p>

      <div className="space-y-8 text-sm text-navy-700 dark:text-navy-200 leading-relaxed">
        <section>
          <h2 className="font-bold text-navy-900 dark:text-white mb-2">Commercial terms & payment</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Setup fee (once-off).</span> The setup fee you see on the pricing page is
              charged a single time per showroom. It covers discovery, call-flow design, integrations (including
              Nivoda, calendars and CRM), test environment, and iterative tuning.
            </li>
            <li>
              <span className="font-semibold">First month upfront — but only after sign-off.</span> We typically collect
              the setup fee and first month&apos;s subscription upfront. Your first month of billing only begins once
              testing is complete and you confirm in writing that you are happy for Fourcee to go live.
            </li>
            <li>
              <span className="font-semibold">Ongoing subscription.</span> After go-live, you pay a recurring
              subscription as per your selected tier. Any changes to pricing, terms or scope are always agreed in
              writing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-navy-900 dark:text-white mb-2">Usage, data & privacy</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Call recording & analytics.</span> Wherever legally permitted and
              contractually agreed, calls may be recorded, transcribed and analysed to improve performance. You can
              choose how long recordings are stored and who in your team can access them.
            </li>
            <li>
              <span className="font-semibold">Third‑party tools.</span> Fourcee connects to services such as Nivoda,
              CRMs and calendar systems. Each of those tools has its own terms; using them through Fourcee means you
              also agree to their respective terms and privacy policies.
            </li>
            <li>
              <span className="font-semibold">Your data stays yours.</span> Customer data and call history belong to
              your business. We process that data solely to deliver and improve the service, in line with the agreement
              we sign together.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-navy-900 dark:text-white mb-2">ROI calculator & performance disclaimer</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The ROI calculator and case studies on this site are <span className="font-semibold">illustrative</span>{' '}
              only. They use assumptions about close rates, missed call capture and staffing efficiencies that may not
              match your exact business.
            </li>
            <li>
              Actual performance depends on many factors outside of our control — including your offer, pricing,
              competition, sales process and macroeconomic conditions. We therefore cannot promise or guarantee a
              specific revenue outcome.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-navy-900 dark:text-white mb-2">Limitations of liability</h2>
          <p>
            While we design Fourcee with guardrails, testing and sensible defaults, no AI system is perfect. To the
            maximum extent permitted by law, our liability for any indirect, incidental or consequential loss is
            excluded. Direct losses are limited to the fees you have paid to us over a defined recent period, as set out
            in the formal agreement.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-navy-900 dark:text-white mb-2">Need the full legal text?</h2>
          <p>
            Before deployment we will share a full services agreement or order form for review and signature. That
            document will always govern in the event of any conflict with this summary.
          </p>
        </section>
      </div>
    </div>
  );

  return (
    <div ref={scrollContainerRef} className="relative h-screen flex flex-col overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-white dark:bg-navy-950 transition-colors">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <EtherealShadow 
          color={isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(16, 42, 67, 0.08)"}
          animation={isDarkMode ? { scale: 100, speed: 45 } : { scale: 40, speed: 20 }}
          noise={isDarkMode ? { opacity: 0.6, scale: 1.2 } : { opacity: 0.3, scale: 1 }}
        />
      </div>

      <FloatingNav onNavigate={setCurrentView} currentView={currentView} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      
      <main className="relative z-10">
        {currentView === AppView.LANDING && <LandingPage scrollContainerRef={scrollContainerRef} />}
        {currentView === AppView.BLOG && <BlogPage />}
        {currentView === AppView.BLOG_POST && selectedPost && (
           <div className="pt-24 animate-in fade-in duration-700">
              <button onClick={() => navigate(AppView.BLOG)} className="px-6 py-12 text-navy-300 hover:text-navy-900 dark:hover:text-white uppercase text-[10px] font-bold tracking-widest transition-colors">← Back to Ledger</button>
              <div className="max-w-3xl mx-auto px-6 pb-12">
                <h1 className="text-5xl md:text-7xl font-bold serif mb-12 leading-none dark:text-white">{selectedPost.title}</h1>
                <div className="prose prose-navy dark:prose-invert max-w-none space-y-8 text-lg text-navy-800 dark:text-navy-100 font-light leading-relaxed">
                  {selectedPost.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
           </div>
        )}
        {currentView === AppView.CHECKOUT && <CheckoutFlow isDarkMode={isDarkMode} />}
        {currentView === AppView.DASHBOARD && <CRMView isDarkMode={isDarkMode} />}
        {currentView === AppView.TERMS && <TermsPage />}
      </main>

      {currentView === AppView.LANDING && (
        <button
          type="button"
          onClick={() => navigate(AppView.CHECKOUT)}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 hidden md:inline-flex items-center gap-2 rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-950 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] shadow-[0_18px_45px_rgba(0,0,0,0.55)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>Configure your solution</span>
        </button>
      )}

      {/* Global footer: animated dotted surface (white in dark mode, black in light) */}
      <footer className="relative w-full min-h-[320px] h-[320px] flex-shrink-0 overflow-hidden mt-0 z-20">
        <div
          className="absolute inset-0 z-[5]"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, transparent 0%, rgba(5,27,45,0.3) 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 100%)',
          }}
        />
        <DottedSurface isDarkMode={isDarkMode} className="z-10" />
        <div className="absolute inset-0 z-[15] flex items-end justify-center pb-6 px-4">
          <button
            type="button"
            onClick={() => navigate(AppView.TERMS)}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy-500 dark:text-navy-200 bg-white/80 dark:bg-navy-950/80 border border-navy-200/60 dark:border-white/20 rounded-full px-5 py-2 backdrop-blur-md shadow-md hover:bg-white dark:hover:bg-navy-900 transition-colors"
          >
            Terms, safeguards &amp; disclaimer
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
