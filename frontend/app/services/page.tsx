'use client'

import { Globe, Smartphone, Cloud, Brain, Puzzle, Wrench, ArrowRight, Check, Code, Database, Shield, Zap, Users, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ServicesPage() {
  const router = useRouter()

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      emoji: "🛠",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      features: [
        "Custom websites (business, landing pages, blogs)",
        "Responsive UI/UX design",
        "CMS integration (WordPress, Strapi, etc.)",
        "E-commerce solutions",
        "Progressive Web Apps (PWA)",
        "Performance optimization",
        "SEO implementation",
        "Cross-browser compatibility"
      ],
      gradient: "from-blue-500 to-cyan-500",
      technologies: ["React", "Next.js", "Vue.js", "Angular", "Node.js", "PHP", "WordPress", "Shopify"]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      emoji: "📱",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      features: [
        "Android and iOS (React Native or Flutter)",
        "App UI/UX design",
        "App deployment and maintenance",
        "Push notifications",
        "Offline functionality",
        "App store optimization",
        "Performance monitoring",
        "User analytics integration"
      ],
      gradient: "from-purple-500 to-pink-500",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin", "Ionic", "Firebase", "AWS Mobile"]
    },
    {
      icon: Cloud,
      title: "SaaS Development",
      emoji: "🌐",
      description: "End-to-end Software as a Service platforms with scalable architecture and modern features.",
      features: [
        "End-to-end SaaS platforms",
        "User management, billing, subscriptions",
        "Secure, scalable backends",
        "Multi-tenant architecture",
        "API development and integration",
        "Real-time features",
        "Analytics and reporting",
        "Cloud deployment and scaling"
      ],
      gradient: "from-emerald-500 to-teal-500",
      technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Microservices", "GraphQL", "PostgreSQL"]
    },
    {
      icon: Brain,
      title: "AI & Automation",
      emoji: "🧠",
      description: "Intelligent systems and automation solutions to streamline business processes.",
      features: [
        "Predictive maintenance tools",
        "Intelligent appointment systems",
        "Chatbots and smart assistants",
        "Machine learning models",
        "Natural language processing",
        "Computer vision solutions",
        "Process automation",
        "Data analysis and insights"
      ],
      gradient: "from-orange-500 to-red-500",
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Langchain", "Scikit-learn", "Pandas", "FastAPI"]
    },
    {
      icon: Puzzle,
      title: "Integrations & APIs",
      emoji: "🧩",
      description: "Seamless integration solutions connecting your systems and third-party services.",
      features: [
        "Payment gateways (Stripe, PayPal)",
        "Third-party APIs (Google, AWS, etc.)",
        "CRM, ERP, email services",
        "Custom API development",
        "Webhook implementations",
        "Data synchronization",
        "Legacy system integration",
        "Real-time data processing"
      ],
      gradient: "from-indigo-500 to-purple-500",
      technologies: ["REST APIs", "GraphQL", "Webhooks", "OAuth", "JWT", "Redis", "RabbitMQ", "Apache Kafka"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      emoji: "🔧",
      description: "Ongoing maintenance, support, and optimization services for your digital assets.",
      features: [
        "Bug fixes and troubleshooting",
        "Hosting help and server management",
        "Long-term support plans",
        "Performance monitoring",
        "Security updates and patches",
        "Backup and disaster recovery",
        "24/7 technical support",
        "System upgrades and migrations"
      ],
      gradient: "from-gray-500 to-slate-600",
      technologies: ["Monitoring Tools", "CI/CD", "Docker", "Linux", "AWS", "Cloudflare", "New Relic", "Sentry"]
    }
  ]

  const additionalServices = [
    {
      icon: Database,
      title: "Database Design & Optimization",
      description: "Custom database solutions and performance optimization"
    },
    {
      icon: Shield,
      title: "Cybersecurity Solutions",
      description: "Security audits, penetration testing, and compliance"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization and scalability improvements"
    },
    {
      icon: Users,
      title: "Digital Transformation",
      description: "Complete business process digitization"
    },
    {
      icon: Settings,
      title: "DevOps & Infrastructure",
      description: "CI/CD pipelines, cloud infrastructure, and automation"
    },
    {
      icon: Code,
      title: "Code Review & Consulting",
      description: "Technical audits and architecture consulting"
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
              Development
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Services</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Comprehensive software development services to bring your unique vision to life. From web applications to AI-powered solutions, we deliver excellence at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-3xl">{service.emoji}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/70 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What We Offer:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-white/80">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => router.push('/#contact')}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center transition-colors group-hover:translate-x-2 duration-300 cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Additional Services</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Comprehensive solutions to support every aspect of your digital journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Development Process</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your requirements and goals" },
              { step: "02", title: "Planning", desc: "Creating detailed project roadmap and timeline" },
              { step: "03", title: "Development", desc: "Building your solution with regular updates" },
              { step: "04", title: "Deployment", desc: "Launch and ongoing support" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your requirements and create a custom solution that perfectly fits your business needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push('/#contact')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Get Free Consultation
              </button>
              <button
                onClick={() => router.push('/products')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

