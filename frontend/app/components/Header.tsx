'use client'

import { useState } from 'react'
import { Code, Menu, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Sparkco VIP</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-white/80 hover:text-white transition-colors">Products</Link>
            <Link href="/services" className="text-white/80 hover:text-white transition-colors">Services</Link>
            <Link href="/#about" className="text-white/80 hover:text-white transition-colors">About</Link>
            <Link href="/#team" className="text-white/80 hover:text-white transition-colors">Team</Link>
            <Link href="/#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</Link>
            <Link href="/#contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link href="/services" className="text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/#about" className="text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/#team" className="text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Team</Link>
              <Link href="/#testimonials" className="text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
              <Link href="/#contact" className="text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 w-full">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

