import { TeilzaehlungVarianceFieldsModelBase } from "./TeilzaehlungVarianceFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungVarianceFieldsModel */
export { selectFromTeilzaehlungVarianceFields, teilzaehlungVarianceFieldsModelPrimitives, TeilzaehlungVarianceFieldsModelSelector } from "./TeilzaehlungVarianceFieldsModel.base"

/**
 * TeilzaehlungVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const TeilzaehlungVarianceFieldsModel = TeilzaehlungVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
