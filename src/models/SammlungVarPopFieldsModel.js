import { SammlungVarPopFieldsModelBase } from "./SammlungVarPopFieldsModel.base"


/* A graphql query fragment builders for SammlungVarPopFieldsModel */
export { selectFromSammlungVarPopFields, sammlungVarPopFieldsModelPrimitives, SammlungVarPopFieldsModelSelector } from "./SammlungVarPopFieldsModel.base"

/**
 * SammlungVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const SammlungVarPopFieldsModel = SammlungVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
