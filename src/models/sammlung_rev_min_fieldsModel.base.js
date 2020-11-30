/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammlung_rev_min_fieldsBase
 * auto generated base class for the model sammlung_rev_min_fieldsModel.
 */
export const sammlung_rev_min_fieldsModelBase = ModelBase
  .named('sammlung_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_min_fields"), "sammlung_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    gramm_samen: types.union(types.undefined, types.null, types.frozen()),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    nr: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    sammlung_id: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get art_id() { return this.__attr(`art_id`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get nr() { return this.__attr(`nr`) }
  get person_id() { return this.__attr(`person_id`) }
  get sammlung_id() { return this.__attr(`sammlung_id`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromsammlung_rev_min_fields() {
  return new sammlung_rev_min_fieldsModelSelector()
}

export const sammlung_rev_min_fieldsModelPrimitives = selectFromsammlung_rev_min_fields()._depth._parent_rev._rev._rev_at.andere_menge.anzahl_pflanzen.art_id.bemerkungen.changed.changed_by.datum.gramm_samen.herkunft_id.nr.person_id.sammlung_id.von_anzahl_individuen
