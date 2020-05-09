import { TeilkulturRevMinFieldsModelBase } from "./TeilkulturRevMinFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevMinFieldsModel */
export { selectFromTeilkulturRevMinFields, teilkulturRevMinFieldsModelPrimitives, TeilkulturRevMinFieldsModelSelector } from "./TeilkulturRevMinFieldsModel.base"

/**
 * TeilkulturRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const TeilkulturRevMinFieldsModel = TeilkulturRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
