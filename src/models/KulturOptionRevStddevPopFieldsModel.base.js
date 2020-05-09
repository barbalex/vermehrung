/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionRevStddevPopFieldsBase
 * auto generated base class for the model KulturOptionRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const KulturOptionRevStddevPopFieldsModelBase = ModelBase
  .named('KulturOptionRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_stddev_pop_fields"), "kultur_option_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionRevStddevPopFields() {
  return new KulturOptionRevStddevPopFieldsModelSelector()
}

export const kulturOptionRevStddevPopFieldsModelPrimitives = selectFromKulturOptionRevStddevPopFields()._depth
