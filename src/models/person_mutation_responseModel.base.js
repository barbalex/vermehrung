/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"


/**
 * person_mutation_responseBase
 * auto generated base class for the model person_mutation_responseModel.
 */
export const person_mutation_responseModelBase = ModelBase
  .named('person_mutation_response')
  .props({
    __typename: types.optional(types.literal("person_mutation_response"), "person_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => personModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, personModelSelector, builder) }
}
export function selectFromperson_mutation_response() {
  return new person_mutation_responseModelSelector()
}

export const person_mutation_responseModelPrimitives = selectFromperson_mutation_response().affected_rows
