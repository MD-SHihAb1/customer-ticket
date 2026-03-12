const FOOTER_COLS = [
  {
    title: "Company",
    links: ["About Us", "Our Mission", "Contact Sales"],
  },
  {
    title: "Services",
    links: ["Products & Services", "Customer Stories", "Download Apps"],
  },
  {
    title: "Information",
    links: ["Privacy Policy", "Terms & Conditions", "Join Us"],
  },
  {
    title: "Social Links",
    links: [
      "𝕏 @CS — Ticket System",
      "ⓕ @CS — Ticket System",
      " @CS — Ticket System",
      "✉ support@cs.com",
    ],
  },
];

const Footer = () => {
  return (
    <footer
      style={{
        background: "#020309",
        borderTop: "1px solid rgba(255,255,255,.04)",
        padding: "56px 5% 28px",
        marginTop: 80,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Bottom glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  animation: "glowPulse 3s ease infinite",
                }}
              >
                🎫
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#e2e8f0",
                }}
              >
                CS <span style={{ color: "rgba(255,255,255,.18)" }}>—</span>{" "}
                <span style={{ color: "#a78bfa" }}>Ticket System</span>
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#1e293b",
                lineHeight: 1.8,
                maxWidth: 220,
              }}
            >
              We help support teams resolve customer issues faster with smart
              ticket tracking and real-time progress updates. Built for teams
              who care about delivering great experiences every single day.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#334155",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 11 }}
              >
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 13,
                      color: "#1e293b",
                      textDecoration: "none",
                      transition: "color .2s, text-shadow .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#a78bfa";
                      e.target.style.textShadow =
                        "0 0 10px rgba(167,139,250,.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#1e293b";
                      e.target.style.textShadow = "none";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.04)",
            paddingTop: 24,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 13, color: "#0f172a" }}>
            © 2025 CS — Ticket System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
