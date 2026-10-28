import { Model, type Query, type Relation } from '@nozbe/watermelondb'
import type { Associations } from '@nozbe/watermelondb/Model'
import {
  writer,
  children,
  field,
  json,
  lazy,
  relation,
} from '@nozbe/watermelondb/decorators'
import { Q } from '@nozbe/watermelondb'
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map as map$,
} from 'rxjs/operators'
import { DateTime } from 'luxon'
import { first as first$ } from 'rxjs/operators'
import type { Observable } from 'rxjs'

import { personLabelFromPerson } from './utils/personLabelFromPerson.ts'
import { gartenLabelFromGarten } from './utils/gartenLabelFromGarten.ts'
import { eventLabelFromEvent } from './utils/eventLabelFromEvent.ts'
import { bedarfLabelFromBedarf } from './utils/bedarfLabelFromBedarf.ts'
import { artLabelFromAeArt } from './utils/artLabelFromAeArt.ts'
import { lieferungLabelFromLieferung } from './utils/lieferungLabelFromLieferung.ts'
import { teilkulturLabelFromTeilkultur } from './utils/teilkulturLabelFromTeilkultur.ts'
import { kulturLabelFromKultur } from './utils/kulturLabelFromKultur.ts'
import { kulturLabelFromKulturUnderArt } from './utils/kulturLabelFromKulturUnderArt.ts'
import { kulturLabelFromKulturUnderGarten } from './utils/kulturLabelFromKulturUnderGarten.ts'
import { sammlungLabelFromSammlung } from './utils/sammlungLabelFromSammlung.ts'
import { sammlungLabelFromSammlungUnderHerkunft } from './utils/sammlungLabelFromSammlungUnderHerkunft.ts'
import { zaehlungLabelFromZaehlung } from './utils/zaehlungLabelFromZaehlung.ts'
import { deleteAccount } from './utils/deleteAccount.ts'
import { registerDirtyRev } from './modules/revAggregation.ts'
import {
  store,
  userAtom,
  apiClientAtom,
  addNotification,
  unsetError,
} from './store/index.ts'

const dontSanitize = (val: unknown): unknown => val
/*const sanitizeArrayOfStrings = (val) =>
  Array.isArray(val) ? val.map(String) : []*/

export class Herkunft extends Model {
  static table = 'herkunft'
  static associations: Associations = {
    sammlung: { type: 'has_many', foreignKey: 'herkunft_id' },
    kultur: { type: 'has_many', foreignKey: 'herkunft_id' },
    herkunft_file: { type: 'has_many', foreignKey: 'herkunft_id' },
  }

  @field('nr') nr!: string | null
  @field('lokalname') lokalname!: string | null
  @field('gemeinde') gemeinde!: string | null
  @field('kanton') kanton!: string | null
  @field('land') land!: string | null
  @json('geom_point', dontSanitize) geom_point!: unknown
  @field('wgs84_lat') wgs84_lat!: number | null
  @field('wgs84_long') wgs84_long!: number | null
  @field('lv95_x') lv95_x!: number | null
  @field('lv95_y') lv95_y!: number | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @children('sammlung') sammlungs!: Query<Sammlung>
  @children('herkunft') herkunfts!: Query<Herkunft>
  @children('herkunft_file') files!: Query<HerkunftFile>

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`herkunft.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('herkunft', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Sammlung extends Model {
  static table = 'sammlung'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
    person: { type: 'belongs_to', key: 'person_id' },
    lieferung: { type: 'has_many', foreignKey: 'von_sammlung_id' },
    sammlung_file: { type: 'has_many', foreignKey: 'sammlung_id' },
  }

  @field('art_id') art_id!: string | null
  @field('person_id') person_id!: string | null
  @field('herkunft_id') herkunft_id!: string | null
  @field('nr') nr!: string | null
  @field('datum') datum!: string | null
  @field('von_anzahl_individuen') von_anzahl_individuen!: number | null
  @field('anzahl_pflanzen') anzahl_pflanzen!: number | null
  @field('gramm_samen') gramm_samen!: number | null
  @field('andere_menge') andere_menge!: string | null
  @json('geom_point', dontSanitize) geom_point!: unknown
  @field('wgs84_lat') wgs84_lat!: number | null
  @field('wgs84_long') wgs84_long!: number | null
  @field('lv95_x') lv95_x!: number | null
  @field('lv95_y') lv95_y!: number | null
  @field('geplant') geplant!: boolean | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('art', 'art_id') art!: Relation<Art>
  @relation('herkunft', 'herkunft_id') herkunft!: Relation<Herkunft>
  @relation('person', 'person_id') person!: Relation<Person>
  @children('lieferung') lieferungs!: Query<Lieferung>
  @children('sammlung_file') files!: Query<SammlungFile>

  @lazy label: Observable<Promise<string>> = this.observe().pipe(
    // TODO: optimize untilChanged
    distinctUntilChanged(),
    map$(async (sammlung) => {
      let art
      try {
        art = await sammlung.art.fetch()
      } catch {}
      let ae_art
      try {
        ae_art = await art?.ae_art?.fetch()
      } catch {}
      let person
      try {
        person = await sammlung.person?.fetch()
      } catch {}
      let herkunft
      try {
        herkunft = await sammlung.herkunft?.fetch()
      } catch {}

      return sammlungLabelFromSammlung({
        sammlung,
        art,
        ae_art,
        person,
        herkunft,
      })
    }),
  )
  @lazy labelUnderHerkunft: Observable<Promise<string>> = this.observe().pipe(
    // TODO: optimize untilChanged
    distinctUntilChanged(),
    map$(async (sammlung) => {
      let art
      try {
        art = await sammlung.art.fetch()
      } catch {}
      let ae_art
      try {
        ae_art = await art?.ae_art?.fetch()
      } catch {}
      let person
      try {
        person = await sammlung.person.fetch()
      } catch {}

      return sammlungLabelFromSammlungUnderHerkunft({
        sammlung,
        art,
        ae_art,
        person,
      })
    }),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`sammlung.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('sammlung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Lieferung extends Model {
  static table = 'lieferung'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    sammlung: { type: 'belongs_to', key: 'von_sammlung_id' },
    sammel_lieferung: { type: 'belongs_to', key: 'sammel_lieferung_id' },
    // not possible to build two associations to one table, see:
    // https://github.com/Nozbe/WatermelonDB/issues/885
    //kultur: { type: 'belongs_to', key: 'nach_kultur_id' },
    // this association will not do anything becaus no table with this name exists
    //nach_kultur: { type: 'belongs_to', key: 'nach_kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
    lieferung_file: { type: 'has_many', foreignKey: 'lieferung_id' },
  }

