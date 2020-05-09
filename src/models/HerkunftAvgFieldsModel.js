import { HerkunftAvgFieldsModelBase } from "./HerkunftAvgFieldsModel.base"


/* A graphql query fragment builders for HerkunftAvgFieldsModel */
export { selectFromHerkunftAvgFields, herkunftAvgFieldsModelPrimitives, HerkunftAvgFieldsModelSelector } from "./HerkunftAvgFieldsModel.base"

/**
 * HerkunftAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const HerkunftAvgFieldsModel = HerkunftAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
