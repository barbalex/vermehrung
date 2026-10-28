// loose structural shapes of watermelon rows as the label builders and
// list helpers read them. Interim typing until dbModel's model classes
// expose their fields typed - then these can be replaced by the models.

export type PersonRow =
  | {
      vorname?: string | null
      name?: string | null
      ort?: string | null
      email?: string | null
    }
  | null
  | undefined

export type AeArtRow = { name?: string | null } | null | undefined

export type HerkunftRow =
  | {
      id?: string | null
      nr?: string | null
    }
  | null
  | undefined

export type GartenRow =
  | {
      id?: string | null
      name?: string | null
      person_id?: string | null
    }
  | null
  | undefined

export type KulturRow =
  | {
      garten_id?: string | null
      herkunft_id?: string | null
      zwischenlager?: boolean | null
    }
  | null
  | undefined

export type SammlungRow =
  | {
      datum?: string | null
      geplant?: boolean | null
    }
  | null
  | undefined

export interface ZaehlungRow {
  id?: string
  datum?: string | null
  prognose?: boolean | null
}

export interface TeilzaehlungRow {
  zaehlung_id?: string | null
  anzahl_pflanzen?: number | null
  anzahl_auspflanzbereit?: number | null
  anzahl_mutterpflanzen?: number | null
}

/** rows compared by label fields in the sort helpers */
export type SortRow = Record<string, unknown> | null | undefined
