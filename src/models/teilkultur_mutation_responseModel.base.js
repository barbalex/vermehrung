/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"


/**
 * teilkultur_mutation_responseBase
 * auto generated base class for the model teilkultur_mutation_responseModel.
 */
export const teilkultur_mutation_responseModelBase = ModelBase
  .named('teilkultur_mutation_response')
  .props({
    __typename: types.optional(types.literal("teilkultur_mutation_response"), "teilkultur_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkulturModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, teilkulturModelSelector, builder) }
}
export function selectFromteilkultur_mutation_response() {
  return new teilkultur_mutation_responseModelSelector()
}

export const teilkultur_mutation_responseModelPrimitives = selectFromteilkultur_mutation_response().affected_rows
