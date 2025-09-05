import '@testing-library/jest-dom'
import React from 'react'
import { TextEncoder, TextDecoder } from 'util'

// Polyfills for whatwg
;(global as any).TextEncoder = TextEncoder
;(global as any).TextDecoder = TextDecoder as any

// Mock next/image to render a basic img
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', props),
}))

// Mock lucide-react icons to simple spans
jest.mock('lucide-react', () => {
  return new Proxy(
    {},
    {
      get: (_: unknown, prop: string) => (props: any) => React.createElement('span', { ...props, 'data-icon': prop }),
    }
  )
})
