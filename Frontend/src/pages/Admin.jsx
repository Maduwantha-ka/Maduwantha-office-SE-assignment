import { useState } from 'react'
import { getAdminBookings, markCompleted, deleteBooking } from '../services/api'

const STATUS_COLORS = {
  Pending:   'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-green-50 text-green border-green/20',
  Cancelled: 'bg-red-50 text-red-600 border-red-200',
}

const fmt = d => new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })

export default function Admin() {
  const [secret, setSecret]   = useState('')
  const [authed, setAuthed]   = useState(false)
  const [bookings, setBookings] = useState([])
  const [filter, setFilter]   = useState('All')
  const [loading, setLoading] = useState(false)
  const [actionId, setActionId] = useState(null)
  const [err, setErr]         = useState('')

  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter)

  const login = async () => {
    setErr('')
    if (!secret.trim()) { setErr('Enter the admin secret'); return }
    setLoading(true)
    try {
      setBookings(await getAdminBookings(secret))
      setAuthed(true)
    } catch { setErr('Invalid secret. Try again.') }
    finally { setLoading(false) }
  }

  const complete = async id => {
    setActionId(id)
    try {
      const updated = await markCompleted(id, secret)
      setBookings(bs => bs.map(b => b._id === id ? updated : b))
    } catch (e) { alert(e.message) }
    finally { setActionId(null) }
  }

  const remove = async id => {
    if (!confirm('Delete this booking?')) return
    setActionId(id)
    try {
      await deleteBooking(id, secret)
      setBookings(bs => bs.filter(b => b._id !== id))
    } catch (e) { alert(e.message) }
    finally { setActionId(null) }
  }

  /* ── Login ── */
  if (!authed) return (
    <main className="min-h-screen bg-green-pale flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl mx-auto mb-4">C</div>
          <h1 className="font-display text-3xl font-bold text-ink">Admin Dashboard</h1>
          <p className="text-ink-muted text-sm mt-2">Enter your secret key to access bookings.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
          <input type="password" value={secret}
            onChange={e => setSecret(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Admin secret key"
            className={`w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all text-center mb-3 ${
              err ? 'border-red-400 bg-red-50' : 'border-border focus:border-green focus:ring-2 focus:ring-green/10'
            }`} />
          {err && <p className="text-red-500 text-xs text-center mb-3">{err}</p>}
          <button onClick={login} disabled={loading}
            className="w-full py-3.5 bg-green text-white font-bold text-sm rounded-xl hover:bg-green-dark disabled:opacity-60 transition-all flex items-center justify-center gap-2">
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full anim-spin" />Verifying...</>
              : 'Enter Dashboard →'}
          </button>
        </div>
      </div>
    </main>
  )

  /* ── Dashboard ── */
  return (
    <main className="min-h-screen bg-green-pale pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-ink">Bookings</h1>
            <p className="text-ink-muted text-sm mt-1">{bookings.length} total · {bookings.filter(b=>b.status==='Pending').length} pending</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All','Pending','Completed'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  filter === s ? 'bg-green text-white border-green shadow-sm' : 'bg-white text-ink-muted border-border hover:border-green/30'
                }`}>
                {s} {s !== 'All' && <span className="ml-1 opacity-60">{bookings.filter(b=>b.status===s).length}</span>}
              </button>
            ))}
            <button onClick={() => { setAuthed(false); setSecret(''); setBookings([]) }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-border bg-white text-ink-muted hover:border-red-300 hover:text-red-500 transition-all">
              Log out
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-16 text-center border border-border">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-ink font-semibold">No {filter !== 'All' ? filter.toLowerCase() : ''} bookings yet</p>
            <p className="text-ink-muted text-sm mt-1">Bookings submitted via the website will appear here.</p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(b => (
            <div key={b._id} className="bg-white rounded-2xl p-6 border border-border hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display font-bold text-ink text-lg">{b.customerName}</p>
                  <p className="text-ink-muted text-xs">{b.email} · {b.phone}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[b.status] || ''}`}>
                  {b.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green font-bold">{b.service?.name || 'N/A'}</span>
                  {b.service?.price && <span className="text-ink-muted text-xs">· LKR {b.service.price.toLocaleString()}</span>}
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <span>📅</span> {fmt(b.date)} at {b.time}
                </div>
                <div className="flex items-start gap-2 text-sm text-ink-soft">
                  <span>📍</span> <span className="leading-snug">{b.address}</span>
                </div>
                {b.notes && (
                  <div className="flex items-start gap-2 text-sm text-ink-muted bg-mint rounded-lg p-2.5 mt-1">
                    <span>📝</span> <span className="text-xs leading-snug">{b.notes}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t border-border">
                {b.status !== 'Completed' && (
                  <button onClick={() => complete(b._id)} disabled={actionId === b._id}
                    className="flex-1 py-2.5 bg-green-pale text-green text-xs font-bold rounded-xl hover:bg-green hover:text-white disabled:opacity-50 transition-all">
                    ✓ Mark Done
                  </button>
                )}
                <button onClick={() => remove(b._id)} disabled={actionId === b._id}
                  className="px-4 py-2.5 border border-border text-ink-muted text-xs rounded-xl hover:border-red-300 hover:text-red-500 hover:bg-red-50 disabled:opacity-50 transition-all">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
