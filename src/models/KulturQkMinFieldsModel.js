import { KulturQkMinFieldsModelBase } from "./KulturQkMinFieldsModel.base"


/* A graphql query fragment builders for KulturQkMinFieldsModel */
export { selectFromKulturQkMinFields, kulturQkMinFieldsModelPrimitives, KulturQkMinFieldsModelSelector } from "./KulturQkMinFieldsModel.base"

/**
 * KulturQkMinFieldsModel
 *
 * aggregate min on columns
 */
export const KulturQkMinFieldsModel = KulturQkMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
