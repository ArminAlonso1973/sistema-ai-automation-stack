// tests/setup.js
import '@testing-library/jest-dom'
import { vi, afterEach } from 'vitest'

// Mock fetch globalmente para tests
globalThis.fetch = vi.fn()

// Reset mocks después de cada test
afterEach(() => {
  vi.restoreAllMocks()
})