/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelSelector } from "./zaehlungModel.base"


/**
 * zaehlung_mutation_responseBase
 * auto generated base class for the model zaehlung_mutation_responseModel.
 *
 * response of any mutation on the table "zaehlung"
 */
export const zaehlung_mutation_responseModelBase = ModelBase
  .named('zaehlung_mutation_response')
  .props({
    __typename: types.optional(types.literal("zaehlung_mutation_response"), "zaehlung_mutation_response"),
    /** number of affected rows by the mutation */
    affected_rows: types.union(types.undefined, types.integer),
    /** data of the affected rows by the mutation */
    returning: types.union(types.undefined, types.array(types.late(() => zaehlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class zaehlung_mutation_responseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder) { return this.__child(`returning`, zaehlungModelSelector, builder) }
}
export function selectFromzaehlung_mutation_response() {
  return new zaehlung_mutation_responseModelSelector()
}

export const zaehlung_mutation_responseModelPrimitives = selectFromzaehlung_mutation_response().affected_rows
