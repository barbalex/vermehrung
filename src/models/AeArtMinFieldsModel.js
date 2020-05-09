import { AeArtMinFieldsModelBase } from "./AeArtMinFieldsModel.base"


/* A graphql query fragment builders for AeArtMinFieldsModel */
export { selectFromAeArtMinFields, aeArtMinFieldsModelPrimitives, AeArtMinFieldsModelSelector } from "./AeArtMinFieldsModel.base"

/**
 * AeArtMinFieldsModel
 *
 * aggregate min on columns
 */
export const AeArtMinFieldsModel = AeArtMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
