'use client'

import dynamic from 'next/dynamic'

const OhhwellsBridge = dynamic(
  () => import('@ohhwells/bridge').then((m) => ({ default: m.OhhwellsBridge })),
  { ssr: false }
)

export function OhhwellsBridgeLoader() {
  return <OhhwellsBridge />
}
