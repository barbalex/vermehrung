import { KulturQkMaxFieldsModelBase } from "./KulturQkMaxFieldsModel.base"


/* A graphql query fragment builders for KulturQkMaxFieldsModel */
export { selectFromKulturQkMaxFields, kulturQkMaxFieldsModelPrimitives, KulturQkMaxFieldsModelSelector } from "./KulturQkMaxFieldsModel.base"

/**
 * KulturQkMaxFieldsModel
 *
 * aggregate max on columns
 */
export const KulturQkMaxFieldsModel = KulturQkMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
