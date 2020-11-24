/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * garten_rev_stddev_fieldsBase
 * auto generated base class for the model garten_rev_stddev_fieldsModel.
 */
export const garten_rev_stddev_fieldsModelBase = ModelBase
  .named('garten_rev_stddev_fields')
  .props({
    __typename: types.optional(types.literal("garten_rev_stddev_fields"), "garten_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_rev_stddev_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromgarten_rev_stddev_fields() {
  return new garten_rev_stddev_fieldsModelSelector()
}

export const garten_rev_stddev_fieldsModelPrimitives = selectFromgarten_rev_stddev_fields()._depth._rev_at.plz
