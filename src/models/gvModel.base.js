/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"


/**
 * gvBase
 * auto generated base class for the model gvModel.
 */
export const gvModelBase = ModelBase
  .named('gv')
  .props({
    __typename: types.optional(types.literal("gv"), "gv"),
    garten: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    person: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class gvModelSelector extends QueryBuilder {
  get garten_id() { return this.__attr(`garten_id`) }
  get id() { return this.__attr(`id`) }
  get person_id() { return this.__attr(`person_id`) }
  garten(builder) { return this.__child(`garten`, gartenModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
}
export function selectFromgv() {
  return new gvModelSelector()
}

export const gvModelPrimitives = selectFromgv().garten_id.person_id
