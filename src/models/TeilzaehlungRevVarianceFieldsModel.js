import { TeilzaehlungRevVarianceFieldsModelBase } from "./TeilzaehlungRevVarianceFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevVarianceFieldsModel */
export { selectFromTeilzaehlungRevVarianceFields, teilzaehlungRevVarianceFieldsModelPrimitives, TeilzaehlungRevVarianceFieldsModelSelector } from "./TeilzaehlungRevVarianceFieldsModel.base"

/**
 * TeilzaehlungRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const TeilzaehlungRevVarianceFieldsModel = TeilzaehlungRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
