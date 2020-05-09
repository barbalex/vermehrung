import { KulturRevVarPopFieldsModelBase } from "./KulturRevVarPopFieldsModel.base"


/* A graphql query fragment builders for KulturRevVarPopFieldsModel */
export { selectFromKulturRevVarPopFields, kulturRevVarPopFieldsModelPrimitives, KulturRevVarPopFieldsModelSelector } from "./KulturRevVarPopFieldsModel.base"

/**
 * KulturRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const KulturRevVarPopFieldsModel = KulturRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
