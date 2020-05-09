/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AvArtAggregateModel } from "./AvArtAggregateModel"
import { AvArtAggregateModelSelector } from "./AvArtAggregateModel.base"
import { AvArtModel } from "./AvArtModel"
import { AvArtModelSelector } from "./AvArtModel.base"
import { EventAggregateModel } from "./EventAggregateModel"
import { EventAggregateModelSelector } from "./EventAggregateModel.base"
import { EventModel } from "./EventModel"
import { EventModelSelector } from "./EventModel.base"
import { GartenAggregateModel } from "./GartenAggregateModel"
import { GartenAggregateModelSelector } from "./GartenAggregateModel.base"
import { GartenModel } from "./GartenModel"
import { GartenModelSelector } from "./GartenModel.base"
import { PersonFileAggregateModel } from "./PersonFileAggregateModel"
import { PersonFileAggregateModelSelector } from "./PersonFileAggregateModel.base"
import { PersonFileModel } from "./PersonFileModel"
import { PersonFileModelSelector } from "./PersonFileModel.base"
import { PersonOptionModel } from "./PersonOptionModel"
import { PersonOptionModelSelector } from "./PersonOptionModel.base"
import { SammelLieferungAggregateModel } from "./SammelLieferungAggregateModel"
import { SammelLieferungAggregateModelSelector } from "./SammelLieferungAggregateModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"
import { SammlungAggregateModel } from "./SammlungAggregateModel"
import { SammlungAggregateModelSelector } from "./SammlungAggregateModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"
import { UserRoleModel } from "./UserRoleModel"
import { UserRoleModelSelector } from "./UserRoleModel.base"


/**
 * PersonRevBase
 * auto generated base class for the model PersonRevModel.
 *
 * columns and relationships of "person_rev"
 */
export const PersonRevModelBase = ModelBase
  .named('PersonRev')
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
    /** An array relationship */
    av_art: types.union(types.undefined, types.array(types.late(() => AvArtModel))),
    /** An aggregated array relationship */
    av_art_aggregate: types.union(types.undefined, types.late(() => AvArtAggregateModel)),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    email: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    events: types.union(types.undefined, types.array(types.late(() => EventModel))),
    /** An aggregated array relationship */
    events_aggregate: types.union(types.undefined, types.late(() => EventAggregateModel)),
    /** An array relationship */
    gartens: types.union(types.undefined, types.array(types.late(() => GartenModel))),
    /** An aggregated array relationship */
    gartens_aggregate: types.union(types.undefined, types.late(() => GartenAggregateModel)),
    id: types.union(types.undefined, types.frozen()),
    info: types.union(types.undefined, types.null, types.boolean),
    kein_email: types.union(types.undefined, types.null, types.boolean),
    kommerziell: types.union(types.undefined, types.null, types.boolean),
    name: types.union(types.undefined, types.null, types.string),
    nr: types.union(types.undefined, types.null, types.string),
    ort: types.union(types.undefined, types.null, types.string),
    /** An array relationship */
    person_files: types.union(types.undefined, types.array(types.late(() => PersonFileModel))),
    /** An aggregated array relationship */
    person_files_aggregate: types.union(types.undefined, types.late(() => PersonFileAggregateModel)),
    /** An object relationship */
    person_option: types.union(types.undefined, types.null, types.late(() => PersonOptionModel)),
    plz: types.union(types.undefined, types.null, types.integer),
    /** An array relationship */
    sammel_lieferungs: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
    /** An aggregated array relationship */
    sammel_lieferungs_aggregate: types.union(types.undefined, types.late(() => SammelLieferungAggregateModel)),
    /** An array relationship */
    sammlungs: types.union(types.undefined, types.array(types.late(() => SammlungModel))),
    /** An aggregated array relationship */
    sammlungs_aggregate: types.union(types.undefined, types.late(() => SammlungAggregateModel)),
    strasse: types.union(types.undefined, types.null, types.string),
    telefon_geschaeft: types.union(types.undefined, types.null, types.string),
    telefon_mobile: types.union(types.undefined, types.null, types.string),
    telefon_privat: types.union(types.undefined, types.null, types.string),
    /** An object relationship */
    userRoleByUserRole: types.union(types.undefined, types.null, types.late(() => UserRoleModel)),
    user_role: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevModelSelector extends QueryBuilder {
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
  get plz() { return this.__attr(`plz`) }
  get strasse() { return this.__attr(`strasse`) }
  get telefon_geschaeft() { return this.__attr(`telefon_geschaeft`) }
  get telefon_mobile() { return this.__attr(`telefon_mobile`) }
  get telefon_privat() { return this.__attr(`telefon_privat`) }
  get user_role() { return this.__attr(`user_role`) }
  av_art(builder) { return this.__child(`av_art`, AvArtModelSelector, builder) }
  av_art_aggregate(builder) { return this.__child(`av_art_aggregate`, AvArtAggregateModelSelector, builder) }
  events(builder) { return this.__child(`events`, EventModelSelector, builder) }
  events_aggregate(builder) { return this.__child(`events_aggregate`, EventAggregateModelSelector, builder) }
  gartens(builder) { return this.__child(`gartens`, GartenModelSelector, builder) }
  gartens_aggregate(builder) { return this.__child(`gartens_aggregate`, GartenAggregateModelSelector, builder) }
  person_files(builder) { return this.__child(`person_files`, PersonFileModelSelector, builder) }
  person_files_aggregate(builder) { return this.__child(`person_files_aggregate`, PersonFileAggregateModelSelector, builder) }
  person_option(builder) { return this.__child(`person_option`, PersonOptionModelSelector, builder) }
  sammel_lieferungs(builder) { return this.__child(`sammel_lieferungs`, SammelLieferungModelSelector, builder) }
  sammel_lieferungs_aggregate(builder) { return this.__child(`sammel_lieferungs_aggregate`, SammelLieferungAggregateModelSelector, builder) }
  sammlungs(builder) { return this.__child(`sammlungs`, SammlungModelSelector, builder) }
  sammlungs_aggregate(builder) { return this.__child(`sammlungs_aggregate`, SammlungAggregateModelSelector, builder) }
  userRoleByUserRole(builder) { return this.__child(`userRoleByUserRole`, UserRoleModelSelector, builder) }
}
export function selectFromPersonRev() {
  return new PersonRevModelSelector()
}

export const personRevModelPrimitives = selectFromPersonRev()._deleted._depth._parent_rev._rev._revisions.account_id.adresszusatz.aktiv.bemerkungen.changed.changed_by.email.info.kein_email.kommerziell.name.nr.ort.plz.strasse.telefon_geschaeft.telefon_mobile.telefon_privat.user_role
