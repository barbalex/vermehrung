/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionVarianceFieldsBase
 * auto generated base class for the model KulturOptionVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const KulturOptionVarianceFieldsModelBase = ModelBase
  .named('KulturOptionVarianceFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_variance_fields"), "kultur_option_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionVarianceFields() {
  return new KulturOptionVarianceFieldsModelSelector()
}

export const kulturOptionVarianceFieldsModelPrimitives = selectFromKulturOptionVarianceFields()._depth
