/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_qk_choosen_revModel } from "./kultur_qk_choosen_revModel"
import { kultur_qk_choosen_revModelSelector } from "./kultur_qk_choosen_revModel.base"


/**
 * kultur_qk_choosen_rev_mutation_responseBase
 * auto generated base class for the model kultur_qk_choosen_rev_mutation_responseModel.
 */
export const kultur_qk_choosen_rev_mutation_responseModelBase = ModelBase
  .named('kultur_qk_choosen_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_rev_mutation_response"), "kultur_qk_choosen_rev_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_qk_choosen_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosen_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, kultur_qk_choosen_revModelSelector, builder) }
}
export function selectFromkultur_qk_choosen_rev_mutation_response() {
  return new kultur_qk_choosen_rev_mutation_responseModelSelector()
}

export const kultur_qk_choosen_rev_mutation_responseModelPrimitives = selectFromkultur_qk_choosen_rev_mutation_response().affected_rows
