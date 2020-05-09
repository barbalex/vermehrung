import { KulturSumFieldsModelBase } from "./KulturSumFieldsModel.base"


/* A graphql query fragment builders for KulturSumFieldsModel */
export { selectFromKulturSumFields, kulturSumFieldsModelPrimitives, KulturSumFieldsModelSelector } from "./KulturSumFieldsModel.base"

/**
 * KulturSumFieldsModel
 *
 * aggregate sum on columns
 */
export const KulturSumFieldsModel = KulturSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
