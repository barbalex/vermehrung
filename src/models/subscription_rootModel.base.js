/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { ae_artModel } from './ae_artModel'
import { ae_artModelSelector } from './ae_artModel.base'
import { artModel } from './artModel'
import { artModelSelector } from './artModel.base'
import { art_fileModel } from './art_fileModel'
import { art_fileModelSelector } from './art_fileModel.base'
import { art_qkModel } from './art_qkModel'
import { art_qkModelSelector } from './art_qkModel.base'
import { art_qk_choosenModel } from './art_qk_choosenModel'
import { art_qk_choosenModelSelector } from './art_qk_choosenModel.base'
import { art_qk_choosen_revModel } from './art_qk_choosen_revModel'
import { art_qk_choosen_revModelSelector } from './art_qk_choosen_revModel.base'
import { art_qk_revModel } from './art_qk_revModel'
import { art_qk_revModelSelector } from './art_qk_revModel.base'
import { art_revModel } from './art_revModel'
import { art_revModelSelector } from './art_revModel.base'
import { avModel } from './avModel'
import { avModelSelector } from './avModel.base'
import { av_revModel } from './av_revModel'
import { av_revModelSelector } from './av_revModel.base'
import { eventModel } from './eventModel'
import { eventModelSelector } from './eventModel.base'
import { event_revModel } from './event_revModel'
import { event_revModelSelector } from './event_revModel.base'
import { gartenModel } from './gartenModel'
import { gartenModelSelector } from './gartenModel.base'
import { garten_fileModel } from './garten_fileModel'
import { garten_fileModelSelector } from './garten_fileModel.base'
import { garten_revModel } from './garten_revModel'
import { garten_revModelSelector } from './garten_revModel.base'
import { gvModel } from './gvModel'
import { gvModelSelector } from './gvModel.base'
import { gv_revModel } from './gv_revModel'
import { gv_revModelSelector } from './gv_revModel.base'
import { herkunftModel } from './herkunftModel'
import { herkunftModelSelector } from './herkunftModel.base'
import { herkunft_fileModel } from './herkunft_fileModel'
import { herkunft_fileModelSelector } from './herkunft_fileModel.base'
import { herkunft_revModel } from './herkunft_revModel'
import { herkunft_revModelSelector } from './herkunft_revModel.base'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'
import { kultur_fileModel } from './kultur_fileModel'
import { kultur_fileModelSelector } from './kultur_fileModel.base'
import { kultur_optionModel } from './kultur_optionModel'
import { kultur_optionModelSelector } from './kultur_optionModel.base'
import { kultur_option_revModel } from './kultur_option_revModel'
import { kultur_option_revModelSelector } from './kultur_option_revModel.base'
import { kultur_qkModel } from './kultur_qkModel'
import { kultur_qkModelSelector } from './kultur_qkModel.base'
import { kultur_qk_choosenModel } from './kultur_qk_choosenModel'
import { kultur_qk_choosenModelSelector } from './kultur_qk_choosenModel.base'
import { kultur_qk_choosen_revModel } from './kultur_qk_choosen_revModel'
import { kultur_qk_choosen_revModelSelector } from './kultur_qk_choosen_revModel.base'
import { kultur_qk_revModel } from './kultur_qk_revModel'
import { kultur_qk_revModelSelector } from './kultur_qk_revModel.base'
import { kultur_revModel } from './kultur_revModel'
import { kultur_revModelSelector } from './kultur_revModel.base'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'
import { lieferung_fileModel } from './lieferung_fileModel'
import { lieferung_fileModelSelector } from './lieferung_fileModel.base'
import { lieferung_revModel } from './lieferung_revModel'
import { lieferung_revModelSelector } from './lieferung_revModel.base'
import { personModel } from './personModel'
import { personModelSelector } from './personModel.base'
import { person_fileModel } from './person_fileModel'
import { person_fileModelSelector } from './person_fileModel.base'
import { person_optionModel } from './person_optionModel'
import { person_optionModelSelector } from './person_optionModel.base'
import { person_option_revModel } from './person_option_revModel'
import { person_option_revModelSelector } from './person_option_revModel.base'
import { person_revModel } from './person_revModel'
import { person_revModelSelector } from './person_revModel.base'
import { sammel_lieferungModel } from './sammel_lieferungModel'
import { sammel_lieferungModelSelector } from './sammel_lieferungModel.base'
import { sammel_lieferung_revModel } from './sammel_lieferung_revModel'
import { sammel_lieferung_revModelSelector } from './sammel_lieferung_revModel.base'
import { sammlungModel } from './sammlungModel'
import { sammlungModelSelector } from './sammlungModel.base'
import { sammlung_fileModel } from './sammlung_fileModel'
import { sammlung_fileModelSelector } from './sammlung_fileModel.base'
import { sammlung_revModel } from './sammlung_revModel'
import { sammlung_revModelSelector } from './sammlung_revModel.base'
import { spatial_ref_sysModel } from './spatial_ref_sysModel'
import { spatial_ref_sysModelSelector } from './spatial_ref_sysModel.base'
import { teilkulturModel } from './teilkulturModel'
import { teilkulturModelSelector } from './teilkulturModel.base'
import { teilkultur_revModel } from './teilkultur_revModel'
import { teilkultur_revModelSelector } from './teilkultur_revModel.base'
import { teilzaehlungModel } from './teilzaehlungModel'
import { teilzaehlungModelSelector } from './teilzaehlungModel.base'
import { teilzaehlung_aggregateModel } from './teilzaehlung_aggregateModel'
import { teilzaehlung_aggregateModelSelector } from './teilzaehlung_aggregateModel.base'
import { teilzaehlung_revModel } from './teilzaehlung_revModel'
import { teilzaehlung_revModelSelector } from './teilzaehlung_revModel.base'
import { user_roleModel } from './user_roleModel'
import { user_roleModelSelector } from './user_roleModel.base'
import { zaehlungModel } from './zaehlungModel'
import { zaehlungModelSelector } from './zaehlungModel.base'
import { zaehlung_revModel } from './zaehlung_revModel'
import { zaehlung_revModelSelector } from './zaehlung_revModel.base'

