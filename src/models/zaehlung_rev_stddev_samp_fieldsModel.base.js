/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * zaehlung_rev_stddev_samp_fieldsBase
 * auto generated base class for the model zaehlung_rev_stddev_samp_fieldsModel.
 */
export const zaehlung_rev_stddev_samp_fieldsModelBase = ModelBase
  .named('zaehlung_rev_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_stddev_samp_fields"), "zaehlung_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class zaehlung_rev_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromzaehlung_rev_stddev_samp_fields() {
  return new zaehlung_rev_stddev_samp_fieldsModelSelector()
}

export const zaehlung_rev_stddev_samp_fieldsModelPrimitives = selectFromzaehlung_rev_stddev_samp_fields()._depth
