import { ArtRevVarPopFieldsModelBase } from "./ArtRevVarPopFieldsModel.base"


/* A graphql query fragment builders for ArtRevVarPopFieldsModel */
export { selectFromArtRevVarPopFields, artRevVarPopFieldsModelPrimitives, ArtRevVarPopFieldsModelSelector } from "./ArtRevVarPopFieldsModel.base"

/**
 * ArtRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const ArtRevVarPopFieldsModel = ArtRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
