/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"


/**
 * event_revBase
 * auto generated base class for the model event_revModel.
 */
export const event_revModelBase = ModelBase
  .named('event_rev')
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
    event_id: types.union(types.undefined, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    id: types.identifier,
    kultur: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kulturModel))),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    person: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    teilkultur: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkulturModel))),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class event_revModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get beschreibung() { return this.__attr(`beschreibung`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get event_id() { return this.__attr(`event_id`) }
  get geplant() { return this.__attr(`geplant`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get teilkultur_id() { return this.__attr(`teilkultur_id`) }
  kultur(builder) { return this.__child(`kultur`, kulturModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
  teilkultur(builder) { return this.__child(`teilkultur`, teilkulturModelSelector, builder) }
}
export function selectFromevent_rev() {
  return new event_revModelSelector()
}

export const event_revModelPrimitives = selectFromevent_rev()._deleted._depth._parent_rev._rev._revisions.beschreibung.changed.changed_by.datum.event_id.geplant.kultur_id.person_id.teilkultur_id
