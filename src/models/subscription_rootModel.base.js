/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelSelector } from "./ae_artModel.base"
import { ae_art_aggregateModel } from "./ae_art_aggregateModel"
import { ae_art_aggregateModelSelector } from "./ae_art_aggregateModel.base"
import { artModel } from "./artModel"
import { artModelSelector } from "./artModel.base"
import { art_aggregateModel } from "./art_aggregateModel"
import { art_aggregateModelSelector } from "./art_aggregateModel.base"
import { art_fileModel } from "./art_fileModel"
import { art_fileModelSelector } from "./art_fileModel.base"
import { art_file_aggregateModel } from "./art_file_aggregateModel"
import { art_file_aggregateModelSelector } from "./art_file_aggregateModel.base"
import { art_qkModel } from "./art_qkModel"
import { art_qkModelSelector } from "./art_qkModel.base"
import { art_qk_aggregateModel } from "./art_qk_aggregateModel"
import { art_qk_aggregateModelSelector } from "./art_qk_aggregateModel.base"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { art_qk_choosen_aggregateModel } from "./art_qk_choosen_aggregateModel"
import { art_qk_choosen_aggregateModelSelector } from "./art_qk_choosen_aggregateModel.base"
import { art_revModel } from "./art_revModel"
import { art_revModelSelector } from "./art_revModel.base"
import { art_rev_aggregateModel } from "./art_rev_aggregateModel"
import { art_rev_aggregateModelSelector } from "./art_rev_aggregateModel.base"
import { art_sumsModel } from "./art_sumsModel"
import { art_sumsModelSelector } from "./art_sumsModel.base"
import { art_sums_aggregateModel } from "./art_sums_aggregateModel"
import { art_sums_aggregateModelSelector } from "./art_sums_aggregateModel.base"
import { av_artModel } from "./av_artModel"
import { av_artModelSelector } from "./av_artModel.base"
import { av_art_aggregateModel } from "./av_art_aggregateModel"
import { av_art_aggregateModelSelector } from "./av_art_aggregateModel.base"
import { eventModel } from "./eventModel"
import { eventModelSelector } from "./eventModel.base"
import { event_aggregateModel } from "./event_aggregateModel"
import { event_aggregateModelSelector } from "./event_aggregateModel.base"
import { event_revModel } from "./event_revModel"
import { event_revModelSelector } from "./event_revModel.base"
import { event_rev_aggregateModel } from "./event_rev_aggregateModel"
import { event_rev_aggregateModelSelector } from "./event_rev_aggregateModel.base"
import { gartenModel } from "./gartenModel"
import { gartenModelSelector } from "./gartenModel.base"
import { garten_aggregateModel } from "./garten_aggregateModel"
import { garten_aggregateModelSelector } from "./garten_aggregateModel.base"
import { garten_fileModel } from "./garten_fileModel"
import { garten_fileModelSelector } from "./garten_fileModel.base"
import { garten_file_aggregateModel } from "./garten_file_aggregateModel"
import { garten_file_aggregateModelSelector } from "./garten_file_aggregateModel.base"
import { garten_revModel } from "./garten_revModel"
import { garten_revModelSelector } from "./garten_revModel.base"
import { garten_rev_aggregateModel } from "./garten_rev_aggregateModel"
import { garten_rev_aggregateModelSelector } from "./garten_rev_aggregateModel.base"
import { garten_teilzaehlung_sumsModel } from "./garten_teilzaehlung_sumsModel"
import { garten_teilzaehlung_sumsModelSelector } from "./garten_teilzaehlung_sumsModel.base"
import { garten_teilzaehlung_sums_aggregateModel } from "./garten_teilzaehlung_sums_aggregateModel"
import { garten_teilzaehlung_sums_aggregateModelSelector } from "./garten_teilzaehlung_sums_aggregateModel.base"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelSelector } from "./herkunftModel.base"
import { herkunft_aggregateModel } from "./herkunft_aggregateModel"
import { herkunft_aggregateModelSelector } from "./herkunft_aggregateModel.base"
import { herkunft_fileModel } from "./herkunft_fileModel"
import { herkunft_fileModelSelector } from "./herkunft_fileModel.base"
import { herkunft_file_aggregateModel } from "./herkunft_file_aggregateModel"
import { herkunft_file_aggregateModelSelector } from "./herkunft_file_aggregateModel.base"
import { herkunft_revModel } from "./herkunft_revModel"
import { herkunft_revModelSelector } from "./herkunft_revModel.base"
import { herkunft_rev_aggregateModel } from "./herkunft_rev_aggregateModel"
import { herkunft_rev_aggregateModelSelector } from "./herkunft_rev_aggregateModel.base"
import { herkunft_sumsModel } from "./herkunft_sumsModel"
import { herkunft_sumsModelSelector } from "./herkunft_sumsModel.base"
import { herkunft_sums_aggregateModel } from "./herkunft_sums_aggregateModel"
import { herkunft_sums_aggregateModelSelector } from "./herkunft_sums_aggregateModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelSelector } from "./kulturModel.base"
import { kultur_aggregateModel } from "./kultur_aggregateModel"
import { kultur_aggregateModelSelector } from "./kultur_aggregateModel.base"
import { kultur_fileModel } from "./kultur_fileModel"
import { kultur_fileModelSelector } from "./kultur_fileModel.base"
import { kultur_file_aggregateModel } from "./kultur_file_aggregateModel"
import { kultur_file_aggregateModelSelector } from "./kultur_file_aggregateModel.base"
import { kultur_optionModel } from "./kultur_optionModel"
import { kultur_optionModelSelector } from "./kultur_optionModel.base"
import { kultur_option_aggregateModel } from "./kultur_option_aggregateModel"
import { kultur_option_aggregateModelSelector } from "./kultur_option_aggregateModel.base"
import { kultur_option_revModel } from "./kultur_option_revModel"
import { kultur_option_revModelSelector } from "./kultur_option_revModel.base"
import { kultur_option_rev_aggregateModel } from "./kultur_option_rev_aggregateModel"
import { kultur_option_rev_aggregateModelSelector } from "./kultur_option_rev_aggregateModel.base"
import { kultur_qkModel } from "./kultur_qkModel"
import { kultur_qkModelSelector } from "./kultur_qkModel.base"
import { kultur_qk_aggregateModel } from "./kultur_qk_aggregateModel"
import { kultur_qk_aggregateModelSelector } from "./kultur_qk_aggregateModel.base"
import { kultur_qk_choosenModel } from "./kultur_qk_choosenModel"
import { kultur_qk_choosenModelSelector } from "./kultur_qk_choosenModel.base"
import { kultur_qk_choosen_aggregateModel } from "./kultur_qk_choosen_aggregateModel"
import { kultur_qk_choosen_aggregateModelSelector } from "./kultur_qk_choosen_aggregateModel.base"
import { kultur_revModel } from "./kultur_revModel"
import { kultur_revModelSelector } from "./kultur_revModel.base"
import { kultur_rev_aggregateModel } from "./kultur_rev_aggregateModel"
import { kultur_rev_aggregateModelSelector } from "./kultur_rev_aggregateModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_aggregateModel } from "./lieferung_aggregateModel"
import { lieferung_aggregateModelSelector } from "./lieferung_aggregateModel.base"
import { lieferung_fileModel } from "./lieferung_fileModel"
import { lieferung_fileModelSelector } from "./lieferung_fileModel.base"
import { lieferung_file_aggregateModel } from "./lieferung_file_aggregateModel"
import { lieferung_file_aggregateModelSelector } from "./lieferung_file_aggregateModel.base"
import { lieferung_revModel } from "./lieferung_revModel"
import { lieferung_revModelSelector } from "./lieferung_revModel.base"
import { lieferung_rev_aggregateModel } from "./lieferung_rev_aggregateModel"
import { lieferung_rev_aggregateModelSelector } from "./lieferung_rev_aggregateModel.base"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"
import { person_aggregateModel } from "./person_aggregateModel"
import { person_aggregateModelSelector } from "./person_aggregateModel.base"
import { person_fileModel } from "./person_fileModel"
import { person_fileModelSelector } from "./person_fileModel.base"
import { person_file_aggregateModel } from "./person_file_aggregateModel"
import { person_file_aggregateModelSelector } from "./person_file_aggregateModel.base"
import { person_optionModel } from "./person_optionModel"
import { person_optionModelSelector } from "./person_optionModel.base"
import { person_option_aggregateModel } from "./person_option_aggregateModel"
import { person_option_aggregateModelSelector } from "./person_option_aggregateModel.base"
import { person_option_revModel } from "./person_option_revModel"
import { person_option_revModelSelector } from "./person_option_revModel.base"
import { person_option_rev_aggregateModel } from "./person_option_rev_aggregateModel"
import { person_option_rev_aggregateModelSelector } from "./person_option_rev_aggregateModel.base"
import { person_revModel } from "./person_revModel"
import { person_revModelSelector } from "./person_revModel.base"
import { person_rev_aggregateModel } from "./person_rev_aggregateModel"
import { person_rev_aggregateModelSelector } from "./person_rev_aggregateModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_aggregateModel } from "./sammel_lieferung_aggregateModel"
import { sammel_lieferung_aggregateModelSelector } from "./sammel_lieferung_aggregateModel.base"
import { sammel_lieferung_revModel } from "./sammel_lieferung_revModel"
import { sammel_lieferung_revModelSelector } from "./sammel_lieferung_revModel.base"
import { sammel_lieferung_rev_aggregateModel } from "./sammel_lieferung_rev_aggregateModel"
import { sammel_lieferung_rev_aggregateModelSelector } from "./sammel_lieferung_rev_aggregateModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelSelector } from "./sammlungModel.base"
import { sammlung_aggregateModel } from "./sammlung_aggregateModel"
import { sammlung_aggregateModelSelector } from "./sammlung_aggregateModel.base"
import { sammlung_fileModel } from "./sammlung_fileModel"
import { sammlung_fileModelSelector } from "./sammlung_fileModel.base"
import { sammlung_file_aggregateModel } from "./sammlung_file_aggregateModel"
import { sammlung_file_aggregateModelSelector } from "./sammlung_file_aggregateModel.base"
import { sammlung_revModel } from "./sammlung_revModel"
import { sammlung_revModelSelector } from "./sammlung_revModel.base"
import { sammlung_rev_aggregateModel } from "./sammlung_rev_aggregateModel"
import { sammlung_rev_aggregateModelSelector } from "./sammlung_rev_aggregateModel.base"
import { spatial_ref_sysModel } from "./spatial_ref_sysModel"
import { spatial_ref_sysModelSelector } from "./spatial_ref_sysModel.base"
import { spatial_ref_sys_aggregateModel } from "./spatial_ref_sys_aggregateModel"
import { spatial_ref_sys_aggregateModelSelector } from "./spatial_ref_sys_aggregateModel.base"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelSelector } from "./teilkulturModel.base"
import { teilkultur_aggregateModel } from "./teilkultur_aggregateModel"
import { teilkultur_aggregateModelSelector } from "./teilkultur_aggregateModel.base"
import { teilkultur_revModel } from "./teilkultur_revModel"
import { teilkultur_revModelSelector } from "./teilkultur_revModel.base"
import { teilkultur_rev_aggregateModel } from "./teilkultur_rev_aggregateModel"
import { teilkultur_rev_aggregateModelSelector } from "./teilkultur_rev_aggregateModel.base"
import { teilzaehlungModel } from "./teilzaehlungModel"
import { teilzaehlungModelSelector } from "./teilzaehlungModel.base"
import { teilzaehlung_aggregateModel } from "./teilzaehlung_aggregateModel"
import { teilzaehlung_aggregateModelSelector } from "./teilzaehlung_aggregateModel.base"
import { teilzaehlung_revModel } from "./teilzaehlung_revModel"
import { teilzaehlung_revModelSelector } from "./teilzaehlung_revModel.base"
import { teilzaehlung_rev_aggregateModel } from "./teilzaehlung_rev_aggregateModel"
import { teilzaehlung_rev_aggregateModelSelector } from "./teilzaehlung_rev_aggregateModel.base"
import { user_roleModel } from "./user_roleModel"
import { user_roleModelSelector } from "./user_roleModel.base"
import { user_role_aggregateModel } from "./user_role_aggregateModel"
import { user_role_aggregateModelSelector } from "./user_role_aggregateModel.base"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelSelector } from "./zaehlungModel.base"
import { zaehlung_aggregateModel } from "./zaehlung_aggregateModel"
import { zaehlung_aggregateModelSelector } from "./zaehlung_aggregateModel.base"
import { zaehlung_revModel } from "./zaehlung_revModel"
import { zaehlung_revModelSelector } from "./zaehlung_revModel.base"
import { zaehlung_rev_aggregateModel } from "./zaehlung_rev_aggregateModel"
import { zaehlung_rev_aggregateModelSelector } from "./zaehlung_rev_aggregateModel.base"


