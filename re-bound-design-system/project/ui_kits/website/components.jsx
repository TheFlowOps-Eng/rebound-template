// Shared components for the Re:Bound website kit.
// CRITICAL: style objects are named-scoped (e.g. navStyles) to avoid
// global-scope collisions between Babel <script> files.

const { useState } = React;

// ---------- Eyebrow ----------
function Eyebrow({ children, size = 'lg', tone = 'espresso', style }) {
  const sizes = { lg: 17, md: 14, sm: 12 };
  const tracking = size === 'lg' ? '0.20em' : '0.13em';
  const colorMap = {
    espresso: 'var(--espresso)',
    bone: 'var(--bone)',
    umber: 'var(--umber)',
  };
  return (
    <span style={{
      fontFamily: 'var(--font-label)',
      fontWeight: 700,
      fontSize: sizes[size],
      letterSpacing: tracking,
      lineHeight: 1.41,
      textTransform: 'uppercase',
      color: colorMap[tone] || tone,
      ...style,
    }}>{children}</span>
  );
}

// ---------- Button ----------
function Button({ children, variant = 'primary', size = 'md', href = '#', style, onClick }) {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: 'var(--font-label)',
    fontWeight: 700,
    letterSpacing: '0.13em',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    transition: 'background 300ms cubic-bezier(.22,1,.36,1), opacity 200ms',
    textDecoration: 'none',
  };
  const sizeMap = {
    sm: { padding: '10px 20px', fontSize: 11.4 },
    md: { padding: '20px 40px', fontSize: 14 },
    lg: { padding: '24px 48px', fontSize: 15 },
  };
  const variants = {
    primary: {
      background: hover ? 'var(--umber-deep)' : 'var(--umber)',
      color: 'var(--bone)',
    },
    inverse: {
      background: hover ? 'var(--sand)' : 'var(--bone)',
      color: 'var(--umber)',
      border: '1px solid var(--umber)',
    },
    dark: {
      background: hover ? 'var(--ink)' : 'var(--espresso)',
      color: 'var(--bone)',
    },
    // Inverse that starts dark and flips to light on hover — used on photography overlays
    overlay: {
      background: hover ? 'var(--bone)' : 'rgba(235,236,221,.92)',
      color: 'var(--umber)',
    },
  };
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sizeMap[size], ...variants[variant], ...style }}>
      {children}
    </a>
  );
}

// ---------- Inline CTA (underlined label) ----------
function InlineCTA({ children, href = '#', tone = 'white', style }) {
  const colorMap = { white: 'var(--white)', espresso: 'var(--espresso)', umber: 'var(--umber)', bone: 'var(--bone)' };
  return (
    <a href={href} style={{
      fontFamily: 'var(--font-label)',
      fontWeight: 400,
      fontSize: 14,
      letterSpacing: '0.13em',
      textTransform: 'uppercase',
      textDecoration: 'underline',
      textUnderlineOffset: 6,
      color: colorMap[tone],
      display: 'inline-block',
      ...style,
    }}>{children}</a>
  );
}

// ---------- Logo ----------
function Wordmark({ onDark = false, height = 28 }) {
  return (
    <img
      src={onDark ? '../../assets/rebound-logo-light.png' : '../../assets/rebound-logo-dark.png'}
      alt="Re:Bound"
      style={{ height, display: 'block' }}
    />
  );
}

