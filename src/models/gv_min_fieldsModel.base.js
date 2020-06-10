/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * gv_min_fieldsBase
 * auto generated base class for the model gv_min_fieldsModel.
 */
export const gv_min_fieldsModelBase = ModelBase
  .named('gv_min_fields')
  .props({
    __typename: types.optional(types.literal("gv_min_fields"), "gv_min_fields"),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gv_min_fieldsModelSelector extends QueryBuilder {
  get garten_id() { return this.__attr(`garten_id`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromgv_min_fields() {
  return new gv_min_fieldsModelSelector()
}

export const gv_min_fieldsModelPrimitives = selectFromgv_min_fields().garten_id.person_id
