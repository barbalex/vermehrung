/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkSumFieldsBase
 * auto generated base class for the model KulturQkSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const KulturQkSumFieldsModelBase = ModelBase
  .named('KulturQkSumFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_sum_fields"), "kultur_qk_sum_fields"),
    sort: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkSumFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkSumFields() {
  return new KulturQkSumFieldsModelSelector()
}

export const kulturQkSumFieldsModelPrimitives = selectFromKulturQkSumFields().sort
