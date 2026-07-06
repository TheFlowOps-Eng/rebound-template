# OhhWells Canvas Editor — Template Authoring Guide

## Overview

The canvas editor lets studio owners edit their site's text content inline. To participate, your template elements need a few `data-ohw-*` attributes. The `OhhwellsBridge` component (already included in `rebound-template`) handles everything else automatically.

---

## Required attributes

### `data-ohw-key`
A **unique string identifier** for each editable node. This is the key used to store and hydrate content. Must be unique across the entire template.

```html
<h1 data-ohw-key="hero-headline">Welcome to our studio</h1>
<p  data-ohw-key="hero-subtext">Book a class today.</p>
```

- Use kebab-case: `hero-headline`, `about-description`, `cta-button-label`
- Keys are **stable** — changing a key after deployment loses saved content for that node

### `data-ohw-editable`
Marks the element as editable in the canvas editor. Four modes:

| Value | Behavior |
|-------|----------|
| `"text"` | Rich text — bold, italic, alignment, lists allowed |
| `"plain"` | Plain text only — no formatting, saves `innerText` |
| `"image"` | Replaces an `<img>` element's `src` via file upload |
| `"bg-image"` | Replaces a container's `backgroundImage` CSS via file upload |

```html
<!-- Rich text (headings, descriptions) -->
<h2 data-ohw-key="section-title" data-ohw-editable="text">
  About Us
</h2>

<!-- Plain text (buttons, labels, short strings) -->
<button data-ohw-key="cta-label" data-ohw-editable="plain">
  Book Now
</button>

<!-- Image replacement -->
<img
  data-ohw-key="hero-photo"
  data-ohw-editable="image"
  src="/hero.jpg"
  alt="Studio"
/>

<!-- Background image replacement -->
<header
  data-ohw-key="instructors-header-bg"
  data-ohw-editable="bg-image"
  style="background-image: url('/header-bg.jpg')"
>
  ...
</header>
```

Both `data-ohw-key` and `data-ohw-editable` must be on the **same element**.

---

## Optional attributes

### `data-ohw-max-length`
Limits how many characters the studio owner can type. A floating badge shows the current count and turns red when exceeded.

```html
<h1 data-ohw-key="hero-headline" data-ohw-editable="text" data-ohw-max-length="80">
  Short punchy headline here
</h1>
```

Recommended limits:
- Headlines / CTAs — `60–80`
- Subtitles — `120–160`
- Body paragraphs — omit (no limit)

---

## State-based components

Some components have multiple visual states — a form can be in `default`, `success`, or `error` state; a card can be in `default` or `hover` state. The canvas editor lets studio owners preview and edit **each state independently** via a state toggle that appears when hovering the component.

### `data-ohw-editable-state`
Place this on the **parent container** of a multi-state component. The value is a comma-separated list of the non-default states the component supports.

```html
<!-- Form with success and error states -->
<div data-ohw-editable-state="success,error">
  ...
</div>

<!-- Card with a hover state -->
<div data-ohw-editable-state="hover">
  ...
</div>
```

The `default` state is always implied — you don't need to list it.

### `data-ohw-state-view`
Place this on the **direct children** of the state container, one per state. Each wrapper shows/hides as the studio owner switches states in the editor.

```html
<div data-ohw-editable-state="success,error">

  <div data-ohw-state-view="default">
    <!-- Content shown in normal (live) mode -->
    <form>...</form>
  </div>

  <div data-ohw-state-view="success">
    <!-- Editable success message -->
    <h2 data-ohw-key="contact-success-title" data-ohw-editable="text">
      Message sent!
    </h2>
    <p data-ohw-key="contact-success-body" data-ohw-editable="text">
      We'll be in touch soon.
    </p>
  </div>

  <div data-ohw-state-view="error">
    <!-- Editable error message -->
    <h2 data-ohw-key="contact-error-title" data-ohw-editable="text">
      Something went wrong
    </h2>
    <p data-ohw-key="contact-error-body" data-ohw-editable="text">
      Please try again or contact us directly.
    </p>
  </div>

</div>
```

#### Live-mode visibility

Use the HTML `hidden` attribute to control which state is shown in live mode (not the editor). The bridge ignores `hidden` in edit mode and manages visibility itself.

```html
<!-- Default state: visible when form hasn't been submitted -->
<div data-ohw-state-view="default" hidden={sent}>...</div>

<!-- Success state: visible after successful submission -->
<div data-ohw-state-view="success" hidden={!sent}>...</div>

<!-- Error state: always hidden by default in live mode -->
<div data-ohw-state-view="error" hidden>...</div>
```

#### How the editor toggle works

When the studio owner hovers the component, a pill appears in the top-right corner listing all states (e.g. **Default / Success / Error**). Clicking a state:
1. Shows only that state's `data-ohw-state-view` wrapper
2. Hides all others
3. Makes editable elements inside that state fully clickable

When the studio owner moves their cursor away, the component resets to `default`.

#### Pseudo-state (hover/focus) support

For components with CSS `:hover` or `:focus` states, use `"hover"` or `"focus"` as the state name. The bridge automatically reads `:hover`/`:focus` CSS rules from your stylesheets and replays them using a `[data-ohw-active-state]` attribute — no style duplication needed.

```html
<div data-ohw-editable-state="hover" class="pricing-card">
  <div data-ohw-state-view="default">
    <h3 data-ohw-key="pricing-title" data-ohw-editable="plain">Studio Pass</h3>
  </div>
  <div data-ohw-state-view="hover">
    <h3 data-ohw-key="pricing-title-hover" data-ohw-editable="plain">Studio Pass</h3>
  </div>
</div>
```

