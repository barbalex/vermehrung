/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { zaehlung_revModel } from "./zaehlung_revModel"
import { zaehlung_revModelSelector } from "./zaehlung_revModel.base"


/**
 * zaehlung_rev_mutation_responseBase
 * auto generated base class for the model zaehlung_rev_mutation_responseModel.
 *
 * response of any mutation on the table "zaehlung_rev"
 */
export const zaehlung_rev_mutation_responseModelBase = ModelBase
  .named('zaehlung_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_mutation_response"), "zaehlung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => zaehlung_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class zaehlung_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, zaehlung_revModelSelector, builder) }
}
export function selectFromzaehlung_rev_mutation_response() {
  return new zaehlung_rev_mutation_responseModelSelector()
}

export const zaehlung_rev_mutation_responseModelPrimitives = selectFromzaehlung_rev_mutation_response().affected_rows
