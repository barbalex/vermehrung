import { describe, expect, it } from 'vitest'
import proj4 from 'proj4'

import { epsg2056to4326 } from '../epsg2056to4326.ts'

proj4.defs(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
)

// reference values from proj4's exact pipeline - the closed form must
// stay within ~1m (0.00001 degrees) of them across switzerland
const VECTORS: [number, number][] = [
  [2600000, 1200000], // bern
  [2700000, 1300000],
  [2550000, 1150000],
  [2695000, 1145000],
  [2480000, 1070000], // corner of the fit domain
  [2840000, 1300000], // opposite corner
]

describe('epsg2056to4326', () => {
  it('matches proj4 within 1m across switzerland', () => {
    for (const [e, n] of VECTORS) {
      const expected = proj4('EPSG:2056', 'EPSG:4326', [e, n])
      const [lon, lat] = epsg2056to4326(e, n)
      expect(Math.abs(lon - expected[0])).toBeLessThan(0.00001)
      expect(Math.abs(lat - expected[1])).toBeLessThan(0.00001)
    }
  })

  it('accepts string inputs like the old proj4 wrapper', () => {
    const [lon, lat] = epsg2056to4326('2600000', '1200000')
    expect(lon).toBeCloseTo(7.438632, 5)
    expect(lat).toBeCloseTo(46.951083, 5)
  })
})
