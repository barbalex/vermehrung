/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_option_stddev_samp_fieldsBase
 * auto generated base class for the model person_option_stddev_samp_fieldsModel.
 */
export const person_option_stddev_samp_fieldsModelBase = ModelBase
  .named('person_option_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("person_option_stddev_samp_fields"), "person_option_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_option_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromperson_option_stddev_samp_fields() {
  return new person_option_stddev_samp_fieldsModelSelector()
}

export const person_option_stddev_samp_fieldsModelPrimitives = selectFromperson_option_stddev_samp_fields()._depth
