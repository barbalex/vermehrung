const showKultur = ({ userPersonOption, activeNodeArray }) =>
  // always show if url contains it
  userPersonOption?.tree_kultur || activeNodeArray?.[0] === 'Kulturen'

export default showKultur
