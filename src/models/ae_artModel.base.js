/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"


/**
 * ae_artBase
 * auto generated base class for the model ae_artModel.
 */
export const ae_artModelBase = ModelBase
  .named('ae_art')
  .props({
    __typename: types.optional(types.literal("ae_art"), "ae_art"),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    ae_art_art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    changed: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
    name_deutsch: types.union(types.undefined, types.null, types.string),
    name_latein: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ae_artModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
  get changed() { return this.__attr(`changed`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get name_deutsch() { return this.__attr(`name_deutsch`) }
  get name_latein() { return this.__attr(`name_latein`) }
  ae_art_art(builder) { return this.__child(`ae_art_art`, artModelSelector, builder) }
}
export function selectFromae_art() {
  return new ae_artModelSelector()
}

export const ae_artModelPrimitives = selectFromae_art()._rev_at.changed.name.name_deutsch.name_latein
