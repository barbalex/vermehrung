import { KulturOptionRevMinFieldsModelBase } from "./KulturOptionRevMinFieldsModel.base"


/* A graphql query fragment builders for KulturOptionRevMinFieldsModel */
export { selectFromKulturOptionRevMinFields, kulturOptionRevMinFieldsModelPrimitives, KulturOptionRevMinFieldsModelSelector } from "./KulturOptionRevMinFieldsModel.base"

/**
 * KulturOptionRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const KulturOptionRevMinFieldsModel = KulturOptionRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
