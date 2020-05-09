/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkMaxFieldsBase
 * auto generated base class for the model KulturQkMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const KulturQkMaxFieldsModelBase = ModelBase
  .named('KulturQkMaxFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_max_fields"), "kultur_qk_max_fields"),
    beschreibung: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.null, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkMaxFieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
}
export function selectFromKulturQkMaxFields() {
  return new KulturQkMaxFieldsModelSelector()
}

export const kulturQkMaxFieldsModelPrimitives = selectFromKulturQkMaxFields().beschreibung.name.sort.titel
