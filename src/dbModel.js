import { Model } from '@nozbe/watermelondb'
import {
  action,
  children,
  field,
  json,
  relation,
} from '@nozbe/watermelondb/decorators'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import toStringIfPossible from './utils/toStringIfPossible'
import toPgArray from './utils/toPgArray'

const dontSanitize = (val) => val

export class Herkunft extends Model {
  static table = 'herkunft'
  static associations = {
    sammlung: { type: 'has_many', foreignKey: 'herkunft_id' },
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
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    const newObjectForStore = { ...newObject }
    // convert to string as hasura does not support arrays yet
    // https://github.com/hasura/graphql-engine/pull/2243
    newObject._revisions = this._revisions
      ? toPgArray([rev, ...this._revisions])
      : toPgArray([rev])
    /*console.log('Herkunft Model', {
      newObject,
      newObjectForStore,
      rev,
      newDepth,
      this: this._raw,
    })*/
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
    delete newObjectForStore.herkunft_id
    // optimistically update store
    await this.update((row) => ({ ...row, ...newObjectForStore }))
    // NOOOOO: this leads to conflicts due to multiple identical id's!
    //if (field === '_deleted' && value) await this.markAsDeleted()
    if (field === '_deleted' && value) {
      const sammlungs = await this.sammlungs.fetch()
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
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
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

  @relation('herkunft', 'herkunft_id') herkunft

  @children('lieferung') lieferungs

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
      if (field === '_deleted' && value) {
        const lieferungs = await this.lieferungs.fetch()
        console.log('sammlung model, lieferungs:', lieferungs)
        // TODO: edit to set _deleted true
      }
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

  @relation('lieferung', 'von_sammlung_id') lieferung

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

  @children('sammlung') sammlungs

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
      const sammlungs = await this.sammlungs.fetch()
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

  @field('id') id
  @field('name') name
  @field('changed') changed
}

export class Garten extends Model {
  static table = 'garten'
  static associations = {
    kultur: { type: 'has_many', foreignKey: 'garten_id' },
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
      const kulturs = await this.kulturs.fetch()
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
