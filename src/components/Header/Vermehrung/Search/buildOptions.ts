import Fuse from 'fuse.js'
import type { IFuseOptions } from 'fuse.js'
import type { Model } from 'nitromelondb'
import { DateTime } from 'luxon'
import { first as first$ } from 'rxjs/operators'

import { personLabelFromPerson } from '../../../../utils/personLabelFromPerson.ts'
import { lieferungLabelFromLieferung } from '../../../../utils/lieferungLabelFromLieferung.ts'
import { tableFilter } from '../../../../utils/tableFilter.ts'
import { gartensSortedFromGartens } from '../../../../utils/gartensSortedFromGartens.ts'
import { kultursSortedFromKulturs } from '../../../../utils/kultursSortedFromKulturs.ts'
import { sammlungsSortedFromSammlungs } from '../../../../utils/sammlungsSortedFromSammlungs.ts'
import { artsSortedFromArts } from '../../../../utils/artsSortedFromArts.ts'
import { personFullname } from '../../../../utils/personFullname.ts'
import { bedarfSort } from '../../../../utils/bedarfSort.ts'
import { herkunftSort } from '../../../../utils/herkunftSort.ts'
import { lieferungSort } from '../../../../utils/lieferungSort.ts'
import { personSort } from '../../../../utils/personSort.ts'
import { zaehlungSort } from '../../../../utils/zaehlungSort.ts'
import { herkunftLabelFromHerkunft } from '../../../../utils/herkunftLabelFromHerkunft.ts'
import { bedarfLabelFromBedarf } from '../../../../utils/bedarfLabelFromBedarf.ts'
import {
  store,
  dbAtom,
  lastUpdatedAtom,
  filterTableAtoms,
  type TableName,
} from '../../../../store/index.ts'

const threshold = 0.2
const distance = 1000 // ensure text in long labels is found

const formatDateForSearch = (datum: string | null | undefined) =>
  datum ? DateTime.fromSQL(datum).toFormat('yyyy.LL.dd') : ''

// === corpus cache ====================================================
// Building the suggestions (fetch + label resolution) and the fuse
// indexes is expensive but only depends on the table's content and its
// filter - not on the search string. Cache the fuse per table, keyed by
// the table's sync watermark and filter: a keystroke then only runs
// fuse.search on the cached indexes.
// CAVEAT: purely local (offline) edits do not advance the watermark -
// the cache catches up with the next sync (online: ~1s after the queue
// drained).
type CorpusFuse = Fuse<Record<string, unknown>>

// one cast site for the fuse variance: builders produce Fuse<their
// concrete suggestion shape>, the cache stores them uniformly
const makeFuse = <T>(list: T[], options: IFuseOptions<T>): CorpusFuse =>
  new Fuse(
    list as Record<string, unknown>[],
    options as IFuseOptions<Record<string, unknown>>,
  )
interface CacheEntry {
  version: string
  fuse: CorpusFuse
}
const corpusCache = new Map<string, CacheEntry>()

const tableVersion = (table: string) => {
  const filterAtom = filterTableAtoms[table]
  const filter = filterAtom ? store.get(filterAtom) : null
  return JSON.stringify([
    store.get(lastUpdatedAtom)[table as TableName] ?? 0,
    filter,
  ])
}

const cachedFuse = async (
  table: string,
  build: () => Promise<CorpusFuse>,
): Promise<CorpusFuse> => {
  const version = tableVersion(table)
  const cached = corpusCache.get(table)
  if (cached && cached.version === version) return cached.fuse
  const fuse = await build()
  corpusCache.set(table, { version, fuse })
  return fuse
}

const fetchTable = async <T extends Model>(table: string): Promise<T[]> => {
  try {
    return (
      (await store
        ?.get(dbAtom)
        ?.get<T>(table as never)
        .query(...tableFilter({ table: table as never }))
        .fetch()) ?? []
    )
  } catch {
    return []
  }
}

// === per-table corpus builders =======================================

const artFuse = async () => {
  const artsSorted = await artsSortedFromArts(
    await fetchTable<import('../../../../dbModel.ts').Art>('art'),
  )
  const suggestions = await Promise.all(
    artsSorted.map(async (a) => {
      let label = ''
      try {
        label = (await a.label.pipe(first$()).toPromise()) ?? ''
      } catch {}

      return {
        value: a.id,
        label,
        type: 'Arten',
      }
    }),
  )
  return makeFuse(suggestions, {
    keys: [{ name: 'label', weight: 1 }],
    threshold,
    distance,
  })
}

