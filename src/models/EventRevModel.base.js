/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"
import { TeilkulturModel } from "./TeilkulturModel"
import { TeilkulturModelSelector } from "./TeilkulturModel.base"


/**
 * EventRevBase
 * auto generated base class for the model EventRevModel.
 *
 * columns and relationships of "event_rev"
 */
export const EventRevModelBase = ModelBase
  .named('EventRev')
  .props({
    __typename: types.optional(types.literal("event_rev"), "event_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    kultur: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    person: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    /** An object relationship */
    teilkultur: types.union(types.undefined, types.null, types.late(() => TeilkulturModel)),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class EventRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get geplant() { return this.__attr(`geplant`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get teilkultur_id() { return this.__attr(`teilkultur_id`) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
  teilkultur(builder) { return this.__child(`teilkultur`, TeilkulturModelSelector, builder) }
}
export function selectFromEventRev() {
  return new EventRevModelSelector()
}

export const eventRevModelPrimitives = selectFromEventRev()._deleted._depth._parent_rev._rev._revisions.beschreibung.changed.changed_by.datum.geplant.kultur_id.person_id.teilkultur_id
