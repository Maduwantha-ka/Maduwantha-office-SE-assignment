import { useState } from 'react'

const IMGS = [
  { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop', label: 'Kitchen Deep Clean', tall: true },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop', label: 'Living Room' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop', label: 'Office Space' },
  { url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&auto=format&fit=crop', label: 'Bathroom', tall: true },
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop', label: 'Bedroom' },
  { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop', label: 'Dining Area' },
  { url: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=600&auto=format&fit=crop', label: 'Post-Renovation', tall: true },
  { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop', label: 'Sofa Express' },
]

export default function Gallery() {
  const [modal, setModal] = useState(null)

  return (
    <section id="gallery" className="py-24 bg-green-pale">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block bg-green/10 text-green text-xs font-semibold px-3 py-1 rounded-full mb-4">Gallery</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">Our work speaks<br />for itself.</h2>
          </div>
          <p className="text-ink-muted text-sm max-w-xs">Real results from real homes. Click any photo to zoom in.</p>
        </div>

        {/* Masonry-style columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {IMGS.map((img, i) => (
            <div key={i}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
              onClick={() => setModal(img)}>
              <img src={img.url} alt={img.label} loading="lazy"
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${img.tall ? 'aspect-[3/4]' : 'aspect-square'}`} />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="bg-white text-ink text-xs font-semibold px-3 py-1.5 rounded-full">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 anim-fade-in"
          onClick={() => setModal(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={modal.url} alt={modal.label} className="w-full rounded-2xl shadow-2xl" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="bg-white/90 backdrop-blur-sm text-ink text-xs font-semibold px-3 py-1.5 rounded-full">{modal.label}</span>
              <button onClick={() => setModal(null)}
                className="bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-ink hover:bg-white transition-colors font-bold text-sm">✕</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
