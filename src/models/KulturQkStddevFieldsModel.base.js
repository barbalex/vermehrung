/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkStddevFieldsBase
 * auto generated base class for the model KulturQkStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const KulturQkStddevFieldsModelBase = ModelBase
  .named('KulturQkStddevFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_stddev_fields"), "kultur_qk_stddev_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkStddevFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkStddevFields() {
  return new KulturQkStddevFieldsModelSelector()
}

export const kulturQkStddevFieldsModelPrimitives = selectFromKulturQkStddevFields().sort
