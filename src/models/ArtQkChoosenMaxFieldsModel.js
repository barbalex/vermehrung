import { ArtQkChoosenMaxFieldsModelBase } from "./ArtQkChoosenMaxFieldsModel.base"


/* A graphql query fragment builders for ArtQkChoosenMaxFieldsModel */
export { selectFromArtQkChoosenMaxFields, artQkChoosenMaxFieldsModelPrimitives, ArtQkChoosenMaxFieldsModelSelector } from "./ArtQkChoosenMaxFieldsModel.base"

/**
 * ArtQkChoosenMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ArtQkChoosenMaxFieldsModel = ArtQkChoosenMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
