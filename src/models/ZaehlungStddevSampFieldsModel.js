import { ZaehlungStddevSampFieldsModelBase } from "./ZaehlungStddevSampFieldsModel.base"


/* A graphql query fragment builders for ZaehlungStddevSampFieldsModel */
export { selectFromZaehlungStddevSampFields, zaehlungStddevSampFieldsModelPrimitives, ZaehlungStddevSampFieldsModelSelector } from "./ZaehlungStddevSampFieldsModel.base"

/**
 * ZaehlungStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const ZaehlungStddevSampFieldsModel = ZaehlungStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
