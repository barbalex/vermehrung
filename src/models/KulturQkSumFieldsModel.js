import { KulturQkSumFieldsModelBase } from "./KulturQkSumFieldsModel.base"


/* A graphql query fragment builders for KulturQkSumFieldsModel */
export { selectFromKulturQkSumFields, kulturQkSumFieldsModelPrimitives, KulturQkSumFieldsModelSelector } from "./KulturQkSumFieldsModel.base"

/**
 * KulturQkSumFieldsModel
 *
 * aggregate sum on columns
 */
export const KulturQkSumFieldsModel = KulturQkSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
