import React, { useState, useEffect, useRef } from 'react';
import { AppView, BlogPost } from './types';
import { FloatingNav } from './components/FloatingNav';

import logoUrl from './assets/logo.png';
import demoImage from './assets/4.jpg';
import workflowImage from './assets/workflow5.png';
import { ValueCalculator } from './components/ValueCalculator';
import { PricingSection } from './components/ui/pricing';
import { EtherealShadow } from './components/ui/etheral-shadow';
import { DottedSurface } from './components/ui/dotted-surface';
import DisplayCards from './components/ui/display-cards';
import { Diamond3D } from './components/Diamond3D';
import { IncomingCallPhone } from './components/ui/incoming-call-phone';
import { MiniPhone } from './components/ui/mini-phone';
import { PhoneCall } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckoutFlow } from './components/CheckoutFlow';
import { CRMView } from './components/CRMView';
import { SplashScreen } from './components/SplashScreen';
import { PhoneTester } from './components/PhoneTester';
import { FloatingCalendar } from './components/FloatingCalendar';
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
    description: "Diamond sourcing, repair tracking, and stock checks via direct API."
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTester, setShowTester] = useState(false);
  const [expandedIntegration, setExpandedIntegration] = useState<number | null>(null);

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

  const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const problemRef = useRef<HTMLElement>(null);
    const demoRef = useRef<HTMLElement>(null);
    const { scrollYProgress: problemScroll } = useScroll({
      target: problemRef,
      offset: ["start end", "end start"]
    });
    const { scrollYProgress: demoScroll } = useScroll({
      target: demoRef,
      offset: ["start end", "center center"]
    });

    const cardsY = useTransform(problemScroll, [0, 1], [-150, 150]);
    const demoScale = useTransform(demoScroll, [0, 0.5, 1], [0.94, 1, 1]);
    const demoOpacity = useTransform(demoScroll, [0, 0.4], [0.7, 1]);
    const demoY = useTransform(demoScroll, [0, 0.5], [16, 0]);

    return (
    <div className="animate-in fade-in duration-1000 pb-8">
      {/* Hero Section - 3D icon: use Diamond3D until pendant OBJ is mesh-only (no NURBS/curv2) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 md:py-24 overflow-hidden bg-transparent transition-colors">
        <div className="mb-8 animate-bounce duration-[4000ms]">
          <Diamond3D size="100px" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-bold mb-8 text-navy-900 dark:text-white serif leading-[1.1] tracking-tighter">
            The Gold Standard <br/><span className="italic shimmer-text">of Voice AI</span>
          </h1>
          <p className="text-lg md:text-xl text-navy-500 dark:text-navy-300 max-w-2xl mb-8 font-medium leading-relaxed uppercase tracking-[0.25em] text-[10px] md:text-[12px]">
            Tailored exclusively for high-end jewelers
          </p>

          <div className="mb-16 w-full max-w-sm mx-auto">
            <MiniPhone isDarkMode={isDarkMode} />
          </div>
          
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            <ValueCalculator />
            <div className="text-left max-w-sm space-y-6">
              <div className="glass-card p-8 rounded-[2.5rem] border border-navy-50 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-navy-400 dark:text-navy-300 mb-4">Live Performance</p>
                <div className="space-y-4">
                  {[
                    "95% Resolution Rate",
                    "24/7 Boutique Presence",
                    "Automated Custom Estimates"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-navy-900 dark:bg-white rounded-full" />
                      <span className="font-bold text-sm text-navy-900 dark:text-navy-50 tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => navigate(AppView.CHECKOUT)}
                  className="w-full py-5 bg-navy-900 dark:bg-white dark:text-navy-950 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                >
                  Start Free Deployment →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Step - Moved below Hero: blue + grid faded at top and bottom */}
      <section ref={problemRef} className="py-32 px-6 text-white relative overflow-hidden border-y border-white/5">
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
      <section ref={demoRef} id="demo" className="py-32 px-6 bg-transparent">
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
        </div>
      </section>

      {/* Outbound Calls Section */}
      <section className="py-20 px-6 bg-transparent transition-colors relative">
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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20 relative z-10">
          <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-1000">
            <h2 className="text-4xl md:text-7xl font-bold serif leading-[1.1] dark:text-white">Proactive <br/><span className="italic shimmer-text">Reach</span></h2>
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
          </div>
          <div className="flex-1 relative animate-in slide-in-from-right duration-1000 flex items-center justify-center">
            <IncomingCallPhone className="w-full max-w-[320px]" isDarkMode={isDarkMode} />
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="pt-32 pb-16 px-6 bg-transparent transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold serif text-navy-900 dark:text-white mb-8 tracking-tighter">Unified Workflow</h2>
            <p className="text-navy-500 dark:text-navy-400 uppercase tracking-[0.2em] text-[11px] font-bold mb-6">Built for your current stack</p>
            <p className="text-lg text-navy-600 dark:text-navy-300 font-light leading-relaxed">
              Fourcee integrates seamlessly with the tools you already use. From custom jewelry ERPs to global e-commerce leaders, your existing workflow remains untouched, only enhanced.
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
                className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-[3000ms]" 
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
                <h3 className="text-4xl font-bold text-white serif mb-4 italic">The Synchronized Showroom</h3>
                <p className="text-white/80 font-light text-lg">Fourcee acts as the intelligent bridge between your client interactions and your inventory, scheduling, and CRM systems.</p>
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





      {/* Pricing Section */}
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

      {/* Solutions / Features */}
      <section className="pt-12 pb-4 px-6 bg-transparent transition-colors relative">
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
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold serif text-navy-900 dark:text-white mb-6 tracking-tighter">Boutique Intelligence</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-2">
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
      </section>

      <FloatingCalendar />
      {showTester && <PhoneTester onClose={() => setShowTester(false)} />}
    </div>
  ); };

  const BlogPage = () => (
    <div className="pt-24 pb-12 px-6 max-w-6xl mx-auto animate-in fade-in duration-700 bg-transparent">
      <h1 className="text-6xl font-bold serif mb-4 text-center tracking-tighter dark:text-white">The Ledger</h1>
      <p className="text-center text-navy-300 uppercase tracking-[0.3em] text-[10px] font-bold mb-20">Strategic Insights for Luxury Retailers</p>
      
      <div className="grid md:grid-cols-2 gap-16">
        {BLOG_POSTS.map(post => (
          <article 
            key={post.id} 
            className="flex flex-col group cursor-pointer"
            onClick={() => navigate(AppView.BLOG_POST, post)}
          >
            <div className="overflow-hidden rounded-[2.5rem] h-80 mb-8 border border-navy-50 dark:border-navy-800">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-navy-300 uppercase tracking-widest mb-2">{post.date}</p>
              <h2 className="text-3xl font-bold serif mb-4 group-hover:text-navy-700 dark:group-hover:text-navy-200 transition-colors leading-tight dark:text-white">{post.title}</h2>
              <p className="text-navy-500 dark:text-navy-300 text-sm mb-6 leading-relaxed line-clamp-2">{post.excerpt}</p>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] border-b border-navy-900 dark:border-white pb-1 dark:text-white">Full Article →</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-navy-950 transition-colors overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <EtherealShadow 
          color={isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(16, 42, 67, 0.08)"}
          animation={isDarkMode ? { scale: 100, speed: 45 } : { scale: 40, speed: 20 }}
          noise={isDarkMode ? { opacity: 0.6, scale: 1.2 } : { opacity: 0.3, scale: 1 }}
        />
      </div>

      <FloatingNav onNavigate={setCurrentView} currentView={currentView} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      
      <main className="relative z-10">
        {currentView === AppView.LANDING && <LandingPage />}
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
        {currentView === AppView.CHECKOUT && <CheckoutFlow />}
        {currentView === AppView.DASHBOARD && <CRMView />}
      </main>

      {/* Global footer: animated dotted surface (white in dark mode, black in light) */}
      <footer className="relative w-full h-[320px] pointer-events-none overflow-hidden mt-0 z-20" aria-hidden>
        <div
          className="absolute inset-0 z-[5]"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, transparent 0%, rgba(5,27,45,0.3) 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 100%)',
          }}
        />
        <DottedSurface isDarkMode={isDarkMode} className="z-10" />
      </footer>
    </div>
  );
};

export default App;
