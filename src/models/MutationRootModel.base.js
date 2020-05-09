/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AeArtModel } from "./AeArtModel"
import { AeArtModelSelector } from "./AeArtModel.base"
import { AeArtMutationResponseModel } from "./AeArtMutationResponseModel"
import { AeArtMutationResponseModelSelector } from "./AeArtMutationResponseModel.base"
import { ArtFileModel } from "./ArtFileModel"
import { ArtFileModelSelector } from "./ArtFileModel.base"
import { ArtFileMutationResponseModel } from "./ArtFileMutationResponseModel"
import { ArtFileMutationResponseModelSelector } from "./ArtFileMutationResponseModel.base"
import { ArtModel } from "./ArtModel"
import { ArtModelSelector } from "./ArtModel.base"
import { ArtMutationResponseModel } from "./ArtMutationResponseModel"
import { ArtMutationResponseModelSelector } from "./ArtMutationResponseModel.base"
import { ArtQkChoosenModel } from "./ArtQkChoosenModel"
import { ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"
import { ArtQkChoosenMutationResponseModel } from "./ArtQkChoosenMutationResponseModel"
import { ArtQkChoosenMutationResponseModelSelector } from "./ArtQkChoosenMutationResponseModel.base"
import { ArtQkModel } from "./ArtQkModel"
import { ArtQkModelSelector } from "./ArtQkModel.base"
import { ArtQkMutationResponseModel } from "./ArtQkMutationResponseModel"
import { ArtQkMutationResponseModelSelector } from "./ArtQkMutationResponseModel.base"
import { ArtRevModel } from "./ArtRevModel"
import { ArtRevModelSelector } from "./ArtRevModel.base"
import { ArtRevMutationResponseModel } from "./ArtRevMutationResponseModel"
import { ArtRevMutationResponseModelSelector } from "./ArtRevMutationResponseModel.base"
import { AvArtModel } from "./AvArtModel"
import { AvArtModelSelector } from "./AvArtModel.base"
import { AvArtMutationResponseModel } from "./AvArtMutationResponseModel"
import { AvArtMutationResponseModelSelector } from "./AvArtMutationResponseModel.base"
import { EventModel } from "./EventModel"
import { EventModelSelector } from "./EventModel.base"
import { EventMutationResponseModel } from "./EventMutationResponseModel"
import { EventMutationResponseModelSelector } from "./EventMutationResponseModel.base"
import { EventRevModel } from "./EventRevModel"
import { EventRevModelSelector } from "./EventRevModel.base"
import { EventRevMutationResponseModel } from "./EventRevMutationResponseModel"
import { EventRevMutationResponseModelSelector } from "./EventRevMutationResponseModel.base"
import { GartenFileModel } from "./GartenFileModel"
import { GartenFileModelSelector } from "./GartenFileModel.base"
import { GartenFileMutationResponseModel } from "./GartenFileMutationResponseModel"
import { GartenFileMutationResponseModelSelector } from "./GartenFileMutationResponseModel.base"
import { GartenModel } from "./GartenModel"
import { GartenModelSelector } from "./GartenModel.base"
import { GartenMutationResponseModel } from "./GartenMutationResponseModel"
import { GartenMutationResponseModelSelector } from "./GartenMutationResponseModel.base"
import { GartenRevModel } from "./GartenRevModel"
import { GartenRevModelSelector } from "./GartenRevModel.base"
import { GartenRevMutationResponseModel } from "./GartenRevMutationResponseModel"
import { GartenRevMutationResponseModelSelector } from "./GartenRevMutationResponseModel.base"
import { HerkunftFileModel } from "./HerkunftFileModel"
import { HerkunftFileModelSelector } from "./HerkunftFileModel.base"
import { HerkunftFileMutationResponseModel } from "./HerkunftFileMutationResponseModel"
import { HerkunftFileMutationResponseModelSelector } from "./HerkunftFileMutationResponseModel.base"
import { HerkunftModel } from "./HerkunftModel"
import { HerkunftModelSelector } from "./HerkunftModel.base"
import { HerkunftMutationResponseModel } from "./HerkunftMutationResponseModel"
import { HerkunftMutationResponseModelSelector } from "./HerkunftMutationResponseModel.base"
import { HerkunftRevModel } from "./HerkunftRevModel"
import { HerkunftRevModelSelector } from "./HerkunftRevModel.base"
import { HerkunftRevMutationResponseModel } from "./HerkunftRevMutationResponseModel"
import { HerkunftRevMutationResponseModelSelector } from "./HerkunftRevMutationResponseModel.base"
import { KulturFileModel } from "./KulturFileModel"
import { KulturFileModelSelector } from "./KulturFileModel.base"
import { KulturFileMutationResponseModel } from "./KulturFileMutationResponseModel"
import { KulturFileMutationResponseModelSelector } from "./KulturFileMutationResponseModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"
import { KulturMutationResponseModel } from "./KulturMutationResponseModel"
import { KulturMutationResponseModelSelector } from "./KulturMutationResponseModel.base"
import { KulturOptionModel } from "./KulturOptionModel"
import { KulturOptionModelSelector } from "./KulturOptionModel.base"
import { KulturOptionMutationResponseModel } from "./KulturOptionMutationResponseModel"
import { KulturOptionMutationResponseModelSelector } from "./KulturOptionMutationResponseModel.base"
import { KulturOptionRevModel } from "./KulturOptionRevModel"
import { KulturOptionRevModelSelector } from "./KulturOptionRevModel.base"
import { KulturOptionRevMutationResponseModel } from "./KulturOptionRevMutationResponseModel"
import { KulturOptionRevMutationResponseModelSelector } from "./KulturOptionRevMutationResponseModel.base"
import { KulturQkChoosenModel } from "./KulturQkChoosenModel"
import { KulturQkChoosenModelSelector } from "./KulturQkChoosenModel.base"
import { KulturQkChoosenMutationResponseModel } from "./KulturQkChoosenMutationResponseModel"
import { KulturQkChoosenMutationResponseModelSelector } from "./KulturQkChoosenMutationResponseModel.base"
import { KulturQkModel } from "./KulturQkModel"
import { KulturQkModelSelector } from "./KulturQkModel.base"
import { KulturQkMutationResponseModel } from "./KulturQkMutationResponseModel"
import { KulturQkMutationResponseModelSelector } from "./KulturQkMutationResponseModel.base"
import { KulturRevModel } from "./KulturRevModel"
import { KulturRevModelSelector } from "./KulturRevModel.base"
import { KulturRevMutationResponseModel } from "./KulturRevMutationResponseModel"
import { KulturRevMutationResponseModelSelector } from "./KulturRevMutationResponseModel.base"
import { LieferungFileModel } from "./LieferungFileModel"
import { LieferungFileModelSelector } from "./LieferungFileModel.base"
import { LieferungFileMutationResponseModel } from "./LieferungFileMutationResponseModel"
import { LieferungFileMutationResponseModelSelector } from "./LieferungFileMutationResponseModel.base"
import { LieferungModel } from "./LieferungModel"
import { LieferungModelSelector } from "./LieferungModel.base"
import { LieferungMutationResponseModel } from "./LieferungMutationResponseModel"
import { LieferungMutationResponseModelSelector } from "./LieferungMutationResponseModel.base"
import { LieferungRevModel } from "./LieferungRevModel"
import { LieferungRevModelSelector } from "./LieferungRevModel.base"
import { LieferungRevMutationResponseModel } from "./LieferungRevMutationResponseModel"
import { LieferungRevMutationResponseModelSelector } from "./LieferungRevMutationResponseModel.base"
import { PersonFileModel } from "./PersonFileModel"
import { PersonFileModelSelector } from "./PersonFileModel.base"
import { PersonFileMutationResponseModel } from "./PersonFileMutationResponseModel"
import { PersonFileMutationResponseModelSelector } from "./PersonFileMutationResponseModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"
import { PersonMutationResponseModel } from "./PersonMutationResponseModel"
import { PersonMutationResponseModelSelector } from "./PersonMutationResponseModel.base"
import { PersonOptionModel } from "./PersonOptionModel"
import { PersonOptionModelSelector } from "./PersonOptionModel.base"
import { PersonOptionMutationResponseModel } from "./PersonOptionMutationResponseModel"
import { PersonOptionMutationResponseModelSelector } from "./PersonOptionMutationResponseModel.base"
import { PersonOptionRevModel } from "./PersonOptionRevModel"
import { PersonOptionRevModelSelector } from "./PersonOptionRevModel.base"
import { PersonOptionRevMutationResponseModel } from "./PersonOptionRevMutationResponseModel"
import { PersonOptionRevMutationResponseModelSelector } from "./PersonOptionRevMutationResponseModel.base"
import { PersonRevModel } from "./PersonRevModel"
import { PersonRevModelSelector } from "./PersonRevModel.base"
import { PersonRevMutationResponseModel } from "./PersonRevMutationResponseModel"
import { PersonRevMutationResponseModelSelector } from "./PersonRevMutationResponseModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { SammelLieferungModelSelector } from "./SammelLieferungModel.base"
import { SammelLieferungMutationResponseModel } from "./SammelLieferungMutationResponseModel"
import { SammelLieferungMutationResponseModelSelector } from "./SammelLieferungMutationResponseModel.base"
import { SammelLieferungRevModel } from "./SammelLieferungRevModel"
import { SammelLieferungRevModelSelector } from "./SammelLieferungRevModel.base"
import { SammelLieferungRevMutationResponseModel } from "./SammelLieferungRevMutationResponseModel"
import { SammelLieferungRevMutationResponseModelSelector } from "./SammelLieferungRevMutationResponseModel.base"
import { SammlungFileModel } from "./SammlungFileModel"
import { SammlungFileModelSelector } from "./SammlungFileModel.base"
import { SammlungFileMutationResponseModel } from "./SammlungFileMutationResponseModel"
import { SammlungFileMutationResponseModelSelector } from "./SammlungFileMutationResponseModel.base"
import { SammlungModel } from "./SammlungModel"
import { SammlungModelSelector } from "./SammlungModel.base"
import { SammlungMutationResponseModel } from "./SammlungMutationResponseModel"
import { SammlungMutationResponseModelSelector } from "./SammlungMutationResponseModel.base"
import { SammlungRevModel } from "./SammlungRevModel"
import { SammlungRevModelSelector } from "./SammlungRevModel.base"
import { SammlungRevMutationResponseModel } from "./SammlungRevMutationResponseModel"
import { SammlungRevMutationResponseModelSelector } from "./SammlungRevMutationResponseModel.base"
import { SpatialRefSysModel } from "./SpatialRefSysModel"
import { SpatialRefSysModelSelector } from "./SpatialRefSysModel.base"
import { SpatialRefSysMutationResponseModel } from "./SpatialRefSysMutationResponseModel"
import { SpatialRefSysMutationResponseModelSelector } from "./SpatialRefSysMutationResponseModel.base"
import { TeilkulturModel } from "./TeilkulturModel"
import { TeilkulturModelSelector } from "./TeilkulturModel.base"
import { TeilkulturMutationResponseModel } from "./TeilkulturMutationResponseModel"
import { TeilkulturMutationResponseModelSelector } from "./TeilkulturMutationResponseModel.base"
import { TeilkulturRevModel } from "./TeilkulturRevModel"
import { TeilkulturRevModelSelector } from "./TeilkulturRevModel.base"
import { TeilkulturRevMutationResponseModel } from "./TeilkulturRevMutationResponseModel"
import { TeilkulturRevMutationResponseModelSelector } from "./TeilkulturRevMutationResponseModel.base"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"
import { TeilzaehlungMutationResponseModel } from "./TeilzaehlungMutationResponseModel"
import { TeilzaehlungMutationResponseModelSelector } from "./TeilzaehlungMutationResponseModel.base"
import { TeilzaehlungRevModel } from "./TeilzaehlungRevModel"
import { TeilzaehlungRevModelSelector } from "./TeilzaehlungRevModel.base"
import { TeilzaehlungRevMutationResponseModel } from "./TeilzaehlungRevMutationResponseModel"
import { TeilzaehlungRevMutationResponseModelSelector } from "./TeilzaehlungRevMutationResponseModel.base"
import { UserRoleModel } from "./UserRoleModel"
import { UserRoleModelSelector } from "./UserRoleModel.base"
import { UserRoleMutationResponseModel } from "./UserRoleMutationResponseModel"
import { UserRoleMutationResponseModelSelector } from "./UserRoleMutationResponseModel.base"
import { ZaehlungModel } from "./ZaehlungModel"
import { ZaehlungModelSelector } from "./ZaehlungModel.base"
import { ZaehlungMutationResponseModel } from "./ZaehlungMutationResponseModel"
import { ZaehlungMutationResponseModelSelector } from "./ZaehlungMutationResponseModel.base"
import { ZaehlungRevModel } from "./ZaehlungRevModel"
import { ZaehlungRevModelSelector } from "./ZaehlungRevModel.base"
import { ZaehlungRevMutationResponseModel } from "./ZaehlungRevMutationResponseModel"
import { ZaehlungRevMutationResponseModelSelector } from "./ZaehlungRevMutationResponseModel.base"


/**
 * MutationRootBase
 * auto generated base class for the model MutationRootModel.
 *
 * mutation root
 */
export const MutationRootModelBase = ModelBase
  .named('MutationRoot')
  .props({
    __typename: types.optional(types.literal("mutation_root"), "mutation_root"),
    /** delete data from the table: "ae_art" */
    delete_ae_art: types.union(types.undefined, types.null, types.late(() => AeArtMutationResponseModel)),
    /** delete data from the table: "art" */
    delete_art: types.union(types.undefined, types.null, types.late(() => ArtMutationResponseModel)),
    /** delete single row from the table: "art" */
    delete_art_by_pk: types.union(types.undefined, types.null, types.late(() => ArtModel)),
    /** delete data from the table: "art_file" */
    delete_art_file: types.union(types.undefined, types.null, types.late(() => ArtFileMutationResponseModel)),
    /** delete single row from the table: "art_file" */
    delete_art_file_by_pk: types.union(types.undefined, types.null, types.late(() => ArtFileModel)),
    /** delete data from the table: "art_qk" */
    delete_art_qk: types.union(types.undefined, types.null, types.late(() => ArtQkMutationResponseModel)),
    /** delete single row from the table: "art_qk" */
    delete_art_qk_by_pk: types.union(types.undefined, types.null, types.late(() => ArtQkModel)),
    /** delete data from the table: "art_qk_choosen" */
    delete_art_qk_choosen: types.union(types.undefined, types.null, types.late(() => ArtQkChoosenMutationResponseModel)),
    /** delete data from the table: "art_rev" */
    delete_art_rev: types.union(types.undefined, types.null, types.late(() => ArtRevMutationResponseModel)),
    /** delete single row from the table: "art_rev" */
    delete_art_rev_by_pk: types.union(types.undefined, types.null, types.late(() => ArtRevModel)),
    /** delete data from the table: "av_art" */
    delete_av_art: types.union(types.undefined, types.null, types.late(() => AvArtMutationResponseModel)),
    /** delete single row from the table: "av_art" */
    delete_av_art_by_pk: types.union(types.undefined, types.null, types.late(() => AvArtModel)),
    /** delete data from the table: "event" */
    delete_event: types.union(types.undefined, types.null, types.late(() => EventMutationResponseModel)),
    /** delete single row from the table: "event" */
    delete_event_by_pk: types.union(types.undefined, types.null, types.late(() => EventModel)),
    /** delete data from the table: "event_rev" */
    delete_event_rev: types.union(types.undefined, types.null, types.late(() => EventRevMutationResponseModel)),
    /** delete single row from the table: "event_rev" */
    delete_event_rev_by_pk: types.union(types.undefined, types.null, types.late(() => EventRevModel)),
    /** delete data from the table: "garten" */
    delete_garten: types.union(types.undefined, types.null, types.late(() => GartenMutationResponseModel)),
    /** delete single row from the table: "garten" */
    delete_garten_by_pk: types.union(types.undefined, types.null, types.late(() => GartenModel)),
    /** delete data from the table: "garten_file" */
    delete_garten_file: types.union(types.undefined, types.null, types.late(() => GartenFileMutationResponseModel)),
    /** delete single row from the table: "garten_file" */
    delete_garten_file_by_pk: types.union(types.undefined, types.null, types.late(() => GartenFileModel)),
    /** delete data from the table: "garten_rev" */
    delete_garten_rev: types.union(types.undefined, types.null, types.late(() => GartenRevMutationResponseModel)),
    /** delete single row from the table: "garten_rev" */
    delete_garten_rev_by_pk: types.union(types.undefined, types.null, types.late(() => GartenRevModel)),
    /** delete data from the table: "herkunft" */
    delete_herkunft: types.union(types.undefined, types.null, types.late(() => HerkunftMutationResponseModel)),
    /** delete single row from the table: "herkunft" */
    delete_herkunft_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftModel)),
    /** delete data from the table: "herkunft_file" */
    delete_herkunft_file: types.union(types.undefined, types.null, types.late(() => HerkunftFileMutationResponseModel)),
    /** delete single row from the table: "herkunft_file" */
    delete_herkunft_file_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftFileModel)),
    /** delete data from the table: "herkunft_rev" */
    delete_herkunft_rev: types.union(types.undefined, types.null, types.late(() => HerkunftRevMutationResponseModel)),
    /** delete single row from the table: "herkunft_rev" */
    delete_herkunft_rev_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftRevModel)),
    /** delete data from the table: "kultur" */
    delete_kultur: types.union(types.undefined, types.null, types.late(() => KulturMutationResponseModel)),
    /** delete single row from the table: "kultur" */
    delete_kultur_by_pk: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** delete data from the table: "kultur_file" */
    delete_kultur_file: types.union(types.undefined, types.null, types.late(() => KulturFileMutationResponseModel)),
    /** delete single row from the table: "kultur_file" */
    delete_kultur_file_by_pk: types.union(types.undefined, types.null, types.late(() => KulturFileModel)),
    /** delete data from the table: "kultur_option" */
    delete_kultur_option: types.union(types.undefined, types.null, types.late(() => KulturOptionMutationResponseModel)),
    /** delete data from the table: "kultur_option_rev" */
    delete_kultur_option_rev: types.union(types.undefined, types.null, types.late(() => KulturOptionRevMutationResponseModel)),
    /** delete single row from the table: "kultur_option_rev" */
    delete_kultur_option_rev_by_pk: types.union(types.undefined, types.null, types.late(() => KulturOptionRevModel)),
    /** delete data from the table: "kultur_qk" */
    delete_kultur_qk: types.union(types.undefined, types.null, types.late(() => KulturQkMutationResponseModel)),
    /** delete single row from the table: "kultur_qk" */
    delete_kultur_qk_by_pk: types.union(types.undefined, types.null, types.late(() => KulturQkModel)),
    /** delete data from the table: "kultur_qk_choosen" */
    delete_kultur_qk_choosen: types.union(types.undefined, types.null, types.late(() => KulturQkChoosenMutationResponseModel)),
    /** delete data from the table: "kultur_rev" */
    delete_kultur_rev: types.union(types.undefined, types.null, types.late(() => KulturRevMutationResponseModel)),
    /** delete single row from the table: "kultur_rev" */
    delete_kultur_rev_by_pk: types.union(types.undefined, types.null, types.late(() => KulturRevModel)),
    /** delete data from the table: "lieferung" */
    delete_lieferung: types.union(types.undefined, types.null, types.late(() => LieferungMutationResponseModel)),
    /** delete single row from the table: "lieferung" */
    delete_lieferung_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungModel)),
    /** delete data from the table: "lieferung_file" */
    delete_lieferung_file: types.union(types.undefined, types.null, types.late(() => LieferungFileMutationResponseModel)),
    /** delete single row from the table: "lieferung_file" */
    delete_lieferung_file_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungFileModel)),
    /** delete data from the table: "lieferung_rev" */
    delete_lieferung_rev: types.union(types.undefined, types.null, types.late(() => LieferungRevMutationResponseModel)),
    /** delete single row from the table: "lieferung_rev" */
    delete_lieferung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungRevModel)),
    /** delete data from the table: "person" */
    delete_person: types.union(types.undefined, types.null, types.late(() => PersonMutationResponseModel)),
    /** delete single row from the table: "person" */
    delete_person_by_pk: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    /** delete data from the table: "person_file" */
    delete_person_file: types.union(types.undefined, types.null, types.late(() => PersonFileMutationResponseModel)),
    /** delete single row from the table: "person_file" */
    delete_person_file_by_pk: types.union(types.undefined, types.null, types.late(() => PersonFileModel)),
    /** delete data from the table: "person_option" */
    delete_person_option: types.union(types.undefined, types.null, types.late(() => PersonOptionMutationResponseModel)),
    /** delete data from the table: "person_option_rev" */
    delete_person_option_rev: types.union(types.undefined, types.null, types.late(() => PersonOptionRevMutationResponseModel)),
    /** delete single row from the table: "person_option_rev" */
    delete_person_option_rev_by_pk: types.union(types.undefined, types.null, types.late(() => PersonOptionRevModel)),
    /** delete data from the table: "person_rev" */
    delete_person_rev: types.union(types.undefined, types.null, types.late(() => PersonRevMutationResponseModel)),
    /** delete single row from the table: "person_rev" */
    delete_person_rev_by_pk: types.union(types.undefined, types.null, types.late(() => PersonRevModel)),
    /** delete data from the table: "sammel_lieferung" */
    delete_sammel_lieferung: types.union(types.undefined, types.null, types.late(() => SammelLieferungMutationResponseModel)),
    /** delete single row from the table: "sammel_lieferung" */
    delete_sammel_lieferung_by_pk: types.union(types.undefined, types.null, types.late(() => SammelLieferungModel)),
    /** delete data from the table: "sammel_lieferung_rev" */
    delete_sammel_lieferung_rev: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevMutationResponseModel)),
    /** delete single row from the table: "sammel_lieferung_rev" */
    delete_sammel_lieferung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevModel)),
    /** delete data from the table: "sammlung" */
    delete_sammlung: types.union(types.undefined, types.null, types.late(() => SammlungMutationResponseModel)),
    /** delete single row from the table: "sammlung" */
    delete_sammlung_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungModel)),
    /** delete data from the table: "sammlung_file" */
    delete_sammlung_file: types.union(types.undefined, types.null, types.late(() => SammlungFileMutationResponseModel)),
    /** delete single row from the table: "sammlung_file" */
    delete_sammlung_file_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungFileModel)),
    /** delete data from the table: "sammlung_rev" */
    delete_sammlung_rev: types.union(types.undefined, types.null, types.late(() => SammlungRevMutationResponseModel)),
    /** delete single row from the table: "sammlung_rev" */
    delete_sammlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungRevModel)),
    /** delete data from the table: "spatial_ref_sys" */
    delete_spatial_ref_sys: types.union(types.undefined, types.null, types.late(() => SpatialRefSysMutationResponseModel)),
    /** delete single row from the table: "spatial_ref_sys" */
    delete_spatial_ref_sys_by_pk: types.union(types.undefined, types.null, types.late(() => SpatialRefSysModel)),
    /** delete data from the table: "teilkultur" */
    delete_teilkultur: types.union(types.undefined, types.null, types.late(() => TeilkulturMutationResponseModel)),
    /** delete single row from the table: "teilkultur" */
    delete_teilkultur_by_pk: types.union(types.undefined, types.null, types.late(() => TeilkulturModel)),
    /** delete data from the table: "teilkultur_rev" */
    delete_teilkultur_rev: types.union(types.undefined, types.null, types.late(() => TeilkulturRevMutationResponseModel)),
    /** delete single row from the table: "teilkultur_rev" */
    delete_teilkultur_rev_by_pk: types.union(types.undefined, types.null, types.late(() => TeilkulturRevModel)),
    /** delete data from the table: "teilzaehlung" */
    delete_teilzaehlung: types.union(types.undefined, types.null, types.late(() => TeilzaehlungMutationResponseModel)),
    /** delete single row from the table: "teilzaehlung" */
    delete_teilzaehlung_by_pk: types.union(types.undefined, types.null, types.late(() => TeilzaehlungModel)),
    /** delete data from the table: "teilzaehlung_rev" */
    delete_teilzaehlung_rev: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevMutationResponseModel)),
    /** delete single row from the table: "teilzaehlung_rev" */
    delete_teilzaehlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevModel)),
    /** delete data from the table: "user_role" */
    delete_user_role: types.union(types.undefined, types.null, types.late(() => UserRoleMutationResponseModel)),
    /** delete single row from the table: "user_role" */
    delete_user_role_by_pk: types.union(types.undefined, types.null, types.late(() => UserRoleModel)),
    /** delete data from the table: "zaehlung" */
    delete_zaehlung: types.union(types.undefined, types.null, types.late(() => ZaehlungMutationResponseModel)),
    /** delete single row from the table: "zaehlung" */
    delete_zaehlung_by_pk: types.union(types.undefined, types.null, types.late(() => ZaehlungModel)),
    /** delete data from the table: "zaehlung_rev" */
    delete_zaehlung_rev: types.union(types.undefined, types.null, types.late(() => ZaehlungRevMutationResponseModel)),
    /** delete single row from the table: "zaehlung_rev" */
    delete_zaehlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => ZaehlungRevModel)),
    /** insert data into the table: "ae_art" */
    insert_ae_art: types.union(types.undefined, types.null, types.late(() => AeArtMutationResponseModel)),
    /** insert a single row into the table: "ae_art" */
    insert_ae_art_one: types.union(types.undefined, types.null, types.late(() => AeArtModel)),
    /** insert data into the table: "art" */
    insert_art: types.union(types.undefined, types.null, types.late(() => ArtMutationResponseModel)),
    /** insert data into the table: "art_file" */
    insert_art_file: types.union(types.undefined, types.null, types.late(() => ArtFileMutationResponseModel)),
    /** insert a single row into the table: "art_file" */
    insert_art_file_one: types.union(types.undefined, types.null, types.late(() => ArtFileModel)),
    /** insert a single row into the table: "art" */
    insert_art_one: types.union(types.undefined, types.null, types.late(() => ArtModel)),
    /** insert data into the table: "art_qk" */
    insert_art_qk: types.union(types.undefined, types.null, types.late(() => ArtQkMutationResponseModel)),
    /** insert data into the table: "art_qk_choosen" */
    insert_art_qk_choosen: types.union(types.undefined, types.null, types.late(() => ArtQkChoosenMutationResponseModel)),
    /** insert a single row into the table: "art_qk_choosen" */
    insert_art_qk_choosen_one: types.union(types.undefined, types.null, types.late(() => ArtQkChoosenModel)),
    /** insert a single row into the table: "art_qk" */
    insert_art_qk_one: types.union(types.undefined, types.null, types.late(() => ArtQkModel)),
    /** insert data into the table: "art_rev" */
    insert_art_rev: types.union(types.undefined, types.null, types.late(() => ArtRevMutationResponseModel)),
    /** insert a single row into the table: "art_rev" */
    insert_art_rev_one: types.union(types.undefined, types.null, types.late(() => ArtRevModel)),
    /** insert data into the table: "av_art" */
    insert_av_art: types.union(types.undefined, types.null, types.late(() => AvArtMutationResponseModel)),
    /** insert a single row into the table: "av_art" */
    insert_av_art_one: types.union(types.undefined, types.null, types.late(() => AvArtModel)),
    /** insert data into the table: "event" */
    insert_event: types.union(types.undefined, types.null, types.late(() => EventMutationResponseModel)),
    /** insert a single row into the table: "event" */
    insert_event_one: types.union(types.undefined, types.null, types.late(() => EventModel)),
    /** insert data into the table: "event_rev" */
    insert_event_rev: types.union(types.undefined, types.null, types.late(() => EventRevMutationResponseModel)),
    /** insert a single row into the table: "event_rev" */
    insert_event_rev_one: types.union(types.undefined, types.null, types.late(() => EventRevModel)),
    /** insert data into the table: "garten" */
    insert_garten: types.union(types.undefined, types.null, types.late(() => GartenMutationResponseModel)),
    /** insert data into the table: "garten_file" */
    insert_garten_file: types.union(types.undefined, types.null, types.late(() => GartenFileMutationResponseModel)),
    /** insert a single row into the table: "garten_file" */
    insert_garten_file_one: types.union(types.undefined, types.null, types.late(() => GartenFileModel)),
    /** insert a single row into the table: "garten" */
    insert_garten_one: types.union(types.undefined, types.null, types.late(() => GartenModel)),
    /** insert data into the table: "garten_rev" */
    insert_garten_rev: types.union(types.undefined, types.null, types.late(() => GartenRevMutationResponseModel)),
    /** insert a single row into the table: "garten_rev" */
    insert_garten_rev_one: types.union(types.undefined, types.null, types.late(() => GartenRevModel)),
    /** insert data into the table: "herkunft" */
    insert_herkunft: types.union(types.undefined, types.null, types.late(() => HerkunftMutationResponseModel)),
    /** insert data into the table: "herkunft_file" */
    insert_herkunft_file: types.union(types.undefined, types.null, types.late(() => HerkunftFileMutationResponseModel)),
    /** insert a single row into the table: "herkunft_file" */
    insert_herkunft_file_one: types.union(types.undefined, types.null, types.late(() => HerkunftFileModel)),
    /** insert a single row into the table: "herkunft" */
    insert_herkunft_one: types.union(types.undefined, types.null, types.late(() => HerkunftModel)),
    /** insert data into the table: "herkunft_rev" */
    insert_herkunft_rev: types.union(types.undefined, types.null, types.late(() => HerkunftRevMutationResponseModel)),
    /** insert a single row into the table: "herkunft_rev" */
    insert_herkunft_rev_one: types.union(types.undefined, types.null, types.late(() => HerkunftRevModel)),
    /** insert data into the table: "kultur" */
    insert_kultur: types.union(types.undefined, types.null, types.late(() => KulturMutationResponseModel)),
    /** insert data into the table: "kultur_file" */
    insert_kultur_file: types.union(types.undefined, types.null, types.late(() => KulturFileMutationResponseModel)),
    /** insert a single row into the table: "kultur_file" */
    insert_kultur_file_one: types.union(types.undefined, types.null, types.late(() => KulturFileModel)),
    /** insert a single row into the table: "kultur" */
    insert_kultur_one: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** insert data into the table: "kultur_option" */
    insert_kultur_option: types.union(types.undefined, types.null, types.late(() => KulturOptionMutationResponseModel)),
    /** insert a single row into the table: "kultur_option" */
    insert_kultur_option_one: types.union(types.undefined, types.null, types.late(() => KulturOptionModel)),
    /** insert data into the table: "kultur_option_rev" */
    insert_kultur_option_rev: types.union(types.undefined, types.null, types.late(() => KulturOptionRevMutationResponseModel)),
    /** insert a single row into the table: "kultur_option_rev" */
    insert_kultur_option_rev_one: types.union(types.undefined, types.null, types.late(() => KulturOptionRevModel)),
    /** insert data into the table: "kultur_qk" */
    insert_kultur_qk: types.union(types.undefined, types.null, types.late(() => KulturQkMutationResponseModel)),
    /** insert data into the table: "kultur_qk_choosen" */
    insert_kultur_qk_choosen: types.union(types.undefined, types.null, types.late(() => KulturQkChoosenMutationResponseModel)),
    /** insert a single row into the table: "kultur_qk_choosen" */
    insert_kultur_qk_choosen_one: types.union(types.undefined, types.null, types.late(() => KulturQkChoosenModel)),
    /** insert a single row into the table: "kultur_qk" */
    insert_kultur_qk_one: types.union(types.undefined, types.null, types.late(() => KulturQkModel)),
    /** insert data into the table: "kultur_rev" */
    insert_kultur_rev: types.union(types.undefined, types.null, types.late(() => KulturRevMutationResponseModel)),
    /** insert a single row into the table: "kultur_rev" */
    insert_kultur_rev_one: types.union(types.undefined, types.null, types.late(() => KulturRevModel)),
    /** insert data into the table: "lieferung" */
    insert_lieferung: types.union(types.undefined, types.null, types.late(() => LieferungMutationResponseModel)),
    /** insert data into the table: "lieferung_file" */
    insert_lieferung_file: types.union(types.undefined, types.null, types.late(() => LieferungFileMutationResponseModel)),
    /** insert a single row into the table: "lieferung_file" */
    insert_lieferung_file_one: types.union(types.undefined, types.null, types.late(() => LieferungFileModel)),
    /** insert a single row into the table: "lieferung" */
    insert_lieferung_one: types.union(types.undefined, types.null, types.late(() => LieferungModel)),
    /** insert data into the table: "lieferung_rev" */
    insert_lieferung_rev: types.union(types.undefined, types.null, types.late(() => LieferungRevMutationResponseModel)),
    /** insert a single row into the table: "lieferung_rev" */
    insert_lieferung_rev_one: types.union(types.undefined, types.null, types.late(() => LieferungRevModel)),
    /** insert data into the table: "person" */
    insert_person: types.union(types.undefined, types.null, types.late(() => PersonMutationResponseModel)),
    /** insert data into the table: "person_file" */
    insert_person_file: types.union(types.undefined, types.null, types.late(() => PersonFileMutationResponseModel)),
    /** insert a single row into the table: "person_file" */
    insert_person_file_one: types.union(types.undefined, types.null, types.late(() => PersonFileModel)),
    /** insert a single row into the table: "person" */
    insert_person_one: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    /** insert data into the table: "person_option" */
    insert_person_option: types.union(types.undefined, types.null, types.late(() => PersonOptionMutationResponseModel)),
    /** insert a single row into the table: "person_option" */
    insert_person_option_one: types.union(types.undefined, types.null, types.late(() => PersonOptionModel)),
    /** insert data into the table: "person_option_rev" */
    insert_person_option_rev: types.union(types.undefined, types.null, types.late(() => PersonOptionRevMutationResponseModel)),
    /** insert a single row into the table: "person_option_rev" */
    insert_person_option_rev_one: types.union(types.undefined, types.null, types.late(() => PersonOptionRevModel)),
    /** insert data into the table: "person_rev" */
    insert_person_rev: types.union(types.undefined, types.null, types.late(() => PersonRevMutationResponseModel)),
    /** insert a single row into the table: "person_rev" */
    insert_person_rev_one: types.union(types.undefined, types.null, types.late(() => PersonRevModel)),
    /** insert data into the table: "sammel_lieferung" */
    insert_sammel_lieferung: types.union(types.undefined, types.null, types.late(() => SammelLieferungMutationResponseModel)),
    /** insert a single row into the table: "sammel_lieferung" */
    insert_sammel_lieferung_one: types.union(types.undefined, types.null, types.late(() => SammelLieferungModel)),
    /** insert data into the table: "sammel_lieferung_rev" */
    insert_sammel_lieferung_rev: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevMutationResponseModel)),
    /** insert a single row into the table: "sammel_lieferung_rev" */
    insert_sammel_lieferung_rev_one: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevModel)),
    /** insert data into the table: "sammlung" */
    insert_sammlung: types.union(types.undefined, types.null, types.late(() => SammlungMutationResponseModel)),
    /** insert data into the table: "sammlung_file" */
    insert_sammlung_file: types.union(types.undefined, types.null, types.late(() => SammlungFileMutationResponseModel)),
    /** insert a single row into the table: "sammlung_file" */
    insert_sammlung_file_one: types.union(types.undefined, types.null, types.late(() => SammlungFileModel)),
    /** insert a single row into the table: "sammlung" */
    insert_sammlung_one: types.union(types.undefined, types.null, types.late(() => SammlungModel)),
    /** insert data into the table: "sammlung_rev" */
    insert_sammlung_rev: types.union(types.undefined, types.null, types.late(() => SammlungRevMutationResponseModel)),
    /** insert a single row into the table: "sammlung_rev" */
    insert_sammlung_rev_one: types.union(types.undefined, types.null, types.late(() => SammlungRevModel)),
    /** insert data into the table: "spatial_ref_sys" */
    insert_spatial_ref_sys: types.union(types.undefined, types.null, types.late(() => SpatialRefSysMutationResponseModel)),
    /** insert a single row into the table: "spatial_ref_sys" */
    insert_spatial_ref_sys_one: types.union(types.undefined, types.null, types.late(() => SpatialRefSysModel)),
    /** insert data into the table: "teilkultur" */
    insert_teilkultur: types.union(types.undefined, types.null, types.late(() => TeilkulturMutationResponseModel)),
    /** insert a single row into the table: "teilkultur" */
    insert_teilkultur_one: types.union(types.undefined, types.null, types.late(() => TeilkulturModel)),
    /** insert data into the table: "teilkultur_rev" */
    insert_teilkultur_rev: types.union(types.undefined, types.null, types.late(() => TeilkulturRevMutationResponseModel)),
    /** insert a single row into the table: "teilkultur_rev" */
    insert_teilkultur_rev_one: types.union(types.undefined, types.null, types.late(() => TeilkulturRevModel)),
    /** insert data into the table: "teilzaehlung" */
    insert_teilzaehlung: types.union(types.undefined, types.null, types.late(() => TeilzaehlungMutationResponseModel)),
    /** insert a single row into the table: "teilzaehlung" */
    insert_teilzaehlung_one: types.union(types.undefined, types.null, types.late(() => TeilzaehlungModel)),
    /** insert data into the table: "teilzaehlung_rev" */
    insert_teilzaehlung_rev: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevMutationResponseModel)),
    /** insert a single row into the table: "teilzaehlung_rev" */
    insert_teilzaehlung_rev_one: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevModel)),
    /** insert data into the table: "user_role" */
    insert_user_role: types.union(types.undefined, types.null, types.late(() => UserRoleMutationResponseModel)),
    /** insert a single row into the table: "user_role" */
    insert_user_role_one: types.union(types.undefined, types.null, types.late(() => UserRoleModel)),
    /** insert data into the table: "zaehlung" */
    insert_zaehlung: types.union(types.undefined, types.null, types.late(() => ZaehlungMutationResponseModel)),
    /** insert a single row into the table: "zaehlung" */
    insert_zaehlung_one: types.union(types.undefined, types.null, types.late(() => ZaehlungModel)),
    /** insert data into the table: "zaehlung_rev" */
    insert_zaehlung_rev: types.union(types.undefined, types.null, types.late(() => ZaehlungRevMutationResponseModel)),
    /** insert a single row into the table: "zaehlung_rev" */
    insert_zaehlung_rev_one: types.union(types.undefined, types.null, types.late(() => ZaehlungRevModel)),
    /** update data of the table: "ae_art" */
    update_ae_art: types.union(types.undefined, types.null, types.late(() => AeArtMutationResponseModel)),
    /** update data of the table: "art" */
    update_art: types.union(types.undefined, types.null, types.late(() => ArtMutationResponseModel)),
    /** update single row of the table: "art" */
    update_art_by_pk: types.union(types.undefined, types.null, types.late(() => ArtModel)),
    /** update data of the table: "art_file" */
    update_art_file: types.union(types.undefined, types.null, types.late(() => ArtFileMutationResponseModel)),
    /** update single row of the table: "art_file" */
    update_art_file_by_pk: types.union(types.undefined, types.null, types.late(() => ArtFileModel)),
    /** update data of the table: "art_qk" */
    update_art_qk: types.union(types.undefined, types.null, types.late(() => ArtQkMutationResponseModel)),
    /** update single row of the table: "art_qk" */
    update_art_qk_by_pk: types.union(types.undefined, types.null, types.late(() => ArtQkModel)),
    /** update data of the table: "art_qk_choosen" */
    update_art_qk_choosen: types.union(types.undefined, types.null, types.late(() => ArtQkChoosenMutationResponseModel)),
    /** update data of the table: "art_rev" */
    update_art_rev: types.union(types.undefined, types.null, types.late(() => ArtRevMutationResponseModel)),
    /** update single row of the table: "art_rev" */
    update_art_rev_by_pk: types.union(types.undefined, types.null, types.late(() => ArtRevModel)),
    /** update data of the table: "av_art" */
    update_av_art: types.union(types.undefined, types.null, types.late(() => AvArtMutationResponseModel)),
    /** update single row of the table: "av_art" */
    update_av_art_by_pk: types.union(types.undefined, types.null, types.late(() => AvArtModel)),
    /** update data of the table: "event" */
    update_event: types.union(types.undefined, types.null, types.late(() => EventMutationResponseModel)),
    /** update single row of the table: "event" */
    update_event_by_pk: types.union(types.undefined, types.null, types.late(() => EventModel)),
    /** update data of the table: "event_rev" */
    update_event_rev: types.union(types.undefined, types.null, types.late(() => EventRevMutationResponseModel)),
    /** update single row of the table: "event_rev" */
    update_event_rev_by_pk: types.union(types.undefined, types.null, types.late(() => EventRevModel)),
    /** update data of the table: "garten" */
    update_garten: types.union(types.undefined, types.null, types.late(() => GartenMutationResponseModel)),
    /** update single row of the table: "garten" */
    update_garten_by_pk: types.union(types.undefined, types.null, types.late(() => GartenModel)),
    /** update data of the table: "garten_file" */
    update_garten_file: types.union(types.undefined, types.null, types.late(() => GartenFileMutationResponseModel)),
    /** update single row of the table: "garten_file" */
    update_garten_file_by_pk: types.union(types.undefined, types.null, types.late(() => GartenFileModel)),
    /** update data of the table: "garten_rev" */
    update_garten_rev: types.union(types.undefined, types.null, types.late(() => GartenRevMutationResponseModel)),
    /** update single row of the table: "garten_rev" */
    update_garten_rev_by_pk: types.union(types.undefined, types.null, types.late(() => GartenRevModel)),
    /** update data of the table: "herkunft" */
    update_herkunft: types.union(types.undefined, types.null, types.late(() => HerkunftMutationResponseModel)),
    /** update single row of the table: "herkunft" */
    update_herkunft_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftModel)),
    /** update data of the table: "herkunft_file" */
    update_herkunft_file: types.union(types.undefined, types.null, types.late(() => HerkunftFileMutationResponseModel)),
    /** update single row of the table: "herkunft_file" */
    update_herkunft_file_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftFileModel)),
    /** update data of the table: "herkunft_rev" */
    update_herkunft_rev: types.union(types.undefined, types.null, types.late(() => HerkunftRevMutationResponseModel)),
    /** update single row of the table: "herkunft_rev" */
    update_herkunft_rev_by_pk: types.union(types.undefined, types.null, types.late(() => HerkunftRevModel)),
    /** update data of the table: "kultur" */
    update_kultur: types.union(types.undefined, types.null, types.late(() => KulturMutationResponseModel)),
    /** update single row of the table: "kultur" */
    update_kultur_by_pk: types.union(types.undefined, types.null, types.late(() => KulturModel)),
    /** update data of the table: "kultur_file" */
    update_kultur_file: types.union(types.undefined, types.null, types.late(() => KulturFileMutationResponseModel)),
    /** update single row of the table: "kultur_file" */
    update_kultur_file_by_pk: types.union(types.undefined, types.null, types.late(() => KulturFileModel)),
    /** update data of the table: "kultur_option" */
    update_kultur_option: types.union(types.undefined, types.null, types.late(() => KulturOptionMutationResponseModel)),
    /** update data of the table: "kultur_option_rev" */
    update_kultur_option_rev: types.union(types.undefined, types.null, types.late(() => KulturOptionRevMutationResponseModel)),
    /** update single row of the table: "kultur_option_rev" */
    update_kultur_option_rev_by_pk: types.union(types.undefined, types.null, types.late(() => KulturOptionRevModel)),
    /** update data of the table: "kultur_qk" */
    update_kultur_qk: types.union(types.undefined, types.null, types.late(() => KulturQkMutationResponseModel)),
    /** update single row of the table: "kultur_qk" */
    update_kultur_qk_by_pk: types.union(types.undefined, types.null, types.late(() => KulturQkModel)),
    /** update data of the table: "kultur_qk_choosen" */
    update_kultur_qk_choosen: types.union(types.undefined, types.null, types.late(() => KulturQkChoosenMutationResponseModel)),
    /** update data of the table: "kultur_rev" */
    update_kultur_rev: types.union(types.undefined, types.null, types.late(() => KulturRevMutationResponseModel)),
    /** update single row of the table: "kultur_rev" */
    update_kultur_rev_by_pk: types.union(types.undefined, types.null, types.late(() => KulturRevModel)),
    /** update data of the table: "lieferung" */
    update_lieferung: types.union(types.undefined, types.null, types.late(() => LieferungMutationResponseModel)),
    /** update single row of the table: "lieferung" */
    update_lieferung_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungModel)),
    /** update data of the table: "lieferung_file" */
    update_lieferung_file: types.union(types.undefined, types.null, types.late(() => LieferungFileMutationResponseModel)),
    /** update single row of the table: "lieferung_file" */
    update_lieferung_file_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungFileModel)),
    /** update data of the table: "lieferung_rev" */
    update_lieferung_rev: types.union(types.undefined, types.null, types.late(() => LieferungRevMutationResponseModel)),
    /** update single row of the table: "lieferung_rev" */
    update_lieferung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => LieferungRevModel)),
    /** update data of the table: "person" */
    update_person: types.union(types.undefined, types.null, types.late(() => PersonMutationResponseModel)),
    /** update single row of the table: "person" */
    update_person_by_pk: types.union(types.undefined, types.null, types.late(() => PersonModel)),
    /** update data of the table: "person_file" */
    update_person_file: types.union(types.undefined, types.null, types.late(() => PersonFileMutationResponseModel)),
    /** update single row of the table: "person_file" */
    update_person_file_by_pk: types.union(types.undefined, types.null, types.late(() => PersonFileModel)),
    /** update data of the table: "person_option" */
    update_person_option: types.union(types.undefined, types.null, types.late(() => PersonOptionMutationResponseModel)),
    /** update data of the table: "person_option_rev" */
    update_person_option_rev: types.union(types.undefined, types.null, types.late(() => PersonOptionRevMutationResponseModel)),
    /** update single row of the table: "person_option_rev" */
    update_person_option_rev_by_pk: types.union(types.undefined, types.null, types.late(() => PersonOptionRevModel)),
    /** update data of the table: "person_rev" */
    update_person_rev: types.union(types.undefined, types.null, types.late(() => PersonRevMutationResponseModel)),
    /** update single row of the table: "person_rev" */
    update_person_rev_by_pk: types.union(types.undefined, types.null, types.late(() => PersonRevModel)),
    /** update data of the table: "sammel_lieferung" */
    update_sammel_lieferung: types.union(types.undefined, types.null, types.late(() => SammelLieferungMutationResponseModel)),
    /** update single row of the table: "sammel_lieferung" */
    update_sammel_lieferung_by_pk: types.union(types.undefined, types.null, types.late(() => SammelLieferungModel)),
    /** update data of the table: "sammel_lieferung_rev" */
    update_sammel_lieferung_rev: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevMutationResponseModel)),
    /** update single row of the table: "sammel_lieferung_rev" */
    update_sammel_lieferung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevModel)),
    /** update data of the table: "sammlung" */
    update_sammlung: types.union(types.undefined, types.null, types.late(() => SammlungMutationResponseModel)),
    /** update single row of the table: "sammlung" */
    update_sammlung_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungModel)),
    /** update data of the table: "sammlung_file" */
    update_sammlung_file: types.union(types.undefined, types.null, types.late(() => SammlungFileMutationResponseModel)),
    /** update single row of the table: "sammlung_file" */
    update_sammlung_file_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungFileModel)),
    /** update data of the table: "sammlung_rev" */
    update_sammlung_rev: types.union(types.undefined, types.null, types.late(() => SammlungRevMutationResponseModel)),
    /** update single row of the table: "sammlung_rev" */
    update_sammlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => SammlungRevModel)),
    /** update data of the table: "spatial_ref_sys" */
    update_spatial_ref_sys: types.union(types.undefined, types.null, types.late(() => SpatialRefSysMutationResponseModel)),
    /** update single row of the table: "spatial_ref_sys" */
    update_spatial_ref_sys_by_pk: types.union(types.undefined, types.null, types.late(() => SpatialRefSysModel)),
    /** update data of the table: "teilkultur" */
    update_teilkultur: types.union(types.undefined, types.null, types.late(() => TeilkulturMutationResponseModel)),
    /** update single row of the table: "teilkultur" */
    update_teilkultur_by_pk: types.union(types.undefined, types.null, types.late(() => TeilkulturModel)),
    /** update data of the table: "teilkultur_rev" */
    update_teilkultur_rev: types.union(types.undefined, types.null, types.late(() => TeilkulturRevMutationResponseModel)),
    /** update single row of the table: "teilkultur_rev" */
    update_teilkultur_rev_by_pk: types.union(types.undefined, types.null, types.late(() => TeilkulturRevModel)),
    /** update data of the table: "teilzaehlung" */
    update_teilzaehlung: types.union(types.undefined, types.null, types.late(() => TeilzaehlungMutationResponseModel)),
    /** update single row of the table: "teilzaehlung" */
    update_teilzaehlung_by_pk: types.union(types.undefined, types.null, types.late(() => TeilzaehlungModel)),
    /** update data of the table: "teilzaehlung_rev" */
    update_teilzaehlung_rev: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevMutationResponseModel)),
    /** update single row of the table: "teilzaehlung_rev" */
    update_teilzaehlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevModel)),
    /** update data of the table: "user_role" */
    update_user_role: types.union(types.undefined, types.null, types.late(() => UserRoleMutationResponseModel)),
    /** update single row of the table: "user_role" */
    update_user_role_by_pk: types.union(types.undefined, types.null, types.late(() => UserRoleModel)),
    /** update data of the table: "zaehlung" */
    update_zaehlung: types.union(types.undefined, types.null, types.late(() => ZaehlungMutationResponseModel)),
    /** update single row of the table: "zaehlung" */
    update_zaehlung_by_pk: types.union(types.undefined, types.null, types.late(() => ZaehlungModel)),
    /** update data of the table: "zaehlung_rev" */
    update_zaehlung_rev: types.union(types.undefined, types.null, types.late(() => ZaehlungRevMutationResponseModel)),
    /** update single row of the table: "zaehlung_rev" */
    update_zaehlung_rev_by_pk: types.union(types.undefined, types.null, types.late(() => ZaehlungRevModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class MutationRootModelSelector extends QueryBuilder {
  delete_ae_art(builder) { return this.__child(`delete_ae_art`, AeArtMutationResponseModelSelector, builder) }
  delete_art(builder) { return this.__child(`delete_art`, ArtMutationResponseModelSelector, builder) }
  delete_art_by_pk(builder) { return this.__child(`delete_art_by_pk`, ArtModelSelector, builder) }
  delete_art_file(builder) { return this.__child(`delete_art_file`, ArtFileMutationResponseModelSelector, builder) }
  delete_art_file_by_pk(builder) { return this.__child(`delete_art_file_by_pk`, ArtFileModelSelector, builder) }
  delete_art_qk(builder) { return this.__child(`delete_art_qk`, ArtQkMutationResponseModelSelector, builder) }
  delete_art_qk_by_pk(builder) { return this.__child(`delete_art_qk_by_pk`, ArtQkModelSelector, builder) }
  delete_art_qk_choosen(builder) { return this.__child(`delete_art_qk_choosen`, ArtQkChoosenMutationResponseModelSelector, builder) }
  delete_art_rev(builder) { return this.__child(`delete_art_rev`, ArtRevMutationResponseModelSelector, builder) }
  delete_art_rev_by_pk(builder) { return this.__child(`delete_art_rev_by_pk`, ArtRevModelSelector, builder) }
  delete_av_art(builder) { return this.__child(`delete_av_art`, AvArtMutationResponseModelSelector, builder) }
  delete_av_art_by_pk(builder) { return this.__child(`delete_av_art_by_pk`, AvArtModelSelector, builder) }
  delete_event(builder) { return this.__child(`delete_event`, EventMutationResponseModelSelector, builder) }
  delete_event_by_pk(builder) { return this.__child(`delete_event_by_pk`, EventModelSelector, builder) }
  delete_event_rev(builder) { return this.__child(`delete_event_rev`, EventRevMutationResponseModelSelector, builder) }
  delete_event_rev_by_pk(builder) { return this.__child(`delete_event_rev_by_pk`, EventRevModelSelector, builder) }
  delete_garten(builder) { return this.__child(`delete_garten`, GartenMutationResponseModelSelector, builder) }
  delete_garten_by_pk(builder) { return this.__child(`delete_garten_by_pk`, GartenModelSelector, builder) }
  delete_garten_file(builder) { return this.__child(`delete_garten_file`, GartenFileMutationResponseModelSelector, builder) }
  delete_garten_file_by_pk(builder) { return this.__child(`delete_garten_file_by_pk`, GartenFileModelSelector, builder) }
  delete_garten_rev(builder) { return this.__child(`delete_garten_rev`, GartenRevMutationResponseModelSelector, builder) }
  delete_garten_rev_by_pk(builder) { return this.__child(`delete_garten_rev_by_pk`, GartenRevModelSelector, builder) }
  delete_herkunft(builder) { return this.__child(`delete_herkunft`, HerkunftMutationResponseModelSelector, builder) }
  delete_herkunft_by_pk(builder) { return this.__child(`delete_herkunft_by_pk`, HerkunftModelSelector, builder) }
  delete_herkunft_file(builder) { return this.__child(`delete_herkunft_file`, HerkunftFileMutationResponseModelSelector, builder) }
  delete_herkunft_file_by_pk(builder) { return this.__child(`delete_herkunft_file_by_pk`, HerkunftFileModelSelector, builder) }
  delete_herkunft_rev(builder) { return this.__child(`delete_herkunft_rev`, HerkunftRevMutationResponseModelSelector, builder) }
  delete_herkunft_rev_by_pk(builder) { return this.__child(`delete_herkunft_rev_by_pk`, HerkunftRevModelSelector, builder) }
  delete_kultur(builder) { return this.__child(`delete_kultur`, KulturMutationResponseModelSelector, builder) }
  delete_kultur_by_pk(builder) { return this.__child(`delete_kultur_by_pk`, KulturModelSelector, builder) }
  delete_kultur_file(builder) { return this.__child(`delete_kultur_file`, KulturFileMutationResponseModelSelector, builder) }
  delete_kultur_file_by_pk(builder) { return this.__child(`delete_kultur_file_by_pk`, KulturFileModelSelector, builder) }
  delete_kultur_option(builder) { return this.__child(`delete_kultur_option`, KulturOptionMutationResponseModelSelector, builder) }
  delete_kultur_option_rev(builder) { return this.__child(`delete_kultur_option_rev`, KulturOptionRevMutationResponseModelSelector, builder) }
  delete_kultur_option_rev_by_pk(builder) { return this.__child(`delete_kultur_option_rev_by_pk`, KulturOptionRevModelSelector, builder) }
  delete_kultur_qk(builder) { return this.__child(`delete_kultur_qk`, KulturQkMutationResponseModelSelector, builder) }
  delete_kultur_qk_by_pk(builder) { return this.__child(`delete_kultur_qk_by_pk`, KulturQkModelSelector, builder) }
  delete_kultur_qk_choosen(builder) { return this.__child(`delete_kultur_qk_choosen`, KulturQkChoosenMutationResponseModelSelector, builder) }
  delete_kultur_rev(builder) { return this.__child(`delete_kultur_rev`, KulturRevMutationResponseModelSelector, builder) }
  delete_kultur_rev_by_pk(builder) { return this.__child(`delete_kultur_rev_by_pk`, KulturRevModelSelector, builder) }
  delete_lieferung(builder) { return this.__child(`delete_lieferung`, LieferungMutationResponseModelSelector, builder) }
  delete_lieferung_by_pk(builder) { return this.__child(`delete_lieferung_by_pk`, LieferungModelSelector, builder) }
  delete_lieferung_file(builder) { return this.__child(`delete_lieferung_file`, LieferungFileMutationResponseModelSelector, builder) }
  delete_lieferung_file_by_pk(builder) { return this.__child(`delete_lieferung_file_by_pk`, LieferungFileModelSelector, builder) }
  delete_lieferung_rev(builder) { return this.__child(`delete_lieferung_rev`, LieferungRevMutationResponseModelSelector, builder) }
  delete_lieferung_rev_by_pk(builder) { return this.__child(`delete_lieferung_rev_by_pk`, LieferungRevModelSelector, builder) }
  delete_person(builder) { return this.__child(`delete_person`, PersonMutationResponseModelSelector, builder) }
  delete_person_by_pk(builder) { return this.__child(`delete_person_by_pk`, PersonModelSelector, builder) }
  delete_person_file(builder) { return this.__child(`delete_person_file`, PersonFileMutationResponseModelSelector, builder) }
  delete_person_file_by_pk(builder) { return this.__child(`delete_person_file_by_pk`, PersonFileModelSelector, builder) }
  delete_person_option(builder) { return this.__child(`delete_person_option`, PersonOptionMutationResponseModelSelector, builder) }
  delete_person_option_rev(builder) { return this.__child(`delete_person_option_rev`, PersonOptionRevMutationResponseModelSelector, builder) }
  delete_person_option_rev_by_pk(builder) { return this.__child(`delete_person_option_rev_by_pk`, PersonOptionRevModelSelector, builder) }
  delete_person_rev(builder) { return this.__child(`delete_person_rev`, PersonRevMutationResponseModelSelector, builder) }
  delete_person_rev_by_pk(builder) { return this.__child(`delete_person_rev_by_pk`, PersonRevModelSelector, builder) }
  delete_sammel_lieferung(builder) { return this.__child(`delete_sammel_lieferung`, SammelLieferungMutationResponseModelSelector, builder) }
  delete_sammel_lieferung_by_pk(builder) { return this.__child(`delete_sammel_lieferung_by_pk`, SammelLieferungModelSelector, builder) }
  delete_sammel_lieferung_rev(builder) { return this.__child(`delete_sammel_lieferung_rev`, SammelLieferungRevMutationResponseModelSelector, builder) }
  delete_sammel_lieferung_rev_by_pk(builder) { return this.__child(`delete_sammel_lieferung_rev_by_pk`, SammelLieferungRevModelSelector, builder) }
  delete_sammlung(builder) { return this.__child(`delete_sammlung`, SammlungMutationResponseModelSelector, builder) }
  delete_sammlung_by_pk(builder) { return this.__child(`delete_sammlung_by_pk`, SammlungModelSelector, builder) }
  delete_sammlung_file(builder) { return this.__child(`delete_sammlung_file`, SammlungFileMutationResponseModelSelector, builder) }
  delete_sammlung_file_by_pk(builder) { return this.__child(`delete_sammlung_file_by_pk`, SammlungFileModelSelector, builder) }
  delete_sammlung_rev(builder) { return this.__child(`delete_sammlung_rev`, SammlungRevMutationResponseModelSelector, builder) }
  delete_sammlung_rev_by_pk(builder) { return this.__child(`delete_sammlung_rev_by_pk`, SammlungRevModelSelector, builder) }
  delete_spatial_ref_sys(builder) { return this.__child(`delete_spatial_ref_sys`, SpatialRefSysMutationResponseModelSelector, builder) }
  delete_spatial_ref_sys_by_pk(builder) { return this.__child(`delete_spatial_ref_sys_by_pk`, SpatialRefSysModelSelector, builder) }
  delete_teilkultur(builder) { return this.__child(`delete_teilkultur`, TeilkulturMutationResponseModelSelector, builder) }
  delete_teilkultur_by_pk(builder) { return this.__child(`delete_teilkultur_by_pk`, TeilkulturModelSelector, builder) }
  delete_teilkultur_rev(builder) { return this.__child(`delete_teilkultur_rev`, TeilkulturRevMutationResponseModelSelector, builder) }
  delete_teilkultur_rev_by_pk(builder) { return this.__child(`delete_teilkultur_rev_by_pk`, TeilkulturRevModelSelector, builder) }
  delete_teilzaehlung(builder) { return this.__child(`delete_teilzaehlung`, TeilzaehlungMutationResponseModelSelector, builder) }
  delete_teilzaehlung_by_pk(builder) { return this.__child(`delete_teilzaehlung_by_pk`, TeilzaehlungModelSelector, builder) }
  delete_teilzaehlung_rev(builder) { return this.__child(`delete_teilzaehlung_rev`, TeilzaehlungRevMutationResponseModelSelector, builder) }
  delete_teilzaehlung_rev_by_pk(builder) { return this.__child(`delete_teilzaehlung_rev_by_pk`, TeilzaehlungRevModelSelector, builder) }
  delete_user_role(builder) { return this.__child(`delete_user_role`, UserRoleMutationResponseModelSelector, builder) }
  delete_user_role_by_pk(builder) { return this.__child(`delete_user_role_by_pk`, UserRoleModelSelector, builder) }
  delete_zaehlung(builder) { return this.__child(`delete_zaehlung`, ZaehlungMutationResponseModelSelector, builder) }
  delete_zaehlung_by_pk(builder) { return this.__child(`delete_zaehlung_by_pk`, ZaehlungModelSelector, builder) }
  delete_zaehlung_rev(builder) { return this.__child(`delete_zaehlung_rev`, ZaehlungRevMutationResponseModelSelector, builder) }
  delete_zaehlung_rev_by_pk(builder) { return this.__child(`delete_zaehlung_rev_by_pk`, ZaehlungRevModelSelector, builder) }
  insert_ae_art(builder) { return this.__child(`insert_ae_art`, AeArtMutationResponseModelSelector, builder) }
  insert_ae_art_one(builder) { return this.__child(`insert_ae_art_one`, AeArtModelSelector, builder) }
  insert_art(builder) { return this.__child(`insert_art`, ArtMutationResponseModelSelector, builder) }
  insert_art_file(builder) { return this.__child(`insert_art_file`, ArtFileMutationResponseModelSelector, builder) }
  insert_art_file_one(builder) { return this.__child(`insert_art_file_one`, ArtFileModelSelector, builder) }
  insert_art_one(builder) { return this.__child(`insert_art_one`, ArtModelSelector, builder) }
  insert_art_qk(builder) { return this.__child(`insert_art_qk`, ArtQkMutationResponseModelSelector, builder) }
  insert_art_qk_choosen(builder) { return this.__child(`insert_art_qk_choosen`, ArtQkChoosenMutationResponseModelSelector, builder) }
  insert_art_qk_choosen_one(builder) { return this.__child(`insert_art_qk_choosen_one`, ArtQkChoosenModelSelector, builder) }
  insert_art_qk_one(builder) { return this.__child(`insert_art_qk_one`, ArtQkModelSelector, builder) }
  insert_art_rev(builder) { return this.__child(`insert_art_rev`, ArtRevMutationResponseModelSelector, builder) }
  insert_art_rev_one(builder) { return this.__child(`insert_art_rev_one`, ArtRevModelSelector, builder) }
  insert_av_art(builder) { return this.__child(`insert_av_art`, AvArtMutationResponseModelSelector, builder) }
  insert_av_art_one(builder) { return this.__child(`insert_av_art_one`, AvArtModelSelector, builder) }
  insert_event(builder) { return this.__child(`insert_event`, EventMutationResponseModelSelector, builder) }
  insert_event_one(builder) { return this.__child(`insert_event_one`, EventModelSelector, builder) }
  insert_event_rev(builder) { return this.__child(`insert_event_rev`, EventRevMutationResponseModelSelector, builder) }
  insert_event_rev_one(builder) { return this.__child(`insert_event_rev_one`, EventRevModelSelector, builder) }
  insert_garten(builder) { return this.__child(`insert_garten`, GartenMutationResponseModelSelector, builder) }
  insert_garten_file(builder) { return this.__child(`insert_garten_file`, GartenFileMutationResponseModelSelector, builder) }
  insert_garten_file_one(builder) { return this.__child(`insert_garten_file_one`, GartenFileModelSelector, builder) }
  insert_garten_one(builder) { return this.__child(`insert_garten_one`, GartenModelSelector, builder) }
  insert_garten_rev(builder) { return this.__child(`insert_garten_rev`, GartenRevMutationResponseModelSelector, builder) }
  insert_garten_rev_one(builder) { return this.__child(`insert_garten_rev_one`, GartenRevModelSelector, builder) }
  insert_herkunft(builder) { return this.__child(`insert_herkunft`, HerkunftMutationResponseModelSelector, builder) }
  insert_herkunft_file(builder) { return this.__child(`insert_herkunft_file`, HerkunftFileMutationResponseModelSelector, builder) }
  insert_herkunft_file_one(builder) { return this.__child(`insert_herkunft_file_one`, HerkunftFileModelSelector, builder) }
  insert_herkunft_one(builder) { return this.__child(`insert_herkunft_one`, HerkunftModelSelector, builder) }
  insert_herkunft_rev(builder) { return this.__child(`insert_herkunft_rev`, HerkunftRevMutationResponseModelSelector, builder) }
  insert_herkunft_rev_one(builder) { return this.__child(`insert_herkunft_rev_one`, HerkunftRevModelSelector, builder) }
  insert_kultur(builder) { return this.__child(`insert_kultur`, KulturMutationResponseModelSelector, builder) }
  insert_kultur_file(builder) { return this.__child(`insert_kultur_file`, KulturFileMutationResponseModelSelector, builder) }
  insert_kultur_file_one(builder) { return this.__child(`insert_kultur_file_one`, KulturFileModelSelector, builder) }
  insert_kultur_one(builder) { return this.__child(`insert_kultur_one`, KulturModelSelector, builder) }
  insert_kultur_option(builder) { return this.__child(`insert_kultur_option`, KulturOptionMutationResponseModelSelector, builder) }
  insert_kultur_option_one(builder) { return this.__child(`insert_kultur_option_one`, KulturOptionModelSelector, builder) }
  insert_kultur_option_rev(builder) { return this.__child(`insert_kultur_option_rev`, KulturOptionRevMutationResponseModelSelector, builder) }
  insert_kultur_option_rev_one(builder) { return this.__child(`insert_kultur_option_rev_one`, KulturOptionRevModelSelector, builder) }
  insert_kultur_qk(builder) { return this.__child(`insert_kultur_qk`, KulturQkMutationResponseModelSelector, builder) }
  insert_kultur_qk_choosen(builder) { return this.__child(`insert_kultur_qk_choosen`, KulturQkChoosenMutationResponseModelSelector, builder) }
  insert_kultur_qk_choosen_one(builder) { return this.__child(`insert_kultur_qk_choosen_one`, KulturQkChoosenModelSelector, builder) }
  insert_kultur_qk_one(builder) { return this.__child(`insert_kultur_qk_one`, KulturQkModelSelector, builder) }
  insert_kultur_rev(builder) { return this.__child(`insert_kultur_rev`, KulturRevMutationResponseModelSelector, builder) }
  insert_kultur_rev_one(builder) { return this.__child(`insert_kultur_rev_one`, KulturRevModelSelector, builder) }
  insert_lieferung(builder) { return this.__child(`insert_lieferung`, LieferungMutationResponseModelSelector, builder) }
  insert_lieferung_file(builder) { return this.__child(`insert_lieferung_file`, LieferungFileMutationResponseModelSelector, builder) }
  insert_lieferung_file_one(builder) { return this.__child(`insert_lieferung_file_one`, LieferungFileModelSelector, builder) }
  insert_lieferung_one(builder) { return this.__child(`insert_lieferung_one`, LieferungModelSelector, builder) }
  insert_lieferung_rev(builder) { return this.__child(`insert_lieferung_rev`, LieferungRevMutationResponseModelSelector, builder) }
  insert_lieferung_rev_one(builder) { return this.__child(`insert_lieferung_rev_one`, LieferungRevModelSelector, builder) }
  insert_person(builder) { return this.__child(`insert_person`, PersonMutationResponseModelSelector, builder) }
  insert_person_file(builder) { return this.__child(`insert_person_file`, PersonFileMutationResponseModelSelector, builder) }
  insert_person_file_one(builder) { return this.__child(`insert_person_file_one`, PersonFileModelSelector, builder) }
  insert_person_one(builder) { return this.__child(`insert_person_one`, PersonModelSelector, builder) }
  insert_person_option(builder) { return this.__child(`insert_person_option`, PersonOptionMutationResponseModelSelector, builder) }
  insert_person_option_one(builder) { return this.__child(`insert_person_option_one`, PersonOptionModelSelector, builder) }
  insert_person_option_rev(builder) { return this.__child(`insert_person_option_rev`, PersonOptionRevMutationResponseModelSelector, builder) }
  insert_person_option_rev_one(builder) { return this.__child(`insert_person_option_rev_one`, PersonOptionRevModelSelector, builder) }
  insert_person_rev(builder) { return this.__child(`insert_person_rev`, PersonRevMutationResponseModelSelector, builder) }
  insert_person_rev_one(builder) { return this.__child(`insert_person_rev_one`, PersonRevModelSelector, builder) }
  insert_sammel_lieferung(builder) { return this.__child(`insert_sammel_lieferung`, SammelLieferungMutationResponseModelSelector, builder) }
  insert_sammel_lieferung_one(builder) { return this.__child(`insert_sammel_lieferung_one`, SammelLieferungModelSelector, builder) }
  insert_sammel_lieferung_rev(builder) { return this.__child(`insert_sammel_lieferung_rev`, SammelLieferungRevMutationResponseModelSelector, builder) }
  insert_sammel_lieferung_rev_one(builder) { return this.__child(`insert_sammel_lieferung_rev_one`, SammelLieferungRevModelSelector, builder) }
  insert_sammlung(builder) { return this.__child(`insert_sammlung`, SammlungMutationResponseModelSelector, builder) }
  insert_sammlung_file(builder) { return this.__child(`insert_sammlung_file`, SammlungFileMutationResponseModelSelector, builder) }
  insert_sammlung_file_one(builder) { return this.__child(`insert_sammlung_file_one`, SammlungFileModelSelector, builder) }
  insert_sammlung_one(builder) { return this.__child(`insert_sammlung_one`, SammlungModelSelector, builder) }
  insert_sammlung_rev(builder) { return this.__child(`insert_sammlung_rev`, SammlungRevMutationResponseModelSelector, builder) }
  insert_sammlung_rev_one(builder) { return this.__child(`insert_sammlung_rev_one`, SammlungRevModelSelector, builder) }
  insert_spatial_ref_sys(builder) { return this.__child(`insert_spatial_ref_sys`, SpatialRefSysMutationResponseModelSelector, builder) }
  insert_spatial_ref_sys_one(builder) { return this.__child(`insert_spatial_ref_sys_one`, SpatialRefSysModelSelector, builder) }
  insert_teilkultur(builder) { return this.__child(`insert_teilkultur`, TeilkulturMutationResponseModelSelector, builder) }
  insert_teilkultur_one(builder) { return this.__child(`insert_teilkultur_one`, TeilkulturModelSelector, builder) }
  insert_teilkultur_rev(builder) { return this.__child(`insert_teilkultur_rev`, TeilkulturRevMutationResponseModelSelector, builder) }
  insert_teilkultur_rev_one(builder) { return this.__child(`insert_teilkultur_rev_one`, TeilkulturRevModelSelector, builder) }
  insert_teilzaehlung(builder) { return this.__child(`insert_teilzaehlung`, TeilzaehlungMutationResponseModelSelector, builder) }
  insert_teilzaehlung_one(builder) { return this.__child(`insert_teilzaehlung_one`, TeilzaehlungModelSelector, builder) }
  insert_teilzaehlung_rev(builder) { return this.__child(`insert_teilzaehlung_rev`, TeilzaehlungRevMutationResponseModelSelector, builder) }
  insert_teilzaehlung_rev_one(builder) { return this.__child(`insert_teilzaehlung_rev_one`, TeilzaehlungRevModelSelector, builder) }
  insert_user_role(builder) { return this.__child(`insert_user_role`, UserRoleMutationResponseModelSelector, builder) }
  insert_user_role_one(builder) { return this.__child(`insert_user_role_one`, UserRoleModelSelector, builder) }
  insert_zaehlung(builder) { return this.__child(`insert_zaehlung`, ZaehlungMutationResponseModelSelector, builder) }
  insert_zaehlung_one(builder) { return this.__child(`insert_zaehlung_one`, ZaehlungModelSelector, builder) }
  insert_zaehlung_rev(builder) { return this.__child(`insert_zaehlung_rev`, ZaehlungRevMutationResponseModelSelector, builder) }
  insert_zaehlung_rev_one(builder) { return this.__child(`insert_zaehlung_rev_one`, ZaehlungRevModelSelector, builder) }
  update_ae_art(builder) { return this.__child(`update_ae_art`, AeArtMutationResponseModelSelector, builder) }
  update_art(builder) { return this.__child(`update_art`, ArtMutationResponseModelSelector, builder) }
  update_art_by_pk(builder) { return this.__child(`update_art_by_pk`, ArtModelSelector, builder) }
  update_art_file(builder) { return this.__child(`update_art_file`, ArtFileMutationResponseModelSelector, builder) }
  update_art_file_by_pk(builder) { return this.__child(`update_art_file_by_pk`, ArtFileModelSelector, builder) }
  update_art_qk(builder) { return this.__child(`update_art_qk`, ArtQkMutationResponseModelSelector, builder) }
  update_art_qk_by_pk(builder) { return this.__child(`update_art_qk_by_pk`, ArtQkModelSelector, builder) }
  update_art_qk_choosen(builder) { return this.__child(`update_art_qk_choosen`, ArtQkChoosenMutationResponseModelSelector, builder) }
  update_art_rev(builder) { return this.__child(`update_art_rev`, ArtRevMutationResponseModelSelector, builder) }
  update_art_rev_by_pk(builder) { return this.__child(`update_art_rev_by_pk`, ArtRevModelSelector, builder) }
  update_av_art(builder) { return this.__child(`update_av_art`, AvArtMutationResponseModelSelector, builder) }
  update_av_art_by_pk(builder) { return this.__child(`update_av_art_by_pk`, AvArtModelSelector, builder) }
  update_event(builder) { return this.__child(`update_event`, EventMutationResponseModelSelector, builder) }
  update_event_by_pk(builder) { return this.__child(`update_event_by_pk`, EventModelSelector, builder) }
  update_event_rev(builder) { return this.__child(`update_event_rev`, EventRevMutationResponseModelSelector, builder) }
  update_event_rev_by_pk(builder) { return this.__child(`update_event_rev_by_pk`, EventRevModelSelector, builder) }
  update_garten(builder) { return this.__child(`update_garten`, GartenMutationResponseModelSelector, builder) }
  update_garten_by_pk(builder) { return this.__child(`update_garten_by_pk`, GartenModelSelector, builder) }
  update_garten_file(builder) { return this.__child(`update_garten_file`, GartenFileMutationResponseModelSelector, builder) }
  update_garten_file_by_pk(builder) { return this.__child(`update_garten_file_by_pk`, GartenFileModelSelector, builder) }
  update_garten_rev(builder) { return this.__child(`update_garten_rev`, GartenRevMutationResponseModelSelector, builder) }
  update_garten_rev_by_pk(builder) { return this.__child(`update_garten_rev_by_pk`, GartenRevModelSelector, builder) }
  update_herkunft(builder) { return this.__child(`update_herkunft`, HerkunftMutationResponseModelSelector, builder) }
  update_herkunft_by_pk(builder) { return this.__child(`update_herkunft_by_pk`, HerkunftModelSelector, builder) }
  update_herkunft_file(builder) { return this.__child(`update_herkunft_file`, HerkunftFileMutationResponseModelSelector, builder) }
  update_herkunft_file_by_pk(builder) { return this.__child(`update_herkunft_file_by_pk`, HerkunftFileModelSelector, builder) }
  update_herkunft_rev(builder) { return this.__child(`update_herkunft_rev`, HerkunftRevMutationResponseModelSelector, builder) }
  update_herkunft_rev_by_pk(builder) { return this.__child(`update_herkunft_rev_by_pk`, HerkunftRevModelSelector, builder) }
  update_kultur(builder) { return this.__child(`update_kultur`, KulturMutationResponseModelSelector, builder) }
  update_kultur_by_pk(builder) { return this.__child(`update_kultur_by_pk`, KulturModelSelector, builder) }
  update_kultur_file(builder) { return this.__child(`update_kultur_file`, KulturFileMutationResponseModelSelector, builder) }
  update_kultur_file_by_pk(builder) { return this.__child(`update_kultur_file_by_pk`, KulturFileModelSelector, builder) }
  update_kultur_option(builder) { return this.__child(`update_kultur_option`, KulturOptionMutationResponseModelSelector, builder) }
  update_kultur_option_rev(builder) { return this.__child(`update_kultur_option_rev`, KulturOptionRevMutationResponseModelSelector, builder) }
  update_kultur_option_rev_by_pk(builder) { return this.__child(`update_kultur_option_rev_by_pk`, KulturOptionRevModelSelector, builder) }
  update_kultur_qk(builder) { return this.__child(`update_kultur_qk`, KulturQkMutationResponseModelSelector, builder) }
  update_kultur_qk_by_pk(builder) { return this.__child(`update_kultur_qk_by_pk`, KulturQkModelSelector, builder) }
  update_kultur_qk_choosen(builder) { return this.__child(`update_kultur_qk_choosen`, KulturQkChoosenMutationResponseModelSelector, builder) }
  update_kultur_rev(builder) { return this.__child(`update_kultur_rev`, KulturRevMutationResponseModelSelector, builder) }
  update_kultur_rev_by_pk(builder) { return this.__child(`update_kultur_rev_by_pk`, KulturRevModelSelector, builder) }
  update_lieferung(builder) { return this.__child(`update_lieferung`, LieferungMutationResponseModelSelector, builder) }
  update_lieferung_by_pk(builder) { return this.__child(`update_lieferung_by_pk`, LieferungModelSelector, builder) }
  update_lieferung_file(builder) { return this.__child(`update_lieferung_file`, LieferungFileMutationResponseModelSelector, builder) }
  update_lieferung_file_by_pk(builder) { return this.__child(`update_lieferung_file_by_pk`, LieferungFileModelSelector, builder) }
  update_lieferung_rev(builder) { return this.__child(`update_lieferung_rev`, LieferungRevMutationResponseModelSelector, builder) }
  update_lieferung_rev_by_pk(builder) { return this.__child(`update_lieferung_rev_by_pk`, LieferungRevModelSelector, builder) }
  update_person(builder) { return this.__child(`update_person`, PersonMutationResponseModelSelector, builder) }
  update_person_by_pk(builder) { return this.__child(`update_person_by_pk`, PersonModelSelector, builder) }
  update_person_file(builder) { return this.__child(`update_person_file`, PersonFileMutationResponseModelSelector, builder) }
  update_person_file_by_pk(builder) { return this.__child(`update_person_file_by_pk`, PersonFileModelSelector, builder) }
  update_person_option(builder) { return this.__child(`update_person_option`, PersonOptionMutationResponseModelSelector, builder) }
  update_person_option_rev(builder) { return this.__child(`update_person_option_rev`, PersonOptionRevMutationResponseModelSelector, builder) }
  update_person_option_rev_by_pk(builder) { return this.__child(`update_person_option_rev_by_pk`, PersonOptionRevModelSelector, builder) }
  update_person_rev(builder) { return this.__child(`update_person_rev`, PersonRevMutationResponseModelSelector, builder) }
  update_person_rev_by_pk(builder) { return this.__child(`update_person_rev_by_pk`, PersonRevModelSelector, builder) }
  update_sammel_lieferung(builder) { return this.__child(`update_sammel_lieferung`, SammelLieferungMutationResponseModelSelector, builder) }
  update_sammel_lieferung_by_pk(builder) { return this.__child(`update_sammel_lieferung_by_pk`, SammelLieferungModelSelector, builder) }
  update_sammel_lieferung_rev(builder) { return this.__child(`update_sammel_lieferung_rev`, SammelLieferungRevMutationResponseModelSelector, builder) }
  update_sammel_lieferung_rev_by_pk(builder) { return this.__child(`update_sammel_lieferung_rev_by_pk`, SammelLieferungRevModelSelector, builder) }
  update_sammlung(builder) { return this.__child(`update_sammlung`, SammlungMutationResponseModelSelector, builder) }
  update_sammlung_by_pk(builder) { return this.__child(`update_sammlung_by_pk`, SammlungModelSelector, builder) }
  update_sammlung_file(builder) { return this.__child(`update_sammlung_file`, SammlungFileMutationResponseModelSelector, builder) }
  update_sammlung_file_by_pk(builder) { return this.__child(`update_sammlung_file_by_pk`, SammlungFileModelSelector, builder) }
  update_sammlung_rev(builder) { return this.__child(`update_sammlung_rev`, SammlungRevMutationResponseModelSelector, builder) }
  update_sammlung_rev_by_pk(builder) { return this.__child(`update_sammlung_rev_by_pk`, SammlungRevModelSelector, builder) }
  update_spatial_ref_sys(builder) { return this.__child(`update_spatial_ref_sys`, SpatialRefSysMutationResponseModelSelector, builder) }
  update_spatial_ref_sys_by_pk(builder) { return this.__child(`update_spatial_ref_sys_by_pk`, SpatialRefSysModelSelector, builder) }
  update_teilkultur(builder) { return this.__child(`update_teilkultur`, TeilkulturMutationResponseModelSelector, builder) }
  update_teilkultur_by_pk(builder) { return this.__child(`update_teilkultur_by_pk`, TeilkulturModelSelector, builder) }
  update_teilkultur_rev(builder) { return this.__child(`update_teilkultur_rev`, TeilkulturRevMutationResponseModelSelector, builder) }
  update_teilkultur_rev_by_pk(builder) { return this.__child(`update_teilkultur_rev_by_pk`, TeilkulturRevModelSelector, builder) }
  update_teilzaehlung(builder) { return this.__child(`update_teilzaehlung`, TeilzaehlungMutationResponseModelSelector, builder) }
  update_teilzaehlung_by_pk(builder) { return this.__child(`update_teilzaehlung_by_pk`, TeilzaehlungModelSelector, builder) }
  update_teilzaehlung_rev(builder) { return this.__child(`update_teilzaehlung_rev`, TeilzaehlungRevMutationResponseModelSelector, builder) }
  update_teilzaehlung_rev_by_pk(builder) { return this.__child(`update_teilzaehlung_rev_by_pk`, TeilzaehlungRevModelSelector, builder) }
  update_user_role(builder) { return this.__child(`update_user_role`, UserRoleMutationResponseModelSelector, builder) }
  update_user_role_by_pk(builder) { return this.__child(`update_user_role_by_pk`, UserRoleModelSelector, builder) }
  update_zaehlung(builder) { return this.__child(`update_zaehlung`, ZaehlungMutationResponseModelSelector, builder) }
  update_zaehlung_by_pk(builder) { return this.__child(`update_zaehlung_by_pk`, ZaehlungModelSelector, builder) }
  update_zaehlung_rev(builder) { return this.__child(`update_zaehlung_rev`, ZaehlungRevMutationResponseModelSelector, builder) }
  update_zaehlung_rev_by_pk(builder) { return this.__child(`update_zaehlung_rev_by_pk`, ZaehlungRevModelSelector, builder) }
}
export function selectFromMutationRoot() {
  return new MutationRootModelSelector()
}

export const mutationRootModelPrimitives = selectFromMutationRoot()
