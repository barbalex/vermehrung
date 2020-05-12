/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"


/**
 * sammlung_mutation_responseBase
 * auto generated base class for the model sammlung_mutation_responseModel.
 */
export const sammlung_mutation_responseModelBase = ModelBase
  .named('sammlung_mutation_response')
  .props({
    __typename: types.optional(types.literal("sammlung_mutation_response"), "sammlung_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, sammlungModelSelector, builder) }
}
export function selectFromsammlung_mutation_response() {
  return new sammlung_mutation_responseModelSelector()
}

export const sammlung_mutation_responseModelPrimitives = selectFromsammlung_mutation_response().affected_rows
