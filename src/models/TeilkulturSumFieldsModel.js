import { TeilkulturSumFieldsModelBase } from "./TeilkulturSumFieldsModel.base"


/* A graphql query fragment builders for TeilkulturSumFieldsModel */
export { selectFromTeilkulturSumFields, teilkulturSumFieldsModelPrimitives, TeilkulturSumFieldsModelSelector } from "./TeilkulturSumFieldsModel.base"

/**
 * TeilkulturSumFieldsModel
 *
 * aggregate sum on columns
 */
export const TeilkulturSumFieldsModel = TeilkulturSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
