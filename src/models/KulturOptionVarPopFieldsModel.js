import { KulturOptionVarPopFieldsModelBase } from "./KulturOptionVarPopFieldsModel.base"


/* A graphql query fragment builders for KulturOptionVarPopFieldsModel */
export { selectFromKulturOptionVarPopFields, kulturOptionVarPopFieldsModelPrimitives, KulturOptionVarPopFieldsModelSelector } from "./KulturOptionVarPopFieldsModel.base"

/**
 * KulturOptionVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const KulturOptionVarPopFieldsModel = KulturOptionVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
