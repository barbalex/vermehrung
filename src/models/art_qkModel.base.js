/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { art_qk_choosen_aggregateModel } from "./art_qk_choosen_aggregateModel"
import { art_qk_choosen_aggregateModelSelector } from "./art_qk_choosen_aggregateModel.base"


/**
 * art_qkBase
 * auto generated base class for the model art_qkModel.
 *
 * columns and relationships of "art_qk"
 */
export const art_qkModelBase = ModelBase
  .named('art_qk')
  .props({
    __typename: types.optional(types.literal("art_qk"), "art_qk"),
    /** An array relationship */
    art_qk_choosens: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosenModel)))),
    /** An aggregated array relationship */
    art_qk_choosens_aggregate: types.union(types.undefined, types.late(() => art_qk_choosen_aggregateModel)),
    beschreibung: types.union(types.undefined, types.null, types.string),
    /** Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt */
    name: types.union(types.undefined, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qkModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
  art_qk_choosens(builder) { return this.__child(`art_qk_choosens`, art_qk_choosenModelSelector, builder) }
  art_qk_choosens_aggregate(builder) { return this.__child(`art_qk_choosens_aggregate`, art_qk_choosen_aggregateModelSelector, builder) }
}
export function selectFromart_qk() {
  return new art_qkModelSelector()
}

export const art_qkModelPrimitives = selectFromart_qk().beschreibung.name.sort.titel
