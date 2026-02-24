import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Services", "Products", "About", "Contact"];

const SERVICES = [
  { icon: "📷", title: "CCTV Installation", desc: "Professional HD & 4K CCTV camera installation for homes, shops, offices and warehouses across Hyderabad.", color: "#f97316" },
  { icon: "🌙", title: "Night Vision", desc: "Advanced IR cameras delivering crystal-clear footage in complete darkness — up to 40m range.", color: "#6366f1" },
  { icon: "📱", title: "Remote Monitoring", desc: "Watch your live camera feed from anywhere on your smartphone with real-time motion alerts.", color: "#10b981" },
  { icon: "🔧", title: "AMC & Repairs", desc: "Annual Maintenance Contracts and fast repair services to keep your cameras running 24/7.", color: "#3b82f6" },
  { icon: "💾", title: "DVR / NVR Setup", desc: "Complete recording system setup with local storage, cloud backup and remote playback.", color: "#8b5cf6" },
  { icon: "🏢", title: "Commercial Projects", desc: "Large-scale CCTV deployments for malls, industries, hospitals and corporate campuses.", color: "#ef4444" },
];

const PRODUCTS = [
  { name: "HD Bullet Camera", price: "₹2,500", tag: "Bestseller", spec: "2MP · IP66 Weatherproof · Night Vision 30m", icon: "📹", brand: "CP Plus / Hikvision" },
  { name: "4K Dome Camera",   price: "₹3,800", tag: "Popular",    spec: "8MP · Vandal-proof · Wide Angle 120°",   icon: "🔵", brand: "Dahua / Hikvision" },
  { name: "PTZ Speed Dome",   price: "₹9,500", tag: "Premium",    spec: "5MP · 360° Pan/Tilt · 20× Optical Zoom", icon: "🎯", brand: "Hikvision" },
  { name: "Mini Cube Camera", price: "₹1,800", tag: "Indoor",     spec: "2MP · Ultra Compact · Smart Motion Alert",icon: "📦", brand: "CP Plus" },
  { name: "8-Channel DVR",    price: "₹5,500", tag: "New",        spec: "8CH · H.265+ · 2TB HDD · Mobile App",    icon: "🖥️", brand: "CP Plus / Dahua" },
  { name: "16-Channel NVR",   price: "₹8,500", tag: "Value",      spec: "16CH · 4K Output · POE · Remote Access",  icon: "💻", brand: "Hikvision / Dahua" },
];

const STATS = [
  { value: "500+", label: "Cameras Installed", icon: "📷" },
  { value: "10+",  label: "Years Experience",  icon: "🏆" },
  { value: "200+", label: "Happy Clients",     icon: "😊" },
  { value: "24/7", label: "Support",           icon: "🛡️" },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar",  role: "Shop Owner, Secunderabad",    text: "8 cameras installed in my shop within a day. Crystal clear footage even at night. Excellent service!", rating: 5 },
  { name: "Priya Sharma",  role: "Homeowner, Kukatpally",       text: "Very professional team. Our home feels much safer. The mobile app lets me check cameras anytime.", rating: 5 },
  { name: "Venkat Reddy",  role: "Warehouse Manager, Uppal",    text: "Covered our 10,000 sq ft warehouse perfectly. Great after-sales support and quick response.", rating: 5 },
];

