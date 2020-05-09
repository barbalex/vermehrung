/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkStddevSampFieldsBase
 * auto generated base class for the model KulturQkStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const KulturQkStddevSampFieldsModelBase = ModelBase
  .named('KulturQkStddevSampFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_stddev_samp_fields"), "kultur_qk_stddev_samp_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkStddevSampFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkStddevSampFields() {
  return new KulturQkStddevSampFieldsModelSelector()
}

export const kulturQkStddevSampFieldsModelPrimitives = selectFromKulturQkStddevSampFields().sort
