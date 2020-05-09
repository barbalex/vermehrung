/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonFileAggregateFieldsModel } from "./PersonFileAggregateFieldsModel"
import { PersonFileAggregateFieldsModelSelector } from "./PersonFileAggregateFieldsModel.base"
import { PersonFileModel } from "./PersonFileModel"
import { PersonFileModelSelector } from "./PersonFileModel.base"


/**
 * PersonFileAggregateBase
 * auto generated base class for the model PersonFileAggregateModel.
 *
 * aggregated selection of "person_file"
 */
export const PersonFileAggregateModelBase = ModelBase
  .named('PersonFileAggregate')
  .props({
    __typename: types.optional(types.literal("person_file_aggregate"), "person_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => PersonFileAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => PersonFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonFileAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, PersonFileAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, PersonFileModelSelector, builder) }
}
export function selectFromPersonFileAggregate() {
  return new PersonFileAggregateModelSelector()
}

export const personFileAggregateModelPrimitives = selectFromPersonFileAggregate()
