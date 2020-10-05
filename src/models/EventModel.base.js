/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { personModel } from './personModel'
import { personModelSelector } from './personModel.base'
import { teilkulturModel } from './teilkulturModel'
import { teilkulturModelSelector } from './teilkulturModel.base'

/**
 * eventBase
 * auto generated base class for the model eventModel.
 */
export const eventModelBase = ModelBase.named('event')
  .props({
    __typename: types.optional(types.literal('event'), 'event'),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    teilkultur_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class eventModelSelector extends QueryBuilder {
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
  get beschreibung() {
    return this.__attr(`beschreibung`)
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
  get geplant() {
    return this.__attr(`geplant`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kultur_id() {
    return this.__attr(`kultur_id`)
  }
  get person_id() {
    return this.__attr(`person_id`)
  }
  get teilkultur_id() {
    return this.__attr(`teilkultur_id`)
  }
}
export function selectFromevent() {
  return new eventModelSelector()
}

export const eventModelPrimitives = selectFromevent()._conflicts._deleted._depth
  ._parent_rev._rev._revisions.beschreibung.changed.changed_by.datum.geplant
  .kultur_id.person_id.teilkultur_id
