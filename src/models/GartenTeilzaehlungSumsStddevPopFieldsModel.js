import { GartenTeilzaehlungSumsStddevPopFieldsModelBase } from "./GartenTeilzaehlungSumsStddevPopFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsStddevPopFieldsModel */
export { selectFromGartenTeilzaehlungSumsStddevPopFields, gartenTeilzaehlungSumsStddevPopFieldsModelPrimitives, GartenTeilzaehlungSumsStddevPopFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevPopFieldsModel.base"

/**
 * GartenTeilzaehlungSumsStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const GartenTeilzaehlungSumsStddevPopFieldsModel = GartenTeilzaehlungSumsStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
