/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturQkChoosenModel } from "./KulturQkChoosenModel"
import { KulturQkChoosenModelSelector } from "./KulturQkChoosenModel.base"


/**
 * KulturQkChoosenMutationResponseBase
 * auto generated base class for the model KulturQkChoosenMutationResponseModel.
 *
 * response of any mutation on the table "kultur_qk_choosen"
 */
export const KulturQkChoosenMutationResponseModelBase = ModelBase
  .named('KulturQkChoosenMutationResponse')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_mutation_response"), "kultur_qk_choosen_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => KulturQkChoosenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkChoosenMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, KulturQkChoosenModelSelector, builder) }
}
export function selectFromKulturQkChoosenMutationResponse() {
  return new KulturQkChoosenMutationResponseModelSelector()
}

export const kulturQkChoosenMutationResponseModelPrimitives = selectFromKulturQkChoosenMutationResponse().affected_rows
