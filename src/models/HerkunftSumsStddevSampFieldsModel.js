import { HerkunftSumsStddevSampFieldsModelBase } from "./HerkunftSumsStddevSampFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsStddevSampFieldsModel */
export { selectFromHerkunftSumsStddevSampFields, herkunftSumsStddevSampFieldsModelPrimitives, HerkunftSumsStddevSampFieldsModelSelector } from "./HerkunftSumsStddevSampFieldsModel.base"

/**
 * HerkunftSumsStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const HerkunftSumsStddevSampFieldsModel = HerkunftSumsStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
