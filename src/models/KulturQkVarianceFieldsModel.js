import { KulturQkVarianceFieldsModelBase } from "./KulturQkVarianceFieldsModel.base"


/* A graphql query fragment builders for KulturQkVarianceFieldsModel */
export { selectFromKulturQkVarianceFields, kulturQkVarianceFieldsModelPrimitives, KulturQkVarianceFieldsModelSelector } from "./KulturQkVarianceFieldsModel.base"

/**
 * KulturQkVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const KulturQkVarianceFieldsModel = KulturQkVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
