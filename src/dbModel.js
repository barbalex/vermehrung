import { Model } from '@nozbe/watermelondb'
import {
  action,
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
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import isEqual from 'lodash/isEqual'
import { DateTime } from 'luxon'
import { first as first$ } from 'rxjs/operators'

import toStringIfPossible from './utils/toStringIfPossible'
import personLabelFromPerson from './utils/personLabelFromPerson'
import gartenLabelFromGarten from './utils/gartenLabelFromGarten'
import eventLabelFromEvent from './utils/eventLabelFromEvent'
import artLabelFromAeArt from './utils/artLabelFromAeArt'
import lieferungLabelFromLieferung from './utils/lieferungLabelFromLieferung'
import teilkulturLabelFromTeilkultur from './utils/teilkulturLabelFromTeilkultur'
import kulturLabelFromKultur from './utils/kulturLabelFromKultur'
import kulturLabelFromKulturUnderArt from './utils/kulturLabelFromKulturUnderArt'
import kulturLabelFromKulturUnderGarten from './utils/kulturLabelFromKulturUnderGarten'
import sammlungLabelFromSammlung from './utils/sammlungLabelFromSammlung'
import sammlungLabelFromSammlungUnderHerkunft from './utils/sammlungLabelFromSammlungUnderHerkunft'
import zaehlungLabelFromZaehlung from './utils/zaehlungLabelFromZaehlung'
import toPgArray from './utils/toPgArray'
import deleteAccount from './utils/deleteAccount'
import updateAllLieferungen from './components/Data/SammelLieferung/FormTitle/Copy/updateAllLieferungen'

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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`herkunft.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      herkunft_id: this.id,
      nr: field === 'nr' ? toStringIfPossible(value) : this.nr,
      lokalname:
        field === 'lokalname' ? toStringIfPossible(value) : this.lokalname,
      gemeinde:
        field === 'gemeinde' ? toStringIfPossible(value) : this.gemeinde,
      kanton: field === 'kanton' ? toStringIfPossible(value) : this.kanton,
      land: field === 'land' ? toStringIfPossible(value) : this.land,
      geom_point: field === 'geom_point' ? value : this.geom_point,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new Date().toISOString()
    newObject.changed_by = user.email
    console.log('Herkunft Model, newObject:', newObject)
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_herkunft_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'herkunft',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert herkuft_rev to herkunft
    newObjectForStore.id = this.id
    newObjectForStore.wgs84_lat = this.wgs84_lat
    newObjectForStore.wgs84_long = this.wgs84_long
    newObjectForStore.lv95_x = this.lv95_x
    newObjectForStore.lv95_y = this.lv95_y
    delete newObjectForStore.herkunft_id
    // optimistically update store
    await this.update((row) => {
      Object.keys(newObjectForStore).forEach((key) => {
        if (!isEqual(row[key], newObjectForStore[key])) {
          row[key] = newObjectForStore[key]
        }
      })
    })
    // NOOOOO: this leads to conflicts due to multiple identical id's!
    //if (field === '_deleted' && value) await this.markAsDeleted()
    if (field === '_deleted' && value) {
      const sammlungs = await this?.sammlungs?.fetch()
      console.log('herkunft model, sammlungs:', sammlungs)
      // TODO: edit to set _deleted true
    }
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
      const art = await sammlung.art.fetch()
      const ae_art = art ? await art.ae_art.fetch() : undefined
      const person = await sammlung.person.fetch()
      const herkunft = await sammlung.herkunft.fetch()

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
      const art = await sammlung.art.fetch()
      const ae_art = art ? await art.ae_art.fetch() : undefined
      const person = await sammlung.person.fetch()

      return sammlungLabelFromSammlungUnderHerkunft({
        sammlung,
        art,
        ae_art,
        person,
      })
    }),
  )

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`sammlung.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      sammlung_id: this.id,
      art_id: field === 'art_id' ? value : this.art_id,
      person_id: field === 'person_id' ? value : this.person_id,
      herkunft_id: field === 'herkunft_id' ? value : this.herkunft_id,
      nr: field === 'nr' ? toStringIfPossible(value) : this.nr,
      geom_point: field === 'geom_point' ? value : this.geom_point,
      datum: field === 'datum' ? value : this.datum,
      von_anzahl_individuen:
        field === 'von_anzahl_individuen' ? value : this.von_anzahl_individuen,
      anzahl_pflanzen:
        field === 'anzahl_pflanzen' ? value : this.anzahl_pflanzen,
      gramm_samen: field === 'gramm_samen' ? value : this.gramm_samen,
      andere_menge:
        field === 'andere_menge'
          ? toStringIfPossible(value)
          : this.andere_menge,
      geplant: field === 'geplant' ? value : this.geplant,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_sammlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'sammlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'sammlung',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.sammlung_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    if (field === '_deleted' && value) {
      const lieferungs = await this?.lieferungs?.fetch()
      console.log('sammlung model, lieferungs:', lieferungs)
      // TODO: edit to set _deleted true
    }
  }

  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
    map$(async (lieferung) =>
      lieferung.von_kultur_id
        ? await lieferung.collections
            .get('kultur')
            .find(lieferung.von_kultur_id)
        : undefined,
    ),
  )
  @lazy nach_kultur = this.observe().pipe(
    map$(async (lieferung) =>
      lieferung.nach_kultur_id
        ? await lieferung.collections
            .get('kultur')
            .find(lieferung.nach_kultur_id)
        : undefined,
    ),
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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`lieferung.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      lieferung_id: this.id,
      sammel_lieferung_id:
        field === 'sammel_lieferung_id' ? value : this.sammel_lieferung_id,
      art_id: field === 'art_id' ? value : this.art_id,
      person_id: field === 'person_id' ? value : this.person_id,
      von_sammlung_id:
        field === 'von_sammlung_id' ? value : this.von_sammlung_id,
      von_kultur_id: field === 'von_kultur_id' ? value : this.von_kultur_id,
      datum: field === 'datum' ? value : this.datum,
      nach_kultur_id: field === 'nach_kultur_id' ? value : this.nach_kultur_id,
      nach_ausgepflanzt:
        field === 'nach_ausgepflanzt' ? value : this.nach_ausgepflanzt,
      von_anzahl_individuen:
        field === 'von_anzahl_individuen' ? value : this.von_anzahl_individuen,
      anzahl_pflanzen:
        field === 'anzahl_pflanzen' ? value : this.anzahl_pflanzen,
      anzahl_auspflanzbereit:
        field === 'anzahl_auspflanzbereit'
          ? value
          : this.anzahl_auspflanzbereit,
      gramm_samen: field === 'gramm_samen' ? value : this.gramm_samen,
      andere_menge:
        field === 'andere_menge'
          ? toStringIfPossible(value)
          : this.andere_menge,
      geplant: field === 'geplant' ? value : this.geplant,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_lieferung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'lieferung',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.lieferung_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }

  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`art.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      art_id: this.id,
      ae_id: field === 'ae_id' ? value : this.ae_id,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_art_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'art',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.art_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    if (field === '_deleted' && value) {
      const sammlungs = await this?.sammlungs?.fetch()
      console.log('art model, sammlungs:', sammlungs)
      // TODO: edit to set _deleted true
    }
  }

  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
  }
}

