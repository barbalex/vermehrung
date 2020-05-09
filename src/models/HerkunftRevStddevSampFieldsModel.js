import { HerkunftRevStddevSampFieldsModelBase } from "./HerkunftRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevStddevSampFieldsModel */
export { selectFromHerkunftRevStddevSampFields, herkunftRevStddevSampFieldsModelPrimitives, HerkunftRevStddevSampFieldsModelSelector } from "./HerkunftRevStddevSampFieldsModel.base"

/**
 * HerkunftRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const HerkunftRevStddevSampFieldsModel = HerkunftRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