// ---------- Top Navigation (responsive, centered nav) ----------
function TopNav({ current, go, onLightBg = false }) {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia('(max-width: 900px)');
    const fn = () => setIsMobile(m.matches);
    fn();
    m.addEventListener('change', fn);
    return () => m.removeEventListener('change', fn);
  }, []);

  const ink = onLightBg ? 'var(--espresso)' : 'var(--bone)';
  const navStyles = {
    bar: {
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr auto' : '180px 1fr auto',
      alignItems: 'center',
      padding: isMobile ? '20px 20px' : '28px 36px',
      pointerEvents: 'auto',
      gap: 16,
    },
    links: {
      display: 'flex', justifyContent: 'center', gap: 32,
    },
    link: (active) => ({
      fontFamily: 'var(--font-label)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: ink,
      textDecoration: 'none',
      cursor: 'pointer',
      opacity: active ? 1 : 0.92,
      borderBottom: active ? `1px solid ${ink}` : '1px solid transparent',
      paddingBottom: 2,
      transition: 'opacity .2s',
    }),
    bookBtn: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 11.5, letterSpacing: '0.18em', textTransform: 'uppercase',
      background: 'var(--bone)', color: 'var(--umber-deep)',
      border: 'none', cursor: 'pointer',
      padding: '18px 28px',
    },
    burger: {
      display: 'flex', flexDirection: 'column', gap: 5,
      background: 'transparent', border: 'none',
      padding: 8, cursor: 'pointer',
      color: ink,
    },
    burgerBar: { width: 22, height: 1.5, background: ink },
    drawer: {
      position: 'fixed', top: 0, right: 0, bottom: 0,
      width: 'min(86vw, 360px)',
      background: 'var(--umber-deep)', color: 'var(--bone)',
      zIndex: 200,
      padding: '32px 28px',
      display: 'flex', flexDirection: 'column', gap: 8,
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform .3s ease',
    },
    drawerScrim: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity .25s', zIndex: 150,
    },
    drawerLink: (active) => ({
      fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1.2,
      color: 'var(--bone)', textDecoration: 'none', cursor: 'pointer',
      letterSpacing: '-.01em',
      opacity: active ? 1 : 0.85,
      padding: '8px 0',
    }),
    drawerClose: {
      alignSelf: 'flex-end',
      background: 'transparent', border: 'none',
      color: 'var(--bone)', fontSize: 24, cursor: 'pointer',
      padding: 8, marginBottom: 16,
    },
  };
  const pages = [
    ['home', 'Home'], ['about', 'About'], ['classes', 'Classes'],
    ['pricing', 'Pricing'], ['studio', 'Studio'],
    ['instructors', 'Instructors'], ['contact', 'Contact'],
  ];
  return (
    <>
      <nav style={navStyles.bar}>
        <a onClick={() => go('home')} style={{ cursor: 'pointer', justifySelf: 'start' }}>
          <Wordmark onDark={!onLightBg} height={isMobile ? 22 : 26} />
        </a>
        {!isMobile && (
          <div style={navStyles.links}>
            {pages.map(([k, label]) => (
              <a key={k} onClick={() => go(k)} style={navStyles.link(current === k)}>{label}</a>
            ))}
          </div>
        )}
        {!isMobile ? (
          <button style={navStyles.bookBtn} onClick={() => go('contact')}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sand)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bone)'; }}
          >Book Now</button>
        ) : (
          <button style={navStyles.burger} aria-label="Open menu" onClick={() => setOpen(true)}>
            <span style={navStyles.burgerBar} />
            <span style={navStyles.burgerBar} />
            <span style={navStyles.burgerBar} />
          </button>
        )}
      </nav>

      {isMobile && (
        <>
          <div style={navStyles.drawerScrim} onClick={() => setOpen(false)} />
          <aside style={navStyles.drawer}>
            <button style={navStyles.drawerClose} aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
            {pages.map(([k, label]) => (
              <a key={k} onClick={() => { go(k); setOpen(false); }} style={navStyles.drawerLink(current === k)}>{label}</a>
            ))}
            <button style={{ ...navStyles.bookBtn, marginTop: 24, alignSelf: 'flex-start' }}
              onClick={() => { go('contact'); setOpen(false); }}>Book Now</button>
          </aside>
        </>
      )}
    </>
  );
}

