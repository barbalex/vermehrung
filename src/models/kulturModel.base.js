/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { artModel } from './artModel'
import { artModelSelector } from './artModel.base'
import { eventModel } from './eventModel'
import { eventModelSelector } from './eventModel.base'
import { event_revModel } from './event_revModel'
import { event_revModelSelector } from './event_revModel.base'
import { gartenModel } from './gartenModel'
import { gartenModelSelector } from './gartenModel.base'
import { herkunftModel } from './herkunftModel'
import { herkunftModelSelector } from './herkunftModel.base'
import { kultur_fileModel } from './kultur_fileModel'
import { kultur_fileModelSelector } from './kultur_fileModel.base'
import { kultur_optionModel } from './kultur_optionModel'
import { kultur_optionModelSelector } from './kultur_optionModel.base'
import { kultur_option_revModel } from './kultur_option_revModel'
import { kultur_option_revModelSelector } from './kultur_option_revModel.base'
import { kultur_qk_choosenModel } from './kultur_qk_choosenModel'
import { kultur_qk_choosenModelSelector } from './kultur_qk_choosenModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { lieferung_revModel } from './lieferung_revModel'
import { lieferung_revModelSelector } from './lieferung_revModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { sammel_lieferung_revModel } from './sammel_lieferung_revModel'
import { sammel_lieferung_revModelSelector } from './sammel_lieferung_revModel.base'
import { teilkulturModel } from './teilkulturModel'
import { teilkulturModelSelector } from './teilkulturModel.base'
import { teilkultur_revModel } from './teilkultur_revModel'
import { teilkultur_revModelSelector } from './teilkultur_revModel.base'
import { zaehlungModel } from './zaehlungModel'
import { zaehlungModelSelector } from './zaehlungModel.base'
import { zaehlung_revModel } from './zaehlung_revModel'
import { zaehlung_revModelSelector } from './zaehlung_revModel.base'

/**
 * kulturBase
 * auto generated base class for the model kulturModel.
 */
export const kulturModelBase = ModelBase.named('kultur')
  .props({
    __typename: types.optional(types.literal('kultur'), 'kultur'),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
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

export class kulturModelSelector extends QueryBuilder {
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
  get _rev_at() {
    return this.__attr(`_rev_at`)
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
  get von_anzahl_individuen() {
    return this.__attr(`von_anzahl_individuen`)
  }
  get zwischenlager() {
    return this.__attr(`zwischenlager`)
  }
}
export function selectFromkultur() {
  return new kulturModelSelector()
}

export const kulturModelPrimitives = selectFromkultur()._conflicts._deleted
  ._depth._parent_rev._rev._rev_at._revisions.aktiv.art_id.bemerkungen.changed
  .changed_by.erhaltungskultur.garten_id.herkunft_id.von_anzahl_individuen
  .zwischenlager