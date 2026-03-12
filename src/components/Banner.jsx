import { useState, useEffect, useRef } from 'react'

/* ── Animated Counter ── */
const AnimCounter = ({ value }) => {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)

  useEffect(() => {
    const start    = prevRef.current
    const end      = value
    if (start === end) return
    const duration = 500
    const startTime = performance.now()

    const tick = (now) => {
      const t      = Math.min((now - startTime) / duration, 1)
      const eased  = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (t < 1) requestAnimationFrame(tick)
      else {
        setDisplay(end)
        prevRef.current = end
      }
    }
    requestAnimationFrame(tick)
  }, [value])

  return <>{display}</>
}

/* ── Banner Card ── */
const BannerCard = ({ label, icon, value, gradient, borderColor, glowColor, delay }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:        1,
        borderRadius: 20,
        padding:     '42px 52px',
        background:  gradient,
        position:    'relative',
        overflow:    'hidden',
        border:      `1px solid rgba(${borderColor},${hovered ? 0.4 : 0.2})`,
        boxShadow:   hovered
          ? `0 28px 80px rgba(${glowColor},.6), inset 0 1px 0 rgba(255,255,255,.12)`
          : `0 20px 60px rgba(${glowColor},.4), inset 0 1px 0 rgba(255,255,255,.1)`,
        transition:  'all .4s cubic-bezier(.34,1.2,.64,1)',
        transform:   hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        animation:   `fadeUp .6s ${delay}s ease both`,
        cursor:      'default',
      }}
    >
      {/* SVG wave decoration */}
      <svg
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: 0.1,
        }}
        viewBox="0 0 460 170"
        preserveAspectRatio="none"
      >
        <path d="M-20,130 Q90,10 200,90 T460,50"  fill="none" stroke="#fff" strokeWidth="1.5" />
        <path d="M-20,155 Q110,35 220,115 T460,75" fill="none" stroke="#fff" strokeWidth="1" />
        <path d="M0,80 Q110,0 230,75 T460,40"      fill="none" stroke="#fff" strokeWidth=".7" />
      </svg>

      {/* Decorative circles */}
      <div
        style={{
          position:     'absolute', bottom: -50, right: -50,
          width: 220, height: 220, borderRadius: '50%',
          border:      '58px solid rgba(255,255,255,.04)',
          transition:  'transform .4s',
          transform:   hovered ? 'scale(1.1) rotate(15deg)' : 'scale(1) rotate(0deg)',
        }}
      />
      <div
        style={{
          position:    'absolute', bottom: -28, right: -28,
          width: 150, height: 150, borderRadius: '50%',
          border:      '35px solid rgba(255,255,255,.06)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p
          style={{
            fontSize:      13,
            fontWeight:    600,
            color:         'rgba(255,255,255,.7)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            marginBottom:  10,
          }}
        >
          {icon} {label}
        </p>
        <div
          style={{
            fontSize:    82,
            fontWeight:  700,
            color:       '#fff',
            lineHeight:  1,
            fontFamily:  "'JetBrains Mono', monospace",
            textShadow:  '0 0 50px rgba(255,255,255,.3)',
            transition:  'transform .3s',
            transform:   hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        >
          <AnimCounter value={value} />
        </div>
      </div>

      {/* Inner glow on hover */}
      {hovered && (
        <div
          style={{
            position:    'absolute',
            inset:       0,
            borderRadius: 20,
            boxShadow:   'inset 0 0 40px rgba(255,255,255,.07)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

/* ── Banner ── */
const Banner = ({ inProgressCount, resolvedCount }) => {
  return (
    <section
      style={{
        padding:    '52px 5%',
        position:   'relative',
        overflow:   'hidden',
        background: 'linear-gradient(180deg, #0a0714 0%, #03040d 100%)',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'linear-gradient(rgba(124,58,237,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.05) 1px, transparent 1px)',
          backgroundSize:  '42px 42px',
          pointerEvents:   'none',
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position:     'absolute', top: -100, left: '22%',
          width: 500, height: 500, borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(124,58,237,.14) 0%, transparent 70%)',
          pointerEvents:'none',
          animation:    'breathe 6s ease infinite',
        }}
      />
      <div
        style={{
          position:     'absolute', top: -80, right: '14%',
          width: 400, height: 400, borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(20,184,166,.1) 0%, transparent 70%)',
          pointerEvents:'none',
          animation:    'breathe 7s 1s ease infinite',
        }}
      />

      {/* Scanline */}
      <div
        style={{
          position:   'absolute', left: 0, right: 0,
          height:     2,
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,.3), transparent)',
          animation:  'scanline 5s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Cards */}
      <div
        className="banner-cards"
        style={{ display: 'flex', gap: 24, maxWidth: 1200, margin: '0 auto' }}
      >
        <BannerCard
          label="In-Progress"
          icon="⚡"
          value={inProgressCount}
          gradient="linear-gradient(135deg, #3b0764 0%, #4c1d95 38%, #5b21b6 65%, #7c3aed 100%)"
          borderColor="167,139,250"
          glowColor="109,40,217"
          delay={0}
        />
        <BannerCard
          label="Resolved"
          icon="✓"
          value={resolvedCount}
          gradient="linear-gradient(135deg, #064e3b 0%, #065f46 38%, #047857 65%, #059669 100%)"
          borderColor="52,211,153"
          glowColor="5,150,105"
          delay={0.1}
        />
      </div>
    </section>
  )
}

export default Banner
