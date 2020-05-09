/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilkultur_revModel } from "./teilkultur_revModel"
import { teilkultur_revModelSelector } from "./teilkultur_revModel.base"


/**
 * teilkultur_rev_mutation_responseBase
 * auto generated base class for the model teilkultur_rev_mutation_responseModel.
 *
 * response of any mutation on the table "teilkultur_rev"
 */
export const teilkultur_rev_mutation_responseModelBase = ModelBase
  .named('teilkultur_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_mutation_response"), "teilkultur_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => teilkultur_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, teilkultur_revModelSelector, builder) }
}
export function selectFromteilkultur_rev_mutation_response() {
  return new teilkultur_rev_mutation_responseModelSelector()
}

export const teilkultur_rev_mutation_responseModelPrimitives = selectFromteilkultur_rev_mutation_response().affected_rows
