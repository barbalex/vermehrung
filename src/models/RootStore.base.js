/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"

import { query_rootModel } from "./query_rootModel"
import { query_rootModelPrimitives, query_rootModelSelector } from "./query_rootModel.base"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelPrimitives, ae_artModelSelector } from "./ae_artModel.base"
import { artModel } from "./artModel"
import { artModelPrimitives, artModelSelector } from "./artModel.base"
import { art_fileModel } from "./art_fileModel"
import { art_fileModelPrimitives, art_fileModelSelector } from "./art_fileModel.base"
import { art_file_aggregateModel } from "./art_file_aggregateModel"
import { art_file_aggregateModelPrimitives, art_file_aggregateModelSelector } from "./art_file_aggregateModel.base"
import { art_file_aggregate_fieldsModel } from "./art_file_aggregate_fieldsModel"
import { art_file_aggregate_fieldsModelPrimitives, art_file_aggregate_fieldsModelSelector } from "./art_file_aggregate_fieldsModel.base"
import { art_file_max_fieldsModel } from "./art_file_max_fieldsModel"
import { art_file_max_fieldsModelPrimitives, art_file_max_fieldsModelSelector } from "./art_file_max_fieldsModel.base"
import { art_file_min_fieldsModel } from "./art_file_min_fieldsModel"
import { art_file_min_fieldsModelPrimitives, art_file_min_fieldsModelSelector } from "./art_file_min_fieldsModel.base"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelPrimitives, art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { art_qkModel } from "./art_qkModel"
import { art_qkModelPrimitives, art_qkModelSelector } from "./art_qkModel.base"
import { art_qk_choosen_aggregateModel } from "./art_qk_choosen_aggregateModel"
import { art_qk_choosen_aggregateModelPrimitives, art_qk_choosen_aggregateModelSelector } from "./art_qk_choosen_aggregateModel.base"
import { art_qk_choosen_aggregate_fieldsModel } from "./art_qk_choosen_aggregate_fieldsModel"
import { art_qk_choosen_aggregate_fieldsModelPrimitives, art_qk_choosen_aggregate_fieldsModelSelector } from "./art_qk_choosen_aggregate_fieldsModel.base"
import { art_qk_choosen_max_fieldsModel } from "./art_qk_choosen_max_fieldsModel"
import { art_qk_choosen_max_fieldsModelPrimitives, art_qk_choosen_max_fieldsModelSelector } from "./art_qk_choosen_max_fieldsModel.base"
import { art_qk_choosen_min_fieldsModel } from "./art_qk_choosen_min_fieldsModel"
import { art_qk_choosen_min_fieldsModelPrimitives, art_qk_choosen_min_fieldsModelSelector } from "./art_qk_choosen_min_fieldsModel.base"
import { art_sumsModel } from "./art_sumsModel"
import { art_sumsModelPrimitives, art_sumsModelSelector } from "./art_sumsModel.base"
import { av_artModel } from "./av_artModel"
import { av_artModelPrimitives, av_artModelSelector } from "./av_artModel.base"
import { art_sums_aggregateModel } from "./art_sums_aggregateModel"
import { art_sums_aggregateModelPrimitives, art_sums_aggregateModelSelector } from "./art_sums_aggregateModel.base"
import { art_sums_aggregate_fieldsModel } from "./art_sums_aggregate_fieldsModel"
import { art_sums_aggregate_fieldsModelPrimitives, art_sums_aggregate_fieldsModelSelector } from "./art_sums_aggregate_fieldsModel.base"
import { art_sums_avg_fieldsModel } from "./art_sums_avg_fieldsModel"
import { art_sums_avg_fieldsModelPrimitives, art_sums_avg_fieldsModelSelector } from "./art_sums_avg_fieldsModel.base"
import { art_sums_max_fieldsModel } from "./art_sums_max_fieldsModel"
import { art_sums_max_fieldsModelPrimitives, art_sums_max_fieldsModelSelector } from "./art_sums_max_fieldsModel.base"
import { art_sums_min_fieldsModel } from "./art_sums_min_fieldsModel"
import { art_sums_min_fieldsModelPrimitives, art_sums_min_fieldsModelSelector } from "./art_sums_min_fieldsModel.base"
import { art_sums_stddev_fieldsModel } from "./art_sums_stddev_fieldsModel"
import { art_sums_stddev_fieldsModelPrimitives, art_sums_stddev_fieldsModelSelector } from "./art_sums_stddev_fieldsModel.base"
import { art_sums_stddev_pop_fieldsModel } from "./art_sums_stddev_pop_fieldsModel"
import { art_sums_stddev_pop_fieldsModelPrimitives, art_sums_stddev_pop_fieldsModelSelector } from "./art_sums_stddev_pop_fieldsModel.base"
import { art_sums_stddev_samp_fieldsModel } from "./art_sums_stddev_samp_fieldsModel"
import { art_sums_stddev_samp_fieldsModelPrimitives, art_sums_stddev_samp_fieldsModelSelector } from "./art_sums_stddev_samp_fieldsModel.base"
import { art_sums_sum_fieldsModel } from "./art_sums_sum_fieldsModel"
import { art_sums_sum_fieldsModelPrimitives, art_sums_sum_fieldsModelSelector } from "./art_sums_sum_fieldsModel.base"
import { art_sums_var_pop_fieldsModel } from "./art_sums_var_pop_fieldsModel"
import { art_sums_var_pop_fieldsModelPrimitives, art_sums_var_pop_fieldsModelSelector } from "./art_sums_var_pop_fieldsModel.base"
import { art_sums_var_samp_fieldsModel } from "./art_sums_var_samp_fieldsModel"
import { art_sums_var_samp_fieldsModelPrimitives, art_sums_var_samp_fieldsModelSelector } from "./art_sums_var_samp_fieldsModel.base"
import { art_sums_variance_fieldsModel } from "./art_sums_variance_fieldsModel"
import { art_sums_variance_fieldsModelPrimitives, art_sums_variance_fieldsModelSelector } from "./art_sums_variance_fieldsModel.base"
import { personModel } from "./personModel"
import { personModelPrimitives, personModelSelector } from "./personModel.base"
import { av_art_aggregateModel } from "./av_art_aggregateModel"
import { av_art_aggregateModelPrimitives, av_art_aggregateModelSelector } from "./av_art_aggregateModel.base"
import { av_art_aggregate_fieldsModel } from "./av_art_aggregate_fieldsModel"
import { av_art_aggregate_fieldsModelPrimitives, av_art_aggregate_fieldsModelSelector } from "./av_art_aggregate_fieldsModel.base"
import { av_art_max_fieldsModel } from "./av_art_max_fieldsModel"
import { av_art_max_fieldsModelPrimitives, av_art_max_fieldsModelSelector } from "./av_art_max_fieldsModel.base"
import { av_art_min_fieldsModel } from "./av_art_min_fieldsModel"
import { av_art_min_fieldsModelPrimitives, av_art_min_fieldsModelSelector } from "./av_art_min_fieldsModel.base"
import { eventModel } from "./eventModel"
import { eventModelPrimitives, eventModelSelector } from "./eventModel.base"
import { kulturModel } from "./kulturModel"
import { kulturModelPrimitives, kulturModelSelector } from "./kulturModel.base"
import { event_aggregateModel } from "./event_aggregateModel"
import { event_aggregateModelPrimitives, event_aggregateModelSelector } from "./event_aggregateModel.base"
import { event_aggregate_fieldsModel } from "./event_aggregate_fieldsModel"
import { event_aggregate_fieldsModelPrimitives, event_aggregate_fieldsModelSelector } from "./event_aggregate_fieldsModel.base"
import { event_avg_fieldsModel } from "./event_avg_fieldsModel"
import { event_avg_fieldsModelPrimitives, event_avg_fieldsModelSelector } from "./event_avg_fieldsModel.base"
import { event_max_fieldsModel } from "./event_max_fieldsModel"
import { event_max_fieldsModelPrimitives, event_max_fieldsModelSelector } from "./event_max_fieldsModel.base"
import { event_min_fieldsModel } from "./event_min_fieldsModel"
import { event_min_fieldsModelPrimitives, event_min_fieldsModelSelector } from "./event_min_fieldsModel.base"
import { event_stddev_fieldsModel } from "./event_stddev_fieldsModel"
import { event_stddev_fieldsModelPrimitives, event_stddev_fieldsModelSelector } from "./event_stddev_fieldsModel.base"
import { event_stddev_pop_fieldsModel } from "./event_stddev_pop_fieldsModel"
import { event_stddev_pop_fieldsModelPrimitives, event_stddev_pop_fieldsModelSelector } from "./event_stddev_pop_fieldsModel.base"
import { event_stddev_samp_fieldsModel } from "./event_stddev_samp_fieldsModel"
import { event_stddev_samp_fieldsModelPrimitives, event_stddev_samp_fieldsModelSelector } from "./event_stddev_samp_fieldsModel.base"
import { event_sum_fieldsModel } from "./event_sum_fieldsModel"
import { event_sum_fieldsModelPrimitives, event_sum_fieldsModelSelector } from "./event_sum_fieldsModel.base"
import { event_var_pop_fieldsModel } from "./event_var_pop_fieldsModel"
import { event_var_pop_fieldsModelPrimitives, event_var_pop_fieldsModelSelector } from "./event_var_pop_fieldsModel.base"
import { event_var_samp_fieldsModel } from "./event_var_samp_fieldsModel"
import { event_var_samp_fieldsModelPrimitives, event_var_samp_fieldsModelSelector } from "./event_var_samp_fieldsModel.base"
import { event_variance_fieldsModel } from "./event_variance_fieldsModel"
import { event_variance_fieldsModelPrimitives, event_variance_fieldsModelSelector } from "./event_variance_fieldsModel.base"
import { gartenModel } from "./gartenModel"
import { gartenModelPrimitives, gartenModelSelector } from "./gartenModel.base"
import { garten_fileModel } from "./garten_fileModel"
import { garten_fileModelPrimitives, garten_fileModelSelector } from "./garten_fileModel.base"
import { garten_file_aggregateModel } from "./garten_file_aggregateModel"
import { garten_file_aggregateModelPrimitives, garten_file_aggregateModelSelector } from "./garten_file_aggregateModel.base"
import { garten_file_aggregate_fieldsModel } from "./garten_file_aggregate_fieldsModel"
import { garten_file_aggregate_fieldsModelPrimitives, garten_file_aggregate_fieldsModelSelector } from "./garten_file_aggregate_fieldsModel.base"
import { garten_file_max_fieldsModel } from "./garten_file_max_fieldsModel"
import { garten_file_max_fieldsModelPrimitives, garten_file_max_fieldsModelSelector } from "./garten_file_max_fieldsModel.base"
import { garten_file_min_fieldsModel } from "./garten_file_min_fieldsModel"
import { garten_file_min_fieldsModelPrimitives, garten_file_min_fieldsModelSelector } from "./garten_file_min_fieldsModel.base"
import { kultur_aggregateModel } from "./kultur_aggregateModel"
import { kultur_aggregateModelPrimitives, kultur_aggregateModelSelector } from "./kultur_aggregateModel.base"
import { kultur_aggregate_fieldsModel } from "./kultur_aggregate_fieldsModel"
import { kultur_aggregate_fieldsModelPrimitives, kultur_aggregate_fieldsModelSelector } from "./kultur_aggregate_fieldsModel.base"
import { kultur_avg_fieldsModel } from "./kultur_avg_fieldsModel"
import { kultur_avg_fieldsModelPrimitives, kultur_avg_fieldsModelSelector } from "./kultur_avg_fieldsModel.base"
import { kultur_max_fieldsModel } from "./kultur_max_fieldsModel"
import { kultur_max_fieldsModelPrimitives, kultur_max_fieldsModelSelector } from "./kultur_max_fieldsModel.base"
import { kultur_min_fieldsModel } from "./kultur_min_fieldsModel"
import { kultur_min_fieldsModelPrimitives, kultur_min_fieldsModelSelector } from "./kultur_min_fieldsModel.base"
import { kultur_stddev_fieldsModel } from "./kultur_stddev_fieldsModel"
import { kultur_stddev_fieldsModelPrimitives, kultur_stddev_fieldsModelSelector } from "./kultur_stddev_fieldsModel.base"
import { kultur_stddev_pop_fieldsModel } from "./kultur_stddev_pop_fieldsModel"
import { kultur_stddev_pop_fieldsModelPrimitives, kultur_stddev_pop_fieldsModelSelector } from "./kultur_stddev_pop_fieldsModel.base"
import { kultur_stddev_samp_fieldsModel } from "./kultur_stddev_samp_fieldsModel"
import { kultur_stddev_samp_fieldsModelPrimitives, kultur_stddev_samp_fieldsModelSelector } from "./kultur_stddev_samp_fieldsModel.base"
import { kultur_sum_fieldsModel } from "./kultur_sum_fieldsModel"
import { kultur_sum_fieldsModelPrimitives, kultur_sum_fieldsModelSelector } from "./kultur_sum_fieldsModel.base"
import { kultur_var_pop_fieldsModel } from "./kultur_var_pop_fieldsModel"
import { kultur_var_pop_fieldsModelPrimitives, kultur_var_pop_fieldsModelSelector } from "./kultur_var_pop_fieldsModel.base"
import { kultur_var_samp_fieldsModel } from "./kultur_var_samp_fieldsModel"
import { kultur_var_samp_fieldsModelPrimitives, kultur_var_samp_fieldsModelSelector } from "./kultur_var_samp_fieldsModel.base"
import { kultur_variance_fieldsModel } from "./kultur_variance_fieldsModel"
import { kultur_variance_fieldsModelPrimitives, kultur_variance_fieldsModelSelector } from "./kultur_variance_fieldsModel.base"
import { garten_teilzaehlung_sumsModel } from "./garten_teilzaehlung_sumsModel"
import { garten_teilzaehlung_sumsModelPrimitives, garten_teilzaehlung_sumsModelSelector } from "./garten_teilzaehlung_sumsModel.base"
import { garten_teilzaehlung_sums_aggregateModel } from "./garten_teilzaehlung_sums_aggregateModel"
import { garten_teilzaehlung_sums_aggregateModelPrimitives, garten_teilzaehlung_sums_aggregateModelSelector } from "./garten_teilzaehlung_sums_aggregateModel.base"
import { garten_teilzaehlung_sums_aggregate_fieldsModel } from "./garten_teilzaehlung_sums_aggregate_fieldsModel"
import { garten_teilzaehlung_sums_aggregate_fieldsModelPrimitives, garten_teilzaehlung_sums_aggregate_fieldsModelSelector } from "./garten_teilzaehlung_sums_aggregate_fieldsModel.base"
import { garten_teilzaehlung_sums_avg_fieldsModel } from "./garten_teilzaehlung_sums_avg_fieldsModel"
import { garten_teilzaehlung_sums_avg_fieldsModelPrimitives, garten_teilzaehlung_sums_avg_fieldsModelSelector } from "./garten_teilzaehlung_sums_avg_fieldsModel.base"
import { garten_teilzaehlung_sums_max_fieldsModel } from "./garten_teilzaehlung_sums_max_fieldsModel"
import { garten_teilzaehlung_sums_max_fieldsModelPrimitives, garten_teilzaehlung_sums_max_fieldsModelSelector } from "./garten_teilzaehlung_sums_max_fieldsModel.base"
import { garten_teilzaehlung_sums_min_fieldsModel } from "./garten_teilzaehlung_sums_min_fieldsModel"
import { garten_teilzaehlung_sums_min_fieldsModelPrimitives, garten_teilzaehlung_sums_min_fieldsModelSelector } from "./garten_teilzaehlung_sums_min_fieldsModel.base"
import { garten_teilzaehlung_sums_stddev_fieldsModel } from "./garten_teilzaehlung_sums_stddev_fieldsModel"
import { garten_teilzaehlung_sums_stddev_fieldsModelPrimitives, garten_teilzaehlung_sums_stddev_fieldsModelSelector } from "./garten_teilzaehlung_sums_stddev_fieldsModel.base"
import { garten_teilzaehlung_sums_stddev_pop_fieldsModel } from "./garten_teilzaehlung_sums_stddev_pop_fieldsModel"
import { garten_teilzaehlung_sums_stddev_pop_fieldsModelPrimitives, garten_teilzaehlung_sums_stddev_pop_fieldsModelSelector } from "./garten_teilzaehlung_sums_stddev_pop_fieldsModel.base"
import { garten_teilzaehlung_sums_stddev_samp_fieldsModel } from "./garten_teilzaehlung_sums_stddev_samp_fieldsModel"
import { garten_teilzaehlung_sums_stddev_samp_fieldsModelPrimitives, garten_teilzaehlung_sums_stddev_samp_fieldsModelSelector } from "./garten_teilzaehlung_sums_stddev_samp_fieldsModel.base"
import { garten_teilzaehlung_sums_sum_fieldsModel } from "./garten_teilzaehlung_sums_sum_fieldsModel"
import { garten_teilzaehlung_sums_sum_fieldsModelPrimitives, garten_teilzaehlung_sums_sum_fieldsModelSelector } from "./garten_teilzaehlung_sums_sum_fieldsModel.base"
import { garten_teilzaehlung_sums_var_pop_fieldsModel } from "./garten_teilzaehlung_sums_var_pop_fieldsModel"
import { garten_teilzaehlung_sums_var_pop_fieldsModelPrimitives, garten_teilzaehlung_sums_var_pop_fieldsModelSelector } from "./garten_teilzaehlung_sums_var_pop_fieldsModel.base"
import { garten_teilzaehlung_sums_var_samp_fieldsModel } from "./garten_teilzaehlung_sums_var_samp_fieldsModel"
import { garten_teilzaehlung_sums_var_samp_fieldsModelPrimitives, garten_teilzaehlung_sums_var_samp_fieldsModelSelector } from "./garten_teilzaehlung_sums_var_samp_fieldsModel.base"
import { garten_teilzaehlung_sums_variance_fieldsModel } from "./garten_teilzaehlung_sums_variance_fieldsModel"
import { garten_teilzaehlung_sums_variance_fieldsModelPrimitives, garten_teilzaehlung_sums_variance_fieldsModelSelector } from "./garten_teilzaehlung_sums_variance_fieldsModel.base"
import { herkunftModel } from "./herkunftModel"
import { herkunftModelPrimitives, herkunftModelSelector } from "./herkunftModel.base"
import { herkunft_fileModel } from "./herkunft_fileModel"
import { herkunft_fileModelPrimitives, herkunft_fileModelSelector } from "./herkunft_fileModel.base"
import { herkunft_file_aggregateModel } from "./herkunft_file_aggregateModel"
import { herkunft_file_aggregateModelPrimitives, herkunft_file_aggregateModelSelector } from "./herkunft_file_aggregateModel.base"
import { herkunft_file_aggregate_fieldsModel } from "./herkunft_file_aggregate_fieldsModel"
import { herkunft_file_aggregate_fieldsModelPrimitives, herkunft_file_aggregate_fieldsModelSelector } from "./herkunft_file_aggregate_fieldsModel.base"
import { herkunft_file_max_fieldsModel } from "./herkunft_file_max_fieldsModel"
import { herkunft_file_max_fieldsModelPrimitives, herkunft_file_max_fieldsModelSelector } from "./herkunft_file_max_fieldsModel.base"
import { herkunft_file_min_fieldsModel } from "./herkunft_file_min_fieldsModel"
import { herkunft_file_min_fieldsModelPrimitives, herkunft_file_min_fieldsModelSelector } from "./herkunft_file_min_fieldsModel.base"
import { herkunft_sumsModel } from "./herkunft_sumsModel"
import { herkunft_sumsModelPrimitives, herkunft_sumsModelSelector } from "./herkunft_sumsModel.base"
import { herkunft_sums_aggregateModel } from "./herkunft_sums_aggregateModel"
import { herkunft_sums_aggregateModelPrimitives, herkunft_sums_aggregateModelSelector } from "./herkunft_sums_aggregateModel.base"
import { herkunft_sums_aggregate_fieldsModel } from "./herkunft_sums_aggregate_fieldsModel"
import { herkunft_sums_aggregate_fieldsModelPrimitives, herkunft_sums_aggregate_fieldsModelSelector } from "./herkunft_sums_aggregate_fieldsModel.base"
import { herkunft_sums_avg_fieldsModel } from "./herkunft_sums_avg_fieldsModel"
import { herkunft_sums_avg_fieldsModelPrimitives, herkunft_sums_avg_fieldsModelSelector } from "./herkunft_sums_avg_fieldsModel.base"
import { herkunft_sums_max_fieldsModel } from "./herkunft_sums_max_fieldsModel"
import { herkunft_sums_max_fieldsModelPrimitives, herkunft_sums_max_fieldsModelSelector } from "./herkunft_sums_max_fieldsModel.base"
import { herkunft_sums_min_fieldsModel } from "./herkunft_sums_min_fieldsModel"
import { herkunft_sums_min_fieldsModelPrimitives, herkunft_sums_min_fieldsModelSelector } from "./herkunft_sums_min_fieldsModel.base"
import { herkunft_sums_stddev_fieldsModel } from "./herkunft_sums_stddev_fieldsModel"
import { herkunft_sums_stddev_fieldsModelPrimitives, herkunft_sums_stddev_fieldsModelSelector } from "./herkunft_sums_stddev_fieldsModel.base"
import { herkunft_sums_stddev_pop_fieldsModel } from "./herkunft_sums_stddev_pop_fieldsModel"
import { herkunft_sums_stddev_pop_fieldsModelPrimitives, herkunft_sums_stddev_pop_fieldsModelSelector } from "./herkunft_sums_stddev_pop_fieldsModel.base"
import { herkunft_sums_stddev_samp_fieldsModel } from "./herkunft_sums_stddev_samp_fieldsModel"
import { herkunft_sums_stddev_samp_fieldsModelPrimitives, herkunft_sums_stddev_samp_fieldsModelSelector } from "./herkunft_sums_stddev_samp_fieldsModel.base"
import { herkunft_sums_sum_fieldsModel } from "./herkunft_sums_sum_fieldsModel"
import { herkunft_sums_sum_fieldsModelPrimitives, herkunft_sums_sum_fieldsModelSelector } from "./herkunft_sums_sum_fieldsModel.base"
import { herkunft_sums_var_pop_fieldsModel } from "./herkunft_sums_var_pop_fieldsModel"
import { herkunft_sums_var_pop_fieldsModelPrimitives, herkunft_sums_var_pop_fieldsModelSelector } from "./herkunft_sums_var_pop_fieldsModel.base"
import { herkunft_sums_var_samp_fieldsModel } from "./herkunft_sums_var_samp_fieldsModel"
import { herkunft_sums_var_samp_fieldsModelPrimitives, herkunft_sums_var_samp_fieldsModelSelector } from "./herkunft_sums_var_samp_fieldsModel.base"
import { herkunft_sums_variance_fieldsModel } from "./herkunft_sums_variance_fieldsModel"
import { herkunft_sums_variance_fieldsModelPrimitives, herkunft_sums_variance_fieldsModelSelector } from "./herkunft_sums_variance_fieldsModel.base"
import { sammlungModel } from "./sammlungModel"
import { sammlungModelPrimitives, sammlungModelSelector } from "./sammlungModel.base"
import { lieferungModel } from "./lieferungModel"
import { lieferungModelPrimitives, lieferungModelSelector } from "./lieferungModel.base"
import { lieferung_fileModel } from "./lieferung_fileModel"
import { lieferung_fileModelPrimitives, lieferung_fileModelSelector } from "./lieferung_fileModel.base"
import { lieferung_file_aggregateModel } from "./lieferung_file_aggregateModel"
import { lieferung_file_aggregateModelPrimitives, lieferung_file_aggregateModelSelector } from "./lieferung_file_aggregateModel.base"
import { lieferung_file_aggregate_fieldsModel } from "./lieferung_file_aggregate_fieldsModel"
import { lieferung_file_aggregate_fieldsModelPrimitives, lieferung_file_aggregate_fieldsModelSelector } from "./lieferung_file_aggregate_fieldsModel.base"
import { lieferung_file_max_fieldsModel } from "./lieferung_file_max_fieldsModel"
import { lieferung_file_max_fieldsModelPrimitives, lieferung_file_max_fieldsModelSelector } from "./lieferung_file_max_fieldsModel.base"
import { lieferung_file_min_fieldsModel } from "./lieferung_file_min_fieldsModel"
import { lieferung_file_min_fieldsModelPrimitives, lieferung_file_min_fieldsModelSelector } from "./lieferung_file_min_fieldsModel.base"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelPrimitives, sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { lieferung_aggregateModel } from "./lieferung_aggregateModel"
import { lieferung_aggregateModelPrimitives, lieferung_aggregateModelSelector } from "./lieferung_aggregateModel.base"
import { lieferung_aggregate_fieldsModel } from "./lieferung_aggregate_fieldsModel"
import { lieferung_aggregate_fieldsModelPrimitives, lieferung_aggregate_fieldsModelSelector } from "./lieferung_aggregate_fieldsModel.base"
import { lieferung_avg_fieldsModel } from "./lieferung_avg_fieldsModel"
import { lieferung_avg_fieldsModelPrimitives, lieferung_avg_fieldsModelSelector } from "./lieferung_avg_fieldsModel.base"
import { lieferung_max_fieldsModel } from "./lieferung_max_fieldsModel"
import { lieferung_max_fieldsModelPrimitives, lieferung_max_fieldsModelSelector } from "./lieferung_max_fieldsModel.base"
import { lieferung_min_fieldsModel } from "./lieferung_min_fieldsModel"
import { lieferung_min_fieldsModelPrimitives, lieferung_min_fieldsModelSelector } from "./lieferung_min_fieldsModel.base"
import { lieferung_stddev_fieldsModel } from "./lieferung_stddev_fieldsModel"
import { lieferung_stddev_fieldsModelPrimitives, lieferung_stddev_fieldsModelSelector } from "./lieferung_stddev_fieldsModel.base"
import { lieferung_stddev_pop_fieldsModel } from "./lieferung_stddev_pop_fieldsModel"
import { lieferung_stddev_pop_fieldsModelPrimitives, lieferung_stddev_pop_fieldsModelSelector } from "./lieferung_stddev_pop_fieldsModel.base"
import { lieferung_stddev_samp_fieldsModel } from "./lieferung_stddev_samp_fieldsModel"
import { lieferung_stddev_samp_fieldsModelPrimitives, lieferung_stddev_samp_fieldsModelSelector } from "./lieferung_stddev_samp_fieldsModel.base"
import { lieferung_sum_fieldsModel } from "./lieferung_sum_fieldsModel"
import { lieferung_sum_fieldsModelPrimitives, lieferung_sum_fieldsModelSelector } from "./lieferung_sum_fieldsModel.base"
import { lieferung_var_pop_fieldsModel } from "./lieferung_var_pop_fieldsModel"
import { lieferung_var_pop_fieldsModelPrimitives, lieferung_var_pop_fieldsModelSelector } from "./lieferung_var_pop_fieldsModel.base"
import { lieferung_var_samp_fieldsModel } from "./lieferung_var_samp_fieldsModel"
import { lieferung_var_samp_fieldsModelPrimitives, lieferung_var_samp_fieldsModelSelector } from "./lieferung_var_samp_fieldsModel.base"
import { lieferung_variance_fieldsModel } from "./lieferung_variance_fieldsModel"
import { lieferung_variance_fieldsModelPrimitives, lieferung_variance_fieldsModelSelector } from "./lieferung_variance_fieldsModel.base"
import { sammel_lieferung_aggregateModel } from "./sammel_lieferung_aggregateModel"
import { sammel_lieferung_aggregateModelPrimitives, sammel_lieferung_aggregateModelSelector } from "./sammel_lieferung_aggregateModel.base"
import { sammel_lieferung_aggregate_fieldsModel } from "./sammel_lieferung_aggregate_fieldsModel"
import { sammel_lieferung_aggregate_fieldsModelPrimitives, sammel_lieferung_aggregate_fieldsModelSelector } from "./sammel_lieferung_aggregate_fieldsModel.base"
import { sammel_lieferung_avg_fieldsModel } from "./sammel_lieferung_avg_fieldsModel"
import { sammel_lieferung_avg_fieldsModelPrimitives, sammel_lieferung_avg_fieldsModelSelector } from "./sammel_lieferung_avg_fieldsModel.base"
import { sammel_lieferung_max_fieldsModel } from "./sammel_lieferung_max_fieldsModel"
import { sammel_lieferung_max_fieldsModelPrimitives, sammel_lieferung_max_fieldsModelSelector } from "./sammel_lieferung_max_fieldsModel.base"
import { sammel_lieferung_min_fieldsModel } from "./sammel_lieferung_min_fieldsModel"
import { sammel_lieferung_min_fieldsModelPrimitives, sammel_lieferung_min_fieldsModelSelector } from "./sammel_lieferung_min_fieldsModel.base"
import { sammel_lieferung_stddev_fieldsModel } from "./sammel_lieferung_stddev_fieldsModel"
import { sammel_lieferung_stddev_fieldsModelPrimitives, sammel_lieferung_stddev_fieldsModelSelector } from "./sammel_lieferung_stddev_fieldsModel.base"
import { sammel_lieferung_stddev_pop_fieldsModel } from "./sammel_lieferung_stddev_pop_fieldsModel"
import { sammel_lieferung_stddev_pop_fieldsModelPrimitives, sammel_lieferung_stddev_pop_fieldsModelSelector } from "./sammel_lieferung_stddev_pop_fieldsModel.base"
import { sammel_lieferung_stddev_samp_fieldsModel } from "./sammel_lieferung_stddev_samp_fieldsModel"
import { sammel_lieferung_stddev_samp_fieldsModelPrimitives, sammel_lieferung_stddev_samp_fieldsModelSelector } from "./sammel_lieferung_stddev_samp_fieldsModel.base"
import { sammel_lieferung_sum_fieldsModel } from "./sammel_lieferung_sum_fieldsModel"
import { sammel_lieferung_sum_fieldsModelPrimitives, sammel_lieferung_sum_fieldsModelSelector } from "./sammel_lieferung_sum_fieldsModel.base"
import { sammel_lieferung_var_pop_fieldsModel } from "./sammel_lieferung_var_pop_fieldsModel"
import { sammel_lieferung_var_pop_fieldsModelPrimitives, sammel_lieferung_var_pop_fieldsModelSelector } from "./sammel_lieferung_var_pop_fieldsModel.base"
import { sammel_lieferung_var_samp_fieldsModel } from "./sammel_lieferung_var_samp_fieldsModel"
import { sammel_lieferung_var_samp_fieldsModelPrimitives, sammel_lieferung_var_samp_fieldsModelSelector } from "./sammel_lieferung_var_samp_fieldsModel.base"
import { sammel_lieferung_variance_fieldsModel } from "./sammel_lieferung_variance_fieldsModel"
import { sammel_lieferung_variance_fieldsModelPrimitives, sammel_lieferung_variance_fieldsModelSelector } from "./sammel_lieferung_variance_fieldsModel.base"
import { sammlung_fileModel } from "./sammlung_fileModel"
import { sammlung_fileModelPrimitives, sammlung_fileModelSelector } from "./sammlung_fileModel.base"
import { sammlung_file_aggregateModel } from "./sammlung_file_aggregateModel"
import { sammlung_file_aggregateModelPrimitives, sammlung_file_aggregateModelSelector } from "./sammlung_file_aggregateModel.base"
import { sammlung_file_aggregate_fieldsModel } from "./sammlung_file_aggregate_fieldsModel"
import { sammlung_file_aggregate_fieldsModelPrimitives, sammlung_file_aggregate_fieldsModelSelector } from "./sammlung_file_aggregate_fieldsModel.base"
import { sammlung_file_max_fieldsModel } from "./sammlung_file_max_fieldsModel"
import { sammlung_file_max_fieldsModelPrimitives, sammlung_file_max_fieldsModelSelector } from "./sammlung_file_max_fieldsModel.base"
import { sammlung_file_min_fieldsModel } from "./sammlung_file_min_fieldsModel"
import { sammlung_file_min_fieldsModelPrimitives, sammlung_file_min_fieldsModelSelector } from "./sammlung_file_min_fieldsModel.base"
import { sammlung_aggregateModel } from "./sammlung_aggregateModel"
import { sammlung_aggregateModelPrimitives, sammlung_aggregateModelSelector } from "./sammlung_aggregateModel.base"
import { sammlung_aggregate_fieldsModel } from "./sammlung_aggregate_fieldsModel"
import { sammlung_aggregate_fieldsModelPrimitives, sammlung_aggregate_fieldsModelSelector } from "./sammlung_aggregate_fieldsModel.base"
import { sammlung_avg_fieldsModel } from "./sammlung_avg_fieldsModel"
import { sammlung_avg_fieldsModelPrimitives, sammlung_avg_fieldsModelSelector } from "./sammlung_avg_fieldsModel.base"
import { sammlung_max_fieldsModel } from "./sammlung_max_fieldsModel"
import { sammlung_max_fieldsModelPrimitives, sammlung_max_fieldsModelSelector } from "./sammlung_max_fieldsModel.base"
import { sammlung_min_fieldsModel } from "./sammlung_min_fieldsModel"
import { sammlung_min_fieldsModelPrimitives, sammlung_min_fieldsModelSelector } from "./sammlung_min_fieldsModel.base"
import { sammlung_stddev_fieldsModel } from "./sammlung_stddev_fieldsModel"
import { sammlung_stddev_fieldsModelPrimitives, sammlung_stddev_fieldsModelSelector } from "./sammlung_stddev_fieldsModel.base"
import { sammlung_stddev_pop_fieldsModel } from "./sammlung_stddev_pop_fieldsModel"
import { sammlung_stddev_pop_fieldsModelPrimitives, sammlung_stddev_pop_fieldsModelSelector } from "./sammlung_stddev_pop_fieldsModel.base"
import { sammlung_stddev_samp_fieldsModel } from "./sammlung_stddev_samp_fieldsModel"
import { sammlung_stddev_samp_fieldsModelPrimitives, sammlung_stddev_samp_fieldsModelSelector } from "./sammlung_stddev_samp_fieldsModel.base"
import { sammlung_sum_fieldsModel } from "./sammlung_sum_fieldsModel"
import { sammlung_sum_fieldsModelPrimitives, sammlung_sum_fieldsModelSelector } from "./sammlung_sum_fieldsModel.base"
import { sammlung_var_pop_fieldsModel } from "./sammlung_var_pop_fieldsModel"
import { sammlung_var_pop_fieldsModelPrimitives, sammlung_var_pop_fieldsModelSelector } from "./sammlung_var_pop_fieldsModel.base"
import { sammlung_var_samp_fieldsModel } from "./sammlung_var_samp_fieldsModel"
import { sammlung_var_samp_fieldsModelPrimitives, sammlung_var_samp_fieldsModelSelector } from "./sammlung_var_samp_fieldsModel.base"
import { sammlung_variance_fieldsModel } from "./sammlung_variance_fieldsModel"
import { sammlung_variance_fieldsModelPrimitives, sammlung_variance_fieldsModelSelector } from "./sammlung_variance_fieldsModel.base"
import { kultur_fileModel } from "./kultur_fileModel"
import { kultur_fileModelPrimitives, kultur_fileModelSelector } from "./kultur_fileModel.base"
import { kultur_file_aggregateModel } from "./kultur_file_aggregateModel"
import { kultur_file_aggregateModelPrimitives, kultur_file_aggregateModelSelector } from "./kultur_file_aggregateModel.base"
import { kultur_file_aggregate_fieldsModel } from "./kultur_file_aggregate_fieldsModel"
import { kultur_file_aggregate_fieldsModelPrimitives, kultur_file_aggregate_fieldsModelSelector } from "./kultur_file_aggregate_fieldsModel.base"
import { kultur_file_max_fieldsModel } from "./kultur_file_max_fieldsModel"
import { kultur_file_max_fieldsModelPrimitives, kultur_file_max_fieldsModelSelector } from "./kultur_file_max_fieldsModel.base"
import { kultur_file_min_fieldsModel } from "./kultur_file_min_fieldsModel"
import { kultur_file_min_fieldsModelPrimitives, kultur_file_min_fieldsModelSelector } from "./kultur_file_min_fieldsModel.base"
import { kultur_optionModel } from "./kultur_optionModel"
import { kultur_optionModelPrimitives, kultur_optionModelSelector } from "./kultur_optionModel.base"
import { kultur_qk_choosenModel } from "./kultur_qk_choosenModel"
import { kultur_qk_choosenModelPrimitives, kultur_qk_choosenModelSelector } from "./kultur_qk_choosenModel.base"
import { kultur_qkModel } from "./kultur_qkModel"
import { kultur_qkModelPrimitives, kultur_qkModelSelector } from "./kultur_qkModel.base"
import { kultur_qk_choosen_aggregateModel } from "./kultur_qk_choosen_aggregateModel"
import { kultur_qk_choosen_aggregateModelPrimitives, kultur_qk_choosen_aggregateModelSelector } from "./kultur_qk_choosen_aggregateModel.base"
import { kultur_qk_choosen_aggregate_fieldsModel } from "./kultur_qk_choosen_aggregate_fieldsModel"
import { kultur_qk_choosen_aggregate_fieldsModelPrimitives, kultur_qk_choosen_aggregate_fieldsModelSelector } from "./kultur_qk_choosen_aggregate_fieldsModel.base"
import { kultur_qk_choosen_max_fieldsModel } from "./kultur_qk_choosen_max_fieldsModel"
import { kultur_qk_choosen_max_fieldsModelPrimitives, kultur_qk_choosen_max_fieldsModelSelector } from "./kultur_qk_choosen_max_fieldsModel.base"
import { kultur_qk_choosen_min_fieldsModel } from "./kultur_qk_choosen_min_fieldsModel"
import { kultur_qk_choosen_min_fieldsModelPrimitives, kultur_qk_choosen_min_fieldsModelSelector } from "./kultur_qk_choosen_min_fieldsModel.base"
import { teilkulturModel } from "./teilkulturModel"
import { teilkulturModelPrimitives, teilkulturModelSelector } from "./teilkulturModel.base"
import { teilzaehlungModel } from "./teilzaehlungModel"
import { teilzaehlungModelPrimitives, teilzaehlungModelSelector } from "./teilzaehlungModel.base"
import { teilzaehlung_aggregateModel } from "./teilzaehlung_aggregateModel"
import { teilzaehlung_aggregateModelPrimitives, teilzaehlung_aggregateModelSelector } from "./teilzaehlung_aggregateModel.base"
import { teilzaehlung_aggregate_fieldsModel } from "./teilzaehlung_aggregate_fieldsModel"
import { teilzaehlung_aggregate_fieldsModelPrimitives, teilzaehlung_aggregate_fieldsModelSelector } from "./teilzaehlung_aggregate_fieldsModel.base"
import { teilzaehlung_avg_fieldsModel } from "./teilzaehlung_avg_fieldsModel"
import { teilzaehlung_avg_fieldsModelPrimitives, teilzaehlung_avg_fieldsModelSelector } from "./teilzaehlung_avg_fieldsModel.base"
import { teilzaehlung_max_fieldsModel } from "./teilzaehlung_max_fieldsModel"
import { teilzaehlung_max_fieldsModelPrimitives, teilzaehlung_max_fieldsModelSelector } from "./teilzaehlung_max_fieldsModel.base"
import { teilzaehlung_min_fieldsModel } from "./teilzaehlung_min_fieldsModel"
import { teilzaehlung_min_fieldsModelPrimitives, teilzaehlung_min_fieldsModelSelector } from "./teilzaehlung_min_fieldsModel.base"
import { teilzaehlung_stddev_fieldsModel } from "./teilzaehlung_stddev_fieldsModel"
import { teilzaehlung_stddev_fieldsModelPrimitives, teilzaehlung_stddev_fieldsModelSelector } from "./teilzaehlung_stddev_fieldsModel.base"
import { teilzaehlung_stddev_pop_fieldsModel } from "./teilzaehlung_stddev_pop_fieldsModel"
import { teilzaehlung_stddev_pop_fieldsModelPrimitives, teilzaehlung_stddev_pop_fieldsModelSelector } from "./teilzaehlung_stddev_pop_fieldsModel.base"
import { teilzaehlung_stddev_samp_fieldsModel } from "./teilzaehlung_stddev_samp_fieldsModel"
import { teilzaehlung_stddev_samp_fieldsModelPrimitives, teilzaehlung_stddev_samp_fieldsModelSelector } from "./teilzaehlung_stddev_samp_fieldsModel.base"
import { teilzaehlung_sum_fieldsModel } from "./teilzaehlung_sum_fieldsModel"
import { teilzaehlung_sum_fieldsModelPrimitives, teilzaehlung_sum_fieldsModelSelector } from "./teilzaehlung_sum_fieldsModel.base"
import { teilzaehlung_var_pop_fieldsModel } from "./teilzaehlung_var_pop_fieldsModel"
import { teilzaehlung_var_pop_fieldsModelPrimitives, teilzaehlung_var_pop_fieldsModelSelector } from "./teilzaehlung_var_pop_fieldsModel.base"
import { teilzaehlung_var_samp_fieldsModel } from "./teilzaehlung_var_samp_fieldsModel"
import { teilzaehlung_var_samp_fieldsModelPrimitives, teilzaehlung_var_samp_fieldsModelSelector } from "./teilzaehlung_var_samp_fieldsModel.base"
import { teilzaehlung_variance_fieldsModel } from "./teilzaehlung_variance_fieldsModel"
import { teilzaehlung_variance_fieldsModelPrimitives, teilzaehlung_variance_fieldsModelSelector } from "./teilzaehlung_variance_fieldsModel.base"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelPrimitives, zaehlungModelSelector } from "./zaehlungModel.base"
import { teilkultur_aggregateModel } from "./teilkultur_aggregateModel"
import { teilkultur_aggregateModelPrimitives, teilkultur_aggregateModelSelector } from "./teilkultur_aggregateModel.base"
import { teilkultur_aggregate_fieldsModel } from "./teilkultur_aggregate_fieldsModel"
import { teilkultur_aggregate_fieldsModelPrimitives, teilkultur_aggregate_fieldsModelSelector } from "./teilkultur_aggregate_fieldsModel.base"
import { teilkultur_avg_fieldsModel } from "./teilkultur_avg_fieldsModel"
import { teilkultur_avg_fieldsModelPrimitives, teilkultur_avg_fieldsModelSelector } from "./teilkultur_avg_fieldsModel.base"
import { teilkultur_max_fieldsModel } from "./teilkultur_max_fieldsModel"
import { teilkultur_max_fieldsModelPrimitives, teilkultur_max_fieldsModelSelector } from "./teilkultur_max_fieldsModel.base"
import { teilkultur_min_fieldsModel } from "./teilkultur_min_fieldsModel"
import { teilkultur_min_fieldsModelPrimitives, teilkultur_min_fieldsModelSelector } from "./teilkultur_min_fieldsModel.base"
import { teilkultur_stddev_fieldsModel } from "./teilkultur_stddev_fieldsModel"
import { teilkultur_stddev_fieldsModelPrimitives, teilkultur_stddev_fieldsModelSelector } from "./teilkultur_stddev_fieldsModel.base"
import { teilkultur_stddev_pop_fieldsModel } from "./teilkultur_stddev_pop_fieldsModel"
import { teilkultur_stddev_pop_fieldsModelPrimitives, teilkultur_stddev_pop_fieldsModelSelector } from "./teilkultur_stddev_pop_fieldsModel.base"
import { teilkultur_stddev_samp_fieldsModel } from "./teilkultur_stddev_samp_fieldsModel"
import { teilkultur_stddev_samp_fieldsModelPrimitives, teilkultur_stddev_samp_fieldsModelSelector } from "./teilkultur_stddev_samp_fieldsModel.base"
import { teilkultur_sum_fieldsModel } from "./teilkultur_sum_fieldsModel"
import { teilkultur_sum_fieldsModelPrimitives, teilkultur_sum_fieldsModelSelector } from "./teilkultur_sum_fieldsModel.base"
import { teilkultur_var_pop_fieldsModel } from "./teilkultur_var_pop_fieldsModel"
import { teilkultur_var_pop_fieldsModelPrimitives, teilkultur_var_pop_fieldsModelSelector } from "./teilkultur_var_pop_fieldsModel.base"
import { teilkultur_var_samp_fieldsModel } from "./teilkultur_var_samp_fieldsModel"
import { teilkultur_var_samp_fieldsModelPrimitives, teilkultur_var_samp_fieldsModelSelector } from "./teilkultur_var_samp_fieldsModel.base"
import { teilkultur_variance_fieldsModel } from "./teilkultur_variance_fieldsModel"
import { teilkultur_variance_fieldsModelPrimitives, teilkultur_variance_fieldsModelSelector } from "./teilkultur_variance_fieldsModel.base"
import { zaehlung_aggregateModel } from "./zaehlung_aggregateModel"
import { zaehlung_aggregateModelPrimitives, zaehlung_aggregateModelSelector } from "./zaehlung_aggregateModel.base"
import { zaehlung_aggregate_fieldsModel } from "./zaehlung_aggregate_fieldsModel"
import { zaehlung_aggregate_fieldsModelPrimitives, zaehlung_aggregate_fieldsModelSelector } from "./zaehlung_aggregate_fieldsModel.base"
import { zaehlung_avg_fieldsModel } from "./zaehlung_avg_fieldsModel"
import { zaehlung_avg_fieldsModelPrimitives, zaehlung_avg_fieldsModelSelector } from "./zaehlung_avg_fieldsModel.base"
import { zaehlung_max_fieldsModel } from "./zaehlung_max_fieldsModel"
import { zaehlung_max_fieldsModelPrimitives, zaehlung_max_fieldsModelSelector } from "./zaehlung_max_fieldsModel.base"
import { zaehlung_min_fieldsModel } from "./zaehlung_min_fieldsModel"
import { zaehlung_min_fieldsModelPrimitives, zaehlung_min_fieldsModelSelector } from "./zaehlung_min_fieldsModel.base"
import { zaehlung_stddev_fieldsModel } from "./zaehlung_stddev_fieldsModel"
import { zaehlung_stddev_fieldsModelPrimitives, zaehlung_stddev_fieldsModelSelector } from "./zaehlung_stddev_fieldsModel.base"
import { zaehlung_stddev_pop_fieldsModel } from "./zaehlung_stddev_pop_fieldsModel"
import { zaehlung_stddev_pop_fieldsModelPrimitives, zaehlung_stddev_pop_fieldsModelSelector } from "./zaehlung_stddev_pop_fieldsModel.base"
import { zaehlung_stddev_samp_fieldsModel } from "./zaehlung_stddev_samp_fieldsModel"
import { zaehlung_stddev_samp_fieldsModelPrimitives, zaehlung_stddev_samp_fieldsModelSelector } from "./zaehlung_stddev_samp_fieldsModel.base"
import { zaehlung_sum_fieldsModel } from "./zaehlung_sum_fieldsModel"
import { zaehlung_sum_fieldsModelPrimitives, zaehlung_sum_fieldsModelSelector } from "./zaehlung_sum_fieldsModel.base"
import { zaehlung_var_pop_fieldsModel } from "./zaehlung_var_pop_fieldsModel"
import { zaehlung_var_pop_fieldsModelPrimitives, zaehlung_var_pop_fieldsModelSelector } from "./zaehlung_var_pop_fieldsModel.base"
import { zaehlung_var_samp_fieldsModel } from "./zaehlung_var_samp_fieldsModel"
import { zaehlung_var_samp_fieldsModelPrimitives, zaehlung_var_samp_fieldsModelSelector } from "./zaehlung_var_samp_fieldsModel.base"
import { zaehlung_variance_fieldsModel } from "./zaehlung_variance_fieldsModel"
import { zaehlung_variance_fieldsModelPrimitives, zaehlung_variance_fieldsModelSelector } from "./zaehlung_variance_fieldsModel.base"
import { garten_aggregateModel } from "./garten_aggregateModel"
import { garten_aggregateModelPrimitives, garten_aggregateModelSelector } from "./garten_aggregateModel.base"
import { garten_aggregate_fieldsModel } from "./garten_aggregate_fieldsModel"
import { garten_aggregate_fieldsModelPrimitives, garten_aggregate_fieldsModelSelector } from "./garten_aggregate_fieldsModel.base"
import { garten_avg_fieldsModel } from "./garten_avg_fieldsModel"
import { garten_avg_fieldsModelPrimitives, garten_avg_fieldsModelSelector } from "./garten_avg_fieldsModel.base"
import { garten_max_fieldsModel } from "./garten_max_fieldsModel"
import { garten_max_fieldsModelPrimitives, garten_max_fieldsModelSelector } from "./garten_max_fieldsModel.base"
import { garten_min_fieldsModel } from "./garten_min_fieldsModel"
import { garten_min_fieldsModelPrimitives, garten_min_fieldsModelSelector } from "./garten_min_fieldsModel.base"
import { garten_stddev_fieldsModel } from "./garten_stddev_fieldsModel"
import { garten_stddev_fieldsModelPrimitives, garten_stddev_fieldsModelSelector } from "./garten_stddev_fieldsModel.base"
import { garten_stddev_pop_fieldsModel } from "./garten_stddev_pop_fieldsModel"
import { garten_stddev_pop_fieldsModelPrimitives, garten_stddev_pop_fieldsModelSelector } from "./garten_stddev_pop_fieldsModel.base"
import { garten_stddev_samp_fieldsModel } from "./garten_stddev_samp_fieldsModel"
import { garten_stddev_samp_fieldsModelPrimitives, garten_stddev_samp_fieldsModelSelector } from "./garten_stddev_samp_fieldsModel.base"
import { garten_sum_fieldsModel } from "./garten_sum_fieldsModel"
import { garten_sum_fieldsModelPrimitives, garten_sum_fieldsModelSelector } from "./garten_sum_fieldsModel.base"
import { garten_var_pop_fieldsModel } from "./garten_var_pop_fieldsModel"
import { garten_var_pop_fieldsModelPrimitives, garten_var_pop_fieldsModelSelector } from "./garten_var_pop_fieldsModel.base"
import { garten_var_samp_fieldsModel } from "./garten_var_samp_fieldsModel"
import { garten_var_samp_fieldsModelPrimitives, garten_var_samp_fieldsModelSelector } from "./garten_var_samp_fieldsModel.base"
import { garten_variance_fieldsModel } from "./garten_variance_fieldsModel"
import { garten_variance_fieldsModelPrimitives, garten_variance_fieldsModelSelector } from "./garten_variance_fieldsModel.base"
import { person_fileModel } from "./person_fileModel"
import { person_fileModelPrimitives, person_fileModelSelector } from "./person_fileModel.base"
import { person_file_aggregateModel } from "./person_file_aggregateModel"
import { person_file_aggregateModelPrimitives, person_file_aggregateModelSelector } from "./person_file_aggregateModel.base"
import { person_file_aggregate_fieldsModel } from "./person_file_aggregate_fieldsModel"
import { person_file_aggregate_fieldsModelPrimitives, person_file_aggregate_fieldsModelSelector } from "./person_file_aggregate_fieldsModel.base"
import { person_file_max_fieldsModel } from "./person_file_max_fieldsModel"
import { person_file_max_fieldsModelPrimitives, person_file_max_fieldsModelSelector } from "./person_file_max_fieldsModel.base"
import { person_file_min_fieldsModel } from "./person_file_min_fieldsModel"
import { person_file_min_fieldsModelPrimitives, person_file_min_fieldsModelSelector } from "./person_file_min_fieldsModel.base"
import { person_optionModel } from "./person_optionModel"
import { person_optionModelPrimitives, person_optionModelSelector } from "./person_optionModel.base"
import { user_roleModel } from "./user_roleModel"
import { user_roleModelPrimitives, user_roleModelSelector } from "./user_roleModel.base"
import { person_aggregateModel } from "./person_aggregateModel"
import { person_aggregateModelPrimitives, person_aggregateModelSelector } from "./person_aggregateModel.base"
import { person_aggregate_fieldsModel } from "./person_aggregate_fieldsModel"
import { person_aggregate_fieldsModelPrimitives, person_aggregate_fieldsModelSelector } from "./person_aggregate_fieldsModel.base"
import { person_avg_fieldsModel } from "./person_avg_fieldsModel"
import { person_avg_fieldsModelPrimitives, person_avg_fieldsModelSelector } from "./person_avg_fieldsModel.base"
import { person_max_fieldsModel } from "./person_max_fieldsModel"
import { person_max_fieldsModelPrimitives, person_max_fieldsModelSelector } from "./person_max_fieldsModel.base"
import { person_min_fieldsModel } from "./person_min_fieldsModel"
import { person_min_fieldsModelPrimitives, person_min_fieldsModelSelector } from "./person_min_fieldsModel.base"
import { person_stddev_fieldsModel } from "./person_stddev_fieldsModel"
import { person_stddev_fieldsModelPrimitives, person_stddev_fieldsModelSelector } from "./person_stddev_fieldsModel.base"
import { person_stddev_pop_fieldsModel } from "./person_stddev_pop_fieldsModel"
import { person_stddev_pop_fieldsModelPrimitives, person_stddev_pop_fieldsModelSelector } from "./person_stddev_pop_fieldsModel.base"
import { person_stddev_samp_fieldsModel } from "./person_stddev_samp_fieldsModel"
import { person_stddev_samp_fieldsModelPrimitives, person_stddev_samp_fieldsModelSelector } from "./person_stddev_samp_fieldsModel.base"
import { person_sum_fieldsModel } from "./person_sum_fieldsModel"
import { person_sum_fieldsModelPrimitives, person_sum_fieldsModelSelector } from "./person_sum_fieldsModel.base"
import { person_var_pop_fieldsModel } from "./person_var_pop_fieldsModel"
import { person_var_pop_fieldsModelPrimitives, person_var_pop_fieldsModelSelector } from "./person_var_pop_fieldsModel.base"
import { person_var_samp_fieldsModel } from "./person_var_samp_fieldsModel"
import { person_var_samp_fieldsModelPrimitives, person_var_samp_fieldsModelSelector } from "./person_var_samp_fieldsModel.base"
import { person_variance_fieldsModel } from "./person_variance_fieldsModel"
import { person_variance_fieldsModelPrimitives, person_variance_fieldsModelSelector } from "./person_variance_fieldsModel.base"
import { person_revModel } from "./person_revModel"
import { person_revModelPrimitives, person_revModelSelector } from "./person_revModel.base"
import { person_rev_aggregateModel } from "./person_rev_aggregateModel"
import { person_rev_aggregateModelPrimitives, person_rev_aggregateModelSelector } from "./person_rev_aggregateModel.base"
import { person_rev_aggregate_fieldsModel } from "./person_rev_aggregate_fieldsModel"
import { person_rev_aggregate_fieldsModelPrimitives, person_rev_aggregate_fieldsModelSelector } from "./person_rev_aggregate_fieldsModel.base"
import { person_rev_avg_fieldsModel } from "./person_rev_avg_fieldsModel"
import { person_rev_avg_fieldsModelPrimitives, person_rev_avg_fieldsModelSelector } from "./person_rev_avg_fieldsModel.base"
import { person_rev_max_fieldsModel } from "./person_rev_max_fieldsModel"
import { person_rev_max_fieldsModelPrimitives, person_rev_max_fieldsModelSelector } from "./person_rev_max_fieldsModel.base"
import { person_rev_min_fieldsModel } from "./person_rev_min_fieldsModel"
import { person_rev_min_fieldsModelPrimitives, person_rev_min_fieldsModelSelector } from "./person_rev_min_fieldsModel.base"
import { person_rev_stddev_fieldsModel } from "./person_rev_stddev_fieldsModel"
import { person_rev_stddev_fieldsModelPrimitives, person_rev_stddev_fieldsModelSelector } from "./person_rev_stddev_fieldsModel.base"
import { person_rev_stddev_pop_fieldsModel } from "./person_rev_stddev_pop_fieldsModel"
import { person_rev_stddev_pop_fieldsModelPrimitives, person_rev_stddev_pop_fieldsModelSelector } from "./person_rev_stddev_pop_fieldsModel.base"
import { person_rev_stddev_samp_fieldsModel } from "./person_rev_stddev_samp_fieldsModel"
import { person_rev_stddev_samp_fieldsModelPrimitives, person_rev_stddev_samp_fieldsModelSelector } from "./person_rev_stddev_samp_fieldsModel.base"
import { person_rev_sum_fieldsModel } from "./person_rev_sum_fieldsModel"
import { person_rev_sum_fieldsModelPrimitives, person_rev_sum_fieldsModelSelector } from "./person_rev_sum_fieldsModel.base"
import { person_rev_var_pop_fieldsModel } from "./person_rev_var_pop_fieldsModel"
import { person_rev_var_pop_fieldsModelPrimitives, person_rev_var_pop_fieldsModelSelector } from "./person_rev_var_pop_fieldsModel.base"
import { person_rev_var_samp_fieldsModel } from "./person_rev_var_samp_fieldsModel"
import { person_rev_var_samp_fieldsModelPrimitives, person_rev_var_samp_fieldsModelSelector } from "./person_rev_var_samp_fieldsModel.base"
import { person_rev_variance_fieldsModel } from "./person_rev_variance_fieldsModel"
import { person_rev_variance_fieldsModelPrimitives, person_rev_variance_fieldsModelSelector } from "./person_rev_variance_fieldsModel.base"
import { ae_art_aggregateModel } from "./ae_art_aggregateModel"
import { ae_art_aggregateModelPrimitives, ae_art_aggregateModelSelector } from "./ae_art_aggregateModel.base"
import { ae_art_aggregate_fieldsModel } from "./ae_art_aggregate_fieldsModel"
import { ae_art_aggregate_fieldsModelPrimitives, ae_art_aggregate_fieldsModelSelector } from "./ae_art_aggregate_fieldsModel.base"
import { ae_art_max_fieldsModel } from "./ae_art_max_fieldsModel"
import { ae_art_max_fieldsModelPrimitives, ae_art_max_fieldsModelSelector } from "./ae_art_max_fieldsModel.base"
import { ae_art_min_fieldsModel } from "./ae_art_min_fieldsModel"
import { ae_art_min_fieldsModelPrimitives, ae_art_min_fieldsModelSelector } from "./ae_art_min_fieldsModel.base"
import { art_aggregateModel } from "./art_aggregateModel"
import { art_aggregateModelPrimitives, art_aggregateModelSelector } from "./art_aggregateModel.base"
import { art_aggregate_fieldsModel } from "./art_aggregate_fieldsModel"
import { art_aggregate_fieldsModelPrimitives, art_aggregate_fieldsModelSelector } from "./art_aggregate_fieldsModel.base"
import { art_avg_fieldsModel } from "./art_avg_fieldsModel"
import { art_avg_fieldsModelPrimitives, art_avg_fieldsModelSelector } from "./art_avg_fieldsModel.base"
import { art_max_fieldsModel } from "./art_max_fieldsModel"
import { art_max_fieldsModelPrimitives, art_max_fieldsModelSelector } from "./art_max_fieldsModel.base"
import { art_min_fieldsModel } from "./art_min_fieldsModel"
import { art_min_fieldsModelPrimitives, art_min_fieldsModelSelector } from "./art_min_fieldsModel.base"
import { art_stddev_fieldsModel } from "./art_stddev_fieldsModel"
import { art_stddev_fieldsModelPrimitives, art_stddev_fieldsModelSelector } from "./art_stddev_fieldsModel.base"
import { art_stddev_pop_fieldsModel } from "./art_stddev_pop_fieldsModel"
import { art_stddev_pop_fieldsModelPrimitives, art_stddev_pop_fieldsModelSelector } from "./art_stddev_pop_fieldsModel.base"
import { art_stddev_samp_fieldsModel } from "./art_stddev_samp_fieldsModel"
import { art_stddev_samp_fieldsModelPrimitives, art_stddev_samp_fieldsModelSelector } from "./art_stddev_samp_fieldsModel.base"
import { art_sum_fieldsModel } from "./art_sum_fieldsModel"
import { art_sum_fieldsModelPrimitives, art_sum_fieldsModelSelector } from "./art_sum_fieldsModel.base"
import { art_var_pop_fieldsModel } from "./art_var_pop_fieldsModel"
import { art_var_pop_fieldsModelPrimitives, art_var_pop_fieldsModelSelector } from "./art_var_pop_fieldsModel.base"
import { art_var_samp_fieldsModel } from "./art_var_samp_fieldsModel"
import { art_var_samp_fieldsModelPrimitives, art_var_samp_fieldsModelSelector } from "./art_var_samp_fieldsModel.base"
import { art_variance_fieldsModel } from "./art_variance_fieldsModel"
import { art_variance_fieldsModelPrimitives, art_variance_fieldsModelSelector } from "./art_variance_fieldsModel.base"
import { art_qk_aggregateModel } from "./art_qk_aggregateModel"
import { art_qk_aggregateModelPrimitives, art_qk_aggregateModelSelector } from "./art_qk_aggregateModel.base"
import { art_qk_aggregate_fieldsModel } from "./art_qk_aggregate_fieldsModel"
import { art_qk_aggregate_fieldsModelPrimitives, art_qk_aggregate_fieldsModelSelector } from "./art_qk_aggregate_fieldsModel.base"
import { art_qk_avg_fieldsModel } from "./art_qk_avg_fieldsModel"
import { art_qk_avg_fieldsModelPrimitives, art_qk_avg_fieldsModelSelector } from "./art_qk_avg_fieldsModel.base"
import { art_qk_max_fieldsModel } from "./art_qk_max_fieldsModel"
import { art_qk_max_fieldsModelPrimitives, art_qk_max_fieldsModelSelector } from "./art_qk_max_fieldsModel.base"
import { art_qk_min_fieldsModel } from "./art_qk_min_fieldsModel"
import { art_qk_min_fieldsModelPrimitives, art_qk_min_fieldsModelSelector } from "./art_qk_min_fieldsModel.base"
import { art_qk_stddev_fieldsModel } from "./art_qk_stddev_fieldsModel"
import { art_qk_stddev_fieldsModelPrimitives, art_qk_stddev_fieldsModelSelector } from "./art_qk_stddev_fieldsModel.base"
import { art_qk_stddev_pop_fieldsModel } from "./art_qk_stddev_pop_fieldsModel"
import { art_qk_stddev_pop_fieldsModelPrimitives, art_qk_stddev_pop_fieldsModelSelector } from "./art_qk_stddev_pop_fieldsModel.base"
import { art_qk_stddev_samp_fieldsModel } from "./art_qk_stddev_samp_fieldsModel"
import { art_qk_stddev_samp_fieldsModelPrimitives, art_qk_stddev_samp_fieldsModelSelector } from "./art_qk_stddev_samp_fieldsModel.base"
import { art_qk_sum_fieldsModel } from "./art_qk_sum_fieldsModel"
import { art_qk_sum_fieldsModelPrimitives, art_qk_sum_fieldsModelSelector } from "./art_qk_sum_fieldsModel.base"
import { art_qk_var_pop_fieldsModel } from "./art_qk_var_pop_fieldsModel"
import { art_qk_var_pop_fieldsModelPrimitives, art_qk_var_pop_fieldsModelSelector } from "./art_qk_var_pop_fieldsModel.base"
import { art_qk_var_samp_fieldsModel } from "./art_qk_var_samp_fieldsModel"
import { art_qk_var_samp_fieldsModelPrimitives, art_qk_var_samp_fieldsModelSelector } from "./art_qk_var_samp_fieldsModel.base"
import { art_qk_variance_fieldsModel } from "./art_qk_variance_fieldsModel"
import { art_qk_variance_fieldsModelPrimitives, art_qk_variance_fieldsModelSelector } from "./art_qk_variance_fieldsModel.base"
import { art_revModel } from "./art_revModel"
import { art_revModelPrimitives, art_revModelSelector } from "./art_revModel.base"
import { art_rev_aggregateModel } from "./art_rev_aggregateModel"
import { art_rev_aggregateModelPrimitives, art_rev_aggregateModelSelector } from "./art_rev_aggregateModel.base"
import { art_rev_aggregate_fieldsModel } from "./art_rev_aggregate_fieldsModel"
import { art_rev_aggregate_fieldsModelPrimitives, art_rev_aggregate_fieldsModelSelector } from "./art_rev_aggregate_fieldsModel.base"
import { art_rev_avg_fieldsModel } from "./art_rev_avg_fieldsModel"
import { art_rev_avg_fieldsModelPrimitives, art_rev_avg_fieldsModelSelector } from "./art_rev_avg_fieldsModel.base"
import { art_rev_max_fieldsModel } from "./art_rev_max_fieldsModel"
import { art_rev_max_fieldsModelPrimitives, art_rev_max_fieldsModelSelector } from "./art_rev_max_fieldsModel.base"
import { art_rev_min_fieldsModel } from "./art_rev_min_fieldsModel"
import { art_rev_min_fieldsModelPrimitives, art_rev_min_fieldsModelSelector } from "./art_rev_min_fieldsModel.base"
import { art_rev_stddev_fieldsModel } from "./art_rev_stddev_fieldsModel"
import { art_rev_stddev_fieldsModelPrimitives, art_rev_stddev_fieldsModelSelector } from "./art_rev_stddev_fieldsModel.base"
import { art_rev_stddev_pop_fieldsModel } from "./art_rev_stddev_pop_fieldsModel"
import { art_rev_stddev_pop_fieldsModelPrimitives, art_rev_stddev_pop_fieldsModelSelector } from "./art_rev_stddev_pop_fieldsModel.base"
import { art_rev_stddev_samp_fieldsModel } from "./art_rev_stddev_samp_fieldsModel"
import { art_rev_stddev_samp_fieldsModelPrimitives, art_rev_stddev_samp_fieldsModelSelector } from "./art_rev_stddev_samp_fieldsModel.base"
import { art_rev_sum_fieldsModel } from "./art_rev_sum_fieldsModel"
import { art_rev_sum_fieldsModelPrimitives, art_rev_sum_fieldsModelSelector } from "./art_rev_sum_fieldsModel.base"
import { art_rev_var_pop_fieldsModel } from "./art_rev_var_pop_fieldsModel"
import { art_rev_var_pop_fieldsModelPrimitives, art_rev_var_pop_fieldsModelSelector } from "./art_rev_var_pop_fieldsModel.base"
import { art_rev_var_samp_fieldsModel } from "./art_rev_var_samp_fieldsModel"
import { art_rev_var_samp_fieldsModelPrimitives, art_rev_var_samp_fieldsModelSelector } from "./art_rev_var_samp_fieldsModel.base"
import { art_rev_variance_fieldsModel } from "./art_rev_variance_fieldsModel"
import { art_rev_variance_fieldsModelPrimitives, art_rev_variance_fieldsModelSelector } from "./art_rev_variance_fieldsModel.base"
import { event_revModel } from "./event_revModel"
import { event_revModelPrimitives, event_revModelSelector } from "./event_revModel.base"
import { event_rev_aggregateModel } from "./event_rev_aggregateModel"
import { event_rev_aggregateModelPrimitives, event_rev_aggregateModelSelector } from "./event_rev_aggregateModel.base"
import { event_rev_aggregate_fieldsModel } from "./event_rev_aggregate_fieldsModel"
import { event_rev_aggregate_fieldsModelPrimitives, event_rev_aggregate_fieldsModelSelector } from "./event_rev_aggregate_fieldsModel.base"
import { event_rev_avg_fieldsModel } from "./event_rev_avg_fieldsModel"
import { event_rev_avg_fieldsModelPrimitives, event_rev_avg_fieldsModelSelector } from "./event_rev_avg_fieldsModel.base"
import { event_rev_max_fieldsModel } from "./event_rev_max_fieldsModel"
import { event_rev_max_fieldsModelPrimitives, event_rev_max_fieldsModelSelector } from "./event_rev_max_fieldsModel.base"
import { event_rev_min_fieldsModel } from "./event_rev_min_fieldsModel"
import { event_rev_min_fieldsModelPrimitives, event_rev_min_fieldsModelSelector } from "./event_rev_min_fieldsModel.base"
import { event_rev_stddev_fieldsModel } from "./event_rev_stddev_fieldsModel"
import { event_rev_stddev_fieldsModelPrimitives, event_rev_stddev_fieldsModelSelector } from "./event_rev_stddev_fieldsModel.base"
import { event_rev_stddev_pop_fieldsModel } from "./event_rev_stddev_pop_fieldsModel"
import { event_rev_stddev_pop_fieldsModelPrimitives, event_rev_stddev_pop_fieldsModelSelector } from "./event_rev_stddev_pop_fieldsModel.base"
import { event_rev_stddev_samp_fieldsModel } from "./event_rev_stddev_samp_fieldsModel"
import { event_rev_stddev_samp_fieldsModelPrimitives, event_rev_stddev_samp_fieldsModelSelector } from "./event_rev_stddev_samp_fieldsModel.base"
import { event_rev_sum_fieldsModel } from "./event_rev_sum_fieldsModel"
import { event_rev_sum_fieldsModelPrimitives, event_rev_sum_fieldsModelSelector } from "./event_rev_sum_fieldsModel.base"
import { event_rev_var_pop_fieldsModel } from "./event_rev_var_pop_fieldsModel"
import { event_rev_var_pop_fieldsModelPrimitives, event_rev_var_pop_fieldsModelSelector } from "./event_rev_var_pop_fieldsModel.base"
import { event_rev_var_samp_fieldsModel } from "./event_rev_var_samp_fieldsModel"
import { event_rev_var_samp_fieldsModelPrimitives, event_rev_var_samp_fieldsModelSelector } from "./event_rev_var_samp_fieldsModel.base"
import { event_rev_variance_fieldsModel } from "./event_rev_variance_fieldsModel"
import { event_rev_variance_fieldsModelPrimitives, event_rev_variance_fieldsModelSelector } from "./event_rev_variance_fieldsModel.base"
import { garten_revModel } from "./garten_revModel"
import { garten_revModelPrimitives, garten_revModelSelector } from "./garten_revModel.base"
import { garten_rev_aggregateModel } from "./garten_rev_aggregateModel"
import { garten_rev_aggregateModelPrimitives, garten_rev_aggregateModelSelector } from "./garten_rev_aggregateModel.base"
import { garten_rev_aggregate_fieldsModel } from "./garten_rev_aggregate_fieldsModel"
import { garten_rev_aggregate_fieldsModelPrimitives, garten_rev_aggregate_fieldsModelSelector } from "./garten_rev_aggregate_fieldsModel.base"
import { garten_rev_avg_fieldsModel } from "./garten_rev_avg_fieldsModel"
import { garten_rev_avg_fieldsModelPrimitives, garten_rev_avg_fieldsModelSelector } from "./garten_rev_avg_fieldsModel.base"
import { garten_rev_max_fieldsModel } from "./garten_rev_max_fieldsModel"
import { garten_rev_max_fieldsModelPrimitives, garten_rev_max_fieldsModelSelector } from "./garten_rev_max_fieldsModel.base"
import { garten_rev_min_fieldsModel } from "./garten_rev_min_fieldsModel"
import { garten_rev_min_fieldsModelPrimitives, garten_rev_min_fieldsModelSelector } from "./garten_rev_min_fieldsModel.base"
import { garten_rev_stddev_fieldsModel } from "./garten_rev_stddev_fieldsModel"
import { garten_rev_stddev_fieldsModelPrimitives, garten_rev_stddev_fieldsModelSelector } from "./garten_rev_stddev_fieldsModel.base"
import { garten_rev_stddev_pop_fieldsModel } from "./garten_rev_stddev_pop_fieldsModel"
import { garten_rev_stddev_pop_fieldsModelPrimitives, garten_rev_stddev_pop_fieldsModelSelector } from "./garten_rev_stddev_pop_fieldsModel.base"
import { garten_rev_stddev_samp_fieldsModel } from "./garten_rev_stddev_samp_fieldsModel"
import { garten_rev_stddev_samp_fieldsModelPrimitives, garten_rev_stddev_samp_fieldsModelSelector } from "./garten_rev_stddev_samp_fieldsModel.base"
import { garten_rev_sum_fieldsModel } from "./garten_rev_sum_fieldsModel"
import { garten_rev_sum_fieldsModelPrimitives, garten_rev_sum_fieldsModelSelector } from "./garten_rev_sum_fieldsModel.base"
import { garten_rev_var_pop_fieldsModel } from "./garten_rev_var_pop_fieldsModel"
import { garten_rev_var_pop_fieldsModelPrimitives, garten_rev_var_pop_fieldsModelSelector } from "./garten_rev_var_pop_fieldsModel.base"
import { garten_rev_var_samp_fieldsModel } from "./garten_rev_var_samp_fieldsModel"
import { garten_rev_var_samp_fieldsModelPrimitives, garten_rev_var_samp_fieldsModelSelector } from "./garten_rev_var_samp_fieldsModel.base"
import { garten_rev_variance_fieldsModel } from "./garten_rev_variance_fieldsModel"
import { garten_rev_variance_fieldsModelPrimitives, garten_rev_variance_fieldsModelSelector } from "./garten_rev_variance_fieldsModel.base"
import { herkunft_aggregateModel } from "./herkunft_aggregateModel"
import { herkunft_aggregateModelPrimitives, herkunft_aggregateModelSelector } from "./herkunft_aggregateModel.base"
import { herkunft_aggregate_fieldsModel } from "./herkunft_aggregate_fieldsModel"
import { herkunft_aggregate_fieldsModelPrimitives, herkunft_aggregate_fieldsModelSelector } from "./herkunft_aggregate_fieldsModel.base"
import { herkunft_avg_fieldsModel } from "./herkunft_avg_fieldsModel"
import { herkunft_avg_fieldsModelPrimitives, herkunft_avg_fieldsModelSelector } from "./herkunft_avg_fieldsModel.base"
import { herkunft_max_fieldsModel } from "./herkunft_max_fieldsModel"
import { herkunft_max_fieldsModelPrimitives, herkunft_max_fieldsModelSelector } from "./herkunft_max_fieldsModel.base"
import { herkunft_min_fieldsModel } from "./herkunft_min_fieldsModel"
import { herkunft_min_fieldsModelPrimitives, herkunft_min_fieldsModelSelector } from "./herkunft_min_fieldsModel.base"
import { herkunft_stddev_fieldsModel } from "./herkunft_stddev_fieldsModel"
import { herkunft_stddev_fieldsModelPrimitives, herkunft_stddev_fieldsModelSelector } from "./herkunft_stddev_fieldsModel.base"
import { herkunft_stddev_pop_fieldsModel } from "./herkunft_stddev_pop_fieldsModel"
import { herkunft_stddev_pop_fieldsModelPrimitives, herkunft_stddev_pop_fieldsModelSelector } from "./herkunft_stddev_pop_fieldsModel.base"
import { herkunft_stddev_samp_fieldsModel } from "./herkunft_stddev_samp_fieldsModel"
import { herkunft_stddev_samp_fieldsModelPrimitives, herkunft_stddev_samp_fieldsModelSelector } from "./herkunft_stddev_samp_fieldsModel.base"
import { herkunft_sum_fieldsModel } from "./herkunft_sum_fieldsModel"
import { herkunft_sum_fieldsModelPrimitives, herkunft_sum_fieldsModelSelector } from "./herkunft_sum_fieldsModel.base"
import { herkunft_var_pop_fieldsModel } from "./herkunft_var_pop_fieldsModel"
import { herkunft_var_pop_fieldsModelPrimitives, herkunft_var_pop_fieldsModelSelector } from "./herkunft_var_pop_fieldsModel.base"
import { herkunft_var_samp_fieldsModel } from "./herkunft_var_samp_fieldsModel"
import { herkunft_var_samp_fieldsModelPrimitives, herkunft_var_samp_fieldsModelSelector } from "./herkunft_var_samp_fieldsModel.base"
import { herkunft_variance_fieldsModel } from "./herkunft_variance_fieldsModel"
import { herkunft_variance_fieldsModelPrimitives, herkunft_variance_fieldsModelSelector } from "./herkunft_variance_fieldsModel.base"
import { herkunft_revModel } from "./herkunft_revModel"
import { herkunft_revModelPrimitives, herkunft_revModelSelector } from "./herkunft_revModel.base"
import { herkunft_rev_aggregateModel } from "./herkunft_rev_aggregateModel"
import { herkunft_rev_aggregateModelPrimitives, herkunft_rev_aggregateModelSelector } from "./herkunft_rev_aggregateModel.base"
import { herkunft_rev_aggregate_fieldsModel } from "./herkunft_rev_aggregate_fieldsModel"
import { herkunft_rev_aggregate_fieldsModelPrimitives, herkunft_rev_aggregate_fieldsModelSelector } from "./herkunft_rev_aggregate_fieldsModel.base"
import { herkunft_rev_avg_fieldsModel } from "./herkunft_rev_avg_fieldsModel"
import { herkunft_rev_avg_fieldsModelPrimitives, herkunft_rev_avg_fieldsModelSelector } from "./herkunft_rev_avg_fieldsModel.base"
import { herkunft_rev_max_fieldsModel } from "./herkunft_rev_max_fieldsModel"
import { herkunft_rev_max_fieldsModelPrimitives, herkunft_rev_max_fieldsModelSelector } from "./herkunft_rev_max_fieldsModel.base"
import { herkunft_rev_min_fieldsModel } from "./herkunft_rev_min_fieldsModel"
import { herkunft_rev_min_fieldsModelPrimitives, herkunft_rev_min_fieldsModelSelector } from "./herkunft_rev_min_fieldsModel.base"
import { herkunft_rev_stddev_fieldsModel } from "./herkunft_rev_stddev_fieldsModel"
import { herkunft_rev_stddev_fieldsModelPrimitives, herkunft_rev_stddev_fieldsModelSelector } from "./herkunft_rev_stddev_fieldsModel.base"
import { herkunft_rev_stddev_pop_fieldsModel } from "./herkunft_rev_stddev_pop_fieldsModel"
import { herkunft_rev_stddev_pop_fieldsModelPrimitives, herkunft_rev_stddev_pop_fieldsModelSelector } from "./herkunft_rev_stddev_pop_fieldsModel.base"
import { herkunft_rev_stddev_samp_fieldsModel } from "./herkunft_rev_stddev_samp_fieldsModel"
import { herkunft_rev_stddev_samp_fieldsModelPrimitives, herkunft_rev_stddev_samp_fieldsModelSelector } from "./herkunft_rev_stddev_samp_fieldsModel.base"
import { herkunft_rev_sum_fieldsModel } from "./herkunft_rev_sum_fieldsModel"
import { herkunft_rev_sum_fieldsModelPrimitives, herkunft_rev_sum_fieldsModelSelector } from "./herkunft_rev_sum_fieldsModel.base"
import { herkunft_rev_var_pop_fieldsModel } from "./herkunft_rev_var_pop_fieldsModel"
import { herkunft_rev_var_pop_fieldsModelPrimitives, herkunft_rev_var_pop_fieldsModelSelector } from "./herkunft_rev_var_pop_fieldsModel.base"
import { herkunft_rev_var_samp_fieldsModel } from "./herkunft_rev_var_samp_fieldsModel"
import { herkunft_rev_var_samp_fieldsModelPrimitives, herkunft_rev_var_samp_fieldsModelSelector } from "./herkunft_rev_var_samp_fieldsModel.base"
import { herkunft_rev_variance_fieldsModel } from "./herkunft_rev_variance_fieldsModel"
import { herkunft_rev_variance_fieldsModelPrimitives, herkunft_rev_variance_fieldsModelSelector } from "./herkunft_rev_variance_fieldsModel.base"
import { kultur_option_aggregateModel } from "./kultur_option_aggregateModel"
import { kultur_option_aggregateModelPrimitives, kultur_option_aggregateModelSelector } from "./kultur_option_aggregateModel.base"
import { kultur_option_aggregate_fieldsModel } from "./kultur_option_aggregate_fieldsModel"
import { kultur_option_aggregate_fieldsModelPrimitives, kultur_option_aggregate_fieldsModelSelector } from "./kultur_option_aggregate_fieldsModel.base"
import { kultur_option_avg_fieldsModel } from "./kultur_option_avg_fieldsModel"
import { kultur_option_avg_fieldsModelPrimitives, kultur_option_avg_fieldsModelSelector } from "./kultur_option_avg_fieldsModel.base"
import { kultur_option_max_fieldsModel } from "./kultur_option_max_fieldsModel"
import { kultur_option_max_fieldsModelPrimitives, kultur_option_max_fieldsModelSelector } from "./kultur_option_max_fieldsModel.base"
import { kultur_option_min_fieldsModel } from "./kultur_option_min_fieldsModel"
import { kultur_option_min_fieldsModelPrimitives, kultur_option_min_fieldsModelSelector } from "./kultur_option_min_fieldsModel.base"
import { kultur_option_stddev_fieldsModel } from "./kultur_option_stddev_fieldsModel"
import { kultur_option_stddev_fieldsModelPrimitives, kultur_option_stddev_fieldsModelSelector } from "./kultur_option_stddev_fieldsModel.base"
import { kultur_option_stddev_pop_fieldsModel } from "./kultur_option_stddev_pop_fieldsModel"
import { kultur_option_stddev_pop_fieldsModelPrimitives, kultur_option_stddev_pop_fieldsModelSelector } from "./kultur_option_stddev_pop_fieldsModel.base"
import { kultur_option_stddev_samp_fieldsModel } from "./kultur_option_stddev_samp_fieldsModel"
import { kultur_option_stddev_samp_fieldsModelPrimitives, kultur_option_stddev_samp_fieldsModelSelector } from "./kultur_option_stddev_samp_fieldsModel.base"
import { kultur_option_sum_fieldsModel } from "./kultur_option_sum_fieldsModel"
import { kultur_option_sum_fieldsModelPrimitives, kultur_option_sum_fieldsModelSelector } from "./kultur_option_sum_fieldsModel.base"
import { kultur_option_var_pop_fieldsModel } from "./kultur_option_var_pop_fieldsModel"
import { kultur_option_var_pop_fieldsModelPrimitives, kultur_option_var_pop_fieldsModelSelector } from "./kultur_option_var_pop_fieldsModel.base"
import { kultur_option_var_samp_fieldsModel } from "./kultur_option_var_samp_fieldsModel"
import { kultur_option_var_samp_fieldsModelPrimitives, kultur_option_var_samp_fieldsModelSelector } from "./kultur_option_var_samp_fieldsModel.base"
import { kultur_option_variance_fieldsModel } from "./kultur_option_variance_fieldsModel"
import { kultur_option_variance_fieldsModelPrimitives, kultur_option_variance_fieldsModelSelector } from "./kultur_option_variance_fieldsModel.base"
import { kultur_option_revModel } from "./kultur_option_revModel"
import { kultur_option_revModelPrimitives, kultur_option_revModelSelector } from "./kultur_option_revModel.base"
import { kultur_option_rev_aggregateModel } from "./kultur_option_rev_aggregateModel"
import { kultur_option_rev_aggregateModelPrimitives, kultur_option_rev_aggregateModelSelector } from "./kultur_option_rev_aggregateModel.base"
import { kultur_option_rev_aggregate_fieldsModel } from "./kultur_option_rev_aggregate_fieldsModel"
import { kultur_option_rev_aggregate_fieldsModelPrimitives, kultur_option_rev_aggregate_fieldsModelSelector } from "./kultur_option_rev_aggregate_fieldsModel.base"
import { kultur_option_rev_avg_fieldsModel } from "./kultur_option_rev_avg_fieldsModel"
import { kultur_option_rev_avg_fieldsModelPrimitives, kultur_option_rev_avg_fieldsModelSelector } from "./kultur_option_rev_avg_fieldsModel.base"
import { kultur_option_rev_max_fieldsModel } from "./kultur_option_rev_max_fieldsModel"
import { kultur_option_rev_max_fieldsModelPrimitives, kultur_option_rev_max_fieldsModelSelector } from "./kultur_option_rev_max_fieldsModel.base"
import { kultur_option_rev_min_fieldsModel } from "./kultur_option_rev_min_fieldsModel"
import { kultur_option_rev_min_fieldsModelPrimitives, kultur_option_rev_min_fieldsModelSelector } from "./kultur_option_rev_min_fieldsModel.base"
import { kultur_option_rev_stddev_fieldsModel } from "./kultur_option_rev_stddev_fieldsModel"
import { kultur_option_rev_stddev_fieldsModelPrimitives, kultur_option_rev_stddev_fieldsModelSelector } from "./kultur_option_rev_stddev_fieldsModel.base"
import { kultur_option_rev_stddev_pop_fieldsModel } from "./kultur_option_rev_stddev_pop_fieldsModel"
import { kultur_option_rev_stddev_pop_fieldsModelPrimitives, kultur_option_rev_stddev_pop_fieldsModelSelector } from "./kultur_option_rev_stddev_pop_fieldsModel.base"
import { kultur_option_rev_stddev_samp_fieldsModel } from "./kultur_option_rev_stddev_samp_fieldsModel"
import { kultur_option_rev_stddev_samp_fieldsModelPrimitives, kultur_option_rev_stddev_samp_fieldsModelSelector } from "./kultur_option_rev_stddev_samp_fieldsModel.base"
import { kultur_option_rev_sum_fieldsModel } from "./kultur_option_rev_sum_fieldsModel"
import { kultur_option_rev_sum_fieldsModelPrimitives, kultur_option_rev_sum_fieldsModelSelector } from "./kultur_option_rev_sum_fieldsModel.base"
import { kultur_option_rev_var_pop_fieldsModel } from "./kultur_option_rev_var_pop_fieldsModel"
import { kultur_option_rev_var_pop_fieldsModelPrimitives, kultur_option_rev_var_pop_fieldsModelSelector } from "./kultur_option_rev_var_pop_fieldsModel.base"
import { kultur_option_rev_var_samp_fieldsModel } from "./kultur_option_rev_var_samp_fieldsModel"
import { kultur_option_rev_var_samp_fieldsModelPrimitives, kultur_option_rev_var_samp_fieldsModelSelector } from "./kultur_option_rev_var_samp_fieldsModel.base"
import { kultur_option_rev_variance_fieldsModel } from "./kultur_option_rev_variance_fieldsModel"
import { kultur_option_rev_variance_fieldsModelPrimitives, kultur_option_rev_variance_fieldsModelSelector } from "./kultur_option_rev_variance_fieldsModel.base"
import { kultur_qk_aggregateModel } from "./kultur_qk_aggregateModel"
import { kultur_qk_aggregateModelPrimitives, kultur_qk_aggregateModelSelector } from "./kultur_qk_aggregateModel.base"
import { kultur_qk_aggregate_fieldsModel } from "./kultur_qk_aggregate_fieldsModel"
import { kultur_qk_aggregate_fieldsModelPrimitives, kultur_qk_aggregate_fieldsModelSelector } from "./kultur_qk_aggregate_fieldsModel.base"
import { kultur_qk_avg_fieldsModel } from "./kultur_qk_avg_fieldsModel"
import { kultur_qk_avg_fieldsModelPrimitives, kultur_qk_avg_fieldsModelSelector } from "./kultur_qk_avg_fieldsModel.base"
import { kultur_qk_max_fieldsModel } from "./kultur_qk_max_fieldsModel"
import { kultur_qk_max_fieldsModelPrimitives, kultur_qk_max_fieldsModelSelector } from "./kultur_qk_max_fieldsModel.base"
import { kultur_qk_min_fieldsModel } from "./kultur_qk_min_fieldsModel"
import { kultur_qk_min_fieldsModelPrimitives, kultur_qk_min_fieldsModelSelector } from "./kultur_qk_min_fieldsModel.base"
import { kultur_qk_stddev_fieldsModel } from "./kultur_qk_stddev_fieldsModel"
import { kultur_qk_stddev_fieldsModelPrimitives, kultur_qk_stddev_fieldsModelSelector } from "./kultur_qk_stddev_fieldsModel.base"
import { kultur_qk_stddev_pop_fieldsModel } from "./kultur_qk_stddev_pop_fieldsModel"
import { kultur_qk_stddev_pop_fieldsModelPrimitives, kultur_qk_stddev_pop_fieldsModelSelector } from "./kultur_qk_stddev_pop_fieldsModel.base"
import { kultur_qk_stddev_samp_fieldsModel } from "./kultur_qk_stddev_samp_fieldsModel"
import { kultur_qk_stddev_samp_fieldsModelPrimitives, kultur_qk_stddev_samp_fieldsModelSelector } from "./kultur_qk_stddev_samp_fieldsModel.base"
import { kultur_qk_sum_fieldsModel } from "./kultur_qk_sum_fieldsModel"
import { kultur_qk_sum_fieldsModelPrimitives, kultur_qk_sum_fieldsModelSelector } from "./kultur_qk_sum_fieldsModel.base"
import { kultur_qk_var_pop_fieldsModel } from "./kultur_qk_var_pop_fieldsModel"
import { kultur_qk_var_pop_fieldsModelPrimitives, kultur_qk_var_pop_fieldsModelSelector } from "./kultur_qk_var_pop_fieldsModel.base"
import { kultur_qk_var_samp_fieldsModel } from "./kultur_qk_var_samp_fieldsModel"
import { kultur_qk_var_samp_fieldsModelPrimitives, kultur_qk_var_samp_fieldsModelSelector } from "./kultur_qk_var_samp_fieldsModel.base"
import { kultur_qk_variance_fieldsModel } from "./kultur_qk_variance_fieldsModel"
import { kultur_qk_variance_fieldsModelPrimitives, kultur_qk_variance_fieldsModelSelector } from "./kultur_qk_variance_fieldsModel.base"
import { kultur_revModel } from "./kultur_revModel"
import { kultur_revModelPrimitives, kultur_revModelSelector } from "./kultur_revModel.base"
import { kultur_rev_aggregateModel } from "./kultur_rev_aggregateModel"
import { kultur_rev_aggregateModelPrimitives, kultur_rev_aggregateModelSelector } from "./kultur_rev_aggregateModel.base"
import { kultur_rev_aggregate_fieldsModel } from "./kultur_rev_aggregate_fieldsModel"
import { kultur_rev_aggregate_fieldsModelPrimitives, kultur_rev_aggregate_fieldsModelSelector } from "./kultur_rev_aggregate_fieldsModel.base"
import { kultur_rev_avg_fieldsModel } from "./kultur_rev_avg_fieldsModel"
import { kultur_rev_avg_fieldsModelPrimitives, kultur_rev_avg_fieldsModelSelector } from "./kultur_rev_avg_fieldsModel.base"
import { kultur_rev_max_fieldsModel } from "./kultur_rev_max_fieldsModel"
import { kultur_rev_max_fieldsModelPrimitives, kultur_rev_max_fieldsModelSelector } from "./kultur_rev_max_fieldsModel.base"
import { kultur_rev_min_fieldsModel } from "./kultur_rev_min_fieldsModel"
import { kultur_rev_min_fieldsModelPrimitives, kultur_rev_min_fieldsModelSelector } from "./kultur_rev_min_fieldsModel.base"
import { kultur_rev_stddev_fieldsModel } from "./kultur_rev_stddev_fieldsModel"
import { kultur_rev_stddev_fieldsModelPrimitives, kultur_rev_stddev_fieldsModelSelector } from "./kultur_rev_stddev_fieldsModel.base"
import { kultur_rev_stddev_pop_fieldsModel } from "./kultur_rev_stddev_pop_fieldsModel"
import { kultur_rev_stddev_pop_fieldsModelPrimitives, kultur_rev_stddev_pop_fieldsModelSelector } from "./kultur_rev_stddev_pop_fieldsModel.base"
import { kultur_rev_stddev_samp_fieldsModel } from "./kultur_rev_stddev_samp_fieldsModel"
import { kultur_rev_stddev_samp_fieldsModelPrimitives, kultur_rev_stddev_samp_fieldsModelSelector } from "./kultur_rev_stddev_samp_fieldsModel.base"
import { kultur_rev_sum_fieldsModel } from "./kultur_rev_sum_fieldsModel"
import { kultur_rev_sum_fieldsModelPrimitives, kultur_rev_sum_fieldsModelSelector } from "./kultur_rev_sum_fieldsModel.base"
import { kultur_rev_var_pop_fieldsModel } from "./kultur_rev_var_pop_fieldsModel"
import { kultur_rev_var_pop_fieldsModelPrimitives, kultur_rev_var_pop_fieldsModelSelector } from "./kultur_rev_var_pop_fieldsModel.base"
import { kultur_rev_var_samp_fieldsModel } from "./kultur_rev_var_samp_fieldsModel"
import { kultur_rev_var_samp_fieldsModelPrimitives, kultur_rev_var_samp_fieldsModelSelector } from "./kultur_rev_var_samp_fieldsModel.base"
import { kultur_rev_variance_fieldsModel } from "./kultur_rev_variance_fieldsModel"
import { kultur_rev_variance_fieldsModelPrimitives, kultur_rev_variance_fieldsModelSelector } from "./kultur_rev_variance_fieldsModel.base"
import { lieferung_revModel } from "./lieferung_revModel"
import { lieferung_revModelPrimitives, lieferung_revModelSelector } from "./lieferung_revModel.base"
import { lieferung_rev_aggregateModel } from "./lieferung_rev_aggregateModel"
import { lieferung_rev_aggregateModelPrimitives, lieferung_rev_aggregateModelSelector } from "./lieferung_rev_aggregateModel.base"
import { lieferung_rev_aggregate_fieldsModel } from "./lieferung_rev_aggregate_fieldsModel"
import { lieferung_rev_aggregate_fieldsModelPrimitives, lieferung_rev_aggregate_fieldsModelSelector } from "./lieferung_rev_aggregate_fieldsModel.base"
import { lieferung_rev_avg_fieldsModel } from "./lieferung_rev_avg_fieldsModel"
import { lieferung_rev_avg_fieldsModelPrimitives, lieferung_rev_avg_fieldsModelSelector } from "./lieferung_rev_avg_fieldsModel.base"
import { lieferung_rev_max_fieldsModel } from "./lieferung_rev_max_fieldsModel"
import { lieferung_rev_max_fieldsModelPrimitives, lieferung_rev_max_fieldsModelSelector } from "./lieferung_rev_max_fieldsModel.base"
import { lieferung_rev_min_fieldsModel } from "./lieferung_rev_min_fieldsModel"
import { lieferung_rev_min_fieldsModelPrimitives, lieferung_rev_min_fieldsModelSelector } from "./lieferung_rev_min_fieldsModel.base"
import { lieferung_rev_stddev_fieldsModel } from "./lieferung_rev_stddev_fieldsModel"
import { lieferung_rev_stddev_fieldsModelPrimitives, lieferung_rev_stddev_fieldsModelSelector } from "./lieferung_rev_stddev_fieldsModel.base"
import { lieferung_rev_stddev_pop_fieldsModel } from "./lieferung_rev_stddev_pop_fieldsModel"
import { lieferung_rev_stddev_pop_fieldsModelPrimitives, lieferung_rev_stddev_pop_fieldsModelSelector } from "./lieferung_rev_stddev_pop_fieldsModel.base"
import { lieferung_rev_stddev_samp_fieldsModel } from "./lieferung_rev_stddev_samp_fieldsModel"
import { lieferung_rev_stddev_samp_fieldsModelPrimitives, lieferung_rev_stddev_samp_fieldsModelSelector } from "./lieferung_rev_stddev_samp_fieldsModel.base"
import { lieferung_rev_sum_fieldsModel } from "./lieferung_rev_sum_fieldsModel"
import { lieferung_rev_sum_fieldsModelPrimitives, lieferung_rev_sum_fieldsModelSelector } from "./lieferung_rev_sum_fieldsModel.base"
import { lieferung_rev_var_pop_fieldsModel } from "./lieferung_rev_var_pop_fieldsModel"
import { lieferung_rev_var_pop_fieldsModelPrimitives, lieferung_rev_var_pop_fieldsModelSelector } from "./lieferung_rev_var_pop_fieldsModel.base"
import { lieferung_rev_var_samp_fieldsModel } from "./lieferung_rev_var_samp_fieldsModel"
import { lieferung_rev_var_samp_fieldsModelPrimitives, lieferung_rev_var_samp_fieldsModelSelector } from "./lieferung_rev_var_samp_fieldsModel.base"
import { lieferung_rev_variance_fieldsModel } from "./lieferung_rev_variance_fieldsModel"
import { lieferung_rev_variance_fieldsModelPrimitives, lieferung_rev_variance_fieldsModelSelector } from "./lieferung_rev_variance_fieldsModel.base"
import { person_option_aggregateModel } from "./person_option_aggregateModel"
import { person_option_aggregateModelPrimitives, person_option_aggregateModelSelector } from "./person_option_aggregateModel.base"
import { person_option_aggregate_fieldsModel } from "./person_option_aggregate_fieldsModel"
import { person_option_aggregate_fieldsModelPrimitives, person_option_aggregate_fieldsModelSelector } from "./person_option_aggregate_fieldsModel.base"
import { person_option_avg_fieldsModel } from "./person_option_avg_fieldsModel"
import { person_option_avg_fieldsModelPrimitives, person_option_avg_fieldsModelSelector } from "./person_option_avg_fieldsModel.base"
import { person_option_max_fieldsModel } from "./person_option_max_fieldsModel"
import { person_option_max_fieldsModelPrimitives, person_option_max_fieldsModelSelector } from "./person_option_max_fieldsModel.base"
import { person_option_min_fieldsModel } from "./person_option_min_fieldsModel"
import { person_option_min_fieldsModelPrimitives, person_option_min_fieldsModelSelector } from "./person_option_min_fieldsModel.base"
import { person_option_stddev_fieldsModel } from "./person_option_stddev_fieldsModel"
import { person_option_stddev_fieldsModelPrimitives, person_option_stddev_fieldsModelSelector } from "./person_option_stddev_fieldsModel.base"
import { person_option_stddev_pop_fieldsModel } from "./person_option_stddev_pop_fieldsModel"
import { person_option_stddev_pop_fieldsModelPrimitives, person_option_stddev_pop_fieldsModelSelector } from "./person_option_stddev_pop_fieldsModel.base"
import { person_option_stddev_samp_fieldsModel } from "./person_option_stddev_samp_fieldsModel"
import { person_option_stddev_samp_fieldsModelPrimitives, person_option_stddev_samp_fieldsModelSelector } from "./person_option_stddev_samp_fieldsModel.base"
import { person_option_sum_fieldsModel } from "./person_option_sum_fieldsModel"
import { person_option_sum_fieldsModelPrimitives, person_option_sum_fieldsModelSelector } from "./person_option_sum_fieldsModel.base"
import { person_option_var_pop_fieldsModel } from "./person_option_var_pop_fieldsModel"
import { person_option_var_pop_fieldsModelPrimitives, person_option_var_pop_fieldsModelSelector } from "./person_option_var_pop_fieldsModel.base"
import { person_option_var_samp_fieldsModel } from "./person_option_var_samp_fieldsModel"
import { person_option_var_samp_fieldsModelPrimitives, person_option_var_samp_fieldsModelSelector } from "./person_option_var_samp_fieldsModel.base"
import { person_option_variance_fieldsModel } from "./person_option_variance_fieldsModel"
import { person_option_variance_fieldsModelPrimitives, person_option_variance_fieldsModelSelector } from "./person_option_variance_fieldsModel.base"
import { person_option_revModel } from "./person_option_revModel"
import { person_option_revModelPrimitives, person_option_revModelSelector } from "./person_option_revModel.base"
import { person_option_rev_aggregateModel } from "./person_option_rev_aggregateModel"
import { person_option_rev_aggregateModelPrimitives, person_option_rev_aggregateModelSelector } from "./person_option_rev_aggregateModel.base"
import { person_option_rev_aggregate_fieldsModel } from "./person_option_rev_aggregate_fieldsModel"
import { person_option_rev_aggregate_fieldsModelPrimitives, person_option_rev_aggregate_fieldsModelSelector } from "./person_option_rev_aggregate_fieldsModel.base"
import { person_option_rev_avg_fieldsModel } from "./person_option_rev_avg_fieldsModel"
import { person_option_rev_avg_fieldsModelPrimitives, person_option_rev_avg_fieldsModelSelector } from "./person_option_rev_avg_fieldsModel.base"
import { person_option_rev_max_fieldsModel } from "./person_option_rev_max_fieldsModel"
import { person_option_rev_max_fieldsModelPrimitives, person_option_rev_max_fieldsModelSelector } from "./person_option_rev_max_fieldsModel.base"
import { person_option_rev_min_fieldsModel } from "./person_option_rev_min_fieldsModel"
import { person_option_rev_min_fieldsModelPrimitives, person_option_rev_min_fieldsModelSelector } from "./person_option_rev_min_fieldsModel.base"
import { person_option_rev_stddev_fieldsModel } from "./person_option_rev_stddev_fieldsModel"
import { person_option_rev_stddev_fieldsModelPrimitives, person_option_rev_stddev_fieldsModelSelector } from "./person_option_rev_stddev_fieldsModel.base"
import { person_option_rev_stddev_pop_fieldsModel } from "./person_option_rev_stddev_pop_fieldsModel"
import { person_option_rev_stddev_pop_fieldsModelPrimitives, person_option_rev_stddev_pop_fieldsModelSelector } from "./person_option_rev_stddev_pop_fieldsModel.base"
import { person_option_rev_stddev_samp_fieldsModel } from "./person_option_rev_stddev_samp_fieldsModel"
import { person_option_rev_stddev_samp_fieldsModelPrimitives, person_option_rev_stddev_samp_fieldsModelSelector } from "./person_option_rev_stddev_samp_fieldsModel.base"
import { person_option_rev_sum_fieldsModel } from "./person_option_rev_sum_fieldsModel"
import { person_option_rev_sum_fieldsModelPrimitives, person_option_rev_sum_fieldsModelSelector } from "./person_option_rev_sum_fieldsModel.base"
import { person_option_rev_var_pop_fieldsModel } from "./person_option_rev_var_pop_fieldsModel"
import { person_option_rev_var_pop_fieldsModelPrimitives, person_option_rev_var_pop_fieldsModelSelector } from "./person_option_rev_var_pop_fieldsModel.base"
import { person_option_rev_var_samp_fieldsModel } from "./person_option_rev_var_samp_fieldsModel"
import { person_option_rev_var_samp_fieldsModelPrimitives, person_option_rev_var_samp_fieldsModelSelector } from "./person_option_rev_var_samp_fieldsModel.base"
import { person_option_rev_variance_fieldsModel } from "./person_option_rev_variance_fieldsModel"
import { person_option_rev_variance_fieldsModelPrimitives, person_option_rev_variance_fieldsModelSelector } from "./person_option_rev_variance_fieldsModel.base"
import { sammel_lieferung_revModel } from "./sammel_lieferung_revModel"
import { sammel_lieferung_revModelPrimitives, sammel_lieferung_revModelSelector } from "./sammel_lieferung_revModel.base"
import { sammel_lieferung_rev_aggregateModel } from "./sammel_lieferung_rev_aggregateModel"
import { sammel_lieferung_rev_aggregateModelPrimitives, sammel_lieferung_rev_aggregateModelSelector } from "./sammel_lieferung_rev_aggregateModel.base"
import { sammel_lieferung_rev_aggregate_fieldsModel } from "./sammel_lieferung_rev_aggregate_fieldsModel"
import { sammel_lieferung_rev_aggregate_fieldsModelPrimitives, sammel_lieferung_rev_aggregate_fieldsModelSelector } from "./sammel_lieferung_rev_aggregate_fieldsModel.base"
import { sammel_lieferung_rev_avg_fieldsModel } from "./sammel_lieferung_rev_avg_fieldsModel"
import { sammel_lieferung_rev_avg_fieldsModelPrimitives, sammel_lieferung_rev_avg_fieldsModelSelector } from "./sammel_lieferung_rev_avg_fieldsModel.base"
import { sammel_lieferung_rev_max_fieldsModel } from "./sammel_lieferung_rev_max_fieldsModel"
import { sammel_lieferung_rev_max_fieldsModelPrimitives, sammel_lieferung_rev_max_fieldsModelSelector } from "./sammel_lieferung_rev_max_fieldsModel.base"
import { sammel_lieferung_rev_min_fieldsModel } from "./sammel_lieferung_rev_min_fieldsModel"
import { sammel_lieferung_rev_min_fieldsModelPrimitives, sammel_lieferung_rev_min_fieldsModelSelector } from "./sammel_lieferung_rev_min_fieldsModel.base"
import { sammel_lieferung_rev_stddev_fieldsModel } from "./sammel_lieferung_rev_stddev_fieldsModel"
import { sammel_lieferung_rev_stddev_fieldsModelPrimitives, sammel_lieferung_rev_stddev_fieldsModelSelector } from "./sammel_lieferung_rev_stddev_fieldsModel.base"
import { sammel_lieferung_rev_stddev_pop_fieldsModel } from "./sammel_lieferung_rev_stddev_pop_fieldsModel"
import { sammel_lieferung_rev_stddev_pop_fieldsModelPrimitives, sammel_lieferung_rev_stddev_pop_fieldsModelSelector } from "./sammel_lieferung_rev_stddev_pop_fieldsModel.base"
import { sammel_lieferung_rev_stddev_samp_fieldsModel } from "./sammel_lieferung_rev_stddev_samp_fieldsModel"
import { sammel_lieferung_rev_stddev_samp_fieldsModelPrimitives, sammel_lieferung_rev_stddev_samp_fieldsModelSelector } from "./sammel_lieferung_rev_stddev_samp_fieldsModel.base"
import { sammel_lieferung_rev_sum_fieldsModel } from "./sammel_lieferung_rev_sum_fieldsModel"
import { sammel_lieferung_rev_sum_fieldsModelPrimitives, sammel_lieferung_rev_sum_fieldsModelSelector } from "./sammel_lieferung_rev_sum_fieldsModel.base"
import { sammel_lieferung_rev_var_pop_fieldsModel } from "./sammel_lieferung_rev_var_pop_fieldsModel"
import { sammel_lieferung_rev_var_pop_fieldsModelPrimitives, sammel_lieferung_rev_var_pop_fieldsModelSelector } from "./sammel_lieferung_rev_var_pop_fieldsModel.base"
import { sammel_lieferung_rev_var_samp_fieldsModel } from "./sammel_lieferung_rev_var_samp_fieldsModel"
import { sammel_lieferung_rev_var_samp_fieldsModelPrimitives, sammel_lieferung_rev_var_samp_fieldsModelSelector } from "./sammel_lieferung_rev_var_samp_fieldsModel.base"
import { sammel_lieferung_rev_variance_fieldsModel } from "./sammel_lieferung_rev_variance_fieldsModel"
import { sammel_lieferung_rev_variance_fieldsModelPrimitives, sammel_lieferung_rev_variance_fieldsModelSelector } from "./sammel_lieferung_rev_variance_fieldsModel.base"
import { sammlung_revModel } from "./sammlung_revModel"
import { sammlung_revModelPrimitives, sammlung_revModelSelector } from "./sammlung_revModel.base"
import { sammlung_rev_aggregateModel } from "./sammlung_rev_aggregateModel"
import { sammlung_rev_aggregateModelPrimitives, sammlung_rev_aggregateModelSelector } from "./sammlung_rev_aggregateModel.base"
import { sammlung_rev_aggregate_fieldsModel } from "./sammlung_rev_aggregate_fieldsModel"
import { sammlung_rev_aggregate_fieldsModelPrimitives, sammlung_rev_aggregate_fieldsModelSelector } from "./sammlung_rev_aggregate_fieldsModel.base"
import { sammlung_rev_avg_fieldsModel } from "./sammlung_rev_avg_fieldsModel"
import { sammlung_rev_avg_fieldsModelPrimitives, sammlung_rev_avg_fieldsModelSelector } from "./sammlung_rev_avg_fieldsModel.base"
import { sammlung_rev_max_fieldsModel } from "./sammlung_rev_max_fieldsModel"
import { sammlung_rev_max_fieldsModelPrimitives, sammlung_rev_max_fieldsModelSelector } from "./sammlung_rev_max_fieldsModel.base"
import { sammlung_rev_min_fieldsModel } from "./sammlung_rev_min_fieldsModel"
import { sammlung_rev_min_fieldsModelPrimitives, sammlung_rev_min_fieldsModelSelector } from "./sammlung_rev_min_fieldsModel.base"
import { sammlung_rev_stddev_fieldsModel } from "./sammlung_rev_stddev_fieldsModel"
import { sammlung_rev_stddev_fieldsModelPrimitives, sammlung_rev_stddev_fieldsModelSelector } from "./sammlung_rev_stddev_fieldsModel.base"
import { sammlung_rev_stddev_pop_fieldsModel } from "./sammlung_rev_stddev_pop_fieldsModel"
import { sammlung_rev_stddev_pop_fieldsModelPrimitives, sammlung_rev_stddev_pop_fieldsModelSelector } from "./sammlung_rev_stddev_pop_fieldsModel.base"
import { sammlung_rev_stddev_samp_fieldsModel } from "./sammlung_rev_stddev_samp_fieldsModel"
import { sammlung_rev_stddev_samp_fieldsModelPrimitives, sammlung_rev_stddev_samp_fieldsModelSelector } from "./sammlung_rev_stddev_samp_fieldsModel.base"
import { sammlung_rev_sum_fieldsModel } from "./sammlung_rev_sum_fieldsModel"
import { sammlung_rev_sum_fieldsModelPrimitives, sammlung_rev_sum_fieldsModelSelector } from "./sammlung_rev_sum_fieldsModel.base"
import { sammlung_rev_var_pop_fieldsModel } from "./sammlung_rev_var_pop_fieldsModel"
import { sammlung_rev_var_pop_fieldsModelPrimitives, sammlung_rev_var_pop_fieldsModelSelector } from "./sammlung_rev_var_pop_fieldsModel.base"
import { sammlung_rev_var_samp_fieldsModel } from "./sammlung_rev_var_samp_fieldsModel"
import { sammlung_rev_var_samp_fieldsModelPrimitives, sammlung_rev_var_samp_fieldsModelSelector } from "./sammlung_rev_var_samp_fieldsModel.base"
import { sammlung_rev_variance_fieldsModel } from "./sammlung_rev_variance_fieldsModel"
import { sammlung_rev_variance_fieldsModelPrimitives, sammlung_rev_variance_fieldsModelSelector } from "./sammlung_rev_variance_fieldsModel.base"
import { spatial_ref_sysModel } from "./spatial_ref_sysModel"
import { spatial_ref_sysModelPrimitives, spatial_ref_sysModelSelector } from "./spatial_ref_sysModel.base"
import { spatial_ref_sys_aggregateModel } from "./spatial_ref_sys_aggregateModel"
import { spatial_ref_sys_aggregateModelPrimitives, spatial_ref_sys_aggregateModelSelector } from "./spatial_ref_sys_aggregateModel.base"
import { spatial_ref_sys_aggregate_fieldsModel } from "./spatial_ref_sys_aggregate_fieldsModel"
import { spatial_ref_sys_aggregate_fieldsModelPrimitives, spatial_ref_sys_aggregate_fieldsModelSelector } from "./spatial_ref_sys_aggregate_fieldsModel.base"
import { spatial_ref_sys_avg_fieldsModel } from "./spatial_ref_sys_avg_fieldsModel"
import { spatial_ref_sys_avg_fieldsModelPrimitives, spatial_ref_sys_avg_fieldsModelSelector } from "./spatial_ref_sys_avg_fieldsModel.base"
import { spatial_ref_sys_max_fieldsModel } from "./spatial_ref_sys_max_fieldsModel"
import { spatial_ref_sys_max_fieldsModelPrimitives, spatial_ref_sys_max_fieldsModelSelector } from "./spatial_ref_sys_max_fieldsModel.base"
import { spatial_ref_sys_min_fieldsModel } from "./spatial_ref_sys_min_fieldsModel"
import { spatial_ref_sys_min_fieldsModelPrimitives, spatial_ref_sys_min_fieldsModelSelector } from "./spatial_ref_sys_min_fieldsModel.base"
import { spatial_ref_sys_stddev_fieldsModel } from "./spatial_ref_sys_stddev_fieldsModel"
import { spatial_ref_sys_stddev_fieldsModelPrimitives, spatial_ref_sys_stddev_fieldsModelSelector } from "./spatial_ref_sys_stddev_fieldsModel.base"
import { spatial_ref_sys_stddev_pop_fieldsModel } from "./spatial_ref_sys_stddev_pop_fieldsModel"
import { spatial_ref_sys_stddev_pop_fieldsModelPrimitives, spatial_ref_sys_stddev_pop_fieldsModelSelector } from "./spatial_ref_sys_stddev_pop_fieldsModel.base"
import { spatial_ref_sys_stddev_samp_fieldsModel } from "./spatial_ref_sys_stddev_samp_fieldsModel"
import { spatial_ref_sys_stddev_samp_fieldsModelPrimitives, spatial_ref_sys_stddev_samp_fieldsModelSelector } from "./spatial_ref_sys_stddev_samp_fieldsModel.base"
import { spatial_ref_sys_sum_fieldsModel } from "./spatial_ref_sys_sum_fieldsModel"
import { spatial_ref_sys_sum_fieldsModelPrimitives, spatial_ref_sys_sum_fieldsModelSelector } from "./spatial_ref_sys_sum_fieldsModel.base"
import { spatial_ref_sys_var_pop_fieldsModel } from "./spatial_ref_sys_var_pop_fieldsModel"
import { spatial_ref_sys_var_pop_fieldsModelPrimitives, spatial_ref_sys_var_pop_fieldsModelSelector } from "./spatial_ref_sys_var_pop_fieldsModel.base"
import { spatial_ref_sys_var_samp_fieldsModel } from "./spatial_ref_sys_var_samp_fieldsModel"
import { spatial_ref_sys_var_samp_fieldsModelPrimitives, spatial_ref_sys_var_samp_fieldsModelSelector } from "./spatial_ref_sys_var_samp_fieldsModel.base"
import { spatial_ref_sys_variance_fieldsModel } from "./spatial_ref_sys_variance_fieldsModel"
import { spatial_ref_sys_variance_fieldsModelPrimitives, spatial_ref_sys_variance_fieldsModelSelector } from "./spatial_ref_sys_variance_fieldsModel.base"
import { teilkultur_revModel } from "./teilkultur_revModel"
import { teilkultur_revModelPrimitives, teilkultur_revModelSelector } from "./teilkultur_revModel.base"
import { teilkultur_rev_aggregateModel } from "./teilkultur_rev_aggregateModel"
import { teilkultur_rev_aggregateModelPrimitives, teilkultur_rev_aggregateModelSelector } from "./teilkultur_rev_aggregateModel.base"
import { teilkultur_rev_aggregate_fieldsModel } from "./teilkultur_rev_aggregate_fieldsModel"
import { teilkultur_rev_aggregate_fieldsModelPrimitives, teilkultur_rev_aggregate_fieldsModelSelector } from "./teilkultur_rev_aggregate_fieldsModel.base"
import { teilkultur_rev_avg_fieldsModel } from "./teilkultur_rev_avg_fieldsModel"
import { teilkultur_rev_avg_fieldsModelPrimitives, teilkultur_rev_avg_fieldsModelSelector } from "./teilkultur_rev_avg_fieldsModel.base"
import { teilkultur_rev_max_fieldsModel } from "./teilkultur_rev_max_fieldsModel"
import { teilkultur_rev_max_fieldsModelPrimitives, teilkultur_rev_max_fieldsModelSelector } from "./teilkultur_rev_max_fieldsModel.base"
import { teilkultur_rev_min_fieldsModel } from "./teilkultur_rev_min_fieldsModel"
import { teilkultur_rev_min_fieldsModelPrimitives, teilkultur_rev_min_fieldsModelSelector } from "./teilkultur_rev_min_fieldsModel.base"
import { teilkultur_rev_stddev_fieldsModel } from "./teilkultur_rev_stddev_fieldsModel"
import { teilkultur_rev_stddev_fieldsModelPrimitives, teilkultur_rev_stddev_fieldsModelSelector } from "./teilkultur_rev_stddev_fieldsModel.base"
import { teilkultur_rev_stddev_pop_fieldsModel } from "./teilkultur_rev_stddev_pop_fieldsModel"
import { teilkultur_rev_stddev_pop_fieldsModelPrimitives, teilkultur_rev_stddev_pop_fieldsModelSelector } from "./teilkultur_rev_stddev_pop_fieldsModel.base"
import { teilkultur_rev_stddev_samp_fieldsModel } from "./teilkultur_rev_stddev_samp_fieldsModel"
import { teilkultur_rev_stddev_samp_fieldsModelPrimitives, teilkultur_rev_stddev_samp_fieldsModelSelector } from "./teilkultur_rev_stddev_samp_fieldsModel.base"
import { teilkultur_rev_sum_fieldsModel } from "./teilkultur_rev_sum_fieldsModel"
import { teilkultur_rev_sum_fieldsModelPrimitives, teilkultur_rev_sum_fieldsModelSelector } from "./teilkultur_rev_sum_fieldsModel.base"
import { teilkultur_rev_var_pop_fieldsModel } from "./teilkultur_rev_var_pop_fieldsModel"
import { teilkultur_rev_var_pop_fieldsModelPrimitives, teilkultur_rev_var_pop_fieldsModelSelector } from "./teilkultur_rev_var_pop_fieldsModel.base"
import { teilkultur_rev_var_samp_fieldsModel } from "./teilkultur_rev_var_samp_fieldsModel"
import { teilkultur_rev_var_samp_fieldsModelPrimitives, teilkultur_rev_var_samp_fieldsModelSelector } from "./teilkultur_rev_var_samp_fieldsModel.base"
import { teilkultur_rev_variance_fieldsModel } from "./teilkultur_rev_variance_fieldsModel"
import { teilkultur_rev_variance_fieldsModelPrimitives, teilkultur_rev_variance_fieldsModelSelector } from "./teilkultur_rev_variance_fieldsModel.base"
import { teilzaehlung_revModel } from "./teilzaehlung_revModel"
import { teilzaehlung_revModelPrimitives, teilzaehlung_revModelSelector } from "./teilzaehlung_revModel.base"
import { teilzaehlung_rev_aggregateModel } from "./teilzaehlung_rev_aggregateModel"
import { teilzaehlung_rev_aggregateModelPrimitives, teilzaehlung_rev_aggregateModelSelector } from "./teilzaehlung_rev_aggregateModel.base"
import { teilzaehlung_rev_aggregate_fieldsModel } from "./teilzaehlung_rev_aggregate_fieldsModel"
import { teilzaehlung_rev_aggregate_fieldsModelPrimitives, teilzaehlung_rev_aggregate_fieldsModelSelector } from "./teilzaehlung_rev_aggregate_fieldsModel.base"
import { teilzaehlung_rev_avg_fieldsModel } from "./teilzaehlung_rev_avg_fieldsModel"
import { teilzaehlung_rev_avg_fieldsModelPrimitives, teilzaehlung_rev_avg_fieldsModelSelector } from "./teilzaehlung_rev_avg_fieldsModel.base"
import { teilzaehlung_rev_max_fieldsModel } from "./teilzaehlung_rev_max_fieldsModel"
import { teilzaehlung_rev_max_fieldsModelPrimitives, teilzaehlung_rev_max_fieldsModelSelector } from "./teilzaehlung_rev_max_fieldsModel.base"
import { teilzaehlung_rev_min_fieldsModel } from "./teilzaehlung_rev_min_fieldsModel"
import { teilzaehlung_rev_min_fieldsModelPrimitives, teilzaehlung_rev_min_fieldsModelSelector } from "./teilzaehlung_rev_min_fieldsModel.base"
import { teilzaehlung_rev_stddev_fieldsModel } from "./teilzaehlung_rev_stddev_fieldsModel"
import { teilzaehlung_rev_stddev_fieldsModelPrimitives, teilzaehlung_rev_stddev_fieldsModelSelector } from "./teilzaehlung_rev_stddev_fieldsModel.base"
import { teilzaehlung_rev_stddev_pop_fieldsModel } from "./teilzaehlung_rev_stddev_pop_fieldsModel"
import { teilzaehlung_rev_stddev_pop_fieldsModelPrimitives, teilzaehlung_rev_stddev_pop_fieldsModelSelector } from "./teilzaehlung_rev_stddev_pop_fieldsModel.base"
import { teilzaehlung_rev_stddev_samp_fieldsModel } from "./teilzaehlung_rev_stddev_samp_fieldsModel"
import { teilzaehlung_rev_stddev_samp_fieldsModelPrimitives, teilzaehlung_rev_stddev_samp_fieldsModelSelector } from "./teilzaehlung_rev_stddev_samp_fieldsModel.base"
import { teilzaehlung_rev_sum_fieldsModel } from "./teilzaehlung_rev_sum_fieldsModel"
import { teilzaehlung_rev_sum_fieldsModelPrimitives, teilzaehlung_rev_sum_fieldsModelSelector } from "./teilzaehlung_rev_sum_fieldsModel.base"
import { teilzaehlung_rev_var_pop_fieldsModel } from "./teilzaehlung_rev_var_pop_fieldsModel"
import { teilzaehlung_rev_var_pop_fieldsModelPrimitives, teilzaehlung_rev_var_pop_fieldsModelSelector } from "./teilzaehlung_rev_var_pop_fieldsModel.base"
import { teilzaehlung_rev_var_samp_fieldsModel } from "./teilzaehlung_rev_var_samp_fieldsModel"
import { teilzaehlung_rev_var_samp_fieldsModelPrimitives, teilzaehlung_rev_var_samp_fieldsModelSelector } from "./teilzaehlung_rev_var_samp_fieldsModel.base"
import { teilzaehlung_rev_variance_fieldsModel } from "./teilzaehlung_rev_variance_fieldsModel"
import { teilzaehlung_rev_variance_fieldsModelPrimitives, teilzaehlung_rev_variance_fieldsModelSelector } from "./teilzaehlung_rev_variance_fieldsModel.base"
import { user_role_aggregateModel } from "./user_role_aggregateModel"
import { user_role_aggregateModelPrimitives, user_role_aggregateModelSelector } from "./user_role_aggregateModel.base"
import { user_role_aggregate_fieldsModel } from "./user_role_aggregate_fieldsModel"
import { user_role_aggregate_fieldsModelPrimitives, user_role_aggregate_fieldsModelSelector } from "./user_role_aggregate_fieldsModel.base"
import { user_role_avg_fieldsModel } from "./user_role_avg_fieldsModel"
import { user_role_avg_fieldsModelPrimitives, user_role_avg_fieldsModelSelector } from "./user_role_avg_fieldsModel.base"
import { user_role_max_fieldsModel } from "./user_role_max_fieldsModel"
import { user_role_max_fieldsModelPrimitives, user_role_max_fieldsModelSelector } from "./user_role_max_fieldsModel.base"
import { user_role_min_fieldsModel } from "./user_role_min_fieldsModel"
import { user_role_min_fieldsModelPrimitives, user_role_min_fieldsModelSelector } from "./user_role_min_fieldsModel.base"
import { user_role_stddev_fieldsModel } from "./user_role_stddev_fieldsModel"
import { user_role_stddev_fieldsModelPrimitives, user_role_stddev_fieldsModelSelector } from "./user_role_stddev_fieldsModel.base"
import { user_role_stddev_pop_fieldsModel } from "./user_role_stddev_pop_fieldsModel"
import { user_role_stddev_pop_fieldsModelPrimitives, user_role_stddev_pop_fieldsModelSelector } from "./user_role_stddev_pop_fieldsModel.base"
import { user_role_stddev_samp_fieldsModel } from "./user_role_stddev_samp_fieldsModel"
import { user_role_stddev_samp_fieldsModelPrimitives, user_role_stddev_samp_fieldsModelSelector } from "./user_role_stddev_samp_fieldsModel.base"
import { user_role_sum_fieldsModel } from "./user_role_sum_fieldsModel"
import { user_role_sum_fieldsModelPrimitives, user_role_sum_fieldsModelSelector } from "./user_role_sum_fieldsModel.base"
import { user_role_var_pop_fieldsModel } from "./user_role_var_pop_fieldsModel"
import { user_role_var_pop_fieldsModelPrimitives, user_role_var_pop_fieldsModelSelector } from "./user_role_var_pop_fieldsModel.base"
import { user_role_var_samp_fieldsModel } from "./user_role_var_samp_fieldsModel"
import { user_role_var_samp_fieldsModelPrimitives, user_role_var_samp_fieldsModelSelector } from "./user_role_var_samp_fieldsModel.base"
import { user_role_variance_fieldsModel } from "./user_role_variance_fieldsModel"
import { user_role_variance_fieldsModelPrimitives, user_role_variance_fieldsModelSelector } from "./user_role_variance_fieldsModel.base"
import { zaehlung_revModel } from "./zaehlung_revModel"
import { zaehlung_revModelPrimitives, zaehlung_revModelSelector } from "./zaehlung_revModel.base"
import { zaehlung_rev_aggregateModel } from "./zaehlung_rev_aggregateModel"
import { zaehlung_rev_aggregateModelPrimitives, zaehlung_rev_aggregateModelSelector } from "./zaehlung_rev_aggregateModel.base"
import { zaehlung_rev_aggregate_fieldsModel } from "./zaehlung_rev_aggregate_fieldsModel"
import { zaehlung_rev_aggregate_fieldsModelPrimitives, zaehlung_rev_aggregate_fieldsModelSelector } from "./zaehlung_rev_aggregate_fieldsModel.base"
import { zaehlung_rev_avg_fieldsModel } from "./zaehlung_rev_avg_fieldsModel"
import { zaehlung_rev_avg_fieldsModelPrimitives, zaehlung_rev_avg_fieldsModelSelector } from "./zaehlung_rev_avg_fieldsModel.base"
import { zaehlung_rev_max_fieldsModel } from "./zaehlung_rev_max_fieldsModel"
import { zaehlung_rev_max_fieldsModelPrimitives, zaehlung_rev_max_fieldsModelSelector } from "./zaehlung_rev_max_fieldsModel.base"
import { zaehlung_rev_min_fieldsModel } from "./zaehlung_rev_min_fieldsModel"
import { zaehlung_rev_min_fieldsModelPrimitives, zaehlung_rev_min_fieldsModelSelector } from "./zaehlung_rev_min_fieldsModel.base"
import { zaehlung_rev_stddev_fieldsModel } from "./zaehlung_rev_stddev_fieldsModel"
import { zaehlung_rev_stddev_fieldsModelPrimitives, zaehlung_rev_stddev_fieldsModelSelector } from "./zaehlung_rev_stddev_fieldsModel.base"
import { zaehlung_rev_stddev_pop_fieldsModel } from "./zaehlung_rev_stddev_pop_fieldsModel"
import { zaehlung_rev_stddev_pop_fieldsModelPrimitives, zaehlung_rev_stddev_pop_fieldsModelSelector } from "./zaehlung_rev_stddev_pop_fieldsModel.base"
import { zaehlung_rev_stddev_samp_fieldsModel } from "./zaehlung_rev_stddev_samp_fieldsModel"
import { zaehlung_rev_stddev_samp_fieldsModelPrimitives, zaehlung_rev_stddev_samp_fieldsModelSelector } from "./zaehlung_rev_stddev_samp_fieldsModel.base"
import { zaehlung_rev_sum_fieldsModel } from "./zaehlung_rev_sum_fieldsModel"
import { zaehlung_rev_sum_fieldsModelPrimitives, zaehlung_rev_sum_fieldsModelSelector } from "./zaehlung_rev_sum_fieldsModel.base"
import { zaehlung_rev_var_pop_fieldsModel } from "./zaehlung_rev_var_pop_fieldsModel"
import { zaehlung_rev_var_pop_fieldsModelPrimitives, zaehlung_rev_var_pop_fieldsModelSelector } from "./zaehlung_rev_var_pop_fieldsModel.base"
import { zaehlung_rev_var_samp_fieldsModel } from "./zaehlung_rev_var_samp_fieldsModel"
import { zaehlung_rev_var_samp_fieldsModelPrimitives, zaehlung_rev_var_samp_fieldsModelSelector } from "./zaehlung_rev_var_samp_fieldsModel.base"
import { zaehlung_rev_variance_fieldsModel } from "./zaehlung_rev_variance_fieldsModel"
import { zaehlung_rev_variance_fieldsModelPrimitives, zaehlung_rev_variance_fieldsModelSelector } from "./zaehlung_rev_variance_fieldsModel.base"
import { mutation_rootModel } from "./mutation_rootModel"
import { mutation_rootModelPrimitives, mutation_rootModelSelector } from "./mutation_rootModel.base"
import { ae_art_mutation_responseModel } from "./ae_art_mutation_responseModel"
import { ae_art_mutation_responseModelPrimitives, ae_art_mutation_responseModelSelector } from "./ae_art_mutation_responseModel.base"
import { art_mutation_responseModel } from "./art_mutation_responseModel"
import { art_mutation_responseModelPrimitives, art_mutation_responseModelSelector } from "./art_mutation_responseModel.base"
import { art_file_mutation_responseModel } from "./art_file_mutation_responseModel"
import { art_file_mutation_responseModelPrimitives, art_file_mutation_responseModelSelector } from "./art_file_mutation_responseModel.base"
import { art_qk_mutation_responseModel } from "./art_qk_mutation_responseModel"
import { art_qk_mutation_responseModelPrimitives, art_qk_mutation_responseModelSelector } from "./art_qk_mutation_responseModel.base"
import { art_qk_choosen_mutation_responseModel } from "./art_qk_choosen_mutation_responseModel"
import { art_qk_choosen_mutation_responseModelPrimitives, art_qk_choosen_mutation_responseModelSelector } from "./art_qk_choosen_mutation_responseModel.base"
import { art_rev_mutation_responseModel } from "./art_rev_mutation_responseModel"
import { art_rev_mutation_responseModelPrimitives, art_rev_mutation_responseModelSelector } from "./art_rev_mutation_responseModel.base"
import { av_art_mutation_responseModel } from "./av_art_mutation_responseModel"
import { av_art_mutation_responseModelPrimitives, av_art_mutation_responseModelSelector } from "./av_art_mutation_responseModel.base"
import { event_mutation_responseModel } from "./event_mutation_responseModel"
import { event_mutation_responseModelPrimitives, event_mutation_responseModelSelector } from "./event_mutation_responseModel.base"
import { event_rev_mutation_responseModel } from "./event_rev_mutation_responseModel"
import { event_rev_mutation_responseModelPrimitives, event_rev_mutation_responseModelSelector } from "./event_rev_mutation_responseModel.base"
import { garten_mutation_responseModel } from "./garten_mutation_responseModel"
import { garten_mutation_responseModelPrimitives, garten_mutation_responseModelSelector } from "./garten_mutation_responseModel.base"
import { garten_file_mutation_responseModel } from "./garten_file_mutation_responseModel"
import { garten_file_mutation_responseModelPrimitives, garten_file_mutation_responseModelSelector } from "./garten_file_mutation_responseModel.base"
import { garten_rev_mutation_responseModel } from "./garten_rev_mutation_responseModel"
import { garten_rev_mutation_responseModelPrimitives, garten_rev_mutation_responseModelSelector } from "./garten_rev_mutation_responseModel.base"
import { herkunft_mutation_responseModel } from "./herkunft_mutation_responseModel"
import { herkunft_mutation_responseModelPrimitives, herkunft_mutation_responseModelSelector } from "./herkunft_mutation_responseModel.base"
import { herkunft_file_mutation_responseModel } from "./herkunft_file_mutation_responseModel"
import { herkunft_file_mutation_responseModelPrimitives, herkunft_file_mutation_responseModelSelector } from "./herkunft_file_mutation_responseModel.base"
import { herkunft_rev_mutation_responseModel } from "./herkunft_rev_mutation_responseModel"
import { herkunft_rev_mutation_responseModelPrimitives, herkunft_rev_mutation_responseModelSelector } from "./herkunft_rev_mutation_responseModel.base"
import { kultur_mutation_responseModel } from "./kultur_mutation_responseModel"
import { kultur_mutation_responseModelPrimitives, kultur_mutation_responseModelSelector } from "./kultur_mutation_responseModel.base"
import { kultur_file_mutation_responseModel } from "./kultur_file_mutation_responseModel"
import { kultur_file_mutation_responseModelPrimitives, kultur_file_mutation_responseModelSelector } from "./kultur_file_mutation_responseModel.base"
import { kultur_option_mutation_responseModel } from "./kultur_option_mutation_responseModel"
import { kultur_option_mutation_responseModelPrimitives, kultur_option_mutation_responseModelSelector } from "./kultur_option_mutation_responseModel.base"
import { kultur_option_rev_mutation_responseModel } from "./kultur_option_rev_mutation_responseModel"
import { kultur_option_rev_mutation_responseModelPrimitives, kultur_option_rev_mutation_responseModelSelector } from "./kultur_option_rev_mutation_responseModel.base"
import { kultur_qk_mutation_responseModel } from "./kultur_qk_mutation_responseModel"
import { kultur_qk_mutation_responseModelPrimitives, kultur_qk_mutation_responseModelSelector } from "./kultur_qk_mutation_responseModel.base"
import { kultur_qk_choosen_mutation_responseModel } from "./kultur_qk_choosen_mutation_responseModel"
import { kultur_qk_choosen_mutation_responseModelPrimitives, kultur_qk_choosen_mutation_responseModelSelector } from "./kultur_qk_choosen_mutation_responseModel.base"
import { kultur_rev_mutation_responseModel } from "./kultur_rev_mutation_responseModel"
import { kultur_rev_mutation_responseModelPrimitives, kultur_rev_mutation_responseModelSelector } from "./kultur_rev_mutation_responseModel.base"
import { lieferung_mutation_responseModel } from "./lieferung_mutation_responseModel"
import { lieferung_mutation_responseModelPrimitives, lieferung_mutation_responseModelSelector } from "./lieferung_mutation_responseModel.base"
import { lieferung_file_mutation_responseModel } from "./lieferung_file_mutation_responseModel"
import { lieferung_file_mutation_responseModelPrimitives, lieferung_file_mutation_responseModelSelector } from "./lieferung_file_mutation_responseModel.base"
import { lieferung_rev_mutation_responseModel } from "./lieferung_rev_mutation_responseModel"
import { lieferung_rev_mutation_responseModelPrimitives, lieferung_rev_mutation_responseModelSelector } from "./lieferung_rev_mutation_responseModel.base"
import { person_mutation_responseModel } from "./person_mutation_responseModel"
import { person_mutation_responseModelPrimitives, person_mutation_responseModelSelector } from "./person_mutation_responseModel.base"
import { person_file_mutation_responseModel } from "./person_file_mutation_responseModel"
import { person_file_mutation_responseModelPrimitives, person_file_mutation_responseModelSelector } from "./person_file_mutation_responseModel.base"
import { person_option_mutation_responseModel } from "./person_option_mutation_responseModel"
import { person_option_mutation_responseModelPrimitives, person_option_mutation_responseModelSelector } from "./person_option_mutation_responseModel.base"
import { person_option_rev_mutation_responseModel } from "./person_option_rev_mutation_responseModel"
import { person_option_rev_mutation_responseModelPrimitives, person_option_rev_mutation_responseModelSelector } from "./person_option_rev_mutation_responseModel.base"
import { person_rev_mutation_responseModel } from "./person_rev_mutation_responseModel"
import { person_rev_mutation_responseModelPrimitives, person_rev_mutation_responseModelSelector } from "./person_rev_mutation_responseModel.base"
import { sammel_lieferung_mutation_responseModel } from "./sammel_lieferung_mutation_responseModel"
import { sammel_lieferung_mutation_responseModelPrimitives, sammel_lieferung_mutation_responseModelSelector } from "./sammel_lieferung_mutation_responseModel.base"
import { sammel_lieferung_rev_mutation_responseModel } from "./sammel_lieferung_rev_mutation_responseModel"
import { sammel_lieferung_rev_mutation_responseModelPrimitives, sammel_lieferung_rev_mutation_responseModelSelector } from "./sammel_lieferung_rev_mutation_responseModel.base"
import { sammlung_mutation_responseModel } from "./sammlung_mutation_responseModel"
import { sammlung_mutation_responseModelPrimitives, sammlung_mutation_responseModelSelector } from "./sammlung_mutation_responseModel.base"
import { sammlung_file_mutation_responseModel } from "./sammlung_file_mutation_responseModel"
import { sammlung_file_mutation_responseModelPrimitives, sammlung_file_mutation_responseModelSelector } from "./sammlung_file_mutation_responseModel.base"
import { sammlung_rev_mutation_responseModel } from "./sammlung_rev_mutation_responseModel"
import { sammlung_rev_mutation_responseModelPrimitives, sammlung_rev_mutation_responseModelSelector } from "./sammlung_rev_mutation_responseModel.base"
import { spatial_ref_sys_mutation_responseModel } from "./spatial_ref_sys_mutation_responseModel"
import { spatial_ref_sys_mutation_responseModelPrimitives, spatial_ref_sys_mutation_responseModelSelector } from "./spatial_ref_sys_mutation_responseModel.base"
import { teilkultur_mutation_responseModel } from "./teilkultur_mutation_responseModel"
import { teilkultur_mutation_responseModelPrimitives, teilkultur_mutation_responseModelSelector } from "./teilkultur_mutation_responseModel.base"
import { teilkultur_rev_mutation_responseModel } from "./teilkultur_rev_mutation_responseModel"
import { teilkultur_rev_mutation_responseModelPrimitives, teilkultur_rev_mutation_responseModelSelector } from "./teilkultur_rev_mutation_responseModel.base"
import { teilzaehlung_mutation_responseModel } from "./teilzaehlung_mutation_responseModel"
import { teilzaehlung_mutation_responseModelPrimitives, teilzaehlung_mutation_responseModelSelector } from "./teilzaehlung_mutation_responseModel.base"
import { teilzaehlung_rev_mutation_responseModel } from "./teilzaehlung_rev_mutation_responseModel"
import { teilzaehlung_rev_mutation_responseModelPrimitives, teilzaehlung_rev_mutation_responseModelSelector } from "./teilzaehlung_rev_mutation_responseModel.base"
import { user_role_mutation_responseModel } from "./user_role_mutation_responseModel"
import { user_role_mutation_responseModelPrimitives, user_role_mutation_responseModelSelector } from "./user_role_mutation_responseModel.base"
import { zaehlung_mutation_responseModel } from "./zaehlung_mutation_responseModel"
import { zaehlung_mutation_responseModelPrimitives, zaehlung_mutation_responseModelSelector } from "./zaehlung_mutation_responseModel.base"
import { zaehlung_rev_mutation_responseModel } from "./zaehlung_rev_mutation_responseModel"
import { zaehlung_rev_mutation_responseModelPrimitives, zaehlung_rev_mutation_responseModelSelector } from "./zaehlung_rev_mutation_responseModel.base"
import { subscription_rootModel } from "./subscription_rootModel"
import { subscription_rootModelPrimitives, subscription_rootModelSelector } from "./subscription_rootModel.base"


