const removeMetadata = (d) => {
  delete d.__typename
  delete d._conflicts
  delete d._deleted
  delete d._depth
  delete d._rev
  delete d._parent_rev
  delete d._revisions
  delete d.art
  delete d.arts
  delete d.av
  delete d.avs
  delete d.gv
  delete d.gvs
  delete d.event
  delete d.events
  delete d.garten
  delete d.gartens
  delete d.herkunfts
  delete d.kultur
  delete d.herkunfts
  delete d.kulturs
  delete d.lieferung
  delete d.lieferungs
  delete d.person
  delete d.persons
  delete d.sammlung
  delete d.sammlungs
  delete d.sammel_lieferungs
  delete d.zaehlung
  delete d.sammel_lieferungs
  delete d.zaehlungs
  delete d.teilzaehlungs
  delete d.teilkultur
  delete d.teilzaehlungs
  delete d.teilkulturs
  delete d.person_files
  delete d.art_files
  delete d.garten_files
  delete d.herkunft_files
  delete d.kultur_files
  delete d.lieferung_files
  delete d.sammlung_files
  delete d.user_roles
  delete d.userRoleByUserRole
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
