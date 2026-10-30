import { describe, expect, it } from 'vitest'

import { ifIsNumericAsNumber } from '../ifIsNumericAsNumber.ts'

describe('ifIsNumericAsNumber', () => {
  it('converts fully numeric strings to numbers', () => {
    expect(ifIsNumericAsNumber('42')).toBe(42)
    expect(ifIsNumericAsNumber('4.5')).toBe(4.5)
    expect(ifIsNumericAsNumber('-3')).toBe(-3)
  })

  it('keeps text that only begins with a number as text', () => {
    expect(ifIsNumericAsNumber('3 Liter')).toBe('3 Liter')
    expect(ifIsNumericAsNumber('2x im Jahr')).toBe('2x im Jahr')
  })

  it('keeps non-numeric text and passes numbers through', () => {
    expect(ifIsNumericAsNumber('abc')).toBe('abc')
    expect(ifIsNumericAsNumber('')).toBe('')
    expect(ifIsNumericAsNumber(7)).toBe(7)
  })
})
