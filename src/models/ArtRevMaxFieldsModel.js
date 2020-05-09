import { ArtRevMaxFieldsModelBase } from "./ArtRevMaxFieldsModel.base"


/* A graphql query fragment builders for ArtRevMaxFieldsModel */
export { selectFromArtRevMaxFields, artRevMaxFieldsModelPrimitives, ArtRevMaxFieldsModelSelector } from "./ArtRevMaxFieldsModel.base"

/**
 * ArtRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ArtRevMaxFieldsModel = ArtRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