```css
/* Write hover styles normally — the editor picks them up */
.pricing-card:hover {
  background: #1a1a1a;
  color: #ffffff;
}
```

#### Limitations

- Only CSS `:hover`/`:focus` rules from the template's own stylesheets are replayed — inline `onMouseEnter`/`onMouseLeave` JS handlers are not
- Nested `[data-ohw-editable-state]` elements are not supported — only the outermost container gets the toggle
- All three attributes (`data-ohw-editable-state`, `data-ohw-state-view`, `data-ohw-key`) must be present for the state system to work

---

## Full example

```html
<section>
  <h1
    data-ohw-key="hero-headline"
    data-ohw-editable="text"
    data-ohw-max-length="80"
  >
    Transform Your Practice
  </h1>

  <p
    data-ohw-key="hero-subtext"
    data-ohw-editable="text"
    data-ohw-max-length="200"
  >
    Premium yoga classes for all levels. Book your first class free.
  </p>

  <a
    href="/book"
    data-ohw-key="hero-cta"
    data-ohw-editable="plain"
    data-ohw-max-length="30"
  >
    Book a Class
  </a>
</section>

<!-- Contact form with state editing -->
<div data-ohw-editable-state="success,error">
  <div data-ohw-state-view="default">
    <form>
      <input data-ohw-key="contact-label-name" ... />
      <button type="submit">Send Message</button>
    </form>
  </div>

  <div data-ohw-state-view="success">
    <h2 data-ohw-key="contact-success-title" data-ohw-editable="text">
      Message sent!
    </h2>
    <p data-ohw-key="contact-success-body" data-ohw-editable="text">
      We'll be in touch soon.
    </p>
  </div>

  <div data-ohw-state-view="error">
    <h2 data-ohw-key="contact-error-title" data-ohw-editable="text">
      Something went wrong
    </h2>
    <p data-ohw-key="contact-error-body" data-ohw-editable="text">
      Please try again.
    </p>
  </div>
</div>

<!-- Hover-state card -->
<div data-ohw-editable-state="hover" class="feature-card">
  <div data-ohw-state-view="default">
    <h3 data-ohw-key="feature-1-title" data-ohw-editable="plain">Morning Flow</h3>
    <p data-ohw-key="feature-1-desc" data-ohw-editable="text">Start your day with intention.</p>
  </div>
  <div data-ohw-state-view="hover">
    <h3 data-ohw-key="feature-1-title-hover" data-ohw-editable="plain">Morning Flow</h3>
    <p data-ohw-key="feature-1-desc-hover" data-ohw-editable="text">Start your day with intention.</p>
  </div>
</div>
```

---

## Bridge-managed links (nav, footer, navbar buttons)

Use `OhwLink` (or a plain `<a>`) with `data-ohw-href-key` for links whose **destination URL** is edited in the canvas. Pair with an inner span that carries the label keys:

```tsx
import { OhwLink } from '@/components/ui/OhwLink'

<OhwLink hrefKey="nav-book-href" defaultHref="/book" data-ohw-role="navbar-button">
  <span data-ohw-editable="text" data-ohw-key="nav-book-label">
    Book a Class
  </span>
</OhwLink>
```

| Attribute | Purpose |
|-----------|---------|
| `data-ohw-href-key` | Storage key for the link destination (saved as `type: link`) |
| `data-ohw-key` + `data-ohw-editable` on inner span | Storage key for the visible label text |
| `data-ohw-role="navbar-button"` | Marks a navbar CTA — first click shows **Edit link** + **More** toolbar |

### Two-phase editing (navbar button only)

For elements with `data-ohw-role="navbar-button"`:

1. **First click** — selects the button (blue glow) and shows the **Edit link** + **More** toolbar.
2. **Second click on the label** — enters inline text editing with the rich-text toolbar (Edit link icon still available).

Nav/footer text links use the standard single-click flow: first click goes straight into text editing.

---

## Rules

1. **Every editable element needs both `data-ohw-key` and `data-ohw-editable`** — one without the other does nothing
2. **Keys must be unique** within a template — duplicates cause both elements to sync to the same content
3. **Don't put editable elements inside other editable elements** — nested editables are not supported
4. **Don't rely on inline styles for text content** — the editor saves/restores `innerHTML`, so formatting applied via CSS classes is fine, but inline `style` attributes on the editable element may be overwritten
5. **Use semantic HTML inside editable containers** — the sanitizer allows `b`, `i`, `u`, `s`, `strong`, `em`, `br`, `p`, `div`, `span`, `ol`, `ul`, `li`
6. **Always render all state views in the DOM** — don't use React conditional rendering (`{condition && <div>`) for state views; render all states and use the `hidden` attribute for live-mode visibility

---

## Environment variables

Your template needs two env vars set at build time (injected automatically by the OhhWells deploy pipeline):

```env
NEXT_PUBLIC_FLOWOPS_API_URL=   # Backend API — used by OhhwellsBridge to fetch saved content
NEXT_PUBLIC_SITE_URL=          # Public URL of this deployed site (e.g. https://my-studio.ohhwells.site)
```

These are set automatically when deploying via `ohhwells deploy` — no manual config needed.

> **Note:** `NEXT_PUBLIC_SITE_URL` is set once at the project level and must not be overwritten by user deployments. The bridge reads the current hostname at runtime to identify the site — do not hardcode this value.
