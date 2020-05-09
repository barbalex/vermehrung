/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"


/**
 * event_mutation_responseBase
 * auto generated base class for the model event_mutation_responseModel.
 *
 * response of any mutation on the table "event"
 */
export const event_mutation_responseModelBase = ModelBase
  .named('event_mutation_response')
  .props({
    __typename: types.optional(types.literal("event_mutation_response"), "event_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, eventModelSelector, builder) }
}
export function selectFromevent_mutation_response() {
  return new event_mutation_responseModelSelector()
}

export const event_mutation_responseModelPrimitives = selectFromevent_mutation_response().affected_rows
