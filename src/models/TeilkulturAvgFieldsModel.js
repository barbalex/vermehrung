import { TeilkulturAvgFieldsModelBase } from "./TeilkulturAvgFieldsModel.base"


/* A graphql query fragment builders for TeilkulturAvgFieldsModel */
export { selectFromTeilkulturAvgFields, teilkulturAvgFieldsModelPrimitives, TeilkulturAvgFieldsModelSelector } from "./TeilkulturAvgFieldsModel.base"

/**
 * TeilkulturAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const TeilkulturAvgFieldsModel = TeilkulturAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
