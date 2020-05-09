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
 * ZaehlungBase
 * auto generated base class for the model ZaehlungModel.
 *
 * columns and relationships of "zaehlung"
 */
export const ZaehlungModelBase = ModelBase
  .named('Zaehlung')
  .props({
    __typename: types.optional(types.literal("zaehlung"), "zaehlung"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
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
    tsv: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
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
  get tsv() { return this.__attr(`tsv`) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
  teilzaehlungs(builder) { return this.__child(`teilzaehlungs`, TeilzaehlungModelSelector, builder) }
  teilzaehlungs_aggregate(builder) { return this.__child(`teilzaehlungs_aggregate`, TeilzaehlungAggregateModelSelector, builder) }
}
export function selectFromZaehlung() {
  return new ZaehlungModelSelector()
}

export const zaehlungModelPrimitives = selectFromZaehlung()._conflicts._depth._parent_rev._rev._revisions.bemerkungen.changed.changed_by.datum.kultur_id.prognose.tsv
