import { HerkunftStddevSampFieldsModelBase } from "./HerkunftStddevSampFieldsModel.base"


/* A graphql query fragment builders for HerkunftStddevSampFieldsModel */
export { selectFromHerkunftStddevSampFields, herkunftStddevSampFieldsModelPrimitives, HerkunftStddevSampFieldsModelSelector } from "./HerkunftStddevSampFieldsModel.base"

/**
 * HerkunftStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const HerkunftStddevSampFieldsModel = HerkunftStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
