import { GartenTeilzaehlungSumsMinFieldsModelBase } from "./GartenTeilzaehlungSumsMinFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsMinFieldsModel */
export { selectFromGartenTeilzaehlungSumsMinFields, gartenTeilzaehlungSumsMinFieldsModelPrimitives, GartenTeilzaehlungSumsMinFieldsModelSelector } from "./GartenTeilzaehlungSumsMinFieldsModel.base"

/**
 * GartenTeilzaehlungSumsMinFieldsModel
 *
 * aggregate min on columns
 */
export const GartenTeilzaehlungSumsMinFieldsModel = GartenTeilzaehlungSumsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
