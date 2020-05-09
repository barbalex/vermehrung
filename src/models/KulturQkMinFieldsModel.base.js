/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkMinFieldsBase
 * auto generated base class for the model KulturQkMinFieldsModel.
 *
 * aggregate min on columns
 */
export const KulturQkMinFieldsModelBase = ModelBase
  .named('KulturQkMinFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_min_fields"), "kultur_qk_min_fields"),
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

export class KulturQkMinFieldsModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
}
export function selectFromKulturQkMinFields() {
  return new KulturQkMinFieldsModelSelector()
}

export const kulturQkMinFieldsModelPrimitives = selectFromKulturQkMinFields().beschreibung.name.sort.titel
