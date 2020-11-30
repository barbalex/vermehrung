/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { ae_artModel } from './ae_artModel'
import { ae_artModelSelector } from './ae_artModel.base'
import { art_fileModel } from './art_fileModel'
import { art_fileModelSelector } from './art_fileModel.base'
import { art_qk_choosenModel } from './art_qk_choosenModel'
import { art_qk_choosenModelSelector } from './art_qk_choosenModel.base'
import { avModel } from './avModel'
import { avModelSelector } from './avModel.base'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { kultur_revModel } from './kultur_revModel'
import { kultur_revModelSelector } from './kultur_revModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { lieferung_revModel } from './lieferung_revModel'
import { lieferung_revModelSelector } from './lieferung_revModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { sammel_lieferung_revModel } from './sammel_lieferung_revModel'
import { sammel_lieferung_revModelSelector } from './sammel_lieferung_revModel.base'
import { sammlungModel } from './sammlungModel'
import { sammlungModelSelector } from './sammlungModel.base'
import { sammlung_revModel } from './sammlung_revModel'
import { sammlung_revModelSelector } from './sammlung_revModel.base'

/**
 * artBase
 * auto generated base class for the model artModel.
 */
export const artModelBase = ModelBase.named('art')
  .props({
    __typename: types.optional(types.literal('art'), 'art'),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    ae_id: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class artModelSelector extends QueryBuilder {
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
  get ae_id() {
    return this.__attr(`ae_id`)
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
export function selectFromart() {
  return new artModelSelector()
}

export const artModelPrimitives = selectFromart()._conflicts._deleted._depth
  ._parent_rev._rev._rev_at._revisions.ae_id.changed.changed_by
