import { ArtVarPopFieldsModelBase } from "./ArtVarPopFieldsModel.base"


/* A graphql query fragment builders for ArtVarPopFieldsModel */
export { selectFromArtVarPopFields, artVarPopFieldsModelPrimitives, ArtVarPopFieldsModelSelector } from "./ArtVarPopFieldsModel.base"

/**
 * ArtVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const ArtVarPopFieldsModel = ArtVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
