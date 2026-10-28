const removeMetadata = (d: Record<string, unknown>): Record<string, unknown> => {
  delete d.__typename
  delete d._conflicts
  delete d._deleted
  delete d._depth
  delete d._rev
  delete d._parent_rev
  delete d._revisions

  return d
}

// MST-era helper still used by the excel exports: dataset fields may be
// observable objects exposing toJSON()
type JsonLike = Record<string, unknown> & {
  toJSON?: () => Record<string, unknown> & { map?: unknown }
}

export const removeMetadataFromDataset = ({
  dataset: d,
  foreignKeys,
}: {
  dataset: Record<string, unknown> | null | undefined
  foreignKeys: string[]
}): Record<string, unknown> | null => {
  if (!d) return null
  const datasetRaw = { ...d }
  const dataset = removeMetadata(datasetRaw)
  if (foreignKeys.length) {
    foreignKeys.forEach((key) => {
      const field = dataset[key] as JsonLike | null | undefined
      if (!field) return
      if (typeof field.toJSON !== 'function') return
      const json = (field.toJSON as () => JsonLike | JsonLike[])()
      if (Array.isArray(json)) {
        dataset[key] = json.map((val) => {
          if (!val) return val
          // somehow val.toJSON() is protected
          // so need to copy it
          return removeMetadata({ ...val })
        })
        return
      }
      // somehow dataset[key].toJSON() is protected
      // so need to copy it
      dataset[key] = removeMetadata({ ...json })
    })
  }
  if (Object.keys(dataset).length) return dataset
  return null
}
