// ContactScreen — contact & waitlist form

function ContactScreen({ go }) {
  const [sent, setSent] = React.useState(false);
  const s = {
    wrap: { background: 'var(--bone)', color: 'var(--espresso)' },
    body: { maxWidth: 1280, margin: '0 auto', padding: '100px 64px 160px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'start' },
    formCol: { display: 'flex', flexDirection: 'column', gap: 24 },
    row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
    info: { display: 'flex', flexDirection: 'column', gap: 40 },
    infoBlock: { display: 'flex', flexDirection: 'column', gap: 6 },
    label: { fontFamily: 'var(--font-label)', fontWeight: 700, fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--espresso)', opacity: .65 },
    val: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: 'var(--espresso)' },
    success: { padding: '40px', border: '1px solid var(--umber)', color: 'var(--espresso)' },
    successH: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, lineHeight: 1, margin: '0 0 16px', letterSpacing: '-.02em' },
  };

  const onCream = true;

  return (
    <div style={s.wrap}>
      <PageHeader title="Contact" image="../../assets/header-contact.jpg" />

      <div style={s.body}>
        <div style={s.formCol}>
          {sent ? (
            <div style={s.success}>
              <h2 style={s.successH}>Thank you.</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.6, margin: 0 }}>
                We'll be in touch within two business days. Keep an eye on your inbox for a note from Amara.
              </p>
            </div>
          ) : (
            <>
              <div style={s.row2}>
                <Input label="Full name" placeholder="Full name" onCream={onCream} />
                <Input label="Email" placeholder="you@email.com" type="email" onCream={onCream} />
              </div>
              <Input label="Phone (optional)" placeholder="+60" onCream={onCream} />
              <Input label="Your message" placeholder="Tell us what you are looking for..." multiline onCream={onCream} />
              <div style={{ marginTop: 16 }}>
                <Button variant="primary" size="md" onClick={(e) => { e.preventDefault(); setSent(true); }}>Send Message</Button>
              </div>
            </>
          )}
        </div>

        <div style={s.info}>
          <div style={s.infoBlock}>
            <span style={s.label}>Studio</span>
            <span style={s.val}>Level 2, 38 Jalan Telawi<br/>Bangsar, Kuala Lumpur 59100</span>
          </div>
          <div style={s.infoBlock}>
            <span style={s.label}>Hours</span>
            <span style={s.val}>Mon–Fri · 06:00 — 20:30<br/>Sat–Sun · 07:30 — 15:00</span>
          </div>
          <div style={s.infoBlock}>
            <span style={s.label}>Contact</span>
            <span style={s.val}>+60 3 2000 1234<br/>hello@rebound.studio</span>
          </div>
          <div style={s.infoBlock}>
            <span style={s.label}>Follow</span>
            <div style={{ display: 'flex', gap: 16, marginTop: 4, color: 'var(--espresso)' }}>
              <Icon name="instagram" size={24} />
              <Icon name="facebook" size={24} />
              <Icon name="youtube" size={24} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

Object.assign(window, { ContactScreen });
