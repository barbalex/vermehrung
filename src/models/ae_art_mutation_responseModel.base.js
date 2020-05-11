/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelSelector } from "./ae_artModel.base"


/**
 * ae_art_mutation_responseBase
 * auto generated base class for the model ae_art_mutation_responseModel.
 *
 * response of any mutation on the table "ae_art"
 */
export const ae_art_mutation_responseModelBase = ModelBase
  .named('ae_art_mutation_response')
  .props({
    __typename: types.optional(types.literal("ae_art_mutation_response"), "ae_art_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => ae_artModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ae_art_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ae_artModelSelector, builder) }
}
export function selectFromae_art_mutation_response() {
  return new ae_art_mutation_responseModelSelector()
}

export const ae_art_mutation_responseModelPrimitives = selectFromae_art_mutation_response().affected_rows
