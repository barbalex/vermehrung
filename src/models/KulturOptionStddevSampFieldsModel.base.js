/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionStddevSampFieldsBase
 * auto generated base class for the model KulturOptionStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const KulturOptionStddevSampFieldsModelBase = ModelBase
  .named('KulturOptionStddevSampFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_stddev_samp_fields"), "kultur_option_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionStddevSampFields() {
  return new KulturOptionStddevSampFieldsModelSelector()
}

export const kulturOptionStddevSampFieldsModelPrimitives = selectFromKulturOptionStddevSampFields()._depth
