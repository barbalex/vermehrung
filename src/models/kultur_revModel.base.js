/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { artModel } from './artModel'
import { artModelSelector } from './artModel.base'
import { eventModel } from './eventModel'
import { eventModelSelector } from './eventModel.base'
import { gartenModel } from './gartenModel'
import { gartenModelSelector } from './gartenModel.base'
import { herkunftModel } from './herkunftModel'
import { herkunftModelSelector } from './herkunftModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { teilkulturModel } from './teilkulturModel'
import { teilkulturModelSelector } from './teilkulturModel.base'
import { zaehlungModel } from './zaehlungModel'
import { zaehlungModelSelector } from './zaehlungModel.base'

/**
 * kultur_revBase
 * auto generated base class for the model kultur_revModel.
 */
export const kultur_revModelBase = ModelBase.named('kultur_rev')
  .props({
    __typename: types.optional(types.literal('kultur_rev'), 'kultur_rev'),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    erhaltungskultur: types.union(types.undefined, types.null, types.boolean),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.frozen()),
    von_anzahl_individuen: types.union(
      types.undefined,
      types.null,
      types.integer,
    ),
    zwischenlager: types.union(types.undefined, types.null, types.boolean),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class kultur_revModelSelector extends QueryBuilder {
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
  get aktiv() {
    return this.__attr(`aktiv`)
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
  get erhaltungskultur() {
    return this.__attr(`erhaltungskultur`)
  }
  get garten_id() {
    return this.__attr(`garten_id`)
  }
  get herkunft_id() {
    return this.__attr(`herkunft_id`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kultur_id() {
    return this.__attr(`kultur_id`)
  }
  get von_anzahl_individuen() {
    return this.__attr(`von_anzahl_individuen`)
  }
  get zwischenlager() {
    return this.__attr(`zwischenlager`)
  }
}
export function selectFromkultur_rev() {
  return new kultur_revModelSelector()
}

export const kultur_revModelPrimitives = selectFromkultur_rev()._deleted._depth
  ._parent_rev._rev._revisions.aktiv.art_id.bemerkungen.changed.changed_by
  .erhaltungskultur.garten_id.herkunft_id.kultur_id.von_anzahl_individuen
  .zwischenlager
