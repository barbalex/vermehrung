/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_stddev_samp_fieldsBase
 * auto generated base class for the model person_stddev_samp_fieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const person_stddev_samp_fieldsModelBase = ModelBase
  .named('person_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("person_stddev_samp_fields"), "person_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromperson_stddev_samp_fields() {
  return new person_stddev_samp_fieldsModelSelector()
}

export const person_stddev_samp_fieldsModelPrimitives = selectFromperson_stddev_samp_fields()._depth.plz
