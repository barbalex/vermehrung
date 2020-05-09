/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionStddevFieldsBase
 * auto generated base class for the model KulturOptionStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const KulturOptionStddevFieldsModelBase = ModelBase
  .named('KulturOptionStddevFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_stddev_fields"), "kultur_option_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionStddevFields() {
  return new KulturOptionStddevFieldsModelSelector()
}

export const kulturOptionStddevFieldsModelPrimitives = selectFromKulturOptionStddevFields()._depth
