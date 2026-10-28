export const getShowArt = ({ userRole, activeNodeArray }: { userRole: string | null | undefined; activeNodeArray: string[] }) =>
  // always show if url contains it
  userRole !== 'gaertner' || activeNodeArray?.[0] === 'Arten'
