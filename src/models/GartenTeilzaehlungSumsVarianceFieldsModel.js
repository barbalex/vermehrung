import { GartenTeilzaehlungSumsVarianceFieldsModelBase } from "./GartenTeilzaehlungSumsVarianceFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsVarianceFieldsModel */
export { selectFromGartenTeilzaehlungSumsVarianceFields, gartenTeilzaehlungSumsVarianceFieldsModelPrimitives, GartenTeilzaehlungSumsVarianceFieldsModelSelector } from "./GartenTeilzaehlungSumsVarianceFieldsModel.base"

/**
 * GartenTeilzaehlungSumsVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const GartenTeilzaehlungSumsVarianceFieldsModel = GartenTeilzaehlungSumsVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
