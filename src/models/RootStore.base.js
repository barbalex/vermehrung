/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"

import { QueryRootModel } from "./QueryRootModel"
import { queryRootModelPrimitives, QueryRootModelSelector } from "./QueryRootModel.base"
import { AeArtModel } from "./AeArtModel"
import { aeArtModelPrimitives, AeArtModelSelector } from "./AeArtModel.base"
import { ArtModel } from "./ArtModel"
import { artModelPrimitives, ArtModelSelector } from "./ArtModel.base"
import { ArtFileModel } from "./ArtFileModel"
import { artFileModelPrimitives, ArtFileModelSelector } from "./ArtFileModel.base"
import { ArtFileAggregateModel } from "./ArtFileAggregateModel"
import { artFileAggregateModelPrimitives, ArtFileAggregateModelSelector } from "./ArtFileAggregateModel.base"
import { ArtFileAggregateFieldsModel } from "./ArtFileAggregateFieldsModel"
import { artFileAggregateFieldsModelPrimitives, ArtFileAggregateFieldsModelSelector } from "./ArtFileAggregateFieldsModel.base"
import { ArtFileMaxFieldsModel } from "./ArtFileMaxFieldsModel"
import { artFileMaxFieldsModelPrimitives, ArtFileMaxFieldsModelSelector } from "./ArtFileMaxFieldsModel.base"
import { ArtFileMinFieldsModel } from "./ArtFileMinFieldsModel"
import { artFileMinFieldsModelPrimitives, ArtFileMinFieldsModelSelector } from "./ArtFileMinFieldsModel.base"
import { ArtQkChoosenModel } from "./ArtQkChoosenModel"
import { artQkChoosenModelPrimitives, ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"
import { ArtQkModel } from "./ArtQkModel"
import { artQkModelPrimitives, ArtQkModelSelector } from "./ArtQkModel.base"
import { ArtQkChoosenAggregateModel } from "./ArtQkChoosenAggregateModel"
import { artQkChoosenAggregateModelPrimitives, ArtQkChoosenAggregateModelSelector } from "./ArtQkChoosenAggregateModel.base"
import { ArtQkChoosenAggregateFieldsModel } from "./ArtQkChoosenAggregateFieldsModel"
import { artQkChoosenAggregateFieldsModelPrimitives, ArtQkChoosenAggregateFieldsModelSelector } from "./ArtQkChoosenAggregateFieldsModel.base"
import { ArtQkChoosenMaxFieldsModel } from "./ArtQkChoosenMaxFieldsModel"
import { artQkChoosenMaxFieldsModelPrimitives, ArtQkChoosenMaxFieldsModelSelector } from "./ArtQkChoosenMaxFieldsModel.base"
import { ArtQkChoosenMinFieldsModel } from "./ArtQkChoosenMinFieldsModel"
import { artQkChoosenMinFieldsModelPrimitives, ArtQkChoosenMinFieldsModelSelector } from "./ArtQkChoosenMinFieldsModel.base"
import { ArtSumsModel } from "./ArtSumsModel"
import { artSumsModelPrimitives, ArtSumsModelSelector } from "./ArtSumsModel.base"
import { AvArtModel } from "./AvArtModel"
import { avArtModelPrimitives, AvArtModelSelector } from "./AvArtModel.base"
import { ArtSumsAggregateModel } from "./ArtSumsAggregateModel"
import { artSumsAggregateModelPrimitives, ArtSumsAggregateModelSelector } from "./ArtSumsAggregateModel.base"
import { ArtSumsAggregateFieldsModel } from "./ArtSumsAggregateFieldsModel"
import { artSumsAggregateFieldsModelPrimitives, ArtSumsAggregateFieldsModelSelector } from "./ArtSumsAggregateFieldsModel.base"
import { ArtSumsAvgFieldsModel } from "./ArtSumsAvgFieldsModel"
import { artSumsAvgFieldsModelPrimitives, ArtSumsAvgFieldsModelSelector } from "./ArtSumsAvgFieldsModel.base"
import { ArtSumsMaxFieldsModel } from "./ArtSumsMaxFieldsModel"
import { artSumsMaxFieldsModelPrimitives, ArtSumsMaxFieldsModelSelector } from "./ArtSumsMaxFieldsModel.base"
import { ArtSumsMinFieldsModel } from "./ArtSumsMinFieldsModel"
import { artSumsMinFieldsModelPrimitives, ArtSumsMinFieldsModelSelector } from "./ArtSumsMinFieldsModel.base"
import { ArtSumsStddevFieldsModel } from "./ArtSumsStddevFieldsModel"
import { artSumsStddevFieldsModelPrimitives, ArtSumsStddevFieldsModelSelector } from "./ArtSumsStddevFieldsModel.base"
import { ArtSumsStddevPopFieldsModel } from "./ArtSumsStddevPopFieldsModel"
import { artSumsStddevPopFieldsModelPrimitives, ArtSumsStddevPopFieldsModelSelector } from "./ArtSumsStddevPopFieldsModel.base"
import { ArtSumsStddevSampFieldsModel } from "./ArtSumsStddevSampFieldsModel"
import { artSumsStddevSampFieldsModelPrimitives, ArtSumsStddevSampFieldsModelSelector } from "./ArtSumsStddevSampFieldsModel.base"
import { ArtSumsSumFieldsModel } from "./ArtSumsSumFieldsModel"
import { artSumsSumFieldsModelPrimitives, ArtSumsSumFieldsModelSelector } from "./ArtSumsSumFieldsModel.base"
import { ArtSumsVarPopFieldsModel } from "./ArtSumsVarPopFieldsModel"
import { artSumsVarPopFieldsModelPrimitives, ArtSumsVarPopFieldsModelSelector } from "./ArtSumsVarPopFieldsModel.base"
import { ArtSumsVarSampFieldsModel } from "./ArtSumsVarSampFieldsModel"
import { artSumsVarSampFieldsModelPrimitives, ArtSumsVarSampFieldsModelSelector } from "./ArtSumsVarSampFieldsModel.base"
import { ArtSumsVarianceFieldsModel } from "./ArtSumsVarianceFieldsModel"
import { artSumsVarianceFieldsModelPrimitives, ArtSumsVarianceFieldsModelSelector } from "./ArtSumsVarianceFieldsModel.base"
import { PersonModel } from "./PersonModel"
import { personModelPrimitives, PersonModelSelector } from "./PersonModel.base"
import { AvArtAggregateModel } from "./AvArtAggregateModel"
import { avArtAggregateModelPrimitives, AvArtAggregateModelSelector } from "./AvArtAggregateModel.base"
import { AvArtAggregateFieldsModel } from "./AvArtAggregateFieldsModel"
import { avArtAggregateFieldsModelPrimitives, AvArtAggregateFieldsModelSelector } from "./AvArtAggregateFieldsModel.base"
import { AvArtMaxFieldsModel } from "./AvArtMaxFieldsModel"
import { avArtMaxFieldsModelPrimitives, AvArtMaxFieldsModelSelector } from "./AvArtMaxFieldsModel.base"
import { AvArtMinFieldsModel } from "./AvArtMinFieldsModel"
import { avArtMinFieldsModelPrimitives, AvArtMinFieldsModelSelector } from "./AvArtMinFieldsModel.base"
import { EventModel } from "./EventModel"
import { eventModelPrimitives, EventModelSelector } from "./EventModel.base"
import { KulturModel } from "./KulturModel"
import { kulturModelPrimitives, KulturModelSelector } from "./KulturModel.base"
import { EventAggregateModel } from "./EventAggregateModel"
import { eventAggregateModelPrimitives, EventAggregateModelSelector } from "./EventAggregateModel.base"
import { EventAggregateFieldsModel } from "./EventAggregateFieldsModel"
import { eventAggregateFieldsModelPrimitives, EventAggregateFieldsModelSelector } from "./EventAggregateFieldsModel.base"
import { EventAvgFieldsModel } from "./EventAvgFieldsModel"
import { eventAvgFieldsModelPrimitives, EventAvgFieldsModelSelector } from "./EventAvgFieldsModel.base"
import { EventMaxFieldsModel } from "./EventMaxFieldsModel"
import { eventMaxFieldsModelPrimitives, EventMaxFieldsModelSelector } from "./EventMaxFieldsModel.base"
import { EventMinFieldsModel } from "./EventMinFieldsModel"
import { eventMinFieldsModelPrimitives, EventMinFieldsModelSelector } from "./EventMinFieldsModel.base"
import { EventStddevFieldsModel } from "./EventStddevFieldsModel"
import { eventStddevFieldsModelPrimitives, EventStddevFieldsModelSelector } from "./EventStddevFieldsModel.base"
import { EventStddevPopFieldsModel } from "./EventStddevPopFieldsModel"
import { eventStddevPopFieldsModelPrimitives, EventStddevPopFieldsModelSelector } from "./EventStddevPopFieldsModel.base"
import { EventStddevSampFieldsModel } from "./EventStddevSampFieldsModel"
import { eventStddevSampFieldsModelPrimitives, EventStddevSampFieldsModelSelector } from "./EventStddevSampFieldsModel.base"
import { EventSumFieldsModel } from "./EventSumFieldsModel"
import { eventSumFieldsModelPrimitives, EventSumFieldsModelSelector } from "./EventSumFieldsModel.base"
import { EventVarPopFieldsModel } from "./EventVarPopFieldsModel"
import { eventVarPopFieldsModelPrimitives, EventVarPopFieldsModelSelector } from "./EventVarPopFieldsModel.base"
import { EventVarSampFieldsModel } from "./EventVarSampFieldsModel"
import { eventVarSampFieldsModelPrimitives, EventVarSampFieldsModelSelector } from "./EventVarSampFieldsModel.base"
import { EventVarianceFieldsModel } from "./EventVarianceFieldsModel"
import { eventVarianceFieldsModelPrimitives, EventVarianceFieldsModelSelector } from "./EventVarianceFieldsModel.base"
import { GartenModel } from "./GartenModel"
import { gartenModelPrimitives, GartenModelSelector } from "./GartenModel.base"
import { GartenFileModel } from "./GartenFileModel"
import { gartenFileModelPrimitives, GartenFileModelSelector } from "./GartenFileModel.base"
import { GartenFileAggregateModel } from "./GartenFileAggregateModel"
import { gartenFileAggregateModelPrimitives, GartenFileAggregateModelSelector } from "./GartenFileAggregateModel.base"
import { GartenFileAggregateFieldsModel } from "./GartenFileAggregateFieldsModel"
import { gartenFileAggregateFieldsModelPrimitives, GartenFileAggregateFieldsModelSelector } from "./GartenFileAggregateFieldsModel.base"
import { GartenFileMaxFieldsModel } from "./GartenFileMaxFieldsModel"
import { gartenFileMaxFieldsModelPrimitives, GartenFileMaxFieldsModelSelector } from "./GartenFileMaxFieldsModel.base"
import { GartenFileMinFieldsModel } from "./GartenFileMinFieldsModel"
import { gartenFileMinFieldsModelPrimitives, GartenFileMinFieldsModelSelector } from "./GartenFileMinFieldsModel.base"
import { KulturAggregateModel } from "./KulturAggregateModel"
import { kulturAggregateModelPrimitives, KulturAggregateModelSelector } from "./KulturAggregateModel.base"
import { KulturAggregateFieldsModel } from "./KulturAggregateFieldsModel"
import { kulturAggregateFieldsModelPrimitives, KulturAggregateFieldsModelSelector } from "./KulturAggregateFieldsModel.base"
import { KulturAvgFieldsModel } from "./KulturAvgFieldsModel"
import { kulturAvgFieldsModelPrimitives, KulturAvgFieldsModelSelector } from "./KulturAvgFieldsModel.base"
import { KulturMaxFieldsModel } from "./KulturMaxFieldsModel"
import { kulturMaxFieldsModelPrimitives, KulturMaxFieldsModelSelector } from "./KulturMaxFieldsModel.base"
import { KulturMinFieldsModel } from "./KulturMinFieldsModel"
import { kulturMinFieldsModelPrimitives, KulturMinFieldsModelSelector } from "./KulturMinFieldsModel.base"
import { KulturStddevFieldsModel } from "./KulturStddevFieldsModel"
import { kulturStddevFieldsModelPrimitives, KulturStddevFieldsModelSelector } from "./KulturStddevFieldsModel.base"
import { KulturStddevPopFieldsModel } from "./KulturStddevPopFieldsModel"
import { kulturStddevPopFieldsModelPrimitives, KulturStddevPopFieldsModelSelector } from "./KulturStddevPopFieldsModel.base"
import { KulturStddevSampFieldsModel } from "./KulturStddevSampFieldsModel"
import { kulturStddevSampFieldsModelPrimitives, KulturStddevSampFieldsModelSelector } from "./KulturStddevSampFieldsModel.base"
import { KulturSumFieldsModel } from "./KulturSumFieldsModel"
import { kulturSumFieldsModelPrimitives, KulturSumFieldsModelSelector } from "./KulturSumFieldsModel.base"
import { KulturVarPopFieldsModel } from "./KulturVarPopFieldsModel"
import { kulturVarPopFieldsModelPrimitives, KulturVarPopFieldsModelSelector } from "./KulturVarPopFieldsModel.base"
import { KulturVarSampFieldsModel } from "./KulturVarSampFieldsModel"
import { kulturVarSampFieldsModelPrimitives, KulturVarSampFieldsModelSelector } from "./KulturVarSampFieldsModel.base"
import { KulturVarianceFieldsModel } from "./KulturVarianceFieldsModel"
import { kulturVarianceFieldsModelPrimitives, KulturVarianceFieldsModelSelector } from "./KulturVarianceFieldsModel.base"
import { GartenTeilzaehlungSumsModel } from "./GartenTeilzaehlungSumsModel"
import { gartenTeilzaehlungSumsModelPrimitives, GartenTeilzaehlungSumsModelSelector } from "./GartenTeilzaehlungSumsModel.base"
import { GartenTeilzaehlungSumsAggregateModel } from "./GartenTeilzaehlungSumsAggregateModel"
import { gartenTeilzaehlungSumsAggregateModelPrimitives, GartenTeilzaehlungSumsAggregateModelSelector } from "./GartenTeilzaehlungSumsAggregateModel.base"
import { GartenTeilzaehlungSumsAggregateFieldsModel } from "./GartenTeilzaehlungSumsAggregateFieldsModel"
import { gartenTeilzaehlungSumsAggregateFieldsModelPrimitives, GartenTeilzaehlungSumsAggregateFieldsModelSelector } from "./GartenTeilzaehlungSumsAggregateFieldsModel.base"
import { GartenTeilzaehlungSumsAvgFieldsModel } from "./GartenTeilzaehlungSumsAvgFieldsModel"
import { gartenTeilzaehlungSumsAvgFieldsModelPrimitives, GartenTeilzaehlungSumsAvgFieldsModelSelector } from "./GartenTeilzaehlungSumsAvgFieldsModel.base"
import { GartenTeilzaehlungSumsMaxFieldsModel } from "./GartenTeilzaehlungSumsMaxFieldsModel"
import { gartenTeilzaehlungSumsMaxFieldsModelPrimitives, GartenTeilzaehlungSumsMaxFieldsModelSelector } from "./GartenTeilzaehlungSumsMaxFieldsModel.base"
import { GartenTeilzaehlungSumsMinFieldsModel } from "./GartenTeilzaehlungSumsMinFieldsModel"
import { gartenTeilzaehlungSumsMinFieldsModelPrimitives, GartenTeilzaehlungSumsMinFieldsModelSelector } from "./GartenTeilzaehlungSumsMinFieldsModel.base"
import { GartenTeilzaehlungSumsStddevFieldsModel } from "./GartenTeilzaehlungSumsStddevFieldsModel"
import { gartenTeilzaehlungSumsStddevFieldsModelPrimitives, GartenTeilzaehlungSumsStddevFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevFieldsModel.base"
import { GartenTeilzaehlungSumsStddevPopFieldsModel } from "./GartenTeilzaehlungSumsStddevPopFieldsModel"
import { gartenTeilzaehlungSumsStddevPopFieldsModelPrimitives, GartenTeilzaehlungSumsStddevPopFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevPopFieldsModel.base"
import { GartenTeilzaehlungSumsStddevSampFieldsModel } from "./GartenTeilzaehlungSumsStddevSampFieldsModel"
import { gartenTeilzaehlungSumsStddevSampFieldsModelPrimitives, GartenTeilzaehlungSumsStddevSampFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevSampFieldsModel.base"
import { GartenTeilzaehlungSumsSumFieldsModel } from "./GartenTeilzaehlungSumsSumFieldsModel"
import { gartenTeilzaehlungSumsSumFieldsModelPrimitives, GartenTeilzaehlungSumsSumFieldsModelSelector } from "./GartenTeilzaehlungSumsSumFieldsModel.base"
import { GartenTeilzaehlungSumsVarPopFieldsModel } from "./GartenTeilzaehlungSumsVarPopFieldsModel"
import { gartenTeilzaehlungSumsVarPopFieldsModelPrimitives, GartenTeilzaehlungSumsVarPopFieldsModelSelector } from "./GartenTeilzaehlungSumsVarPopFieldsModel.base"
import { GartenTeilzaehlungSumsVarSampFieldsModel } from "./GartenTeilzaehlungSumsVarSampFieldsModel"
import { gartenTeilzaehlungSumsVarSampFieldsModelPrimitives, GartenTeilzaehlungSumsVarSampFieldsModelSelector } from "./GartenTeilzaehlungSumsVarSampFieldsModel.base"
import { GartenTeilzaehlungSumsVarianceFieldsModel } from "./GartenTeilzaehlungSumsVarianceFieldsModel"
import { gartenTeilzaehlungSumsVarianceFieldsModelPrimitives, GartenTeilzaehlungSumsVarianceFieldsModelSelector } from "./GartenTeilzaehlungSumsVarianceFieldsModel.base"
import { HerkunftModel } from "./HerkunftModel"
import { herkunftModelPrimitives, HerkunftModelSelector } from "./HerkunftModel.base"
import { HerkunftFileModel } from "./HerkunftFileModel"
import { herkunftFileModelPrimitives, HerkunftFileModelSelector } from "./HerkunftFileModel.base"
import { HerkunftFileAggregateModel } from "./HerkunftFileAggregateModel"
import { herkunftFileAggregateModelPrimitives, HerkunftFileAggregateModelSelector } from "./HerkunftFileAggregateModel.base"
import { HerkunftFileAggregateFieldsModel } from "./HerkunftFileAggregateFieldsModel"
import { herkunftFileAggregateFieldsModelPrimitives, HerkunftFileAggregateFieldsModelSelector } from "./HerkunftFileAggregateFieldsModel.base"
import { HerkunftFileMaxFieldsModel } from "./HerkunftFileMaxFieldsModel"
import { herkunftFileMaxFieldsModelPrimitives, HerkunftFileMaxFieldsModelSelector } from "./HerkunftFileMaxFieldsModel.base"
import { HerkunftFileMinFieldsModel } from "./HerkunftFileMinFieldsModel"
import { herkunftFileMinFieldsModelPrimitives, HerkunftFileMinFieldsModelSelector } from "./HerkunftFileMinFieldsModel.base"
import { HerkunftSumsModel } from "./HerkunftSumsModel"
import { herkunftSumsModelPrimitives, HerkunftSumsModelSelector } from "./HerkunftSumsModel.base"
import { HerkunftSumsAggregateModel } from "./HerkunftSumsAggregateModel"
import { herkunftSumsAggregateModelPrimitives, HerkunftSumsAggregateModelSelector } from "./HerkunftSumsAggregateModel.base"
import { HerkunftSumsAggregateFieldsModel } from "./HerkunftSumsAggregateFieldsModel"
import { herkunftSumsAggregateFieldsModelPrimitives, HerkunftSumsAggregateFieldsModelSelector } from "./HerkunftSumsAggregateFieldsModel.base"
import { HerkunftSumsAvgFieldsModel } from "./HerkunftSumsAvgFieldsModel"
import { herkunftSumsAvgFieldsModelPrimitives, HerkunftSumsAvgFieldsModelSelector } from "./HerkunftSumsAvgFieldsModel.base"
import { HerkunftSumsMaxFieldsModel } from "./HerkunftSumsMaxFieldsModel"
import { herkunftSumsMaxFieldsModelPrimitives, HerkunftSumsMaxFieldsModelSelector } from "./HerkunftSumsMaxFieldsModel.base"
import { HerkunftSumsMinFieldsModel } from "./HerkunftSumsMinFieldsModel"
import { herkunftSumsMinFieldsModelPrimitives, HerkunftSumsMinFieldsModelSelector } from "./HerkunftSumsMinFieldsModel.base"
import { HerkunftSumsStddevFieldsModel } from "./HerkunftSumsStddevFieldsModel"
import { herkunftSumsStddevFieldsModelPrimitives, HerkunftSumsStddevFieldsModelSelector } from "./HerkunftSumsStddevFieldsModel.base"
import { HerkunftSumsStddevPopFieldsModel } from "./HerkunftSumsStddevPopFieldsModel"
import { herkunftSumsStddevPopFieldsModelPrimitives, HerkunftSumsStddevPopFieldsModelSelector } from "./HerkunftSumsStddevPopFieldsModel.base"
import { HerkunftSumsStddevSampFieldsModel } from "./HerkunftSumsStddevSampFieldsModel"
import { herkunftSumsStddevSampFieldsModelPrimitives, HerkunftSumsStddevSampFieldsModelSelector } from "./HerkunftSumsStddevSampFieldsModel.base"
import { HerkunftSumsSumFieldsModel } from "./HerkunftSumsSumFieldsModel"
import { herkunftSumsSumFieldsModelPrimitives, HerkunftSumsSumFieldsModelSelector } from "./HerkunftSumsSumFieldsModel.base"
import { HerkunftSumsVarPopFieldsModel } from "./HerkunftSumsVarPopFieldsModel"
import { herkunftSumsVarPopFieldsModelPrimitives, HerkunftSumsVarPopFieldsModelSelector } from "./HerkunftSumsVarPopFieldsModel.base"
import { HerkunftSumsVarSampFieldsModel } from "./HerkunftSumsVarSampFieldsModel"
import { herkunftSumsVarSampFieldsModelPrimitives, HerkunftSumsVarSampFieldsModelSelector } from "./HerkunftSumsVarSampFieldsModel.base"
import { HerkunftSumsVarianceFieldsModel } from "./HerkunftSumsVarianceFieldsModel"
import { herkunftSumsVarianceFieldsModelPrimitives, HerkunftSumsVarianceFieldsModelSelector } from "./HerkunftSumsVarianceFieldsModel.base"
import { SammlungModel } from "./SammlungModel"
import { sammlungModelPrimitives, SammlungModelSelector } from "./SammlungModel.base"
import { LieferungModel } from "./LieferungModel"
import { lieferungModelPrimitives, LieferungModelSelector } from "./LieferungModel.base"
import { LieferungFileModel } from "./LieferungFileModel"
import { lieferungFileModelPrimitives, LieferungFileModelSelector } from "./LieferungFileModel.base"
import { LieferungFileAggregateModel } from "./LieferungFileAggregateModel"
import { lieferungFileAggregateModelPrimitives, LieferungFileAggregateModelSelector } from "./LieferungFileAggregateModel.base"
import { LieferungFileAggregateFieldsModel } from "./LieferungFileAggregateFieldsModel"
import { lieferungFileAggregateFieldsModelPrimitives, LieferungFileAggregateFieldsModelSelector } from "./LieferungFileAggregateFieldsModel.base"
import { LieferungFileMaxFieldsModel } from "./LieferungFileMaxFieldsModel"
import { lieferungFileMaxFieldsModelPrimitives, LieferungFileMaxFieldsModelSelector } from "./LieferungFileMaxFieldsModel.base"
import { LieferungFileMinFieldsModel } from "./LieferungFileMinFieldsModel"
import { lieferungFileMinFieldsModelPrimitives, LieferungFileMinFieldsModelSelector } from "./LieferungFileMinFieldsModel.base"
import { SammelLieferungModel } from "./SammelLieferungModel"
import { sammelLieferungModelPrimitives, SammelLieferungModelSelector } from "./SammelLieferungModel.base"
import { LieferungAggregateModel } from "./LieferungAggregateModel"
import { lieferungAggregateModelPrimitives, LieferungAggregateModelSelector } from "./LieferungAggregateModel.base"
import { LieferungAggregateFieldsModel } from "./LieferungAggregateFieldsModel"
import { lieferungAggregateFieldsModelPrimitives, LieferungAggregateFieldsModelSelector } from "./LieferungAggregateFieldsModel.base"
import { LieferungAvgFieldsModel } from "./LieferungAvgFieldsModel"
import { lieferungAvgFieldsModelPrimitives, LieferungAvgFieldsModelSelector } from "./LieferungAvgFieldsModel.base"
import { LieferungMaxFieldsModel } from "./LieferungMaxFieldsModel"
import { lieferungMaxFieldsModelPrimitives, LieferungMaxFieldsModelSelector } from "./LieferungMaxFieldsModel.base"
import { LieferungMinFieldsModel } from "./LieferungMinFieldsModel"
import { lieferungMinFieldsModelPrimitives, LieferungMinFieldsModelSelector } from "./LieferungMinFieldsModel.base"
import { LieferungStddevFieldsModel } from "./LieferungStddevFieldsModel"
import { lieferungStddevFieldsModelPrimitives, LieferungStddevFieldsModelSelector } from "./LieferungStddevFieldsModel.base"
import { LieferungStddevPopFieldsModel } from "./LieferungStddevPopFieldsModel"
import { lieferungStddevPopFieldsModelPrimitives, LieferungStddevPopFieldsModelSelector } from "./LieferungStddevPopFieldsModel.base"
import { LieferungStddevSampFieldsModel } from "./LieferungStddevSampFieldsModel"
import { lieferungStddevSampFieldsModelPrimitives, LieferungStddevSampFieldsModelSelector } from "./LieferungStddevSampFieldsModel.base"
import { LieferungSumFieldsModel } from "./LieferungSumFieldsModel"
import { lieferungSumFieldsModelPrimitives, LieferungSumFieldsModelSelector } from "./LieferungSumFieldsModel.base"
import { LieferungVarPopFieldsModel } from "./LieferungVarPopFieldsModel"
import { lieferungVarPopFieldsModelPrimitives, LieferungVarPopFieldsModelSelector } from "./LieferungVarPopFieldsModel.base"
import { LieferungVarSampFieldsModel } from "./LieferungVarSampFieldsModel"
import { lieferungVarSampFieldsModelPrimitives, LieferungVarSampFieldsModelSelector } from "./LieferungVarSampFieldsModel.base"
import { LieferungVarianceFieldsModel } from "./LieferungVarianceFieldsModel"
import { lieferungVarianceFieldsModelPrimitives, LieferungVarianceFieldsModelSelector } from "./LieferungVarianceFieldsModel.base"
import { SammelLieferungAggregateModel } from "./SammelLieferungAggregateModel"
import { sammelLieferungAggregateModelPrimitives, SammelLieferungAggregateModelSelector } from "./SammelLieferungAggregateModel.base"
import { SammelLieferungAggregateFieldsModel } from "./SammelLieferungAggregateFieldsModel"
import { sammelLieferungAggregateFieldsModelPrimitives, SammelLieferungAggregateFieldsModelSelector } from "./SammelLieferungAggregateFieldsModel.base"
import { SammelLieferungAvgFieldsModel } from "./SammelLieferungAvgFieldsModel"
import { sammelLieferungAvgFieldsModelPrimitives, SammelLieferungAvgFieldsModelSelector } from "./SammelLieferungAvgFieldsModel.base"
import { SammelLieferungMaxFieldsModel } from "./SammelLieferungMaxFieldsModel"
import { sammelLieferungMaxFieldsModelPrimitives, SammelLieferungMaxFieldsModelSelector } from "./SammelLieferungMaxFieldsModel.base"
import { SammelLieferungMinFieldsModel } from "./SammelLieferungMinFieldsModel"
import { sammelLieferungMinFieldsModelPrimitives, SammelLieferungMinFieldsModelSelector } from "./SammelLieferungMinFieldsModel.base"
import { SammelLieferungStddevFieldsModel } from "./SammelLieferungStddevFieldsModel"
import { sammelLieferungStddevFieldsModelPrimitives, SammelLieferungStddevFieldsModelSelector } from "./SammelLieferungStddevFieldsModel.base"
import { SammelLieferungStddevPopFieldsModel } from "./SammelLieferungStddevPopFieldsModel"
import { sammelLieferungStddevPopFieldsModelPrimitives, SammelLieferungStddevPopFieldsModelSelector } from "./SammelLieferungStddevPopFieldsModel.base"
import { SammelLieferungStddevSampFieldsModel } from "./SammelLieferungStddevSampFieldsModel"
import { sammelLieferungStddevSampFieldsModelPrimitives, SammelLieferungStddevSampFieldsModelSelector } from "./SammelLieferungStddevSampFieldsModel.base"
import { SammelLieferungSumFieldsModel } from "./SammelLieferungSumFieldsModel"
import { sammelLieferungSumFieldsModelPrimitives, SammelLieferungSumFieldsModelSelector } from "./SammelLieferungSumFieldsModel.base"
import { SammelLieferungVarPopFieldsModel } from "./SammelLieferungVarPopFieldsModel"
import { sammelLieferungVarPopFieldsModelPrimitives, SammelLieferungVarPopFieldsModelSelector } from "./SammelLieferungVarPopFieldsModel.base"
import { SammelLieferungVarSampFieldsModel } from "./SammelLieferungVarSampFieldsModel"
import { sammelLieferungVarSampFieldsModelPrimitives, SammelLieferungVarSampFieldsModelSelector } from "./SammelLieferungVarSampFieldsModel.base"
import { SammelLieferungVarianceFieldsModel } from "./SammelLieferungVarianceFieldsModel"
import { sammelLieferungVarianceFieldsModelPrimitives, SammelLieferungVarianceFieldsModelSelector } from "./SammelLieferungVarianceFieldsModel.base"
import { SammlungFileModel } from "./SammlungFileModel"
import { sammlungFileModelPrimitives, SammlungFileModelSelector } from "./SammlungFileModel.base"
import { SammlungFileAggregateModel } from "./SammlungFileAggregateModel"
import { sammlungFileAggregateModelPrimitives, SammlungFileAggregateModelSelector } from "./SammlungFileAggregateModel.base"
import { SammlungFileAggregateFieldsModel } from "./SammlungFileAggregateFieldsModel"
import { sammlungFileAggregateFieldsModelPrimitives, SammlungFileAggregateFieldsModelSelector } from "./SammlungFileAggregateFieldsModel.base"
import { SammlungFileMaxFieldsModel } from "./SammlungFileMaxFieldsModel"
import { sammlungFileMaxFieldsModelPrimitives, SammlungFileMaxFieldsModelSelector } from "./SammlungFileMaxFieldsModel.base"
import { SammlungFileMinFieldsModel } from "./SammlungFileMinFieldsModel"
import { sammlungFileMinFieldsModelPrimitives, SammlungFileMinFieldsModelSelector } from "./SammlungFileMinFieldsModel.base"
import { SammlungAggregateModel } from "./SammlungAggregateModel"
import { sammlungAggregateModelPrimitives, SammlungAggregateModelSelector } from "./SammlungAggregateModel.base"
import { SammlungAggregateFieldsModel } from "./SammlungAggregateFieldsModel"
import { sammlungAggregateFieldsModelPrimitives, SammlungAggregateFieldsModelSelector } from "./SammlungAggregateFieldsModel.base"
import { SammlungAvgFieldsModel } from "./SammlungAvgFieldsModel"
import { sammlungAvgFieldsModelPrimitives, SammlungAvgFieldsModelSelector } from "./SammlungAvgFieldsModel.base"
import { SammlungMaxFieldsModel } from "./SammlungMaxFieldsModel"
import { sammlungMaxFieldsModelPrimitives, SammlungMaxFieldsModelSelector } from "./SammlungMaxFieldsModel.base"
import { SammlungMinFieldsModel } from "./SammlungMinFieldsModel"
import { sammlungMinFieldsModelPrimitives, SammlungMinFieldsModelSelector } from "./SammlungMinFieldsModel.base"
import { SammlungStddevFieldsModel } from "./SammlungStddevFieldsModel"
import { sammlungStddevFieldsModelPrimitives, SammlungStddevFieldsModelSelector } from "./SammlungStddevFieldsModel.base"
import { SammlungStddevPopFieldsModel } from "./SammlungStddevPopFieldsModel"
import { sammlungStddevPopFieldsModelPrimitives, SammlungStddevPopFieldsModelSelector } from "./SammlungStddevPopFieldsModel.base"
import { SammlungStddevSampFieldsModel } from "./SammlungStddevSampFieldsModel"
import { sammlungStddevSampFieldsModelPrimitives, SammlungStddevSampFieldsModelSelector } from "./SammlungStddevSampFieldsModel.base"
import { SammlungSumFieldsModel } from "./SammlungSumFieldsModel"
import { sammlungSumFieldsModelPrimitives, SammlungSumFieldsModelSelector } from "./SammlungSumFieldsModel.base"
import { SammlungVarPopFieldsModel } from "./SammlungVarPopFieldsModel"
import { sammlungVarPopFieldsModelPrimitives, SammlungVarPopFieldsModelSelector } from "./SammlungVarPopFieldsModel.base"
import { SammlungVarSampFieldsModel } from "./SammlungVarSampFieldsModel"
import { sammlungVarSampFieldsModelPrimitives, SammlungVarSampFieldsModelSelector } from "./SammlungVarSampFieldsModel.base"
import { SammlungVarianceFieldsModel } from "./SammlungVarianceFieldsModel"
import { sammlungVarianceFieldsModelPrimitives, SammlungVarianceFieldsModelSelector } from "./SammlungVarianceFieldsModel.base"
import { KulturFileModel } from "./KulturFileModel"
import { kulturFileModelPrimitives, KulturFileModelSelector } from "./KulturFileModel.base"
import { KulturFileAggregateModel } from "./KulturFileAggregateModel"
import { kulturFileAggregateModelPrimitives, KulturFileAggregateModelSelector } from "./KulturFileAggregateModel.base"
import { KulturFileAggregateFieldsModel } from "./KulturFileAggregateFieldsModel"
import { kulturFileAggregateFieldsModelPrimitives, KulturFileAggregateFieldsModelSelector } from "./KulturFileAggregateFieldsModel.base"
import { KulturFileMaxFieldsModel } from "./KulturFileMaxFieldsModel"
import { kulturFileMaxFieldsModelPrimitives, KulturFileMaxFieldsModelSelector } from "./KulturFileMaxFieldsModel.base"
import { KulturFileMinFieldsModel } from "./KulturFileMinFieldsModel"
import { kulturFileMinFieldsModelPrimitives, KulturFileMinFieldsModelSelector } from "./KulturFileMinFieldsModel.base"
import { KulturOptionModel } from "./KulturOptionModel"
import { kulturOptionModelPrimitives, KulturOptionModelSelector } from "./KulturOptionModel.base"
import { KulturQkChoosenModel } from "./KulturQkChoosenModel"
import { kulturQkChoosenModelPrimitives, KulturQkChoosenModelSelector } from "./KulturQkChoosenModel.base"
import { KulturQkModel } from "./KulturQkModel"
import { kulturQkModelPrimitives, KulturQkModelSelector } from "./KulturQkModel.base"
import { KulturQkChoosenAggregateModel } from "./KulturQkChoosenAggregateModel"
import { kulturQkChoosenAggregateModelPrimitives, KulturQkChoosenAggregateModelSelector } from "./KulturQkChoosenAggregateModel.base"
import { KulturQkChoosenAggregateFieldsModel } from "./KulturQkChoosenAggregateFieldsModel"
import { kulturQkChoosenAggregateFieldsModelPrimitives, KulturQkChoosenAggregateFieldsModelSelector } from "./KulturQkChoosenAggregateFieldsModel.base"
import { KulturQkChoosenMaxFieldsModel } from "./KulturQkChoosenMaxFieldsModel"
import { kulturQkChoosenMaxFieldsModelPrimitives, KulturQkChoosenMaxFieldsModelSelector } from "./KulturQkChoosenMaxFieldsModel.base"
import { KulturQkChoosenMinFieldsModel } from "./KulturQkChoosenMinFieldsModel"
import { kulturQkChoosenMinFieldsModelPrimitives, KulturQkChoosenMinFieldsModelSelector } from "./KulturQkChoosenMinFieldsModel.base"
import { TeilkulturModel } from "./TeilkulturModel"
import { teilkulturModelPrimitives, TeilkulturModelSelector } from "./TeilkulturModel.base"
import { TeilzaehlungModel } from "./TeilzaehlungModel"
import { teilzaehlungModelPrimitives, TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"
import { TeilzaehlungAggregateModel } from "./TeilzaehlungAggregateModel"
import { teilzaehlungAggregateModelPrimitives, TeilzaehlungAggregateModelSelector } from "./TeilzaehlungAggregateModel.base"
import { TeilzaehlungAggregateFieldsModel } from "./TeilzaehlungAggregateFieldsModel"
import { teilzaehlungAggregateFieldsModelPrimitives, TeilzaehlungAggregateFieldsModelSelector } from "./TeilzaehlungAggregateFieldsModel.base"
import { TeilzaehlungAvgFieldsModel } from "./TeilzaehlungAvgFieldsModel"
import { teilzaehlungAvgFieldsModelPrimitives, TeilzaehlungAvgFieldsModelSelector } from "./TeilzaehlungAvgFieldsModel.base"
import { TeilzaehlungMaxFieldsModel } from "./TeilzaehlungMaxFieldsModel"
import { teilzaehlungMaxFieldsModelPrimitives, TeilzaehlungMaxFieldsModelSelector } from "./TeilzaehlungMaxFieldsModel.base"
import { TeilzaehlungMinFieldsModel } from "./TeilzaehlungMinFieldsModel"
import { teilzaehlungMinFieldsModelPrimitives, TeilzaehlungMinFieldsModelSelector } from "./TeilzaehlungMinFieldsModel.base"
import { TeilzaehlungStddevFieldsModel } from "./TeilzaehlungStddevFieldsModel"
import { teilzaehlungStddevFieldsModelPrimitives, TeilzaehlungStddevFieldsModelSelector } from "./TeilzaehlungStddevFieldsModel.base"
import { TeilzaehlungStddevPopFieldsModel } from "./TeilzaehlungStddevPopFieldsModel"
import { teilzaehlungStddevPopFieldsModelPrimitives, TeilzaehlungStddevPopFieldsModelSelector } from "./TeilzaehlungStddevPopFieldsModel.base"
import { TeilzaehlungStddevSampFieldsModel } from "./TeilzaehlungStddevSampFieldsModel"
import { teilzaehlungStddevSampFieldsModelPrimitives, TeilzaehlungStddevSampFieldsModelSelector } from "./TeilzaehlungStddevSampFieldsModel.base"
import { TeilzaehlungSumFieldsModel } from "./TeilzaehlungSumFieldsModel"
import { teilzaehlungSumFieldsModelPrimitives, TeilzaehlungSumFieldsModelSelector } from "./TeilzaehlungSumFieldsModel.base"
import { TeilzaehlungVarPopFieldsModel } from "./TeilzaehlungVarPopFieldsModel"
import { teilzaehlungVarPopFieldsModelPrimitives, TeilzaehlungVarPopFieldsModelSelector } from "./TeilzaehlungVarPopFieldsModel.base"
import { TeilzaehlungVarSampFieldsModel } from "./TeilzaehlungVarSampFieldsModel"
import { teilzaehlungVarSampFieldsModelPrimitives, TeilzaehlungVarSampFieldsModelSelector } from "./TeilzaehlungVarSampFieldsModel.base"
import { TeilzaehlungVarianceFieldsModel } from "./TeilzaehlungVarianceFieldsModel"
import { teilzaehlungVarianceFieldsModelPrimitives, TeilzaehlungVarianceFieldsModelSelector } from "./TeilzaehlungVarianceFieldsModel.base"
import { ZaehlungModel } from "./ZaehlungModel"
import { zaehlungModelPrimitives, ZaehlungModelSelector } from "./ZaehlungModel.base"
import { TeilkulturAggregateModel } from "./TeilkulturAggregateModel"
import { teilkulturAggregateModelPrimitives, TeilkulturAggregateModelSelector } from "./TeilkulturAggregateModel.base"
import { TeilkulturAggregateFieldsModel } from "./TeilkulturAggregateFieldsModel"
import { teilkulturAggregateFieldsModelPrimitives, TeilkulturAggregateFieldsModelSelector } from "./TeilkulturAggregateFieldsModel.base"
import { TeilkulturAvgFieldsModel } from "./TeilkulturAvgFieldsModel"
import { teilkulturAvgFieldsModelPrimitives, TeilkulturAvgFieldsModelSelector } from "./TeilkulturAvgFieldsModel.base"
import { TeilkulturMaxFieldsModel } from "./TeilkulturMaxFieldsModel"
import { teilkulturMaxFieldsModelPrimitives, TeilkulturMaxFieldsModelSelector } from "./TeilkulturMaxFieldsModel.base"
import { TeilkulturMinFieldsModel } from "./TeilkulturMinFieldsModel"
import { teilkulturMinFieldsModelPrimitives, TeilkulturMinFieldsModelSelector } from "./TeilkulturMinFieldsModel.base"
import { TeilkulturStddevFieldsModel } from "./TeilkulturStddevFieldsModel"
import { teilkulturStddevFieldsModelPrimitives, TeilkulturStddevFieldsModelSelector } from "./TeilkulturStddevFieldsModel.base"
import { TeilkulturStddevPopFieldsModel } from "./TeilkulturStddevPopFieldsModel"
import { teilkulturStddevPopFieldsModelPrimitives, TeilkulturStddevPopFieldsModelSelector } from "./TeilkulturStddevPopFieldsModel.base"
import { TeilkulturStddevSampFieldsModel } from "./TeilkulturStddevSampFieldsModel"
import { teilkulturStddevSampFieldsModelPrimitives, TeilkulturStddevSampFieldsModelSelector } from "./TeilkulturStddevSampFieldsModel.base"
import { TeilkulturSumFieldsModel } from "./TeilkulturSumFieldsModel"
import { teilkulturSumFieldsModelPrimitives, TeilkulturSumFieldsModelSelector } from "./TeilkulturSumFieldsModel.base"
import { TeilkulturVarPopFieldsModel } from "./TeilkulturVarPopFieldsModel"
import { teilkulturVarPopFieldsModelPrimitives, TeilkulturVarPopFieldsModelSelector } from "./TeilkulturVarPopFieldsModel.base"
import { TeilkulturVarSampFieldsModel } from "./TeilkulturVarSampFieldsModel"
import { teilkulturVarSampFieldsModelPrimitives, TeilkulturVarSampFieldsModelSelector } from "./TeilkulturVarSampFieldsModel.base"
import { TeilkulturVarianceFieldsModel } from "./TeilkulturVarianceFieldsModel"
import { teilkulturVarianceFieldsModelPrimitives, TeilkulturVarianceFieldsModelSelector } from "./TeilkulturVarianceFieldsModel.base"
import { ZaehlungAggregateModel } from "./ZaehlungAggregateModel"
import { zaehlungAggregateModelPrimitives, ZaehlungAggregateModelSelector } from "./ZaehlungAggregateModel.base"
import { ZaehlungAggregateFieldsModel } from "./ZaehlungAggregateFieldsModel"
import { zaehlungAggregateFieldsModelPrimitives, ZaehlungAggregateFieldsModelSelector } from "./ZaehlungAggregateFieldsModel.base"
import { ZaehlungAvgFieldsModel } from "./ZaehlungAvgFieldsModel"
import { zaehlungAvgFieldsModelPrimitives, ZaehlungAvgFieldsModelSelector } from "./ZaehlungAvgFieldsModel.base"
import { ZaehlungMaxFieldsModel } from "./ZaehlungMaxFieldsModel"
import { zaehlungMaxFieldsModelPrimitives, ZaehlungMaxFieldsModelSelector } from "./ZaehlungMaxFieldsModel.base"
import { ZaehlungMinFieldsModel } from "./ZaehlungMinFieldsModel"
import { zaehlungMinFieldsModelPrimitives, ZaehlungMinFieldsModelSelector } from "./ZaehlungMinFieldsModel.base"
import { ZaehlungStddevFieldsModel } from "./ZaehlungStddevFieldsModel"
import { zaehlungStddevFieldsModelPrimitives, ZaehlungStddevFieldsModelSelector } from "./ZaehlungStddevFieldsModel.base"
import { ZaehlungStddevPopFieldsModel } from "./ZaehlungStddevPopFieldsModel"
import { zaehlungStddevPopFieldsModelPrimitives, ZaehlungStddevPopFieldsModelSelector } from "./ZaehlungStddevPopFieldsModel.base"
import { ZaehlungStddevSampFieldsModel } from "./ZaehlungStddevSampFieldsModel"
import { zaehlungStddevSampFieldsModelPrimitives, ZaehlungStddevSampFieldsModelSelector } from "./ZaehlungStddevSampFieldsModel.base"
import { ZaehlungSumFieldsModel } from "./ZaehlungSumFieldsModel"
import { zaehlungSumFieldsModelPrimitives, ZaehlungSumFieldsModelSelector } from "./ZaehlungSumFieldsModel.base"
import { ZaehlungVarPopFieldsModel } from "./ZaehlungVarPopFieldsModel"
import { zaehlungVarPopFieldsModelPrimitives, ZaehlungVarPopFieldsModelSelector } from "./ZaehlungVarPopFieldsModel.base"
import { ZaehlungVarSampFieldsModel } from "./ZaehlungVarSampFieldsModel"
import { zaehlungVarSampFieldsModelPrimitives, ZaehlungVarSampFieldsModelSelector } from "./ZaehlungVarSampFieldsModel.base"
import { ZaehlungVarianceFieldsModel } from "./ZaehlungVarianceFieldsModel"
import { zaehlungVarianceFieldsModelPrimitives, ZaehlungVarianceFieldsModelSelector } from "./ZaehlungVarianceFieldsModel.base"
import { GartenAggregateModel } from "./GartenAggregateModel"
import { gartenAggregateModelPrimitives, GartenAggregateModelSelector } from "./GartenAggregateModel.base"
import { GartenAggregateFieldsModel } from "./GartenAggregateFieldsModel"
import { gartenAggregateFieldsModelPrimitives, GartenAggregateFieldsModelSelector } from "./GartenAggregateFieldsModel.base"
import { GartenAvgFieldsModel } from "./GartenAvgFieldsModel"
import { gartenAvgFieldsModelPrimitives, GartenAvgFieldsModelSelector } from "./GartenAvgFieldsModel.base"
import { GartenMaxFieldsModel } from "./GartenMaxFieldsModel"
import { gartenMaxFieldsModelPrimitives, GartenMaxFieldsModelSelector } from "./GartenMaxFieldsModel.base"
import { GartenMinFieldsModel } from "./GartenMinFieldsModel"
import { gartenMinFieldsModelPrimitives, GartenMinFieldsModelSelector } from "./GartenMinFieldsModel.base"
import { GartenStddevFieldsModel } from "./GartenStddevFieldsModel"
import { gartenStddevFieldsModelPrimitives, GartenStddevFieldsModelSelector } from "./GartenStddevFieldsModel.base"
import { GartenStddevPopFieldsModel } from "./GartenStddevPopFieldsModel"
import { gartenStddevPopFieldsModelPrimitives, GartenStddevPopFieldsModelSelector } from "./GartenStddevPopFieldsModel.base"
import { GartenStddevSampFieldsModel } from "./GartenStddevSampFieldsModel"
import { gartenStddevSampFieldsModelPrimitives, GartenStddevSampFieldsModelSelector } from "./GartenStddevSampFieldsModel.base"
import { GartenSumFieldsModel } from "./GartenSumFieldsModel"
import { gartenSumFieldsModelPrimitives, GartenSumFieldsModelSelector } from "./GartenSumFieldsModel.base"
import { GartenVarPopFieldsModel } from "./GartenVarPopFieldsModel"
import { gartenVarPopFieldsModelPrimitives, GartenVarPopFieldsModelSelector } from "./GartenVarPopFieldsModel.base"
import { GartenVarSampFieldsModel } from "./GartenVarSampFieldsModel"
import { gartenVarSampFieldsModelPrimitives, GartenVarSampFieldsModelSelector } from "./GartenVarSampFieldsModel.base"
import { GartenVarianceFieldsModel } from "./GartenVarianceFieldsModel"
import { gartenVarianceFieldsModelPrimitives, GartenVarianceFieldsModelSelector } from "./GartenVarianceFieldsModel.base"
import { PersonFileModel } from "./PersonFileModel"
import { personFileModelPrimitives, PersonFileModelSelector } from "./PersonFileModel.base"
import { PersonFileAggregateModel } from "./PersonFileAggregateModel"
import { personFileAggregateModelPrimitives, PersonFileAggregateModelSelector } from "./PersonFileAggregateModel.base"
import { PersonFileAggregateFieldsModel } from "./PersonFileAggregateFieldsModel"
import { personFileAggregateFieldsModelPrimitives, PersonFileAggregateFieldsModelSelector } from "./PersonFileAggregateFieldsModel.base"
import { PersonFileMaxFieldsModel } from "./PersonFileMaxFieldsModel"
import { personFileMaxFieldsModelPrimitives, PersonFileMaxFieldsModelSelector } from "./PersonFileMaxFieldsModel.base"
import { PersonFileMinFieldsModel } from "./PersonFileMinFieldsModel"
import { personFileMinFieldsModelPrimitives, PersonFileMinFieldsModelSelector } from "./PersonFileMinFieldsModel.base"
import { PersonOptionModel } from "./PersonOptionModel"
import { personOptionModelPrimitives, PersonOptionModelSelector } from "./PersonOptionModel.base"
import { UserRoleModel } from "./UserRoleModel"
import { userRoleModelPrimitives, UserRoleModelSelector } from "./UserRoleModel.base"
import { PersonAggregateModel } from "./PersonAggregateModel"
import { personAggregateModelPrimitives, PersonAggregateModelSelector } from "./PersonAggregateModel.base"
import { PersonAggregateFieldsModel } from "./PersonAggregateFieldsModel"
import { personAggregateFieldsModelPrimitives, PersonAggregateFieldsModelSelector } from "./PersonAggregateFieldsModel.base"
import { PersonAvgFieldsModel } from "./PersonAvgFieldsModel"
import { personAvgFieldsModelPrimitives, PersonAvgFieldsModelSelector } from "./PersonAvgFieldsModel.base"
import { PersonMaxFieldsModel } from "./PersonMaxFieldsModel"
import { personMaxFieldsModelPrimitives, PersonMaxFieldsModelSelector } from "./PersonMaxFieldsModel.base"
import { PersonMinFieldsModel } from "./PersonMinFieldsModel"
import { personMinFieldsModelPrimitives, PersonMinFieldsModelSelector } from "./PersonMinFieldsModel.base"
import { PersonStddevFieldsModel } from "./PersonStddevFieldsModel"
import { personStddevFieldsModelPrimitives, PersonStddevFieldsModelSelector } from "./PersonStddevFieldsModel.base"
import { PersonStddevPopFieldsModel } from "./PersonStddevPopFieldsModel"
import { personStddevPopFieldsModelPrimitives, PersonStddevPopFieldsModelSelector } from "./PersonStddevPopFieldsModel.base"
import { PersonStddevSampFieldsModel } from "./PersonStddevSampFieldsModel"
import { personStddevSampFieldsModelPrimitives, PersonStddevSampFieldsModelSelector } from "./PersonStddevSampFieldsModel.base"
import { PersonSumFieldsModel } from "./PersonSumFieldsModel"
import { personSumFieldsModelPrimitives, PersonSumFieldsModelSelector } from "./PersonSumFieldsModel.base"
import { PersonVarPopFieldsModel } from "./PersonVarPopFieldsModel"
import { personVarPopFieldsModelPrimitives, PersonVarPopFieldsModelSelector } from "./PersonVarPopFieldsModel.base"
import { PersonVarSampFieldsModel } from "./PersonVarSampFieldsModel"
import { personVarSampFieldsModelPrimitives, PersonVarSampFieldsModelSelector } from "./PersonVarSampFieldsModel.base"
import { PersonVarianceFieldsModel } from "./PersonVarianceFieldsModel"
import { personVarianceFieldsModelPrimitives, PersonVarianceFieldsModelSelector } from "./PersonVarianceFieldsModel.base"
import { PersonRevModel } from "./PersonRevModel"
import { personRevModelPrimitives, PersonRevModelSelector } from "./PersonRevModel.base"
import { PersonRevAggregateModel } from "./PersonRevAggregateModel"
import { personRevAggregateModelPrimitives, PersonRevAggregateModelSelector } from "./PersonRevAggregateModel.base"
import { PersonRevAggregateFieldsModel } from "./PersonRevAggregateFieldsModel"
import { personRevAggregateFieldsModelPrimitives, PersonRevAggregateFieldsModelSelector } from "./PersonRevAggregateFieldsModel.base"
import { PersonRevAvgFieldsModel } from "./PersonRevAvgFieldsModel"
import { personRevAvgFieldsModelPrimitives, PersonRevAvgFieldsModelSelector } from "./PersonRevAvgFieldsModel.base"
import { PersonRevMaxFieldsModel } from "./PersonRevMaxFieldsModel"
import { personRevMaxFieldsModelPrimitives, PersonRevMaxFieldsModelSelector } from "./PersonRevMaxFieldsModel.base"
import { PersonRevMinFieldsModel } from "./PersonRevMinFieldsModel"
import { personRevMinFieldsModelPrimitives, PersonRevMinFieldsModelSelector } from "./PersonRevMinFieldsModel.base"
import { PersonRevStddevFieldsModel } from "./PersonRevStddevFieldsModel"
import { personRevStddevFieldsModelPrimitives, PersonRevStddevFieldsModelSelector } from "./PersonRevStddevFieldsModel.base"
import { PersonRevStddevPopFieldsModel } from "./PersonRevStddevPopFieldsModel"
import { personRevStddevPopFieldsModelPrimitives, PersonRevStddevPopFieldsModelSelector } from "./PersonRevStddevPopFieldsModel.base"
import { PersonRevStddevSampFieldsModel } from "./PersonRevStddevSampFieldsModel"
import { personRevStddevSampFieldsModelPrimitives, PersonRevStddevSampFieldsModelSelector } from "./PersonRevStddevSampFieldsModel.base"
import { PersonRevSumFieldsModel } from "./PersonRevSumFieldsModel"
import { personRevSumFieldsModelPrimitives, PersonRevSumFieldsModelSelector } from "./PersonRevSumFieldsModel.base"
import { PersonRevVarPopFieldsModel } from "./PersonRevVarPopFieldsModel"
import { personRevVarPopFieldsModelPrimitives, PersonRevVarPopFieldsModelSelector } from "./PersonRevVarPopFieldsModel.base"
import { PersonRevVarSampFieldsModel } from "./PersonRevVarSampFieldsModel"
import { personRevVarSampFieldsModelPrimitives, PersonRevVarSampFieldsModelSelector } from "./PersonRevVarSampFieldsModel.base"
import { PersonRevVarianceFieldsModel } from "./PersonRevVarianceFieldsModel"
import { personRevVarianceFieldsModelPrimitives, PersonRevVarianceFieldsModelSelector } from "./PersonRevVarianceFieldsModel.base"
import { AeArtAggregateModel } from "./AeArtAggregateModel"
import { aeArtAggregateModelPrimitives, AeArtAggregateModelSelector } from "./AeArtAggregateModel.base"
import { AeArtAggregateFieldsModel } from "./AeArtAggregateFieldsModel"
import { aeArtAggregateFieldsModelPrimitives, AeArtAggregateFieldsModelSelector } from "./AeArtAggregateFieldsModel.base"
import { AeArtMaxFieldsModel } from "./AeArtMaxFieldsModel"
import { aeArtMaxFieldsModelPrimitives, AeArtMaxFieldsModelSelector } from "./AeArtMaxFieldsModel.base"
import { AeArtMinFieldsModel } from "./AeArtMinFieldsModel"
import { aeArtMinFieldsModelPrimitives, AeArtMinFieldsModelSelector } from "./AeArtMinFieldsModel.base"
import { ArtAggregateModel } from "./ArtAggregateModel"
import { artAggregateModelPrimitives, ArtAggregateModelSelector } from "./ArtAggregateModel.base"
import { ArtAggregateFieldsModel } from "./ArtAggregateFieldsModel"
import { artAggregateFieldsModelPrimitives, ArtAggregateFieldsModelSelector } from "./ArtAggregateFieldsModel.base"
import { ArtAvgFieldsModel } from "./ArtAvgFieldsModel"
import { artAvgFieldsModelPrimitives, ArtAvgFieldsModelSelector } from "./ArtAvgFieldsModel.base"
import { ArtMaxFieldsModel } from "./ArtMaxFieldsModel"
import { artMaxFieldsModelPrimitives, ArtMaxFieldsModelSelector } from "./ArtMaxFieldsModel.base"
import { ArtMinFieldsModel } from "./ArtMinFieldsModel"
import { artMinFieldsModelPrimitives, ArtMinFieldsModelSelector } from "./ArtMinFieldsModel.base"
import { ArtStddevFieldsModel } from "./ArtStddevFieldsModel"
import { artStddevFieldsModelPrimitives, ArtStddevFieldsModelSelector } from "./ArtStddevFieldsModel.base"
import { ArtStddevPopFieldsModel } from "./ArtStddevPopFieldsModel"
import { artStddevPopFieldsModelPrimitives, ArtStddevPopFieldsModelSelector } from "./ArtStddevPopFieldsModel.base"
import { ArtStddevSampFieldsModel } from "./ArtStddevSampFieldsModel"
import { artStddevSampFieldsModelPrimitives, ArtStddevSampFieldsModelSelector } from "./ArtStddevSampFieldsModel.base"
import { ArtSumFieldsModel } from "./ArtSumFieldsModel"
import { artSumFieldsModelPrimitives, ArtSumFieldsModelSelector } from "./ArtSumFieldsModel.base"
import { ArtVarPopFieldsModel } from "./ArtVarPopFieldsModel"
import { artVarPopFieldsModelPrimitives, ArtVarPopFieldsModelSelector } from "./ArtVarPopFieldsModel.base"
import { ArtVarSampFieldsModel } from "./ArtVarSampFieldsModel"
import { artVarSampFieldsModelPrimitives, ArtVarSampFieldsModelSelector } from "./ArtVarSampFieldsModel.base"
import { ArtVarianceFieldsModel } from "./ArtVarianceFieldsModel"
import { artVarianceFieldsModelPrimitives, ArtVarianceFieldsModelSelector } from "./ArtVarianceFieldsModel.base"
import { ArtQkAggregateModel } from "./ArtQkAggregateModel"
import { artQkAggregateModelPrimitives, ArtQkAggregateModelSelector } from "./ArtQkAggregateModel.base"
import { ArtQkAggregateFieldsModel } from "./ArtQkAggregateFieldsModel"
import { artQkAggregateFieldsModelPrimitives, ArtQkAggregateFieldsModelSelector } from "./ArtQkAggregateFieldsModel.base"
import { ArtQkAvgFieldsModel } from "./ArtQkAvgFieldsModel"
import { artQkAvgFieldsModelPrimitives, ArtQkAvgFieldsModelSelector } from "./ArtQkAvgFieldsModel.base"
import { ArtQkMaxFieldsModel } from "./ArtQkMaxFieldsModel"
import { artQkMaxFieldsModelPrimitives, ArtQkMaxFieldsModelSelector } from "./ArtQkMaxFieldsModel.base"
import { ArtQkMinFieldsModel } from "./ArtQkMinFieldsModel"
import { artQkMinFieldsModelPrimitives, ArtQkMinFieldsModelSelector } from "./ArtQkMinFieldsModel.base"
import { ArtQkStddevFieldsModel } from "./ArtQkStddevFieldsModel"
import { artQkStddevFieldsModelPrimitives, ArtQkStddevFieldsModelSelector } from "./ArtQkStddevFieldsModel.base"
import { ArtQkStddevPopFieldsModel } from "./ArtQkStddevPopFieldsModel"
import { artQkStddevPopFieldsModelPrimitives, ArtQkStddevPopFieldsModelSelector } from "./ArtQkStddevPopFieldsModel.base"
import { ArtQkStddevSampFieldsModel } from "./ArtQkStddevSampFieldsModel"
import { artQkStddevSampFieldsModelPrimitives, ArtQkStddevSampFieldsModelSelector } from "./ArtQkStddevSampFieldsModel.base"
import { ArtQkSumFieldsModel } from "./ArtQkSumFieldsModel"
import { artQkSumFieldsModelPrimitives, ArtQkSumFieldsModelSelector } from "./ArtQkSumFieldsModel.base"
import { ArtQkVarPopFieldsModel } from "./ArtQkVarPopFieldsModel"
import { artQkVarPopFieldsModelPrimitives, ArtQkVarPopFieldsModelSelector } from "./ArtQkVarPopFieldsModel.base"
import { ArtQkVarSampFieldsModel } from "./ArtQkVarSampFieldsModel"
import { artQkVarSampFieldsModelPrimitives, ArtQkVarSampFieldsModelSelector } from "./ArtQkVarSampFieldsModel.base"
import { ArtQkVarianceFieldsModel } from "./ArtQkVarianceFieldsModel"
import { artQkVarianceFieldsModelPrimitives, ArtQkVarianceFieldsModelSelector } from "./ArtQkVarianceFieldsModel.base"
import { ArtRevModel } from "./ArtRevModel"
import { artRevModelPrimitives, ArtRevModelSelector } from "./ArtRevModel.base"
import { ArtRevAggregateModel } from "./ArtRevAggregateModel"
import { artRevAggregateModelPrimitives, ArtRevAggregateModelSelector } from "./ArtRevAggregateModel.base"
import { ArtRevAggregateFieldsModel } from "./ArtRevAggregateFieldsModel"
import { artRevAggregateFieldsModelPrimitives, ArtRevAggregateFieldsModelSelector } from "./ArtRevAggregateFieldsModel.base"
import { ArtRevAvgFieldsModel } from "./ArtRevAvgFieldsModel"
import { artRevAvgFieldsModelPrimitives, ArtRevAvgFieldsModelSelector } from "./ArtRevAvgFieldsModel.base"
import { ArtRevMaxFieldsModel } from "./ArtRevMaxFieldsModel"
import { artRevMaxFieldsModelPrimitives, ArtRevMaxFieldsModelSelector } from "./ArtRevMaxFieldsModel.base"
import { ArtRevMinFieldsModel } from "./ArtRevMinFieldsModel"
import { artRevMinFieldsModelPrimitives, ArtRevMinFieldsModelSelector } from "./ArtRevMinFieldsModel.base"
import { ArtRevStddevFieldsModel } from "./ArtRevStddevFieldsModel"
import { artRevStddevFieldsModelPrimitives, ArtRevStddevFieldsModelSelector } from "./ArtRevStddevFieldsModel.base"
import { ArtRevStddevPopFieldsModel } from "./ArtRevStddevPopFieldsModel"
import { artRevStddevPopFieldsModelPrimitives, ArtRevStddevPopFieldsModelSelector } from "./ArtRevStddevPopFieldsModel.base"
import { ArtRevStddevSampFieldsModel } from "./ArtRevStddevSampFieldsModel"
import { artRevStddevSampFieldsModelPrimitives, ArtRevStddevSampFieldsModelSelector } from "./ArtRevStddevSampFieldsModel.base"
import { ArtRevSumFieldsModel } from "./ArtRevSumFieldsModel"
import { artRevSumFieldsModelPrimitives, ArtRevSumFieldsModelSelector } from "./ArtRevSumFieldsModel.base"
import { ArtRevVarPopFieldsModel } from "./ArtRevVarPopFieldsModel"
import { artRevVarPopFieldsModelPrimitives, ArtRevVarPopFieldsModelSelector } from "./ArtRevVarPopFieldsModel.base"
import { ArtRevVarSampFieldsModel } from "./ArtRevVarSampFieldsModel"
import { artRevVarSampFieldsModelPrimitives, ArtRevVarSampFieldsModelSelector } from "./ArtRevVarSampFieldsModel.base"
import { ArtRevVarianceFieldsModel } from "./ArtRevVarianceFieldsModel"
import { artRevVarianceFieldsModelPrimitives, ArtRevVarianceFieldsModelSelector } from "./ArtRevVarianceFieldsModel.base"
import { EventRevModel } from "./EventRevModel"
import { eventRevModelPrimitives, EventRevModelSelector } from "./EventRevModel.base"
import { EventRevAggregateModel } from "./EventRevAggregateModel"
import { eventRevAggregateModelPrimitives, EventRevAggregateModelSelector } from "./EventRevAggregateModel.base"
import { EventRevAggregateFieldsModel } from "./EventRevAggregateFieldsModel"
import { eventRevAggregateFieldsModelPrimitives, EventRevAggregateFieldsModelSelector } from "./EventRevAggregateFieldsModel.base"
import { EventRevAvgFieldsModel } from "./EventRevAvgFieldsModel"
import { eventRevAvgFieldsModelPrimitives, EventRevAvgFieldsModelSelector } from "./EventRevAvgFieldsModel.base"
import { EventRevMaxFieldsModel } from "./EventRevMaxFieldsModel"
import { eventRevMaxFieldsModelPrimitives, EventRevMaxFieldsModelSelector } from "./EventRevMaxFieldsModel.base"
import { EventRevMinFieldsModel } from "./EventRevMinFieldsModel"
import { eventRevMinFieldsModelPrimitives, EventRevMinFieldsModelSelector } from "./EventRevMinFieldsModel.base"
import { EventRevStddevFieldsModel } from "./EventRevStddevFieldsModel"
import { eventRevStddevFieldsModelPrimitives, EventRevStddevFieldsModelSelector } from "./EventRevStddevFieldsModel.base"
import { EventRevStddevPopFieldsModel } from "./EventRevStddevPopFieldsModel"
import { eventRevStddevPopFieldsModelPrimitives, EventRevStddevPopFieldsModelSelector } from "./EventRevStddevPopFieldsModel.base"
import { EventRevStddevSampFieldsModel } from "./EventRevStddevSampFieldsModel"
import { eventRevStddevSampFieldsModelPrimitives, EventRevStddevSampFieldsModelSelector } from "./EventRevStddevSampFieldsModel.base"
import { EventRevSumFieldsModel } from "./EventRevSumFieldsModel"
import { eventRevSumFieldsModelPrimitives, EventRevSumFieldsModelSelector } from "./EventRevSumFieldsModel.base"
import { EventRevVarPopFieldsModel } from "./EventRevVarPopFieldsModel"
import { eventRevVarPopFieldsModelPrimitives, EventRevVarPopFieldsModelSelector } from "./EventRevVarPopFieldsModel.base"
import { EventRevVarSampFieldsModel } from "./EventRevVarSampFieldsModel"
import { eventRevVarSampFieldsModelPrimitives, EventRevVarSampFieldsModelSelector } from "./EventRevVarSampFieldsModel.base"
import { EventRevVarianceFieldsModel } from "./EventRevVarianceFieldsModel"
import { eventRevVarianceFieldsModelPrimitives, EventRevVarianceFieldsModelSelector } from "./EventRevVarianceFieldsModel.base"
import { GartenRevModel } from "./GartenRevModel"
import { gartenRevModelPrimitives, GartenRevModelSelector } from "./GartenRevModel.base"
import { GartenRevAggregateModel } from "./GartenRevAggregateModel"
import { gartenRevAggregateModelPrimitives, GartenRevAggregateModelSelector } from "./GartenRevAggregateModel.base"
import { GartenRevAggregateFieldsModel } from "./GartenRevAggregateFieldsModel"
import { gartenRevAggregateFieldsModelPrimitives, GartenRevAggregateFieldsModelSelector } from "./GartenRevAggregateFieldsModel.base"
import { GartenRevAvgFieldsModel } from "./GartenRevAvgFieldsModel"
import { gartenRevAvgFieldsModelPrimitives, GartenRevAvgFieldsModelSelector } from "./GartenRevAvgFieldsModel.base"
import { GartenRevMaxFieldsModel } from "./GartenRevMaxFieldsModel"
import { gartenRevMaxFieldsModelPrimitives, GartenRevMaxFieldsModelSelector } from "./GartenRevMaxFieldsModel.base"
import { GartenRevMinFieldsModel } from "./GartenRevMinFieldsModel"
import { gartenRevMinFieldsModelPrimitives, GartenRevMinFieldsModelSelector } from "./GartenRevMinFieldsModel.base"
import { GartenRevStddevFieldsModel } from "./GartenRevStddevFieldsModel"
import { gartenRevStddevFieldsModelPrimitives, GartenRevStddevFieldsModelSelector } from "./GartenRevStddevFieldsModel.base"
import { GartenRevStddevPopFieldsModel } from "./GartenRevStddevPopFieldsModel"
import { gartenRevStddevPopFieldsModelPrimitives, GartenRevStddevPopFieldsModelSelector } from "./GartenRevStddevPopFieldsModel.base"
import { GartenRevStddevSampFieldsModel } from "./GartenRevStddevSampFieldsModel"
import { gartenRevStddevSampFieldsModelPrimitives, GartenRevStddevSampFieldsModelSelector } from "./GartenRevStddevSampFieldsModel.base"
import { GartenRevSumFieldsModel } from "./GartenRevSumFieldsModel"
import { gartenRevSumFieldsModelPrimitives, GartenRevSumFieldsModelSelector } from "./GartenRevSumFieldsModel.base"
import { GartenRevVarPopFieldsModel } from "./GartenRevVarPopFieldsModel"
import { gartenRevVarPopFieldsModelPrimitives, GartenRevVarPopFieldsModelSelector } from "./GartenRevVarPopFieldsModel.base"
import { GartenRevVarSampFieldsModel } from "./GartenRevVarSampFieldsModel"
import { gartenRevVarSampFieldsModelPrimitives, GartenRevVarSampFieldsModelSelector } from "./GartenRevVarSampFieldsModel.base"
import { GartenRevVarianceFieldsModel } from "./GartenRevVarianceFieldsModel"
import { gartenRevVarianceFieldsModelPrimitives, GartenRevVarianceFieldsModelSelector } from "./GartenRevVarianceFieldsModel.base"
import { HerkunftAggregateModel } from "./HerkunftAggregateModel"
import { herkunftAggregateModelPrimitives, HerkunftAggregateModelSelector } from "./HerkunftAggregateModel.base"
import { HerkunftAggregateFieldsModel } from "./HerkunftAggregateFieldsModel"
import { herkunftAggregateFieldsModelPrimitives, HerkunftAggregateFieldsModelSelector } from "./HerkunftAggregateFieldsModel.base"
import { HerkunftAvgFieldsModel } from "./HerkunftAvgFieldsModel"
import { herkunftAvgFieldsModelPrimitives, HerkunftAvgFieldsModelSelector } from "./HerkunftAvgFieldsModel.base"
import { HerkunftMaxFieldsModel } from "./HerkunftMaxFieldsModel"
import { herkunftMaxFieldsModelPrimitives, HerkunftMaxFieldsModelSelector } from "./HerkunftMaxFieldsModel.base"
import { HerkunftMinFieldsModel } from "./HerkunftMinFieldsModel"
import { herkunftMinFieldsModelPrimitives, HerkunftMinFieldsModelSelector } from "./HerkunftMinFieldsModel.base"
import { HerkunftStddevFieldsModel } from "./HerkunftStddevFieldsModel"
import { herkunftStddevFieldsModelPrimitives, HerkunftStddevFieldsModelSelector } from "./HerkunftStddevFieldsModel.base"
import { HerkunftStddevPopFieldsModel } from "./HerkunftStddevPopFieldsModel"
import { herkunftStddevPopFieldsModelPrimitives, HerkunftStddevPopFieldsModelSelector } from "./HerkunftStddevPopFieldsModel.base"
import { HerkunftStddevSampFieldsModel } from "./HerkunftStddevSampFieldsModel"
import { herkunftStddevSampFieldsModelPrimitives, HerkunftStddevSampFieldsModelSelector } from "./HerkunftStddevSampFieldsModel.base"
import { HerkunftSumFieldsModel } from "./HerkunftSumFieldsModel"
import { herkunftSumFieldsModelPrimitives, HerkunftSumFieldsModelSelector } from "./HerkunftSumFieldsModel.base"
import { HerkunftVarPopFieldsModel } from "./HerkunftVarPopFieldsModel"
import { herkunftVarPopFieldsModelPrimitives, HerkunftVarPopFieldsModelSelector } from "./HerkunftVarPopFieldsModel.base"
import { HerkunftVarSampFieldsModel } from "./HerkunftVarSampFieldsModel"
import { herkunftVarSampFieldsModelPrimitives, HerkunftVarSampFieldsModelSelector } from "./HerkunftVarSampFieldsModel.base"
import { HerkunftVarianceFieldsModel } from "./HerkunftVarianceFieldsModel"
import { herkunftVarianceFieldsModelPrimitives, HerkunftVarianceFieldsModelSelector } from "./HerkunftVarianceFieldsModel.base"
import { HerkunftRevModel } from "./HerkunftRevModel"
import { herkunftRevModelPrimitives, HerkunftRevModelSelector } from "./HerkunftRevModel.base"
import { HerkunftRevAggregateModel } from "./HerkunftRevAggregateModel"
import { herkunftRevAggregateModelPrimitives, HerkunftRevAggregateModelSelector } from "./HerkunftRevAggregateModel.base"
import { HerkunftRevAggregateFieldsModel } from "./HerkunftRevAggregateFieldsModel"
import { herkunftRevAggregateFieldsModelPrimitives, HerkunftRevAggregateFieldsModelSelector } from "./HerkunftRevAggregateFieldsModel.base"
import { HerkunftRevAvgFieldsModel } from "./HerkunftRevAvgFieldsModel"
import { herkunftRevAvgFieldsModelPrimitives, HerkunftRevAvgFieldsModelSelector } from "./HerkunftRevAvgFieldsModel.base"
import { HerkunftRevMaxFieldsModel } from "./HerkunftRevMaxFieldsModel"
import { herkunftRevMaxFieldsModelPrimitives, HerkunftRevMaxFieldsModelSelector } from "./HerkunftRevMaxFieldsModel.base"
import { HerkunftRevMinFieldsModel } from "./HerkunftRevMinFieldsModel"
import { herkunftRevMinFieldsModelPrimitives, HerkunftRevMinFieldsModelSelector } from "./HerkunftRevMinFieldsModel.base"
import { HerkunftRevStddevFieldsModel } from "./HerkunftRevStddevFieldsModel"
import { herkunftRevStddevFieldsModelPrimitives, HerkunftRevStddevFieldsModelSelector } from "./HerkunftRevStddevFieldsModel.base"
import { HerkunftRevStddevPopFieldsModel } from "./HerkunftRevStddevPopFieldsModel"
import { herkunftRevStddevPopFieldsModelPrimitives, HerkunftRevStddevPopFieldsModelSelector } from "./HerkunftRevStddevPopFieldsModel.base"
import { HerkunftRevStddevSampFieldsModel } from "./HerkunftRevStddevSampFieldsModel"
import { herkunftRevStddevSampFieldsModelPrimitives, HerkunftRevStddevSampFieldsModelSelector } from "./HerkunftRevStddevSampFieldsModel.base"
import { HerkunftRevSumFieldsModel } from "./HerkunftRevSumFieldsModel"
import { herkunftRevSumFieldsModelPrimitives, HerkunftRevSumFieldsModelSelector } from "./HerkunftRevSumFieldsModel.base"
import { HerkunftRevVarPopFieldsModel } from "./HerkunftRevVarPopFieldsModel"
import { herkunftRevVarPopFieldsModelPrimitives, HerkunftRevVarPopFieldsModelSelector } from "./HerkunftRevVarPopFieldsModel.base"
import { HerkunftRevVarSampFieldsModel } from "./HerkunftRevVarSampFieldsModel"
import { herkunftRevVarSampFieldsModelPrimitives, HerkunftRevVarSampFieldsModelSelector } from "./HerkunftRevVarSampFieldsModel.base"
import { HerkunftRevVarianceFieldsModel } from "./HerkunftRevVarianceFieldsModel"
import { herkunftRevVarianceFieldsModelPrimitives, HerkunftRevVarianceFieldsModelSelector } from "./HerkunftRevVarianceFieldsModel.base"
import { KulturOptionAggregateModel } from "./KulturOptionAggregateModel"
import { kulturOptionAggregateModelPrimitives, KulturOptionAggregateModelSelector } from "./KulturOptionAggregateModel.base"
import { KulturOptionAggregateFieldsModel } from "./KulturOptionAggregateFieldsModel"
import { kulturOptionAggregateFieldsModelPrimitives, KulturOptionAggregateFieldsModelSelector } from "./KulturOptionAggregateFieldsModel.base"
import { KulturOptionAvgFieldsModel } from "./KulturOptionAvgFieldsModel"
import { kulturOptionAvgFieldsModelPrimitives, KulturOptionAvgFieldsModelSelector } from "./KulturOptionAvgFieldsModel.base"
import { KulturOptionMaxFieldsModel } from "./KulturOptionMaxFieldsModel"
import { kulturOptionMaxFieldsModelPrimitives, KulturOptionMaxFieldsModelSelector } from "./KulturOptionMaxFieldsModel.base"
import { KulturOptionMinFieldsModel } from "./KulturOptionMinFieldsModel"
import { kulturOptionMinFieldsModelPrimitives, KulturOptionMinFieldsModelSelector } from "./KulturOptionMinFieldsModel.base"
import { KulturOptionStddevFieldsModel } from "./KulturOptionStddevFieldsModel"
import { kulturOptionStddevFieldsModelPrimitives, KulturOptionStddevFieldsModelSelector } from "./KulturOptionStddevFieldsModel.base"
import { KulturOptionStddevPopFieldsModel } from "./KulturOptionStddevPopFieldsModel"
import { kulturOptionStddevPopFieldsModelPrimitives, KulturOptionStddevPopFieldsModelSelector } from "./KulturOptionStddevPopFieldsModel.base"
import { KulturOptionStddevSampFieldsModel } from "./KulturOptionStddevSampFieldsModel"
import { kulturOptionStddevSampFieldsModelPrimitives, KulturOptionStddevSampFieldsModelSelector } from "./KulturOptionStddevSampFieldsModel.base"
import { KulturOptionSumFieldsModel } from "./KulturOptionSumFieldsModel"
import { kulturOptionSumFieldsModelPrimitives, KulturOptionSumFieldsModelSelector } from "./KulturOptionSumFieldsModel.base"
import { KulturOptionVarPopFieldsModel } from "./KulturOptionVarPopFieldsModel"
import { kulturOptionVarPopFieldsModelPrimitives, KulturOptionVarPopFieldsModelSelector } from "./KulturOptionVarPopFieldsModel.base"
import { KulturOptionVarSampFieldsModel } from "./KulturOptionVarSampFieldsModel"
import { kulturOptionVarSampFieldsModelPrimitives, KulturOptionVarSampFieldsModelSelector } from "./KulturOptionVarSampFieldsModel.base"
import { KulturOptionVarianceFieldsModel } from "./KulturOptionVarianceFieldsModel"
import { kulturOptionVarianceFieldsModelPrimitives, KulturOptionVarianceFieldsModelSelector } from "./KulturOptionVarianceFieldsModel.base"
import { KulturOptionRevModel } from "./KulturOptionRevModel"
import { kulturOptionRevModelPrimitives, KulturOptionRevModelSelector } from "./KulturOptionRevModel.base"
import { KulturOptionRevAggregateModel } from "./KulturOptionRevAggregateModel"
import { kulturOptionRevAggregateModelPrimitives, KulturOptionRevAggregateModelSelector } from "./KulturOptionRevAggregateModel.base"
import { KulturOptionRevAggregateFieldsModel } from "./KulturOptionRevAggregateFieldsModel"
import { kulturOptionRevAggregateFieldsModelPrimitives, KulturOptionRevAggregateFieldsModelSelector } from "./KulturOptionRevAggregateFieldsModel.base"
import { KulturOptionRevAvgFieldsModel } from "./KulturOptionRevAvgFieldsModel"
import { kulturOptionRevAvgFieldsModelPrimitives, KulturOptionRevAvgFieldsModelSelector } from "./KulturOptionRevAvgFieldsModel.base"
import { KulturOptionRevMaxFieldsModel } from "./KulturOptionRevMaxFieldsModel"
import { kulturOptionRevMaxFieldsModelPrimitives, KulturOptionRevMaxFieldsModelSelector } from "./KulturOptionRevMaxFieldsModel.base"
import { KulturOptionRevMinFieldsModel } from "./KulturOptionRevMinFieldsModel"
import { kulturOptionRevMinFieldsModelPrimitives, KulturOptionRevMinFieldsModelSelector } from "./KulturOptionRevMinFieldsModel.base"
import { KulturOptionRevStddevFieldsModel } from "./KulturOptionRevStddevFieldsModel"
import { kulturOptionRevStddevFieldsModelPrimitives, KulturOptionRevStddevFieldsModelSelector } from "./KulturOptionRevStddevFieldsModel.base"
import { KulturOptionRevStddevPopFieldsModel } from "./KulturOptionRevStddevPopFieldsModel"
import { kulturOptionRevStddevPopFieldsModelPrimitives, KulturOptionRevStddevPopFieldsModelSelector } from "./KulturOptionRevStddevPopFieldsModel.base"
import { KulturOptionRevStddevSampFieldsModel } from "./KulturOptionRevStddevSampFieldsModel"
import { kulturOptionRevStddevSampFieldsModelPrimitives, KulturOptionRevStddevSampFieldsModelSelector } from "./KulturOptionRevStddevSampFieldsModel.base"
import { KulturOptionRevSumFieldsModel } from "./KulturOptionRevSumFieldsModel"
import { kulturOptionRevSumFieldsModelPrimitives, KulturOptionRevSumFieldsModelSelector } from "./KulturOptionRevSumFieldsModel.base"
import { KulturOptionRevVarPopFieldsModel } from "./KulturOptionRevVarPopFieldsModel"
import { kulturOptionRevVarPopFieldsModelPrimitives, KulturOptionRevVarPopFieldsModelSelector } from "./KulturOptionRevVarPopFieldsModel.base"
import { KulturOptionRevVarSampFieldsModel } from "./KulturOptionRevVarSampFieldsModel"
import { kulturOptionRevVarSampFieldsModelPrimitives, KulturOptionRevVarSampFieldsModelSelector } from "./KulturOptionRevVarSampFieldsModel.base"
import { KulturOptionRevVarianceFieldsModel } from "./KulturOptionRevVarianceFieldsModel"
import { kulturOptionRevVarianceFieldsModelPrimitives, KulturOptionRevVarianceFieldsModelSelector } from "./KulturOptionRevVarianceFieldsModel.base"
import { KulturQkAggregateModel } from "./KulturQkAggregateModel"
import { kulturQkAggregateModelPrimitives, KulturQkAggregateModelSelector } from "./KulturQkAggregateModel.base"
import { KulturQkAggregateFieldsModel } from "./KulturQkAggregateFieldsModel"
import { kulturQkAggregateFieldsModelPrimitives, KulturQkAggregateFieldsModelSelector } from "./KulturQkAggregateFieldsModel.base"
import { KulturQkAvgFieldsModel } from "./KulturQkAvgFieldsModel"
import { kulturQkAvgFieldsModelPrimitives, KulturQkAvgFieldsModelSelector } from "./KulturQkAvgFieldsModel.base"
import { KulturQkMaxFieldsModel } from "./KulturQkMaxFieldsModel"
import { kulturQkMaxFieldsModelPrimitives, KulturQkMaxFieldsModelSelector } from "./KulturQkMaxFieldsModel.base"
import { KulturQkMinFieldsModel } from "./KulturQkMinFieldsModel"
import { kulturQkMinFieldsModelPrimitives, KulturQkMinFieldsModelSelector } from "./KulturQkMinFieldsModel.base"
import { KulturQkStddevFieldsModel } from "./KulturQkStddevFieldsModel"
import { kulturQkStddevFieldsModelPrimitives, KulturQkStddevFieldsModelSelector } from "./KulturQkStddevFieldsModel.base"
import { KulturQkStddevPopFieldsModel } from "./KulturQkStddevPopFieldsModel"
import { kulturQkStddevPopFieldsModelPrimitives, KulturQkStddevPopFieldsModelSelector } from "./KulturQkStddevPopFieldsModel.base"
import { KulturQkStddevSampFieldsModel } from "./KulturQkStddevSampFieldsModel"
import { kulturQkStddevSampFieldsModelPrimitives, KulturQkStddevSampFieldsModelSelector } from "./KulturQkStddevSampFieldsModel.base"
import { KulturQkSumFieldsModel } from "./KulturQkSumFieldsModel"
import { kulturQkSumFieldsModelPrimitives, KulturQkSumFieldsModelSelector } from "./KulturQkSumFieldsModel.base"
import { KulturQkVarPopFieldsModel } from "./KulturQkVarPopFieldsModel"
import { kulturQkVarPopFieldsModelPrimitives, KulturQkVarPopFieldsModelSelector } from "./KulturQkVarPopFieldsModel.base"
import { KulturQkVarSampFieldsModel } from "./KulturQkVarSampFieldsModel"
import { kulturQkVarSampFieldsModelPrimitives, KulturQkVarSampFieldsModelSelector } from "./KulturQkVarSampFieldsModel.base"
import { KulturQkVarianceFieldsModel } from "./KulturQkVarianceFieldsModel"
import { kulturQkVarianceFieldsModelPrimitives, KulturQkVarianceFieldsModelSelector } from "./KulturQkVarianceFieldsModel.base"
import { KulturRevModel } from "./KulturRevModel"
import { kulturRevModelPrimitives, KulturRevModelSelector } from "./KulturRevModel.base"
import { KulturRevAggregateModel } from "./KulturRevAggregateModel"
import { kulturRevAggregateModelPrimitives, KulturRevAggregateModelSelector } from "./KulturRevAggregateModel.base"
import { KulturRevAggregateFieldsModel } from "./KulturRevAggregateFieldsModel"
import { kulturRevAggregateFieldsModelPrimitives, KulturRevAggregateFieldsModelSelector } from "./KulturRevAggregateFieldsModel.base"
import { KulturRevAvgFieldsModel } from "./KulturRevAvgFieldsModel"
import { kulturRevAvgFieldsModelPrimitives, KulturRevAvgFieldsModelSelector } from "./KulturRevAvgFieldsModel.base"
import { KulturRevMaxFieldsModel } from "./KulturRevMaxFieldsModel"
import { kulturRevMaxFieldsModelPrimitives, KulturRevMaxFieldsModelSelector } from "./KulturRevMaxFieldsModel.base"
import { KulturRevMinFieldsModel } from "./KulturRevMinFieldsModel"
import { kulturRevMinFieldsModelPrimitives, KulturRevMinFieldsModelSelector } from "./KulturRevMinFieldsModel.base"
import { KulturRevStddevFieldsModel } from "./KulturRevStddevFieldsModel"
import { kulturRevStddevFieldsModelPrimitives, KulturRevStddevFieldsModelSelector } from "./KulturRevStddevFieldsModel.base"
import { KulturRevStddevPopFieldsModel } from "./KulturRevStddevPopFieldsModel"
import { kulturRevStddevPopFieldsModelPrimitives, KulturRevStddevPopFieldsModelSelector } from "./KulturRevStddevPopFieldsModel.base"
import { KulturRevStddevSampFieldsModel } from "./KulturRevStddevSampFieldsModel"
import { kulturRevStddevSampFieldsModelPrimitives, KulturRevStddevSampFieldsModelSelector } from "./KulturRevStddevSampFieldsModel.base"
import { KulturRevSumFieldsModel } from "./KulturRevSumFieldsModel"
import { kulturRevSumFieldsModelPrimitives, KulturRevSumFieldsModelSelector } from "./KulturRevSumFieldsModel.base"
import { KulturRevVarPopFieldsModel } from "./KulturRevVarPopFieldsModel"
import { kulturRevVarPopFieldsModelPrimitives, KulturRevVarPopFieldsModelSelector } from "./KulturRevVarPopFieldsModel.base"
import { KulturRevVarSampFieldsModel } from "./KulturRevVarSampFieldsModel"
import { kulturRevVarSampFieldsModelPrimitives, KulturRevVarSampFieldsModelSelector } from "./KulturRevVarSampFieldsModel.base"
import { KulturRevVarianceFieldsModel } from "./KulturRevVarianceFieldsModel"
import { kulturRevVarianceFieldsModelPrimitives, KulturRevVarianceFieldsModelSelector } from "./KulturRevVarianceFieldsModel.base"
import { LieferungRevModel } from "./LieferungRevModel"
import { lieferungRevModelPrimitives, LieferungRevModelSelector } from "./LieferungRevModel.base"
import { LieferungRevAggregateModel } from "./LieferungRevAggregateModel"
import { lieferungRevAggregateModelPrimitives, LieferungRevAggregateModelSelector } from "./LieferungRevAggregateModel.base"
import { LieferungRevAggregateFieldsModel } from "./LieferungRevAggregateFieldsModel"
import { lieferungRevAggregateFieldsModelPrimitives, LieferungRevAggregateFieldsModelSelector } from "./LieferungRevAggregateFieldsModel.base"
import { LieferungRevAvgFieldsModel } from "./LieferungRevAvgFieldsModel"
import { lieferungRevAvgFieldsModelPrimitives, LieferungRevAvgFieldsModelSelector } from "./LieferungRevAvgFieldsModel.base"
import { LieferungRevMaxFieldsModel } from "./LieferungRevMaxFieldsModel"
import { lieferungRevMaxFieldsModelPrimitives, LieferungRevMaxFieldsModelSelector } from "./LieferungRevMaxFieldsModel.base"
import { LieferungRevMinFieldsModel } from "./LieferungRevMinFieldsModel"
import { lieferungRevMinFieldsModelPrimitives, LieferungRevMinFieldsModelSelector } from "./LieferungRevMinFieldsModel.base"
import { LieferungRevStddevFieldsModel } from "./LieferungRevStddevFieldsModel"
import { lieferungRevStddevFieldsModelPrimitives, LieferungRevStddevFieldsModelSelector } from "./LieferungRevStddevFieldsModel.base"
import { LieferungRevStddevPopFieldsModel } from "./LieferungRevStddevPopFieldsModel"
import { lieferungRevStddevPopFieldsModelPrimitives, LieferungRevStddevPopFieldsModelSelector } from "./LieferungRevStddevPopFieldsModel.base"
import { LieferungRevStddevSampFieldsModel } from "./LieferungRevStddevSampFieldsModel"
import { lieferungRevStddevSampFieldsModelPrimitives, LieferungRevStddevSampFieldsModelSelector } from "./LieferungRevStddevSampFieldsModel.base"
import { LieferungRevSumFieldsModel } from "./LieferungRevSumFieldsModel"
import { lieferungRevSumFieldsModelPrimitives, LieferungRevSumFieldsModelSelector } from "./LieferungRevSumFieldsModel.base"
import { LieferungRevVarPopFieldsModel } from "./LieferungRevVarPopFieldsModel"
import { lieferungRevVarPopFieldsModelPrimitives, LieferungRevVarPopFieldsModelSelector } from "./LieferungRevVarPopFieldsModel.base"
import { LieferungRevVarSampFieldsModel } from "./LieferungRevVarSampFieldsModel"
import { lieferungRevVarSampFieldsModelPrimitives, LieferungRevVarSampFieldsModelSelector } from "./LieferungRevVarSampFieldsModel.base"
import { LieferungRevVarianceFieldsModel } from "./LieferungRevVarianceFieldsModel"
import { lieferungRevVarianceFieldsModelPrimitives, LieferungRevVarianceFieldsModelSelector } from "./LieferungRevVarianceFieldsModel.base"
import { PersonOptionAggregateModel } from "./PersonOptionAggregateModel"
import { personOptionAggregateModelPrimitives, PersonOptionAggregateModelSelector } from "./PersonOptionAggregateModel.base"
import { PersonOptionAggregateFieldsModel } from "./PersonOptionAggregateFieldsModel"
import { personOptionAggregateFieldsModelPrimitives, PersonOptionAggregateFieldsModelSelector } from "./PersonOptionAggregateFieldsModel.base"
import { PersonOptionAvgFieldsModel } from "./PersonOptionAvgFieldsModel"
import { personOptionAvgFieldsModelPrimitives, PersonOptionAvgFieldsModelSelector } from "./PersonOptionAvgFieldsModel.base"
import { PersonOptionMaxFieldsModel } from "./PersonOptionMaxFieldsModel"
import { personOptionMaxFieldsModelPrimitives, PersonOptionMaxFieldsModelSelector } from "./PersonOptionMaxFieldsModel.base"
import { PersonOptionMinFieldsModel } from "./PersonOptionMinFieldsModel"
import { personOptionMinFieldsModelPrimitives, PersonOptionMinFieldsModelSelector } from "./PersonOptionMinFieldsModel.base"
import { PersonOptionStddevFieldsModel } from "./PersonOptionStddevFieldsModel"
import { personOptionStddevFieldsModelPrimitives, PersonOptionStddevFieldsModelSelector } from "./PersonOptionStddevFieldsModel.base"
import { PersonOptionStddevPopFieldsModel } from "./PersonOptionStddevPopFieldsModel"
import { personOptionStddevPopFieldsModelPrimitives, PersonOptionStddevPopFieldsModelSelector } from "./PersonOptionStddevPopFieldsModel.base"
import { PersonOptionStddevSampFieldsModel } from "./PersonOptionStddevSampFieldsModel"
import { personOptionStddevSampFieldsModelPrimitives, PersonOptionStddevSampFieldsModelSelector } from "./PersonOptionStddevSampFieldsModel.base"
import { PersonOptionSumFieldsModel } from "./PersonOptionSumFieldsModel"
import { personOptionSumFieldsModelPrimitives, PersonOptionSumFieldsModelSelector } from "./PersonOptionSumFieldsModel.base"
import { PersonOptionVarPopFieldsModel } from "./PersonOptionVarPopFieldsModel"
import { personOptionVarPopFieldsModelPrimitives, PersonOptionVarPopFieldsModelSelector } from "./PersonOptionVarPopFieldsModel.base"
import { PersonOptionVarSampFieldsModel } from "./PersonOptionVarSampFieldsModel"
import { personOptionVarSampFieldsModelPrimitives, PersonOptionVarSampFieldsModelSelector } from "./PersonOptionVarSampFieldsModel.base"
import { PersonOptionVarianceFieldsModel } from "./PersonOptionVarianceFieldsModel"
import { personOptionVarianceFieldsModelPrimitives, PersonOptionVarianceFieldsModelSelector } from "./PersonOptionVarianceFieldsModel.base"
import { PersonOptionRevModel } from "./PersonOptionRevModel"
import { personOptionRevModelPrimitives, PersonOptionRevModelSelector } from "./PersonOptionRevModel.base"
import { PersonOptionRevAggregateModel } from "./PersonOptionRevAggregateModel"
import { personOptionRevAggregateModelPrimitives, PersonOptionRevAggregateModelSelector } from "./PersonOptionRevAggregateModel.base"
import { PersonOptionRevAggregateFieldsModel } from "./PersonOptionRevAggregateFieldsModel"
import { personOptionRevAggregateFieldsModelPrimitives, PersonOptionRevAggregateFieldsModelSelector } from "./PersonOptionRevAggregateFieldsModel.base"
import { PersonOptionRevAvgFieldsModel } from "./PersonOptionRevAvgFieldsModel"
import { personOptionRevAvgFieldsModelPrimitives, PersonOptionRevAvgFieldsModelSelector } from "./PersonOptionRevAvgFieldsModel.base"
import { PersonOptionRevMaxFieldsModel } from "./PersonOptionRevMaxFieldsModel"
import { personOptionRevMaxFieldsModelPrimitives, PersonOptionRevMaxFieldsModelSelector } from "./PersonOptionRevMaxFieldsModel.base"
import { PersonOptionRevMinFieldsModel } from "./PersonOptionRevMinFieldsModel"
import { personOptionRevMinFieldsModelPrimitives, PersonOptionRevMinFieldsModelSelector } from "./PersonOptionRevMinFieldsModel.base"
import { PersonOptionRevStddevFieldsModel } from "./PersonOptionRevStddevFieldsModel"
import { personOptionRevStddevFieldsModelPrimitives, PersonOptionRevStddevFieldsModelSelector } from "./PersonOptionRevStddevFieldsModel.base"
import { PersonOptionRevStddevPopFieldsModel } from "./PersonOptionRevStddevPopFieldsModel"
import { personOptionRevStddevPopFieldsModelPrimitives, PersonOptionRevStddevPopFieldsModelSelector } from "./PersonOptionRevStddevPopFieldsModel.base"
import { PersonOptionRevStddevSampFieldsModel } from "./PersonOptionRevStddevSampFieldsModel"
import { personOptionRevStddevSampFieldsModelPrimitives, PersonOptionRevStddevSampFieldsModelSelector } from "./PersonOptionRevStddevSampFieldsModel.base"
import { PersonOptionRevSumFieldsModel } from "./PersonOptionRevSumFieldsModel"
import { personOptionRevSumFieldsModelPrimitives, PersonOptionRevSumFieldsModelSelector } from "./PersonOptionRevSumFieldsModel.base"
import { PersonOptionRevVarPopFieldsModel } from "./PersonOptionRevVarPopFieldsModel"
import { personOptionRevVarPopFieldsModelPrimitives, PersonOptionRevVarPopFieldsModelSelector } from "./PersonOptionRevVarPopFieldsModel.base"
import { PersonOptionRevVarSampFieldsModel } from "./PersonOptionRevVarSampFieldsModel"
import { personOptionRevVarSampFieldsModelPrimitives, PersonOptionRevVarSampFieldsModelSelector } from "./PersonOptionRevVarSampFieldsModel.base"
import { PersonOptionRevVarianceFieldsModel } from "./PersonOptionRevVarianceFieldsModel"
import { personOptionRevVarianceFieldsModelPrimitives, PersonOptionRevVarianceFieldsModelSelector } from "./PersonOptionRevVarianceFieldsModel.base"
import { SammelLieferungRevModel } from "./SammelLieferungRevModel"
import { sammelLieferungRevModelPrimitives, SammelLieferungRevModelSelector } from "./SammelLieferungRevModel.base"
import { SammelLieferungRevAggregateModel } from "./SammelLieferungRevAggregateModel"
import { sammelLieferungRevAggregateModelPrimitives, SammelLieferungRevAggregateModelSelector } from "./SammelLieferungRevAggregateModel.base"
import { SammelLieferungRevAggregateFieldsModel } from "./SammelLieferungRevAggregateFieldsModel"
import { sammelLieferungRevAggregateFieldsModelPrimitives, SammelLieferungRevAggregateFieldsModelSelector } from "./SammelLieferungRevAggregateFieldsModel.base"
import { SammelLieferungRevAvgFieldsModel } from "./SammelLieferungRevAvgFieldsModel"
import { sammelLieferungRevAvgFieldsModelPrimitives, SammelLieferungRevAvgFieldsModelSelector } from "./SammelLieferungRevAvgFieldsModel.base"
import { SammelLieferungRevMaxFieldsModel } from "./SammelLieferungRevMaxFieldsModel"
import { sammelLieferungRevMaxFieldsModelPrimitives, SammelLieferungRevMaxFieldsModelSelector } from "./SammelLieferungRevMaxFieldsModel.base"
import { SammelLieferungRevMinFieldsModel } from "./SammelLieferungRevMinFieldsModel"
import { sammelLieferungRevMinFieldsModelPrimitives, SammelLieferungRevMinFieldsModelSelector } from "./SammelLieferungRevMinFieldsModel.base"
import { SammelLieferungRevStddevFieldsModel } from "./SammelLieferungRevStddevFieldsModel"
import { sammelLieferungRevStddevFieldsModelPrimitives, SammelLieferungRevStddevFieldsModelSelector } from "./SammelLieferungRevStddevFieldsModel.base"
import { SammelLieferungRevStddevPopFieldsModel } from "./SammelLieferungRevStddevPopFieldsModel"
import { sammelLieferungRevStddevPopFieldsModelPrimitives, SammelLieferungRevStddevPopFieldsModelSelector } from "./SammelLieferungRevStddevPopFieldsModel.base"
import { SammelLieferungRevStddevSampFieldsModel } from "./SammelLieferungRevStddevSampFieldsModel"
import { sammelLieferungRevStddevSampFieldsModelPrimitives, SammelLieferungRevStddevSampFieldsModelSelector } from "./SammelLieferungRevStddevSampFieldsModel.base"
import { SammelLieferungRevSumFieldsModel } from "./SammelLieferungRevSumFieldsModel"
import { sammelLieferungRevSumFieldsModelPrimitives, SammelLieferungRevSumFieldsModelSelector } from "./SammelLieferungRevSumFieldsModel.base"
import { SammelLieferungRevVarPopFieldsModel } from "./SammelLieferungRevVarPopFieldsModel"
import { sammelLieferungRevVarPopFieldsModelPrimitives, SammelLieferungRevVarPopFieldsModelSelector } from "./SammelLieferungRevVarPopFieldsModel.base"
import { SammelLieferungRevVarSampFieldsModel } from "./SammelLieferungRevVarSampFieldsModel"
import { sammelLieferungRevVarSampFieldsModelPrimitives, SammelLieferungRevVarSampFieldsModelSelector } from "./SammelLieferungRevVarSampFieldsModel.base"
import { SammelLieferungRevVarianceFieldsModel } from "./SammelLieferungRevVarianceFieldsModel"
import { sammelLieferungRevVarianceFieldsModelPrimitives, SammelLieferungRevVarianceFieldsModelSelector } from "./SammelLieferungRevVarianceFieldsModel.base"
import { SammlungRevModel } from "./SammlungRevModel"
import { sammlungRevModelPrimitives, SammlungRevModelSelector } from "./SammlungRevModel.base"
import { SammlungRevAggregateModel } from "./SammlungRevAggregateModel"
import { sammlungRevAggregateModelPrimitives, SammlungRevAggregateModelSelector } from "./SammlungRevAggregateModel.base"
import { SammlungRevAggregateFieldsModel } from "./SammlungRevAggregateFieldsModel"
import { sammlungRevAggregateFieldsModelPrimitives, SammlungRevAggregateFieldsModelSelector } from "./SammlungRevAggregateFieldsModel.base"
import { SammlungRevAvgFieldsModel } from "./SammlungRevAvgFieldsModel"
import { sammlungRevAvgFieldsModelPrimitives, SammlungRevAvgFieldsModelSelector } from "./SammlungRevAvgFieldsModel.base"
import { SammlungRevMaxFieldsModel } from "./SammlungRevMaxFieldsModel"
import { sammlungRevMaxFieldsModelPrimitives, SammlungRevMaxFieldsModelSelector } from "./SammlungRevMaxFieldsModel.base"
import { SammlungRevMinFieldsModel } from "./SammlungRevMinFieldsModel"
import { sammlungRevMinFieldsModelPrimitives, SammlungRevMinFieldsModelSelector } from "./SammlungRevMinFieldsModel.base"
import { SammlungRevStddevFieldsModel } from "./SammlungRevStddevFieldsModel"
import { sammlungRevStddevFieldsModelPrimitives, SammlungRevStddevFieldsModelSelector } from "./SammlungRevStddevFieldsModel.base"
import { SammlungRevStddevPopFieldsModel } from "./SammlungRevStddevPopFieldsModel"
import { sammlungRevStddevPopFieldsModelPrimitives, SammlungRevStddevPopFieldsModelSelector } from "./SammlungRevStddevPopFieldsModel.base"
import { SammlungRevStddevSampFieldsModel } from "./SammlungRevStddevSampFieldsModel"
import { sammlungRevStddevSampFieldsModelPrimitives, SammlungRevStddevSampFieldsModelSelector } from "./SammlungRevStddevSampFieldsModel.base"
import { SammlungRevSumFieldsModel } from "./SammlungRevSumFieldsModel"
import { sammlungRevSumFieldsModelPrimitives, SammlungRevSumFieldsModelSelector } from "./SammlungRevSumFieldsModel.base"
import { SammlungRevVarPopFieldsModel } from "./SammlungRevVarPopFieldsModel"
import { sammlungRevVarPopFieldsModelPrimitives, SammlungRevVarPopFieldsModelSelector } from "./SammlungRevVarPopFieldsModel.base"
import { SammlungRevVarSampFieldsModel } from "./SammlungRevVarSampFieldsModel"
import { sammlungRevVarSampFieldsModelPrimitives, SammlungRevVarSampFieldsModelSelector } from "./SammlungRevVarSampFieldsModel.base"
import { SammlungRevVarianceFieldsModel } from "./SammlungRevVarianceFieldsModel"
import { sammlungRevVarianceFieldsModelPrimitives, SammlungRevVarianceFieldsModelSelector } from "./SammlungRevVarianceFieldsModel.base"
import { SpatialRefSysModel } from "./SpatialRefSysModel"
import { spatialRefSysModelPrimitives, SpatialRefSysModelSelector } from "./SpatialRefSysModel.base"
import { SpatialRefSysAggregateModel } from "./SpatialRefSysAggregateModel"
import { spatialRefSysAggregateModelPrimitives, SpatialRefSysAggregateModelSelector } from "./SpatialRefSysAggregateModel.base"
import { SpatialRefSysAggregateFieldsModel } from "./SpatialRefSysAggregateFieldsModel"
import { spatialRefSysAggregateFieldsModelPrimitives, SpatialRefSysAggregateFieldsModelSelector } from "./SpatialRefSysAggregateFieldsModel.base"
import { SpatialRefSysAvgFieldsModel } from "./SpatialRefSysAvgFieldsModel"
import { spatialRefSysAvgFieldsModelPrimitives, SpatialRefSysAvgFieldsModelSelector } from "./SpatialRefSysAvgFieldsModel.base"
import { SpatialRefSysMaxFieldsModel } from "./SpatialRefSysMaxFieldsModel"
import { spatialRefSysMaxFieldsModelPrimitives, SpatialRefSysMaxFieldsModelSelector } from "./SpatialRefSysMaxFieldsModel.base"
import { SpatialRefSysMinFieldsModel } from "./SpatialRefSysMinFieldsModel"
import { spatialRefSysMinFieldsModelPrimitives, SpatialRefSysMinFieldsModelSelector } from "./SpatialRefSysMinFieldsModel.base"
import { SpatialRefSysStddevFieldsModel } from "./SpatialRefSysStddevFieldsModel"
import { spatialRefSysStddevFieldsModelPrimitives, SpatialRefSysStddevFieldsModelSelector } from "./SpatialRefSysStddevFieldsModel.base"
import { SpatialRefSysStddevPopFieldsModel } from "./SpatialRefSysStddevPopFieldsModel"
import { spatialRefSysStddevPopFieldsModelPrimitives, SpatialRefSysStddevPopFieldsModelSelector } from "./SpatialRefSysStddevPopFieldsModel.base"
import { SpatialRefSysStddevSampFieldsModel } from "./SpatialRefSysStddevSampFieldsModel"
import { spatialRefSysStddevSampFieldsModelPrimitives, SpatialRefSysStddevSampFieldsModelSelector } from "./SpatialRefSysStddevSampFieldsModel.base"
import { SpatialRefSysSumFieldsModel } from "./SpatialRefSysSumFieldsModel"
import { spatialRefSysSumFieldsModelPrimitives, SpatialRefSysSumFieldsModelSelector } from "./SpatialRefSysSumFieldsModel.base"
import { SpatialRefSysVarPopFieldsModel } from "./SpatialRefSysVarPopFieldsModel"
import { spatialRefSysVarPopFieldsModelPrimitives, SpatialRefSysVarPopFieldsModelSelector } from "./SpatialRefSysVarPopFieldsModel.base"
import { SpatialRefSysVarSampFieldsModel } from "./SpatialRefSysVarSampFieldsModel"
import { spatialRefSysVarSampFieldsModelPrimitives, SpatialRefSysVarSampFieldsModelSelector } from "./SpatialRefSysVarSampFieldsModel.base"
import { SpatialRefSysVarianceFieldsModel } from "./SpatialRefSysVarianceFieldsModel"
import { spatialRefSysVarianceFieldsModelPrimitives, SpatialRefSysVarianceFieldsModelSelector } from "./SpatialRefSysVarianceFieldsModel.base"
import { TeilkulturRevModel } from "./TeilkulturRevModel"
import { teilkulturRevModelPrimitives, TeilkulturRevModelSelector } from "./TeilkulturRevModel.base"
import { TeilkulturRevAggregateModel } from "./TeilkulturRevAggregateModel"
import { teilkulturRevAggregateModelPrimitives, TeilkulturRevAggregateModelSelector } from "./TeilkulturRevAggregateModel.base"
import { TeilkulturRevAggregateFieldsModel } from "./TeilkulturRevAggregateFieldsModel"
import { teilkulturRevAggregateFieldsModelPrimitives, TeilkulturRevAggregateFieldsModelSelector } from "./TeilkulturRevAggregateFieldsModel.base"
import { TeilkulturRevAvgFieldsModel } from "./TeilkulturRevAvgFieldsModel"
import { teilkulturRevAvgFieldsModelPrimitives, TeilkulturRevAvgFieldsModelSelector } from "./TeilkulturRevAvgFieldsModel.base"
import { TeilkulturRevMaxFieldsModel } from "./TeilkulturRevMaxFieldsModel"
import { teilkulturRevMaxFieldsModelPrimitives, TeilkulturRevMaxFieldsModelSelector } from "./TeilkulturRevMaxFieldsModel.base"
import { TeilkulturRevMinFieldsModel } from "./TeilkulturRevMinFieldsModel"
import { teilkulturRevMinFieldsModelPrimitives, TeilkulturRevMinFieldsModelSelector } from "./TeilkulturRevMinFieldsModel.base"
import { TeilkulturRevStddevFieldsModel } from "./TeilkulturRevStddevFieldsModel"
import { teilkulturRevStddevFieldsModelPrimitives, TeilkulturRevStddevFieldsModelSelector } from "./TeilkulturRevStddevFieldsModel.base"
import { TeilkulturRevStddevPopFieldsModel } from "./TeilkulturRevStddevPopFieldsModel"
import { teilkulturRevStddevPopFieldsModelPrimitives, TeilkulturRevStddevPopFieldsModelSelector } from "./TeilkulturRevStddevPopFieldsModel.base"
import { TeilkulturRevStddevSampFieldsModel } from "./TeilkulturRevStddevSampFieldsModel"
import { teilkulturRevStddevSampFieldsModelPrimitives, TeilkulturRevStddevSampFieldsModelSelector } from "./TeilkulturRevStddevSampFieldsModel.base"
import { TeilkulturRevSumFieldsModel } from "./TeilkulturRevSumFieldsModel"
import { teilkulturRevSumFieldsModelPrimitives, TeilkulturRevSumFieldsModelSelector } from "./TeilkulturRevSumFieldsModel.base"
import { TeilkulturRevVarPopFieldsModel } from "./TeilkulturRevVarPopFieldsModel"
import { teilkulturRevVarPopFieldsModelPrimitives, TeilkulturRevVarPopFieldsModelSelector } from "./TeilkulturRevVarPopFieldsModel.base"
import { TeilkulturRevVarSampFieldsModel } from "./TeilkulturRevVarSampFieldsModel"
import { teilkulturRevVarSampFieldsModelPrimitives, TeilkulturRevVarSampFieldsModelSelector } from "./TeilkulturRevVarSampFieldsModel.base"
import { TeilkulturRevVarianceFieldsModel } from "./TeilkulturRevVarianceFieldsModel"
import { teilkulturRevVarianceFieldsModelPrimitives, TeilkulturRevVarianceFieldsModelSelector } from "./TeilkulturRevVarianceFieldsModel.base"
import { TeilzaehlungRevModel } from "./TeilzaehlungRevModel"
import { teilzaehlungRevModelPrimitives, TeilzaehlungRevModelSelector } from "./TeilzaehlungRevModel.base"
import { TeilzaehlungRevAggregateModel } from "./TeilzaehlungRevAggregateModel"
import { teilzaehlungRevAggregateModelPrimitives, TeilzaehlungRevAggregateModelSelector } from "./TeilzaehlungRevAggregateModel.base"
import { TeilzaehlungRevAggregateFieldsModel } from "./TeilzaehlungRevAggregateFieldsModel"
import { teilzaehlungRevAggregateFieldsModelPrimitives, TeilzaehlungRevAggregateFieldsModelSelector } from "./TeilzaehlungRevAggregateFieldsModel.base"
import { TeilzaehlungRevAvgFieldsModel } from "./TeilzaehlungRevAvgFieldsModel"
import { teilzaehlungRevAvgFieldsModelPrimitives, TeilzaehlungRevAvgFieldsModelSelector } from "./TeilzaehlungRevAvgFieldsModel.base"
import { TeilzaehlungRevMaxFieldsModel } from "./TeilzaehlungRevMaxFieldsModel"
import { teilzaehlungRevMaxFieldsModelPrimitives, TeilzaehlungRevMaxFieldsModelSelector } from "./TeilzaehlungRevMaxFieldsModel.base"
import { TeilzaehlungRevMinFieldsModel } from "./TeilzaehlungRevMinFieldsModel"
import { teilzaehlungRevMinFieldsModelPrimitives, TeilzaehlungRevMinFieldsModelSelector } from "./TeilzaehlungRevMinFieldsModel.base"
import { TeilzaehlungRevStddevFieldsModel } from "./TeilzaehlungRevStddevFieldsModel"
import { teilzaehlungRevStddevFieldsModelPrimitives, TeilzaehlungRevStddevFieldsModelSelector } from "./TeilzaehlungRevStddevFieldsModel.base"
import { TeilzaehlungRevStddevPopFieldsModel } from "./TeilzaehlungRevStddevPopFieldsModel"
import { teilzaehlungRevStddevPopFieldsModelPrimitives, TeilzaehlungRevStddevPopFieldsModelSelector } from "./TeilzaehlungRevStddevPopFieldsModel.base"
import { TeilzaehlungRevStddevSampFieldsModel } from "./TeilzaehlungRevStddevSampFieldsModel"
import { teilzaehlungRevStddevSampFieldsModelPrimitives, TeilzaehlungRevStddevSampFieldsModelSelector } from "./TeilzaehlungRevStddevSampFieldsModel.base"
import { TeilzaehlungRevSumFieldsModel } from "./TeilzaehlungRevSumFieldsModel"
import { teilzaehlungRevSumFieldsModelPrimitives, TeilzaehlungRevSumFieldsModelSelector } from "./TeilzaehlungRevSumFieldsModel.base"
import { TeilzaehlungRevVarPopFieldsModel } from "./TeilzaehlungRevVarPopFieldsModel"
import { teilzaehlungRevVarPopFieldsModelPrimitives, TeilzaehlungRevVarPopFieldsModelSelector } from "./TeilzaehlungRevVarPopFieldsModel.base"
import { TeilzaehlungRevVarSampFieldsModel } from "./TeilzaehlungRevVarSampFieldsModel"
import { teilzaehlungRevVarSampFieldsModelPrimitives, TeilzaehlungRevVarSampFieldsModelSelector } from "./TeilzaehlungRevVarSampFieldsModel.base"
import { TeilzaehlungRevVarianceFieldsModel } from "./TeilzaehlungRevVarianceFieldsModel"
import { teilzaehlungRevVarianceFieldsModelPrimitives, TeilzaehlungRevVarianceFieldsModelSelector } from "./TeilzaehlungRevVarianceFieldsModel.base"
import { UserRoleAggregateModel } from "./UserRoleAggregateModel"
import { userRoleAggregateModelPrimitives, UserRoleAggregateModelSelector } from "./UserRoleAggregateModel.base"
import { UserRoleAggregateFieldsModel } from "./UserRoleAggregateFieldsModel"
import { userRoleAggregateFieldsModelPrimitives, UserRoleAggregateFieldsModelSelector } from "./UserRoleAggregateFieldsModel.base"
import { UserRoleAvgFieldsModel } from "./UserRoleAvgFieldsModel"
import { userRoleAvgFieldsModelPrimitives, UserRoleAvgFieldsModelSelector } from "./UserRoleAvgFieldsModel.base"
import { UserRoleMaxFieldsModel } from "./UserRoleMaxFieldsModel"
import { userRoleMaxFieldsModelPrimitives, UserRoleMaxFieldsModelSelector } from "./UserRoleMaxFieldsModel.base"
import { UserRoleMinFieldsModel } from "./UserRoleMinFieldsModel"
import { userRoleMinFieldsModelPrimitives, UserRoleMinFieldsModelSelector } from "./UserRoleMinFieldsModel.base"
import { UserRoleStddevFieldsModel } from "./UserRoleStddevFieldsModel"
import { userRoleStddevFieldsModelPrimitives, UserRoleStddevFieldsModelSelector } from "./UserRoleStddevFieldsModel.base"
import { UserRoleStddevPopFieldsModel } from "./UserRoleStddevPopFieldsModel"
import { userRoleStddevPopFieldsModelPrimitives, UserRoleStddevPopFieldsModelSelector } from "./UserRoleStddevPopFieldsModel.base"
import { UserRoleStddevSampFieldsModel } from "./UserRoleStddevSampFieldsModel"
import { userRoleStddevSampFieldsModelPrimitives, UserRoleStddevSampFieldsModelSelector } from "./UserRoleStddevSampFieldsModel.base"
import { UserRoleSumFieldsModel } from "./UserRoleSumFieldsModel"
import { userRoleSumFieldsModelPrimitives, UserRoleSumFieldsModelSelector } from "./UserRoleSumFieldsModel.base"
import { UserRoleVarPopFieldsModel } from "./UserRoleVarPopFieldsModel"
import { userRoleVarPopFieldsModelPrimitives, UserRoleVarPopFieldsModelSelector } from "./UserRoleVarPopFieldsModel.base"
import { UserRoleVarSampFieldsModel } from "./UserRoleVarSampFieldsModel"
import { userRoleVarSampFieldsModelPrimitives, UserRoleVarSampFieldsModelSelector } from "./UserRoleVarSampFieldsModel.base"
import { UserRoleVarianceFieldsModel } from "./UserRoleVarianceFieldsModel"
import { userRoleVarianceFieldsModelPrimitives, UserRoleVarianceFieldsModelSelector } from "./UserRoleVarianceFieldsModel.base"
import { ZaehlungRevModel } from "./ZaehlungRevModel"
import { zaehlungRevModelPrimitives, ZaehlungRevModelSelector } from "./ZaehlungRevModel.base"
import { ZaehlungRevAggregateModel } from "./ZaehlungRevAggregateModel"
import { zaehlungRevAggregateModelPrimitives, ZaehlungRevAggregateModelSelector } from "./ZaehlungRevAggregateModel.base"
import { ZaehlungRevAggregateFieldsModel } from "./ZaehlungRevAggregateFieldsModel"
import { zaehlungRevAggregateFieldsModelPrimitives, ZaehlungRevAggregateFieldsModelSelector } from "./ZaehlungRevAggregateFieldsModel.base"
import { ZaehlungRevAvgFieldsModel } from "./ZaehlungRevAvgFieldsModel"
import { zaehlungRevAvgFieldsModelPrimitives, ZaehlungRevAvgFieldsModelSelector } from "./ZaehlungRevAvgFieldsModel.base"
import { ZaehlungRevMaxFieldsModel } from "./ZaehlungRevMaxFieldsModel"
import { zaehlungRevMaxFieldsModelPrimitives, ZaehlungRevMaxFieldsModelSelector } from "./ZaehlungRevMaxFieldsModel.base"
import { ZaehlungRevMinFieldsModel } from "./ZaehlungRevMinFieldsModel"
import { zaehlungRevMinFieldsModelPrimitives, ZaehlungRevMinFieldsModelSelector } from "./ZaehlungRevMinFieldsModel.base"
import { ZaehlungRevStddevFieldsModel } from "./ZaehlungRevStddevFieldsModel"
import { zaehlungRevStddevFieldsModelPrimitives, ZaehlungRevStddevFieldsModelSelector } from "./ZaehlungRevStddevFieldsModel.base"
import { ZaehlungRevStddevPopFieldsModel } from "./ZaehlungRevStddevPopFieldsModel"
import { zaehlungRevStddevPopFieldsModelPrimitives, ZaehlungRevStddevPopFieldsModelSelector } from "./ZaehlungRevStddevPopFieldsModel.base"
import { ZaehlungRevStddevSampFieldsModel } from "./ZaehlungRevStddevSampFieldsModel"
import { zaehlungRevStddevSampFieldsModelPrimitives, ZaehlungRevStddevSampFieldsModelSelector } from "./ZaehlungRevStddevSampFieldsModel.base"
import { ZaehlungRevSumFieldsModel } from "./ZaehlungRevSumFieldsModel"
import { zaehlungRevSumFieldsModelPrimitives, ZaehlungRevSumFieldsModelSelector } from "./ZaehlungRevSumFieldsModel.base"
import { ZaehlungRevVarPopFieldsModel } from "./ZaehlungRevVarPopFieldsModel"
import { zaehlungRevVarPopFieldsModelPrimitives, ZaehlungRevVarPopFieldsModelSelector } from "./ZaehlungRevVarPopFieldsModel.base"
import { ZaehlungRevVarSampFieldsModel } from "./ZaehlungRevVarSampFieldsModel"
import { zaehlungRevVarSampFieldsModelPrimitives, ZaehlungRevVarSampFieldsModelSelector } from "./ZaehlungRevVarSampFieldsModel.base"
import { ZaehlungRevVarianceFieldsModel } from "./ZaehlungRevVarianceFieldsModel"
import { zaehlungRevVarianceFieldsModelPrimitives, ZaehlungRevVarianceFieldsModelSelector } from "./ZaehlungRevVarianceFieldsModel.base"
import { MutationRootModel } from "./MutationRootModel"
import { mutationRootModelPrimitives, MutationRootModelSelector } from "./MutationRootModel.base"
import { AeArtMutationResponseModel } from "./AeArtMutationResponseModel"
import { aeArtMutationResponseModelPrimitives, AeArtMutationResponseModelSelector } from "./AeArtMutationResponseModel.base"
import { ArtMutationResponseModel } from "./ArtMutationResponseModel"
import { artMutationResponseModelPrimitives, ArtMutationResponseModelSelector } from "./ArtMutationResponseModel.base"
import { ArtFileMutationResponseModel } from "./ArtFileMutationResponseModel"
import { artFileMutationResponseModelPrimitives, ArtFileMutationResponseModelSelector } from "./ArtFileMutationResponseModel.base"
import { ArtQkMutationResponseModel } from "./ArtQkMutationResponseModel"
import { artQkMutationResponseModelPrimitives, ArtQkMutationResponseModelSelector } from "./ArtQkMutationResponseModel.base"
import { ArtQkChoosenMutationResponseModel } from "./ArtQkChoosenMutationResponseModel"
import { artQkChoosenMutationResponseModelPrimitives, ArtQkChoosenMutationResponseModelSelector } from "./ArtQkChoosenMutationResponseModel.base"
import { ArtRevMutationResponseModel } from "./ArtRevMutationResponseModel"
import { artRevMutationResponseModelPrimitives, ArtRevMutationResponseModelSelector } from "./ArtRevMutationResponseModel.base"
import { AvArtMutationResponseModel } from "./AvArtMutationResponseModel"
import { avArtMutationResponseModelPrimitives, AvArtMutationResponseModelSelector } from "./AvArtMutationResponseModel.base"
import { EventMutationResponseModel } from "./EventMutationResponseModel"
import { eventMutationResponseModelPrimitives, EventMutationResponseModelSelector } from "./EventMutationResponseModel.base"
import { EventRevMutationResponseModel } from "./EventRevMutationResponseModel"
import { eventRevMutationResponseModelPrimitives, EventRevMutationResponseModelSelector } from "./EventRevMutationResponseModel.base"
import { GartenMutationResponseModel } from "./GartenMutationResponseModel"
import { gartenMutationResponseModelPrimitives, GartenMutationResponseModelSelector } from "./GartenMutationResponseModel.base"
import { GartenFileMutationResponseModel } from "./GartenFileMutationResponseModel"
import { gartenFileMutationResponseModelPrimitives, GartenFileMutationResponseModelSelector } from "./GartenFileMutationResponseModel.base"
import { GartenRevMutationResponseModel } from "./GartenRevMutationResponseModel"
import { gartenRevMutationResponseModelPrimitives, GartenRevMutationResponseModelSelector } from "./GartenRevMutationResponseModel.base"
import { HerkunftMutationResponseModel } from "./HerkunftMutationResponseModel"
import { herkunftMutationResponseModelPrimitives, HerkunftMutationResponseModelSelector } from "./HerkunftMutationResponseModel.base"
import { HerkunftFileMutationResponseModel } from "./HerkunftFileMutationResponseModel"
import { herkunftFileMutationResponseModelPrimitives, HerkunftFileMutationResponseModelSelector } from "./HerkunftFileMutationResponseModel.base"
import { HerkunftRevMutationResponseModel } from "./HerkunftRevMutationResponseModel"
import { herkunftRevMutationResponseModelPrimitives, HerkunftRevMutationResponseModelSelector } from "./HerkunftRevMutationResponseModel.base"
import { KulturMutationResponseModel } from "./KulturMutationResponseModel"
import { kulturMutationResponseModelPrimitives, KulturMutationResponseModelSelector } from "./KulturMutationResponseModel.base"
import { KulturFileMutationResponseModel } from "./KulturFileMutationResponseModel"
import { kulturFileMutationResponseModelPrimitives, KulturFileMutationResponseModelSelector } from "./KulturFileMutationResponseModel.base"
import { KulturOptionMutationResponseModel } from "./KulturOptionMutationResponseModel"
import { kulturOptionMutationResponseModelPrimitives, KulturOptionMutationResponseModelSelector } from "./KulturOptionMutationResponseModel.base"
import { KulturOptionRevMutationResponseModel } from "./KulturOptionRevMutationResponseModel"
import { kulturOptionRevMutationResponseModelPrimitives, KulturOptionRevMutationResponseModelSelector } from "./KulturOptionRevMutationResponseModel.base"
import { KulturQkMutationResponseModel } from "./KulturQkMutationResponseModel"
import { kulturQkMutationResponseModelPrimitives, KulturQkMutationResponseModelSelector } from "./KulturQkMutationResponseModel.base"
import { KulturQkChoosenMutationResponseModel } from "./KulturQkChoosenMutationResponseModel"
import { kulturQkChoosenMutationResponseModelPrimitives, KulturQkChoosenMutationResponseModelSelector } from "./KulturQkChoosenMutationResponseModel.base"
import { KulturRevMutationResponseModel } from "./KulturRevMutationResponseModel"
import { kulturRevMutationResponseModelPrimitives, KulturRevMutationResponseModelSelector } from "./KulturRevMutationResponseModel.base"
import { LieferungMutationResponseModel } from "./LieferungMutationResponseModel"
import { lieferungMutationResponseModelPrimitives, LieferungMutationResponseModelSelector } from "./LieferungMutationResponseModel.base"
import { LieferungFileMutationResponseModel } from "./LieferungFileMutationResponseModel"
import { lieferungFileMutationResponseModelPrimitives, LieferungFileMutationResponseModelSelector } from "./LieferungFileMutationResponseModel.base"
import { LieferungRevMutationResponseModel } from "./LieferungRevMutationResponseModel"
import { lieferungRevMutationResponseModelPrimitives, LieferungRevMutationResponseModelSelector } from "./LieferungRevMutationResponseModel.base"
import { PersonMutationResponseModel } from "./PersonMutationResponseModel"
import { personMutationResponseModelPrimitives, PersonMutationResponseModelSelector } from "./PersonMutationResponseModel.base"
import { PersonFileMutationResponseModel } from "./PersonFileMutationResponseModel"
import { personFileMutationResponseModelPrimitives, PersonFileMutationResponseModelSelector } from "./PersonFileMutationResponseModel.base"
import { PersonOptionMutationResponseModel } from "./PersonOptionMutationResponseModel"
import { personOptionMutationResponseModelPrimitives, PersonOptionMutationResponseModelSelector } from "./PersonOptionMutationResponseModel.base"
import { PersonOptionRevMutationResponseModel } from "./PersonOptionRevMutationResponseModel"
import { personOptionRevMutationResponseModelPrimitives, PersonOptionRevMutationResponseModelSelector } from "./PersonOptionRevMutationResponseModel.base"
import { PersonRevMutationResponseModel } from "./PersonRevMutationResponseModel"
import { personRevMutationResponseModelPrimitives, PersonRevMutationResponseModelSelector } from "./PersonRevMutationResponseModel.base"
import { SammelLieferungMutationResponseModel } from "./SammelLieferungMutationResponseModel"
import { sammelLieferungMutationResponseModelPrimitives, SammelLieferungMutationResponseModelSelector } from "./SammelLieferungMutationResponseModel.base"
import { SammelLieferungRevMutationResponseModel } from "./SammelLieferungRevMutationResponseModel"
import { sammelLieferungRevMutationResponseModelPrimitives, SammelLieferungRevMutationResponseModelSelector } from "./SammelLieferungRevMutationResponseModel.base"
import { SammlungMutationResponseModel } from "./SammlungMutationResponseModel"
import { sammlungMutationResponseModelPrimitives, SammlungMutationResponseModelSelector } from "./SammlungMutationResponseModel.base"
import { SammlungFileMutationResponseModel } from "./SammlungFileMutationResponseModel"
import { sammlungFileMutationResponseModelPrimitives, SammlungFileMutationResponseModelSelector } from "./SammlungFileMutationResponseModel.base"
import { SammlungRevMutationResponseModel } from "./SammlungRevMutationResponseModel"
import { sammlungRevMutationResponseModelPrimitives, SammlungRevMutationResponseModelSelector } from "./SammlungRevMutationResponseModel.base"
import { SpatialRefSysMutationResponseModel } from "./SpatialRefSysMutationResponseModel"
import { spatialRefSysMutationResponseModelPrimitives, SpatialRefSysMutationResponseModelSelector } from "./SpatialRefSysMutationResponseModel.base"
import { TeilkulturMutationResponseModel } from "./TeilkulturMutationResponseModel"
import { teilkulturMutationResponseModelPrimitives, TeilkulturMutationResponseModelSelector } from "./TeilkulturMutationResponseModel.base"
import { TeilkulturRevMutationResponseModel } from "./TeilkulturRevMutationResponseModel"
import { teilkulturRevMutationResponseModelPrimitives, TeilkulturRevMutationResponseModelSelector } from "./TeilkulturRevMutationResponseModel.base"
import { TeilzaehlungMutationResponseModel } from "./TeilzaehlungMutationResponseModel"
import { teilzaehlungMutationResponseModelPrimitives, TeilzaehlungMutationResponseModelSelector } from "./TeilzaehlungMutationResponseModel.base"
import { TeilzaehlungRevMutationResponseModel } from "./TeilzaehlungRevMutationResponseModel"
import { teilzaehlungRevMutationResponseModelPrimitives, TeilzaehlungRevMutationResponseModelSelector } from "./TeilzaehlungRevMutationResponseModel.base"
import { UserRoleMutationResponseModel } from "./UserRoleMutationResponseModel"
import { userRoleMutationResponseModelPrimitives, UserRoleMutationResponseModelSelector } from "./UserRoleMutationResponseModel.base"
import { ZaehlungMutationResponseModel } from "./ZaehlungMutationResponseModel"
import { zaehlungMutationResponseModelPrimitives, ZaehlungMutationResponseModelSelector } from "./ZaehlungMutationResponseModel.base"
import { ZaehlungRevMutationResponseModel } from "./ZaehlungRevMutationResponseModel"
import { zaehlungRevMutationResponseModelPrimitives, ZaehlungRevMutationResponseModelSelector } from "./ZaehlungRevMutationResponseModel.base"
import { SubscriptionRootModel } from "./SubscriptionRootModel"
import { subscriptionRootModelPrimitives, SubscriptionRootModelSelector } from "./SubscriptionRootModel.base"


/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['query_root', () => QueryRootModel], ['ae_art', () => AeArtModel], ['art', () => ArtModel], ['art_file', () => ArtFileModel], ['art_file_aggregate', () => ArtFileAggregateModel], ['art_file_aggregate_fields', () => ArtFileAggregateFieldsModel], ['art_file_max_fields', () => ArtFileMaxFieldsModel], ['art_file_min_fields', () => ArtFileMinFieldsModel], ['art_qk_choosen', () => ArtQkChoosenModel], ['art_qk', () => ArtQkModel], ['art_qk_choosen_aggregate', () => ArtQkChoosenAggregateModel], ['art_qk_choosen_aggregate_fields', () => ArtQkChoosenAggregateFieldsModel], ['art_qk_choosen_max_fields', () => ArtQkChoosenMaxFieldsModel], ['art_qk_choosen_min_fields', () => ArtQkChoosenMinFieldsModel], ['art_sums', () => ArtSumsModel], ['av_art', () => AvArtModel], ['art_sums_aggregate', () => ArtSumsAggregateModel], ['art_sums_aggregate_fields', () => ArtSumsAggregateFieldsModel], ['art_sums_avg_fields', () => ArtSumsAvgFieldsModel], ['art_sums_max_fields', () => ArtSumsMaxFieldsModel], ['art_sums_min_fields', () => ArtSumsMinFieldsModel], ['art_sums_stddev_fields', () => ArtSumsStddevFieldsModel], ['art_sums_stddev_pop_fields', () => ArtSumsStddevPopFieldsModel], ['art_sums_stddev_samp_fields', () => ArtSumsStddevSampFieldsModel], ['art_sums_sum_fields', () => ArtSumsSumFieldsModel], ['art_sums_var_pop_fields', () => ArtSumsVarPopFieldsModel], ['art_sums_var_samp_fields', () => ArtSumsVarSampFieldsModel], ['art_sums_variance_fields', () => ArtSumsVarianceFieldsModel], ['person', () => PersonModel], ['av_art_aggregate', () => AvArtAggregateModel], ['av_art_aggregate_fields', () => AvArtAggregateFieldsModel], ['av_art_max_fields', () => AvArtMaxFieldsModel], ['av_art_min_fields', () => AvArtMinFieldsModel], ['event', () => EventModel], ['kultur', () => KulturModel], ['event_aggregate', () => EventAggregateModel], ['event_aggregate_fields', () => EventAggregateFieldsModel], ['event_avg_fields', () => EventAvgFieldsModel], ['event_max_fields', () => EventMaxFieldsModel], ['event_min_fields', () => EventMinFieldsModel], ['event_stddev_fields', () => EventStddevFieldsModel], ['event_stddev_pop_fields', () => EventStddevPopFieldsModel], ['event_stddev_samp_fields', () => EventStddevSampFieldsModel], ['event_sum_fields', () => EventSumFieldsModel], ['event_var_pop_fields', () => EventVarPopFieldsModel], ['event_var_samp_fields', () => EventVarSampFieldsModel], ['event_variance_fields', () => EventVarianceFieldsModel], ['garten', () => GartenModel], ['garten_file', () => GartenFileModel], ['garten_file_aggregate', () => GartenFileAggregateModel], ['garten_file_aggregate_fields', () => GartenFileAggregateFieldsModel], ['garten_file_max_fields', () => GartenFileMaxFieldsModel], ['garten_file_min_fields', () => GartenFileMinFieldsModel], ['kultur_aggregate', () => KulturAggregateModel], ['kultur_aggregate_fields', () => KulturAggregateFieldsModel], ['kultur_avg_fields', () => KulturAvgFieldsModel], ['kultur_max_fields', () => KulturMaxFieldsModel], ['kultur_min_fields', () => KulturMinFieldsModel], ['kultur_stddev_fields', () => KulturStddevFieldsModel], ['kultur_stddev_pop_fields', () => KulturStddevPopFieldsModel], ['kultur_stddev_samp_fields', () => KulturStddevSampFieldsModel], ['kultur_sum_fields', () => KulturSumFieldsModel], ['kultur_var_pop_fields', () => KulturVarPopFieldsModel], ['kultur_var_samp_fields', () => KulturVarSampFieldsModel], ['kultur_variance_fields', () => KulturVarianceFieldsModel], ['garten_teilzaehlung_sums', () => GartenTeilzaehlungSumsModel], ['garten_teilzaehlung_sums_aggregate', () => GartenTeilzaehlungSumsAggregateModel], ['garten_teilzaehlung_sums_aggregate_fields', () => GartenTeilzaehlungSumsAggregateFieldsModel], ['garten_teilzaehlung_sums_avg_fields', () => GartenTeilzaehlungSumsAvgFieldsModel], ['garten_teilzaehlung_sums_max_fields', () => GartenTeilzaehlungSumsMaxFieldsModel], ['garten_teilzaehlung_sums_min_fields', () => GartenTeilzaehlungSumsMinFieldsModel], ['garten_teilzaehlung_sums_stddev_fields', () => GartenTeilzaehlungSumsStddevFieldsModel], ['garten_teilzaehlung_sums_stddev_pop_fields', () => GartenTeilzaehlungSumsStddevPopFieldsModel], ['garten_teilzaehlung_sums_stddev_samp_fields', () => GartenTeilzaehlungSumsStddevSampFieldsModel], ['garten_teilzaehlung_sums_sum_fields', () => GartenTeilzaehlungSumsSumFieldsModel], ['garten_teilzaehlung_sums_var_pop_fields', () => GartenTeilzaehlungSumsVarPopFieldsModel], ['garten_teilzaehlung_sums_var_samp_fields', () => GartenTeilzaehlungSumsVarSampFieldsModel], ['garten_teilzaehlung_sums_variance_fields', () => GartenTeilzaehlungSumsVarianceFieldsModel], ['herkunft', () => HerkunftModel], ['herkunft_file', () => HerkunftFileModel], ['herkunft_file_aggregate', () => HerkunftFileAggregateModel], ['herkunft_file_aggregate_fields', () => HerkunftFileAggregateFieldsModel], ['herkunft_file_max_fields', () => HerkunftFileMaxFieldsModel], ['herkunft_file_min_fields', () => HerkunftFileMinFieldsModel], ['herkunft_sums', () => HerkunftSumsModel], ['herkunft_sums_aggregate', () => HerkunftSumsAggregateModel], ['herkunft_sums_aggregate_fields', () => HerkunftSumsAggregateFieldsModel], ['herkunft_sums_avg_fields', () => HerkunftSumsAvgFieldsModel], ['herkunft_sums_max_fields', () => HerkunftSumsMaxFieldsModel], ['herkunft_sums_min_fields', () => HerkunftSumsMinFieldsModel], ['herkunft_sums_stddev_fields', () => HerkunftSumsStddevFieldsModel], ['herkunft_sums_stddev_pop_fields', () => HerkunftSumsStddevPopFieldsModel], ['herkunft_sums_stddev_samp_fields', () => HerkunftSumsStddevSampFieldsModel], ['herkunft_sums_sum_fields', () => HerkunftSumsSumFieldsModel], ['herkunft_sums_var_pop_fields', () => HerkunftSumsVarPopFieldsModel], ['herkunft_sums_var_samp_fields', () => HerkunftSumsVarSampFieldsModel], ['herkunft_sums_variance_fields', () => HerkunftSumsVarianceFieldsModel], ['sammlung', () => SammlungModel], ['lieferung', () => LieferungModel], ['lieferung_file', () => LieferungFileModel], ['lieferung_file_aggregate', () => LieferungFileAggregateModel], ['lieferung_file_aggregate_fields', () => LieferungFileAggregateFieldsModel], ['lieferung_file_max_fields', () => LieferungFileMaxFieldsModel], ['lieferung_file_min_fields', () => LieferungFileMinFieldsModel], ['sammel_lieferung', () => SammelLieferungModel], ['lieferung_aggregate', () => LieferungAggregateModel], ['lieferung_aggregate_fields', () => LieferungAggregateFieldsModel], ['lieferung_avg_fields', () => LieferungAvgFieldsModel], ['lieferung_max_fields', () => LieferungMaxFieldsModel], ['lieferung_min_fields', () => LieferungMinFieldsModel], ['lieferung_stddev_fields', () => LieferungStddevFieldsModel], ['lieferung_stddev_pop_fields', () => LieferungStddevPopFieldsModel], ['lieferung_stddev_samp_fields', () => LieferungStddevSampFieldsModel], ['lieferung_sum_fields', () => LieferungSumFieldsModel], ['lieferung_var_pop_fields', () => LieferungVarPopFieldsModel], ['lieferung_var_samp_fields', () => LieferungVarSampFieldsModel], ['lieferung_variance_fields', () => LieferungVarianceFieldsModel], ['sammel_lieferung_aggregate', () => SammelLieferungAggregateModel], ['sammel_lieferung_aggregate_fields', () => SammelLieferungAggregateFieldsModel], ['sammel_lieferung_avg_fields', () => SammelLieferungAvgFieldsModel], ['sammel_lieferung_max_fields', () => SammelLieferungMaxFieldsModel], ['sammel_lieferung_min_fields', () => SammelLieferungMinFieldsModel], ['sammel_lieferung_stddev_fields', () => SammelLieferungStddevFieldsModel], ['sammel_lieferung_stddev_pop_fields', () => SammelLieferungStddevPopFieldsModel], ['sammel_lieferung_stddev_samp_fields', () => SammelLieferungStddevSampFieldsModel], ['sammel_lieferung_sum_fields', () => SammelLieferungSumFieldsModel], ['sammel_lieferung_var_pop_fields', () => SammelLieferungVarPopFieldsModel], ['sammel_lieferung_var_samp_fields', () => SammelLieferungVarSampFieldsModel], ['sammel_lieferung_variance_fields', () => SammelLieferungVarianceFieldsModel], ['sammlung_file', () => SammlungFileModel], ['sammlung_file_aggregate', () => SammlungFileAggregateModel], ['sammlung_file_aggregate_fields', () => SammlungFileAggregateFieldsModel], ['sammlung_file_max_fields', () => SammlungFileMaxFieldsModel], ['sammlung_file_min_fields', () => SammlungFileMinFieldsModel], ['sammlung_aggregate', () => SammlungAggregateModel], ['sammlung_aggregate_fields', () => SammlungAggregateFieldsModel], ['sammlung_avg_fields', () => SammlungAvgFieldsModel], ['sammlung_max_fields', () => SammlungMaxFieldsModel], ['sammlung_min_fields', () => SammlungMinFieldsModel], ['sammlung_stddev_fields', () => SammlungStddevFieldsModel], ['sammlung_stddev_pop_fields', () => SammlungStddevPopFieldsModel], ['sammlung_stddev_samp_fields', () => SammlungStddevSampFieldsModel], ['sammlung_sum_fields', () => SammlungSumFieldsModel], ['sammlung_var_pop_fields', () => SammlungVarPopFieldsModel], ['sammlung_var_samp_fields', () => SammlungVarSampFieldsModel], ['sammlung_variance_fields', () => SammlungVarianceFieldsModel], ['kultur_file', () => KulturFileModel], ['kultur_file_aggregate', () => KulturFileAggregateModel], ['kultur_file_aggregate_fields', () => KulturFileAggregateFieldsModel], ['kultur_file_max_fields', () => KulturFileMaxFieldsModel], ['kultur_file_min_fields', () => KulturFileMinFieldsModel], ['kultur_option', () => KulturOptionModel], ['kultur_qk_choosen', () => KulturQkChoosenModel], ['kultur_qk', () => KulturQkModel], ['kultur_qk_choosen_aggregate', () => KulturQkChoosenAggregateModel], ['kultur_qk_choosen_aggregate_fields', () => KulturQkChoosenAggregateFieldsModel], ['kultur_qk_choosen_max_fields', () => KulturQkChoosenMaxFieldsModel], ['kultur_qk_choosen_min_fields', () => KulturQkChoosenMinFieldsModel], ['teilkultur', () => TeilkulturModel], ['teilzaehlung', () => TeilzaehlungModel], ['teilzaehlung_aggregate', () => TeilzaehlungAggregateModel], ['teilzaehlung_aggregate_fields', () => TeilzaehlungAggregateFieldsModel], ['teilzaehlung_avg_fields', () => TeilzaehlungAvgFieldsModel], ['teilzaehlung_max_fields', () => TeilzaehlungMaxFieldsModel], ['teilzaehlung_min_fields', () => TeilzaehlungMinFieldsModel], ['teilzaehlung_stddev_fields', () => TeilzaehlungStddevFieldsModel], ['teilzaehlung_stddev_pop_fields', () => TeilzaehlungStddevPopFieldsModel], ['teilzaehlung_stddev_samp_fields', () => TeilzaehlungStddevSampFieldsModel], ['teilzaehlung_sum_fields', () => TeilzaehlungSumFieldsModel], ['teilzaehlung_var_pop_fields', () => TeilzaehlungVarPopFieldsModel], ['teilzaehlung_var_samp_fields', () => TeilzaehlungVarSampFieldsModel], ['teilzaehlung_variance_fields', () => TeilzaehlungVarianceFieldsModel], ['zaehlung', () => ZaehlungModel], ['teilkultur_aggregate', () => TeilkulturAggregateModel], ['teilkultur_aggregate_fields', () => TeilkulturAggregateFieldsModel], ['teilkultur_avg_fields', () => TeilkulturAvgFieldsModel], ['teilkultur_max_fields', () => TeilkulturMaxFieldsModel], ['teilkultur_min_fields', () => TeilkulturMinFieldsModel], ['teilkultur_stddev_fields', () => TeilkulturStddevFieldsModel], ['teilkultur_stddev_pop_fields', () => TeilkulturStddevPopFieldsModel], ['teilkultur_stddev_samp_fields', () => TeilkulturStddevSampFieldsModel], ['teilkultur_sum_fields', () => TeilkulturSumFieldsModel], ['teilkultur_var_pop_fields', () => TeilkulturVarPopFieldsModel], ['teilkultur_var_samp_fields', () => TeilkulturVarSampFieldsModel], ['teilkultur_variance_fields', () => TeilkulturVarianceFieldsModel], ['zaehlung_aggregate', () => ZaehlungAggregateModel], ['zaehlung_aggregate_fields', () => ZaehlungAggregateFieldsModel], ['zaehlung_avg_fields', () => ZaehlungAvgFieldsModel], ['zaehlung_max_fields', () => ZaehlungMaxFieldsModel], ['zaehlung_min_fields', () => ZaehlungMinFieldsModel], ['zaehlung_stddev_fields', () => ZaehlungStddevFieldsModel], ['zaehlung_stddev_pop_fields', () => ZaehlungStddevPopFieldsModel], ['zaehlung_stddev_samp_fields', () => ZaehlungStddevSampFieldsModel], ['zaehlung_sum_fields', () => ZaehlungSumFieldsModel], ['zaehlung_var_pop_fields', () => ZaehlungVarPopFieldsModel], ['zaehlung_var_samp_fields', () => ZaehlungVarSampFieldsModel], ['zaehlung_variance_fields', () => ZaehlungVarianceFieldsModel], ['garten_aggregate', () => GartenAggregateModel], ['garten_aggregate_fields', () => GartenAggregateFieldsModel], ['garten_avg_fields', () => GartenAvgFieldsModel], ['garten_max_fields', () => GartenMaxFieldsModel], ['garten_min_fields', () => GartenMinFieldsModel], ['garten_stddev_fields', () => GartenStddevFieldsModel], ['garten_stddev_pop_fields', () => GartenStddevPopFieldsModel], ['garten_stddev_samp_fields', () => GartenStddevSampFieldsModel], ['garten_sum_fields', () => GartenSumFieldsModel], ['garten_var_pop_fields', () => GartenVarPopFieldsModel], ['garten_var_samp_fields', () => GartenVarSampFieldsModel], ['garten_variance_fields', () => GartenVarianceFieldsModel], ['person_file', () => PersonFileModel], ['person_file_aggregate', () => PersonFileAggregateModel], ['person_file_aggregate_fields', () => PersonFileAggregateFieldsModel], ['person_file_max_fields', () => PersonFileMaxFieldsModel], ['person_file_min_fields', () => PersonFileMinFieldsModel], ['person_option', () => PersonOptionModel], ['user_role', () => UserRoleModel], ['person_aggregate', () => PersonAggregateModel], ['person_aggregate_fields', () => PersonAggregateFieldsModel], ['person_avg_fields', () => PersonAvgFieldsModel], ['person_max_fields', () => PersonMaxFieldsModel], ['person_min_fields', () => PersonMinFieldsModel], ['person_stddev_fields', () => PersonStddevFieldsModel], ['person_stddev_pop_fields', () => PersonStddevPopFieldsModel], ['person_stddev_samp_fields', () => PersonStddevSampFieldsModel], ['person_sum_fields', () => PersonSumFieldsModel], ['person_var_pop_fields', () => PersonVarPopFieldsModel], ['person_var_samp_fields', () => PersonVarSampFieldsModel], ['person_variance_fields', () => PersonVarianceFieldsModel], ['person_rev', () => PersonRevModel], ['person_rev_aggregate', () => PersonRevAggregateModel], ['person_rev_aggregate_fields', () => PersonRevAggregateFieldsModel], ['person_rev_avg_fields', () => PersonRevAvgFieldsModel], ['person_rev_max_fields', () => PersonRevMaxFieldsModel], ['person_rev_min_fields', () => PersonRevMinFieldsModel], ['person_rev_stddev_fields', () => PersonRevStddevFieldsModel], ['person_rev_stddev_pop_fields', () => PersonRevStddevPopFieldsModel], ['person_rev_stddev_samp_fields', () => PersonRevStddevSampFieldsModel], ['person_rev_sum_fields', () => PersonRevSumFieldsModel], ['person_rev_var_pop_fields', () => PersonRevVarPopFieldsModel], ['person_rev_var_samp_fields', () => PersonRevVarSampFieldsModel], ['person_rev_variance_fields', () => PersonRevVarianceFieldsModel], ['ae_art_aggregate', () => AeArtAggregateModel], ['ae_art_aggregate_fields', () => AeArtAggregateFieldsModel], ['ae_art_max_fields', () => AeArtMaxFieldsModel], ['ae_art_min_fields', () => AeArtMinFieldsModel], ['art_aggregate', () => ArtAggregateModel], ['art_aggregate_fields', () => ArtAggregateFieldsModel], ['art_avg_fields', () => ArtAvgFieldsModel], ['art_max_fields', () => ArtMaxFieldsModel], ['art_min_fields', () => ArtMinFieldsModel], ['art_stddev_fields', () => ArtStddevFieldsModel], ['art_stddev_pop_fields', () => ArtStddevPopFieldsModel], ['art_stddev_samp_fields', () => ArtStddevSampFieldsModel], ['art_sum_fields', () => ArtSumFieldsModel], ['art_var_pop_fields', () => ArtVarPopFieldsModel], ['art_var_samp_fields', () => ArtVarSampFieldsModel], ['art_variance_fields', () => ArtVarianceFieldsModel], ['art_qk_aggregate', () => ArtQkAggregateModel], ['art_qk_aggregate_fields', () => ArtQkAggregateFieldsModel], ['art_qk_avg_fields', () => ArtQkAvgFieldsModel], ['art_qk_max_fields', () => ArtQkMaxFieldsModel], ['art_qk_min_fields', () => ArtQkMinFieldsModel], ['art_qk_stddev_fields', () => ArtQkStddevFieldsModel], ['art_qk_stddev_pop_fields', () => ArtQkStddevPopFieldsModel], ['art_qk_stddev_samp_fields', () => ArtQkStddevSampFieldsModel], ['art_qk_sum_fields', () => ArtQkSumFieldsModel], ['art_qk_var_pop_fields', () => ArtQkVarPopFieldsModel], ['art_qk_var_samp_fields', () => ArtQkVarSampFieldsModel], ['art_qk_variance_fields', () => ArtQkVarianceFieldsModel], ['art_rev', () => ArtRevModel], ['art_rev_aggregate', () => ArtRevAggregateModel], ['art_rev_aggregate_fields', () => ArtRevAggregateFieldsModel], ['art_rev_avg_fields', () => ArtRevAvgFieldsModel], ['art_rev_max_fields', () => ArtRevMaxFieldsModel], ['art_rev_min_fields', () => ArtRevMinFieldsModel], ['art_rev_stddev_fields', () => ArtRevStddevFieldsModel], ['art_rev_stddev_pop_fields', () => ArtRevStddevPopFieldsModel], ['art_rev_stddev_samp_fields', () => ArtRevStddevSampFieldsModel], ['art_rev_sum_fields', () => ArtRevSumFieldsModel], ['art_rev_var_pop_fields', () => ArtRevVarPopFieldsModel], ['art_rev_var_samp_fields', () => ArtRevVarSampFieldsModel], ['art_rev_variance_fields', () => ArtRevVarianceFieldsModel], ['event_rev', () => EventRevModel], ['event_rev_aggregate', () => EventRevAggregateModel], ['event_rev_aggregate_fields', () => EventRevAggregateFieldsModel], ['event_rev_avg_fields', () => EventRevAvgFieldsModel], ['event_rev_max_fields', () => EventRevMaxFieldsModel], ['event_rev_min_fields', () => EventRevMinFieldsModel], ['event_rev_stddev_fields', () => EventRevStddevFieldsModel], ['event_rev_stddev_pop_fields', () => EventRevStddevPopFieldsModel], ['event_rev_stddev_samp_fields', () => EventRevStddevSampFieldsModel], ['event_rev_sum_fields', () => EventRevSumFieldsModel], ['event_rev_var_pop_fields', () => EventRevVarPopFieldsModel], ['event_rev_var_samp_fields', () => EventRevVarSampFieldsModel], ['event_rev_variance_fields', () => EventRevVarianceFieldsModel], ['garten_rev', () => GartenRevModel], ['garten_rev_aggregate', () => GartenRevAggregateModel], ['garten_rev_aggregate_fields', () => GartenRevAggregateFieldsModel], ['garten_rev_avg_fields', () => GartenRevAvgFieldsModel], ['garten_rev_max_fields', () => GartenRevMaxFieldsModel], ['garten_rev_min_fields', () => GartenRevMinFieldsModel], ['garten_rev_stddev_fields', () => GartenRevStddevFieldsModel], ['garten_rev_stddev_pop_fields', () => GartenRevStddevPopFieldsModel], ['garten_rev_stddev_samp_fields', () => GartenRevStddevSampFieldsModel], ['garten_rev_sum_fields', () => GartenRevSumFieldsModel], ['garten_rev_var_pop_fields', () => GartenRevVarPopFieldsModel], ['garten_rev_var_samp_fields', () => GartenRevVarSampFieldsModel], ['garten_rev_variance_fields', () => GartenRevVarianceFieldsModel], ['herkunft_aggregate', () => HerkunftAggregateModel], ['herkunft_aggregate_fields', () => HerkunftAggregateFieldsModel], ['herkunft_avg_fields', () => HerkunftAvgFieldsModel], ['herkunft_max_fields', () => HerkunftMaxFieldsModel], ['herkunft_min_fields', () => HerkunftMinFieldsModel], ['herkunft_stddev_fields', () => HerkunftStddevFieldsModel], ['herkunft_stddev_pop_fields', () => HerkunftStddevPopFieldsModel], ['herkunft_stddev_samp_fields', () => HerkunftStddevSampFieldsModel], ['herkunft_sum_fields', () => HerkunftSumFieldsModel], ['herkunft_var_pop_fields', () => HerkunftVarPopFieldsModel], ['herkunft_var_samp_fields', () => HerkunftVarSampFieldsModel], ['herkunft_variance_fields', () => HerkunftVarianceFieldsModel], ['herkunft_rev', () => HerkunftRevModel], ['herkunft_rev_aggregate', () => HerkunftRevAggregateModel], ['herkunft_rev_aggregate_fields', () => HerkunftRevAggregateFieldsModel], ['herkunft_rev_avg_fields', () => HerkunftRevAvgFieldsModel], ['herkunft_rev_max_fields', () => HerkunftRevMaxFieldsModel], ['herkunft_rev_min_fields', () => HerkunftRevMinFieldsModel], ['herkunft_rev_stddev_fields', () => HerkunftRevStddevFieldsModel], ['herkunft_rev_stddev_pop_fields', () => HerkunftRevStddevPopFieldsModel], ['herkunft_rev_stddev_samp_fields', () => HerkunftRevStddevSampFieldsModel], ['herkunft_rev_sum_fields', () => HerkunftRevSumFieldsModel], ['herkunft_rev_var_pop_fields', () => HerkunftRevVarPopFieldsModel], ['herkunft_rev_var_samp_fields', () => HerkunftRevVarSampFieldsModel], ['herkunft_rev_variance_fields', () => HerkunftRevVarianceFieldsModel], ['kultur_option_aggregate', () => KulturOptionAggregateModel], ['kultur_option_aggregate_fields', () => KulturOptionAggregateFieldsModel], ['kultur_option_avg_fields', () => KulturOptionAvgFieldsModel], ['kultur_option_max_fields', () => KulturOptionMaxFieldsModel], ['kultur_option_min_fields', () => KulturOptionMinFieldsModel], ['kultur_option_stddev_fields', () => KulturOptionStddevFieldsModel], ['kultur_option_stddev_pop_fields', () => KulturOptionStddevPopFieldsModel], ['kultur_option_stddev_samp_fields', () => KulturOptionStddevSampFieldsModel], ['kultur_option_sum_fields', () => KulturOptionSumFieldsModel], ['kultur_option_var_pop_fields', () => KulturOptionVarPopFieldsModel], ['kultur_option_var_samp_fields', () => KulturOptionVarSampFieldsModel], ['kultur_option_variance_fields', () => KulturOptionVarianceFieldsModel], ['kultur_option_rev', () => KulturOptionRevModel], ['kultur_option_rev_aggregate', () => KulturOptionRevAggregateModel], ['kultur_option_rev_aggregate_fields', () => KulturOptionRevAggregateFieldsModel], ['kultur_option_rev_avg_fields', () => KulturOptionRevAvgFieldsModel], ['kultur_option_rev_max_fields', () => KulturOptionRevMaxFieldsModel], ['kultur_option_rev_min_fields', () => KulturOptionRevMinFieldsModel], ['kultur_option_rev_stddev_fields', () => KulturOptionRevStddevFieldsModel], ['kultur_option_rev_stddev_pop_fields', () => KulturOptionRevStddevPopFieldsModel], ['kultur_option_rev_stddev_samp_fields', () => KulturOptionRevStddevSampFieldsModel], ['kultur_option_rev_sum_fields', () => KulturOptionRevSumFieldsModel], ['kultur_option_rev_var_pop_fields', () => KulturOptionRevVarPopFieldsModel], ['kultur_option_rev_var_samp_fields', () => KulturOptionRevVarSampFieldsModel], ['kultur_option_rev_variance_fields', () => KulturOptionRevVarianceFieldsModel], ['kultur_qk_aggregate', () => KulturQkAggregateModel], ['kultur_qk_aggregate_fields', () => KulturQkAggregateFieldsModel], ['kultur_qk_avg_fields', () => KulturQkAvgFieldsModel], ['kultur_qk_max_fields', () => KulturQkMaxFieldsModel], ['kultur_qk_min_fields', () => KulturQkMinFieldsModel], ['kultur_qk_stddev_fields', () => KulturQkStddevFieldsModel], ['kultur_qk_stddev_pop_fields', () => KulturQkStddevPopFieldsModel], ['kultur_qk_stddev_samp_fields', () => KulturQkStddevSampFieldsModel], ['kultur_qk_sum_fields', () => KulturQkSumFieldsModel], ['kultur_qk_var_pop_fields', () => KulturQkVarPopFieldsModel], ['kultur_qk_var_samp_fields', () => KulturQkVarSampFieldsModel], ['kultur_qk_variance_fields', () => KulturQkVarianceFieldsModel], ['kultur_rev', () => KulturRevModel], ['kultur_rev_aggregate', () => KulturRevAggregateModel], ['kultur_rev_aggregate_fields', () => KulturRevAggregateFieldsModel], ['kultur_rev_avg_fields', () => KulturRevAvgFieldsModel], ['kultur_rev_max_fields', () => KulturRevMaxFieldsModel], ['kultur_rev_min_fields', () => KulturRevMinFieldsModel], ['kultur_rev_stddev_fields', () => KulturRevStddevFieldsModel], ['kultur_rev_stddev_pop_fields', () => KulturRevStddevPopFieldsModel], ['kultur_rev_stddev_samp_fields', () => KulturRevStddevSampFieldsModel], ['kultur_rev_sum_fields', () => KulturRevSumFieldsModel], ['kultur_rev_var_pop_fields', () => KulturRevVarPopFieldsModel], ['kultur_rev_var_samp_fields', () => KulturRevVarSampFieldsModel], ['kultur_rev_variance_fields', () => KulturRevVarianceFieldsModel], ['lieferung_rev', () => LieferungRevModel], ['lieferung_rev_aggregate', () => LieferungRevAggregateModel], ['lieferung_rev_aggregate_fields', () => LieferungRevAggregateFieldsModel], ['lieferung_rev_avg_fields', () => LieferungRevAvgFieldsModel], ['lieferung_rev_max_fields', () => LieferungRevMaxFieldsModel], ['lieferung_rev_min_fields', () => LieferungRevMinFieldsModel], ['lieferung_rev_stddev_fields', () => LieferungRevStddevFieldsModel], ['lieferung_rev_stddev_pop_fields', () => LieferungRevStddevPopFieldsModel], ['lieferung_rev_stddev_samp_fields', () => LieferungRevStddevSampFieldsModel], ['lieferung_rev_sum_fields', () => LieferungRevSumFieldsModel], ['lieferung_rev_var_pop_fields', () => LieferungRevVarPopFieldsModel], ['lieferung_rev_var_samp_fields', () => LieferungRevVarSampFieldsModel], ['lieferung_rev_variance_fields', () => LieferungRevVarianceFieldsModel], ['person_option_aggregate', () => PersonOptionAggregateModel], ['person_option_aggregate_fields', () => PersonOptionAggregateFieldsModel], ['person_option_avg_fields', () => PersonOptionAvgFieldsModel], ['person_option_max_fields', () => PersonOptionMaxFieldsModel], ['person_option_min_fields', () => PersonOptionMinFieldsModel], ['person_option_stddev_fields', () => PersonOptionStddevFieldsModel], ['person_option_stddev_pop_fields', () => PersonOptionStddevPopFieldsModel], ['person_option_stddev_samp_fields', () => PersonOptionStddevSampFieldsModel], ['person_option_sum_fields', () => PersonOptionSumFieldsModel], ['person_option_var_pop_fields', () => PersonOptionVarPopFieldsModel], ['person_option_var_samp_fields', () => PersonOptionVarSampFieldsModel], ['person_option_variance_fields', () => PersonOptionVarianceFieldsModel], ['person_option_rev', () => PersonOptionRevModel], ['person_option_rev_aggregate', () => PersonOptionRevAggregateModel], ['person_option_rev_aggregate_fields', () => PersonOptionRevAggregateFieldsModel], ['person_option_rev_avg_fields', () => PersonOptionRevAvgFieldsModel], ['person_option_rev_max_fields', () => PersonOptionRevMaxFieldsModel], ['person_option_rev_min_fields', () => PersonOptionRevMinFieldsModel], ['person_option_rev_stddev_fields', () => PersonOptionRevStddevFieldsModel], ['person_option_rev_stddev_pop_fields', () => PersonOptionRevStddevPopFieldsModel], ['person_option_rev_stddev_samp_fields', () => PersonOptionRevStddevSampFieldsModel], ['person_option_rev_sum_fields', () => PersonOptionRevSumFieldsModel], ['person_option_rev_var_pop_fields', () => PersonOptionRevVarPopFieldsModel], ['person_option_rev_var_samp_fields', () => PersonOptionRevVarSampFieldsModel], ['person_option_rev_variance_fields', () => PersonOptionRevVarianceFieldsModel], ['sammel_lieferung_rev', () => SammelLieferungRevModel], ['sammel_lieferung_rev_aggregate', () => SammelLieferungRevAggregateModel], ['sammel_lieferung_rev_aggregate_fields', () => SammelLieferungRevAggregateFieldsModel], ['sammel_lieferung_rev_avg_fields', () => SammelLieferungRevAvgFieldsModel], ['sammel_lieferung_rev_max_fields', () => SammelLieferungRevMaxFieldsModel], ['sammel_lieferung_rev_min_fields', () => SammelLieferungRevMinFieldsModel], ['sammel_lieferung_rev_stddev_fields', () => SammelLieferungRevStddevFieldsModel], ['sammel_lieferung_rev_stddev_pop_fields', () => SammelLieferungRevStddevPopFieldsModel], ['sammel_lieferung_rev_stddev_samp_fields', () => SammelLieferungRevStddevSampFieldsModel], ['sammel_lieferung_rev_sum_fields', () => SammelLieferungRevSumFieldsModel], ['sammel_lieferung_rev_var_pop_fields', () => SammelLieferungRevVarPopFieldsModel], ['sammel_lieferung_rev_var_samp_fields', () => SammelLieferungRevVarSampFieldsModel], ['sammel_lieferung_rev_variance_fields', () => SammelLieferungRevVarianceFieldsModel], ['sammlung_rev', () => SammlungRevModel], ['sammlung_rev_aggregate', () => SammlungRevAggregateModel], ['sammlung_rev_aggregate_fields', () => SammlungRevAggregateFieldsModel], ['sammlung_rev_avg_fields', () => SammlungRevAvgFieldsModel], ['sammlung_rev_max_fields', () => SammlungRevMaxFieldsModel], ['sammlung_rev_min_fields', () => SammlungRevMinFieldsModel], ['sammlung_rev_stddev_fields', () => SammlungRevStddevFieldsModel], ['sammlung_rev_stddev_pop_fields', () => SammlungRevStddevPopFieldsModel], ['sammlung_rev_stddev_samp_fields', () => SammlungRevStddevSampFieldsModel], ['sammlung_rev_sum_fields', () => SammlungRevSumFieldsModel], ['sammlung_rev_var_pop_fields', () => SammlungRevVarPopFieldsModel], ['sammlung_rev_var_samp_fields', () => SammlungRevVarSampFieldsModel], ['sammlung_rev_variance_fields', () => SammlungRevVarianceFieldsModel], ['spatial_ref_sys', () => SpatialRefSysModel], ['spatial_ref_sys_aggregate', () => SpatialRefSysAggregateModel], ['spatial_ref_sys_aggregate_fields', () => SpatialRefSysAggregateFieldsModel], ['spatial_ref_sys_avg_fields', () => SpatialRefSysAvgFieldsModel], ['spatial_ref_sys_max_fields', () => SpatialRefSysMaxFieldsModel], ['spatial_ref_sys_min_fields', () => SpatialRefSysMinFieldsModel], ['spatial_ref_sys_stddev_fields', () => SpatialRefSysStddevFieldsModel], ['spatial_ref_sys_stddev_pop_fields', () => SpatialRefSysStddevPopFieldsModel], ['spatial_ref_sys_stddev_samp_fields', () => SpatialRefSysStddevSampFieldsModel], ['spatial_ref_sys_sum_fields', () => SpatialRefSysSumFieldsModel], ['spatial_ref_sys_var_pop_fields', () => SpatialRefSysVarPopFieldsModel], ['spatial_ref_sys_var_samp_fields', () => SpatialRefSysVarSampFieldsModel], ['spatial_ref_sys_variance_fields', () => SpatialRefSysVarianceFieldsModel], ['teilkultur_rev', () => TeilkulturRevModel], ['teilkultur_rev_aggregate', () => TeilkulturRevAggregateModel], ['teilkultur_rev_aggregate_fields', () => TeilkulturRevAggregateFieldsModel], ['teilkultur_rev_avg_fields', () => TeilkulturRevAvgFieldsModel], ['teilkultur_rev_max_fields', () => TeilkulturRevMaxFieldsModel], ['teilkultur_rev_min_fields', () => TeilkulturRevMinFieldsModel], ['teilkultur_rev_stddev_fields', () => TeilkulturRevStddevFieldsModel], ['teilkultur_rev_stddev_pop_fields', () => TeilkulturRevStddevPopFieldsModel], ['teilkultur_rev_stddev_samp_fields', () => TeilkulturRevStddevSampFieldsModel], ['teilkultur_rev_sum_fields', () => TeilkulturRevSumFieldsModel], ['teilkultur_rev_var_pop_fields', () => TeilkulturRevVarPopFieldsModel], ['teilkultur_rev_var_samp_fields', () => TeilkulturRevVarSampFieldsModel], ['teilkultur_rev_variance_fields', () => TeilkulturRevVarianceFieldsModel], ['teilzaehlung_rev', () => TeilzaehlungRevModel], ['teilzaehlung_rev_aggregate', () => TeilzaehlungRevAggregateModel], ['teilzaehlung_rev_aggregate_fields', () => TeilzaehlungRevAggregateFieldsModel], ['teilzaehlung_rev_avg_fields', () => TeilzaehlungRevAvgFieldsModel], ['teilzaehlung_rev_max_fields', () => TeilzaehlungRevMaxFieldsModel], ['teilzaehlung_rev_min_fields', () => TeilzaehlungRevMinFieldsModel], ['teilzaehlung_rev_stddev_fields', () => TeilzaehlungRevStddevFieldsModel], ['teilzaehlung_rev_stddev_pop_fields', () => TeilzaehlungRevStddevPopFieldsModel], ['teilzaehlung_rev_stddev_samp_fields', () => TeilzaehlungRevStddevSampFieldsModel], ['teilzaehlung_rev_sum_fields', () => TeilzaehlungRevSumFieldsModel], ['teilzaehlung_rev_var_pop_fields', () => TeilzaehlungRevVarPopFieldsModel], ['teilzaehlung_rev_var_samp_fields', () => TeilzaehlungRevVarSampFieldsModel], ['teilzaehlung_rev_variance_fields', () => TeilzaehlungRevVarianceFieldsModel], ['user_role_aggregate', () => UserRoleAggregateModel], ['user_role_aggregate_fields', () => UserRoleAggregateFieldsModel], ['user_role_avg_fields', () => UserRoleAvgFieldsModel], ['user_role_max_fields', () => UserRoleMaxFieldsModel], ['user_role_min_fields', () => UserRoleMinFieldsModel], ['user_role_stddev_fields', () => UserRoleStddevFieldsModel], ['user_role_stddev_pop_fields', () => UserRoleStddevPopFieldsModel], ['user_role_stddev_samp_fields', () => UserRoleStddevSampFieldsModel], ['user_role_sum_fields', () => UserRoleSumFieldsModel], ['user_role_var_pop_fields', () => UserRoleVarPopFieldsModel], ['user_role_var_samp_fields', () => UserRoleVarSampFieldsModel], ['user_role_variance_fields', () => UserRoleVarianceFieldsModel], ['zaehlung_rev', () => ZaehlungRevModel], ['zaehlung_rev_aggregate', () => ZaehlungRevAggregateModel], ['zaehlung_rev_aggregate_fields', () => ZaehlungRevAggregateFieldsModel], ['zaehlung_rev_avg_fields', () => ZaehlungRevAvgFieldsModel], ['zaehlung_rev_max_fields', () => ZaehlungRevMaxFieldsModel], ['zaehlung_rev_min_fields', () => ZaehlungRevMinFieldsModel], ['zaehlung_rev_stddev_fields', () => ZaehlungRevStddevFieldsModel], ['zaehlung_rev_stddev_pop_fields', () => ZaehlungRevStddevPopFieldsModel], ['zaehlung_rev_stddev_samp_fields', () => ZaehlungRevStddevSampFieldsModel], ['zaehlung_rev_sum_fields', () => ZaehlungRevSumFieldsModel], ['zaehlung_rev_var_pop_fields', () => ZaehlungRevVarPopFieldsModel], ['zaehlung_rev_var_samp_fields', () => ZaehlungRevVarSampFieldsModel], ['zaehlung_rev_variance_fields', () => ZaehlungRevVarianceFieldsModel], ['mutation_root', () => MutationRootModel], ['ae_art_mutation_response', () => AeArtMutationResponseModel], ['art_mutation_response', () => ArtMutationResponseModel], ['art_file_mutation_response', () => ArtFileMutationResponseModel], ['art_qk_mutation_response', () => ArtQkMutationResponseModel], ['art_qk_choosen_mutation_response', () => ArtQkChoosenMutationResponseModel], ['art_rev_mutation_response', () => ArtRevMutationResponseModel], ['av_art_mutation_response', () => AvArtMutationResponseModel], ['event_mutation_response', () => EventMutationResponseModel], ['event_rev_mutation_response', () => EventRevMutationResponseModel], ['garten_mutation_response', () => GartenMutationResponseModel], ['garten_file_mutation_response', () => GartenFileMutationResponseModel], ['garten_rev_mutation_response', () => GartenRevMutationResponseModel], ['herkunft_mutation_response', () => HerkunftMutationResponseModel], ['herkunft_file_mutation_response', () => HerkunftFileMutationResponseModel], ['herkunft_rev_mutation_response', () => HerkunftRevMutationResponseModel], ['kultur_mutation_response', () => KulturMutationResponseModel], ['kultur_file_mutation_response', () => KulturFileMutationResponseModel], ['kultur_option_mutation_response', () => KulturOptionMutationResponseModel], ['kultur_option_rev_mutation_response', () => KulturOptionRevMutationResponseModel], ['kultur_qk_mutation_response', () => KulturQkMutationResponseModel], ['kultur_qk_choosen_mutation_response', () => KulturQkChoosenMutationResponseModel], ['kultur_rev_mutation_response', () => KulturRevMutationResponseModel], ['lieferung_mutation_response', () => LieferungMutationResponseModel], ['lieferung_file_mutation_response', () => LieferungFileMutationResponseModel], ['lieferung_rev_mutation_response', () => LieferungRevMutationResponseModel], ['person_mutation_response', () => PersonMutationResponseModel], ['person_file_mutation_response', () => PersonFileMutationResponseModel], ['person_option_mutation_response', () => PersonOptionMutationResponseModel], ['person_option_rev_mutation_response', () => PersonOptionRevMutationResponseModel], ['person_rev_mutation_response', () => PersonRevMutationResponseModel], ['sammel_lieferung_mutation_response', () => SammelLieferungMutationResponseModel], ['sammel_lieferung_rev_mutation_response', () => SammelLieferungRevMutationResponseModel], ['sammlung_mutation_response', () => SammlungMutationResponseModel], ['sammlung_file_mutation_response', () => SammlungFileMutationResponseModel], ['sammlung_rev_mutation_response', () => SammlungRevMutationResponseModel], ['spatial_ref_sys_mutation_response', () => SpatialRefSysMutationResponseModel], ['teilkultur_mutation_response', () => TeilkulturMutationResponseModel], ['teilkultur_rev_mutation_response', () => TeilkulturRevMutationResponseModel], ['teilzaehlung_mutation_response', () => TeilzaehlungMutationResponseModel], ['teilzaehlung_rev_mutation_response', () => TeilzaehlungRevMutationResponseModel], ['user_role_mutation_response', () => UserRoleMutationResponseModel], ['zaehlung_mutation_response', () => ZaehlungMutationResponseModel], ['zaehlung_rev_mutation_response', () => ZaehlungRevMutationResponseModel], ['subscription_root', () => SubscriptionRootModel]], [], "js"))
  .props({

  })
  .actions(self => ({
    // fetch data from the table: "ae_art"
    queryAe_art(variables, resultSelector = aeArtModelPrimitives.toString(), options = {}) {
      return self.query(`query ae_art($distinctOn: [ae_art_select_column!], $limit: Int, $offset: Int, $orderBy: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "ae_art"
    queryAe_art_aggregate(variables, resultSelector = aeArtAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query ae_art_aggregate($distinctOn: [ae_art_select_column!], $limit: Int, $offset: Int, $orderBy: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art"
    queryArt(variables, resultSelector = artModelPrimitives.toString(), options = {}) {
      return self.query(`query art($distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art"
    queryArt_aggregate(variables, resultSelector = artAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_aggregate($distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art" using primary key columns
    queryArt_by_pk(variables, resultSelector = artModelPrimitives.toString(), options = {}) {
      return self.query(`query art_by_pk($id: uuid!) { art_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_file"
    queryArt_file(variables, resultSelector = artFileModelPrimitives.toString(), options = {}) {
      return self.query(`query art_file($distinctOn: [art_file_select_column!], $limit: Int, $offset: Int, $orderBy: [art_file_order_by!], $where: art_file_bool_exp) { art_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_file"
    queryArt_file_aggregate(variables, resultSelector = artFileAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_file_aggregate($distinctOn: [art_file_select_column!], $limit: Int, $offset: Int, $orderBy: [art_file_order_by!], $where: art_file_bool_exp) { art_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_file" using primary key columns
    queryArt_file_by_pk(variables, resultSelector = artFileModelPrimitives.toString(), options = {}) {
      return self.query(`query art_file_by_pk($id: uuid!) { art_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_qk"
    queryArt_qk(variables, resultSelector = artQkModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk($distinctOn: [art_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_qk"
    queryArt_qk_aggregate(variables, resultSelector = artQkAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_aggregate($distinctOn: [art_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_qk" using primary key columns
    queryArt_qk_by_pk(variables, resultSelector = artQkModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_by_pk($name: String!) { art_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_qk_choosen"
    queryArt_qk_choosen(variables, resultSelector = artQkChoosenModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_choosen($distinctOn: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_qk_choosen"
    queryArt_qk_choosen_aggregate(variables, resultSelector = artQkChoosenAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_qk_choosen_aggregate($distinctOn: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_rev"
    queryArt_rev(variables, resultSelector = artRevModelPrimitives.toString(), options = {}) {
      return self.query(`query art_rev($distinctOn: [art_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_rev"
    queryArt_rev_aggregate(variables, resultSelector = artRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_rev_aggregate($distinctOn: [art_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_rev" using primary key columns
    queryArt_rev_by_pk(variables, resultSelector = artRevModelPrimitives.toString(), options = {}) {
      return self.query(`query art_rev_by_pk($rev: String!, $id: uuid!) { art_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "art_search" which returns "art"
    queryArt_search(variables, resultSelector = artModelPrimitives.toString(), options = {}) {
      return self.query(`query art_search($args: art_search_args!, $distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "art_search" and query aggregates on result of table type "art"
    queryArt_search_aggregate(variables, resultSelector = artAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_search_aggregate($args: art_search_args!, $distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "art_sums"
    queryArt_sums(variables, resultSelector = artSumsModelPrimitives.toString(), options = {}) {
      return self.query(`query art_sums($distinctOn: [art_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtSumsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "art_sums"
    queryArt_sums_aggregate(variables, resultSelector = artSumsAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query art_sums_aggregate($distinctOn: [art_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtSumsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "av_art"
    queryAv_art(variables, resultSelector = avArtModelPrimitives.toString(), options = {}) {
      return self.query(`query av_art($distinctOn: [av_art_select_column!], $limit: Int, $offset: Int, $orderBy: [av_art_order_by!], $where: av_art_bool_exp) { av_art(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "av_art"
    queryAv_art_aggregate(variables, resultSelector = avArtAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query av_art_aggregate($distinctOn: [av_art_select_column!], $limit: Int, $offset: Int, $orderBy: [av_art_order_by!], $where: av_art_bool_exp) { av_art_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "av_art" using primary key columns
    queryAv_art_by_pk(variables, resultSelector = avArtModelPrimitives.toString(), options = {}) {
      return self.query(`query av_art_by_pk($artId: uuid!, $personId: uuid!) { av_art_by_pk(art_id: $artId, person_id: $personId) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event"
    queryEvent(variables, resultSelector = eventModelPrimitives.toString(), options = {}) {
      return self.query(`query event($distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "event"
    queryEvent_aggregate(variables, resultSelector = eventAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query event_aggregate($distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event" using primary key columns
    queryEvent_by_pk(variables, resultSelector = eventModelPrimitives.toString(), options = {}) {
      return self.query(`query event_by_pk($id: uuid!) { event_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event_rev"
    queryEvent_rev(variables, resultSelector = eventRevModelPrimitives.toString(), options = {}) {
      return self.query(`query event_rev($distinctOn: [event_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "event_rev"
    queryEvent_rev_aggregate(variables, resultSelector = eventRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query event_rev_aggregate($distinctOn: [event_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "event_rev" using primary key columns
    queryEvent_rev_by_pk(variables, resultSelector = eventRevModelPrimitives.toString(), options = {}) {
      return self.query(`query event_rev_by_pk($rev: String!, $id: uuid!) { event_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "event_search" which returns "event"
    queryEvent_search(variables, resultSelector = eventModelPrimitives.toString(), options = {}) {
      return self.query(`query event_search($args: event_search_args!, $distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "event_search" and query aggregates on result of table type "event"
    queryEvent_search_aggregate(variables, resultSelector = eventAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query event_search_aggregate($args: event_search_args!, $distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten"
    queryGarten(variables, resultSelector = gartenModelPrimitives.toString(), options = {}) {
      return self.query(`query garten($distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten"
    queryGarten_aggregate(variables, resultSelector = gartenAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_aggregate($distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten" using primary key columns
    queryGarten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_by_pk($id: uuid!) { garten_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_file"
    queryGarten_file(variables, resultSelector = gartenFileModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_file($distinctOn: [garten_file_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten_file"
    queryGarten_file_aggregate(variables, resultSelector = gartenFileAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_file_aggregate($distinctOn: [garten_file_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_file" using primary key columns
    queryGarten_file_by_pk(variables, resultSelector = gartenFileModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_file_by_pk($id: uuid!) { garten_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_rev"
    queryGarten_rev(variables, resultSelector = gartenRevModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_rev($distinctOn: [garten_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten_rev"
    queryGarten_rev_aggregate(variables, resultSelector = gartenRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_rev_aggregate($distinctOn: [garten_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_rev" using primary key columns
    queryGarten_rev_by_pk(variables, resultSelector = gartenRevModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_rev_by_pk($rev: String!, $id: uuid!) { garten_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "garten_search" which returns "garten"
    queryGarten_search(variables, resultSelector = gartenModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_search($args: garten_search_args!, $distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "garten_search" and query aggregates on result of table type "garten"
    queryGarten_search_aggregate(variables, resultSelector = gartenAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_search_aggregate($args: garten_search_args!, $distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "garten_teilzaehlung_sums"
    queryGarten_teilzaehlung_sums(variables, resultSelector = gartenTeilzaehlungSumsModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_teilzaehlung_sums($distinctOn: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenTeilzaehlungSumsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "garten_teilzaehlung_sums"
    queryGarten_teilzaehlung_sums_aggregate(variables, resultSelector = gartenTeilzaehlungSumsAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query garten_teilzaehlung_sums_aggregate($distinctOn: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenTeilzaehlungSumsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft"
    queryHerkunft(variables, resultSelector = herkunftModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft($distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft"
    queryHerkunft_aggregate(variables, resultSelector = herkunftAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_aggregate($distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft" using primary key columns
    queryHerkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_by_pk($id: uuid!) { herkunft_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_file"
    queryHerkunft_file(variables, resultSelector = herkunftFileModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_file($distinctOn: [herkunft_file_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft_file"
    queryHerkunft_file_aggregate(variables, resultSelector = herkunftFileAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_file_aggregate($distinctOn: [herkunft_file_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_file" using primary key columns
    queryHerkunft_file_by_pk(variables, resultSelector = herkunftFileModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_file_by_pk($id: uuid!) { herkunft_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_rev"
    queryHerkunft_rev(variables, resultSelector = herkunftRevModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_rev($distinctOn: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft_rev"
    queryHerkunft_rev_aggregate(variables, resultSelector = herkunftRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_rev_aggregate($distinctOn: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_rev" using primary key columns
    queryHerkunft_rev_by_pk(variables, resultSelector = herkunftRevModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_rev_by_pk($rev: String!, $id: uuid!) { herkunft_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "herkunft_search" which returns "herkunft"
    queryHerkunft_search(variables, resultSelector = herkunftModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_search($args: herkunft_search_args!, $distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "herkunft_search" and query aggregates on result of table type "herkunft"
    queryHerkunft_search_aggregate(variables, resultSelector = herkunftAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_search_aggregate($args: herkunft_search_args!, $distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "herkunft_sums"
    queryHerkunft_sums(variables, resultSelector = herkunftSumsModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_sums($distinctOn: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftSumsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "herkunft_sums"
    queryHerkunft_sums_aggregate(variables, resultSelector = herkunftSumsAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query herkunft_sums_aggregate($distinctOn: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftSumsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur"
    queryKultur(variables, resultSelector = kulturModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur($distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur"
    queryKultur_aggregate(variables, resultSelector = kulturAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_aggregate($distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur" using primary key columns
    queryKultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_by_pk($id: uuid!) { kultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_file"
    queryKultur_file(variables, resultSelector = kulturFileModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_file($distinctOn: [kultur_file_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_file"
    queryKultur_file_aggregate(variables, resultSelector = kulturFileAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_file_aggregate($distinctOn: [kultur_file_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_file" using primary key columns
    queryKultur_file_by_pk(variables, resultSelector = kulturFileModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_file_by_pk($id: uuid!) { kultur_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_option"
    queryKultur_option(variables, resultSelector = kulturOptionModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option($distinctOn: [kultur_option_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_option"
    queryKultur_option_aggregate(variables, resultSelector = kulturOptionAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_aggregate($distinctOn: [kultur_option_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_option_rev"
    queryKultur_option_rev(variables, resultSelector = kulturOptionRevModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_rev($distinctOn: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_option_rev"
    queryKultur_option_rev_aggregate(variables, resultSelector = kulturOptionRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_rev_aggregate($distinctOn: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_option_rev" using primary key columns
    queryKultur_option_rev_by_pk(variables, resultSelector = kulturOptionRevModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_option_rev_by_pk($rev: String!, $kulturId: uuid!) { kultur_option_rev_by_pk(_rev: $rev, kultur_id: $kulturId) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_qk"
    queryKultur_qk(variables, resultSelector = kulturQkModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk($distinctOn: [kultur_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_qk"
    queryKultur_qk_aggregate(variables, resultSelector = kulturQkAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_aggregate($distinctOn: [kultur_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_qk" using primary key columns
    queryKultur_qk_by_pk(variables, resultSelector = kulturQkModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_by_pk($name: String!) { kultur_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_qk_choosen"
    queryKultur_qk_choosen(variables, resultSelector = kulturQkChoosenModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_choosen($distinctOn: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_qk_choosen"
    queryKultur_qk_choosen_aggregate(variables, resultSelector = kulturQkChoosenAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_qk_choosen_aggregate($distinctOn: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_rev"
    queryKultur_rev(variables, resultSelector = kulturRevModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_rev($distinctOn: [kultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "kultur_rev"
    queryKultur_rev_aggregate(variables, resultSelector = kulturRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_rev_aggregate($distinctOn: [kultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "kultur_rev" using primary key columns
    queryKultur_rev_by_pk(variables, resultSelector = kulturRevModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_rev_by_pk($rev: String!, $id: uuid!) { kultur_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "kultur_search" which returns "kultur"
    queryKultur_search(variables, resultSelector = kulturModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_search($args: kultur_search_args!, $distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "kultur_search" and query aggregates on result of table type "kultur"
    queryKultur_search_aggregate(variables, resultSelector = kulturAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query kultur_search_aggregate($args: kultur_search_args!, $distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung"
    queryLieferung(variables, resultSelector = lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung($distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "lieferung"
    queryLieferung_aggregate(variables, resultSelector = lieferungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_aggregate($distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung" using primary key columns
    queryLieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_by_pk($id: uuid!) { lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_file"
    queryLieferung_file(variables, resultSelector = lieferungFileModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_file($distinctOn: [lieferung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "lieferung_file"
    queryLieferung_file_aggregate(variables, resultSelector = lieferungFileAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_file_aggregate($distinctOn: [lieferung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_file" using primary key columns
    queryLieferung_file_by_pk(variables, resultSelector = lieferungFileModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_file_by_pk($id: uuid!) { lieferung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_rev"
    queryLieferung_rev(variables, resultSelector = lieferungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_rev($distinctOn: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "lieferung_rev"
    queryLieferung_rev_aggregate(variables, resultSelector = lieferungRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_rev_aggregate($distinctOn: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "lieferung_rev" using primary key columns
    queryLieferung_rev_by_pk(variables, resultSelector = lieferungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_rev_by_pk($rev: String!, $id: uuid!) { lieferung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "lieferung_search" which returns "lieferung"
    queryLieferung_search(variables, resultSelector = lieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_search($args: lieferung_search_args!, $distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "lieferung_search" and query aggregates on result of table type "lieferung"
    queryLieferung_search_aggregate(variables, resultSelector = lieferungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query lieferung_search_aggregate($args: lieferung_search_args!, $distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person"
    queryPerson(variables, resultSelector = personModelPrimitives.toString(), options = {}) {
      return self.query(`query person($distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person"
    queryPerson_aggregate(variables, resultSelector = personAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_aggregate($distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person" using primary key columns
    queryPerson_by_pk(variables, resultSelector = personModelPrimitives.toString(), options = {}) {
      return self.query(`query person_by_pk($id: uuid!) { person_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_file"
    queryPerson_file(variables, resultSelector = personFileModelPrimitives.toString(), options = {}) {
      return self.query(`query person_file($distinctOn: [person_file_select_column!], $limit: Int, $offset: Int, $orderBy: [person_file_order_by!], $where: person_file_bool_exp) { person_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_file"
    queryPerson_file_aggregate(variables, resultSelector = personFileAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_file_aggregate($distinctOn: [person_file_select_column!], $limit: Int, $offset: Int, $orderBy: [person_file_order_by!], $where: person_file_bool_exp) { person_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_file" using primary key columns
    queryPerson_file_by_pk(variables, resultSelector = personFileModelPrimitives.toString(), options = {}) {
      return self.query(`query person_file_by_pk($id: uuid!) { person_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_option"
    queryPerson_option(variables, resultSelector = personOptionModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option($distinctOn: [person_option_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_order_by!], $where: person_option_bool_exp) { person_option(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_option"
    queryPerson_option_aggregate(variables, resultSelector = personOptionAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_aggregate($distinctOn: [person_option_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_order_by!], $where: person_option_bool_exp) { person_option_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_option_rev"
    queryPerson_option_rev(variables, resultSelector = personOptionRevModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_rev($distinctOn: [person_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_option_rev"
    queryPerson_option_rev_aggregate(variables, resultSelector = personOptionRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_rev_aggregate($distinctOn: [person_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_option_rev" using primary key columns
    queryPerson_option_rev_by_pk(variables, resultSelector = personOptionRevModelPrimitives.toString(), options = {}) {
      return self.query(`query person_option_rev_by_pk($rev: String!, $personId: uuid!) { person_option_rev_by_pk(_rev: $rev, person_id: $personId) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_rev"
    queryPerson_rev(variables, resultSelector = personRevModelPrimitives.toString(), options = {}) {
      return self.query(`query person_rev($distinctOn: [person_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "person_rev"
    queryPerson_rev_aggregate(variables, resultSelector = personRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_rev_aggregate($distinctOn: [person_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "person_rev" using primary key columns
    queryPerson_rev_by_pk(variables, resultSelector = personRevModelPrimitives.toString(), options = {}) {
      return self.query(`query person_rev_by_pk($rev: String!, $id: uuid!) { person_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "person_search" which returns "person"
    queryPerson_search(variables, resultSelector = personModelPrimitives.toString(), options = {}) {
      return self.query(`query person_search($args: person_search_args!, $distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "person_search" and query aggregates on result of table type "person"
    queryPerson_search_aggregate(variables, resultSelector = personAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query person_search_aggregate($args: person_search_args!, $distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung"
    querySammel_lieferung(variables, resultSelector = sammelLieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung($distinctOn: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammel_lieferung"
    querySammel_lieferung_aggregate(variables, resultSelector = sammelLieferungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_aggregate($distinctOn: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung" using primary key columns
    querySammel_lieferung_by_pk(variables, resultSelector = sammelLieferungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_by_pk($id: uuid!) { sammel_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung_rev"
    querySammel_lieferung_rev(variables, resultSelector = sammelLieferungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_rev($distinctOn: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammel_lieferung_rev"
    querySammel_lieferung_rev_aggregate(variables, resultSelector = sammelLieferungRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_rev_aggregate($distinctOn: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammel_lieferung_rev" using primary key columns
    querySammel_lieferung_rev_by_pk(variables, resultSelector = sammelLieferungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query sammel_lieferung_rev_by_pk($rev: String!, $id: uuid!) { sammel_lieferung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung"
    querySammlung(variables, resultSelector = sammlungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung($distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammlung"
    querySammlung_aggregate(variables, resultSelector = sammlungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_aggregate($distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung" using primary key columns
    querySammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_by_pk($id: uuid!) { sammlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_file"
    querySammlung_file(variables, resultSelector = sammlungFileModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_file($distinctOn: [sammlung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammlung_file"
    querySammlung_file_aggregate(variables, resultSelector = sammlungFileAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_file_aggregate($distinctOn: [sammlung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_file" using primary key columns
    querySammlung_file_by_pk(variables, resultSelector = sammlungFileModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_file_by_pk($id: uuid!) { sammlung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_rev"
    querySammlung_rev(variables, resultSelector = sammlungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_rev($distinctOn: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "sammlung_rev"
    querySammlung_rev_aggregate(variables, resultSelector = sammlungRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_rev_aggregate($distinctOn: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "sammlung_rev" using primary key columns
    querySammlung_rev_by_pk(variables, resultSelector = sammlungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_rev_by_pk($rev: String!, $id: uuid!) { sammlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "sammlung_search" which returns "sammlung"
    querySammlung_search(variables, resultSelector = sammlungModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_search($args: sammlung_search_args!, $distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "sammlung_search" and query aggregates on result of table type "sammlung"
    querySammlung_search_aggregate(variables, resultSelector = sammlungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query sammlung_search_aggregate($args: sammlung_search_args!, $distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "spatial_ref_sys"
    querySpatial_ref_sys(variables, resultSelector = spatialRefSysModelPrimitives.toString(), options = {}) {
      return self.query(`query spatial_ref_sys($distinctOn: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $orderBy: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "spatial_ref_sys"
    querySpatial_ref_sys_aggregate(variables, resultSelector = spatialRefSysAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query spatial_ref_sys_aggregate($distinctOn: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $orderBy: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "spatial_ref_sys" using primary key columns
    querySpatial_ref_sys_by_pk(variables, resultSelector = spatialRefSysModelPrimitives.toString(), options = {}) {
      return self.query(`query spatial_ref_sys_by_pk($srid: Int!) { spatial_ref_sys_by_pk(srid: $srid) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur"
    queryTeilkultur(variables, resultSelector = teilkulturModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur($distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilkultur"
    queryTeilkultur_aggregate(variables, resultSelector = teilkulturAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_aggregate($distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur" using primary key columns
    queryTeilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_by_pk($id: uuid!) { teilkultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur_rev"
    queryTeilkultur_rev(variables, resultSelector = teilkulturRevModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_rev($distinctOn: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilkultur_rev"
    queryTeilkultur_rev_aggregate(variables, resultSelector = teilkulturRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_rev_aggregate($distinctOn: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilkultur_rev" using primary key columns
    queryTeilkultur_rev_by_pk(variables, resultSelector = teilkulturRevModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_rev_by_pk($rev: String!, $id: uuid!) { teilkultur_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "teilkultur_search" which returns "teilkultur"
    queryTeilkultur_search(variables, resultSelector = teilkulturModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_search($args: teilkultur_search_args!, $distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "teilkultur_search" and query aggregates on result of table type "teilkultur"
    queryTeilkultur_search_aggregate(variables, resultSelector = teilkulturAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilkultur_search_aggregate($args: teilkultur_search_args!, $distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung"
    queryTeilzaehlung(variables, resultSelector = teilzaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung($distinctOn: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilzaehlung"
    queryTeilzaehlung_aggregate(variables, resultSelector = teilzaehlungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_aggregate($distinctOn: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung" using primary key columns
    queryTeilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_by_pk($id: uuid!) { teilzaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung_rev"
    queryTeilzaehlung_rev(variables, resultSelector = teilzaehlungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_rev($distinctOn: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "teilzaehlung_rev"
    queryTeilzaehlung_rev_aggregate(variables, resultSelector = teilzaehlungRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_rev_aggregate($distinctOn: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "teilzaehlung_rev" using primary key columns
    queryTeilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query teilzaehlung_rev_by_pk($rev: String!, $id: uuid!) { teilzaehlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "user_role"
    queryUser_role(variables, resultSelector = userRoleModelPrimitives.toString(), options = {}) {
      return self.query(`query user_role($distinctOn: [user_role_select_column!], $limit: Int, $offset: Int, $orderBy: [user_role_order_by!], $where: user_role_bool_exp) { user_role(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "user_role"
    queryUser_role_aggregate(variables, resultSelector = userRoleAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query user_role_aggregate($distinctOn: [user_role_select_column!], $limit: Int, $offset: Int, $orderBy: [user_role_order_by!], $where: user_role_bool_exp) { user_role_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "user_role" using primary key columns
    queryUser_role_by_pk(variables, resultSelector = userRoleModelPrimitives.toString(), options = {}) {
      return self.query(`query user_role_by_pk($name: String!) { user_role_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung"
    queryZaehlung(variables, resultSelector = zaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung($distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "zaehlung"
    queryZaehlung_aggregate(variables, resultSelector = zaehlungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_aggregate($distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung" using primary key columns
    queryZaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_by_pk($id: uuid!) { zaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung_rev"
    queryZaehlung_rev(variables, resultSelector = zaehlungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_rev($distinctOn: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch aggregated fields from the table: "zaehlung_rev"
    queryZaehlung_rev_aggregate(variables, resultSelector = zaehlungRevAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_rev_aggregate($distinctOn: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // fetch data from the table: "zaehlung_rev" using primary key columns
    queryZaehlung_rev_by_pk(variables, resultSelector = zaehlungRevModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_rev_by_pk($rev: String!, $id: uuid!) { zaehlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "zaehlung_search" which returns "zaehlung"
    queryZaehlung_search(variables, resultSelector = zaehlungModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_search($args: zaehlung_search_args!, $distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // execute function "zaehlung_search" and query aggregates on result of table type "zaehlung"
    queryZaehlung_search_aggregate(variables, resultSelector = zaehlungAggregateModelPrimitives.toString(), options = {}) {
      return self.query(`query zaehlung_search_aggregate($args: zaehlung_search_args!, $distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // delete data from the table: "ae_art"
    mutateDelete_ae_art(variables, resultSelector = aeArtMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_ae_art($where: ae_art_bool_exp!) { delete_ae_art(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art"
    mutateDelete_art(variables, resultSelector = artMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art($where: art_bool_exp!) { delete_art(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art"
    mutateDelete_art_by_pk(variables, resultSelector = artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_by_pk($id: uuid!) { delete_art_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_file"
    mutateDelete_art_file(variables, resultSelector = artFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_file($where: art_file_bool_exp!) { delete_art_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art_file"
    mutateDelete_art_file_by_pk(variables, resultSelector = artFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_file_by_pk($id: uuid!) { delete_art_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_qk"
    mutateDelete_art_qk(variables, resultSelector = artQkMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_qk($where: art_qk_bool_exp!) { delete_art_qk(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art_qk"
    mutateDelete_art_qk_by_pk(variables, resultSelector = artQkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_qk_by_pk($name: String!) { delete_art_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_qk_choosen"
    mutateDelete_art_qk_choosen(variables, resultSelector = artQkChoosenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_qk_choosen($where: art_qk_choosen_bool_exp!) { delete_art_qk_choosen(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "art_rev"
    mutateDelete_art_rev(variables, resultSelector = artRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_rev($where: art_rev_bool_exp!) { delete_art_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "art_rev"
    mutateDelete_art_rev_by_pk(variables, resultSelector = artRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_art_rev_by_pk($rev: String!, $id: uuid!) { delete_art_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "av_art"
    mutateDelete_av_art(variables, resultSelector = avArtMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_av_art($where: av_art_bool_exp!) { delete_av_art(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "av_art"
    mutateDelete_av_art_by_pk(variables, resultSelector = avArtModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_av_art_by_pk($artId: uuid!, $personId: uuid!) { delete_av_art_by_pk(art_id: $artId, person_id: $personId) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "event"
    mutateDelete_event(variables, resultSelector = eventMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event($where: event_bool_exp!) { delete_event(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "event"
    mutateDelete_event_by_pk(variables, resultSelector = eventModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event_by_pk($id: uuid!) { delete_event_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "event_rev"
    mutateDelete_event_rev(variables, resultSelector = eventRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event_rev($where: event_rev_bool_exp!) { delete_event_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "event_rev"
    mutateDelete_event_rev_by_pk(variables, resultSelector = eventRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_event_rev_by_pk($rev: String!, $id: uuid!) { delete_event_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "garten"
    mutateDelete_garten(variables, resultSelector = gartenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten($where: garten_bool_exp!) { delete_garten(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "garten"
    mutateDelete_garten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_by_pk($id: uuid!) { delete_garten_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "garten_file"
    mutateDelete_garten_file(variables, resultSelector = gartenFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_file($where: garten_file_bool_exp!) { delete_garten_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "garten_file"
    mutateDelete_garten_file_by_pk(variables, resultSelector = gartenFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_file_by_pk($id: uuid!) { delete_garten_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "garten_rev"
    mutateDelete_garten_rev(variables, resultSelector = gartenRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_rev($where: garten_rev_bool_exp!) { delete_garten_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "garten_rev"
    mutateDelete_garten_rev_by_pk(variables, resultSelector = gartenRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_garten_rev_by_pk($rev: String!, $id: uuid!) { delete_garten_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "herkunft"
    mutateDelete_herkunft(variables, resultSelector = herkunftMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft($where: herkunft_bool_exp!) { delete_herkunft(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "herkunft"
    mutateDelete_herkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_by_pk($id: uuid!) { delete_herkunft_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "herkunft_file"
    mutateDelete_herkunft_file(variables, resultSelector = herkunftFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_file($where: herkunft_file_bool_exp!) { delete_herkunft_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "herkunft_file"
    mutateDelete_herkunft_file_by_pk(variables, resultSelector = herkunftFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_file_by_pk($id: uuid!) { delete_herkunft_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "herkunft_rev"
    mutateDelete_herkunft_rev(variables, resultSelector = herkunftRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_rev($where: herkunft_rev_bool_exp!) { delete_herkunft_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "herkunft_rev"
    mutateDelete_herkunft_rev_by_pk(variables, resultSelector = herkunftRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_herkunft_rev_by_pk($rev: String!, $id: uuid!) { delete_herkunft_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur"
    mutateDelete_kultur(variables, resultSelector = kulturMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur($where: kultur_bool_exp!) { delete_kultur(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur"
    mutateDelete_kultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_by_pk($id: uuid!) { delete_kultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_file"
    mutateDelete_kultur_file(variables, resultSelector = kulturFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_file($where: kultur_file_bool_exp!) { delete_kultur_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_file"
    mutateDelete_kultur_file_by_pk(variables, resultSelector = kulturFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_file_by_pk($id: uuid!) { delete_kultur_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_option"
    mutateDelete_kultur_option(variables, resultSelector = kulturOptionMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_option($where: kultur_option_bool_exp!) { delete_kultur_option(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_option_rev"
    mutateDelete_kultur_option_rev(variables, resultSelector = kulturOptionRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_option_rev($where: kultur_option_rev_bool_exp!) { delete_kultur_option_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_option_rev"
    mutateDelete_kultur_option_rev_by_pk(variables, resultSelector = kulturOptionRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_option_rev_by_pk($rev: String!, $kulturId: uuid!) { delete_kultur_option_rev_by_pk(_rev: $rev, kultur_id: $kulturId) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_qk"
    mutateDelete_kultur_qk(variables, resultSelector = kulturQkMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_qk($where: kultur_qk_bool_exp!) { delete_kultur_qk(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_qk"
    mutateDelete_kultur_qk_by_pk(variables, resultSelector = kulturQkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_qk_by_pk($name: String!) { delete_kultur_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_qk_choosen"
    mutateDelete_kultur_qk_choosen(variables, resultSelector = kulturQkChoosenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_qk_choosen($where: kultur_qk_choosen_bool_exp!) { delete_kultur_qk_choosen(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "kultur_rev"
    mutateDelete_kultur_rev(variables, resultSelector = kulturRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_rev($where: kultur_rev_bool_exp!) { delete_kultur_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "kultur_rev"
    mutateDelete_kultur_rev_by_pk(variables, resultSelector = kulturRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_kultur_rev_by_pk($rev: String!, $id: uuid!) { delete_kultur_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "lieferung"
    mutateDelete_lieferung(variables, resultSelector = lieferungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung($where: lieferung_bool_exp!) { delete_lieferung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "lieferung"
    mutateDelete_lieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_by_pk($id: uuid!) { delete_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "lieferung_file"
    mutateDelete_lieferung_file(variables, resultSelector = lieferungFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_file($where: lieferung_file_bool_exp!) { delete_lieferung_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "lieferung_file"
    mutateDelete_lieferung_file_by_pk(variables, resultSelector = lieferungFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_file_by_pk($id: uuid!) { delete_lieferung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "lieferung_rev"
    mutateDelete_lieferung_rev(variables, resultSelector = lieferungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_rev($where: lieferung_rev_bool_exp!) { delete_lieferung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "lieferung_rev"
    mutateDelete_lieferung_rev_by_pk(variables, resultSelector = lieferungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_lieferung_rev_by_pk($rev: String!, $id: uuid!) { delete_lieferung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person"
    mutateDelete_person(variables, resultSelector = personMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person($where: person_bool_exp!) { delete_person(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person"
    mutateDelete_person_by_pk(variables, resultSelector = personModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_by_pk($id: uuid!) { delete_person_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_file"
    mutateDelete_person_file(variables, resultSelector = personFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_file($where: person_file_bool_exp!) { delete_person_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person_file"
    mutateDelete_person_file_by_pk(variables, resultSelector = personFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_file_by_pk($id: uuid!) { delete_person_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_option"
    mutateDelete_person_option(variables, resultSelector = personOptionMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_option($where: person_option_bool_exp!) { delete_person_option(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_option_rev"
    mutateDelete_person_option_rev(variables, resultSelector = personOptionRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_option_rev($where: person_option_rev_bool_exp!) { delete_person_option_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person_option_rev"
    mutateDelete_person_option_rev_by_pk(variables, resultSelector = personOptionRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_option_rev_by_pk($rev: String!, $personId: uuid!) { delete_person_option_rev_by_pk(_rev: $rev, person_id: $personId) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "person_rev"
    mutateDelete_person_rev(variables, resultSelector = personRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_rev($where: person_rev_bool_exp!) { delete_person_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "person_rev"
    mutateDelete_person_rev_by_pk(variables, resultSelector = personRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_person_rev_by_pk($rev: String!, $id: uuid!) { delete_person_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammel_lieferung"
    mutateDelete_sammel_lieferung(variables, resultSelector = sammelLieferungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung($where: sammel_lieferung_bool_exp!) { delete_sammel_lieferung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammel_lieferung"
    mutateDelete_sammel_lieferung_by_pk(variables, resultSelector = sammelLieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung_by_pk($id: uuid!) { delete_sammel_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammel_lieferung_rev"
    mutateDelete_sammel_lieferung_rev(variables, resultSelector = sammelLieferungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung_rev($where: sammel_lieferung_rev_bool_exp!) { delete_sammel_lieferung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammel_lieferung_rev"
    mutateDelete_sammel_lieferung_rev_by_pk(variables, resultSelector = sammelLieferungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammel_lieferung_rev_by_pk($rev: String!, $id: uuid!) { delete_sammel_lieferung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammlung"
    mutateDelete_sammlung(variables, resultSelector = sammlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung($where: sammlung_bool_exp!) { delete_sammlung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammlung"
    mutateDelete_sammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_by_pk($id: uuid!) { delete_sammlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammlung_file"
    mutateDelete_sammlung_file(variables, resultSelector = sammlungFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_file($where: sammlung_file_bool_exp!) { delete_sammlung_file(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammlung_file"
    mutateDelete_sammlung_file_by_pk(variables, resultSelector = sammlungFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_file_by_pk($id: uuid!) { delete_sammlung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "sammlung_rev"
    mutateDelete_sammlung_rev(variables, resultSelector = sammlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_rev($where: sammlung_rev_bool_exp!) { delete_sammlung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "sammlung_rev"
    mutateDelete_sammlung_rev_by_pk(variables, resultSelector = sammlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_sammlung_rev_by_pk($rev: String!, $id: uuid!) { delete_sammlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "spatial_ref_sys"
    mutateDelete_spatial_ref_sys(variables, resultSelector = spatialRefSysMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_spatial_ref_sys($where: spatial_ref_sys_bool_exp!) { delete_spatial_ref_sys(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "spatial_ref_sys"
    mutateDelete_spatial_ref_sys_by_pk(variables, resultSelector = spatialRefSysModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_spatial_ref_sys_by_pk($srid: Int!) { delete_spatial_ref_sys_by_pk(srid: $srid) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilkultur"
    mutateDelete_teilkultur(variables, resultSelector = teilkulturMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur($where: teilkultur_bool_exp!) { delete_teilkultur(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilkultur"
    mutateDelete_teilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur_by_pk($id: uuid!) { delete_teilkultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilkultur_rev"
    mutateDelete_teilkultur_rev(variables, resultSelector = teilkulturRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur_rev($where: teilkultur_rev_bool_exp!) { delete_teilkultur_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilkultur_rev"
    mutateDelete_teilkultur_rev_by_pk(variables, resultSelector = teilkulturRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilkultur_rev_by_pk($rev: String!, $id: uuid!) { delete_teilkultur_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilzaehlung"
    mutateDelete_teilzaehlung(variables, resultSelector = teilzaehlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung($where: teilzaehlung_bool_exp!) { delete_teilzaehlung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilzaehlung"
    mutateDelete_teilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung_by_pk($id: uuid!) { delete_teilzaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "teilzaehlung_rev"
    mutateDelete_teilzaehlung_rev(variables, resultSelector = teilzaehlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung_rev($where: teilzaehlung_rev_bool_exp!) { delete_teilzaehlung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "teilzaehlung_rev"
    mutateDelete_teilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_teilzaehlung_rev_by_pk($rev: String!, $id: uuid!) { delete_teilzaehlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "user_role"
    mutateDelete_user_role(variables, resultSelector = userRoleMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_user_role($where: user_role_bool_exp!) { delete_user_role(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "user_role"
    mutateDelete_user_role_by_pk(variables, resultSelector = userRoleModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_user_role_by_pk($name: String!) { delete_user_role_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "zaehlung"
    mutateDelete_zaehlung(variables, resultSelector = zaehlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung($where: zaehlung_bool_exp!) { delete_zaehlung(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "zaehlung"
    mutateDelete_zaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung_by_pk($id: uuid!) { delete_zaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete data from the table: "zaehlung_rev"
    mutateDelete_zaehlung_rev(variables, resultSelector = zaehlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung_rev($where: zaehlung_rev_bool_exp!) { delete_zaehlung_rev(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // delete single row from the table: "zaehlung_rev"
    mutateDelete_zaehlung_rev_by_pk(variables, resultSelector = zaehlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation delete_zaehlung_rev_by_pk($rev: String!, $id: uuid!) { delete_zaehlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "ae_art"
    mutateInsert_ae_art(variables, resultSelector = aeArtMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_ae_art($objects: [ae_art_insert_input!]!) { insert_ae_art(objects: $objects) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "ae_art"
    mutateInsert_ae_art_one(variables, resultSelector = aeArtModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_ae_art_one($object: ae_art_insert_input!) { insert_ae_art_one(object: $object) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art"
    mutateInsert_art(variables, resultSelector = artMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art($objects: [art_insert_input!]!, $onConflict: art_on_conflict) { insert_art(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_file"
    mutateInsert_art_file(variables, resultSelector = artFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_file($objects: [art_file_insert_input!]!, $onConflict: art_file_on_conflict) { insert_art_file(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_file"
    mutateInsert_art_file_one(variables, resultSelector = artFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_file_one($object: art_file_insert_input!, $onConflict: art_file_on_conflict) { insert_art_file_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art"
    mutateInsert_art_one(variables, resultSelector = artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_one($object: art_insert_input!, $onConflict: art_on_conflict) { insert_art_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_qk"
    mutateInsert_art_qk(variables, resultSelector = artQkMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk($objects: [art_qk_insert_input!]!, $onConflict: art_qk_on_conflict) { insert_art_qk(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_qk_choosen"
    mutateInsert_art_qk_choosen(variables, resultSelector = artQkChoosenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk_choosen($objects: [art_qk_choosen_insert_input!]!, $onConflict: art_qk_choosen_on_conflict) { insert_art_qk_choosen(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_qk_choosen"
    mutateInsert_art_qk_choosen_one(variables, resultSelector = artQkChoosenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk_choosen_one($object: art_qk_choosen_insert_input!, $onConflict: art_qk_choosen_on_conflict) { insert_art_qk_choosen_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_qk"
    mutateInsert_art_qk_one(variables, resultSelector = artQkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_qk_one($object: art_qk_insert_input!, $onConflict: art_qk_on_conflict) { insert_art_qk_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "art_rev"
    mutateInsert_art_rev(variables, resultSelector = artRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_rev($objects: [art_rev_insert_input!]!, $onConflict: art_rev_on_conflict) { insert_art_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "art_rev"
    mutateInsert_art_rev_one(variables, resultSelector = artRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_art_rev_one($object: art_rev_insert_input!, $onConflict: art_rev_on_conflict) { insert_art_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "av_art"
    mutateInsert_av_art(variables, resultSelector = avArtMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_av_art($objects: [av_art_insert_input!]!, $onConflict: av_art_on_conflict) { insert_av_art(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "av_art"
    mutateInsert_av_art_one(variables, resultSelector = avArtModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_av_art_one($object: av_art_insert_input!, $onConflict: av_art_on_conflict) { insert_av_art_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "event"
    mutateInsert_event(variables, resultSelector = eventMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event($objects: [event_insert_input!]!, $onConflict: event_on_conflict) { insert_event(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new EventMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "event"
    mutateInsert_event_one(variables, resultSelector = eventModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event_one($object: event_insert_input!, $onConflict: event_on_conflict) { insert_event_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "event_rev"
    mutateInsert_event_rev(variables, resultSelector = eventRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event_rev($objects: [event_rev_insert_input!]!, $onConflict: event_rev_on_conflict) { insert_event_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "event_rev"
    mutateInsert_event_rev_one(variables, resultSelector = eventRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_event_rev_one($object: event_rev_insert_input!, $onConflict: event_rev_on_conflict) { insert_event_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "garten"
    mutateInsert_garten(variables, resultSelector = gartenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten($objects: [garten_insert_input!]!, $onConflict: garten_on_conflict) { insert_garten(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "garten_file"
    mutateInsert_garten_file(variables, resultSelector = gartenFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_file($objects: [garten_file_insert_input!]!, $onConflict: garten_file_on_conflict) { insert_garten_file(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "garten_file"
    mutateInsert_garten_file_one(variables, resultSelector = gartenFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_file_one($object: garten_file_insert_input!, $onConflict: garten_file_on_conflict) { insert_garten_file_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "garten"
    mutateInsert_garten_one(variables, resultSelector = gartenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_one($object: garten_insert_input!, $onConflict: garten_on_conflict) { insert_garten_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "garten_rev"
    mutateInsert_garten_rev(variables, resultSelector = gartenRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_rev($objects: [garten_rev_insert_input!]!, $onConflict: garten_rev_on_conflict) { insert_garten_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "garten_rev"
    mutateInsert_garten_rev_one(variables, resultSelector = gartenRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_garten_rev_one($object: garten_rev_insert_input!, $onConflict: garten_rev_on_conflict) { insert_garten_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "herkunft"
    mutateInsert_herkunft(variables, resultSelector = herkunftMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft($objects: [herkunft_insert_input!]!, $onConflict: herkunft_on_conflict) { insert_herkunft(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "herkunft_file"
    mutateInsert_herkunft_file(variables, resultSelector = herkunftFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_file($objects: [herkunft_file_insert_input!]!, $onConflict: herkunft_file_on_conflict) { insert_herkunft_file(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "herkunft_file"
    mutateInsert_herkunft_file_one(variables, resultSelector = herkunftFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_file_one($object: herkunft_file_insert_input!, $onConflict: herkunft_file_on_conflict) { insert_herkunft_file_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "herkunft"
    mutateInsert_herkunft_one(variables, resultSelector = herkunftModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_one($object: herkunft_insert_input!, $onConflict: herkunft_on_conflict) { insert_herkunft_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "herkunft_rev"
    mutateInsert_herkunft_rev(variables, resultSelector = herkunftRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_rev($objects: [herkunft_rev_insert_input!]!, $onConflict: herkunft_rev_on_conflict) { insert_herkunft_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "herkunft_rev"
    mutateInsert_herkunft_rev_one(variables, resultSelector = herkunftRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_herkunft_rev_one($object: herkunft_rev_insert_input!, $onConflict: herkunft_rev_on_conflict) { insert_herkunft_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur"
    mutateInsert_kultur(variables, resultSelector = kulturMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur($objects: [kultur_insert_input!]!, $onConflict: kultur_on_conflict) { insert_kultur(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_file"
    mutateInsert_kultur_file(variables, resultSelector = kulturFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_file($objects: [kultur_file_insert_input!]!, $onConflict: kultur_file_on_conflict) { insert_kultur_file(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_file"
    mutateInsert_kultur_file_one(variables, resultSelector = kulturFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_file_one($object: kultur_file_insert_input!, $onConflict: kultur_file_on_conflict) { insert_kultur_file_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur"
    mutateInsert_kultur_one(variables, resultSelector = kulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_one($object: kultur_insert_input!, $onConflict: kultur_on_conflict) { insert_kultur_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_option"
    mutateInsert_kultur_option(variables, resultSelector = kulturOptionMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option($objects: [kultur_option_insert_input!]!, $onConflict: kultur_option_on_conflict) { insert_kultur_option(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_option"
    mutateInsert_kultur_option_one(variables, resultSelector = kulturOptionModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option_one($object: kultur_option_insert_input!, $onConflict: kultur_option_on_conflict) { insert_kultur_option_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_option_rev"
    mutateInsert_kultur_option_rev(variables, resultSelector = kulturOptionRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option_rev($objects: [kultur_option_rev_insert_input!]!, $onConflict: kultur_option_rev_on_conflict) { insert_kultur_option_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_option_rev"
    mutateInsert_kultur_option_rev_one(variables, resultSelector = kulturOptionRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_option_rev_one($object: kultur_option_rev_insert_input!, $onConflict: kultur_option_rev_on_conflict) { insert_kultur_option_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_qk"
    mutateInsert_kultur_qk(variables, resultSelector = kulturQkMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk($objects: [kultur_qk_insert_input!]!, $onConflict: kultur_qk_on_conflict) { insert_kultur_qk(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_qk_choosen"
    mutateInsert_kultur_qk_choosen(variables, resultSelector = kulturQkChoosenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk_choosen($objects: [kultur_qk_choosen_insert_input!]!, $onConflict: kultur_qk_choosen_on_conflict) { insert_kultur_qk_choosen(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_qk_choosen"
    mutateInsert_kultur_qk_choosen_one(variables, resultSelector = kulturQkChoosenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk_choosen_one($object: kultur_qk_choosen_insert_input!, $onConflict: kultur_qk_choosen_on_conflict) { insert_kultur_qk_choosen_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_qk"
    mutateInsert_kultur_qk_one(variables, resultSelector = kulturQkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_qk_one($object: kultur_qk_insert_input!, $onConflict: kultur_qk_on_conflict) { insert_kultur_qk_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "kultur_rev"
    mutateInsert_kultur_rev(variables, resultSelector = kulturRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_rev($objects: [kultur_rev_insert_input!]!, $onConflict: kultur_rev_on_conflict) { insert_kultur_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "kultur_rev"
    mutateInsert_kultur_rev_one(variables, resultSelector = kulturRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_kultur_rev_one($object: kultur_rev_insert_input!, $onConflict: kultur_rev_on_conflict) { insert_kultur_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "lieferung"
    mutateInsert_lieferung(variables, resultSelector = lieferungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung($objects: [lieferung_insert_input!]!, $onConflict: lieferung_on_conflict) { insert_lieferung(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "lieferung_file"
    mutateInsert_lieferung_file(variables, resultSelector = lieferungFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_file($objects: [lieferung_file_insert_input!]!, $onConflict: lieferung_file_on_conflict) { insert_lieferung_file(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "lieferung_file"
    mutateInsert_lieferung_file_one(variables, resultSelector = lieferungFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_file_one($object: lieferung_file_insert_input!, $onConflict: lieferung_file_on_conflict) { insert_lieferung_file_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "lieferung"
    mutateInsert_lieferung_one(variables, resultSelector = lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_one($object: lieferung_insert_input!, $onConflict: lieferung_on_conflict) { insert_lieferung_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "lieferung_rev"
    mutateInsert_lieferung_rev(variables, resultSelector = lieferungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_rev($objects: [lieferung_rev_insert_input!]!, $onConflict: lieferung_rev_on_conflict) { insert_lieferung_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "lieferung_rev"
    mutateInsert_lieferung_rev_one(variables, resultSelector = lieferungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_lieferung_rev_one($object: lieferung_rev_insert_input!, $onConflict: lieferung_rev_on_conflict) { insert_lieferung_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person"
    mutateInsert_person(variables, resultSelector = personMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person($objects: [person_insert_input!]!, $onConflict: person_on_conflict) { insert_person(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_file"
    mutateInsert_person_file(variables, resultSelector = personFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_file($objects: [person_file_insert_input!]!, $onConflict: person_file_on_conflict) { insert_person_file(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_file"
    mutateInsert_person_file_one(variables, resultSelector = personFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_file_one($object: person_file_insert_input!, $onConflict: person_file_on_conflict) { insert_person_file_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person"
    mutateInsert_person_one(variables, resultSelector = personModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_one($object: person_insert_input!, $onConflict: person_on_conflict) { insert_person_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_option"
    mutateInsert_person_option(variables, resultSelector = personOptionMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option($objects: [person_option_insert_input!]!, $onConflict: person_option_on_conflict) { insert_person_option(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_option"
    mutateInsert_person_option_one(variables, resultSelector = personOptionModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option_one($object: person_option_insert_input!, $onConflict: person_option_on_conflict) { insert_person_option_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_option_rev"
    mutateInsert_person_option_rev(variables, resultSelector = personOptionRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option_rev($objects: [person_option_rev_insert_input!]!, $onConflict: person_option_rev_on_conflict) { insert_person_option_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_option_rev"
    mutateInsert_person_option_rev_one(variables, resultSelector = personOptionRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_option_rev_one($object: person_option_rev_insert_input!, $onConflict: person_option_rev_on_conflict) { insert_person_option_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "person_rev"
    mutateInsert_person_rev(variables, resultSelector = personRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_rev($objects: [person_rev_insert_input!]!, $onConflict: person_rev_on_conflict) { insert_person_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "person_rev"
    mutateInsert_person_rev_one(variables, resultSelector = personRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_person_rev_one($object: person_rev_insert_input!, $onConflict: person_rev_on_conflict) { insert_person_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammel_lieferung"
    mutateInsert_sammel_lieferung(variables, resultSelector = sammelLieferungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung($objects: [sammel_lieferung_insert_input!]!, $onConflict: sammel_lieferung_on_conflict) { insert_sammel_lieferung(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammel_lieferung"
    mutateInsert_sammel_lieferung_one(variables, resultSelector = sammelLieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung_one($object: sammel_lieferung_insert_input!, $onConflict: sammel_lieferung_on_conflict) { insert_sammel_lieferung_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammel_lieferung_rev"
    mutateInsert_sammel_lieferung_rev(variables, resultSelector = sammelLieferungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung_rev($objects: [sammel_lieferung_rev_insert_input!]!, $onConflict: sammel_lieferung_rev_on_conflict) { insert_sammel_lieferung_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammel_lieferung_rev"
    mutateInsert_sammel_lieferung_rev_one(variables, resultSelector = sammelLieferungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammel_lieferung_rev_one($object: sammel_lieferung_rev_insert_input!, $onConflict: sammel_lieferung_rev_on_conflict) { insert_sammel_lieferung_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammlung"
    mutateInsert_sammlung(variables, resultSelector = sammlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung($objects: [sammlung_insert_input!]!, $onConflict: sammlung_on_conflict) { insert_sammlung(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammlung_file"
    mutateInsert_sammlung_file(variables, resultSelector = sammlungFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_file($objects: [sammlung_file_insert_input!]!, $onConflict: sammlung_file_on_conflict) { insert_sammlung_file(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammlung_file"
    mutateInsert_sammlung_file_one(variables, resultSelector = sammlungFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_file_one($object: sammlung_file_insert_input!, $onConflict: sammlung_file_on_conflict) { insert_sammlung_file_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammlung"
    mutateInsert_sammlung_one(variables, resultSelector = sammlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_one($object: sammlung_insert_input!, $onConflict: sammlung_on_conflict) { insert_sammlung_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "sammlung_rev"
    mutateInsert_sammlung_rev(variables, resultSelector = sammlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_rev($objects: [sammlung_rev_insert_input!]!, $onConflict: sammlung_rev_on_conflict) { insert_sammlung_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "sammlung_rev"
    mutateInsert_sammlung_rev_one(variables, resultSelector = sammlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_sammlung_rev_one($object: sammlung_rev_insert_input!, $onConflict: sammlung_rev_on_conflict) { insert_sammlung_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "spatial_ref_sys"
    mutateInsert_spatial_ref_sys(variables, resultSelector = spatialRefSysMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_spatial_ref_sys($objects: [spatial_ref_sys_insert_input!]!, $onConflict: spatial_ref_sys_on_conflict) { insert_spatial_ref_sys(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "spatial_ref_sys"
    mutateInsert_spatial_ref_sys_one(variables, resultSelector = spatialRefSysModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_spatial_ref_sys_one($object: spatial_ref_sys_insert_input!, $onConflict: spatial_ref_sys_on_conflict) { insert_spatial_ref_sys_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilkultur"
    mutateInsert_teilkultur(variables, resultSelector = teilkulturMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur($objects: [teilkultur_insert_input!]!, $onConflict: teilkultur_on_conflict) { insert_teilkultur(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilkultur"
    mutateInsert_teilkultur_one(variables, resultSelector = teilkulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur_one($object: teilkultur_insert_input!, $onConflict: teilkultur_on_conflict) { insert_teilkultur_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilkultur_rev"
    mutateInsert_teilkultur_rev(variables, resultSelector = teilkulturRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur_rev($objects: [teilkultur_rev_insert_input!]!, $onConflict: teilkultur_rev_on_conflict) { insert_teilkultur_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilkultur_rev"
    mutateInsert_teilkultur_rev_one(variables, resultSelector = teilkulturRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilkultur_rev_one($object: teilkultur_rev_insert_input!, $onConflict: teilkultur_rev_on_conflict) { insert_teilkultur_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilzaehlung"
    mutateInsert_teilzaehlung(variables, resultSelector = teilzaehlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung($objects: [teilzaehlung_insert_input!]!, $onConflict: teilzaehlung_on_conflict) { insert_teilzaehlung(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilzaehlung"
    mutateInsert_teilzaehlung_one(variables, resultSelector = teilzaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung_one($object: teilzaehlung_insert_input!, $onConflict: teilzaehlung_on_conflict) { insert_teilzaehlung_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "teilzaehlung_rev"
    mutateInsert_teilzaehlung_rev(variables, resultSelector = teilzaehlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung_rev($objects: [teilzaehlung_rev_insert_input!]!, $onConflict: teilzaehlung_rev_on_conflict) { insert_teilzaehlung_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "teilzaehlung_rev"
    mutateInsert_teilzaehlung_rev_one(variables, resultSelector = teilzaehlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_teilzaehlung_rev_one($object: teilzaehlung_rev_insert_input!, $onConflict: teilzaehlung_rev_on_conflict) { insert_teilzaehlung_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "user_role"
    mutateInsert_user_role(variables, resultSelector = userRoleMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_user_role($objects: [user_role_insert_input!]!, $onConflict: user_role_on_conflict) { insert_user_role(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "user_role"
    mutateInsert_user_role_one(variables, resultSelector = userRoleModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_user_role_one($object: user_role_insert_input!, $onConflict: user_role_on_conflict) { insert_user_role_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "zaehlung"
    mutateInsert_zaehlung(variables, resultSelector = zaehlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung($objects: [zaehlung_insert_input!]!, $onConflict: zaehlung_on_conflict) { insert_zaehlung(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "zaehlung"
    mutateInsert_zaehlung_one(variables, resultSelector = zaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung_one($object: zaehlung_insert_input!, $onConflict: zaehlung_on_conflict) { insert_zaehlung_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert data into the table: "zaehlung_rev"
    mutateInsert_zaehlung_rev(variables, resultSelector = zaehlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung_rev($objects: [zaehlung_rev_insert_input!]!, $onConflict: zaehlung_rev_on_conflict) { insert_zaehlung_rev(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // insert a single row into the table: "zaehlung_rev"
    mutateInsert_zaehlung_rev_one(variables, resultSelector = zaehlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation insert_zaehlung_rev_one($object: zaehlung_rev_insert_input!, $onConflict: zaehlung_rev_on_conflict) { insert_zaehlung_rev_one(object: $object, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "ae_art"
    mutateUpdate_ae_art(variables, resultSelector = aeArtMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_ae_art($set: ae_art_set_input, $where: ae_art_bool_exp!) { update_ae_art(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art"
    mutateUpdate_art(variables, resultSelector = artMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art($inc: art_inc_input, $set: art_set_input, $where: art_bool_exp!) { update_art(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art"
    mutateUpdate_art_by_pk(variables, resultSelector = artModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_by_pk($inc: art_inc_input, $set: art_set_input, $pkColumns: art_pk_columns_input!) { update_art_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_file"
    mutateUpdate_art_file(variables, resultSelector = artFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_file($set: art_file_set_input, $where: art_file_bool_exp!) { update_art_file(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art_file"
    mutateUpdate_art_file_by_pk(variables, resultSelector = artFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_file_by_pk($set: art_file_set_input, $pkColumns: art_file_pk_columns_input!) { update_art_file_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_qk"
    mutateUpdate_art_qk(variables, resultSelector = artQkMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_qk($inc: art_qk_inc_input, $set: art_qk_set_input, $where: art_qk_bool_exp!) { update_art_qk(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art_qk"
    mutateUpdate_art_qk_by_pk(variables, resultSelector = artQkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_qk_by_pk($inc: art_qk_inc_input, $set: art_qk_set_input, $pkColumns: art_qk_pk_columns_input!) { update_art_qk_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_qk_choosen"
    mutateUpdate_art_qk_choosen(variables, resultSelector = artQkChoosenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_qk_choosen($set: art_qk_choosen_set_input, $where: art_qk_choosen_bool_exp!) { update_art_qk_choosen(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "art_rev"
    mutateUpdate_art_rev(variables, resultSelector = artRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_rev($inc: art_rev_inc_input, $set: art_rev_set_input, $where: art_rev_bool_exp!) { update_art_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "art_rev"
    mutateUpdate_art_rev_by_pk(variables, resultSelector = artRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_art_rev_by_pk($inc: art_rev_inc_input, $set: art_rev_set_input, $pkColumns: art_rev_pk_columns_input!) { update_art_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "av_art"
    mutateUpdate_av_art(variables, resultSelector = avArtMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_av_art($set: av_art_set_input, $where: av_art_bool_exp!) { update_av_art(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "av_art"
    mutateUpdate_av_art_by_pk(variables, resultSelector = avArtModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_av_art_by_pk($set: av_art_set_input, $pkColumns: av_art_pk_columns_input!) { update_av_art_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "event"
    mutateUpdate_event(variables, resultSelector = eventMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event($inc: event_inc_input, $set: event_set_input, $where: event_bool_exp!) { update_event(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "event"
    mutateUpdate_event_by_pk(variables, resultSelector = eventModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event_by_pk($inc: event_inc_input, $set: event_set_input, $pkColumns: event_pk_columns_input!) { update_event_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "event_rev"
    mutateUpdate_event_rev(variables, resultSelector = eventRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event_rev($inc: event_rev_inc_input, $set: event_rev_set_input, $where: event_rev_bool_exp!) { update_event_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "event_rev"
    mutateUpdate_event_rev_by_pk(variables, resultSelector = eventRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_event_rev_by_pk($inc: event_rev_inc_input, $set: event_rev_set_input, $pkColumns: event_rev_pk_columns_input!) { update_event_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "garten"
    mutateUpdate_garten(variables, resultSelector = gartenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten($inc: garten_inc_input, $set: garten_set_input, $where: garten_bool_exp!) { update_garten(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "garten"
    mutateUpdate_garten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_by_pk($inc: garten_inc_input, $set: garten_set_input, $pkColumns: garten_pk_columns_input!) { update_garten_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "garten_file"
    mutateUpdate_garten_file(variables, resultSelector = gartenFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_file($set: garten_file_set_input, $where: garten_file_bool_exp!) { update_garten_file(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "garten_file"
    mutateUpdate_garten_file_by_pk(variables, resultSelector = gartenFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_file_by_pk($set: garten_file_set_input, $pkColumns: garten_file_pk_columns_input!) { update_garten_file_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "garten_rev"
    mutateUpdate_garten_rev(variables, resultSelector = gartenRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_rev($inc: garten_rev_inc_input, $set: garten_rev_set_input, $where: garten_rev_bool_exp!) { update_garten_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "garten_rev"
    mutateUpdate_garten_rev_by_pk(variables, resultSelector = gartenRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_garten_rev_by_pk($inc: garten_rev_inc_input, $set: garten_rev_set_input, $pkColumns: garten_rev_pk_columns_input!) { update_garten_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "herkunft"
    mutateUpdate_herkunft(variables, resultSelector = herkunftMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft($inc: herkunft_inc_input, $set: herkunft_set_input, $where: herkunft_bool_exp!) { update_herkunft(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "herkunft"
    mutateUpdate_herkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_by_pk($inc: herkunft_inc_input, $set: herkunft_set_input, $pkColumns: herkunft_pk_columns_input!) { update_herkunft_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "herkunft_file"
    mutateUpdate_herkunft_file(variables, resultSelector = herkunftFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_file($set: herkunft_file_set_input, $where: herkunft_file_bool_exp!) { update_herkunft_file(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "herkunft_file"
    mutateUpdate_herkunft_file_by_pk(variables, resultSelector = herkunftFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_file_by_pk($set: herkunft_file_set_input, $pkColumns: herkunft_file_pk_columns_input!) { update_herkunft_file_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "herkunft_rev"
    mutateUpdate_herkunft_rev(variables, resultSelector = herkunftRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_rev($inc: herkunft_rev_inc_input, $set: herkunft_rev_set_input, $where: herkunft_rev_bool_exp!) { update_herkunft_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "herkunft_rev"
    mutateUpdate_herkunft_rev_by_pk(variables, resultSelector = herkunftRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_herkunft_rev_by_pk($inc: herkunft_rev_inc_input, $set: herkunft_rev_set_input, $pkColumns: herkunft_rev_pk_columns_input!) { update_herkunft_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur"
    mutateUpdate_kultur(variables, resultSelector = kulturMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur($inc: kultur_inc_input, $set: kultur_set_input, $where: kultur_bool_exp!) { update_kultur(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur"
    mutateUpdate_kultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_by_pk($inc: kultur_inc_input, $set: kultur_set_input, $pkColumns: kultur_pk_columns_input!) { update_kultur_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_file"
    mutateUpdate_kultur_file(variables, resultSelector = kulturFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_file($set: kultur_file_set_input, $where: kultur_file_bool_exp!) { update_kultur_file(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_file"
    mutateUpdate_kultur_file_by_pk(variables, resultSelector = kulturFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_file_by_pk($set: kultur_file_set_input, $pkColumns: kultur_file_pk_columns_input!) { update_kultur_file_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_option"
    mutateUpdate_kultur_option(variables, resultSelector = kulturOptionMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_option($inc: kultur_option_inc_input, $set: kultur_option_set_input, $where: kultur_option_bool_exp!) { update_kultur_option(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_option_rev"
    mutateUpdate_kultur_option_rev(variables, resultSelector = kulturOptionRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_option_rev($inc: kultur_option_rev_inc_input, $set: kultur_option_rev_set_input, $where: kultur_option_rev_bool_exp!) { update_kultur_option_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_option_rev"
    mutateUpdate_kultur_option_rev_by_pk(variables, resultSelector = kulturOptionRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_option_rev_by_pk($inc: kultur_option_rev_inc_input, $set: kultur_option_rev_set_input, $pkColumns: kultur_option_rev_pk_columns_input!) { update_kultur_option_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_qk"
    mutateUpdate_kultur_qk(variables, resultSelector = kulturQkMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_qk($inc: kultur_qk_inc_input, $set: kultur_qk_set_input, $where: kultur_qk_bool_exp!) { update_kultur_qk(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_qk"
    mutateUpdate_kultur_qk_by_pk(variables, resultSelector = kulturQkModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_qk_by_pk($inc: kultur_qk_inc_input, $set: kultur_qk_set_input, $pkColumns: kultur_qk_pk_columns_input!) { update_kultur_qk_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_qk_choosen"
    mutateUpdate_kultur_qk_choosen(variables, resultSelector = kulturQkChoosenMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_qk_choosen($set: kultur_qk_choosen_set_input, $where: kultur_qk_choosen_bool_exp!) { update_kultur_qk_choosen(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "kultur_rev"
    mutateUpdate_kultur_rev(variables, resultSelector = kulturRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_rev($inc: kultur_rev_inc_input, $set: kultur_rev_set_input, $where: kultur_rev_bool_exp!) { update_kultur_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "kultur_rev"
    mutateUpdate_kultur_rev_by_pk(variables, resultSelector = kulturRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_kultur_rev_by_pk($inc: kultur_rev_inc_input, $set: kultur_rev_set_input, $pkColumns: kultur_rev_pk_columns_input!) { update_kultur_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "lieferung"
    mutateUpdate_lieferung(variables, resultSelector = lieferungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung($inc: lieferung_inc_input, $set: lieferung_set_input, $where: lieferung_bool_exp!) { update_lieferung(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "lieferung"
    mutateUpdate_lieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_by_pk($inc: lieferung_inc_input, $set: lieferung_set_input, $pkColumns: lieferung_pk_columns_input!) { update_lieferung_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "lieferung_file"
    mutateUpdate_lieferung_file(variables, resultSelector = lieferungFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_file($set: lieferung_file_set_input, $where: lieferung_file_bool_exp!) { update_lieferung_file(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "lieferung_file"
    mutateUpdate_lieferung_file_by_pk(variables, resultSelector = lieferungFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_file_by_pk($set: lieferung_file_set_input, $pkColumns: lieferung_file_pk_columns_input!) { update_lieferung_file_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "lieferung_rev"
    mutateUpdate_lieferung_rev(variables, resultSelector = lieferungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_rev($inc: lieferung_rev_inc_input, $set: lieferung_rev_set_input, $where: lieferung_rev_bool_exp!) { update_lieferung_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "lieferung_rev"
    mutateUpdate_lieferung_rev_by_pk(variables, resultSelector = lieferungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_lieferung_rev_by_pk($inc: lieferung_rev_inc_input, $set: lieferung_rev_set_input, $pkColumns: lieferung_rev_pk_columns_input!) { update_lieferung_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person"
    mutateUpdate_person(variables, resultSelector = personMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person($inc: person_inc_input, $set: person_set_input, $where: person_bool_exp!) { update_person(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person"
    mutateUpdate_person_by_pk(variables, resultSelector = personModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_by_pk($inc: person_inc_input, $set: person_set_input, $pkColumns: person_pk_columns_input!) { update_person_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_file"
    mutateUpdate_person_file(variables, resultSelector = personFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_file($set: person_file_set_input, $where: person_file_bool_exp!) { update_person_file(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person_file"
    mutateUpdate_person_file_by_pk(variables, resultSelector = personFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_file_by_pk($set: person_file_set_input, $pkColumns: person_file_pk_columns_input!) { update_person_file_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_option"
    mutateUpdate_person_option(variables, resultSelector = personOptionMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_option($inc: person_option_inc_input, $set: person_option_set_input, $where: person_option_bool_exp!) { update_person_option(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_option_rev"
    mutateUpdate_person_option_rev(variables, resultSelector = personOptionRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_option_rev($inc: person_option_rev_inc_input, $set: person_option_rev_set_input, $where: person_option_rev_bool_exp!) { update_person_option_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person_option_rev"
    mutateUpdate_person_option_rev_by_pk(variables, resultSelector = personOptionRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_option_rev_by_pk($inc: person_option_rev_inc_input, $set: person_option_rev_set_input, $pkColumns: person_option_rev_pk_columns_input!) { update_person_option_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "person_rev"
    mutateUpdate_person_rev(variables, resultSelector = personRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_rev($inc: person_rev_inc_input, $set: person_rev_set_input, $where: person_rev_bool_exp!) { update_person_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "person_rev"
    mutateUpdate_person_rev_by_pk(variables, resultSelector = personRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_person_rev_by_pk($inc: person_rev_inc_input, $set: person_rev_set_input, $pkColumns: person_rev_pk_columns_input!) { update_person_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammel_lieferung"
    mutateUpdate_sammel_lieferung(variables, resultSelector = sammelLieferungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung($inc: sammel_lieferung_inc_input, $set: sammel_lieferung_set_input, $where: sammel_lieferung_bool_exp!) { update_sammel_lieferung(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammel_lieferung"
    mutateUpdate_sammel_lieferung_by_pk(variables, resultSelector = sammelLieferungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung_by_pk($inc: sammel_lieferung_inc_input, $set: sammel_lieferung_set_input, $pkColumns: sammel_lieferung_pk_columns_input!) { update_sammel_lieferung_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammel_lieferung_rev"
    mutateUpdate_sammel_lieferung_rev(variables, resultSelector = sammelLieferungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung_rev($inc: sammel_lieferung_rev_inc_input, $set: sammel_lieferung_rev_set_input, $where: sammel_lieferung_rev_bool_exp!) { update_sammel_lieferung_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammel_lieferung_rev"
    mutateUpdate_sammel_lieferung_rev_by_pk(variables, resultSelector = sammelLieferungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammel_lieferung_rev_by_pk($inc: sammel_lieferung_rev_inc_input, $set: sammel_lieferung_rev_set_input, $pkColumns: sammel_lieferung_rev_pk_columns_input!) { update_sammel_lieferung_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammlung"
    mutateUpdate_sammlung(variables, resultSelector = sammlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung($inc: sammlung_inc_input, $set: sammlung_set_input, $where: sammlung_bool_exp!) { update_sammlung(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammlung"
    mutateUpdate_sammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_by_pk($inc: sammlung_inc_input, $set: sammlung_set_input, $pkColumns: sammlung_pk_columns_input!) { update_sammlung_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammlung_file"
    mutateUpdate_sammlung_file(variables, resultSelector = sammlungFileMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_file($set: sammlung_file_set_input, $where: sammlung_file_bool_exp!) { update_sammlung_file(_set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammlung_file"
    mutateUpdate_sammlung_file_by_pk(variables, resultSelector = sammlungFileModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_file_by_pk($set: sammlung_file_set_input, $pkColumns: sammlung_file_pk_columns_input!) { update_sammlung_file_by_pk(_set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "sammlung_rev"
    mutateUpdate_sammlung_rev(variables, resultSelector = sammlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_rev($inc: sammlung_rev_inc_input, $set: sammlung_rev_set_input, $where: sammlung_rev_bool_exp!) { update_sammlung_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "sammlung_rev"
    mutateUpdate_sammlung_rev_by_pk(variables, resultSelector = sammlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_sammlung_rev_by_pk($inc: sammlung_rev_inc_input, $set: sammlung_rev_set_input, $pkColumns: sammlung_rev_pk_columns_input!) { update_sammlung_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "spatial_ref_sys"
    mutateUpdate_spatial_ref_sys(variables, resultSelector = spatialRefSysMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_spatial_ref_sys($inc: spatial_ref_sys_inc_input, $set: spatial_ref_sys_set_input, $where: spatial_ref_sys_bool_exp!) { update_spatial_ref_sys(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "spatial_ref_sys"
    mutateUpdate_spatial_ref_sys_by_pk(variables, resultSelector = spatialRefSysModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_spatial_ref_sys_by_pk($inc: spatial_ref_sys_inc_input, $set: spatial_ref_sys_set_input, $pkColumns: spatial_ref_sys_pk_columns_input!) { update_spatial_ref_sys_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilkultur"
    mutateUpdate_teilkultur(variables, resultSelector = teilkulturMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur($inc: teilkultur_inc_input, $set: teilkultur_set_input, $where: teilkultur_bool_exp!) { update_teilkultur(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilkultur"
    mutateUpdate_teilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur_by_pk($inc: teilkultur_inc_input, $set: teilkultur_set_input, $pkColumns: teilkultur_pk_columns_input!) { update_teilkultur_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilkultur_rev"
    mutateUpdate_teilkultur_rev(variables, resultSelector = teilkulturRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur_rev($inc: teilkultur_rev_inc_input, $set: teilkultur_rev_set_input, $where: teilkultur_rev_bool_exp!) { update_teilkultur_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilkultur_rev"
    mutateUpdate_teilkultur_rev_by_pk(variables, resultSelector = teilkulturRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilkultur_rev_by_pk($inc: teilkultur_rev_inc_input, $set: teilkultur_rev_set_input, $pkColumns: teilkultur_rev_pk_columns_input!) { update_teilkultur_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilzaehlung"
    mutateUpdate_teilzaehlung(variables, resultSelector = teilzaehlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung($inc: teilzaehlung_inc_input, $set: teilzaehlung_set_input, $where: teilzaehlung_bool_exp!) { update_teilzaehlung(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilzaehlung"
    mutateUpdate_teilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung_by_pk($inc: teilzaehlung_inc_input, $set: teilzaehlung_set_input, $pkColumns: teilzaehlung_pk_columns_input!) { update_teilzaehlung_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "teilzaehlung_rev"
    mutateUpdate_teilzaehlung_rev(variables, resultSelector = teilzaehlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung_rev($inc: teilzaehlung_rev_inc_input, $set: teilzaehlung_rev_set_input, $where: teilzaehlung_rev_bool_exp!) { update_teilzaehlung_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "teilzaehlung_rev"
    mutateUpdate_teilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_teilzaehlung_rev_by_pk($inc: teilzaehlung_rev_inc_input, $set: teilzaehlung_rev_set_input, $pkColumns: teilzaehlung_rev_pk_columns_input!) { update_teilzaehlung_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "user_role"
    mutateUpdate_user_role(variables, resultSelector = userRoleMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_user_role($inc: user_role_inc_input, $set: user_role_set_input, $where: user_role_bool_exp!) { update_user_role(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "user_role"
    mutateUpdate_user_role_by_pk(variables, resultSelector = userRoleModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_user_role_by_pk($inc: user_role_inc_input, $set: user_role_set_input, $pkColumns: user_role_pk_columns_input!) { update_user_role_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "zaehlung"
    mutateUpdate_zaehlung(variables, resultSelector = zaehlungMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung($inc: zaehlung_inc_input, $set: zaehlung_set_input, $where: zaehlung_bool_exp!) { update_zaehlung(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "zaehlung"
    mutateUpdate_zaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung_by_pk($inc: zaehlung_inc_input, $set: zaehlung_set_input, $pkColumns: zaehlung_pk_columns_input!) { update_zaehlung_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update data of the table: "zaehlung_rev"
    mutateUpdate_zaehlung_rev(variables, resultSelector = zaehlungRevMutationResponseModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung_rev($inc: zaehlung_rev_inc_input, $set: zaehlung_rev_set_input, $where: zaehlung_rev_bool_exp!) { update_zaehlung_rev(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // update single row of the table: "zaehlung_rev"
    mutateUpdate_zaehlung_rev_by_pk(variables, resultSelector = zaehlungRevModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation update_zaehlung_rev_by_pk($inc: zaehlung_rev_inc_input, $set: zaehlung_rev_set_input, $pkColumns: zaehlung_rev_pk_columns_input!) { update_zaehlung_rev_by_pk(_inc: $inc, _set: $set, pk_columns: $pkColumns) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // fetch data from the table: "ae_art"
    subscribeAe_art(variables, resultSelector = aeArtModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription ae_art($distinctOn: [ae_art_select_column!], $limit: Int, $offset: Int, $orderBy: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "ae_art"
    subscribeAe_art_aggregate(variables, resultSelector = aeArtAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription ae_art_aggregate($distinctOn: [ae_art_select_column!], $limit: Int, $offset: Int, $orderBy: [ae_art_order_by!], $where: ae_art_bool_exp) { ae_art_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AeArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art"
    subscribeArt(variables, resultSelector = artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art($distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art"
    subscribeArt_aggregate(variables, resultSelector = artAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_aggregate($distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art" using primary key columns
    subscribeArt_by_pk(variables, resultSelector = artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_by_pk($id: uuid!) { art_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_file"
    subscribeArt_file(variables, resultSelector = artFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_file($distinctOn: [art_file_select_column!], $limit: Int, $offset: Int, $orderBy: [art_file_order_by!], $where: art_file_bool_exp) { art_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_file"
    subscribeArt_file_aggregate(variables, resultSelector = artFileAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_file_aggregate($distinctOn: [art_file_select_column!], $limit: Int, $offset: Int, $orderBy: [art_file_order_by!], $where: art_file_bool_exp) { art_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_file" using primary key columns
    subscribeArt_file_by_pk(variables, resultSelector = artFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_file_by_pk($id: uuid!) { art_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_qk"
    subscribeArt_qk(variables, resultSelector = artQkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk($distinctOn: [art_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_qk"
    subscribeArt_qk_aggregate(variables, resultSelector = artQkAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_aggregate($distinctOn: [art_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_order_by!], $where: art_qk_bool_exp) { art_qk_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_qk" using primary key columns
    subscribeArt_qk_by_pk(variables, resultSelector = artQkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_by_pk($name: String!) { art_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_qk_choosen"
    subscribeArt_qk_choosen(variables, resultSelector = artQkChoosenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_choosen($distinctOn: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_qk_choosen"
    subscribeArt_qk_choosen_aggregate(variables, resultSelector = artQkChoosenAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_qk_choosen_aggregate($distinctOn: [art_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [art_qk_choosen_order_by!], $where: art_qk_choosen_bool_exp) { art_qk_choosen_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtQkChoosenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_rev"
    subscribeArt_rev(variables, resultSelector = artRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_rev($distinctOn: [art_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_rev"
    subscribeArt_rev_aggregate(variables, resultSelector = artRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_rev_aggregate($distinctOn: [art_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [art_rev_order_by!], $where: art_rev_bool_exp) { art_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_rev" using primary key columns
    subscribeArt_rev_by_pk(variables, resultSelector = artRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_rev_by_pk($rev: String!, $id: uuid!) { art_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "art_search" which returns "art"
    subscribeArt_search(variables, resultSelector = artModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_search($args: art_search_args!, $distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "art_search" and query aggregates on result of table type "art"
    subscribeArt_search_aggregate(variables, resultSelector = artAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_search_aggregate($args: art_search_args!, $distinctOn: [art_select_column!], $limit: Int, $offset: Int, $orderBy: [art_order_by!], $where: art_bool_exp) { art_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "art_sums"
    subscribeArt_sums(variables, resultSelector = artSumsModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_sums($distinctOn: [art_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtSumsModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "art_sums"
    subscribeArt_sums_aggregate(variables, resultSelector = artSumsAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription art_sums_aggregate($distinctOn: [art_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [art_sums_order_by!], $where: art_sums_bool_exp) { art_sums_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ArtSumsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "av_art"
    subscribeAv_art(variables, resultSelector = avArtModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription av_art($distinctOn: [av_art_select_column!], $limit: Int, $offset: Int, $orderBy: [av_art_order_by!], $where: av_art_bool_exp) { av_art(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "av_art"
    subscribeAv_art_aggregate(variables, resultSelector = avArtAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription av_art_aggregate($distinctOn: [av_art_select_column!], $limit: Int, $offset: Int, $orderBy: [av_art_order_by!], $where: av_art_bool_exp) { av_art_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "av_art" using primary key columns
    subscribeAv_art_by_pk(variables, resultSelector = avArtModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription av_art_by_pk($artId: uuid!, $personId: uuid!) { av_art_by_pk(art_id: $artId, person_id: $personId) {
        ${typeof resultSelector === "function" ? resultSelector(new AvArtModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event"
    subscribeEvent(variables, resultSelector = eventModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event($distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "event"
    subscribeEvent_aggregate(variables, resultSelector = eventAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_aggregate($distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event" using primary key columns
    subscribeEvent_by_pk(variables, resultSelector = eventModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_by_pk($id: uuid!) { event_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event_rev"
    subscribeEvent_rev(variables, resultSelector = eventRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_rev($distinctOn: [event_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "event_rev"
    subscribeEvent_rev_aggregate(variables, resultSelector = eventRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_rev_aggregate($distinctOn: [event_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [event_rev_order_by!], $where: event_rev_bool_exp) { event_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "event_rev" using primary key columns
    subscribeEvent_rev_by_pk(variables, resultSelector = eventRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_rev_by_pk($rev: String!, $id: uuid!) { event_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new EventRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "event_search" which returns "event"
    subscribeEvent_search(variables, resultSelector = eventModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_search($args: event_search_args!, $distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "event_search" and query aggregates on result of table type "event"
    subscribeEvent_search_aggregate(variables, resultSelector = eventAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription event_search_aggregate($args: event_search_args!, $distinctOn: [event_select_column!], $limit: Int, $offset: Int, $orderBy: [event_order_by!], $where: event_bool_exp) { event_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new EventAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten"
    subscribeGarten(variables, resultSelector = gartenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten($distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten"
    subscribeGarten_aggregate(variables, resultSelector = gartenAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_aggregate($distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten" using primary key columns
    subscribeGarten_by_pk(variables, resultSelector = gartenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_by_pk($id: uuid!) { garten_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_file"
    subscribeGarten_file(variables, resultSelector = gartenFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_file($distinctOn: [garten_file_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten_file"
    subscribeGarten_file_aggregate(variables, resultSelector = gartenFileAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_file_aggregate($distinctOn: [garten_file_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_file_order_by!], $where: garten_file_bool_exp) { garten_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_file" using primary key columns
    subscribeGarten_file_by_pk(variables, resultSelector = gartenFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_file_by_pk($id: uuid!) { garten_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_rev"
    subscribeGarten_rev(variables, resultSelector = gartenRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_rev($distinctOn: [garten_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten_rev"
    subscribeGarten_rev_aggregate(variables, resultSelector = gartenRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_rev_aggregate($distinctOn: [garten_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_rev_order_by!], $where: garten_rev_bool_exp) { garten_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_rev" using primary key columns
    subscribeGarten_rev_by_pk(variables, resultSelector = gartenRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_rev_by_pk($rev: String!, $id: uuid!) { garten_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "garten_search" which returns "garten"
    subscribeGarten_search(variables, resultSelector = gartenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_search($args: garten_search_args!, $distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "garten_search" and query aggregates on result of table type "garten"
    subscribeGarten_search_aggregate(variables, resultSelector = gartenAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_search_aggregate($args: garten_search_args!, $distinctOn: [garten_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_order_by!], $where: garten_bool_exp) { garten_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "garten_teilzaehlung_sums"
    subscribeGarten_teilzaehlung_sums(variables, resultSelector = gartenTeilzaehlungSumsModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_teilzaehlung_sums($distinctOn: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenTeilzaehlungSumsModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "garten_teilzaehlung_sums"
    subscribeGarten_teilzaehlung_sums_aggregate(variables, resultSelector = gartenTeilzaehlungSumsAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription garten_teilzaehlung_sums_aggregate($distinctOn: [garten_teilzaehlung_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [garten_teilzaehlung_sums_order_by!], $where: garten_teilzaehlung_sums_bool_exp) { garten_teilzaehlung_sums_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new GartenTeilzaehlungSumsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft"
    subscribeHerkunft(variables, resultSelector = herkunftModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft($distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft"
    subscribeHerkunft_aggregate(variables, resultSelector = herkunftAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_aggregate($distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft" using primary key columns
    subscribeHerkunft_by_pk(variables, resultSelector = herkunftModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_by_pk($id: uuid!) { herkunft_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_file"
    subscribeHerkunft_file(variables, resultSelector = herkunftFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_file($distinctOn: [herkunft_file_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft_file"
    subscribeHerkunft_file_aggregate(variables, resultSelector = herkunftFileAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_file_aggregate($distinctOn: [herkunft_file_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_file_order_by!], $where: herkunft_file_bool_exp) { herkunft_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_file" using primary key columns
    subscribeHerkunft_file_by_pk(variables, resultSelector = herkunftFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_file_by_pk($id: uuid!) { herkunft_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_rev"
    subscribeHerkunft_rev(variables, resultSelector = herkunftRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_rev($distinctOn: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft_rev"
    subscribeHerkunft_rev_aggregate(variables, resultSelector = herkunftRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_rev_aggregate($distinctOn: [herkunft_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_rev_order_by!], $where: herkunft_rev_bool_exp) { herkunft_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_rev" using primary key columns
    subscribeHerkunft_rev_by_pk(variables, resultSelector = herkunftRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_rev_by_pk($rev: String!, $id: uuid!) { herkunft_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "herkunft_search" which returns "herkunft"
    subscribeHerkunft_search(variables, resultSelector = herkunftModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_search($args: herkunft_search_args!, $distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "herkunft_search" and query aggregates on result of table type "herkunft"
    subscribeHerkunft_search_aggregate(variables, resultSelector = herkunftAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_search_aggregate($args: herkunft_search_args!, $distinctOn: [herkunft_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_order_by!], $where: herkunft_bool_exp) { herkunft_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "herkunft_sums"
    subscribeHerkunft_sums(variables, resultSelector = herkunftSumsModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_sums($distinctOn: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftSumsModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "herkunft_sums"
    subscribeHerkunft_sums_aggregate(variables, resultSelector = herkunftSumsAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription herkunft_sums_aggregate($distinctOn: [herkunft_sums_select_column!], $limit: Int, $offset: Int, $orderBy: [herkunft_sums_order_by!], $where: herkunft_sums_bool_exp) { herkunft_sums_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new HerkunftSumsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur"
    subscribeKultur(variables, resultSelector = kulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur($distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur"
    subscribeKultur_aggregate(variables, resultSelector = kulturAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_aggregate($distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur" using primary key columns
    subscribeKultur_by_pk(variables, resultSelector = kulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_by_pk($id: uuid!) { kultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_file"
    subscribeKultur_file(variables, resultSelector = kulturFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_file($distinctOn: [kultur_file_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_file"
    subscribeKultur_file_aggregate(variables, resultSelector = kulturFileAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_file_aggregate($distinctOn: [kultur_file_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_file_order_by!], $where: kultur_file_bool_exp) { kultur_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_file" using primary key columns
    subscribeKultur_file_by_pk(variables, resultSelector = kulturFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_file_by_pk($id: uuid!) { kultur_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_option"
    subscribeKultur_option(variables, resultSelector = kulturOptionModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option($distinctOn: [kultur_option_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_option"
    subscribeKultur_option_aggregate(variables, resultSelector = kulturOptionAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_aggregate($distinctOn: [kultur_option_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_order_by!], $where: kultur_option_bool_exp) { kultur_option_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_option_rev"
    subscribeKultur_option_rev(variables, resultSelector = kulturOptionRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_rev($distinctOn: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_option_rev"
    subscribeKultur_option_rev_aggregate(variables, resultSelector = kulturOptionRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_rev_aggregate($distinctOn: [kultur_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_option_rev_order_by!], $where: kultur_option_rev_bool_exp) { kultur_option_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_option_rev" using primary key columns
    subscribeKultur_option_rev_by_pk(variables, resultSelector = kulturOptionRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_option_rev_by_pk($rev: String!, $kulturId: uuid!) { kultur_option_rev_by_pk(_rev: $rev, kultur_id: $kulturId) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_qk"
    subscribeKultur_qk(variables, resultSelector = kulturQkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk($distinctOn: [kultur_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_qk"
    subscribeKultur_qk_aggregate(variables, resultSelector = kulturQkAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_aggregate($distinctOn: [kultur_qk_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_order_by!], $where: kultur_qk_bool_exp) { kultur_qk_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_qk" using primary key columns
    subscribeKultur_qk_by_pk(variables, resultSelector = kulturQkModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_by_pk($name: String!) { kultur_qk_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_qk_choosen"
    subscribeKultur_qk_choosen(variables, resultSelector = kulturQkChoosenModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_choosen($distinctOn: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_qk_choosen"
    subscribeKultur_qk_choosen_aggregate(variables, resultSelector = kulturQkChoosenAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_qk_choosen_aggregate($distinctOn: [kultur_qk_choosen_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_qk_choosen_order_by!], $where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturQkChoosenAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_rev"
    subscribeKultur_rev(variables, resultSelector = kulturRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_rev($distinctOn: [kultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "kultur_rev"
    subscribeKultur_rev_aggregate(variables, resultSelector = kulturRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_rev_aggregate($distinctOn: [kultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_rev_order_by!], $where: kultur_rev_bool_exp) { kultur_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "kultur_rev" using primary key columns
    subscribeKultur_rev_by_pk(variables, resultSelector = kulturRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_rev_by_pk($rev: String!, $id: uuid!) { kultur_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "kultur_search" which returns "kultur"
    subscribeKultur_search(variables, resultSelector = kulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_search($args: kultur_search_args!, $distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "kultur_search" and query aggregates on result of table type "kultur"
    subscribeKultur_search_aggregate(variables, resultSelector = kulturAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription kultur_search_aggregate($args: kultur_search_args!, $distinctOn: [kultur_select_column!], $limit: Int, $offset: Int, $orderBy: [kultur_order_by!], $where: kultur_bool_exp) { kultur_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new KulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung"
    subscribeLieferung(variables, resultSelector = lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung($distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "lieferung"
    subscribeLieferung_aggregate(variables, resultSelector = lieferungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_aggregate($distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung" using primary key columns
    subscribeLieferung_by_pk(variables, resultSelector = lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_by_pk($id: uuid!) { lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_file"
    subscribeLieferung_file(variables, resultSelector = lieferungFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_file($distinctOn: [lieferung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "lieferung_file"
    subscribeLieferung_file_aggregate(variables, resultSelector = lieferungFileAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_file_aggregate($distinctOn: [lieferung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_file_order_by!], $where: lieferung_file_bool_exp) { lieferung_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_file" using primary key columns
    subscribeLieferung_file_by_pk(variables, resultSelector = lieferungFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_file_by_pk($id: uuid!) { lieferung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_rev"
    subscribeLieferung_rev(variables, resultSelector = lieferungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_rev($distinctOn: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "lieferung_rev"
    subscribeLieferung_rev_aggregate(variables, resultSelector = lieferungRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_rev_aggregate($distinctOn: [lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_rev_order_by!], $where: lieferung_rev_bool_exp) { lieferung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "lieferung_rev" using primary key columns
    subscribeLieferung_rev_by_pk(variables, resultSelector = lieferungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_rev_by_pk($rev: String!, $id: uuid!) { lieferung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "lieferung_search" which returns "lieferung"
    subscribeLieferung_search(variables, resultSelector = lieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_search($args: lieferung_search_args!, $distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "lieferung_search" and query aggregates on result of table type "lieferung"
    subscribeLieferung_search_aggregate(variables, resultSelector = lieferungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription lieferung_search_aggregate($args: lieferung_search_args!, $distinctOn: [lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [lieferung_order_by!], $where: lieferung_bool_exp) { lieferung_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new LieferungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person"
    subscribePerson(variables, resultSelector = personModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person($distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person"
    subscribePerson_aggregate(variables, resultSelector = personAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_aggregate($distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person" using primary key columns
    subscribePerson_by_pk(variables, resultSelector = personModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_by_pk($id: uuid!) { person_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_file"
    subscribePerson_file(variables, resultSelector = personFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_file($distinctOn: [person_file_select_column!], $limit: Int, $offset: Int, $orderBy: [person_file_order_by!], $where: person_file_bool_exp) { person_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_file"
    subscribePerson_file_aggregate(variables, resultSelector = personFileAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_file_aggregate($distinctOn: [person_file_select_column!], $limit: Int, $offset: Int, $orderBy: [person_file_order_by!], $where: person_file_bool_exp) { person_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_file" using primary key columns
    subscribePerson_file_by_pk(variables, resultSelector = personFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_file_by_pk($id: uuid!) { person_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_option"
    subscribePerson_option(variables, resultSelector = personOptionModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option($distinctOn: [person_option_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_order_by!], $where: person_option_bool_exp) { person_option(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_option"
    subscribePerson_option_aggregate(variables, resultSelector = personOptionAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_aggregate($distinctOn: [person_option_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_order_by!], $where: person_option_bool_exp) { person_option_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_option_rev"
    subscribePerson_option_rev(variables, resultSelector = personOptionRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_rev($distinctOn: [person_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_option_rev"
    subscribePerson_option_rev_aggregate(variables, resultSelector = personOptionRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_rev_aggregate($distinctOn: [person_option_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_option_rev_order_by!], $where: person_option_rev_bool_exp) { person_option_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_option_rev" using primary key columns
    subscribePerson_option_rev_by_pk(variables, resultSelector = personOptionRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_option_rev_by_pk($rev: String!, $personId: uuid!) { person_option_rev_by_pk(_rev: $rev, person_id: $personId) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonOptionRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_rev"
    subscribePerson_rev(variables, resultSelector = personRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_rev($distinctOn: [person_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "person_rev"
    subscribePerson_rev_aggregate(variables, resultSelector = personRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_rev_aggregate($distinctOn: [person_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [person_rev_order_by!], $where: person_rev_bool_exp) { person_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "person_rev" using primary key columns
    subscribePerson_rev_by_pk(variables, resultSelector = personRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_rev_by_pk($rev: String!, $id: uuid!) { person_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "person_search" which returns "person"
    subscribePerson_search(variables, resultSelector = personModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_search($args: person_search_args!, $distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "person_search" and query aggregates on result of table type "person"
    subscribePerson_search_aggregate(variables, resultSelector = personAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription person_search_aggregate($args: person_search_args!, $distinctOn: [person_select_column!], $limit: Int, $offset: Int, $orderBy: [person_order_by!], $where: person_bool_exp) { person_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PersonAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung"
    subscribeSammel_lieferung(variables, resultSelector = sammelLieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung($distinctOn: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammel_lieferung"
    subscribeSammel_lieferung_aggregate(variables, resultSelector = sammelLieferungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_aggregate($distinctOn: [sammel_lieferung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_order_by!], $where: sammel_lieferung_bool_exp) { sammel_lieferung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung" using primary key columns
    subscribeSammel_lieferung_by_pk(variables, resultSelector = sammelLieferungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_by_pk($id: uuid!) { sammel_lieferung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung_rev"
    subscribeSammel_lieferung_rev(variables, resultSelector = sammelLieferungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_rev($distinctOn: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammel_lieferung_rev"
    subscribeSammel_lieferung_rev_aggregate(variables, resultSelector = sammelLieferungRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_rev_aggregate($distinctOn: [sammel_lieferung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammel_lieferung_rev_order_by!], $where: sammel_lieferung_rev_bool_exp) { sammel_lieferung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammel_lieferung_rev" using primary key columns
    subscribeSammel_lieferung_rev_by_pk(variables, resultSelector = sammelLieferungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammel_lieferung_rev_by_pk($rev: String!, $id: uuid!) { sammel_lieferung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammelLieferungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung"
    subscribeSammlung(variables, resultSelector = sammlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung($distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammlung"
    subscribeSammlung_aggregate(variables, resultSelector = sammlungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_aggregate($distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung" using primary key columns
    subscribeSammlung_by_pk(variables, resultSelector = sammlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_by_pk($id: uuid!) { sammlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_file"
    subscribeSammlung_file(variables, resultSelector = sammlungFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_file($distinctOn: [sammlung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammlung_file"
    subscribeSammlung_file_aggregate(variables, resultSelector = sammlungFileAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_file_aggregate($distinctOn: [sammlung_file_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_file_order_by!], $where: sammlung_file_bool_exp) { sammlung_file_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_file" using primary key columns
    subscribeSammlung_file_by_pk(variables, resultSelector = sammlungFileModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_file_by_pk($id: uuid!) { sammlung_file_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungFileModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_rev"
    subscribeSammlung_rev(variables, resultSelector = sammlungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_rev($distinctOn: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "sammlung_rev"
    subscribeSammlung_rev_aggregate(variables, resultSelector = sammlungRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_rev_aggregate($distinctOn: [sammlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_rev_order_by!], $where: sammlung_rev_bool_exp) { sammlung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "sammlung_rev" using primary key columns
    subscribeSammlung_rev_by_pk(variables, resultSelector = sammlungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_rev_by_pk($rev: String!, $id: uuid!) { sammlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "sammlung_search" which returns "sammlung"
    subscribeSammlung_search(variables, resultSelector = sammlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_search($args: sammlung_search_args!, $distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "sammlung_search" and query aggregates on result of table type "sammlung"
    subscribeSammlung_search_aggregate(variables, resultSelector = sammlungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription sammlung_search_aggregate($args: sammlung_search_args!, $distinctOn: [sammlung_select_column!], $limit: Int, $offset: Int, $orderBy: [sammlung_order_by!], $where: sammlung_bool_exp) { sammlung_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SammlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "spatial_ref_sys"
    subscribeSpatial_ref_sys(variables, resultSelector = spatialRefSysModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription spatial_ref_sys($distinctOn: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $orderBy: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "spatial_ref_sys"
    subscribeSpatial_ref_sys_aggregate(variables, resultSelector = spatialRefSysAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription spatial_ref_sys_aggregate($distinctOn: [spatial_ref_sys_select_column!], $limit: Int, $offset: Int, $orderBy: [spatial_ref_sys_order_by!], $where: spatial_ref_sys_bool_exp) { spatial_ref_sys_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "spatial_ref_sys" using primary key columns
    subscribeSpatial_ref_sys_by_pk(variables, resultSelector = spatialRefSysModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription spatial_ref_sys_by_pk($srid: Int!) { spatial_ref_sys_by_pk(srid: $srid) {
        ${typeof resultSelector === "function" ? resultSelector(new SpatialRefSysModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur"
    subscribeTeilkultur(variables, resultSelector = teilkulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur($distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilkultur"
    subscribeTeilkultur_aggregate(variables, resultSelector = teilkulturAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_aggregate($distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur" using primary key columns
    subscribeTeilkultur_by_pk(variables, resultSelector = teilkulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_by_pk($id: uuid!) { teilkultur_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur_rev"
    subscribeTeilkultur_rev(variables, resultSelector = teilkulturRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_rev($distinctOn: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilkultur_rev"
    subscribeTeilkultur_rev_aggregate(variables, resultSelector = teilkulturRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_rev_aggregate($distinctOn: [teilkultur_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_rev_order_by!], $where: teilkultur_rev_bool_exp) { teilkultur_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilkultur_rev" using primary key columns
    subscribeTeilkultur_rev_by_pk(variables, resultSelector = teilkulturRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_rev_by_pk($rev: String!, $id: uuid!) { teilkultur_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "teilkultur_search" which returns "teilkultur"
    subscribeTeilkultur_search(variables, resultSelector = teilkulturModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_search($args: teilkultur_search_args!, $distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "teilkultur_search" and query aggregates on result of table type "teilkultur"
    subscribeTeilkultur_search_aggregate(variables, resultSelector = teilkulturAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilkultur_search_aggregate($args: teilkultur_search_args!, $distinctOn: [teilkultur_select_column!], $limit: Int, $offset: Int, $orderBy: [teilkultur_order_by!], $where: teilkultur_bool_exp) { teilkultur_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilkulturAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung"
    subscribeTeilzaehlung(variables, resultSelector = teilzaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung($distinctOn: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilzaehlung"
    subscribeTeilzaehlung_aggregate(variables, resultSelector = teilzaehlungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_aggregate($distinctOn: [teilzaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_order_by!], $where: teilzaehlung_bool_exp) { teilzaehlung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung" using primary key columns
    subscribeTeilzaehlung_by_pk(variables, resultSelector = teilzaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_by_pk($id: uuid!) { teilzaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung_rev"
    subscribeTeilzaehlung_rev(variables, resultSelector = teilzaehlungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_rev($distinctOn: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "teilzaehlung_rev"
    subscribeTeilzaehlung_rev_aggregate(variables, resultSelector = teilzaehlungRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_rev_aggregate($distinctOn: [teilzaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [teilzaehlung_rev_order_by!], $where: teilzaehlung_rev_bool_exp) { teilzaehlung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "teilzaehlung_rev" using primary key columns
    subscribeTeilzaehlung_rev_by_pk(variables, resultSelector = teilzaehlungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription teilzaehlung_rev_by_pk($rev: String!, $id: uuid!) { teilzaehlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TeilzaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "user_role"
    subscribeUser_role(variables, resultSelector = userRoleModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription user_role($distinctOn: [user_role_select_column!], $limit: Int, $offset: Int, $orderBy: [user_role_order_by!], $where: user_role_bool_exp) { user_role(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "user_role"
    subscribeUser_role_aggregate(variables, resultSelector = userRoleAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription user_role_aggregate($distinctOn: [user_role_select_column!], $limit: Int, $offset: Int, $orderBy: [user_role_order_by!], $where: user_role_bool_exp) { user_role_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "user_role" using primary key columns
    subscribeUser_role_by_pk(variables, resultSelector = userRoleModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription user_role_by_pk($name: String!) { user_role_by_pk(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new UserRoleModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung"
    subscribeZaehlung(variables, resultSelector = zaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung($distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "zaehlung"
    subscribeZaehlung_aggregate(variables, resultSelector = zaehlungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_aggregate($distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung" using primary key columns
    subscribeZaehlung_by_pk(variables, resultSelector = zaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_by_pk($id: uuid!) { zaehlung_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung_rev"
    subscribeZaehlung_rev(variables, resultSelector = zaehlungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_rev($distinctOn: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch aggregated fields from the table: "zaehlung_rev"
    subscribeZaehlung_rev_aggregate(variables, resultSelector = zaehlungRevAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_rev_aggregate($distinctOn: [zaehlung_rev_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_rev_order_by!], $where: zaehlung_rev_bool_exp) { zaehlung_rev_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // fetch data from the table: "zaehlung_rev" using primary key columns
    subscribeZaehlung_rev_by_pk(variables, resultSelector = zaehlungRevModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_rev_by_pk($rev: String!, $id: uuid!) { zaehlung_rev_by_pk(_rev: $rev, id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungRevModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "zaehlung_search" which returns "zaehlung"
    subscribeZaehlung_search(variables, resultSelector = zaehlungModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_search($args: zaehlung_search_args!, $distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
    // execute function "zaehlung_search" and query aggregates on result of table type "zaehlung"
    subscribeZaehlung_search_aggregate(variables, resultSelector = zaehlungAggregateModelPrimitives.toString(), onData) {
      return self.subscribe(`subscription zaehlung_search_aggregate($args: zaehlung_search_args!, $distinctOn: [zaehlung_select_column!], $limit: Int, $offset: Int, $orderBy: [zaehlung_order_by!], $where: zaehlung_bool_exp) { zaehlung_search_aggregate(args: $args, distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ZaehlungAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
  }))
