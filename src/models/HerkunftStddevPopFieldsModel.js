import { HerkunftStddevPopFieldsModelBase } from "./HerkunftStddevPopFieldsModel.base"


/* A graphql query fragment builders for HerkunftStddevPopFieldsModel */
export { selectFromHerkunftStddevPopFields, herkunftStddevPopFieldsModelPrimitives, HerkunftStddevPopFieldsModelSelector } from "./HerkunftStddevPopFieldsModel.base"

/**
 * HerkunftStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const HerkunftStddevPopFieldsModel = HerkunftStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
