/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_option_revModel } from "./kultur_option_revModel"
import { kultur_option_revModelSelector } from "./kultur_option_revModel.base"


/**
 * kultur_option_rev_mutation_responseBase
 * auto generated base class for the model kultur_option_rev_mutation_responseModel.
 */
export const kultur_option_rev_mutation_responseModelBase = ModelBase
  .named('kultur_option_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_mutation_response"), "kultur_option_rev_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_option_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_option_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, kultur_option_revModelSelector, builder) }
}
export function selectFromkultur_option_rev_mutation_response() {
  return new kultur_option_rev_mutation_responseModelSelector()
}

export const kultur_option_rev_mutation_responseModelPrimitives = selectFromkultur_option_rev_mutation_response().affected_rows
