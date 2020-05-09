import { KulturQkChoosenModelBase } from "./KulturQkChoosenModel.base"


/* A graphql query fragment builders for KulturQkChoosenModel */
export { selectFromKulturQkChoosen, kulturQkChoosenModelPrimitives, KulturQkChoosenModelSelector } from "./KulturQkChoosenModel.base"

/**
 * KulturQkChoosenModel
 *
 * columns and relationships of "kultur_qk_choosen"
 */
export const KulturQkChoosenModel = KulturQkChoosenModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
