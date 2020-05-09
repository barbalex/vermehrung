import { AeArtMaxFieldsModelBase } from "./AeArtMaxFieldsModel.base"


/* A graphql query fragment builders for AeArtMaxFieldsModel */
export { selectFromAeArtMaxFields, aeArtMaxFieldsModelPrimitives, AeArtMaxFieldsModelSelector } from "./AeArtMaxFieldsModel.base"

/**
 * AeArtMaxFieldsModel
 *
 * aggregate max on columns
 */
export const AeArtMaxFieldsModel = AeArtMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
