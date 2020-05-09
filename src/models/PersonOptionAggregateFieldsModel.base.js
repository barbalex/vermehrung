/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonOptionAvgFieldsModel } from "./PersonOptionAvgFieldsModel"
import { PersonOptionAvgFieldsModelSelector } from "./PersonOptionAvgFieldsModel.base"
import { PersonOptionMaxFieldsModel } from "./PersonOptionMaxFieldsModel"
import { PersonOptionMaxFieldsModelSelector } from "./PersonOptionMaxFieldsModel.base"
import { PersonOptionMinFieldsModel } from "./PersonOptionMinFieldsModel"
import { PersonOptionMinFieldsModelSelector } from "./PersonOptionMinFieldsModel.base"
import { PersonOptionStddevFieldsModel } from "./PersonOptionStddevFieldsModel"
import { PersonOptionStddevFieldsModelSelector } from "./PersonOptionStddevFieldsModel.base"
import { PersonOptionStddevPopFieldsModel } from "./PersonOptionStddevPopFieldsModel"
import { PersonOptionStddevPopFieldsModelSelector } from "./PersonOptionStddevPopFieldsModel.base"
import { PersonOptionStddevSampFieldsModel } from "./PersonOptionStddevSampFieldsModel"
import { PersonOptionStddevSampFieldsModelSelector } from "./PersonOptionStddevSampFieldsModel.base"
import { PersonOptionSumFieldsModel } from "./PersonOptionSumFieldsModel"
import { PersonOptionSumFieldsModelSelector } from "./PersonOptionSumFieldsModel.base"
import { PersonOptionVarPopFieldsModel } from "./PersonOptionVarPopFieldsModel"
import { PersonOptionVarPopFieldsModelSelector } from "./PersonOptionVarPopFieldsModel.base"
import { PersonOptionVarSampFieldsModel } from "./PersonOptionVarSampFieldsModel"
import { PersonOptionVarSampFieldsModelSelector } from "./PersonOptionVarSampFieldsModel.base"
import { PersonOptionVarianceFieldsModel } from "./PersonOptionVarianceFieldsModel"
import { PersonOptionVarianceFieldsModelSelector } from "./PersonOptionVarianceFieldsModel.base"


/**
 * PersonOptionAggregateFieldsBase
 * auto generated base class for the model PersonOptionAggregateFieldsModel.
 *
 * aggregate fields of "person_option"
 */
export const PersonOptionAggregateFieldsModelBase = ModelBase
  .named('PersonOptionAggregateFields')
  .props({
    __typename: types.optional(types.literal("person_option_aggregate_fields"), "person_option_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => PersonOptionAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => PersonOptionMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => PersonOptionMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => PersonOptionStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => PersonOptionStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => PersonOptionStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => PersonOptionSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => PersonOptionVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => PersonOptionVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => PersonOptionVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, PersonOptionAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, PersonOptionMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, PersonOptionMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, PersonOptionStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, PersonOptionStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, PersonOptionStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, PersonOptionSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, PersonOptionVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, PersonOptionVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, PersonOptionVarianceFieldsModelSelector, builder) }
}
export function selectFromPersonOptionAggregateFields() {
  return new PersonOptionAggregateFieldsModelSelector()
}

export const personOptionAggregateFieldsModelPrimitives = selectFromPersonOptionAggregateFields().count
