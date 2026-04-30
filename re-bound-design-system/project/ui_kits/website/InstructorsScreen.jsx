// InstructorsScreen — team page

function InstructorsScreen({ go }) {
  const team = [
    { name: 'Amara Chen', role: 'Head Coach · Founder',
      bio: 'Former physio. Lagree-certified since 2019. Believes a whisper works better than a shout.', img: '../../assets/founder.png' },
    { name: 'Wren Halim', role: 'Senior Coach',
      bio: 'Yoga background. Teaches Flow and Foundation. Will make you hold a plank longer than you meant to.', img: '../../assets/founder-detail.jpg' },
    { name: 'Idris Vale', role: 'Coach',
      bio: 'Rehab and strength. Works with returning athletes, new parents, and anyone starting over.', img: '../../assets/class-tile.jpg' },
    { name: 'Mika Okafor', role: 'Coach',
      bio: 'Dance background. Sculpt and Core specialist. Quiet, precise, exacting.', img: '../../assets/instructors-banner.jpg' },
  ];
  const s = {
    wrap: { background: 'var(--bone)', color: 'var(--espresso)' },
    header: { background: 'var(--clay)', color: 'var(--bone)', padding: '180px 64px 140px' },
    inner: { maxWidth: 1280, margin: '0 auto' },
    h1: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 148, lineHeight: 0.95, letterSpacing: '-.02em', margin: '18px 0 0', color: 'var(--bone)' },
    section: { maxWidth: 1280, margin: '0 auto', padding: '120px 64px 140px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 80, rowGap: 120 },
    card: { display: 'flex', flexDirection: 'column', gap: 20 },
    img: { width: '100%', height: 520, objectFit: 'cover', display: 'block', border: '2px solid var(--umber)', boxSizing: 'border-box' },
    role: { fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--fg-subtle)' },
    name: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 68, lineHeight: 1, letterSpacing: '-.02em', margin: '6px 0 12px', color: 'var(--espresso)' },
    bio: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 17, lineHeight: 1.6, color: 'var(--clove)', margin: 0, maxWidth: 420 },
  };
  return (
    <div style={s.wrap}>
      <PageHeader title="Instructors" image="../../assets/header-instructors.jpg" />
      <section style={s.section}>
        <div style={s.grid}>
          {team.map(p => (
            <article key={p.name} style={s.card}>
              <img src={p.img} alt={p.name} style={s.img} />
              <div>
                <span style={s.role}>{p.role}</span>
                <h2 style={s.name}>{p.name}</h2>
                <p style={s.bio}>{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

Object.assign(window, { InstructorsScreen });
