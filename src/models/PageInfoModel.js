import { PageInfoModelBase } from "./PageInfoModel.base"


/* A graphql query fragment builders for PageInfoModel */
export { selectFromPageInfo, pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"

/**
 * PageInfoModel
 */
export const PageInfoModel = PageInfoModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
