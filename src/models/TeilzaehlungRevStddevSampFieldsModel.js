import { TeilzaehlungRevStddevSampFieldsModelBase } from "./TeilzaehlungRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevStddevSampFieldsModel */
export { selectFromTeilzaehlungRevStddevSampFields, teilzaehlungRevStddevSampFieldsModelPrimitives, TeilzaehlungRevStddevSampFieldsModelSelector } from "./TeilzaehlungRevStddevSampFieldsModel.base"

/**
 * TeilzaehlungRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const TeilzaehlungRevStddevSampFieldsModel = TeilzaehlungRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
