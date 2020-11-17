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
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    erhaltungskultur: types.union(types.undefined, types.null, types.boolean),
    event_revs_aggregate: types.union(types.undefined, types.frozen()),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    teilkulturs_aggregate: types.union(types.undefined, types.frozen()),
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
  art(builder) {
    return this.__child(`art`, artModelSelector, builder)
  }
  event_revs(builder) {
    return this.__child(`event_revs`, event_revModelSelector, builder)
  }
  event_revs_aggregate(builder) {
    return this.__child(
      `event_revs_aggregate`,
      event_rev_aggregateModelSelector,
      builder,
    )
  }
  events(builder) {
    return this.__child(`events`, eventModelSelector, builder)
  }
  events_aggregate(builder) {
    return this.__child(
      `events_aggregate`,
      event_aggregateModelSelector,
      builder,
    )
  }
  garten(builder) {
    return this.__child(`garten`, gartenModelSelector, builder)
  }
  herkunft(builder) {
    return this.__child(`herkunft`, herkunftModelSelector, builder)
  }
  kultur_files(builder) {
    return this.__child(`kultur_files`, kultur_fileModelSelector, builder)
  }
  kultur_files_aggregate(builder) {
    return this.__child(
      `kultur_files_aggregate`,
      kultur_file_aggregateModelSelector,
      builder,
    )
  }
  kultur_option(builder) {
    return this.__child(`kultur_option`, kultur_optionModelSelector, builder)
  }
  kultur_option_revs(builder) {
    return this.__child(
      `kultur_option_revs`,
      kultur_option_revModelSelector,
      builder,
    )
  }
  kultur_option_revs_aggregate(builder) {
    return this.__child(
      `kultur_option_revs_aggregate`,
      kultur_option_rev_aggregateModelSelector,
      builder,
    )
  }
  kultur_qk_choosens(builder) {
    return this.__child(
      `kultur_qk_choosens`,
      kultur_qk_choosenModelSelector,
      builder,
    )
  }
  kultur_qk_choosens_aggregate(builder) {
    return this.__child(
      `kultur_qk_choosens_aggregate`,
      kultur_qk_choosen_aggregateModelSelector,
      builder,
    )
  }
  lieferungRevsByNachKulturId(builder) {
    return this.__child(
      `lieferungRevsByNachKulturId`,
      lieferung_revModelSelector,
      builder,
    )
  }
  lieferungRevsByNachKulturId_aggregate(builder) {
    return this.__child(
      `lieferungRevsByNachKulturId_aggregate`,
      lieferung_rev_aggregateModelSelector,
      builder,
    )
  }
  lieferung_revs(builder) {
    return this.__child(`lieferung_revs`, lieferung_revModelSelector, builder)
  }
  lieferung_revs_aggregate(builder) {
    return this.__child(
      `lieferung_revs_aggregate`,
      lieferung_rev_aggregateModelSelector,
      builder,
    )
  }
  lieferungsByNachKulturId(builder) {
    return this.__child(
      `lieferungsByNachKulturId`,
      lieferungModelSelector,
      builder,
    )
  }
  lieferungsByNachKulturId_aggregate(builder) {
    return this.__child(
      `lieferungsByNachKulturId_aggregate`,
      lieferung_aggregateModelSelector,
      builder,
    )
  }
  lieferungsByVonKulturId(builder) {
    return this.__child(
      `lieferungsByVonKulturId`,
      lieferungModelSelector,
      builder,
    )
  }
  lieferungsByVonKulturId_aggregate(builder) {
    return this.__child(
      `lieferungsByVonKulturId_aggregate`,
      lieferung_aggregateModelSelector,
      builder,
    )
  }
  sammelLieferungRevsByVonKulturId(builder) {
    return this.__child(
      `sammelLieferungRevsByVonKulturId`,
      sammel_lieferung_revModelSelector,
      builder,
    )
  }
  sammelLieferungRevsByVonKulturId_aggregate(builder) {
    return this.__child(
      `sammelLieferungRevsByVonKulturId_aggregate`,
      sammel_lieferung_rev_aggregateModelSelector,
      builder,
    )
  }
  sammelLieferungsByNachKulturId(builder) {
    return this.__child(
      `sammelLieferungsByNachKulturId`,
      sammel_lieferungModelSelector,
      builder,
    )
  }
  sammelLieferungsByNachKulturId_aggregate(builder) {
    return this.__child(
      `sammelLieferungsByNachKulturId_aggregate`,
      sammel_lieferung_aggregateModelSelector,
      builder,
    )
  }
  sammel_lieferung_revs(builder) {
    return this.__child(
      `sammel_lieferung_revs`,
      sammel_lieferung_revModelSelector,
      builder,
    )
  }
  sammel_lieferung_revs_aggregate(builder) {
    return this.__child(
      `sammel_lieferung_revs_aggregate`,
      sammel_lieferung_rev_aggregateModelSelector,
      builder,
    )
  }
  sammel_lieferungs(builder) {
    return this.__child(
      `sammel_lieferungs`,
      sammel_lieferungModelSelector,
      builder,
    )
  }
  sammel_lieferungs_aggregate(builder) {
    return this.__child(
      `sammel_lieferungs_aggregate`,
      sammel_lieferung_aggregateModelSelector,
      builder,
    )
  }
  teilkultur_revs(builder) {
    return this.__child(`teilkultur_revs`, teilkultur_revModelSelector, builder)
  }
  teilkultur_revs_aggregate(builder) {
    return this.__child(
      `teilkultur_revs_aggregate`,
      teilkultur_rev_aggregateModelSelector,
      builder,
    )
  }
  teilkulturs(builder) {
    return this.__child(`teilkulturs`, teilkulturModelSelector, builder)
  }
  teilkulturs_aggregate(builder) {
    return this.__child(
      `teilkulturs_aggregate`,
      teilkultur_aggregateModelSelector,
      builder,
    )
  }
  zaehlung_revs(builder) {
    return this.__child(`zaehlung_revs`, zaehlung_revModelSelector, builder)
  }
  zaehlung_revs_aggregate(builder) {
    return this.__child(
      `zaehlung_revs_aggregate`,
      zaehlung_rev_aggregateModelSelector,
      builder,
    )
  }
  zaehlungs(builder) {
    return this.__child(`zaehlungs`, zaehlungModelSelector, builder)
  }
  zaehlungs_aggregate(builder) {
    return this.__child(
      `zaehlungs_aggregate`,
      zaehlung_aggregateModelSelector,
      builder,
    )
  }
}
export function selectFromkultur() {
  return new kulturModelSelector()
}

export const kulturModelPrimitives = selectFromkultur()._conflicts._deleted
  ._depth._parent_rev._rev._revisions.aktiv.art_id.bemerkungen.changed
  .changed_by.erhaltungskultur.garten_id.herkunft_id.von_anzahl_individuen
  .zwischenlager
