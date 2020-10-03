const removeMetadata = (d) => {
  delete d.__typename
  delete d._conflicts
  delete d._deleted
  delete d._depth
  delete d._rev
  delete d._parent_rev
  delete d._revisions
  delete d.kulturs
  delete d.sammel_lieferungs
  delete d.zaehlungs
  delete d.teilzaehlungs
  delete d.teilzaehlungs
  delete d.art_files
  delete d.art_qks
  delete d.art_qk_choosens
  delete d.kultur_qks
  delete d.kultur_qk_choosens
  delete d.kultur_options
  delete d.kultur_option
  delete d.person_options
  delete d.person_option

  return d
}

export default ({ dataset: d, foreignKeys }) => {
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
