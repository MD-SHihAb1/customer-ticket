import { useState } from 'react'

import Cursor        from './components/Cursor'
import ParticleField from './components/ParticleField'
import Toasts        from './components/Toasts'
import Navbar        from './components/Navbar'
import Banner        from './components/Banner'
import TicketCard    from './components/TicketCard'
import TaskPanel, { ParticleBurst } from './components/TaskPanel'
import Footer        from './components/Footer'

import useToast      from './hooks/useToast'
import INIT_TICKETS  from './data/tickets'

const App = () => {
  const [tickets,    setTickets]    = useState(INIT_TICKETS)
  const [inProgress, setInProgress] = useState([])
  const [resolved,   setResolved]   = useState([])
  const [bursts,     setBursts]     = useState([])

  const { list, remove, toast } = useToast()

  const inProgressIds = inProgress.map((t) => t.id)

  /* Add ticket to In Progress */
  const handleAddToProgress = (ticket) => {
    if (inProgressIds.includes(ticket.id)) return
    setInProgress((prev) => [...prev, ticket])
    toast.info(`Ticket ${ticket.id} added to In Progress`)
  }

  /* Mark ticket as complete */
  const handleComplete = (ticket, e) => {
    /* Trigger particle burst at button position */
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect()
      const id   = Date.now()
      setBursts((prev) => [
        ...prev,
        { id, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      ])
    }
    setInProgress((prev) => prev.filter((t) => t.id !== ticket.id))
    setResolved((prev)   => [ticket, ...prev])
    setTickets((prev)    => prev.filter((t) => t.id !== ticket.id))
    toast.success(`${ticket.id} resolved! 🎉`)
  }

  const removeBurst = (id) => setBursts((prev) => prev.filter((b) => b.id !== id))

  return (
    <>
      {/* Motion & FX layer */}
      <Cursor />
      <ParticleField />
      <Toasts list={list} remove={remove} />

      {/* Particle bursts */}
      {bursts.map((b) => (
        <ParticleBurst
          key={b.id}
          x={b.x}
          y={b.y}
          onDone={() => removeBurst(b.id)}
        />
      ))}

      {/* Main UI */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />

        <Banner
          inProgressCount={inProgress.length}
          resolvedCount={resolved.length}
        />

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 5%' }}>
          <div
            className="main-wrap"
            style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}
          >
            {/* ── Left: Customer Tickets ── */}
            <div
              style={{ flex: 1, minWidth: 0, animation: 'slideL .5s ease both' }}
            >
              <div style={{ marginBottom: 24 }}>
                <h2
                  style={{
                    fontSize:      22,
                    fontWeight:    700,
                    color:         '#e2e8f0',
                    marginBottom:  4,
                    letterSpacing: '-.02em',
                  }}
                >
                  Customer Tickets
                </h2>
                <p style={{ fontSize: 13, color: '#334155' }}>
                  <span
                    style={{
                      color:      '#7c3aed',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                    }}
                  >
                    {tickets.length}
                  </span>{' '}
                  open · Click a ticket to start working
                </p>
              </div>

              {tickets.length === 0 ? (
                <div
                  style={{
                    textAlign:  'center',
                    padding:    '80px 20px',
                    background: 'rgba(10,11,20,.5)',
                    borderRadius: 16,
                    border:     '1px solid rgba(255,255,255,.05)',
                    animation:  'fadeUp .5s ease both',
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16, animation: 'float 3s ease infinite' }}>
                    🎊
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>
                    All Clear!
                  </h3>
                  <p style={{ fontSize: 13, color: '#475569' }}>
                    Every single ticket has been resolved. Great work!
                  </p>
                </div>
              ) : (
                <div
                  className="ticket-grid"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
                >
                  {tickets.map((ticket, i) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onAdd={handleAddToProgress}
                      isInProgress={inProgressIds.includes(ticket.id)}
                      delay={i * 60}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: Task Panel ── */}
            <TaskPanel
              inProgressTickets={inProgress}
              resolvedTickets={resolved}
              onComplete={handleComplete}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
