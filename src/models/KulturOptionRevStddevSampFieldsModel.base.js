/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionRevStddevSampFieldsBase
 * auto generated base class for the model KulturOptionRevStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const KulturOptionRevStddevSampFieldsModelBase = ModelBase
  .named('KulturOptionRevStddevSampFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_stddev_samp_fields"), "kultur_option_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionRevStddevSampFields() {
  return new KulturOptionRevStddevSampFieldsModelSelector()
}

export const kulturOptionRevStddevSampFieldsModelPrimitives = selectFromKulturOptionRevStddevSampFields()._depth
