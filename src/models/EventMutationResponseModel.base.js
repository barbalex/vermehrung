/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { EventModel } from "./EventModel"
import { EventModelSelector } from "./EventModel.base"


/**
 * EventMutationResponseBase
 * auto generated base class for the model EventMutationResponseModel.
 *
 * response of any mutation on the table "event"
 */
export const EventMutationResponseModelBase = ModelBase
  .named('EventMutationResponse')
  .props({
    __typename: types.optional(types.literal("event_mutation_response"), "event_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => EventModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, EventModelSelector, builder) }
}
export function selectFromEventMutationResponse() {
  return new EventMutationResponseModelSelector()
}

export const eventMutationResponseModelPrimitives = selectFromEventMutationResponse().affected_rows
