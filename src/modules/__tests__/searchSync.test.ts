import { beforeEach, describe, expect, it } from 'vitest'

import {
  store,
  apFilterAtom,
  filterArtAtom,
  filterShowAtom,
  filterSammlungAtom,
} from '../../store/index.ts'
import emptyValues from '../../store/Filter/emptyValues.ts'
import {
  applySearchParams,
  decodeFilterValues,
  filterUpdatesFor,
  resetSearchSyncForTests,
} from '../searchSync.ts'

const uuid = '99999999-9999-9999-9999-999999999999'

// applySearchParams keeps module state (the previous search, for the
// params-disappeared rule) — reset it so every test starts at boot
beforeEach(() => {
  resetSearchSyncForTests()
  store.set(filterSammlungAtom, emptyValues.sammlung)
  store.set(filterArtAtom, emptyValues.art)
  store.set(filterShowAtom, false)
  store.set(apFilterAtom, true)
})

describe('decodeFilterValues', () => {
  it('decodes every simple type', () => {
    const params = new URLSearchParams(
      `?f.sammlung.art_id=${uuid}&f.sammlung.nr=3&f.sammlung.geplant=true&f.sammlung.datum=2024-05-01&f.sammlung.von_anzahl_individuen=5`,
    )
    expect(decodeFilterValues('sammlung', params)).toEqual({
      ...emptyValues.sammlung,
      art_id: uuid,
      nr: '3',
      geplant: true,
      datum: '2024-05-01',
      von_anzahl_individuen: 5,
    })
  })

  it('treats booleans strictly and false explicitly', () => {
    const params = new URLSearchParams('?f.sammlung.geplant=false')
    expect(decodeFilterValues('sammlung', params)?.geplant).toBe(false)
  })

  it('ignores unknown tables, unknown fields, invalid numbers and empty values', () => {
    expect(decodeFilterValues('nope', new URLSearchParams('?f.nope.x=1'))).toBe(
      undefined,
    )
    const params = new URLSearchParams(
      '?f.sammlung.junk=1&f.sammlung.von_anzahl_individuen=abc&f.sammlung.nr=',
    )
    expect(decodeFilterValues('sammlung', params)).toEqual({
      ...emptyValues.sammlung,
    })
  })
})

describe('filterUpdatesFor', () => {
  it('encodes only fields differing from their default', () => {
    const values = { ...emptyValues.sammlung, geplant: true, art_id: uuid }
    expect(filterUpdatesFor('sammlung', values, new URLSearchParams())).toEqual(
      [
        ['f.sammlung.art_id', uuid],
        ['f.sammlung.geplant', 'true'],
      ],
    )
  })

  it('removes stale params of fields that returned to their default', () => {
    const values = { ...emptyValues.sammlung, geplant: true }
    const current = new URLSearchParams(
      '?f.sammlung.nr=3&f.sammlung.geplant=false&f.art.set=x',
    )
    expect(filterUpdatesFor('sammlung', values, current)).toEqual([
      ['f.sammlung.geplant', 'true'],
      ['f.sammlung.nr', undefined],
    ])
  })
})

describe('applySearchParams', () => {
  it('params present on first application win over the atoms', () => {
    store.set(filterArtAtom, { ...emptyValues.art, set: 'old' })
    applySearchParams('?filter=1&ap=0&f.art.set=x')
    expect(store.get(filterShowAtom)).toBe(true)
    expect(store.get(apFilterAtom)).toBe(false)
    expect(store.get(filterArtAtom)).toEqual({ ...emptyValues.art, set: 'x' })
  })

  it('a clean url on first application keeps the current values', () => {
    store.set(filterSammlungAtom, { ...emptyValues.sammlung, nr: '4' })
    applySearchParams('')
    expect(store.get(filterSammlungAtom)).toEqual({
      ...emptyValues.sammlung,
      nr: '4',
    })
    expect(store.get(filterShowAtom)).toBe(false)
    expect(store.get(apFilterAtom)).toBe(true)
  })

  it('params that disappeared since the previous location revert to defaults', () => {
    applySearchParams('?f.sammlung.nr=3&filter=1&ap=0')
    expect(store.get(filterSammlungAtom)).toEqual({
      ...emptyValues.sammlung,
      nr: '3',
    })
    applySearchParams('')
    expect(store.get(filterSammlungAtom)).toEqual(emptyValues.sammlung)
    expect(store.get(filterShowAtom)).toBe(false)
    expect(store.get(apFilterAtom)).toBe(true)
  })

  it('reverts per table: other tables without params keep their values', () => {
    store.set(filterArtAtom, { ...emptyValues.art, set: 'x' })
    applySearchParams('?f.sammlung.nr=3')
    // art has no params: keeps its value
    expect(store.get(filterArtAtom)).toEqual({ ...emptyValues.art, set: 'x' })
    applySearchParams('?f.art.set=y')
    // sammlung's params disappeared: sammlung reverts, art follows the url
    expect(store.get(filterSammlungAtom)).toEqual(emptyValues.sammlung)
    expect(store.get(filterArtAtom)).toEqual({ ...emptyValues.art, set: 'y' })
  })

  it('an ftab-only url does not touch the filter pane (it belongs to the open pane)', () => {
    applySearchParams('?ftab=person')
    expect(store.get(filterShowAtom)).toBe(false)
  })
})
