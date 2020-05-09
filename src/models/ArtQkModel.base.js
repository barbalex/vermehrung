/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ArtQkChoosenAggregateModel } from "./ArtQkChoosenAggregateModel"
import { ArtQkChoosenAggregateModelSelector } from "./ArtQkChoosenAggregateModel.base"
import { ArtQkChoosenModel } from "./ArtQkChoosenModel"
import { ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"


/**
 * ArtQkBase
 * auto generated base class for the model ArtQkModel.
 *
 * columns and relationships of "art_qk"
 */
export const ArtQkModelBase = ModelBase
  .named('ArtQk')
  .props({
    __typename: types.optional(types.literal("art_qk"), "art_qk"),
    /** An array relationship */
    art_qk_choosens: types.union(types.undefined, types.array(types.late(() => ArtQkChoosenModel))),
    /** An aggregated array relationship */
    art_qk_choosens_aggregate: types.union(types.undefined, types.late(() => ArtQkChoosenAggregateModel)),
    beschreibung: types.union(types.undefined, types.null, types.string),
    /** Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt */
    name: types.union(types.undefined, types.string),
    sort: types.union(types.undefined, types.null, types.frozen()),
    titel: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ArtQkModelSelector extends QueryBuilder {
  get beschreibung() { return this.__attr(`beschreibung`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
  get titel() { return this.__attr(`titel`) }
  art_qk_choosens(builder) { return this.__child(`art_qk_choosens`, ArtQkChoosenModelSelector, builder) }
  art_qk_choosens_aggregate(builder) { return this.__child(`art_qk_choosens_aggregate`, ArtQkChoosenAggregateModelSelector, builder) }
}
export function selectFromArtQk() {
  return new ArtQkModelSelector()
}

export const artQkModelPrimitives = selectFromArtQk().beschreibung.name.sort.titel
