const STATS = [
  { n: '2,000+', label: 'Homes cleaned' },
  { n: '50+',    label: 'Expert cleaners' },
  { n: '4.9★',   label: 'Average rating' },
  { n: '100%',   label: 'Satisfaction rate' },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top — split headline */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16 pb-16 border-b border-white/10">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight">
            We're on a mission to make<br />
            <span className="text-green">clean living</span> accessible to everyone.
          </h2>
          <div>
            <p className="text-white/60 leading-relaxed mb-6">
              CleanCo was founded in 2014 on a simple belief — everyone deserves a clean, healthy space without the hassle.
              Our team of trained professionals uses eco-friendly products and proven techniques that go beyond the surface.
            </p>
            <p className="text-white/60 leading-relaxed">
              Every cleaner on our platform is background-checked, insured, and trained to our high standards.
              We stand behind our work with a 100% satisfaction guarantee.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <p className="font-display text-4xl font-extrabold text-green mb-1">{s.n}</p>
              <p className="text-white/50 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Image strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1527515545081-5db817172677?w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop',
          ].map((src, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${i === 1 ? 'mt-8' : ''}`}>
              <img src={src} alt="Our team" className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
