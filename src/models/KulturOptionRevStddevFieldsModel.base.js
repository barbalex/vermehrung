/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionRevStddevFieldsBase
 * auto generated base class for the model KulturOptionRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const KulturOptionRevStddevFieldsModelBase = ModelBase
  .named('KulturOptionRevStddevFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_stddev_fields"), "kultur_option_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionRevStddevFields() {
  return new KulturOptionRevStddevFieldsModelSelector()
}

export const kulturOptionRevStddevFieldsModelPrimitives = selectFromKulturOptionRevStddevFields()._depth
