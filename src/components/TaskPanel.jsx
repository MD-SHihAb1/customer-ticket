import { useRef } from 'react'

/* ── Particle Burst on complete ── */
export const ParticleBurst = ({ x, y, onDone }) => {
  const COLORS = ['#a78bfa', '#34d399', '#fbbf24', '#60a5fa', '#f472b6']
  const pieces = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2
    const dist  = 60 + Math.random() * 80
    return {
      tx:    Math.cos(angle) * dist + 'px',
      ty:    Math.sin(angle) * dist + 'px',
      color: COLORS[i % COLORS.length],
      size:  Math.random() * 6 + 4,
    }
  })

  /* auto-clean after animation */
  const timerRef = useRef(null)
  if (!timerRef.current) {
    timerRef.current = setTimeout(onDone, 900)
  }

  return (
    <div
      style={{
        position:      'fixed',
        left:          x,
        top:           y,
        zIndex:        9999,
        pointerEvents: 'none',
      }}
    >
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position:    'absolute',
            width:        p.size,
            height:       p.size,
            borderRadius: '50%',
            background:   p.color,
            transform:    'translate(-50%, -50%)',
            '--tx':       p.tx,
            '--ty':       p.ty,
            animation:    `particlePop .8s cubic-bezier(.25,.46,.45,.94) ${i * 18}ms both`,
            boxShadow:    `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}

/* ── In-Progress Item ── */
const InProgressItem = ({ ticket, onDone, delay }) => {
  const handleClick = (e) => onDone(ticket, e)

  return (
    <div
      style={{
        background:  'rgba(234,179,8,.05)',
        border:      '1px solid rgba(234,179,8,.15)',
        borderRadius: 10,
        padding:     '11px 13px',
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'space-between',
        gap:         10,
        animation:   'slideR .35s cubic-bezier(.34,1.2,.64,1) both',
        animationDelay: delay + 'ms',
        transition:  'background .2s, border-color .2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background    = 'rgba(234,179,8,.09)'
        e.currentTarget.style.borderColor   = 'rgba(234,179,8,.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background    = 'rgba(234,179,8,.05)'
        e.currentTarget.style.borderColor   = 'rgba(234,179,8,.15)'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize:     12,
            fontWeight:   700,
            color:        '#e2e8f0',
            marginBottom: 2,
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}
        >
          {ticket.title}
        </div>
        <div
          style={{
            fontSize:   11,
            color:      '#475569',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {ticket.id}
        </div>
      </div>
      <button className="done-btn" onClick={handleClick}>
        ✓ Done
      </button>
    </div>
  )
}

/* ── Resolved Item ── */
const ResolvedItem = ({ ticket, delay }) => (
  <div
    style={{
      background:   'rgba(34,197,94,.05)',
      border:       '1px solid rgba(34,197,94,.12)',
      borderRadius: 10,
      padding:      '10px 13px',
      animation:    'slideR .35s cubic-bezier(.34,1.2,.64,1) both',
      animationDelay: delay + 'ms',
      transition:   'background .2s',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,.09)' }}
    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,.05)' }}
  >
    <div style={{ fontSize: 12, fontWeight: 700, color: '#86efac', marginBottom: 2 }}>
      {ticket.title}
    </div>
    <div style={{ fontSize: 11, color: '#4ade80', fontFamily: "'JetBrains Mono', monospace" }}>
      ✓ {ticket.id} · {ticket.customer}
    </div>
  </div>
)

/* ── Task Panel ── */
const TaskPanel = ({ inProgressTickets, resolvedTickets, onComplete }) => {
  return (
    <div
      className="task-panel"
      style={{
        width:         318,
        flexShrink:    0,
        display:       'flex',
        flexDirection: 'column',
        gap:           20,
        animation:     'slideR .5s .1s ease both',
      }}
    >
      {/* Title */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#e2e8f0', marginBottom: 5, letterSpacing: '-.01em' }}>
          Task Status
        </h2>
        <p style={{ fontSize: 13, color: '#334155' }}>Select a ticket to add to Task Status.</p>
      </div>

      {/* ── In Progress ── */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span
            style={{
              width:     8,
              height:    8,
              borderRadius: '50%',
              background: '#fbbf24',
              display:   'inline-block',
              animation: 'pdot 2s infinite',
              boxShadow: '0 0 8px #fbbf24',
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>In Progress</span>
          {inProgressTickets.length > 0 && (
            <span
              style={{
                marginLeft:  'auto',
                background:  'rgba(234,179,8,.12)',
                color:       '#fbbf24',
                border:      '1px solid rgba(234,179,8,.22)',
                padding:     '1px 8px',
                borderRadius: 20,
                fontSize:    11,
                fontWeight:  700,
              }}
            >
              {inProgressTickets.length}
            </span>
          )}
        </div>

        {inProgressTickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '22px 0' }}>
            <div style={{ fontSize: 28, marginBottom: 8, opacity: .2, animation: 'float 3s ease infinite' }}>📋</div>
            <p style={{ fontSize: 12, color: '#1e293b' }}>No tickets in progress yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {inProgressTickets.map((t, i) => (
              <InProgressItem key={t.id} ticket={t} onDone={onComplete} delay={i * 60} />
            ))}
          </div>
        )}
      </div>

      {/* ── Resolved ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span
            style={{
              width:     8,
              height:    8,
              borderRadius: '50%',
              background: '#4ade80',
              display:   'inline-block',
              boxShadow: '0 0 8px #4ade80',
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Resolved Task</span>
          {resolvedTickets.length > 0 && (
            <span
              style={{
                marginLeft:  'auto',
                background:  'rgba(34,197,94,.12)',
                color:       '#4ade80',
                border:      '1px solid rgba(34,197,94,.22)',
                padding:     '1px 8px',
                borderRadius: 20,
                fontSize:    11,
                fontWeight:  700,
              }}
            >
              {resolvedTickets.length}
            </span>
          )}
        </div>

        {resolvedTickets.length === 0 ? (
          <p style={{ fontSize: 12, color: '#1e293b' }}>No resolved tasks yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {resolvedTickets.map((t, i) => (
              <ResolvedItem key={t.id} ticket={t} delay={i * 50} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskPanel
