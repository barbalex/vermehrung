import { HerkunftVarianceFieldsModelBase } from "./HerkunftVarianceFieldsModel.base"


/* A graphql query fragment builders for HerkunftVarianceFieldsModel */
export { selectFromHerkunftVarianceFields, herkunftVarianceFieldsModelPrimitives, HerkunftVarianceFieldsModelSelector } from "./HerkunftVarianceFieldsModel.base"

/**
 * HerkunftVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const HerkunftVarianceFieldsModel = HerkunftVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
