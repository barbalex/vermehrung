import { TeilkulturRevSumFieldsModelBase } from "./TeilkulturRevSumFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevSumFieldsModel */
export { selectFromTeilkulturRevSumFields, teilkulturRevSumFieldsModelPrimitives, TeilkulturRevSumFieldsModelSelector } from "./TeilkulturRevSumFieldsModel.base"

/**
 * TeilkulturRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const TeilkulturRevSumFieldsModel = TeilkulturRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
