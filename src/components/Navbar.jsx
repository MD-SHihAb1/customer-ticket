import { useState, useEffect } from 'react'

const NAV_LINKS = ['Home', 'FAQ', 'Changelog', 'Blog', 'Download', 'Contact']

const Navbar = () => {
  const [mobOpen,  setMobOpen]  = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position:       'sticky',
          top:            0,
          zIndex:         100,
          background:     scrolled ? 'rgba(3,4,13,.95)' : 'rgba(3,4,13,.7)',
          backdropFilter: 'blur(24px)',
          borderBottom:   `1px solid ${scrolled ? 'rgba(124,58,237,.2)' : 'rgba(255,255,255,.05)'}`,
          padding:        '0 5%',
          height:         64,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          transition:     'background .3s, border-color .3s',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width:      36,
              height:     36,
              borderRadius: 9,
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize:   18,
              animation:  'glowPulse 3s ease infinite',
            }}
          >
            🎫
          </div>
          <span
            style={{
              fontFamily:    "'Space Grotesk', sans-serif",
              fontWeight:    700,
              fontSize:      17,
              color:         '#e2e8f0',
              letterSpacing: '-.02em',
            }}
          >
            CS{' '}
            <span style={{ color: 'rgba(255,255,255,.18)' }}>—</span>{' '}
            <span style={{ color: '#a78bfa', animation: 'neonFlicker 4s infinite' }}>
              Ticket System
            </span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          className="nav-links"
          style={{ display: 'flex', alignItems: 'center', gap: 28 }}
        >
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="nav-link">
              {link}
            </a>
          ))}
          <button className="glow-btn">+ New Ticket</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mob-btn"
          onClick={() => setMobOpen(!mobOpen)}
          style={{
            display:        'none',
            background:     'none',
            border:         '1px solid rgba(255,255,255,.1)',
            borderRadius:   6,
            color:          '#e2e8f0',
            width:          36,
            height:         36,
            alignItems:     'center',
            justifyContent: 'center',
            cursor:         'pointer',
            fontSize:       18,
          }}
        >
          {mobOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobOpen && (
        <div
          style={{
            position:       'fixed',
            top:            64,
            left:           0,
            right:          0,
            zIndex:         99,
            background:     'rgba(3,4,13,.98)',
            backdropFilter: 'blur(24px)',
            borderBottom:   '1px solid rgba(255,255,255,.06)',
            padding:        '22px 5%',
            display:        'flex',
            flexDirection:  'column',
            gap:            16,
            animation:      'fadeIn .2s ease',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color:          '#64748b',
                textDecoration: 'none',
                fontSize:       15,
                fontWeight:     500,
              }}
            >
              {link}
            </a>
          ))}
          <button
            className="glow-btn"
            style={{ alignSelf: 'flex-start', marginTop: 4 }}
          >
            + New Ticket
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar
