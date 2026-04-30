// ClassesScreen — library of classes

function ClassesScreen({ go }) {
  const [active, setActive] = React.useState('all');
  const filters = [
    { id: 'all', label: 'All Levels' },
    { id: 'new', label: 'New to Lagree' },
    { id: 'strength', label: 'Strength' },
    { id: 'flow', label: 'Flow' },
  ];
  const classes = [
    { id: 'foundation', name: 'Foundation', min: 50, level: 'All Levels', tag: 'new',
      desc: 'Your Lagree primer. We take every fundamental unhurried so the method takes root — carriage control, spring choice, tempo.', img: '../../assets/foundation-class.png' },
    { id: 'sculpt', name: 'Sculpt', min: 50, level: 'Intermediate', tag: 'strength',
      desc: 'Targeted sequences. Slow lunges, long planks, and a shake that means it is working. You will leave longer.', img: '../../assets/class-tile.jpg' },
    { id: 'flow', name: 'Flow', min: 50, level: 'Intermediate', tag: 'flow',
      desc: 'Connected movement at a steady tempo. Where stamina and form meet — built for those who have found their rhythm.', img: '../../assets/instructors-banner.jpg' },
    { id: 'core', name: 'Core', min: 45, level: 'All Levels', tag: 'strength',
      desc: 'A shorter session built entirely around the middle. Plank-heavy. Deep, slow, and rarely quiet.', img: '../../assets/hero-banner.jpg' },
  ];
  const filtered = active === 'all' ? classes : classes.filter(c => c.tag === active);

  const s = {
    wrap: { background: 'var(--bone)', color: 'var(--espresso)' },
    header: { background: 'var(--espresso)', color: 'var(--bone)', padding: '180px 64px 120px' },
    headerInner: { maxWidth: 1280, margin: '0 auto' },
    h1: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 140, lineHeight: 1, letterSpacing: '-.02em', margin: '18px 0 32px', color: 'var(--bone)' },
    sub: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 20, lineHeight: 1.5, color: 'var(--bone)', maxWidth: 620, margin: 0 },
    filterBar: { display: 'flex', gap: 12, padding: '48px 64px 24px', maxWidth: 1280, margin: '0 auto', flexWrap: 'wrap' },
    filter: (on) => ({
      fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 12, letterSpacing: '.13em', textTransform: 'uppercase',
      padding: '14px 28px', cursor: 'pointer',
      background: on ? 'var(--umber)' : 'transparent',
      color: on ? 'var(--bone)' : 'var(--espresso)',
      border: `1px solid ${on ? 'var(--umber)' : 'var(--espresso)'}`,
    }),
    list: { maxWidth: 1280, margin: '0 auto', padding: '40px 64px 140px', display: 'flex', flexDirection: 'column', gap: 64 },
    row: { display: 'grid', gridTemplateColumns: '460px 1fr', gap: 64, alignItems: 'center', borderBottom: '1px solid var(--ink)', paddingBottom: 64 },
    img: { width: '100%', height: 340, objectFit: 'cover', display: 'block', border: '2px solid var(--umber)', boxSizing: 'border-box' },
    meta: { display: 'flex', gap: 20, marginTop: 8 },
    metaItem: { fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 12, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--fg-subtle)' },
    name: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 84, lineHeight: 1, letterSpacing: '-.02em', margin: '14px 0 20px', color: 'var(--espresso)' },
    p: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 17, lineHeight: 1.6, color: 'var(--clove)', margin: '0 0 24px', maxWidth: 560 },
  };

  return (
    <div style={s.wrap}>
      <PageHeader title="Classes" image="../../assets/header-classes.jpg" />

      <div style={s.filterBar}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setActive(f.id)} style={s.filter(active === f.id)}>{f.label}</button>
        ))}
      </div>

      <div style={s.list}>
        {filtered.map(c => (
          <article key={c.id} style={s.row}>
            <img src={c.img} alt={c.name} style={s.img} />
            <div>
              <div style={s.meta}>
                <span style={s.metaItem}>{c.min} min</span>
                <span style={s.metaItem}>·</span>
                <span style={s.metaItem}>{c.level}</span>
              </div>
              <h2 style={s.name}>{c.name}</h2>
              <p style={s.p}>{c.desc}</p>
              <div style={{ display: 'flex', gap: 16 }}>
                <Button variant="primary" size="md" onClick={(e) => { e.preventDefault(); go('contact'); }}>Book {c.name}</Button>
                <Button variant="inverse" size="md">View Schedule</Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
}

Object.assign(window, { ClassesScreen });
