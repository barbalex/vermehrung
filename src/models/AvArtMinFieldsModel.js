import { AvArtMinFieldsModelBase } from "./AvArtMinFieldsModel.base"


/* A graphql query fragment builders for AvArtMinFieldsModel */
export { selectFromAvArtMinFields, avArtMinFieldsModelPrimitives, AvArtMinFieldsModelSelector } from "./AvArtMinFieldsModel.base"

/**
 * AvArtMinFieldsModel
 *
 * aggregate min on columns
 */
export const AvArtMinFieldsModel = AvArtMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
