/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { ArtSumsAggregateModel } from "./ArtSumsAggregateModel"
import { ArtSumsAggregateModelSelector } from "./ArtSumsAggregateModel.base"
import { ArtSumsModel } from "./ArtSumsModel"
import { ArtSumsModelSelector } from "./ArtSumsModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"


/**
 * AvArtBase
 * auto generated base class for the model AvArtModel.
 *
 * columns and relationships of "av_art"
 */
export const AvArtModelBase = ModelBase
  .named('AvArt')
  .props({
    __typename: types.optional(types.literal("av_art"), "av_art"),
    /** An object relationship */
    art: types.union(types.undefined, types.late(() => ArtModel)),
    art_id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    art_sums: types.union(types.undefined, types.array(types.late(() => ArtSumsModel))),
    /** An aggregated array relationship */
    art_sums_aggregate: types.union(types.undefined, types.late(() => ArtSumsAggregateModel)),
    /** An object relationship */
    person: types.union(types.undefined, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class AvArtModelSelector extends QueryBuilder {
  get art_id() { return this.__attr(`art_id`) }
  get person_id() { return this.__attr(`person_id`) }
  art(builder) { return this.__child(`art`, ArtModelSelector, builder) }
  art_sums(builder) { return this.__child(`art_sums`, ArtSumsModelSelector, builder) }
  art_sums_aggregate(builder) { return this.__child(`art_sums_aggregate`, ArtSumsAggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
}
export function selectFromAvArt() {
  return new AvArtModelSelector()
}

export const avArtModelPrimitives = selectFromAvArt().art_id.person_id
