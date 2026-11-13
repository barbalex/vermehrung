import { Model, type Query, type Relation } from 'nitromelondb'
import type { Associations } from 'nitromelondb/Model'
import { children, field, json, relation } from 'nitromelondb/decorators'
import { modelDecorators } from './modelDecorators.ts'
import { Q } from 'nitromelondb'
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

// the table of a model instance - every model defines it via
// `static table`
const tableOf = (model: object) =>
  (model.constructor as unknown as { table: string }).table

// base class for the editable rev-versioned models: the writers are
// identical across all of them, varying only in the table name
export class VermehrungModel extends Model {
  async removeConflict(_rev: string) {
    await this.update((row) => {
      const r = row as unknown as Record<string, unknown>
      r._conflicts = ((r._conflicts as string[] | null) ?? []).filter(
        (x) => x !== _rev,
      )
    })
  }

  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  async edit({
    field,
    value,
    values,
  }: {
    field?: string
    value?: unknown
    values?: Record<string, unknown>
  }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    const table = tableOf(this)
    unsetError(`${table}.${field}`)
    const changes = values ?? { [field as string]: value }
    registerDirtyRev(table, this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      const r = row as unknown as Record<string, unknown>
      Object.entries(changes).forEach(([key, val]) => {
        r[key] = val
      })
      r.changed = new Date().toISOString()
      r.changed_by = store.get(userAtom)?.email ?? null
    })
  }

  async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

