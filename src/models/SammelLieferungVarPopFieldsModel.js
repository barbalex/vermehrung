import { SammelLieferungVarPopFieldsModelBase } from "./SammelLieferungVarPopFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungVarPopFieldsModel */
export { selectFromSammelLieferungVarPopFields, sammelLieferungVarPopFieldsModelPrimitives, SammelLieferungVarPopFieldsModelSelector } from "./SammelLieferungVarPopFieldsModel.base"

/**
 * SammelLieferungVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const SammelLieferungVarPopFieldsModel = SammelLieferungVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
