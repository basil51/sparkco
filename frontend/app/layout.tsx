import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { Code, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sparkco VIP - Software Development & SaaS Services',
  description: 'Professional software development, SaaS solutions, and custom applications. Specializing in appointment booking, predictive maintenance, legal management, and web development.',
  keywords: 'software development, SaaS, appointment booking, predictive maintenance, lawyer management, web development',
  authors: [{ name: 'Sparkco VIP' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Sparkco VIP - Software Development & SaaS Services',
    description: 'Professional software development and SaaS solutions for modern businesses',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sparkco VIP - Software Development & SaaS Services',
    description: 'Professional software development and SaaS solutions for modern businesses',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Header />
          {children}
          {/* Footer */}
          <footer className="bg-black/50 backdrop-blur-lg border-t border-white/20 py-12">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-5 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Sparkco VIP</span>
                  </div>
                  <p className="text-white/70">
                    Transforming businesses with innovative software solutions and cutting-edge technology.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
                  <ul className="space-y-2 text-white/70">
                    <li><a href="https://book.sparkco.vip" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">BookingPro <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                    <li><a href="https://maintenance.sparkco.vip" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">MaintainAI <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                    <li><a href="https://legal.sparkco.vip" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">LegalManager AR <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                    <li><a href="https://eduvibe.vip" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">AI Academy <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                  <ul className="space-y-2 text-white/70">
                    <li><Link href="/services" className="hover:text-white transition-colors">Custom Development</Link></li>
                    <li><Link href="/services" className="hover:text-white transition-colors">SaaS Solutions</Link></li>
                    <li><Link href="/services" className="hover:text-white transition-colors">Web Development</Link></li>
                    <li><Link href="/services" className="hover:text-white transition-colors">Mobile Apps</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                  <ul className="space-y-2 text-white/70">
                    <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
                    <li><Link href="/#team" className="hover:text-white transition-colors">Our Team</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                    <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>Email: basel@sparkco.vip</li>
                    <li>Phone: +972 (51) 5622-300</li>
                    <li>Address: Jerusalem</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
                <p>&copy; 2025 Sparkco VIP. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

