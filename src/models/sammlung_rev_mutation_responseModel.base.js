/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlung_revModel } from "./sammlung_revModel"
import { sammlung_revModelSelector } from "./sammlung_revModel.base"


/**
 * sammlung_rev_mutation_responseBase
 * auto generated base class for the model sammlung_rev_mutation_responseModel.
 *
 * response of any mutation on the table "sammlung_rev"
 */
export const sammlung_rev_mutation_responseModelBase = ModelBase
  .named('sammlung_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_mutation_response"), "sammlung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlung_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, sammlung_revModelSelector, builder) }
}
export function selectFromsammlung_rev_mutation_response() {
  return new sammlung_rev_mutation_responseModelSelector()
}

export const sammlung_rev_mutation_responseModelPrimitives = selectFromsammlung_rev_mutation_response().affected_rows
