import { GartenTeilzaehlungSumsAvgFieldsModelBase } from "./GartenTeilzaehlungSumsAvgFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsAvgFieldsModel */
export { selectFromGartenTeilzaehlungSumsAvgFields, gartenTeilzaehlungSumsAvgFieldsModelPrimitives, GartenTeilzaehlungSumsAvgFieldsModelSelector } from "./GartenTeilzaehlungSumsAvgFieldsModel.base"

/**
 * GartenTeilzaehlungSumsAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const GartenTeilzaehlungSumsAvgFieldsModel = GartenTeilzaehlungSumsAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
