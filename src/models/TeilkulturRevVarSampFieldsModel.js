import { TeilkulturRevVarSampFieldsModelBase } from "./TeilkulturRevVarSampFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevVarSampFieldsModel */
export { selectFromTeilkulturRevVarSampFields, teilkulturRevVarSampFieldsModelPrimitives, TeilkulturRevVarSampFieldsModelSelector } from "./TeilkulturRevVarSampFieldsModel.base"

/**
 * TeilkulturRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const TeilkulturRevVarSampFieldsModel = TeilkulturRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
