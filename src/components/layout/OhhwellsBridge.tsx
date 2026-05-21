'use client'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { isEditSessionActive } from '@/lib/ohw-session-search'
type EditableNode = { key: string; type: string; text: string }


function collectEditableNodes(): EditableNode[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-ohw-editable]')).map((el) => ({
    key: el.dataset.ohwKey ?? '',
    type: el.dataset.ohwEditable ?? 'text',
    text: el.dataset.ohwEditable === 'plain' ? (el.innerText ?? '') : el.innerHTML,
  }))
}

// Reads all :hover rules from the page's own stylesheets and returns equivalent
// rules using [data-ohw-force-hover] — so the bridge never hardcodes any values.
function collectHoverRules(): string {
  const lines: string[] = []
  function processRules(rules: CSSRuleList) {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) {
        if (rule.selectorText.includes(':hover')) {
          lines.push(rule.cssText.replace(/:hover\b/g, '[data-ohw-force-hover]'))
        }
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
        for (const attr of Array.from(el.attributes)) el.removeAttribute(attr.name)
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
    // Block fills the entire viewport — pin to whichever edge is nearest
    anchorTop = spaceAbove >= spaceBelow ? GAP : window.innerHeight - APPROX_H - GAP
    transform = 'translateX(-50%)'
  }

  const anchorLeft = Math.max(GAP, Math.min(rect.left + rect.width / 2, window.innerWidth - GAP))

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
                  background: isActive ? '#0885FE' : 'transparent',
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
  const hoverCardRef = useRef<HTMLElement | null>(null)
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

  const refreshForceHoverRules = useCallback(() => {
    editStylesRef.current?.forceHover &&
      (editStylesRef.current.forceHover.textContent = collectHoverRules())
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

    const applyContent = (content: Record<string, string>) => {
      for (const [key, html] of Object.entries(content)) {
        document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
          if (el.innerHTML !== html) el.innerHTML = html
        })
      }
    }

    const cached = contentCache.get(subdomain)
    if (cached) {
      applyContent(cached)
      setFetchState('done')
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
        applyContent(content)
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
      for (const [key, html] of Object.entries(content)) {
        document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
          if (el.innerHTML !== html) el.innerHTML = html
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
      const base = document.createElement('style')
      base.setAttribute('data-ohw-edit-style', '')
      base.textContent = `
      [data-ohw-editable] {
        display: block;
      }
      [data-ohw-editable]:not([contenteditable]) { cursor: text !important; }
      [data-ohw-hovered]:not([contenteditable]) {
        outline: 2px dashed #0885FE !important;
        outline-offset: 4px;
        border-radius: 2px;
      }
      [data-ohw-editable][contenteditable] {
        outline: none !important;
        caret-color: #0885FE;
      }
      [data-ohw-editable][contenteditable]::selection,
      [data-ohw-editable][contenteditable] *::selection { background: rgba(8,133,254,0.35) !important; }
      [data-ohw-hover-card], [data-ohw-hover-card] * { pointer-events: none !important; }
      [data-ohw-hover-card][data-ohw-force-hover] [data-ohw-editable] { pointer-events: auto !important; }
    `
      const forceHover = document.createElement('style')
      forceHover.setAttribute('data-ohw-force-hover-style', '')
      document.head.appendChild(base)
      document.head.appendChild(forceHover)
      editStylesRef.current = { base, forceHover }
    }

    refreshForceHoverRules()

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-ohw-toolbar]')) return
      if (target.closest('[data-ohw-state-toggle]')) return
      if (target.closest('[data-ohw-max-badge]')) return

      const editable = target.closest<HTMLElement>('[data-ohw-editable]')
      if (editable) {
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
      if (editable && !editable.hasAttribute('contenteditable')) {
        editable.setAttribute('data-ohw-hovered', '')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const editable = (e.target as HTMLElement).closest<HTMLElement>('[data-ohw-editable]')
      if (editable) editable.removeAttribute('data-ohw-hovered')
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      const toggleEl = document.querySelector('[data-ohw-state-toggle]')
      if (toggleEl) {
        const tr = toggleEl.getBoundingClientRect()
        if (clientX >= tr.left && clientX <= tr.right && clientY >= tr.top && clientY <= tr.bottom) {
          return
        }
      }

      const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-ohw-hover-card]'))
      const found = cards.find((card) => {
        const r = card.getBoundingClientRect()
        return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom
      }) ?? null

      const currentLocked = hoverCardRef.current?.hasAttribute('data-ohw-force-hover')
        ? hoverCardRef.current
        : null
      const active = found ?? currentLocked

      hoverCardRef.current = active
      if (active) {
        setToggleState({ rect: active.getBoundingClientRect(), isLocked: active.hasAttribute('data-ohw-force-hover') })
      } else {
        setToggleState(null)
      }
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
      }, 400))
    }

    const handleHydrate = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:hydrate') return
      const content = e.data.content as Record<string, string> | undefined
      if (!content) return
      for (const [key, html] of Object.entries(content)) {
        document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
          el.innerHTML = html
        })
      }
      postToParentRef.current({ type: 'ow:hydrate-done' })
    }

    window.addEventListener('message', handleHydrate)

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
      if (hoverCardRef.current) {
        const rect = hoverCardRef.current.getBoundingClientRect()
        setToggleState((prev) => (prev ? { ...prev, rect } : null))
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

    window.addEventListener('message', handleSave)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('paste', handlePaste, true)
    document.addEventListener('input', handleInput, true)
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)
    document.addEventListener('mousemove', handleMouseMove, true)
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
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectionchange', handleSelectionChange)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('message', handleSave)
      window.removeEventListener('message', handleHydrate)
      autoSaveTimers.current.forEach(clearTimeout)
      autoSaveTimers.current.clear()
    }
  }, [isEditMode, refreshForceHoverRules])

  // On route change: refresh hover CSS, reset card state, notify parent
  useEffect(() => {
    if (!isEditMode) return

    document.querySelectorAll('[data-ohw-force-hover]').forEach((el) => {
      el.removeAttribute('data-ohw-force-hover')
    })
    hoverCardRef.current = null
    setToggleState(null)
    refreshForceHoverRules()

    const raf = requestAnimationFrame(() => refreshForceHoverRules())
    const timer = setTimeout(() => {
      refreshForceHoverRules()
      postToParent({ type: 'ow:ready', version: '1', nodes: collectEditableNodes() })
    }, 150)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [pathname, isEditMode, refreshForceHoverRules, postToParent])

  const handleCommand = useCallback((cmd: string) => {
    document.execCommand(cmd, false)
    activeElRef.current?.focus()
    if (activeElRef.current) setToolbarRect(activeElRef.current.getBoundingClientRect())
    refreshActiveCommandsRef.current()
  }, [])

  const handleDefaultState = useCallback(() => {
    deactivate()
    if (!hoverCardRef.current) return
    hoverCardRef.current.removeAttribute('data-ohw-force-hover')
    setToggleState((prev) => (prev ? { ...prev, isLocked: false } : null))
  }, [deactivate])

  const handleHoverState = useCallback(() => {
    if (!hoverCardRef.current) return
    hoverCardRef.current.setAttribute('data-ohw-force-hover', '')
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
