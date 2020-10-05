/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { artModel } from './artModel'
import { artModelSelector } from './artModel.base'
import { herkunftModel } from './herkunftModel'
import { herkunftModelSelector } from './herkunftModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { personModel } from './personModel'
import { personModelSelector } from './personModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'

/**
 * sammlung_revBase
 * auto generated base class for the model sammlung_revModel.
 */
export const sammlung_revModelBase = ModelBase.named('sammlung_rev')
  .props({
    __typename: types.optional(types.literal('sammlung_rev'), 'sammlung_rev'),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geom_point: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    gramm_samen: types.union(types.undefined, types.null, types.frozen()),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    nr: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    sammlung_id: types.union(types.undefined, types.frozen()),
    von_anzahl_individuen: types.union(
      types.undefined,
      types.null,
      types.integer,
    ),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class sammlung_revModelSelector extends QueryBuilder {
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
  get andere_menge() {
    return this.__attr(`andere_menge`)
  }
  get anzahl_pflanzen() {
    return this.__attr(`anzahl_pflanzen`)
  }
  get art_id() {
    return this.__attr(`art_id`)
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
  get geom_point() {
    return this.__attr(`geom_point`)
  }
  get geplant() {
    return this.__attr(`geplant`)
  }
  get gramm_samen() {
    return this.__attr(`gramm_samen`)
  }
  get herkunft_id() {
    return this.__attr(`herkunft_id`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get nr() {
    return this.__attr(`nr`)
  }
  get person_id() {
    return this.__attr(`person_id`)
  }
  get sammlung_id() {
    return this.__attr(`sammlung_id`)
  }
  get von_anzahl_individuen() {
    return this.__attr(`von_anzahl_individuen`)
  }
}
export function selectFromsammlung_rev() {
  return new sammlung_revModelSelector()
}

export const sammlung_revModelPrimitives = selectFromsammlung_rev()._deleted
  ._depth._parent_rev._rev._revisions.andere_menge.anzahl_pflanzen.art_id
  .bemerkungen.changed.changed_by.datum.geom_point.geplant.gramm_samen
  .herkunft_id.nr.person_id.sammlung_id.von_anzahl_individuen
