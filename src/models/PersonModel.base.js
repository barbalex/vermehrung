/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { avModel } from "./avModel"
import { avModelSelector } from "./avModel.base"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"
import { event_revModel } from "./event_revModel"
import { event_revModelSelector } from "./event_revModel.base"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { garten_revModel } from "./garten_revModel"
import { garten_revModelSelector } from "./garten_revModel.base"
import { gvModel } from "./gvModel"
import { gvModelSelector } from "./gvModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_revModel } from "./lieferung_revModel"
import { lieferung_revModelSelector } from "./lieferung_revModel.base"
import { person_fileModel } from "./person_fileModel"
import { person_fileModelSelector } from "./person_fileModel.base"
import { person_optionModel } from "./person_optionModel"
import { person_optionModelSelector } from "./person_optionModel.base"
import { person_option_revModel } from "./person_option_revModel"
import { person_option_revModelSelector } from "./person_option_revModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_revModel } from "./sammel_lieferung_revModel"
import { sammel_lieferung_revModelSelector } from "./sammel_lieferung_revModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"
import { sammlung_revModel } from "./sammlung_revModel"
import { sammlung_revModelSelector } from "./sammlung_revModel.base"
import { user_roleModel } from "./user_roleModel"
import { user_roleModelSelector } from "./user_roleModel.base"


/**
 * personBase
 * auto generated base class for the model personModel.
 */
