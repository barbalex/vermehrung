/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'

/**
 * kultur_option_revBase
 * auto generated base class for the model kultur_option_revModel.
 */
export const kultur_option_revModelBase = ModelBase.named('kultur_option_rev')
  .props({
    __typename: types.optional(
      types.literal('kultur_option_rev'),
      'kultur_option_rev',
    ),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    ev_datum: types.union(types.undefined, types.null, types.boolean),
    ev_geplant: types.union(types.undefined, types.null, types.boolean),
    ev_person_id: types.union(types.undefined, types.null, types.boolean),
    ev_teilkultur_id: types.union(types.undefined, types.null, types.boolean),
    id: types.identifier,
    kultur: types.union(
      types.undefined,
      MSTGQLRef(types.late(() => kulturModel)),
    ),
    kultur_id: types.union(types.undefined, types.frozen()),
    tk: types.union(types.undefined, types.null, types.boolean),
    tk_bemerkungen: types.union(types.undefined, types.null, types.boolean),
    tz_andere_menge: types.union(types.undefined, types.null, types.boolean),
    tz_anzahl_mutterpflanzen: types.union(
      types.undefined,
      types.null,
      types.boolean,
    ),
    tz_auspflanzbereit_beschreibung: types.union(
      types.undefined,
      types.null,
      types.boolean,
    ),
    tz_bemerkungen: types.union(types.undefined, types.null, types.boolean),
    tz_teilkultur_id: types.union(types.undefined, types.null, types.boolean),
    z_bemerkungen: types.union(types.undefined, types.null, types.boolean),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class kultur_option_revModelSelector extends QueryBuilder {
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
  get changed() {
    return this.__attr(`changed`)
  }
  get changed_by() {
    return this.__attr(`changed_by`)
  }
  get ev_datum() {
    return this.__attr(`ev_datum`)
  }
  get ev_geplant() {
    return this.__attr(`ev_geplant`)
  }
  get ev_person_id() {
    return this.__attr(`ev_person_id`)
  }
  get ev_teilkultur_id() {
    return this.__attr(`ev_teilkultur_id`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kultur_id() {
    return this.__attr(`kultur_id`)
  }
  get tk() {
    return this.__attr(`tk`)
  }
  get tk_bemerkungen() {
    return this.__attr(`tk_bemerkungen`)
  }
  get tz_andere_menge() {
    return this.__attr(`tz_andere_menge`)
  }
  get tz_anzahl_mutterpflanzen() {
    return this.__attr(`tz_anzahl_mutterpflanzen`)
  }
  get tz_auspflanzbereit_beschreibung() {
    return this.__attr(`tz_auspflanzbereit_beschreibung`)
  }
  get tz_bemerkungen() {
    return this.__attr(`tz_bemerkungen`)
  }
  get tz_teilkultur_id() {
    return this.__attr(`tz_teilkultur_id`)
  }
  get z_bemerkungen() {
    return this.__attr(`z_bemerkungen`)
  }
}
export function selectFromkultur_option_rev() {
  return new kultur_option_revModelSelector()
}

export const kultur_option_revModelPrimitives = selectFromkultur_option_rev()
  ._deleted._depth._parent_rev._rev._rev_at._revisions.changed.changed_by
  .ev_datum.ev_geplant.ev_person_id.ev_teilkultur_id.kultur_id.tk.tk_bemerkungen
  .tz_andere_menge.tz_anzahl_mutterpflanzen.tz_auspflanzbereit_beschreibung
  .tz_bemerkungen.tz_teilkultur_id.z_bemerkungen
