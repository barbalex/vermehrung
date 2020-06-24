/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { avModel } from "./avModel"
import { avModelSelector } from "./avModel.base"
import { av_aggregateModel } from "./av_aggregateModel"
import { av_aggregateModelSelector } from "./av_aggregateModel.base"


/**
 * art_sumsBase
 * auto generated base class for the model art_sumsModel.
 */
export const art_sumsModelBase = ModelBase
  .named('art_sums')
  .props({
    __typename: types.optional(types.literal("art_sums"), "art_sums"),
    action: types.union(types.undefined, types.null, types.string),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.frozen()),
    anzahl_mutterpflanzen: types.union(types.undefined, types.null, types.frozen()),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.frozen()),
    art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    auspflanzbereit_beschreibung: types.union(types.undefined, types.null, types.string),
    av: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => avModel))),
    avs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => avModel)))),
    avs_aggregate: types.union(types.undefined, types.late(() => av_aggregateModel)),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    gramm_samen: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    partitioner: types.union(types.undefined, types.null, types.frozen()),
    prognose: types.union(types.undefined, types.null, types.boolean),
    sum_anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.frozen()),
    sum_anzahl_pflanzen: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_sumsModelSelector extends QueryBuilder {
  get action() { return this.__attr(`action`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_mutterpflanzen() { return this.__attr(`anzahl_mutterpflanzen`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get art_id() { return this.__attr(`art_id`) }
  get auspflanzbereit_beschreibung() { return this.__attr(`auspflanzbereit_beschreibung`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get datum() { return this.__attr(`datum`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get id() { return this.__attr(`id`) }
  get partitioner() { return this.__attr(`partitioner`) }
  get prognose() { return this.__attr(`prognose`) }
  get sum_anzahl_auspflanzbereit() { return this.__attr(`sum_anzahl_auspflanzbereit`) }
  get sum_anzahl_pflanzen() { return this.__attr(`sum_anzahl_pflanzen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  av(builder) { return this.__child(`av`, avModelSelector, builder) }
  avs(builder) { return this.__child(`avs`, avModelSelector, builder) }
  avs_aggregate(builder) { return this.__child(`avs_aggregate`, av_aggregateModelSelector, builder) }
}
export function selectFromart_sums() {
  return new art_sumsModelSelector()
}

export const art_sumsModelPrimitives = selectFromart_sums().action.andere_menge.anzahl_auspflanzbereit.anzahl_mutterpflanzen.anzahl_pflanzen.art_id.auspflanzbereit_beschreibung.bemerkungen.datum.gramm_samen.partitioner.prognose.sum_anzahl_auspflanzbereit.sum_anzahl_pflanzen.von_anzahl_individuen
