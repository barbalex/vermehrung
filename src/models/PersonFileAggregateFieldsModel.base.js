/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonFileMaxFieldsModel } from "./PersonFileMaxFieldsModel"
import { PersonFileMaxFieldsModelSelector } from "./PersonFileMaxFieldsModel.base"
import { PersonFileMinFieldsModel } from "./PersonFileMinFieldsModel"
import { PersonFileMinFieldsModelSelector } from "./PersonFileMinFieldsModel.base"


/**
 * PersonFileAggregateFieldsBase
 * auto generated base class for the model PersonFileAggregateFieldsModel.
 *
 * aggregate fields of "person_file"
 */
export const PersonFileAggregateFieldsModelBase = ModelBase
  .named('PersonFileAggregateFields')
  .props({
    __typename: types.optional(types.literal("person_file_aggregate_fields"), "person_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => PersonFileMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => PersonFileMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonFileAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, PersonFileMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, PersonFileMinFieldsModelSelector, builder) }
}
export function selectFromPersonFileAggregateFields() {
  return new PersonFileAggregateFieldsModelSelector()
}

export const personFileAggregateFieldsModelPrimitives = selectFromPersonFileAggregateFields().count
