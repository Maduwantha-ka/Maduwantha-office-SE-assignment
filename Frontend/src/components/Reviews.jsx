const REVIEWS = [
  { name: 'Amara Perera',      loc: 'Colombo 05',    stars: 5, text: 'Absolutely incredible service. My apartment has never looked this clean. The team was professional, thorough, and so friendly.', featured: true },
  { name: 'Roshan Fernando',   loc: 'Nugegoda',      stars: 5, text: 'Used CleanCo for our office deep clean. Finished ahead of schedule and the results were beyond our expectations.' },
  { name: 'Nisha Jayawardena', loc: 'Dehiwala',      stars: 5, text: 'The sofa express service transformed my living room. Stains I thought were permanent are completely gone. 10/10!' },
  { name: 'Kamal Silva',       loc: 'Mount Lavinia', stars: 5, text: 'Booked a move-out clean and got my full deposit back. Landlord was genuinely impressed.' },
  { name: 'Priya Seneviratne', loc: 'Colombo 07',    stars: 5, text: 'Reliable, punctual, and the house smelled amazing afterwards. Will definitely be a regular customer.' },
]

const Stars = ({ n }) => <span className="text-green text-sm">{'★'.repeat(n)}</span>

export default function Reviews() {
  const [featured, ...rest] = REVIEWS

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="inline-block bg-green/10 text-green text-xs font-semibold px-3 py-1 rounded-full mb-4">Reviews</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">Loved by homeowners.</h2>
        </div>

        {/* Featured large review */}
        <div className="bg-ink rounded-3xl p-10 md:p-14 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <Stars n={featured.stars} />
          <p className="font-display text-2xl md:text-3xl font-bold text-white mt-4 mb-8 max-w-2xl leading-tight relative z-10">
            "{featured.text}"
          </p>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center text-white font-bold">{featured.name[0]}</div>
            <div>
              <p className="text-white font-semibold text-sm">{featured.name}</p>
              <p className="text-white/50 text-xs">{featured.loc}</p>
            </div>
          </div>
        </div>

        {/* Smaller review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map(r => (
            <div key={r.name} className="bg-green-pale border border-green/10 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <Stars n={r.stars} />
              <p className="text-ink-soft text-sm leading-relaxed mt-3 mb-5">"{r.text}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-green/20 text-green flex items-center justify-center font-bold text-sm">{r.name[0]}</div>
                <div>
                  <p className="text-ink font-semibold text-xs">{r.name}</p>
                  <p className="text-ink-muted text-xs">{r.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
