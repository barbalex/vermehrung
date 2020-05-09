import { ArtSumsVarPopFieldsModelBase } from "./ArtSumsVarPopFieldsModel.base"


/* A graphql query fragment builders for ArtSumsVarPopFieldsModel */
export { selectFromArtSumsVarPopFields, artSumsVarPopFieldsModelPrimitives, ArtSumsVarPopFieldsModelSelector } from "./ArtSumsVarPopFieldsModel.base"

/**
 * ArtSumsVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const ArtSumsVarPopFieldsModel = ArtSumsVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
