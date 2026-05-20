const STORAGE_KEY = 'ohw-preserved-search'

/** Persist edit iframe query string across client navigations that drop params. */
export function readPreservedSearch(): string {
  if (typeof window === 'undefined') return ''
  const fromUrl = window.location.search
  if (fromUrl && fromUrl !== '?') {
    sessionStorage.setItem(STORAGE_KEY, fromUrl)
    return fromUrl
  }
  return sessionStorage.getItem(STORAGE_KEY) ?? ''
}

export function clearPreservedSearch(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEY)
}

export function isEditSessionActive(): boolean {
  const search = readPreservedSearch()
  if (!search || search === '?') return false
  const q = search.startsWith('?') ? search.slice(1) : search
  return new URLSearchParams(q).get('mode') === 'edit'
}
