import { GartenTeilzaehlungSumsStddevFieldsModelBase } from "./GartenTeilzaehlungSumsStddevFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsStddevFieldsModel */
export { selectFromGartenTeilzaehlungSumsStddevFields, gartenTeilzaehlungSumsStddevFieldsModelPrimitives, GartenTeilzaehlungSumsStddevFieldsModelSelector } from "./GartenTeilzaehlungSumsStddevFieldsModel.base"

/**
 * GartenTeilzaehlungSumsStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const GartenTeilzaehlungSumsStddevFieldsModel = GartenTeilzaehlungSumsStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
