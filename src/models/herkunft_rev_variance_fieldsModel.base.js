/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * herkunft_rev_variance_fieldsBase
 * auto generated base class for the model herkunft_rev_variance_fieldsModel.
 *
 * aggregate variance on columns
 */
export const herkunft_rev_variance_fieldsModelBase = ModelBase
  .named('herkunft_rev_variance_fields')
  .props({
    __typename: types.optional(types.literal("herkunft_rev_variance_fields"), "herkunft_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_rev_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromherkunft_rev_variance_fields() {
  return new herkunft_rev_variance_fieldsModelSelector()
}

export const herkunft_rev_variance_fieldsModelPrimitives = selectFromherkunft_rev_variance_fields()._depth
