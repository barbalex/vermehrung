/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionSumFieldsBase
 * auto generated base class for the model KulturOptionSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const KulturOptionSumFieldsModelBase = ModelBase
  .named('KulturOptionSumFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_sum_fields"), "kultur_option_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionSumFields() {
  return new KulturOptionSumFieldsModelSelector()
}

export const kulturOptionSumFieldsModelPrimitives = selectFromKulturOptionSumFields()._depth
