/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { art_qkModel } from "./art_qkModel"
import { art_qkModelSelector } from "./art_qkModel.base"


/**
 * art_qk_choosenBase
 * auto generated base class for the model art_qk_choosenModel.
 *
 * columns and relationships of "art_qk_choosen"
 */
export const art_qk_choosenModelBase = ModelBase
  .named('art_qk_choosen')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen"), "art_qk_choosen"),
    /** An object relationship */
    art: types.union(types.undefined, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    art_qk: types.union(types.undefined, types.late(() => art_qkModel)),
    qk_name: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosenModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get qk_name() { return this.__attr(`qk_name`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  art_qk(builder) { return this.__child(`art_qk`, art_qkModelSelector, builder) }
}
export function selectFromart_qk_choosen() {
  return new art_qk_choosenModelSelector()
}

export const art_qk_choosenModelPrimitives = selectFromart_qk_choosen().art_id.qk_name
