"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, MapPin, ShieldCheck, Flame, ArrowRight, MessageCircle, Star, ChevronDown } from "lucide-react";
import Script from "next/script";

export default function NarcoPage() {
  const shouldReduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Toggle for real review numbers (Waiting on Client)
  const showReviewData = false;

  // 1. LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ù…Ø¤Ø³Ø³Ø© Ù†Ø§Ø±ÙƒÙˆ Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø­Ø·Ø¨ ÙˆØ§Ù„ÙØ­Ù… Ø§Ù„Ø¥ÙØ±ÙŠÙ‚ÙŠ",
    "url": "https://el-nafeer-real-estate.vercel.app/Ø­Ø·Ø¨-Ø£ÙØ±ÙŠÙ‚ÙŠ",
    "logo": "https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg",
    "image": "https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg",
    "description": "Ø£ÙØ¶Ù„ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø­Ø·Ø¨ Ø§Ù„Ø£ÙØ±ÙŠÙ‚ÙŠ Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯ ÙˆØ§Ù„ÙØ­Ù… Ù„Ù„Ø´ÙˆØ§Ø¡ ÙˆØ§Ù„ØªØ¯ÙØ¦Ø© ÙÙŠ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©. Ø¹Ø±ÙˆØ¶ Ø¬Ù…Ù„Ø© Ø­ØµØ±ÙŠØ© ÙˆØªÙˆØµÙŠÙ„ Ø³Ø±ÙŠØ¹.",
    "telephone": "+966500000000",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ø§Ù„Ø±ÙŠØ§Ø¶",
      "addressRegion": "Ù…Ù†Ø·Ù‚Ø© Ø§Ù„Ø±ÙŠØ§Ø¶",
      "addressCountry": "SA"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "paymentAccepted": "Cash, Mada, STC Pay, Bank Transfer",
    "areaServed": ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam"]
  };

  // 2. Product Schema: Firewood
  const firewoodSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Ø­Ø·Ø¨ Ø³Ù…Ø± Ø£ÙØ±ÙŠÙ‚ÙŠ Ù…Ø³ØªÙˆØ±Ø¯ - Ù†Ø§Ø±ÙƒÙˆ",
    "image": ["https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg"],
    "description": "Ø­Ø·Ø¨ Ø³Ù…Ø± Ø£ÙØ±ÙŠÙ‚ÙŠ ÙØ§Ø®Ø± Ù„Ù„ØªØ¯ÙØ¦Ø© ÙˆØ§Ù„Ø´ÙˆØ§Ø¡. Ø¬ÙˆØ¯Ø© Ø¹Ø§Ù„ÙŠØ©ØŒ Ø³Ø±ÙŠØ¹ Ø§Ù„Ø§Ø´ØªØ¹Ø§Ù„ØŒ ÙˆÙŠØ¯ÙˆÙ… Ø·ÙˆÙŠÙ„Ø§Ù‹ Ø¨Ù„Ø§ Ø¯Ø®Ø§Ù†.",
    "brand": { "@type": "Brand", "name": "Ù†Ø§Ø±ÙƒÙˆ (Narco)" },
    "offers": {
      "@type": "Offer",
      "url": "https://el-nafeer-real-estate.vercel.app/Ø­Ø·Ø¨-Ø£ÙØ±ÙŠÙ‚ÙŠ",
      "priceCurrency": "SAR",
      "price": "400",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    ...(showReviewData && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "289"
      }
    })
  };

  // 3. Product Schema: Charcoal
  const charcoalSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "ÙØ­Ù… Ø´ÙˆØ§Ø¡ Ø£ÙØ±ÙŠÙ‚ÙŠ ÙØ§Ø®Ø± - Ù†Ø§Ø±ÙƒÙˆ",
    "image": ["https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg"],
    "description": "ÙØ­Ù… Ø´ÙˆØ§Ø¡ Ø£ÙØ±ÙŠÙ‚ÙŠ Ù†Ø®Ø¨ Ø£ÙˆÙ„. Ø­Ø±Ø§Ø±Ø© Ø¹Ø§Ù„ÙŠØ©ØŒ Ø±Ù…Ø§Ø¯ Ù‚Ù„ÙŠÙ„ØŒ ÙˆÙ…Ø«Ø§Ù„ÙŠ Ù„Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„Ù…Ø´ÙˆÙŠØ§Øª.",
    "brand": { "@type": "Brand", "name": "Ù†Ø§Ø±ÙƒÙˆ (Narco)" },
    "offers": {
      "@type": "Offer",
      "url": "https://el-nafeer-real-estate.vercel.app/Ø­Ø·Ø¨-Ø£ÙØ±ÙŠÙ‚ÙŠ",
      "priceCurrency": "SAR",
      "price": "250",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    ...(showReviewData && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "158"
      }
    })
  };

  // 4. FAQ Schema
  const faqs = [
    {
      q: "Ù…Ø§ Ù‡Ùˆ Ø­Ø·Ø¨ Ø§Ù„Ø³Ù…Ø± Ø§Ù„Ø£ÙØ±ÙŠÙ‚ÙŠ ÙˆÙ…Ø§ Ù‡ÙŠ Ù…Ù…ÙŠØ²Ø§ØªÙ‡ØŸ",
      a: "Ø­Ø·Ø¨ Ø§Ù„Ø³Ù…Ø± Ø§Ù„Ø£ÙØ±ÙŠÙ‚ÙŠ Ù‡Ùˆ Ù…Ù† Ø£Ø¬ÙˆØ¯ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø­Ø·Ø¨ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù„Ù„ØªØ¯ÙØ¦Ø© ÙˆØ§Ù„Ø´ÙˆØ§Ø¡. ÙŠØªÙ…ÙŠØ² Ø¨Ø³Ø±Ø¹Ø© Ø§Ø´ØªØ¹Ø§Ù„Ù‡ØŒ ÙˆÙ‚ÙˆØ© Ø­Ø±Ø§Ø±ØªÙ‡ØŒ ÙˆØ·ÙˆÙ„ ÙØªØ±Ø© Ø¨Ù‚Ø§Ø¦Ù‡ Ø¬Ù…Ø±Ø§Ù‹ØŒ Ø¨Ø§Ù„Ø¥Ø¶Ø§ÙØ© Ø¥Ù„Ù‰ Ù‚Ù„Ø© Ø§Ù„Ø¯Ø®Ø§Ù† Ø§Ù„Ù…Ù†Ø¨Ø¹Ø« Ù…Ù†Ù‡."
    },
    {
      q: "Ù‡Ù„ ØªÙ‚ÙˆÙ…ÙˆÙ† Ø¨Ø§Ù„ØªÙˆØµÙŠÙ„ Ù„Ø¬Ù…ÙŠØ¹ Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„Ù…Ù…Ù„ÙƒØ©ØŸ",
      a: "Ù†Ø¹Ù…ØŒ Ù†Ù‚Ø¯Ù… Ø®Ø¯Ù…Ø© ØªÙˆØµÙŠÙ„ Ø¢Ù…Ù†Ø© ÙˆØ³Ø±ÙŠØ¹Ø© Ù„Ø¬Ù…ÙŠØ¹ Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©. Ø£Ø³Ø·ÙˆÙ„Ù†Ø§ ÙŠØºØ·ÙŠ Ø§Ù„Ø±ÙŠØ§Ø¶ØŒ Ø¬Ø¯Ø©ØŒ Ø§Ù„Ø¯Ù…Ø§Ù…ØŒ ÙˆÙƒØ§ÙØ© Ø§Ù„Ù…Ø¯Ù† Ø§Ù„ÙƒØ¨Ø±Ù‰ Ù„Ø¶Ù…Ø§Ù† ÙˆØµÙˆÙ„ Ø·Ù„Ø¨Ùƒ ÙÙŠ Ø£Ø³Ø±Ø¹ ÙˆÙ‚Øª."
    },
    {
      q: "Ù…Ø§ Ù‡ÙŠ Ø£Ø³Ø¹Ø§Ø± Ø§Ù„Ø¬Ù…Ù„Ø© Ù„Ù„ÙƒÙ…ÙŠØ§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø©ØŸ",
      a: "Ù†ÙˆÙØ± Ø£Ø³Ø¹Ø§Ø±Ø§Ù‹ ØªÙ†Ø§ÙØ³ÙŠØ© Ø¬Ø¯Ø§Ù‹ ÙˆØ¹Ø±ÙˆØ¶Ø§Ù‹ Ø®Ø§ØµØ© Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¬Ù…Ù„Ø© Ù„Ù„Ù…Ø·Ø§Ø¹Ù…ØŒ ÙˆØ§Ù„Ù…Ù‚Ø§Ù‡ÙŠØŒ ÙˆØ§Ù„Ù…Ø®ÙŠÙ…Ø§Øª. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¹Ø¨Ø± Ø§Ù„ÙˆØ§ØªØ³Ø§Ø¨ Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ ØªØ³Ø¹ÙŠØ±Ø© Ø¯Ù‚ÙŠÙ‚Ø© Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„ÙƒÙ…ÙŠØ© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©."
    },
    {
      q: "Ù‡Ù„ ÙØ­Ù… Ù†Ø§Ø±ÙƒÙˆ Ù…Ù†Ø§Ø³Ø¨ Ù„Ù„Ø´ÙˆØ§Ø¡ ÙÙŠ Ø§Ù„Ù…Ø·Ø§Ø¹Ù…ØŸ",
      a: "Ø¨Ø§Ù„ØªØ£ÙƒÙŠØ¯. ÙØ­Ù… Ù†Ø§Ø±ÙƒÙˆ Ø§Ù„Ø£ÙØ±ÙŠÙ‚ÙŠ Ù†Ø®Ø¨ Ø£ÙˆÙ„ØŒ Ù…Ø«Ø§Ù„ÙŠ Ù„Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„Ù…Ø´ÙˆÙŠØ§Øª Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠØ©. ÙŠØ¹Ø·ÙŠ Ø­Ø±Ø§Ø±Ø© Ø¹Ø§Ù„ÙŠØ© ÙˆØ«Ø§Ø¨ØªØ©ØŒ ÙˆÙ„Ø§ ÙŠØªØ±Ùƒ Ø±Ù…Ø§Ø¯Ø§Ù‹ ÙƒØ«ÙŠÙØ§Ù‹ØŒ Ù…Ù…Ø§ ÙŠØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø·Ø¹Ù… Ø§Ù„Ù„Ø­Ù… Ø§Ù„Ø£ØµÙ„ÙŠ."
    },
    {
      q: "Ù‡Ù„ ÙŠÙ…ÙƒÙ†Ù†ÙŠ Ø·Ù„Ø¨ Ø¹ÙŠÙ†Ø§Øª Ù„ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ø¬ÙˆØ¯Ø© Ù‚Ø¨Ù„ Ø§Ù„Ø´Ø±Ø§Ø¡ Ø¨ÙƒÙ…ÙŠØ§ØªØŸ",
      a: "Ù†Ø¹Ù…ØŒ Ù†Ø­Ù† Ù†Ø«Ù‚ ÙÙŠ Ø¬ÙˆØ¯Ø© Ù…Ù†ØªØ¬Ø§ØªÙ†Ø§. ÙŠÙ…ÙƒÙ† ØªØ±ØªÙŠØ¨ Ø¥Ø±Ø³Ø§Ù„ Ø¹ÙŠÙ†Ø§Øª ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù„Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„ØªØ¬Ø§Ø± ÙˆØ§Ù„Ù…Ø´ØªØ±ÙŠÙ† Ø¨Ø§Ù„Ø¬Ù…Ù„Ø©. ØªÙˆØ§ØµÙ„ Ù…Ø¹ ÙØ±ÙŠÙ‚ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ù„ØªÙ†Ø³ÙŠÙ‚ Ø°Ù„Ùƒ."
    },
    {
      q: "Ù…Ø§ Ù‡ÙŠ Ø·Ø±Ù‚ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù…ØªØ§Ø­Ø© Ù„Ø¯ÙŠÙƒÙ…ØŸ",
      a: "Ù†Ù‚Ø¨Ù„ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù†Ù‚Ø¯ÙŠ (ÙƒØ§Ø´)ØŒ Ù…Ø¯Ù‰ØŒ STC PayØŒ ÙˆØ§Ù„ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø¨Ù†ÙƒÙŠ. Ù†Ø­Ø±Øµ Ø¹Ù„Ù‰ ØªÙˆÙÙŠØ± Ø®ÙŠØ§Ø±Ø§Øª Ù…Ø±Ù†Ø© Ù„ØªØ³Ù‡ÙŠÙ„ Ø¹Ù…Ù„ÙŠØ© Ø§Ù„Ø´Ø±Ø§Ø¡ Ù„Ø¹Ù…Ù„Ø§Ø¦Ù†Ø§."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // 5. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©",
        "item": "https://el-nafeer-real-estate.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ù†Ø§Ø±ÙƒÙˆ - Ø­Ø·Ø¨ Ø£ÙØ±ÙŠÙ‚ÙŠ",
        "item": "https://el-nafeer-real-estate.vercel.app/Ø­Ø·Ø¨-Ø£ÙØ±ÙŠÙ‚ÙŠ"
      }
    ]
  };

  const animationProps = shouldReduceMotion ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } } : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#ff6900] selection:text-white relative pb-24 md:pb-0">
      {/* JSON-LD Schemas */}
      <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="firewood-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(firewoodSchema) }} />
      <Script id="charcoal-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(charcoalSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6900] rounded-full blur-[120px] opacity-10 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff3300] rounded-full blur-[120px] opacity-10 mix-blend-screen" />
      </div>

      {/* Visual Breadcrumbs */}
      <nav className="relative z-10 container mx-auto px-4 py-4 text-sm text-gray-400">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#ff6900] transition-colors p-2 -m-2">Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©</a></li>
          <li>/</li>
          <li className="text-[#ff6900]" aria-current="page">Ù†Ø§Ø±ÙƒÙˆ - Ø­Ø·Ø¨ Ø£ÙØ±ÙŠÙ‚ÙŠ</li>
        </ol>
      </nav>

      <main className="relative z-10 container mx-auto px-4 pb-20 flex flex-col items-center justify-center">
        
        {/* Logo Reveal */}
        <motion.div 
          {...(shouldReduceMotion ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1 } })}
          className="relative w-48 h-48 md:w-64 md:h-64 mb-8 mt-8 rounded-full overflow-hidden border-4 border-[#333] shadow-[0_0_50px_rgba(255,105,0,0.3)]"
        >
          <Image 
            src="/campaigns/narco/logo.jpg" 
            alt="Ø´Ø¹Ø§Ø± Ù…Ø¤Ø³Ø³Ø© Ù†Ø§Ø±ÙƒÙˆ Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø­Ø·Ø¨ ÙˆØ§Ù„ÙØ­Ù… Ø§Ù„Ø¥ÙØ±ÙŠÙ‚ÙŠ"
            fill
            sizes="(max-width: 768px) 192px, 256px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Headlines - Strict H1 */}
        <motion.div {...animationProps} transition={{ duration: 0.8 }} className="text-center max-w-3xl mb-16">
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-[#ff6900] text-[#ff6900] text-sm md:text-base font-medium tracking-widest bg-[#ff6900]/10 backdrop-blur-sm">
            Ø£Ø­Ù…Ø¯ Ø¬Ø§Ø¯ - Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffae00] to-[#ff3300] py-2">
            Ø£ÙØ¶Ù„ Ø­Ø·Ø¨ Ø£ÙØ±ÙŠÙ‚ÙŠ Ù…Ø³ØªÙˆØ±Ø¯ ÙˆÙØ­Ù… Ø´ÙˆØ§Ø¡ ÙÙŠ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Ù…Ø¤Ø³Ø³Ø© Ù†Ø§Ø±ÙƒÙˆ Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© ØªÙˆÙØ± Ù„Ùƒ Ø£Ø¬ÙˆØ¯ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø­Ø·Ø¨ Ø§Ù„Ø¥ÙØ±ÙŠÙ‚ÙŠ Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯ ÙˆØ§Ù„ÙØ­Ù… Ø§Ù„ÙØ§Ø®Ø±. Ù†Ø¶Ù…Ù† Ù„Ùƒ Ø¬ÙˆØ¯Ø© Ø§Ø­ØªØ±Ø§Ù‚ ÙØ§Ø¦Ù‚Ø©ØŒ Ø£Ø³Ø¹Ø§Ø± Ø¬Ù…Ù„Ø© ØªÙ†Ø§ÙØ³ÙŠØ©ØŒ ÙˆØªÙˆØµÙŠÙ„ Ø³Ø±ÙŠØ¹ ÙŠØºØ·ÙŠ ÙƒØ§ÙØ© Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ù„ØªÙ„Ø¨ÙŠØ© Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„Ù…Ø®ÙŠÙ…Ø§Øª.
          </p>
        </motion.div>

        {/* Features - H2 -> H3 */}
        <section id="why-us" className="w-full max-w-5xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            Ù„Ù…Ø§Ø°Ø§ ÙŠØ«Ù‚ Ø¹Ù…Ù„Ø§Ø¤Ù†Ø§ Ø¨Ù†Ø§Ø±ÙƒÙˆØŸ
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Flame, title: "Ø¬ÙˆØ¯Ø© Ø§Ø­ØªØ±Ø§Ù‚ ÙØ§Ø¦Ù‚Ø©", desc: "Ø­Ø·Ø¨ Ø³Ù…Ø± Ø£ÙØ±ÙŠÙ‚ÙŠ Ù†Ø®Ø¨ Ø£ÙˆÙ„ ÙŠØ´ØªØ¹Ù„ Ø¨Ø³Ø±Ø¹Ø© ÙˆÙŠØ¯ÙˆÙ… Ø·ÙˆÙŠÙ„Ø§Ù‹ Ø¨Ù„Ø§ Ø¯Ø®Ø§Ù† Ù…Ø²Ø¹Ø¬." },
              { icon: ShieldCheck, title: "Ø¹Ø±ÙˆØ¶ Ø¬Ù…Ù„Ø© Ù„Ù„Ø´Ø±ÙƒØ§Øª", desc: "Ø£Ø³Ø¹Ø§Ø± Ø®Ø§ØµØ© Ø¬Ø¯Ø§Ù‹ Ù„Ù„ÙƒÙ…ÙŠØ§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø© ÙˆØ§Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„Ù…Ø´ÙˆÙŠØ§Øª ÙˆØ§Ù„Ù…Ù‚Ø§Ù‡ÙŠ." },
              { icon: MapPin, title: "ØªÙˆØµÙŠÙ„ Ø´Ø§Ù…Ù„ ÙˆØ³Ø±ÙŠØ¹", desc: "Ø£Ø³Ø·ÙˆÙ„ Ù…ØªÙƒØ§Ù…Ù„ ÙŠØºØ·ÙŠ Ø¬Ù…ÙŠØ¹ Ù…Ù†Ø§Ø·Ù‚ ÙˆÙ…Ø¯Ù† Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© Ø¨ÙØ¹Ø§Ù„ÙŠØ©." },
            ].map((feature, idx) => (
              <motion.div key={idx} {...animationProps} transition={{ delay: shouldReduceMotion ? 0 : idx * 0.2 }} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-[#ff6900]/50 transition-colors duration-300 group">
                <feature.icon className="w-12 h-12 text-[#ff6900] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products - H2 -> H3 */}
        <section id="products" className="w-full max-w-5xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            Ø­Ø·Ø¨ Ø£ÙØ±ÙŠÙ‚ÙŠ Ù…Ø³ØªÙˆØ±Ø¯ ÙˆÙØ­Ù… Ø´ÙˆØ§Ø¡ ÙØ§Ø®Ø±
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product 1 */}
            <motion.div {...animationProps} className="bg-gradient-to-b from-[#1a1a1a] to-black border border-[#333] rounded-3xl overflow-hidden flex flex-col">
              <div className="h-64 w-full bg-gradient-to-tr from-[#3a1c00] to-[#111] relative flex items-center justify-center border-b border-[#333]">
                <Flame className="w-24 h-24 text-[#ff6900] opacity-50" />
                <div className="absolute top-4 right-4 bg-[#ff6900] text-white px-3 py-1 rounded-full text-sm font-bold">Ø§Ù„Ø£ÙƒØ«Ø± Ù…Ø¨ÙŠØ¹Ø§Ù‹</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Ø­Ø·Ø¨ Ø³Ù…Ø± Ø£ÙØ±ÙŠÙ‚ÙŠ Ù…Ø³ØªÙˆØ±Ø¯</h3>
                <p className="text-gray-400 mb-6 text-base leading-relaxed">Ø­Ø·Ø¨ Ø³Ù…Ø± ÙØ§Ø®Ø± Ù…Ø«Ø§Ù„ÙŠ Ù„Ù„ØªØ¯ÙØ¦Ø©. ÙŠØ¶Ù…Ù† Ù„Ùƒ Ø­Ø±Ø§Ø±Ø© Ø¹Ø§Ù„ÙŠØ© ÙˆÙŠØ¯ÙˆÙ… Ù„ÙØªØ±Ø§Øª Ø·ÙˆÙŠÙ„Ø© Ø¬Ø¯Ø§Ù‹. Ù…ØªÙˆÙØ± Ø¨ÙƒÙ…ÙŠØ§Øª ØªØ¬Ø§Ø±ÙŠØ© Ù„ØªØ¬Ø§Ø± Ø§Ù„Ø¬Ù…Ù„Ø©.</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">400 <span className="text-lg text-gray-500 font-normal">Ø±ÙŠØ§Ù„ / Ø·Ù†</span></span>
                  <a href="https://wa.me/966500000000?text=Ø£Ø±ÙŠØ¯ Ø·Ù„Ø¨ Ø¹Ø±Ø¶ Ø³Ø¹Ø± Ù„Ø­Ø·Ø¨ Ø§Ù„Ø³Ù…Ø± Ø§Ù„Ø¥ÙØ±ÙŠÙ‚ÙŠ Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#ff6900] transition-colors p-3 rounded-xl min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Product 2 */}
            <motion.div {...animationProps} transition={{ delay: 0.2 }} className="bg-gradient-to-b from-[#1a1a1a] to-black border border-[#333] rounded-3xl overflow-hidden flex flex-col">
              <div className="h-64 w-full bg-gradient-to-tr from-[#222] to-[#0a0a0a] relative flex items-center justify-center border-b border-[#333]">
                <Flame className="w-24 h-24 text-gray-500 opacity-50" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">ÙØ­Ù… Ø´ÙˆØ§Ø¡ Ø£ÙØ±ÙŠÙ‚ÙŠ Ù†Ø®Ø¨ Ø£ÙˆÙ„</h3>
                <p className="text-gray-400 mb-6 text-base leading-relaxed">ÙØ­Ù… Ù…Ø®ØµØµ Ù„Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„Ù…Ø´Ø§ÙˆÙŠ. ÙŠØ´ØªØ¹Ù„ Ø¨Ø³Ù‡ÙˆÙ„Ø© ÙˆÙ„Ø§ ÙŠØªØ±Ùƒ Ø±Ù…Ø§Ø¯Ø§Ù‹ ÙŠÙØ³Ø¯ ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ø´ÙˆØ§Ø¡. Ø§Ù„Ø®ÙŠØ§Ø± Ø§Ù„Ø£ÙˆÙ„ Ù„Ù„Ù…Ø·Ø§Ø¹Ù… Ø§Ù„ÙƒØ¨Ø±Ù‰.</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">250 <span className="text-lg text-gray-500 font-normal">Ø±ÙŠØ§Ù„ / Ø·Ù†</span></span>
                  <a href="https://wa.me/966500000000?text=Ø£Ø±ÙŠØ¯ Ø·Ù„Ø¨ Ø¹Ø±Ø¶ Ø³Ø¹Ø± Ù„ÙØ­Ù… Ø§Ù„Ø´ÙˆØ§Ø¡ Ø§Ù„Ø¥ÙØ±ÙŠÙ‚ÙŠ" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#ff6900] transition-colors p-3 rounded-xl min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reviews Section - H2 */}
        <section id="reviews" className="w-full max-w-5xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            Ù…Ø§Ø°Ø§ ÙŠÙ‚ÙˆÙ„ Ø´Ø±ÙƒØ§Ø¡ Ø§Ù„Ù†Ø¬Ø§Ø­ØŸ
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { text: "Ø£ÙØ¶Ù„ Ø­Ø·Ø¨ ØªØ¹Ø§Ù…Ù„Øª Ù…Ø¹Ù‡Ù…. Ø­Ø±Ø§Ø±Ø© Ù…Ù…ØªØ§Ø²Ø© ÙˆØªÙˆØµÙŠÙ„ ÙÙŠ Ø§Ù„Ù…ÙˆØ¹Ø¯ Ø¨Ø§Ù„Ø¶Ø¨Ø· Ù„Ù…Ø·Ø¹Ù…Ù†Ø§.", name: "Ø®Ø§Ù„Ø¯ Ø§Ù„Ø¹ØªÙŠØ¨ÙŠ", role: "ØµØ§Ø­Ø¨ Ø³Ù„Ø³Ù„Ø© Ù…Ø·Ø§Ø¹Ù…" },
              { text: "ÙØ­Ù… Ø§Ù„Ø´ÙˆØ§Ø¡ Ø§Ø³ØªØ«Ù†Ø§Ø¦ÙŠØŒ Ø§Ù„Ø¬ÙˆØ¯Ø© Ø«Ø§Ø¨ØªØ© ÙÙŠ ÙƒÙ„ Ø´Ø­Ù†Ø© Ù†Ø·Ù„Ø¨Ù‡Ø§. Ø£Ù†ØµØ­ Ø¨Ù‡Ù… Ø¨Ø´Ø¯Ø© Ù„Ù„ÙƒÙ…ÙŠØ§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø©.", name: "Ø£Ø¨Ùˆ ÙÙ‡Ø¯", role: "ØªØ§Ø¬Ø± Ø¬Ù…Ù„Ø©" },
              { text: "ØªØ¹Ø§Ù…Ù„ Ø±Ø§Ù‚ÙŠ ÙˆØ§Ø­ØªØ±Ø§ÙÙŠ. Ø§Ù„Ø­Ø·Ø¨ Ø§Ù„Ø³Ù…Ø± Ø§Ù„Ø¥ÙØ±ÙŠÙ‚ÙŠ Ø¹Ù†Ø¯Ù‡Ù… Ù„Ø§ ÙŠØ¹Ù„Ù‰ Ø¹Ù„ÙŠÙ‡.", name: "Ù…Ø­Ù…Ø¯ Ø§Ù„Ø¯ÙˆØ³Ø±ÙŠ", role: "Ù…Ø¯ÙŠØ± Ù…Ø´ØªØ±ÙŠØ§Øª" },
              { text: "Ø³Ø±Ø¹Ø© ÙÙŠ Ø§Ù„ØªÙˆØµÙŠÙ„ ÙˆØ£Ø³Ø¹Ø§Ø± Ø§Ù„Ø¬Ù…Ù„Ø© ØªÙ†Ø§ÙØ³ÙŠØ© Ø¬Ø¯Ø§Ù‹. Ø£ØµØ¨Ø­ÙˆØ§ Ø§Ù„Ù…ÙˆØ±Ø¯ Ø§Ù„Ù…Ø¹ØªÙ…Ø¯ Ù„Ù†Ø§.", name: "Ø¹Ø¨Ø¯Ø§Ù„Ù„Ù‡ Ø§Ù„Ø±Ø§Ø¬Ø­ÙŠ", role: "Ù…Ø§Ù„Ùƒ Ù…Ø®ÙŠÙ…Ø§Øª" }
            ].map((review, idx) => (
              <motion.div key={idx} {...animationProps} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#ffae00] text-[#ffae00]" />)}
                </div>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6900] to-[#ff3300] flex items-center justify-center font-bold">{review.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-white">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section - H2 */}
        <section id="faq" className="w-full max-w-3xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            Ø£Ø³Ø¦Ù„Ø© Ù…ØªÙƒØ±Ø±Ø© Ø¹Ù† Ø§Ù„Ø­Ø·Ø¨ ÙˆØ§Ù„ÙØ­Ù…
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} {...animationProps} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-right flex items-center justify-between min-h-[60px]"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 text-base leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA - H2 */}
        <section id="contact" className="w-full max-w-4xl bg-gradient-to-r from-[#ff6900]/20 to-[#ff3300]/20 border border-[#ff6900]/30 rounded-3xl p-8 md:p-16 text-center">
          <motion.h2 {...animationProps} className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ø¬Ø§Ù‡Ø² Ù„Ø·Ù„Ø¨ Ø£ÙØ¶Ù„ Ø­Ø·Ø¨ ÙÙŠ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©ØŸ
          </motion.h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø§Ù„Ø¢Ù† Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ ØªØ³Ø¹ÙŠØ±Ø© Ø§Ù„Ø¬Ù…Ù„Ø© Ø§Ù„Ù…Ø®ØµØµØ©ØŒ Ø£Ùˆ Ù„Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ù† Ù…Ù†ØªØ¬Ø§ØªÙ†Ø§ ÙˆØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªÙˆØµÙŠÙ„ Ù„Ù…Ù†Ø·Ù‚ØªÙƒ.</p>
          <a href="tel:+966500000000" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff6900] to-[#ff3300] text-white px-8 py-5 rounded-xl font-bold text-xl hover:shadow-[0_0_30px_rgba(255,105,0,0.5)] transition-all duration-300 transform hover:-translate-y-1 min-w-[200px] min-h-[56px]">
            <Phone className="w-6 h-6" />
            <span>Ø§ØªØµÙ„ Ø¨Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª</span>
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md pb-24 md:pb-8 pt-12 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 mb-6 text-base">Ù…Ø¤Ø³Ø³Ø© Ù†Ø§Ø±ÙƒÙˆ Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© - Ø±ÙˆØ§Ø¯ Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø§Ù„Ø­Ø·Ø¨ ÙˆØ§Ù„ÙØ­Ù… Ø§Ù„Ø¥ÙØ±ÙŠÙ‚ÙŠ ÙÙŠ Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="/" className="hover:text-white p-2 -m-2 min-h-[48px] min-w-[48px] flex items-center justify-center">Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©</a>
            <a href="#products" className="hover:text-white p-2 -m-2 min-h-[48px] min-w-[48px] flex items-center justify-center">Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª</a>
            <button type="button" className="hover:text-white p-2 -m-2 min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer">Ø§Ù„Ø´Ø±ÙˆØ· ÙˆØ§Ù„Ø£Ø­ÙƒØ§Ù…</button>
            <a href="#contact" className="hover:text-white p-2 -m-2 min-h-[48px] min-w-[48px] flex items-center justify-center">ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-50 md:hidden flex justify-center pointer-events-none">
        <a href="https://wa.me/966500000000" className="pointer-events-auto flex w-full max-w-sm items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] min-h-[56px]">
          <MessageCircle className="w-6 h-6" />
          <span>ØªÙˆØ§ØµÙ„ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ ÙÙˆØ±Ø§Ù‹</span>
        </a>
      </div>
    </div>
  );
}
