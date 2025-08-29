'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqItems: FAQItem[] = [
    {
      question: "What services does Sparkco VIP offer?",
      answer: "We offer comprehensive software development services including web development, mobile app development, SaaS solutions, AI & automation, integrations, and ongoing maintenance & support."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex SaaS platforms can take 3-6 months. We provide detailed timelines during the planning phase."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes! We offer various support packages including bug fixes, updates, maintenance, and feature additions. We believe in long-term partnerships with our clients."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern, scalable technologies including React, Next.js, Node.js, Python, AWS, and more. We choose the best tech stack for each project's specific requirements."
    },
    {
      question: "How do you handle project communication?",
      answer: "We maintain regular communication through scheduled meetings, progress reports, and project management tools. You'll always know the status of your project."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! We work with clients worldwide and have experience in multiple languages and cultures. Our team is equipped to handle global projects."
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white">{item.question}</h3>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-white/70" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/70" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-white/70 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
