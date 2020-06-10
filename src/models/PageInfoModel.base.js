/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PageInfoBase
 * auto generated base class for the model PageInfoModel.
 */
export const PageInfoModelBase = ModelBase
  .named('PageInfo')
  .props({
    __typename: types.optional(types.literal("PageInfo"), "PageInfo"),
    endCursor: types.union(types.undefined, types.string),
    hasNextPage: types.union(types.undefined, types.boolean),
    hasPreviousPage: types.union(types.undefined, types.boolean),
    startCursor: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PageInfoModelSelector extends QueryBuilder {
  get endCursor() { return this.__attr(`endCursor`) }
  get hasNextPage() { return this.__attr(`hasNextPage`) }
  get hasPreviousPage() { return this.__attr(`hasPreviousPage`) }
  get startCursor() { return this.__attr(`startCursor`) }
}
export function selectFromPageInfo() {
  return new PageInfoModelSelector()
}

export const pageInfoModelPrimitives = selectFromPageInfo().endCursor.hasNextPage.hasPreviousPage.startCursor