  @field('sammel_lieferung_id') sammel_lieferung_id!: string | null
  @field('art_id') art_id!: string | null
  @field('person_id') person_id!: string | null
  @field('von_sammlung_id') von_sammlung_id!: string | null
  @field('von_kultur_id') von_kultur_id!: string | null
  @field('datum') datum!: string | null
  @field('nach_kultur_id') nach_kultur_id!: string | null
  @field('nach_ausgepflanzt') nach_ausgepflanzt!: boolean | null
  @field('von_anzahl_individuen') von_anzahl_individuen!: number | null
  @field('anzahl_pflanzen') anzahl_pflanzen!: number | null
  @field('anzahl_auspflanzbereit') anzahl_auspflanzbereit!: number | null
  @field('gramm_samen') gramm_samen!: number | null
  @field('andere_menge') andere_menge!: string | null
  @field('geplant') geplant!: boolean | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('art', 'art_id') art!: Relation<Art>
  @relation('sammlung', 'von_sammlung_id') sammlung!: Relation<Sammlung>
  @relation('sammel_lieferung', 'sammel_lieferung_id') sammel_lieferung!: Relation<SammelLieferung>
  //@relation('kultur', 'von_kultur_id') von_kultur
  //@relation('kultur', 'nach_kultur_id') nach_kultur
  @relation('person', 'person_id') person!: Relation<Person>
  @children('lieferung_file') files!: Query<LieferungFile>

  @lazy von_kultur: Observable<Promise<Kultur | undefined>> = this.observe().pipe(
    map$(async (lieferung) => {
      let vonKultur
      try {
        vonKultur = await lieferung.collections
          .get<Kultur>('kultur')
          .find(lieferung.von_kultur_id ?? '')
      } catch {}
      return vonKultur
    }),
  )
  @lazy nach_kultur: Observable<Promise<Kultur | undefined>> = this.observe().pipe(
    map$(async (lieferung) => {
      let nachKultur
      try {
        nachKultur = await lieferung.collections
          .get<Kultur>('kultur')
          .find(lieferung.nach_kultur_id ?? '')
      } catch {}
      return nachKultur
    }),
  )

