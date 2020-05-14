/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { kultur_qkModel } from "./kultur_qkModel"
import { kultur_qkModelSelector } from "./kultur_qkModel.base"


/**
 * kultur_qk_choosenBase
 * auto generated base class for the model kultur_qk_choosenModel.
 */
export const kultur_qk_choosenModelBase = ModelBase
  .named('kultur_qk_choosen')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen"), "kultur_qk_choosen"),
    id: types.identifier,
    kultur: types.union(types.undefined, MSTGQLRef(types.late(() => kulturModel))),
    kultur_qk: types.union(types.undefined, MSTGQLRef(types.late(() => kultur_qkModel))),
    qk_name: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosenModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get qk_name() { return this.__attr(`qk_name`) }
  kultur(builder) { return this.__child(`kultur`, kulturModelSelector, builder) }
  kultur_qk(builder) { return this.__child(`kultur_qk`, kultur_qkModelSelector, builder) }
}
export function selectFromkultur_qk_choosen() {
  return new kultur_qk_choosenModelSelector()
}

export const kultur_qk_choosenModelPrimitives = selectFromkultur_qk_choosen().qk_name
