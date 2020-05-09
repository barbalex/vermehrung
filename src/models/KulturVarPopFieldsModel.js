import { KulturVarPopFieldsModelBase } from "./KulturVarPopFieldsModel.base"


/* A graphql query fragment builders for KulturVarPopFieldsModel */
export { selectFromKulturVarPopFields, kulturVarPopFieldsModelPrimitives, KulturVarPopFieldsModelSelector } from "./KulturVarPopFieldsModel.base"

/**
 * KulturVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const KulturVarPopFieldsModel = KulturVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
