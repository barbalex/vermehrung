/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_file_stddev_fieldsBase
 * auto generated base class for the model garten_file_stddev_fieldsModel.
 */
export const garten_file_stddev_fieldsModelBase = ModelBase
  .named('garten_file_stddev_fields')
  .props({
    __typename: types.optional(types.literal("garten_file_stddev_fields"), "garten_file_stddev_fields"),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_file_stddev_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromgarten_file_stddev_fields() {
  return new garten_file_stddev_fieldsModelSelector()
}

export const garten_file_stddev_fieldsModelPrimitives = selectFromgarten_file_stddev_fields()._rev_at