// ---------- Page Header (banner) ----------
// Used at the top of inner pages: full-bleed photograph with a soft scrim
// and an enormous serif page title centered. The site-level <TopNav>
// already floats above; this just provides the band + title.
function PageHeader({ title, image, height = 320 }) {
  const phStyles = {
    band: {
      position: 'relative',
      width: '100%',
      height,
      backgroundImage: `url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
    },
    scrim: {
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, rgba(28,12,4,.18) 0%, rgba(28,12,4,.10) 50%, rgba(28,12,4,.30) 100%)',
    },
    titleWrap: {
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: 56,
      pointerEvents: 'none',
    },
    title: {
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(72px, 11vw, 168px)', lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'var(--bone)',
      margin: 0,
      textShadow: '0 2px 24px rgba(28,12,4,0.18)',
      userSelect: 'none',
    },
  };
  return (
    <header style={phStyles.band}>
      <div style={phStyles.scrim} />
      <div style={phStyles.titleWrap}>
        <h1 style={phStyles.title}>{title}</h1>
      </div>
    </header>
  );
}

// ---------- Footer ----------
function Footer() {
  const footerStyles = {
    root: {
      background: 'var(--bone)',
      padding: '80px 64px 60px',
      color: 'var(--ink)',
      borderTop: 'none',
    },
    inner: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 },
    col: { display: 'flex', flexDirection: 'column', gap: 32 },
    logo: { height: 40, objectFit: 'contain', objectPosition: 'left', display: 'block' },
    label: { fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', margin: 0, marginBottom: 4 },
    body: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, color: 'var(--ink)', margin: 0 },
    socials: { display: 'flex', gap: 16, marginTop: 8 },
    ico: { width: 22, height: 22, color: 'var(--ink)', strokeWidth: 1.5 },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
    linkCol: { display: 'flex', flexDirection: 'column', gap: 10 },
    link: { fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 14, color: 'var(--ink)', textDecoration: 'none', letterSpacing: '0.02em' },
    divider: { border: 0, borderTop: '1px solid var(--ink)', margin: '64px 0 24px' },
    credit: { fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 14, color: 'var(--ink)', textAlign: 'center' },
  };
  return (
    <footer style={footerStyles.root}>
      <div style={footerStyles.inner}>
        <div style={footerStyles.col}>
          <img src="../../assets/rebound-logo-dark.png" alt="Re:Bound" style={footerStyles.logo} />
          <div>
            <p style={footerStyles.label}>Address:</p>
            <p style={footerStyles.body}>Level 2, 38 Jalan Telawi, Bangsar, Kuala Lumpur</p>
          </div>
          <div>
            <p style={footerStyles.label}>Contact:</p>
            <p style={footerStyles.body}>+60 3 2000 1234</p>
            <p style={footerStyles.body}>hello@rebound.studio</p>
          </div>
          <div style={footerStyles.socials}>
            <Icon name="facebook" size={22} />
            <Icon name="instagram" size={22} />
            <Icon name="twitter" size={22} />
            <Icon name="linkedin" size={22} />
            <Icon name="youtube" size={22} />
          </div>
        </div>
        <div style={footerStyles.grid2}>
          <div style={footerStyles.linkCol}>
            <a style={footerStyles.link}>Classes & Schedule</a>
            <a style={footerStyles.link}>Booking</a>
            <a style={footerStyles.link}>Contact Us</a>
            <a style={footerStyles.link}>The Studio</a>
          </div>
          <div style={footerStyles.linkCol}>
            <a style={footerStyles.link}>About Us</a>
            <a style={footerStyles.link}>Our Team</a>
            <a style={footerStyles.link}>Careers</a>
          </div>
        </div>
      </div>
      <hr style={footerStyles.divider} />
      <p style={footerStyles.credit}>© 2026 Re:Bound. All rights reserved.</p>
    </footer>
  );
}

// ---------- Lucide Icon (per-instance, no global observer) ----------
function Icon({ name, size = 20, stroke = 1.5, color = 'currentColor', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide) return;
    // Render just this one icon from the registered icon set.
    const icons = window.lucide.icons || window.lucide.default?.icons;
    const def = icons?.[name.charAt(0).toUpperCase() + name.slice(1).replace(/-(\w)/g, (_, c) => c.toUpperCase())]
             || icons?.[name];
    if (!def) return;
    // lucide icons are [tag, attrs, children] tuples; build the svg ourselves
    // so we don't need data-lucide + a global createIcons() scan.
    const [, rootAttrs, children] = def;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    Object.entries({ ...rootAttrs, width: size, height: size, 'stroke-width': stroke, stroke: 'currentColor', fill: 'none' })
      .forEach(([k, v]) => svg.setAttribute(k, v));
    (children || []).forEach(([tag, attrs]) => {
      const el = document.createElementNS(svgNS, tag);
      Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
      svg.appendChild(el);
    });
    ref.current.innerHTML = '';
    ref.current.appendChild(svg);
  }, [name, size, stroke]);
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size, color, ...style }} />;
}
function CircleArrow({ direction = 'left', onClick, style }) {
  const path = direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6';
  return (
    <button onClick={onClick} style={{
      width: 48, height: 48, borderRadius: '50%', background: 'white',
      border: '1px solid var(--ink)', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: 0, ...style,
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth={2} style={{ width: 22, height: 22 }}>
        <path d={path} />
      </svg>
    </button>
  );
}

// ---------- Input ----------
function Input({ label, placeholder = 'Placeholder', type = 'text', multiline = false, style, onCream = true }) {
  const labelColor = onCream ? 'var(--clove)' : 'var(--bone)';
  const borderColor = onCream ? 'var(--ink)' : 'var(--bone)';
  const textColor = onCream ? 'var(--espresso)' : 'var(--bone)';
  const inputStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    padding: 12,
    border: `1px solid ${borderColor}`,
    background: 'transparent',
    color: textColor,
    borderRadius: 0,
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <label style={{ fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 16, color: labelColor }}>{label}</label>
      {multiline
        ? <textarea placeholder={placeholder} style={{ ...inputStyle, height: 180, resize: 'none', fontFamily: 'Roboto, sans-serif' }} />
        : <input type={type} placeholder={placeholder} style={{ ...inputStyle, height: 48 }} />}
    </div>
  );
}

Object.assign(window, { Eyebrow, Button, InlineCTA, Wordmark, TopNav, PageHeader, Footer, CircleArrow, Input, Icon });
