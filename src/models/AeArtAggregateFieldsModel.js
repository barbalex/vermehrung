import { AeArtAggregateFieldsModelBase } from "./AeArtAggregateFieldsModel.base"


/* A graphql query fragment builders for AeArtAggregateFieldsModel */
export { selectFromAeArtAggregateFields, aeArtAggregateFieldsModelPrimitives, AeArtAggregateFieldsModelSelector } from "./AeArtAggregateFieldsModel.base"

/**
 * AeArtAggregateFieldsModel
 *
 * aggregate fields of "ae_art"
 */
export const AeArtAggregateFieldsModel = AeArtAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
