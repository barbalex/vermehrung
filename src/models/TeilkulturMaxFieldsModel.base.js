/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TeilkulturMaxFieldsBase
 * auto generated base class for the model TeilkulturMaxFieldsModel.
 *
 * aggregate max on columns
 */
export const TeilkulturMaxFieldsModelBase = ModelBase
  .named('TeilkulturMaxFields')
  .props({
    __typename: types.optional(types.literal("teilkultur_max_fields"), "teilkultur_max_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    id: types.union(types.undefined, types.null, types.frozen()),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    ort1: types.union(types.undefined, types.null, types.string),
    ort2: types.union(types.undefined, types.null, types.string),
    ort3: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilkulturMaxFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get id() { return this.__attr(`id`) }
  get kultur_id() { return this.__attr(`kultur_id`) }
  get name() { return this.__attr(`name`) }
  get ort1() { return this.__attr(`ort1`) }
  get ort2() { return this.__attr(`ort2`) }
  get ort3() { return this.__attr(`ort3`) }
}
export function selectFromTeilkulturMaxFields() {
  return new TeilkulturMaxFieldsModelSelector()
}

export const teilkulturMaxFieldsModelPrimitives = selectFromTeilkulturMaxFields()._depth._parent_rev._rev.bemerkungen.changed.changed_by.kultur_id.name.ort1.ort2.ort3
