/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * ZaehlungRevMaxFieldsBase
 * auto generated base class for the model ZaehlungRevMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const ZaehlungRevMaxFieldsModelBase = ModelBase
  .named('ZaehlungRevMaxFields')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_max_fields"), "zaehlung_rev_max_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevMaxFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
}
export function selectFromZaehlungRevMaxFields() {
  return new ZaehlungRevMaxFieldsModelSelector()
}

export const zaehlungRevMaxFieldsModelPrimitives = selectFromZaehlungRevMaxFields()._depth._parent_rev._rev.bemerkungen.changed.changed_by.datum.kultur_id
