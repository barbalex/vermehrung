/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"


/**
 * lieferung_mutation_responseBase
 * auto generated base class for the model lieferung_mutation_responseModel.
 */
export const lieferung_mutation_responseModelBase = ModelBase
  .named('lieferung_mutation_response')
  .props({
    __typename: types.optional(types.literal("lieferung_mutation_response"), "lieferung_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, lieferungModelSelector, builder) }
}
export function selectFromlieferung_mutation_response() {
  return new lieferung_mutation_responseModelSelector()
}

export const lieferung_mutation_responseModelPrimitives = selectFromlieferung_mutation_response().affected_rows
