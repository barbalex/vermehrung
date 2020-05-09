/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionRevSumFieldsBase
 * auto generated base class for the model KulturOptionRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const KulturOptionRevSumFieldsModelBase = ModelBase
  .named('KulturOptionRevSumFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_sum_fields"), "kultur_option_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionRevSumFields() {
  return new KulturOptionRevSumFieldsModelSelector()
}

export const kulturOptionRevSumFieldsModelPrimitives = selectFromKulturOptionRevSumFields()._depth
