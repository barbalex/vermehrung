import { TeilkulturMaxFieldsModelBase } from "./TeilkulturMaxFieldsModel.base"


/* A graphql query fragment builders for TeilkulturMaxFieldsModel */
export { selectFromTeilkulturMaxFields, teilkulturMaxFieldsModelPrimitives, TeilkulturMaxFieldsModelSelector } from "./TeilkulturMaxFieldsModel.base"

/**
 * TeilkulturMaxFieldsModel
 *
 * aggregate max on columns
 */
export const TeilkulturMaxFieldsModel = TeilkulturMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
