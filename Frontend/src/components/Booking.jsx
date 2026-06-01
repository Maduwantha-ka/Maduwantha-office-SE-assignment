import { useState, useEffect } from 'react'
import { getServices, createBooking } from '../services/api'

const SLOTS = ['08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM']
const EMPTY = { customerName:'', email:'', phone:'', service:'', date:'', time:'', address:'', notes:'' }

export default function Booking() {
  const [services, setServices] = useState([])
  const [form, setForm]         = useState(EMPTY)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const [apiErr, setApiErr]     = useState('')

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => { getServices().then(setServices).catch(() => {}) }, [])

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.customerName.trim()) e.customerName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.service) e.service = 'Required'
    if (!form.date) e.date = 'Required'
    if (!form.time) e.time = 'Required'
    if (!form.address.trim()) e.address = 'Required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const submit = async e => {
    e.preventDefault()
    setApiErr('')
    if (!validate()) return
    setLoading(true)
    try {
      await createBooking(form)
      setDone(true)
      setForm(EMPTY)
    } catch (err) {
      setApiErr(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const field = (k, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} value={form[k]} min={type === 'date' ? today : undefined}
        onChange={e => set(k, e.target.value)} placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
          errors[k] ? 'border-red-400 bg-red-50' : 'border-border focus:border-green focus:ring-2 focus:ring-green/10'
        }`} />
      {errors[k] && <p className="text-red-500 text-xs mt-1">{errors[k]}</p>}
    </div>
  )

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top label */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green/10 text-green text-xs font-semibold px-3 py-1 rounded-full mb-4">Book Online</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">Schedule your clean</h2>
          <p className="text-ink-muted max-w-sm mx-auto">Confirmed within 2 hours. Free cancellation 24h before.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 max-w-5xl mx-auto">

          {/* Left — info card */}
          <div className="bg-green rounded-3xl p-8 text-white flex flex-col gap-6 h-fit">
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">Why book with us?</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our cleaners are background-checked, trained, and equipped with eco-friendly products.
              </p>
            </div>
            {[
              ['⏱', 'Flexible time slots', '8AM to 5PM, Mon–Sat'],
              ['🌿', 'Eco-friendly', 'Safe for kids and pets'],
              ['🔒', 'Insured & bonded', 'Full coverage guaranteed'],
              ['⭐', '4.9 star average', 'From 800+ verified reviews'],
            ].map(([icon, title, sub]) => (
              <div key={title} className="flex gap-4 items-start">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-white/60 text-xs">{sub}</p>
                </div>
              </div>
            ))}
            <button onClick={() => window.open('https://wa.me/94771234567', '_blank')}
              className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-sm font-semibold py-3 rounded-xl transition-all mt-2">
              💬 WhatsApp us instead
            </button>
          </div>

          {/* Right — form card */}
          <div className="bg-white border border-border rounded-3xl p-8 shadow-sm">
            {done ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 py-12 text-center anim-fade-in">
                <div className="w-20 h-20 bg-green-pale rounded-full flex items-center justify-center text-4xl">✅</div>
                <h3 className="font-display text-2xl font-bold text-ink">You're all set!</h3>
                <p className="text-ink-muted text-sm max-w-xs">We'll send a confirmation and reach out within 2 hours to finalise your booking.</p>
                <button onClick={() => setDone(false)}
                  className="px-6 py-3 bg-green text-white text-sm font-semibold rounded-xl hover:bg-green-dark transition-colors">
                  Book another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  {field('customerName', 'Full Name', 'text', 'Nisha Perera')}
                  {field('email', 'Email', 'email', 'nisha@email.com')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {field('phone', 'Phone', 'tel', '077 123 4567')}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">Service</label>
                    <select value={form.service} onChange={e => set('service', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.service ? 'border-red-400 bg-red-50' : 'border-border focus:border-green focus:ring-2 focus:ring-green/10'
                      }`}>
                      <option value="">Select…</option>
                      {services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {field('date', 'Date', 'date')}
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">Time</label>
                    <select value={form.time} onChange={e => set('time', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.time ? 'border-red-400 bg-red-50' : 'border-border focus:border-green focus:ring-2 focus:ring-green/10'
                      }`}>
                      <option value="">Select…</option>
                      {SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>
                {field('address', 'Address', 'text', '45 Galle Road, Colombo 03')}
                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">Notes (optional)</label>
                  <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                    rows={2} placeholder="Any special requests..."
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-green focus:ring-2 focus:ring-green/10 text-sm outline-none resize-none transition-all" />
                </div>
                {apiErr && <p className="text-red-500 text-sm text-center">{apiErr}</p>}
                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-green text-white font-bold rounded-xl text-sm hover:bg-green-dark disabled:opacity-60 transition-all shadow-lg shadow-green/20 flex items-center justify-center gap-2">
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full anim-spin" />Submitting...</>
                    : 'Confirm Booking →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
