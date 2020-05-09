import { GartenVarPopFieldsModelBase } from "./GartenVarPopFieldsModel.base"


/* A graphql query fragment builders for GartenVarPopFieldsModel */
export { selectFromGartenVarPopFields, gartenVarPopFieldsModelPrimitives, GartenVarPopFieldsModelSelector } from "./GartenVarPopFieldsModel.base"

/**
 * GartenVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const GartenVarPopFieldsModel = GartenVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
