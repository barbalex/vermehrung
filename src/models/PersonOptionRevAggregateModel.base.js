/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonOptionRevAggregateFieldsModel } from "./PersonOptionRevAggregateFieldsModel"
import { PersonOptionRevAggregateFieldsModelSelector } from "./PersonOptionRevAggregateFieldsModel.base"
import { PersonOptionRevModel } from "./PersonOptionRevModel"
import { PersonOptionRevModelSelector } from "./PersonOptionRevModel.base"


/**
 * PersonOptionRevAggregateBase
 * auto generated base class for the model PersonOptionRevAggregateModel.
 *
 * aggregated selection of "person_option_rev"
 */
export const PersonOptionRevAggregateModelBase = ModelBase
  .named('PersonOptionRevAggregate')
  .props({
    __typename: types.optional(types.literal("person_option_rev_aggregate"), "person_option_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => PersonOptionRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => PersonOptionRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, PersonOptionRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, PersonOptionRevModelSelector, builder) }
}
export function selectFromPersonOptionRevAggregate() {
  return new PersonOptionRevAggregateModelSelector()
}

export const personOptionRevAggregateModelPrimitives = selectFromPersonOptionRevAggregate()
