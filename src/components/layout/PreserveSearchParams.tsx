'use client'

import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isInternalHref, isModifiedClick, preserveSearchParams } from '@/lib/preserve-search-params'
import { readPreservedSearch } from '@/lib/ohw-session-search'

/**
 * Preserves search params on in-app navigations (canvas editor edit mode).
 * Edit-mode navigations use full page loads so the bridge re-inits like an iframe reload.
 */
export function PreserveSearchParams() {
  const pathname = usePathname()

  // Restore params when a soft nav lands without them (full load)
  useLayoutEffect(() => {
    const stored = readPreservedSearch()
    if (!stored || stored === '?') return
    if (window.location.search && window.location.search !== '?') return

    const next = `${pathname}${stored}`
    window.location.replace(next)
  }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || isModifiedClick(e)) return

      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor || anchor.target === '_blank') return

      const href = anchor.getAttribute('href')
      if (!href || !isInternalHref(href)) return

      const search = readPreservedSearch()
      if (!search || search === '?') return

      const next = preserveSearchParams(href, search)
      if (next === href) return

      const base = window.location.origin
      const target = new URL(next, base)
      const here = new URL(window.location.href)
      if (
        target.pathname === here.pathname
        && target.search === here.search
        && target.hash === here.hash
      ) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      const fullUrl = new URL(next, window.location.origin).href
      window.location.assign(fullUrl)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
