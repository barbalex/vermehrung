import { TeilzaehlungStddevSampFieldsModelBase } from "./TeilzaehlungStddevSampFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungStddevSampFieldsModel */
export { selectFromTeilzaehlungStddevSampFields, teilzaehlungStddevSampFieldsModelPrimitives, TeilzaehlungStddevSampFieldsModelSelector } from "./TeilzaehlungStddevSampFieldsModel.base"

/**
 * TeilzaehlungStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const TeilzaehlungStddevSampFieldsModel = TeilzaehlungStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
