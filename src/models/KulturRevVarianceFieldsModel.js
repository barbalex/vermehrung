import { KulturRevVarianceFieldsModelBase } from "./KulturRevVarianceFieldsModel.base"


/* A graphql query fragment builders for KulturRevVarianceFieldsModel */
export { selectFromKulturRevVarianceFields, kulturRevVarianceFieldsModelPrimitives, KulturRevVarianceFieldsModelSelector } from "./KulturRevVarianceFieldsModel.base"

/**
 * KulturRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const KulturRevVarianceFieldsModel = KulturRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
