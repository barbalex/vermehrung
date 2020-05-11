/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { event_revModel } from "./event_revModel"
import { event_revModelSelector } from "./event_revModel.base"


/**
 * event_rev_mutation_responseBase
 * auto generated base class for the model event_rev_mutation_responseModel.
 *
 * response of any mutation on the table "event_rev"
 */
export const event_rev_mutation_responseModelBase = ModelBase
  .named('event_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("event_rev_mutation_response"), "event_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => event_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, event_revModelSelector, builder) }
}
export function selectFromevent_rev_mutation_response() {
  return new event_rev_mutation_responseModelSelector()
}

export const event_rev_mutation_responseModelPrimitives = selectFromevent_rev_mutation_response().affected_rows
