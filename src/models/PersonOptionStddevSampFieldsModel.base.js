/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionStddevSampFieldsBase
 * auto generated base class for the model PersonOptionStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const PersonOptionStddevSampFieldsModelBase = ModelBase
  .named('PersonOptionStddevSampFields')
  .props({
    __typename: types.optional(types.literal("person_option_stddev_samp_fields"), "person_option_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionStddevSampFields() {
  return new PersonOptionStddevSampFieldsModelSelector()
}

export const personOptionStddevSampFieldsModelPrimitives = selectFromPersonOptionStddevSampFields()._depth
