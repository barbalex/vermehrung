/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { EventRevAvgFieldsModel } from "./EventRevAvgFieldsModel"
import { EventRevAvgFieldsModelSelector } from "./EventRevAvgFieldsModel.base"
import { EventRevMaxFieldsModel } from "./EventRevMaxFieldsModel"
import { EventRevMaxFieldsModelSelector } from "./EventRevMaxFieldsModel.base"
import { EventRevMinFieldsModel } from "./EventRevMinFieldsModel"
import { EventRevMinFieldsModelSelector } from "./EventRevMinFieldsModel.base"
import { EventRevStddevFieldsModel } from "./EventRevStddevFieldsModel"
import { EventRevStddevFieldsModelSelector } from "./EventRevStddevFieldsModel.base"
import { EventRevStddevPopFieldsModel } from "./EventRevStddevPopFieldsModel"
import { EventRevStddevPopFieldsModelSelector } from "./EventRevStddevPopFieldsModel.base"
import { EventRevStddevSampFieldsModel } from "./EventRevStddevSampFieldsModel"
import { EventRevStddevSampFieldsModelSelector } from "./EventRevStddevSampFieldsModel.base"
import { EventRevSumFieldsModel } from "./EventRevSumFieldsModel"
import { EventRevSumFieldsModelSelector } from "./EventRevSumFieldsModel.base"
import { EventRevVarPopFieldsModel } from "./EventRevVarPopFieldsModel"
import { EventRevVarPopFieldsModelSelector } from "./EventRevVarPopFieldsModel.base"
import { EventRevVarSampFieldsModel } from "./EventRevVarSampFieldsModel"
import { EventRevVarSampFieldsModelSelector } from "./EventRevVarSampFieldsModel.base"
import { EventRevVarianceFieldsModel } from "./EventRevVarianceFieldsModel"
import { EventRevVarianceFieldsModelSelector } from "./EventRevVarianceFieldsModel.base"


/**
 * EventRevAggregateFieldsBase
 * auto generated base class for the model EventRevAggregateFieldsModel.
 *
 * aggregate fields of "event_rev"
 */
export const EventRevAggregateFieldsModelBase = ModelBase
  .named('EventRevAggregateFields')
  .props({
    __typename: types.optional(types.literal("event_rev_aggregate_fields"), "event_rev_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => EventRevAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => EventRevMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => EventRevMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => EventRevStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => EventRevStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => EventRevStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => EventRevSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => EventRevVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => EventRevVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => EventRevVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, EventRevAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, EventRevMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, EventRevMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, EventRevStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, EventRevStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, EventRevStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, EventRevSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, EventRevVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, EventRevVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, EventRevVarianceFieldsModelSelector, builder) }
}
export function selectFromEventRevAggregateFields() {
  return new EventRevAggregateFieldsModelSelector()
}

export const eventRevAggregateFieldsModelPrimitives = selectFromEventRevAggregateFields().count
