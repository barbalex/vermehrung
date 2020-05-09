import { KulturOptionRevMaxFieldsModelBase } from "./KulturOptionRevMaxFieldsModel.base"


/* A graphql query fragment builders for KulturOptionRevMaxFieldsModel */
export { selectFromKulturOptionRevMaxFields, kulturOptionRevMaxFieldsModelPrimitives, KulturOptionRevMaxFieldsModelSelector } from "./KulturOptionRevMaxFieldsModel.base"

/**
 * KulturOptionRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const KulturOptionRevMaxFieldsModel = KulturOptionRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
