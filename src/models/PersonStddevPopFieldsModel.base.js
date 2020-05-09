/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonStddevPopFieldsBase
 * auto generated base class for the model PersonStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const PersonStddevPopFieldsModelBase = ModelBase
  .named('PersonStddevPopFields')
  .props({
    __typename: types.optional(types.literal("person_stddev_pop_fields"), "person_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonStddevPopFields() {
  return new PersonStddevPopFieldsModelSelector()
}

export const personStddevPopFieldsModelPrimitives = selectFromPersonStddevPopFields()._depth.plz
