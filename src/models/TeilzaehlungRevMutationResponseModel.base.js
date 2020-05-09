/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilzaehlungRevModel } from "./TeilzaehlungRevModel"
import { TeilzaehlungRevModelSelector } from "./TeilzaehlungRevModel.base"


/**
 * TeilzaehlungRevMutationResponseBase
 * auto generated base class for the model TeilzaehlungRevMutationResponseModel.
 *
 * response of any mutation on the table "teilzaehlung_rev"
 */
export const TeilzaehlungRevMutationResponseModelBase = ModelBase
  .named('TeilzaehlungRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_mutation_response"), "teilzaehlung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => TeilzaehlungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, TeilzaehlungRevModelSelector, builder) }
}
export function selectFromTeilzaehlungRevMutationResponse() {
  return new TeilzaehlungRevMutationResponseModelSelector()
}

export const teilzaehlungRevMutationResponseModelPrimitives = selectFromTeilzaehlungRevMutationResponse().affected_rows
