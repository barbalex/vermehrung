/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturStddevFieldsBase
 * auto generated base class for the model TeilkulturStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const TeilkulturStddevFieldsModelBase = ModelBase
  .named('TeilkulturStddevFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_stddev_fields"), "teilkultur_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromTeilkulturStddevFields() {
  return new TeilkulturStddevFieldsModelSelector()
}

export const teilkulturStddevFieldsModelPrimitives = selectFromTeilkulturStddevFields()._depth