export class AeArt extends Model {
  static table = 'ae_art'
  static associations = {
    art: { type: 'has_many', foreignKey: 'ae_id' },
  }

  @field('id') id
  @field('name') name
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
      const person = await garten.person.fetch()

      return gartenLabelFromGarten({
        garten,
        person,
      })
    }),
  )

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`garten.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      garten_id: this.id,
      name: field === 'name' ? toStringIfPossible(value) : this.name,
      person_id: field === 'person_id' ? value : this.person_id,
      strasse: field === 'strasse' ? toStringIfPossible(value) : this.strasse,
      plz: field === 'plz' ? value : this.plz,
      ort: field === 'ort' ? toStringIfPossible(value) : this.ort,
      geom_point: field === 'geom_point' ? value : this.geom_point,
      aktiv: field === 'aktiv' ? value : this.aktiv,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_garten_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'garten_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'garten',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.garten_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    if (field === '_deleted' && value) {
      const kulturs = await this?.kulturs?.fetch()
      console.log('garten model, kulturs:', kulturs)
      // TODO: edit to set _deleted true
    }
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
      const garten = await kultur.garten.fetch()
      const gartenPerson = garten ? await garten.person.fetch() : undefined
      const art = await kultur.art.fetch()
      const aeArt = art ? await art.ae_art.fetch() : undefined
      const herkunft = await kultur.herkunft.fetch()

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
      const garten = await kultur.garten.fetch()
      const gartenPerson = garten ? await garten.person.fetch() : undefined
      let herkunft = await kultur.herkunft.fetch()

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
      const art = await kultur.art.fetch()
      const aeArt = art ? await art.ae_art.fetch() : undefined
      const herkunft = await kultur.herkunft.fetch()

      return kulturLabelFromKulturUnderGarten({
        kultur,
        art,
        aeArt,
        herkunft,
      })
    }),
  )

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    // TODO: do this in all models?
    unsetError(`kultur.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      kultur_id: this.id,
      art_id: field === 'art_id' ? value : this.art_id,
      herkunft_id: field === 'herkunft_id' ? value : this.herkunft_id,
      garten_id: field === 'garten_id' ? value : this.garten_id,
      zwischenlager: field === 'zwischenlager' ? value : this.zwischenlager,
      erhaltungskultur:
        field === 'erhaltungskultur' ? value : this.erhaltungskultur,
      von_anzahl_individuen:
        field === 'von_anzahl_individuen' ? value : this.von_anzahl_individuen,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      aktiv: field === 'aktiv' ? value : this.aktiv,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    const newObjectForStore = { ...newObject }
    addQueuedQuery({
      name: 'mutateInsert_kultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'kultur',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.kultur_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    if (field === '_deleted' && value) {
      const teilkulturs = await this?.teilkulturs?.fetch()
      console.log('kultur model, teilkulturs:', teilkulturs)
      // TODO: edit to set _deleted true
      const zaehlungs = await this?.zaehlungs?.fetch()
      console.log('kultur model, zaehlungs:', zaehlungs)
      // TODO: edit to set _deleted true
      const events = await this?.events?.fetch()
      console.log('kultur model, events:', events)
      // TODO: edit to set _deleted true
      const anlieferungs = await this?.anlieferungs?.fetch()
      console.log('kultur model, anlieferungs:', anlieferungs)
      // TODO: edit to set _deleted true
      const auslieferungs = await this?.auslieferungs?.fetch()
      console.log('kultur model, auslieferungs:', auslieferungs)
      // TODO: edit to set _deleted true
    }
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`teilkultur.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      teilkultur_id: this.id,
      kultur_id: field === 'kultur_id' ? value : this.kultur_id,
      name: field === 'name' ? toStringIfPossible(value) : this.name,
      ort1: field === 'ort1' ? toStringIfPossible(value) : this.ort1,
      ort2: field === 'ort2' ? toStringIfPossible(value) : this.ort2,
      ort3: field === 'ort3' ? toStringIfPossible(value) : this.ort3,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_teilkultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilkultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'teilkultur',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.teilkultur_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
      const teilzaehlungs = await zaehlung.teilzaehlungs.fetch()

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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`zaehlung.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      zaehlung_id: this.id,
      kultur_id: field === 'kultur_id' ? value : this.kultur_id,
      datum: field === 'datum' ? value : this.datum,
      prognose: field === 'prognose' ? value : this.prognose,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_zaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'zaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'zaehlung',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.zaehlung_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    if (field === '_deleted' && value) {
      const zaehlungs = await this?.zaehlungs?.fetch()
      console.log('kultur model, zaehlungs:', zaehlungs)
      // TODO: edit to set _deleted true
    }
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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

  @action
  async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`teilzaehlung.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      teilzaehlung_id: this.id,
      zaehlung_id: field === 'zaehlung_id' ? value : this.zaehlung_id,
      teilkultur_id: field === 'teilkultur_id' ? value : this.teilkultur_id,
      anzahl_pflanzen:
        field === 'anzahl_pflanzen' ? value : this.anzahl_pflanzen,
      anzahl_auspflanzbereit:
        field === 'anzahl_auspflanzbereit'
          ? value
          : this.anzahl_auspflanzbereit,
      anzahl_mutterpflanzen:
        field === 'anzahl_mutterpflanzen' ? value : this.anzahl_mutterpflanzen,
      andere_menge:
        field === 'andere_menge'
          ? toStringIfPossible(value)
          : this.andere_menge,
      auspflanzbereit_beschreibung:
        field === 'auspflanzbereit_beschreibung'
          ? toStringIfPossible(value)
          : this.auspflanzbereit_beschreibung,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      prognose_von_tz:
        field === 'prognose_von_tz' ? value : this.prognose_von_tz,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_teilzaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilzaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'teilzaehlung',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.teilzaehlung_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    return
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
  @children('person_file') files

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`person.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      person_id: this.id,
      nr: field === 'nr' ? toStringIfPossible(value) : this.nr,
      vorname: field === 'vorname' ? toStringIfPossible(value) : this.vorname,
      name: field === 'name' ? toStringIfPossible(value) : this.name,
      adresszusatz:
        field === 'adresszusatz'
          ? toStringIfPossible(value)
          : this.adresszusatz,
      strasse: field === 'strasse' ? toStringIfPossible(value) : this.strasse,
      plz: field === 'plz' ? value : this.plz,
      ort: field === 'ort' ? toStringIfPossible(value) : this.ort,
      telefon_privat:
        field === 'telefon_privat'
          ? toStringIfPossible(value)
          : this.telefon_privat,
      telefon_geschaeft:
        field === 'telefon_geschaeft'
          ? toStringIfPossible(value)
          : this.telefon_geschaeft,
      telefon_mobile:
        field === 'telefon_mobile'
          ? toStringIfPossible(value)
          : this.telefon_mobile,
      email: field === 'email' ? toStringIfPossible(value) : this.email,
      kein_email: field === 'kein_email' ? value : this.kein_email,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      account_id:
        field === 'account_id' ? toStringIfPossible(value) : this.account_id,
      user_role_id: field === 'user_role_id' ? value : this.user_role_id,
      kommerziell: field === 'kommerziell' ? value : this.kommerziell,
      info: field === 'info' ? value : this.info,
      aktiv: field === 'aktiv' ? value : this.aktiv,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_person_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'person',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.person_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }

  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
    // delete firebase user
    deleteAccount({ store, person: this })
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
      const vonKultur = lieferung.von_kultur_id
        ? await this.collections.get('kultur').find(lieferung.von_kultur_id)
        : undefined
      const vonGarten = vonKultur ? await vonKultur.garten.fetch() : undefined
      const gartenLabel = await vonGarten.label.pipe(first$()).toPromise()
      const person = await lieferung.person.fetch()
      const personLabel = personLabelFromPerson({ person })
      const datumLabel = lieferung.datum
        ? DateTime.fromSQL(lieferung.datum).toFormat('yyyy.LL.dd')
        : `Kein Datum. ID: ${lieferung.id}`
      const von = gartenLabel ? `von: ${gartenLabel}` : ''
      const label = [datumLabel, von, personLabel].filter((e) => !!e).join('; ')

      return label
    }),
  )

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError, db } = store
    const [userPersonOption] = user.uid
      ? await db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .fetch()
      : [undefined]

    unsetError(`sammel_lieferung.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      sammel_lieferung_id: this.id,
      art_id: field === 'art_id' ? value : this.art_id,
      person_id: field === 'person_id' ? value : this.person_id,
      von_sammlung_id:
        field === 'von_sammlung_id' ? value : this.von_sammlung_id,
      von_kultur_id: field === 'von_kultur_id' ? value : this.von_kultur_id,
      datum: field === 'datum' ? value : this.datum,
      nach_kultur_id: field === 'nach_kultur_id' ? value : this.nach_kultur_id,
      nach_ausgepflanzt:
        field === 'nach_ausgepflanzt' ? value : this.nach_ausgepflanzt,
      von_anzahl_individuen:
        field === 'von_anzahl_individuen' ? value : this.von_anzahl_individuen,
      anzahl_pflanzen:
        field === 'anzahl_pflanzen' ? value : this.anzahl_pflanzen,
      anzahl_auspflanzbereit:
        field === 'anzahl_auspflanzbereit'
          ? value
          : this.anzahl_auspflanzbereit,
      gramm_samen: field === 'gramm_samen' ? value : this.gramm_samen,
      andere_menge:
        field === 'andere_menge'
          ? toStringIfPossible(value)
          : this.andere_menge,
      geplant: field === 'geplant' ? value : this.geplant,
      bemerkungen:
        field === 'bemerkungen' ? toStringIfPossible(value) : this.bemerkungen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_sammel_lieferung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'sammel_lieferung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'sammel_lieferung',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.sammel_lieferung_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    const sl_auto_copy_edits = userPersonOption?.sl_auto_copy_edits
    setTimeout(() => {
      // copy to all lieferungen
      if (sl_auto_copy_edits) {
        const newSammelLieferung = {
          ...newObject,
          id: newObject.sammel_lieferung_id,
        }
        delete newSammelLieferung.sammel_lieferung_id
        updateAllLieferungen({
          sammelLieferung: newSammelLieferung,
          store,
          field,
        })
      }
    }, 50)
  }

  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`event.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      event_id: this.id,
      kultur_id: field === 'kultur_id' ? value : this.kultur_id,
      teilkultur_id: field === 'teilkultur_id' ? value : this.teilkultur_id,
      person_id: field === 'person_id' ? value : this.person_id,
      beschreibung:
        field === 'beschreibung'
          ? toStringIfPossible(value)
          : this.beschreibung,
      geplant: field === 'geplant' ? value : this.geplant,
      datum: field === 'datum' ? value : this.datum,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_event_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'event_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'event',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.event_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`av.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      av_id: this.id,
      art_id: field === 'art_id' ? value : this.art_id,
      person_id: field === 'person_id' ? value : this.person_id,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_av_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'av_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'av',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.av_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
      const person = await garten.person.fetch()
      return gartenLabelFromGarten({ garten, person })
    }),
  )

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`gv.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      gv_id: this.id,
      garten_id: field === 'garten_id' ? value : this.garten_id,
      person_id: field === 'person_id' ? value : this.person_id,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_gv_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'gv_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'gv',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.gv_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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

  @relation('art', 'art_id') art
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

  @relation('garten', 'garten_id') garten
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

  @relation('herkunft', 'herkunft_id') herkunft
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

  @relation('kultur', 'kultur_id') kultur
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

  @relation('lieferung', 'lieferung_id') lieferung
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

  @relation('person', 'person_id') person
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

  @relation('sammlung', 'sammlung_id') sammlung
}

export class ArtQk extends Model {
  static table = 'art_qk'
  static associations = {
    art_qk_choosen: { type: 'has_many', foreignKey: 'qk_id' },
  }

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

  @children('art_qk_choosen') art_qk_choosens

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`art_qk.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      art_qk_id: this.id,
      name: field === 'name' ? toStringIfPossible(value) : this.name,
      titel: field === 'titel' ? toStringIfPossible(value) : this.titel,
      beschreibung:
        field === 'beschreibung'
          ? toStringIfPossible(value)
          : this.beschreibung,
      sort: field === 'sort' ? value : this.sort,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_art_qk_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_qk_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'art_qk',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.art_qk_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
  }
}

