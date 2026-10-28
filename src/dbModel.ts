import { Model } from '@nozbe/watermelondb'
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

const dontSanitize = (val) => val
/*const sanitizeArrayOfStrings = (val) =>
  Array.isArray(val) ? val.map(String) : []*/

export class Herkunft extends Model {
  static table = 'herkunft'
  static associations = {
    sammlung: { type: 'has_many', foreignKey: 'herkunft_id' },
    kultur: { type: 'has_many', foreignKey: 'herkunft_id' },
    herkunft_file: { type: 'has_many', foreignKey: 'herkunft_id' },
  }

  @field('id') id
  @field('nr') nr
  @field('lokalname') lokalname
  @field('gemeinde') gemeinde
  @field('kanton') kanton
  @field('land') land
  @json('geom_point', dontSanitize) geom_point
  @field('wgs84_lat') wgs84_lat
  @field('wgs84_long') wgs84_long
  @field('lv95_x') lv95_x
  @field('lv95_y') lv95_y
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @children('sammlung') sammlungs
  @children('herkunft') herkunfts
  @children('herkunft_file') files

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`herkunft.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('herkunft', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Sammlung extends Model {
  static table = 'sammlung'
  static associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
    person: { type: 'belongs_to', key: 'person_id' },
    lieferung: { type: 'has_many', foreignKey: 'von_sammlung_id' },
    sammlung_file: { type: 'has_many', foreignKey: 'sammlung_id' },
  }

  @field('id') id
  @field('art_id') art_id
  @field('person_id') person_id
  @field('herkunft_id') herkunft_id
  @field('nr') nr
  @field('datum') datum
  @field('von_anzahl_individuen') von_anzahl_individuen
  @field('anzahl_pflanzen') anzahl_pflanzen
  @field('gramm_samen') gramm_samen
  @field('andere_menge') andere_menge
  @json('geom_point', dontSanitize) geom_point
  @field('wgs84_lat') wgs84_lat
  @field('wgs84_long') wgs84_long
  @field('lv95_x') lv95_x
  @field('lv95_y') lv95_y
  @field('geplant') geplant
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('art', 'art_id') art
  @relation('herkunft', 'herkunft_id') herkunft
  @relation('person', 'person_id') person
  @children('lieferung') lieferungs
  @children('sammlung_file') files

  @lazy label = this.observe().pipe(
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
  @lazy labelUnderHerkunft = this.observe().pipe(
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

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`sammlung.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('sammlung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Lieferung extends Model {
  static table = 'lieferung'
  static associations = {
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

  @field('id') id
  @field('sammel_lieferung_id') sammel_lieferung_id
  @field('art_id') art_id
  @field('person_id') person_id
  @field('von_sammlung_id') von_sammlung_id
  @field('von_kultur_id') von_kultur_id
  @field('datum') datum
  @field('nach_kultur_id') nach_kultur_id
  @field('nach_ausgepflanzt') nach_ausgepflanzt
  @field('von_anzahl_individuen') von_anzahl_individuen
  @field('anzahl_pflanzen') anzahl_pflanzen
  @field('anzahl_auspflanzbereit') anzahl_auspflanzbereit
  @field('gramm_samen') gramm_samen
  @field('andere_menge') andere_menge
  @field('geplant') geplant
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('art', 'art_id') art
  @relation('sammlung', 'von_sammlung_id') sammlung
  @relation('sammel_lieferung', 'sammel_lieferung_id') sammel_lieferung
  //@relation('kultur', 'von_kultur_id') von_kultur
  //@relation('kultur', 'nach_kultur_id') nach_kultur
  @relation('person', 'person_id') person
  @children('lieferung_file') files

  @lazy von_kultur = this.observe().pipe(
    map$(async (lieferung) => {
      let vonKultur
      try {
        vonKultur = await lieferung.collections
          .get('kultur')
          .find(lieferung.von_kultur_id)
      } catch {}
      return vonKultur
    }),
  )
  @lazy nach_kultur = this.observe().pipe(
    map$(async (lieferung) => {
      let nachKultur
      try {
        nachKultur = await lieferung.collections
          .get('kultur')
          .find(lieferung.nach_kultur_id)
      } catch {}
      return nachKultur
    }),
  )

  @lazy label = this.observe().pipe(
    distinctUntilChanged(
      (a, b) =>
        a.datum === b.datum &&
        a.anzahl_pflanzen === b.anzahl_pflanzen &&
        a.anzahl_auspflanzbereit === b.anzahl_auspflanzbereit &&
        a.geplant === b.geplant,
    ),
    map$((lieferung) => lieferungLabelFromLieferung({ lieferung })),
  )

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`lieferung.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('lieferung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}
export class Art extends Model {
  static table = 'art'
  static associations = {
    ae_art: { type: 'belongs_to', key: 'ae_id' },
    sammlung: { type: 'has_many', foreignKey: 'art_id' },
    sammel_lieferung: { type: 'has_many', foreignKey: 'art_id' },
    lieferung: { type: 'has_many', foreignKey: 'art_id' },
    kultur: { type: 'has_many', foreignKey: 'art_id' },
    av: { type: 'has_many', foreignKey: 'art_id' },
    art_file: { type: 'has_many', foreignKey: 'art_id' },
  }

  @field('id') id
  @field('ae_id') ae_id
  @field('set') set;
  @field('apflora_av') apflora_av
  @field('apflora_ap') apflora_ap
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('ae_art', 'ae_id') ae_art

  @children('sammlung') sammlungs
  @children('sammel_lieferung') sammel_lieferungs
  @children('lieferung') lieferungs
  @children('kultur') kulturs
  @children('av') avs
  @children('art_file') files

  @lazy label = this.ae_art.observe().pipe(
    distinctUntilKeyChanged('ae_id'),
    map$((ae_art) => artLabelFromAeArt({ ae_art })),
  )
  @lazy herkunfts = this.collections
    .get('herkunft')
    .query(Q.on('sammlung', 'art_id', this.id))

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // values is meant to enable updating multiple fields at once
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`art.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('art', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class ApfloraAp extends Model {
  static table = 'apflora_ap'
  static associations = {
    ae_art: { type: 'belongs_to', key: 'ae_id' },
  }

  @field('id') id
  @field('ae_id') ae_id
  @field('ap') ap
  @field('av') av
}

export class AeArt extends Model {
  static table = 'ae_art'
  static associations = {
    art: { type: 'has_many', foreignKey: 'ae_id' },
  }

  @field('id') id
  @field('name') name
  @field('taxonomy') taxonomy
  @field('changed') changed

  @children('art') arts
}

export class Garten extends Model {
  static table = 'garten'
  static associations = {
    person: { type: 'belongs_to', key: 'person_id' },
    kultur: { type: 'has_many', foreignKey: 'garten_id' },
    gv: { type: 'has_many', foreignKey: 'garten_id' },
    garten_file: { type: 'has_many', foreignKey: 'garten_id' },
  }

  @field('id') id
  @field('name') name
  @field('person_id') person_id
  @field('strasse') strasse
  @field('plz') plz
  @field('ort') ort
  @json('geom_point', dontSanitize) geom_point
  @field('wgs84_lat') wgs84_lat
  @field('wgs84_long') wgs84_long
  @field('lv95_x') lv95_x
  @field('lv95_y') lv95_y
  @field('aktiv') aktiv
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @children('kultur') kulturs
  @children('gv') gvs
  @children('garten_file') files
  @relation('person', 'person_id') person

  @lazy label = this.observe().pipe(
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

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`garten.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('garten', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Kultur extends Model {
  static table = 'kultur'
  static associations = {
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
    qk_choosen: { type: 'has_many', foreignKey: 'kultur_id' },
  }

  @field('id') id
  @field('art_id') art_id
  @field('herkunft_id') herkunft_id
  @field('garten_id') garten_id
  @field('zwischenlager') zwischenlager
  @field('erhaltungskultur') erhaltungskultur
  @field('von_anzahl_individuen') von_anzahl_individuen
  @field('bemerkungen') bemerkungen
  @field('aktiv') aktiv
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @children('teilkultur') teilkulturs
  @children('zaehlung') zaehlungs
  @children('event') events
  @children('bedarf') bedarfs
  @children('kultur_file') files
  @children('qk_choosen') qk_choosens
  @relation('kultur_option', 'id') kultur_option
  @relation('garten', 'garten_id') garten
  @relation('art', 'art_id') art
  @relation('herkunft', 'herkunft_id') herkunft

  @lazy anlieferungs = this.collections
    .get('lieferung')
    .query(Q.where('nach_kultur_id', this.id))
  @lazy auslieferungs = this.collections
    .get('lieferung')
    .query(Q.where('von_kultur_id', this.id))

  @lazy label = this.observe().pipe(
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
  @lazy labelUnderArt = this.observe().pipe(
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
  @lazy labelUnderGarten = this.observe().pipe(
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

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`kultur.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('kultur', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Teilkultur extends Model {
  static table = 'teilkultur'
  static associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    event: { type: 'has_many', foreignKey: 'teilkultur_id' },
    teilzaehlung: { type: 'has_many', foreignKey: 'teilkultur_id' },
  }

  @field('id') id
  @field('kultur_id') kultur_id
  @field('name') name
  @field('ort1') ort1
  @field('ort2') ort2
  @field('ort3') ort3
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('kultur', 'kultur_id') kultur
  @children('event') events
  @children('teilzaehlung') teilzaehlungs

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`teilkultur.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('teilkultur', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Zaehlung extends Model {
  static table = 'zaehlung'
  static associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    kultur_option: { type: 'belongs_to', key: 'kultur_id' },
    teilzaehlung: { type: 'has_many', foreignKey: 'zaehlung_id' },
    teilkultur: { type: 'has_many', foreignKey: 'zaehlung_id' },
  }

  @field('id') id
  @field('kultur_id') kultur_id
  @field('datum') datum
  @field('prognose') prognose
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('kultur', 'kultur_id') kultur
  @relation('kultur_option', 'kultur_id') kultur_option
  @children('teilzaehlung') teilzaehlungs
  @children('teilkultur') teilkulturs

  @lazy label = this.observe().pipe(
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
  @lazy anzahl_auspflanzbereit = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (zaehlung) => {
      const tzs = await zaehlung.teilzaehlungs.fetch()
      const anzs = tzs.filter((t) => exists(t.anzahl_auspflanzbereit))
      const anzahl_auspflanzbereit = anzs.length ? sum(anzs) : null

      return anzahl_auspflanzbereit
    }),
  )
  @lazy anzahl_mutterpflanzen = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (zaehlung) => {
      const tzs = await zaehlung.teilzaehlungs.fetch()
      const anzs = tzs.filter((t) => exists(t.anzahl_mutterpflanzen))
      const anzahl_mutterpflanzen = anzs.length ? sum(anzs) : null

      return anzahl_mutterpflanzen
    }),
  )*/

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`zaehlung.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('zaehlung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Teilzaehlung extends Model {
  static table = 'teilzaehlung'
  static associations = {
    zaehlung: { type: 'belongs_to', key: 'zaehlung_id' },
    teilkultur: { type: 'belongs_to', key: 'teilkultur_id' },
  }

  @field('id') id
  @field('zaehlung_id') zaehlung_id
  @field('teilkultur_id') teilkultur_id
  @field('anzahl_pflanzen') anzahl_pflanzen
  @field('anzahl_auspflanzbereit') anzahl_auspflanzbereit
  @field('anzahl_mutterpflanzen') anzahl_mutterpflanzen
  @field('andere_menge') andere_menge
  @field('auspflanzbereit_beschreibung') auspflanzbereit_beschreibung
  @field('bemerkungen') bemerkungen
  @field('prognose_von_tz') prognose_von_tz
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('zaehlung', 'zaehlung_id') zaehlung
  @relation('teilkultur', 'teilkultur_id') teilkultur
  @lazy label = this.teilkultur.observe().pipe(
    distinctUntilKeyChanged('teilkultur_id'),
    map$((teilkultur) => teilkulturLabelFromTeilkultur({ teilkultur })),
  )

  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`teilzaehlung.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('teilzaehlung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Person extends Model {
  static table = 'person'
  static associations = {
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

  @field('id') id
  @field('nr') nr
  @field('vorname') vorname
  @field('name') name
  @field('adresszusatz') adresszusatz
  @field('strasse') strasse
  @field('plz') plz
  @field('ort') ort
  @field('telefon_privat') telefon_privat
  @field('telefon_geschaeft') telefon_geschaeft
  @field('telefon_mobile') telefon_mobile
  @field('email') email
  @field('kein_email') kein_email
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('account_id') account_id
  @field('user_role_id') user_role_id
  @field('kommerziell') kommerziell
  @field('info') info
  @field('aktiv') aktiv
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  // https://github.com/Nozbe/WatermelonDB/issues/313#issuecomment-483293806
  @lazy fullname = this.observe().pipe(
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

  @relation('user_role', 'user_role_id') user_role
  @relation('person_option', 'id') person_option

  @children('sammel_lieferung') sammel_lieferungs
  @children('av') avs
  @children('gv') gvs
  @children('sammlung') sammlungs
  @children('lieferung') lieferungs
  @children('garten') gartens
  @children('event') events
  @children('bedarf') bedarfs
  @children('person_file') files

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`person.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('person', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
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
  static associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    sammlung: { type: 'belongs_to', key: 'von_sammlung_id' },
    von_kultur: { type: 'belongs_to', key: 'von_kultur_id' },
    nach_kultur: { type: 'belongs_to', key: 'nach_kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
    lieferung: { type: 'has_many', foreignKey: 'sammel_lieferung_id' },
  }

  @field('id') id
  @field('art_id') art_id
  @field('person_id') person_id
  @field('von_sammlung_id') von_sammlung_id
  @field('von_kultur_id') von_kultur_id
  @field('datum') datum
  @field('nach_kultur_id') nach_kultur_id
  @field('nach_ausgepflanzt') nach_ausgepflanzt
  @field('von_anzahl_individuen') von_anzahl_individuen
  @field('anzahl_pflanzen') anzahl_pflanzen
  @field('anzahl_auspflanzbereit') anzahl_auspflanzbereit
  @field('gramm_samen') gramm_samen
  @field('andere_menge') andere_menge
  @field('geplant') geplant
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('art', 'art_id') art
  @relation('sammlung', 'von_sammlung_id') sammlung
  @relation('sammlung', 'von_kultur_id') von_kultur
  @relation('sammlung', 'nach_kultur_id') nach_kultur
  @relation('person', 'person_id') person
  @children('lieferung') lieferungs

  @lazy label = this.observe().pipe(
    distinctUntilChanged(),
    map$(async (lieferung) => {
      let vonKultur
      try {
        vonKultur = await this.collections
          .get('kultur')
          .find(lieferung.von_kultur_id)
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

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`sammel_lieferung.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('sammel_lieferung', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }

  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Bedarf extends Model {
  static table = 'bedarf'
  static associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('id') id
  @field('kultur_id') kultur_id
  @field('person_id') person_id
  @field('jahr') jahr
  @field('beschreibung') beschreibung
  @field('bemerkungen') bemerkungen
  @field('neues_material') neues_material
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('kultur', 'kultur_id') kultur
  @relation('person', 'person_id') person

  @lazy label = this.observe().pipe(
    distinctUntilChanged(
      (a, b) => a.jahr === b.jahr && a.beschreibung === b.beschreibung,
    ),
    map$((bedarf) =>
      bedarfLabelFromBedarf({
        bedarf,
      }),
    ),
  )

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`bedarf.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('bedarf', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Event extends Model {
  static table = 'event'
  static associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('id') id
  @field('kultur_id') kultur_id
  @field('teilkultur_id') teilkultur_id
  @field('person_id') person_id
  @field('beschreibung') beschreibung
  @field('geplant') geplant
  @field('datum') datum
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('kultur', 'kultur_id') kultur
  @relation('person', 'person_id') person

  @lazy label = this.observe().pipe(
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

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`event.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('event', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Av extends Model {
  static table = 'av'
  static associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('id') id
  @field('art_id') art_id
  @field('person_id') person_id
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('art', 'art_id') art
  @relation('person', 'person_id') person

  @lazy personLabel = this.person.observe().pipe(
    distinctUntilChanged(
      (a, b) =>
        personLabelFromPerson({ person: a }) ===
        personLabelFromPerson({ person: b }),
    ),
    map$((p) => personLabelFromPerson({ person: p })),
  )
  @lazy artLabel = this.art.observe().pipe(
    distinctUntilKeyChanged('ae_id'),
    map$(async (art) => {
      const artLabel = await art?.label.pipe(first$()).toPromise()

      return artLabel
    }),
  )

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`av.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('av', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class Gv extends Model {
  static table = 'gv'
  static associations = {
    garten: { type: 'belongs_to', key: 'garten_id' },
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('id') id
  @field('garten_id') garten_id
  @field('person_id') person_id
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('garten', 'garten_id') garten
  @relation('person', 'person_id') person

  @lazy personLabel = this.person.observe().pipe(
    distinctUntilChanged(
      (a, b) =>
        personLabelFromPerson({ person: a }) ===
        personLabelFromPerson({ person: b }),
    ),
    map$((p) => personLabelFromPerson({ person: p })),
  )
  @lazy gartenLabel = this.garten.observe().pipe(
    distinctUntilChanged(),
    map$(async (garten) => {
      let person
      try {
        person = await garten.person?.fetch()
      } catch {}

      return gartenLabelFromGarten({ garten, person })
    }),
  )

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`gv.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('gv', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class ArtFile extends Model {
  static table = 'art_file'
  static associations = {
    art: { type: 'belongs_to', key: 'art_id' },
  }

  @field('id') id
  @field('art_id') art_id
  @field('file_id') file_id
  @field('file_mime_type') file_mime_type
  @field('name') name
  @field('beschreibung') beschreibung
  @field('changed') changed
  @field('_rev_at') _rev_at

  @relation('art', 'art_id') art

  @writer async edit({ field, value }) {
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
      [field]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        .patch(`/art_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      row[field] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom).delete(`/art_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class GartenFile extends Model {
  static table = 'garten_file'
  static associations = {
    garten: { type: 'belongs_to', key: 'garten_id' },
  }

  @field('id') id
  @field('garten_id') garten_id
  @field('file_id') file_id
  @field('file_mime_type') file_mime_type
  @field('name') name
  @field('beschreibung') beschreibung
  @field('changed') changed
  @field('_rev_at') _rev_at

  @relation('garten', 'garten_id') garten

  @writer async edit({ field, value }) {
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
      [field]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        .patch(`/garten_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      row[field] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom).delete(`/garten_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class HerkunftFile extends Model {
  static table = 'herkunft_file'
  static associations = {
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
  }

  @field('id') id
  @field('herkunft_id') herkunft_id
  @field('file_id') file_id
  @field('file_mime_type') file_mime_type
  @field('name') name
  @field('beschreibung') beschreibung
  @field('changed') changed
  @field('_rev_at') _rev_at

  @relation('herkunft', 'herkunft_id') herkunft

  @writer async edit({ field, value }) {
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
      [field]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        .patch(`/herkunft_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      row[field] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom).delete(`/herkunft_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class KulturFile extends Model {
  static table = 'kultur_file'
  static associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
  }

  @field('id') id
  @field('kultur_id') kultur_id
  @field('file_id') file_id
  @field('file_mime_type') file_mime_type
  @field('name') name
  @field('beschreibung') beschreibung
  @field('changed') changed
  @field('_rev_at') _rev_at

  @relation('kultur', 'kultur_id') kultur

  @writer async edit({ field, value }) {
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
      [field]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        .patch(`/kultur_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      row[field] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom).delete(`/kultur_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class LieferungFile extends Model {
  static table = 'lieferung_file'
  static associations = {
    lieferung: { type: 'belongs_to', key: 'lieferung_id' },
  }

  @field('id') id
  @field('lieferung_id') lieferung_id
  @field('file_id') file_id
  @field('file_mime_type') file_mime_type
  @field('name') name
  @field('beschreibung') beschreibung
  @field('changed') changed
  @field('_rev_at') _rev_at

  @relation('lieferung', 'lieferung_id') lieferung

  @writer async edit({ field, value }) {
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
      [field]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        .patch(`/lieferung_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      row[field] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom).delete(`/lieferung_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class PersonFile extends Model {
  static table = 'person_file'
  static associations = {
    person: { type: 'belongs_to', key: 'person_id' },
  }

  @field('id') id
  @field('person_id') person_id
  @field('file_id') file_id
  @field('file_mime_type') file_mime_type
  @field('name') name
  @field('beschreibung') beschreibung
  @field('changed') changed
  @field('_rev_at') _rev_at

  @relation('person', 'person_id') person

  @writer async edit({ field, value }) {
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
      [field]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        .patch(`/person_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      row[field] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom).delete(`/person_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class SammlungFile extends Model {
  static table = 'sammlung_file'
  static associations = {
    sammlung: { type: 'belongs_to', key: 'sammlung_id' },
  }

  @field('id') id
  @field('sammlung_id') sammlung_id
  @field('file_id') file_id
  @field('file_mime_type') file_mime_type
  @field('name') name
  @field('beschreibung') beschreibung
  @field('changed') changed
  @field('_rev_at') _rev_at

  @relation('sammlung', 'sammlung_id') sammlung

  @writer async edit({ field, value }) {
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
      [field]: value,
      _rev_at: Date.now() / 1000,
    }
    try {
      await store
        .get(apiClientAtom)
        .patch(`/sammlung_file?id=eq.${this.id}`, newObject)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.update((row) => {
      row[field] = value
    })
    return
  }
  @writer async delete() {
    try {
      await store.get(apiClientAtom).delete(`/sammlung_file?id=eq.${this.id}`)
    } catch (error) {
      addNotification({
        message: error.message,
      })
      return console.log(error)
    }
    // updating server is done by calling code
    await this.destroyPermanently()
  }
}

export class ArtQk extends Model {
  static table = 'art_qk'

  @field('id') id
  @field('name') name
  @field('titel') titel
  @field('beschreibung') beschreibung
  @field('sort') sort
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`art_qk.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('art_qk', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class KulturOption extends Model {
  static table = 'kultur_option'
  static associations = {
    kultur: { type: 'belongs_to', key: 'id' },
  }

  @field('id') id
  @field('z_bemerkungen') z_bemerkungen
  @field('tz_teilkultur_id') titel
  @field('tz_andere_menge') tz_andere_menge
  @field('tz_auspflanzbereit_beschreibung') tz_auspflanzbereit_beschreibung
  @field('tz_bemerkungen') tz_bemerkungen
  @field('tk') tk
  @field('tk_bemerkungen') tk_bemerkungen
  @field('ev_teilkultur_id') ev_teilkultur_id
  @field('ev_geplant') ev_geplant
  @field('ev_person_id') ev_person_id
  @field('ev_datum') ev_datum
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('kultur', 'id') kultur

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`kultur_option.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('kultur_option', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class KulturQk extends Model {
  static table = 'kultur_qk'

  @field('id') id
  @field('name') name
  @field('titel') titel
  @field('beschreibung') beschreibung
  @field('sort') sort
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`kultur_qk.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('kultur_qk', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class PersonOption extends Model {
  static table = 'person_option'
  static associations = {
    person: { type: 'belongs_to', key: 'id' },
  }

  @field('id') id
  @field('ar_name_deutsch') ar_name_deutsch
  @field('ga_strasse') ga_strasse
  @field('ga_plz') ga_plz
  @field('ga_ort') ga_ort
  @field('ga_geom_point') ga_geom_point
  @field('ga_lat_lng') ga_lat_lng
  @field('ga_aktiv') ga_aktiv
  @field('ga_bemerkungen') ga_bemerkungen
  @field('hk_kanton') hk_kanton
  @field('hk_land') hk_land
  @field('hk_bemerkungen') hk_bemerkungen
  @field('hk_geom_point') hk_geom_point
  @field('ku_zwischenlager') ku_zwischenlager
  @field('ku_erhaltungskultur') ku_erhaltungskultur
  @field('li_show_sl_felder') li_show_sl_felder
  @field('li_show_sl') li_show_sl
  @field('sl_show_empty_when_next_to_li') sl_show_empty_when_next_to_li
  @field('sl_auto_copy_edits') sl_auto_copy_edits
  @field('tree_kultur') tree_kultur
  @field('tree_teilkultur') tree_teilkultur
  @field('tree_zaehlung') tree_zaehlung
  @field('tree_lieferung') tree_lieferung
  @field('tree_event') tree_event
  @json('art_qk_choosen', dontSanitize) art_qk_choosen
  @json('kultur_qk_choosen', dontSanitize) kultur_qk_choosen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('person', 'id') person

  @writer async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  // updates the row locally - ui and labels stay live.
  // the revision is created when the editing session on this row
  // ends (see modules/revAggregation.js), not per field change
  @writer async edit({ field, value, values }) {
    if (!field && !values) {
      throw new Error('field or values must be passed')
    }
    unsetError(`person_option.${field}`)
    const changes = values ?? { [field]: value }
    registerDirtyRev('person_option', this.id, field, this)
    // optimistically update store
    await this.update((row) => {
      Object.entries(changes).forEach(([key, val]) => {
        row[key] = val
      })
      row.changed = new Date().toISOString()
      row.changed_by = store.get(userAtom)?.email
    })
  }
  @writer async delete() {
    await this.callWriter(() => this.edit({ field: '_deleted', value: true }))
  }
}

export class UserRole extends Model {
  static table = 'user_role'
  static associations = {
    person: { type: 'has_many', foreignKey: 'user_role_id' },
  }

  @field('id') id
  @field('name') name
  @field('label') label
  @field('sort') sort
  @field('comment') comment
  @field('changed') changed

  @relation('person', 'user_role_id') person
}
