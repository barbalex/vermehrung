/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_file_stddev_fieldsBase
 * auto generated base class for the model person_file_stddev_fieldsModel.
 */
export const person_file_stddev_fieldsModelBase = ModelBase
  .named('person_file_stddev_fields')
  .props({
    __typename: types.optional(types.literal("person_file_stddev_fields"), "person_file_stddev_fields"),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_file_stddev_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromperson_file_stddev_fields() {
  return new person_file_stddev_fieldsModelSelector()
}

export const person_file_stddev_fieldsModelPrimitives = selectFromperson_file_stddev_fields()._rev_at