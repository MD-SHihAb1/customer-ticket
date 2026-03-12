import { useRef, useCallback } from 'react'

/* ── Priority Badge ── */
export const PriorityBadge = ({ priority }) => {
  const MAP = {
    'HIGH PRIORITY':   { bg: 'rgba(239,68,68,.14)',  color: '#f87171', border: 'rgba(239,68,68,.25)'  },
    'MEDIUM PRIORITY': { bg: 'rgba(234,179,8,.14)',  color: '#fbbf24', border: 'rgba(234,179,8,.25)'  },
    'LOW PRIORITY':    { bg: 'rgba(34,197,94,.14)',  color: '#4ade80', border: 'rgba(34,197,94,.25)'  },
  }
  const s = MAP[priority] || MAP['LOW PRIORITY']
  return (
    <span
      style={{
        background:    s.bg,
        color:         s.color,
        border:        `1px solid ${s.border}`,
        padding:       '2px 8px',
        borderRadius:  4,
        fontSize:      10,
        fontFamily:    "'JetBrains Mono', monospace",
        fontWeight:    700,
        letterSpacing: '.05em',
      }}
    >
      {priority}
    </span>
  )
}

/* ── Status Badge ── */
export const StatusBadge = ({ status }) => {
  const isOpen = status === 'Open'
  return (
    <span
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap:        5,
        background: isOpen ? 'rgba(34,197,94,.1)' : 'rgba(234,179,8,.1)',
        color:      isOpen ? '#4ade80' : '#fbbf24',
        border:     `1px solid ${isOpen ? 'rgba(34,197,94,.22)' : 'rgba(234,179,8,.22)'}`,
        padding:    '3px 10px',
        borderRadius: 20,
        fontSize:   11,
        fontWeight: 700,
      }}
    >
      <span
        style={{
          width:       6,
          height:      6,
          borderRadius:'50%',
          background:  isOpen ? '#4ade80' : '#fbbf24',
          animation:   'pdot 2s infinite',
        }}
      />
      {status}
    </span>
  )
}

/* ── Ticket Card ── */
const TicketCard = ({ ticket, onAdd, isInProgress, delay }) => {
  const cardRef  = useRef(null)
  const shineRef = useRef(null)

  const handleMouseMove = useCallback(
    (e) => {
      if (isInProgress) return
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const cx = (e.clientX - rect.left)  / rect.width
      const cy = (e.clientY - rect.top)   / rect.height
      const rx = (cy - 0.5) * -16
      const ry = (cx - 0.5) *  16
      card.style.transform  = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
      card.style.transition = 'box-shadow .35s, border-color .35s'
      if (shineRef.current) {
        shineRef.current.style.setProperty('--mx', cx * 100 + '%')
        shineRef.current.style.setProperty('--my', cy * 100 + '%')
      }
    },
    [isInProgress]
  )

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    cardRef.current.style.transition = 'transform .5s cubic-bezier(.34,1.2,.64,1), box-shadow .35s, border-color .35s'
  }, [])

  return (
    <div
      ref={cardRef}
      className={`ticket-card${isInProgress ? ' ip-card' : ''}`}
      onClick={() => !isInProgress && onAdd(ticket)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${delay}ms`,
        animation:      'fadeUp .5s ease both',
      }}
    >
      {/* Animated rainbow top border */}
      {!isInProgress && <div className="card-top-border" />}

      {/* Yellow top bar for in-progress */}
      {isInProgress && (
        <div
          style={{
            position:     'absolute',
            top: 0, left: 0, right: 0,
            height:       2,
            background:   'linear-gradient(90deg, #fbbf24, #f59e0b)',
            borderRadius: '14px 14px 0 0',
          }}
        />
      )}

      {/* Mouse shine overlay */}
      <div
        ref={shineRef}
        className="card-shine"
        style={{ '--mx': '50%', '--my': '50%' }}
      />

      {/* Header */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          marginBottom:   10,
          gap:            8,
        }}
      >
        <h3
          style={{
            fontSize:   13.5,
            fontWeight: 700,
            color:      '#e2e8f0',
            lineHeight: 1.4,
            flex:       1,
          }}
        >
          {ticket.title}
        </h3>
        <StatusBadge status={isInProgress ? 'In-Progress' : ticket.status} />
      </div>

      {/* Description */}
      <p
        style={{
          fontSize:           12,
          color:              '#475569',
          lineHeight:         1.65,
          marginBottom:       14,
          display:            '-webkit-box',
          WebkitLineClamp:    2,
          WebkitBoxOrient:    'vertical',
          overflow:           'hidden',
        }}
      >
        {ticket.desc}
      </p>

      {/* Footer */}
      <div
        style={{
          display:        'flex',
          flexWrap:       'wrap',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            6,
          paddingTop:     12,
          borderTop:      '1px solid rgba(255,255,255,.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 11, color: '#334155', fontFamily: "'JetBrains Mono', monospace" }}>
            {ticket.id}
          </span>
          <PriorityBadge priority={ticket.pri} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div
            style={{
              width:          22,
              height:         22,
              borderRadius:   '50%',
              background:     'linear-gradient(135deg, #7c3aed, #4f46e5)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       10,
              color:          '#fff',
              fontWeight:     700,
            }}
          >
            {ticket.customer[0]}
          </div>
          <span style={{ fontSize: 11, color: '#475569' }}>{ticket.customer}</span>
          <span style={{ fontSize: 11, color: '#1e293b', fontFamily: "'JetBrains Mono', monospace" }}>
            📅 {ticket.date}
          </span>
        </div>
      </div>

      {/* Click hint */}
      {!isInProgress && <div className="click-hint">CLICK TO ASSIGN →</div>}
    </div>
  )
}

export default TicketCard
