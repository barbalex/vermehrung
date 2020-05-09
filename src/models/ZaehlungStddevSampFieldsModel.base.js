/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungStddevSampFieldsBase
 * auto generated base class for the model ZaehlungStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const ZaehlungStddevSampFieldsModelBase = ModelBase
  .named('ZaehlungStddevSampFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_stddev_samp_fields"), "zaehlung_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromZaehlungStddevSampFields() {
  return new ZaehlungStddevSampFieldsModelSelector()
}

export const zaehlungStddevSampFieldsModelPrimitives = selectFromZaehlungStddevSampFields()._depth
