/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { EventAvgFieldsModel } from "./EventAvgFieldsModel"
import { EventAvgFieldsModelSelector } from "./EventAvgFieldsModel.base"
import { EventMaxFieldsModel } from "./EventMaxFieldsModel"
import { EventMaxFieldsModelSelector } from "./EventMaxFieldsModel.base"
import { EventMinFieldsModel } from "./EventMinFieldsModel"
import { EventMinFieldsModelSelector } from "./EventMinFieldsModel.base"
import { EventStddevFieldsModel } from "./EventStddevFieldsModel"
import { EventStddevFieldsModelSelector } from "./EventStddevFieldsModel.base"
import { EventStddevPopFieldsModel } from "./EventStddevPopFieldsModel"
import { EventStddevPopFieldsModelSelector } from "./EventStddevPopFieldsModel.base"
import { EventStddevSampFieldsModel } from "./EventStddevSampFieldsModel"
import { EventStddevSampFieldsModelSelector } from "./EventStddevSampFieldsModel.base"
import { EventSumFieldsModel } from "./EventSumFieldsModel"
import { EventSumFieldsModelSelector } from "./EventSumFieldsModel.base"
import { EventVarPopFieldsModel } from "./EventVarPopFieldsModel"
import { EventVarPopFieldsModelSelector } from "./EventVarPopFieldsModel.base"
import { EventVarSampFieldsModel } from "./EventVarSampFieldsModel"
import { EventVarSampFieldsModelSelector } from "./EventVarSampFieldsModel.base"
import { EventVarianceFieldsModel } from "./EventVarianceFieldsModel"
import { EventVarianceFieldsModelSelector } from "./EventVarianceFieldsModel.base"


/**
 * EventAggregateFieldsBase
 * auto generated base class for the model EventAggregateFieldsModel.
 *
 * aggregate fields of "event"
 */
export const EventAggregateFieldsModelBase = ModelBase
  .named('EventAggregateFields')
  .props({
    __typename: types.optional(types.literal("event_aggregate_fields"), "event_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => EventAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => EventMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => EventMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => EventStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => EventStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => EventStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => EventSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => EventVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => EventVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => EventVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, EventAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, EventMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, EventMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, EventStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, EventStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, EventStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, EventSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, EventVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, EventVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, EventVarianceFieldsModelSelector, builder) }
}
export function selectFromEventAggregateFields() {
  return new EventAggregateFieldsModelSelector()
}

export const eventAggregateFieldsModelPrimitives = selectFromEventAggregateFields().count
