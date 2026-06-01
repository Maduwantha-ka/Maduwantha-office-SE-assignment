import { useState, useEffect } from 'react'
import { getServices } from '../services/api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [active, setActive]     = useState('All')

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(services.map(s => s.category))]
  const filtered = active === 'All' ? services : services.filter(s => s.category === active)

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green/10 text-green text-xs font-semibold px-3 py-1 rounded-full mb-4">Our Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            What we clean
          </h2>
          <p className="text-ink-muted max-w-md mx-auto">From quick freshups to deep cleans — we've got every space covered.</p>
        </div>

        {/* Category filter pills */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === c
                    ? 'bg-green text-white shadow-md shadow-green/20'
                    : 'bg-mint text-ink-soft hover:bg-green/10'
                }`}>
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-mint border-t-green rounded-full anim-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 py-16">Failed to load services. Is your backend running?</p>
        )}

        {/* Cards grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((s, i) => (
              <div key={s._id}
                className="group border border-border rounded-2xl overflow-hidden hover:border-green/30 hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img src={s.image} alt={s.name} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-green text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {s.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink mb-1.5">{s.name}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed line-clamp-2 mb-4">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-ink-muted uppercase tracking-wider">From</p>
                      <p className="font-display text-xl font-bold text-green">LKR {s.price.toLocaleString()}</p>
                    </div>
                    <a href="#booking"
                      className="px-4 py-2 bg-green-pale text-green text-xs font-bold rounded-xl hover:bg-green hover:text-white transition-all">
                      Book →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
