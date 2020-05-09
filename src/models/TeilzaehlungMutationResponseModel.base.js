/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"


/**
 * TeilzaehlungMutationResponseBase
 * auto generated base class for the model TeilzaehlungMutationResponseModel.
 *
 * response of any mutation on the table "teilzaehlung"
 */
export const TeilzaehlungMutationResponseModelBase = ModelBase
  .named('TeilzaehlungMutationResponse')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_mutation_response"), "teilzaehlung_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => TeilzaehlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, TeilzaehlungModelSelector, builder) }
}
export function selectFromTeilzaehlungMutationResponse() {
  return new TeilzaehlungMutationResponseModelSelector()
}

export const teilzaehlungMutationResponseModelPrimitives = selectFromTeilzaehlungMutationResponse().affected_rows
