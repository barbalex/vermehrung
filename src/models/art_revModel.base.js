/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { ae_artModel } from './ae_artModel'
import { ae_artModelSelector } from './ae_artModel.base'
import { avModel } from './avModel'
import { avModelSelector } from './avModel.base'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { sammlungModel } from './sammlungModel'
import { sammlungModelSelector } from './sammlungModel.base'

/**
 * art_revBase
 * auto generated base class for the model art_revModel.
 */
export const art_revModelBase = ModelBase.named('art_rev')
  .props({
    __typename: types.optional(types.literal('art_rev'), 'art_rev'),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    art_id: types.union(types.undefined, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class art_revModelSelector extends QueryBuilder {
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
  get ae_id() {
    return this.__attr(`ae_id`)
  }
  get art_id() {
    return this.__attr(`art_id`)
  }
  get changed() {
    return this.__attr(`changed`)
  }
  get changed_by() {
    return this.__attr(`changed_by`)
  }
  get id() {
    return this.__attr(`id`)
  }
}
export function selectFromart_rev() {
  return new art_revModelSelector()
}

export const art_revModelPrimitives = selectFromart_rev()._deleted._depth
  ._parent_rev._rev._revisions.ae_id.art_id.changed.changed_by
