/** Merge the current page query string into an internal href. */
export function preserveSearchParams(
  href: string,
  search: string = typeof window !== 'undefined' ? window.location.search : '',
): string {
  if (!search || search === '?') return href

  const current = new URLSearchParams(search)
  if ([...current.keys()].length === 0) return href

  try {
    const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    const url = new URL(href, base)
    current.forEach((value, key) => {
      url.searchParams.set(key, value)
    })
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return href
  }
}

export function isInternalHref(href: string): boolean {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return false
  }
  if (/^https?:\/\//.test(href)) {
    return typeof window !== 'undefined' && href.startsWith(window.location.origin)
  }
  return href.startsWith('/')
}

export function isModifiedClick(e: MouseEvent): boolean {
  return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
}
