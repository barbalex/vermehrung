/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonRevStddevSampFieldsBase
 * auto generated base class for the model PersonRevStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const PersonRevStddevSampFieldsModelBase = ModelBase
  .named('PersonRevStddevSampFields')
  .props({
    __typename: types.optional(types.literal("person_rev_stddev_samp_fields"), "person_rev_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonRevStddevSampFields() {
  return new PersonRevStddevSampFieldsModelSelector()
}

export const personRevStddevSampFieldsModelPrimitives = selectFromPersonRevStddevSampFields()._depth.plz
