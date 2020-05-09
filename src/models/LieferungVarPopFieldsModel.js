import { LieferungVarPopFieldsModelBase } from "./LieferungVarPopFieldsModel.base"


/* A graphql query fragment builders for LieferungVarPopFieldsModel */
export { selectFromLieferungVarPopFields, lieferungVarPopFieldsModelPrimitives, LieferungVarPopFieldsModelSelector } from "./LieferungVarPopFieldsModel.base"

/**
 * LieferungVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const LieferungVarPopFieldsModel = LieferungVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
