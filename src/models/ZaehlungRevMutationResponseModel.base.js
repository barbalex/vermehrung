/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ZaehlungRevModel } from "./ZaehlungRevModel"
import { ZaehlungRevModelSelector } from "./ZaehlungRevModel.base"


/**
 * ZaehlungRevMutationResponseBase
 * auto generated base class for the model ZaehlungRevMutationResponseModel.
 *
 * response of any mutation on the table "zaehlung_rev"
 */
export const ZaehlungRevMutationResponseModelBase = ModelBase
  .named('ZaehlungRevMutationResponse')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_mutation_response"), "zaehlung_rev_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => ZaehlungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, ZaehlungRevModelSelector, builder) }
}
export function selectFromZaehlungRevMutationResponse() {
  return new ZaehlungRevMutationResponseModelSelector()
}

export const zaehlungRevMutationResponseModelPrimitives = selectFromZaehlungRevMutationResponse().affected_rows
