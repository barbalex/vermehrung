const stripTypename = (object) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, ...rest } = object
  return rest
}

export const parseComplexFieldsForWm = (object) =>
  stripTypename({
    ...object,
    ...(object.geom_point ?
      { geom_point: JSON.stringify(object.geom_point) }
    : {}),
    ...(object.art_qk_choosen ?
      { art_qk_choosen: JSON.stringify(object.art_qk_choosen) }
    : {}),
    ...(object.kultur_qk_choosen ?
      { kultur_qk_choosen: JSON.stringify(object.kultur_qk_choosen) }
    : {}),
    _conflicts: JSON.stringify(object._conflicts),
    _revisions: JSON.stringify(object._revisions),
  })