const gartenFuse = async () => {
  const gartensSorted = await gartensSortedFromGartens(
    await fetchTable<import('../../../../dbModel.ts').Garten>('garten'),
  )
  const suggestions = await Promise.all(
    gartensSorted.map(async (g) => {
      let label
      try {
        label = (await g.label.pipe(first$()).toPromise()) ?? ''
      } catch {}
      let person
      try {
        person = await g.person.fetch()
      } catch {}

      return {
        value: g.id,
        label,
        name: g.name ?? '',
        personname: personFullname(person) ?? '',
        strasse: g.strasse ?? '',
        plz: g.plz,
        ort: g.ort ?? '',
        bemerkungen: g.bemerkungen ?? '',
        aktiv: g.aktiv ? 'aktiv' : 'historisch',
        type: 'Gaerten',
      }
    }),
  )
  return makeFuse(suggestions, {
    keys: [
      { name: 'name', weight: 1 },
      { name: 'personname', weight: 0.7 },
      { name: 'strasse', weight: 0.5 },
      { name: 'plz', weight: 0.5 },
      { name: 'ort', weight: 0.5 },
      { name: 'aktiv', weight: 0.5 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
}

const herkunftFuse = async () => {
  const herkunftsSorted = (
    await fetchTable<import('../../../../dbModel.ts').Herkunft>('herkunft')
  ).sort(herkunftSort)
  const suggestions = herkunftsSorted.map((h) => ({
    value: h.id,
    label: herkunftLabelFromHerkunft({ herkunft: h }),
    ...h,
    type: 'Herkuenfte',
  }))
  return makeFuse(suggestions, {
    keys: [
      { name: 'nr', weight: 1 },
      { name: 'lokalname', weight: 1 },
      { name: 'gemeinde', weight: 0.7 },
      { name: 'kanton', weight: 0.5 },
      { name: 'land', weight: 0.5 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
}

const kulturFuse = async () => {
  const kultursSorted = await kultursSortedFromKulturs(
    await fetchTable<import('../../../../dbModel.ts').Kultur>('kultur'),
  )
  const suggestions = await Promise.all(
    kultursSorted.map(async (k) => {
      let label
      try {
        label = (await k.label.pipe(first$()).toPromise()) ?? ''
      } catch {}
      let garten
      try {
        garten = await k.garten.fetch()
      } catch {}
      let gartenPerson
      try {
        gartenPerson = await garten?.person.fetch()
      } catch {}
      let herkunft
      try {
        herkunft = await k.herkunft.fetch()
      } catch {}

      return {
        value: k.id,
        label,
        personname: personFullname(gartenPerson) ?? '',
        herkunftlokalname: herkunft?.lokalname ?? '',
        herkunftgemeinde: herkunft?.gemeinde ?? '',
        bemerkungen: k.bemerkungen ?? '',
        type: 'Kulturen',
      }
    }),
  )
  return makeFuse(suggestions, {
    keys: [
      { name: 'label', weight: 1 },
      { name: 'personname', weight: 0.7 },
      { name: 'herkunftlokalname', weight: 0.7 },
      { name: 'herkunftgemeinde', weight: 0.7 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
}

const bedarfFuse = async () => {
  const bedarfsSorted = (
    await fetchTable<import('../../../../dbModel.ts').Bedarf>('bedarf')
  ).sort(bedarfSort)
  const suggestions = await Promise.all(
    bedarfsSorted.map(async (b) => {
      let kultur
      try {
        kultur = await b.kultur?.fetch()
      } catch {}
      let art
      try {
        art = await kultur?.art?.fetch()
      } catch {}
      let artname = ''
      try {
        artname = (await art?.label?.pipe(first$()).toPromise()) ?? ''
      } catch {}
      let person
      try {
        person = await b.person?.fetch()
      } catch {}

      return {
        value: b.id,
        label: bedarfLabelFromBedarf({ bedarf: b }),
        artname,
        personname: personFullname(person) ?? '',
        jahr: b.jahr ?? '',
        beschreibung: b.beschreibung ?? '',
        neues_material: b.neues_material ?? '',
        bemerkungen: b.bemerkungen ?? '',
        parent: b.kultur_id,
        type: 'Bedarf',
      }
    }),
  )
  return makeFuse(suggestions, {
    keys: [
      { name: 'label', weight: 1 },
      { name: 'jahr', weight: 1 },
      { name: 'beschreibung', weight: 1 },
      { name: 'artname', weight: 0.7 },
      { name: 'personname', weight: 0.7 },
      { name: 'neues_material', weight: 0.5 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
}

const lieferungFuse = async () => {
  const lieferungsSorted = (
    await fetchTable<import('../../../../dbModel.ts').Lieferung>('lieferung')
  ).sort(lieferungSort)
  // for von/nach kultur lookups (uncached: only runs on corpus rebuilds)
  const kulturs =
    await fetchTable<import('../../../../dbModel.ts').Kultur>('kultur')
  const suggestions = await Promise.all(
    lieferungsSorted.map(async (l) => {
      let person
      try {
        person = await l?.person?.fetch()
      } catch {}
      let sammlung
      try {
        sammlung = await l?.sammlung?.fetch()
      } catch {}
      let sammlungPerson
      try {
        sammlungPerson = await sammlung?.person?.fetch()
      } catch {}
      let sammlungHerkunft
      try {
        sammlungHerkunft = await sammlung?.herkunft?.fetch()
      } catch {}
      const vonKultur = kulturs.find((k) => k.id === l.von_kultur_id)
      let vonKulturGarten
      try {
        vonKulturGarten = await vonKultur?.garten?.fetch()
      } catch {}
      let vonKulturGartenPerson
      try {
        vonKulturGartenPerson = await vonKulturGarten?.person?.fetch()
      } catch {}
      const nachKultur = kulturs.find((k) => k.id === l.nach_kultur_id)
      let nachKulturGarten
      try {
        nachKulturGarten = await nachKultur?.garten?.fetch()
      } catch {}
      let nachKulturGartenPerson
      try {
        nachKulturGartenPerson = await nachKulturGarten?.person?.fetch()
      } catch {}
      let art
      try {
        art = await l?.art?.fetch()
      } catch {}
      let artname
      try {
        artname = (await art?.label?.pipe(first$()).toPromise()) ?? ''
      } catch {}

      return {
        value: l.id,
        label: lieferungLabelFromLieferung({ lieferung: l }),
        artname,
        personname: personFullname(person) ?? '',
        sammlungNr: sammlung?.nr ?? '',
        sammlungDatum: formatDateForSearch(sammlung?.datum),
        sammlungPerson: personFullname(sammlungPerson) ?? '',
        sammlungHerkunftNr: sammlungHerkunft?.nr ?? '',
        sammlungHerkunftLokalname: sammlungHerkunft?.lokalname ?? '',
        sammlungHerkunftGemeinde: sammlungHerkunft?.gemeinde ?? '',
        vonKulturPersonName: personFullname(vonKulturGartenPerson) ?? '',
        nachKulturPersonName: personFullname(nachKulturGartenPerson) ?? '',
        ausgepflanzt: l.nach_ausgepflanzt ? 'ausgepflanzt' : '',
        geplant: l.geplant ? 'geplant' : 'ausgeführt',
        bemerkungen: l.bemerkungen,
        type: 'Lieferungen',
      }
    }),
  )
  return makeFuse(suggestions, {
    keys: [
      { name: 'artname', weight: 1 },
      { name: 'personname', weight: 1 },
      { name: 'label', weight: 1 },
      { name: 'sammlungNr', weight: 1 },
      { name: 'sammlungDatum', weight: 0.7 },
      { name: 'sammlungPerson', weight: 0.7 },
      { name: 'sammlungHerkunftNr', weight: 0.7 },
      { name: 'sammlungHerkunftLokalname', weight: 0.7 },
      { name: 'sammlungHerkunftGemeinde', weight: 0.7 },
      { name: 'vonKulturPersonName', weight: 0.7 },
      { name: 'nachKulturPersonName', weight: 0.7 },
      { name: 'ausgepflanzt', weight: 1 },
      { name: 'geplant', weight: 1 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
}

const personFuse = async () => {
  const personsSorted = (
    await fetchTable<import('../../../../dbModel.ts').Person>('person')
  ).sort(personSort)
  const suggestions = personsSorted.map((p) => ({
    value: p.id,
    label: personLabelFromPerson({ person: p }),
    nr: p.nr,
    adresszusatz: p.adresszusatz ?? '',
    strasse: p.strasse ?? '',
    plz: p.plz,
    telefon_privat: p.telefon_privat ?? '',
    telefon_geschaeft: p.telefon_geschaeft ?? '',
    telefon_mobile: p.telefon_mobile ?? '',
    email: p.email ?? '',
    bemerkungen: p.bemerkungen ?? '',
    type: 'Personen',
  }))
  return makeFuse(suggestions, {
    keys: [
      { name: 'nr', weight: 1 },
      { name: 'label', weight: 1 },
      { name: 'adresszusatz', weight: 0.5 },
      { name: 'strasse', weight: 0.5 },
      { name: 'plz', weight: 0.5 },
      { name: 'telefon_privat', weight: 0.5 },
      { name: 'telefon_geschaeft', weight: 0.5 },
      { name: 'telefon_mobile', weight: 0.5 },
      { name: 'email', weight: 0.5 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
}

const sammlungFuse = async () => {
  const sammlungsSorted = await sammlungsSortedFromSammlungs(
    await fetchTable<import('../../../../dbModel.ts').Sammlung>('sammlung'),
  )
  const suggestions = await Promise.all(
    sammlungsSorted.map(async (s) => {
      let label
      try {
        label = (await s.label.pipe(first$()).toPromise()) ?? ''
      } catch {}
      let herkunft
      try {
        herkunft = await s.herkunft.fetch()
      } catch {}

      return {
        value: s.id,
        label,
        herkunftlokalname: herkunft?.lokalname ?? '',
        herkunftgemeinde: herkunft?.gemeinde ?? '',
        nr: s.nr,
        bemerkungen: s.bemerkungen ?? '',
        datum: formatDateForSearch(s.datum),
        geplant: s.geplant ? 'geplant' : 'ausgeführt',
        type: 'Sammlungen',
      }
    }),
  )
  return makeFuse(suggestions, {
    keys: [
      { name: 'label', weight: 1 },
      { name: 'herkunftlokalname', weight: 0.7 },
      { name: 'herkunftgemeinde', weight: 0.7 },
      { name: 'nr', weight: 1 },
      { name: 'datum', weight: 1 },
      { name: 'bemerkungen', weight: 0.5 },
      { name: 'geplant', weight: 1 },
    ],
    threshold,
    distance,
  })
}

const zaehlungFuse = async () => {
  const zaehlungsSorted = (
    await fetchTable<import('../../../../dbModel.ts').Zaehlung>('zaehlung')
  ).sort(zaehlungSort)
  const suggestions = zaehlungsSorted.map((z) => ({
    value: z.id,
    label: formatDateForSearch(z.datum),
    parent: z.kultur_id,
    type: 'Zaehlungen',
  }))
  return makeFuse(suggestions, {
    keys: [{ name: 'label', weight: 1 }],
    threshold,
    distance,
  })
}

// fixed group order for the dropdown
const corpora: [string, string, () => Promise<CorpusFuse>][] = [
  ['art', 'Arten', artFuse],
  ['garten', 'Gärten', gartenFuse],
  ['herkunft', 'Herkünfte', herkunftFuse],
  ['kultur', 'Kulturen', kulturFuse],
  ['bedarf', 'Bedarf', bedarfFuse],
  ['lieferung', 'Lieferungen', lieferungFuse],
  ['person', 'Personen', personFuse],
  ['sammlung', 'Sammlungen', sammlungFuse],
  ['zaehlung', 'Zählungen', zaehlungFuse],
]

export const buildOptions = async ({
  cb,
  val,
}: {
  cb: (options: unknown[]) => void
  val: string
}) => {
  const options = []
  for (const [table, groupLabel, buildFuse] of corpora) {
    const fuse = await cachedFuse(table, buildFuse)
    const suggestions = fuse.search(val).map((o) => o.item)
    if (suggestions.length) {
      options.push({
        label: `${groupLabel} (${suggestions.length})`,
        options: suggestions,
      })
    }
  }
  if (!options.length && val) {
    options.push({ val: 'none', label: '(keine Resultate)' })
  }
  cb(options)
}
