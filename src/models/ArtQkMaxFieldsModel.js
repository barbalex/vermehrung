import { ArtQkMaxFieldsModelBase } from "./ArtQkMaxFieldsModel.base"


/* A graphql query fragment builders for ArtQkMaxFieldsModel */
export { selectFromArtQkMaxFields, artQkMaxFieldsModelPrimitives, ArtQkMaxFieldsModelSelector } from "./ArtQkMaxFieldsModel.base"

/**
 * ArtQkMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ArtQkMaxFieldsModel = ArtQkMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
