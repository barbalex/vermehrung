import { GartenTeilzaehlungSumsSumFieldsModelBase } from "./GartenTeilzaehlungSumsSumFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsSumFieldsModel */
export { selectFromGartenTeilzaehlungSumsSumFields, gartenTeilzaehlungSumsSumFieldsModelPrimitives, GartenTeilzaehlungSumsSumFieldsModelSelector } from "./GartenTeilzaehlungSumsSumFieldsModel.base"

/**
 * GartenTeilzaehlungSumsSumFieldsModel
 *
 * aggregate sum on columns
 */
export const GartenTeilzaehlungSumsSumFieldsModel = GartenTeilzaehlungSumsSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