/**
 * subscription_rootBase
 * auto generated base class for the model subscription_rootModel.
 */
export const subscription_rootModelBase = ModelBase.named('subscription_root')
  .props({
    __typename: types.optional(
      types.literal('subscription_root'),
      'subscription_root',
    ),
    ae_art: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => ae_artModel))),
    ),
    ae_art_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => ae_artModel)),
    ),
    art: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => artModel))),
    ),
    art_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => artModel)),
    ),
    art_file: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => art_fileModel))),
    ),
    art_file_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => art_fileModel)),
    ),
    art_qk: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => art_qkModel))),
    ),
    art_qk_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => art_qkModel)),
    ),
    art_qk_choosen: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => art_qk_choosenModel))),
    ),
    art_qk_choosen_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => art_qk_choosenModel)),
    ),
    art_qk_choosen_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => art_qk_choosen_revModel))),
    ),
    art_qk_choosen_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => art_qk_choosen_revModel)),
    ),
    art_qk_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => art_qk_revModel))),
    ),
    art_qk_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => art_qk_revModel)),
    ),
    art_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => art_revModel))),
    ),
    art_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => art_revModel)),
    ),
    av: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => avModel))),
    ),
    av_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => avModel)),
    ),
    av_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => av_revModel))),
    ),
    av_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => av_revModel)),
    ),
    event: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => eventModel))),
    ),
    event_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => eventModel)),
    ),
    event_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => event_revModel))),
    ),
    event_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => event_revModel)),
    ),
    garten: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => gartenModel))),
    ),
    garten_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => gartenModel)),
    ),
    garten_file: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => garten_fileModel))),
    ),
    garten_file_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => garten_fileModel)),
    ),
    garten_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => garten_revModel))),
    ),
    garten_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => garten_revModel)),
    ),
    gv: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => gvModel))),
    ),
    gv_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => gvModel)),
    ),
    gv_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => gv_revModel))),
    ),
    gv_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => gv_revModel)),
    ),
    herkunft: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => herkunftModel))),
    ),
    herkunft_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => herkunftModel)),
    ),
    herkunft_file: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => herkunft_fileModel))),
    ),
    herkunft_file_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => herkunft_fileModel)),
    ),
    herkunft_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => herkunft_revModel))),
    ),
    herkunft_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => herkunft_revModel)),
    ),
    kultur: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kulturModel))),
    ),
    kultur_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kulturModel)),
    ),
    kultur_file: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_fileModel))),
    ),
    kultur_file_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kultur_fileModel)),
    ),
    kultur_option: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_optionModel))),
    ),
    kultur_option_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_option_revModel))),
    ),
    kultur_option_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kultur_option_revModel)),
    ),
    kultur_qk: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_qkModel))),
    ),
    kultur_qk_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kultur_qkModel)),
    ),
    kultur_qk_choosen: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_qk_choosenModel))),
    ),
    kultur_qk_choosen_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kultur_qk_choosenModel)),
    ),
    kultur_qk_choosen_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_qk_choosen_revModel))),
    ),
    kultur_qk_choosen_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kultur_qk_choosen_revModel)),
    ),
    kultur_qk_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_qk_revModel))),
    ),
    kultur_qk_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kultur_qk_revModel)),
    ),
    kultur_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => kultur_revModel))),
    ),
    kultur_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => kultur_revModel)),
    ),
    lieferung: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => lieferungModel))),
    ),
    lieferung_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => lieferungModel)),
    ),
    lieferung_file: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => lieferung_fileModel))),
    ),
    lieferung_file_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => lieferung_fileModel)),
    ),
    lieferung_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => lieferung_revModel))),
    ),
    lieferung_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => lieferung_revModel)),
    ),
    person: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => personModel))),
    ),
    person_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => personModel)),
    ),
    person_file: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => person_fileModel))),
    ),
    person_file_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => person_fileModel)),
    ),
    person_option: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => person_optionModel))),
    ),
    person_option_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => person_option_revModel))),
    ),
    person_option_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => person_option_revModel)),
    ),
    person_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => person_revModel))),
    ),
    person_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => person_revModel)),
    ),
    sammel_lieferung: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => sammel_lieferungModel))),
    ),
    sammel_lieferung_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => sammel_lieferungModel)),
    ),
    sammel_lieferung_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => sammel_lieferung_revModel))),
    ),
    sammel_lieferung_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => sammel_lieferung_revModel)),
    ),
    sammlung: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => sammlungModel))),
    ),
    sammlung_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => sammlungModel)),
    ),
    sammlung_file: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => sammlung_fileModel))),
    ),
    sammlung_file_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => sammlung_fileModel)),
    ),
    sammlung_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => sammlung_revModel))),
    ),
    sammlung_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => sammlung_revModel)),
    ),
    spatial_ref_sys: types.union(
      types.undefined,
      types.array(types.late(() => spatial_ref_sysModel)),
    ),
    spatial_ref_sys_by_pk: types.union(
      types.undefined,
      types.null,
      types.late(() => spatial_ref_sysModel),
    ),
    teilkultur: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => teilkulturModel))),
    ),
    teilkultur_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => teilkulturModel)),
    ),
    teilkultur_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => teilkultur_revModel))),
    ),
    teilkultur_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => teilkultur_revModel)),
    ),
    teilzaehlung: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => teilzaehlungModel))),
    ),
    teilzaehlung_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => teilzaehlungModel)),
    ),
    teilzaehlung_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => teilzaehlung_revModel))),
    ),
    teilzaehlung_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => teilzaehlung_revModel)),
    ),
    user_role: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => user_roleModel))),
    ),
    user_role_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => user_roleModel)),
    ),
    zaehlung: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => zaehlungModel))),
    ),
    zaehlung_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => zaehlungModel)),
    ),
    zaehlung_rev: types.union(
      types.undefined,
      types.array(MSTGQLRef(types.late(() => zaehlung_revModel))),
    ),
    zaehlung_rev_by_pk: types.union(
      types.undefined,
      types.null,
      MSTGQLRef(types.late(() => zaehlung_revModel)),
    ),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class subscription_rootModelSelector extends QueryBuilder {
  ae_art(builder) {
    return this.__child(`ae_art`, ae_artModelSelector, builder)
  }
  ae_art_aggregate(builder) {
    return this.__child(
      `ae_art_aggregate`,
      ae_art_aggregateModelSelector,
      builder,
    )
  }
  ae_art_by_pk(builder) {
    return this.__child(`ae_art_by_pk`, ae_artModelSelector, builder)
  }
  art(builder) {
    return this.__child(`art`, artModelSelector, builder)
  }
  art_aggregate(builder) {
    return this.__child(`art_aggregate`, art_aggregateModelSelector, builder)
  }
  art_by_pk(builder) {
    return this.__child(`art_by_pk`, artModelSelector, builder)
  }
  art_file(builder) {
    return this.__child(`art_file`, art_fileModelSelector, builder)
  }
  art_file_aggregate(builder) {
    return this.__child(
      `art_file_aggregate`,
      art_file_aggregateModelSelector,
      builder,
    )
  }
  art_file_by_pk(builder) {
    return this.__child(`art_file_by_pk`, art_fileModelSelector, builder)
  }
  art_qk(builder) {
    return this.__child(`art_qk`, art_qkModelSelector, builder)
  }
  art_qk_aggregate(builder) {
    return this.__child(
      `art_qk_aggregate`,
      art_qk_aggregateModelSelector,
      builder,
    )
  }
  art_qk_by_pk(builder) {
    return this.__child(`art_qk_by_pk`, art_qkModelSelector, builder)
  }
  art_qk_choosen(builder) {
    return this.__child(`art_qk_choosen`, art_qk_choosenModelSelector, builder)
  }
  art_qk_choosen_aggregate(builder) {
    return this.__child(
      `art_qk_choosen_aggregate`,
      art_qk_choosen_aggregateModelSelector,
      builder,
    )
  }
  art_qk_choosen_by_pk(builder) {
    return this.__child(
      `art_qk_choosen_by_pk`,
      art_qk_choosenModelSelector,
      builder,
    )
  }
  art_qk_choosen_rev(builder) {
    return this.__child(
      `art_qk_choosen_rev`,
      art_qk_choosen_revModelSelector,
      builder,
    )
  }
  art_qk_choosen_rev_aggregate(builder) {
    return this.__child(
      `art_qk_choosen_rev_aggregate`,
      art_qk_choosen_rev_aggregateModelSelector,
      builder,
    )
  }
  art_qk_choosen_rev_by_pk(builder) {
    return this.__child(
      `art_qk_choosen_rev_by_pk`,
      art_qk_choosen_revModelSelector,
      builder,
    )
  }
  art_qk_rev(builder) {
    return this.__child(`art_qk_rev`, art_qk_revModelSelector, builder)
  }
  art_qk_rev_aggregate(builder) {
    return this.__child(
      `art_qk_rev_aggregate`,
      art_qk_rev_aggregateModelSelector,
      builder,
    )
  }
  art_qk_rev_by_pk(builder) {
    return this.__child(`art_qk_rev_by_pk`, art_qk_revModelSelector, builder)
  }
  art_rev(builder) {
    return this.__child(`art_rev`, art_revModelSelector, builder)
  }
  art_rev_aggregate(builder) {
    return this.__child(
      `art_rev_aggregate`,
      art_rev_aggregateModelSelector,
      builder,
    )
  }
  art_rev_by_pk(builder) {
    return this.__child(`art_rev_by_pk`, art_revModelSelector, builder)
  }
  av(builder) {
    return this.__child(`av`, avModelSelector, builder)
  }
  av_aggregate(builder) {
    return this.__child(`av_aggregate`, av_aggregateModelSelector, builder)
  }
  av_by_pk(builder) {
    return this.__child(`av_by_pk`, avModelSelector, builder)
  }
  av_rev(builder) {
    return this.__child(`av_rev`, av_revModelSelector, builder)
  }
  av_rev_aggregate(builder) {
    return this.__child(
      `av_rev_aggregate`,
      av_rev_aggregateModelSelector,
      builder,
    )
  }
  av_rev_by_pk(builder) {
    return this.__child(`av_rev_by_pk`, av_revModelSelector, builder)
  }
  event(builder) {
    return this.__child(`event`, eventModelSelector, builder)
  }
  event_aggregate(builder) {
    return this.__child(
      `event_aggregate`,
      event_aggregateModelSelector,
      builder,
    )
  }
  event_by_pk(builder) {
    return this.__child(`event_by_pk`, eventModelSelector, builder)
  }
  event_rev(builder) {
    return this.__child(`event_rev`, event_revModelSelector, builder)
  }
  event_rev_aggregate(builder) {
    return this.__child(
      `event_rev_aggregate`,
      event_rev_aggregateModelSelector,
      builder,
    )
  }
  event_rev_by_pk(builder) {
    return this.__child(`event_rev_by_pk`, event_revModelSelector, builder)
  }
  garten(builder) {
    return this.__child(`garten`, gartenModelSelector, builder)
  }
  garten_aggregate(builder) {
    return this.__child(
      `garten_aggregate`,
      garten_aggregateModelSelector,
      builder,
    )
  }
  garten_by_pk(builder) {
    return this.__child(`garten_by_pk`, gartenModelSelector, builder)
  }
  garten_file(builder) {
    return this.__child(`garten_file`, garten_fileModelSelector, builder)
  }
  garten_file_aggregate(builder) {
    return this.__child(
      `garten_file_aggregate`,
      garten_file_aggregateModelSelector,
      builder,
    )
  }
  garten_file_by_pk(builder) {
    return this.__child(`garten_file_by_pk`, garten_fileModelSelector, builder)
  }
  garten_rev(builder) {
    return this.__child(`garten_rev`, garten_revModelSelector, builder)
  }
  garten_rev_aggregate(builder) {
    return this.__child(
      `garten_rev_aggregate`,
      garten_rev_aggregateModelSelector,
      builder,
    )
  }
  garten_rev_by_pk(builder) {
    return this.__child(`garten_rev_by_pk`, garten_revModelSelector, builder)
  }
  gv(builder) {
    return this.__child(`gv`, gvModelSelector, builder)
  }
  gv_aggregate(builder) {
    return this.__child(`gv_aggregate`, gv_aggregateModelSelector, builder)
  }
  gv_by_pk(builder) {
    return this.__child(`gv_by_pk`, gvModelSelector, builder)
  }
  gv_rev(builder) {
    return this.__child(`gv_rev`, gv_revModelSelector, builder)
  }
  gv_rev_aggregate(builder) {
    return this.__child(
      `gv_rev_aggregate`,
      gv_rev_aggregateModelSelector,
      builder,
    )
  }
  gv_rev_by_pk(builder) {
    return this.__child(`gv_rev_by_pk`, gv_revModelSelector, builder)
  }
  herkunft(builder) {
    return this.__child(`herkunft`, herkunftModelSelector, builder)
  }
  herkunft_aggregate(builder) {
    return this.__child(
      `herkunft_aggregate`,
      herkunft_aggregateModelSelector,
      builder,
    )
  }
  herkunft_by_pk(builder) {
    return this.__child(`herkunft_by_pk`, herkunftModelSelector, builder)
  }
  herkunft_file(builder) {
    return this.__child(`herkunft_file`, herkunft_fileModelSelector, builder)
  }
  herkunft_file_aggregate(builder) {
    return this.__child(
      `herkunft_file_aggregate`,
      herkunft_file_aggregateModelSelector,
      builder,
    )
  }
  herkunft_file_by_pk(builder) {
    return this.__child(
      `herkunft_file_by_pk`,
      herkunft_fileModelSelector,
      builder,
    )
  }
  herkunft_rev(builder) {
    return this.__child(`herkunft_rev`, herkunft_revModelSelector, builder)
  }
  herkunft_rev_aggregate(builder) {
    return this.__child(
      `herkunft_rev_aggregate`,
      herkunft_rev_aggregateModelSelector,
      builder,
    )
  }
  herkunft_rev_by_pk(builder) {
    return this.__child(
      `herkunft_rev_by_pk`,
      herkunft_revModelSelector,
      builder,
    )
  }
  kultur(builder) {
    return this.__child(`kultur`, kulturModelSelector, builder)
  }
  kultur_aggregate(builder) {
    return this.__child(
      `kultur_aggregate`,
      kultur_aggregateModelSelector,
      builder,
    )
  }
  kultur_by_pk(builder) {
    return this.__child(`kultur_by_pk`, kulturModelSelector, builder)
  }
  kultur_file(builder) {
    return this.__child(`kultur_file`, kultur_fileModelSelector, builder)
  }
  kultur_file_aggregate(builder) {
    return this.__child(
      `kultur_file_aggregate`,
      kultur_file_aggregateModelSelector,
      builder,
    )
  }
  kultur_file_by_pk(builder) {
    return this.__child(`kultur_file_by_pk`, kultur_fileModelSelector, builder)
  }
  kultur_option(builder) {
    return this.__child(`kultur_option`, kultur_optionModelSelector, builder)
  }
  kultur_option_aggregate(builder) {
    return this.__child(
      `kultur_option_aggregate`,
      kultur_option_aggregateModelSelector,
      builder,
    )
  }
  kultur_option_rev(builder) {
    return this.__child(
      `kultur_option_rev`,
      kultur_option_revModelSelector,
      builder,
    )
  }
  kultur_option_rev_aggregate(builder) {
    return this.__child(
      `kultur_option_rev_aggregate`,
      kultur_option_rev_aggregateModelSelector,
      builder,
    )
  }
  kultur_option_rev_by_pk(builder) {
    return this.__child(
      `kultur_option_rev_by_pk`,
      kultur_option_revModelSelector,
      builder,
    )
  }
  kultur_qk(builder) {
    return this.__child(`kultur_qk`, kultur_qkModelSelector, builder)
  }
  kultur_qk_aggregate(builder) {
    return this.__child(
      `kultur_qk_aggregate`,
      kultur_qk_aggregateModelSelector,
      builder,
    )
  }
  kultur_qk_by_pk(builder) {
    return this.__child(`kultur_qk_by_pk`, kultur_qkModelSelector, builder)
  }
  kultur_qk_choosen(builder) {
    return this.__child(
      `kultur_qk_choosen`,
      kultur_qk_choosenModelSelector,
      builder,
    )
  }
  kultur_qk_choosen_aggregate(builder) {
    return this.__child(
      `kultur_qk_choosen_aggregate`,
      kultur_qk_choosen_aggregateModelSelector,
      builder,
    )
  }
  kultur_qk_choosen_by_pk(builder) {
    return this.__child(
      `kultur_qk_choosen_by_pk`,
      kultur_qk_choosenModelSelector,
      builder,
    )
  }
  kultur_qk_choosen_rev(builder) {
    return this.__child(
      `kultur_qk_choosen_rev`,
      kultur_qk_choosen_revModelSelector,
      builder,
    )
  }
  kultur_qk_choosen_rev_aggregate(builder) {
    return this.__child(
      `kultur_qk_choosen_rev_aggregate`,
      kultur_qk_choosen_rev_aggregateModelSelector,
      builder,
    )
  }
  kultur_qk_choosen_rev_by_pk(builder) {
    return this.__child(
      `kultur_qk_choosen_rev_by_pk`,
      kultur_qk_choosen_revModelSelector,
      builder,
    )
  }
  kultur_qk_rev(builder) {
    return this.__child(`kultur_qk_rev`, kultur_qk_revModelSelector, builder)
  }
  kultur_qk_rev_aggregate(builder) {
    return this.__child(
      `kultur_qk_rev_aggregate`,
      kultur_qk_rev_aggregateModelSelector,
      builder,
    )
  }
  kultur_qk_rev_by_pk(builder) {
    return this.__child(
      `kultur_qk_rev_by_pk`,
      kultur_qk_revModelSelector,
      builder,
    )
  }
  kultur_rev(builder) {
    return this.__child(`kultur_rev`, kultur_revModelSelector, builder)
  }
  kultur_rev_aggregate(builder) {
    return this.__child(
      `kultur_rev_aggregate`,
      kultur_rev_aggregateModelSelector,
      builder,
    )
  }
  kultur_rev_by_pk(builder) {
    return this.__child(`kultur_rev_by_pk`, kultur_revModelSelector, builder)
  }
  lieferung(builder) {
    return this.__child(`lieferung`, lieferungModelSelector, builder)
  }
  lieferung_aggregate(builder) {
    return this.__child(
      `lieferung_aggregate`,
      lieferung_aggregateModelSelector,
      builder,
    )
  }
  lieferung_by_pk(builder) {
    return this.__child(`lieferung_by_pk`, lieferungModelSelector, builder)
  }
  lieferung_file(builder) {
    return this.__child(`lieferung_file`, lieferung_fileModelSelector, builder)
  }
  lieferung_file_aggregate(builder) {
    return this.__child(
      `lieferung_file_aggregate`,
      lieferung_file_aggregateModelSelector,
      builder,
    )
  }
  lieferung_file_by_pk(builder) {
    return this.__child(
      `lieferung_file_by_pk`,
      lieferung_fileModelSelector,
      builder,
    )
  }
  lieferung_rev(builder) {
    return this.__child(`lieferung_rev`, lieferung_revModelSelector, builder)
  }
  lieferung_rev_aggregate(builder) {
    return this.__child(
      `lieferung_rev_aggregate`,
      lieferung_rev_aggregateModelSelector,
      builder,
    )
  }
  lieferung_rev_by_pk(builder) {
    return this.__child(
      `lieferung_rev_by_pk`,
      lieferung_revModelSelector,
      builder,
    )
  }
  person(builder) {
    return this.__child(`person`, personModelSelector, builder)
  }
  person_aggregate(builder) {
    return this.__child(
      `person_aggregate`,
      person_aggregateModelSelector,
      builder,
    )
  }
  person_by_pk(builder) {
    return this.__child(`person_by_pk`, personModelSelector, builder)
  }
  person_file(builder) {
    return this.__child(`person_file`, person_fileModelSelector, builder)
  }
  person_file_aggregate(builder) {
    return this.__child(
      `person_file_aggregate`,
      person_file_aggregateModelSelector,
      builder,
    )
  }
  person_file_by_pk(builder) {
    return this.__child(`person_file_by_pk`, person_fileModelSelector, builder)
  }
  person_option(builder) {
    return this.__child(`person_option`, person_optionModelSelector, builder)
  }
  person_option_aggregate(builder) {
    return this.__child(
      `person_option_aggregate`,
      person_option_aggregateModelSelector,
      builder,
    )
  }
  person_option_rev(builder) {
    return this.__child(
      `person_option_rev`,
      person_option_revModelSelector,
      builder,
    )
  }
  person_option_rev_aggregate(builder) {
    return this.__child(
      `person_option_rev_aggregate`,
      person_option_rev_aggregateModelSelector,
      builder,
    )
  }
  person_option_rev_by_pk(builder) {
    return this.__child(
      `person_option_rev_by_pk`,
      person_option_revModelSelector,
      builder,
    )
  }
  person_rev(builder) {
    return this.__child(`person_rev`, person_revModelSelector, builder)
  }
  person_rev_aggregate(builder) {
    return this.__child(
      `person_rev_aggregate`,
      person_rev_aggregateModelSelector,
      builder,
    )
  }
  person_rev_by_pk(builder) {
    return this.__child(`person_rev_by_pk`, person_revModelSelector, builder)
  }
  sammel_lieferung(builder) {
    return this.__child(
      `sammel_lieferung`,
      sammel_lieferungModelSelector,
      builder,
    )
  }
  sammel_lieferung_aggregate(builder) {
    return this.__child(
      `sammel_lieferung_aggregate`,
      sammel_lieferung_aggregateModelSelector,
      builder,
    )
  }
  sammel_lieferung_by_pk(builder) {
    return this.__child(
      `sammel_lieferung_by_pk`,
      sammel_lieferungModelSelector,
      builder,
    )
  }
  sammel_lieferung_rev(builder) {
    return this.__child(
      `sammel_lieferung_rev`,
      sammel_lieferung_revModelSelector,
      builder,
    )
  }
  sammel_lieferung_rev_aggregate(builder) {
    return this.__child(
      `sammel_lieferung_rev_aggregate`,
      sammel_lieferung_rev_aggregateModelSelector,
      builder,
    )
  }
  sammel_lieferung_rev_by_pk(builder) {
    return this.__child(
      `sammel_lieferung_rev_by_pk`,
      sammel_lieferung_revModelSelector,
      builder,
    )
  }
  sammlung(builder) {
    return this.__child(`sammlung`, sammlungModelSelector, builder)
  }
  sammlung_aggregate(builder) {
    return this.__child(
      `sammlung_aggregate`,
      sammlung_aggregateModelSelector,
      builder,
    )
  }
  sammlung_by_pk(builder) {
    return this.__child(`sammlung_by_pk`, sammlungModelSelector, builder)
  }
  sammlung_file(builder) {
    return this.__child(`sammlung_file`, sammlung_fileModelSelector, builder)
  }
  sammlung_file_aggregate(builder) {
    return this.__child(
      `sammlung_file_aggregate`,
      sammlung_file_aggregateModelSelector,
      builder,
    )
  }
  sammlung_file_by_pk(builder) {
    return this.__child(
      `sammlung_file_by_pk`,
      sammlung_fileModelSelector,
      builder,
    )
  }
  sammlung_rev(builder) {
    return this.__child(`sammlung_rev`, sammlung_revModelSelector, builder)
  }
  sammlung_rev_aggregate(builder) {
    return this.__child(
      `sammlung_rev_aggregate`,
      sammlung_rev_aggregateModelSelector,
      builder,
    )
  }
  sammlung_rev_by_pk(builder) {
    return this.__child(
      `sammlung_rev_by_pk`,
      sammlung_revModelSelector,
      builder,
    )
  }
  spatial_ref_sys(builder) {
    return this.__child(
      `spatial_ref_sys`,
      spatial_ref_sysModelSelector,
      builder,
    )
  }
  spatial_ref_sys_aggregate(builder) {
    return this.__child(
      `spatial_ref_sys_aggregate`,
      spatial_ref_sys_aggregateModelSelector,
      builder,
    )
  }
  spatial_ref_sys_by_pk(builder) {
    return this.__child(
      `spatial_ref_sys_by_pk`,
      spatial_ref_sysModelSelector,
      builder,
    )
  }
  teilkultur(builder) {
    return this.__child(`teilkultur`, teilkulturModelSelector, builder)
  }
  teilkultur_aggregate(builder) {
    return this.__child(
      `teilkultur_aggregate`,
      teilkultur_aggregateModelSelector,
      builder,
    )
  }
  teilkultur_by_pk(builder) {
    return this.__child(`teilkultur_by_pk`, teilkulturModelSelector, builder)
  }
  teilkultur_rev(builder) {
    return this.__child(`teilkultur_rev`, teilkultur_revModelSelector, builder)
  }
  teilkultur_rev_aggregate(builder) {
    return this.__child(
      `teilkultur_rev_aggregate`,
      teilkultur_rev_aggregateModelSelector,
      builder,
    )
  }
  teilkultur_rev_by_pk(builder) {
    return this.__child(
      `teilkultur_rev_by_pk`,
      teilkultur_revModelSelector,
      builder,
    )
  }
  teilzaehlung(builder) {
    return this.__child(`teilzaehlung`, teilzaehlungModelSelector, builder)
  }
  teilzaehlung_aggregate(builder) {
    return this.__child(
      `teilzaehlung_aggregate`,
      teilzaehlung_aggregateModelSelector,
      builder,
    )
  }
  teilzaehlung_by_pk(builder) {
    return this.__child(
      `teilzaehlung_by_pk`,
      teilzaehlungModelSelector,
      builder,
    )
  }
  teilzaehlung_rev(builder) {
    return this.__child(
      `teilzaehlung_rev`,
      teilzaehlung_revModelSelector,
      builder,
    )
  }
  teilzaehlung_rev_aggregate(builder) {
    return this.__child(
      `teilzaehlung_rev_aggregate`,
      teilzaehlung_rev_aggregateModelSelector,
      builder,
    )
  }
  teilzaehlung_rev_by_pk(builder) {
    return this.__child(
      `teilzaehlung_rev_by_pk`,
      teilzaehlung_revModelSelector,
      builder,
    )
  }
  user_role(builder) {
    return this.__child(`user_role`, user_roleModelSelector, builder)
  }
  user_role_aggregate(builder) {
    return this.__child(
      `user_role_aggregate`,
      user_role_aggregateModelSelector,
      builder,
    )
  }
  user_role_by_pk(builder) {
    return this.__child(`user_role_by_pk`, user_roleModelSelector, builder)
  }
  zaehlung(builder) {
    return this.__child(`zaehlung`, zaehlungModelSelector, builder)
  }
  zaehlung_aggregate(builder) {
    return this.__child(
      `zaehlung_aggregate`,
      zaehlung_aggregateModelSelector,
      builder,
    )
  }
  zaehlung_by_pk(builder) {
    return this.__child(`zaehlung_by_pk`, zaehlungModelSelector, builder)
  }
  zaehlung_rev(builder) {
    return this.__child(`zaehlung_rev`, zaehlung_revModelSelector, builder)
  }
  zaehlung_rev_aggregate(builder) {
    return this.__child(
      `zaehlung_rev_aggregate`,
      zaehlung_rev_aggregateModelSelector,
      builder,
    )
  }
  zaehlung_rev_by_pk(builder) {
    return this.__child(
      `zaehlung_rev_by_pk`,
      zaehlung_revModelSelector,
      builder,
    )
  }
}
export function selectFromsubscription_root() {
  return new subscription_rootModelSelector()
}

export const subscription_rootModelPrimitives = selectFromsubscription_root()
