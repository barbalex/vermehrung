/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkChoosenMaxFieldsBase
 * auto generated base class for the model KulturQkChoosenMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const KulturQkChoosenMaxFieldsModelBase = ModelBase
  .named('KulturQkChoosenMaxFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_max_fields"), "kultur_qk_choosen_max_fields"),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    qk_name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkChoosenMaxFieldsModelSelector extends QueryBuilder {
  get kultur_id() { return this.__attr(`kultur_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
}
export function selectFromKulturQkChoosenMaxFields() {
  return new KulturQkChoosenMaxFieldsModelSelector()
}

export const kulturQkChoosenMaxFieldsModelPrimitives = selectFromKulturQkChoosenMaxFields().kultur_id.qk_name
