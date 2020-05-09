/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_rev_stddev_fieldsBase
 * auto generated base class for the model person_rev_stddev_fieldsModel.
 *
 * aggregate stddev on columns
 */
export const person_rev_stddev_fieldsModelBase = ModelBase
  .named('person_rev_stddev_fields')
  .props({
    __typename: types.optional(types.literal("person_rev_stddev_fields"), "person_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_rev_stddev_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromperson_rev_stddev_fields() {
  return new person_rev_stddev_fieldsModelSelector()
}

export const person_rev_stddev_fieldsModelPrimitives = selectFromperson_rev_stddev_fields()._depth.plz
