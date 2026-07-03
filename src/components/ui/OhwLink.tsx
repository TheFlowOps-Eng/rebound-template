'use client'

import { useLayoutEffect, useRef, useState } from 'react'

type OhwLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  hrefKey: string
  defaultHref: string
}

/**
 * Anchor for bridge-managed nav/footer links.
 * Keeps React `href` in sync with the bridge (including #section hashes) so
 * re-renders never strip the attribute.
 */
export function OhwLink({
  hrefKey,
  defaultHref,
  children,
  ...rest
}: OhwLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const [href, setHref] = useState(defaultHref)

  useLayoutEffect(() => {
    const el = anchorRef.current
    if (!el) return

    const syncFromDom = () => {
      const next = el.getAttribute('href')
      if (next) setHref((prev) => (prev === next ? prev : next))
    }

    syncFromDom()

    const onLinkHref = (e: Event) => {
      const { key, href: next } = (e as CustomEvent<{ key: string; href: string }>).detail
      if (key === hrefKey && next) setHref(next)
    }

    const observer = new MutationObserver(syncFromDom)
    observer.observe(el, { attributes: true, attributeFilter: ['href'] })
    window.addEventListener('ohw:link-href', onLinkHref)

    return () => {
      observer.disconnect()
      window.removeEventListener('ohw:link-href', onLinkHref)
    }
  }, [hrefKey])

  return (
    <a ref={anchorRef} href={href} data-ohw-href-key={hrefKey} {...rest}>
      {children}
    </a>
  )
}
