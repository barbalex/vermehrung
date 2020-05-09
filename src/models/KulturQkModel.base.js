/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturQkChoosenAggregateModel } from "./KulturQkChoosenAggregateModel"
import { KulturQkChoosenAggregateModelSelector } from "./KulturQkChoosenAggregateModel.base"
import { KulturQkChoosenModel } from "./KulturQkChoosenModel"
import { KulturQkChoosenModelSelector } from "./KulturQkChoosenModel.base"


/**
 * KulturQkBase
 * auto generated base class for the model KulturQkModel.
 *
 * columns and relationships of "kultur_qk"
 */
export const KulturQkModelBase = ModelBase
  .named('KulturQk')
  .props({
    __typename: types.optional(types.literal("kultur_qk"), "kultur_qk"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    kultur_qk_choosens: types.union(types.undefined, types.array(types.late(() => KulturQkChoosenModel))),
    /** An aggregated array relationship */
    kultur_qk_choosens_aggregate: types.union(types.undefined, types.late(() => KulturQkChoosenAggregateModel)),
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

export class KulturQkModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
  kultur_qk_choosens(builder) { return this.__child(`kultur_qk_choosens`, KulturQkChoosenModelSelector, builder) }
  kultur_qk_choosens_aggregate(builder) { return this.__child(`kultur_qk_choosens_aggregate`, KulturQkChoosenAggregateModelSelector, builder) }
}
export function selectFromKulturQk() {
  return new KulturQkModelSelector()
}

export const kulturQkModelPrimitives = selectFromKulturQk().beschreibung.name.sort.titel
