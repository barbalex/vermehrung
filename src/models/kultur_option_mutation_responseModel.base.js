/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_optionModel } from "./kultur_optionModel"
import { kultur_optionModelSelector } from "./kultur_optionModel.base"


/**
 * kultur_option_mutation_responseBase
 * auto generated base class for the model kultur_option_mutation_responseModel.
 *
 * response of any mutation on the table "kultur_option"
 */
export const kultur_option_mutation_responseModelBase = ModelBase
  .named('kultur_option_mutation_response')
  .props({
    __typename: types.optional(types.literal("kultur_option_mutation_response"), "kultur_option_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => kultur_optionModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_option_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, kultur_optionModelSelector, builder) }
}
export function selectFromkultur_option_mutation_response() {
  return new kultur_option_mutation_responseModelSelector()
}

export const kultur_option_mutation_responseModelPrimitives = selectFromkultur_option_mutation_response().affected_rows
