import { KulturRevSumFieldsModelBase } from "./KulturRevSumFieldsModel.base"


/* A graphql query fragment builders for KulturRevSumFieldsModel */
export { selectFromKulturRevSumFields, kulturRevSumFieldsModelPrimitives, KulturRevSumFieldsModelSelector } from "./KulturRevSumFieldsModel.base"

/**
 * KulturRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const KulturRevSumFieldsModel = KulturRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
