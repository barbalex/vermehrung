export const getShowLieferung = ({ userPersonOption, activeNodeArray }) =>
  // always show if url contains it
  userPersonOption?.tree_lieferung || activeNodeArray?.[0] === 'Lieferungen'
