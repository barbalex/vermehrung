/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturStddevSampFieldsBase
 * auto generated base class for the model TeilkulturStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const TeilkulturStddevSampFieldsModelBase = ModelBase
  .named('TeilkulturStddevSampFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_stddev_samp_fields"), "teilkultur_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturStddevSampFields() {
  return new TeilkulturStddevSampFieldsModelSelector()
}

export const teilkulturStddevSampFieldsModelPrimitives = selectFromTeilkulturStddevSampFields()._depth
