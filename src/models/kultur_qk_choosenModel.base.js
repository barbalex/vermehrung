/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { kultur_qkModel } from './kultur_qkModel'
import { kultur_qkModelSelector } from './kultur_qkModel.base'

/**
 * kultur_qk_choosenBase
 * auto generated base class for the model kultur_qk_choosenModel.
 */
export const kultur_qk_choosenModelBase = ModelBase.named('kultur_qk_choosen')
  .props({
    __typename: types.optional(
      types.literal('kultur_qk_choosen'),
      'kultur_qk_choosen',
    ),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    choosen: types.union(types.undefined, types.null, types.boolean),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.frozen()),
    qk_name: types.union(types.undefined, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class kultur_qk_choosenModelSelector extends QueryBuilder {
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
  get changed() {
    return this.__attr(`changed`)
  }
  get changed_by() {
    return this.__attr(`changed_by`)
  }
  get choosen() {
    return this.__attr(`choosen`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kultur_id() {
    return this.__attr(`kultur_id`)
  }
  get qk_name() {
    return this.__attr(`qk_name`)
  }
}
export function selectFromkultur_qk_choosen() {
  return new kultur_qk_choosenModelSelector()
}

export const kultur_qk_choosenModelPrimitives = selectFromkultur_qk_choosen()
  ._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.changed
  .changed_by.choosen.kultur_id.qk_name
