const removeMetadata = (d) => {
  delete d.__typename
  delete d._conflicts
  delete d._deleted
  delete d._depth
  delete d._rev
  delete d._parent_rev
  delete d._revisions

  return d
}

export const removeMetadataFromDataset = ({ dataset: d, foreignKeys }) => {
  if (!d) return null
  const datasetRaw = { ...d }
  const dataset = removeMetadata(datasetRaw)
  if (foreignKeys.length) {
    foreignKeys.forEach((key) => {
      if (!dataset[key]) return null
      if (!dataset[key].toJSON) return null
      if (dataset[key].toJSON().map) {
        return (dataset[key] = dataset[key].toJSON().map((val) => {
          if (!val) return val
          // somehow val.toJSON() is protected
          // so need to copy it
          return removeMetadata({ ...val.toJSON() })
        }))
      }
      // somehow dataset[key].toJSON() is protected
      // so need to copy it
      const val = { ...dataset[key].toJSON() }
      dataset[key] = removeMetadata(val)
    })
  }
  if (Object.keys(dataset).length) return dataset
  return null
}
