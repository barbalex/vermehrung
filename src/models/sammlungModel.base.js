/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { artModel } from './artModel'
import { artModelSelector } from './artModel.base'
import { herkunftModel } from './herkunftModel'
import { herkunftModelSelector } from './herkunftModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { lieferung_revModel } from './lieferung_revModel'
import { lieferung_revModelSelector } from './lieferung_revModel.base'
import { personModel } from './personModel'
import { personModelSelector } from './personModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { sammel_lieferung_revModel } from './sammel_lieferung_revModel'
import { sammel_lieferung_revModelSelector } from './sammel_lieferung_revModel.base'
import { sammlung_fileModel } from './sammlung_fileModel'
import { sammlung_fileModelSelector } from './sammlung_fileModel.base'

/**
 * sammlungBase
 * auto generated base class for the model sammlungModel.
 */
export const sammlungModelBase = ModelBase.named('sammlung')
  .props({
    __typename: types.optional(types.literal('sammlung'), 'sammlung'),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    gramm_samen: types.union(types.undefined, types.null, types.frozen()),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    nr: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(
      types.undefined,
      types.null,
      types.integer,
    ),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class sammlungModelSelector extends QueryBuilder {
  get _conflicts() {
    return this.__attr(`_conflicts`)
  }
  get _deleted() {
    return this.__attr(`_deleted`)
  }
  get _depth() {
    return this.__attr(`_depth`)
  }
  get _parent_rev() {
    return this.__attr(`_parent_rev`)
  }
  get _rev() {
    return this.__attr(`_rev`)
  }
  get _rev_at() {
    return this.__attr(`_rev_at`)
  }
  get _revisions() {
    return this.__attr(`_revisions`)
  }
  get andere_menge() {
    return this.__attr(`andere_menge`)
  }
  get anzahl_pflanzen() {
    return this.__attr(`anzahl_pflanzen`)
  }
  get art_id() {
    return this.__attr(`art_id`)
  }
  get bemerkungen() {
    return this.__attr(`bemerkungen`)
  }
  get changed() {
    return this.__attr(`changed`)
  }
  get changed_by() {
    return this.__attr(`changed_by`)
  }
  get datum() {
    return this.__attr(`datum`)
  }
  get geom_point() {
    return this.__attr(`geom_point`)
  }
  get geplant() {
    return this.__attr(`geplant`)
  }
  get gramm_samen() {
    return this.__attr(`gramm_samen`)
  }
  get herkunft_id() {
    return this.__attr(`herkunft_id`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get lv95_x() {
    return this.__attr(`lv95_x`)
  }
  get lv95_y() {
    return this.__attr(`lv95_y`)
  }
  get nr() {
    return this.__attr(`nr`)
  }
  get person_id() {
    return this.__attr(`person_id`)
  }
  get von_anzahl_individuen() {
    return this.__attr(`von_anzahl_individuen`)
  }
  get wgs84_lat() {
    return this.__attr(`wgs84_lat`)
  }
  get wgs84_long() {
    return this.__attr(`wgs84_long`)
  }
}
export function selectFromsammlung() {
  return new sammlungModelSelector()
}

export const sammlungModelPrimitives = selectFromsammlung()._conflicts._deleted
  ._depth._parent_rev._rev._rev_at._revisions.andere_menge.anzahl_pflanzen
  .art_id.bemerkungen.changed.changed_by.datum.geom_point.geplant.gramm_samen
  .herkunft_id.lv95_x.lv95_y.nr.person_id.von_anzahl_individuen.wgs84_lat
  .wgs84_long