import { TeilkulturRevStddevSampFieldsModelBase } from "./TeilkulturRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevStddevSampFieldsModel */
export { selectFromTeilkulturRevStddevSampFields, teilkulturRevStddevSampFieldsModelPrimitives, TeilkulturRevStddevSampFieldsModelSelector } from "./TeilkulturRevStddevSampFieldsModel.base"

/**
 * TeilkulturRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const TeilkulturRevStddevSampFieldsModel = TeilkulturRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
