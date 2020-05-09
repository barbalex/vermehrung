import { GartenTeilzaehlungSumsStddevSampFieldsModelBase } from "./GartenTeilzaehlungSumsStddevSampFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsStddevSampFieldsModel */
export { selectFromGartenTeilzaehlungSumsStddevSampFields, gartenTeilzaehlungSumsStddevSampFieldsModelPrimitives, GartenTeilzaehlungSumsStddevSampFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevSampFieldsModel.base"

/**
 * GartenTeilzaehlungSumsStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const GartenTeilzaehlungSumsStddevSampFieldsModel = GartenTeilzaehlungSumsStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
