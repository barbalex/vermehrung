/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { teilzaehlungModel } from './teilzaehlungModel'
import { teilzaehlungModelSelector } from './teilzaehlungModel.base'
import { teilzaehlung_aggregateModel } from './teilzaehlung_aggregateModel'
import { teilzaehlung_aggregateModelSelector } from './teilzaehlung_aggregateModel.base'
import { teilzaehlung_revModel } from './teilzaehlung_revModel'
import { teilzaehlung_revModelSelector } from './teilzaehlung_revModel.base'

/**
 * zaehlungBase
 * auto generated base class for the model zaehlungModel.
 */
export const zaehlungModelBase = ModelBase.named('zaehlung')
  .props({
    __typename: types.optional(types.literal('zaehlung'), 'zaehlung'),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    prognose: types.union(types.undefined, types.null, types.boolean),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class zaehlungModelSelector extends QueryBuilder {
  get _conflicts() {
    return this.__attr(`_conflicts`)
  }
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
  get datum() {
    return this.__attr(`datum`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kultur_id() {
    return this.__attr(`kultur_id`)
  }
  get prognose() {
    return this.__attr(`prognose`)
  }
}
export function selectFromzaehlung() {
  return new zaehlungModelSelector()
}

export const zaehlungModelPrimitives = selectFromzaehlung()._conflicts._deleted
  ._depth._parent_rev._rev._revisions.bemerkungen.changed.changed_by.datum
  .kultur_id.prognose
