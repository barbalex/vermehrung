/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"


/**
 * avBase
 * auto generated base class for the model avModel.
 */
export const avModelBase = ModelBase
  .named('av')
  .props({
    __typename: types.optional(types.literal("av"), "av"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    art: types.union(types.undefined, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    person: types.union(types.undefined, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class avModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get art_id() { return this.__attr(`art_id`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
}
export function selectFromav() {
  return new avModelSelector()
}

export const avModelPrimitives = selectFromav()._conflicts._deleted._depth._parent_rev._rev._revisions.art_id.changed.changed_by.person_id
