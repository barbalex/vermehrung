import { LieferungRevVarPopFieldsModelBase } from "./LieferungRevVarPopFieldsModel.base"


/* A graphql query fragment builders for LieferungRevVarPopFieldsModel */
export { selectFromLieferungRevVarPopFields, lieferungRevVarPopFieldsModelPrimitives, LieferungRevVarPopFieldsModelSelector } from "./LieferungRevVarPopFieldsModel.base"

/**
 * LieferungRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const LieferungRevVarPopFieldsModel = LieferungRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
