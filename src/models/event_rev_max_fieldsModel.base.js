/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * event_rev_max_fieldsBase
 * auto generated base class for the model event_rev_max_fieldsModel.
 *
 * aggregate max on columns
 */
export const event_rev_max_fieldsModelBase = ModelBase
  .named('event_rev_max_fields')
  .props({
    __typename: types.optional(types.literal("event_rev_max_fields"), "event_rev_max_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_rev_max_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get teilkultur_id() { return this.__attr(`teilkultur_id`) }
}
export function selectFromevent_rev_max_fields() {
  return new event_rev_max_fieldsModelSelector()
}

export const event_rev_max_fieldsModelPrimitives = selectFromevent_rev_max_fields()._depth._parent_rev._rev.beschreibung.changed.changed_by.datum.kultur_id.person_id.teilkultur_id
