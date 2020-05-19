/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { av_artModel } from "./av_artModel"
import { av_artModelSelector } from "./av_artModel.base"
import { av_art_aggregateModel } from "./av_art_aggregateModel"
import { av_art_aggregateModelSelector } from "./av_art_aggregateModel.base"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"
import { event_aggregateModel } from "./event_aggregateModel"
import { event_aggregateModelSelector } from "./event_aggregateModel.base"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { garten_aggregateModel } from "./garten_aggregateModel"
import { garten_aggregateModelSelector } from "./garten_aggregateModel.base"
import { person_fileModel } from "./person_fileModel"
import { person_fileModelSelector } from "./person_fileModel.base"
import { person_file_aggregateModel } from "./person_file_aggregateModel"
import { person_file_aggregateModelSelector } from "./person_file_aggregateModel.base"
import { person_optionModel } from "./person_optionModel"
import { person_optionModelSelector } from "./person_optionModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_aggregateModel } from "./sammel_lieferung_aggregateModel"
import { sammel_lieferung_aggregateModelSelector } from "./sammel_lieferung_aggregateModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"
import { sammlung_aggregateModel } from "./sammlung_aggregateModel"
import { sammlung_aggregateModelSelector } from "./sammlung_aggregateModel.base"
import { user_roleModel } from "./user_roleModel"
import { user_roleModelSelector } from "./user_roleModel.base"


/**
 * person_revBase
 * auto generated base class for the model person_revModel.
 */
export const person_revModelBase = ModelBase
  .named('person_rev')
  .props({
    __typename: types.optional(types.literal("person_rev"), "person_rev"),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.string),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    account_id: types.union(types.undefined, types.null, types.string),
    adresszusatz: types.union(types.undefined, types.null, types.string),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    av_art: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => av_artModel)))),
    av_art_aggregate: types.union(types.undefined, types.late(() => av_art_aggregateModel)),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    email: types.union(types.undefined, types.null, types.string),
    events: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
    events_aggregate: types.union(types.undefined, types.late(() => event_aggregateModel)),
    gartens: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gartenModel)))),
    gartens_aggregate: types.union(types.undefined, types.late(() => garten_aggregateModel)),
    id: types.identifier,
    info: types.union(types.undefined, types.null, types.boolean),
    kein_email: types.union(types.undefined, types.null, types.boolean),
    kommerziell: types.union(types.undefined, types.null, types.boolean),
    name: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    person_files: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_fileModel)))),
    person_files_aggregate: types.union(types.undefined, types.late(() => person_file_aggregateModel)),
    person_id: types.union(types.undefined, types.frozen()),
    person_option: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_optionModel))),
    plz: types.union(types.undefined, types.null, types.integer),
    sammel_lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_aggregateModel)),
    sammlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    sammlungs_aggregate: types.union(types.undefined, types.late(() => sammlung_aggregateModel)),
    strasse: types.union(types.undefined, types.null, types.string),
    telefon_geschaeft: types.union(types.undefined, types.null, types.string),
    telefon_mobile: types.union(types.undefined, types.null, types.string),
    telefon_privat: types.union(types.undefined, types.null, types.string),
    userRoleByUserRole: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => user_roleModel))),
    user_role: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_revModelSelector extends QueryBuilder {
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get account_id() { return this.__attr(`account_id`) }
  get adresszusatz() { return this.__attr(`adresszusatz`) }
  get aktiv() { return this.__attr(`aktiv`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get email() { return this.__attr(`email`) }
  get id() { return this.__attr(`id`) }
  get info() { return this.__attr(`info`) }
  get kein_email() { return this.__attr(`kein_email`) }
  get kommerziell() { return this.__attr(`kommerziell`) }
  get name() { return this.__attr(`name`) }
  get nr() { return this.__attr(`nr`) }
  get ort() { return this.__attr(`ort`) }
  get person_id() { return this.__attr(`person_id`) }
  get plz() { return this.__attr(`plz`) }
  get strasse() { return this.__attr(`strasse`) }
  get telefon_geschaeft() { return this.__attr(`telefon_geschaeft`) }
  get telefon_mobile() { return this.__attr(`telefon_mobile`) }
  get telefon_privat() { return this.__attr(`telefon_privat`) }
  get user_role() { return this.__attr(`user_role`) }
  av_art(builder) { return this.__child(`av_art`, av_artModelSelector, builder) }
  av_art_aggregate(builder) { return this.__child(`av_art_aggregate`, av_art_aggregateModelSelector, builder) }
  events(builder) { return this.__child(`events`, eventModelSelector, builder) }
  events_aggregate(builder) { return this.__child(`events_aggregate`, event_aggregateModelSelector, builder) }
  gartens(builder) { return this.__child(`gartens`, gartenModelSelector, builder) }
  gartens_aggregate(builder) { return this.__child(`gartens_aggregate`, garten_aggregateModelSelector, builder) }
  person_files(builder) { return this.__child(`person_files`, person_fileModelSelector, builder) }
  person_files_aggregate(builder) { return this.__child(`person_files_aggregate`, person_file_aggregateModelSelector, builder) }
  person_option(builder) { return this.__child(`person_option`, person_optionModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, sammel_lieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, sammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, sammlung_aggregateModelSelector, builder) }
  userRoleByUserRole(builder) { return this.__child(`userRoleByUserRole`, user_roleModelSelector, builder) }
}
export function selectFromperson_rev() {
  return new person_revModelSelector()
}

export const person_revModelPrimitives = selectFromperson_rev()._deleted._depth._parent_rev._rev._revisions.account_id.adresszusatz.aktiv.bemerkungen.changed.changed_by.email.info.kein_email.kommerziell.name.nr.ort.person_id.plz.strasse.telefon_geschaeft.telefon_mobile.telefon_privat.user_role
