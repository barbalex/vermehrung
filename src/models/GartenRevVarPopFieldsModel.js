import { GartenRevVarPopFieldsModelBase } from "./GartenRevVarPopFieldsModel.base"


/* A graphql query fragment builders for GartenRevVarPopFieldsModel */
export { selectFromGartenRevVarPopFields, gartenRevVarPopFieldsModelPrimitives, GartenRevVarPopFieldsModelSelector } from "./GartenRevVarPopFieldsModel.base"

/**
 * GartenRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const GartenRevVarPopFieldsModel = GartenRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