  @lazy label: Observable<string> = this.observe().pipe(
    distinctUntilChanged(
      (a, b) =>
        a.datum === b.datum &&
        a.anzahl_pflanzen === b.anzahl_pflanzen &&
        a.anzahl_auspflanzbereit === b.anzahl_auspflanzbereit &&
        a.geplant === b.geplant,
    ),
    map$((lieferung) => lieferungLabelFromLieferung({ lieferung })),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`lieferung.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('lieferung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}
export class Art extends Model {
  static table = 'art'
  static associations: Associations = {
    ae_art: { type: 'belongs_to', key: 'ae_id' },
    sammlung: { type: 'has_many', foreignKey: 'art_id' },
    sammel_lieferung: { type: 'has_many', foreignKey: 'art_id' },
    lieferung: { type: 'has_many', foreignKey: 'art_id' },
    kultur: { type: 'has_many', foreignKey: 'art_id' },
    av: { type: 'has_many', foreignKey: 'art_id' },
    art_file: { type: 'has_many', foreignKey: 'art_id' },
  }

  @field('ae_id') ae_id!: string | null
  @field('set') set!: string | null
  @field('apflora_av') apflora_av!: string | null
  @field('apflora_ap') apflora_ap!: boolean | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('ae_art', 'ae_id') ae_art!: Relation<AeArt>

  @children('sammlung') sammlungs!: Query<Sammlung>
  @children('sammel_lieferung') sammel_lieferungs!: Query<SammelLieferung>
  @children('lieferung') lieferungs!: Query<Lieferung>
  @children('kultur') kulturs!: Query<Kultur>
  @children('av') avs!: Query<Av>
  @children('art_file') files!: Query<ArtFile>

  @lazy label: Observable<string> = this.ae_art.observe().pipe(
    distinctUntilKeyChanged('ae_id' as keyof AeArt),
    map$((ae_art) => artLabelFromAeArt({ ae_art })),
  )
  @lazy herkunfts: Query<Herkunft> = this.collections
    .get<Herkunft>('herkunft')
    .query(Q.on('sammlung', 'art_id', this.id))

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // values is meant to enable updating multiple fields at once
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`art.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('art', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class ApfloraAp extends Model {
  static table = 'apflora_ap'
  static associations: Associations = {
    ae_art: { type: 'belongs_to', key: 'ae_id' },
  }

  @field('ae_id') ae_id!: string | null
  @field('ap') ap!: boolean | null
  @field('av') av!: string | null
}

export class AeArt extends Model {
  static table = 'ae_art'
  static associations: Associations = {
    art: { type: 'has_many', foreignKey: 'ae_id' },
  }

  @field('name') name!: string | null
  @field('taxonomy') taxonomy!: string | null
  @field('changed') changed!: string | null

  @children('art') arts!: Query<Art>
}

export class Garten extends Model {
  static table = 'garten'
  static associations: Associations = {
    person: { type: 'belongs_to', key: 'person_id' },
    kultur: { type: 'has_many', foreignKey: 'garten_id' },
    gv: { type: 'has_many', foreignKey: 'garten_id' },
    garten_file: { type: 'has_many', foreignKey: 'garten_id' },
  }

  @field('name') name!: string | null
  @field('person_id') person_id!: string | null
  @field('strasse') strasse!: string | null
  @field('plz') plz!: number | null
  @field('ort') ort!: string | null
  @json('geom_point', dontSanitize) geom_point!: unknown
  @field('wgs84_lat') wgs84_lat!: number | null
  @field('wgs84_long') wgs84_long!: number | null
  @field('lv95_x') lv95_x!: number | null
  @field('lv95_y') lv95_y!: number | null
  @field('aktiv') aktiv!: boolean | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @children('kultur') kulturs!: Query<Kultur>
  @children('gv') gvs!: Query<Gv>
  @children('garten_file') files!: Query<GartenFile>
  @relation('person', 'person_id') person!: Relation<Person>

  @lazy label: Observable<Promise<string>> = this.observe().pipe(
    // TODO: optimize untilChanged
    distinctUntilChanged(
      (p, q) => p.name === q.name && p.person_id === q.person_id,
    ),
    map$(async (garten) => {
      let person
      try {
        person = await garten.person.fetch()
      } catch {}

      return gartenLabelFromGarten({
        garten,
        person,
      })
    }),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`garten.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('garten', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Kultur extends Model {
  static table = 'kultur'
  static associations: Associations = {
    garten: { type: 'belongs_to', key: 'garten_id' },
    art: { type: 'belongs_to', key: 'art_id' },
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
    // not possible to build two associations to one table, see:
    // https://github.com/Nozbe/WatermelonDB/issues/885
    lieferung: { type: 'has_many', foreignKey: 'nach_kultur_id' },
    // this association will not do anything becaus no table with this name exists
    //auslieferung: { type: 'has_many', foreignKey: 'nach_kultur_id' },
    teilkultur: { type: 'has_many', foreignKey: 'kultur_id' },
    zaehlung: { type: 'has_many', foreignKey: 'kultur_id' },
    event: { type: 'has_many', foreignKey: 'kultur_id' },
    bedarf: { type: 'has_many', foreignKey: 'kultur_id' },
    kultur_option: { type: 'belongs_to', key: 'id' },
    kultur_file: { type: 'has_many', foreignKey: 'kultur_id' },
  }

  @field('art_id') art_id!: string | null
  @field('herkunft_id') herkunft_id!: string | null
  @field('garten_id') garten_id!: string | null
  @field('zwischenlager') zwischenlager!: boolean | null
  @field('erhaltungskultur') erhaltungskultur!: boolean | null
  @field('von_anzahl_individuen') von_anzahl_individuen!: number | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('aktiv') aktiv!: boolean | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @children('teilkultur') teilkulturs!: Query<Teilkultur>
  @children('zaehlung') zaehlungs!: Query<Zaehlung>
  @children('event') events!: Query<Event>
  @children('bedarf') bedarfs!: Query<Bedarf>
  @children('kultur_file') files!: Query<KulturFile>
  @relation('kultur_option', 'id') kultur_option!: Relation<KulturOption>
  @relation('garten', 'garten_id') garten!: Relation<Garten>
  @relation('art', 'art_id') art!: Relation<Art>
  @relation('herkunft', 'herkunft_id') herkunft!: Relation<Herkunft>

  @lazy anlieferungs: Query<Lieferung> = this.collections
    .get<Lieferung>('lieferung')
    .query(Q.where('nach_kultur_id', this.id))
  @lazy auslieferungs: Query<Lieferung> = this.collections
    .get<Lieferung>('lieferung')
    .query(Q.where('von_kultur_id', this.id))

  @lazy label: Observable<Promise<string>> = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (kultur) => {
      let garten
      try {
        garten = await kultur.garten?.fetch()
      } catch {}
      let gartenPerson
      try {
        gartenPerson = await garten?.person?.fetch()
      } catch {}
      let art
      try {
        art = await kultur.art?.fetch()
      } catch {}
      let aeArt
      try {
        aeArt = await art?.ae_art?.fetch()
      } catch {}
      let herkunft
      try {
        herkunft = await kultur.herkunft.fetch()
      } catch {}

      return kulturLabelFromKultur({
        kultur,
        garten,
        gartenPerson,
        art,
        aeArt,
        herkunft,
      })
    }),
  )
  @lazy labelUnderArt: Observable<Promise<string>> = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (kultur) => {
      let garten
      try {
        garten = await kultur.garten?.fetch()
      } catch {}
      let gartenPerson
      try {
        gartenPerson = await garten?.person?.fetch()
      } catch {}
      let herkunft
      try {
        herkunft = await kultur.herkunft?.fetch()
      } catch {}

      return kulturLabelFromKulturUnderArt({
        kultur,
        garten,
        gartenPerson,
        herkunft,
      })
    }),
  )
  @lazy labelUnderGarten: Observable<Promise<string>> = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (kultur) => {
      let art
      try {
        art = await kultur.art?.fetch()
      } catch {}
      let aeArt
      try {
        aeArt = await art?.ae_art?.fetch()
      } catch {}
      let herkunft
      try {
        herkunft = await kultur.herkunft?.fetch()
      } catch {}

      return kulturLabelFromKulturUnderGarten({
        kultur,
        art,
        aeArt,
        herkunft,
      })
    }),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`kultur.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('kultur', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Teilkultur extends Model {
  static table = 'teilkultur'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    event: { type: 'has_many', foreignKey: 'teilkultur_id' },
    teilzaehlung: { type: 'has_many', foreignKey: 'teilkultur_id' },
  }

  @field('kultur_id') kultur_id!: string | null
  @field('name') name!: string | null
  @field('ort1') ort1!: string | null
  @field('ort2') ort2!: string | null
  @field('ort3') ort3!: string | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('kultur', 'kultur_id') kultur!: Relation<Kultur>
  @children('event') events!: Query<Event>
  @children('teilzaehlung') teilzaehlungs!: Query<Teilzaehlung>

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`teilkultur.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('teilkultur', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Zaehlung extends Model {
  static table = 'zaehlung'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    kultur_option: { type: 'belongs_to', key: 'kultur_id' },
    teilzaehlung: { type: 'has_many', foreignKey: 'zaehlung_id' },
    teilkultur: { type: 'has_many', foreignKey: 'zaehlung_id' },
  }

  @field('kultur_id') kultur_id!: string | null
  @field('datum') datum!: string | null
  @field('prognose') prognose!: boolean | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('kultur', 'kultur_id') kultur!: Relation<Kultur>
  @relation('kultur_option', 'kultur_id') kultur_option!: Relation<KulturOption>
  @children('teilzaehlung') teilzaehlungs!: Query<Teilzaehlung>
  @children('teilkultur') teilkulturs!: Query<Teilkultur>

  @lazy label: Observable<Promise<string>> = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (zaehlung) => {
      let teilzaehlungs
      try {
        teilzaehlungs = await zaehlung.teilzaehlungs?.fetch()
      } catch {}

      return await zaehlungLabelFromZaehlung({
        zaehlung,
        teilzaehlungs,
      })
    }),
  )
  // tried to use these fields in observeWithColumns - but does not work
  /*@lazy anzahl_pflanzen = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (zaehlung) => {
      const tzs = await zaehlung.teilzaehlungs.fetch()
      const anzs = tzs.filter((t) => exists(t.anzahl_pflanzen))
      const anzahl_pflanzen = anzs.length ? sum(anzs) : null

      return anzahl_pflanzen
    }),
  )
  @lazy anzahl_auspflanzbereit: Observable<number | null> = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (zaehlung) => {
      const tzs = await zaehlung.teilzaehlungs.fetch()
      const anzs = tzs.filter((t) => exists(t.anzahl_auspflanzbereit))
      const anzahl_auspflanzbereit = anzs.length ? sum(anzs) : null

      return anzahl_auspflanzbereit
    }),
  )
  @lazy anzahl_mutterpflanzen: Observable<number | null> = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (zaehlung) => {
      const tzs = await zaehlung.teilzaehlungs.fetch()
      const anzs = tzs.filter((t) => exists(t.anzahl_mutterpflanzen))
      const anzahl_mutterpflanzen = anzs.length ? sum(anzs) : null

      return anzahl_mutterpflanzen
    }),
  )*/

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`zaehlung.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('zaehlung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Teilzaehlung extends Model {
  static table = 'teilzaehlung'
  static associations: Associations = {
    zaehlung: { type: 'belongs_to', key: 'zaehlung_id' },
    teilkultur: { type: 'belongs_to', key: 'teilkultur_id' },
  }

  @field('zaehlung_id') zaehlung_id!: string | null
  @field('teilkultur_id') teilkultur_id!: string | null
  @field('anzahl_pflanzen') anzahl_pflanzen!: number | null
  @field('anzahl_auspflanzbereit') anzahl_auspflanzbereit!: number | null
  @field('anzahl_mutterpflanzen') anzahl_mutterpflanzen!: number | null
  @field('andere_menge') andere_menge!: string | null
  @field('auspflanzbereit_beschreibung') auspflanzbereit_beschreibung!: string | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('prognose_von_tz') prognose_von_tz!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('zaehlung', 'zaehlung_id') zaehlung!: Relation<Zaehlung>
  @relation('teilkultur', 'teilkultur_id') teilkultur!: Relation<Teilkultur>
  @lazy label: Observable<string> = this.teilkultur.observe().pipe(
    distinctUntilKeyChanged('teilkultur_id' as keyof Teilkultur),
    map$((teilkultur) => teilkulturLabelFromTeilkultur({ teilkultur })),
  )

  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`teilzaehlung.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('teilzaehlung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Person extends Model {
  static table = 'person'
  static associations: Associations = {
    person_option: { type: 'belongs_to', key: 'id' },
    user_role: { type: 'belongs_to', key: 'user_role_id' },
    sammel_lieferung: { type: 'has_many', foreignKey: 'person_id' },
    av: { type: 'has_many', foreignKey: 'person_id' },
    gv: { type: 'has_many', foreignKey: 'person_id' },
    sammlung: { type: 'has_many', foreignKey: 'person_id' },
    lieferung: { type: 'has_many', foreignKey: 'person_id' },
    garten: { type: 'has_many', foreignKey: 'person_id' },
    event: { type: 'has_many', foreignKey: 'person_id' },
    bedarf: { type: 'has_many', foreignKey: 'person_id' },
    person_file: { type: 'has_many', foreignKey: 'person_id' },
  }

  @field('nr') nr!: string | null
  @field('vorname') vorname!: string | null
  @field('name') name!: string | null
  @field('adresszusatz') adresszusatz!: string | null
  @field('strasse') strasse!: string | null
  @field('plz') plz!: number | null
  @field('ort') ort!: string | null
  @field('telefon_privat') telefon_privat!: string | null
  @field('telefon_geschaeft') telefon_geschaeft!: string | null
  @field('telefon_mobile') telefon_mobile!: string | null
  @field('email') email!: string | null
  @field('kein_email') kein_email!: boolean | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('account_id') account_id!: string | null
  @field('user_role_id') user_role_id!: string | null
  @field('kommerziell') kommerziell!: boolean | null
  @field('info') info!: boolean | null
  @field('aktiv') aktiv!: boolean | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  // https://github.com/Nozbe/WatermelonDB/issues/313#issuecomment-483293806
  @lazy fullname: Observable<string | undefined> = this.observe().pipe(
    distinctUntilChanged(
      (p, q) => p.name === q.name && p.vorname === q.vorname,
    ),
    map$((p) => {
      if (p.vorname && p.name) {
        return `${p.vorname} ${p.name}`
      }
      if (p.name) return p.name
      if (p.vorname) return p.vorname
      return undefined
    }),
  )

  @relation('user_role', 'user_role_id') user_role!: Relation<UserRole>
  @relation('person_option', 'id') person_option!: Relation<PersonOption>

  @children('sammel_lieferung') sammel_lieferungs!: Query<SammelLieferung>
  @children('av') avs!: Query<Av>
  @children('gv') gvs!: Query<Gv>
  @children('sammlung') sammlungs!: Query<Sammlung>
  @children('lieferung') lieferungs!: Query<Lieferung>
  @children('garten') gartens!: Query<Garten>
  @children('event') events!: Query<Event>
  @children('bedarf') bedarfs!: Query<Bedarf>
  @children('person_file') files!: Query<PersonFile>

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`person.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('person', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
    // delete firebase user
    deleteAccount({ person: this })
  }
}

export class SammelLieferung extends Model {
  static table = 'sammel_lieferung'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    sammlung: { type: 'belongs_to', key: 'von_sammlung_id' },
    von_kultur: { type: 'belongs_to', key: 'von_kultur_id' },
    nach_kultur: { type: 'belongs_to', key: 'nach_kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
    lieferung: { type: 'has_many', foreignKey: 'sammel_lieferung_id' },
  }

  @field('art_id') art_id!: string | null
  @field('person_id') person_id!: string | null
  @field('von_sammlung_id') von_sammlung_id!: string | null
  @field('von_kultur_id') von_kultur_id!: string | null
  @field('datum') datum!: string | null
  @field('nach_kultur_id') nach_kultur_id!: string | null
  @field('nach_ausgepflanzt') nach_ausgepflanzt!: boolean | null
  @field('von_anzahl_individuen') von_anzahl_individuen!: number | null
  @field('anzahl_pflanzen') anzahl_pflanzen!: number | null
  @field('anzahl_auspflanzbereit') anzahl_auspflanzbereit!: number | null
  @field('gramm_samen') gramm_samen!: number | null
  @field('andere_menge') andere_menge!: string | null
  @field('geplant') geplant!: boolean | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('art', 'art_id') art!: Relation<Art>
  @relation('sammlung', 'von_sammlung_id') sammlung!: Relation<Sammlung>
  @relation('sammlung', 'von_kultur_id') von_kultur!: Relation<Sammlung>
  @relation('sammlung', 'nach_kultur_id') nach_kultur!: Relation<Sammlung>
  @relation('person', 'person_id') person!: Relation<Person>
  @children('lieferung') lieferungs!: Query<Lieferung>

  @lazy label: Observable<Promise<string>> = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (lieferung) => {
      let vonKultur
      try {
        vonKultur = await this.collections
          .get<Kultur>('kultur')
          .find(lieferung.von_kultur_id ?? '')
      } catch {}
      let vonGarten
      try {
        vonGarten = await vonKultur?.garten?.fetch()
      } catch {}
      let gartenLabel
      try {
        gartenLabel = await vonGarten?.label.pipe(first$()).toPromise()
      } catch {}
      let person
      try {
        person = await lieferung.person?.fetch()
      } catch {}
      const personLabel = personLabelFromPerson({ person })
      const datumLabel = lieferung.datum
        ? DateTime.fromSQL(lieferung.datum).toFormat('yyyy.LL.dd')
        : `Kein Datum. ID: ${lieferung.id}`
      const von = gartenLabel ? `von: ${gartenLabel}` : ''
      const label = [datumLabel, von, personLabel].filter((e) => !!e).join('; ')

      return label
    }),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`sammel_lieferung.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('sammel_lieferung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Bedarf extends Model {
  static table = 'bedarf'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('kultur_id') kultur_id!: string | null
  @field('person_id') person_id!: string | null
  @field('jahr') jahr!: number | null
  @field('beschreibung') beschreibung!: string | null
  @field('bemerkungen') bemerkungen!: string | null
  @field('neues_material') neues_material!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('kultur', 'kultur_id') kultur!: Relation<Kultur>
  @relation('person', 'person_id') person!: Relation<Person>

  @lazy label: Observable<string> = this.observe().pipe(
    distinctUntilChanged(
      (a, b) => a.jahr === b.jahr && a.beschreibung === b.beschreibung,
    ),
    map$((bedarf) =>
      bedarfLabelFromBedarf({
        bedarf,
      }),
    ),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`bedarf.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('bedarf', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Event extends Model {
  static table = 'event'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('kultur_id') kultur_id!: string | null
  @field('teilkultur_id') teilkultur_id!: string | null
  @field('person_id') person_id!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('geplant') geplant!: boolean | null
  @field('datum') datum!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('kultur', 'kultur_id') kultur!: Relation<Kultur>
  @relation('person', 'person_id') person!: Relation<Person>

  @lazy label: Observable<string> = this.observe().pipe(
    distinctUntilChanged(
      (a, b) =>
        a.datum === b.datum &&
        a.geplant === b.geplant &&
        a.beschreibung === b.beschreibung,
    ),
    map$((event) =>
      eventLabelFromEvent({
        event,
      }),
    ),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`event.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('event', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Av extends Model {
  static table = 'av'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('art_id') art_id!: string
  @field('person_id') person_id!: string
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('art', 'art_id') art!: Relation<Art>
  @relation('person', 'person_id') person!: Relation<Person>

  @lazy personLabel: Observable<string> = this.person.observe().pipe(
    distinctUntilChanged(
      (a, b) =>
        personLabelFromPerson({ person: a }) ===
        personLabelFromPerson({ person: b }),
    ),
    map$((p) => personLabelFromPerson({ person: p })),
  )
  @lazy artLabel: Observable<Promise<string | undefined>> = this.art.observe().pipe(
    distinctUntilKeyChanged('ae_id'),
    map$(async (art) => {
      const artLabel = await art?.label.pipe(first$()).toPromise()

      return artLabel
    }),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`av.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('av', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Gv extends Model {
  static table = 'gv'
  static associations: Associations = {
    garten: { type: 'belongs_to', key: 'garten_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('garten_id') garten_id!: string | null
  @field('person_id') person_id!: string | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('garten', 'garten_id') garten!: Relation<Garten>
  @relation('person', 'person_id') person!: Relation<Person>

  @lazy personLabel: Observable<string> = this.person.observe().pipe(
    distinctUntilChanged(
      (a, b) =>
        personLabelFromPerson({ person: a }) ===
        personLabelFromPerson({ person: b }),
    ),
    map$((p) => personLabelFromPerson({ person: p })),
  )
  @lazy gartenLabel: Observable<Promise<string>> = this.garten.observe().pipe(
    distinctUntilChanged(),
    map$(async (garten) => {
      let person
      try {
        person = await garten.person?.fetch()
      } catch {}

      return gartenLabelFromGarten({ garten, person })
    }),
  )

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`gv.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('gv', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class ArtFile extends Model {
  static table = 'art_file'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
  }

  @field('art_id') art_id!: string | null
  @field('file_id') file_id!: string | null
  @field('file_mime_type') file_mime_type!: string | null
  @field('name') name!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('changed') changed!: string | null
  @field('_rev_at') _rev_at!: number | null

  @relation('art', 'art_id') art!: Relation<Art>

  @writer async edit({ field, value }: { field?: string; value?: unknown }) {
    // extract only the needed keys
    const { id, art_id, file_id, file_mime_type, name, beschreibung, changed } =
      this
    const newObject = {
      id,
      art_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/art_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      (row as unknown as Record<string, unknown>)[field as string] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom)?.delete(`/art_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class GartenFile extends Model {
  static table = 'garten_file'
  static associations: Associations = {
    garten: { type: 'belongs_to', key: 'garten_id' },
  }

  @field('garten_id') garten_id!: string | null
  @field('file_id') file_id!: string | null
  @field('file_mime_type') file_mime_type!: string | null
  @field('name') name!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('changed') changed!: string | null
  @field('_rev_at') _rev_at!: number | null

  @relation('garten', 'garten_id') garten!: Relation<Garten>

  @writer async edit({ field, value }: { field?: string; value?: unknown }) {
    // extract only the needed keys
    const {
      id,
      garten_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
    } = this
    const newObject = {
      id,
      garten_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/garten_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      (row as unknown as Record<string, unknown>)[field as string] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom)?.delete(`/garten_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class HerkunftFile extends Model {
  static table = 'herkunft_file'
  static associations: Associations = {
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
  }

  @field('herkunft_id') herkunft_id!: string | null
  @field('file_id') file_id!: string | null
  @field('file_mime_type') file_mime_type!: string | null
  @field('name') name!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('changed') changed!: string | null
  @field('_rev_at') _rev_at!: number | null

  @relation('herkunft', 'herkunft_id') herkunft!: Relation<Herkunft>

  @writer async edit({ field, value }: { field?: string; value?: unknown }) {
    // extract only the needed keys
    const {
      id,
      herkunft_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
    } = this
    const newObject = {
      id,
      herkunft_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/herkunft_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      (row as unknown as Record<string, unknown>)[field as string] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom)?.delete(`/herkunft_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class KulturFile extends Model {
  static table = 'kultur_file'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
  }

  @field('kultur_id') kultur_id!: string | null
  @field('file_id') file_id!: string | null
  @field('file_mime_type') file_mime_type!: string | null
  @field('name') name!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('changed') changed!: string | null
  @field('_rev_at') _rev_at!: number | null

  @relation('kultur', 'kultur_id') kultur!: Relation<Kultur>

  @writer async edit({ field, value }: { field?: string; value?: unknown }) {
    // extract only the needed keys
    const {
      id,
      kultur_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
    } = this
    const newObject = {
      id,
      kultur_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/kultur_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      (row as unknown as Record<string, unknown>)[field as string] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom)?.delete(`/kultur_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class LieferungFile extends Model {
  static table = 'lieferung_file'
  static associations: Associations = {
    lieferung: { type: 'belongs_to', key: 'lieferung_id' },
  }

  @field('lieferung_id') lieferung_id!: string | null
  @field('file_id') file_id!: string | null
  @field('file_mime_type') file_mime_type!: string | null
  @field('name') name!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('changed') changed!: string | null
  @field('_rev_at') _rev_at!: number | null

  @relation('lieferung', 'lieferung_id') lieferung!: Relation<Lieferung>

  @writer async edit({ field, value }: { field?: string; value?: unknown }) {
    // extract only the needed keys
    const {
      id,
      lieferung_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
    } = this
    const newObject = {
      id,
      lieferung_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/lieferung_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      (row as unknown as Record<string, unknown>)[field as string] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom)?.delete(`/lieferung_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class PersonFile extends Model {
  static table = 'person_file'
  static associations: Associations = {
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('person_id') person_id!: string | null
  @field('file_id') file_id!: string | null
  @field('file_mime_type') file_mime_type!: string | null
  @field('name') name!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('changed') changed!: string | null
  @field('_rev_at') _rev_at!: number | null

  @relation('person', 'person_id') person!: Relation<Person>

  @writer async edit({ field, value }: { field?: string; value?: unknown }) {
    // extract only the needed keys
    const {
      id,
      person_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
    } = this
    const newObject = {
      id,
      person_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/person_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      (row as unknown as Record<string, unknown>)[field as string] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom)?.delete(`/person_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class SammlungFile extends Model {
  static table = 'sammlung_file'
  static associations: Associations = {
    sammlung: { type: 'belongs_to', key: 'sammlung_id' },
  }

  @field('sammlung_id') sammlung_id!: string | null
  @field('file_id') file_id!: string | null
  @field('file_mime_type') file_mime_type!: string | null
  @field('name') name!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('changed') changed!: string | null
  @field('_rev_at') _rev_at!: number | null

  @relation('sammlung', 'sammlung_id') sammlung!: Relation<Sammlung>

  @writer async edit({ field, value }: { field?: string; value?: unknown }) {
    // extract only the needed keys
    const {
      id,
      sammlung_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
    } = this
    const newObject = {
      id,
      sammlung_id,
      file_id,
      file_mime_type,
      name,
      beschreibung,
      changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/sammlung_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      (row as unknown as Record<string, unknown>)[field as string] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom)?.delete(`/sammlung_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class ArtQk extends Model {
  static table = 'art_qk'

  @field('name') name!: string
  @field('titel') titel!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('sort') sort!: number | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`art_qk.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('art_qk', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class KulturOption extends Model {
  static table = 'kultur_option'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'id' },
  }

  @field('z_bemerkungen') z_bemerkungen!: boolean | null
  @field('tz_teilkultur_id') titel!: boolean | null
  @field('tz_andere_menge') tz_andere_menge!: boolean | null
  @field('tz_auspflanzbereit_beschreibung') tz_auspflanzbereit_beschreibung!: boolean | null
  @field('tz_bemerkungen') tz_bemerkungen!: boolean | null
  @field('tk') tk!: boolean | null
  @field('tk_bemerkungen') tk_bemerkungen!: boolean | null
  @field('ev_teilkultur_id') ev_teilkultur_id!: boolean | null
  @field('ev_geplant') ev_geplant!: boolean | null
  @field('ev_person_id') ev_person_id!: boolean | null
  @field('ev_datum') ev_datum!: boolean | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('kultur', 'id') kultur!: Relation<Kultur>

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`kultur_option.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('kultur_option', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class KulturQk extends Model {
  static table = 'kultur_qk'

  @field('name') name!: string
  @field('titel') titel!: string | null
  @field('beschreibung') beschreibung!: string | null
  @field('sort') sort!: number | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`kultur_qk.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('kultur_qk', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class PersonOption extends Model {
  static table = 'person_option'
  static associations: Associations = {
    person: { type: 'belongs_to', key: 'id' },
  }

  @field('ar_name_deutsch') ar_name_deutsch!: boolean | null
  @field('ga_strasse') ga_strasse!: boolean | null
  @field('ga_plz') ga_plz!: boolean | null
  @field('ga_ort') ga_ort!: boolean | null
  @field('ga_geom_point') ga_geom_point!: boolean | null
  @field('ga_lat_lng') ga_lat_lng!: boolean | null
  @field('ga_aktiv') ga_aktiv!: boolean | null
  @field('ga_bemerkungen') ga_bemerkungen!: boolean | null
  @field('hk_kanton') hk_kanton!: boolean | null
  @field('hk_land') hk_land!: boolean | null
  @field('hk_bemerkungen') hk_bemerkungen!: boolean | null
  @field('hk_geom_point') hk_geom_point!: boolean | null
  @field('ku_zwischenlager') ku_zwischenlager!: boolean | null
  @field('ku_erhaltungskultur') ku_erhaltungskultur!: boolean | null
  @field('li_show_sl_felder') li_show_sl_felder!: boolean | null
  @field('li_show_sl') li_show_sl!: boolean | null
  @field('sl_show_empty_when_next_to_li') sl_show_empty_when_next_to_li!: boolean | null
  @field('sl_auto_copy_edits') sl_auto_copy_edits!: boolean | null
  @field('tree_kultur') tree_kultur!: boolean | null
  @field('tree_teilkultur') tree_teilkultur!: boolean | null
  @field('tree_zaehlung') tree_zaehlung!: boolean | null
  @field('tree_lieferung') tree_lieferung!: boolean | null
  @field('tree_event') tree_event!: boolean | null
  @json('art_qk_choosen', dontSanitize) art_qk_choosen!: string[] | null
  @json('kultur_qk_choosen', dontSanitize) kultur_qk_choosen!: string[] | null
  @field('changed') changed!: string | null
  @field('changed_by') changed_by!: string | null
  @field('_rev') _rev!: string | null
  @field('_parent_rev') _parent_rev!: string | null
  @json('_revisions', dontSanitize) _revisions!: string[] | null
  @field('_depth') _depth!: number | null
  @field('_deleted') _deleted!: boolean | null
  @json('_conflicts', dontSanitize) _conflicts!: string[] | null

  @relation('person', 'id') person!: Relation<Person>

  @writer async removeConflict(_rev: string) {
    await this.update((row) => {
      row._conflicts = (this._conflicts ?? []).filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`person_option.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev('person_option', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        (row as unknown as Record<string, unknown>)[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email ?? null
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class UserRole extends Model {
  static table = 'user_role'
  static associations: Associations = {
    person: { type: 'has_many', foreignKey: 'user_role_id' },
  }

  @field('name') name!: string
  @field('label') label!: string | null
  @field('sort') sort!: number | null
  @field('comment') comment!: string | null
  @field('changed') changed!: string | null

  @relation('person', 'user_role_id') person!: Relation<Person>
}