export const personModelBase = ModelBase
  .named('person')
  .props({
    __typename: types.optional(types.literal("person"), "person"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    account_id: types.union(types.undefined, types.null, types.string),
    adresszusatz: types.union(types.undefined, types.null, types.string),
    aktiv: types.union(types.undefined, types.null, types.boolean),
    avs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => avModel)))),
    avs_aggregate: types.union(types.undefined, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    email: types.union(types.undefined, types.null, types.string),
    event_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => event_revModel)))),
    event_revs_aggregate: types.union(types.undefined, types.frozen()),
    events: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
    events_aggregate: types.union(types.undefined, types.frozen()),
    garten_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => garten_revModel)))),
    garten_revs_aggregate: types.union(types.undefined, types.frozen()),
    gartens: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gartenModel)))),
    gartens_aggregate: types.union(types.undefined, types.frozen()),
    gvs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gvModel)))),
    gvs_aggregate: types.union(types.undefined, types.frozen()),
    id: types.identifier,
    info: types.union(types.undefined, types.null, types.boolean),
    kein_email: types.union(types.undefined, types.null, types.boolean),
    kommerziell: types.union(types.undefined, types.null, types.boolean),
    lieferung_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_revModel)))),
    lieferung_revs_aggregate: types.union(types.undefined, types.frozen()),
    lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    lieferungs_aggregate: types.union(types.undefined, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    person_files: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_fileModel)))),
    person_files_aggregate: types.union(types.undefined, types.frozen()),
    person_option: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_optionModel))),
    person_option_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_option_revModel)))),
    person_option_revs_aggregate: types.union(types.undefined, types.frozen()),
    plz: types.union(types.undefined, types.null, types.integer),
    sammel_lieferung_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferung_revModel)))),
    sammel_lieferung_revs_aggregate: types.union(types.undefined, types.frozen()),
    sammel_lieferungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    sammel_lieferungs_aggregate: types.union(types.undefined, types.frozen()),
    sammlung_revs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlung_revModel)))),
    sammlung_revs_aggregate: types.union(types.undefined, types.frozen()),
    sammlungs: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    sammlungs_aggregate: types.union(types.undefined, types.frozen()),
    strasse: types.union(types.undefined, types.null, types.string),
    telefon_geschaeft: types.union(types.undefined, types.null, types.string),
    telefon_mobile: types.union(types.undefined, types.null, types.string),
    telefon_privat: types.union(types.undefined, types.null, types.string),
    userRoleByUserRole: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => user_roleModel))),
    user_role: types.union(types.undefined, types.null, types.string),
    user_role_id: types.union(types.undefined, types.null, types.frozen()),
    vorname: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class personModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
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
  get plz() { return this.__attr(`plz`) }
  get strasse() { return this.__attr(`strasse`) }
  get telefon_geschaeft() { return this.__attr(`telefon_geschaeft`) }
  get telefon_mobile() { return this.__attr(`telefon_mobile`) }
  get telefon_privat() { return this.__attr(`telefon_privat`) }
  get user_role() { return this.__attr(`user_role`) }
  get user_role_id() { return this.__attr(`user_role_id`) }
  get vorname() { return this.__attr(`vorname`) }
  avs(builder) { return this.__child(`avs`, avModelSelector, builder) }
  avs_aggregate(builder) { return this.__child(`avs_aggregate`, av_aggregateModelSelector, builder) }
  event_revs(builder) { return this.__child(`event_revs`, event_revModelSelector, builder) }
  event_revs_aggregate(builder) { return this.__child(`event_revs_aggregate`, event_rev_aggregateModelSelector, builder) }
  events(builder) { return this.__child(`events`, eventModelSelector, builder) }
  events_aggregate(builder) { return this.__child(`events_aggregate`, event_aggregateModelSelector, builder) }
  garten_revs(builder) { return this.__child(`garten_revs`, garten_revModelSelector, builder) }
  garten_revs_aggregate(builder) { return this.__child(`garten_revs_aggregate`, garten_rev_aggregateModelSelector, builder) }
  gartens(builder) { return this.__child(`gartens`, gartenModelSelector, builder) }
  gartens_aggregate(builder) { return this.__child(`gartens_aggregate`, garten_aggregateModelSelector, builder) }
  gvs(builder) { return this.__child(`gvs`, gvModelSelector, builder) }
  gvs_aggregate(builder) { return this.__child(`gvs_aggregate`, gv_aggregateModelSelector, builder) }
  lieferung_revs(builder) { return this.__child(`lieferung_revs`, lieferung_revModelSelector, builder) }
  lieferung_revs_aggregate(builder) { return this.__child(`lieferung_revs_aggregate`, lieferung_rev_aggregateModelSelector, builder) }
  lieferungs(builder) { return this.__child(`lieferungs`, lieferungModelSelector, builder) }
  lieferungs_aggregate(builder) { return this.__child(`lieferungs_aggregate`, lieferung_aggregateModelSelector, builder) }
  person_files(builder) { return this.__child(`person_files`, person_fileModelSelector, builder) }
  person_files_aggregate(builder) { return this.__child(`person_files_aggregate`, person_file_aggregateModelSelector, builder) }
  person_option(builder) { return this.__child(`person_option`, person_optionModelSelector, builder) }
  person_option_revs(builder) { return this.__child(`person_option_revs`, person_option_revModelSelector, builder) }
  person_option_revs_aggregate(builder) { return this.__child(`person_option_revs_aggregate`, person_option_rev_aggregateModelSelector, builder) }
  sammel_lieferung_revs(builder) { return this.__child(`sammel_lieferung_revs`, sammel_lieferung_revModelSelector, builder) }
  sammel_lieferung_revs_aggregate(builder) { return this.__child(`sammel_lieferung_revs_aggregate`, sammel_lieferung_rev_aggregateModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, sammel_lieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammlung_revs(builder) { return this.__child(`sammlung_revs`, sammlung_revModelSelector, builder) }
  sammlung_revs_aggregate(builder) { return this.__child(`sammlung_revs_aggregate`, sammlung_rev_aggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, sammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, sammlung_aggregateModelSelector, builder) }
  userRoleByUserRole(builder) { return this.__child(`userRoleByUserRole`, user_roleModelSelector, builder) }
}
export function selectFromperson() {
  return new personModelSelector()
}

export const personModelPrimitives = selectFromperson()._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.account_id.adresszusatz.aktiv.bemerkungen.changed.changed_by.email.info.kein_email.kommerziell.name.nr.ort.plz.strasse.telefon_geschaeft.telefon_mobile.telefon_privat.user_role.user_role_id.vorname
