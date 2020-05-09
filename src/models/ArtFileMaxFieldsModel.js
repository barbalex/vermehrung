import { ArtFileMaxFieldsModelBase } from "./ArtFileMaxFieldsModel.base"


/* A graphql query fragment builders for ArtFileMaxFieldsModel */
export { selectFromArtFileMaxFields, artFileMaxFieldsModelPrimitives, ArtFileMaxFieldsModelSelector } from "./ArtFileMaxFieldsModel.base"

/**
 * ArtFileMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ArtFileMaxFieldsModel = ArtFileMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
