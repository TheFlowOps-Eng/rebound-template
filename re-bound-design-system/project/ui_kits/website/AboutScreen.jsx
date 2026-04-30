// AboutScreen — "Our Philosophy"
// Layout follows the Figma reference: founder letter + pinned-board collage,
// then a centered manifesto section with a wide image strip,
// then a Lagree explainer split with three outlined info cards,
// then a brown waitlist CTA panel, then footer.

function AboutScreen({ go }) {
  const s = {
    wrap: { background: 'var(--bone)', color: 'var(--espresso)' },

    /* ---------- Section 1: Why I started Re:Bound ---------- */
    storySection: { background: 'var(--bone)', padding: '120px 64px 140px' },
    storyInner: {
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start',
    },
    // Left side: pinned-board collage
    board: {
      position: 'relative', width: '100%', aspectRatio: '505 / 658',
    },
    boardPaper: {
      position: 'absolute', inset: 0,
      background: 'var(--ivory)',
      boxShadow: '0 24px 60px rgba(32,12,2,.18), 0 4px 14px rgba(32,12,2,.10)',
      transform: 'rotate(-1.2deg)',
      transformOrigin: 'top center',
      padding: '48px 44px',
      display: 'flex', flexDirection: 'column', gap: 18,
    },
    clip: {
      position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)',
      width: 76, height: 30, zIndex: 3,
    },
    handwritten: {
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 16, lineHeight: 1.5, color: 'var(--clove)',
      borderBottom: '1px solid rgba(61,49,43,.18)', paddingBottom: 6,
    },
    polaroid: {
      position: 'absolute',
      width: '46%', aspectRatio: '1 / 1',
      left: '32%', top: '46%',
      background: 'var(--white)',
      padding: '12px 12px 36px',
      boxShadow: '0 16px 32px rgba(32,12,2,.22), 0 2px 8px rgba(32,12,2,.14)',
      transform: 'rotate(3.5deg)',
      transformOrigin: 'center',
    },
    polaroidImg: {
      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
    },
    // Right side: founder letter
    letterCol: { display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8 },
    letterEyebrow: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 17, letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'var(--espresso)',
    },
    letterPara: {
      fontFamily: 'var(--font-body)', fontWeight: 400,
      fontSize: 19, lineHeight: 1.55, color: 'var(--clove)', margin: 0,
    },
    sig: {
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 36, lineHeight: 1, color: 'var(--espresso)',
      marginTop: 24,
    },
    sigName: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 13, letterSpacing: '.18em', textTransform: 'uppercase',
      color: 'var(--fg-subtle)', marginTop: 8,
    },

    /* ---------- Section 2: Manifesto + image strip ---------- */
    manifesto: { background: 'var(--stone)', padding: '120px 64px 0' },
    manifestoInner: { maxWidth: 1280, margin: '0 auto', textAlign: 'center' },
    manifestoH: {
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(64px, 8.5vw, 124px)',
      lineHeight: 0.99, letterSpacing: '-0.04em',
      color: 'var(--ink)', margin: 0, textWrap: 'balance',
    },
    manifestoCtas: {
      display: 'flex', gap: 16, justifyContent: 'center',
      marginTop: 56, marginBottom: 96,
    },
    strip: {
      width: '100%', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0,
    },
    stripImg: {
      width: '100%', height: 340, objectFit: 'cover', display: 'block',
    },

    /* ---------- Section 3: Lagree explainer ---------- */
    explain: { background: 'var(--bone)', padding: '140px 64px 160px' },
    explainInner: {
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start',
    },
    explainLeft: { display: 'flex', flexDirection: 'column', gap: 56 },
    explainH: {
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(48px, 5.4vw, 78px)', lineHeight: 1.05,
      letterSpacing: '-0.03em', color: 'var(--espresso)', margin: 0,
    },
    explainP: {
      fontFamily: 'var(--font-body)', fontWeight: 400,
      fontSize: 19, lineHeight: 1.55, color: 'var(--clove)', margin: 0,
    },
    explainImg: {
      width: '100%', height: 300, objectFit: 'cover', display: 'block',
      filter: 'saturate(.95)',
    },
    cards: { display: 'flex', flexDirection: 'column', gap: 20 },
    card: {
      border: '2px solid var(--umber)', padding: '32px 36px',
      display: 'flex', flexDirection: 'column', gap: 16,
    },
    cardLabel: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'var(--espresso)',
    },
    cardBody: {
      fontFamily: 'var(--font-body)', fontWeight: 400,
      fontSize: 17, lineHeight: 1.55, color: 'var(--clove)', margin: 0,
    },
    explainCta: { marginTop: 12 },

    /* ---------- Section 4: Waitlist CTA on umber ---------- */
    waitlist: { background: 'var(--umber)', color: 'var(--bone)', padding: '120px 64px' },
    waitlistInner: {
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start',
    },
    waitlistEyebrow: {
      fontFamily: 'var(--font-label)', fontWeight: 700,
      fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'var(--bone)', display: 'block', marginBottom: 24,
    },
    waitlistH: {
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1.05,
      letterSpacing: '-0.03em', color: 'var(--bone)', margin: 0,
    },
    waitlistP: {
      fontFamily: 'var(--font-body)', fontWeight: 400,
      fontSize: 17, lineHeight: 1.55, color: 'var(--bone)',
      opacity: 0.85, margin: '24px 0 0', maxWidth: 480,
    },
    formCol: { display: 'flex', flexDirection: 'column', gap: 24 },
    row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
  };

  return (
    <div style={s.wrap}>
      <PageHeader title="Our Philosophy" image="../../assets/header-about.jpg" />

      {/* ---------- Why I started Re:Bound ---------- */}
      <section style={s.storySection}>
        <div style={s.storyInner}>
          {/* Pinned-board collage */}
          <div style={s.board}>
            <div style={s.boardPaper}>
              {/* paper clip */}
              <svg style={s.clip} viewBox="0 0 76 30" fill="none">
                <rect x="2" y="4" width="72" height="22" rx="11"
                      stroke="rgba(61,49,43,.55)" strokeWidth="2" fill="rgba(61,49,43,.10)" />
                <rect x="10" y="10" width="56" height="10" rx="5"
                      stroke="rgba(61,49,43,.45)" strokeWidth="1" fill="none" />
              </svg>
              {/* handwritten lines */}
              <div style={s.handwritten}>06.04 — Bangsar walk-through</div>
              <div style={s.handwritten}>cork floor / linen acoustic / soft N light</div>
              <div style={s.handwritten}>12 reformers, 50 min, 8 per class</div>
              <div style={s.handwritten}>warm. quiet. considered.</div>
              <div style={{ ...s.handwritten, borderBottom: 'none', marginTop: 'auto', textAlign: 'right' }}>
                — A.C
              </div>
            </div>
            {/* Polaroid pinned over the page */}
            <div style={s.polaroid}>
              <img src="../../assets/founder-detail.jpg" alt="Inside the studio" style={s.polaroidImg} />
            </div>
          </div>

          {/* Founder letter */}
          <div style={s.letterCol}>
            <span style={s.letterEyebrow}>Why I started Re:Bound</span>
            <p style={s.letterPara}>
              I'd spent years in KL's fitness scene — the loud classes, the
              competitive energy. The workouts were effective. But I always
              left depleted. Never restored.
            </p>
            <p style={s.letterPara}>
              Then I found Lagree. A method that asked me to slow down instead
              of speed up. That made my muscles shake without a single jump.
              That demanded so much focus I forgot about everything outside
              the studio for fifty minutes.
            </p>
            <p style={s.letterPara}>
              I looked for a Lagree studio in KL. There wasn't one. So I
              decided to build it, and to build it the way I wished every
              studio I'd been to had been built. Warm. Quiet. Considered.
              A space where the lighting, the materials, the music and the
              method all work together to make you feel something you can't
              get anywhere else.
            </p>
            <p style={s.letterPara}>
              See you on the Megaformer.
            </p>
            <div style={s.sig}>Amara</div>
            <div style={s.sigName}>Amara Chen · Founder & Studio Director</div>
          </div>
        </div>
      </section>

      {/* ---------- Manifesto + image strip ---------- */}
      <section style={s.manifesto}>
        <div style={s.manifestoInner}>
          <h2 style={s.manifestoH}>We built the studio<br/>we couldn't find.</h2>
          <div style={s.manifestoCtas}>
            <Button variant="primary" size="md" onClick={(e) => { e.preventDefault(); go('studio'); }}>View the Studio</Button>
            <Button variant="inverse" size="md" onClick={(e) => { e.preventDefault(); go('classes'); }}>Book a Class</Button>
          </div>
        </div>
        <div style={s.strip}>
          <img src="../../assets/studio-interior.jpg" alt="" style={s.stripImg} />
          <img src="../../assets/hero-banner.jpg" alt="" style={s.stripImg} />
          <img src="../../assets/header-classes.jpg" alt="" style={s.stripImg} />
          <img src="../../assets/instructors-banner.jpg" alt="" style={s.stripImg} />
          <img src="../../assets/class-tile.jpg" alt="" style={s.stripImg} />
        </div>
      </section>

      {/* ---------- Lagree explainer ---------- */}
      <section style={s.explain}>
        <div style={s.explainInner}>
          <div style={s.explainLeft}>
            <h2 style={s.explainH}>
              Lagree is <em style={{ fontStyle: 'italic' }}>not Pilates</em>;
              though they share a family resemblance.
            </h2>
            <p style={s.explainP}>
              Developed by Sebastien Lagree in Los Angeles, the method uses
              a patented machine called the Megaformer to deliver a full-body
              workout that's low-impact but high-intensity. Every class is
              performed in slow motion: long holds, controlled transitions,
              constant muscular tension.
            </p>
            <img src="../../assets/lagree-girls.jpg" alt="Two students on the Megaformer" style={s.explainImg} />
          </div>

          <div style={s.cards}>
            <article style={s.card}>
              <span style={s.cardLabel}>What it feels like</span>
              <p style={s.cardBody}>
                Imagine holding a lunge so slowly your legs begin to shake.
                Now imagine doing that for four minutes. That's a Tuesday at
                Re:Bound. The method builds lean, defined muscle through
                endurance, not bulk.
              </p>
            </article>
            <article style={s.card}>
              <span style={s.cardLabel}>What it doesn't feel like</span>
              <p style={s.cardBody}>
                No pounding music. No one shouting at you. No jumping, no
                jarring, no impact on your joints. You won't leave feeling
                beaten up. You'll leave feeling worked — deeply, thoroughly,
                and precisely.
              </p>
            </article>
            <article style={s.card}>
              <span style={s.cardLabel}>Who it's for</span>
              <p style={s.cardBody}>
                Everyone. The Megaformer is adjustable and every exercise has
                modifications. Our Foundation classes are designed for
                complete beginners. Our Intensify classes will challenge
                competitive athletes.
              </p>
            </article>
            <div style={s.explainCta}>
              <Button variant="primary" size="md" onClick={(e) => { e.preventDefault(); go('classes'); }}>Book a Class</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Waitlist CTA ---------- */}
      <section style={s.waitlist}>
        <div style={s.waitlistInner}>
          <div>
            <span style={s.waitlistEyebrow}>Get Ready to Transform</span>
            <h2 style={s.waitlistH}>Let's make a <em style={{ fontStyle: 'italic' }}>plan</em>.</h2>
            <p style={s.waitlistP}>
              Waitlist members get early access to booking, launch-day
              pricing, and a complimentary first class. No credit card.
              Just your name and email.
            </p>
          </div>
          <div style={s.formCol}>
            <div style={s.row2}>
              <Input label="Full name" placeholder="Full name" onCream={false} />
              <Input label="Email" placeholder="you@email.com" type="email" onCream={false} />
            </div>
            <Input label="Your message" placeholder="Tell us what you're hoping for..." multiline onCream={false} />
            <div style={{ marginTop: 8 }}>
              <Button variant="inverse" size="md">Reserve My Spot</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

Object.assign(window, { AboutScreen });
