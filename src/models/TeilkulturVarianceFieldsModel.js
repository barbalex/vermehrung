import { TeilkulturVarianceFieldsModelBase } from "./TeilkulturVarianceFieldsModel.base"


/* A graphql query fragment builders for TeilkulturVarianceFieldsModel */
export { selectFromTeilkulturVarianceFields, teilkulturVarianceFieldsModelPrimitives, TeilkulturVarianceFieldsModelSelector } from "./TeilkulturVarianceFieldsModel.base"

/**
 * TeilkulturVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const TeilkulturVarianceFieldsModel = TeilkulturVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
