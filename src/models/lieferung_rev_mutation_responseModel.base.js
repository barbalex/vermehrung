/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { lieferung_revModel } from "./lieferung_revModel"
import { lieferung_revModelSelector } from "./lieferung_revModel.base"


/**
 * lieferung_rev_mutation_responseBase
 * auto generated base class for the model lieferung_rev_mutation_responseModel.
 *
 * response of any mutation on the table "lieferung_rev"
 */
export const lieferung_rev_mutation_responseModelBase = ModelBase
  .named('lieferung_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("lieferung_rev_mutation_response"), "lieferung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, lieferung_revModelSelector, builder) }
}
export function selectFromlieferung_rev_mutation_response() {
  return new lieferung_rev_mutation_responseModelSelector()
}

export const lieferung_rev_mutation_responseModelPrimitives = selectFromlieferung_rev_mutation_response().affected_rows
