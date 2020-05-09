/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungStddevFieldsBase
 * auto generated base class for the model ZaehlungStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const ZaehlungStddevFieldsModelBase = ModelBase
  .named('ZaehlungStddevFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_stddev_fields"), "zaehlung_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungStddevFields() {
  return new ZaehlungStddevFieldsModelSelector()
}

export const zaehlungStddevFieldsModelPrimitives = selectFromZaehlungStddevFields()._depth
