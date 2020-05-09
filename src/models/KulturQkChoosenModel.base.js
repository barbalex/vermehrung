/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { KulturQkModel } from "./KulturQkModel"
import { KulturQkModelSelector } from "./KulturQkModel.base"


/**
 * KulturQkChoosenBase
 * auto generated base class for the model KulturQkChoosenModel.
 *
 * columns and relationships of "kultur_qk_choosen"
 */
export const KulturQkChoosenModelBase = ModelBase
  .named('KulturQkChoosen')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen"), "kultur_qk_choosen"),
    /** An object relationship */
    kultur: types.union(types.undefined, types.late(() => KulturModel)),
    kultur_id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    kultur_qk: types.union(types.undefined, types.late(() => KulturQkModel)),
    qk_name: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkChoosenModelSelector extends QueryBuilder {
  get kultur_id() { return this.__attr(`kultur_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
  kultur_qk(builder) { return this.__child(`kultur_qk`, KulturQkModelSelector, builder) }
}
export function selectFromKulturQkChoosen() {
  return new KulturQkChoosenModelSelector()
}

export const kulturQkChoosenModelPrimitives = selectFromKulturQkChoosen().kultur_id.qk_name
