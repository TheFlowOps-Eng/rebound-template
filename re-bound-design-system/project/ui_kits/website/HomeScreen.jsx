// HomeScreen — Re:Bound website home.

function HomeScreen({ go }) {
  const [tIdx, setTIdx] = React.useState(0);
  const testimonials = [
    {
      quote: "Arched ceilings. Warm textured walls. Diffused lighting that softens as you settle in. Every detail was considered, from the temperature of the towels to the curve of the doorways.",
      name: 'Kaitlyn',
      role: 'Beginner',
    },
    {
      quote: "I left each class taller. Not louder, not more exhausted — taller. It's the first movement practice that hasn't asked me to perform.",
      name: 'Priya',
      role: 'Member since ’25',
    },
    {
      quote: "Slow is a lie they tell you. Fifty minutes in and my legs were shaking in a way I haven't felt since I stopped running half-marathons.",
      name: 'Daniel',
      role: 'Crossover athlete',
    },
  ];
  const goT = (dir) => setTIdx((i) => (i + dir + testimonials.length) % testimonials.length);
  const t = testimonials[tIdx];

  const s = {
    wrap: { background: 'var(--bone)', color: 'var(--espresso)' },

    // ---- Hero ----
    hero: {
      position: 'relative',
      minHeight: 800,
      background: `url('../../assets/hero-banner.jpg') center/cover no-repeat`,
      color: 'var(--bone)',
      paddingBottom: 0,
    },
    heroScrim: {
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, rgba(28,12,4,.42) 0%, rgba(28,12,4,.18) 45%, rgba(28,12,4,.55) 100%)',
    },
    heroInner: {
      position: 'relative', zIndex: 2,
      maxWidth: 1280, margin: '0 auto',
      padding: 'clamp(140px, 22vh, 220px) 24px 100px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 32, textAlign: 'center',
    },
    heroH1: {
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(56px, 11vw, 148px)', lineHeight: 1.0, letterSpacing: '-0.025em',
      margin: 0, color: 'var(--bone)',
      maxWidth: 1300,
    },
    heroSub: {
      fontFamily: 'var(--font-body)', fontWeight: 400,
      fontSize: 'clamp(15px, 1.4vw, 19px)', lineHeight: 1.55,
      maxWidth: 580, color: 'var(--bone)', margin: 0,
    },
    heroPill: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 12.5, letterSpacing: '0.18em', textTransform: 'uppercase',
      background: 'var(--bone)', color: 'var(--umber-deep)',
      border: 'none', cursor: 'pointer',
      padding: '22px 44px',
      transition: 'background 180ms, color 180ms',
    },

    // ---- Lagree intro section (replaces "Our Philosophy") ----
    lagree: { background: 'var(--bone)', padding: '120px 64px' },
    lagreeGrid: {
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center',
    },
    lagreeH: {
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(44px, 4.6vw, 64px)', lineHeight: 1.05, letterSpacing: '-.015em',
      margin: '24px 0 28px', color: 'var(--espresso)',
    },
    lagreeHEm: { fontStyle: 'italic' },
    lagreeP: {
      fontFamily: 'var(--font-body)', fontWeight: 400,
      fontSize: 16, lineHeight: 1.65, color: 'var(--clove)', margin: '0 0 18px', maxWidth: 480,
    },
    lagreeCta: {
      display: 'inline-block',
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
      background: 'var(--umber)', color: 'var(--bone)',
      border: 'none', cursor: 'pointer',
      padding: '20px 36px', marginTop: 16,
      transition: 'background 160ms',
    },
    lagreeImgWrap: { position: 'relative' },
    lagreeImg: {
      width: '100%', height: 720, objectFit: 'cover', display: 'block',
      border: '2px solid var(--umber)', boxSizing: 'border-box',
    },

    // ---- Philosophy section (legacy — kept for founder reuse) ----
    section: { maxWidth: 1280, margin: '0 auto', padding: '120px 64px' },
    sectionDark: { background: 'var(--espresso)', color: 'var(--bone)' },

    philGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' },
    philH: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 76, lineHeight: 1, letterSpacing: '-.02em', margin: '18px 0 32px' },
    philP: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: 'var(--clove)', marginBottom: 20 },

    // ---- Classes strip ----
    classStrip: {
      background: 'var(--espresso)', color: 'var(--bone)',
      padding: '140px 64px',
    },
    classStripInner: { maxWidth: 1280, margin: '0 auto' },
    classHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 },
    classH: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 84, lineHeight: 1, letterSpacing: '-.02em', margin: '14px 0 0', color: 'var(--bone)' },
    classGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 },
    classCard: { background: 'var(--clay)', overflow: 'hidden', cursor: 'pointer' },
    classImg: { width: '100%', height: 340, objectFit: 'cover', display: 'block', border: '2px solid var(--umber)', boxSizing: 'border-box' },
    classBody: { padding: '28px 28px 36px' },
    classTitle: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 48, lineHeight: 1, letterSpacing: '-.01em', margin: '0 0 16px', color: 'var(--bone)' },
    classP: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: 'var(--bone)', margin: '0 0 20px' },

    // ---- What it feels like split ----
    splitGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 640 },
    splitPanel: { padding: '100px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 },
    splitDark: { background: 'var(--umber-deep)' },
    splitLight: { background: 'var(--sand)' },
    splitH: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 60, lineHeight: 1.05, letterSpacing: '-.02em', margin: 0 },
    splitP: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 17, lineHeight: 1.6, margin: 0 },
    splitHDark: { color: 'var(--bone)' },
    splitPDark: { color: 'var(--bone)', opacity: 0.82 },
    splitHLight: { color: 'var(--espresso)' },
    splitPLight: { color: 'var(--clove)' },

    // ---- Testimonials ----
    testimonial: {
      position: 'relative',
      minHeight: 640,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    testimonialBg: {
      position: 'absolute', inset: 0,
      backgroundImage: 'url(../../assets/testimonial-bg.jpg)',
      backgroundSize: 'cover', backgroundPosition: 'center',
    },
    testimonialScrim: {
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, rgba(32,12,2,0.55) 0%, rgba(32,12,2,0.45) 100%)',
    },
    testimonialInner: {
      position: 'relative', zIndex: 2,
      maxWidth: 820, padding: '80px 40px',
      textAlign: 'center', color: 'var(--bone)',
    },
    testimonialQuoteMarkWrap: { position: 'relative', height: 0 },
    testimonialQuoteMark: {
      position: 'absolute',
      top: -60, left: -40,
      fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic',
      fontSize: 160, lineHeight: 1,
      color: 'var(--bone)', opacity: 0.95,
      userSelect: 'none',
    },
    testimonialQuote: {
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 46, lineHeight: 1.25, letterSpacing: '-0.01em',
      margin: 0, color: 'var(--bone)',
    },
    testimonialMeta: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 13, letterSpacing: '.18em', textTransform: 'uppercase',
      color: 'var(--bone)', margin: '44px 0 40px',
    },
    testimonialMetaRole: { fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: '.05em', fontFamily: 'var(--font-display)', fontSize: 18, marginLeft: 6 },
    testimonialCtas: { display: 'inline-flex', gap: 0, marginTop: 8 },
    testimonialArrow: {
      position: 'absolute', top: '50%', transform: 'translateY(-50%)',
      zIndex: 3,
      width: 44, height: 44, borderRadius: '50%',
      border: '1px solid var(--bone)', background: 'transparent',
      color: 'var(--bone)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background 180ms, color 180ms',
    },

    // ---- Founder letter ----
    founderGrid: { display: 'grid', gridTemplateColumns: '520px 1fr', gap: 96, alignItems: 'center' },
    founderImg: { width: '100%', height: 640, objectFit: 'cover', display: 'block', border: '2px solid var(--umber)', boxSizing: 'border-box' },

    // ---- Contact / plan ----
    plan: { background: 'var(--bone)', padding: '120px 64px 100px' },
    planGrid: {
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 96, alignItems: 'start',
    },
    planH: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 84, lineHeight: 1.0, letterSpacing: '-.02em', margin: '24px 0 28px', color: 'var(--espresso)' },
    planHEm: { fontStyle: 'italic' },
    planP: { fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 17, lineHeight: 1.65, color: 'var(--clove)', margin: 0, maxWidth: 360 },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' },
    fieldFull: { gridColumn: '1 / -1' },
    label: {
      display: 'block', fontFamily: 'var(--font-body)', fontWeight: 500,
      fontSize: 14, color: 'var(--espresso)', marginBottom: 10,
    },
    input: {
      width: '100%', boxSizing: 'border-box',
      fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--espresso)',
      padding: '14px 16px',
      background: 'transparent',
      border: '1px solid var(--umber)',
      borderRadius: 0,
      outline: 'none',
      transition: 'border-color 160ms',
    },
    textarea: {
      width: '100%', boxSizing: 'border-box',
      fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--espresso)',
      padding: '14px 16px',
      background: 'transparent',
      border: '1px solid var(--umber)',
      borderRadius: 0,
      outline: 'none',
      minHeight: 150, resize: 'vertical',
      transition: 'border-color 160ms',
    },
    submit: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 12.5, letterSpacing: '0.18em', textTransform: 'uppercase',
      background: 'var(--umber-deep)', color: 'var(--bone)',
      border: 'none', cursor: 'pointer',
      padding: '18px 36px', marginTop: 8,
      transition: 'background 160ms',
    },

    // ---- Footer wordmark band ----
    wordBand: {
      position: 'relative',
      width: '100%',
      height: 280,
      backgroundImage: `url('../../assets/footer-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    wordBandScrim: {
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, rgba(32,12,2,0.28) 0%, rgba(32,12,2,0.40) 100%)',
    },
    wordmarkImg: {
      position: 'relative', zIndex: 2,
      width: 'min(78%, 1100px)', height: 'auto', display: 'block',
      userSelect: 'none', pointerEvents: 'none',
    },
  };

  const classes = [
    { name: 'Foundation', copy: 'Your Lagree primer. Every fundamental, unhurried, so the method takes root.', img: '../../assets/foundation-class.png' },
    { name: 'Sculpt', copy: 'Targeted sequences. Slow lunges, long planks, and a shake that means it is working.', img: '../../assets/class-tile.jpg' },
    { name: 'Flow', copy: 'Connected movement at a steady tempo. Where stamina and form meet.', img: '../../assets/instructors-banner.jpg' },
  ];

  return (
    <div style={s.wrap}>
      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroScrim} />
        <div style={s.heroInner}>
          <h1 style={s.heroH1}>Discipline Meets <em style={{ fontStyle: 'italic' }}>Softness</em></h1>
          <p style={s.heroSub}>
            50-minute, full-body workouts on the Megaformer. Low-impact enough to
            protect your joints. Intense enough to reshape your body.
          </p>
          <button style={s.heroPill}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sand)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bone)'; }}
            onClick={() => go('contact')}
          >Join the Waitlist. It’s Free</button>
        </div>
      </section>

      {/* WHAT IS LAGREE */}
      <section style={s.lagree}>
        <div style={s.lagreeGrid}>
          <div>
            <Eyebrow size="lg">What Is Lagree?</Eyebrow>
            <h2 style={s.lagreeH}>
              <em style={s.lagreeHEm}>Not Pilates. Not yoga.</em><br/>
              Something that borrows from both — and outworks them.
            </h2>
            <p style={s.lagreeP}>
              Our studio was designed to feel the way the method feels: warm
              materials, soft light, deliberate space. Because where you train
              shapes how you train. And how you train shapes who you become.
              The Lagree method uses a machine called the Megaformer to deliver
              slow, controlled movements under constant tension. It's the same
              system used by athletes and celebrities in LA, but you don't need
              to be either to start.
            </p>
            <p style={s.lagreeP}>
              The slower you go, the harder it gets. That's what makes it
              different, exactly what the body needs.
            </p>
            <button style={s.lagreeCta}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--umber-deep)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--umber)'; }}
              onClick={() => go('about')}
            >Learn About Lagree</button>
          </div>
          <div style={s.lagreeImgWrap}>
            <img src="../../assets/lagree-girls.jpg" alt="Three members laughing after class" style={s.lagreeImg} />
          </div>
        </div>
      </section>

      {/* CLASSES STRIP */}
      <section style={s.classStrip}>
        <div style={s.classStripInner}>
          <div style={s.classHead}>
            <div>
              <Eyebrow size="lg" tone="bone">The Classes</Eyebrow>
              <h2 style={s.classH}>Three ways in.</h2>
            </div>
            <Button variant="overlay" size="md" onClick={(e) => { e.preventDefault(); go('classes'); }}>View All Classes</Button>
          </div>
          <div style={s.classGrid}>
            {classes.map(c => (
              <article key={c.name} style={s.classCard} onClick={() => go('classes')}>
                <img src={c.img} style={s.classImg} alt={c.name} />
                <div style={s.classBody}>
                  <h3 style={s.classTitle}>{c.name}</h3>
                  <p style={s.classP}>{c.copy}</p>
                  <InlineCTA tone="bone" href="#">Book {c.name}  →</InlineCTA>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IT FEELS LIKE — split */}
      <section style={s.splitGrid}>
        <div style={{ ...s.splitPanel, ...s.splitDark }}>
          <Eyebrow size="md" tone="bone">What It Feels Like</Eyebrow>
          <h2 style={{ ...s.splitH, ...s.splitHDark }}>Slow. Steady. Quietly brutal.</h2>
          <p style={{ ...s.splitP, ...s.splitPDark }}>
            The slower you go, the harder it gets. You'll shake. You'll breathe
            through it. You'll leave longer — taller — and a little surprised
            at what your body will do when no one is rushing it.
          </p>
        </div>
        <div style={{ ...s.splitPanel, ...s.splitLight }}>
          <Eyebrow size="md" tone="espresso">What It Doesn't Feel Like</Eyebrow>
          <h2 style={{ ...s.splitH, ...s.splitHLight }}>Not bootcamp. Not choreography.</h2>
          <p style={{ ...s.splitP, ...s.splitPLight }}>
            No pounding music. No one counting you down. No jumping, no jarring.
            The Megaformer is adjustable and every exercise has an option — so
            it meets you where you are and still asks for more.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={s.section}>
        <div style={s.founderGrid}>
          <img src="../../assets/founder.png" alt="Founder" style={s.founderImg} />
          <div>
            <Eyebrow size="lg">Who It's For</Eyebrow>
            <h2 style={s.philH}>Everyone.</h2>
            <p style={s.philP}>
              The Megaformer is adjustable and every exercise has an option.
              New to strength work. Returning from injury. A runner looking
              for the cross-training no one warned you that you'd love.
              Students. Parents. Shift workers. You, at six in the morning,
              before the city is awake.
            </p>
            <InlineCTA tone="espresso" href="#">Read our founder's letter  →</InlineCTA>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={s.testimonial}>
        <div style={s.testimonialBg} />
        <div style={s.testimonialScrim} />
        <button aria-label="Previous testimonial" onClick={() => goT(-1)}
          style={{ ...s.testimonialArrow, left: 48 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bone)'; e.currentTarget.style.color = 'var(--umber-deep)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--bone)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button aria-label="Next testimonial" onClick={() => goT(1)}
          style={{ ...s.testimonialArrow, right: 48 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bone)'; e.currentTarget.style.color = 'var(--umber-deep)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--bone)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div style={s.testimonialInner} key={tIdx}>
          <div style={s.testimonialQuoteMarkWrap}>
            <span style={s.testimonialQuoteMark}>“</span>
          </div>
          <p style={s.testimonialQuote}>{t.quote}</p>
          <p style={s.testimonialMeta}>
            {t.name},<span style={s.testimonialMetaRole}>{t.role}</span>
          </p>
          <div style={s.testimonialCtas}>
            <Button variant="primary" size="md" onClick={(e) => { e.preventDefault(); }}>View Packages & Membership</Button>
            <div style={{ width: 12 }} />
            <Button variant="inverse" size="md" onClick={(e) => { e.preventDefault(); go('contact'); }}>Book a Session</Button>
          </div>
        </div>
      </section>

      {/* PLAN / CONTACT */}
      <section style={s.plan}>
        <div style={s.planGrid}>
          <div>
            <Eyebrow size="lg">Get Ready to Transform</Eyebrow>
            <h2 style={s.planH}>Let’s make a <em style={s.planHEm}>plan.</em></h2>
            <p style={s.planP}>
              Waitlist members get early access to booking, launch-day pricing,
              and a complimentary first class. No credit card. Just your name
              and email.
            </p>
          </div>

          <form style={s.formGrid} onSubmit={(e) => { e.preventDefault(); go('contact'); }}>
            <div>
              <label style={s.label} htmlFor="rb-name">Full name</label>
              <input id="rb-name" type="text" style={s.input}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--umber-deep)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--umber)'; }}
              />
            </div>
            <div>
              <label style={s.label} htmlFor="rb-email">Email</label>
              <input id="rb-email" type="email" style={s.input}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--umber-deep)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--umber)'; }}
              />
            </div>
            <div style={s.fieldFull}>
              <label style={s.label} htmlFor="rb-msg">Your Message</label>
              <textarea id="rb-msg" style={s.textarea} placeholder="Type your message…"
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--umber-deep)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--umber)'; }}
              />
            </div>
            <div style={s.fieldFull}>
              <button type="submit" style={s.submit}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--espresso)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--umber-deep)'; }}
              >Reserve My Spot</button>
            </div>
          </form>
        </div>
      </section>

      {/* WORDMARK BAND */}
      <div style={s.wordBand} role="img" aria-label="Re:Bound studio">
        <div style={s.wordBandScrim} />
        <img src="../../assets/footer-logo.png" alt="Re:Bound" style={s.wordmarkImg} />
      </div>

      <Footer />
    </div>
  );
}

Object.assign(window, { HomeScreen });
