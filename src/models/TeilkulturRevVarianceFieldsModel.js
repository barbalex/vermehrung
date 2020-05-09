import { TeilkulturRevVarianceFieldsModelBase } from "./TeilkulturRevVarianceFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevVarianceFieldsModel */
export { selectFromTeilkulturRevVarianceFields, teilkulturRevVarianceFieldsModelPrimitives, TeilkulturRevVarianceFieldsModelSelector } from "./TeilkulturRevVarianceFieldsModel.base"

/**
 * TeilkulturRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const TeilkulturRevVarianceFieldsModel = TeilkulturRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