export class ArtQkChoosen extends Model {
  static table = 'art_qk_choosen'
  static associations = {
    art: { type: 'belongs_to', key: 'art_id' },
    art_qk: { type: 'belongs_to', key: 'qk_id' },
  }

  @field('id') id
  @field('art_id') art_id
  @field('qk_id') qk_id
  @field('choosen') choosen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('art', 'art_id') art
  @relation('art_qk', 'qk_id') art_qk
}

export class KulturOption extends Model {
  static table = 'kultur_option'
  static associations = {
    kultur: { type: 'belongs_to', key: 'id' },
  }

  @field('id') id
  @field('z_bemerkungen') z_bemerkungen
  @field('tz_teilkultur_id') titel
  @field('tz_anzahl_mutterpflanzen') beschreibung
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

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    //console.log('store, kultur_optionModel:', { this, field, value })

    unsetError(`kultur_option.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      kultur_id: this.id,
      z_bemerkungen: field === 'z_bemerkungen' ? value : this.z_bemerkungen,
      tz_teilkultur_id:
        field === 'tz_teilkultur_id' ? value : this.tz_teilkultur_id,
      tz_anzahl_mutterpflanzen:
        field === 'tz_anzahl_mutterpflanzen'
          ? value
          : this.tz_anzahl_mutterpflanzen,
      tz_andere_menge:
        field === 'tz_andere_menge' ? value : this.tz_andere_menge,
      tz_auspflanzbereit_beschreibung:
        field === 'tz_auspflanzbereit_beschreibung'
          ? value
          : this.tz_auspflanzbereit_beschreibung,
      tz_bemerkungen: field === 'tz_bemerkungen' ? value : this.tz_bemerkungen,
      tk: field === 'tk' ? value : this.tk,
      tk_bemerkungen: field === 'tk_bemerkungen' ? value : this.tk_bemerkungen,
      ev_teilkultur_id:
        field === 'ev_teilkultur_id' ? value : this.ev_teilkultur_id,
      ev_geplant: field === 'ev_geplant' ? value : this.ev_geplant,
      ev_person_id: field === 'ev_person_id' ? value : this.ev_person_id,
      ev_datum: field === 'ev_datum' ? value : this.ev_datum,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    // need to copy object for store (see below)
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_kultur_option_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_option_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'kultur_option',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // create optimistic winner for store
    // do not stringify revisions as _this_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.kultur_id
    // optimistically update
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
  }
}

export class KulturQk extends Model {
  static table = 'kultur_qk'
  static associations = {
    kultur_qk_choosen: { type: 'has_many', foreignKey: 'qk_id' },
  }

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

  @children('kultur_qk_choosen') kultur_qk_choosens

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`kultur_qk.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      kultur_qk_id: this.id,
      name: field === 'name' ? toStringIfPossible(value) : this.name,
      titel: field === 'titel' ? toStringIfPossible(value) : this.titel,
      beschreibung:
        field === 'beschreibung'
          ? toStringIfPossible(value)
          : this.beschreibung,
      sort: field === 'sort' ? value : this.sort,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_kultur_qk_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_qk_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'kultur_qk',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.kultur_qk_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
  }
}

