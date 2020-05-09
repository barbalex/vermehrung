/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonOptionRevAvgFieldsModel } from "./PersonOptionRevAvgFieldsModel"
import { PersonOptionRevAvgFieldsModelSelector } from "./PersonOptionRevAvgFieldsModel.base"
import { PersonOptionRevMaxFieldsModel } from "./PersonOptionRevMaxFieldsModel"
import { PersonOptionRevMaxFieldsModelSelector } from "./PersonOptionRevMaxFieldsModel.base"
import { PersonOptionRevMinFieldsModel } from "./PersonOptionRevMinFieldsModel"
import { PersonOptionRevMinFieldsModelSelector } from "./PersonOptionRevMinFieldsModel.base"
import { PersonOptionRevStddevFieldsModel } from "./PersonOptionRevStddevFieldsModel"
import { PersonOptionRevStddevFieldsModelSelector } from "./PersonOptionRevStddevFieldsModel.base"
import { PersonOptionRevStddevPopFieldsModel } from "./PersonOptionRevStddevPopFieldsModel"
import { PersonOptionRevStddevPopFieldsModelSelector } from "./PersonOptionRevStddevPopFieldsModel.base"
import { PersonOptionRevStddevSampFieldsModel } from "./PersonOptionRevStddevSampFieldsModel"
import { PersonOptionRevStddevSampFieldsModelSelector } from "./PersonOptionRevStddevSampFieldsModel.base"
import { PersonOptionRevSumFieldsModel } from "./PersonOptionRevSumFieldsModel"
import { PersonOptionRevSumFieldsModelSelector } from "./PersonOptionRevSumFieldsModel.base"
import { PersonOptionRevVarPopFieldsModel } from "./PersonOptionRevVarPopFieldsModel"
import { PersonOptionRevVarPopFieldsModelSelector } from "./PersonOptionRevVarPopFieldsModel.base"
import { PersonOptionRevVarSampFieldsModel } from "./PersonOptionRevVarSampFieldsModel"
import { PersonOptionRevVarSampFieldsModelSelector } from "./PersonOptionRevVarSampFieldsModel.base"
import { PersonOptionRevVarianceFieldsModel } from "./PersonOptionRevVarianceFieldsModel"
import { PersonOptionRevVarianceFieldsModelSelector } from "./PersonOptionRevVarianceFieldsModel.base"


/**
 * PersonOptionRevAggregateFieldsBase
 * auto generated base class for the model PersonOptionRevAggregateFieldsModel.
 *
 * aggregate fields of "person_option_rev"
 */
export const PersonOptionRevAggregateFieldsModelBase = ModelBase
  .named('PersonOptionRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("person_option_rev_aggregate_fields"), "person_option_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => PersonOptionRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => PersonOptionRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => PersonOptionRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => PersonOptionRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => PersonOptionRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => PersonOptionRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => PersonOptionRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => PersonOptionRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => PersonOptionRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => PersonOptionRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, PersonOptionRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, PersonOptionRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, PersonOptionRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, PersonOptionRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, PersonOptionRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, PersonOptionRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, PersonOptionRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, PersonOptionRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, PersonOptionRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, PersonOptionRevVarianceFieldsModelSelector, builder) }
}
export function selectFromPersonOptionRevAggregateFields() {
  return new PersonOptionRevAggregateFieldsModelSelector()
}

export const personOptionRevAggregateFieldsModelPrimitives = selectFromPersonOptionRevAggregateFields().count
