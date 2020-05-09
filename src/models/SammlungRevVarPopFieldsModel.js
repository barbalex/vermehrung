import { SammlungRevVarPopFieldsModelBase } from "./SammlungRevVarPopFieldsModel.base"


/* A graphql query fragment builders for SammlungRevVarPopFieldsModel */
export { selectFromSammlungRevVarPopFields, sammlungRevVarPopFieldsModelPrimitives, SammlungRevVarPopFieldsModelSelector } from "./SammlungRevVarPopFieldsModel.base"

/**
 * SammlungRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const SammlungRevVarPopFieldsModel = SammlungRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
