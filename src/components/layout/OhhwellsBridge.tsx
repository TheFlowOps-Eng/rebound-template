'use client'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname, useSearchParams } from 'next/navigation'
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

function FloatingToolbar({ rect, onCommand }: { rect: DOMRect; onCommand: (cmd: string) => void }) {
  const GAP = 8
  const APPROX_H = 36
  const above = rect.top >= APPROX_H + GAP
  const anchorTop = above ? rect.top - GAP : rect.bottom + GAP
  const anchorLeft = Math.max(GAP, Math.min(rect.left + rect.width / 2, window.innerWidth - GAP))
  const transform = above ? 'translateX(-50%) translateY(-100%)' : 'translateX(-50%)'

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
          {btns.map((btn) => (
            <button
              key={btn.cmd}
              title={btn.title}
              onMouseDown={(e) => { e.preventDefault(); onCommand(btn.cmd) }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F5F5F4' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                borderRadius: 4,
                cursor: 'pointer',
                color: '#1C1917',
                flexShrink: 0,
                padding: 6,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: ICONS[btn.cmd] }}
              />
            </button>
          ))}
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

export function OhhwellsBridge() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const subdomain = searchParams.get('subdomain') ?? ''
  const isEditMode = isEditSessionActive()

  const postToParent = useCallback((data: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      window.parent.postMessage(data, '*')
    }
  }, [])

  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'done'>('idle')
  const autoSaveTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const activeElRef = useRef<HTMLElement | null>(null)
  const hoverCardRef = useRef<HTMLElement | null>(null)
  const editStylesRef = useRef<{ base: HTMLStyleElement; forceHover: HTMLStyleElement } | null>(null)
  const activateRef = useRef<(el: HTMLElement) => void>(() => {})
  const deactivateRef = useRef<() => void>(() => {})
  const postToParentRef = useRef(postToParent)
  postToParentRef.current = postToParent

  const [toolbarRect, setToolbarRect] = useState<DOMRect | null>(null)
  const [toggleState, setToggleState] = useState<{ rect: DOMRect; isLocked: boolean } | null>(null)

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
    postToParent({ type: 'ow:exit-edit' })
  }, [postToParent])

  const activate = useCallback((el: HTMLElement) => {
    if (activeElRef.current === el) return
    deactivate()
    el.setAttribute('contenteditable', 'true')
    el.removeAttribute('data-ohw-hovered')
    el.focus()
    activeElRef.current = el
    setToolbarRect(el.getBoundingClientRect())
    postToParent({ type: 'ow:enter-edit', key: el.dataset.ohwKey })
  }, [deactivate, postToParent])

  activateRef.current = activate
  deactivateRef.current = deactivate

  // Fetch saved content; loader hides when fetch completes (or when no subdomain)
  // In edit mode, hydration comes from the canvas editor via ow:hydrate — skip the public fetch.
  useLayoutEffect(() => {
    if (!subdomain || isEditMode) {
      setFetchState('done')
      return
    }

    let cancelled = false
    setFetchState('loading')
    const apiUrl = process.env.NEXT_PUBLIC_FLOWOPS_API_URL ?? 'http://localhost:4005'
    fetch(`${apiUrl}/api/public/sites/${subdomain}/content`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const content = data?.content as Record<string, string> | undefined
        if (content) {
          for (const [key, html] of Object.entries(content)) {
            document.querySelectorAll<HTMLElement>(`[data-ohw-key="${key}"]`).forEach((el) => {
              el.innerHTML = html
            })
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setFetchState('done')
      })

    return () => { cancelled = true }
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
      [data-ohw-editable]:not([contenteditable]) { cursor: text !important; }
      [data-ohw-hovered]:not([contenteditable]) {
        outline: 2px dashed #0885FE !important;
        outline-offset: 4px;
        border-radius: 2px;
      }
      [data-ohw-editable][contenteditable] {
        outline: 2px solid #0885FE !important;
        outline-offset: 4px;
        border-radius: 2px;
        box-shadow: 0 0 0 4px rgba(8,133,254,0.12) !important;
        caret-color: #0885FE;
      }
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

      const editable = target.closest<HTMLElement>('[data-ohw-editable]')
      if (editable) {
        e.preventDefault()
        activateRef.current(editable)
        return
      }

      const anchor = target.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href') ?? ''
        const isExternal = /^https?:\/\//.test(href) && !href.startsWith(window.location.origin)
        if (isExternal) e.preventDefault()
      }

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

    const handleInput = (e: Event) => {
      const el = e.target as HTMLElement
      const key = el.dataset.ohwKey
      if (!key) return
      const html = el.innerHTML
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
    }

    window.addEventListener('message', handleHydrate)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') deactivateRef.current()
    }

    const handleScroll = () => {
      if (activeElRef.current) setToolbarRect(activeElRef.current.getBoundingClientRect())
      if (hoverCardRef.current) {
        const rect = hoverCardRef.current.getBoundingClientRect()
        setToggleState((prev) => (prev ? { ...prev, rect } : null))
      }
    }

    const handleSave = (e: MessageEvent) => {
      if (e.data?.type !== 'ow:save') return
      postToParentRef.current({ type: 'ow:save-result', nodes: collectEditableNodes() })
    }

    window.addEventListener('message', handleSave)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('input', handleInput, true)
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)
    document.addEventListener('mousemove', handleMouseMove, true)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('input', handleInput, true)
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
      document.removeEventListener('mousemove', handleMouseMove, true)
      document.removeEventListener('keydown', handleKeyDown)
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
        <FloatingToolbar rect={toolbarRect} onCommand={handleCommand} />,
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