const WHY_US = [
  { icon: "🏅", title: "Trusted Brands",   desc: "Hikvision, Dahua & CP Plus only", bg: "#fff7ed" },
  { icon: "⚡", title: "Same Day Install", desc: "Setup within 24 hours",            bg: "#fef2f2" },
  { icon: "🔧", title: "After-Sales Care", desc: "1-year warranty + AMC available",  bg: "#eff6ff" },
  { icon: "💰", title: "Best Price",       desc: "Competitive rates, EMI available", bg: "#f0fdf4" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Anim({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [active, setActive]     = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm]         = useState({ name: "", phone: "", type: "", message: "" });
  const [sent, setSent]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (s) => {
    setActive(s);
    setMenuOpen(false);
    const el = document.getElementById(s.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", type: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'Rajdhani','Segoe UI',sans-serif", background: "#fff", color: "#1a1a2e", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-size: 16px; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 4px; }

        /* ── Base Utilities ── */
        .oswald { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 2px; line-height: 1.05; }
        .orange  { color: #f97316; }

        .badge {
          display: inline-block;
          background: rgba(249,115,22,0.10);
          border: 1px solid rgba(249,115,22,0.28);
          color: #f97316;
          font-size: 0.68rem; letter-spacing: 2px; padding: 4px 14px;
          border-radius: 20px; text-transform: uppercase; font-weight: 700;
        }

        /* ── Buttons ── */
        .btn-primary {
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: #fff; border: none; border-radius: 8px;
          font-family: 'Oswald', sans-serif;
          font-size: 0.95rem; letter-spacing: 2px;
          padding: 12px 28px; cursor: pointer; text-transform: uppercase;
          transition: transform .2s, box-shadow .2s;
          display: inline-block; white-space: nowrap;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,.38); }

        .btn-outline {
          background: transparent; color: #f97316;
          border: 2px solid #f97316; border-radius: 8px;
          font-family: 'Oswald', sans-serif;
          font-size: 0.95rem; letter-spacing: 2px;
          padding: 12px 28px; cursor: pointer; text-transform: uppercase;
          transition: background .2s, color .2s;
          display: inline-block; white-space: nowrap;
        }
        .btn-outline:hover { background: #f97316; color: #fff; }

        .btn-sm { padding: 7px 16px !important; font-size: 0.76rem !important; border-radius: 6px !important; }

        /* ── Nav Links ── */
        .nav-link {
          cursor: pointer; position: relative; padding: 4px 0;
          font-weight: 600; letter-spacing: 1px; font-size: 0.88rem;
          color: #374151; transition: color .25s;
          white-space: nowrap;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: #f97316; transition: width .25s;
        }
        .nav-link:hover, .nav-link.on { color: #f97316; }
        .nav-link:hover::after, .nav-link.on::after { width: 100%; }

        /* ── Cards ── */
        .card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
          box-shadow: 0 2px 12px rgba(0,0,0,.05);
          transition: transform .28s, box-shadow .28s;
        }
        .card:hover { transform: translateY(-5px); box-shadow: 0 16px 36px rgba(0,0,0,.1); }

        /* ── Form inputs ── */
        .inp {
          width: 100%; background: #f9fafb; border: 1px solid #d1d5db;
          border-radius: 8px; color: #111827; padding: 11px 14px;
          font-family: 'Rajdhani', sans-serif; font-size: 1rem;
          outline: none; transition: border-color .25s, box-shadow .25s;
        }
        .inp:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,.12); }
        .inp::placeholder { color: #9ca3af; }
        select.inp option { background: #fff; color: #111; }

        /* ── Animations ── */
        @keyframes floatY  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
        @keyframes pulsing { 0%,100%{transform:scale(1);opacity:.28} 50%{transform:scale(1.06);opacity:.55} }
        .float { animation: floatY  3s ease-in-out infinite; }
        .pulse { animation: pulsing 2.8s ease-in-out infinite; }

        /* ══════════════════════════════════
           LAYOUT — Desktop first (≥1025px)
        ══════════════════════════════════ */

        /* Section wrapper */
        .sec { padding: 96px 0; }
        .sec-bg-gray { background: #f9fafb; }
        .inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }

        /* Hero */
        .hero-wrap { padding: 110px 40px 80px; max-width: 1200px; margin: 0 auto; }
        .hero-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .hero-h1   { font-size: 4rem; }

        /* Grids */
        .g2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .g-about   { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .g-contact { display: grid; grid-template-columns: 1fr 1.6fr; gap: 50px; align-items: start; }
        .g-footer  { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; }
        .g-form-2  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* Stats banner */
        .stats-wrap { padding: 60px 40px; }

        /* Hamburger — hidden on desktop */
        .ham { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; }
        .ham span { display: block; width: 24px; height: 2.5px; background: #374151; border-radius: 2px; transition: all .3s; }
        .ham.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .ham.open span:nth-child(2) { opacity: 0; width: 0; }
        .ham.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        /* Mobile menu overlay — hidden by default */
        .mob-menu {
          position: fixed; inset: 0; z-index: 150;
          background: rgba(255,255,255,0.98); backdrop-filter: blur(8px);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.4rem;
          transform: translateX(100%); transition: transform .32s ease;
        }
        .mob-menu.open { transform: translateX(0); }
        .mob-nav {
          font-family: 'Oswald', sans-serif; font-size: 2rem; letter-spacing: 4px;
          text-transform: uppercase; color: #1a1a2e; cursor: pointer; transition: color .2s;
        }
        .mob-nav:hover, .mob-nav.on { color: #f97316; }

        /* Desktop nav hidden on mobile */
        .desk-nav { display: flex; gap: 32px; align-items: center; }
        .desk-cta { display: block; }

        /* Phone card in hero - only on desktop */
        .hero-right-col { display: block; }
        .hero-mob-phone  { display: none; }

        /* ══════════════════════════════════
           TABLET  (768px – 1024px)
        ══════════════════════════════════ */
        @media (max-width: 1024px) {
          .hero-wrap  { padding: 90px 32px 60px; }
          .hero-2col  { grid-template-columns: 1fr; gap: 0; }
          .hero-h1    { font-size: 3.2rem; }
          .hero-right-col { display: none; }
          .hero-mob-phone { display: block; margin-top: 28px; }

          .inner      { padding: 0 32px; }
          .sec        { padding: 72px 0; }
          .stats-wrap { padding: 48px 32px; }

          .g3   { grid-template-columns: repeat(2, 1fr); }
          .g4   { grid-template-columns: repeat(2, 1fr); }
          .g-about   { grid-template-columns: 1fr; gap: 36px; }
          .g-contact { grid-template-columns: 1fr; gap: 32px; }
          .g-footer  { grid-template-columns: 1fr 1fr; gap: 32px; }
        }

        /* ══════════════════════════════════
           MOBILE  (≤ 767px)
        ══════════════════════════════════ */
        @media (max-width: 767px) {
          /* Nav */
          .desk-nav { display: none !important; }
          .desk-cta { display: none !important; }
          .ham      { display: flex !important; }

          /* Layout */
          .hero-wrap  { padding: 80px 18px 48px; }
          .hero-2col  { grid-template-columns: 1fr; }
          .hero-h1    { font-size: 2.3rem; }
          .hero-right-col { display: none; }
          .hero-mob-phone { display: block; margin-top: 24px; }

          .inner      { padding: 0 18px; }
          .sec        { padding: 56px 0; }
          .stats-wrap { padding: 36px 18px; }

          .g2   { grid-template-columns: 1fr; gap: 14px; }
          .g3   { grid-template-columns: 1fr; gap: 14px; }
          .g4   { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .g-about   { grid-template-columns: 1fr; gap: 32px; }
          .g-contact { grid-template-columns: 1fr; gap: 28px; }
          .g-footer  { grid-template-columns: 1fr; gap: 28px; }
          .g-form-2  { grid-template-columns: 1fr; }

          .hero-btns  { flex-direction: column !important; align-items: flex-start !important; }
          .hero-stats { gap: 20px !important; flex-wrap: wrap; }
          .sec-title  { font-size: 2rem !important; }
        }

        /* ══════════════════════════════════
           SMALL MOBILE (≤ 420px)
        ══════════════════════════════════ */
        @media (max-width: 420px) {
          .hero-h1   { font-size: 1.95rem; }
          .sec-title { font-size: 1.75rem !important; }
          .g4        { grid-template-columns: repeat(2, 1fr); }
          .g-why     { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ════════════════════ NAVBAR ════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,.07)" : "none",
        transition: "all .35s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }} onClick={() => go("home")}>
            <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#f97316,#ef4444)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📷</div>
            <div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: "1.15rem", letterSpacing: 2, color: "#f97316", lineHeight: 1 }}>HARI CCTV</div>
              <div style={{ fontSize: "0.58rem", letterSpacing: 3, color: "#9ca3af", lineHeight: 1, marginTop: 1 }}>SECURITY SYSTEMS</div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="desk-nav">
            {NAV_LINKS.map(l => (
              <span key={l} className={`nav-link ${active === l ? "on" : ""}`} onClick={() => go(l)}>{l}</span>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="tel:8096922710" className="desk-cta" style={{ textDecoration: "none", flexShrink: 0 }}>
            <button className="btn-primary btn-sm">📞 Call Now</button>
          </a>

          {/* Hamburger */}
          <button className={`ham ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        <button style={{ position: "absolute", top: 22, right: 22, background: "none", border: "none", fontSize: "1.6rem", cursor: "pointer", color: "#374151" }} onClick={() => setMenuOpen(false)}>✕</button>
        {NAV_LINKS.map(l => (
          <span key={l} className={`mob-nav ${active === l ? "on" : ""}`} onClick={() => go(l)}>{l}</span>
        ))}
        <a href="tel:8096922710" style={{ textDecoration: "none" }}>
          <button className="btn-primary" style={{ padding: "14px 36px" }}>📞 8096922710</button>
        </a>
      </div>

      {/* ════════════════════ HERO ════════════════════ */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "#fff", position: "relative", overflow: "hidden", paddingTop: 68 }}>
        {/* Subtle dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: .45, pointerEvents: "none" }} />
        {/* Glow blobs */}
        <div style={{ position: "absolute", width: 640, height: 640, borderRadius: "50%", background: "rgba(249,115,22,.055)", top: -180, right: -200, filter: "blur(90px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "rgba(99,102,241,.04)", bottom: -120, left: -100, filter: "blur(80px)", pointerEvents: "none" }} />

        <div className="hero-wrap" style={{ width: "100%", position: "relative", zIndex: 2 }}>
          <div className="hero-2col">
            {/* Left */}
            <div>
              <Anim>
                <span className="badge">📷 Hyderabad's #1 CCTV Specialists</span>
                <h1 className="oswald hero-h1" style={{ marginTop: 18, marginBottom: 18, color: "#111827" }}>
                  SECURE YOUR<br /><span className="orange">PROPERTY</span><br />WITH CCTV
                </h1>
                <p style={{ fontSize: "1.05rem", color: "#6b7280", lineHeight: 1.82, maxWidth: 460, marginBottom: 28 }}>
                  Professional CCTV installation, DVR/NVR setup and remote monitoring for homes, shops, offices and warehouses across Hyderabad.
                </p>
                <div className="hero-btns" style={{ display: "flex", gap: 14 }}>
                  <button className="btn-primary" onClick={() => go("Contact")}>Get Free Quote</button>
                  <button className="btn-outline" onClick={() => go("Products")}>View Cameras</button>
                </div>
                <div className="hero-stats" style={{ display: "flex", gap: 40, marginTop: 36 }}>
                  {[{ v:"500+", l:"Cameras Installed" }, { v:"10+", l:"Years Experience" }, { v:"24/7", l:"Support" }].map(s => (
                    <div key={s.l}>
                      <div className="oswald" style={{ fontSize: "2.1rem", color: "#f97316", lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: "0.7rem", color: "#9ca3af", letterSpacing: 1, marginTop: 3 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </Anim>

              {/* Phone card — visible only on mobile/tablet below hero text */}
              <div className="hero-mob-phone">
                <div style={{ background: "linear-gradient(135deg,#f97316,#ef4444)", borderRadius: 14, padding: "14px 22px", display: "inline-block", boxShadow: "0 10px 28px rgba(249,115,22,.32)" }}>
                  <div style={{ color: "rgba(255,255,255,.75)", fontSize: "0.62rem", letterSpacing: 3, marginBottom: 3 }}>CALL US NOW</div>
                  <div className="oswald" style={{ fontSize: "1.6rem", color: "#fff", lineHeight: 1.2 }}>8096922710</div>
                  <div className="oswald" style={{ fontSize: "1.3rem", color: "rgba(255,255,255,.88)" }}>9705411587</div>
                </div>
              </div>
            </div>

            {/* Right — desktop only */}
            <div className="hero-right-col">
              <Anim delay={140}>
                <div style={{ position: "relative", textAlign: "center" }}>
                  <div className="pulse" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 340, height: 340, borderRadius: "50%", border: "1px dashed rgba(249,115,22,.28)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 250, height: 250, borderRadius: "50%", background: "rgba(249,115,22,.05)", border: "1px solid rgba(249,115,22,.12)", pointerEvents: "none" }} />
                  <div className="float" style={{ fontSize: "7.5rem", lineHeight: 1, filter: "drop-shadow(0 8px 26px rgba(249,115,22,.22))" }}>📹</div>
                  <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                    {["HD / 4K", "Night Vision", "Weatherproof"].map(t => (
                      <span key={t} style={{ background: "rgba(249,115,22,.08)", border: "1px solid rgba(249,115,22,.22)", color: "#ea6c0a", fontSize: "0.72rem", padding: "4px 12px", borderRadius: 20, fontWeight: 700, letterSpacing: 1 }}>{t}</span>
                    ))}
                  </div>
                  {/* Phone card desktop */}
                  <div style={{ marginTop: 24, background: "linear-gradient(135deg,#f97316,#ef4444)", borderRadius: 16, padding: "16px 28px", display: "inline-block", boxShadow: "0 14px 36px rgba(249,115,22,.32)" }}>
                    <div style={{ color: "rgba(255,255,255,.72)", fontSize: "0.62rem", letterSpacing: 3, marginBottom: 4 }}>CALL US NOW</div>
                    <div className="oswald" style={{ fontSize: "1.85rem", color: "#fff", lineHeight: 1.2 }}>8096922710</div>
                    <div className="oswald" style={{ fontSize: "1.5rem", color: "rgba(255,255,255,.88)" }}>9705411587</div>
                  </div>
                </div>
              </Anim>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ SERVICES ════════════════════ */}
      <section id="services" className="sec sec-bg-gray">
        <div className="inner">
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span className="badge">What We Do</span>
              <h2 className="oswald sec-title" style={{ fontSize: "2.7rem", marginTop: 12 }}>OUR <span className="orange">SERVICES</span></h2>
              <p style={{ color: "#6b7280", marginTop: 8 }}>End-to-end CCTV solutions for every need</p>
            </div>
          </Anim>
          <div className="g3">
            {SERVICES.map((s, i) => (
              <Anim key={s.title} delay={i * 55}>
                <div
                  className="card"
                  style={{ padding: "28px 24px", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "55"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
                >
                  <div style={{ width: 54, height: 54, background: `${s.color}14`, border: `1px solid ${s.color}30`, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", marginBottom: 16 }}>{s.icon}</div>
                  <h3 className="oswald" style={{ fontSize: "1.12rem", color: "#111827", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "#6b7280", lineHeight: 1.72, fontSize: "0.88rem" }}>{s.desc}</p>
                  <div style={{ marginTop: 18, color: s.color, fontSize: "0.8rem", fontWeight: 700, letterSpacing: 1, cursor: "pointer" }} onClick={() => go("Contact")}>ENQUIRE NOW →</div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ STATS BANNER ════════════════════ */}
      <div style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}>
        <div className="stats-wrap inner">
          <div className="g4">
            {STATS.map((s, i) => (
              <Anim key={s.label} delay={i * 70}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.9rem", marginBottom: 4 }}>{s.icon}</div>
                  <div className="oswald" style={{ fontSize: "3rem", color: "#fff", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,.84)", letterSpacing: 1.5, fontSize: "0.78rem", marginTop: 6, textTransform: "uppercase" }}>{s.label}</div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════ PRODUCTS ════════════════════ */}
      <section id="products" className="sec">
        <div className="inner">
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span className="badge">Camera Range</span>
              <h2 className="oswald sec-title" style={{ fontSize: "2.7rem", marginTop: 12 }}>OUR <span className="orange">CAMERAS</span></h2>
              <p style={{ color: "#6b7280", marginTop: 8 }}>Top-quality CCTV from trusted brands — supply &amp; installation included</p>
            </div>
          </Anim>
          <div className="g3">
            {PRODUCTS.map((p, i) => (
              <Anim key={p.name} delay={i * 55}>
                <div className="card" style={{ overflow: "hidden" }}>
                  <div style={{ background: "linear-gradient(135deg,#fff7ed,#fef2f2)", padding: "28px 20px 20px", textAlign: "center", borderBottom: "1px solid #f3f4f6", position: "relative" }}>
                    <div style={{ position: "absolute", top: 12, right: 12, background: "#f97316", color: "#fff", fontSize: "0.66rem", padding: "3px 10px", borderRadius: 20, fontWeight: 700, letterSpacing: 1 }}>{p.tag}</div>
                    <div style={{ fontSize: "3.4rem", lineHeight: 1, marginBottom: 8 }}>{p.icon}</div>
                    <div style={{ fontSize: "0.68rem", color: "#9ca3af", letterSpacing: 1 }}>{p.brand}</div>
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <h3 className="oswald" style={{ fontSize: "1.1rem", color: "#111827", marginBottom: 6 }}>{p.name}</h3>
                    <p style={{ color: "#9ca3af", fontSize: "0.79rem", lineHeight: 1.6, marginBottom: 14 }}>{p.spec}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className="oswald" style={{ fontSize: "1.5rem", color: "#f97316" }}>{p.price}</span>
                      <button className="btn-primary btn-sm" onClick={() => go("Contact")}>Get Quote</button>
                    </div>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ ABOUT ════════════════════ */}
      <section id="about" className="sec sec-bg-gray">
        <div className="inner">
          <div className="g-about">
            <Anim>
              <span className="badge">Who We Are</span>
              <h2 className="oswald sec-title" style={{ fontSize: "2.7rem", marginTop: 12, marginBottom: 20 }}>
                ABOUT <span className="orange">HARI CCTV</span>
              </h2>
              <p style={{ color: "#4b5563", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: 14 }}>
                Hari Security Systems is Hyderabad's trusted CCTV specialist with over 10 years of experience. We focus exclusively on CCTV — from compact indoor cameras to large-scale multi-site surveillance projects.
              </p>
              <p style={{ color: "#6b7280", lineHeight: 1.9, marginBottom: 20 }}>
                We supply and install cameras from leading brands like Hikvision, Dahua and CP Plus. Our certified technicians work quickly, cleanly, and provide full training on your system.
              </p>
              {[
                "✅ Free on-site survey & consultation",
                "✅ Brands: Hikvision, Dahua, CP Plus",
                "✅ Supply + installation included",
                "✅ 1-year warranty on all work",
                "✅ App-based remote monitoring setup",
                "✅ AMC contracts available",
              ].map(item => (
                <div key={item} style={{ color: "#374151", marginBottom: 9, fontSize: "0.92rem", fontWeight: 600 }}>{item}</div>
              ))}
              <div style={{ marginTop: 28 }}>
                <button className="btn-primary" onClick={() => go("Contact")}>Book Free Survey</button>
              </div>
            </Anim>

            <Anim delay={100}>
              {/* Why us grid */}
              <div className="g-why g2" style={{ marginBottom: 20 }}>
                {WHY_US.map(f => (
                  <div key={f.title} style={{ background: f.bg, border: "1px solid #e5e7eb", borderRadius: 14, padding: "22px 20px" }}>
                    <div style={{ fontSize: "1.9rem", marginBottom: 10 }}>{f.icon}</div>
                    <h4 className="oswald" style={{ fontSize: "1rem", color: "#111827", marginBottom: 5 }}>{f.title}</h4>
                    <p style={{ color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
              {/* Camera types chip cloud */}
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "22px 20px", boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
                <div className="oswald" style={{ fontSize: "0.9rem", color: "#111827", marginBottom: 14, letterSpacing: 1 }}>CAMERA TYPES WE INSTALL</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Bullet Cameras","Dome Cameras","PTZ Cameras","Mini Cameras","Fisheye Cameras","Box Cameras","Covert Cameras","4K Ultra HD"].map(t => (
                    <span key={t} style={{ background: "rgba(249,115,22,.08)", border: "1px solid rgba(249,115,22,.22)", color: "#ea6c0a", fontSize: "0.7rem", padding: "4px 10px", borderRadius: 20, fontWeight: 700, letterSpacing: .5 }}>{t}</span>
                  ))}
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section className="sec">
        <div className="inner">
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span className="badge">Client Reviews</span>
              <h2 className="oswald sec-title" style={{ fontSize: "2.7rem", marginTop: 12 }}>WHAT CLIENTS <span className="orange">SAY</span></h2>
            </div>
          </Anim>
          <div className="g3">
            {TESTIMONIALS.map((t, i) => (
              <Anim key={t.name} delay={i * 75}>
                <div className="card" style={{ padding: "28px 24px", position: "relative" }}>
                  <div style={{ color: "#f97316", fontSize: "3.8rem", lineHeight: 1, opacity: .1, fontFamily: "serif", position: "absolute", top: 10, right: 18 }}>"</div>
                  <div style={{ color: "#f97316", fontSize: "1rem", marginBottom: 10 }}>{"★".repeat(t.rating)}</div>
                  <p style={{ color: "#4b5563", lineHeight: 1.82, marginBottom: 18, fontStyle: "italic", fontSize: "0.91rem" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#f97316,#ef4444)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oswald',sans-serif", fontSize: "1.1rem", color: "#fff", flexShrink: 0 }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>{t.name}</div>
                      <div style={{ fontSize: "0.76rem", color: "#9ca3af" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CONTACT ════════════════════ */}
      <section id="contact" className="sec sec-bg-gray">
        <div className="inner">
          <Anim>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span className="badge">Get In Touch</span>
              <h2 className="oswald sec-title" style={{ fontSize: "2.7rem", marginTop: 12 }}>CONTACT <span className="orange">US</span></h2>
              <p style={{ color: "#6b7280", marginTop: 8 }}>Free CCTV consultation and quote — call or fill the form</p>
            </div>
          </Anim>

          <div className="g-contact">
            {/* Contact info */}
            <Anim>
              <h3 className="oswald" style={{ fontSize: "1.35rem", color: "#f97316", marginBottom: 28 }}>GET IN TOUCH</h3>
              {[
                { icon: "📞", label: "Phone",    value: "8096922710",          href: "tel:8096922710" },
                { icon: "📞", label: "Alternate",value: "9705411587",          href: "tel:9705411587" },
                { icon: "📍", label: "Location", value: "Hyderabad, Telangana",href: "#" },
                { icon: "🕐", label: "Hours",    value: "Mon–Sat: 9AM – 7PM", href: "#" },
                { icon: "✉️", label: "Email",    value: "harisecurity@gmail.com", href: "mailto:harisecurity@gmail.com" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.66rem", color: "#9ca3af", letterSpacing: 2, marginBottom: 3, textTransform: "uppercase", fontWeight: 700 }}>{c.label}</div>
                    <a href={c.href} style={{ color: "#111827", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}>{c.value}</a>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "20px", background: "linear-gradient(135deg,#fff7ed,#fef2f2)", border: "1px solid rgba(249,115,22,.22)", borderRadius: 14 }}>
                <div className="oswald" style={{ fontSize: "0.95rem", color: "#f97316", marginBottom: 8, letterSpacing: 1 }}>FREE SITE SURVEY</div>
                <p style={{ color: "#6b7280", fontSize: "0.87rem", lineHeight: 1.72 }}>We'll visit your premises, assess the layout, and recommend the best CCTV setup — free, no obligation.</p>
              </div>
            </Anim>

            {/* Form */}
            <Anim delay={100}>
              <form onSubmit={submit} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,.05)" }}>
                {sent && (
                  <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "12px", marginBottom: 20, color: "#16a34a", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>
                    ✅ Thank you! We'll call you shortly.
                  </div>
                )}
                <div className="g-form-2" style={{ marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", color: "#6b7280", letterSpacing: 1, marginBottom: 5, textTransform: "uppercase", fontWeight: 700 }}>Your Name</label>
                    <input className="inp" type="text" placeholder="Enter your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", color: "#6b7280", letterSpacing: 1, marginBottom: 5, textTransform: "uppercase", fontWeight: 700 }}>Phone Number</label>
                    <input className="inp" type="tel" placeholder="Your phone number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.7rem", color: "#6b7280", letterSpacing: 1, marginBottom: 5, textTransform: "uppercase", fontWeight: 700 }}>Camera / Service Required</label>
                  <select className="inp" value={form.type} onChange={e => setForm({...form, type: e.target.value})} required>
                    <option value="">Select what you need...</option>
                    <option>New CCTV Installation (Home)</option>
                    <option>New CCTV Installation (Shop / Office)</option>
                    <option>DVR / NVR Setup</option>
                    <option>Camera Repair / Replacement</option>
                    <option>Remote Viewing Setup</option>
                    <option>Annual Maintenance Contract (AMC)</option>
                    <option>Large Scale / Commercial Project</option>
                  </select>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: "0.7rem", color: "#6b7280", letterSpacing: 1, marginBottom: 5, textTransform: "uppercase", fontWeight: 700 }}>Message (Optional)</label>
                  <textarea className="inp" placeholder="Premises size, number of cameras needed, etc." rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: "1rem" }}>
                  🚀 SEND ENQUIRY
                </button>
              </form>
            </Anim>
          </div>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer style={{ background: "#1a1a2e", borderTop: "4px solid #f97316", padding: "52px 0 28px" }}>
        <div className="inner">
          <div className="g-footer" style={{ marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: "1.4rem" }}>📷</span>
                <span className="oswald" style={{ fontSize: "1.25rem", color: "#f97316" }}>HARI CCTV SYSTEMS</span>
              </div>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: "0.88rem", maxWidth: 280 }}>
                Hyderabad's trusted CCTV specialists. Professional installation, premium brands, and 24/7 support.
              </p>
              <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Hikvision", "Dahua", "CP Plus"].map(b => (
                  <span key={b} style={{ background: "rgba(249,115,22,.15)", border: "1px solid rgba(249,115,22,.28)", color: "#f97316", fontSize: "0.66rem", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>{b}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="oswald" style={{ fontSize: "0.95rem", color: "#f97316", marginBottom: 16, letterSpacing: 2 }}>SERVICES</h4>
              {["CCTV Installation","DVR / NVR Setup","Night Vision Cameras","Remote Monitoring","Camera Repair","AMC Services"].map(s => (
                <div key={s} style={{ color: "#9ca3af", marginBottom: 8, fontSize: "0.86rem", cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#f97316"}
                  onMouseLeave={e => e.target.style.color = "#9ca3af"}
                  onClick={() => go("Services")}>{s}</div>
              ))}
            </div>

            <div>
              <h4 className="oswald" style={{ fontSize: "0.95rem", color: "#f97316", marginBottom: 16, letterSpacing: 2 }}>CONTACT</h4>
              <div style={{ color: "#9ca3af", fontSize: "0.86rem", lineHeight: 2.2 }}>
                <div><a href="tel:8096922710" style={{ color: "#9ca3af", textDecoration: "none" }}>📞 8096922710</a></div>
                <div><a href="tel:9705411587" style={{ color: "#9ca3af", textDecoration: "none" }}>📞 9705411587</a></div>
                <div>📍 Hyderabad, Telangana</div>
                <div>🕐 Mon–Sat 9AM–7PM</div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>© 2024 Hari CCTV Security Systems, Hyderabad. All rights reserved.</p>
            <p style={{ color: "#4b5563", fontSize: "0.75rem" }}>Designed for pro:Hari</p>
          </div>
        </div>
      </footer>

    {/* Floating call button */}
<a
  href="tel:8096922710"
  style={{
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 200,
    textDecoration: "none",
  }}
>
  <button
    style={{
      background: "linear-gradient(135deg,#f97316,#ef4444)",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: 60,
      height: 60,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      fontSize: "22px",
      lineHeight: 1,   // IMPORTANT
      padding: 0,      // IMPORTANT

      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(249,115,22,.45)",
      animation: "floatY 2.5s ease-in-out infinite",
    }}
  >
    📞
  </button>
</a>
    </div>
  );
}
