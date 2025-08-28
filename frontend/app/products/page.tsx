'use client'

import { Calendar, Wrench, Scale, Globe, Book, Check, ExternalLink, Play } from 'lucide-react'

export default function ProductsPage() {
  const products = [
    {
      icon: Calendar,
      title: "BookingPro",
      description: "Smart appointment booking system with automated reminders and conflict detection.",
      features: ["Automated Reminders", "Conflict Detection", "Multi-Platform Sync", "Analytics Dashboard"],
      gradient: "from-blue-500 to-cyan-500",
      subdomain: "booking",
      status: "Live",
      preview: "https://book.sparkco.vip",
      longDescription: "BookingPro is a comprehensive appointment booking solution designed to streamline scheduling operations for businesses of all sizes. With intelligent conflict detection, automated reminder systems, and seamless multi-platform synchronization, it eliminates double bookings and reduces no-shows by up to 90%."
    },
    {
      icon: Wrench,
      title: "MaintainAI",
      description: "AI-powered predictive maintenance that prevents downtime and reduces costs.",
      features: ["AI Predictions", "Cost Reduction", "Downtime Prevention", "Real-time Monitoring"],
      gradient: "from-purple-500 to-pink-500",
      subdomain: "maintenance",
      status: "Live",
      preview: "https://maintenance.sparkco.vip",
      longDescription: "MaintainAI leverages advanced machine learning algorithms to predict equipment failures before they occur. By analyzing historical data, sensor readings, and operational patterns, it helps businesses reduce maintenance costs by up to 40% and prevent unexpected downtime."
    },
    {
      icon: Scale,
      title: "LegalManager",
      description: "Comprehensive legal practice management with full multi language support.",
      features: ["Multi Language Interface", "Case Management", "Document Templates", "Billing System"],
      gradient: "from-emerald-500 to-teal-500",
      subdomain: "legal",
      status: "Live",
      preview: "https://legal.sparkco.vip",
      longDescription: "LegalManager is a powerful case management solution designed for legal professionals across diverse regions. It provides complete tools for case tracking, client communication, document generation, and billing, all with seamless multilingual support. The platform is available in English, Arabic, and Hebrew, with full right-to-left (RTL) and left-to-right (LTR) compatibility, ensuring an intuitive experience for every user. LegalManager also complies with regional legal requirements, making it the ideal system for modern law practices that serve multilingual clients and cross-border cases."
    },
    {
      icon: Book,
      title: "EduVibe AI Academy",
      description: "A complete, adaptable, and personalized school in a single system.",
      features: ["🎯 Personalized Learning", "📝 Quizzes & Homework", "🔄 Multi-Explanations", "👨‍👩‍👧‍👦 Guardian Insights"],
      gradient: "from-orange-500 to-red-500",
      subdomain: "eduvib",
      status: "Live",
      preview: "https://eduvibe.vip/",
      longDescription: "An AI-powered, LLM-driven platform that delivers a complete, adaptable, and personalized school in a single system. More than just a chatbot, it’s a comprehensive, interactive learning academy—crafting dynamic lessons, quizzes, tests, and explanations tailored to each student’s unique needs."
    }
  ]

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Our
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Products</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Ready-to-use SaaS solutions designed to streamline your business operations and boost productivity. Each product is built with cutting-edge technology and proven methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${product.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      {product.status}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">{product.title}</h3>
                <p className="text-white/70 mb-4">{product.description}</p>
                <p className="text-white/60 mb-6 text-sm leading-relaxed">{product.longDescription}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/80">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center space-x-4">
                  <a 
                    href={product.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Product
                  </a>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Demo
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-white/50">
                  Access: {product.subdomain}.sparkco.vip
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our products are just the beginning. We build tailored solutions that perfectly match your unique business requirements and workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Request Custom Product
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

