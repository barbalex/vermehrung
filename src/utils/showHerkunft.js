const showHerkunft = ({ userRole, activeNodeArray }) =>
  // always show if url contains it
  userRole !== 'gaertner' || activeNodeArray?.[0] === 'Herkuenfte'

export default showHerkunft
