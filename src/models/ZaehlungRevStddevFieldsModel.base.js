/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevStddevFieldsBase
 * auto generated base class for the model ZaehlungRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const ZaehlungRevStddevFieldsModelBase = ModelBase
  .named('ZaehlungRevStddevFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_stddev_fields"), "zaehlung_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungRevStddevFields() {
  return new ZaehlungRevStddevFieldsModelSelector()
}

export const zaehlungRevStddevFieldsModelPrimitives = selectFromZaehlungRevStddevFields()._depth
