/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * teilzaehlung_rev_stddev_fieldsBase
 * auto generated base class for the model teilzaehlung_rev_stddev_fieldsModel.
 */
export const teilzaehlung_rev_stddev_fieldsModelBase = ModelBase
  .named('teilzaehlung_rev_stddev_fields')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_stddev_fields"), "teilzaehlung_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilzaehlung_rev_stddev_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
}
export function selectFromteilzaehlung_rev_stddev_fields() {
  return new teilzaehlung_rev_stddev_fieldsModelSelector()
}

export const teilzaehlung_rev_stddev_fieldsModelPrimitives = selectFromteilzaehlung_rev_stddev_fields()._depth.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen
