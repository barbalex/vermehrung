/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelSelector } from "./ae_artModel.base"
import { ae_art_mutation_responseModel } from "./ae_art_mutation_responseModel"
import { ae_art_mutation_responseModelSelector } from "./ae_art_mutation_responseModel.base"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { art_fileModel } from "./art_fileModel"
import { art_fileModelSelector } from "./art_fileModel.base"
import { art_file_mutation_responseModel } from "./art_file_mutation_responseModel"
import { art_file_mutation_responseModelSelector } from "./art_file_mutation_responseModel.base"
import { art_mutation_responseModel } from "./art_mutation_responseModel"
import { art_mutation_responseModelSelector } from "./art_mutation_responseModel.base"
import { art_qkModel } from "./art_qkModel"
import { art_qkModelSelector } from "./art_qkModel.base"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { art_qk_choosen_mutation_responseModel } from "./art_qk_choosen_mutation_responseModel"
import { art_qk_choosen_mutation_responseModelSelector } from "./art_qk_choosen_mutation_responseModel.base"
import { art_qk_mutation_responseModel } from "./art_qk_mutation_responseModel"
import { art_qk_mutation_responseModelSelector } from "./art_qk_mutation_responseModel.base"
import { art_revModel } from "./art_revModel"
import { art_revModelSelector } from "./art_revModel.base"
import { art_rev_mutation_responseModel } from "./art_rev_mutation_responseModel"
import { art_rev_mutation_responseModelSelector } from "./art_rev_mutation_responseModel.base"
import { av_artModel } from "./av_artModel"
import { av_artModelSelector } from "./av_artModel.base"
import { av_art_mutation_responseModel } from "./av_art_mutation_responseModel"
import { av_art_mutation_responseModelSelector } from "./av_art_mutation_responseModel.base"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"
import { event_mutation_responseModel } from "./event_mutation_responseModel"
import { event_mutation_responseModelSelector } from "./event_mutation_responseModel.base"
import { event_revModel } from "./event_revModel"
import { event_revModelSelector } from "./event_revModel.base"
import { event_rev_mutation_responseModel } from "./event_rev_mutation_responseModel"
import { event_rev_mutation_responseModelSelector } from "./event_rev_mutation_responseModel.base"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { garten_fileModel } from "./garten_fileModel"
import { garten_fileModelSelector } from "./garten_fileModel.base"
import { garten_file_mutation_responseModel } from "./garten_file_mutation_responseModel"
import { garten_file_mutation_responseModelSelector } from "./garten_file_mutation_responseModel.base"
import { garten_mutation_responseModel } from "./garten_mutation_responseModel"
import { garten_mutation_responseModelSelector } from "./garten_mutation_responseModel.base"
import { garten_revModel } from "./garten_revModel"
import { garten_revModelSelector } from "./garten_revModel.base"
import { garten_rev_mutation_responseModel } from "./garten_rev_mutation_responseModel"
import { garten_rev_mutation_responseModelSelector } from "./garten_rev_mutation_responseModel.base"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelSelector } from "./herkunftModel.base"
import { herkunft_fileModel } from "./herkunft_fileModel"
import { herkunft_fileModelSelector } from "./herkunft_fileModel.base"
import { herkunft_file_mutation_responseModel } from "./herkunft_file_mutation_responseModel"
import { herkunft_file_mutation_responseModelSelector } from "./herkunft_file_mutation_responseModel.base"
import { herkunft_mutation_responseModel } from "./herkunft_mutation_responseModel"
import { herkunft_mutation_responseModelSelector } from "./herkunft_mutation_responseModel.base"
import { herkunft_revModel } from "./herkunft_revModel"
import { herkunft_revModelSelector } from "./herkunft_revModel.base"
import { herkunft_rev_mutation_responseModel } from "./herkunft_rev_mutation_responseModel"
import { herkunft_rev_mutation_responseModelSelector } from "./herkunft_rev_mutation_responseModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { kultur_fileModel } from "./kultur_fileModel"
import { kultur_fileModelSelector } from "./kultur_fileModel.base"
import { kultur_file_mutation_responseModel } from "./kultur_file_mutation_responseModel"
import { kultur_file_mutation_responseModelSelector } from "./kultur_file_mutation_responseModel.base"
import { kultur_mutation_responseModel } from "./kultur_mutation_responseModel"
import { kultur_mutation_responseModelSelector } from "./kultur_mutation_responseModel.base"
import { kultur_optionModel } from "./kultur_optionModel"
import { kultur_optionModelSelector } from "./kultur_optionModel.base"
import { kultur_option_mutation_responseModel } from "./kultur_option_mutation_responseModel"
import { kultur_option_mutation_responseModelSelector } from "./kultur_option_mutation_responseModel.base"
import { kultur_option_revModel } from "./kultur_option_revModel"
import { kultur_option_revModelSelector } from "./kultur_option_revModel.base"
import { kultur_option_rev_mutation_responseModel } from "./kultur_option_rev_mutation_responseModel"
import { kultur_option_rev_mutation_responseModelSelector } from "./kultur_option_rev_mutation_responseModel.base"
import { kultur_qkModel } from "./kultur_qkModel"
import { kultur_qkModelSelector } from "./kultur_qkModel.base"
import { kultur_qk_choosenModel } from "./kultur_qk_choosenModel"
import { kultur_qk_choosenModelSelector } from "./kultur_qk_choosenModel.base"
import { kultur_qk_choosen_mutation_responseModel } from "./kultur_qk_choosen_mutation_responseModel"
import { kultur_qk_choosen_mutation_responseModelSelector } from "./kultur_qk_choosen_mutation_responseModel.base"
import { kultur_qk_mutation_responseModel } from "./kultur_qk_mutation_responseModel"
import { kultur_qk_mutation_responseModelSelector } from "./kultur_qk_mutation_responseModel.base"
import { kultur_revModel } from "./kultur_revModel"
import { kultur_revModelSelector } from "./kultur_revModel.base"
import { kultur_rev_mutation_responseModel } from "./kultur_rev_mutation_responseModel"
import { kultur_rev_mutation_responseModelSelector } from "./kultur_rev_mutation_responseModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_fileModel } from "./lieferung_fileModel"
import { lieferung_fileModelSelector } from "./lieferung_fileModel.base"
import { lieferung_file_mutation_responseModel } from "./lieferung_file_mutation_responseModel"
import { lieferung_file_mutation_responseModelSelector } from "./lieferung_file_mutation_responseModel.base"
import { lieferung_mutation_responseModel } from "./lieferung_mutation_responseModel"
import { lieferung_mutation_responseModelSelector } from "./lieferung_mutation_responseModel.base"
import { lieferung_revModel } from "./lieferung_revModel"
import { lieferung_revModelSelector } from "./lieferung_revModel.base"
import { lieferung_rev_mutation_responseModel } from "./lieferung_rev_mutation_responseModel"
import { lieferung_rev_mutation_responseModelSelector } from "./lieferung_rev_mutation_responseModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"
import { person_fileModel } from "./person_fileModel"
import { person_fileModelSelector } from "./person_fileModel.base"
import { person_file_mutation_responseModel } from "./person_file_mutation_responseModel"
import { person_file_mutation_responseModelSelector } from "./person_file_mutation_responseModel.base"
import { person_mutation_responseModel } from "./person_mutation_responseModel"
import { person_mutation_responseModelSelector } from "./person_mutation_responseModel.base"
import { person_optionModel } from "./person_optionModel"
import { person_optionModelSelector } from "./person_optionModel.base"
import { person_option_mutation_responseModel } from "./person_option_mutation_responseModel"
import { person_option_mutation_responseModelSelector } from "./person_option_mutation_responseModel.base"
import { person_option_revModel } from "./person_option_revModel"
import { person_option_revModelSelector } from "./person_option_revModel.base"
import { person_option_rev_mutation_responseModel } from "./person_option_rev_mutation_responseModel"
import { person_option_rev_mutation_responseModelSelector } from "./person_option_rev_mutation_responseModel.base"
import { person_revModel } from "./person_revModel"
import { person_revModelSelector } from "./person_revModel.base"
import { person_rev_mutation_responseModel } from "./person_rev_mutation_responseModel"
import { person_rev_mutation_responseModelSelector } from "./person_rev_mutation_responseModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_mutation_responseModel } from "./sammel_lieferung_mutation_responseModel"
import { sammel_lieferung_mutation_responseModelSelector } from "./sammel_lieferung_mutation_responseModel.base"
import { sammel_lieferung_revModel } from "./sammel_lieferung_revModel"
import { sammel_lieferung_revModelSelector } from "./sammel_lieferung_revModel.base"
import { sammel_lieferung_rev_mutation_responseModel } from "./sammel_lieferung_rev_mutation_responseModel"
import { sammel_lieferung_rev_mutation_responseModelSelector } from "./sammel_lieferung_rev_mutation_responseModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"
import { sammlung_fileModel } from "./sammlung_fileModel"
import { sammlung_fileModelSelector } from "./sammlung_fileModel.base"
import { sammlung_file_mutation_responseModel } from "./sammlung_file_mutation_responseModel"
import { sammlung_file_mutation_responseModelSelector } from "./sammlung_file_mutation_responseModel.base"
import { sammlung_mutation_responseModel } from "./sammlung_mutation_responseModel"
import { sammlung_mutation_responseModelSelector } from "./sammlung_mutation_responseModel.base"
import { sammlung_revModel } from "./sammlung_revModel"
import { sammlung_revModelSelector } from "./sammlung_revModel.base"
import { sammlung_rev_mutation_responseModel } from "./sammlung_rev_mutation_responseModel"
import { sammlung_rev_mutation_responseModelSelector } from "./sammlung_rev_mutation_responseModel.base"
import { spatial_ref_sysModel } from "./spatial_ref_sysModel"
import { spatial_ref_sysModelSelector } from "./spatial_ref_sysModel.base"
import { spatial_ref_sys_mutation_responseModel } from "./spatial_ref_sys_mutation_responseModel"
import { spatial_ref_sys_mutation_responseModelSelector } from "./spatial_ref_sys_mutation_responseModel.base"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"
import { teilkultur_mutation_responseModel } from "./teilkultur_mutation_responseModel"
import { teilkultur_mutation_responseModelSelector } from "./teilkultur_mutation_responseModel.base"
import { teilkultur_revModel } from "./teilkultur_revModel"
import { teilkultur_revModelSelector } from "./teilkultur_revModel.base"
import { teilkultur_rev_mutation_responseModel } from "./teilkultur_rev_mutation_responseModel"
import { teilkultur_rev_mutation_responseModelSelector } from "./teilkultur_rev_mutation_responseModel.base"
import { teilzaehlungModel } from "./teilzaehlungModel"
import { teilzaehlungModelSelector } from "./teilzaehlungModel.base"
import { teilzaehlung_mutation_responseModel } from "./teilzaehlung_mutation_responseModel"
import { teilzaehlung_mutation_responseModelSelector } from "./teilzaehlung_mutation_responseModel.base"
import { teilzaehlung_revModel } from "./teilzaehlung_revModel"
import { teilzaehlung_revModelSelector } from "./teilzaehlung_revModel.base"
import { teilzaehlung_rev_mutation_responseModel } from "./teilzaehlung_rev_mutation_responseModel"
import { teilzaehlung_rev_mutation_responseModelSelector } from "./teilzaehlung_rev_mutation_responseModel.base"
import { user_roleModel } from "./user_roleModel"
import { user_roleModelSelector } from "./user_roleModel.base"
import { user_role_mutation_responseModel } from "./user_role_mutation_responseModel"
import { user_role_mutation_responseModelSelector } from "./user_role_mutation_responseModel.base"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelSelector } from "./zaehlungModel.base"
import { zaehlung_mutation_responseModel } from "./zaehlung_mutation_responseModel"
import { zaehlung_mutation_responseModelSelector } from "./zaehlung_mutation_responseModel.base"
import { zaehlung_revModel } from "./zaehlung_revModel"
import { zaehlung_revModelSelector } from "./zaehlung_revModel.base"
import { zaehlung_rev_mutation_responseModel } from "./zaehlung_rev_mutation_responseModel"
import { zaehlung_rev_mutation_responseModelSelector } from "./zaehlung_rev_mutation_responseModel.base"


