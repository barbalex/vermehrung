/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { eventModel } from './eventModel'
import { eventModelSelector } from './eventModel.base'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { teilzaehlungModel } from './teilzaehlungModel'
import { teilzaehlungModelSelector } from './teilzaehlungModel.base'
import { teilzaehlung_aggregateModel } from './teilzaehlung_aggregateModel'
import { teilzaehlung_aggregateModelSelector } from './teilzaehlung_aggregateModel.base'

/**
 * teilkultur_revBase
 * auto generated base class for the model teilkultur_revModel.
 */
export const teilkultur_revModelBase = ModelBase.named('teilkultur_rev')
  .props({
    __typename: types.optional(
      types.literal('teilkultur_rev'),
      'teilkultur_rev',
    ),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    events: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => eventModel))),
    ),
    events_aggregate: types.union(types.undefined, types.frozen()),
    id: types.identifier,
    kultur: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kulturModel)),
    ),
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    ort1: types.union(types.undefined, types.null, types.string),
    ort2: types.union(types.undefined, types.null, types.string),
    ort3: types.union(types.undefined, types.null, types.string),
    teilkultur_id: types.union(types.undefined, types.frozen()),
    teilzaehlungs: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => teilzaehlungModel))),
    ),
    teilzaehlungs_aggregate: types.union(
      types.undefined,
      types.late(() => teilzaehlung_aggregateModel),
    ),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class teilkultur_revModelSelector extends QueryBuilder {
  get _deleted() {
    return this.__attr(`_deleted`)
  }
  get _depth() {
    return this.__attr(`_depth`)
  }
  get _parent_rev() {
    return this.__attr(`_parent_rev`)
  }
  get _rev() {
    return this.__attr(`_rev`)
  }
  get _rev_at() {
    return this.__attr(`_rev_at`)
  }
  get _revisions() {
    return this.__attr(`_revisions`)
  }
  get bemerkungen() {
    return this.__attr(`bemerkungen`)
  }
  get changed() {
    return this.__attr(`changed`)
  }
  get changed_by() {
    return this.__attr(`changed_by`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kultur_id() {
    return this.__attr(`kultur_id`)
  }
  get name() {
    return this.__attr(`name`)
  }
  get ort1() {
    return this.__attr(`ort1`)
  }
  get ort2() {
    return this.__attr(`ort2`)
  }
  get ort3() {
    return this.__attr(`ort3`)
  }
  get teilkultur_id() {
    return this.__attr(`teilkultur_id`)
  }
}
export function selectFromteilkultur_rev() {
  return new teilkultur_revModelSelector()
}

export const teilkultur_revModelPrimitives = selectFromteilkultur_rev()._deleted
  ._depth._parent_rev._rev._rev_at._revisions.bemerkungen.changed.changed_by
  .kultur_id.name.ort1.ort2.ort3.teilkultur_id
