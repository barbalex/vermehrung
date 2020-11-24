/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilzaehlung_revModel } from "./teilzaehlung_revModel"
import { teilzaehlung_revModelSelector } from "./teilzaehlung_revModel.base"


/**
 * teilzaehlung_rev_mutation_responseBase
 * auto generated base class for the model teilzaehlung_rev_mutation_responseModel.
 */
export const teilzaehlung_rev_mutation_responseModelBase = ModelBase
  .named('teilzaehlung_rev_mutation_response')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_mutation_response"), "teilzaehlung_rev_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilzaehlung_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilzaehlung_rev_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, teilzaehlung_revModelSelector, builder) }
}
export function selectFromteilzaehlung_rev_mutation_response() {
  return new teilzaehlung_rev_mutation_responseModelSelector()
}

export const teilzaehlung_rev_mutation_responseModelPrimitives = selectFromteilzaehlung_rev_mutation_response().affected_rows
