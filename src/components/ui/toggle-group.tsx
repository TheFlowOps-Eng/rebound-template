'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Toggle } from '@/components/ui/toggle'

type ToggleGroupContextValue = {
  value: string
  onValueChange: (value: string) => void
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  value: '',
  onValueChange: () => {},
})

function ToggleGroup({
  className,
  value,
  onValueChange,
  children,
  ...props
}: {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>) {
  return (
    <div
      role="group"
      className={cn('flex items-center gap-1 p-1 bg-muted rounded-md', className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ value, onValueChange }}>
        {children}
      </ToggleGroupContext.Provider>
    </div>
  )
}

function ToggleGroupItem({
  className,
  value,
  children,
  ...props
}: {
  value: string
  children: React.ReactNode
} & Omit<React.ComponentProps<typeof Toggle>, 'pressed' | 'onPressedChange'>) {
  const { value: groupValue, onValueChange } = React.useContext(ToggleGroupContext)

  return (
    <Toggle
      pressed={groupValue === value}
      onPressedChange={() => onValueChange(value)}
      className={cn(
        'text-foreground cursor-pointer hover:bg-transparent hover:text-foreground',
        'data-[state=on]:bg-background data-[state=on]:shadow-sm',
        'data-[state=off]:opacity-50 data-[state=off]:hover:opacity-75',
        className
      )}
      {...props}
    >
      {children}
    </Toggle>
  )
}

export { ToggleGroup, ToggleGroupItem }
