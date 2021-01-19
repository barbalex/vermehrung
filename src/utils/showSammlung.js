const showSammlung = ({ userRole, activeNodeArray }) =>
  // always show if url contains it
  userRole !== 'gaertner' || activeNodeArray?.[0] === 'Sammlungen'

export default showSammlung
