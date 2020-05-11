import { garten_teilzaehlung_sumsModelBase } from "./garten_teilzaehlung_sumsModel.base"


/* A graphql query fragment builders for garten_teilzaehlung_sumsModel */
export { selectFromgarten_teilzaehlung_sums, garten_teilzaehlung_sumsModelPrimitives, garten_teilzaehlung_sumsModelSelector } from "./garten_teilzaehlung_sumsModel.base"

/**
 * garten_teilzaehlung_sumsModel
 *
 * columns and relationships of "garten_teilzaehlung_sums"
 */
export const garten_teilzaehlung_sumsModel = garten_teilzaehlung_sumsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
