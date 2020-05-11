/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_qk_choosenModel } from "./kultur_qk_choosenModel"
import { kultur_qk_choosenModelSelector } from "./kultur_qk_choosenModel.base"
import { kultur_qk_choosen_aggregateModel } from "./kultur_qk_choosen_aggregateModel"
import { kultur_qk_choosen_aggregateModelSelector } from "./kultur_qk_choosen_aggregateModel.base"


/**
 * kultur_qkBase
 * auto generated base class for the model kultur_qkModel.
 *
 * columns and relationships of "kultur_qk"
 */
export const kultur_qkModelBase = ModelBase
  .named('kultur_qk')
  .props({
    __typename: types.optional(types.literal("kultur_qk"), "kultur_qk"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    kultur_qk_choosens: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_qk_choosenModel)))),
    /** An aggregated array relationship */
    kultur_qk_choosens_aggregate: types.union(types.undefined, types.late(() => kultur_qk_choosen_aggregateModel)),
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

export class kultur_qkModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
  kultur_qk_choosens(builder) { return this.__child(`kultur_qk_choosens`, kultur_qk_choosenModelSelector, builder) }
  kultur_qk_choosens_aggregate(builder) { return this.__child(`kultur_qk_choosens_aggregate`, kultur_qk_choosen_aggregateModelSelector, builder) }
}
export function selectFromkultur_qk() {
  return new kultur_qkModelSelector()
}

export const kultur_qkModelPrimitives = selectFromkultur_qk().beschreibung.name.sort.titel
