const STEPS = [
  { num: '01', title: 'Choose a Service', desc: 'Browse our range of professional cleaning packages and pick what suits your space.', icon: '🧹' },
  { num: '02', title: 'Book Online', desc: 'Fill out our simple form with your preferred date, time, and address. Done in 2 minutes.', icon: '📅' },
  { num: '03', title: 'We Show Up', desc: 'Our vetted, trained cleaners arrive on time with all equipment and eco-friendly products.', icon: '🚐' },
  { num: '04', title: 'Enjoy the Results', desc: 'Come home to a spotlessly clean space. Not satisfied? We re-clean for free.', icon: '✨' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-green-pale">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-block bg-green/10 text-green text-xs font-semibold px-3 py-1 rounded-full mb-4">How It Works</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
              Clean home in<br />4 simple steps.
            </h2>
          </div>
          <p className="text-ink-soft max-w-sm leading-relaxed">
            We've made the booking process as easy as possible so you can get back to living your life.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div key={s.num}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-border group">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-display text-5xl font-extrabold text-border group-hover:text-green/20 transition-colors">{s.num}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-ink mb-2">{s.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-border text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
