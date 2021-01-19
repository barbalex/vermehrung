const showZaehlung = ({ userPersonOption, activeNodeArray }) =>
  // always show if url contains it
  userPersonOption?.tree_zaehlung || activeNodeArray?.[0] === 'Zaehlungen'

export default showZaehlung
