/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilkulturModel } from "./TeilkulturModel"
import { TeilkulturModelSelector } from "./TeilkulturModel.base"


/**
 * TeilkulturMutationResponseBase
 * auto generated base class for the model TeilkulturMutationResponseModel.
 *
 * response of any mutation on the table "teilkultur"
 */
export const TeilkulturMutationResponseModelBase = ModelBase
  .named('TeilkulturMutationResponse')
  .props({
    __typename: types.optional(types.literal("teilkultur_mutation_response"), "teilkultur_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => TeilkulturModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, TeilkulturModelSelector, builder) }
}
export function selectFromTeilkulturMutationResponse() {
  return new TeilkulturMutationResponseModelSelector()
}

export const teilkulturMutationResponseModelPrimitives = selectFromTeilkulturMutationResponse().affected_rows
