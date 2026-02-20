
import React from 'react';
import { BlogPost, Package } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 3000,
    monthly: 99,
    yearlyPrice: 79,
    description: 'Perfect for boutique showrooms and independent designers.',
    features: ['Basic Bookings', 'CRM Export', 'Standard Voice', '24/7 Coverage']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4000,
    monthly: 199,
    yearlyPrice: 159,
    description: 'Ideal for growing teams and multi-location businesses.',
    features: ['Estimates & Quotes', 'CRM Real-time Sync', 'Luxury AI Voice', 'Priority Support', 'Order Tracking']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 6000,
    monthly: 299,
    yearlyPrice: 239,
    description: 'For large organizations with specific custom logic needs.',
    features: ['Custom Knowledge Base', 'Multi-location', 'API Access', 'Dedicated Account Manager', 'Custom Logic']
  }
];

export const UPSELLS = [
  { id: 'voice_cloning', name: 'Voice Cloning', price: 750, description: 'Mimic your own voice for a personalized brand sound.' },
  { id: 'outbound_reminders', name: 'Outbound Reminders', price: 500, description: 'Reduce no-shows with automated appointment follow-ups.' },
  { id: 'inventory_api', name: 'Real-Time Inventory API', price: 750, description: 'Let AI check stock levels and provide instant availability.' }
];

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