/**
 * subscription_rootBase
 * auto generated base class for the model subscription_rootModel.
 */
export const subscription_rootModelBase = ModelBase
  .named('subscription_root')
  .props({
    __typename: types.optional(types.literal("subscription_root"), "subscription_root"),
    ae_art: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => ae_artModel)))),
    ae_art_aggregate: types.union(types.undefined, types.late(() => ae_art_aggregateModel)),
    art: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => artModel)))),
    art_aggregate: types.union(types.undefined, types.late(() => art_aggregateModel)),
    art_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => artModel))),
    art_file: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_fileModel)))),
    art_file_aggregate: types.union(types.undefined, types.late(() => art_file_aggregateModel)),
    art_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_fileModel))),
    art_qk: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qkModel)))),
    art_qk_aggregate: types.union(types.undefined, types.late(() => art_qk_aggregateModel)),
    art_qk_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_qkModel))),
    art_qk_choosen: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_qk_choosenModel)))),
    art_qk_choosen_aggregate: types.union(types.undefined, types.late(() => art_qk_choosen_aggregateModel)),
    art_qk_choosen_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_qk_choosenModel))),
    art_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_revModel)))),
    art_rev_aggregate: types.union(types.undefined, types.late(() => art_rev_aggregateModel)),
    art_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => art_revModel))),
    art_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => artModel)))),
    art_search_aggregate: types.union(types.undefined, types.late(() => art_aggregateModel)),
    art_sums: types.union(types.undefined, types.array(types.late(() => art_sumsModel))),
    art_sums_aggregate: types.union(types.undefined, types.late(() => art_sums_aggregateModel)),
    av_art: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => av_artModel)))),
    av_art_aggregate: types.union(types.undefined, types.late(() => av_art_aggregateModel)),
    av_art_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => av_artModel))),
    event: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
    event_aggregate: types.union(types.undefined, types.late(() => event_aggregateModel)),
    event_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => eventModel))),
    event_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => event_revModel)))),
    event_rev_aggregate: types.union(types.undefined, types.late(() => event_rev_aggregateModel)),
    event_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => event_revModel))),
    event_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => eventModel)))),
    event_search_aggregate: types.union(types.undefined, types.late(() => event_aggregateModel)),
    garten: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gartenModel)))),
    garten_aggregate: types.union(types.undefined, types.late(() => garten_aggregateModel)),
    garten_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => gartenModel))),
    garten_file: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => garten_fileModel)))),
    garten_file_aggregate: types.union(types.undefined, types.late(() => garten_file_aggregateModel)),
    garten_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_fileModel))),
    garten_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => garten_revModel)))),
    garten_rev_aggregate: types.union(types.undefined, types.late(() => garten_rev_aggregateModel)),
    garten_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => garten_revModel))),
    garten_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => gartenModel)))),
    garten_search_aggregate: types.union(types.undefined, types.late(() => garten_aggregateModel)),
    garten_teilzaehlung_sums: types.union(types.undefined, types.array(types.late(() => garten_teilzaehlung_sumsModel))),
    garten_teilzaehlung_sums_aggregate: types.union(types.undefined, types.late(() => garten_teilzaehlung_sums_aggregateModel)),
    herkunft: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunftModel)))),
    herkunft_aggregate: types.union(types.undefined, types.late(() => herkunft_aggregateModel)),
    herkunft_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunftModel))),
    herkunft_file: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunft_fileModel)))),
    herkunft_file_aggregate: types.union(types.undefined, types.late(() => herkunft_file_aggregateModel)),
    herkunft_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_fileModel))),
    herkunft_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunft_revModel)))),
    herkunft_rev_aggregate: types.union(types.undefined, types.late(() => herkunft_rev_aggregateModel)),
    herkunft_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => herkunft_revModel))),
    herkunft_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => herkunftModel)))),
    herkunft_search_aggregate: types.union(types.undefined, types.late(() => herkunft_aggregateModel)),
    herkunft_sums: types.union(types.undefined, types.array(types.late(() => herkunft_sumsModel))),
    herkunft_sums_aggregate: types.union(types.undefined, types.late(() => herkunft_sums_aggregateModel)),
    kultur: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
    kultur_aggregate: types.union(types.undefined, types.late(() => kultur_aggregateModel)),
    kultur_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kulturModel))),
    kultur_file: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_fileModel)))),
    kultur_file_aggregate: types.union(types.undefined, types.late(() => kultur_file_aggregateModel)),
    kultur_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_fileModel))),
    kultur_option: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_optionModel)))),
    kultur_option_aggregate: types.union(types.undefined, types.late(() => kultur_option_aggregateModel)),
    kultur_option_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_option_revModel)))),
    kultur_option_rev_aggregate: types.union(types.undefined, types.late(() => kultur_option_rev_aggregateModel)),
    kultur_option_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_option_revModel))),
    kultur_qk: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_qkModel)))),
    kultur_qk_aggregate: types.union(types.undefined, types.late(() => kultur_qk_aggregateModel)),
    kultur_qk_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_qkModel))),
    kultur_qk_choosen: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_qk_choosenModel)))),
    kultur_qk_choosen_aggregate: types.union(types.undefined, types.late(() => kultur_qk_choosen_aggregateModel)),
    kultur_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_revModel)))),
    kultur_rev_aggregate: types.union(types.undefined, types.late(() => kultur_rev_aggregateModel)),
    kultur_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => kultur_revModel))),
    kultur_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kulturModel)))),
    kultur_search_aggregate: types.union(types.undefined, types.late(() => kultur_aggregateModel)),
    lieferung: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    lieferung_aggregate: types.union(types.undefined, types.late(() => lieferung_aggregateModel)),
    lieferung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferungModel))),
    lieferung_file: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_fileModel)))),
    lieferung_file_aggregate: types.union(types.undefined, types.late(() => lieferung_file_aggregateModel)),
    lieferung_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_fileModel))),
    lieferung_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferung_revModel)))),
    lieferung_rev_aggregate: types.union(types.undefined, types.late(() => lieferung_rev_aggregateModel)),
    lieferung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => lieferung_revModel))),
    lieferung_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => lieferungModel)))),
    lieferung_search_aggregate: types.union(types.undefined, types.late(() => lieferung_aggregateModel)),
    person: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => personModel)))),
    person_aggregate: types.union(types.undefined, types.late(() => person_aggregateModel)),
    person_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => personModel))),
    person_file: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_fileModel)))),
    person_file_aggregate: types.union(types.undefined, types.late(() => person_file_aggregateModel)),
    person_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_fileModel))),
    person_option: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_optionModel)))),
    person_option_aggregate: types.union(types.undefined, types.late(() => person_option_aggregateModel)),
    person_option_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_option_revModel)))),
    person_option_rev_aggregate: types.union(types.undefined, types.late(() => person_option_rev_aggregateModel)),
    person_option_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_option_revModel))),
    person_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_revModel)))),
    person_rev_aggregate: types.union(types.undefined, types.late(() => person_rev_aggregateModel)),
    person_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => person_revModel))),
    person_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => personModel)))),
    person_search_aggregate: types.union(types.undefined, types.late(() => person_aggregateModel)),
    sammel_lieferung: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
    sammel_lieferung_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_aggregateModel)),
    sammel_lieferung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferungModel))),
    sammel_lieferung_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferung_revModel)))),
    sammel_lieferung_rev_aggregate: types.union(types.undefined, types.late(() => sammel_lieferung_rev_aggregateModel)),
    sammel_lieferung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammel_lieferung_revModel))),
    sammlung: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    sammlung_aggregate: types.union(types.undefined, types.late(() => sammlung_aggregateModel)),
    sammlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlungModel))),
    sammlung_file: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlung_fileModel)))),
    sammlung_file_aggregate: types.union(types.undefined, types.late(() => sammlung_file_aggregateModel)),
    sammlung_file_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_fileModel))),
    sammlung_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlung_revModel)))),
    sammlung_rev_aggregate: types.union(types.undefined, types.late(() => sammlung_rev_aggregateModel)),
    sammlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => sammlung_revModel))),
    sammlung_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlungModel)))),
    sammlung_search_aggregate: types.union(types.undefined, types.late(() => sammlung_aggregateModel)),
    spatial_ref_sys: types.union(types.undefined, types.array(types.late(() => spatial_ref_sysModel))),
    spatial_ref_sys_aggregate: types.union(types.undefined, types.late(() => spatial_ref_sys_aggregateModel)),
    spatial_ref_sys_by_pk: types.union(types.undefined, types.null, types.late(() => spatial_ref_sysModel)),
    teilkultur: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkulturModel)))),
    teilkultur_aggregate: types.union(types.undefined, types.late(() => teilkultur_aggregateModel)),
    teilkultur_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkulturModel))),
    teilkultur_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkultur_revModel)))),
    teilkultur_rev_aggregate: types.union(types.undefined, types.late(() => teilkultur_rev_aggregateModel)),
    teilkultur_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilkultur_revModel))),
    teilkultur_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkulturModel)))),
    teilkultur_search_aggregate: types.union(types.undefined, types.late(() => teilkultur_aggregateModel)),
    teilzaehlung: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilzaehlungModel)))),
    teilzaehlung_aggregate: types.union(types.undefined, types.late(() => teilzaehlung_aggregateModel)),
    teilzaehlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlungModel))),
    teilzaehlung_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilzaehlung_revModel)))),
    teilzaehlung_rev_aggregate: types.union(types.undefined, types.late(() => teilzaehlung_rev_aggregateModel)),
    teilzaehlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => teilzaehlung_revModel))),
    user_role: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => user_roleModel)))),
    user_role_aggregate: types.union(types.undefined, types.late(() => user_role_aggregateModel)),
    user_role_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => user_roleModel))),
    zaehlung: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => zaehlungModel)))),
    zaehlung_aggregate: types.union(types.undefined, types.late(() => zaehlung_aggregateModel)),
    zaehlung_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlungModel))),
    zaehlung_rev: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => zaehlung_revModel)))),
    zaehlung_rev_aggregate: types.union(types.undefined, types.late(() => zaehlung_rev_aggregateModel)),
    zaehlung_rev_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => zaehlung_revModel))),
    zaehlung_search: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => zaehlungModel)))),
    zaehlung_search_aggregate: types.union(types.undefined, types.late(() => zaehlung_aggregateModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class subscription_rootModelSelector extends QueryBuilder {
  ae_art(builder) { return this.__child(`ae_art`, ae_artModelSelector, builder) }
  ae_art_aggregate(builder) { return this.__child(`ae_art_aggregate`, ae_art_aggregateModelSelector, builder) }
  art(builder) { return this.__child(`art`, artModelSelector, builder) }
  art_aggregate(builder) { return this.__child(`art_aggregate`, art_aggregateModelSelector, builder) }
  art_by_pk(builder) { return this.__child(`art_by_pk`, artModelSelector, builder) }
  art_file(builder) { return this.__child(`art_file`, art_fileModelSelector, builder) }
  art_file_aggregate(builder) { return this.__child(`art_file_aggregate`, art_file_aggregateModelSelector, builder) }
  art_file_by_pk(builder) { return this.__child(`art_file_by_pk`, art_fileModelSelector, builder) }
  art_qk(builder) { return this.__child(`art_qk`, art_qkModelSelector, builder) }
  art_qk_aggregate(builder) { return this.__child(`art_qk_aggregate`, art_qk_aggregateModelSelector, builder) }
  art_qk_by_pk(builder) { return this.__child(`art_qk_by_pk`, art_qkModelSelector, builder) }
  art_qk_choosen(builder) { return this.__child(`art_qk_choosen`, art_qk_choosenModelSelector, builder) }
  art_qk_choosen_aggregate(builder) { return this.__child(`art_qk_choosen_aggregate`, art_qk_choosen_aggregateModelSelector, builder) }
  art_qk_choosen_by_pk(builder) { return this.__child(`art_qk_choosen_by_pk`, art_qk_choosenModelSelector, builder) }
  art_rev(builder) { return this.__child(`art_rev`, art_revModelSelector, builder) }
  art_rev_aggregate(builder) { return this.__child(`art_rev_aggregate`, art_rev_aggregateModelSelector, builder) }
  art_rev_by_pk(builder) { return this.__child(`art_rev_by_pk`, art_revModelSelector, builder) }
  art_search(builder) { return this.__child(`art_search`, artModelSelector, builder) }
  art_search_aggregate(builder) { return this.__child(`art_search_aggregate`, art_aggregateModelSelector, builder) }
  art_sums(builder) { return this.__child(`art_sums`, art_sumsModelSelector, builder) }
  art_sums_aggregate(builder) { return this.__child(`art_sums_aggregate`, art_sums_aggregateModelSelector, builder) }
  av_art(builder) { return this.__child(`av_art`, av_artModelSelector, builder) }
  av_art_aggregate(builder) { return this.__child(`av_art_aggregate`, av_art_aggregateModelSelector, builder) }
  av_art_by_pk(builder) { return this.__child(`av_art_by_pk`, av_artModelSelector, builder) }
  event(builder) { return this.__child(`event`, eventModelSelector, builder) }
  event_aggregate(builder) { return this.__child(`event_aggregate`, event_aggregateModelSelector, builder) }
  event_by_pk(builder) { return this.__child(`event_by_pk`, eventModelSelector, builder) }
  event_rev(builder) { return this.__child(`event_rev`, event_revModelSelector, builder) }
  event_rev_aggregate(builder) { return this.__child(`event_rev_aggregate`, event_rev_aggregateModelSelector, builder) }
  event_rev_by_pk(builder) { return this.__child(`event_rev_by_pk`, event_revModelSelector, builder) }
  event_search(builder) { return this.__child(`event_search`, eventModelSelector, builder) }
  event_search_aggregate(builder) { return this.__child(`event_search_aggregate`, event_aggregateModelSelector, builder) }
  garten(builder) { return this.__child(`garten`, gartenModelSelector, builder) }
  garten_aggregate(builder) { return this.__child(`garten_aggregate`, garten_aggregateModelSelector, builder) }
  garten_by_pk(builder) { return this.__child(`garten_by_pk`, gartenModelSelector, builder) }
  garten_file(builder) { return this.__child(`garten_file`, garten_fileModelSelector, builder) }
  garten_file_aggregate(builder) { return this.__child(`garten_file_aggregate`, garten_file_aggregateModelSelector, builder) }
  garten_file_by_pk(builder) { return this.__child(`garten_file_by_pk`, garten_fileModelSelector, builder) }
  garten_rev(builder) { return this.__child(`garten_rev`, garten_revModelSelector, builder) }
  garten_rev_aggregate(builder) { return this.__child(`garten_rev_aggregate`, garten_rev_aggregateModelSelector, builder) }
  garten_rev_by_pk(builder) { return this.__child(`garten_rev_by_pk`, garten_revModelSelector, builder) }
  garten_search(builder) { return this.__child(`garten_search`, gartenModelSelector, builder) }
  garten_search_aggregate(builder) { return this.__child(`garten_search_aggregate`, garten_aggregateModelSelector, builder) }
  garten_teilzaehlung_sums(builder) { return this.__child(`garten_teilzaehlung_sums`, garten_teilzaehlung_sumsModelSelector, builder) }
  garten_teilzaehlung_sums_aggregate(builder) { return this.__child(`garten_teilzaehlung_sums_aggregate`, garten_teilzaehlung_sums_aggregateModelSelector, builder) }
  herkunft(builder) { return this.__child(`herkunft`, herkunftModelSelector, builder) }
  herkunft_aggregate(builder) { return this.__child(`herkunft_aggregate`, herkunft_aggregateModelSelector, builder) }
  herkunft_by_pk(builder) { return this.__child(`herkunft_by_pk`, herkunftModelSelector, builder) }
  herkunft_file(builder) { return this.__child(`herkunft_file`, herkunft_fileModelSelector, builder) }
  herkunft_file_aggregate(builder) { return this.__child(`herkunft_file_aggregate`, herkunft_file_aggregateModelSelector, builder) }
  herkunft_file_by_pk(builder) { return this.__child(`herkunft_file_by_pk`, herkunft_fileModelSelector, builder) }
  herkunft_rev(builder) { return this.__child(`herkunft_rev`, herkunft_revModelSelector, builder) }
  herkunft_rev_aggregate(builder) { return this.__child(`herkunft_rev_aggregate`, herkunft_rev_aggregateModelSelector, builder) }
  herkunft_rev_by_pk(builder) { return this.__child(`herkunft_rev_by_pk`, herkunft_revModelSelector, builder) }
  herkunft_search(builder) { return this.__child(`herkunft_search`, herkunftModelSelector, builder) }
  herkunft_search_aggregate(builder) { return this.__child(`herkunft_search_aggregate`, herkunft_aggregateModelSelector, builder) }
  herkunft_sums(builder) { return this.__child(`herkunft_sums`, herkunft_sumsModelSelector, builder) }
  herkunft_sums_aggregate(builder) { return this.__child(`herkunft_sums_aggregate`, herkunft_sums_aggregateModelSelector, builder) }
  kultur(builder) { return this.__child(`kultur`, kulturModelSelector, builder) }
  kultur_aggregate(builder) { return this.__child(`kultur_aggregate`, kultur_aggregateModelSelector, builder) }
  kultur_by_pk(builder) { return this.__child(`kultur_by_pk`, kulturModelSelector, builder) }
  kultur_file(builder) { return this.__child(`kultur_file`, kultur_fileModelSelector, builder) }
  kultur_file_aggregate(builder) { return this.__child(`kultur_file_aggregate`, kultur_file_aggregateModelSelector, builder) }
  kultur_file_by_pk(builder) { return this.__child(`kultur_file_by_pk`, kultur_fileModelSelector, builder) }
  kultur_option(builder) { return this.__child(`kultur_option`, kultur_optionModelSelector, builder) }
  kultur_option_aggregate(builder) { return this.__child(`kultur_option_aggregate`, kultur_option_aggregateModelSelector, builder) }
  kultur_option_rev(builder) { return this.__child(`kultur_option_rev`, kultur_option_revModelSelector, builder) }
  kultur_option_rev_aggregate(builder) { return this.__child(`kultur_option_rev_aggregate`, kultur_option_rev_aggregateModelSelector, builder) }
  kultur_option_rev_by_pk(builder) { return this.__child(`kultur_option_rev_by_pk`, kultur_option_revModelSelector, builder) }
  kultur_qk(builder) { return this.__child(`kultur_qk`, kultur_qkModelSelector, builder) }
  kultur_qk_aggregate(builder) { return this.__child(`kultur_qk_aggregate`, kultur_qk_aggregateModelSelector, builder) }
  kultur_qk_by_pk(builder) { return this.__child(`kultur_qk_by_pk`, kultur_qkModelSelector, builder) }
  kultur_qk_choosen(builder) { return this.__child(`kultur_qk_choosen`, kultur_qk_choosenModelSelector, builder) }
  kultur_qk_choosen_aggregate(builder) { return this.__child(`kultur_qk_choosen_aggregate`, kultur_qk_choosen_aggregateModelSelector, builder) }
  kultur_rev(builder) { return this.__child(`kultur_rev`, kultur_revModelSelector, builder) }
  kultur_rev_aggregate(builder) { return this.__child(`kultur_rev_aggregate`, kultur_rev_aggregateModelSelector, builder) }
  kultur_rev_by_pk(builder) { return this.__child(`kultur_rev_by_pk`, kultur_revModelSelector, builder) }
  kultur_search(builder) { return this.__child(`kultur_search`, kulturModelSelector, builder) }
  kultur_search_aggregate(builder) { return this.__child(`kultur_search_aggregate`, kultur_aggregateModelSelector, builder) }
  lieferung(builder) { return this.__child(`lieferung`, lieferungModelSelector, builder) }
  lieferung_aggregate(builder) { return this.__child(`lieferung_aggregate`, lieferung_aggregateModelSelector, builder) }
  lieferung_by_pk(builder) { return this.__child(`lieferung_by_pk`, lieferungModelSelector, builder) }
  lieferung_file(builder) { return this.__child(`lieferung_file`, lieferung_fileModelSelector, builder) }
  lieferung_file_aggregate(builder) { return this.__child(`lieferung_file_aggregate`, lieferung_file_aggregateModelSelector, builder) }
  lieferung_file_by_pk(builder) { return this.__child(`lieferung_file_by_pk`, lieferung_fileModelSelector, builder) }
  lieferung_rev(builder) { return this.__child(`lieferung_rev`, lieferung_revModelSelector, builder) }
  lieferung_rev_aggregate(builder) { return this.__child(`lieferung_rev_aggregate`, lieferung_rev_aggregateModelSelector, builder) }
  lieferung_rev_by_pk(builder) { return this.__child(`lieferung_rev_by_pk`, lieferung_revModelSelector, builder) }
  lieferung_search(builder) { return this.__child(`lieferung_search`, lieferungModelSelector, builder) }
  lieferung_search_aggregate(builder) { return this.__child(`lieferung_search_aggregate`, lieferung_aggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, personModelSelector, builder) }
  person_aggregate(builder) { return this.__child(`person_aggregate`, person_aggregateModelSelector, builder) }
  person_by_pk(builder) { return this.__child(`person_by_pk`, personModelSelector, builder) }
  person_file(builder) { return this.__child(`person_file`, person_fileModelSelector, builder) }
  person_file_aggregate(builder) { return this.__child(`person_file_aggregate`, person_file_aggregateModelSelector, builder) }
  person_file_by_pk(builder) { return this.__child(`person_file_by_pk`, person_fileModelSelector, builder) }
  person_option(builder) { return this.__child(`person_option`, person_optionModelSelector, builder) }
  person_option_aggregate(builder) { return this.__child(`person_option_aggregate`, person_option_aggregateModelSelector, builder) }
  person_option_rev(builder) { return this.__child(`person_option_rev`, person_option_revModelSelector, builder) }
  person_option_rev_aggregate(builder) { return this.__child(`person_option_rev_aggregate`, person_option_rev_aggregateModelSelector, builder) }
  person_option_rev_by_pk(builder) { return this.__child(`person_option_rev_by_pk`, person_option_revModelSelector, builder) }
  person_rev(builder) { return this.__child(`person_rev`, person_revModelSelector, builder) }
  person_rev_aggregate(builder) { return this.__child(`person_rev_aggregate`, person_rev_aggregateModelSelector, builder) }
  person_rev_by_pk(builder) { return this.__child(`person_rev_by_pk`, person_revModelSelector, builder) }
  person_search(builder) { return this.__child(`person_search`, personModelSelector, builder) }
  person_search_aggregate(builder) { return this.__child(`person_search_aggregate`, person_aggregateModelSelector, builder) }
  sammel_lieferung(builder) { return this.__child(`sammel_lieferung`, sammel_lieferungModelSelector, builder) }
  sammel_lieferung_aggregate(builder) { return this.__child(`sammel_lieferung_aggregate`, sammel_lieferung_aggregateModelSelector, builder) }
  sammel_lieferung_by_pk(builder) { return this.__child(`sammel_lieferung_by_pk`, sammel_lieferungModelSelector, builder) }
  sammel_lieferung_rev(builder) { return this.__child(`sammel_lieferung_rev`, sammel_lieferung_revModelSelector, builder) }
  sammel_lieferung_rev_aggregate(builder) { return this.__child(`sammel_lieferung_rev_aggregate`, sammel_lieferung_rev_aggregateModelSelector, builder) }
  sammel_lieferung_rev_by_pk(builder) { return this.__child(`sammel_lieferung_rev_by_pk`, sammel_lieferung_revModelSelector, builder) }
  sammlung(builder) { return this.__child(`sammlung`, sammlungModelSelector, builder) }
  sammlung_aggregate(builder) { return this.__child(`sammlung_aggregate`, sammlung_aggregateModelSelector, builder) }
  sammlung_by_pk(builder) { return this.__child(`sammlung_by_pk`, sammlungModelSelector, builder) }
  sammlung_file(builder) { return this.__child(`sammlung_file`, sammlung_fileModelSelector, builder) }
  sammlung_file_aggregate(builder) { return this.__child(`sammlung_file_aggregate`, sammlung_file_aggregateModelSelector, builder) }
  sammlung_file_by_pk(builder) { return this.__child(`sammlung_file_by_pk`, sammlung_fileModelSelector, builder) }
  sammlung_rev(builder) { return this.__child(`sammlung_rev`, sammlung_revModelSelector, builder) }
  sammlung_rev_aggregate(builder) { return this.__child(`sammlung_rev_aggregate`, sammlung_rev_aggregateModelSelector, builder) }
  sammlung_rev_by_pk(builder) { return this.__child(`sammlung_rev_by_pk`, sammlung_revModelSelector, builder) }
  sammlung_search(builder) { return this.__child(`sammlung_search`, sammlungModelSelector, builder) }
  sammlung_search_aggregate(builder) { return this.__child(`sammlung_search_aggregate`, sammlung_aggregateModelSelector, builder) }
  spatial_ref_sys(builder) { return this.__child(`spatial_ref_sys`, spatial_ref_sysModelSelector, builder) }
  spatial_ref_sys_aggregate(builder) { return this.__child(`spatial_ref_sys_aggregate`, spatial_ref_sys_aggregateModelSelector, builder) }
  spatial_ref_sys_by_pk(builder) { return this.__child(`spatial_ref_sys_by_pk`, spatial_ref_sysModelSelector, builder) }
  teilkultur(builder) { return this.__child(`teilkultur`, teilkulturModelSelector, builder) }
  teilkultur_aggregate(builder) { return this.__child(`teilkultur_aggregate`, teilkultur_aggregateModelSelector, builder) }
  teilkultur_by_pk(builder) { return this.__child(`teilkultur_by_pk`, teilkulturModelSelector, builder) }
  teilkultur_rev(builder) { return this.__child(`teilkultur_rev`, teilkultur_revModelSelector, builder) }
  teilkultur_rev_aggregate(builder) { return this.__child(`teilkultur_rev_aggregate`, teilkultur_rev_aggregateModelSelector, builder) }
  teilkultur_rev_by_pk(builder) { return this.__child(`teilkultur_rev_by_pk`, teilkultur_revModelSelector, builder) }
  teilkultur_search(builder) { return this.__child(`teilkultur_search`, teilkulturModelSelector, builder) }
  teilkultur_search_aggregate(builder) { return this.__child(`teilkultur_search_aggregate`, teilkultur_aggregateModelSelector, builder) }
  teilzaehlung(builder) { return this.__child(`teilzaehlung`, teilzaehlungModelSelector, builder) }
  teilzaehlung_aggregate(builder) { return this.__child(`teilzaehlung_aggregate`, teilzaehlung_aggregateModelSelector, builder) }
  teilzaehlung_by_pk(builder) { return this.__child(`teilzaehlung_by_pk`, teilzaehlungModelSelector, builder) }
  teilzaehlung_rev(builder) { return this.__child(`teilzaehlung_rev`, teilzaehlung_revModelSelector, builder) }
  teilzaehlung_rev_aggregate(builder) { return this.__child(`teilzaehlung_rev_aggregate`, teilzaehlung_rev_aggregateModelSelector, builder) }
  teilzaehlung_rev_by_pk(builder) { return this.__child(`teilzaehlung_rev_by_pk`, teilzaehlung_revModelSelector, builder) }
  user_role(builder) { return this.__child(`user_role`, user_roleModelSelector, builder) }
  user_role_aggregate(builder) { return this.__child(`user_role_aggregate`, user_role_aggregateModelSelector, builder) }
  user_role_by_pk(builder) { return this.__child(`user_role_by_pk`, user_roleModelSelector, builder) }
  zaehlung(builder) { return this.__child(`zaehlung`, zaehlungModelSelector, builder) }
  zaehlung_aggregate(builder) { return this.__child(`zaehlung_aggregate`, zaehlung_aggregateModelSelector, builder) }
  zaehlung_by_pk(builder) { return this.__child(`zaehlung_by_pk`, zaehlungModelSelector, builder) }
  zaehlung_rev(builder) { return this.__child(`zaehlung_rev`, zaehlung_revModelSelector, builder) }
  zaehlung_rev_aggregate(builder) { return this.__child(`zaehlung_rev_aggregate`, zaehlung_rev_aggregateModelSelector, builder) }
  zaehlung_rev_by_pk(builder) { return this.__child(`zaehlung_rev_by_pk`, zaehlung_revModelSelector, builder) }
  zaehlung_search(builder) { return this.__child(`zaehlung_search`, zaehlungModelSelector, builder) }
  zaehlung_search_aggregate(builder) { return this.__child(`zaehlung_search_aggregate`, zaehlung_aggregateModelSelector, builder) }
}
export function selectFromsubscription_root() {
  return new subscription_rootModelSelector()
}

export const subscription_rootModelPrimitives = selectFromsubscription_root()
