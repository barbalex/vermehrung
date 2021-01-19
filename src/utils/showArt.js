const showArt = ({ userRole, activeNodeArray }) =>
  // always show if url contains it
  userRole !== 'gaertner' || activeNodeArray?.[0] === 'Arten'

export default showArt
