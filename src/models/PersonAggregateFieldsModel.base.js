/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonAvgFieldsModel } from "./PersonAvgFieldsModel"
import { PersonAvgFieldsModelSelector } from "./PersonAvgFieldsModel.base"
import { PersonMaxFieldsModel } from "./PersonMaxFieldsModel"
import { PersonMaxFieldsModelSelector } from "./PersonMaxFieldsModel.base"
import { PersonMinFieldsModel } from "./PersonMinFieldsModel"
import { PersonMinFieldsModelSelector } from "./PersonMinFieldsModel.base"
import { PersonStddevFieldsModel } from "./PersonStddevFieldsModel"
import { PersonStddevFieldsModelSelector } from "./PersonStddevFieldsModel.base"
import { PersonStddevPopFieldsModel } from "./PersonStddevPopFieldsModel"
import { PersonStddevPopFieldsModelSelector } from "./PersonStddevPopFieldsModel.base"
import { PersonStddevSampFieldsModel } from "./PersonStddevSampFieldsModel"
import { PersonStddevSampFieldsModelSelector } from "./PersonStddevSampFieldsModel.base"
import { PersonSumFieldsModel } from "./PersonSumFieldsModel"
import { PersonSumFieldsModelSelector } from "./PersonSumFieldsModel.base"
import { PersonVarPopFieldsModel } from "./PersonVarPopFieldsModel"
import { PersonVarPopFieldsModelSelector } from "./PersonVarPopFieldsModel.base"
import { PersonVarSampFieldsModel } from "./PersonVarSampFieldsModel"
import { PersonVarSampFieldsModelSelector } from "./PersonVarSampFieldsModel.base"
import { PersonVarianceFieldsModel } from "./PersonVarianceFieldsModel"
import { PersonVarianceFieldsModelSelector } from "./PersonVarianceFieldsModel.base"


/**
 * PersonAggregateFieldsBase
 * auto generated base class for the model PersonAggregateFieldsModel.
 *
 * aggregate fields of "person"
 */
export const PersonAggregateFieldsModelBase = ModelBase
  .named('PersonAggregateFields')
  .props({
    __typename: types.optional(types.literal("person_aggregate_fields"), "person_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late(() => PersonAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => PersonMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => PersonMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late(() => PersonStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late(() => PersonStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late(() => PersonStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late(() => PersonSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late(() => PersonVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late(() => PersonVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late(() => PersonVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder) { return this.__child(`avg`, PersonAvgFieldsModelSelector, builder) }
  max(builder) { return this.__child(`max`, PersonMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, PersonMinFieldsModelSelector, builder) }
  stddev(builder) { return this.__child(`stddev`, PersonStddevFieldsModelSelector, builder) }
  stddev_pop(builder) { return this.__child(`stddev_pop`, PersonStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder) { return this.__child(`stddev_samp`, PersonStddevSampFieldsModelSelector, builder) }
  sum(builder) { return this.__child(`sum`, PersonSumFieldsModelSelector, builder) }
  var_pop(builder) { return this.__child(`var_pop`, PersonVarPopFieldsModelSelector, builder) }
  var_samp(builder) { return this.__child(`var_samp`, PersonVarSampFieldsModelSelector, builder) }
  variance(builder) { return this.__child(`variance`, PersonVarianceFieldsModelSelector, builder) }
}
export function selectFromPersonAggregateFields() {
  return new PersonAggregateFieldsModelSelector()
}

export const personAggregateFieldsModelPrimitives = selectFromPersonAggregateFields().count
