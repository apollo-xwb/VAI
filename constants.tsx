
import React from 'react';
import { BlogPost, Package } from './types';

// Configurator-only pricing (every quote is custom; not shown on public pricing)
export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 3000,
    monthly: 499,
    yearlyPrice: 4790, // 20% off annual
    description: '500 min/month (~100 calls). Basic voice. WhatsApp pics + booking.',
    features: ['500 min/month (~100 calls)', 'Basic voice', 'WhatsApp pics + booking', '24/7 Coverage']
  },
  {
    id: 'premium',
    name: 'Pro',
    price: 5000,
    monthly: 799,
    yearlyPrice: 7670, // 20% off: 799*12*0.8
    description: '2,000 min/month (~400 calls). Voice cloning + custom accents. Unlimited after cap.',
    features: ['2,000 min/month (~400 calls)', 'Voice cloning + custom accents', 'Upsell scripts + analytics', 'Unlimited after cap']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 10000,
    monthly: 1299,
    yearlyPrice: 12470, // 20% off
    description: 'Unlimited min/calls. Multi-store (up to 5). CRM + sales reports. White-label.',
    features: ['Unlimited min/calls', 'Multi-store (up to 5)', 'CRM + sales reports', 'White-label', 'Custom']
  }
];

export const UPSELLS = [
  { id: 'image_gen', name: 'Image Generation', price: 0, monthlyPrice: 99, description: 'AI-generated product and marketing imagery.' },
  { id: 'website_chatbot', name: 'Website Chatbot Widget', price: 0, monthlyPrice: 149, description: 'Embeddable chat widget for your site.' },
  { id: 'whatsapp_chatbot', name: 'WhatsApp Chatbot', price: 0, monthlyPrice: 199, description: 'Dedicated WhatsApp AI assistant.' },
  { id: 'all_inboxes_chatbot', name: 'All-Inboxes Chatbot', price: 0, monthlyPrice: 299, description: 'Unified inbox across WhatsApp, web, and more.' },
  { id: 'nivoda_integration', name: 'Nivoda Integration', price: 0, monthlyPrice: 249, description: 'Live Nivoda inventory and diamond sourcing.' },
  { id: 'unlimited_calls', name: 'Unlimited Calls', price: 0, monthlyPrice: 200, description: 'Add-on: unlimited minutes/calls on top of plan.' },
  { id: 'custom_voice_analytics', name: 'Custom Voice / Analytics', price: 0, monthlyPrice: 300, description: 'Custom voice and advanced analytics.' },
];

// Reference pricing matrix (for your call quotes) — only shown in configurator
export const PRICING_MATRIX = {
  tiers: [
    { name: 'Starter', monthly: 499, setup: 3000, details: '500 min/month (~100 calls). Basic voice. WhatsApp pics + booking.' },
    { name: 'Pro', monthly: 799, setup: 5000, details: '2,000 min/month (~400 calls). Voice cloning + custom accents. Upsell scripts + analytics. Unlimited after cap.' },
    { name: 'Enterprise', monthly: 1299, setup: '10,000+', details: 'Unlimited min/calls. Multi-store (up to 5). CRM + sales reports. White-label.' },
  ],
  addOns: [
    { name: 'Image Generation', price: '$99/mo' },
    { name: 'Website Chatbot Widget', price: '$149/mo' },
    { name: 'WhatsApp Chatbot', price: '$199/mo' },
    { name: 'All-Inboxes Chatbot', price: '$299/mo' },
    { name: 'Nivoda Integration', price: '$249/mo' },
    { name: 'Unlimited Calls', price: '+$200/mo' },
    { name: 'Custom Voice/Analytics', price: '+$300/mo' },
  ],
  annualNote: 'Annual: 20% off (e.g. Pro = $7,670/year upfront).',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'how-ai-is-revolutionizing-jewelry-retail-2026',
    title: 'How AI is Revolutionizing Jewelry Retail in 2026',
    excerpt: 'The luxury market is evolving. Discover how AI agents are becoming the standard for client interactions.',
    date: 'Oct 24, 2025',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
      ## The New Era of Luxury
      In 2026, the distinction between high-end digital assistance and human service is blurring. For jewelers, this means being available when inspiration strikes a client—be it at 2 PM or 2 AM.

      ### Key Transformations
      - **Instant Gratification:** Clients no longer wait for callbacks.
      - **Hyper-Personalization:** AI remembers past inquiries and preferences.
      - **Efficiency:** Routine questions are handled instantly, freeing staff for high-touch custom work.

      Luxury retail has always been about the experience. Fourcee brings that "white glove" service to the digital and telephonic realm.
    `
  },
  {
    id: '2',
    slug: 'top-5-pain-points-jewelers-solve-with-ai',
    title: 'Top 5 Pain Points for Jewelers and How Voice AI Solves Them',
    excerpt: 'From missed calls to staffing shortages, see why jewelers are turning to Fourcee.',
    date: 'Oct 20, 2025',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
      ## Solving the Jewelry Business Bottlenecks
      1. **Missed High-Value Leads:** Every missed call is a potential $10,000 engagement ring sale.
      2. **Staff Burnout:** Constant interruptions hinder master jewelers at the bench.
      3. **Inconsistent Quotes:** Ensure every rough estimate follows your specific pricing logic.
      4. **No-Shows:** Automated reminders keep schedules full and revenue flowing.
      5. **Data Silos:** Automatically push every caller’s details into your CRM.
    `
  },
  {
    id: '3',
    slug: 'maximizing-roi-with-custom-ai-receptionists',
    title: 'Maximizing ROI with Custom AI Receptionists',
    excerpt: 'A deep dive into the numbers behind the investment in voice AI for jewelry stores.',
    date: 'Oct 15, 2025',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
      ## The ROI Equation
      When you invest $3,000 in an AI receptionist, you aren't just buying software. You are buying time and opportunity.

      ### The Math
      - **Cost of Staffing:** A full-time receptionist costs $40k+/year plus benefits.
      - **Opportunity Cost:** If AI captures just *one* extra custom ring lead per month, it pays for itself in less than 90 days.
    `
  }
  // ... Imagine 7 more posts here to satisfy the SEO requirement
];
