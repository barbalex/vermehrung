/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { TeilzaehlungAggregateModel } from "./TeilzaehlungAggregateModel"
import { TeilzaehlungAggregateModelSelector } from "./TeilzaehlungAggregateModel.base"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"


/**
 * ZaehlungRevBase
 * auto generated base class for the model ZaehlungRevModel.
 *
 * columns and relationships of "zaehlung_rev"
 */
export const ZaehlungRevModelBase = ModelBase
  .named('ZaehlungRev')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev"), "zaehlung_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.frozen()),
    /** An object relationship */
    kultur: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    prognose: types.union(types.undefined, types.null, types.boolean),
    /** An array relationship */
    teilzaehlungs: types.union(types.undefined, types.array(types.late(() => TeilzaehlungModel))),
    /** An aggregated array relationship */
    teilzaehlungs_aggregate: types.union(types.undefined, types.late(() => TeilzaehlungAggregateModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get prognose() { return this.__attr(`prognose`) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
  teilzaehlungs(builder) { return this.__child(`teilzaehlungs`, TeilzaehlungModelSelector, builder) }
  teilzaehlungs_aggregate(builder) { return this.__child(`teilzaehlungs_aggregate`, TeilzaehlungAggregateModelSelector, builder) }
}
export function selectFromZaehlungRev() {
  return new ZaehlungRevModelSelector()
}

export const zaehlungRevModelPrimitives = selectFromZaehlungRev()._deleted._depth._parent_rev._rev._revisions.bemerkungen.changed.changed_by.datum.kultur_id.prognose