/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['query_root', () => query_rootModel], ['ae_art', () => ae_artModel], ['art', () => artModel], ['art_file', () => art_fileModel], ['art_file_aggregate', () => art_file_aggregateModel], ['art_file_aggregate_fields', () => art_file_aggregate_fieldsModel], ['art_file_max_fields', () => art_file_max_fieldsModel], ['art_file_min_fields', () => art_file_min_fieldsModel], ['art_qk_choosen', () => art_qk_choosenModel], ['art_qk', () => art_qkModel], ['art_qk_choosen_aggregate', () => art_qk_choosen_aggregateModel], ['art_qk_choosen_aggregate_fields', () => art_qk_choosen_aggregate_fieldsModel], ['art_qk_choosen_max_fields', () => art_qk_choosen_max_fieldsModel], ['art_qk_choosen_min_fields', () => art_qk_choosen_min_fieldsModel], ['art_sums', () => art_sumsModel], ['av_art', () => av_artModel], ['art_sums_aggregate', () => art_sums_aggregateModel], ['art_sums_aggregate_fields', () => art_sums_aggregate_fieldsModel], ['art_sums_avg_fields', () => art_sums_avg_fieldsModel], ['art_sums_max_fields', () => art_sums_max_fieldsModel], ['art_sums_min_fields', () => art_sums_min_fieldsModel], ['art_sums_stddev_fields', () => art_sums_stddev_fieldsModel], ['art_sums_stddev_pop_fields', () => art_sums_stddev_pop_fieldsModel], ['art_sums_stddev_samp_fields', () => art_sums_stddev_samp_fieldsModel], ['art_sums_sum_fields', () => art_sums_sum_fieldsModel], ['art_sums_var_pop_fields', () => art_sums_var_pop_fieldsModel], ['art_sums_var_samp_fields', () => art_sums_var_samp_fieldsModel], ['art_sums_variance_fields', () => art_sums_variance_fieldsModel], ['person', () => personModel], ['av_art_aggregate', () => av_art_aggregateModel], ['av_art_aggregate_fields', () => av_art_aggregate_fieldsModel], ['av_art_max_fields', () => av_art_max_fieldsModel], ['av_art_min_fields', () => av_art_min_fieldsModel], ['event', () => eventModel], ['kultur', () => kulturModel], ['event_aggregate', () => event_aggregateModel], ['event_aggregate_fields', () => event_aggregate_fieldsModel], ['event_avg_fields', () => event_avg_fieldsModel], ['event_max_fields', () => event_max_fieldsModel], ['event_min_fields', () => event_min_fieldsModel], ['event_stddev_fields', () => event_stddev_fieldsModel], ['event_stddev_pop_fields', () => event_stddev_pop_fieldsModel], ['event_stddev_samp_fields', () => event_stddev_samp_fieldsModel], ['event_sum_fields', () => event_sum_fieldsModel], ['event_var_pop_fields', () => event_var_pop_fieldsModel], ['event_var_samp_fields', () => event_var_samp_fieldsModel], ['event_variance_fields', () => event_variance_fieldsModel], ['garten', () => gartenModel], ['garten_file', () => garten_fileModel], ['garten_file_aggregate', () => garten_file_aggregateModel], ['garten_file_aggregate_fields', () => garten_file_aggregate_fieldsModel], ['garten_file_max_fields', () => garten_file_max_fieldsModel], ['garten_file_min_fields', () => garten_file_min_fieldsModel], ['kultur_aggregate', () => kultur_aggregateModel], ['kultur_aggregate_fields', () => kultur_aggregate_fieldsModel], ['kultur_avg_fields', () => kultur_avg_fieldsModel], ['kultur_max_fields', () => kultur_max_fieldsModel], ['kultur_min_fields', () => kultur_min_fieldsModel], ['kultur_stddev_fields', () => kultur_stddev_fieldsModel], ['kultur_stddev_pop_fields', () => kultur_stddev_pop_fieldsModel], ['kultur_stddev_samp_fields', () => kultur_stddev_samp_fieldsModel], ['kultur_sum_fields', () => kultur_sum_fieldsModel], ['kultur_var_pop_fields', () => kultur_var_pop_fieldsModel], ['kultur_var_samp_fields', () => kultur_var_samp_fieldsModel], ['kultur_variance_fields', () => kultur_variance_fieldsModel], ['garten_teilzaehlung_sums', () => garten_teilzaehlung_sumsModel], ['garten_teilzaehlung_sums_aggregate', () => garten_teilzaehlung_sums_aggregateModel], ['garten_teilzaehlung_sums_aggregate_fields', () => garten_teilzaehlung_sums_aggregate_fieldsModel], ['garten_teilzaehlung_sums_avg_fields', () => garten_teilzaehlung_sums_avg_fieldsModel], ['garten_teilzaehlung_sums_max_fields', () => garten_teilzaehlung_sums_max_fieldsModel], ['garten_teilzaehlung_sums_min_fields', () => garten_teilzaehlung_sums_min_fieldsModel], ['garten_teilzaehlung_sums_stddev_fields', () => garten_teilzaehlung_sums_stddev_fieldsModel], ['garten_teilzaehlung_sums_stddev_pop_fields', () => garten_teilzaehlung_sums_stddev_pop_fieldsModel], ['garten_teilzaehlung_sums_stddev_samp_fields', () => garten_teilzaehlung_sums_stddev_samp_fieldsModel], ['garten_teilzaehlung_sums_sum_fields', () => garten_teilzaehlung_sums_sum_fieldsModel], ['garten_teilzaehlung_sums_var_pop_fields', () => garten_teilzaehlung_sums_var_pop_fieldsModel], ['garten_teilzaehlung_sums_var_samp_fields', () => garten_teilzaehlung_sums_var_samp_fieldsModel], ['garten_teilzaehlung_sums_variance_fields', () => garten_teilzaehlung_sums_variance_fieldsModel], ['herkunft', () => herkunftModel], ['herkunft_file', () => herkunft_fileModel], ['herkunft_file_aggregate', () => herkunft_file_aggregateModel], ['herkunft_file_aggregate_fields', () => herkunft_file_aggregate_fieldsModel], ['herkunft_file_max_fields', () => herkunft_file_max_fieldsModel], ['herkunft_file_min_fields', () => herkunft_file_min_fieldsModel], ['herkunft_sums', () => herkunft_sumsModel], ['herkunft_sums_aggregate', () => herkunft_sums_aggregateModel], ['herkunft_sums_aggregate_fields', () => herkunft_sums_aggregate_fieldsModel], ['herkunft_sums_avg_fields', () => herkunft_sums_avg_fieldsModel], ['herkunft_sums_max_fields', () => herkunft_sums_max_fieldsModel], ['herkunft_sums_min_fields', () => herkunft_sums_min_fieldsModel], ['herkunft_sums_stddev_fields', () => herkunft_sums_stddev_fieldsModel], ['herkunft_sums_stddev_pop_fields', () => herkunft_sums_stddev_pop_fieldsModel], ['herkunft_sums_stddev_samp_fields', () => herkunft_sums_stddev_samp_fieldsModel], ['herkunft_sums_sum_fields', () => herkunft_sums_sum_fieldsModel], ['herkunft_sums_var_pop_fields', () => herkunft_sums_var_pop_fieldsModel], ['herkunft_sums_var_samp_fields', () => herkunft_sums_var_samp_fieldsModel], ['herkunft_sums_variance_fields', () => herkunft_sums_variance_fieldsModel], ['sammlung', () => sammlungModel], ['lieferung', () => lieferungModel], ['lieferung_file', () => lieferung_fileModel], ['lieferung_file_aggregate', () => lieferung_file_aggregateModel], ['lieferung_file_aggregate_fields', () => lieferung_file_aggregate_fieldsModel], ['lieferung_file_max_fields', () => lieferung_file_max_fieldsModel], ['lieferung_file_min_fields', () => lieferung_file_min_fieldsModel], ['sammel_lieferung', () => sammel_lieferungModel], ['lieferung_aggregate', () => lieferung_aggregateModel], ['lieferung_aggregate_fields', () => lieferung_aggregate_fieldsModel], ['lieferung_avg_fields', () => lieferung_avg_fieldsModel], ['lieferung_max_fields', () => lieferung_max_fieldsModel], ['lieferung_min_fields', () => lieferung_min_fieldsModel], ['lieferung_stddev_fields', () => lieferung_stddev_fieldsModel], ['lieferung_stddev_pop_fields', () => lieferung_stddev_pop_fieldsModel], ['lieferung_stddev_samp_fields', () => lieferung_stddev_samp_fieldsModel], ['lieferung_sum_fields', () => lieferung_sum_fieldsModel], ['lieferung_var_pop_fields', () => lieferung_var_pop_fieldsModel], ['lieferung_var_samp_fields', () => lieferung_var_samp_fieldsModel], ['lieferung_variance_fields', () => lieferung_variance_fieldsModel], ['sammel_lieferung_aggregate', () => sammel_lieferung_aggregateModel], ['sammel_lieferung_aggregate_fields', () => sammel_lieferung_aggregate_fieldsModel], ['sammel_lieferung_avg_fields', () => sammel_lieferung_avg_fieldsModel], ['sammel_lieferung_max_fields', () => sammel_lieferung_max_fieldsModel], ['sammel_lieferung_min_fields', () => sammel_lieferung_min_fieldsModel], ['sammel_lieferung_stddev_fields', () => sammel_lieferung_stddev_fieldsModel], ['sammel_lieferung_stddev_pop_fields', () => sammel_lieferung_stddev_pop_fieldsModel], ['sammel_lieferung_stddev_samp_fields', () => sammel_lieferung_stddev_samp_fieldsModel], ['sammel_lieferung_sum_fields', () => sammel_lieferung_sum_fieldsModel], ['sammel_lieferung_var_pop_fields', () => sammel_lieferung_var_pop_fieldsModel], ['sammel_lieferung_var_samp_fields', () => sammel_lieferung_var_samp_fieldsModel], ['sammel_lieferung_variance_fields', () => sammel_lieferung_variance_fieldsModel], ['sammlung_file', () => sammlung_fileModel], ['sammlung_file_aggregate', () => sammlung_file_aggregateModel], ['sammlung_file_aggregate_fields', () => sammlung_file_aggregate_fieldsModel], ['sammlung_file_max_fields', () => sammlung_file_max_fieldsModel], ['sammlung_file_min_fields', () => sammlung_file_min_fieldsModel], ['sammlung_aggregate', () => sammlung_aggregateModel], ['sammlung_aggregate_fields', () => sammlung_aggregate_fieldsModel], ['sammlung_avg_fields', () => sammlung_avg_fieldsModel], ['sammlung_max_fields', () => sammlung_max_fieldsModel], ['sammlung_min_fields', () => sammlung_min_fieldsModel], ['sammlung_stddev_fields', () => sammlung_stddev_fieldsModel], ['sammlung_stddev_pop_fields', () => sammlung_stddev_pop_fieldsModel], ['sammlung_stddev_samp_fields', () => sammlung_stddev_samp_fieldsModel], ['sammlung_sum_fields', () => sammlung_sum_fieldsModel], ['sammlung_var_pop_fields', () => sammlung_var_pop_fieldsModel], ['sammlung_var_samp_fields', () => sammlung_var_samp_fieldsModel], ['sammlung_variance_fields', () => sammlung_variance_fieldsModel], ['kultur_file', () => kultur_fileModel], ['kultur_file_aggregate', () => kultur_file_aggregateModel], ['kultur_file_aggregate_fields', () => kultur_file_aggregate_fieldsModel], ['kultur_file_max_fields', () => kultur_file_max_fieldsModel], ['kultur_file_min_fields', () => kultur_file_min_fieldsModel], ['kultur_option', () => kultur_optionModel], ['kultur_qk_choosen', () => kultur_qk_choosenModel], ['kultur_qk', () => kultur_qkModel], ['kultur_qk_choosen_aggregate', () => kultur_qk_choosen_aggregateModel], ['kultur_qk_choosen_aggregate_fields', () => kultur_qk_choosen_aggregate_fieldsModel], ['kultur_qk_choosen_max_fields', () => kultur_qk_choosen_max_fieldsModel], ['kultur_qk_choosen_min_fields', () => kultur_qk_choosen_min_fieldsModel], ['teilkultur', () => teilkulturModel], ['teilzaehlung', () => teilzaehlungModel], ['teilzaehlung_aggregate', () => teilzaehlung_aggregateModel], ['teilzaehlung_aggregate_fields', () => teilzaehlung_aggregate_fieldsModel], ['teilzaehlung_avg_fields', () => teilzaehlung_avg_fieldsModel], ['teilzaehlung_max_fields', () => teilzaehlung_max_fieldsModel], ['teilzaehlung_min_fields', () => teilzaehlung_min_fieldsModel], ['teilzaehlung_stddev_fields', () => teilzaehlung_stddev_fieldsModel], ['teilzaehlung_stddev_pop_fields', () => teilzaehlung_stddev_pop_fieldsModel], ['teilzaehlung_stddev_samp_fields', () => teilzaehlung_stddev_samp_fieldsModel], ['teilzaehlung_sum_fields', () => teilzaehlung_sum_fieldsModel], ['teilzaehlung_var_pop_fields', () => teilzaehlung_var_pop_fieldsModel], ['teilzaehlung_var_samp_fields', () => teilzaehlung_var_samp_fieldsModel], ['teilzaehlung_variance_fields', () => teilzaehlung_variance_fieldsModel], ['zaehlung', () => zaehlungModel], ['teilkultur_aggregate', () => teilkultur_aggregateModel], ['teilkultur_aggregate_fields', () => teilkultur_aggregate_fieldsModel], ['teilkultur_avg_fields', () => teilkultur_avg_fieldsModel], ['teilkultur_max_fields', () => teilkultur_max_fieldsModel], ['teilkultur_min_fields', () => teilkultur_min_fieldsModel], ['teilkultur_stddev_fields', () => teilkultur_stddev_fieldsModel], ['teilkultur_stddev_pop_fields', () => teilkultur_stddev_pop_fieldsModel], ['teilkultur_stddev_samp_fields', () => teilkultur_stddev_samp_fieldsModel], ['teilkultur_sum_fields', () => teilkultur_sum_fieldsModel], ['teilkultur_var_pop_fields', () => teilkultur_var_pop_fieldsModel], ['teilkultur_var_samp_fields', () => teilkultur_var_samp_fieldsModel], ['teilkultur_variance_fields', () => teilkultur_variance_fieldsModel], ['zaehlung_aggregate', () => zaehlung_aggregateModel], ['zaehlung_aggregate_fields', () => zaehlung_aggregate_fieldsModel], ['zaehlung_avg_fields', () => zaehlung_avg_fieldsModel], ['zaehlung_max_fields', () => zaehlung_max_fieldsModel], ['zaehlung_min_fields', () => zaehlung_min_fieldsModel], ['zaehlung_stddev_fields', () => zaehlung_stddev_fieldsModel], ['zaehlung_stddev_pop_fields', () => zaehlung_stddev_pop_fieldsModel], ['zaehlung_stddev_samp_fields', () => zaehlung_stddev_samp_fieldsModel], ['zaehlung_sum_fields', () => zaehlung_sum_fieldsModel], ['zaehlung_var_pop_fields', () => zaehlung_var_pop_fieldsModel], ['zaehlung_var_samp_fields', () => zaehlung_var_samp_fieldsModel], ['zaehlung_variance_fields', () => zaehlung_variance_fieldsModel], ['garten_aggregate', () => garten_aggregateModel], ['garten_aggregate_fields', () => garten_aggregate_fieldsModel], ['garten_avg_fields', () => garten_avg_fieldsModel], ['garten_max_fields', () => garten_max_fieldsModel], ['garten_min_fields', () => garten_min_fieldsModel], ['garten_stddev_fields', () => garten_stddev_fieldsModel], ['garten_stddev_pop_fields', () => garten_stddev_pop_fieldsModel], ['garten_stddev_samp_fields', () => garten_stddev_samp_fieldsModel], ['garten_sum_fields', () => garten_sum_fieldsModel], ['garten_var_pop_fields', () => garten_var_pop_fieldsModel], ['garten_var_samp_fields', () => garten_var_samp_fieldsModel], ['garten_variance_fields', () => garten_variance_fieldsModel], ['person_file', () => person_fileModel], ['person_file_aggregate', () => person_file_aggregateModel], ['person_file_aggregate_fields', () => person_file_aggregate_fieldsModel], ['person_file_max_fields', () => person_file_max_fieldsModel], ['person_file_min_fields', () => person_file_min_fieldsModel], ['person_option', () => person_optionModel], ['user_role', () => user_roleModel], ['person_aggregate', () => person_aggregateModel], ['person_aggregate_fields', () => person_aggregate_fieldsModel], ['person_avg_fields', () => person_avg_fieldsModel], ['person_max_fields', () => person_max_fieldsModel], ['person_min_fields', () => person_min_fieldsModel], ['person_stddev_fields', () => person_stddev_fieldsModel], ['person_stddev_pop_fields', () => person_stddev_pop_fieldsModel], ['person_stddev_samp_fields', () => person_stddev_samp_fieldsModel], ['person_sum_fields', () => person_sum_fieldsModel], ['person_var_pop_fields', () => person_var_pop_fieldsModel], ['person_var_samp_fields', () => person_var_samp_fieldsModel], ['person_variance_fields', () => person_variance_fieldsModel], ['person_rev', () => person_revModel], ['person_rev_aggregate', () => person_rev_aggregateModel], ['person_rev_aggregate_fields', () => person_rev_aggregate_fieldsModel], ['person_rev_avg_fields', () => person_rev_avg_fieldsModel], ['person_rev_max_fields', () => person_rev_max_fieldsModel], ['person_rev_min_fields', () => person_rev_min_fieldsModel], ['person_rev_stddev_fields', () => person_rev_stddev_fieldsModel], ['person_rev_stddev_pop_fields', () => person_rev_stddev_pop_fieldsModel], ['person_rev_stddev_samp_fields', () => person_rev_stddev_samp_fieldsModel], ['person_rev_sum_fields', () => person_rev_sum_fieldsModel], ['person_rev_var_pop_fields', () => person_rev_var_pop_fieldsModel], ['person_rev_var_samp_fields', () => person_rev_var_samp_fieldsModel], ['person_rev_variance_fields', () => person_rev_variance_fieldsModel], ['ae_art_aggregate', () => ae_art_aggregateModel], ['ae_art_aggregate_fields', () => ae_art_aggregate_fieldsModel], ['ae_art_max_fields', () => ae_art_max_fieldsModel], ['ae_art_min_fields', () => ae_art_min_fieldsModel], ['art_aggregate', () => art_aggregateModel], ['art_aggregate_fields', () => art_aggregate_fieldsModel], ['art_avg_fields', () => art_avg_fieldsModel], ['art_max_fields', () => art_max_fieldsModel], ['art_min_fields', () => art_min_fieldsModel], ['art_stddev_fields', () => art_stddev_fieldsModel], ['art_stddev_pop_fields', () => art_stddev_pop_fieldsModel], ['art_stddev_samp_fields', () => art_stddev_samp_fieldsModel], ['art_sum_fields', () => art_sum_fieldsModel], ['art_var_pop_fields', () => art_var_pop_fieldsModel], ['art_var_samp_fields', () => art_var_samp_fieldsModel], ['art_variance_fields', () => art_variance_fieldsModel], ['art_qk_aggregate', () => art_qk_aggregateModel], ['art_qk_aggregate_fields', () => art_qk_aggregate_fieldsModel], ['art_qk_avg_fields', () => art_qk_avg_fieldsModel], ['art_qk_max_fields', () => art_qk_max_fieldsModel], ['art_qk_min_fields', () => art_qk_min_fieldsModel], ['art_qk_stddev_fields', () => art_qk_stddev_fieldsModel], ['art_qk_stddev_pop_fields', () => art_qk_stddev_pop_fieldsModel], ['art_qk_stddev_samp_fields', () => art_qk_stddev_samp_fieldsModel], ['art_qk_sum_fields', () => art_qk_sum_fieldsModel], ['art_qk_var_pop_fields', () => art_qk_var_pop_fieldsModel], ['art_qk_var_samp_fields', () => art_qk_var_samp_fieldsModel], ['art_qk_variance_fields', () => art_qk_variance_fieldsModel], ['art_rev', () => art_revModel], ['art_rev_aggregate', () => art_rev_aggregateModel], ['art_rev_aggregate_fields', () => art_rev_aggregate_fieldsModel], ['art_rev_avg_fields', () => art_rev_avg_fieldsModel], ['art_rev_max_fields', () => art_rev_max_fieldsModel], ['art_rev_min_fields', () => art_rev_min_fieldsModel], ['art_rev_stddev_fields', () => art_rev_stddev_fieldsModel], ['art_rev_stddev_pop_fields', () => art_rev_stddev_pop_fieldsModel], ['art_rev_stddev_samp_fields', () => art_rev_stddev_samp_fieldsModel], ['art_rev_sum_fields', () => art_rev_sum_fieldsModel], ['art_rev_var_pop_fields', () => art_rev_var_pop_fieldsModel], ['art_rev_var_samp_fields', () => art_rev_var_samp_fieldsModel], ['art_rev_variance_fields', () => art_rev_variance_fieldsModel], ['event_rev', () => event_revModel], ['event_rev_aggregate', () => event_rev_aggregateModel], ['event_rev_aggregate_fields', () => event_rev_aggregate_fieldsModel], ['event_rev_avg_fields', () => event_rev_avg_fieldsModel], ['event_rev_max_fields', () => event_rev_max_fieldsModel], ['event_rev_min_fields', () => event_rev_min_fieldsModel], ['event_rev_stddev_fields', () => event_rev_stddev_fieldsModel], ['event_rev_stddev_pop_fields', () => event_rev_stddev_pop_fieldsModel], ['event_rev_stddev_samp_fields', () => event_rev_stddev_samp_fieldsModel], ['event_rev_sum_fields', () => event_rev_sum_fieldsModel], ['event_rev_var_pop_fields', () => event_rev_var_pop_fieldsModel], ['event_rev_var_samp_fields', () => event_rev_var_samp_fieldsModel], ['event_rev_variance_fields', () => event_rev_variance_fieldsModel], ['garten_rev', () => garten_revModel], ['garten_rev_aggregate', () => garten_rev_aggregateModel], ['garten_rev_aggregate_fields', () => garten_rev_aggregate_fieldsModel], ['garten_rev_avg_fields', () => garten_rev_avg_fieldsModel], ['garten_rev_max_fields', () => garten_rev_max_fieldsModel], ['garten_rev_min_fields', () => garten_rev_min_fieldsModel], ['garten_rev_stddev_fields', () => garten_rev_stddev_fieldsModel], ['garten_rev_stddev_pop_fields', () => garten_rev_stddev_pop_fieldsModel], ['garten_rev_stddev_samp_fields', () => garten_rev_stddev_samp_fieldsModel], ['garten_rev_sum_fields', () => garten_rev_sum_fieldsModel], ['garten_rev_var_pop_fields', () => garten_rev_var_pop_fieldsModel], ['garten_rev_var_samp_fields', () => garten_rev_var_samp_fieldsModel], ['garten_rev_variance_fields', () => garten_rev_variance_fieldsModel], ['herkunft_aggregate', () => herkunft_aggregateModel], ['herkunft_aggregate_fields', () => herkunft_aggregate_fieldsModel], ['herkunft_avg_fields', () => herkunft_avg_fieldsModel], ['herkunft_max_fields', () => herkunft_max_fieldsModel], ['herkunft_min_fields', () => herkunft_min_fieldsModel], ['herkunft_stddev_fields', () => herkunft_stddev_fieldsModel], ['herkunft_stddev_pop_fields', () => herkunft_stddev_pop_fieldsModel], ['herkunft_stddev_samp_fields', () => herkunft_stddev_samp_fieldsModel], ['herkunft_sum_fields', () => herkunft_sum_fieldsModel], ['herkunft_var_pop_fields', () => herkunft_var_pop_fieldsModel], ['herkunft_var_samp_fields', () => herkunft_var_samp_fieldsModel], ['herkunft_variance_fields', () => herkunft_variance_fieldsModel], ['herkunft_rev', () => herkunft_revModel], ['herkunft_rev_aggregate', () => herkunft_rev_aggregateModel], ['herkunft_rev_aggregate_fields', () => herkunft_rev_aggregate_fieldsModel], ['herkunft_rev_avg_fields', () => herkunft_rev_avg_fieldsModel], ['herkunft_rev_max_fields', () => herkunft_rev_max_fieldsModel], ['herkunft_rev_min_fields', () => herkunft_rev_min_fieldsModel], ['herkunft_rev_stddev_fields', () => herkunft_rev_stddev_fieldsModel], ['herkunft_rev_stddev_pop_fields', () => herkunft_rev_stddev_pop_fieldsModel], ['herkunft_rev_stddev_samp_fields', () => herkunft_rev_stddev_samp_fieldsModel], ['herkunft_rev_sum_fields', () => herkunft_rev_sum_fieldsModel], ['herkunft_rev_var_pop_fields', () => herkunft_rev_var_pop_fieldsModel], ['herkunft_rev_var_samp_fields', () => herkunft_rev_var_samp_fieldsModel], ['herkunft_rev_variance_fields', () => herkunft_rev_variance_fieldsModel], ['kultur_option_aggregate', () => kultur_option_aggregateModel], ['kultur_option_aggregate_fields', () => kultur_option_aggregate_fieldsModel], ['kultur_option_avg_fields', () => kultur_option_avg_fieldsModel], ['kultur_option_max_fields', () => kultur_option_max_fieldsModel], ['kultur_option_min_fields', () => kultur_option_min_fieldsModel], ['kultur_option_stddev_fields', () => kultur_option_stddev_fieldsModel], ['kultur_option_stddev_pop_fields', () => kultur_option_stddev_pop_fieldsModel], ['kultur_option_stddev_samp_fields', () => kultur_option_stddev_samp_fieldsModel], ['kultur_option_sum_fields', () => kultur_option_sum_fieldsModel], ['kultur_option_var_pop_fields', () => kultur_option_var_pop_fieldsModel], ['kultur_option_var_samp_fields', () => kultur_option_var_samp_fieldsModel], ['kultur_option_variance_fields', () => kultur_option_variance_fieldsModel], ['kultur_option_rev', () => kultur_option_revModel], ['kultur_option_rev_aggregate', () => kultur_option_rev_aggregateModel], ['kultur_option_rev_aggregate_fields', () => kultur_option_rev_aggregate_fieldsModel], ['kultur_option_rev_avg_fields', () => kultur_option_rev_avg_fieldsModel], ['kultur_option_rev_max_fields', () => kultur_option_rev_max_fieldsModel], ['kultur_option_rev_min_fields', () => kultur_option_rev_min_fieldsModel], ['kultur_option_rev_stddev_fields', () => kultur_option_rev_stddev_fieldsModel], ['kultur_option_rev_stddev_pop_fields', () => kultur_option_rev_stddev_pop_fieldsModel], ['kultur_option_rev_stddev_samp_fields', () => kultur_option_rev_stddev_samp_fieldsModel], ['kultur_option_rev_sum_fields', () => kultur_option_rev_sum_fieldsModel], ['kultur_option_rev_var_pop_fields', () => kultur_option_rev_var_pop_fieldsModel], ['kultur_option_rev_var_samp_fields', () => kultur_option_rev_var_samp_fieldsModel], ['kultur_option_rev_variance_fields', () => kultur_option_rev_variance_fieldsModel], ['kultur_qk_aggregate', () => kultur_qk_aggregateModel], ['kultur_qk_aggregate_fields', () => kultur_qk_aggregate_fieldsModel], ['kultur_qk_avg_fields', () => kultur_qk_avg_fieldsModel], ['kultur_qk_max_fields', () => kultur_qk_max_fieldsModel], ['kultur_qk_min_fields', () => kultur_qk_min_fieldsModel], ['kultur_qk_stddev_fields', () => kultur_qk_stddev_fieldsModel], ['kultur_qk_stddev_pop_fields', () => kultur_qk_stddev_pop_fieldsModel], ['kultur_qk_stddev_samp_fields', () => kultur_qk_stddev_samp_fieldsModel], ['kultur_qk_sum_fields', () => kultur_qk_sum_fieldsModel], ['kultur_qk_var_pop_fields', () => kultur_qk_var_pop_fieldsModel], ['kultur_qk_var_samp_fields', () => kultur_qk_var_samp_fieldsModel], ['kultur_qk_variance_fields', () => kultur_qk_variance_fieldsModel], ['kultur_rev', () => kultur_revModel], ['kultur_rev_aggregate', () => kultur_rev_aggregateModel], ['kultur_rev_aggregate_fields', () => kultur_rev_aggregate_fieldsModel], ['kultur_rev_avg_fields', () => kultur_rev_avg_fieldsModel], ['kultur_rev_max_fields', () => kultur_rev_max_fieldsModel], ['kultur_rev_min_fields', () => kultur_rev_min_fieldsModel], ['kultur_rev_stddev_fields', () => kultur_rev_stddev_fieldsModel], ['kultur_rev_stddev_pop_fields', () => kultur_rev_stddev_pop_fieldsModel], ['kultur_rev_stddev_samp_fields', () => kultur_rev_stddev_samp_fieldsModel], ['kultur_rev_sum_fields', () => kultur_rev_sum_fieldsModel], ['kultur_rev_var_pop_fields', () => kultur_rev_var_pop_fieldsModel], ['kultur_rev_var_samp_fields', () => kultur_rev_var_samp_fieldsModel], ['kultur_rev_variance_fields', () => kultur_rev_variance_fieldsModel], ['lieferung_rev', () => lieferung_revModel], ['lieferung_rev_aggregate', () => lieferung_rev_aggregateModel], ['lieferung_rev_aggregate_fields', () => lieferung_rev_aggregate_fieldsModel], ['lieferung_rev_avg_fields', () => lieferung_rev_avg_fieldsModel], ['lieferung_rev_max_fields', () => lieferung_rev_max_fieldsModel], ['lieferung_rev_min_fields', () => lieferung_rev_min_fieldsModel], ['lieferung_rev_stddev_fields', () => lieferung_rev_stddev_fieldsModel], ['lieferung_rev_stddev_pop_fields', () => lieferung_rev_stddev_pop_fieldsModel], ['lieferung_rev_stddev_samp_fields', () => lieferung_rev_stddev_samp_fieldsModel], ['lieferung_rev_sum_fields', () => lieferung_rev_sum_fieldsModel], ['lieferung_rev_var_pop_fields', () => lieferung_rev_var_pop_fieldsModel], ['lieferung_rev_var_samp_fields', () => lieferung_rev_var_samp_fieldsModel], ['lieferung_rev_variance_fields', () => lieferung_rev_variance_fieldsModel], ['person_option_aggregate', () => person_option_aggregateModel], ['person_option_aggregate_fields', () => person_option_aggregate_fieldsModel], ['person_option_avg_fields', () => person_option_avg_fieldsModel], ['person_option_max_fields', () => person_option_max_fieldsModel], ['person_option_min_fields', () => person_option_min_fieldsModel], ['person_option_stddev_fields', () => person_option_stddev_fieldsModel], ['person_option_stddev_pop_fields', () => person_option_stddev_pop_fieldsModel], ['person_option_stddev_samp_fields', () => person_option_stddev_samp_fieldsModel], ['person_option_sum_fields', () => person_option_sum_fieldsModel], ['person_option_var_pop_fields', () => person_option_var_pop_fieldsModel], ['person_option_var_samp_fields', () => person_option_var_samp_fieldsModel], ['person_option_variance_fields', () => person_option_variance_fieldsModel], ['person_option_rev', () => person_option_revModel], ['person_option_rev_aggregate', () => person_option_rev_aggregateModel], ['person_option_rev_aggregate_fields', () => person_option_rev_aggregate_fieldsModel], ['person_option_rev_avg_fields', () => person_option_rev_avg_fieldsModel], ['person_option_rev_max_fields', () => person_option_rev_max_fieldsModel], ['person_option_rev_min_fields', () => person_option_rev_min_fieldsModel], ['person_option_rev_stddev_fields', () => person_option_rev_stddev_fieldsModel], ['person_option_rev_stddev_pop_fields', () => person_option_rev_stddev_pop_fieldsModel], ['person_option_rev_stddev_samp_fields', () => person_option_rev_stddev_samp_fieldsModel], ['person_option_rev_sum_fields', () => person_option_rev_sum_fieldsModel], ['person_option_rev_var_pop_fields', () => person_option_rev_var_pop_fieldsModel], ['person_option_rev_var_samp_fields', () => person_option_rev_var_samp_fieldsModel], ['person_option_rev_variance_fields', () => person_option_rev_variance_fieldsModel], ['sammel_lieferung_rev', () => sammel_lieferung_revModel], ['sammel_lieferung_rev_aggregate', () => sammel_lieferung_rev_aggregateModel], ['sammel_lieferung_rev_aggregate_fields', () => sammel_lieferung_rev_aggregate_fieldsModel], ['sammel_lieferung_rev_avg_fields', () => sammel_lieferung_rev_avg_fieldsModel], ['sammel_lieferung_rev_max_fields', () => sammel_lieferung_rev_max_fieldsModel], ['sammel_lieferung_rev_min_fields', () => sammel_lieferung_rev_min_fieldsModel], ['sammel_lieferung_rev_stddev_fields', () => sammel_lieferung_rev_stddev_fieldsModel], ['sammel_lieferung_rev_stddev_pop_fields', () => sammel_lieferung_rev_stddev_pop_fieldsModel], ['sammel_lieferung_rev_stddev_samp_fields', () => sammel_lieferung_rev_stddev_samp_fieldsModel], ['sammel_lieferung_rev_sum_fields', () => sammel_lieferung_rev_sum_fieldsModel], ['sammel_lieferung_rev_var_pop_fields', () => sammel_lieferung_rev_var_pop_fieldsModel], ['sammel_lieferung_rev_var_samp_fields', () => sammel_lieferung_rev_var_samp_fieldsModel], ['sammel_lieferung_rev_variance_fields', () => sammel_lieferung_rev_variance_fieldsModel], ['sammlung_rev', () => sammlung_revModel], ['sammlung_rev_aggregate', () => sammlung_rev_aggregateModel], ['sammlung_rev_aggregate_fields', () => sammlung_rev_aggregate_fieldsModel], ['sammlung_rev_avg_fields', () => sammlung_rev_avg_fieldsModel], ['sammlung_rev_max_fields', () => sammlung_rev_max_fieldsModel], ['sammlung_rev_min_fields', () => sammlung_rev_min_fieldsModel], ['sammlung_rev_stddev_fields', () => sammlung_rev_stddev_fieldsModel], ['sammlung_rev_stddev_pop_fields', () => sammlung_rev_stddev_pop_fieldsModel], ['sammlung_rev_stddev_samp_fields', () => sammlung_rev_stddev_samp_fieldsModel], ['sammlung_rev_sum_fields', () => sammlung_rev_sum_fieldsModel], ['sammlung_rev_var_pop_fields', () => sammlung_rev_var_pop_fieldsModel], ['sammlung_rev_var_samp_fields', () => sammlung_rev_var_samp_fieldsModel], ['sammlung_rev_variance_fields', () => sammlung_rev_variance_fieldsModel], ['spatial_ref_sys', () => spatial_ref_sysModel], ['spatial_ref_sys_aggregate', () => spatial_ref_sys_aggregateModel], ['spatial_ref_sys_aggregate_fields', () => spatial_ref_sys_aggregate_fieldsModel], ['spatial_ref_sys_avg_fields', () => spatial_ref_sys_avg_fieldsModel], ['spatial_ref_sys_max_fields', () => spatial_ref_sys_max_fieldsModel], ['spatial_ref_sys_min_fields', () => spatial_ref_sys_min_fieldsModel], ['spatial_ref_sys_stddev_fields', () => spatial_ref_sys_stddev_fieldsModel], ['spatial_ref_sys_stddev_pop_fields', () => spatial_ref_sys_stddev_pop_fieldsModel], ['spatial_ref_sys_stddev_samp_fields', () => spatial_ref_sys_stddev_samp_fieldsModel], ['spatial_ref_sys_sum_fields', () => spatial_ref_sys_sum_fieldsModel], ['spatial_ref_sys_var_pop_fields', () => spatial_ref_sys_var_pop_fieldsModel], ['spatial_ref_sys_var_samp_fields', () => spatial_ref_sys_var_samp_fieldsModel], ['spatial_ref_sys_variance_fields', () => spatial_ref_sys_variance_fieldsModel], ['teilkultur_rev', () => teilkultur_revModel], ['teilkultur_rev_aggregate', () => teilkultur_rev_aggregateModel], ['teilkultur_rev_aggregate_fields', () => teilkultur_rev_aggregate_fieldsModel], ['teilkultur_rev_avg_fields', () => teilkultur_rev_avg_fieldsModel], ['teilkultur_rev_max_fields', () => teilkultur_rev_max_fieldsModel], ['teilkultur_rev_min_fields', () => teilkultur_rev_min_fieldsModel], ['teilkultur_rev_stddev_fields', () => teilkultur_rev_stddev_fieldsModel], ['teilkultur_rev_stddev_pop_fields', () => teilkultur_rev_stddev_pop_fieldsModel], ['teilkultur_rev_stddev_samp_fields', () => teilkultur_rev_stddev_samp_fieldsModel], ['teilkultur_rev_sum_fields', () => teilkultur_rev_sum_fieldsModel], ['teilkultur_rev_var_pop_fields', () => teilkultur_rev_var_pop_fieldsModel], ['teilkultur_rev_var_samp_fields', () => teilkultur_rev_var_samp_fieldsModel], ['teilkultur_rev_variance_fields', () => teilkultur_rev_variance_fieldsModel], ['teilzaehlung_rev', () => teilzaehlung_revModel], ['teilzaehlung_rev_aggregate', () => teilzaehlung_rev_aggregateModel], ['teilzaehlung_rev_aggregate_fields', () => teilzaehlung_rev_aggregate_fieldsModel], ['teilzaehlung_rev_avg_fields', () => teilzaehlung_rev_avg_fieldsModel], ['teilzaehlung_rev_max_fields', () => teilzaehlung_rev_max_fieldsModel], ['teilzaehlung_rev_min_fields', () => teilzaehlung_rev_min_fieldsModel], ['teilzaehlung_rev_stddev_fields', () => teilzaehlung_rev_stddev_fieldsModel], ['teilzaehlung_rev_stddev_pop_fields', () => teilzaehlung_rev_stddev_pop_fieldsModel], ['teilzaehlung_rev_stddev_samp_fields', () => teilzaehlung_rev_stddev_samp_fieldsModel], ['teilzaehlung_rev_sum_fields', () => teilzaehlung_rev_sum_fieldsModel], ['teilzaehlung_rev_var_pop_fields', () => teilzaehlung_rev_var_pop_fieldsModel], ['teilzaehlung_rev_var_samp_fields', () => teilzaehlung_rev_var_samp_fieldsModel], ['teilzaehlung_rev_variance_fields', () => teilzaehlung_rev_variance_fieldsModel], ['user_role_aggregate', () => user_role_aggregateModel], ['user_role_aggregate_fields', () => user_role_aggregate_fieldsModel], ['user_role_avg_fields', () => user_role_avg_fieldsModel], ['user_role_max_fields', () => user_role_max_fieldsModel], ['user_role_min_fields', () => user_role_min_fieldsModel], ['user_role_stddev_fields', () => user_role_stddev_fieldsModel], ['user_role_stddev_pop_fields', () => user_role_stddev_pop_fieldsModel], ['user_role_stddev_samp_fields', () => user_role_stddev_samp_fieldsModel], ['user_role_sum_fields', () => user_role_sum_fieldsModel], ['user_role_var_pop_fields', () => user_role_var_pop_fieldsModel], ['user_role_var_samp_fields', () => user_role_var_samp_fieldsModel], ['user_role_variance_fields', () => user_role_variance_fieldsModel], ['zaehlung_rev', () => zaehlung_revModel], ['zaehlung_rev_aggregate', () => zaehlung_rev_aggregateModel], ['zaehlung_rev_aggregate_fields', () => zaehlung_rev_aggregate_fieldsModel], ['zaehlung_rev_avg_fields', () => zaehlung_rev_avg_fieldsModel], ['zaehlung_rev_max_fields', () => zaehlung_rev_max_fieldsModel], ['zaehlung_rev_min_fields', () => zaehlung_rev_min_fieldsModel], ['zaehlung_rev_stddev_fields', () => zaehlung_rev_stddev_fieldsModel], ['zaehlung_rev_stddev_pop_fields', () => zaehlung_rev_stddev_pop_fieldsModel], ['zaehlung_rev_stddev_samp_fields', () => zaehlung_rev_stddev_samp_fieldsModel], ['zaehlung_rev_sum_fields', () => zaehlung_rev_sum_fieldsModel], ['zaehlung_rev_var_pop_fields', () => zaehlung_rev_var_pop_fieldsModel], ['zaehlung_rev_var_samp_fields', () => zaehlung_rev_var_samp_fieldsModel], ['zaehlung_rev_variance_fields', () => zaehlung_rev_variance_fieldsModel], ['mutation_root', () => mutation_rootModel], ['ae_art_mutation_response', () => ae_art_mutation_responseModel], ['art_mutation_response', () => art_mutation_responseModel], ['art_file_mutation_response', () => art_file_mutation_responseModel], ['art_qk_mutation_response', () => art_qk_mutation_responseModel], ['art_qk_choosen_mutation_response', () => art_qk_choosen_mutation_responseModel], ['art_rev_mutation_response', () => art_rev_mutation_responseModel], ['av_art_mutation_response', () => av_art_mutation_responseModel], ['event_mutation_response', () => event_mutation_responseModel], ['event_rev_mutation_response', () => event_rev_mutation_responseModel], ['garten_mutation_response', () => garten_mutation_responseModel], ['garten_file_mutation_response', () => garten_file_mutation_responseModel], ['garten_rev_mutation_response', () => garten_rev_mutation_responseModel], ['herkunft_mutation_response', () => herkunft_mutation_responseModel], ['herkunft_file_mutation_response', () => herkunft_file_mutation_responseModel], ['herkunft_rev_mutation_response', () => herkunft_rev_mutation_responseModel], ['kultur_mutation_response', () => kultur_mutation_responseModel], ['kultur_file_mutation_response', () => kultur_file_mutation_responseModel], ['kultur_option_mutation_response', () => kultur_option_mutation_responseModel], ['kultur_option_rev_mutation_response', () => kultur_option_rev_mutation_responseModel], ['kultur_qk_mutation_response', () => kultur_qk_mutation_responseModel], ['kultur_qk_choosen_mutation_response', () => kultur_qk_choosen_mutation_responseModel], ['kultur_rev_mutation_response', () => kultur_rev_mutation_responseModel], ['lieferung_mutation_response', () => lieferung_mutation_responseModel], ['lieferung_file_mutation_response', () => lieferung_file_mutation_responseModel], ['lieferung_rev_mutation_response', () => lieferung_rev_mutation_responseModel], ['person_mutation_response', () => person_mutation_responseModel], ['person_file_mutation_response', () => person_file_mutation_responseModel], ['person_option_mutation_response', () => person_option_mutation_responseModel], ['person_option_rev_mutation_response', () => person_option_rev_mutation_responseModel], ['person_rev_mutation_response', () => person_rev_mutation_responseModel], ['sammel_lieferung_mutation_response', () => sammel_lieferung_mutation_responseModel], ['sammel_lieferung_rev_mutation_response', () => sammel_lieferung_rev_mutation_responseModel], ['sammlung_mutation_response', () => sammlung_mutation_responseModel], ['sammlung_file_mutation_response', () => sammlung_file_mutation_responseModel], ['sammlung_rev_mutation_response', () => sammlung_rev_mutation_responseModel], ['spatial_ref_sys_mutation_response', () => spatial_ref_sys_mutation_responseModel], ['teilkultur_mutation_response', () => teilkultur_mutation_responseModel], ['teilkultur_rev_mutation_response', () => teilkultur_rev_mutation_responseModel], ['teilzaehlung_mutation_response', () => teilzaehlung_mutation_responseModel], ['teilzaehlung_rev_mutation_response', () => teilzaehlung_rev_mutation_responseModel], ['user_role_mutation_response', () => user_role_mutation_responseModel], ['zaehlung_mutation_response', () => zaehlung_mutation_responseModel], ['zaehlung_rev_mutation_response', () => zaehlung_rev_mutation_responseModel], ['subscription_root', () => subscription_rootModel]], ['art', 'event', 'garten', 'herkunft', 'kultur', 'kultur_option', 'lieferung', 'person', 'sammel_lieferung', 'sammlung', 'teilkultur', 'teilzaehlung', 'zaehlung']))
  .props({
    arts: types.optional(types.map(types.late(() => artModel)), {}),
    events: types.optional(types.map(types.late(() => eventModel)), {}),
    gartens: types.optional(types.map(types.late(() => gartenModel)), {}),
    herkunfts: types.optional(types.map(types.late(() => herkunftModel)), {}),
    kulturs: types.optional(types.map(types.late(() => kulturModel)), {}),
    kultur_options: types.optional(types.map(types.late(() => kultur_optionModel)), {}),
    lieferungs: types.optional(types.map(types.late(() => lieferungModel)), {}),
    persons: types.optional(types.map(types.late(() => personModel)), {}),
    sammel_lieferungs: types.optional(types.map(types.late(() => sammel_lieferungModel)), {}),
    sammlungs: types.optional(types.map(types.late(() => sammlungModel)), {}),
    teilkulturs: types.optional(types.map(types.late(() => teilkulturModel)), {}),
    teilzaehlungs: types.optional(types.map(types.late(() => teilzaehlungModel)), {}),
    zaehlungs: types.optional(types.map(types.late(() => zaehlungModel)), {})
  })
  .actions(self => ({
    // fetch data from the table: "ae_art"
    queryAe_art(variables, resultSelector = ae_artModelPrimitives.toString(), options = {}) {
      return self.query(`query ae_art($distinct_on: [ae_art_select_column!], $limit: Int, $offset: Int, $order_by: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_artModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "ae_art"
    queryAe_art_aggregate(variables, resultSelector = ae_art_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query ae_art_aggregate($distinct_on: [ae_art_select_column!], $limit: Int, $offset: Int, $order_by: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art"
    queryArt(variables, resultSelector = artModelPrimitives.toString(), options = {}) {
      return self.query(`query art($distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art"
    queryArt_aggregate(variables, resultSelector = art_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_aggregate($distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art" using primary key columns
    queryArt_by_pk(variables, resultSelector = artModelPrimitives.toString(), options = {}) {
      return self.query(`query art_by_pk($id: uuid!) { art_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_file"
    queryArt_file(variables, resultSelector = art_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query art_file($distinct_on: [art_file_select_column!], $limit: Int, $offset: Int, $order_by: [art_file_order_by!], $where: art_file_bool_exp) { art_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_file"
    queryArt_file_aggregate(variables, resultSelector = art_file_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_file_aggregate($distinct_on: [art_file_select_column!], $limit: Int, $offset: Int, $order_by: [art_file_order_by!], $where: art_file_bool_exp) { art_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_file" using primary key columns
    queryArt_file_by_pk(variables, resultSelector = art_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query art_file_by_pk($id: uuid!) { art_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new art_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_qk"
    queryArt_qk(variables, resultSelector = art_qkModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk($distinct_on: [art_qk_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_qk"
    queryArt_qk_aggregate(variables, resultSelector = art_qk_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_aggregate($distinct_on: [art_qk_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_qk" using primary key columns
    queryArt_qk_by_pk(variables, resultSelector = art_qkModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_by_pk($name: String!) { art_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_qk_choosen"
    queryArt_qk_choosen(variables, resultSelector = art_qk_choosenModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_choosen($distinct_on: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_qk_choosen"
    queryArt_qk_choosen_aggregate(variables, resultSelector = art_qk_choosen_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_choosen_aggregate($distinct_on: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosen_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_rev"
    queryArt_rev(variables, resultSelector = art_revModelPrimitives.toString(), options = {}) {
      return self.query(`query art_rev($distinct_on: [art_rev_select_column!], $limit: Int, $offset: Int, $order_by: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_rev"
    queryArt_rev_aggregate(variables, resultSelector = art_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_rev_aggregate($distinct_on: [art_rev_select_column!], $limit: Int, $offset: Int, $order_by: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_rev" using primary key columns
    queryArt_rev_by_pk(variables, resultSelector = art_revModelPrimitives.toString(), options = {}) {
      return self.query(`query art_rev_by_pk($_rev: String!, $id: uuid!) { art_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new art_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "art_search" which returns "art"
    queryArt_search(variables, resultSelector = artModelPrimitives.toString(), options = {}) {
      return self.query(`query art_search($args: art_search_args!, $distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "art_search" and query aggregates on result of table type "art"
    queryArt_search_aggregate(variables, resultSelector = art_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_search_aggregate($args: art_search_args!, $distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_sums"
    queryArt_sums(variables, resultSelector = art_sumsModelPrimitives.toString(), options = {}) {
      return self.query(`query art_sums($distinct_on: [art_sums_select_column!], $limit: Int, $offset: Int, $order_by: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_sumsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_sums"
    queryArt_sums_aggregate(variables, resultSelector = art_sums_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_sums_aggregate($distinct_on: [art_sums_select_column!], $limit: Int, $offset: Int, $order_by: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_sums_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "av_art"
    queryAv_art(variables, resultSelector = av_artModelPrimitives.toString(), options = {}) {
      return self.query(`query av_art($distinct_on: [av_art_select_column!], $limit: Int, $offset: Int, $order_by: [av_art_order_by!], $where: av_art_bool_exp) { av_art(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new av_artModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "av_art"
    queryAv_art_aggregate(variables, resultSelector = av_art_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query av_art_aggregate($distinct_on: [av_art_select_column!], $limit: Int, $offset: Int, $order_by: [av_art_order_by!], $where: av_art_bool_exp) { av_art_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new av_art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "av_art" using primary key columns
    queryAv_art_by_pk(variables, resultSelector = av_artModelPrimitives.toString(), options = {}) {
      return self.query(`query av_art_by_pk($art_id: uuid!, $person_id: uuid!) { av_art_by_pk(art_id: $art_id, person_id: $person_id) {
        ${typeof resultSelector === "function" ? resultSelector(new av_artModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event"
    queryEvent(variables, resultSelector = eventModelPrimitives.toString(), options = {}) {
      return self.query(`query event($distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "event"
    queryEvent_aggregate(variables, resultSelector = event_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query event_aggregate($distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event" using primary key columns
    queryEvent_by_pk(variables, resultSelector = eventModelPrimitives.toString(), options = {}) {
      return self.query(`query event_by_pk($id: uuid!) { event_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event_rev"
    queryEvent_rev(variables, resultSelector = event_revModelPrimitives.toString(), options = {}) {
      return self.query(`query event_rev($distinct_on: [event_rev_select_column!], $limit: Int, $offset: Int, $order_by: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "event_rev"
    queryEvent_rev_aggregate(variables, resultSelector = event_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query event_rev_aggregate($distinct_on: [event_rev_select_column!], $limit: Int, $offset: Int, $order_by: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event_rev" using primary key columns
    queryEvent_rev_by_pk(variables, resultSelector = event_revModelPrimitives.toString(), options = {}) {
      return self.query(`query event_rev_by_pk($_rev: String!, $id: uuid!) { event_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new event_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "event_search" which returns "event"
    queryEvent_search(variables, resultSelector = eventModelPrimitives.toString(), options = {}) {
      return self.query(`query event_search($args: event_search_args!, $distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "event_search" and query aggregates on result of table type "event"
    queryEvent_search_aggregate(variables, resultSelector = event_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query event_search_aggregate($args: event_search_args!, $distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten"
    queryGarten(variables, resultSelector = gartenModelPrimitives.toString(), options = {}) {
      return self.query(`query garten($distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten"
    queryGarten_aggregate(variables, resultSelector = garten_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_aggregate($distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten" using primary key columns
    queryGarten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_by_pk($id: uuid!) { garten_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_file"
    queryGarten_file(variables, resultSelector = garten_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_file($distinct_on: [garten_file_select_column!], $limit: Int, $offset: Int, $order_by: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten_file"
    queryGarten_file_aggregate(variables, resultSelector = garten_file_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_file_aggregate($distinct_on: [garten_file_select_column!], $limit: Int, $offset: Int, $order_by: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_file" using primary key columns
    queryGarten_file_by_pk(variables, resultSelector = garten_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_file_by_pk($id: uuid!) { garten_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_rev"
    queryGarten_rev(variables, resultSelector = garten_revModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_rev($distinct_on: [garten_rev_select_column!], $limit: Int, $offset: Int, $order_by: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten_rev"
    queryGarten_rev_aggregate(variables, resultSelector = garten_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_rev_aggregate($distinct_on: [garten_rev_select_column!], $limit: Int, $offset: Int, $order_by: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_rev" using primary key columns
    queryGarten_rev_by_pk(variables, resultSelector = garten_revModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_rev_by_pk($_rev: String!, $id: uuid!) { garten_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "garten_search" which returns "garten"
    queryGarten_search(variables, resultSelector = gartenModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_search($args: garten_search_args!, $distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "garten_search" and query aggregates on result of table type "garten"
    queryGarten_search_aggregate(variables, resultSelector = garten_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_search_aggregate($args: garten_search_args!, $distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_teilzaehlung_sums"
    queryGarten_teilzaehlung_sums(variables, resultSelector = garten_teilzaehlung_sumsModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_teilzaehlung_sums($distinct_on: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $order_by: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_teilzaehlung_sumsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten_teilzaehlung_sums"
    queryGarten_teilzaehlung_sums_aggregate(variables, resultSelector = garten_teilzaehlung_sums_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_teilzaehlung_sums_aggregate($distinct_on: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $order_by: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_teilzaehlung_sums_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft"
    queryHerkunft(variables, resultSelector = herkunftModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft($distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft"
    queryHerkunft_aggregate(variables, resultSelector = herkunft_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_aggregate($distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft" using primary key columns
    queryHerkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_by_pk($id: uuid!) { herkunft_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_file"
    queryHerkunft_file(variables, resultSelector = herkunft_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_file($distinct_on: [herkunft_file_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft_file"
    queryHerkunft_file_aggregate(variables, resultSelector = herkunft_file_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_file_aggregate($distinct_on: [herkunft_file_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_file" using primary key columns
    queryHerkunft_file_by_pk(variables, resultSelector = herkunft_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_file_by_pk($id: uuid!) { herkunft_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_rev"
    queryHerkunft_rev(variables, resultSelector = herkunft_revModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_rev($distinct_on: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft_rev"
    queryHerkunft_rev_aggregate(variables, resultSelector = herkunft_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_rev_aggregate($distinct_on: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_rev" using primary key columns
    queryHerkunft_rev_by_pk(variables, resultSelector = herkunft_revModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_rev_by_pk($_rev: String!, $id: uuid!) { herkunft_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "herkunft_search" which returns "herkunft"
    queryHerkunft_search(variables, resultSelector = herkunftModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_search($args: herkunft_search_args!, $distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "herkunft_search" and query aggregates on result of table type "herkunft"
    queryHerkunft_search_aggregate(variables, resultSelector = herkunft_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_search_aggregate($args: herkunft_search_args!, $distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_sums"
    queryHerkunft_sums(variables, resultSelector = herkunft_sumsModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_sums($distinct_on: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_sumsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft_sums"
    queryHerkunft_sums_aggregate(variables, resultSelector = herkunft_sums_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_sums_aggregate($distinct_on: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_sums_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur"
    queryKultur(variables, resultSelector = kulturModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur($distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur"
    queryKultur_aggregate(variables, resultSelector = kultur_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_aggregate($distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur" using primary key columns
    queryKultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_by_pk($id: uuid!) { kultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_file"
    queryKultur_file(variables, resultSelector = kultur_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_file($distinct_on: [kultur_file_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_file"
    queryKultur_file_aggregate(variables, resultSelector = kultur_file_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_file_aggregate($distinct_on: [kultur_file_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_file" using primary key columns
    queryKultur_file_by_pk(variables, resultSelector = kultur_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_file_by_pk($id: uuid!) { kultur_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_option"
    queryKultur_option(variables, resultSelector = kultur_optionModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option($distinct_on: [kultur_option_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_optionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_option"
    queryKultur_option_aggregate(variables, resultSelector = kultur_option_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_aggregate($distinct_on: [kultur_option_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_option_rev"
    queryKultur_option_rev(variables, resultSelector = kultur_option_revModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_rev($distinct_on: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_option_rev"
    queryKultur_option_rev_aggregate(variables, resultSelector = kultur_option_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_rev_aggregate($distinct_on: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_option_rev" using primary key columns
    queryKultur_option_rev_by_pk(variables, resultSelector = kultur_option_revModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_rev_by_pk($_rev: String!, $kultur_id: uuid!) { kultur_option_rev_by_pk(_rev: $_rev, kultur_id: $kultur_id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_qk"
    queryKultur_qk(variables, resultSelector = kultur_qkModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk($distinct_on: [kultur_qk_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_qk"
    queryKultur_qk_aggregate(variables, resultSelector = kultur_qk_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_aggregate($distinct_on: [kultur_qk_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_qk" using primary key columns
    queryKultur_qk_by_pk(variables, resultSelector = kultur_qkModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_by_pk($name: String!) { kultur_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_qk_choosen"
    queryKultur_qk_choosen(variables, resultSelector = kultur_qk_choosenModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_choosen($distinct_on: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_qk_choosen"
    queryKultur_qk_choosen_aggregate(variables, resultSelector = kultur_qk_choosen_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_choosen_aggregate($distinct_on: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosen_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_rev"
    queryKultur_rev(variables, resultSelector = kultur_revModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_rev($distinct_on: [kultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_rev"
    queryKultur_rev_aggregate(variables, resultSelector = kultur_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_rev_aggregate($distinct_on: [kultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_rev" using primary key columns
    queryKultur_rev_by_pk(variables, resultSelector = kultur_revModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_rev_by_pk($_rev: String!, $id: uuid!) { kultur_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "kultur_search" which returns "kultur"
    queryKultur_search(variables, resultSelector = kulturModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_search($args: kultur_search_args!, $distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "kultur_search" and query aggregates on result of table type "kultur"
    queryKultur_search_aggregate(variables, resultSelector = kultur_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_search_aggregate($args: kultur_search_args!, $distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung"
    queryLieferung(variables, resultSelector = lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung($distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "lieferung"
    queryLieferung_aggregate(variables, resultSelector = lieferung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_aggregate($distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung" using primary key columns
    queryLieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_by_pk($id: uuid!) { lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_file"
    queryLieferung_file(variables, resultSelector = lieferung_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_file($distinct_on: [lieferung_file_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "lieferung_file"
    queryLieferung_file_aggregate(variables, resultSelector = lieferung_file_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_file_aggregate($distinct_on: [lieferung_file_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_file" using primary key columns
    queryLieferung_file_by_pk(variables, resultSelector = lieferung_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_file_by_pk($id: uuid!) { lieferung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_rev"
    queryLieferung_rev(variables, resultSelector = lieferung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_rev($distinct_on: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "lieferung_rev"
    queryLieferung_rev_aggregate(variables, resultSelector = lieferung_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_rev_aggregate($distinct_on: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_rev" using primary key columns
    queryLieferung_rev_by_pk(variables, resultSelector = lieferung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_rev_by_pk($_rev: String!, $id: uuid!) { lieferung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "lieferung_search" which returns "lieferung"
    queryLieferung_search(variables, resultSelector = lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_search($args: lieferung_search_args!, $distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "lieferung_search" and query aggregates on result of table type "lieferung"
    queryLieferung_search_aggregate(variables, resultSelector = lieferung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_search_aggregate($args: lieferung_search_args!, $distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person"
    queryPerson(variables, resultSelector = personModelPrimitives.toString(), options = {}) {
      return self.query(`query person($distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person"
    queryPerson_aggregate(variables, resultSelector = person_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_aggregate($distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person" using primary key columns
    queryPerson_by_pk(variables, resultSelector = personModelPrimitives.toString(), options = {}) {
      return self.query(`query person_by_pk($id: uuid!) { person_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_file"
    queryPerson_file(variables, resultSelector = person_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query person_file($distinct_on: [person_file_select_column!], $limit: Int, $offset: Int, $order_by: [person_file_order_by!], $where: person_file_bool_exp) { person_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_file"
    queryPerson_file_aggregate(variables, resultSelector = person_file_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_file_aggregate($distinct_on: [person_file_select_column!], $limit: Int, $offset: Int, $order_by: [person_file_order_by!], $where: person_file_bool_exp) { person_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_file" using primary key columns
    queryPerson_file_by_pk(variables, resultSelector = person_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query person_file_by_pk($id: uuid!) { person_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_option"
    queryPerson_option(variables, resultSelector = person_optionModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option($distinct_on: [person_option_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_order_by!], $where: person_option_bool_exp) { person_option(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_optionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_option"
    queryPerson_option_aggregate(variables, resultSelector = person_option_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_aggregate($distinct_on: [person_option_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_order_by!], $where: person_option_bool_exp) { person_option_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_option_rev"
    queryPerson_option_rev(variables, resultSelector = person_option_revModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_rev($distinct_on: [person_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_option_rev"
    queryPerson_option_rev_aggregate(variables, resultSelector = person_option_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_rev_aggregate($distinct_on: [person_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_option_rev" using primary key columns
    queryPerson_option_rev_by_pk(variables, resultSelector = person_option_revModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_rev_by_pk($_rev: String!, $person_id: uuid!) { person_option_rev_by_pk(_rev: $_rev, person_id: $person_id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_rev"
    queryPerson_rev(variables, resultSelector = person_revModelPrimitives.toString(), options = {}) {
      return self.query(`query person_rev($distinct_on: [person_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_rev"
    queryPerson_rev_aggregate(variables, resultSelector = person_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_rev_aggregate($distinct_on: [person_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_rev" using primary key columns
    queryPerson_rev_by_pk(variables, resultSelector = person_revModelPrimitives.toString(), options = {}) {
      return self.query(`query person_rev_by_pk($_rev: String!, $id: uuid!) { person_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "person_search" which returns "person"
    queryPerson_search(variables, resultSelector = personModelPrimitives.toString(), options = {}) {
      return self.query(`query person_search($args: person_search_args!, $distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "person_search" and query aggregates on result of table type "person"
    queryPerson_search_aggregate(variables, resultSelector = person_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_search_aggregate($args: person_search_args!, $distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung"
    querySammel_lieferung(variables, resultSelector = sammel_lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung($distinct_on: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammel_lieferung"
    querySammel_lieferung_aggregate(variables, resultSelector = sammel_lieferung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_aggregate($distinct_on: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung" using primary key columns
    querySammel_lieferung_by_pk(variables, resultSelector = sammel_lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_by_pk($id: uuid!) { sammel_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung_rev"
    querySammel_lieferung_rev(variables, resultSelector = sammel_lieferung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_rev($distinct_on: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammel_lieferung_rev"
    querySammel_lieferung_rev_aggregate(variables, resultSelector = sammel_lieferung_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_rev_aggregate($distinct_on: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung_rev" using primary key columns
    querySammel_lieferung_rev_by_pk(variables, resultSelector = sammel_lieferung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_rev_by_pk($_rev: String!, $id: uuid!) { sammel_lieferung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung"
    querySammlung(variables, resultSelector = sammlungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung($distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammlung"
    querySammlung_aggregate(variables, resultSelector = sammlung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_aggregate($distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung" using primary key columns
    querySammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_by_pk($id: uuid!) { sammlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_file"
    querySammlung_file(variables, resultSelector = sammlung_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_file($distinct_on: [sammlung_file_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammlung_file"
    querySammlung_file_aggregate(variables, resultSelector = sammlung_file_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_file_aggregate($distinct_on: [sammlung_file_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_file" using primary key columns
    querySammlung_file_by_pk(variables, resultSelector = sammlung_fileModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_file_by_pk($id: uuid!) { sammlung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_rev"
    querySammlung_rev(variables, resultSelector = sammlung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_rev($distinct_on: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammlung_rev"
    querySammlung_rev_aggregate(variables, resultSelector = sammlung_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_rev_aggregate($distinct_on: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_rev" using primary key columns
    querySammlung_rev_by_pk(variables, resultSelector = sammlung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_rev_by_pk($_rev: String!, $id: uuid!) { sammlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "sammlung_search" which returns "sammlung"
    querySammlung_search(variables, resultSelector = sammlungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_search($args: sammlung_search_args!, $distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "sammlung_search" and query aggregates on result of table type "sammlung"
    querySammlung_search_aggregate(variables, resultSelector = sammlung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_search_aggregate($args: sammlung_search_args!, $distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "spatial_ref_sys"
    querySpatial_ref_sys(variables, resultSelector = spatial_ref_sysModelPrimitives.toString(), options = {}) {
      return self.query(`query spatial_ref_sys($distinct_on: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $order_by: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sysModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "spatial_ref_sys"
    querySpatial_ref_sys_aggregate(variables, resultSelector = spatial_ref_sys_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query spatial_ref_sys_aggregate($distinct_on: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $order_by: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sys_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "spatial_ref_sys" using primary key columns
    querySpatial_ref_sys_by_pk(variables, resultSelector = spatial_ref_sysModelPrimitives.toString(), options = {}) {
      return self.query(`query spatial_ref_sys_by_pk($srid: Int!) { spatial_ref_sys_by_pk(srid: $srid) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sysModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur"
    queryTeilkultur(variables, resultSelector = teilkulturModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur($distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilkultur"
    queryTeilkultur_aggregate(variables, resultSelector = teilkultur_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_aggregate($distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur" using primary key columns
    queryTeilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_by_pk($id: uuid!) { teilkultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur_rev"
    queryTeilkultur_rev(variables, resultSelector = teilkultur_revModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_rev($distinct_on: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilkultur_rev"
    queryTeilkultur_rev_aggregate(variables, resultSelector = teilkultur_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_rev_aggregate($distinct_on: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur_rev" using primary key columns
    queryTeilkultur_rev_by_pk(variables, resultSelector = teilkultur_revModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_rev_by_pk($_rev: String!, $id: uuid!) { teilkultur_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "teilkultur_search" which returns "teilkultur"
    queryTeilkultur_search(variables, resultSelector = teilkulturModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_search($args: teilkultur_search_args!, $distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "teilkultur_search" and query aggregates on result of table type "teilkultur"
    queryTeilkultur_search_aggregate(variables, resultSelector = teilkultur_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_search_aggregate($args: teilkultur_search_args!, $distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung"
    queryTeilzaehlung(variables, resultSelector = teilzaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung($distinct_on: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilzaehlung"
    queryTeilzaehlung_aggregate(variables, resultSelector = teilzaehlung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_aggregate($distinct_on: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung" using primary key columns
    queryTeilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_by_pk($id: uuid!) { teilzaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung_rev"
    queryTeilzaehlung_rev(variables, resultSelector = teilzaehlung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_rev($distinct_on: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilzaehlung_rev"
    queryTeilzaehlung_rev_aggregate(variables, resultSelector = teilzaehlung_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_rev_aggregate($distinct_on: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung_rev" using primary key columns
    queryTeilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_rev_by_pk($_rev: String!, $id: uuid!) { teilzaehlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "user_role"
    queryUser_role(variables, resultSelector = user_roleModelPrimitives.toString(), options = {}) {
      return self.query(`query user_role($distinct_on: [user_role_select_column!], $limit: Int, $offset: Int, $order_by: [user_role_order_by!], $where: user_role_bool_exp) { user_role(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new user_roleModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "user_role"
    queryUser_role_aggregate(variables, resultSelector = user_role_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query user_role_aggregate($distinct_on: [user_role_select_column!], $limit: Int, $offset: Int, $order_by: [user_role_order_by!], $where: user_role_bool_exp) { user_role_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new user_role_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "user_role" using primary key columns
    queryUser_role_by_pk(variables, resultSelector = user_roleModelPrimitives.toString(), options = {}) {
      return self.query(`query user_role_by_pk($name: String!) { user_role_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new user_roleModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung"
    queryZaehlung(variables, resultSelector = zaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung($distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "zaehlung"
    queryZaehlung_aggregate(variables, resultSelector = zaehlung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_aggregate($distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung" using primary key columns
    queryZaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_by_pk($id: uuid!) { zaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung_rev"
    queryZaehlung_rev(variables, resultSelector = zaehlung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_rev($distinct_on: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "zaehlung_rev"
    queryZaehlung_rev_aggregate(variables, resultSelector = zaehlung_rev_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_rev_aggregate($distinct_on: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung_rev" using primary key columns
    queryZaehlung_rev_by_pk(variables, resultSelector = zaehlung_revModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_rev_by_pk($_rev: String!, $id: uuid!) { zaehlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "zaehlung_search" which returns "zaehlung"
    queryZaehlung_search(variables, resultSelector = zaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_search($args: zaehlung_search_args!, $distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "zaehlung_search" and query aggregates on result of table type "zaehlung"
    queryZaehlung_search_aggregate(variables, resultSelector = zaehlung_aggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_search_aggregate($args: zaehlung_search_args!, $distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // delete data from the table: "ae_art"
    mutateDelete_ae_art(variables, resultSelector = ae_art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_ae_art($where: ae_art_bool_exp!) { delete_ae_art(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art"
    mutateDelete_art(variables, resultSelector = art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art($where: art_bool_exp!) { delete_art(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art"
    mutateDelete_art_by_pk(variables, resultSelector = artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_by_pk($id: uuid!) { delete_art_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_file"
    mutateDelete_art_file(variables, resultSelector = art_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_file($where: art_file_bool_exp!) { delete_art_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art_file"
    mutateDelete_art_file_by_pk(variables, resultSelector = art_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_file_by_pk($id: uuid!) { delete_art_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new art_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_qk"
    mutateDelete_art_qk(variables, resultSelector = art_qk_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_qk($where: art_qk_bool_exp!) { delete_art_qk(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art_qk"
    mutateDelete_art_qk_by_pk(variables, resultSelector = art_qkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_qk_by_pk($name: String!) { delete_art_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_qk_choosen"
    mutateDelete_art_qk_choosen(variables, resultSelector = art_qk_choosen_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_qk_choosen($where: art_qk_choosen_bool_exp!) { delete_art_qk_choosen(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosen_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_rev"
    mutateDelete_art_rev(variables, resultSelector = art_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_rev($where: art_rev_bool_exp!) { delete_art_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art_rev"
    mutateDelete_art_rev_by_pk(variables, resultSelector = art_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_rev_by_pk($_rev: String!, $id: uuid!) { delete_art_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new art_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "av_art"
    mutateDelete_av_art(variables, resultSelector = av_art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_av_art($where: av_art_bool_exp!) { delete_av_art(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new av_art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "av_art"
    mutateDelete_av_art_by_pk(variables, resultSelector = av_artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_av_art_by_pk($art_id: uuid!, $person_id: uuid!) { delete_av_art_by_pk(art_id: $art_id, person_id: $person_id) {
        ${typeof resultSelector === "function" ? resultSelector(new av_artModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "event"
    mutateDelete_event(variables, resultSelector = event_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event($where: event_bool_exp!) { delete_event(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "event"
    mutateDelete_event_by_pk(variables, resultSelector = eventModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event_by_pk($id: uuid!) { delete_event_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "event_rev"
    mutateDelete_event_rev(variables, resultSelector = event_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event_rev($where: event_rev_bool_exp!) { delete_event_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "event_rev"
    mutateDelete_event_rev_by_pk(variables, resultSelector = event_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event_rev_by_pk($_rev: String!, $id: uuid!) { delete_event_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new event_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "garten"
    mutateDelete_garten(variables, resultSelector = garten_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten($where: garten_bool_exp!) { delete_garten(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "garten"
    mutateDelete_garten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_by_pk($id: uuid!) { delete_garten_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "garten_file"
    mutateDelete_garten_file(variables, resultSelector = garten_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_file($where: garten_file_bool_exp!) { delete_garten_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "garten_file"
    mutateDelete_garten_file_by_pk(variables, resultSelector = garten_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_file_by_pk($id: uuid!) { delete_garten_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "garten_rev"
    mutateDelete_garten_rev(variables, resultSelector = garten_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_rev($where: garten_rev_bool_exp!) { delete_garten_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "garten_rev"
    mutateDelete_garten_rev_by_pk(variables, resultSelector = garten_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_rev_by_pk($_rev: String!, $id: uuid!) { delete_garten_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "herkunft"
    mutateDelete_herkunft(variables, resultSelector = herkunft_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft($where: herkunft_bool_exp!) { delete_herkunft(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "herkunft"
    mutateDelete_herkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_by_pk($id: uuid!) { delete_herkunft_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "herkunft_file"
    mutateDelete_herkunft_file(variables, resultSelector = herkunft_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_file($where: herkunft_file_bool_exp!) { delete_herkunft_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "herkunft_file"
    mutateDelete_herkunft_file_by_pk(variables, resultSelector = herkunft_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_file_by_pk($id: uuid!) { delete_herkunft_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "herkunft_rev"
    mutateDelete_herkunft_rev(variables, resultSelector = herkunft_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_rev($where: herkunft_rev_bool_exp!) { delete_herkunft_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "herkunft_rev"
    mutateDelete_herkunft_rev_by_pk(variables, resultSelector = herkunft_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_rev_by_pk($_rev: String!, $id: uuid!) { delete_herkunft_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur"
    mutateDelete_kultur(variables, resultSelector = kultur_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur($where: kultur_bool_exp!) { delete_kultur(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur"
    mutateDelete_kultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_by_pk($id: uuid!) { delete_kultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_file"
    mutateDelete_kultur_file(variables, resultSelector = kultur_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_file($where: kultur_file_bool_exp!) { delete_kultur_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_file"
    mutateDelete_kultur_file_by_pk(variables, resultSelector = kultur_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_file_by_pk($id: uuid!) { delete_kultur_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_option"
    mutateDelete_kultur_option(variables, resultSelector = kultur_option_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_option($where: kultur_option_bool_exp!) { delete_kultur_option(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_option_rev"
    mutateDelete_kultur_option_rev(variables, resultSelector = kultur_option_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_option_rev($where: kultur_option_rev_bool_exp!) { delete_kultur_option_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_option_rev"
    mutateDelete_kultur_option_rev_by_pk(variables, resultSelector = kultur_option_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_option_rev_by_pk($_rev: String!, $kultur_id: uuid!) { delete_kultur_option_rev_by_pk(_rev: $_rev, kultur_id: $kultur_id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_qk"
    mutateDelete_kultur_qk(variables, resultSelector = kultur_qk_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_qk($where: kultur_qk_bool_exp!) { delete_kultur_qk(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_qk"
    mutateDelete_kultur_qk_by_pk(variables, resultSelector = kultur_qkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_qk_by_pk($name: String!) { delete_kultur_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_qk_choosen"
    mutateDelete_kultur_qk_choosen(variables, resultSelector = kultur_qk_choosen_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_qk_choosen($where: kultur_qk_choosen_bool_exp!) { delete_kultur_qk_choosen(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosen_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_rev"
    mutateDelete_kultur_rev(variables, resultSelector = kultur_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_rev($where: kultur_rev_bool_exp!) { delete_kultur_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_rev"
    mutateDelete_kultur_rev_by_pk(variables, resultSelector = kultur_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_rev_by_pk($_rev: String!, $id: uuid!) { delete_kultur_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "lieferung"
    mutateDelete_lieferung(variables, resultSelector = lieferung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung($where: lieferung_bool_exp!) { delete_lieferung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "lieferung"
    mutateDelete_lieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_by_pk($id: uuid!) { delete_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "lieferung_file"
    mutateDelete_lieferung_file(variables, resultSelector = lieferung_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_file($where: lieferung_file_bool_exp!) { delete_lieferung_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "lieferung_file"
    mutateDelete_lieferung_file_by_pk(variables, resultSelector = lieferung_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_file_by_pk($id: uuid!) { delete_lieferung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "lieferung_rev"
    mutateDelete_lieferung_rev(variables, resultSelector = lieferung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_rev($where: lieferung_rev_bool_exp!) { delete_lieferung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "lieferung_rev"
    mutateDelete_lieferung_rev_by_pk(variables, resultSelector = lieferung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_rev_by_pk($_rev: String!, $id: uuid!) { delete_lieferung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person"
    mutateDelete_person(variables, resultSelector = person_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person($where: person_bool_exp!) { delete_person(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person"
    mutateDelete_person_by_pk(variables, resultSelector = personModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_by_pk($id: uuid!) { delete_person_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_file"
    mutateDelete_person_file(variables, resultSelector = person_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_file($where: person_file_bool_exp!) { delete_person_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person_file"
    mutateDelete_person_file_by_pk(variables, resultSelector = person_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_file_by_pk($id: uuid!) { delete_person_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_option"
    mutateDelete_person_option(variables, resultSelector = person_option_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_option($where: person_option_bool_exp!) { delete_person_option(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_option_rev"
    mutateDelete_person_option_rev(variables, resultSelector = person_option_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_option_rev($where: person_option_rev_bool_exp!) { delete_person_option_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person_option_rev"
    mutateDelete_person_option_rev_by_pk(variables, resultSelector = person_option_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_option_rev_by_pk($_rev: String!, $person_id: uuid!) { delete_person_option_rev_by_pk(_rev: $_rev, person_id: $person_id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_rev"
    mutateDelete_person_rev(variables, resultSelector = person_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_rev($where: person_rev_bool_exp!) { delete_person_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person_rev"
    mutateDelete_person_rev_by_pk(variables, resultSelector = person_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_rev_by_pk($_rev: String!, $id: uuid!) { delete_person_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammel_lieferung"
    mutateDelete_sammel_lieferung(variables, resultSelector = sammel_lieferung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung($where: sammel_lieferung_bool_exp!) { delete_sammel_lieferung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammel_lieferung"
    mutateDelete_sammel_lieferung_by_pk(variables, resultSelector = sammel_lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung_by_pk($id: uuid!) { delete_sammel_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammel_lieferung_rev"
    mutateDelete_sammel_lieferung_rev(variables, resultSelector = sammel_lieferung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung_rev($where: sammel_lieferung_rev_bool_exp!) { delete_sammel_lieferung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammel_lieferung_rev"
    mutateDelete_sammel_lieferung_rev_by_pk(variables, resultSelector = sammel_lieferung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung_rev_by_pk($_rev: String!, $id: uuid!) { delete_sammel_lieferung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammlung"
    mutateDelete_sammlung(variables, resultSelector = sammlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung($where: sammlung_bool_exp!) { delete_sammlung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammlung"
    mutateDelete_sammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_by_pk($id: uuid!) { delete_sammlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammlung_file"
    mutateDelete_sammlung_file(variables, resultSelector = sammlung_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_file($where: sammlung_file_bool_exp!) { delete_sammlung_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammlung_file"
    mutateDelete_sammlung_file_by_pk(variables, resultSelector = sammlung_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_file_by_pk($id: uuid!) { delete_sammlung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammlung_rev"
    mutateDelete_sammlung_rev(variables, resultSelector = sammlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_rev($where: sammlung_rev_bool_exp!) { delete_sammlung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammlung_rev"
    mutateDelete_sammlung_rev_by_pk(variables, resultSelector = sammlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_rev_by_pk($_rev: String!, $id: uuid!) { delete_sammlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "spatial_ref_sys"
    mutateDelete_spatial_ref_sys(variables, resultSelector = spatial_ref_sys_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_spatial_ref_sys($where: spatial_ref_sys_bool_exp!) { delete_spatial_ref_sys(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sys_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "spatial_ref_sys"
    mutateDelete_spatial_ref_sys_by_pk(variables, resultSelector = spatial_ref_sysModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_spatial_ref_sys_by_pk($srid: Int!) { delete_spatial_ref_sys_by_pk(srid: $srid) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sysModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilkultur"
    mutateDelete_teilkultur(variables, resultSelector = teilkultur_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur($where: teilkultur_bool_exp!) { delete_teilkultur(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilkultur"
    mutateDelete_teilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur_by_pk($id: uuid!) { delete_teilkultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilkultur_rev"
    mutateDelete_teilkultur_rev(variables, resultSelector = teilkultur_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur_rev($where: teilkultur_rev_bool_exp!) { delete_teilkultur_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilkultur_rev"
    mutateDelete_teilkultur_rev_by_pk(variables, resultSelector = teilkultur_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur_rev_by_pk($_rev: String!, $id: uuid!) { delete_teilkultur_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilzaehlung"
    mutateDelete_teilzaehlung(variables, resultSelector = teilzaehlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung($where: teilzaehlung_bool_exp!) { delete_teilzaehlung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilzaehlung"
    mutateDelete_teilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung_by_pk($id: uuid!) { delete_teilzaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilzaehlung_rev"
    mutateDelete_teilzaehlung_rev(variables, resultSelector = teilzaehlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung_rev($where: teilzaehlung_rev_bool_exp!) { delete_teilzaehlung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilzaehlung_rev"
    mutateDelete_teilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung_rev_by_pk($_rev: String!, $id: uuid!) { delete_teilzaehlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "user_role"
    mutateDelete_user_role(variables, resultSelector = user_role_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_user_role($where: user_role_bool_exp!) { delete_user_role(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new user_role_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "user_role"
    mutateDelete_user_role_by_pk(variables, resultSelector = user_roleModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_user_role_by_pk($name: String!) { delete_user_role_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new user_roleModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "zaehlung"
    mutateDelete_zaehlung(variables, resultSelector = zaehlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung($where: zaehlung_bool_exp!) { delete_zaehlung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "zaehlung"
    mutateDelete_zaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung_by_pk($id: uuid!) { delete_zaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "zaehlung_rev"
    mutateDelete_zaehlung_rev(variables, resultSelector = zaehlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung_rev($where: zaehlung_rev_bool_exp!) { delete_zaehlung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "zaehlung_rev"
    mutateDelete_zaehlung_rev_by_pk(variables, resultSelector = zaehlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung_rev_by_pk($_rev: String!, $id: uuid!) { delete_zaehlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "ae_art"
    mutateInsert_ae_art(variables, resultSelector = ae_art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_ae_art($objects: [ae_art_insert_input!]!) { insert_ae_art(objects: $objects) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "ae_art"
    mutateInsert_ae_art_one(variables, resultSelector = ae_artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_ae_art_one($object: ae_art_insert_input!) { insert_ae_art_one(object: $object) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_artModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art"
    mutateInsert_art(variables, resultSelector = art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art($objects: [art_insert_input!]!, $on_conflict: art_on_conflict) { insert_art(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_file"
    mutateInsert_art_file(variables, resultSelector = art_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_file($objects: [art_file_insert_input!]!, $on_conflict: art_file_on_conflict) { insert_art_file(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_file"
    mutateInsert_art_file_one(variables, resultSelector = art_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_file_one($object: art_file_insert_input!, $on_conflict: art_file_on_conflict) { insert_art_file_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art"
    mutateInsert_art_one(variables, resultSelector = artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_one($object: art_insert_input!, $on_conflict: art_on_conflict) { insert_art_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_qk"
    mutateInsert_art_qk(variables, resultSelector = art_qk_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk($objects: [art_qk_insert_input!]!, $on_conflict: art_qk_on_conflict) { insert_art_qk(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_qk_choosen"
    mutateInsert_art_qk_choosen(variables, resultSelector = art_qk_choosen_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk_choosen($objects: [art_qk_choosen_insert_input!]!, $on_conflict: art_qk_choosen_on_conflict) { insert_art_qk_choosen(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosen_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_qk_choosen"
    mutateInsert_art_qk_choosen_one(variables, resultSelector = art_qk_choosenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk_choosen_one($object: art_qk_choosen_insert_input!, $on_conflict: art_qk_choosen_on_conflict) { insert_art_qk_choosen_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_qk"
    mutateInsert_art_qk_one(variables, resultSelector = art_qkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk_one($object: art_qk_insert_input!, $on_conflict: art_qk_on_conflict) { insert_art_qk_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_rev"
    mutateInsert_art_rev(variables, resultSelector = art_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_rev($objects: [art_rev_insert_input!]!, $on_conflict: art_rev_on_conflict) { insert_art_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_rev"
    mutateInsert_art_rev_one(variables, resultSelector = art_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_rev_one($object: art_rev_insert_input!, $on_conflict: art_rev_on_conflict) { insert_art_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new art_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "av_art"
    mutateInsert_av_art(variables, resultSelector = av_art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_av_art($objects: [av_art_insert_input!]!, $on_conflict: av_art_on_conflict) { insert_av_art(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new av_art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "av_art"
    mutateInsert_av_art_one(variables, resultSelector = av_artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_av_art_one($object: av_art_insert_input!, $on_conflict: av_art_on_conflict) { insert_av_art_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new av_artModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "event"
    mutateInsert_event(variables, resultSelector = event_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event($objects: [event_insert_input!]!, $on_conflict: event_on_conflict) { insert_event(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new event_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "event"
    mutateInsert_event_one(variables, resultSelector = eventModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event_one($object: event_insert_input!, $on_conflict: event_on_conflict) { insert_event_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "event_rev"
    mutateInsert_event_rev(variables, resultSelector = event_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event_rev($objects: [event_rev_insert_input!]!, $on_conflict: event_rev_on_conflict) { insert_event_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new event_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "event_rev"
    mutateInsert_event_rev_one(variables, resultSelector = event_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event_rev_one($object: event_rev_insert_input!, $on_conflict: event_rev_on_conflict) { insert_event_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new event_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "garten"
    mutateInsert_garten(variables, resultSelector = garten_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten($objects: [garten_insert_input!]!, $on_conflict: garten_on_conflict) { insert_garten(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "garten_file"
    mutateInsert_garten_file(variables, resultSelector = garten_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_file($objects: [garten_file_insert_input!]!, $on_conflict: garten_file_on_conflict) { insert_garten_file(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "garten_file"
    mutateInsert_garten_file_one(variables, resultSelector = garten_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_file_one($object: garten_file_insert_input!, $on_conflict: garten_file_on_conflict) { insert_garten_file_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "garten"
    mutateInsert_garten_one(variables, resultSelector = gartenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_one($object: garten_insert_input!, $on_conflict: garten_on_conflict) { insert_garten_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "garten_rev"
    mutateInsert_garten_rev(variables, resultSelector = garten_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_rev($objects: [garten_rev_insert_input!]!, $on_conflict: garten_rev_on_conflict) { insert_garten_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "garten_rev"
    mutateInsert_garten_rev_one(variables, resultSelector = garten_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_rev_one($object: garten_rev_insert_input!, $on_conflict: garten_rev_on_conflict) { insert_garten_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "herkunft"
    mutateInsert_herkunft(variables, resultSelector = herkunft_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft($objects: [herkunft_insert_input!]!, $on_conflict: herkunft_on_conflict) { insert_herkunft(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "herkunft_file"
    mutateInsert_herkunft_file(variables, resultSelector = herkunft_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_file($objects: [herkunft_file_insert_input!]!, $on_conflict: herkunft_file_on_conflict) { insert_herkunft_file(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "herkunft_file"
    mutateInsert_herkunft_file_one(variables, resultSelector = herkunft_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_file_one($object: herkunft_file_insert_input!, $on_conflict: herkunft_file_on_conflict) { insert_herkunft_file_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "herkunft"
    mutateInsert_herkunft_one(variables, resultSelector = herkunftModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_one($object: herkunft_insert_input!, $on_conflict: herkunft_on_conflict) { insert_herkunft_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "herkunft_rev"
    mutateInsert_herkunft_rev(variables, resultSelector = herkunft_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_rev($objects: [herkunft_rev_insert_input!]!, $on_conflict: herkunft_rev_on_conflict) { insert_herkunft_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "herkunft_rev"
    mutateInsert_herkunft_rev_one(variables, resultSelector = herkunft_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_rev_one($object: herkunft_rev_insert_input!, $on_conflict: herkunft_rev_on_conflict) { insert_herkunft_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur"
    mutateInsert_kultur(variables, resultSelector = kultur_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur($objects: [kultur_insert_input!]!, $on_conflict: kultur_on_conflict) { insert_kultur(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_file"
    mutateInsert_kultur_file(variables, resultSelector = kultur_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_file($objects: [kultur_file_insert_input!]!, $on_conflict: kultur_file_on_conflict) { insert_kultur_file(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_file"
    mutateInsert_kultur_file_one(variables, resultSelector = kultur_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_file_one($object: kultur_file_insert_input!, $on_conflict: kultur_file_on_conflict) { insert_kultur_file_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur"
    mutateInsert_kultur_one(variables, resultSelector = kulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_one($object: kultur_insert_input!, $on_conflict: kultur_on_conflict) { insert_kultur_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_option"
    mutateInsert_kultur_option(variables, resultSelector = kultur_option_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option($objects: [kultur_option_insert_input!]!, $on_conflict: kultur_option_on_conflict) { insert_kultur_option(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_option"
    mutateInsert_kultur_option_one(variables, resultSelector = kultur_optionModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option_one($object: kultur_option_insert_input!, $on_conflict: kultur_option_on_conflict) { insert_kultur_option_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_optionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_option_rev"
    mutateInsert_kultur_option_rev(variables, resultSelector = kultur_option_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option_rev($objects: [kultur_option_rev_insert_input!]!, $on_conflict: kultur_option_rev_on_conflict) { insert_kultur_option_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_option_rev"
    mutateInsert_kultur_option_rev_one(variables, resultSelector = kultur_option_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option_rev_one($object: kultur_option_rev_insert_input!, $on_conflict: kultur_option_rev_on_conflict) { insert_kultur_option_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_qk"
    mutateInsert_kultur_qk(variables, resultSelector = kultur_qk_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk($objects: [kultur_qk_insert_input!]!, $on_conflict: kultur_qk_on_conflict) { insert_kultur_qk(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_qk_choosen"
    mutateInsert_kultur_qk_choosen(variables, resultSelector = kultur_qk_choosen_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk_choosen($objects: [kultur_qk_choosen_insert_input!]!, $on_conflict: kultur_qk_choosen_on_conflict) { insert_kultur_qk_choosen(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosen_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_qk_choosen"
    mutateInsert_kultur_qk_choosen_one(variables, resultSelector = kultur_qk_choosenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk_choosen_one($object: kultur_qk_choosen_insert_input!, $on_conflict: kultur_qk_choosen_on_conflict) { insert_kultur_qk_choosen_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_qk"
    mutateInsert_kultur_qk_one(variables, resultSelector = kultur_qkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk_one($object: kultur_qk_insert_input!, $on_conflict: kultur_qk_on_conflict) { insert_kultur_qk_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_rev"
    mutateInsert_kultur_rev(variables, resultSelector = kultur_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_rev($objects: [kultur_rev_insert_input!]!, $on_conflict: kultur_rev_on_conflict) { insert_kultur_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_rev"
    mutateInsert_kultur_rev_one(variables, resultSelector = kultur_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_rev_one($object: kultur_rev_insert_input!, $on_conflict: kultur_rev_on_conflict) { insert_kultur_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "lieferung"
    mutateInsert_lieferung(variables, resultSelector = lieferung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung($objects: [lieferung_insert_input!]!, $on_conflict: lieferung_on_conflict) { insert_lieferung(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "lieferung_file"
    mutateInsert_lieferung_file(variables, resultSelector = lieferung_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_file($objects: [lieferung_file_insert_input!]!, $on_conflict: lieferung_file_on_conflict) { insert_lieferung_file(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "lieferung_file"
    mutateInsert_lieferung_file_one(variables, resultSelector = lieferung_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_file_one($object: lieferung_file_insert_input!, $on_conflict: lieferung_file_on_conflict) { insert_lieferung_file_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "lieferung"
    mutateInsert_lieferung_one(variables, resultSelector = lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_one($object: lieferung_insert_input!, $on_conflict: lieferung_on_conflict) { insert_lieferung_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "lieferung_rev"
    mutateInsert_lieferung_rev(variables, resultSelector = lieferung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_rev($objects: [lieferung_rev_insert_input!]!, $on_conflict: lieferung_rev_on_conflict) { insert_lieferung_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "lieferung_rev"
    mutateInsert_lieferung_rev_one(variables, resultSelector = lieferung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_rev_one($object: lieferung_rev_insert_input!, $on_conflict: lieferung_rev_on_conflict) { insert_lieferung_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person"
    mutateInsert_person(variables, resultSelector = person_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person($objects: [person_insert_input!]!, $on_conflict: person_on_conflict) { insert_person(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_file"
    mutateInsert_person_file(variables, resultSelector = person_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_file($objects: [person_file_insert_input!]!, $on_conflict: person_file_on_conflict) { insert_person_file(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_file"
    mutateInsert_person_file_one(variables, resultSelector = person_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_file_one($object: person_file_insert_input!, $on_conflict: person_file_on_conflict) { insert_person_file_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person"
    mutateInsert_person_one(variables, resultSelector = personModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_one($object: person_insert_input!, $on_conflict: person_on_conflict) { insert_person_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_option"
    mutateInsert_person_option(variables, resultSelector = person_option_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option($objects: [person_option_insert_input!]!, $on_conflict: person_option_on_conflict) { insert_person_option(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_option"
    mutateInsert_person_option_one(variables, resultSelector = person_optionModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option_one($object: person_option_insert_input!, $on_conflict: person_option_on_conflict) { insert_person_option_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_optionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_option_rev"
    mutateInsert_person_option_rev(variables, resultSelector = person_option_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option_rev($objects: [person_option_rev_insert_input!]!, $on_conflict: person_option_rev_on_conflict) { insert_person_option_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_option_rev"
    mutateInsert_person_option_rev_one(variables, resultSelector = person_option_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option_rev_one($object: person_option_rev_insert_input!, $on_conflict: person_option_rev_on_conflict) { insert_person_option_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_rev"
    mutateInsert_person_rev(variables, resultSelector = person_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_rev($objects: [person_rev_insert_input!]!, $on_conflict: person_rev_on_conflict) { insert_person_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_rev"
    mutateInsert_person_rev_one(variables, resultSelector = person_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_rev_one($object: person_rev_insert_input!, $on_conflict: person_rev_on_conflict) { insert_person_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new person_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammel_lieferung"
    mutateInsert_sammel_lieferung(variables, resultSelector = sammel_lieferung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung($objects: [sammel_lieferung_insert_input!]!, $on_conflict: sammel_lieferung_on_conflict) { insert_sammel_lieferung(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammel_lieferung"
    mutateInsert_sammel_lieferung_one(variables, resultSelector = sammel_lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung_one($object: sammel_lieferung_insert_input!, $on_conflict: sammel_lieferung_on_conflict) { insert_sammel_lieferung_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammel_lieferung_rev"
    mutateInsert_sammel_lieferung_rev(variables, resultSelector = sammel_lieferung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung_rev($objects: [sammel_lieferung_rev_insert_input!]!, $on_conflict: sammel_lieferung_rev_on_conflict) { insert_sammel_lieferung_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammel_lieferung_rev"
    mutateInsert_sammel_lieferung_rev_one(variables, resultSelector = sammel_lieferung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung_rev_one($object: sammel_lieferung_rev_insert_input!, $on_conflict: sammel_lieferung_rev_on_conflict) { insert_sammel_lieferung_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammlung"
    mutateInsert_sammlung(variables, resultSelector = sammlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung($objects: [sammlung_insert_input!]!, $on_conflict: sammlung_on_conflict) { insert_sammlung(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammlung_file"
    mutateInsert_sammlung_file(variables, resultSelector = sammlung_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_file($objects: [sammlung_file_insert_input!]!, $on_conflict: sammlung_file_on_conflict) { insert_sammlung_file(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammlung_file"
    mutateInsert_sammlung_file_one(variables, resultSelector = sammlung_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_file_one($object: sammlung_file_insert_input!, $on_conflict: sammlung_file_on_conflict) { insert_sammlung_file_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammlung"
    mutateInsert_sammlung_one(variables, resultSelector = sammlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_one($object: sammlung_insert_input!, $on_conflict: sammlung_on_conflict) { insert_sammlung_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammlung_rev"
    mutateInsert_sammlung_rev(variables, resultSelector = sammlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_rev($objects: [sammlung_rev_insert_input!]!, $on_conflict: sammlung_rev_on_conflict) { insert_sammlung_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammlung_rev"
    mutateInsert_sammlung_rev_one(variables, resultSelector = sammlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_rev_one($object: sammlung_rev_insert_input!, $on_conflict: sammlung_rev_on_conflict) { insert_sammlung_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "spatial_ref_sys"
    mutateInsert_spatial_ref_sys(variables, resultSelector = spatial_ref_sys_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_spatial_ref_sys($objects: [spatial_ref_sys_insert_input!]!, $on_conflict: spatial_ref_sys_on_conflict) { insert_spatial_ref_sys(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sys_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "spatial_ref_sys"
    mutateInsert_spatial_ref_sys_one(variables, resultSelector = spatial_ref_sysModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_spatial_ref_sys_one($object: spatial_ref_sys_insert_input!, $on_conflict: spatial_ref_sys_on_conflict) { insert_spatial_ref_sys_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sysModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilkultur"
    mutateInsert_teilkultur(variables, resultSelector = teilkultur_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur($objects: [teilkultur_insert_input!]!, $on_conflict: teilkultur_on_conflict) { insert_teilkultur(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilkultur"
    mutateInsert_teilkultur_one(variables, resultSelector = teilkulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur_one($object: teilkultur_insert_input!, $on_conflict: teilkultur_on_conflict) { insert_teilkultur_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilkultur_rev"
    mutateInsert_teilkultur_rev(variables, resultSelector = teilkultur_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur_rev($objects: [teilkultur_rev_insert_input!]!, $on_conflict: teilkultur_rev_on_conflict) { insert_teilkultur_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilkultur_rev"
    mutateInsert_teilkultur_rev_one(variables, resultSelector = teilkultur_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur_rev_one($object: teilkultur_rev_insert_input!, $on_conflict: teilkultur_rev_on_conflict) { insert_teilkultur_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilzaehlung"
    mutateInsert_teilzaehlung(variables, resultSelector = teilzaehlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung($objects: [teilzaehlung_insert_input!]!, $on_conflict: teilzaehlung_on_conflict) { insert_teilzaehlung(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilzaehlung"
    mutateInsert_teilzaehlung_one(variables, resultSelector = teilzaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung_one($object: teilzaehlung_insert_input!, $on_conflict: teilzaehlung_on_conflict) { insert_teilzaehlung_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilzaehlung_rev"
    mutateInsert_teilzaehlung_rev(variables, resultSelector = teilzaehlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung_rev($objects: [teilzaehlung_rev_insert_input!]!, $on_conflict: teilzaehlung_rev_on_conflict) { insert_teilzaehlung_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilzaehlung_rev"
    mutateInsert_teilzaehlung_rev_one(variables, resultSelector = teilzaehlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung_rev_one($object: teilzaehlung_rev_insert_input!, $on_conflict: teilzaehlung_rev_on_conflict) { insert_teilzaehlung_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "user_role"
    mutateInsert_user_role(variables, resultSelector = user_role_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_user_role($objects: [user_role_insert_input!]!, $on_conflict: user_role_on_conflict) { insert_user_role(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new user_role_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "user_role"
    mutateInsert_user_role_one(variables, resultSelector = user_roleModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_user_role_one($object: user_role_insert_input!, $on_conflict: user_role_on_conflict) { insert_user_role_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new user_roleModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "zaehlung"
    mutateInsert_zaehlung(variables, resultSelector = zaehlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung($objects: [zaehlung_insert_input!]!, $on_conflict: zaehlung_on_conflict) { insert_zaehlung(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "zaehlung"
    mutateInsert_zaehlung_one(variables, resultSelector = zaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung_one($object: zaehlung_insert_input!, $on_conflict: zaehlung_on_conflict) { insert_zaehlung_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "zaehlung_rev"
    mutateInsert_zaehlung_rev(variables, resultSelector = zaehlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung_rev($objects: [zaehlung_rev_insert_input!]!, $on_conflict: zaehlung_rev_on_conflict) { insert_zaehlung_rev(objects: $objects, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "zaehlung_rev"
    mutateInsert_zaehlung_rev_one(variables, resultSelector = zaehlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung_rev_one($object: zaehlung_rev_insert_input!, $on_conflict: zaehlung_rev_on_conflict) { insert_zaehlung_rev_one(object: $object, on_conflict: $on_conflict) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "ae_art"
    mutateUpdate_ae_art(variables, resultSelector = ae_art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_ae_art($_set: ae_art_set_input, $where: ae_art_bool_exp!) { update_ae_art(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art"
    mutateUpdate_art(variables, resultSelector = art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art($_inc: art_inc_input, $_set: art_set_input, $where: art_bool_exp!) { update_art(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art"
    mutateUpdate_art_by_pk(variables, resultSelector = artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_by_pk($_inc: art_inc_input, $_set: art_set_input, $pk_columns: art_pk_columns_input!) { update_art_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_file"
    mutateUpdate_art_file(variables, resultSelector = art_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_file($_set: art_file_set_input, $where: art_file_bool_exp!) { update_art_file(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art_file"
    mutateUpdate_art_file_by_pk(variables, resultSelector = art_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_file_by_pk($_set: art_file_set_input, $pk_columns: art_file_pk_columns_input!) { update_art_file_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new art_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_qk"
    mutateUpdate_art_qk(variables, resultSelector = art_qk_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_qk($_inc: art_qk_inc_input, $_set: art_qk_set_input, $where: art_qk_bool_exp!) { update_art_qk(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art_qk"
    mutateUpdate_art_qk_by_pk(variables, resultSelector = art_qkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_qk_by_pk($_inc: art_qk_inc_input, $_set: art_qk_set_input, $pk_columns: art_qk_pk_columns_input!) { update_art_qk_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_qk_choosen"
    mutateUpdate_art_qk_choosen(variables, resultSelector = art_qk_choosen_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_qk_choosen($_set: art_qk_choosen_set_input, $where: art_qk_choosen_bool_exp!) { update_art_qk_choosen(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosen_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_rev"
    mutateUpdate_art_rev(variables, resultSelector = art_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_rev($_inc: art_rev_inc_input, $_set: art_rev_set_input, $where: art_rev_bool_exp!) { update_art_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art_rev"
    mutateUpdate_art_rev_by_pk(variables, resultSelector = art_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_rev_by_pk($_inc: art_rev_inc_input, $_set: art_rev_set_input, $pk_columns: art_rev_pk_columns_input!) { update_art_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new art_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "av_art"
    mutateUpdate_av_art(variables, resultSelector = av_art_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_av_art($_set: av_art_set_input, $where: av_art_bool_exp!) { update_av_art(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new av_art_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "av_art"
    mutateUpdate_av_art_by_pk(variables, resultSelector = av_artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_av_art_by_pk($_set: av_art_set_input, $pk_columns: av_art_pk_columns_input!) { update_av_art_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new av_artModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "event"
    mutateUpdate_event(variables, resultSelector = event_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event($_inc: event_inc_input, $_set: event_set_input, $where: event_bool_exp!) { update_event(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "event"
    mutateUpdate_event_by_pk(variables, resultSelector = eventModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event_by_pk($_inc: event_inc_input, $_set: event_set_input, $pk_columns: event_pk_columns_input!) { update_event_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "event_rev"
    mutateUpdate_event_rev(variables, resultSelector = event_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event_rev($_inc: event_rev_inc_input, $_set: event_rev_set_input, $where: event_rev_bool_exp!) { update_event_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "event_rev"
    mutateUpdate_event_rev_by_pk(variables, resultSelector = event_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event_rev_by_pk($_inc: event_rev_inc_input, $_set: event_rev_set_input, $pk_columns: event_rev_pk_columns_input!) { update_event_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new event_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "garten"
    mutateUpdate_garten(variables, resultSelector = garten_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten($_inc: garten_inc_input, $_set: garten_set_input, $where: garten_bool_exp!) { update_garten(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "garten"
    mutateUpdate_garten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_by_pk($_inc: garten_inc_input, $_set: garten_set_input, $pk_columns: garten_pk_columns_input!) { update_garten_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "garten_file"
    mutateUpdate_garten_file(variables, resultSelector = garten_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_file($_set: garten_file_set_input, $where: garten_file_bool_exp!) { update_garten_file(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "garten_file"
    mutateUpdate_garten_file_by_pk(variables, resultSelector = garten_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_file_by_pk($_set: garten_file_set_input, $pk_columns: garten_file_pk_columns_input!) { update_garten_file_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "garten_rev"
    mutateUpdate_garten_rev(variables, resultSelector = garten_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_rev($_inc: garten_rev_inc_input, $_set: garten_rev_set_input, $where: garten_rev_bool_exp!) { update_garten_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "garten_rev"
    mutateUpdate_garten_rev_by_pk(variables, resultSelector = garten_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_rev_by_pk($_inc: garten_rev_inc_input, $_set: garten_rev_set_input, $pk_columns: garten_rev_pk_columns_input!) { update_garten_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "herkunft"
    mutateUpdate_herkunft(variables, resultSelector = herkunft_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft($_inc: herkunft_inc_input, $_set: herkunft_set_input, $where: herkunft_bool_exp!) { update_herkunft(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "herkunft"
    mutateUpdate_herkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_by_pk($_inc: herkunft_inc_input, $_set: herkunft_set_input, $pk_columns: herkunft_pk_columns_input!) { update_herkunft_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "herkunft_file"
    mutateUpdate_herkunft_file(variables, resultSelector = herkunft_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_file($_set: herkunft_file_set_input, $where: herkunft_file_bool_exp!) { update_herkunft_file(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "herkunft_file"
    mutateUpdate_herkunft_file_by_pk(variables, resultSelector = herkunft_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_file_by_pk($_set: herkunft_file_set_input, $pk_columns: herkunft_file_pk_columns_input!) { update_herkunft_file_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "herkunft_rev"
    mutateUpdate_herkunft_rev(variables, resultSelector = herkunft_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_rev($_inc: herkunft_rev_inc_input, $_set: herkunft_rev_set_input, $where: herkunft_rev_bool_exp!) { update_herkunft_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "herkunft_rev"
    mutateUpdate_herkunft_rev_by_pk(variables, resultSelector = herkunft_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_rev_by_pk($_inc: herkunft_rev_inc_input, $_set: herkunft_rev_set_input, $pk_columns: herkunft_rev_pk_columns_input!) { update_herkunft_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur"
    mutateUpdate_kultur(variables, resultSelector = kultur_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur($_inc: kultur_inc_input, $_set: kultur_set_input, $where: kultur_bool_exp!) { update_kultur(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur"
    mutateUpdate_kultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_by_pk($_inc: kultur_inc_input, $_set: kultur_set_input, $pk_columns: kultur_pk_columns_input!) { update_kultur_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_file"
    mutateUpdate_kultur_file(variables, resultSelector = kultur_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_file($_set: kultur_file_set_input, $where: kultur_file_bool_exp!) { update_kultur_file(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_file"
    mutateUpdate_kultur_file_by_pk(variables, resultSelector = kultur_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_file_by_pk($_set: kultur_file_set_input, $pk_columns: kultur_file_pk_columns_input!) { update_kultur_file_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_option"
    mutateUpdate_kultur_option(variables, resultSelector = kultur_option_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_option($_inc: kultur_option_inc_input, $_set: kultur_option_set_input, $where: kultur_option_bool_exp!) { update_kultur_option(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_option_rev"
    mutateUpdate_kultur_option_rev(variables, resultSelector = kultur_option_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_option_rev($_inc: kultur_option_rev_inc_input, $_set: kultur_option_rev_set_input, $where: kultur_option_rev_bool_exp!) { update_kultur_option_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_option_rev"
    mutateUpdate_kultur_option_rev_by_pk(variables, resultSelector = kultur_option_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_option_rev_by_pk($_inc: kultur_option_rev_inc_input, $_set: kultur_option_rev_set_input, $pk_columns: kultur_option_rev_pk_columns_input!) { update_kultur_option_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_qk"
    mutateUpdate_kultur_qk(variables, resultSelector = kultur_qk_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_qk($_inc: kultur_qk_inc_input, $_set: kultur_qk_set_input, $where: kultur_qk_bool_exp!) { update_kultur_qk(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_qk"
    mutateUpdate_kultur_qk_by_pk(variables, resultSelector = kultur_qkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_qk_by_pk($_inc: kultur_qk_inc_input, $_set: kultur_qk_set_input, $pk_columns: kultur_qk_pk_columns_input!) { update_kultur_qk_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_qk_choosen"
    mutateUpdate_kultur_qk_choosen(variables, resultSelector = kultur_qk_choosen_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_qk_choosen($_set: kultur_qk_choosen_set_input, $where: kultur_qk_choosen_bool_exp!) { update_kultur_qk_choosen(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosen_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_rev"
    mutateUpdate_kultur_rev(variables, resultSelector = kultur_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_rev($_inc: kultur_rev_inc_input, $_set: kultur_rev_set_input, $where: kultur_rev_bool_exp!) { update_kultur_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_rev"
    mutateUpdate_kultur_rev_by_pk(variables, resultSelector = kultur_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_rev_by_pk($_inc: kultur_rev_inc_input, $_set: kultur_rev_set_input, $pk_columns: kultur_rev_pk_columns_input!) { update_kultur_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "lieferung"
    mutateUpdate_lieferung(variables, resultSelector = lieferung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung($_inc: lieferung_inc_input, $_set: lieferung_set_input, $where: lieferung_bool_exp!) { update_lieferung(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "lieferung"
    mutateUpdate_lieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_by_pk($_inc: lieferung_inc_input, $_set: lieferung_set_input, $pk_columns: lieferung_pk_columns_input!) { update_lieferung_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "lieferung_file"
    mutateUpdate_lieferung_file(variables, resultSelector = lieferung_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_file($_set: lieferung_file_set_input, $where: lieferung_file_bool_exp!) { update_lieferung_file(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "lieferung_file"
    mutateUpdate_lieferung_file_by_pk(variables, resultSelector = lieferung_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_file_by_pk($_set: lieferung_file_set_input, $pk_columns: lieferung_file_pk_columns_input!) { update_lieferung_file_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "lieferung_rev"
    mutateUpdate_lieferung_rev(variables, resultSelector = lieferung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_rev($_inc: lieferung_rev_inc_input, $_set: lieferung_rev_set_input, $where: lieferung_rev_bool_exp!) { update_lieferung_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "lieferung_rev"
    mutateUpdate_lieferung_rev_by_pk(variables, resultSelector = lieferung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_rev_by_pk($_inc: lieferung_rev_inc_input, $_set: lieferung_rev_set_input, $pk_columns: lieferung_rev_pk_columns_input!) { update_lieferung_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person"
    mutateUpdate_person(variables, resultSelector = person_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person($_inc: person_inc_input, $_set: person_set_input, $where: person_bool_exp!) { update_person(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person"
    mutateUpdate_person_by_pk(variables, resultSelector = personModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_by_pk($_inc: person_inc_input, $_set: person_set_input, $pk_columns: person_pk_columns_input!) { update_person_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_file"
    mutateUpdate_person_file(variables, resultSelector = person_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_file($_set: person_file_set_input, $where: person_file_bool_exp!) { update_person_file(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person_file"
    mutateUpdate_person_file_by_pk(variables, resultSelector = person_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_file_by_pk($_set: person_file_set_input, $pk_columns: person_file_pk_columns_input!) { update_person_file_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new person_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_option"
    mutateUpdate_person_option(variables, resultSelector = person_option_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_option($_inc: person_option_inc_input, $_set: person_option_set_input, $where: person_option_bool_exp!) { update_person_option(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_option_rev"
    mutateUpdate_person_option_rev(variables, resultSelector = person_option_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_option_rev($_inc: person_option_rev_inc_input, $_set: person_option_rev_set_input, $where: person_option_rev_bool_exp!) { update_person_option_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person_option_rev"
    mutateUpdate_person_option_rev_by_pk(variables, resultSelector = person_option_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_option_rev_by_pk($_inc: person_option_rev_inc_input, $_set: person_option_rev_set_input, $pk_columns: person_option_rev_pk_columns_input!) { update_person_option_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_rev"
    mutateUpdate_person_rev(variables, resultSelector = person_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_rev($_inc: person_rev_inc_input, $_set: person_rev_set_input, $where: person_rev_bool_exp!) { update_person_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person_rev"
    mutateUpdate_person_rev_by_pk(variables, resultSelector = person_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_rev_by_pk($_inc: person_rev_inc_input, $_set: person_rev_set_input, $pk_columns: person_rev_pk_columns_input!) { update_person_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new person_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammel_lieferung"
    mutateUpdate_sammel_lieferung(variables, resultSelector = sammel_lieferung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung($_inc: sammel_lieferung_inc_input, $_set: sammel_lieferung_set_input, $where: sammel_lieferung_bool_exp!) { update_sammel_lieferung(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammel_lieferung"
    mutateUpdate_sammel_lieferung_by_pk(variables, resultSelector = sammel_lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung_by_pk($_inc: sammel_lieferung_inc_input, $_set: sammel_lieferung_set_input, $pk_columns: sammel_lieferung_pk_columns_input!) { update_sammel_lieferung_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammel_lieferung_rev"
    mutateUpdate_sammel_lieferung_rev(variables, resultSelector = sammel_lieferung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung_rev($_inc: sammel_lieferung_rev_inc_input, $_set: sammel_lieferung_rev_set_input, $where: sammel_lieferung_rev_bool_exp!) { update_sammel_lieferung_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammel_lieferung_rev"
    mutateUpdate_sammel_lieferung_rev_by_pk(variables, resultSelector = sammel_lieferung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung_rev_by_pk($_inc: sammel_lieferung_rev_inc_input, $_set: sammel_lieferung_rev_set_input, $pk_columns: sammel_lieferung_rev_pk_columns_input!) { update_sammel_lieferung_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammlung"
    mutateUpdate_sammlung(variables, resultSelector = sammlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung($_inc: sammlung_inc_input, $_set: sammlung_set_input, $where: sammlung_bool_exp!) { update_sammlung(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammlung"
    mutateUpdate_sammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_by_pk($_inc: sammlung_inc_input, $_set: sammlung_set_input, $pk_columns: sammlung_pk_columns_input!) { update_sammlung_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammlung_file"
    mutateUpdate_sammlung_file(variables, resultSelector = sammlung_file_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_file($_set: sammlung_file_set_input, $where: sammlung_file_bool_exp!) { update_sammlung_file(_set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_file_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammlung_file"
    mutateUpdate_sammlung_file_by_pk(variables, resultSelector = sammlung_fileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_file_by_pk($_set: sammlung_file_set_input, $pk_columns: sammlung_file_pk_columns_input!) { update_sammlung_file_by_pk(_set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammlung_rev"
    mutateUpdate_sammlung_rev(variables, resultSelector = sammlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_rev($_inc: sammlung_rev_inc_input, $_set: sammlung_rev_set_input, $where: sammlung_rev_bool_exp!) { update_sammlung_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammlung_rev"
    mutateUpdate_sammlung_rev_by_pk(variables, resultSelector = sammlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_rev_by_pk($_inc: sammlung_rev_inc_input, $_set: sammlung_rev_set_input, $pk_columns: sammlung_rev_pk_columns_input!) { update_sammlung_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "spatial_ref_sys"
    mutateUpdate_spatial_ref_sys(variables, resultSelector = spatial_ref_sys_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_spatial_ref_sys($_inc: spatial_ref_sys_inc_input, $_set: spatial_ref_sys_set_input, $where: spatial_ref_sys_bool_exp!) { update_spatial_ref_sys(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sys_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "spatial_ref_sys"
    mutateUpdate_spatial_ref_sys_by_pk(variables, resultSelector = spatial_ref_sysModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_spatial_ref_sys_by_pk($_inc: spatial_ref_sys_inc_input, $_set: spatial_ref_sys_set_input, $pk_columns: spatial_ref_sys_pk_columns_input!) { update_spatial_ref_sys_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sysModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilkultur"
    mutateUpdate_teilkultur(variables, resultSelector = teilkultur_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur($_inc: teilkultur_inc_input, $_set: teilkultur_set_input, $where: teilkultur_bool_exp!) { update_teilkultur(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilkultur"
    mutateUpdate_teilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur_by_pk($_inc: teilkultur_inc_input, $_set: teilkultur_set_input, $pk_columns: teilkultur_pk_columns_input!) { update_teilkultur_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilkultur_rev"
    mutateUpdate_teilkultur_rev(variables, resultSelector = teilkultur_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur_rev($_inc: teilkultur_rev_inc_input, $_set: teilkultur_rev_set_input, $where: teilkultur_rev_bool_exp!) { update_teilkultur_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilkultur_rev"
    mutateUpdate_teilkultur_rev_by_pk(variables, resultSelector = teilkultur_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur_rev_by_pk($_inc: teilkultur_rev_inc_input, $_set: teilkultur_rev_set_input, $pk_columns: teilkultur_rev_pk_columns_input!) { update_teilkultur_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilzaehlung"
    mutateUpdate_teilzaehlung(variables, resultSelector = teilzaehlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung($_inc: teilzaehlung_inc_input, $_set: teilzaehlung_set_input, $where: teilzaehlung_bool_exp!) { update_teilzaehlung(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilzaehlung"
    mutateUpdate_teilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung_by_pk($_inc: teilzaehlung_inc_input, $_set: teilzaehlung_set_input, $pk_columns: teilzaehlung_pk_columns_input!) { update_teilzaehlung_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilzaehlung_rev"
    mutateUpdate_teilzaehlung_rev(variables, resultSelector = teilzaehlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung_rev($_inc: teilzaehlung_rev_inc_input, $_set: teilzaehlung_rev_set_input, $where: teilzaehlung_rev_bool_exp!) { update_teilzaehlung_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilzaehlung_rev"
    mutateUpdate_teilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung_rev_by_pk($_inc: teilzaehlung_rev_inc_input, $_set: teilzaehlung_rev_set_input, $pk_columns: teilzaehlung_rev_pk_columns_input!) { update_teilzaehlung_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "user_role"
    mutateUpdate_user_role(variables, resultSelector = user_role_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_user_role($_inc: user_role_inc_input, $_set: user_role_set_input, $where: user_role_bool_exp!) { update_user_role(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new user_role_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "user_role"
    mutateUpdate_user_role_by_pk(variables, resultSelector = user_roleModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_user_role_by_pk($_inc: user_role_inc_input, $_set: user_role_set_input, $pk_columns: user_role_pk_columns_input!) { update_user_role_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new user_roleModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "zaehlung"
    mutateUpdate_zaehlung(variables, resultSelector = zaehlung_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung($_inc: zaehlung_inc_input, $_set: zaehlung_set_input, $where: zaehlung_bool_exp!) { update_zaehlung(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "zaehlung"
    mutateUpdate_zaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung_by_pk($_inc: zaehlung_inc_input, $_set: zaehlung_set_input, $pk_columns: zaehlung_pk_columns_input!) { update_zaehlung_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "zaehlung_rev"
    mutateUpdate_zaehlung_rev(variables, resultSelector = zaehlung_rev_mutation_responseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung_rev($_inc: zaehlung_rev_inc_input, $_set: zaehlung_rev_set_input, $where: zaehlung_rev_bool_exp!) { update_zaehlung_rev(_inc: $_inc, _set: $_set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_rev_mutation_responseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "zaehlung_rev"
    mutateUpdate_zaehlung_rev_by_pk(variables, resultSelector = zaehlung_revModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung_rev_by_pk($_inc: zaehlung_rev_inc_input, $_set: zaehlung_rev_set_input, $pk_columns: zaehlung_rev_pk_columns_input!) { update_zaehlung_rev_by_pk(_inc: $_inc, _set: $_set, pk_columns: $pk_columns) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // fetch data from the table: "ae_art"
    subscribeAe_art(variables, resultSelector = ae_artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription ae_art($distinct_on: [ae_art_select_column!], $limit: Int, $offset: Int, $order_by: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_artModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "ae_art"
    subscribeAe_art_aggregate(variables, resultSelector = ae_art_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription ae_art_aggregate($distinct_on: [ae_art_select_column!], $limit: Int, $offset: Int, $order_by: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ae_art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art"
    subscribeArt(variables, resultSelector = artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art($distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art"
    subscribeArt_aggregate(variables, resultSelector = art_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_aggregate($distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art" using primary key columns
    subscribeArt_by_pk(variables, resultSelector = artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_by_pk($id: uuid!) { art_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_file"
    subscribeArt_file(variables, resultSelector = art_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_file($distinct_on: [art_file_select_column!], $limit: Int, $offset: Int, $order_by: [art_file_order_by!], $where: art_file_bool_exp) { art_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_file"
    subscribeArt_file_aggregate(variables, resultSelector = art_file_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_file_aggregate($distinct_on: [art_file_select_column!], $limit: Int, $offset: Int, $order_by: [art_file_order_by!], $where: art_file_bool_exp) { art_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_file" using primary key columns
    subscribeArt_file_by_pk(variables, resultSelector = art_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_file_by_pk($id: uuid!) { art_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new art_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_qk"
    subscribeArt_qk(variables, resultSelector = art_qkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk($distinct_on: [art_qk_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_qk"
    subscribeArt_qk_aggregate(variables, resultSelector = art_qk_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_aggregate($distinct_on: [art_qk_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_qk" using primary key columns
    subscribeArt_qk_by_pk(variables, resultSelector = art_qkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_by_pk($name: String!) { art_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_qk_choosen"
    subscribeArt_qk_choosen(variables, resultSelector = art_qk_choosenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_choosen($distinct_on: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_qk_choosen"
    subscribeArt_qk_choosen_aggregate(variables, resultSelector = art_qk_choosen_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_choosen_aggregate($distinct_on: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_qk_choosen_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_rev"
    subscribeArt_rev(variables, resultSelector = art_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_rev($distinct_on: [art_rev_select_column!], $limit: Int, $offset: Int, $order_by: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_rev"
    subscribeArt_rev_aggregate(variables, resultSelector = art_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_rev_aggregate($distinct_on: [art_rev_select_column!], $limit: Int, $offset: Int, $order_by: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_rev" using primary key columns
    subscribeArt_rev_by_pk(variables, resultSelector = art_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_rev_by_pk($_rev: String!, $id: uuid!) { art_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new art_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "art_search" which returns "art"
    subscribeArt_search(variables, resultSelector = artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_search($args: art_search_args!, $distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new artModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "art_search" and query aggregates on result of table type "art"
    subscribeArt_search_aggregate(variables, resultSelector = art_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_search_aggregate($args: art_search_args!, $distinct_on: [art_select_column!], $limit: Int, $offset: Int, $order_by: [art_order_by!], $where: art_bool_exp) { art_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_sums"
    subscribeArt_sums(variables, resultSelector = art_sumsModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_sums($distinct_on: [art_sums_select_column!], $limit: Int, $offset: Int, $order_by: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_sumsModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_sums"
    subscribeArt_sums_aggregate(variables, resultSelector = art_sums_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_sums_aggregate($distinct_on: [art_sums_select_column!], $limit: Int, $offset: Int, $order_by: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new art_sums_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "av_art"
    subscribeAv_art(variables, resultSelector = av_artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription av_art($distinct_on: [av_art_select_column!], $limit: Int, $offset: Int, $order_by: [av_art_order_by!], $where: av_art_bool_exp) { av_art(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new av_artModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "av_art"
    subscribeAv_art_aggregate(variables, resultSelector = av_art_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription av_art_aggregate($distinct_on: [av_art_select_column!], $limit: Int, $offset: Int, $order_by: [av_art_order_by!], $where: av_art_bool_exp) { av_art_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new av_art_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "av_art" using primary key columns
    subscribeAv_art_by_pk(variables, resultSelector = av_artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription av_art_by_pk($art_id: uuid!, $person_id: uuid!) { av_art_by_pk(art_id: $art_id, person_id: $person_id) {
        ${typeof resultSelector === "function" ? resultSelector(new av_artModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event"
    subscribeEvent(variables, resultSelector = eventModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event($distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "event"
    subscribeEvent_aggregate(variables, resultSelector = event_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_aggregate($distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event" using primary key columns
    subscribeEvent_by_pk(variables, resultSelector = eventModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_by_pk($id: uuid!) { event_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event_rev"
    subscribeEvent_rev(variables, resultSelector = event_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_rev($distinct_on: [event_rev_select_column!], $limit: Int, $offset: Int, $order_by: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "event_rev"
    subscribeEvent_rev_aggregate(variables, resultSelector = event_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_rev_aggregate($distinct_on: [event_rev_select_column!], $limit: Int, $offset: Int, $order_by: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event_rev" using primary key columns
    subscribeEvent_rev_by_pk(variables, resultSelector = event_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_rev_by_pk($_rev: String!, $id: uuid!) { event_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new event_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "event_search" which returns "event"
    subscribeEvent_search(variables, resultSelector = eventModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_search($args: event_search_args!, $distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new eventModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "event_search" and query aggregates on result of table type "event"
    subscribeEvent_search_aggregate(variables, resultSelector = event_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_search_aggregate($args: event_search_args!, $distinct_on: [event_select_column!], $limit: Int, $offset: Int, $order_by: [event_order_by!], $where: event_bool_exp) { event_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new event_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten"
    subscribeGarten(variables, resultSelector = gartenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten($distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten"
    subscribeGarten_aggregate(variables, resultSelector = garten_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_aggregate($distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten" using primary key columns
    subscribeGarten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_by_pk($id: uuid!) { garten_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_file"
    subscribeGarten_file(variables, resultSelector = garten_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_file($distinct_on: [garten_file_select_column!], $limit: Int, $offset: Int, $order_by: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten_file"
    subscribeGarten_file_aggregate(variables, resultSelector = garten_file_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_file_aggregate($distinct_on: [garten_file_select_column!], $limit: Int, $offset: Int, $order_by: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_file" using primary key columns
    subscribeGarten_file_by_pk(variables, resultSelector = garten_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_file_by_pk($id: uuid!) { garten_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_rev"
    subscribeGarten_rev(variables, resultSelector = garten_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_rev($distinct_on: [garten_rev_select_column!], $limit: Int, $offset: Int, $order_by: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten_rev"
    subscribeGarten_rev_aggregate(variables, resultSelector = garten_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_rev_aggregate($distinct_on: [garten_rev_select_column!], $limit: Int, $offset: Int, $order_by: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_rev" using primary key columns
    subscribeGarten_rev_by_pk(variables, resultSelector = garten_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_rev_by_pk($_rev: String!, $id: uuid!) { garten_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "garten_search" which returns "garten"
    subscribeGarten_search(variables, resultSelector = gartenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_search($args: garten_search_args!, $distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new gartenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "garten_search" and query aggregates on result of table type "garten"
    subscribeGarten_search_aggregate(variables, resultSelector = garten_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_search_aggregate($args: garten_search_args!, $distinct_on: [garten_select_column!], $limit: Int, $offset: Int, $order_by: [garten_order_by!], $where: garten_bool_exp) { garten_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_teilzaehlung_sums"
    subscribeGarten_teilzaehlung_sums(variables, resultSelector = garten_teilzaehlung_sumsModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_teilzaehlung_sums($distinct_on: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $order_by: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_teilzaehlung_sumsModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten_teilzaehlung_sums"
    subscribeGarten_teilzaehlung_sums_aggregate(variables, resultSelector = garten_teilzaehlung_sums_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_teilzaehlung_sums_aggregate($distinct_on: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $order_by: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new garten_teilzaehlung_sums_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft"
    subscribeHerkunft(variables, resultSelector = herkunftModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft($distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft"
    subscribeHerkunft_aggregate(variables, resultSelector = herkunft_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_aggregate($distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft" using primary key columns
    subscribeHerkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_by_pk($id: uuid!) { herkunft_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_file"
    subscribeHerkunft_file(variables, resultSelector = herkunft_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_file($distinct_on: [herkunft_file_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft_file"
    subscribeHerkunft_file_aggregate(variables, resultSelector = herkunft_file_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_file_aggregate($distinct_on: [herkunft_file_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_file" using primary key columns
    subscribeHerkunft_file_by_pk(variables, resultSelector = herkunft_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_file_by_pk($id: uuid!) { herkunft_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_rev"
    subscribeHerkunft_rev(variables, resultSelector = herkunft_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_rev($distinct_on: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft_rev"
    subscribeHerkunft_rev_aggregate(variables, resultSelector = herkunft_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_rev_aggregate($distinct_on: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_rev" using primary key columns
    subscribeHerkunft_rev_by_pk(variables, resultSelector = herkunft_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_rev_by_pk($_rev: String!, $id: uuid!) { herkunft_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "herkunft_search" which returns "herkunft"
    subscribeHerkunft_search(variables, resultSelector = herkunftModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_search($args: herkunft_search_args!, $distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunftModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "herkunft_search" and query aggregates on result of table type "herkunft"
    subscribeHerkunft_search_aggregate(variables, resultSelector = herkunft_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_search_aggregate($args: herkunft_search_args!, $distinct_on: [herkunft_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_sums"
    subscribeHerkunft_sums(variables, resultSelector = herkunft_sumsModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_sums($distinct_on: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_sumsModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft_sums"
    subscribeHerkunft_sums_aggregate(variables, resultSelector = herkunft_sums_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_sums_aggregate($distinct_on: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $order_by: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new herkunft_sums_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur"
    subscribeKultur(variables, resultSelector = kulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur($distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur"
    subscribeKultur_aggregate(variables, resultSelector = kultur_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_aggregate($distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur" using primary key columns
    subscribeKultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_by_pk($id: uuid!) { kultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_file"
    subscribeKultur_file(variables, resultSelector = kultur_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_file($distinct_on: [kultur_file_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_file"
    subscribeKultur_file_aggregate(variables, resultSelector = kultur_file_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_file_aggregate($distinct_on: [kultur_file_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_file" using primary key columns
    subscribeKultur_file_by_pk(variables, resultSelector = kultur_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_file_by_pk($id: uuid!) { kultur_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_option"
    subscribeKultur_option(variables, resultSelector = kultur_optionModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option($distinct_on: [kultur_option_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_optionModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_option"
    subscribeKultur_option_aggregate(variables, resultSelector = kultur_option_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_aggregate($distinct_on: [kultur_option_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_option_rev"
    subscribeKultur_option_rev(variables, resultSelector = kultur_option_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_rev($distinct_on: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_option_rev"
    subscribeKultur_option_rev_aggregate(variables, resultSelector = kultur_option_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_rev_aggregate($distinct_on: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_option_rev" using primary key columns
    subscribeKultur_option_rev_by_pk(variables, resultSelector = kultur_option_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_rev_by_pk($_rev: String!, $kultur_id: uuid!) { kultur_option_rev_by_pk(_rev: $_rev, kultur_id: $kultur_id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_qk"
    subscribeKultur_qk(variables, resultSelector = kultur_qkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk($distinct_on: [kultur_qk_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_qk"
    subscribeKultur_qk_aggregate(variables, resultSelector = kultur_qk_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_aggregate($distinct_on: [kultur_qk_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_qk" using primary key columns
    subscribeKultur_qk_by_pk(variables, resultSelector = kultur_qkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_by_pk($name: String!) { kultur_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_qk_choosen"
    subscribeKultur_qk_choosen(variables, resultSelector = kultur_qk_choosenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_choosen($distinct_on: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_qk_choosen"
    subscribeKultur_qk_choosen_aggregate(variables, resultSelector = kultur_qk_choosen_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_choosen_aggregate($distinct_on: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_qk_choosen_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_rev"
    subscribeKultur_rev(variables, resultSelector = kultur_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_rev($distinct_on: [kultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_rev"
    subscribeKultur_rev_aggregate(variables, resultSelector = kultur_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_rev_aggregate($distinct_on: [kultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_rev" using primary key columns
    subscribeKultur_rev_by_pk(variables, resultSelector = kultur_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_rev_by_pk($_rev: String!, $id: uuid!) { kultur_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "kultur_search" which returns "kultur"
    subscribeKultur_search(variables, resultSelector = kulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_search($args: kultur_search_args!, $distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "kultur_search" and query aggregates on result of table type "kultur"
    subscribeKultur_search_aggregate(variables, resultSelector = kultur_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_search_aggregate($args: kultur_search_args!, $distinct_on: [kultur_select_column!], $limit: Int, $offset: Int, $order_by: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new kultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung"
    subscribeLieferung(variables, resultSelector = lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung($distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "lieferung"
    subscribeLieferung_aggregate(variables, resultSelector = lieferung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_aggregate($distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung" using primary key columns
    subscribeLieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_by_pk($id: uuid!) { lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_file"
    subscribeLieferung_file(variables, resultSelector = lieferung_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_file($distinct_on: [lieferung_file_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "lieferung_file"
    subscribeLieferung_file_aggregate(variables, resultSelector = lieferung_file_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_file_aggregate($distinct_on: [lieferung_file_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_file" using primary key columns
    subscribeLieferung_file_by_pk(variables, resultSelector = lieferung_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_file_by_pk($id: uuid!) { lieferung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_rev"
    subscribeLieferung_rev(variables, resultSelector = lieferung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_rev($distinct_on: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "lieferung_rev"
    subscribeLieferung_rev_aggregate(variables, resultSelector = lieferung_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_rev_aggregate($distinct_on: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_rev" using primary key columns
    subscribeLieferung_rev_by_pk(variables, resultSelector = lieferung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_rev_by_pk($_rev: String!, $id: uuid!) { lieferung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "lieferung_search" which returns "lieferung"
    subscribeLieferung_search(variables, resultSelector = lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_search($args: lieferung_search_args!, $distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "lieferung_search" and query aggregates on result of table type "lieferung"
    subscribeLieferung_search_aggregate(variables, resultSelector = lieferung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_search_aggregate($args: lieferung_search_args!, $distinct_on: [lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new lieferung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person"
    subscribePerson(variables, resultSelector = personModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person($distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person"
    subscribePerson_aggregate(variables, resultSelector = person_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_aggregate($distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person" using primary key columns
    subscribePerson_by_pk(variables, resultSelector = personModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_by_pk($id: uuid!) { person_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_file"
    subscribePerson_file(variables, resultSelector = person_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_file($distinct_on: [person_file_select_column!], $limit: Int, $offset: Int, $order_by: [person_file_order_by!], $where: person_file_bool_exp) { person_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_file"
    subscribePerson_file_aggregate(variables, resultSelector = person_file_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_file_aggregate($distinct_on: [person_file_select_column!], $limit: Int, $offset: Int, $order_by: [person_file_order_by!], $where: person_file_bool_exp) { person_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_file" using primary key columns
    subscribePerson_file_by_pk(variables, resultSelector = person_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_file_by_pk($id: uuid!) { person_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_option"
    subscribePerson_option(variables, resultSelector = person_optionModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option($distinct_on: [person_option_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_order_by!], $where: person_option_bool_exp) { person_option(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_optionModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_option"
    subscribePerson_option_aggregate(variables, resultSelector = person_option_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_aggregate($distinct_on: [person_option_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_order_by!], $where: person_option_bool_exp) { person_option_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_option_rev"
    subscribePerson_option_rev(variables, resultSelector = person_option_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_rev($distinct_on: [person_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_option_rev"
    subscribePerson_option_rev_aggregate(variables, resultSelector = person_option_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_rev_aggregate($distinct_on: [person_option_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_option_rev" using primary key columns
    subscribePerson_option_rev_by_pk(variables, resultSelector = person_option_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_rev_by_pk($_rev: String!, $person_id: uuid!) { person_option_rev_by_pk(_rev: $_rev, person_id: $person_id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_option_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_rev"
    subscribePerson_rev(variables, resultSelector = person_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_rev($distinct_on: [person_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_rev"
    subscribePerson_rev_aggregate(variables, resultSelector = person_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_rev_aggregate($distinct_on: [person_rev_select_column!], $limit: Int, $offset: Int, $order_by: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_rev" using primary key columns
    subscribePerson_rev_by_pk(variables, resultSelector = person_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_rev_by_pk($_rev: String!, $id: uuid!) { person_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new person_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "person_search" which returns "person"
    subscribePerson_search(variables, resultSelector = personModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_search($args: person_search_args!, $distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new personModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "person_search" and query aggregates on result of table type "person"
    subscribePerson_search_aggregate(variables, resultSelector = person_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_search_aggregate($args: person_search_args!, $distinct_on: [person_select_column!], $limit: Int, $offset: Int, $order_by: [person_order_by!], $where: person_bool_exp) { person_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new person_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung"
    subscribeSammel_lieferung(variables, resultSelector = sammel_lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung($distinct_on: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammel_lieferung"
    subscribeSammel_lieferung_aggregate(variables, resultSelector = sammel_lieferung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_aggregate($distinct_on: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung" using primary key columns
    subscribeSammel_lieferung_by_pk(variables, resultSelector = sammel_lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_by_pk($id: uuid!) { sammel_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung_rev"
    subscribeSammel_lieferung_rev(variables, resultSelector = sammel_lieferung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_rev($distinct_on: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammel_lieferung_rev"
    subscribeSammel_lieferung_rev_aggregate(variables, resultSelector = sammel_lieferung_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_rev_aggregate($distinct_on: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung_rev" using primary key columns
    subscribeSammel_lieferung_rev_by_pk(variables, resultSelector = sammel_lieferung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_rev_by_pk($_rev: String!, $id: uuid!) { sammel_lieferung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammel_lieferung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung"
    subscribeSammlung(variables, resultSelector = sammlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung($distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammlung"
    subscribeSammlung_aggregate(variables, resultSelector = sammlung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_aggregate($distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung" using primary key columns
    subscribeSammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_by_pk($id: uuid!) { sammlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_file"
    subscribeSammlung_file(variables, resultSelector = sammlung_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_file($distinct_on: [sammlung_file_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammlung_file"
    subscribeSammlung_file_aggregate(variables, resultSelector = sammlung_file_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_file_aggregate($distinct_on: [sammlung_file_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_file_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_file" using primary key columns
    subscribeSammlung_file_by_pk(variables, resultSelector = sammlung_fileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_file_by_pk($id: uuid!) { sammlung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_fileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_rev"
    subscribeSammlung_rev(variables, resultSelector = sammlung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_rev($distinct_on: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammlung_rev"
    subscribeSammlung_rev_aggregate(variables, resultSelector = sammlung_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_rev_aggregate($distinct_on: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_rev" using primary key columns
    subscribeSammlung_rev_by_pk(variables, resultSelector = sammlung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_rev_by_pk($_rev: String!, $id: uuid!) { sammlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "sammlung_search" which returns "sammlung"
    subscribeSammlung_search(variables, resultSelector = sammlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_search($args: sammlung_search_args!, $distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "sammlung_search" and query aggregates on result of table type "sammlung"
    subscribeSammlung_search_aggregate(variables, resultSelector = sammlung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_search_aggregate($args: sammlung_search_args!, $distinct_on: [sammlung_select_column!], $limit: Int, $offset: Int, $order_by: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new sammlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "spatial_ref_sys"
    subscribeSpatial_ref_sys(variables, resultSelector = spatial_ref_sysModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription spatial_ref_sys($distinct_on: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $order_by: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sysModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "spatial_ref_sys"
    subscribeSpatial_ref_sys_aggregate(variables, resultSelector = spatial_ref_sys_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription spatial_ref_sys_aggregate($distinct_on: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $order_by: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sys_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "spatial_ref_sys" using primary key columns
    subscribeSpatial_ref_sys_by_pk(variables, resultSelector = spatial_ref_sysModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription spatial_ref_sys_by_pk($srid: Int!) { spatial_ref_sys_by_pk(srid: $srid) {
        ${typeof resultSelector === "function" ? resultSelector(new spatial_ref_sysModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur"
    subscribeTeilkultur(variables, resultSelector = teilkulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur($distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilkultur"
    subscribeTeilkultur_aggregate(variables, resultSelector = teilkultur_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_aggregate($distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur" using primary key columns
    subscribeTeilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_by_pk($id: uuid!) { teilkultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur_rev"
    subscribeTeilkultur_rev(variables, resultSelector = teilkultur_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_rev($distinct_on: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilkultur_rev"
    subscribeTeilkultur_rev_aggregate(variables, resultSelector = teilkultur_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_rev_aggregate($distinct_on: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur_rev" using primary key columns
    subscribeTeilkultur_rev_by_pk(variables, resultSelector = teilkultur_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_rev_by_pk($_rev: String!, $id: uuid!) { teilkultur_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "teilkultur_search" which returns "teilkultur"
    subscribeTeilkultur_search(variables, resultSelector = teilkulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_search($args: teilkultur_search_args!, $distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "teilkultur_search" and query aggregates on result of table type "teilkultur"
    subscribeTeilkultur_search_aggregate(variables, resultSelector = teilkultur_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_search_aggregate($args: teilkultur_search_args!, $distinct_on: [teilkultur_select_column!], $limit: Int, $offset: Int, $order_by: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilkultur_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung"
    subscribeTeilzaehlung(variables, resultSelector = teilzaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung($distinct_on: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilzaehlung"
    subscribeTeilzaehlung_aggregate(variables, resultSelector = teilzaehlung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_aggregate($distinct_on: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung" using primary key columns
    subscribeTeilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_by_pk($id: uuid!) { teilzaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung_rev"
    subscribeTeilzaehlung_rev(variables, resultSelector = teilzaehlung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_rev($distinct_on: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilzaehlung_rev"
    subscribeTeilzaehlung_rev_aggregate(variables, resultSelector = teilzaehlung_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_rev_aggregate($distinct_on: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung_rev" using primary key columns
    subscribeTeilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_rev_by_pk($_rev: String!, $id: uuid!) { teilzaehlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new teilzaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "user_role"
    subscribeUser_role(variables, resultSelector = user_roleModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription user_role($distinct_on: [user_role_select_column!], $limit: Int, $offset: Int, $order_by: [user_role_order_by!], $where: user_role_bool_exp) { user_role(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new user_roleModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "user_role"
    subscribeUser_role_aggregate(variables, resultSelector = user_role_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription user_role_aggregate($distinct_on: [user_role_select_column!], $limit: Int, $offset: Int, $order_by: [user_role_order_by!], $where: user_role_bool_exp) { user_role_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new user_role_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "user_role" using primary key columns
    subscribeUser_role_by_pk(variables, resultSelector = user_roleModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription user_role_by_pk($name: String!) { user_role_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new user_roleModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung"
    subscribeZaehlung(variables, resultSelector = zaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung($distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "zaehlung"
    subscribeZaehlung_aggregate(variables, resultSelector = zaehlung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_aggregate($distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung" using primary key columns
    subscribeZaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_by_pk($id: uuid!) { zaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung_rev"
    subscribeZaehlung_rev(variables, resultSelector = zaehlung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_rev($distinct_on: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "zaehlung_rev"
    subscribeZaehlung_rev_aggregate(variables, resultSelector = zaehlung_rev_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_rev_aggregate($distinct_on: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev_aggregate(distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_rev_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung_rev" using primary key columns
    subscribeZaehlung_rev_by_pk(variables, resultSelector = zaehlung_revModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_rev_by_pk($_rev: String!, $id: uuid!) { zaehlung_rev_by_pk(_rev: $_rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_revModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "zaehlung_search" which returns "zaehlung"
    subscribeZaehlung_search(variables, resultSelector = zaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_search($args: zaehlung_search_args!, $distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "zaehlung_search" and query aggregates on result of table type "zaehlung"
    subscribeZaehlung_search_aggregate(variables, resultSelector = zaehlung_aggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_search_aggregate($args: zaehlung_search_args!, $distinct_on: [zaehlung_select_column!], $limit: Int, $offset: Int, $order_by: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search_aggregate(args: $args, distinct_on: $distinct_on, limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new zaehlung_aggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
  }))
