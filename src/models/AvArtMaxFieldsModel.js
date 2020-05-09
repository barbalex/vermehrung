import { AvArtMaxFieldsModelBase } from "./AvArtMaxFieldsModel.base"


/* A graphql query fragment builders for AvArtMaxFieldsModel */
export { selectFromAvArtMaxFields, avArtMaxFieldsModelPrimitives, AvArtMaxFieldsModelSelector } from "./AvArtMaxFieldsModel.base"

/**
 * AvArtMaxFieldsModel
 *
 * aggregate max on columns
 */
export const AvArtMaxFieldsModel = AvArtMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
