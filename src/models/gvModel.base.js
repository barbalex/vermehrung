/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"


/**
 * gvBase
 * auto generated base class for the model gvModel.
 */
export const gvModelBase = ModelBase
  .named('gv')
  .props({
    __typename: types.optional(types.literal("gv"), "gv"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    garten: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    person: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gvModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
  garten(builder) { return this.__child(`garten`, gartenModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
}
export function selectFromgv() {
  return new gvModelSelector()
}

export const gvModelPrimitives = selectFromgv()._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.changed.changed_by.garten_id.person_id
