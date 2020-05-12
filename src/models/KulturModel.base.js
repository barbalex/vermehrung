/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"
import { event_aggregateModel } from "./event_aggregateModel"
import { event_aggregateModelSelector } from "./event_aggregateModel.base"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelSelector } from "./herkunftModel.base"
import { kultur_fileModel } from "./kultur_fileModel"
import { kultur_fileModelSelector } from "./kultur_fileModel.base"
import { kultur_file_aggregateModel } from "./kultur_file_aggregateModel"
import { kultur_file_aggregateModelSelector } from "./kultur_file_aggregateModel.base"
import { kultur_optionModel } from "./kultur_optionModel"
import { kultur_optionModelSelector } from "./kultur_optionModel.base"
import { kultur_qk_choosenModel } from "./kultur_qk_choosenModel"
import { kultur_qk_choosenModelSelector } from "./kultur_qk_choosenModel.base"
import { kultur_qk_choosen_aggregateModel } from "./kultur_qk_choosen_aggregateModel"
import { kultur_qk_choosen_aggregateModelSelector } from "./kultur_qk_choosen_aggregateModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_aggregateModel } from "./lieferung_aggregateModel"
import { lieferung_aggregateModelSelector } from "./lieferung_aggregateModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_aggregateModel } from "./sammel_lieferung_aggregateModel"
import { sammel_lieferung_aggregateModelSelector } from "./sammel_lieferung_aggregateModel.base"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"
import { teilkultur_aggregateModel } from "./teilkultur_aggregateModel"
import { teilkultur_aggregateModelSelector } from "./teilkultur_aggregateModel.base"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelSelector } from "./zaehlungModel.base"
import { zaehlung_aggregateModel } from "./zaehlung_aggregateModel"
import { zaehlung_aggregateModelSelector } from "./zaehlung_aggregateModel.base"


/**
 * kulturBase
 * auto generated base class for the model kulturModel.
 */
export const kulturModelBase = ModelBase
  .named('kultur')
  .props({
    __typename: types.optional(types.literal("kultur"), "kultur"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    erhaltungskultur: types.union(types.undefined, types.null, types.boolean),
    events: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
    events_aggregate: types.union(types.undefined, types.late(() => event_aggregateModel)),
    garten: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    garten_id: types.union(types.undefined, types.null, types.frozen()),
    herkunft: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunftModel))),
    herkunft_id: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    kultur_files: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_fileModel)))),
    kultur_files_aggregate: types.union(types.undefined, types.late(() => kultur_file_aggregateModel)),
    kultur_option: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_optionModel))),
    kultur_qk_choosens: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_qk_choosenModel)))),
    kultur_qk_choosens_aggregate: types.union(types.undefined, types.late(() => kultur_qk_choosen_aggregateModel)),
    lieferungsByNachKulturId: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    lieferungsByNachKulturId_aggregate: types.union(types.undefined, types.late(() => lieferung_aggregateModel)),
    lieferungsByVonKulturId: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    lieferungsByVonKulturId_aggregate: types.union(types.undefined, types.late(() => lieferung_aggregateModel)),
    sammelLieferungsByNachKulturId: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    sammelLieferungsByNachKulturId_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_aggregateModel)),
    sammel_lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_aggregateModel)),
    teilkulturs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkulturModel)))),
    teilkulturs_aggregate: types.union(types.undefined, types.late(() => teilkultur_aggregateModel)),
    tsv: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    zaehlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => zaehlungModel)))),
    zaehlungs_aggregate: types.union(types.undefined, types.late(() => zaehlung_aggregateModel)),
    zwischenlager: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kulturModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get aktiv() { return this.__attr(`aktiv`) }
  get art_id() { return this.__attr(`art_id`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get erhaltungskultur() { return this.__attr(`erhaltungskultur`) }
  get garten_id() { return this.__attr(`garten_id`) }
  get herkunft_id() { return this.__attr(`herkunft_id`) }
  get id() { return this.__attr(`id`) }
  get tsv() { return this.__attr(`tsv`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get zwischenlager() { return this.__attr(`zwischenlager`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  events(builder) { return this.__child(`events`, eventModelSelector, builder) }
  events_aggregate(builder) { return this.__child(`events_aggregate`, event_aggregateModelSelector, builder) }
  garten(builder) { return this.__child(`garten`, gartenModelSelector, builder) }
  herkunft(builder) { return this.__child(`herkunft`, herkunftModelSelector, builder) }
  kultur_files(builder) { return this.__child(`kultur_files`, kultur_fileModelSelector, builder) }
  kultur_files_aggregate(builder) { return this.__child(`kultur_files_aggregate`, kultur_file_aggregateModelSelector, builder) }
  kultur_option(builder) { return this.__child(`kultur_option`, kultur_optionModelSelector, builder) }
  kultur_qk_choosens(builder) { return this.__child(`kultur_qk_choosens`, kultur_qk_choosenModelSelector, builder) }
  kultur_qk_choosens_aggregate(builder) { return this.__child(`kultur_qk_choosens_aggregate`, kultur_qk_choosen_aggregateModelSelector, builder) }
  lieferungsByNachKulturId(builder) { return this.__child(`lieferungsByNachKulturId`, lieferungModelSelector, builder) }
  lieferungsByNachKulturId_aggregate(builder) { return this.__child(`lieferungsByNachKulturId_aggregate`, lieferung_aggregateModelSelector, builder) }
  lieferungsByVonKulturId(builder) { return this.__child(`lieferungsByVonKulturId`, lieferungModelSelector, builder) }
  lieferungsByVonKulturId_aggregate(builder) { return this.__child(`lieferungsByVonKulturId_aggregate`, lieferung_aggregateModelSelector, builder) }
  sammelLieferungsByNachKulturId(builder) { return this.__child(`sammelLieferungsByNachKulturId`, sammel_lieferungModelSelector, builder) }
  sammelLieferungsByNachKulturId_aggregate(builder) { return this.__child(`sammelLieferungsByNachKulturId_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, sammel_lieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  teilkulturs(builder) { return this.__child(`teilkulturs`, teilkulturModelSelector, builder) }
  teilkulturs_aggregate(builder) { return this.__child(`teilkulturs_aggregate`, teilkultur_aggregateModelSelector, builder) }
  zaehlungs(builder) { return this.__child(`zaehlungs`, zaehlungModelSelector, builder) }
  zaehlungs_aggregate(builder) { return this.__child(`zaehlungs_aggregate`, zaehlung_aggregateModelSelector, builder) }
}
export function selectFromkultur() {
  return new kulturModelSelector()
}

export const kulturModelPrimitives = selectFromkultur()._conflicts._depth._parent_rev._rev._revisions.aktiv.art_id.bemerkungen.changed.changed_by.erhaltungskultur.garten_id.herkunft_id.tsv.von_anzahl_individuen.zwischenlager
