/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionStddevFieldsBase
 * auto generated base class for the model PersonOptionStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const PersonOptionStddevFieldsModelBase = ModelBase
  .named('PersonOptionStddevFields')
  .props({
    __typename: types.optional(types.literal("person_option_stddev_fields"), "person_option_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionStddevFields() {
  return new PersonOptionStddevFieldsModelSelector()
}

export const personOptionStddevFieldsModelPrimitives = selectFromPersonOptionStddevFields()._depth
