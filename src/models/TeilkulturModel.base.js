/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { EventAggregateModel } from "./EventAggregateModel"
import { EventAggregateModelSelector } from "./EventAggregateModel.base"
import { EventModel } from "./EventModel"
import { EventModelSelector } from "./EventModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { TeilzaehlungAggregateModel } from "./TeilzaehlungAggregateModel"
import { TeilzaehlungAggregateModelSelector } from "./TeilzaehlungAggregateModel.base"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"


/**
 * TeilkulturBase
 * auto generated base class for the model TeilkulturModel.
 *
 * columns and relationships of "teilkultur"
 */
export const TeilkulturModelBase = ModelBase
  .named('Teilkultur')
  .props({
    __typename: types.optional(types.literal("teilkultur"), "teilkultur"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    events: types.union(types.undefined, types.array(types.late(() => EventModel))),
    /** An aggregated array relationship */
    events_aggregate: types.union(types.undefined, types.late(() => EventAggregateModel)),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    kultur: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    ort1: types.union(types.undefined, types.null, types.string),
    ort2: types.union(types.undefined, types.null, types.string),
    ort3: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    teilzaehlungs: types.union(types.undefined, types.array(types.late(() => TeilzaehlungModel))),
    /** An aggregated array relationship */
    teilzaehlungs_aggregate: types.union(types.undefined, types.late(() => TeilzaehlungAggregateModel)),
    tsv: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get name() { return this.__attr(`name`) }
  get ort1() { return this.__attr(`ort1`) }
  get ort2() { return this.__attr(`ort2`) }
  get ort3() { return this.__attr(`ort3`) }
  get tsv() { return this.__attr(`tsv`) }
  events(builder) { return this.__child(`events`, EventModelSelector, builder) }
  events_aggregate(builder) { return this.__child(`events_aggregate`, EventAggregateModelSelector, builder) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
  teilzaehlungs(builder) { return this.__child(`teilzaehlungs`, TeilzaehlungModelSelector, builder) }
  teilzaehlungs_aggregate(builder) { return this.__child(`teilzaehlungs_aggregate`, TeilzaehlungAggregateModelSelector, builder) }
}
export function selectFromTeilkultur() {
  return new TeilkulturModelSelector()
}

export const teilkulturModelPrimitives = selectFromTeilkultur()._conflicts._depth._parent_rev._rev._revisions.bemerkungen.changed.changed_by.kultur_id.name.ort1.ort2.ort3.tsv
