/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_qk_choosenModel } from "./kultur_qk_choosenModel"
import { kultur_qk_choosenModelSelector } from "./kultur_qk_choosenModel.base"


/**
 * kultur_qk_choosen_mutation_responseBase
 * auto generated base class for the model kultur_qk_choosen_mutation_responseModel.
 *
 * response of any mutation on the table "kultur_qk_choosen"
 */
export const kultur_qk_choosen_mutation_responseModelBase = ModelBase
  .named('kultur_qk_choosen_mutation_response')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_mutation_response"), "kultur_qk_choosen_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => kultur_qk_choosenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosen_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, kultur_qk_choosenModelSelector, builder) }
}
export function selectFromkultur_qk_choosen_mutation_response() {
  return new kultur_qk_choosen_mutation_responseModelSelector()
}

export const kultur_qk_choosen_mutation_responseModelPrimitives = selectFromkultur_qk_choosen_mutation_response().affected_rows
