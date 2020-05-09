import { TeilzaehlungRevSumFieldsModelBase } from "./TeilzaehlungRevSumFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevSumFieldsModel */
export { selectFromTeilzaehlungRevSumFields, teilzaehlungRevSumFieldsModelPrimitives, TeilzaehlungRevSumFieldsModelSelector } from "./TeilzaehlungRevSumFieldsModel.base"

/**
 * TeilzaehlungRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const TeilzaehlungRevSumFieldsModel = TeilzaehlungRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
