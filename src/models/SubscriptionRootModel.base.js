/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AeArtAggregateModel } from "./AeArtAggregateModel"
import { AeArtAggregateModelSelector } from "./AeArtAggregateModel.base"
import { AeArtModel } from "./AeArtModel"
import { AeArtModelSelector } from "./AeArtModel.base"
import { ArtAggregateModel } from "./ArtAggregateModel"
import { ArtAggregateModelSelector } from "./ArtAggregateModel.base"
import { ArtFileAggregateModel } from "./ArtFileAggregateModel"
import { ArtFileAggregateModelSelector } from "./ArtFileAggregateModel.base"
import { ArtFileModel } from "./ArtFileModel"
import { ArtFileModelSelector } from "./ArtFileModel.base"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { ArtQkAggregateModel } from "./ArtQkAggregateModel"
import { ArtQkAggregateModelSelector } from "./ArtQkAggregateModel.base"
import { ArtQkChoosenAggregateModel } from "./ArtQkChoosenAggregateModel"
import { ArtQkChoosenAggregateModelSelector } from "./ArtQkChoosenAggregateModel.base"
import { ArtQkChoosenModel } from "./ArtQkChoosenModel"
import { ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"
import { ArtQkModel } from "./ArtQkModel"
import { ArtQkModelSelector } from "./ArtQkModel.base"
import { ArtRevAggregateModel } from "./ArtRevAggregateModel"
import { ArtRevAggregateModelSelector } from "./ArtRevAggregateModel.base"
import { ArtRevModel } from "./ArtRevModel"
import { ArtRevModelSelector } from "./ArtRevModel.base"
import { ArtSumsAggregateModel } from "./ArtSumsAggregateModel"
import { ArtSumsAggregateModelSelector } from "./ArtSumsAggregateModel.base"
import { ArtSumsModel } from "./ArtSumsModel"
import { ArtSumsModelSelector } from "./ArtSumsModel.base"
import { AvArtAggregateModel } from "./AvArtAggregateModel"
import { AvArtAggregateModelSelector } from "./AvArtAggregateModel.base"
import { AvArtModel } from "./AvArtModel"
import { AvArtModelSelector } from "./AvArtModel.base"
import { EventAggregateModel } from "./EventAggregateModel"
import { EventAggregateModelSelector } from "./EventAggregateModel.base"
import { EventModel } from "./EventModel"
import { EventModelSelector } from "./EventModel.base"
import { EventRevAggregateModel } from "./EventRevAggregateModel"
import { EventRevAggregateModelSelector } from "./EventRevAggregateModel.base"
import { EventRevModel } from "./EventRevModel"
import { EventRevModelSelector } from "./EventRevModel.base"
import { GartenAggregateModel } from "./GartenAggregateModel"
import { GartenAggregateModelSelector } from "./GartenAggregateModel.base"
import { GartenFileAggregateModel } from "./GartenFileAggregateModel"
import { GartenFileAggregateModelSelector } from "./GartenFileAggregateModel.base"
import { GartenFileModel } from "./GartenFileModel"
import { GartenFileModelSelector } from "./GartenFileModel.base"
import { GartenModel } from "./GartenModel"
import { GartenModelSelector } from "./GartenModel.base"
import { GartenRevAggregateModel } from "./GartenRevAggregateModel"
import { GartenRevAggregateModelSelector } from "./GartenRevAggregateModel.base"
import { GartenRevModel } from "./GartenRevModel"
import { GartenRevModelSelector } from "./GartenRevModel.base"
import { GartenTeilzaehlungSumsAggregateModel } from "./GartenTeilzaehlungSumsAggregateModel"
import { GartenTeilzaehlungSumsAggregateModelSelector } from "./GartenTeilzaehlungSumsAggregateModel.base"
import { GartenTeilzaehlungSumsModel } from "./GartenTeilzaehlungSumsModel"
import { GartenTeilzaehlungSumsModelSelector } from "./GartenTeilzaehlungSumsModel.base"
import { HerkunftAggregateModel } from "./HerkunftAggregateModel"
import { HerkunftAggregateModelSelector } from "./HerkunftAggregateModel.base"
import { HerkunftFileAggregateModel } from "./HerkunftFileAggregateModel"
import { HerkunftFileAggregateModelSelector } from "./HerkunftFileAggregateModel.base"
import { HerkunftFileModel } from "./HerkunftFileModel"
import { HerkunftFileModelSelector } from "./HerkunftFileModel.base"
import { HerkunftModel } from "./HerkunftModel"
import { HerkunftModelSelector } from "./HerkunftModel.base"
import { HerkunftRevAggregateModel } from "./HerkunftRevAggregateModel"
import { HerkunftRevAggregateModelSelector } from "./HerkunftRevAggregateModel.base"
import { HerkunftRevModel } from "./HerkunftRevModel"
import { HerkunftRevModelSelector } from "./HerkunftRevModel.base"
import { HerkunftSumsAggregateModel } from "./HerkunftSumsAggregateModel"
import { HerkunftSumsAggregateModelSelector } from "./HerkunftSumsAggregateModel.base"
import { HerkunftSumsModel } from "./HerkunftSumsModel"
import { HerkunftSumsModelSelector } from "./HerkunftSumsModel.base"
import { KulturAggregateModel } from "./KulturAggregateModel"
import { KulturAggregateModelSelector } from "./KulturAggregateModel.base"
import { KulturFileAggregateModel } from "./KulturFileAggregateModel"
import { KulturFileAggregateModelSelector } from "./KulturFileAggregateModel.base"
import { KulturFileModel } from "./KulturFileModel"
import { KulturFileModelSelector } from "./KulturFileModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { KulturOptionAggregateModel } from "./KulturOptionAggregateModel"
import { KulturOptionAggregateModelSelector } from "./KulturOptionAggregateModel.base"
import { KulturOptionModel } from "./KulturOptionModel"
import { KulturOptionModelSelector } from "./KulturOptionModel.base"
import { KulturOptionRevAggregateModel } from "./KulturOptionRevAggregateModel"
import { KulturOptionRevAggregateModelSelector } from "./KulturOptionRevAggregateModel.base"
import { KulturOptionRevModel } from "./KulturOptionRevModel"
import { KulturOptionRevModelSelector } from "./KulturOptionRevModel.base"
import { KulturQkAggregateModel } from "./KulturQkAggregateModel"
import { KulturQkAggregateModelSelector } from "./KulturQkAggregateModel.base"
import { KulturQkChoosenAggregateModel } from "./KulturQkChoosenAggregateModel"
import { KulturQkChoosenAggregateModelSelector } from "./KulturQkChoosenAggregateModel.base"
import { KulturQkChoosenModel } from "./KulturQkChoosenModel"
import { KulturQkChoosenModelSelector } from "./KulturQkChoosenModel.base"
import { KulturQkModel } from "./KulturQkModel"
import { KulturQkModelSelector } from "./KulturQkModel.base"
import { KulturRevAggregateModel } from "./KulturRevAggregateModel"
import { KulturRevAggregateModelSelector } from "./KulturRevAggregateModel.base"
import { KulturRevModel } from "./KulturRevModel"
import { KulturRevModelSelector } from "./KulturRevModel.base"
import { LieferungAggregateModel } from "./LieferungAggregateModel"
import { LieferungAggregateModelSelector } from "./LieferungAggregateModel.base"
import { LieferungFileAggregateModel } from "./LieferungFileAggregateModel"
import { LieferungFileAggregateModelSelector } from "./LieferungFileAggregateModel.base"
import { LieferungFileModel } from "./LieferungFileModel"
import { LieferungFileModelSelector } from "./LieferungFileModel.base"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"
import { LieferungRevAggregateModel } from "./LieferungRevAggregateModel"
import { LieferungRevAggregateModelSelector } from "./LieferungRevAggregateModel.base"
import { LieferungRevModel } from "./LieferungRevModel"
import { LieferungRevModelSelector } from "./LieferungRevModel.base"
import { PersonAggregateModel } from "./PersonAggregateModel"
import { PersonAggregateModelSelector } from "./PersonAggregateModel.base"
import { PersonFileAggregateModel } from "./PersonFileAggregateModel"
import { PersonFileAggregateModelSelector } from "./PersonFileAggregateModel.base"
import { PersonFileModel } from "./PersonFileModel"
import { PersonFileModelSelector } from "./PersonFileModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"
import { PersonOptionAggregateModel } from "./PersonOptionAggregateModel"
import { PersonOptionAggregateModelSelector } from "./PersonOptionAggregateModel.base"
import { PersonOptionModel } from "./PersonOptionModel"
import { PersonOptionModelSelector } from "./PersonOptionModel.base"
import { PersonOptionRevAggregateModel } from "./PersonOptionRevAggregateModel"
import { PersonOptionRevAggregateModelSelector } from "./PersonOptionRevAggregateModel.base"
import { PersonOptionRevModel } from "./PersonOptionRevModel"
import { PersonOptionRevModelSelector } from "./PersonOptionRevModel.base"
import { PersonRevAggregateModel } from "./PersonRevAggregateModel"
import { PersonRevAggregateModelSelector } from "./PersonRevAggregateModel.base"
import { PersonRevModel } from "./PersonRevModel"
import { PersonRevModelSelector } from "./PersonRevModel.base"
import { SammelLieferungAggregateModel } from "./SammelLieferungAggregateModel"
import { SammelLieferungAggregateModelSelector } from "./SammelLieferungAggregateModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"
import { SammelLieferungRevAggregateModel } from "./SammelLieferungRevAggregateModel"
import { SammelLieferungRevAggregateModelSelector } from "./SammelLieferungRevAggregateModel.base"
import { SammelLieferungRevModel } from "./SammelLieferungRevModel"
import { SammelLieferungRevModelSelector } from "./SammelLieferungRevModel.base"
import { SammlungAggregateModel } from "./SammlungAggregateModel"
import { SammlungAggregateModelSelector } from "./SammlungAggregateModel.base"
import { SammlungFileAggregateModel } from "./SammlungFileAggregateModel"
import { SammlungFileAggregateModelSelector } from "./SammlungFileAggregateModel.base"
import { SammlungFileModel } from "./SammlungFileModel"
import { SammlungFileModelSelector } from "./SammlungFileModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"
import { SammlungRevAggregateModel } from "./SammlungRevAggregateModel"
import { SammlungRevAggregateModelSelector } from "./SammlungRevAggregateModel.base"
import { SammlungRevModel } from "./SammlungRevModel"
import { SammlungRevModelSelector } from "./SammlungRevModel.base"
import { SpatialRefSysAggregateModel } from "./SpatialRefSysAggregateModel"
import { SpatialRefSysAggregateModelSelector } from "./SpatialRefSysAggregateModel.base"
import { SpatialRefSysModel } from "./SpatialRefSysModel"
import { SpatialRefSysModelSelector } from "./SpatialRefSysModel.base"
import { TeilkulturAggregateModel } from "./TeilkulturAggregateModel"
import { TeilkulturAggregateModelSelector } from "./TeilkulturAggregateModel.base"
import { TeilkulturModel } from "./TeilkulturModel"
import { TeilkulturModelSelector } from "./TeilkulturModel.base"
import { TeilkulturRevAggregateModel } from "./TeilkulturRevAggregateModel"
import { TeilkulturRevAggregateModelSelector } from "./TeilkulturRevAggregateModel.base"
import { TeilkulturRevModel } from "./TeilkulturRevModel"
import { TeilkulturRevModelSelector } from "./TeilkulturRevModel.base"
import { TeilzaehlungAggregateModel } from "./TeilzaehlungAggregateModel"
import { TeilzaehlungAggregateModelSelector } from "./TeilzaehlungAggregateModel.base"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"
import { TeilzaehlungRevAggregateModel } from "./TeilzaehlungRevAggregateModel"
import { TeilzaehlungRevAggregateModelSelector } from "./TeilzaehlungRevAggregateModel.base"
import { TeilzaehlungRevModel } from "./TeilzaehlungRevModel"
import { TeilzaehlungRevModelSelector } from "./TeilzaehlungRevModel.base"
import { UserRoleAggregateModel } from "./UserRoleAggregateModel"
import { UserRoleAggregateModelSelector } from "./UserRoleAggregateModel.base"
import { UserRoleModel } from "./UserRoleModel"
import { UserRoleModelSelector } from "./UserRoleModel.base"
import { ZaehlungAggregateModel } from "./ZaehlungAggregateModel"
import { ZaehlungAggregateModelSelector } from "./ZaehlungAggregateModel.base"
import { ZaehlungModel } from "./ZaehlungModel"
import { ZaehlungModelSelector } from "./ZaehlungModel.base"
import { ZaehlungRevAggregateModel } from "./ZaehlungRevAggregateModel"
import { ZaehlungRevAggregateModelSelector } from "./ZaehlungRevAggregateModel.base"
import { ZaehlungRevModel } from "./ZaehlungRevModel"
import { ZaehlungRevModelSelector } from "./ZaehlungRevModel.base"


/**
 * SubscriptionRootBase
 * auto generated base class for the model SubscriptionRootModel.
 *
 * subscription root
 */
export const SubscriptionRootModelBase = ModelBase
  .named('SubscriptionRoot')
  .props({
    __typename: types.optional(types.literal("subscription_root"), "subscription_root"),
    /** fetch data from the table: "ae_art" */
    ae_art: types.union(types.undefined, types.array(types.late(() => AeArtModel))),
    /** fetch aggregated fields from the table: "ae_art" */
    ae_art_aggregate: types.union(types.undefined, types.late(() => AeArtAggregateModel)),
    /** fetch data from the table: "art" */
    art: types.union(types.undefined, types.array(types.late(() => ArtModel))),
    /** fetch aggregated fields from the table: "art" */
    art_aggregate: types.union(types.undefined, types.late(() => ArtAggregateModel)),
    /** fetch data from the table: "art" using primary key columns */
    art_by_pk: types.union(types.undefined, types.null, types.late(() => ArtModel)),
    /** fetch data from the table: "art_file" */
    art_file: types.union(types.undefined, types.array(types.late(() => ArtFileModel))),
    /** fetch aggregated fields from the table: "art_file" */
    art_file_aggregate: types.union(types.undefined, types.late(() => ArtFileAggregateModel)),
    /** fetch data from the table: "art_file" using primary key columns */
    art_file_by_pk: types.union(types.undefined, types.null, types.late(() => ArtFileModel)),
    /** fetch data from the table: "art_qk" */
    art_qk: types.union(types.undefined, types.array(types.late(() => ArtQkModel))),
    /** fetch aggregated fields from the table: "art_qk" */
    art_qk_aggregate: types.union(types.undefined, types.late(() => ArtQkAggregateModel)),
    /** fetch data from the table: "art_qk" using primary key columns */
    art_qk_by_pk: types.union(types.undefined, types.null, types.late(() => ArtQkModel)),
    /** fetch data from the table: "art_qk_choosen" */
    art_qk_choosen: types.union(types.undefined, types.array(types.late(() => ArtQkChoosenModel))),
    /** fetch aggregated fields from the table: "art_qk_choosen" */
    art_qk_choosen_aggregate: types.union(types.undefined, types.late(() => ArtQkChoosenAggregateModel)),
    /** fetch data from the table: "art_rev" */
    art_rev: types.union(types.undefined, types.array(types.late(() => ArtRevModel))),
    /** fetch aggregated fields from the table: "art_rev" */
    art_rev_aggregate: types.union(types.undefined, types.late(() => ArtRevAggregateModel)),
    /** fetch data from the table: "art_rev" using primary key columns */
    art_rev_by_pk: types.union(types.undefined, types.null, types.late(() => ArtRevModel)),
    /** execute function "art_search" which returns "art" */
    art_search: types.union(types.undefined, types.array(types.late(() => ArtModel))),
    /** execute function "art_search" and query aggregates on result of table type "art" */
    art_search_aggregate: types.union(types.undefined, types.late(() => ArtAggregateModel)),
    /** fetch data from the table: "art_sums" */
    art_sums: types.union(types.undefined, types.array(types.late(() => ArtSumsModel))),
    /** fetch aggregated fields from the table: "art_sums" */
    art_sums_aggregate: types.union(types.undefined, types.late(() => ArtSumsAggregateModel)),
    /** fetch data from the table: "av_art" */
    av_art: types.union(types.undefined, types.array(types.late(() => AvArtModel))),
    /** fetch aggregated fields from the table: "av_art" */
    av_art_aggregate: types.union(types.undefined, types.late(() => AvArtAggregateModel)),
    /** fetch data from the table: "av_art" using primary key columns */
    av_art_by_pk: types.union(types.undefined, types.null, types.late(() => AvArtModel)),
    /** fetch data from the table: "event" */
    event: types.union(types.undefined, types.array(types.late(() => EventModel))),
    /** fetch aggregated fields from the table: "event" */
    event_aggregate: types.union(types.undefined, types.late(() => EventAggregateModel)),
    /** fetch data from the table: "event" using primary key columns */
    event_by_pk: types.union(types.undefined, types.null, types.late(() => EventModel)),
    /** fetch data from the table: "event_rev" */
    event_rev: types.union(types.undefined, types.array(types.late(() => EventRevModel))),
    /** fetch aggregated fields from the table: "event_rev" */
    event_rev_aggregate: types.union(types.undefined, types.late(() => EventRevAggregateModel)),
    /** fetch data from the table: "event_rev" using primary key columns */
    event_rev_by_pk: types.union(types.undefined, types.null, types.late(() => EventRevModel)),
    /** execute function "event_search" which returns "event" */
    event_search: types.union(types.undefined, types.array(types.late(() => EventModel))),
    /** execute function "event_search" and query aggregates on result of table type "event" */
    event_search_aggregate: types.union(types.undefined, types.late(() => EventAggregateModel)),
    /** fetch data from the table: "garten" */
    garten: types.union(types.undefined, types.array(types.late(() => GartenModel))),
    /** fetch aggregated fields from the table: "garten" */
    garten_aggregate: types.union(types.undefined, types.late(() => GartenAggregateModel)),
    /** fetch data from the table: "garten" using primary key columns */
    garten_by_pk: types.union(types.undefined, types.null, types.late(() => GartenModel)),
    /** fetch data from the table: "garten_file" */
    garten_file: types.union(types.undefined, types.array(types.late(() => GartenFileModel))),
    /** fetch aggregated fields from the table: "garten_file" */
    garten_file_aggregate: types.union(types.undefined, types.late(() => GartenFileAggregateModel)),
    /** fetch data from the table: "garten_file" using primary key columns */
    garten_file_by_pk: types.union(types.undefined, types.null, types.late(() => GartenFileModel)),
    /** fetch data from the table: "garten_rev" */
    garten_rev: types.union(types.undefined, types.array(types.late(() => GartenRevModel))),
    /** fetch aggregated fields from the table: "garten_rev" */
    garten_rev_aggregate: types.union(types.undefined, types.late(() => GartenRevAggregateModel)),
    /** fetch data from the table: "garten_rev" using primary key columns */
    garten_rev_by_pk: types.union(types.undefined, types.null, types.late(() => GartenRevModel)),
    /** execute function "garten_search" which returns "garten" */
    garten_search: types.union(types.undefined, types.array(types.late(() => GartenModel))),
    /** execute function "garten_search" and query aggregates on result of table type "garten" */
    garten_search_aggregate: types.union(types.undefined, types.late(() => GartenAggregateModel)),
    /** fetch data from the table: "garten_teilzaehlung_sums" */
    garten_teilzaehlung_sums: types.union(types.undefined, types.array(types.late(() => GartenTeilzaehlungSumsModel))),
    /** fetch aggregated fields from the table: "garten_teilzaehlung_sums" */
    garten_teilzaehlung_sums_aggregate: types.union(types.undefined, types.late(() => GartenTeilzaehlungSumsAggregateModel)),
    /** fetch data from the table: "herkunft" */
    herkunft: types.union(types.undefined, types.array(types.late(() => HerkunftModel))),
    /** fetch aggregated fields from the table: "herkunft" */
    herkunft_aggregate: types.union(types.undefined, types.late(() => HerkunftAggregateModel)),
    /** fetch data from the table: "herkunft" using primary key columns */
    herkunft_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftModel)),
    /** fetch data from the table: "herkunft_file" */
    herkunft_file: types.union(types.undefined, types.array(types.late(() => HerkunftFileModel))),
    /** fetch aggregated fields from the table: "herkunft_file" */
    herkunft_file_aggregate: types.union(types.undefined, types.late(() => HerkunftFileAggregateModel)),
    /** fetch data from the table: "herkunft_file" using primary key columns */
    herkunft_file_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftFileModel)),
    /** fetch data from the table: "herkunft_rev" */
    herkunft_rev: types.union(types.undefined, types.array(types.late(() => HerkunftRevModel))),
    /** fetch aggregated fields from the table: "herkunft_rev" */
    herkunft_rev_aggregate: types.union(types.undefined, types.late(() => HerkunftRevAggregateModel)),
    /** fetch data from the table: "herkunft_rev" using primary key columns */
    herkunft_rev_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftRevModel)),
    /** execute function "herkunft_search" which returns "herkunft" */
    herkunft_search: types.union(types.undefined, types.array(types.late(() => HerkunftModel))),
    /** execute function "herkunft_search" and query aggregates on result of table type "herkunft" */
    herkunft_search_aggregate: types.union(types.undefined, types.late(() => HerkunftAggregateModel)),
    /** fetch data from the table: "herkunft_sums" */
    herkunft_sums: types.union(types.undefined, types.array(types.late(() => HerkunftSumsModel))),
    /** fetch aggregated fields from the table: "herkunft_sums" */
    herkunft_sums_aggregate: types.union(types.undefined, types.late(() => HerkunftSumsAggregateModel)),
    /** fetch data from the table: "kultur" */
    kultur: types.union(types.undefined, types.array(types.late(() => KulturModel))),
    /** fetch aggregated fields from the table: "kultur" */
    kultur_aggregate: types.union(types.undefined, types.late(() => KulturAggregateModel)),
    /** fetch data from the table: "kultur" using primary key columns */
    kultur_by_pk: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** fetch data from the table: "kultur_file" */
    kultur_file: types.union(types.undefined, types.array(types.late(() => KulturFileModel))),
    /** fetch aggregated fields from the table: "kultur_file" */
    kultur_file_aggregate: types.union(types.undefined, types.late(() => KulturFileAggregateModel)),
    /** fetch data from the table: "kultur_file" using primary key columns */
    kultur_file_by_pk: types.union(types.undefined, types.null, types.late(() => KulturFileModel)),
    /** fetch data from the table: "kultur_option" */
    kultur_option: types.union(types.undefined, types.array(types.late(() => KulturOptionModel))),
    /** fetch aggregated fields from the table: "kultur_option" */
    kultur_option_aggregate: types.union(types.undefined, types.late(() => KulturOptionAggregateModel)),
    /** fetch data from the table: "kultur_option_rev" */
    kultur_option_rev: types.union(types.undefined, types.array(types.late(() => KulturOptionRevModel))),
    /** fetch aggregated fields from the table: "kultur_option_rev" */
    kultur_option_rev_aggregate: types.union(types.undefined, types.late(() => KulturOptionRevAggregateModel)),
    /** fetch data from the table: "kultur_option_rev" using primary key columns */
    kultur_option_rev_by_pk: types.union(types.undefined, types.null, types.late(() => KulturOptionRevModel)),
    /** fetch data from the table: "kultur_qk" */
    kultur_qk: types.union(types.undefined, types.array(types.late(() => KulturQkModel))),
    /** fetch aggregated fields from the table: "kultur_qk" */
    kultur_qk_aggregate: types.union(types.undefined, types.late(() => KulturQkAggregateModel)),
    /** fetch data from the table: "kultur_qk" using primary key columns */
    kultur_qk_by_pk: types.union(types.undefined, types.null, types.late(() => KulturQkModel)),
    /** fetch data from the table: "kultur_qk_choosen" */
    kultur_qk_choosen: types.union(types.undefined, types.array(types.late(() => KulturQkChoosenModel))),
    /** fetch aggregated fields from the table: "kultur_qk_choosen" */
    kultur_qk_choosen_aggregate: types.union(types.undefined, types.late(() => KulturQkChoosenAggregateModel)),
    /** fetch data from the table: "kultur_rev" */
    kultur_rev: types.union(types.undefined, types.array(types.late(() => KulturRevModel))),
    /** fetch aggregated fields from the table: "kultur_rev" */
    kultur_rev_aggregate: types.union(types.undefined, types.late(() => KulturRevAggregateModel)),
    /** fetch data from the table: "kultur_rev" using primary key columns */
    kultur_rev_by_pk: types.union(types.undefined, types.null, types.late(() => KulturRevModel)),
    /** execute function "kultur_search" which returns "kultur" */
    kultur_search: types.union(types.undefined, types.array(types.late(() => KulturModel))),
    /** execute function "kultur_search" and query aggregates on result of table type "kultur" */
    kultur_search_aggregate: types.union(types.undefined, types.late(() => KulturAggregateModel)),
    /** fetch data from the table: "lieferung" */
    lieferung: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
    /** fetch aggregated fields from the table: "lieferung" */
    lieferung_aggregate: types.union(types.undefined, types.late(() => LieferungAggregateModel)),
    /** fetch data from the table: "lieferung" using primary key columns */
    lieferung_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungModel)),
    /** fetch data from the table: "lieferung_file" */
    lieferung_file: types.union(types.undefined, types.array(types.late(() => LieferungFileModel))),
    /** fetch aggregated fields from the table: "lieferung_file" */
    lieferung_file_aggregate: types.union(types.undefined, types.late(() => LieferungFileAggregateModel)),
    /** fetch data from the table: "lieferung_file" using primary key columns */
    lieferung_file_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungFileModel)),
    /** fetch data from the table: "lieferung_rev" */
    lieferung_rev: types.union(types.undefined, types.array(types.late(() => LieferungRevModel))),
    /** fetch aggregated fields from the table: "lieferung_rev" */
    lieferung_rev_aggregate: types.union(types.undefined, types.late(() => LieferungRevAggregateModel)),
    /** fetch data from the table: "lieferung_rev" using primary key columns */
    lieferung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungRevModel)),
    /** execute function "lieferung_search" which returns "lieferung" */
    lieferung_search: types.union(types.undefined, types.array(types.late(() => LieferungModel))),
    /** execute function "lieferung_search" and query aggregates on result of table type "lieferung" */
    lieferung_search_aggregate: types.union(types.undefined, types.late(() => LieferungAggregateModel)),
    /** fetch data from the table: "person" */
    person: types.union(types.undefined, types.array(types.late(() => PersonModel))),
    /** fetch aggregated fields from the table: "person" */
    person_aggregate: types.union(types.undefined, types.late(() => PersonAggregateModel)),
    /** fetch data from the table: "person" using primary key columns */
    person_by_pk: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    /** fetch data from the table: "person_file" */
    person_file: types.union(types.undefined, types.array(types.late(() => PersonFileModel))),
    /** fetch aggregated fields from the table: "person_file" */
    person_file_aggregate: types.union(types.undefined, types.late(() => PersonFileAggregateModel)),
    /** fetch data from the table: "person_file" using primary key columns */
    person_file_by_pk: types.union(types.undefined, types.null, types.late(() => PersonFileModel)),
    /** fetch data from the table: "person_option" */
    person_option: types.union(types.undefined, types.array(types.late(() => PersonOptionModel))),
    /** fetch aggregated fields from the table: "person_option" */
    person_option_aggregate: types.union(types.undefined, types.late(() => PersonOptionAggregateModel)),
    /** fetch data from the table: "person_option_rev" */
    person_option_rev: types.union(types.undefined, types.array(types.late(() => PersonOptionRevModel))),
    /** fetch aggregated fields from the table: "person_option_rev" */
    person_option_rev_aggregate: types.union(types.undefined, types.late(() => PersonOptionRevAggregateModel)),
    /** fetch data from the table: "person_option_rev" using primary key columns */
    person_option_rev_by_pk: types.union(types.undefined, types.null, types.late(() => PersonOptionRevModel)),
    /** fetch data from the table: "person_rev" */
    person_rev: types.union(types.undefined, types.array(types.late(() => PersonRevModel))),
    /** fetch aggregated fields from the table: "person_rev" */
    person_rev_aggregate: types.union(types.undefined, types.late(() => PersonRevAggregateModel)),
    /** fetch data from the table: "person_rev" using primary key columns */
    person_rev_by_pk: types.union(types.undefined, types.null, types.late(() => PersonRevModel)),
    /** execute function "person_search" which returns "person" */
    person_search: types.union(types.undefined, types.array(types.late(() => PersonModel))),
    /** execute function "person_search" and query aggregates on result of table type "person" */
    person_search_aggregate: types.union(types.undefined, types.late(() => PersonAggregateModel)),
    /** fetch data from the table: "sammel_lieferung" */
    sammel_lieferung: types.union(types.undefined, types.array(types.late(() => SammelLieferungModel))),
    /** fetch aggregated fields from the table: "sammel_lieferung" */
    sammel_lieferung_aggregate: types.union(types.undefined, types.late(() => SammelLieferungAggregateModel)),
    /** fetch data from the table: "sammel_lieferung" using primary key columns */
    sammel_lieferung_by_pk: types.union(types.undefined, types.null, types.late(() => SammelLieferungModel)),
    /** fetch data from the table: "sammel_lieferung_rev" */
    sammel_lieferung_rev: types.union(types.undefined, types.array(types.late(() => SammelLieferungRevModel))),
    /** fetch aggregated fields from the table: "sammel_lieferung_rev" */
    sammel_lieferung_rev_aggregate: types.union(types.undefined, types.late(() => SammelLieferungRevAggregateModel)),
    /** fetch data from the table: "sammel_lieferung_rev" using primary key columns */
    sammel_lieferung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevModel)),
    /** fetch data from the table: "sammlung" */
    sammlung: types.union(types.undefined, types.array(types.late(() => SammlungModel))),
    /** fetch aggregated fields from the table: "sammlung" */
    sammlung_aggregate: types.union(types.undefined, types.late(() => SammlungAggregateModel)),
    /** fetch data from the table: "sammlung" using primary key columns */
    sammlung_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungModel)),
    /** fetch data from the table: "sammlung_file" */
    sammlung_file: types.union(types.undefined, types.array(types.late(() => SammlungFileModel))),
    /** fetch aggregated fields from the table: "sammlung_file" */
    sammlung_file_aggregate: types.union(types.undefined, types.late(() => SammlungFileAggregateModel)),
    /** fetch data from the table: "sammlung_file" using primary key columns */
    sammlung_file_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungFileModel)),
    /** fetch data from the table: "sammlung_rev" */
    sammlung_rev: types.union(types.undefined, types.array(types.late(() => SammlungRevModel))),
    /** fetch aggregated fields from the table: "sammlung_rev" */
    sammlung_rev_aggregate: types.union(types.undefined, types.late(() => SammlungRevAggregateModel)),
    /** fetch data from the table: "sammlung_rev" using primary key columns */
    sammlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungRevModel)),
    /** execute function "sammlung_search" which returns "sammlung" */
    sammlung_search: types.union(types.undefined, types.array(types.late(() => SammlungModel))),
    /** execute function "sammlung_search" and query aggregates on result of table type "sammlung" */
    sammlung_search_aggregate: types.union(types.undefined, types.late(() => SammlungAggregateModel)),
    /** fetch data from the table: "spatial_ref_sys" */
    spatial_ref_sys: types.union(types.undefined, types.array(types.late(() => SpatialRefSysModel))),
    /** fetch aggregated fields from the table: "spatial_ref_sys" */
    spatial_ref_sys_aggregate: types.union(types.undefined, types.late(() => SpatialRefSysAggregateModel)),
    /** fetch data from the table: "spatial_ref_sys" using primary key columns */
    spatial_ref_sys_by_pk: types.union(types.undefined, types.null, types.late(() => SpatialRefSysModel)),
    /** fetch data from the table: "teilkultur" */
    teilkultur: types.union(types.undefined, types.array(types.late(() => TeilkulturModel))),
    /** fetch aggregated fields from the table: "teilkultur" */
    teilkultur_aggregate: types.union(types.undefined, types.late(() => TeilkulturAggregateModel)),
    /** fetch data from the table: "teilkultur" using primary key columns */
    teilkultur_by_pk: types.union(types.undefined, types.null, types.late(() => TeilkulturModel)),
    /** fetch data from the table: "teilkultur_rev" */
    teilkultur_rev: types.union(types.undefined, types.array(types.late(() => TeilkulturRevModel))),
    /** fetch aggregated fields from the table: "teilkultur_rev" */
    teilkultur_rev_aggregate: types.union(types.undefined, types.late(() => TeilkulturRevAggregateModel)),
    /** fetch data from the table: "teilkultur_rev" using primary key columns */
    teilkultur_rev_by_pk: types.union(types.undefined, types.null, types.late(() => TeilkulturRevModel)),
    /** execute function "teilkultur_search" which returns "teilkultur" */
    teilkultur_search: types.union(types.undefined, types.array(types.late(() => TeilkulturModel))),
    /** execute function "teilkultur_search" and query aggregates on result of table type "teilkultur" */
    teilkultur_search_aggregate: types.union(types.undefined, types.late(() => TeilkulturAggregateModel)),
    /** fetch data from the table: "teilzaehlung" */
    teilzaehlung: types.union(types.undefined, types.array(types.late(() => TeilzaehlungModel))),
    /** fetch aggregated fields from the table: "teilzaehlung" */
    teilzaehlung_aggregate: types.union(types.undefined, types.late(() => TeilzaehlungAggregateModel)),
    /** fetch data from the table: "teilzaehlung" using primary key columns */
    teilzaehlung_by_pk: types.union(types.undefined, types.null, types.late(() => TeilzaehlungModel)),
    /** fetch data from the table: "teilzaehlung_rev" */
    teilzaehlung_rev: types.union(types.undefined, types.array(types.late(() => TeilzaehlungRevModel))),
    /** fetch aggregated fields from the table: "teilzaehlung_rev" */
    teilzaehlung_rev_aggregate: types.union(types.undefined, types.late(() => TeilzaehlungRevAggregateModel)),
    /** fetch data from the table: "teilzaehlung_rev" using primary key columns */
    teilzaehlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevModel)),
    /** fetch data from the table: "user_role" */
    user_role: types.union(types.undefined, types.array(types.late(() => UserRoleModel))),
    /** fetch aggregated fields from the table: "user_role" */
    user_role_aggregate: types.union(types.undefined, types.late(() => UserRoleAggregateModel)),
    /** fetch data from the table: "user_role" using primary key columns */
    user_role_by_pk: types.union(types.undefined, types.null, types.late(() => UserRoleModel)),
    /** fetch data from the table: "zaehlung" */
    zaehlung: types.union(types.undefined, types.array(types.late(() => ZaehlungModel))),
    /** fetch aggregated fields from the table: "zaehlung" */
    zaehlung_aggregate: types.union(types.undefined, types.late(() => ZaehlungAggregateModel)),
    /** fetch data from the table: "zaehlung" using primary key columns */
    zaehlung_by_pk: types.union(types.undefined, types.null, types.late(() => ZaehlungModel)),
    /** fetch data from the table: "zaehlung_rev" */
    zaehlung_rev: types.union(types.undefined, types.array(types.late(() => ZaehlungRevModel))),
    /** fetch aggregated fields from the table: "zaehlung_rev" */
    zaehlung_rev_aggregate: types.union(types.undefined, types.late(() => ZaehlungRevAggregateModel)),
    /** fetch data from the table: "zaehlung_rev" using primary key columns */
    zaehlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => ZaehlungRevModel)),
    /** execute function "zaehlung_search" which returns "zaehlung" */
    zaehlung_search: types.union(types.undefined, types.array(types.late(() => ZaehlungModel))),
    /** execute function "zaehlung_search" and query aggregates on result of table type "zaehlung" */
    zaehlung_search_aggregate: types.union(types.undefined, types.late(() => ZaehlungAggregateModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SubscriptionRootModelSelector extends QueryBuilder {
  ae_art(builder) { return this.__child(`ae_art`, AeArtModelSelector, builder) }
  ae_art_aggregate(builder) { return this.__child(`ae_art_aggregate`, AeArtAggregateModelSelector, builder) }
  art(builder) { return this.__child(`art`, ArtModelSelector, builder) }
  art_aggregate(builder) { return this.__child(`art_aggregate`, ArtAggregateModelSelector, builder) }
  art_by_pk(builder) { return this.__child(`art_by_pk`, ArtModelSelector, builder) }
  art_file(builder) { return this.__child(`art_file`, ArtFileModelSelector, builder) }
  art_file_aggregate(builder) { return this.__child(`art_file_aggregate`, ArtFileAggregateModelSelector, builder) }
  art_file_by_pk(builder) { return this.__child(`art_file_by_pk`, ArtFileModelSelector, builder) }
  art_qk(builder) { return this.__child(`art_qk`, ArtQkModelSelector, builder) }
  art_qk_aggregate(builder) { return this.__child(`art_qk_aggregate`, ArtQkAggregateModelSelector, builder) }
  art_qk_by_pk(builder) { return this.__child(`art_qk_by_pk`, ArtQkModelSelector, builder) }
  art_qk_choosen(builder) { return this.__child(`art_qk_choosen`, ArtQkChoosenModelSelector, builder) }
  art_qk_choosen_aggregate(builder) { return this.__child(`art_qk_choosen_aggregate`, ArtQkChoosenAggregateModelSelector, builder) }
  art_rev(builder) { return this.__child(`art_rev`, ArtRevModelSelector, builder) }
  art_rev_aggregate(builder) { return this.__child(`art_rev_aggregate`, ArtRevAggregateModelSelector, builder) }
  art_rev_by_pk(builder) { return this.__child(`art_rev_by_pk`, ArtRevModelSelector, builder) }
  art_search(builder) { return this.__child(`art_search`, ArtModelSelector, builder) }
  art_search_aggregate(builder) { return this.__child(`art_search_aggregate`, ArtAggregateModelSelector, builder) }
  art_sums(builder) { return this.__child(`art_sums`, ArtSumsModelSelector, builder) }
  art_sums_aggregate(builder) { return this.__child(`art_sums_aggregate`, ArtSumsAggregateModelSelector, builder) }
  av_art(builder) { return this.__child(`av_art`, AvArtModelSelector, builder) }
  av_art_aggregate(builder) { return this.__child(`av_art_aggregate`, AvArtAggregateModelSelector, builder) }
  av_art_by_pk(builder) { return this.__child(`av_art_by_pk`, AvArtModelSelector, builder) }
  event(builder) { return this.__child(`event`, EventModelSelector, builder) }
  event_aggregate(builder) { return this.__child(`event_aggregate`, EventAggregateModelSelector, builder) }
  event_by_pk(builder) { return this.__child(`event_by_pk`, EventModelSelector, builder) }
  event_rev(builder) { return this.__child(`event_rev`, EventRevModelSelector, builder) }
  event_rev_aggregate(builder) { return this.__child(`event_rev_aggregate`, EventRevAggregateModelSelector, builder) }
  event_rev_by_pk(builder) { return this.__child(`event_rev_by_pk`, EventRevModelSelector, builder) }
  event_search(builder) { return this.__child(`event_search`, EventModelSelector, builder) }
  event_search_aggregate(builder) { return this.__child(`event_search_aggregate`, EventAggregateModelSelector, builder) }
  garten(builder) { return this.__child(`garten`, GartenModelSelector, builder) }
  garten_aggregate(builder) { return this.__child(`garten_aggregate`, GartenAggregateModelSelector, builder) }
  garten_by_pk(builder) { return this.__child(`garten_by_pk`, GartenModelSelector, builder) }
  garten_file(builder) { return this.__child(`garten_file`, GartenFileModelSelector, builder) }
  garten_file_aggregate(builder) { return this.__child(`garten_file_aggregate`, GartenFileAggregateModelSelector, builder) }
  garten_file_by_pk(builder) { return this.__child(`garten_file_by_pk`, GartenFileModelSelector, builder) }
  garten_rev(builder) { return this.__child(`garten_rev`, GartenRevModelSelector, builder) }
  garten_rev_aggregate(builder) { return this.__child(`garten_rev_aggregate`, GartenRevAggregateModelSelector, builder) }
  garten_rev_by_pk(builder) { return this.__child(`garten_rev_by_pk`, GartenRevModelSelector, builder) }
  garten_search(builder) { return this.__child(`garten_search`, GartenModelSelector, builder) }
  garten_search_aggregate(builder) { return this.__child(`garten_search_aggregate`, GartenAggregateModelSelector, builder) }
  garten_teilzaehlung_sums(builder) { return this.__child(`garten_teilzaehlung_sums`, GartenTeilzaehlungSumsModelSelector, builder) }
  garten_teilzaehlung_sums_aggregate(builder) { return this.__child(`garten_teilzaehlung_sums_aggregate`, GartenTeilzaehlungSumsAggregateModelSelector, builder) }
  herkunft(builder) { return this.__child(`herkunft`, HerkunftModelSelector, builder) }
  herkunft_aggregate(builder) { return this.__child(`herkunft_aggregate`, HerkunftAggregateModelSelector, builder) }
  herkunft_by_pk(builder) { return this.__child(`herkunft_by_pk`, HerkunftModelSelector, builder) }
  herkunft_file(builder) { return this.__child(`herkunft_file`, HerkunftFileModelSelector, builder) }
  herkunft_file_aggregate(builder) { return this.__child(`herkunft_file_aggregate`, HerkunftFileAggregateModelSelector, builder) }
  herkunft_file_by_pk(builder) { return this.__child(`herkunft_file_by_pk`, HerkunftFileModelSelector, builder) }
  herkunft_rev(builder) { return this.__child(`herkunft_rev`, HerkunftRevModelSelector, builder) }
  herkunft_rev_aggregate(builder) { return this.__child(`herkunft_rev_aggregate`, HerkunftRevAggregateModelSelector, builder) }
  herkunft_rev_by_pk(builder) { return this.__child(`herkunft_rev_by_pk`, HerkunftRevModelSelector, builder) }
  herkunft_search(builder) { return this.__child(`herkunft_search`, HerkunftModelSelector, builder) }
  herkunft_search_aggregate(builder) { return this.__child(`herkunft_search_aggregate`, HerkunftAggregateModelSelector, builder) }
  herkunft_sums(builder) { return this.__child(`herkunft_sums`, HerkunftSumsModelSelector, builder) }
  herkunft_sums_aggregate(builder) { return this.__child(`herkunft_sums_aggregate`, HerkunftSumsAggregateModelSelector, builder) }
  kultur(builder) { return this.__child(`kultur`, KulturModelSelector, builder) }
  kultur_aggregate(builder) { return this.__child(`kultur_aggregate`, KulturAggregateModelSelector, builder) }
  kultur_by_pk(builder) { return this.__child(`kultur_by_pk`, KulturModelSelector, builder) }
  kultur_file(builder) { return this.__child(`kultur_file`, KulturFileModelSelector, builder) }
  kultur_file_aggregate(builder) { return this.__child(`kultur_file_aggregate`, KulturFileAggregateModelSelector, builder) }
  kultur_file_by_pk(builder) { return this.__child(`kultur_file_by_pk`, KulturFileModelSelector, builder) }
  kultur_option(builder) { return this.__child(`kultur_option`, KulturOptionModelSelector, builder) }
  kultur_option_aggregate(builder) { return this.__child(`kultur_option_aggregate`, KulturOptionAggregateModelSelector, builder) }
  kultur_option_rev(builder) { return this.__child(`kultur_option_rev`, KulturOptionRevModelSelector, builder) }
  kultur_option_rev_aggregate(builder) { return this.__child(`kultur_option_rev_aggregate`, KulturOptionRevAggregateModelSelector, builder) }
  kultur_option_rev_by_pk(builder) { return this.__child(`kultur_option_rev_by_pk`, KulturOptionRevModelSelector, builder) }
  kultur_qk(builder) { return this.__child(`kultur_qk`, KulturQkModelSelector, builder) }
  kultur_qk_aggregate(builder) { return this.__child(`kultur_qk_aggregate`, KulturQkAggregateModelSelector, builder) }
  kultur_qk_by_pk(builder) { return this.__child(`kultur_qk_by_pk`, KulturQkModelSelector, builder) }
  kultur_qk_choosen(builder) { return this.__child(`kultur_qk_choosen`, KulturQkChoosenModelSelector, builder) }
  kultur_qk_choosen_aggregate(builder) { return this.__child(`kultur_qk_choosen_aggregate`, KulturQkChoosenAggregateModelSelector, builder) }
  kultur_rev(builder) { return this.__child(`kultur_rev`, KulturRevModelSelector, builder) }
  kultur_rev_aggregate(builder) { return this.__child(`kultur_rev_aggregate`, KulturRevAggregateModelSelector, builder) }
  kultur_rev_by_pk(builder) { return this.__child(`kultur_rev_by_pk`, KulturRevModelSelector, builder) }
  kultur_search(builder) { return this.__child(`kultur_search`, KulturModelSelector, builder) }
  kultur_search_aggregate(builder) { return this.__child(`kultur_search_aggregate`, KulturAggregateModelSelector, builder) }
  lieferung(builder) { return this.__child(`lieferung`, LieferungModelSelector, builder) }
  lieferung_aggregate(builder) { return this.__child(`lieferung_aggregate`, LieferungAggregateModelSelector, builder) }
  lieferung_by_pk(builder) { return this.__child(`lieferung_by_pk`, LieferungModelSelector, builder) }
  lieferung_file(builder) { return this.__child(`lieferung_file`, LieferungFileModelSelector, builder) }
  lieferung_file_aggregate(builder) { return this.__child(`lieferung_file_aggregate`, LieferungFileAggregateModelSelector, builder) }
  lieferung_file_by_pk(builder) { return this.__child(`lieferung_file_by_pk`, LieferungFileModelSelector, builder) }
  lieferung_rev(builder) { return this.__child(`lieferung_rev`, LieferungRevModelSelector, builder) }
  lieferung_rev_aggregate(builder) { return this.__child(`lieferung_rev_aggregate`, LieferungRevAggregateModelSelector, builder) }
  lieferung_rev_by_pk(builder) { return this.__child(`lieferung_rev_by_pk`, LieferungRevModelSelector, builder) }
  lieferung_search(builder) { return this.__child(`lieferung_search`, LieferungModelSelector, builder) }
  lieferung_search_aggregate(builder) { return this.__child(`lieferung_search_aggregate`, LieferungAggregateModelSelector, builder) }
  person(builder) { return this.__child(`person`, PersonModelSelector, builder) }
  person_aggregate(builder) { return this.__child(`person_aggregate`, PersonAggregateModelSelector, builder) }
  person_by_pk(builder) { return this.__child(`person_by_pk`, PersonModelSelector, builder) }
  person_file(builder) { return this.__child(`person_file`, PersonFileModelSelector, builder) }
  person_file_aggregate(builder) { return this.__child(`person_file_aggregate`, PersonFileAggregateModelSelector, builder) }
  person_file_by_pk(builder) { return this.__child(`person_file_by_pk`, PersonFileModelSelector, builder) }
  person_option(builder) { return this.__child(`person_option`, PersonOptionModelSelector, builder) }
  person_option_aggregate(builder) { return this.__child(`person_option_aggregate`, PersonOptionAggregateModelSelector, builder) }
  person_option_rev(builder) { return this.__child(`person_option_rev`, PersonOptionRevModelSelector, builder) }
  person_option_rev_aggregate(builder) { return this.__child(`person_option_rev_aggregate`, PersonOptionRevAggregateModelSelector, builder) }
  person_option_rev_by_pk(builder) { return this.__child(`person_option_rev_by_pk`, PersonOptionRevModelSelector, builder) }
  person_rev(builder) { return this.__child(`person_rev`, PersonRevModelSelector, builder) }
  person_rev_aggregate(builder) { return this.__child(`person_rev_aggregate`, PersonRevAggregateModelSelector, builder) }
  person_rev_by_pk(builder) { return this.__child(`person_rev_by_pk`, PersonRevModelSelector, builder) }
  person_search(builder) { return this.__child(`person_search`, PersonModelSelector, builder) }
  person_search_aggregate(builder) { return this.__child(`person_search_aggregate`, PersonAggregateModelSelector, builder) }
  sammel_lieferung(builder) { return this.__child(`sammel_lieferung`, SammelLieferungModelSelector, builder) }
  sammel_lieferung_aggregate(builder) { return this.__child(`sammel_lieferung_aggregate`, SammelLieferungAggregateModelSelector, builder) }
  sammel_lieferung_by_pk(builder) { return this.__child(`sammel_lieferung_by_pk`, SammelLieferungModelSelector, builder) }
  sammel_lieferung_rev(builder) { return this.__child(`sammel_lieferung_rev`, SammelLieferungRevModelSelector, builder) }
  sammel_lieferung_rev_aggregate(builder) { return this.__child(`sammel_lieferung_rev_aggregate`, SammelLieferungRevAggregateModelSelector, builder) }
  sammel_lieferung_rev_by_pk(builder) { return this.__child(`sammel_lieferung_rev_by_pk`, SammelLieferungRevModelSelector, builder) }
  sammlung(builder) { return this.__child(`sammlung`, SammlungModelSelector, builder) }
  sammlung_aggregate(builder) { return this.__child(`sammlung_aggregate`, SammlungAggregateModelSelector, builder) }
  sammlung_by_pk(builder) { return this.__child(`sammlung_by_pk`, SammlungModelSelector, builder) }
  sammlung_file(builder) { return this.__child(`sammlung_file`, SammlungFileModelSelector, builder) }
  sammlung_file_aggregate(builder) { return this.__child(`sammlung_file_aggregate`, SammlungFileAggregateModelSelector, builder) }
  sammlung_file_by_pk(builder) { return this.__child(`sammlung_file_by_pk`, SammlungFileModelSelector, builder) }
  sammlung_rev(builder) { return this.__child(`sammlung_rev`, SammlungRevModelSelector, builder) }
  sammlung_rev_aggregate(builder) { return this.__child(`sammlung_rev_aggregate`, SammlungRevAggregateModelSelector, builder) }
  sammlung_rev_by_pk(builder) { return this.__child(`sammlung_rev_by_pk`, SammlungRevModelSelector, builder) }
  sammlung_search(builder) { return this.__child(`sammlung_search`, SammlungModelSelector, builder) }
  sammlung_search_aggregate(builder) { return this.__child(`sammlung_search_aggregate`, SammlungAggregateModelSelector, builder) }
  spatial_ref_sys(builder) { return this.__child(`spatial_ref_sys`, SpatialRefSysModelSelector, builder) }
  spatial_ref_sys_aggregate(builder) { return this.__child(`spatial_ref_sys_aggregate`, SpatialRefSysAggregateModelSelector, builder) }
  spatial_ref_sys_by_pk(builder) { return this.__child(`spatial_ref_sys_by_pk`, SpatialRefSysModelSelector, builder) }
  teilkultur(builder) { return this.__child(`teilkultur`, TeilkulturModelSelector, builder) }
  teilkultur_aggregate(builder) { return this.__child(`teilkultur_aggregate`, TeilkulturAggregateModelSelector, builder) }
  teilkultur_by_pk(builder) { return this.__child(`teilkultur_by_pk`, TeilkulturModelSelector, builder) }
  teilkultur_rev(builder) { return this.__child(`teilkultur_rev`, TeilkulturRevModelSelector, builder) }
  teilkultur_rev_aggregate(builder) { return this.__child(`teilkultur_rev_aggregate`, TeilkulturRevAggregateModelSelector, builder) }
  teilkultur_rev_by_pk(builder) { return this.__child(`teilkultur_rev_by_pk`, TeilkulturRevModelSelector, builder) }
  teilkultur_search(builder) { return this.__child(`teilkultur_search`, TeilkulturModelSelector, builder) }
  teilkultur_search_aggregate(builder) { return this.__child(`teilkultur_search_aggregate`, TeilkulturAggregateModelSelector, builder) }
  teilzaehlung(builder) { return this.__child(`teilzaehlung`, TeilzaehlungModelSelector, builder) }
  teilzaehlung_aggregate(builder) { return this.__child(`teilzaehlung_aggregate`, TeilzaehlungAggregateModelSelector, builder) }
  teilzaehlung_by_pk(builder) { return this.__child(`teilzaehlung_by_pk`, TeilzaehlungModelSelector, builder) }
  teilzaehlung_rev(builder) { return this.__child(`teilzaehlung_rev`, TeilzaehlungRevModelSelector, builder) }
  teilzaehlung_rev_aggregate(builder) { return this.__child(`teilzaehlung_rev_aggregate`, TeilzaehlungRevAggregateModelSelector, builder) }
  teilzaehlung_rev_by_pk(builder) { return this.__child(`teilzaehlung_rev_by_pk`, TeilzaehlungRevModelSelector, builder) }
  user_role(builder) { return this.__child(`user_role`, UserRoleModelSelector, builder) }
  user_role_aggregate(builder) { return this.__child(`user_role_aggregate`, UserRoleAggregateModelSelector, builder) }
  user_role_by_pk(builder) { return this.__child(`user_role_by_pk`, UserRoleModelSelector, builder) }
  zaehlung(builder) { return this.__child(`zaehlung`, ZaehlungModelSelector, builder) }
  zaehlung_aggregate(builder) { return this.__child(`zaehlung_aggregate`, ZaehlungAggregateModelSelector, builder) }
  zaehlung_by_pk(builder) { return this.__child(`zaehlung_by_pk`, ZaehlungModelSelector, builder) }
  zaehlung_rev(builder) { return this.__child(`zaehlung_rev`, ZaehlungRevModelSelector, builder) }
  zaehlung_rev_aggregate(builder) { return this.__child(`zaehlung_rev_aggregate`, ZaehlungRevAggregateModelSelector, builder) }
  zaehlung_rev_by_pk(builder) { return this.__child(`zaehlung_rev_by_pk`, ZaehlungRevModelSelector, builder) }
  zaehlung_search(builder) { return this.__child(`zaehlung_search`, ZaehlungModelSelector, builder) }
  zaehlung_search_aggregate(builder) { return this.__child(`zaehlung_search_aggregate`, ZaehlungAggregateModelSelector, builder) }
}
export function selectFromSubscriptionRoot() {
  return new SubscriptionRootModelSelector()
}

export const subscriptionRootModelPrimitives = selectFromSubscriptionRoot()
