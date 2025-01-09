export const getShowKultur = ({ userPersonOption, activeNodeArray }) =>
  // always show if url contains it
  userPersonOption?.tree_kultur || activeNodeArray?.[0] === 'Kulturen'
