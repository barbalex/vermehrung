/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_stddev_pop_fieldsBase
 * auto generated base class for the model person_stddev_pop_fieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const person_stddev_pop_fieldsModelBase = ModelBase
  .named('person_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("person_stddev_pop_fields"), "person_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromperson_stddev_pop_fields() {
  return new person_stddev_pop_fieldsModelSelector()
}

export const person_stddev_pop_fieldsModelPrimitives = selectFromperson_stddev_pop_fields()._depth.plz
