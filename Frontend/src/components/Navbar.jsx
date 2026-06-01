import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NAV = [
  { label: 'Services', href: '/#services' },
  { label: 'How It Works', href: '/#how' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center text-white font-display font-bold text-sm group-hover:scale-110 transition-transform">C</div>
          <span className="font-display font-bold text-ink text-lg tracking-tight">CleanCo</span>
        </Link>

        {/* Desktop nav — pill style */}
        <nav className="hidden md:flex items-center gap-1 bg-green-pale border border-border rounded-full px-2 py-1.5">
          {NAV.map(n => (
            <a key={n.label} href={n.href}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-ink-soft hover:bg-white hover:text-green hover:shadow-sm transition-all duration-200">
              {n.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin" className="text-sm text-ink-muted hover:text-ink transition-colors">Admin</Link>
          <a href="#booking"
            className="px-5 py-2 bg-green text-white text-sm font-semibold rounded-full hover:bg-green-dark transition-colors shadow-sm shadow-green/20">
            Book Now →
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-mint transition-colors">
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-ink transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-ink transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-ink transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border px-6 py-5 flex flex-col gap-1">
          {NAV.map(n => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-ink-soft border-b border-border last:border-0">
              {n.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)}
            className="mt-3 py-3 bg-green text-white text-sm font-semibold rounded-full text-center">
            Book Now →
          </a>
        </div>
      )}
    </header>
  )
}
