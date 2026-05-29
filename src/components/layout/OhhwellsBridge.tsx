'use client'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const PRIMARY = '#0885FE'
const IMAGE_FADE_MS = 300

function runOpacityFade(el: HTMLElement, onDone: () => void) {
  const anim = el.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: IMAGE_FADE_MS,
    easing: 'ease',
    fill: 'forwards',
  })
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    anim.cancel()
    el.style.opacity = ''
    onDone()
  }
  anim.finished.then(finish).catch(finish)
  window.setTimeout(finish, IMAGE_FADE_MS + 100)
}

/** After load: unmount skeleton (onReady), then fade <img> in. */
function fadeInImageElement(img: HTMLElement, onReady: () => void) {
  onReady()
  img.style.opacity = '0'
  runOpacityFade(img, () => {
    img.style.opacity = ''
  })
}

/** After load: unmount skeleton, fade new background layer in so text stays visible. */
function fadeInBgImage(el: HTMLElement, url: string, onReady: () => void) {
  const prevPos = el.style.position
  if (!prevPos || prevPos === 'static') el.style.position = 'relative'

  const layer = document.createElement('div')
  layer.setAttribute('data-ohw-bg-fade-layer', '')
  Object.assign(layer.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '0',
    backgroundImage: `url('${url}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: '0',
    pointerEvents: 'none',
  })
  el.prepend(layer)

  onReady()

  runOpacityFade(layer, () => {
    el.style.backgroundImage = `url('${url}')`
    layer.remove()
    if (!prevPos || prevPos === 'static') el.style.position = prevPos
  })
}
import { createPortal } from 'react-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { isEditSessionActive } from '@/lib/ohw-session-search'
type EditableNode = { key: string; type: string; text: string }


function collectEditableNodes(): EditableNode[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-ohw-editable]')).map((el) => {
    if (el.dataset.ohwEditable === 'image') {
      const img = el instanceof HTMLImageElement ? el : el.querySelector<HTMLImageElement>('img')
      return { key: el.dataset.ohwKey ?? '', type: 'image', text: img?.src ?? '' }
    }
    if (el.dataset.ohwEditable === 'bg-image') {
      const raw = el.style.backgroundImage
      const url = raw.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
      return { key: el.dataset.ohwKey ?? '', type: 'bg-image', text: url }
    }
    return {
      key: el.dataset.ohwKey ?? '',
      type: el.dataset.ohwEditable ?? 'text',
      text: el.dataset.ohwEditable === 'plain' ? (el.innerText ?? '') : el.innerHTML,
    }
  })
}

const FORCE_PSEUDO_STATES: Array<{ pseudo: string; attr: string }> = [
  { pseudo: ':hover', attr: 'data-ohw-force-hover' },
  { pseudo: ':focus', attr: 'data-ohw-force-focus' },
  { pseudo: ':focus-visible', attr: 'data-ohw-force-focus-visible' },
  { pseudo: ':active', attr: 'data-ohw-force-active' },
]

// For a :hover rule, generates a suppressor that freezes affected elements at their
// current computed values when hovered without [data-ohw-force-hover]. This prevents
// the native :hover CSS from firing in edit mode without touching the template CSS.
function buildHoverSuppressor(rule: CSSStyleRule): string | null {
  const props: string[] = []
  for (let i = 0; i < rule.style.length; i++) props.push(rule.style.item(i))
  if (props.length === 0) return null

  const suppressorSelectors: string[] = []
  for (const sel of rule.selectorText.split(',').map(s => s.trim())) {
    if (!sel.includes(':hover')) continue
    const idx = sel.indexOf(':hover')
    suppressorSelectors.push(
      sel.slice(0, idx) + '[data-ohw-editable-state]:not([data-ohw-force-hover])' + sel.slice(idx)
    )
  }
  if (suppressorSelectors.length === 0) return null

  // Find a live element matching the descendant part to read its base computed values.
  // collectStateRules() runs at init / route-change, before the cursor is over any card,
  // so getComputedStyle reflects the non-hover (base) state.
  const firstSel = rule.selectorText.split(',')[0].trim()
  const hoverIdx = firstSel.indexOf(':hover')
  const descendantPart = firstSel.slice(hoverIdx + ':hover'.length).trim()
  let targetEl: Element | null = null
  try {
    targetEl = descendantPart
      ? document.querySelector(`[data-ohw-editable-state] ${descendantPart}`)
      : document.querySelector('[data-ohw-editable-state]')
  } catch { return null }
  if (!targetEl) return null

  const cs = getComputedStyle(targetEl as HTMLElement)
  const decls = props.map(p => `${p}: ${cs.getPropertyValue(p)} !important`).join('; ')
  return `${suppressorSelectors.join(', ')} { ${decls} }`
}

// Reads pseudo-state rules from the page's own stylesheets and returns:
// 1. [data-ohw-force-*] activator rules (replace :hover/:focus etc. with the force attribute)
// 2. :hover suppressor rules (lock base computed values so native hover can't fire in edit mode)
// Template CSS needs no modifications — the bridge handles suppression automatically.
function collectStateRules(): string {
  const lines: string[] = []
  function processRules(rules: CSSRuleList) {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) {
        let text = rule.cssText
        let matched = false
        for (const { pseudo, attr } of FORCE_PSEUDO_STATES) {
          if (text.includes(pseudo)) {
            text = text.replace(new RegExp(pseudo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w-])', 'g'), `[${attr}]`)
            if (pseudo === ':hover') {
              const suppressor = buildHoverSuppressor(rule)
              if (suppressor) lines.push(suppressor)
            }
            matched = true
          }
        }
        if (matched) lines.push(text)
      } else if ('cssRules' in rule) {
        processRules((rule as CSSMediaRule).cssRules)
      }
    }
  }
  for (const sheet of Array.from(document.styleSheets)) {
    try { processRules(sheet.cssRules) } catch { /* cross-origin — skip */ }
  }
  return lines.join('\n')
}

const SAFE_TAGS = new Set([
  'B', 'I', 'U', 'S', 'STRIKE', 'STRONG', 'EM', 'BR', 'P', 'DIV', 'SPAN', 'OL', 'UL', 'LI',
])

function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html')
  function walk(parent: Element) {
    for (const child of Array.from(parent.childNodes)) {
      if (child.nodeType !== Node.ELEMENT_NODE) continue
      const el = child as Element
      if (!SAFE_TAGS.has(el.tagName)) {
        parent.replaceChild(document.createTextNode(el.textContent ?? ''), el)
      } else {
        const textAlign = (el as HTMLElement).style?.textAlign || el.getAttribute('align') || ''
        for (const attr of Array.from(el.attributes)) el.removeAttribute(attr.name)
        if (textAlign) (el as HTMLElement).style.textAlign = textAlign
        walk(el)
      }
    }
  }
  walk(doc.body)
  return doc.body.innerHTML
}

const ICONS: Record<string, string> = {
  bold: '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>',
  italic: '<line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>',
  underline: '<path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/>',
  strikeThrough: '<path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/>',
  justifyLeft: '<line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/>',
  justifyCenter: '<line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="7" y2="12"/><line x1="19" y1="18" x2="5" y2="18"/>',
  justifyRight: '<line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/>',
  insertUnorderedList:
    '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>' +
    '<line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  insertOrderedList:
    '<line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>' +
    '<path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
}

const TOOLBAR_GROUPS: Array<Array<{ cmd: string; title: string }>> = [
  [
    { cmd: 'bold', title: 'Bold' },
    { cmd: 'italic', title: 'Italic' },
    { cmd: 'underline', title: 'Underline' },
    { cmd: 'strikeThrough', title: 'Strikethrough' },
  ],
  [
    { cmd: 'justifyLeft', title: 'Align Left' },
    { cmd: 'justifyCenter', title: 'Align Center' },
    { cmd: 'justifyRight', title: 'Align Right' },
  ],
  [
    { cmd: 'insertUnorderedList', title: 'Bullet List' },
    { cmd: 'insertOrderedList', title: 'Numbered List' },
  ],
]

function GlowFrame({ rect }: { rect: DOMRect }) {
  const GAP = 6
  return (
    <div
      style={{
        position: 'fixed',
        top: rect.top - GAP,
        left: rect.left - GAP,
        width: rect.width + GAP * 2,
        height: rect.height + GAP * 2,
        border: '2px solid #0885FE',
        borderRadius: 8,
        boxShadow: '0 0 0 4px rgba(8, 133, 254, 0.12)',
        pointerEvents: 'none',
        zIndex: 2147483646,
      }}
    />
  )
}

function FloatingToolbar({
  rect,
  onCommand,
  activeCommands,
}: {
  rect: DOMRect
  onCommand: (cmd: string) => void
  activeCommands: Set<string>
}) {
  const GAP = 8
  const APPROX_H = 36
  // Estimated toolbar width (9 buttons × 28px + 2 separators × 1px + 10 gaps × 6px + 8px padding ≈ 330px)
  const APPROX_W = 330
  const spaceAbove = rect.top
  const spaceBelow = window.innerHeight - rect.bottom
  const fitsAbove = spaceAbove >= APPROX_H + GAP
  const fitsBelow = spaceBelow >= APPROX_H + GAP

  let anchorTop: number
  let transform: string
  if (fitsAbove) {
    anchorTop = rect.top - GAP
    transform = 'translateX(-50%) translateY(-100%)'
  } else if (fitsBelow) {
    anchorTop = rect.bottom + GAP
    transform = 'translateX(-50%)'
  } else {
    anchorTop = spaceAbove >= spaceBelow ? GAP : window.innerHeight - APPROX_H - GAP
    transform = 'translateX(-50%)'
  }

  // Clamp so the full toolbar width stays in the viewport — shifts left/right near edges
  const rawLeft = rect.left + rect.width / 2
  const anchorLeft = Math.max(GAP + APPROX_W / 2, Math.min(rawLeft, window.innerWidth - GAP - APPROX_W / 2))

  return (
    <div
      data-ohw-toolbar=""
      style={{
        position: 'fixed',
        top: anchorTop,
        left: anchorLeft,
        transform,
        zIndex: 2147483647,
        background: '#fff',
        border: '1px solid #E7E5E4',
        borderRadius: 6,
        boxShadow: '0px 2px 4px -2px rgba(0,0,0,.1),0px 4px 6px -1px rgba(0,0,0,.1)',
        display: 'flex',
        alignItems: 'center',
        padding: 4,
        gap: 6,
        fontFamily: 'sans-serif',
        pointerEvents: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      {TOOLBAR_GROUPS.map((btns, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && (
            <span style={{ display: 'block', width: 1, height: 24, background: '#E7E5E4', flexShrink: 0 }} />
          )}
          {btns.map((btn) => {
            const isActive = activeCommands.has(btn.cmd)
            return (
              <button
                key={btn.cmd}
                title={btn.title}
                onMouseDown={(e) => { e.preventDefault(); onCommand(btn.cmd) }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = '#F5F5F4'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: isActive ? PRIMARY : 'transparent',
                  borderRadius: 4,
                  cursor: 'pointer',
                  color: isActive ? '#FFFFFF' : '#1C1917',
                  flexShrink: 0,
                  padding: 6,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isActive ? '#FFFFFF' : '#1C1917'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={isActive && gi > 0 ? { filter: 'drop-shadow(0 0 0.5px #fff)' } : undefined}
                  dangerouslySetInnerHTML={{ __html: ICONS[btn.cmd] }}
                />
              </button>
            )
          })}
        </React.Fragment>
      ))}
    </div>
  )
}

const TOGGLE_BTN_BASE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 10px',
  height: 28,
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 13,
  fontWeight: 500,
  color: '#0C0A09',
  whiteSpace: 'nowrap',
  transition: 'opacity 120ms, background 120ms, box-shadow 120ms',
}

function StateToggle({
  rect,
  isLocked,
  onDefault,
  onHover,
}: {
  rect: DOMRect
  isLocked: boolean
  onDefault: () => void
  onHover: () => void
}) {
  return createPortal(
    <div
      data-ohw-state-toggle=""
      style={{
        position: 'fixed',
        top: rect.top + 8,
        left: rect.right - 8,
        transform: 'translateX(-100%)',
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 4,
        background: '#F5F5F4',
        borderRadius: 6,
        boxShadow: '0px 1px 3px rgba(0,0,0,.1),0px 1px 2px rgba(0,0,0,.06)',
        pointerEvents: 'auto',
      }}
    >
      <button
        onMouseDown={(e) => { e.preventDefault(); onDefault() }}
        style={{
          ...TOGGLE_BTN_BASE,
          background: !isLocked ? '#FFFFFF' : 'transparent',
          opacity: !isLocked ? 1 : 0.5,
          boxShadow: !isLocked ? '0px 1px 2px rgba(0,0,0,.08)' : 'none',
        }}
      >
        Default
      </button>
      <button
        onMouseDown={(e) => { e.preventDefault(); onHover() }}
        style={{
          ...TOGGLE_BTN_BASE,
          background: isLocked ? '#FFFFFF' : 'transparent',
          opacity: isLocked ? 1 : 0.5,
          boxShadow: isLocked ? '0px 1px 2px rgba(0,0,0,.08)' : 'none',
        }}
      >
        Hover
      </button>
    </div>,
    document.body,
  )
}

const contentCache = new Map<string, Record<string, string>>()

export function OhhwellsBridge() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEditMode = isEditSessionActive()

  const subdomainFromQuery = searchParams.get('subdomain')
  const subdomain = subdomainFromQuery ?? (() => {
    if (typeof window === 'undefined') return ''
    const parts = window.location.hostname.split('.')
    // e.g. rebound-local-vl5l.ohhwells.site → ['rebound-local-vl5l', 'ohhwells', 'site']
    return parts.length >= 3 && parts[0] !== 'www' ? parts[0] : ''
  })()

  const postToParent = useCallback((data: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      window.parent.postMessage(data, '*')
    }
  }, [])

  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'done'>('idle')
  const autoSaveTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const activeElRef = useRef<HTMLElement | null>(null)
  const originalContentRef = useRef<string | null>(null)
  const activeStateElRef = useRef<HTMLElement | null>(null)
  const hoveredImageRef = useRef<HTMLElement | null>(null)
  const editStylesRef = useRef<{ base: HTMLStyleElement; forceHover: HTMLStyleElement } | null>(null)
  const activateRef = useRef<(el: HTMLElement) => void>(() => {})
  const deactivateRef = useRef<() => void>(() => {})
  const refreshActiveCommandsRef = useRef<() => void>(() => {})
  const postToParentRef = useRef(postToParent)
  postToParentRef.current = postToParent

  const [toolbarRect, setToolbarRect] = useState<DOMRect | null>(null)
  const [toggleState, setToggleState] = useState<{ rect: DOMRect; isLocked: boolean } | null>(null)
  const [maxBadge, setMaxBadge] = useState<{ rect: DOMRect; current: number; max: number } | null>(null)
  const [activeCommands, setActiveCommands] = useState<Set<string>>(new Set())

  const refreshStateRules = useCallback(() => {
    editStylesRef.current?.forceHover &&
      (editStylesRef.current.forceHover.textContent = collectStateRules())
  }, [])

  const deactivate = useCallback(() => {
    const el = activeElRef.current
    if (!el) return
    el.removeAttribute('contenteditable')
    activeElRef.current = null
    setToolbarRect(null)
    setMaxBadge(null)
    setActiveCommands(new Set())
    postToParent({ type: 'ow:exit-edit' })
  }, [postToParent])

  const activate = useCallback((el: HTMLElement) => {
    if (activeElRef.current === el) return
    deactivate()
    el.setAttribute('contenteditable', 'true')
    el.removeAttribute('data-ohw-hovered')
    activeElRef.current = el
    originalContentRef.current = el.innerHTML
    el.focus()
    setToolbarRect(el.getBoundingClientRect())
    postToParent({ type: 'ow:enter-edit', key: el.dataset.ohwKey })
    // selectionchange timing varies by browser — refresh after the frame to guarantee
    // active toolbar commands reflect the cursor state on the very first click.
    requestAnimationFrame(() => refreshActiveCommandsRef.current())
  }, [deactivate, postToParent])

  activateRef.current = activate
  deactivateRef.current = deactivate

  // Fetch saved content once per subdomain (cached in module-level Map so remounts are free).
  // In edit mode, hydration comes from the canvas editor via ow:hydrate — skip the public fetch.
  useLayoutEffect(() => {
    if (!subdomain || isEditMode) {
      setFetchState('done')
      return
    }

    const applyContent = (content: Record<string, string>): Promise<void> => {
      const imageLoads: Promise<void>[] = []
      for (const [key, val] of Object.entries(content)) {
        document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
          if (el.dataset.ohwEditable === 'image') {
            const img = el instanceof HTMLImageElement ? el : el.querySelector<HTMLImageElement>('img')
            if (img && img.src !== val) {
              img.src = val
              imageLoads.push(new Promise<void>((resolve) => {
                img.onload = () => resolve()
                img.onerror = () => resolve()
              }))
            }
          } else if (el.dataset.ohwEditable === 'bg-image') {
            const next = `url('${val}')`
            if (el.style.backgroundImage !== next) el.style.backgroundImage = next
          } else if (el.innerHTML !== val) {
            el.innerHTML = val
          }
        })
      }
      return imageLoads.length > 0 ? Promise.all(imageLoads).then(() => {}) : Promise.resolve()
    }

    const cached = contentCache.get(subdomain)
    if (cached) {
      applyContent(cached).finally(() => setFetchState('done'))
      return
    }

    let cancelled = false
    setFetchState('loading')
    const apiUrl = process.env.NEXT_PUBLIC_FLOWOPS_API_URL ?? 'http://localhost:4005'
    fetch(`${apiUrl}/api/public/sites/${subdomain}/content`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return
        const content = (data?.content as Record<string, string>) ?? {}
        contentCache.set(subdomain, content)
        return applyContent(content)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setFetchState('done')
      })

    return () => { cancelled = true }
  }, [subdomain, isEditMode, pathname])

  // Re-apply cached content whenever new DOM nodes appear (handles Next.js page navigation
  // where page elements commit after the fetch effect already ran).
  useEffect(() => {
    if (!subdomain || isEditMode) return

    const applyFromCache = () => {
      const content = contentCache.get(subdomain)
      if (!content) return
      for (const [key, val] of Object.entries(content)) {
        document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
          if (el.dataset.ohwEditable === 'image') {
            const img = el instanceof HTMLImageElement ? el : el.querySelector<HTMLImageElement>('img')
            if (img && img.src !== val) img.src = val
          } else if (el.dataset.ohwEditable === 'bg-image') {
            const next = `url('${val}')`
            if (el.style.backgroundImage !== next) el.style.backgroundImage = next
          } else if (el.innerHTML !== val) {
            el.innerHTML = val
          }
        })
      }
    }

    applyFromCache()
    const observer = new MutationObserver(applyFromCache)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [subdomain, isEditMode])

  // Toggle the layout loader (React-owned DOM — never remove it imperatively)
  useLayoutEffect(() => {
    const el = document.getElementById('ohw-loader')
    if (!el) return
    const visible = Boolean(subdomain) && fetchState !== 'done'
    el.style.display = visible ? 'flex' : 'none'
  }, [subdomain, fetchState])

  // Navigation sync — always active when embedded
  useEffect(() => {
    postToParent({ type: 'ow:navigation', path: pathname })
  }, [pathname, postToParent])

  // Report full document height so the parent can size the iframe to content (edit mode only).
  // Uses document.body.scrollHeight — more reliable than documentElement when html has overflow quirks.
  // Listens for WIDTH changes only (desktop↔mobile switch re-lays out content at a different height).
  // Height-only resize events (parent setting iframeHeight) are intentionally ignored to prevent loops.
  useEffect(() => {
    if (!isEditMode) return

    const measure = () => {
      const h = document.body.scrollHeight
      if (h > 50) postToParent({ type: 'ow:height', height: h })
    }

    const t1 = setTimeout(measure, 50)
    const t2 = setTimeout(measure, 500)

    let lastWidth = window.innerWidth
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(measure, 150)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [pathname, isEditMode, postToParent])

  // Preserve ?subdomain on internal navigation when using query-param mode (not hostname mode)
  useEffect(() => {
    if (!subdomainFromQuery || isEditMode) return

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a')
      if (!anchor || anchor.target === '_blank' || e.defaultPrevented) return

      const href = anchor.getAttribute('href')
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return

      const url = new URL(href, window.location.origin)
      if (url.searchParams.has('subdomain')) return

      e.preventDefault()
      url.searchParams.set('subdomain', subdomainFromQuery)
      router.push(url.pathname + url.search)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [subdomainFromQuery, isEditMode, router])

  // Edit mode bridge — listeners stay mounted; only tear down when leaving edit mode
  useEffect(() => {
    if (!isEditMode) {
      editStylesRef.current?.base.remove()
      editStylesRef.current?.forceHover.remove()
      editStylesRef.current = null
      return
    }

    if (!editStylesRef.current) {
      // Capture the initial iframe viewport height before the parent adjusts it.
      // Freezing min-h-screen / h-screen to this px value lets hero sections keep their
      // full-viewport design while preventing the 100vh feedback loop when the iframe grows.
      const initialVh = window.innerHeight
      const base = document.createElement('style')
      base.setAttribute('data-ohw-edit-style', '')
      base.textContent = `
      html { height: auto !important; }
      body { height: auto !important; min-height: 0 !important; overflow: hidden !important; }
      .min-h-screen, .min-h-svh, .min-h-dvh { min-height: ${initialVh}px !important; }
      .h-screen, .h-svh, .h-dvh { height: ${initialVh}px !important; }
      [style*="100vh"] { min-height: ${initialVh}px !important; height: ${initialVh}px !important; }
      [style*="100svh"] { min-height: ${initialVh}px !important; height: ${initialVh}px !important; }
      [style*="100dvh"] { min-height: ${initialVh}px !important; height: ${initialVh}px !important; }
      [data-ohw-editable] {
        display: block;
      }
      [data-ohw-editable]:not([contenteditable]):not([data-ohw-editable="image"]):not([data-ohw-editable="bg-image"]) { cursor: text !important; }
      [data-ohw-editable="image"], [data-ohw-editable="image"] *,
      [data-ohw-editable="bg-image"], [data-ohw-editable="bg-image"] * { cursor: pointer !important; }
      [data-ohw-hovered]:not([contenteditable]) {
        outline: 2px dashed ${PRIMARY} !important;
        outline-offset: 4px;
        border-radius: 2px;
      }
      [data-ohw-editable][contenteditable] {
        outline: none !important;
        caret-color: ${PRIMARY};
        cursor: text !important;
      }
      [data-ohw-editable][contenteditable]::selection,
      [data-ohw-editable][contenteditable] *::selection { background: ${PRIMARY}59 !important; }
      [data-ohw-editable-state], [data-ohw-editable-state] * { pointer-events: none !important; }
      [data-ohw-editable-state][data-ohw-force-hover] [data-ohw-editable] { pointer-events: auto !important; }
    `
      const forceHover = document.createElement('style')
      forceHover.setAttribute('data-ohw-force-hover-style', '')
      document.head.appendChild(base)
      document.head.appendChild(forceHover)
      editStylesRef.current = { base, forceHover }
    }

    refreshStateRules()

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-ohw-toolbar]')) return
      if (target.closest('[data-ohw-state-toggle]')) return
      if (target.closest('[data-ohw-max-badge]')) return

      const editable = target.closest<HTMLElement>('[data-ohw-editable]')
      if (editable) {
        if (editable.dataset.ohwEditable === 'image' || editable.dataset.ohwEditable === 'bg-image') {
          e.preventDefault()
          postToParentRef.current({ type: 'ow:image-pick', key: editable.dataset.ohwKey ?? '' })
          return
        }
        e.preventDefault()
        activateRef.current(editable)
        return
      }

      // Don't deactivate if user drag-selected text from inside the editable to outside
      if (activeElRef.current) {
        const sel = window.getSelection()
        if (sel && !sel.isCollapsed) {
          const range = sel.getRangeAt(0)
          if (activeElRef.current.contains(range.commonAncestorContainer)) return
        }
      }

      const anchor = target.closest('a')
      if (anchor) e.preventDefault()

      deactivateRef.current()
    }

    const handleMouseOver = (e: MouseEvent) => {
      const editable = (e.target as HTMLElement).closest<HTMLElement>('[data-ohw-editable]')
      if (!editable) return
      if (editable.dataset.ohwEditable !== 'image' && editable.dataset.ohwEditable !== 'bg-image' && !editable.hasAttribute('contenteditable')) {
        editable.setAttribute('data-ohw-hovered', '')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const editable = (e.target as HTMLElement).closest<HTMLElement>('[data-ohw-editable]')
      if (!editable) return
      if (editable.dataset.ohwEditable !== 'image' && editable.dataset.ohwEditable !== 'bg-image') {
        editable.removeAttribute('data-ohw-hovered')
      }
    }

    // Parent canvas editor sends root-viewport coords via ow:pointer-sync; in-iframe mouse events are local.
    const toProbeCoords = (clientX: number, clientY: number, fromParentViewport: boolean) => {
      if (!fromParentViewport) return { x: clientX, y: clientY }
      const frame = window.frameElement as HTMLElement | null
      if (!frame) return { x: clientX, y: clientY }
      const fr = frame.getBoundingClientRect()
      return {
        x: clientX - fr.left - frame.clientLeft,
        y: clientY - fr.top - frame.clientTop,
      }
    }

    const uploadLockedTracks = new Set<HTMLElement>()

    const resumeAnimTracks = () => {
      document.querySelectorAll<HTMLElement>('[data-ohw-hover-paused]').forEach((el) => {
        if (!uploadLockedTracks.has(el)) el.removeAttribute('data-ohw-hover-paused')
      })
    }

    // Returns the element's rect clipped to any overflow-hidden/clip ancestor boundaries.
    // Needed when an image (e.g. height:auto logo) overflows a fixed-height container.
    const getVisibleRect = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      let top = r.top, left = r.left, bottom = r.bottom, right = r.right
      let parent = el.parentElement
      while (parent) {
        const style = getComputedStyle(parent)
        if (style.overflowY === 'hidden' || style.overflowY === 'clip' || style.overflowX === 'hidden' || style.overflowX === 'clip') {
          const pr = parent.getBoundingClientRect()
          top = Math.max(top, pr.top)
          bottom = Math.min(bottom, pr.bottom)
          left = Math.max(left, pr.left)
          right = Math.min(right, pr.right)
        }
        if (parent === document.documentElement) break
        parent = parent.parentElement
      }
      return { top, left, width: Math.max(0, right - left), height: Math.max(0, bottom - top) }
    }

    const postImageHover = (imgEl: HTMLElement, isDragOver = false) => {
      const r = getVisibleRect(imgEl)
      postToParentRef.current({
        type: 'ow:image-hover',
        key: imgEl.dataset.ohwKey ?? '',
        rect: { top: r.top, left: r.left, width: r.width, height: r.height },
        ...(isDragOver ? { isDragOver: true } : {}),
      })
      const track = imgEl.closest<HTMLElement>('[data-ohw-hover-pause]')
      if (track) track.setAttribute('data-ohw-hover-paused', '')
    }

    // Bbox hit-test works with pointer-events:none on hover-card children; elementFromPoint does not.
    const findImageAtPoint = (clientX: number, clientY: number, fromParentViewport: boolean) => {
      const { x, y } = toProbeCoords(clientX, clientY, fromParentViewport)
      const images = Array.from(document.querySelectorAll<HTMLElement>('[data-ohw-editable="image"], [data-ohw-editable="bg-image"]'))
      const matches: HTMLElement[] = []
      for (let i = images.length - 1; i >= 0; i--) {
        const el = images[i]

        // State-aware filtering: only offer Replace for media that belongs to the active card state.
        // data-ohw-state="default" → only in default (non-hover) editing
        // data-ohw-state="hover"   → only in hover editing (data-ohw-force-hover active)
        // When the image element IS the hover-card itself (base media), treat it as state="default".
        const ownerCard = el.closest<HTMLElement>('[data-ohw-editable-state]')
        if (ownerCard) {
          const inHoverState = ownerCard.hasAttribute('data-ohw-force-hover')
          const elState = el.dataset.ohwState
          if (el === ownerCard && inHoverState) continue
          if (elState === 'default' && inHoverState) continue
          if (elState === 'hover' && !inHoverState) continue
        }

        const r = getVisibleRect(el)
        if (x >= r.left && x <= r.left + r.width && y >= r.top && y <= r.top + r.height) matches.push(el)
      }
      if (matches.length === 0) return null
      // Prefer explicit <img>-type elements over bg-image sections when both overlap at the cursor.
      // A logo image (e.g. 1100×1107) can be larger by area than its bg-image container (1823×280),
      // so pure smallest-area would wrongly pick the container. Type priority fixes this.
      const imageTypeMatches = matches.filter(el => el.dataset.ohwEditable === 'image')
      const candidatePool = imageTypeMatches.length > 0 ? imageTypeMatches : matches
      const smallest = candidatePool.reduce((best, el) => {
        const br = getVisibleRect(best)
        const er = getVisibleRect(el)
        return er.width * er.height < br.width * br.height ? el : best
      })
      const pinned = hoveredImageRef.current
      // Only apply sticky if the pinned element is in the same candidate pool.
      // If pinned is a bg-image but there are now image-type matches, skip sticky so
      // the more specific image-type element is returned.
      if (pinned && candidatePool.includes(pinned)) {
        const pr = getVisibleRect(pinned)
        const stickyPad = 48
        const withinPad =
          x >= pr.left - stickyPad &&
          x <= pr.left + pr.width + stickyPad &&
          y >= pr.top - stickyPad &&
          y <= pr.top + pr.height + stickyPad
        // Keep pinned while cursor is near it so moving toward the Replace button doesn't switch
        // to a larger parent (e.g., logo → bg-image). Yield only if a genuinely smaller element
        // is actually hit (user has moved onto a distinct, more specific image).
        if (withinPad) {
          const yieldToSmaller =
            smallest !== pinned &&
            candidatePool.includes(smallest) &&
            (() => {
              const sr = getVisibleRect(smallest)
              const pr2 = getVisibleRect(pinned)
              return sr.width * sr.height < pr2.width * pr2.height
            })()
          if (!yieldToSmaller) return pinned
        }
      }
      return smallest
    }



    const probeImageAt = (
      clientX: number,
      clientY: number,
      isDragOver = false,
      fromParentViewport = false,
      fromOverlay = false,
    ) => {
      // If the cursor is over the state toggle, hide the image overlay so the toggle is clickable.
      const toggleEl = document.querySelector('[data-ohw-state-toggle]')
      if (toggleEl) {
        const { x, y } = toProbeCoords(clientX, clientY, fromParentViewport)
        const tr = toggleEl.getBoundingClientRect()
        if (x >= tr.left && x <= tr.right && y >= tr.top && y <= tr.bottom) {
          if (hoveredImageRef.current) {
            hoveredImageRef.current = null
            resumeAnimTracks()
            postToParentRef.current({ type: 'ow:image-unhover' })
          }
          return
        }
      }
      const imgEl = findImageAtPoint(clientX, clientY, fromParentViewport)

      if (imgEl) {
        // If a text editable is rendered on top of the image at the cursor position, text has priority.
        const { x, y } = toProbeCoords(clientX, clientY, fromParentViewport)
        const topEl = document.elementFromPoint(x, y) as HTMLElement | null

        // Floating text toolbar sits over the hero — same priority as text (dismiss image overlay).
        if (topEl?.closest('[data-ohw-toolbar]')) {
          if (hoveredImageRef.current) {
            hoveredImageRef.current = null
            resumeAnimTracks()
            postToParentRef.current({ type: 'ow:image-unhover' })
          }
          return
        }

        const topEditable = topEl?.closest<HTMLElement>('[data-ohw-editable]')
        if (topEditable && topEditable.dataset.ohwEditable !== 'image' && topEditable.dataset.ohwEditable !== 'bg-image') {
          // Keep image hover ONLY when the probe came from the overlay button area,
          // so the overlay stays visible while the cursor is on/near the Replace button.
          if (topEditable.hasAttribute('contenteditable') && fromOverlay) return
          if (hoveredImageRef.current) {
            hoveredImageRef.current = null
            resumeAnimTracks()
            postToParentRef.current({ type: 'ow:image-unhover' })
          }
          document.querySelectorAll<HTMLElement>('[data-ohw-hovered]').forEach(el => el.removeAttribute('data-ohw-hovered'))
          topEditable.setAttribute('data-ohw-hovered', '')
          return
        }
        // CSS outline (2px + 4px offset = 6px outside border-box) isn't hit-tested by elementFromPoint.
        // If a text editable is currently showing its outline and cursor is in the outline fringe zone,
        // keep text priority so the image overlay doesn't bleed through.
        const activeHovered = document.querySelector<HTMLElement>('[data-ohw-hovered]')
        if (activeHovered) {
          const outlinePad = 8
          const hr = activeHovered.getBoundingClientRect()
          if (x >= hr.left - outlinePad && x <= hr.right + outlinePad && y >= hr.top - outlinePad && y <= hr.bottom + outlinePad) {
            if (hoveredImageRef.current) {
              hoveredImageRef.current = null
              resumeAnimTracks()
              postToParentRef.current({ type: 'ow:image-unhover' })
            }
            return
          }
        }
        document.querySelectorAll<HTMLElement>('[data-ohw-hovered]').forEach(el => el.removeAttribute('data-ohw-hovered'))
        if (imgEl !== hoveredImageRef.current) {
          hoveredImageRef.current = imgEl
          postImageHover(imgEl, isDragOver)
        } else if (isDragOver) {
          postImageHover(imgEl, true)
        }
      } else {
        const inIframeView =
          clientX >= 0 &&
          clientY >= 0 &&
          clientX <= window.innerWidth &&
          clientY <= window.innerHeight
        if (!inIframeView) return
        hoveredImageRef.current = null
        resumeAnimTracks()
        postToParentRef.current({ type: 'ow:image-unhover' })
      }
    }

    const probeHoverCardsAt = (clientX: number, clientY: number, fromParentViewport = false) => {
      const { x, y } = toProbeCoords(clientX, clientY, fromParentViewport)
      const toggleEl = document.querySelector('[data-ohw-state-toggle]')
      if (toggleEl) {
        const tr = toggleEl.getBoundingClientRect()
        if (x >= tr.left && x <= tr.right && y >= tr.top && y <= tr.bottom) {
          return
        }
      }

      const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-ohw-editable-state]'))
      const found = cards.find((card) => {
        const r = card.getBoundingClientRect()
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
      }) ?? null

      const currentLocked = activeStateElRef.current?.hasAttribute('data-ohw-force-hover')
        ? activeStateElRef.current
        : null
      const active = found ?? currentLocked

      activeStateElRef.current = active
      if (active) {
        setToggleState({ rect: active.getBoundingClientRect(), isLocked: active.hasAttribute('data-ohw-force-hover') })
      } else {
        setToggleState(null)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      probeImageAt(clientX, clientY)
      probeHoverCardsAt(clientX, clientY)
    }

    const handlePointerSync = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:pointer-sync') return
      const { clientX, clientY, fromOverlay } = e.data as { clientX?: number; clientY?: number; fromOverlay?: boolean }
      if (typeof clientX !== 'number' || typeof clientY !== 'number') return
      // Parent now sends iframe-local coords (clientX - iframeRect.left, clientY - iframeRect.top)
      // so we can call probeImageAt directly — no coordinate conversion needed, works cross-origin.
      // Pass fromOverlay through so the ce=true guard only fires while cursor is on the button.
      probeImageAt(clientX, clientY, false, false, fromOverlay ?? false)
      probeHoverCardsAt(clientX, clientY)
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      const el = findImageAtPoint(e.clientX, e.clientY, false)
      if (!el) {
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'none'
        return
      }
      e.dataTransfer!.dropEffect = 'copy'
      if (hoveredImageRef.current !== el) {
        hoveredImageRef.current = el
        postImageHover(el, true)
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      const imgEl = findImageAtPoint(e.clientX, e.clientY, false)
      if (imgEl) return
      hoveredImageRef.current = null
      resumeAnimTracks()
      postToParentRef.current({ type: 'ow:image-unhover' })
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const el = findImageAtPoint(e.clientX, e.clientY, false)
      if (!el) return
      const file = e.dataTransfer?.files?.[0]
      if (file) {
        if (file.type.startsWith('image/')) {
          const key = el.dataset.ohwKey ?? ''
          const { name, type: mimeType } = file
          const r = el.getBoundingClientRect()
          const rect = { top: r.top, left: r.left, width: r.width, height: r.height }
          // File byte content does not survive postMessage structured-clone — read it first
          // then transfer the ArrayBuffer directly (which is a proper Transferable).
          file.arrayBuffer().then((buf) => {
            window.parent.postMessage({ type: 'ow:image-drop', key, name, mimeType, buf, rect }, '*', [buf])
          })
        } else {
          postToParentRef.current({ type: 'ow:image-drop-invalid' })
        }
      }
      hoveredImageRef.current = null
      resumeAnimTracks()
      postToParentRef.current({ type: 'ow:image-unhover' })
    }

    const handleImageUrl = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:image-url') return
      const { key, url } = e.data as { key: string; url: string }
      let notified = false
      const notify = () => {
        if (notified) return
        notified = true
        document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
          const track = el.closest<HTMLElement>('[data-ohw-hover-pause]')
          if (track) {
            uploadLockedTracks.delete(track)
            const stillHovered = hoveredImageRef.current && track.contains(hoveredImageRef.current)
            if (!stillHovered) track.removeAttribute('data-ohw-hover-paused')
          }
        })
        // Reset so the next pointer-sync probe re-fires ow:image-hover for this element.
        hoveredImageRef.current = null
        postToParentRef.current({ type: 'ow:image-loaded', key })
      }
      let found = false
      document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
        const track = el.closest<HTMLElement>('[data-ohw-hover-pause]')
        if (track) {
          track.setAttribute('data-ohw-hover-paused', '')
        }
        if (el.dataset.ohwEditable === 'bg-image') {
          found = true
          const fadeTarget = el
          const preload = new Image()
          preload.onload = () => fadeInBgImage(fadeTarget, url, notify)
          preload.onerror = () => {
            fadeTarget.style.backgroundImage = `url('${url}')`
            notify()
          }
          preload.src = url
        } else if (el.dataset.ohwEditable === 'image') {
          const img = el instanceof HTMLImageElement ? el : el.querySelector<HTMLImageElement>('img')
          if (img) {
            found = true
            img.style.opacity = '0'
            const onReady = () => {
              img.onload = null
              img.onerror = null
              fadeInImageElement(img, notify)
            }
            img.onload = onReady
            img.onerror = onReady
            img.src = url
            if (img.complete && img.naturalWidth > 0) {
              requestAnimationFrame(() => onReady())
            }
          }
        }
      })
      if (!found) notify()
    }

    const handlePaste = (e: ClipboardEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-ohw-editable]')
      if (!el) return
      e.preventDefault()
      const text = e.clipboardData?.getData('text/plain') ?? ''
      const maxLen = el.dataset.ohwMaxLength ? parseInt(el.dataset.ohwMaxLength, 10) : null
      if (maxLen) {
        const current = el.innerText.replace(/\n$/, '').length
        const remaining = Math.max(0, maxLen - current)
        document.execCommand('insertText', false, text.slice(0, remaining))
      } else {
        document.execCommand('insertText', false, text)
      }
    }

    const handleInput = (e: Event) => {
      const el = e.target as HTMLElement
      const key = el.dataset.ohwKey
      if (!key) return

      if (el === activeElRef.current) setToolbarRect(el.getBoundingClientRect())

      const maxLen = el.dataset.ohwMaxLength ? parseInt(el.dataset.ohwMaxLength, 10) : null
      if (maxLen) {
        const current = el.innerText.replace(/\n$/, '').length
        if (current > maxLen) {
          const sel = window.getSelection()
          const range = sel?.getRangeAt(0)
          const offset = range?.startOffset ?? 0
          el.innerText = el.innerText.replace(/\n$/, '').slice(0, maxLen)
          const textNode = el.firstChild
          if (textNode && sel && range) {
            const newRange = document.createRange()
            newRange.setStart(textNode, Math.min(offset - (current - maxLen), maxLen))
            newRange.collapse(true)
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
        setMaxBadge({ rect: el.getBoundingClientRect(), current: Math.min(current, maxLen), max: maxLen })
      }

      const html = sanitizeHtml(el.innerHTML)
      document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((sibling) => {
        if (sibling !== el) sibling.innerHTML = html
      })

      const timers = autoSaveTimers.current
      const existing = timers.get(key)
      if (existing) clearTimeout(existing)
      timers.set(key, setTimeout(() => {
        timers.delete(key)
        postToParentRef.current({ type: 'ow:change', nodes: [{ key, text: html }] })
        // Re-measure height after content changes (Enter key etc. may grow the page)
        const h = document.documentElement.scrollHeight
        if (h > 50) postToParentRef.current({ type: 'ow:height', height: h })
      }, 400))
    }

    const handleHydrate = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:hydrate') return
      const content = e.data.content as Record<string, string> | undefined
      if (!content) return
      for (const [key, val] of Object.entries(content)) {
        document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
          if (el.dataset.ohwEditable === 'image') {
            const img = el instanceof HTMLImageElement ? el : el.querySelector<HTMLImageElement>('img')
            if (img) img.src = val
          } else if (el.dataset.ohwEditable === 'bg-image') {
            el.style.backgroundImage = `url('${val}')`
          } else {
            el.innerHTML = val
          }
        })
      }
      postToParentRef.current({ type: 'ow:hydrate-done' })
    }

    window.addEventListener('message', handleHydrate)

    const handleDeactivate = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:deactivate') return
      deactivateRef.current()
    }
    window.addEventListener('message', handleDeactivate)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const el = activeElRef.current
      if (el && originalContentRef.current !== null) {
        el.innerHTML = originalContentRef.current
        const key = el.dataset.ohwKey
        if (key) {
          postToParentRef.current({ type: 'ow:change', nodes: [{ key, text: originalContentRef.current }] })
        }
      }
      deactivateRef.current()
    }

    const handleScroll = () => {
      if (activeElRef.current) {
        const r = activeElRef.current.getBoundingClientRect()
        setToolbarRect(r)
        setMaxBadge((prev) => (prev ? { ...prev, rect: r } : null))
      }
      if (activeStateElRef.current) {
        const rect = activeStateElRef.current.getBoundingClientRect()
        setToggleState((prev) => (prev ? { ...prev, rect } : null))
      }
      if (hoveredImageRef.current) {
        const r = hoveredImageRef.current.getBoundingClientRect()
        postToParentRef.current({ type: 'ow:image-hover', key: hoveredImageRef.current.dataset.ohwKey ?? '',
          rect: { top: r.top, left: r.left, width: r.width, height: r.height } })
      }
    }

    const handleSave = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:save') return
      postToParentRef.current({ type: 'ow:save-result', nodes: collectEditableNodes() })
    }

    const handleSelectionChange = () => {
      if (!activeElRef.current) return
      const next = new Set<string>()

      // Toggle commands — queryCommandState is reliable for these
      for (const cmd of ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList']) {
        try { if (document.queryCommandState(cmd)) next.add(cmd) } catch { /* ignore */ }
      }

      // Alignment — queryCommandState('justifyLeft') returns true by default even when centered,
      // so derive it from computed textAlign on the selection's block element instead
      const sel = window.getSelection()
      const anchor = sel?.anchorNode
      if (anchor) {
        const el = anchor.nodeType === Node.TEXT_NODE ? anchor.parentElement : anchor as HTMLElement
        const block = el?.closest<HTMLElement>('div, p, h1, h2, h3, h4, h5, h6, li, td, th') ?? el
        if (block) {
          const align = getComputedStyle(block).textAlign
          if (align === 'center') next.add('justifyCenter')
          else if (align === 'right' || align === 'end') next.add('justifyRight')
          else next.add('justifyLeft')
        }
      }

      setActiveCommands(next)
    }

    refreshActiveCommandsRef.current = handleSelectionChange

    // Reset hover ref when cursor exits the iframe so re-entry over the same image re-fires ow:image-hover.
    // Do NOT post ow:image-unhover here — the parent's own mousemove handler clears the overlay,
    // and posting the message causes a race where the overlay flickers when cursor moves to the Replace button.
    const handleDocMouseLeave = () => {
      hoveredImageRef.current = null
    }

    const handleAnimLock = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:anim-lock') return
      const { key } = e.data as { key: string }
      document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
        const track = el.closest<HTMLElement>('[data-ohw-hover-pause]')
        if (track) {
          uploadLockedTracks.add(track)
          track.setAttribute('data-ohw-hover-paused', '')
        }
      })
    }

    const handleCanvasHeight = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:canvas-height' || typeof e.data.height !== 'number') return
      document.documentElement.style.setProperty('--ohw-canvas-h', `${e.data.height}px`)
    }

    window.addEventListener('message', handleSave)
    window.addEventListener('message', handleImageUrl)
    window.addEventListener('message', handleAnimLock)
    window.addEventListener('message', handleCanvasHeight)
    window.addEventListener('message', handlePointerSync)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('paste', handlePaste, true)
    document.addEventListener('input', handleInput, true)
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)
    document.addEventListener('mousemove', handleMouseMove, true)
    document.addEventListener('mouseleave', handleDocMouseLeave)
    document.addEventListener('dragover', handleDragOver, true)
    document.addEventListener('dragleave', handleDragLeave, true)
    document.addEventListener('drop', handleDrop, true)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectionchange', handleSelectionChange)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('paste', handlePaste, true)
      document.removeEventListener('input', handleInput, true)
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
      document.removeEventListener('mousemove', handleMouseMove, true)
      document.removeEventListener('mouseleave', handleDocMouseLeave)
      document.removeEventListener('dragover', handleDragOver, true)
      document.removeEventListener('dragleave', handleDragLeave, true)
      document.removeEventListener('drop', handleDrop, true)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectionchange', handleSelectionChange)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('message', handleSave)
      window.removeEventListener('message', handleImageUrl)
      window.removeEventListener('message', handleAnimLock)
      window.removeEventListener('message', handleCanvasHeight)
      window.removeEventListener('message', handlePointerSync)
      window.removeEventListener('message', handleHydrate)
      window.removeEventListener('message', handleDeactivate)
      autoSaveTimers.current.forEach(clearTimeout)
      autoSaveTimers.current.clear()
    }
  }, [isEditMode, refreshStateRules])

  // On route change: refresh hover CSS, reset card state, notify parent
  useEffect(() => {
    if (!isEditMode) return

    document.querySelectorAll('[data-ohw-force-hover]').forEach((el) => {
      el.removeAttribute('data-ohw-force-hover')
    })
    activeStateElRef.current = null
    setToggleState(null)
    refreshStateRules()

    const raf = requestAnimationFrame(() => refreshStateRules())
    const timer = setTimeout(() => {
      refreshStateRules()
      postToParent({ type: 'ow:ready', version: '1', nodes: collectEditableNodes() })
    }, 150)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [pathname, isEditMode, refreshStateRules, postToParent])

  const handleCommand = useCallback((cmd: string) => {
    document.execCommand(cmd, false)
    activeElRef.current?.focus()
    if (activeElRef.current) setToolbarRect(activeElRef.current.getBoundingClientRect())
    refreshActiveCommandsRef.current()
  }, [])

  const handleDefaultState = useCallback(() => {
    deactivate()
    if (!activeStateElRef.current) return
    activeStateElRef.current.removeAttribute('data-ohw-force-hover')
    setToggleState((prev) => (prev ? { ...prev, isLocked: false } : null))
  }, [deactivate])

  const handleHoverState = useCallback(() => {
    if (!activeStateElRef.current) return
    activeStateElRef.current.setAttribute('data-ohw-force-hover', '')
    setToggleState((prev) => (prev ? { ...prev, isLocked: true } : null))
  }, [])

  return (
    <>
      {toolbarRect && createPortal(
        <>
          <GlowFrame rect={toolbarRect} />
          <FloatingToolbar rect={toolbarRect} onCommand={handleCommand} activeCommands={activeCommands} />
        </>,
        document.body,
      )}
      {maxBadge && createPortal(
        <div
          data-ohw-max-badge=""
          style={{
            position: 'fixed',
            top: maxBadge.rect.bottom + 4,
            left: maxBadge.rect.right,
            transform: 'translateX(-100%)',
            zIndex: 2147483647,
            background: maxBadge.current > maxBadge.max ? '#FEF2F2' : '#F5F5F4',
            color: maxBadge.current > maxBadge.max ? '#DC2626' : '#78716C',
            border: `1px solid ${maxBadge.current > maxBadge.max ? '#FECACA' : '#E7E5E4'}`,
            borderRadius: 4,
            padding: '2px 6px',
            fontSize: 11,
            fontFamily: 'sans-serif',
            fontWeight: 500,
            pointerEvents: 'none',
          }}
        >
          {maxBadge.current}/{maxBadge.max}
        </div>,
        document.body,
      )}
      {toggleState && (
        <StateToggle
          rect={toggleState.rect}
          isLocked={toggleState.isLocked}
          onDefault={handleDefaultState}
          onHover={handleHoverState}
        />
      )}
    </>
  )
}
