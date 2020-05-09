/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkStddevPopFieldsBase
 * auto generated base class for the model KulturQkStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const KulturQkStddevPopFieldsModelBase = ModelBase
  .named('KulturQkStddevPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_stddev_pop_fields"), "kultur_qk_stddev_pop_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkStddevPopFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkStddevPopFields() {
  return new KulturQkStddevPopFieldsModelSelector()
}

export const kulturQkStddevPopFieldsModelPrimitives = selectFromKulturQkStddevPopFields().sort
