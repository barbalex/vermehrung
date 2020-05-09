import { KulturRevMinFieldsModelBase } from "./KulturRevMinFieldsModel.base"


/* A graphql query fragment builders for KulturRevMinFieldsModel */
export { selectFromKulturRevMinFields, kulturRevMinFieldsModelPrimitives, KulturRevMinFieldsModelSelector } from "./KulturRevMinFieldsModel.base"

/**
 * KulturRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const KulturRevMinFieldsModel = KulturRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
