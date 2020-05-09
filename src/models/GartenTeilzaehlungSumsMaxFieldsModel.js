import { GartenTeilzaehlungSumsMaxFieldsModelBase } from "./GartenTeilzaehlungSumsMaxFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsMaxFieldsModel */
export { selectFromGartenTeilzaehlungSumsMaxFields, gartenTeilzaehlungSumsMaxFieldsModelPrimitives, GartenTeilzaehlungSumsMaxFieldsModelSelector } from "./GartenTeilzaehlungSumsMaxFieldsModel.base"

/**
 * GartenTeilzaehlungSumsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const GartenTeilzaehlungSumsMaxFieldsModel = GartenTeilzaehlungSumsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
