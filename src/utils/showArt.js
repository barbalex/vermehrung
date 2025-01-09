export const getShowArt = ({ userRole, activeNodeArray }) =>
  // always show if url contains it
  userRole !== 'gaertner' || activeNodeArray?.[0] === 'Arten'
