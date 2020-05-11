/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammel_lieferung_revModel } from "./sammel_lieferung_revModel"
import { sammel_lieferung_revModelSelector } from "./sammel_lieferung_revModel.base"


/**
 * sammel_lieferung_rev_mutation_responseBase
 * auto generated base class for the model sammel_lieferung_rev_mutation_responseModel.
 *
 * response of any mutation on the table "sammel_lieferung_rev"
 */
export const sammel_lieferung_rev_mutation_responseModelBase = ModelBase
  .named('sammel_lieferung_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_rev_mutation_response"), "sammel_lieferung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferung_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammel_lieferung_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, sammel_lieferung_revModelSelector, builder) }
}
export function selectFromsammel_lieferung_rev_mutation_response() {
  return new sammel_lieferung_rev_mutation_responseModelSelector()
}

export const sammel_lieferung_rev_mutation_responseModelPrimitives = selectFromsammel_lieferung_rev_mutation_response().affected_rows
