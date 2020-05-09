/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ZaehlungModel } from "./ZaehlungModel"
import { ZaehlungModelSelector } from "./ZaehlungModel.base"


/**
 * ZaehlungMutationResponseBase
 * auto generated base class for the model ZaehlungMutationResponseModel.
 *
 * response of any mutation on the table "zaehlung"
 */
export const ZaehlungMutationResponseModelBase = ModelBase
  .named('ZaehlungMutationResponse')
  .props({
    __typename: types.optional(types.literal("zaehlung_mutation_response"), "zaehlung_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => ZaehlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ZaehlungModelSelector, builder) }
}
export function selectFromZaehlungMutationResponse() {
  return new ZaehlungMutationResponseModelSelector()
}

export const zaehlungMutationResponseModelPrimitives = selectFromZaehlungMutationResponse().affected_rows
