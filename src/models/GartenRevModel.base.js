/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturAggregateModel } from "./KulturAggregateModel"
import { KulturAggregateModelSelector } from "./KulturAggregateModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"


/**
 * GartenRevBase
 * auto generated base class for the model GartenRevModel.
 *
 * columns and relationships of "garten_rev"
 */
export const GartenRevModelBase = ModelBase
  .named('GartenRev')
  .props({
    __typename: types.optional(types.literal("garten_rev"), "garten_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    /** An array relationship */
    kulturs: types.union(types.undefined, types.array(types.late(() => KulturModel))),
    /** An aggregated array relationship */
    kulturs_aggregate: types.union(types.undefined, types.late(() => KulturAggregateModel)),
    name: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    person: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    strasse: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get aktiv() { return this.__attr(`aktiv`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get geom_point() { return this.__attr(`geom_point`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get ort() { return this.__attr(`ort`) }
  get person_id() { return this.__attr(`person_id`) }
  get plz() { return this.__attr(`plz`) }
  get strasse() { return this.__attr(`strasse`) }
  kulturs(builder) { return this.__child(`kulturs`, KulturModelSelector, builder) }
  kulturs_aggregate(builder) { return this.__child(`kulturs_aggregate`, KulturAggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
}
export function selectFromGartenRev() {
  return new GartenRevModelSelector()
}

export const gartenRevModelPrimitives = selectFromGartenRev()._deleted._depth._parent_rev._rev._revisions.aktiv.bemerkungen.changed.changed_by.geom_point.name.ort.person_id.plz.strasse