// base class for the file models: they are not rev-versioned - edits
// patch the row directly, deletes remove it
export class VermehrungFileModel extends Model {
  async edit({ field, value }: { field?: string; value?: unknown }) {
    const table = tableOf(this)
    const parentColumn = `${table.replace(/_file$/, '')}_id`
    const row = this as unknown as Record<string, unknown>
    const newObject = {
      id: row.id,
      [parentColumn]: row[parentColumn],
      file_id: row.file_id,
      file_mime_type: row.file_mime_type,
      name: row.name,
      beschreibung: row.beschreibung,
      changed: row.changed,
      [field as string]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        ?.patch(`/${table}?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: (error as Error).message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((r) => {
      ;(r as unknown as Record<string, unknown>)[field as string] = value
    })
  }

  async delete() {
    const table = tableOf(this)
    try {
      await store.get(apiClientAtom)?.delete(`/${table}?id=eq.${this.id}`)
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

export class Herkunft extends VermehrungModel {
  static table = 'herkunft'
  static associations: Associations = {
    sammlung: { type: 'has_many', foreignKey: 'herkunft_id' },
    kultur: { type: 'has_many', foreignKey: 'herkunft_id' },
    herkunft_file: { type: 'has_many', foreignKey: 'herkunft_id' },
  }

  declare nr: string | null
  declare lokalname: string | null
  declare gemeinde: string | null
  declare kanton: string | null
  declare land: string | null
  declare geom_point: unknown
  declare wgs84_lat: number | null
  declare wgs84_long: number | null
  declare lv95_x: number | null
  declare lv95_y: number | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare sammlungs: Query<Sammlung>
  declare herkunfts: Query<Herkunft>
  declare files: Query<HerkunftFile>
}
modelDecorators(
  Herkunft,
  {
    nr: field('nr'),
    lokalname: field('lokalname'),
    gemeinde: field('gemeinde'),
    kanton: field('kanton'),
    land: field('land'),
    geom_point: json('geom_point', dontSanitize),
    wgs84_lat: field('wgs84_lat'),
    wgs84_long: field('wgs84_long'),
    lv95_x: field('lv95_x'),
    lv95_y: field('lv95_y'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    sammlungs: children('sammlung'),
    herkunfts: children('herkunft'),
    files: children('herkunft_file'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Sammlung extends VermehrungModel {
  static table = 'sammlung'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
    person: { type: 'belongs_to', key: 'person_id' },
    lieferung: { type: 'has_many', foreignKey: 'von_sammlung_id' },
    sammlung_file: { type: 'has_many', foreignKey: 'sammlung_id' },
  }

  declare art_id: string | null
  declare person_id: string | null
  declare herkunft_id: string | null
  declare nr: string | null
  declare datum: string | null
  declare von_anzahl_individuen: number | null
  declare anzahl_pflanzen: number | null
  declare gramm_samen: number | null
  declare andere_menge: string | null
  declare geom_point: unknown
  declare wgs84_lat: number | null
  declare wgs84_long: number | null
  declare lv95_x: number | null
  declare lv95_y: number | null
  declare geplant: boolean | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare art: Relation<Art>
  declare herkunft: Relation<Herkunft>
  declare person: Relation<Person>
  declare lieferungs: Query<Lieferung>
  declare files: Query<SammlungFile>

  #label?: Observable<Promise<string>>
  get label(): Observable<Promise<string>> {
    return (this.#label ??= this.observe().pipe(
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
    ))
  }
  #labelUnderHerkunft?: Observable<Promise<string>>
  get labelUnderHerkunft(): Observable<Promise<string>> {
    return (this.#labelUnderHerkunft ??= this.observe().pipe(
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
    ))
  }
}
modelDecorators(
  Sammlung,
  {
    art_id: field('art_id'),
    person_id: field('person_id'),
    herkunft_id: field('herkunft_id'),
    nr: field('nr'),
    datum: field('datum'),
    von_anzahl_individuen: field('von_anzahl_individuen'),
    anzahl_pflanzen: field('anzahl_pflanzen'),
    gramm_samen: field('gramm_samen'),
    andere_menge: field('andere_menge'),
    geom_point: json('geom_point', dontSanitize),
    wgs84_lat: field('wgs84_lat'),
    wgs84_long: field('wgs84_long'),
    lv95_x: field('lv95_x'),
    lv95_y: field('lv95_y'),
    geplant: field('geplant'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    art: relation('art', 'art_id'),
    herkunft: relation('herkunft', 'herkunft_id'),
    person: relation('person', 'person_id'),
    lieferungs: children('lieferung'),
    files: children('sammlung_file'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Lieferung extends VermehrungModel {
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

  declare sammel_lieferung_id: string | null
  declare art_id: string | null
  declare person_id: string | null
  declare von_sammlung_id: string | null
  declare von_kultur_id: string | null
  declare datum: string | null
  declare nach_kultur_id: string | null
  declare nach_ausgepflanzt: boolean | null
  declare von_anzahl_individuen: number | null
  declare anzahl_pflanzen: number | null
  declare anzahl_auspflanzbereit: number | null
  declare gramm_samen: number | null
  declare andere_menge: string | null
  declare geplant: boolean | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare art: Relation<Art>
  declare sammlung: Relation<Sammlung>
  declare sammel_lieferung: Relation<SammelLieferung>
  //@relation('kultur', 'von_kultur_id') von_kultur
  //@relation('kultur', 'nach_kultur_id') nach_kultur
  declare person: Relation<Person>
  declare files: Query<LieferungFile>

  #von_kultur?: Observable<Promise<Kultur | undefined>>
  get von_kultur(): Observable<Promise<Kultur | undefined>> {
    return (this.#von_kultur ??= this.observe().pipe(
      map$(async (lieferung) => {
        let vonKultur
        try {
          vonKultur = await lieferung.collections
            .get<Kultur>('kultur')
            .find(lieferung.von_kultur_id ?? '')
        } catch {}
        return vonKultur
      }),
    ))
  }
  #nach_kultur?: Observable<Promise<Kultur | undefined>>
  get nach_kultur(): Observable<Promise<Kultur | undefined>> {
    return (this.#nach_kultur ??= this.observe().pipe(
      map$(async (lieferung) => {
        let nachKultur
        try {
          nachKultur = await lieferung.collections
            .get<Kultur>('kultur')
            .find(lieferung.nach_kultur_id ?? '')
        } catch {}
        return nachKultur
      }),
    ))
  }

  #label?: Observable<string>
  get label(): Observable<string> {
    return (this.#label ??= this.observe().pipe(
      distinctUntilChanged(
        (a, b) =>
          a.datum === b.datum &&
          a.anzahl_pflanzen === b.anzahl_pflanzen &&
          a.anzahl_auspflanzbereit === b.anzahl_auspflanzbereit &&
          a.geplant === b.geplant,
      ),
      map$((lieferung) => lieferungLabelFromLieferung({ lieferung })),
    ))
  }
}
modelDecorators(
  Lieferung,
  {
    sammel_lieferung_id: field('sammel_lieferung_id'),
    art_id: field('art_id'),
    person_id: field('person_id'),
    von_sammlung_id: field('von_sammlung_id'),
    von_kultur_id: field('von_kultur_id'),
    datum: field('datum'),
    nach_kultur_id: field('nach_kultur_id'),
    nach_ausgepflanzt: field('nach_ausgepflanzt'),
    von_anzahl_individuen: field('von_anzahl_individuen'),
    anzahl_pflanzen: field('anzahl_pflanzen'),
    anzahl_auspflanzbereit: field('anzahl_auspflanzbereit'),
    gramm_samen: field('gramm_samen'),
    andere_menge: field('andere_menge'),
    geplant: field('geplant'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    art: relation('art', 'art_id'),
    sammlung: relation('sammlung', 'von_sammlung_id'),
    sammel_lieferung: relation('sammel_lieferung', 'sammel_lieferung_id'),
    person: relation('person', 'person_id'),
    files: children('lieferung_file'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Art extends VermehrungModel {
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

  declare ae_id: string | null
  declare set: string | null
  declare apflora_av: string | null
  declare apflora_ap: boolean | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare ae_art: Relation<AeArt>

  declare sammlungs: Query<Sammlung>
  declare sammel_lieferungs: Query<SammelLieferung>
  declare lieferungs: Query<Lieferung>
  declare kulturs: Query<Kultur>
  declare avs: Query<Av>
  declare files: Query<ArtFile>

  #label?: Observable<string>
  get label(): Observable<string> {
    return (this.#label ??= this.ae_art.observe().pipe(
      distinctUntilKeyChanged('ae_id' as keyof AeArt),
      map$((ae_art) => artLabelFromAeArt({ ae_art })),
    ))
  }
  #herkunfts?: Query<Herkunft>
  get herkunfts(): Query<Herkunft> {
    return (this.#herkunfts ??= this.collections
      .get<Herkunft>('herkunft')
      .query(Q.on('sammlung', 'art_id', this.id)))
  }

  // values is meant to enable updating multiple fields at once
}
modelDecorators(
  Art,
  {
    ae_id: field('ae_id'),
    set: field('set'),
    apflora_av: field('apflora_av'),
    apflora_ap: field('apflora_ap'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    ae_art: relation('ae_art', 'ae_id'),
    sammlungs: children('sammlung'),
    sammel_lieferungs: children('sammel_lieferung'),
    lieferungs: children('lieferung'),
    kulturs: children('kultur'),
    avs: children('av'),
    files: children('art_file'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class ApfloraAp extends Model {
  static table = 'apflora_ap'
  static associations: Associations = {
    ae_art: { type: 'belongs_to', key: 'ae_id' },
  }

  declare ae_id: string | null
  declare ap: boolean | null
  declare av: string | null
}
modelDecorators(ApfloraAp, {
  ae_id: field('ae_id'),
  ap: field('ap'),
  av: field('av'),
})

export class AeArt extends Model {
  static table = 'ae_art'
  static associations: Associations = {
    art: { type: 'has_many', foreignKey: 'ae_id' },
  }

  declare name: string | null
  declare taxonomy: string | null
  declare changed: string | null

  declare arts: Query<Art>
}
modelDecorators(AeArt, {
  name: field('name'),
  taxonomy: field('taxonomy'),
  changed: field('changed'),
  arts: children('art'),
})

export class Garten extends VermehrungModel {
  static table = 'garten'
  static associations: Associations = {
    person: { type: 'belongs_to', key: 'person_id' },
    kultur: { type: 'has_many', foreignKey: 'garten_id' },
    gv: { type: 'has_many', foreignKey: 'garten_id' },
    garten_file: { type: 'has_many', foreignKey: 'garten_id' },
  }

  declare name: string | null
  declare person_id: string | null
  declare strasse: string | null
  declare plz: number | null
  declare ort: string | null
  declare geom_point: unknown
  declare wgs84_lat: number | null
  declare wgs84_long: number | null
  declare lv95_x: number | null
  declare lv95_y: number | null
  declare aktiv: boolean | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare kulturs: Query<Kultur>
  declare gvs: Query<Gv>
  declare files: Query<GartenFile>
  declare person: Relation<Person>

  #label?: Observable<Promise<string>>
  get label(): Observable<Promise<string>> {
    return (this.#label ??= this.observe().pipe(
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
    ))
  }
}
modelDecorators(
  Garten,
  {
    name: field('name'),
    person_id: field('person_id'),
    strasse: field('strasse'),
    plz: field('plz'),
    ort: field('ort'),
    geom_point: json('geom_point', dontSanitize),
    wgs84_lat: field('wgs84_lat'),
    wgs84_long: field('wgs84_long'),
    lv95_x: field('lv95_x'),
    lv95_y: field('lv95_y'),
    aktiv: field('aktiv'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    kulturs: children('kultur'),
    gvs: children('gv'),
    files: children('garten_file'),
    person: relation('person', 'person_id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Kultur extends VermehrungModel {
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
    bedarf: { type: 'has_many', foreignKey: 'kultur_id' },
    kultur_option: { type: 'belongs_to', key: 'id' },
    kultur_file: { type: 'has_many', foreignKey: 'kultur_id' },
  }

  declare art_id: string | null
  declare herkunft_id: string | null
  declare garten_id: string | null
  declare zwischenlager: boolean | null
  declare erhaltungskultur: boolean | null
  declare von_anzahl_individuen: number | null
  declare bemerkungen: string | null
  declare aktiv: boolean | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare teilkulturs: Query<Teilkultur>
  declare zaehlungs: Query<Zaehlung>
  declare bedarfs: Query<Bedarf>
  declare files: Query<KulturFile>
  declare kultur_option: Relation<KulturOption>
  declare garten: Relation<Garten>
  declare art: Relation<Art>
  declare herkunft: Relation<Herkunft>

  #anlieferungs?: Query<Lieferung>
  get anlieferungs(): Query<Lieferung> {
    return (this.#anlieferungs ??= this.collections
      .get<Lieferung>('lieferung')
      .query(Q.where('nach_kultur_id', this.id)))
  }
  #auslieferungs?: Query<Lieferung>
  get auslieferungs(): Query<Lieferung> {
    return (this.#auslieferungs ??= this.collections
      .get<Lieferung>('lieferung')
      .query(Q.where('von_kultur_id', this.id)))
  }

  #label?: Observable<Promise<string>>
  get label(): Observable<Promise<string>> {
    return (this.#label ??= this.observe().pipe(
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
    ))
  }
  #labelUnderArt?: Observable<Promise<string>>
  get labelUnderArt(): Observable<Promise<string>> {
    return (this.#labelUnderArt ??= this.observe().pipe(
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
    ))
  }
  #labelUnderGarten?: Observable<Promise<string>>
  get labelUnderGarten(): Observable<Promise<string>> {
    return (this.#labelUnderGarten ??= this.observe().pipe(
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
    ))
  }
}
modelDecorators(
  Kultur,
  {
    art_id: field('art_id'),
    herkunft_id: field('herkunft_id'),
    garten_id: field('garten_id'),
    zwischenlager: field('zwischenlager'),
    erhaltungskultur: field('erhaltungskultur'),
    von_anzahl_individuen: field('von_anzahl_individuen'),
    bemerkungen: field('bemerkungen'),
    aktiv: field('aktiv'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    teilkulturs: children('teilkultur'),
    zaehlungs: children('zaehlung'),
    bedarfs: children('bedarf'),
    files: children('kultur_file'),
    kultur_option: relation('kultur_option', 'id'),
    garten: relation('garten', 'garten_id'),
    art: relation('art', 'art_id'),
    herkunft: relation('herkunft', 'herkunft_id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Teilkultur extends VermehrungModel {
  static table = 'teilkultur'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    teilzaehlung: { type: 'has_many', foreignKey: 'teilkultur_id' },
  }

  declare kultur_id: string | null
  declare name: string | null
  declare ort1: string | null
  declare ort2: string | null
  declare ort3: string | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare kultur: Relation<Kultur>
  declare teilzaehlungs: Query<Teilzaehlung>
}
modelDecorators(
  Teilkultur,
  {
    kultur_id: field('kultur_id'),
    name: field('name'),
    ort1: field('ort1'),
    ort2: field('ort2'),
    ort3: field('ort3'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    kultur: relation('kultur', 'kultur_id'),
    teilzaehlungs: children('teilzaehlung'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Zaehlung extends VermehrungModel {
  static table = 'zaehlung'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    kultur_option: { type: 'belongs_to', key: 'kultur_id' },
    teilzaehlung: { type: 'has_many', foreignKey: 'zaehlung_id' },
    teilkultur: { type: 'has_many', foreignKey: 'zaehlung_id' },
  }

  declare kultur_id: string | null
  declare datum: string | null
  declare prognose: boolean | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare kultur: Relation<Kultur>
  declare kultur_option: Relation<KulturOption>
  declare teilzaehlungs: Query<Teilzaehlung>
  declare teilkulturs: Query<Teilkultur>

  #label?: Observable<Promise<string>>
  get label(): Observable<Promise<string>> {
    return (this.#label ??= this.observe().pipe(
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
    ))
  }
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
}
modelDecorators(
  Zaehlung,
  {
    kultur_id: field('kultur_id'),
    datum: field('datum'),
    prognose: field('prognose'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    kultur: relation('kultur', 'kultur_id'),
    kultur_option: relation('kultur_option', 'kultur_id'),
    teilzaehlungs: children('teilzaehlung'),
    teilkulturs: children('teilkultur'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Teilzaehlung extends VermehrungModel {
  static table = 'teilzaehlung'
  static associations: Associations = {
    zaehlung: { type: 'belongs_to', key: 'zaehlung_id' },
    teilkultur: { type: 'belongs_to', key: 'teilkultur_id' },
  }

  declare zaehlung_id: string | null
  declare teilkultur_id: string | null
  declare anzahl_pflanzen: number | null
  declare anzahl_auspflanzbereit: number | null
  declare anzahl_mutterpflanzen: number | null
  declare andere_menge: string | null
  declare auspflanzbereit_beschreibung: string | null
  declare bemerkungen: string | null
  declare prognose_von_tz: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare zaehlung: Relation<Zaehlung>
  declare teilkultur: Relation<Teilkultur>
  #label?: Observable<string>
  get label(): Observable<string> {
    return (this.#label ??= this.teilkultur.observe().pipe(
      distinctUntilKeyChanged('teilkultur_id' as keyof Teilkultur),
      map$((teilkultur) => teilkulturLabelFromTeilkultur({ teilkultur })),
    ))
  }
}
modelDecorators(
  Teilzaehlung,
  {
    zaehlung_id: field('zaehlung_id'),
    teilkultur_id: field('teilkultur_id'),
    anzahl_pflanzen: field('anzahl_pflanzen'),
    anzahl_auspflanzbereit: field('anzahl_auspflanzbereit'),
    anzahl_mutterpflanzen: field('anzahl_mutterpflanzen'),
    andere_menge: field('andere_menge'),
    auspflanzbereit_beschreibung: field('auspflanzbereit_beschreibung'),
    bemerkungen: field('bemerkungen'),
    prognose_von_tz: field('prognose_von_tz'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    zaehlung: relation('zaehlung', 'zaehlung_id'),
    teilkultur: relation('teilkultur', 'teilkultur_id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Person extends VermehrungModel {
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
    bedarf: { type: 'has_many', foreignKey: 'person_id' },
    person_file: { type: 'has_many', foreignKey: 'person_id' },
  }

  declare nr: string | null
  declare vorname: string | null
  declare name: string | null
  declare adresszusatz: string | null
  declare strasse: string | null
  declare plz: number | null
  declare ort: string | null
  declare telefon_privat: string | null
  declare telefon_geschaeft: string | null
  declare telefon_mobile: string | null
  declare email: string | null
  declare kein_email: boolean | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare account_id: string | null
  declare user_role_id: string | null
  declare kommerziell: boolean | null
  declare info: boolean | null
  declare aktiv: boolean | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  // https://github.com/Nozbe/WatermelonDB/issues/313#issuecomment-483293806
  #fullname?: Observable<string | undefined>
  get fullname(): Observable<string | undefined> {
    return (this.#fullname ??= this.observe().pipe(
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
    ))
  }

  declare user_role: Relation<UserRole>
  declare person_option: Relation<PersonOption>

  declare sammel_lieferungs: Query<SammelLieferung>
  declare avs: Query<Av>
  declare gvs: Query<Gv>
  declare sammlungs: Query<Sammlung>
  declare lieferungs: Query<Lieferung>
  declare gartens: Query<Garten>
  declare bedarfs: Query<Bedarf>
  declare files: Query<PersonFile>

  async delete() {
    await super.delete()
    // delete firebase user
    deleteAccount({ person: this })
  }
}
modelDecorators(
  Person,
  {
    nr: field('nr'),
    vorname: field('vorname'),
    name: field('name'),
    adresszusatz: field('adresszusatz'),
    strasse: field('strasse'),
    plz: field('plz'),
    ort: field('ort'),
    telefon_privat: field('telefon_privat'),
    telefon_geschaeft: field('telefon_geschaeft'),
    telefon_mobile: field('telefon_mobile'),
    email: field('email'),
    kein_email: field('kein_email'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    account_id: field('account_id'),
    user_role_id: field('user_role_id'),
    kommerziell: field('kommerziell'),
    info: field('info'),
    aktiv: field('aktiv'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    user_role: relation('user_role', 'user_role_id'),
    person_option: relation('person_option', 'id'),
    sammel_lieferungs: children('sammel_lieferung'),
    avs: children('av'),
    gvs: children('gv'),
    sammlungs: children('sammlung'),
    lieferungs: children('lieferung'),
    gartens: children('garten'),
    bedarfs: children('bedarf'),
    files: children('person_file'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class SammelLieferung extends VermehrungModel {
  static table = 'sammel_lieferung'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    sammlung: { type: 'belongs_to', key: 'von_sammlung_id' },
    von_kultur: { type: 'belongs_to', key: 'von_kultur_id' },
    nach_kultur: { type: 'belongs_to', key: 'nach_kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
    lieferung: { type: 'has_many', foreignKey: 'sammel_lieferung_id' },
  }

  declare art_id: string | null
  declare person_id: string | null
  declare von_sammlung_id: string | null
  declare von_kultur_id: string | null
  declare datum: string | null
  declare nach_kultur_id: string | null
  declare nach_ausgepflanzt: boolean | null
  declare von_anzahl_individuen: number | null
  declare anzahl_pflanzen: number | null
  declare anzahl_auspflanzbereit: number | null
  declare gramm_samen: number | null
  declare andere_menge: string | null
  declare geplant: boolean | null
  declare bemerkungen: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare art: Relation<Art>
  declare sammlung: Relation<Sammlung>
  declare von_kultur: Relation<Sammlung>
  declare nach_kultur: Relation<Sammlung>
  declare person: Relation<Person>
  declare lieferungs: Query<Lieferung>

  #label?: Observable<Promise<string>>
  get label(): Observable<Promise<string>> {
    return (this.#label ??= this.observe().pipe(
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
        const datumLabel =
          lieferung.datum ?
            DateTime.fromSQL(lieferung.datum).toFormat('yyyy.LL.dd')
          : `Kein Datum. ID: ${lieferung.id}`
        const von = gartenLabel ? `von: ${gartenLabel}` : ''
        const label = [datumLabel, von, personLabel]
          .filter((e) => !!e)
          .join('; ')

        return label
      }),
    ))
  }
}
modelDecorators(
  SammelLieferung,
  {
    art_id: field('art_id'),
    person_id: field('person_id'),
    von_sammlung_id: field('von_sammlung_id'),
    von_kultur_id: field('von_kultur_id'),
    datum: field('datum'),
    nach_kultur_id: field('nach_kultur_id'),
    nach_ausgepflanzt: field('nach_ausgepflanzt'),
    von_anzahl_individuen: field('von_anzahl_individuen'),
    anzahl_pflanzen: field('anzahl_pflanzen'),
    anzahl_auspflanzbereit: field('anzahl_auspflanzbereit'),
    gramm_samen: field('gramm_samen'),
    andere_menge: field('andere_menge'),
    geplant: field('geplant'),
    bemerkungen: field('bemerkungen'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    art: relation('art', 'art_id'),
    sammlung: relation('sammlung', 'von_sammlung_id'),
    von_kultur: relation('sammlung', 'von_kultur_id'),
    nach_kultur: relation('sammlung', 'nach_kultur_id'),
    person: relation('person', 'person_id'),
    lieferungs: children('lieferung'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Bedarf extends VermehrungModel {
  static table = 'bedarf'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  declare kultur_id: string | null
  declare person_id: string | null
  declare jahr: number | null
  declare beschreibung: string | null
  declare bemerkungen: string | null
  declare neues_material: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare kultur: Relation<Kultur>
  declare person: Relation<Person>

  #label?: Observable<string>
  get label(): Observable<string> {
    return (this.#label ??= this.observe().pipe(
      distinctUntilChanged(
        (a, b) => a.jahr === b.jahr && a.beschreibung === b.beschreibung,
      ),
      map$((bedarf) =>
        bedarfLabelFromBedarf({
          bedarf,
        }),
      ),
    ))
  }
}
modelDecorators(
  Bedarf,
  {
    kultur_id: field('kultur_id'),
    person_id: field('person_id'),
    jahr: field('jahr'),
    beschreibung: field('beschreibung'),
    bemerkungen: field('bemerkungen'),
    neues_material: field('neues_material'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    kultur: relation('kultur', 'kultur_id'),
    person: relation('person', 'person_id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Av extends VermehrungModel {
  static table = 'av'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  declare art_id: string
  declare person_id: string
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare art: Relation<Art>
  declare person: Relation<Person>

  #personLabel?: Observable<string>
  get personLabel(): Observable<string> {
    return (this.#personLabel ??= this.person.observe().pipe(
      distinctUntilChanged(
        (a, b) =>
          personLabelFromPerson({ person: a }) ===
          personLabelFromPerson({ person: b }),
      ),
      map$((p) => personLabelFromPerson({ person: p })),
    ))
  }
  #artLabel?: Observable<Promise<string | undefined>>
  get artLabel(): Observable<Promise<string | undefined>> {
    return (this.#artLabel ??= this.art.observe().pipe(
      distinctUntilKeyChanged('ae_id'),
      map$(async (art) => {
        const artLabel = await art?.label.pipe(first$()).toPromise()

        return artLabel
      }),
    ))
  }
}
modelDecorators(
  Av,
  {
    art_id: field('art_id'),
    person_id: field('person_id'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    art: relation('art', 'art_id'),
    person: relation('person', 'person_id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class Gv extends VermehrungModel {
  static table = 'gv'
  static associations: Associations = {
    garten: { type: 'belongs_to', key: 'garten_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  declare garten_id: string | null
  declare person_id: string | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare garten: Relation<Garten>
  declare person: Relation<Person>

  #personLabel?: Observable<string>
  get personLabel(): Observable<string> {
    return (this.#personLabel ??= this.person.observe().pipe(
      distinctUntilChanged(
        (a, b) =>
          personLabelFromPerson({ person: a }) ===
          personLabelFromPerson({ person: b }),
      ),
      map$((p) => personLabelFromPerson({ person: p })),
    ))
  }
  #gartenLabel?: Observable<Promise<string>>
  get gartenLabel(): Observable<Promise<string>> {
    return (this.#gartenLabel ??= this.garten.observe().pipe(
      distinctUntilChanged(),
      map$(async (garten) => {
        let person
        try {
          person = await garten.person?.fetch()
        } catch {}

        return gartenLabelFromGarten({ garten, person })
      }),
    ))
  }
}
modelDecorators(
  Gv,
  {
    garten_id: field('garten_id'),
    person_id: field('person_id'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    garten: relation('garten', 'garten_id'),
    person: relation('person', 'person_id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class ArtFile extends VermehrungFileModel {
  static table = 'art_file'
  static associations: Associations = {
    art: { type: 'belongs_to', key: 'art_id' },
  }

  declare art_id: string | null
  declare file_id: string | null
  declare file_mime_type: string | null
  declare name: string | null
  declare beschreibung: string | null
  declare changed: string | null
  declare _rev_at: number | null

  declare art: Relation<Art>
}
modelDecorators(
  ArtFile,
  {
    art_id: field('art_id'),
    file_id: field('file_id'),
    file_mime_type: field('file_mime_type'),
    name: field('name'),
    beschreibung: field('beschreibung'),
    changed: field('changed'),
    _rev_at: field('_rev_at'),
    art: relation('art', 'art_id'),
  },
  ['edit', 'delete'],
)

export class GartenFile extends VermehrungFileModel {
  static table = 'garten_file'
  static associations: Associations = {
    garten: { type: 'belongs_to', key: 'garten_id' },
  }

  declare garten_id: string | null
  declare file_id: string | null
  declare file_mime_type: string | null
  declare name: string | null
  declare beschreibung: string | null
  declare changed: string | null
  declare _rev_at: number | null

  declare garten: Relation<Garten>
}
modelDecorators(
  GartenFile,
  {
    garten_id: field('garten_id'),
    file_id: field('file_id'),
    file_mime_type: field('file_mime_type'),
    name: field('name'),
    beschreibung: field('beschreibung'),
    changed: field('changed'),
    _rev_at: field('_rev_at'),
    garten: relation('garten', 'garten_id'),
  },
  ['edit', 'delete'],
)

export class HerkunftFile extends VermehrungFileModel {
  static table = 'herkunft_file'
  static associations: Associations = {
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
  }

  declare herkunft_id: string | null
  declare file_id: string | null
  declare file_mime_type: string | null
  declare name: string | null
  declare beschreibung: string | null
  declare changed: string | null
  declare _rev_at: number | null

  declare herkunft: Relation<Herkunft>
}
modelDecorators(
  HerkunftFile,
  {
    herkunft_id: field('herkunft_id'),
    file_id: field('file_id'),
    file_mime_type: field('file_mime_type'),
    name: field('name'),
    beschreibung: field('beschreibung'),
    changed: field('changed'),
    _rev_at: field('_rev_at'),
    herkunft: relation('herkunft', 'herkunft_id'),
  },
  ['edit', 'delete'],
)

export class KulturFile extends VermehrungFileModel {
  static table = 'kultur_file'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
  }

  declare kultur_id: string | null
  declare file_id: string | null
  declare file_mime_type: string | null
  declare name: string | null
  declare beschreibung: string | null
  declare changed: string | null
  declare _rev_at: number | null

  declare kultur: Relation<Kultur>
}
modelDecorators(
  KulturFile,
  {
    kultur_id: field('kultur_id'),
    file_id: field('file_id'),
    file_mime_type: field('file_mime_type'),
    name: field('name'),
    beschreibung: field('beschreibung'),
    changed: field('changed'),
    _rev_at: field('_rev_at'),
    kultur: relation('kultur', 'kultur_id'),
  },
  ['edit', 'delete'],
)

export class LieferungFile extends VermehrungFileModel {
  static table = 'lieferung_file'
  static associations: Associations = {
    lieferung: { type: 'belongs_to', key: 'lieferung_id' },
  }

  declare lieferung_id: string | null
  declare file_id: string | null
  declare file_mime_type: string | null
  declare name: string | null
  declare beschreibung: string | null
  declare changed: string | null
  declare _rev_at: number | null

  declare lieferung: Relation<Lieferung>
}
modelDecorators(
  LieferungFile,
  {
    lieferung_id: field('lieferung_id'),
    file_id: field('file_id'),
    file_mime_type: field('file_mime_type'),
    name: field('name'),
    beschreibung: field('beschreibung'),
    changed: field('changed'),
    _rev_at: field('_rev_at'),
    lieferung: relation('lieferung', 'lieferung_id'),
  },
  ['edit', 'delete'],
)

export class PersonFile extends VermehrungFileModel {
  static table = 'person_file'
  static associations: Associations = {
    person: { type: 'belongs_to', key: 'person_id' },
  }

  declare person_id: string | null
  declare file_id: string | null
  declare file_mime_type: string | null
  declare name: string | null
  declare beschreibung: string | null
  declare changed: string | null
  declare _rev_at: number | null

  declare person: Relation<Person>
}
modelDecorators(
  PersonFile,
  {
    person_id: field('person_id'),
    file_id: field('file_id'),
    file_mime_type: field('file_mime_type'),
    name: field('name'),
    beschreibung: field('beschreibung'),
    changed: field('changed'),
    _rev_at: field('_rev_at'),
    person: relation('person', 'person_id'),
  },
  ['edit', 'delete'],
)

export class SammlungFile extends VermehrungFileModel {
  static table = 'sammlung_file'
  static associations: Associations = {
    sammlung: { type: 'belongs_to', key: 'sammlung_id' },
  }

  declare sammlung_id: string | null
  declare file_id: string | null
  declare file_mime_type: string | null
  declare name: string | null
  declare beschreibung: string | null
  declare changed: string | null
  declare _rev_at: number | null

  declare sammlung: Relation<Sammlung>
}
modelDecorators(
  SammlungFile,
  {
    sammlung_id: field('sammlung_id'),
    file_id: field('file_id'),
    file_mime_type: field('file_mime_type'),
    name: field('name'),
    beschreibung: field('beschreibung'),
    changed: field('changed'),
    _rev_at: field('_rev_at'),
    sammlung: relation('sammlung', 'sammlung_id'),
  },
  ['edit', 'delete'],
)

export class ArtQk extends VermehrungModel {
  static table = 'art_qk'

  declare name: string
  declare titel: string | null
  declare beschreibung: string | null
  declare sort: number | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null
}
modelDecorators(
  ArtQk,
  {
    name: field('name'),
    titel: field('titel'),
    beschreibung: field('beschreibung'),
    sort: field('sort'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class KulturOption extends VermehrungModel {
  static table = 'kultur_option'
  static associations: Associations = {
    kultur: { type: 'belongs_to', key: 'id' },
  }

  declare z_bemerkungen: boolean | null
  declare titel: boolean | null
  declare tz_andere_menge: boolean | null
  declare tz_auspflanzbereit_beschreibung: boolean | null
  declare tz_bemerkungen: boolean | null
  declare tk: boolean | null
  declare tk_bemerkungen: boolean | null
  declare ev_teilkultur_id: boolean | null
  declare ev_geplant: boolean | null
  declare ev_person_id: boolean | null
  declare ev_datum: boolean | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare kultur: Relation<Kultur>
}
modelDecorators(
  KulturOption,
  {
    z_bemerkungen: field('z_bemerkungen'),
    titel: field('tz_teilkultur_id'),
    tz_andere_menge: field('tz_andere_menge'),
    tz_auspflanzbereit_beschreibung: field('tz_auspflanzbereit_beschreibung'),
    tz_bemerkungen: field('tz_bemerkungen'),
    tk: field('tk'),
    tk_bemerkungen: field('tk_bemerkungen'),
    ev_teilkultur_id: field('ev_teilkultur_id'),
    ev_geplant: field('ev_geplant'),
    ev_person_id: field('ev_person_id'),
    ev_datum: field('ev_datum'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    kultur: relation('kultur', 'id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class KulturQk extends VermehrungModel {
  static table = 'kultur_qk'

  declare name: string
  declare titel: string | null
  declare beschreibung: string | null
  declare sort: number | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null
}
modelDecorators(
  KulturQk,
  {
    name: field('name'),
    titel: field('titel'),
    beschreibung: field('beschreibung'),
    sort: field('sort'),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class PersonOption extends VermehrungModel {
  static table = 'person_option'
  static associations: Associations = {
    person: { type: 'belongs_to', key: 'id' },
  }

  declare ar_name_deutsch: boolean | null
  declare ga_strasse: boolean | null
  declare ga_plz: boolean | null
  declare ga_ort: boolean | null
  declare ga_geom_point: boolean | null
  declare ga_lat_lng: boolean | null
  declare ga_aktiv: boolean | null
  declare ga_bemerkungen: boolean | null
  declare hk_kanton: boolean | null
  declare hk_land: boolean | null
  declare hk_bemerkungen: boolean | null
  declare hk_geom_point: boolean | null
  declare ku_zwischenlager: boolean | null
  declare ku_erhaltungskultur: boolean | null
  declare li_show_sl_felder: boolean | null
  declare li_show_sl: boolean | null
  declare sl_show_empty_when_next_to_li: boolean | null
  declare sl_auto_copy_edits: boolean | null
  declare tree_kultur: boolean | null
  declare tree_teilkultur: boolean | null
  declare tree_zaehlung: boolean | null
  declare tree_lieferung: boolean | null
  declare tree_event: boolean | null
  declare art_qk_choosen: string[] | null
  declare kultur_qk_choosen: string[] | null
  declare changed: string | null
  declare changed_by: string | null
  declare _rev: string | null
  declare _parent_rev: string | null
  declare _revisions: string[] | null
  declare _depth: number | null
  declare _deleted: boolean | null
  declare _conflicts: string[] | null

  declare person: Relation<Person>
}
modelDecorators(
  PersonOption,
  {
    ar_name_deutsch: field('ar_name_deutsch'),
    ga_strasse: field('ga_strasse'),
    ga_plz: field('ga_plz'),
    ga_ort: field('ga_ort'),
    ga_geom_point: field('ga_geom_point'),
    ga_lat_lng: field('ga_lat_lng'),
    ga_aktiv: field('ga_aktiv'),
    ga_bemerkungen: field('ga_bemerkungen'),
    hk_kanton: field('hk_kanton'),
    hk_land: field('hk_land'),
    hk_bemerkungen: field('hk_bemerkungen'),
    hk_geom_point: field('hk_geom_point'),
    ku_zwischenlager: field('ku_zwischenlager'),
    ku_erhaltungskultur: field('ku_erhaltungskultur'),
    li_show_sl_felder: field('li_show_sl_felder'),
    li_show_sl: field('li_show_sl'),
    sl_show_empty_when_next_to_li: field('sl_show_empty_when_next_to_li'),
    sl_auto_copy_edits: field('sl_auto_copy_edits'),
    tree_kultur: field('tree_kultur'),
    tree_teilkultur: field('tree_teilkultur'),
    tree_zaehlung: field('tree_zaehlung'),
    tree_lieferung: field('tree_lieferung'),
    tree_event: field('tree_event'),
    art_qk_choosen: json('art_qk_choosen', dontSanitize),
    kultur_qk_choosen: json('kultur_qk_choosen', dontSanitize),
    changed: field('changed'),
    changed_by: field('changed_by'),
    _rev: field('_rev'),
    _parent_rev: field('_parent_rev'),
    _revisions: json('_revisions', dontSanitize),
    _depth: field('_depth'),
    _deleted: field('_deleted'),
    _conflicts: json('_conflicts', dontSanitize),
    person: relation('person', 'id'),
  },
  ['removeConflict', 'edit', 'delete'],
)

export class UserRole extends Model {
  static table = 'user_role'
  static associations: Associations = {
    person: { type: 'has_many', foreignKey: 'user_role_id' },
  }

  declare name: string
  declare label: string | null
  declare sort: number | null
  declare comment: string | null
  declare changed: string | null

  declare person: Relation<Person>
}
modelDecorators(UserRole, {
  name: field('name'),
  label: field('label'),
  sort: field('sort'),
  comment: field('comment'),
  changed: field('changed'),
  person: relation('person', 'user_role_id'),
})
