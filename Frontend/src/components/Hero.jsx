const BADGES = ['⚡ Same-day available', '🌿 Eco-friendly', '✅ Insured & bonded']

const IMGS = [
  'images/first.jpg',
  'images/second.jpg',
  'https://www.pexels.com/photo/waiter-cleaning-table-top-while-holding-a-paper-4921561/',
  'images/third.jpg',
]

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT — text */}
        <div>
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-green-pale border border-green/20 text-green text-xs font-semibold px-4 py-2 rounded-full mb-8 anim-fade-up">
            <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
            Trusted by 2,000+ homes in Sri Lanka
          </div>

          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-extrabold text-ink leading-[1.05] mb-6 anim-fade-up d1">
            Your Home,<br />
            <span className="text-green">Perfectly</span><br />
            Clean.
          </h1>

          <p className="text-ink-soft text-lg leading-relaxed mb-8 max-w-md anim-fade-up d2">
            Professional cleaning services booked in minutes. We handle the mess so you can focus on what matters.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-10 anim-fade-up d3">
            {BADGES.map(b => (
              <span key={b} className="text-xs font-medium bg-mint text-green-dark px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12 anim-fade-up d4">
            <a href="#booking"
              className="px-8 py-4 bg-green text-white font-semibold rounded-2xl text-sm hover:bg-green-dark transition-all shadow-lg shadow-green/25 hover:shadow-xl hover:shadow-green/30 hover:-translate-y-0.5 transform">
              Book a Cleaning
            </a>
            <a href="#services"
              className="px-8 py-4 bg-ink text-white font-semibold rounded-2xl text-sm hover:bg-ink/80 transition-all hover:-translate-y-0.5 transform">
              See Services
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 anim-fade-up d5">
            {[['2K+','Happy clients'],['50+','Cleaners'],['4.9','Star rating']].map(([n,l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-ink">{n}</p>
                <p className="text-ink-muted text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 2x2 image mosaic */}
        <div className="hidden lg:grid grid-cols-2 gap-3 anim-fade-up d2">
          {IMGS.map((src, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
              <img src={src} alt="Cleaned space"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
          {/* floating badge */}
          <div className="col-span-2 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 shadow-md text-sm font-medium text-ink-soft">
              <span className="text-green">★★★★★</span> Rated 4.9 by 800+ reviews
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
