import { TeilzaehlungSumFieldsModelBase } from "./TeilzaehlungSumFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungSumFieldsModel */
export { selectFromTeilzaehlungSumFields, teilzaehlungSumFieldsModelPrimitives, TeilzaehlungSumFieldsModelSelector } from "./TeilzaehlungSumFieldsModel.base"

/**
 * TeilzaehlungSumFieldsModel
 *
 * aggregate sum on columns
 */
export const TeilzaehlungSumFieldsModel = TeilzaehlungSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
