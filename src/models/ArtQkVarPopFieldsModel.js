import { ArtQkVarPopFieldsModelBase } from "./ArtQkVarPopFieldsModel.base"


/* A graphql query fragment builders for ArtQkVarPopFieldsModel */
export { selectFromArtQkVarPopFields, artQkVarPopFieldsModelPrimitives, ArtQkVarPopFieldsModelSelector } from "./ArtQkVarPopFieldsModel.base"

/**
 * ArtQkVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const ArtQkVarPopFieldsModel = ArtQkVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
