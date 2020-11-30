/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammlung_file_variance_fieldsBase
 * auto generated base class for the model sammlung_file_variance_fieldsModel.
 */
export const sammlung_file_variance_fieldsModelBase = ModelBase
  .named('sammlung_file_variance_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_file_variance_fields"), "sammlung_file_variance_fields"),
    _rev_at: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_file_variance_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
}
export function selectFromsammlung_file_variance_fields() {
  return new sammlung_file_variance_fieldsModelSelector()
}

export const sammlung_file_variance_fieldsModelPrimitives = selectFromsammlung_file_variance_fields()._rev_at
