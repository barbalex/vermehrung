/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkVarianceFieldsBase
 * auto generated base class for the model KulturQkVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const KulturQkVarianceFieldsModelBase = ModelBase
  .named('KulturQkVarianceFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_variance_fields"), "kultur_qk_variance_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkVarianceFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkVarianceFields() {
  return new KulturQkVarianceFieldsModelSelector()
}

export const kulturQkVarianceFieldsModelPrimitives = selectFromKulturQkVarianceFields().sort
