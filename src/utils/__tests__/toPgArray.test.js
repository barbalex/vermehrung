import { describe, expect, it } from 'vitest'

import { toPgArray } from '../toPgArray.js'

describe('toPgArray', () => {
  it('formats a revision as a postgres array string', () => {
    expect(toPgArray(['1-abc'])).toBe('{1-abc}')
    expect(toPgArray(['2-def', '1-abc'])).toBe('{2-def,1-abc}')
  })

  it('returns null for empty arrays', () => {
    expect(toPgArray([])).toBeNull()
  })
})
