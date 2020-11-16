import { Model } from '@nozbe/watermelondb'
import {
  children,
  field,
  json,
  relation,
  action,
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
    const { addQueuedQuery, user, unsetError, db } = store

    unsetError(`herkunft.${field}`)
    // first build the part that will be revisioned
    const newDepth = this._raw._depth + 1
    const newObject = {
      herkunft_id: this._raw.id,
      nr: field === 'nr' ? toStringIfPossible(value) : this._raw.nr,
      lokalname:
        field === 'lokalname' ? toStringIfPossible(value) : this._raw.lokalname,
      gemeinde:
        field === 'gemeinde' ? toStringIfPossible(value) : this._raw.gemeinde,
      kanton: field === 'kanton' ? toStringIfPossible(value) : this._raw.kanton,
      land: field === 'land' ? toStringIfPossible(value) : this._raw.land,
      geom_point: field === 'geom_point' ? value : this.geom_point,
      bemerkungen:
        field === 'bemerkungen'
          ? toStringIfPossible(value)
          : this._raw.bemerkungen,
      _parent_rev: this._raw._rev,
      _depth: newDepth,
      _deleted: field === '_deleted' ? value : this._raw._deleted,
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
    console.log('Herkunft Model', {
      newObject,
      newObjectForStore,
      rev,
      newDepth,
      this: this._raw,
    })
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
      revertId: this._raw.id,
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
    newObjectForStore.id = this._raw.id
    delete newObjectForStore.herkunft_id
    // optimistically update store
    // 1. mst
    //upsertHerkunftModel(newObjectForStore)
    //if (field === '_deleted' && value) this.deleteNSide()
    // 2. wdb
    db.action(async () => {
      await this.update((row) => ({ ...row, ...newObjectForStore }))
      if (field === '_deleted' && value) await this.markAsDeleted()
    })
  }
  @action delete({ store }) {
    this.edit({ field: '_deleted', value: true, store })
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
}

export class AeArt extends Model {
  static table = 'ae_art'

  @field('id') id
  @field('name') name
  @field('name_deutsch') name_deutsch
  @field('name_latein') name_latein
  // changed exists but is not yet in the mst-model
  //@field('changed') changed
}
