/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonRevAvgFieldsModel } from "./PersonRevAvgFieldsModel"
import { PersonRevAvgFieldsModelSelector } from "./PersonRevAvgFieldsModel.base"
import { PersonRevMaxFieldsModel } from "./PersonRevMaxFieldsModel"
import { PersonRevMaxFieldsModelSelector } from "./PersonRevMaxFieldsModel.base"
import { PersonRevMinFieldsModel } from "./PersonRevMinFieldsModel"
import { PersonRevMinFieldsModelSelector } from "./PersonRevMinFieldsModel.base"
import { PersonRevStddevFieldsModel } from "./PersonRevStddevFieldsModel"
import { PersonRevStddevFieldsModelSelector } from "./PersonRevStddevFieldsModel.base"
import { PersonRevStddevPopFieldsModel } from "./PersonRevStddevPopFieldsModel"
import { PersonRevStddevPopFieldsModelSelector } from "./PersonRevStddevPopFieldsModel.base"
import { PersonRevStddevSampFieldsModel } from "./PersonRevStddevSampFieldsModel"
import { PersonRevStddevSampFieldsModelSelector } from "./PersonRevStddevSampFieldsModel.base"
import { PersonRevSumFieldsModel } from "./PersonRevSumFieldsModel"
import { PersonRevSumFieldsModelSelector } from "./PersonRevSumFieldsModel.base"
import { PersonRevVarPopFieldsModel } from "./PersonRevVarPopFieldsModel"
import { PersonRevVarPopFieldsModelSelector } from "./PersonRevVarPopFieldsModel.base"
import { PersonRevVarSampFieldsModel } from "./PersonRevVarSampFieldsModel"
import { PersonRevVarSampFieldsModelSelector } from "./PersonRevVarSampFieldsModel.base"
import { PersonRevVarianceFieldsModel } from "./PersonRevVarianceFieldsModel"
import { PersonRevVarianceFieldsModelSelector } from "./PersonRevVarianceFieldsModel.base"


/**
 * PersonRevAggregateFieldsBase
 * auto generated base class for the model PersonRevAggregateFieldsModel.
 *
 * aggregate fields of "person_rev"
 */
export const PersonRevAggregateFieldsModelBase = ModelBase
  .named('PersonRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("person_rev_aggregate_fields"), "person_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => PersonRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => PersonRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => PersonRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => PersonRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => PersonRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => PersonRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => PersonRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => PersonRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => PersonRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => PersonRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, PersonRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, PersonRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, PersonRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, PersonRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, PersonRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, PersonRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, PersonRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, PersonRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, PersonRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, PersonRevVarianceFieldsModelSelector, builder) }
}
export function selectFromPersonRevAggregateFields() {
  return new PersonRevAggregateFieldsModelSelector()
}

export const personRevAggregateFieldsModelPrimitives = selectFromPersonRevAggregateFields().count