/**
 * mutation_rootBase
 * auto generated base class for the model mutation_rootModel.
 */
export const mutation_rootModelBase = ModelBase
  .named('mutation_root')
  .props({
    __typename: types.optional(types.literal("mutation_root"), "mutation_root"),
    delete_ae_art: types.union(types.undefined, types.null, types.late(() => ae_art_mutation_responseModel)),
    delete_art: types.union(types.undefined, types.null, types.late(() => art_mutation_responseModel)),
    delete_art_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    delete_art_file: types.union(types.undefined, types.null, types.late(() => art_file_mutation_responseModel)),
    delete_art_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_fileModel))),
    delete_art_qk: types.union(types.undefined, types.null, types.late(() => art_qk_mutation_responseModel)),
    delete_art_qk_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_qkModel))),
    delete_art_qk_choosen: types.union(types.undefined, types.null, types.late(() => art_qk_choosen_mutation_responseModel)),
    delete_art_rev: types.union(types.undefined, types.null, types.late(() => art_rev_mutation_responseModel)),
    delete_art_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_revModel))),
    delete_av_art: types.union(types.undefined, types.null, types.late(() => av_art_mutation_responseModel)),
    delete_av_art_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => av_artModel))),
    delete_event: types.union(types.undefined, types.null, types.late(() => event_mutation_responseModel)),
    delete_event_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => eventModel))),
    delete_event_rev: types.union(types.undefined, types.null, types.late(() => event_rev_mutation_responseModel)),
    delete_event_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => event_revModel))),
    delete_garten: types.union(types.undefined, types.null, types.late(() => garten_mutation_responseModel)),
    delete_garten_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    delete_garten_file: types.union(types.undefined, types.null, types.late(() => garten_file_mutation_responseModel)),
    delete_garten_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_fileModel))),
    delete_garten_rev: types.union(types.undefined, types.null, types.late(() => garten_rev_mutation_responseModel)),
    delete_garten_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_revModel))),
    delete_herkunft: types.union(types.undefined, types.null, types.late(() => herkunft_mutation_responseModel)),
    delete_herkunft_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunftModel))),
    delete_herkunft_file: types.union(types.undefined, types.null, types.late(() => herkunft_file_mutation_responseModel)),
    delete_herkunft_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_fileModel))),
    delete_herkunft_rev: types.union(types.undefined, types.null, types.late(() => herkunft_rev_mutation_responseModel)),
    delete_herkunft_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_revModel))),
    delete_kultur: types.union(types.undefined, types.null, types.late(() => kultur_mutation_responseModel)),
    delete_kultur_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kulturModel))),
    delete_kultur_file: types.union(types.undefined, types.null, types.late(() => kultur_file_mutation_responseModel)),
    delete_kultur_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_fileModel))),
    delete_kultur_option: types.union(types.undefined, types.null, types.late(() => kultur_option_mutation_responseModel)),
    delete_kultur_option_rev: types.union(types.undefined, types.null, types.late(() => kultur_option_rev_mutation_responseModel)),
    delete_kultur_option_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_option_revModel))),
    delete_kultur_qk: types.union(types.undefined, types.null, types.late(() => kultur_qk_mutation_responseModel)),
    delete_kultur_qk_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_qkModel))),
    delete_kultur_qk_choosen: types.union(types.undefined, types.null, types.late(() => kultur_qk_choosen_mutation_responseModel)),
    delete_kultur_rev: types.union(types.undefined, types.null, types.late(() => kultur_rev_mutation_responseModel)),
    delete_kultur_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_revModel))),
    delete_lieferung: types.union(types.undefined, types.null, types.late(() => lieferung_mutation_responseModel)),
    delete_lieferung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferungModel))),
    delete_lieferung_file: types.union(types.undefined, types.null, types.late(() => lieferung_file_mutation_responseModel)),
    delete_lieferung_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_fileModel))),
    delete_lieferung_rev: types.union(types.undefined, types.null, types.late(() => lieferung_rev_mutation_responseModel)),
    delete_lieferung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_revModel))),
    delete_person: types.union(types.undefined, types.null, types.late(() => person_mutation_responseModel)),
    delete_person_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    delete_person_file: types.union(types.undefined, types.null, types.late(() => person_file_mutation_responseModel)),
    delete_person_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_fileModel))),
    delete_person_option: types.union(types.undefined, types.null, types.late(() => person_option_mutation_responseModel)),
    delete_person_option_rev: types.union(types.undefined, types.null, types.late(() => person_option_rev_mutation_responseModel)),
    delete_person_option_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_option_revModel))),
    delete_person_rev: types.union(types.undefined, types.null, types.late(() => person_rev_mutation_responseModel)),
    delete_person_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_revModel))),
    delete_sammel_lieferung: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_mutation_responseModel)),
    delete_sammel_lieferung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferungModel))),
    delete_sammel_lieferung_rev: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_rev_mutation_responseModel)),
    delete_sammel_lieferung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferung_revModel))),
    delete_sammlung: types.union(types.undefined, types.null, types.late(() => sammlung_mutation_responseModel)),
    delete_sammlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlungModel))),
    delete_sammlung_file: types.union(types.undefined, types.null, types.late(() => sammlung_file_mutation_responseModel)),
    delete_sammlung_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_fileModel))),
    delete_sammlung_rev: types.union(types.undefined, types.null, types.late(() => sammlung_rev_mutation_responseModel)),
    delete_sammlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_revModel))),
    delete_spatial_ref_sys: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_mutation_responseModel)),
    delete_spatial_ref_sys_by_pk: types.union(types.undefined, types.null, types.late(() => spatial_ref_sysModel)),
    delete_teilkultur: types.union(types.undefined, types.null, types.late(() => teilkultur_mutation_responseModel)),
    delete_teilkultur_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkulturModel))),
    delete_teilkultur_rev: types.union(types.undefined, types.null, types.late(() => teilkultur_rev_mutation_responseModel)),
    delete_teilkultur_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkultur_revModel))),
    delete_teilzaehlung: types.union(types.undefined, types.null, types.late(() => teilzaehlung_mutation_responseModel)),
    delete_teilzaehlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlungModel))),
    delete_teilzaehlung_rev: types.union(types.undefined, types.null, types.late(() => teilzaehlung_rev_mutation_responseModel)),
    delete_teilzaehlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlung_revModel))),
    delete_user_role: types.union(types.undefined, types.null, types.late(() => user_role_mutation_responseModel)),
    delete_user_role_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => user_roleModel))),
    delete_zaehlung: types.union(types.undefined, types.null, types.late(() => zaehlung_mutation_responseModel)),
    delete_zaehlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlungModel))),
    delete_zaehlung_rev: types.union(types.undefined, types.null, types.late(() => zaehlung_rev_mutation_responseModel)),
    delete_zaehlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlung_revModel))),
    insert_ae_art: types.union(types.undefined, types.null, types.late(() => ae_art_mutation_responseModel)),
    insert_ae_art_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => ae_artModel))),
    insert_art: types.union(types.undefined, types.null, types.late(() => art_mutation_responseModel)),
    insert_art_file: types.union(types.undefined, types.null, types.late(() => art_file_mutation_responseModel)),
    insert_art_file_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_fileModel))),
    insert_art_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    insert_art_qk: types.union(types.undefined, types.null, types.late(() => art_qk_mutation_responseModel)),
    insert_art_qk_choosen: types.union(types.undefined, types.null, types.late(() => art_qk_choosen_mutation_responseModel)),
    insert_art_qk_choosen_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_qk_choosenModel))),
    insert_art_qk_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_qkModel))),
    insert_art_rev: types.union(types.undefined, types.null, types.late(() => art_rev_mutation_responseModel)),
    insert_art_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_revModel))),
    insert_av_art: types.union(types.undefined, types.null, types.late(() => av_art_mutation_responseModel)),
    insert_av_art_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => av_artModel))),
    insert_event: types.union(types.undefined, types.null, types.late(() => event_mutation_responseModel)),
    insert_event_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => eventModel))),
    insert_event_rev: types.union(types.undefined, types.null, types.late(() => event_rev_mutation_responseModel)),
    insert_event_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => event_revModel))),
    insert_garten: types.union(types.undefined, types.null, types.late(() => garten_mutation_responseModel)),
    insert_garten_file: types.union(types.undefined, types.null, types.late(() => garten_file_mutation_responseModel)),
    insert_garten_file_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_fileModel))),
    insert_garten_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    insert_garten_rev: types.union(types.undefined, types.null, types.late(() => garten_rev_mutation_responseModel)),
    insert_garten_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_revModel))),
    insert_herkunft: types.union(types.undefined, types.null, types.late(() => herkunft_mutation_responseModel)),
    insert_herkunft_file: types.union(types.undefined, types.null, types.late(() => herkunft_file_mutation_responseModel)),
    insert_herkunft_file_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_fileModel))),
    insert_herkunft_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunftModel))),
    insert_herkunft_rev: types.union(types.undefined, types.null, types.late(() => herkunft_rev_mutation_responseModel)),
    insert_herkunft_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_revModel))),
    insert_kultur: types.union(types.undefined, types.null, types.late(() => kultur_mutation_responseModel)),
    insert_kultur_file: types.union(types.undefined, types.null, types.late(() => kultur_file_mutation_responseModel)),
    insert_kultur_file_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_fileModel))),
    insert_kultur_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kulturModel))),
    insert_kultur_option: types.union(types.undefined, types.null, types.late(() => kultur_option_mutation_responseModel)),
    insert_kultur_option_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_optionModel))),
    insert_kultur_option_rev: types.union(types.undefined, types.null, types.late(() => kultur_option_rev_mutation_responseModel)),
    insert_kultur_option_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_option_revModel))),
    insert_kultur_qk: types.union(types.undefined, types.null, types.late(() => kultur_qk_mutation_responseModel)),
    insert_kultur_qk_choosen: types.union(types.undefined, types.null, types.late(() => kultur_qk_choosen_mutation_responseModel)),
    insert_kultur_qk_choosen_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_qk_choosenModel))),
    insert_kultur_qk_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_qkModel))),
    insert_kultur_rev: types.union(types.undefined, types.null, types.late(() => kultur_rev_mutation_responseModel)),
    insert_kultur_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_revModel))),
    insert_lieferung: types.union(types.undefined, types.null, types.late(() => lieferung_mutation_responseModel)),
    insert_lieferung_file: types.union(types.undefined, types.null, types.late(() => lieferung_file_mutation_responseModel)),
    insert_lieferung_file_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_fileModel))),
    insert_lieferung_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferungModel))),
    insert_lieferung_rev: types.union(types.undefined, types.null, types.late(() => lieferung_rev_mutation_responseModel)),
    insert_lieferung_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_revModel))),
    insert_person: types.union(types.undefined, types.null, types.late(() => person_mutation_responseModel)),
    insert_person_file: types.union(types.undefined, types.null, types.late(() => person_file_mutation_responseModel)),
    insert_person_file_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_fileModel))),
    insert_person_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    insert_person_option: types.union(types.undefined, types.null, types.late(() => person_option_mutation_responseModel)),
    insert_person_option_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_optionModel))),
    insert_person_option_rev: types.union(types.undefined, types.null, types.late(() => person_option_rev_mutation_responseModel)),
    insert_person_option_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_option_revModel))),
    insert_person_rev: types.union(types.undefined, types.null, types.late(() => person_rev_mutation_responseModel)),
    insert_person_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_revModel))),
    insert_sammel_lieferung: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_mutation_responseModel)),
    insert_sammel_lieferung_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferungModel))),
    insert_sammel_lieferung_rev: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_rev_mutation_responseModel)),
    insert_sammel_lieferung_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferung_revModel))),
    insert_sammlung: types.union(types.undefined, types.null, types.late(() => sammlung_mutation_responseModel)),
    insert_sammlung_file: types.union(types.undefined, types.null, types.late(() => sammlung_file_mutation_responseModel)),
    insert_sammlung_file_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_fileModel))),
    insert_sammlung_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlungModel))),
    insert_sammlung_rev: types.union(types.undefined, types.null, types.late(() => sammlung_rev_mutation_responseModel)),
    insert_sammlung_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_revModel))),
    insert_spatial_ref_sys: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_mutation_responseModel)),
    insert_spatial_ref_sys_one: types.union(types.undefined, types.null, types.late(() => spatial_ref_sysModel)),
    insert_teilkultur: types.union(types.undefined, types.null, types.late(() => teilkultur_mutation_responseModel)),
    insert_teilkultur_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkulturModel))),
    insert_teilkultur_rev: types.union(types.undefined, types.null, types.late(() => teilkultur_rev_mutation_responseModel)),
    insert_teilkultur_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkultur_revModel))),
    insert_teilzaehlung: types.union(types.undefined, types.null, types.late(() => teilzaehlung_mutation_responseModel)),
    insert_teilzaehlung_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlungModel))),
    insert_teilzaehlung_rev: types.union(types.undefined, types.null, types.late(() => teilzaehlung_rev_mutation_responseModel)),
    insert_teilzaehlung_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlung_revModel))),
    insert_user_role: types.union(types.undefined, types.null, types.late(() => user_role_mutation_responseModel)),
    insert_user_role_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => user_roleModel))),
    insert_zaehlung: types.union(types.undefined, types.null, types.late(() => zaehlung_mutation_responseModel)),
    insert_zaehlung_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlungModel))),
    insert_zaehlung_rev: types.union(types.undefined, types.null, types.late(() => zaehlung_rev_mutation_responseModel)),
    insert_zaehlung_rev_one: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlung_revModel))),
    update_ae_art: types.union(types.undefined, types.null, types.late(() => ae_art_mutation_responseModel)),
    update_art: types.union(types.undefined, types.null, types.late(() => art_mutation_responseModel)),
    update_art_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    update_art_file: types.union(types.undefined, types.null, types.late(() => art_file_mutation_responseModel)),
    update_art_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_fileModel))),
    update_art_qk: types.union(types.undefined, types.null, types.late(() => art_qk_mutation_responseModel)),
    update_art_qk_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_qkModel))),
    update_art_qk_choosen: types.union(types.undefined, types.null, types.late(() => art_qk_choosen_mutation_responseModel)),
    update_art_rev: types.union(types.undefined, types.null, types.late(() => art_rev_mutation_responseModel)),
    update_art_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_revModel))),
    update_av_art: types.union(types.undefined, types.null, types.late(() => av_art_mutation_responseModel)),
    update_av_art_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => av_artModel))),
    update_event: types.union(types.undefined, types.null, types.late(() => event_mutation_responseModel)),
    update_event_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => eventModel))),
    update_event_rev: types.union(types.undefined, types.null, types.late(() => event_rev_mutation_responseModel)),
    update_event_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => event_revModel))),
    update_garten: types.union(types.undefined, types.null, types.late(() => garten_mutation_responseModel)),
    update_garten_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    update_garten_file: types.union(types.undefined, types.null, types.late(() => garten_file_mutation_responseModel)),
    update_garten_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_fileModel))),
    update_garten_rev: types.union(types.undefined, types.null, types.late(() => garten_rev_mutation_responseModel)),
    update_garten_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_revModel))),
    update_herkunft: types.union(types.undefined, types.null, types.late(() => herkunft_mutation_responseModel)),
    update_herkunft_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunftModel))),
    update_herkunft_file: types.union(types.undefined, types.null, types.late(() => herkunft_file_mutation_responseModel)),
    update_herkunft_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_fileModel))),
    update_herkunft_rev: types.union(types.undefined, types.null, types.late(() => herkunft_rev_mutation_responseModel)),
    update_herkunft_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_revModel))),
    update_kultur: types.union(types.undefined, types.null, types.late(() => kultur_mutation_responseModel)),
    update_kultur_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kulturModel))),
    update_kultur_file: types.union(types.undefined, types.null, types.late(() => kultur_file_mutation_responseModel)),
    update_kultur_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_fileModel))),
    update_kultur_option: types.union(types.undefined, types.null, types.late(() => kultur_option_mutation_responseModel)),
    update_kultur_option_rev: types.union(types.undefined, types.null, types.late(() => kultur_option_rev_mutation_responseModel)),
    update_kultur_option_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_option_revModel))),
    update_kultur_qk: types.union(types.undefined, types.null, types.late(() => kultur_qk_mutation_responseModel)),
    update_kultur_qk_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_qkModel))),
    update_kultur_qk_choosen: types.union(types.undefined, types.null, types.late(() => kultur_qk_choosen_mutation_responseModel)),
    update_kultur_rev: types.union(types.undefined, types.null, types.late(() => kultur_rev_mutation_responseModel)),
    update_kultur_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_revModel))),
    update_lieferung: types.union(types.undefined, types.null, types.late(() => lieferung_mutation_responseModel)),
    update_lieferung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferungModel))),
    update_lieferung_file: types.union(types.undefined, types.null, types.late(() => lieferung_file_mutation_responseModel)),
    update_lieferung_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_fileModel))),
    update_lieferung_rev: types.union(types.undefined, types.null, types.late(() => lieferung_rev_mutation_responseModel)),
    update_lieferung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_revModel))),
    update_person: types.union(types.undefined, types.null, types.late(() => person_mutation_responseModel)),
    update_person_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    update_person_file: types.union(types.undefined, types.null, types.late(() => person_file_mutation_responseModel)),
    update_person_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_fileModel))),
    update_person_option: types.union(types.undefined, types.null, types.late(() => person_option_mutation_responseModel)),
    update_person_option_rev: types.union(types.undefined, types.null, types.late(() => person_option_rev_mutation_responseModel)),
    update_person_option_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_option_revModel))),
    update_person_rev: types.union(types.undefined, types.null, types.late(() => person_rev_mutation_responseModel)),
    update_person_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_revModel))),
    update_sammel_lieferung: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_mutation_responseModel)),
    update_sammel_lieferung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferungModel))),
    update_sammel_lieferung_rev: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_rev_mutation_responseModel)),
    update_sammel_lieferung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferung_revModel))),
    update_sammlung: types.union(types.undefined, types.null, types.late(() => sammlung_mutation_responseModel)),
    update_sammlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlungModel))),
    update_sammlung_file: types.union(types.undefined, types.null, types.late(() => sammlung_file_mutation_responseModel)),
    update_sammlung_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_fileModel))),
    update_sammlung_rev: types.union(types.undefined, types.null, types.late(() => sammlung_rev_mutation_responseModel)),
    update_sammlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_revModel))),
    update_spatial_ref_sys: types.union(types.undefined, types.null, types.late(() => spatial_ref_sys_mutation_responseModel)),
    update_spatial_ref_sys_by_pk: types.union(types.undefined, types.null, types.late(() => spatial_ref_sysModel)),
    update_teilkultur: types.union(types.undefined, types.null, types.late(() => teilkultur_mutation_responseModel)),
    update_teilkultur_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkulturModel))),
    update_teilkultur_rev: types.union(types.undefined, types.null, types.late(() => teilkultur_rev_mutation_responseModel)),
    update_teilkultur_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkultur_revModel))),
    update_teilzaehlung: types.union(types.undefined, types.null, types.late(() => teilzaehlung_mutation_responseModel)),
    update_teilzaehlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlungModel))),
    update_teilzaehlung_rev: types.union(types.undefined, types.null, types.late(() => teilzaehlung_rev_mutation_responseModel)),
    update_teilzaehlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlung_revModel))),
    update_user_role: types.union(types.undefined, types.null, types.late(() => user_role_mutation_responseModel)),
    update_user_role_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => user_roleModel))),
    update_zaehlung: types.union(types.undefined, types.null, types.late(() => zaehlung_mutation_responseModel)),
    update_zaehlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlungModel))),
    update_zaehlung_rev: types.union(types.undefined, types.null, types.late(() => zaehlung_rev_mutation_responseModel)),
    update_zaehlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlung_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class mutation_rootModelSelector extends QueryBuilder {
  delete_ae_art(builder) { return this.__child(`delete_ae_art`, ae_art_mutation_responseModelSelector, builder) }
  delete_art(builder) { return this.__child(`delete_art`, art_mutation_responseModelSelector, builder) }
  delete_art_by_pk(builder) { return this.__child(`delete_art_by_pk`, artModelSelector, builder) }
  delete_art_file(builder) { return this.__child(`delete_art_file`, art_file_mutation_responseModelSelector, builder) }
  delete_art_file_by_pk(builder) { return this.__child(`delete_art_file_by_pk`, art_fileModelSelector, builder) }
  delete_art_qk(builder) { return this.__child(`delete_art_qk`, art_qk_mutation_responseModelSelector, builder) }
  delete_art_qk_by_pk(builder) { return this.__child(`delete_art_qk_by_pk`, art_qkModelSelector, builder) }
  delete_art_qk_choosen(builder) { return this.__child(`delete_art_qk_choosen`, art_qk_choosen_mutation_responseModelSelector, builder) }
  delete_art_rev(builder) { return this.__child(`delete_art_rev`, art_rev_mutation_responseModelSelector, builder) }
  delete_art_rev_by_pk(builder) { return this.__child(`delete_art_rev_by_pk`, art_revModelSelector, builder) }
  delete_av_art(builder) { return this.__child(`delete_av_art`, av_art_mutation_responseModelSelector, builder) }
  delete_av_art_by_pk(builder) { return this.__child(`delete_av_art_by_pk`, av_artModelSelector, builder) }
  delete_event(builder) { return this.__child(`delete_event`, event_mutation_responseModelSelector, builder) }
  delete_event_by_pk(builder) { return this.__child(`delete_event_by_pk`, eventModelSelector, builder) }
  delete_event_rev(builder) { return this.__child(`delete_event_rev`, event_rev_mutation_responseModelSelector, builder) }
  delete_event_rev_by_pk(builder) { return this.__child(`delete_event_rev_by_pk`, event_revModelSelector, builder) }
  delete_garten(builder) { return this.__child(`delete_garten`, garten_mutation_responseModelSelector, builder) }
  delete_garten_by_pk(builder) { return this.__child(`delete_garten_by_pk`, gartenModelSelector, builder) }
  delete_garten_file(builder) { return this.__child(`delete_garten_file`, garten_file_mutation_responseModelSelector, builder) }
  delete_garten_file_by_pk(builder) { return this.__child(`delete_garten_file_by_pk`, garten_fileModelSelector, builder) }
  delete_garten_rev(builder) { return this.__child(`delete_garten_rev`, garten_rev_mutation_responseModelSelector, builder) }
  delete_garten_rev_by_pk(builder) { return this.__child(`delete_garten_rev_by_pk`, garten_revModelSelector, builder) }
  delete_herkunft(builder) { return this.__child(`delete_herkunft`, herkunft_mutation_responseModelSelector, builder) }
  delete_herkunft_by_pk(builder) { return this.__child(`delete_herkunft_by_pk`, herkunftModelSelector, builder) }
  delete_herkunft_file(builder) { return this.__child(`delete_herkunft_file`, herkunft_file_mutation_responseModelSelector, builder) }
  delete_herkunft_file_by_pk(builder) { return this.__child(`delete_herkunft_file_by_pk`, herkunft_fileModelSelector, builder) }
  delete_herkunft_rev(builder) { return this.__child(`delete_herkunft_rev`, herkunft_rev_mutation_responseModelSelector, builder) }
  delete_herkunft_rev_by_pk(builder) { return this.__child(`delete_herkunft_rev_by_pk`, herkunft_revModelSelector, builder) }
  delete_kultur(builder) { return this.__child(`delete_kultur`, kultur_mutation_responseModelSelector, builder) }
  delete_kultur_by_pk(builder) { return this.__child(`delete_kultur_by_pk`, kulturModelSelector, builder) }
  delete_kultur_file(builder) { return this.__child(`delete_kultur_file`, kultur_file_mutation_responseModelSelector, builder) }
  delete_kultur_file_by_pk(builder) { return this.__child(`delete_kultur_file_by_pk`, kultur_fileModelSelector, builder) }
  delete_kultur_option(builder) { return this.__child(`delete_kultur_option`, kultur_option_mutation_responseModelSelector, builder) }
  delete_kultur_option_rev(builder) { return this.__child(`delete_kultur_option_rev`, kultur_option_rev_mutation_responseModelSelector, builder) }
  delete_kultur_option_rev_by_pk(builder) { return this.__child(`delete_kultur_option_rev_by_pk`, kultur_option_revModelSelector, builder) }
  delete_kultur_qk(builder) { return this.__child(`delete_kultur_qk`, kultur_qk_mutation_responseModelSelector, builder) }
  delete_kultur_qk_by_pk(builder) { return this.__child(`delete_kultur_qk_by_pk`, kultur_qkModelSelector, builder) }
  delete_kultur_qk_choosen(builder) { return this.__child(`delete_kultur_qk_choosen`, kultur_qk_choosen_mutation_responseModelSelector, builder) }
  delete_kultur_rev(builder) { return this.__child(`delete_kultur_rev`, kultur_rev_mutation_responseModelSelector, builder) }
  delete_kultur_rev_by_pk(builder) { return this.__child(`delete_kultur_rev_by_pk`, kultur_revModelSelector, builder) }
  delete_lieferung(builder) { return this.__child(`delete_lieferung`, lieferung_mutation_responseModelSelector, builder) }
  delete_lieferung_by_pk(builder) { return this.__child(`delete_lieferung_by_pk`, lieferungModelSelector, builder) }
  delete_lieferung_file(builder) { return this.__child(`delete_lieferung_file`, lieferung_file_mutation_responseModelSelector, builder) }
  delete_lieferung_file_by_pk(builder) { return this.__child(`delete_lieferung_file_by_pk`, lieferung_fileModelSelector, builder) }
  delete_lieferung_rev(builder) { return this.__child(`delete_lieferung_rev`, lieferung_rev_mutation_responseModelSelector, builder) }
  delete_lieferung_rev_by_pk(builder) { return this.__child(`delete_lieferung_rev_by_pk`, lieferung_revModelSelector, builder) }
  delete_person(builder) { return this.__child(`delete_person`, person_mutation_responseModelSelector, builder) }
  delete_person_by_pk(builder) { return this.__child(`delete_person_by_pk`, personModelSelector, builder) }
  delete_person_file(builder) { return this.__child(`delete_person_file`, person_file_mutation_responseModelSelector, builder) }
  delete_person_file_by_pk(builder) { return this.__child(`delete_person_file_by_pk`, person_fileModelSelector, builder) }
  delete_person_option(builder) { return this.__child(`delete_person_option`, person_option_mutation_responseModelSelector, builder) }
  delete_person_option_rev(builder) { return this.__child(`delete_person_option_rev`, person_option_rev_mutation_responseModelSelector, builder) }
  delete_person_option_rev_by_pk(builder) { return this.__child(`delete_person_option_rev_by_pk`, person_option_revModelSelector, builder) }
  delete_person_rev(builder) { return this.__child(`delete_person_rev`, person_rev_mutation_responseModelSelector, builder) }
  delete_person_rev_by_pk(builder) { return this.__child(`delete_person_rev_by_pk`, person_revModelSelector, builder) }
  delete_sammel_lieferung(builder) { return this.__child(`delete_sammel_lieferung`, sammel_lieferung_mutation_responseModelSelector, builder) }
  delete_sammel_lieferung_by_pk(builder) { return this.__child(`delete_sammel_lieferung_by_pk`, sammel_lieferungModelSelector, builder) }
  delete_sammel_lieferung_rev(builder) { return this.__child(`delete_sammel_lieferung_rev`, sammel_lieferung_rev_mutation_responseModelSelector, builder) }
  delete_sammel_lieferung_rev_by_pk(builder) { return this.__child(`delete_sammel_lieferung_rev_by_pk`, sammel_lieferung_revModelSelector, builder) }
  delete_sammlung(builder) { return this.__child(`delete_sammlung`, sammlung_mutation_responseModelSelector, builder) }
  delete_sammlung_by_pk(builder) { return this.__child(`delete_sammlung_by_pk`, sammlungModelSelector, builder) }
  delete_sammlung_file(builder) { return this.__child(`delete_sammlung_file`, sammlung_file_mutation_responseModelSelector, builder) }
  delete_sammlung_file_by_pk(builder) { return this.__child(`delete_sammlung_file_by_pk`, sammlung_fileModelSelector, builder) }
  delete_sammlung_rev(builder) { return this.__child(`delete_sammlung_rev`, sammlung_rev_mutation_responseModelSelector, builder) }
  delete_sammlung_rev_by_pk(builder) { return this.__child(`delete_sammlung_rev_by_pk`, sammlung_revModelSelector, builder) }
  delete_spatial_ref_sys(builder) { return this.__child(`delete_spatial_ref_sys`, spatial_ref_sys_mutation_responseModelSelector, builder) }
  delete_spatial_ref_sys_by_pk(builder) { return this.__child(`delete_spatial_ref_sys_by_pk`, spatial_ref_sysModelSelector, builder) }
  delete_teilkultur(builder) { return this.__child(`delete_teilkultur`, teilkultur_mutation_responseModelSelector, builder) }
  delete_teilkultur_by_pk(builder) { return this.__child(`delete_teilkultur_by_pk`, teilkulturModelSelector, builder) }
  delete_teilkultur_rev(builder) { return this.__child(`delete_teilkultur_rev`, teilkultur_rev_mutation_responseModelSelector, builder) }
  delete_teilkultur_rev_by_pk(builder) { return this.__child(`delete_teilkultur_rev_by_pk`, teilkultur_revModelSelector, builder) }
  delete_teilzaehlung(builder) { return this.__child(`delete_teilzaehlung`, teilzaehlung_mutation_responseModelSelector, builder) }
  delete_teilzaehlung_by_pk(builder) { return this.__child(`delete_teilzaehlung_by_pk`, teilzaehlungModelSelector, builder) }
  delete_teilzaehlung_rev(builder) { return this.__child(`delete_teilzaehlung_rev`, teilzaehlung_rev_mutation_responseModelSelector, builder) }
  delete_teilzaehlung_rev_by_pk(builder) { return this.__child(`delete_teilzaehlung_rev_by_pk`, teilzaehlung_revModelSelector, builder) }
  delete_user_role(builder) { return this.__child(`delete_user_role`, user_role_mutation_responseModelSelector, builder) }
  delete_user_role_by_pk(builder) { return this.__child(`delete_user_role_by_pk`, user_roleModelSelector, builder) }
  delete_zaehlung(builder) { return this.__child(`delete_zaehlung`, zaehlung_mutation_responseModelSelector, builder) }
  delete_zaehlung_by_pk(builder) { return this.__child(`delete_zaehlung_by_pk`, zaehlungModelSelector, builder) }
  delete_zaehlung_rev(builder) { return this.__child(`delete_zaehlung_rev`, zaehlung_rev_mutation_responseModelSelector, builder) }
  delete_zaehlung_rev_by_pk(builder) { return this.__child(`delete_zaehlung_rev_by_pk`, zaehlung_revModelSelector, builder) }
  insert_ae_art(builder) { return this.__child(`insert_ae_art`, ae_art_mutation_responseModelSelector, builder) }
  insert_ae_art_one(builder) { return this.__child(`insert_ae_art_one`, ae_artModelSelector, builder) }
  insert_art(builder) { return this.__child(`insert_art`, art_mutation_responseModelSelector, builder) }
  insert_art_file(builder) { return this.__child(`insert_art_file`, art_file_mutation_responseModelSelector, builder) }
  insert_art_file_one(builder) { return this.__child(`insert_art_file_one`, art_fileModelSelector, builder) }
  insert_art_one(builder) { return this.__child(`insert_art_one`, artModelSelector, builder) }
  insert_art_qk(builder) { return this.__child(`insert_art_qk`, art_qk_mutation_responseModelSelector, builder) }
  insert_art_qk_choosen(builder) { return this.__child(`insert_art_qk_choosen`, art_qk_choosen_mutation_responseModelSelector, builder) }
  insert_art_qk_choosen_one(builder) { return this.__child(`insert_art_qk_choosen_one`, art_qk_choosenModelSelector, builder) }
  insert_art_qk_one(builder) { return this.__child(`insert_art_qk_one`, art_qkModelSelector, builder) }
  insert_art_rev(builder) { return this.__child(`insert_art_rev`, art_rev_mutation_responseModelSelector, builder) }
  insert_art_rev_one(builder) { return this.__child(`insert_art_rev_one`, art_revModelSelector, builder) }
  insert_av_art(builder) { return this.__child(`insert_av_art`, av_art_mutation_responseModelSelector, builder) }
  insert_av_art_one(builder) { return this.__child(`insert_av_art_one`, av_artModelSelector, builder) }
  insert_event(builder) { return this.__child(`insert_event`, event_mutation_responseModelSelector, builder) }
  insert_event_one(builder) { return this.__child(`insert_event_one`, eventModelSelector, builder) }
  insert_event_rev(builder) { return this.__child(`insert_event_rev`, event_rev_mutation_responseModelSelector, builder) }
  insert_event_rev_one(builder) { return this.__child(`insert_event_rev_one`, event_revModelSelector, builder) }
  insert_garten(builder) { return this.__child(`insert_garten`, garten_mutation_responseModelSelector, builder) }
  insert_garten_file(builder) { return this.__child(`insert_garten_file`, garten_file_mutation_responseModelSelector, builder) }
  insert_garten_file_one(builder) { return this.__child(`insert_garten_file_one`, garten_fileModelSelector, builder) }
  insert_garten_one(builder) { return this.__child(`insert_garten_one`, gartenModelSelector, builder) }
  insert_garten_rev(builder) { return this.__child(`insert_garten_rev`, garten_rev_mutation_responseModelSelector, builder) }
  insert_garten_rev_one(builder) { return this.__child(`insert_garten_rev_one`, garten_revModelSelector, builder) }
  insert_herkunft(builder) { return this.__child(`insert_herkunft`, herkunft_mutation_responseModelSelector, builder) }
  insert_herkunft_file(builder) { return this.__child(`insert_herkunft_file`, herkunft_file_mutation_responseModelSelector, builder) }
  insert_herkunft_file_one(builder) { return this.__child(`insert_herkunft_file_one`, herkunft_fileModelSelector, builder) }
  insert_herkunft_one(builder) { return this.__child(`insert_herkunft_one`, herkunftModelSelector, builder) }
  insert_herkunft_rev(builder) { return this.__child(`insert_herkunft_rev`, herkunft_rev_mutation_responseModelSelector, builder) }
  insert_herkunft_rev_one(builder) { return this.__child(`insert_herkunft_rev_one`, herkunft_revModelSelector, builder) }
  insert_kultur(builder) { return this.__child(`insert_kultur`, kultur_mutation_responseModelSelector, builder) }
  insert_kultur_file(builder) { return this.__child(`insert_kultur_file`, kultur_file_mutation_responseModelSelector, builder) }
  insert_kultur_file_one(builder) { return this.__child(`insert_kultur_file_one`, kultur_fileModelSelector, builder) }
  insert_kultur_one(builder) { return this.__child(`insert_kultur_one`, kulturModelSelector, builder) }
  insert_kultur_option(builder) { return this.__child(`insert_kultur_option`, kultur_option_mutation_responseModelSelector, builder) }
  insert_kultur_option_one(builder) { return this.__child(`insert_kultur_option_one`, kultur_optionModelSelector, builder) }
  insert_kultur_option_rev(builder) { return this.__child(`insert_kultur_option_rev`, kultur_option_rev_mutation_responseModelSelector, builder) }
  insert_kultur_option_rev_one(builder) { return this.__child(`insert_kultur_option_rev_one`, kultur_option_revModelSelector, builder) }
  insert_kultur_qk(builder) { return this.__child(`insert_kultur_qk`, kultur_qk_mutation_responseModelSelector, builder) }
  insert_kultur_qk_choosen(builder) { return this.__child(`insert_kultur_qk_choosen`, kultur_qk_choosen_mutation_responseModelSelector, builder) }
  insert_kultur_qk_choosen_one(builder) { return this.__child(`insert_kultur_qk_choosen_one`, kultur_qk_choosenModelSelector, builder) }
  insert_kultur_qk_one(builder) { return this.__child(`insert_kultur_qk_one`, kultur_qkModelSelector, builder) }
  insert_kultur_rev(builder) { return this.__child(`insert_kultur_rev`, kultur_rev_mutation_responseModelSelector, builder) }
  insert_kultur_rev_one(builder) { return this.__child(`insert_kultur_rev_one`, kultur_revModelSelector, builder) }
  insert_lieferung(builder) { return this.__child(`insert_lieferung`, lieferung_mutation_responseModelSelector, builder) }
  insert_lieferung_file(builder) { return this.__child(`insert_lieferung_file`, lieferung_file_mutation_responseModelSelector, builder) }
  insert_lieferung_file_one(builder) { return this.__child(`insert_lieferung_file_one`, lieferung_fileModelSelector, builder) }
  insert_lieferung_one(builder) { return this.__child(`insert_lieferung_one`, lieferungModelSelector, builder) }
  insert_lieferung_rev(builder) { return this.__child(`insert_lieferung_rev`, lieferung_rev_mutation_responseModelSelector, builder) }
  insert_lieferung_rev_one(builder) { return this.__child(`insert_lieferung_rev_one`, lieferung_revModelSelector, builder) }
  insert_person(builder) { return this.__child(`insert_person`, person_mutation_responseModelSelector, builder) }
  insert_person_file(builder) { return this.__child(`insert_person_file`, person_file_mutation_responseModelSelector, builder) }
  insert_person_file_one(builder) { return this.__child(`insert_person_file_one`, person_fileModelSelector, builder) }
  insert_person_one(builder) { return this.__child(`insert_person_one`, personModelSelector, builder) }
  insert_person_option(builder) { return this.__child(`insert_person_option`, person_option_mutation_responseModelSelector, builder) }
  insert_person_option_one(builder) { return this.__child(`insert_person_option_one`, person_optionModelSelector, builder) }
  insert_person_option_rev(builder) { return this.__child(`insert_person_option_rev`, person_option_rev_mutation_responseModelSelector, builder) }
  insert_person_option_rev_one(builder) { return this.__child(`insert_person_option_rev_one`, person_option_revModelSelector, builder) }
  insert_person_rev(builder) { return this.__child(`insert_person_rev`, person_rev_mutation_responseModelSelector, builder) }
  insert_person_rev_one(builder) { return this.__child(`insert_person_rev_one`, person_revModelSelector, builder) }
  insert_sammel_lieferung(builder) { return this.__child(`insert_sammel_lieferung`, sammel_lieferung_mutation_responseModelSelector, builder) }
  insert_sammel_lieferung_one(builder) { return this.__child(`insert_sammel_lieferung_one`, sammel_lieferungModelSelector, builder) }
  insert_sammel_lieferung_rev(builder) { return this.__child(`insert_sammel_lieferung_rev`, sammel_lieferung_rev_mutation_responseModelSelector, builder) }
  insert_sammel_lieferung_rev_one(builder) { return this.__child(`insert_sammel_lieferung_rev_one`, sammel_lieferung_revModelSelector, builder) }
  insert_sammlung(builder) { return this.__child(`insert_sammlung`, sammlung_mutation_responseModelSelector, builder) }
  insert_sammlung_file(builder) { return this.__child(`insert_sammlung_file`, sammlung_file_mutation_responseModelSelector, builder) }
  insert_sammlung_file_one(builder) { return this.__child(`insert_sammlung_file_one`, sammlung_fileModelSelector, builder) }
  insert_sammlung_one(builder) { return this.__child(`insert_sammlung_one`, sammlungModelSelector, builder) }
  insert_sammlung_rev(builder) { return this.__child(`insert_sammlung_rev`, sammlung_rev_mutation_responseModelSelector, builder) }
  insert_sammlung_rev_one(builder) { return this.__child(`insert_sammlung_rev_one`, sammlung_revModelSelector, builder) }
  insert_spatial_ref_sys(builder) { return this.__child(`insert_spatial_ref_sys`, spatial_ref_sys_mutation_responseModelSelector, builder) }
  insert_spatial_ref_sys_one(builder) { return this.__child(`insert_spatial_ref_sys_one`, spatial_ref_sysModelSelector, builder) }
  insert_teilkultur(builder) { return this.__child(`insert_teilkultur`, teilkultur_mutation_responseModelSelector, builder) }
  insert_teilkultur_one(builder) { return this.__child(`insert_teilkultur_one`, teilkulturModelSelector, builder) }
  insert_teilkultur_rev(builder) { return this.__child(`insert_teilkultur_rev`, teilkultur_rev_mutation_responseModelSelector, builder) }
  insert_teilkultur_rev_one(builder) { return this.__child(`insert_teilkultur_rev_one`, teilkultur_revModelSelector, builder) }
  insert_teilzaehlung(builder) { return this.__child(`insert_teilzaehlung`, teilzaehlung_mutation_responseModelSelector, builder) }
  insert_teilzaehlung_one(builder) { return this.__child(`insert_teilzaehlung_one`, teilzaehlungModelSelector, builder) }
  insert_teilzaehlung_rev(builder) { return this.__child(`insert_teilzaehlung_rev`, teilzaehlung_rev_mutation_responseModelSelector, builder) }
  insert_teilzaehlung_rev_one(builder) { return this.__child(`insert_teilzaehlung_rev_one`, teilzaehlung_revModelSelector, builder) }
  insert_user_role(builder) { return this.__child(`insert_user_role`, user_role_mutation_responseModelSelector, builder) }
  insert_user_role_one(builder) { return this.__child(`insert_user_role_one`, user_roleModelSelector, builder) }
  insert_zaehlung(builder) { return this.__child(`insert_zaehlung`, zaehlung_mutation_responseModelSelector, builder) }
  insert_zaehlung_one(builder) { return this.__child(`insert_zaehlung_one`, zaehlungModelSelector, builder) }
  insert_zaehlung_rev(builder) { return this.__child(`insert_zaehlung_rev`, zaehlung_rev_mutation_responseModelSelector, builder) }
  insert_zaehlung_rev_one(builder) { return this.__child(`insert_zaehlung_rev_one`, zaehlung_revModelSelector, builder) }
  update_ae_art(builder) { return this.__child(`update_ae_art`, ae_art_mutation_responseModelSelector, builder) }
  update_art(builder) { return this.__child(`update_art`, art_mutation_responseModelSelector, builder) }
  update_art_by_pk(builder) { return this.__child(`update_art_by_pk`, artModelSelector, builder) }
  update_art_file(builder) { return this.__child(`update_art_file`, art_file_mutation_responseModelSelector, builder) }
  update_art_file_by_pk(builder) { return this.__child(`update_art_file_by_pk`, art_fileModelSelector, builder) }
  update_art_qk(builder) { return this.__child(`update_art_qk`, art_qk_mutation_responseModelSelector, builder) }
  update_art_qk_by_pk(builder) { return this.__child(`update_art_qk_by_pk`, art_qkModelSelector, builder) }
  update_art_qk_choosen(builder) { return this.__child(`update_art_qk_choosen`, art_qk_choosen_mutation_responseModelSelector, builder) }
  update_art_rev(builder) { return this.__child(`update_art_rev`, art_rev_mutation_responseModelSelector, builder) }
  update_art_rev_by_pk(builder) { return this.__child(`update_art_rev_by_pk`, art_revModelSelector, builder) }
  update_av_art(builder) { return this.__child(`update_av_art`, av_art_mutation_responseModelSelector, builder) }
  update_av_art_by_pk(builder) { return this.__child(`update_av_art_by_pk`, av_artModelSelector, builder) }
  update_event(builder) { return this.__child(`update_event`, event_mutation_responseModelSelector, builder) }
  update_event_by_pk(builder) { return this.__child(`update_event_by_pk`, eventModelSelector, builder) }
  update_event_rev(builder) { return this.__child(`update_event_rev`, event_rev_mutation_responseModelSelector, builder) }
  update_event_rev_by_pk(builder) { return this.__child(`update_event_rev_by_pk`, event_revModelSelector, builder) }
  update_garten(builder) { return this.__child(`update_garten`, garten_mutation_responseModelSelector, builder) }
  update_garten_by_pk(builder) { return this.__child(`update_garten_by_pk`, gartenModelSelector, builder) }
  update_garten_file(builder) { return this.__child(`update_garten_file`, garten_file_mutation_responseModelSelector, builder) }
  update_garten_file_by_pk(builder) { return this.__child(`update_garten_file_by_pk`, garten_fileModelSelector, builder) }
  update_garten_rev(builder) { return this.__child(`update_garten_rev`, garten_rev_mutation_responseModelSelector, builder) }
  update_garten_rev_by_pk(builder) { return this.__child(`update_garten_rev_by_pk`, garten_revModelSelector, builder) }
  update_herkunft(builder) { return this.__child(`update_herkunft`, herkunft_mutation_responseModelSelector, builder) }
  update_herkunft_by_pk(builder) { return this.__child(`update_herkunft_by_pk`, herkunftModelSelector, builder) }
  update_herkunft_file(builder) { return this.__child(`update_herkunft_file`, herkunft_file_mutation_responseModelSelector, builder) }
  update_herkunft_file_by_pk(builder) { return this.__child(`update_herkunft_file_by_pk`, herkunft_fileModelSelector, builder) }
  update_herkunft_rev(builder) { return this.__child(`update_herkunft_rev`, herkunft_rev_mutation_responseModelSelector, builder) }
  update_herkunft_rev_by_pk(builder) { return this.__child(`update_herkunft_rev_by_pk`, herkunft_revModelSelector, builder) }
  update_kultur(builder) { return this.__child(`update_kultur`, kultur_mutation_responseModelSelector, builder) }
  update_kultur_by_pk(builder) { return this.__child(`update_kultur_by_pk`, kulturModelSelector, builder) }
  update_kultur_file(builder) { return this.__child(`update_kultur_file`, kultur_file_mutation_responseModelSelector, builder) }
  update_kultur_file_by_pk(builder) { return this.__child(`update_kultur_file_by_pk`, kultur_fileModelSelector, builder) }
  update_kultur_option(builder) { return this.__child(`update_kultur_option`, kultur_option_mutation_responseModelSelector, builder) }
  update_kultur_option_rev(builder) { return this.__child(`update_kultur_option_rev`, kultur_option_rev_mutation_responseModelSelector, builder) }
  update_kultur_option_rev_by_pk(builder) { return this.__child(`update_kultur_option_rev_by_pk`, kultur_option_revModelSelector, builder) }
  update_kultur_qk(builder) { return this.__child(`update_kultur_qk`, kultur_qk_mutation_responseModelSelector, builder) }
  update_kultur_qk_by_pk(builder) { return this.__child(`update_kultur_qk_by_pk`, kultur_qkModelSelector, builder) }
  update_kultur_qk_choosen(builder) { return this.__child(`update_kultur_qk_choosen`, kultur_qk_choosen_mutation_responseModelSelector, builder) }
  update_kultur_rev(builder) { return this.__child(`update_kultur_rev`, kultur_rev_mutation_responseModelSelector, builder) }
  update_kultur_rev_by_pk(builder) { return this.__child(`update_kultur_rev_by_pk`, kultur_revModelSelector, builder) }
  update_lieferung(builder) { return this.__child(`update_lieferung`, lieferung_mutation_responseModelSelector, builder) }
  update_lieferung_by_pk(builder) { return this.__child(`update_lieferung_by_pk`, lieferungModelSelector, builder) }
  update_lieferung_file(builder) { return this.__child(`update_lieferung_file`, lieferung_file_mutation_responseModelSelector, builder) }
  update_lieferung_file_by_pk(builder) { return this.__child(`update_lieferung_file_by_pk`, lieferung_fileModelSelector, builder) }
  update_lieferung_rev(builder) { return this.__child(`update_lieferung_rev`, lieferung_rev_mutation_responseModelSelector, builder) }
  update_lieferung_rev_by_pk(builder) { return this.__child(`update_lieferung_rev_by_pk`, lieferung_revModelSelector, builder) }
  update_person(builder) { return this.__child(`update_person`, person_mutation_responseModelSelector, builder) }
  update_person_by_pk(builder) { return this.__child(`update_person_by_pk`, personModelSelector, builder) }
  update_person_file(builder) { return this.__child(`update_person_file`, person_file_mutation_responseModelSelector, builder) }
  update_person_file_by_pk(builder) { return this.__child(`update_person_file_by_pk`, person_fileModelSelector, builder) }
  update_person_option(builder) { return this.__child(`update_person_option`, person_option_mutation_responseModelSelector, builder) }
  update_person_option_rev(builder) { return this.__child(`update_person_option_rev`, person_option_rev_mutation_responseModelSelector, builder) }
  update_person_option_rev_by_pk(builder) { return this.__child(`update_person_option_rev_by_pk`, person_option_revModelSelector, builder) }
  update_person_rev(builder) { return this.__child(`update_person_rev`, person_rev_mutation_responseModelSelector, builder) }
  update_person_rev_by_pk(builder) { return this.__child(`update_person_rev_by_pk`, person_revModelSelector, builder) }
  update_sammel_lieferung(builder) { return this.__child(`update_sammel_lieferung`, sammel_lieferung_mutation_responseModelSelector, builder) }
  update_sammel_lieferung_by_pk(builder) { return this.__child(`update_sammel_lieferung_by_pk`, sammel_lieferungModelSelector, builder) }
  update_sammel_lieferung_rev(builder) { return this.__child(`update_sammel_lieferung_rev`, sammel_lieferung_rev_mutation_responseModelSelector, builder) }
  update_sammel_lieferung_rev_by_pk(builder) { return this.__child(`update_sammel_lieferung_rev_by_pk`, sammel_lieferung_revModelSelector, builder) }
  update_sammlung(builder) { return this.__child(`update_sammlung`, sammlung_mutation_responseModelSelector, builder) }
  update_sammlung_by_pk(builder) { return this.__child(`update_sammlung_by_pk`, sammlungModelSelector, builder) }
  update_sammlung_file(builder) { return this.__child(`update_sammlung_file`, sammlung_file_mutation_responseModelSelector, builder) }
  update_sammlung_file_by_pk(builder) { return this.__child(`update_sammlung_file_by_pk`, sammlung_fileModelSelector, builder) }
  update_sammlung_rev(builder) { return this.__child(`update_sammlung_rev`, sammlung_rev_mutation_responseModelSelector, builder) }
  update_sammlung_rev_by_pk(builder) { return this.__child(`update_sammlung_rev_by_pk`, sammlung_revModelSelector, builder) }
  update_spatial_ref_sys(builder) { return this.__child(`update_spatial_ref_sys`, spatial_ref_sys_mutation_responseModelSelector, builder) }
  update_spatial_ref_sys_by_pk(builder) { return this.__child(`update_spatial_ref_sys_by_pk`, spatial_ref_sysModelSelector, builder) }
  update_teilkultur(builder) { return this.__child(`update_teilkultur`, teilkultur_mutation_responseModelSelector, builder) }
  update_teilkultur_by_pk(builder) { return this.__child(`update_teilkultur_by_pk`, teilkulturModelSelector, builder) }
  update_teilkultur_rev(builder) { return this.__child(`update_teilkultur_rev`, teilkultur_rev_mutation_responseModelSelector, builder) }
  update_teilkultur_rev_by_pk(builder) { return this.__child(`update_teilkultur_rev_by_pk`, teilkultur_revModelSelector, builder) }
  update_teilzaehlung(builder) { return this.__child(`update_teilzaehlung`, teilzaehlung_mutation_responseModelSelector, builder) }
  update_teilzaehlung_by_pk(builder) { return this.__child(`update_teilzaehlung_by_pk`, teilzaehlungModelSelector, builder) }
  update_teilzaehlung_rev(builder) { return this.__child(`update_teilzaehlung_rev`, teilzaehlung_rev_mutation_responseModelSelector, builder) }
  update_teilzaehlung_rev_by_pk(builder) { return this.__child(`update_teilzaehlung_rev_by_pk`, teilzaehlung_revModelSelector, builder) }
  update_user_role(builder) { return this.__child(`update_user_role`, user_role_mutation_responseModelSelector, builder) }
  update_user_role_by_pk(builder) { return this.__child(`update_user_role_by_pk`, user_roleModelSelector, builder) }
  update_zaehlung(builder) { return this.__child(`update_zaehlung`, zaehlung_mutation_responseModelSelector, builder) }
  update_zaehlung_by_pk(builder) { return this.__child(`update_zaehlung_by_pk`, zaehlungModelSelector, builder) }
  update_zaehlung_rev(builder) { return this.__child(`update_zaehlung_rev`, zaehlung_rev_mutation_responseModelSelector, builder) }
  update_zaehlung_rev_by_pk(builder) { return this.__child(`update_zaehlung_rev_by_pk`, zaehlung_revModelSelector, builder) }
}
export function selectFrommutation_root() {
  return new mutation_rootModelSelector()
}

export const mutation_rootModelPrimitives = selectFrommutation_root()
