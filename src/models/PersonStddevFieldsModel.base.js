/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonStddevFieldsBase
 * auto generated base class for the model PersonStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const PersonStddevFieldsModelBase = ModelBase
  .named('PersonStddevFields')
  .props({
    __typename: types.optional(types.literal("person_stddev_fields"), "person_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonStddevFields() {
  return new PersonStddevFieldsModelSelector()
}

export const personStddevFieldsModelPrimitives = selectFromPersonStddevFields()._depth.plz
