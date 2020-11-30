/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { lieferung_fileModel } from "./lieferung_fileModel"
import { lieferung_fileModelSelector } from "./lieferung_fileModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"


/**
 * lieferungBase
 * auto generated base class for the model lieferungModel.
 */
export const lieferungModelBase = ModelBase
  .named('lieferung')
  .props({
    __typename: types.optional(types.literal("lieferung"), "lieferung"),
    _conflicts: types.union(types.undefined, types.null, types.frozen()),
    _deleted: types.union(types.undefined, types.null, types.boolean),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    _revisions: types.union(types.undefined, types.null, types.frozen()),
    andere_menge: types.union(types.undefined, types.null, types.string),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    art: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    bemerkungen: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    changed_by: types.union(types.undefined, types.null, types.string),
    datum: types.union(types.undefined, types.null, types.frozen()),
    geplant: types.union(types.undefined, types.null, types.boolean),
    gramm_samen: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    kulturByNachKulturId: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kulturModel))),
    kulturByVonKulturId: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kulturModel))),
    lieferung_files: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_fileModel)))),
    lieferung_files_aggregate: types.union(types.undefined, types.frozen()),
    nach_ausgepflanzt: types.union(types.undefined, types.null, types.boolean),
    nach_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    person: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    person_id: types.union(types.undefined, types.null, types.frozen()),
    sammel_lieferung: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferungModel))),
    sammel_lieferung_id: types.union(types.undefined, types.null, types.frozen()),
    sammlung: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlungModel))),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
    von_kultur_id: types.union(types.undefined, types.null, types.frozen()),
    von_sammlung_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferungModelSelector extends QueryBuilder {
  get _conflicts() { return this.__attr(`_conflicts`) }
  get _deleted() { return this.__attr(`_deleted`) }
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get _revisions() { return this.__attr(`_revisions`) }
  get andere_menge() { return this.__attr(`andere_menge`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get art_id() { return this.__attr(`art_id`) }
  get bemerkungen() { return this.__attr(`bemerkungen`) }
  get changed() { return this.__attr(`changed`) }
  get changed_by() { return this.__attr(`changed_by`) }
  get datum() { return this.__attr(`datum`) }
  get geplant() { return this.__attr(`geplant`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get id() { return this.__attr(`id`) }
  get nach_ausgepflanzt() { return this.__attr(`nach_ausgepflanzt`) }
  get nach_kultur_id() { return this.__attr(`nach_kultur_id`) }
  get person_id() { return this.__attr(`person_id`) }
  get sammel_lieferung_id() { return this.__attr(`sammel_lieferung_id`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
  get von_kultur_id() { return this.__attr(`von_kultur_id`) }
  get von_sammlung_id() { return this.__attr(`von_sammlung_id`) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  kulturByNachKulturId(builder) { return this.__child(`kulturByNachKulturId`, kulturModelSelector, builder) }
  kulturByVonKulturId(builder) { return this.__child(`kulturByVonKulturId`, kulturModelSelector, builder) }
  lieferung_files(builder) { return this.__child(`lieferung_files`, lieferung_fileModelSelector, builder) }
  lieferung_files_aggregate(builder) { return this.__child(`lieferung_files_aggregate`, lieferung_file_aggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
  sammel_lieferung(builder) { return this.__child(`sammel_lieferung`, sammel_lieferungModelSelector, builder) }
  sammlung(builder) { return this.__child(`sammlung`, sammlungModelSelector, builder) }
}
export function selectFromlieferung() {
  return new lieferungModelSelector()
}

export const lieferungModelPrimitives = selectFromlieferung()._conflicts._deleted._depth._parent_rev._rev._rev_at._revisions.andere_menge.anzahl_auspflanzbereit.anzahl_pflanzen.art_id.bemerkungen.changed.changed_by.datum.geplant.gramm_samen.nach_ausgepflanzt.nach_kultur_id.person_id.sammel_lieferung_id.von_anzahl_individuen.von_kultur_id.von_sammlung_id
