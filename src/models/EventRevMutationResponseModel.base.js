/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { EventRevModel } from "./EventRevModel"
import { EventRevModelSelector } from "./EventRevModel.base"


/**
 * EventRevMutationResponseBase
 * auto generated base class for the model EventRevMutationResponseModel.
 *
 * response of any mutation on the table "event_rev"
 */
export const EventRevMutationResponseModelBase = ModelBase
  .named('EventRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("event_rev_mutation_response"), "event_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => EventRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, EventRevModelSelector, builder) }
}
export function selectFromEventRevMutationResponse() {
  return new EventRevMutationResponseModelSelector()
}

export const eventRevMutationResponseModelPrimitives = selectFromEventRevMutationResponse().affected_rows
