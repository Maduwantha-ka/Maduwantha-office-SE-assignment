import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="contact" className="bg-green-pale border-t border-border">

      {/* Contact bar */}
      <div className="bg-green">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-1">Ready to book?</h3>
            <p className="text-white/70 text-sm">Same-day slots available. Confirmation in 2 hours.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#booking"
              className="px-6 py-3 bg-white text-green font-bold text-sm rounded-full hover:bg-green-pale transition-colors shadow-sm">
              Book Now →
            </a>
            <button onClick={() => window.open('https://wa.me/94771234567', '_blank')}
              className="px-6 py-3 bg-white/15 border border-white/30 text-white font-semibold text-sm rounded-full hover:bg-white/25 transition-colors">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <iframe title="location map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385149874!2d79.82118!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s"
        width="100%" height="260" style={{ border:0, display:'block' }}
        allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">C</div>
            <span className="font-display font-bold text-ink text-lg">CleanCo</span>
          </div>
          <p className="text-ink-muted text-sm leading-relaxed">Professional cleaning services across Sri Lanka since 2014.</p>
        </div>

        <div>
          <p className="font-display font-bold text-ink text-sm mb-4">Services</p>
          <ul className="flex flex-col gap-2.5">
            {['Deep Clean','Office Cleaning','Sofa Express','Carpet Cleaning','Move-In/Out'].map(s => (
              <li key={s}><a href="#services" className="text-ink-muted text-sm hover:text-green transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display font-bold text-ink text-sm mb-4">Company</p>
          <ul className="flex flex-col gap-2.5">
            <li><a href="#about"   className="text-ink-muted text-sm hover:text-green transition-colors">About Us</a></li>
            <li><a href="#gallery" className="text-ink-muted text-sm hover:text-green transition-colors">Gallery</a></li>
            <li><a href="#reviews" className="text-ink-muted text-sm hover:text-green transition-colors">Reviews</a></li>
            <li><Link to="/admin"  className="text-ink-muted text-sm hover:text-green transition-colors">Admin</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display font-bold text-ink text-sm mb-4">Contact</p>
          <ul className="flex flex-col gap-3">
            {[
              ['📍', '45 Galle Road, Colombo 03'],
              ['📧', 'hello@cleanco.lk'],
              ['📞', '+94 77 123 4567'],
              ['🕐', 'Mon–Sat, 8AM–6PM'],
            ].map(([icon, val]) => (
              <li key={val} className="flex gap-2 text-ink-muted text-sm">{icon} {val}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-ink-muted text-xs px-6">
        © {new Date().getFullYear()} CleanCo. All rights reserved.
      </div>
    </footer>
  )
}
