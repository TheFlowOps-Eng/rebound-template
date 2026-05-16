'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function NavigationSync() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ow:navigation', path: pathname }, '*')
    }
  }, [pathname])

  return null
}
