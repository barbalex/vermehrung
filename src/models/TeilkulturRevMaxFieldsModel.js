import { TeilkulturRevMaxFieldsModelBase } from "./TeilkulturRevMaxFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevMaxFieldsModel */
export { selectFromTeilkulturRevMaxFields, teilkulturRevMaxFieldsModelPrimitives, TeilkulturRevMaxFieldsModelSelector } from "./TeilkulturRevMaxFieldsModel.base"

/**
 * TeilkulturRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const TeilkulturRevMaxFieldsModel = TeilkulturRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
