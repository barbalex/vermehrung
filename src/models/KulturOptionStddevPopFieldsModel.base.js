/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionStddevPopFieldsBase
 * auto generated base class for the model KulturOptionStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const KulturOptionStddevPopFieldsModelBase = ModelBase
  .named('KulturOptionStddevPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_stddev_pop_fields"), "kultur_option_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionStddevPopFields() {
  return new KulturOptionStddevPopFieldsModelSelector()
}

export const kulturOptionStddevPopFieldsModelPrimitives = selectFromKulturOptionStddevPopFields()._depth
