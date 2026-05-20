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
Marks the element as editable in the canvas editor. Two modes:

| Value | Behavior |
|-------|----------|
| `"text"` | Rich text — bold, italic, alignment, lists allowed |
| `"plain"` | Plain text only — no formatting, saves `innerText` |

```html
<!-- Rich text (headings, descriptions) -->
<h2 data-ohw-key="section-title" data-ohw-editable="text">
  About Us
</h2>

<!-- Plain text (buttons, labels, short strings) -->
<button data-ohw-key="cta-label" data-ohw-editable="plain">
  Book Now
</button>
```

Both attributes must be on the **same element**.

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

### `data-ohw-hover-card`
Marks a component that has a visible hover state (e.g. a card or button with a `:hover` style). The editor adds a **Default / Hover** toggle so the studio owner can preview and edit both states.

```html
<div data-ohw-hover-card class="pricing-card">
  ...
</div>
```

No value needed — presence of the attribute is enough.

#### How it works

When the studio owner's cursor enters a `[data-ohw-hover-card]` element, a small **Default / Hover** pill appears in the top-right corner of the card:

- **Default** — shows the card as it appears normally (no hover styles applied)
- **Hover** — locks the card in its hover state so the owner can read and edit the hover-state content without holding the mouse over it

The bridge automatically reads all `:hover` CSS rules from the template's stylesheets and replays them using a `[data-ohw-force-hover]` attribute — so you don't need to duplicate any styles. Just write normal `:hover` CSS and the editor picks it up.

```css
/* Write your hover styles normally — the editor handles the rest */
.pricing-card:hover {
  background: #1a1a1a;
  color: #ffffff;
}

.pricing-card:hover .card-title {
  color: #0885FE;
}
```

#### Editable content inside hover cards

Editable elements inside a hover card work exactly the same way — they just need `data-ohw-key` and `data-ohw-editable`. The studio owner switches to Hover state first, then clicks the element to edit it.

```html
<div data-ohw-hover-card class="pricing-card">
  <h3
    data-ohw-key="pricing-card-title"
    data-ohw-editable="plain"
    data-ohw-max-length="40"
  >
    Studio Pass
  </h3>
  <p
    data-ohw-key="pricing-card-desc"
    data-ohw-editable="text"
  >
    Unlimited classes, cancel anytime.
  </p>
</div>
```

#### Limitations

- Only CSS `:hover` rules from the template's own stylesheets are picked up — inline `onMouseEnter` / `onMouseLeave` JS handlers are not replayed
- Nested `[data-ohw-hover-card]` elements are not supported — only the outermost card gets the toggle

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

<div data-ohw-hover-card class="feature-card">
  <h3
    data-ohw-key="feature-1-title"
    data-ohw-editable="plain"
    data-ohw-max-length="50"
  >
    Morning Flow
  </h3>
  <p
    data-ohw-key="feature-1-desc"
    data-ohw-editable="text"
  >
    Start your day with intention.
  </p>
</div>
```

---

## Rules

1. **Every editable element needs both `data-ohw-key` and `data-ohw-editable`** — one without the other does nothing
2. **Keys must be unique** within a template — duplicates cause both elements to sync to the same content
3. **Don't put editable elements inside other editable elements** — nested editables are not supported
4. **Don't rely on inline styles for text content** — the editor saves/restores `innerHTML`, so formatting applied via CSS classes is fine, but inline `style` attributes on the editable element may be overwritten
5. **Use semantic HTML inside editable containers** — the sanitizer allows `b`, `i`, `u`, `s`, `strong`, `em`, `br`, `p`, `div`, `span`, `ol`, `ul`, `li`

---

## Environment variables

Your template needs two env vars set at build time (injected automatically by the OhhWells deploy pipeline):

```env
NEXT_PUBLIC_FLOWOPS_API_URL=   # Backend API — used by OhhwellsBridge to fetch saved content
NEXT_PUBLIC_SITE_URL=          # Public URL of this deployed site (e.g. https://my-studio.ohhwells.site)
```

These are set automatically when deploying via `ohhwells deploy` — no manual config needed.
