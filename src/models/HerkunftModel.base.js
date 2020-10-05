/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { herkunft_fileModel } from './herkunft_fileModel'
import { herkunft_fileModelSelector } from './herkunft_fileModel.base'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { kultur_revModel } from './kultur_revModel'
import { kultur_revModelSelector } from './kultur_revModel.base'
import { sammlungModel } from './sammlungModel'
import { sammlungModelSelector } from './sammlungModel.base'
import { sammlung_revModel } from './sammlung_revModel'
import { sammlung_revModelSelector } from './sammlung_revModel.base'

/**
 * herkunftBase
 * auto generated base class for the model herkunftModel.
 */
export const herkunftModelBase = ModelBase.named('herkunft')
  .props({
    __typename: types.optional(types.literal('herkunft'), 'herkunft'),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    gemeinde: types.union(types.undefined, types.null, types.string),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    kanton: types.union(types.undefined, types.null, types.string),
    land: types.union(types.undefined, types.null, types.string),
    lokalname: types.union(types.undefined, types.null, types.string),
    lv95_x: types.union(types.undefined, types.null, types.frozen()),
    lv95_y: types.union(types.undefined, types.null, types.frozen()),
    nr: types.union(types.undefined, types.null, types.string),
    wgs84_lat: types.union(types.undefined, types.null, types.frozen()),
    wgs84_long: types.union(types.undefined, types.null, types.frozen()),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class herkunftModelSelector extends QueryBuilder {
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
  get _revisions() {
    return this.__attr(`_revisions`)
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
  get gemeinde() {
    return this.__attr(`gemeinde`)
  }
  get geom_point() {
    return this.__attr(`geom_point`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kanton() {
    return this.__attr(`kanton`)
  }
  get land() {
    return this.__attr(`land`)
  }
  get lokalname() {
    return this.__attr(`lokalname`)
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
  get wgs84_lat() {
    return this.__attr(`wgs84_lat`)
  }
  get wgs84_long() {
    return this.__attr(`wgs84_long`)
  }
}
export function selectFromherkunft() {
  return new herkunftModelSelector()
}

export const herkunftModelPrimitives = selectFromherkunft()._conflicts._deleted
  ._depth._parent_rev._rev._revisions.bemerkungen.changed.changed_by.gemeinde
  .geom_point.kanton.land.lokalname.lv95_x.lv95_y.nr.wgs84_lat.wgs84_long