export class KulturQkChoosen extends Model {
  static table = 'kultur_qk_choosen'
  static associations = {
    kultur: { type: 'belongs_to', key: 'kultur_id' },
    kultur_qk: { type: 'belongs_to', key: 'qk_id' },
  }

  @field('id') id
  @field('kultur_id') kultur_id
  @field('qk_id') qk_id
  @field('choosen') choosen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('kultur', 'kultur_id') kultur
  @relation('kultur_qk', 'qk_id') kultur_qk

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`kultur_qk_choosen.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      kultur_qk_choosen_id: this.id,
      kultur_id: field === 'kultur_id' ? value : this.kultur_id,
      qk_id: field === 'qk_id' ? value : this.qk_id,
      choosen: field === 'choosen' ? value : this.choosen,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_kultur_qk_choosen_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_qk_choosen_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'kultur_qk_choosen',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = this.id
    delete newObjectForStore.kultur_qk_choosen_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
  @field('tree_teilkultur') xtree_teilkulturxx
  @field('tree_zaehlung') tree_zaehlung
  @field('tree_lieferung') tree_lieferung
  @field('tree_event') tree_event
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', dontSanitize) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', dontSanitize) _conflicts

  @relation('person', 'id') person

  @action async removeConflict(_rev) {
    await this.update((row) => {
      row._conflicts = this._conflicts.filter((r) => r !== _rev)
    })
  }
  @action async edit({ field, value, store }) {
    const { addQueuedQuery, user, unsetError } = store

    unsetError(`person_option.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._depth + 1
    const newObject = {
      person_id: this.id,
      ar_name_deutsch:
        field === 'ar_name_deutsch' ? value : this.ar_name_deutsch,
      ga_strasse: field === 'ga_strasse' ? value : this.ga_strasse,
      ga_plz: field === 'ga_plz' ? value : this.ga_plz,
      ga_ort: field === 'ga_ort' ? value : this.ga_ort,
      ga_geom_point: field === 'ga_geom_point' ? value : this.ga_geom_point,
      ga_lat_lng: field === 'ga_lat_lng' ? value : this.ga_lat_lng,
      ga_aktiv: field === 'ga_aktiv' ? value : this.ga_aktiv,
      ga_bemerkungen: field === 'ga_bemerkungen' ? value : this.ga_bemerkungen,
      hk_kanton: field === 'hk_kanton' ? value : this.hk_kanton,
      hk_land: field === 'hk_land' ? value : this.hk_land,
      hk_bemerkungen: field === 'hk_bemerkungen' ? value : this.hk_bemerkungen,
      hk_geom_point: field === 'hk_geom_point' ? value : this.hk_geom_point,
      ku_zwischenlager:
        field === 'ku_zwischenlager' ? value : this.ku_zwischenlager,
      ku_erhaltungskultur:
        field === 'ku_erhaltungskultur' ? value : this.ku_erhaltungskultur,
      li_show_sl_felder:
        field === 'li_show_sl_felder' ? value : this.li_show_sl_felder,
      li_show_sl: field === 'li_show_sl' ? value : this.li_show_sl,
      sl_show_empty_when_next_to_li:
        field === 'sl_show_empty_when_next_to_li'
          ? value
          : this.sl_show_empty_when_next_to_li,
      sl_auto_copy_edits:
        field === 'sl_auto_copy_edits' ? value : this.sl_auto_copy_edits,
      tree_kultur: field === 'tree_kultur' ? value : this.tree_kultur,
      tree_teilkultur:
        field === 'tree_teilkultur' ? value : this.tree_teilkultur,
      tree_zaehlung: field === 'tree_zaehlung' ? value : this.tree_zaehlung,
      tree_lieferung: field === 'tree_lieferung' ? value : this.tree_lieferung,
      tree_event: field === 'tree_event' ? value : this.tree_event,
      _parent_rev: this._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv1()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    addQueuedQuery({
      name: 'mutateInsert_person_option_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'person_option_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'person_option',
      revertId: this.id,
      revertField: field,
      revertValue: this[field],
      newValue: value,
    })
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = this._revisions
      ? [rev, ...this._revisions]
      : [rev]
    newObjectForStore._conflicts = this._conflicts
    // for store: convert herkuft_rev to person_option
    newObjectForStore.id = this.id
    delete newObjectForStore.person_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
  }
  @action async delete({ store }) {
    await this.subAction(() =>
      this.edit({ field: '_deleted', value: true, store }),
    )
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
