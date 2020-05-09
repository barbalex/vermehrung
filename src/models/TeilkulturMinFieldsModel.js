import { TeilkulturMinFieldsModelBase } from "./TeilkulturMinFieldsModel.base"


/* A graphql query fragment builders for TeilkulturMinFieldsModel */
export { selectFromTeilkulturMinFields, teilkulturMinFieldsModelPrimitives, TeilkulturMinFieldsModelSelector } from "./TeilkulturMinFieldsModel.base"

/**
 * TeilkulturMinFieldsModel
 *
 * aggregate min on columns
 */
export const TeilkulturMinFieldsModel = TeilkulturMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
