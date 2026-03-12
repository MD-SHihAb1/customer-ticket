const CONFIGS = {
  success: {
    bg:   'linear-gradient(135deg, #064e3b, #059669)',
    icon: '✓',
    glow: 'rgba(16,185,129,.5)',
  },
  info: {
    bg:   'linear-gradient(135deg, #1e1b4b, #4338ca)',
    icon: '◈',
    glow: 'rgba(99,102,241,.5)',
  },
  warn: {
    bg:   'linear-gradient(135deg, #78350f, #d97706)',
    icon: '⚡',
    glow: 'rgba(217,119,6,.5)',
  },
}

const Toasts = ({ list, remove }) => {
  return (
    <div
      style={{
        position:      'fixed',
        top:           20,
        right:         20,
        zIndex:        9990,
        display:       'flex',
        flexDirection: 'column',
        gap:           10,
      }}
    >
      {list.map((t) => {
        const c = CONFIGS[t.type] || CONFIGS.info
        return (
          <div
            key={t.id}
            onClick={() => remove(t.id)}
            style={{
              background:     c.bg,
              border:         '1px solid rgba(255,255,255,.12)',
              borderRadius:   12,
              padding:        '14px 18px',
              display:        'flex',
              alignItems:     'center',
              gap:            12,
              minWidth:       280,
              maxWidth:       360,
              cursor:         'pointer',
              animation:      'toastSlide .5s cubic-bezier(.34,1.56,.64,1) both',
              boxShadow:      `0 10px 40px ${c.glow}, 0 2px 10px rgba(0,0,0,.5)`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <span
              style={{
                fontSize:   18,
                color:      '#fff',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {c.icon}
            </span>
            <span
              style={{
                fontSize:   13,
                fontWeight: 600,
                color:      '#e2e8f0',
                flex:       1,
              }}
            >
              {t.msg}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>✕</span>
          </div>
        )
      })}
    </div>
  )
}

export default Toasts
