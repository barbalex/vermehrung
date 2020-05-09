import { HerkunftRevAvgFieldsModelBase } from "./HerkunftRevAvgFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevAvgFieldsModel */
export { selectFromHerkunftRevAvgFields, herkunftRevAvgFieldsModelPrimitives, HerkunftRevAvgFieldsModelSelector } from "./HerkunftRevAvgFieldsModel.base"

/**
 * HerkunftRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const HerkunftRevAvgFieldsModel = HerkunftRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
