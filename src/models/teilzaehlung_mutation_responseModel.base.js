/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilzaehlungModel } from "./teilzaehlungModel"
import { teilzaehlungModelSelector } from "./teilzaehlungModel.base"


/**
 * teilzaehlung_mutation_responseBase
 * auto generated base class for the model teilzaehlung_mutation_responseModel.
 *
 * response of any mutation on the table "teilzaehlung"
 */
export const teilzaehlung_mutation_responseModelBase = ModelBase
  .named('teilzaehlung_mutation_response')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_mutation_response"), "teilzaehlung_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilzaehlungModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilzaehlung_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, teilzaehlungModelSelector, builder) }
}
export function selectFromteilzaehlung_mutation_response() {
  return new teilzaehlung_mutation_responseModelSelector()
}

export const teilzaehlung_mutation_responseModelPrimitives = selectFromteilzaehlung_mutation_response().affected_rows
