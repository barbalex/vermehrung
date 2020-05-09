/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonStddevSampFieldsBase
 * auto generated base class for the model PersonStddevSampFieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const PersonStddevSampFieldsModelBase = ModelBase
  .named('PersonStddevSampFields')
  .props({
    __typename: types.optional(types.literal("person_stddev_samp_fields"), "person_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonStddevSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonStddevSampFields() {
  return new PersonStddevSampFieldsModelSelector()
}

export const personStddevSampFieldsModelPrimitives = selectFromPersonStddevSampFields()._depth.plz
