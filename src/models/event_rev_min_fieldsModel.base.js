/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_rev_min_fieldsBase
 * auto generated base class for the model event_rev_min_fieldsModel.
 */
export const event_rev_min_fieldsModelBase = ModelBase
  .named('event_rev_min_fields')
  .props({
    __typename: types.optional(types.literal("event_rev_min_fields"), "event_rev_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    event_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_rev_min_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get event_id() { return this.__attr(`event_id`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get teilkultur_id() { return this.__attr(`teilkultur_id`) }
}
export function selectFromevent_rev_min_fields() {
  return new event_rev_min_fieldsModelSelector()
}

export const event_rev_min_fieldsModelPrimitives = selectFromevent_rev_min_fields()._depth._parent_rev._rev._rev_at.beschreibung.changed.changed_by.datum.event_id.kultur_id.person_id.teilkultur_id
