/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { personModel } from './personModel'
import { personModelSelector } from './personModel.base'

/**
 * garten_revBase
 * auto generated base class for the model garten_revModel.
 */
export const garten_revModelBase = ModelBase.named('garten_rev')
  .props({
    __typename: types.optional(types.literal('garten_rev'), 'garten_rev'),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    garten_id: types.union(types.undefined, types.frozen()),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    strasse: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class garten_revModelSelector extends QueryBuilder {
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
  get aktiv() {
    return this.__attr(`aktiv`)
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
  get garten_id() {
    return this.__attr(`garten_id`)
  }
  get geom_point() {
    return this.__attr(`geom_point`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get name() {
    return this.__attr(`name`)
  }
  get ort() {
    return this.__attr(`ort`)
  }
  get person_id() {
    return this.__attr(`person_id`)
  }
  get plz() {
    return this.__attr(`plz`)
  }
  get strasse() {
    return this.__attr(`strasse`)
  }
}
export function selectFromgarten_rev() {
  return new garten_revModelSelector()
}

export const garten_revModelPrimitives = selectFromgarten_rev()._deleted._depth
  ._parent_rev._rev._rev_at._revisions.aktiv.bemerkungen.changed.changed_by
  .garten_id.geom_point.name.ort.person_id.plz.strasse
