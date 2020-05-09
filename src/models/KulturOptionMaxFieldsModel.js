import { KulturOptionMaxFieldsModelBase } from "./KulturOptionMaxFieldsModel.base"


/* A graphql query fragment builders for KulturOptionMaxFieldsModel */
export { selectFromKulturOptionMaxFields, kulturOptionMaxFieldsModelPrimitives, KulturOptionMaxFieldsModelSelector } from "./KulturOptionMaxFieldsModel.base"

/**
 * KulturOptionMaxFieldsModel
 *
 * aggregate max on columns
 */
export const KulturOptionMaxFieldsModel = KulturOptionMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
